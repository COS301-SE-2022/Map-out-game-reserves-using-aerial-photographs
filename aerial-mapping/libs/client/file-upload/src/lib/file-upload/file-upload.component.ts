import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private http: HttpClient) {
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
    this.file = event.target.files[0];

    if (this.file) {
      this.fileName = this.file.name;
      this.formData.append('thumbnail', this.file);
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
      // this.uploadToS3(this.file);
      this.imageSplitting(this.file);
    }
    this.submitPressed = true;
  }

  async uploadToS3(file: any) {
    this.fileName = file.name;

    //get secure url from our server
    const { url } = await fetch('http://localhost:4201/').then((res) =>
      res.json()
    );
    console.log(url);

    //Post directly to S3 bucket
    if (file) {
      await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: file,
      });
    } else {
      console.log('File Undefined!');
    }

    const imageURL = url.split('?')[0];
    console.log(imageURL);

    //post request to my server to store any extra data
  }

  imageSplitting(file: File) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = URL.createObjectURL(file);
    const frames = this.extractFramesFromVideo(img.src);
    console.log(frames);
  }

  extractFramesFromVideo = async (videoUrl: string, fps = 25) => {
      // fully download it first (no buffering):
      const videoBlob = await fetch(videoUrl).then((r) => r.blob());
      const videoObjectUrl = URL.createObjectURL(videoBlob);
      const video = document.createElement('video');

      video.src = videoObjectUrl;

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
      canvas.width = w;
      canvas.height = h;

      const frames = [];
      const interval = 50 / fps;
      let currentTime = 0;

      while (currentTime < duration) {
        video.currentTime = currentTime;
        if (context) {
          context.drawImage(video, 0, 0, w, h);
          const base64ImageData = canvas.toDataURL();
          frames.push(base64ImageData);
        }
        currentTime += interval;
      }
      return frames;
  };
}
