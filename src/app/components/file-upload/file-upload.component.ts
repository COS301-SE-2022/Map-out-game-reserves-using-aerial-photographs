import { Component, ElementRef, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {
  APIService,
  CreateImagesInput,
  CreateImageCollectionInput,
  CreateFlightDetailsInput,
  CreatePendingJobsInput,
  CreateGameParkInput
} from 'src/app/API.service';
import { ControllerService } from 'src/app/api/controller/controller.service';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fromBlob } from 'image-resize-compress';
import { MatDialog } from '@angular/material/dialog';
import { ParksDialogComponent } from './parks-dialog/parks-dialog.component';
import { PublishCommand } from '@aws-sdk/client-sns';
import { SNSClient } from '@aws-sdk/client-sns';
//import { environment } from 'src/environments/environment';

const REGION = "sa-east-1";
let snsClient = new SNSClient({
  apiVersion: '2010-03-31',
  region: REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!
  }
  // credentials: {
    //accessKeyId: environment.ACCESS_KEY_ID,
    //secretAccessKey: environment.SECRET_ACCESS_KEY
  //}
});


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

export class FileUploadComponent {
  @ViewChild("parks") parks!: ElementRef<HTMLInputElement>;

  title = 'file-upload-component';

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
  name: string = "";
  location: string = "";
  address: string = "";

  outputs: HTMLElement[];

  autoTicks = false;
  disabled = false;
  invert = false;
  max = 5;
  min = 0.1;
  showTicks = false;
  step = 0.1;
  thumbLabel = true;
  sliderValue = 1;
  vertical = false;
  tickInterval = 1;

  parksList: Park[] = [
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

  inAnimation: boolean;

  constructor(
    private apiController: ControllerService,
    private api: APIService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    // const imageForm = document.querySelector("#imageForm");
    // const imageInput = document.querySelector("#fileUpload");

    // imageForm?.addEventListener("submit", async event =>{
    //   event.preventDefault();
    //   this.uploadFileLocal();
    //   console.log(this.file?.name);
    // })
    this.outputs = [];
    //loader
    this.inAnimation = false;
    this.fadeOut();

    this.api.ListGameParks().then((event: any) => {
      //console.log(event.items[0]?.park_name);
      for (let i = 0; i < event.items.length; i++) {
        const element = event.items[i];
        this.parksList.push({
          value: element?.parkID,
          viewValue: element?.park_name,
        });
      }
    });
  }

  getSliderValue(event:any) {
    // console.log(event.value);
    this.sliderValue = event.value;
 }

  uploadFileLocal(ev: Event) {
    ev.preventDefault();
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
      
      default:
        this.finalHeight = 360;
        this.finalWidth = 640;
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

    const collectionName = (document.getElementById('collectionName') as HTMLInputElement).value;

    if (this.files[0] && parkSel != '' && typeSel != '' && height != '' && collectionName!='') {
      const h: number = +height;
      let promises: Promise<any>[] = [];

      if(this.files.length == 1 && this.files[0].type.match('image/*')) {
        this.snackBar.open('At least two images are needed to stitch maps using images. Either upload more than one image, or try uploading a video.', '❌')
        throw 'Use more than one image to stitch a map.';
      }

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

      const newColID = uuidv4();

      const imageCollection: CreateImageCollectionInput = {
        collectionID: newColID,
        parkID: parkSel,
        //   upload_date_time: string,
        flightID: flight.flightID,
        completed: false,
        pending: true,
        error: false,
        //taskID: taskId
        // _version?: number | null;
        collectionName:collectionName
      };

      this.api.CreateImageCollection(imageCollection).then((res: any) => {
        console.log("CreateImageCollection response:", res);

        //disable navbar when system is uploading file(s)
        document.getElementById('buttons')!.style.display='none';

        if (this.files.length > 1) {
          promises.push(this.uploadImages(newColID));
        } else {
          promises.push(this.uploadVideo(newColID));
        }

        //create a pending job in the PendingJobs table, with jobID = this collectionID
        const pendingJob: CreatePendingJobsInput = {
          jobID: newColID,
          busy: false,
          collectionID: imageCollection.collectionID
        }
        this.api.CreatePendingJobs(pendingJob).then((resp: any) => {
          console.log("CreatePendingJob response:", resp);

          //wait for all promises to resolve
          Promise.all(promises).then(async () => {

            //publish SNS message to 'stitch_jobs' topic with the jobID - once all image uploads are complete
            await this.publishSNSNotification();

            //route to map catalogue page
            //this.router.navigate(['map-catalogue']);
              document.getElementById('buttons')!.style.display='block';
              if(document.getElementById('successful-submit')){
                document.getElementById('successful-submit')!.innerHTML='<h4 class="variable" style="color: #5f5f5f;">You can now navigate to the map catalogue to see the result of your upload</h4>';
              }
              this.outputs = Array.from(document.getElementsByClassName('videoSplitting') as HTMLCollectionOf<HTMLElement>);

              if(this.outputs!=null){
                this.outputs.forEach(output => {
                  if(output!=null){
                    output.innerHTML="";
                  }
                });
              }
          }).catch(err => {
            console.log(err);
          });
        });
      }).catch(e => { console.log(e) });
      this.submitPressed = true;
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

      if(!event.target.files[index].type.match('image/*') && !event.target.files[index].type.match('video/*')) {
        throw 'File type must be an image or a video';
      }

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

  async uploadImages(collectionID: string): Promise<any> {
    if(document.getElementById('video')!=null){ //for testing purposes
      document.getElementById('video')!.innerHTML='';
    }

    return new Promise<any>(async (resolve) => {
      let promises = [];
      const frames = [];
      this.frameCount = this.files.length;
      for (var i = 0; i < this.files.length; i++) {
        //TODO: get from dropdown

        const inp: CreateImagesInput = {
          imageID: uuidv4(),
          collectionID: collectionID,
          bucket_name: 'aerial-mapping-bucket80642-dev',
          file_name: collectionID + '-frame-' + i + '.png',
        };

        frames[i] = new File([this.files[i]], inp.imageID + '.png');
/*         var newBlob = this.resizeImage(
          frames[i],
          this.finalWidth,
          this.finalHeight
        );
        await newBlob.then((newBlob) => {
          frames[i] = newBlob;
        }); */

        promises.push(
          this.api
            .CreateImages(inp)
        );

        promises.push(this.uploadToS3(collectionID, inp.imageID, frames[i]));
      }
      promises.push(this.makeThumbnails(collectionID, frames));

      Promise.all(promises).then((resp: any) => {
        resolve(resp);
      }).catch(err => { console.log(err); });
    });
  }

  uploadVideo(collectionID: string): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      let promises: Promise<any>[] = [];
      //Load video
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = URL.createObjectURL(this.files[0]);

      if (!this.files[0].type.match('video/*')) {
        reject("Input more than one image to stitch a new map.");
        return;
      }
      // extract frames (video, interval(time), quality(0-1), final width, final height)
      const interval = 1; //fps
      const quality = 1.0;
      // TODO: NEED TO GET THESE VALUES FROM THE DROP DOWN @STEVEN
      await this.extractFramesFromVideo(
        img.src,
        interval,
        quality,
        this.finalWidth,
        this.finalHeight
      ).then(async (frames) => {
        this.frameCount = frames.length;

        // const frame = frames[1];
        var fCount = 0;
        //code in lines 215-____ replaces commented code in lines ___-___

        //create an image collection
        for (let i = 0; i < frames.length; i++) {
          const inp: CreateImagesInput = {
            imageID: uuidv4(),
            collectionID: collectionID,
            bucket_name: 'aerial-mapping-bucket80642-dev',
            file_name: collectionID + '-frame-' + i + '.png',
          };

          promises.push(this.api.CreateImages(inp));
          promises.push(
            this.uploadToS3(collectionID, inp.imageID, frames[fCount++])
          );
        }
        promises.push(this.makeThumbnails(collectionID, frames));
      });

      Promise.all(promises).then((resp: any) => {
        resolve(resp);
      });
    });
  }

  uploadToS3(collectionID: string, imageID: string, file: any): Promise<any> {
    return new Promise((resolve, reject) => {
      //converting blob to png
      var newFile = new File([file], imageID + '.png');
      //upload png to S3
      this.apiController
        .S3upload(imageID, collectionID, 'images', newFile, 'image/png')
        .then((data: any) => {
          this.uploadCount++;
          console.log(this.uploadCount);
          this.uploadingProgress = Math.round((this.uploadCount / this.frameCount) * 100);
          if (this.uploadingProgress > 100) {
            this.uploadingProgress = 100;
          }

          resolve(data);
        }).catch(e => {
          console.log(e);
          reject(e);
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
    const quality = 100;
    // file format: png, jpeg, bmp, gif, webp. If null, original format will be used.
    //const format = 'webp';
    // note only the blobFile argument is required
    return await fromBlob(blobFile, quality, width, height /*, format */);
  }

  async makeThumbnails(collectionID: string, frames: any[]) {
    return new Promise(async (resolve) => {
      let promises: Promise<any>[] = [];
      var thumbnails: any[] = [];
      thumbnails.push(frames[0]);
      thumbnails.push(frames[Math.round(frames.length / 2)]);
      thumbnails.push(frames[frames.length - 1]);

      for (var i = 0; i < 3; i++) {
        // console.log("THUMBNAIL"+thumbnails[i]);
        var newBlob = this.resizeImage(thumbnails[i], 240, 180);
        await newBlob.then((newBlob) => {
          // let newBlob = thumbnails[i];
          var newFile = new File([newBlob], 'thumbnail_' + i + '.png');

          promises.push(this.apiController
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
            }).catch(e => {
              console.log(e);
            }));
        });
      }

      Promise.all(promises).then((res: any) => {
        resolve(res);
      });
    });
  }

  async publishSNSNotification() {
    const publishParams = {
      Message: 'New pending stitch job published!',
      TopicArn: 'arn:aws:sns:sa-east-1:870416143884:stitch_jobs'
    };
    try {
      const data = await snsClient.send(new PublishCommand(publishParams));
      console.log("Successfully published SNS notification", data);
      return data; //For unit tests
    } catch (e) {
      console.log(e);
      return e; //For unit tests
    }
  }

  openParksDialog(): void {
    const dialogRef = this.dialog.open(ParksDialogComponent, {
      width: '500px',
      data: {name:'', location:'', address:''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == undefined) {
        return;
      }
      this.name = result.name;
      this.location = result.location;
      this.address = result.address;

      // console.log(result);

      // //change username in DynamoDB
      // const updatedUser: UpdateUserInput = {
      //   userID: this.currUserID,
      //   user_name: this.newName
      //   //_version: this.user._version
      // }
      // this.user._version++;
      // this.api.UpdateUser(updatedUser).then((res: any) => {
      //   this.name.nativeElement.innerHTML = this.newName;
      //   this.currName = this.newName;
      //   this.name.nativeElement.value = this.newName;
      //   console.log(res);
      // });
      this.createPark();
    });


  }
  //this is park stuff that might work
  private createPark():void {
    const newPark: CreateGameParkInput = {
      parkID: uuidv4(),
      park_name: this.name,
      park_location: this.location,
      park_address: this.address,
      // _version: 1
    }
    this.api.CreateGamePark(newPark)
      .then((resp:any) => {
        console.log(resp);
        alert('Successfully created!');
        return 1;
      })
      .catch((e) => {
        console.log('error creating park...', e);
        return -1;
      });
  }

  fadeOut () {
    if (!this.inAnimation){
      this.inAnimation = true;
      document.addEventListener('readystatechange', (event) => {
        if(document.readyState === 'complete'){
          const loader = document.getElementById("pre-loader");
          loader!.setAttribute("class", "fade-out");
          let count = 0;
          setTimeout(() => {
            this.inAnimation = false;
            loader?.remove();
          }, 3000);
        }
      });
  }
}
}


