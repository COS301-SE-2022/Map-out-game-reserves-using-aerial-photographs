import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  APIService,
  CreateImagesInput,
  CreateImageCollectionInput,
  CreateFlightDetailsInput,
  CreatePendingJobsInput,
  CreateGameParkInput,
} from 'src/app/API.service';
import { ControllerService } from 'src/app/api/controller/controller.service';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fromBlob } from 'image-resize-compress';
import { MatDialog } from '@angular/material/dialog';
import { ParksDialogComponent } from './parks-dialog/parks-dialog.component';
import { PublishCommand } from '@aws-sdk/client-sns';
import { SNSClient } from '@aws-sdk/client-sns';

const REGION = 'sa-east-1';
let snsClient = new SNSClient({
  apiVersion: '2010-03-31',
  region: REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
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
  @ViewChild('parks') parks!: ElementRef<HTMLInputElement>;

  title = 'file-upload-component';

  requiredFileType: string | undefined;
  submitPressed = false;
  fileName = '';
  files: File[] = [];
  formData = new FormData();
  frameCount = 0;
  uploadCount = 0;
  splittingProgress = 0;
  uploadingProgress = 0;
  finalWidth = 0;
  finalHeight = 0;
  name: string = '';
  location: string = '';
  address: string = '';

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
  parksList: Park[] = [];

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
    this.outputs = [];

    //loader
    this.inAnimation = false;
    this.fadeOut();

    this.api.ListGameParks().then((event: any) => {
      for (let i = 0; i < event.items.length; i++) {
        const element = event.items[i];
        this.parksList.push({
          value: element?.parkID,
          viewValue: element?.park_name,
        });
      }
    });
  }

  //gets value from resolution slider
  getSliderValue(event: any) {
    this.sliderValue = event.value;
  }

  //creats a map collection on the database
  uploadFileLocal(ev: Event) {
    ev.preventDefault();
    this.frameCount = 0;
    this.uploadCount = 0;
    this.splittingProgress = 0;
    this.uploadingProgress = 0;

    // get the id of the park
    let e = document.getElementById('parks') as HTMLSelectElement;
    let sel = e.selectedIndex;
    let opt = e.options[sel];
    let parkSel = opt.value;

    //get the flying option
    e = document.getElementById('fType') as HTMLSelectElement;
    sel = e.selectedIndex;
    opt = e.options[sel];
    let typeSel = opt.value;

    //get the height
    const flight_height = document.getElementById('height') as HTMLInputElement;
    const height = flight_height?.value;

    if (this.files[0] && parkSel != '' && typeSel != '' && height != '') {
      const h: number = +height;
      let promises: Promise<any>[] = [];

      //create a flight object
      const flight: CreateFlightDetailsInput = {
        flightID: uuidv4(),
        flight_height: h,
        flight_type: typeSel,
      };

      //create flight in the database
      this.api
        .CreateFlightDetails(flight)
        .catch((e) => {
          console.log(e);
        });

      const newColID = uuidv4();

      const collectionName = (
        document.getElementById('collectionName') as HTMLInputElement
      ).value;

      const imageCollection: CreateImageCollectionInput = {
        collectionID: newColID,
        parkID: parkSel,
        flightID: flight.flightID,
        completed: false,
        pending: true,
        error: false,
        collectionName: collectionName,
      };

      this.api
        .CreateImageCollection(imageCollection)
        .then(() => {
          //disable navbar when system is uploading file(s)
          document.getElementById('buttons')!.style.display = 'none';

          if (this.files.length > 1) {
            promises.push(this.uploadImages(newColID));
          } else {
            promises.push(this.uploadVideo(newColID));
          }

          //create a pending job in the PendingJobs table, with jobID = this collectionID
          const pendingJob: CreatePendingJobsInput = {
            jobID: newColID,
            busy: false,
            collectionID: imageCollection.collectionID,
          };
          this.api.CreatePendingJobs(pendingJob).then(() => {
            //wait for all promises to resolve
            Promise.all(promises).then(async () => {
              //publish SNS message to 'stitch_jobs' topic with the jobID - once all image uploads are complete
              await this.publishSNSNotification();

              //route to map catalogue page
              document.getElementById('buttons')!.style.display = 'block';
              if (document.getElementById('successful-submit')) {
                document.getElementById('successful-submit')!.innerHTML =
                  '<h4 class="variable" style="color: #5f5f5f;">You can now navigate to the map catalogue to see the result of your upload</h4>';
              }
              this.outputs = Array.from(
                document.getElementsByClassName(
                  'videoSplitting'
                ) as HTMLCollectionOf<HTMLElement>
              );

              if (this.outputs != null) {
                this.outputs.forEach((output) => {
                  if (output != null) {
                    output.innerHTML = '';
                  }
                });
              }
            });
          });
        })
        .catch((e) => {
          console.log(e);
        });
      this.submitPressed = true;
    } else {
      this.snackBar.open('Fill in all the details about the upload.', '❌');
    }
  }

  //changes the view to select data for the map
  onFileSelected(event: any) {
    this.submitPressed = false;
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

  //removes all selected images and videos
  clearSelection() {
    window.location.reload();
  }

  //uploads images to S3
  async uploadImages(collectionID: string): Promise<any> {
    if (document.getElementById('video') != null) {
      //for testing purposes
      document.getElementById('video')!.innerHTML = '';
    }

    return new Promise<any>(async (resolve) => {
      let promises = [];
      const frames = [];
      this.frameCount = this.files.length;
      for (var i = 0; i < this.files.length; i++) {
        const inp: CreateImagesInput = {
          imageID: uuidv4(),
          collectionID: collectionID,
          bucket_name: 'aerial-mapping-bucket80642-dev',
          file_name: collectionID + '-frame-' + i + '.png',
        };

        frames[i] = new File([this.files[i]], inp.imageID + '.png');
        promises.push(this.api.CreateImages(inp));
        promises.push(this.uploadToS3(collectionID, inp.imageID, frames[i]));
      }
      promises.push(this.makeThumbnails(collectionID, frames));

      Promise.all(promises).then((resp: any) => {
        resolve(resp);
      });
    });
  }

  //splits video into images and uploads them to S3
  uploadVideo(collectionID: string): Promise<any> {
    return new Promise<any>(async (resolve) => {
      let promises: Promise<any>[] = [];
      //Load video
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = URL.createObjectURL(this.files[0]);
      const interval = 1; //fps
      const quality = 1.0;
      await this.extractFramesFromVideo(
        img.src,
        interval,
        quality,
        this.finalWidth,
        this.finalHeight
      ).then(async (frames) => {
        this.frameCount = frames.length;
        var fCount = 0;

        //create an image collection
        for (let i = 0; i < frames.length; i++) {
          const inp: CreateImagesInput = {
            imageID: uuidv4(),
            collectionID: collectionID,
            bucket_name: 'dylpickles-image-bucket',
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

  //uploads a file to S3
  uploadToS3(collectionID: string, imageID: string, file: any): Promise<any> {
    return new Promise((resolve, reject) => {
      //converting blob to png
      var newFile = new File([file], imageID + '.png');
      //upload png to S3
      this.apiController
        .S3upload(imageID, collectionID, 'images', newFile, 'image/png')
        .then((data: any) => {
          this.uploadCount++;
          this.uploadingProgress = Math.round(
            (this.uploadCount / this.frameCount) * 100
          );
          if (this.uploadingProgress > 100) {
            this.uploadingProgress = 100;
          }
          resolve(data);
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    });
  }

  //splits video into frames
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
      }
      this.splittingProgress = Math.round((currentTime / duration) * 100);
      currentTime += interval;
    }
    this.splittingProgress = 100;
    return frames;
  };

  //resizes an images resolution
  async resizeImage(blobFile: File, width: number, height: number) {
    // quality value for webp and jpeg formats.
    const quality = 80;
    // file format: png, jpeg, bmp, gif, webp. If null, original format will be used.
    const format = 'webp';
    // note only the blobFile argument is required
    return await fromBlob(blobFile, quality, width, height, format);
  }

  //takes 3 images, resizes them and uploads them to S3 as thumbnails
  async makeThumbnails(collectionID: string, frames: any[]) {
    return new Promise(async (resolve) => {
      let promises: Promise<any>[] = [];
      var thumbnails: any[] = [];
      thumbnails.push(frames[0]);
      thumbnails.push(frames[Math.round(frames.length / 2)]);
      thumbnails.push(frames[frames.length - 1]);

      for (var i = 0; i < 3; i++) {
        var newBlob = this.resizeImage(thumbnails[i], 240, 180);
        await newBlob.then((newBlob) => {
          var newFile = new File([newBlob], 'thumbnail_' + i + '.png');

          promises.push(
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
                this.uploadingProgress = Math.round(
                  (this.uploadCount / this.frameCount) * 100
                );
                if (this.uploadingProgress > 100) {
                  this.uploadingProgress = 100;
                }
              })
              .catch((e) => {
                console.log(e);
              })
          );
        });
      }

      Promise.all(promises).then((res: any) => {
        resolve(res);
      });
    });
  }

  //publishesthat the job is available for stitching
  async publishSNSNotification() {
    const publishParams = {
      Message: 'New pending stitch job published!',
      TopicArn: 'arn:aws:sns:sa-east-1:870416143884:stitch_jobs',
    };
    try {
      const data = await snsClient.send(new PublishCommand(publishParams));
      return data; //For unit tests
    } catch (e) {
      console.log(e);
      return e; //For unit tests
    }
  }

  //opens dialog to add a new park
  openParksDialog(): void {
    const dialogRef = this.dialog.open(ParksDialogComponent, {
      width: '500px',
      data: { name: '', location: '', address: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == undefined) {
        return;
      }
      this.name = result.name;
      this.location = result.location;
      this.address = result.address;
      this.createPark();
    });
  }
  //this is park stuff that might work
  private createPark(): void {
    const newPark: CreateGameParkInput = {
      parkID: uuidv4(),
      park_name: this.name,
      park_location: this.location,
      park_address: this.address,
    };
    this.api
      .CreateGamePark(newPark)
      .then(() => {
        alert('Successfully created!');
        return 1;
      })
      .catch((e) => {
        console.log('error creating park...', e);
        return -1;
      });
  }

  //closes the loading screen
  fadeOut() {
    if (!this.inAnimation) {
      this.inAnimation = true;
      document.addEventListener('readystatechange', () => {
        if (document.readyState === 'complete') {
          const loader = document.getElementById('pre-loader');
          loader!.setAttribute('class', 'fade-out');
          setTimeout(() => {
            this.inAnimation = false;
            loader?.remove();
          }, 3000);
        }
      });
    }
  }
}
