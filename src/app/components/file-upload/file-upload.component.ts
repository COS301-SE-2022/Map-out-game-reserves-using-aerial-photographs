import { Component, OnInit } from '@angular/core';
import {
  APIService,
  CreateImagesInput,
  CreateImageCollectionInput,
  CreateFlightDetailsInput
} from 'src/app/api.service';
import {
  ControllerService,
  WebODMCreateTaskResponse,
} from 'src/app/api/controller/controller.service';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fromBlob } from 'image-resize-compress';
import { Observable } from 'rxjs';

interface Park {
  value: string | undefined;
  viewValue: string | null | undefined;
}

interface FlightType {
  value: string;
  viewValue: string;
}

interface ImageSize {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'aerial-mapping-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})

export class FileUploadComponent implements OnInit {
  requiredFileType: string | undefined;
  submitPressed = false;
  fileName = '';
  files: File[] = [];
  formData = new FormData();
  // frames = [];
  frameCount = 0;
  uploadCount = 0;
  splittingProgress = 0;
  uploadingProgress = 0;
  finalWidth = 0;
  finalHeight = 0;

  parks: Park[] = [
    // {value: 'Somkhanda-1', viewValue: 'Somkhanda'},
    // {value: 'RietVlei-2', viewValue: 'Riet Vlei'},
  ];

  flight: FlightType[] = [
    { value: 'Drone', viewValue: 'Drone' },
    { value: 'Propeller Plane', viewValue: 'Propeller Plane' },
  ];

  iSize: ImageSize[] = [
    { value: '1080', viewValue: '1080p' },
    { value: '720', viewValue: '720p' },
    { value: '480', viewValue: '480p' },
    { value: '360', viewValue: '360p' },
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

    //TODO: add park ui

    this.api.ListGameParks().then((event: any) => {
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

  ngOnInit(): void {
    const formElem = document.getElementById('formElem') as HTMLFormElement;
    formElem!.onsubmit = async (event) => {
      event.preventDefault();

      let response = await fetch('http://localhost:8000/api/projects/1/tasks/', {
        method: 'POST',
        body: new FormData(formElem),
        headers: {
            "Authorization": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJlbWFpbCI6IiIsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE2NTkwNjUxNTd9.qMrsgc0LrfuBy91n1aVt0fVPq3onVsqZcRqFAOZqHVI"
        }
      });

      let result = await response.json();

      console.log("RESULT", result);
      this.uploadFileLocal(result.id);
      console.log('result.id: ' + result.id);
    };
  }

  uploadFileLocal(taskId: string) {
    console.log('Submit button pressed');
    this.frameCount = 0;
    this.uploadCount = 0;
    this.splittingProgress = 0;
    this.uploadingProgress = 0;

    let resolution = document.getElementById('resolution') as HTMLSelectElement;
    let selected = resolution.selectedIndex;

    switch (selected) {
      case 1:
        this.finalHeight = 1080;
        this.finalWidth = 1920;
        break;

      case 2:
        this.finalHeight = 720;
        this.finalWidth = 1280;
        break;

      case 3:
        this.finalHeight = 480;
        this.finalWidth = 720;
        break;

      case 4:
        this.finalHeight = 360;
        this.finalWidth = 640;
        break;
    }
    console.log('size:', this.finalHeight, this.finalWidth, selected);

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
    const flight_height = document.getElementById('height') as HTMLInputElement;
    const height = flight_height?.value;
    console.log(height);

    if (this.files[0] && parkSel != '' && typeSel != '' && height != '') {
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
      }).catch(e => { console.log(e) });

      //

      const imageCollection: CreateImageCollectionInput = {
        collectionID: uuidv4(), //not sure!!!!!!!!!!!!!!! TODO: check
        parkID: parkSel,
        //   upload_date_time: string,
        completed: false,
        flightID: flight.flightID,
        taskID: taskId
        // _version?: number | null;
      };

      this.api.CreateImageCollection(imageCollection).then((res: any) => {
        console.log("CreateImageCollection response", res);
        if (this.files.length > 1) {
          this.uploadImages(imageCollection.collectionID);
        } else {
          this.uploadVideo(imageCollection.collectionID);
        }
      }).catch(e => { console.log(e) });
      this.submitPressed = true;

      //createTask
      // console.log('Attempting to submit...')
      // const formElem = document.getElementById('formElem') as HTMLFormElement;
      // let response = await fetch('http://localhost:8000/api/projects/1/tasks/', {
      //   method: 'POST',
      //   body: new FormData(formElem)
      // }).catch(e => console.log(e));

      // let result = await response!.json().catch(e => console.log(e));
      // console.log('RESULT', result);

      // const updateCollection: UpdateImageCollectionInput = {
      //   collectionID: collectionID,
      //   taskID: response.id
      // }
      // this.api.UpdateImageCollection(updateCollection).then((_res: UpdateImageCollectionMutation) => {
      //   console.log("Updated collection");
      // });
    } else {
      this.snackBar.open('Fill in all the details about the upload.', '❌');
    }
  }

  onFileSelected(event: any) {
    this.submitPressed = false;
    console.log('File staged!');
    //console.log(this.parks[0].viewValue);
    this.fileName = '';

    for (let index = 0; index < event.target.files.length; index++) {
      this.files.push(event.target.files[index]);

      if (this.files[index]) {
        //go through
        if (index == event.target.files.length - 1) {
          this.fileName += this.files[index].name;
        } else {
          this.fileName += this.files[index].name + ', ';
        }
        this.formData.append('thumbnail', this.files[index]);
      }
    }
  }

  clearSelection() {
    window.location.reload();
  }

  async uploadImages(collectionID: string) {
    const frames = [];
    this.frameCount = this.files.length;
    for (var i = 0; i < this.files.length; i++) {
      //TODO: get from dropdown

      const inp: CreateImagesInput = {
        imageID: uuidv4(),
        collectionID: collectionID,
        bucket_name: 'dylpickles-image-bucket',
        file_name: collectionID + '-frame-' + i + '.png',
      };

      frames[i] = new File([this.files[i]], inp.imageID + '.png');
      var newBlob = this.resizeImage(
        frames[i],
        this.finalWidth,
        this.finalHeight
      );
      await newBlob.then((newBlob) => {
        frames[i] = newBlob;
      });

      this.api
        .CreateImages(inp)
        .then((resp: any) => {
          console.log(resp);
        })
        .catch(() => {
          return -1;
        });

      this.uploadToS3(collectionID, inp.imageID, frames[i]);
    }
    this.makeThumbnails(collectionID, frames);
  }

  uploadVideo(collectionID: string) {
    console.log('here');
    //Load video
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = URL.createObjectURL(this.files[0]);

    // extract frames (video, interval(time), quality(0-1), final width, final height)
    const interval = 1; //fps
    const quality = 1.0;
    // TODO: NEED TO GET THESE VALUES FROM THE DROP DOWN @STEVEN
    const frames = this.extractFramesFromVideo(
      img.src,
      interval,
      quality,
      this.finalWidth,
      this.finalHeight
    );

    //Do after frames are extracted
    frames.then((frames) => {
      this.frameCount = frames.length;

      // const frame = frames[1];
      var fCount = 0;
      //code in lines 215-____ replaces commented code in lines ___-___

      //create an image collection
      for (let i = 0; i < frames.length; i++) {
        const inp: CreateImagesInput = {
          imageID: uuidv4(),
          collectionID: collectionID,
          bucket_name: 'dylpickles-image-bucket',
          file_name: collectionID + '-frame-' + i + '.png',
        };

        console.log(i + '|' + inp.imageID);
        this.api
          .CreateImages(inp)
          .then((resp: any) => {
            console.log(resp);
          })
          .catch(() => {
            return -1;
          });

        this.uploadToS3(collectionID, inp.imageID, frames[fCount++]);
      }

      this.makeThumbnails(collectionID, frames);
    });
  }

  uploadToS3(collectionID: string, imageID: string, file: any) {
    //converting blob to png
    var newFile = new File([file], imageID + '.png');
    //upload png to S3
    this.apiController
      .S3upload(imageID, collectionID, 'images', newFile, 'image/png')
      .then(() => {
        this.uploadCount++;
        this.uploadingProgress = Math.round((this.uploadCount / this.frameCount) * 100);
        if (this.uploadingProgress > 100) {
          this.uploadingProgress = 100;
        }
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

    let currentTime = 0;
    const frames = [];

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

  async resizeImage(blobFile: File, width: number, height: number) {
    // quality value for webp and jpeg formats.
    const quality = 80;
    // file format: png, jpeg, bmp, gif, webp. If null, original format will be used.
    const format = 'webp';
    // note only the blobFile argument is required
    return await fromBlob(blobFile, quality, width, height, format);
  }

  async makeThumbnails(collectionID: string, frames: any[]) {
    var thumbnails: any[] = [];
    thumbnails.push(frames[0]);
    thumbnails.push(frames[frames.length / 2]);
    thumbnails.push(frames[frames.length - 1]);

    for (var i = 0; i < 3; i++) {
      var newBlob = this.resizeImage(thumbnails[i], 240, 180);
      await newBlob.then((newBlob) => {
        // let newBlob = thumbnails[i];
        var newFile = new File([newBlob], 'thumbnail_' + i + '.png');

        this.apiController
          .S3upload(
            'thumbnail_' + i,
            collectionID,
            'thumbnails',
            newFile,
            'image/png'
          )
          .then(() => {
            this.uploadCount++;
            this.uploadingProgress = Math.round((this.uploadCount / this.frameCount) * 100);
            if (this.uploadingProgress > 100) {
              this.uploadingProgress = 100;
            }
          });
      });
    }
  }
}
