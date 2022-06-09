import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientApiService } from '@aerial-mapping/client/shared/services';

interface Park {
  value: string;
  viewValue: string;
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
  //Variables 'n shiet
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
    // {value: 'Default-0', viewValue: 'Choose a Park'},
    {value: 'Somkhanda-1', viewValue: 'Somkhanda'},
    {value: 'RietVlei-2', viewValue: 'Riet Vlei'},
  ];

  flight: FlightType[] = [
    // {value: 'Default-0', viewValue: 'Choose a Park'},
    {value: 'Drone-0', viewValue: 'Drone'},
    {value: 'Propeller Plane-1', viewValue: 'Propeller Plane'},
  ];

  constructor(private apiService: ClientApiService) {
    /*     const imageForm = document.querySelector("#imageForm");
    const imageInput = document.querySelector("#fileUpload");

    imageForm?.addEventListener("submit", async event =>{
      event.preventDefault();
      this.uploadFileLocal();
      console.log(this.file?.name);
    }) */
  }

  uploadFileLocal() {
    console.log('Submit button pressed');
    this.submitBtnPressed();
  }

  onFileSelected(event: any) {
    this.submitPressed = false;
    console.log('File staged!');
    console.log(this.parks[0].viewValue);
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
    if (this.file) {
      this.imageSplitting(this.file);
    }
    this.submitPressed = true;
  }

  async uploadToS3(
    collectionID: number,
    bucket_name: string,
    file_name: string,
    file: any
  ) {
    this.apiService
      .uploadImage(collectionID, bucket_name, file_name, file)
      .subscribe({
        error: (err) => {
          console.log(err);
        },
      });
  }

  imageSplitting(file: File) {
    //Load video
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = URL.createObjectURL(file);

    // extract frames (video, interval(time), quality(0-1), final width, final height)
    const interval = 1.0;
    const quality = 1.0;
    const finalWidth = 1920;
    const finalHeight = 1080;
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
      // this.apiService.createBucket(1,"",1,id).subscribe({
      //   error: (err) => {
      //     console.log(err);
      //   }
      // });
      this.apiService.getImageCollections().subscribe({
        next: (data) => {
          console.log(data);
          const id = data.data.getImageCollections.length+1;
          this.apiService.createImageCollection(1, '', 1).subscribe({
            error: (err) => {
              console.log(err);
            }
          });
    
          const name = "test";
          for(let i = 0; i < frames.length; i++) {
            this.uploadToS3(id, "dylpickles-image-bucket", name+"-frame-"+i+".png", frame);
          }
        },
        error: (err) => {
          console.log(err);
        }
      });


      
      // console.log(frames);
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
