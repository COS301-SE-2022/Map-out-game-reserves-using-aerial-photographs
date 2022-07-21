import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIService, CreateImagesInput, CreateImageCollectionInput, CreateFlightDetailsInput } from 'src/app/API.service';
import { ControllerService } from 'src/app/api/controller/controller.service';
import {v4 as uuidv4} from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';

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

//https://blog.angular-university.io/angular-file-upload/
export class FileUploadComponent {
  requiredFileType: string | undefined;
  submitPressed = false;
  fileName = '';
  uploadProgress: number | undefined;
  uploadSub: Subscription | undefined;
  file: File | undefined;
  formData = new FormData();
  frames = [];
  splittingProgress = 0;

  parks: Park[] = [
    // {value: 'Somkhanda-1', viewValue: 'Somkhanda'},
    // {value: 'RietVlei-2', viewValue: 'Riet Vlei'},
  ];

  flight: FlightType[] = [
    {value: 'Drone', viewValue: 'Drone'},
    {value: 'Propeller Plane', viewValue: 'Propeller Plane'},
  ];

  constructor(/*private apiService: ClientApiService*/private apiController: ControllerService, private api:APIService, private snackBar: MatSnackBar) {
    //      const imageForm = document.querySelector("#imageForm");
    // const imageInput = document.querySelector("#fileUpload");

    // imageForm?.addEventListener("submit", async event =>{
    //   event.preventDefault();
    //   this.uploadFileLocal();
    //   console.log(this.file?.name);
    // }) 
    
    this.api.ListGameParks().then((event)=>{
      //console.log(event.items[0]?.park_name);
      for (let i = 0; i < event.items.length; i++) {
        const element = event.items[i];
          this.parks.push({value: element?.parkID, viewValue: element?.park_name})
        }
        //console.log(this.parks);
    })
  }

  uploadFileLocal() {
    console.log('Submit button pressed');
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
    /*
        const upload$ = this.http.post("/api/thumbnail-upload", formData, {
            reportProgress: true,
            observe: 'events'
        })
        .pipe(
            finalize(() => this.reset())
        );

        this.uploadSub = upload$.subscribe(event => {
          if (event.type == HttpEventType.UploadProgress && event.total) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          }
        })
    } */
  }

  cancelUpload() {
    if (this.uploadSub) {
      this.uploadSub.unsubscribe();
    }
    this.reset();
  }

  reset() {
    this.uploadProgress = undefined;
    this.uploadSub = undefined;
  }

  clearSelection() {
    window.location.reload();
  }

  submitBtnPressed() {
        // get the id of the park
        var e = (document.getElementById("parks")) as HTMLSelectElement;
        var sel = e.selectedIndex;
        var opt = e.options[sel];
        var parkSel = opt.value;
        console.log(parkSel);

        //get the flying option
        e = (document.getElementById("fType")) as HTMLSelectElement;
        sel = e.selectedIndex;
        opt = e.options[sel];
        var typeSel = opt.value;
        console.log(typeSel);

        //get the height
        const i = (document.getElementById("height")) as HTMLInputElement;
        const height = i?.value;
        console.log(height);

    if (this.file && parkSel!="" && typeSel!="" && height!="") {
      const h : number = +height;

      //create a flight object
      const flight:CreateFlightDetailsInput = {
        flightID: uuidv4(),
        flight_height: h,
        flight_type: typeSel,
        /////////////////////////////TODO: how to get pilot id
        // pilotID?: string | null;
      };

      //create flight in the database
      this.api.CreateFlightDetails(flight).then((resp:any)=>{
        console.log(resp);
      })

      this.imageSplitting(this.file, parkSel, flight);
      this.submitPressed = true;
    } else {
      this.snackBar.open("Fill in all the details about the upload.", "❌");
    }
  }

  async uploadToS3(
    collectionID: string,
    bucket_name: string,
    file_name: string,
    file: any
  ) {
    const inp:CreateImagesInput = {
      imageID: uuidv4(),
      collectionID: collectionID,
      bucket_name: bucket_name,
      file_name: file_name
    };

    this.api.CreateImages(inp).then((resp:any) => {
      console.log(resp);
    }).catch(()=> {return -1;});

    //converting base64 to png
    var newFile = this.convertDataUrlToPng(file,inp.imageID+".png");
    
    //upload png to S3
    this.apiController.S3upload(inp.imageID,newFile);
  }

convertDataUrlToPng(dataUrl:any, fileName:string): File {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
  }

  var blob =  new Blob([u8arr], {type: mime});
  return new File([blob], fileName);
}

  imageSplitting(file: File, parkSel: string, flight : CreateFlightDetailsInput) {
    //Load video
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = URL.createObjectURL(file);

    // extract frames (video, interval(time), quality(0-1), final width, final height)
    const interval = 10;
    const quality = 1.0;
    const finalWidth = 240;
    const finalHeight = 180;
    const frames = this.extractFramesFromVideo(
      img.src,
      interval,
      quality,
      finalWidth,
      finalHeight
    );

    //Do after frames are extracted
    frames.then((frames) => {
      const frame = frames[1];
      console.log(flight);
      //code in lines 215-____ replaces commented code in lines ___-___
      
      //create a image collection object
      const inp: CreateImageCollectionInput = {
        collectionID: uuidv4(), //not sure!!!!!!!!!!!!!!! TODO: check
        parkID: parkSel,
        //   upload_date_time: string,
        completed: false,
        flightID: flight.flightID
        //   // _version?: number | null;
      };


      //create an image collection
      this.api.CreateImageCollection(inp).then((resp) => {
        console.log(resp);
        for (let i = 0; i < frames.length; i++){
          this.uploadToS3(resp.collectionID, "dylpickles-image-bucket", resp.collectionID+"-frame-"+i+".png", frame);
        }
      });

      // this.apiService.getImageCollections().subscribe({
      //   next: (data) => {
      //     console.log(data);
      //     this.apiService.createImageCollection(1, '', 1).subscribe({
      //       next: () => {
      //         let id = 0;
      //         if(data.data.getImageCollections.length != 0){
      //           id = data.data.getImageCollections[data.data.getImageCollections.length-1].collectionID + 1;
      //         }

      //         for(let i = 0; i < frames.length; i++) {
      //           this.uploadToS3(id, "dylpickles-image-bucket", id+"-frame-"+i+".png", frame);
      //         }
      //       },
      //       error: (err) => {
      //         console.log(err);
      //       }
      //     });
      //   },
      //   error: (err) => {
      //     console.log(err);
      //   }
      // });
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
        // const imageBlob = await fetch(base64ImageData).then((r) => r.blob());
        // frames.push(imageBlob);
        frames.push(base64ImageData);
      }
      this.splittingProgress = Math.round((currentTime / duration) * 100);
      currentTime += interval;
    }
    this.splittingProgress = 100;
    return frames;
  };
}
