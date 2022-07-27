import { Component } from '@angular/core';
import {
  APIService,
  CreateImagesInput,
  CreateImageCollectionInput,
  CreateFlightDetailsInput,
} from 'src/app/API.service';
import { ControllerService, WebODMCreateTaskResponse } from 'src/app/api/controller/controller.service';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fromBlob } from 'image-resize-compress';

interface Park {
  value: string | undefined;
  viewValue: string | null | undefined;
}

interface FlightType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'aerial-mapping-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})

export class FileUploadComponent {
  requiredFileType: string | undefined;
  submitPressed = false;
  fileName = '';
  file: File | undefined;
  formData = new FormData();
  // frames = [];
  frameCount = 0;
  uploadCount = 0;
  splittingProgress = 0;
  uploadingProgress = 0;

  parks: Park[] = [
    // {value: 'Somkhanda-1', viewValue: 'Somkhanda'},
    // {value: 'RietVlei-2', viewValue: 'Riet Vlei'},
  ];

  flight: FlightType[] = [
    { value: 'Drone', viewValue: 'Drone' },
    { value: 'Propeller Plane', viewValue: 'Propeller Plane' },
  ];

  constructor(
    private apiController: ControllerService,
    private api: APIService,
    private snackBar: MatSnackBar
  ) {
    //      const imageForm = document.querySelector("#imageForm");
    // const imageInput = document.querySelector("#fileUpload");

    // imageForm?.addEventListener("submit", async event =>{
    //   event.preventDefault();
    //   this.uploadFileLocal();
    //   console.log(this.file?.name);
    // })

    this.api.ListGameParks().then((event) => {
      //console.log(event.items[0]?.park_name);
      for (let i = 0; i < event.items.length; i++) {
        const element = event.items[i];
        this.parks.push({
          value: element?.parkID,
          viewValue: element?.park_name,
        });
      }
      //console.log(this.parks);
    });
  }

  uploadFileLocal() {
    console.log('Submit button pressed');
    this.frameCount = 0;
    this.uploadCount = 0;
    this.splittingProgress = 0;
    this.uploadingProgress = 0;
    this.submitBtnPressed();
  }

  onFileSelected(event: any) {
    this.submitPressed = false;
    console.log('File staged!');
    //console.log(this.parks[0].viewValue);
    this.file = event.target.files[0];
    this.fileName = '';

    for (let index = 0; index < event.target.files.length; index++) {
      this.file = event.target.files[index];

      if (this.file) {
        //go through
        if (index == event.target.files.length - 1) {
          this.fileName += this.file.name;
        } else {
          this.fileName += this.file.name + ', ';
        }
        this.formData.append('thumbnail', this.file);
      }
    }
  }

  clearSelection() {
    window.location.reload();
  }

  submitBtnPressed() {
    // get the id of the park
    let e = document.getElementById('parks') as HTMLSelectElement;
    let sel = e.selectedIndex;
    let opt = e.options[sel];
    let parkSel = opt.value;
    console.log(parkSel);

    //get the flying option
    e = document.getElementById('fType') as HTMLSelectElement;
    sel = e.selectedIndex;
    opt = e.options[sel];
    let typeSel = opt.value;
    console.log(typeSel);

    //get the height
    const i = document.getElementById('height') as HTMLInputElement;
    const height = i?.value;
    console.log(height);

    if (this.file && parkSel != '' && typeSel != '' && height != '') {
      const h: number = +height;

      //create a flight object
      const flight: CreateFlightDetailsInput = {
        flightID: uuidv4(),
        flight_height: h,
        flight_type: typeSel,
        /////////////////////////////TODO: how to get pilot id
        // pilotID?: string | null;
      };

      //create flight in the database
      this.api.CreateFlightDetails(flight).then((resp: any) => {
        console.log(resp);
      });

      this.imageSplitting(this.file, parkSel, flight);
      this.submitPressed = true;
    } else {
      this.snackBar.open('Fill in all the details about the upload.', '❌');
    }
  }

  uploadToS3(collectionID: string, imageID: string, file: any) {
    //converting base64 to png
    // var newFile = this.convertDataUrlToPng(file, imageID + '.png');
    const newFile = new File([file], imageID+".png");
    //upload png to S3
    this.apiController
      .S3upload(imageID, collectionID, 'images', newFile, 'image/png')
      .then(() => {
        this.uploadCount++;
        console.log('Upload:');
        console.log(this.uploadCount);
        console.log(this.frameCount + 3);
        this.uploadingProgress = this.uploadCount / (this.frameCount + 3);
        console.log(this.uploadingProgress);
      });
  }

  //createMap
  imageSplitting(
    file: File,
    parkSel: string,
    flight: CreateFlightDetailsInput
  ) {
    //Load video
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = URL.createObjectURL(file);

    // extract frames (video, interval(time), quality(0-1), final width, final height)
    const interval = 1; //fps
    const quality = 1.0;
    const i_width = document.getElementById('i_width') as HTMLInputElement;
    const finalWidth = Number(i_width?.value);
    const i_height = document.getElementById('i_height') as HTMLInputElement;
    const finalHeight = Number(i_height?.value);
    const frames = this.extractFramesFromVideo(
      img.src,
      interval,
      quality,
      finalWidth,
      finalHeight
    );

    //Do after frames are extracted
    frames.then((framesResp: any) => {
      this.frameCount = framesResp.length;

      let fCount = 0;
      console.log(flight);

      //create a image collection object
      const inp: CreateImageCollectionInput = {
        collectionID: uuidv4(), //not sure!!!!!!!!!!!!!!! TODO: check
        parkID: parkSel,
        //   upload_date_time: string,
        completed: false,
        flightID: flight.flightID,
        // _version?: number | null;
      };
      this.makeThumbnails(inp.collectionID,framesResp);

      //createTask (WebODM)
      this.apiController.createODMTask(framesResp).then((resp: WebODMCreateTaskResponse) => {
        console.log("[CREATE TASK] Logging Create Task Response...");
        console.log(resp);
        this.apiController.getMapAssets(resp.id).then((mapAssets: any) => {
          console.log("[GET MAP ASSETS] Logging Map Assets...");
          console.log(mapAssets);
        });
      });

      //create an image collection (DynamoDB)
      this.api.CreateImageCollection(inp).then((resp) => {
        console.log(resp);

        //create each Image
        for (let i = 0; i < framesResp.length; i++) {
          const input: CreateImagesInput = {
            imageID: uuidv4(),
            collectionID: resp.collectionID,
            bucket_name: 'dylpickles-image-bucket',
            file_name: resp.collectionID + '-frame-' + i + '.png',
          };

          //create image in DynamoDB
          console.log(i+"|"+input.imageID);
          this.api
            .CreateImages(input)
            .then((res: any) => {
              console.log(res);
            })
            .catch(() => {
              return -1;
            });

          this.uploadToS3(resp.collectionID, input.imageID, framesResp[fCount++]);
        }

      });
    });
  }

  extractFramesFromVideo = async (
    videoUrl: string,
    interval: number,
    quality: number,
    width: number,
    height: number
  ) => {
    const video = document.createElement('video');

    let seekResolve: any;
    video.addEventListener('seeked', async function () {
      if (seekResolve) seekResolve();
    });

    video.src = videoUrl;

    while (
      (video.duration === Infinity || isNaN(video.duration)) &&
      video.readyState < 2
    ) {
      await new Promise((r) => setTimeout(r, 1000));
      video.currentTime = 10000000 * Math.random();
    }
    const duration = video.duration;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const [w, h] = [video.videoWidth, video.videoHeight];
    canvas.width = width;
    canvas.height = height;

    const frames = [];
    let currentTime = 0;

    while (currentTime < duration) {
      video.currentTime = currentTime;
      await new Promise((r) => (seekResolve = r));
      if (context) {
        context.drawImage(video, 0, 0, w, h, 0, 0, width, height);
        const base64ImageData = canvas.toDataURL('image/png', quality);
        const imageBlob = await fetch(base64ImageData).then((r) => r.blob());
        frames.push(imageBlob);
        // frames.push(base64ImageData);
      }
      this.splittingProgress = Math.round((currentTime / duration) * 100);
      currentTime += interval;
    }
    this.splittingProgress = 100;
    return frames;
  };

  async resizeImage(blobFile:File,width:number,height:number){
    // quality value for webp and jpeg formats.
    const quality = 80;
    // file format: png, jpeg, bmp, gif, webp. If null, original format will be used.
    const format = 'webp';
    // note only the blobFile argument is required
    return await fromBlob(blobFile, quality, width, height, format);
  };

  async makeThumbnails(collectionID: string,frames:any[]) {
    let thumbnails: any[] = [];
    thumbnails.push(frames[0]);
    thumbnails.push(frames[frames.length / 2]);
    thumbnails.push(frames[frames.length-1]);


    for (let i = 0; i < 3; i++) {
      let newBlob = this.resizeImage(thumbnails[i],240,180);
      await newBlob.then((newBlobResp: any)=>{
        // let newBlob = thumbnails[i];
        let newFile = new File([newBlobResp], "thumbnail_"+i+".png");

        this.apiController
        .S3upload("thumbnail_"+i, collectionID, 'thumbnails', newFile, 'image/png')
        .then(() => {
          this.uploadCount++;
          console.log('Upload:');
          console.log(this.uploadCount);
          console.log(this.frameCount + 3);
          this.uploadingProgress = this.uploadCount / (this.frameCount);
          console.log(this.uploadingProgress);
        });
      })
    }
  }
}
