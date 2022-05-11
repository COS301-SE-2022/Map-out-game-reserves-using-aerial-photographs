import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { FileUploader } from "ng2-file-upload";
import { finalize, Observable, Subscription } from "rxjs";
import { HttpClient, HttpEventType } from "@angular/common/http";

@Component({
  selector: 'aerial-mapping-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})

//https://blog.angular-university.io/angular-file-upload/

export class FileUploadComponent {

  requiredFileType : string | undefined;

  fileName = '';
  uploadProgress: number | undefined;
  uploadSub: Subscription | undefined;

  constructor(private http: HttpClient) {
  }

  onFileSelected(event : any) {
    const file:File = event.target.files[0];

    if (file) {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append("thumbnail", file);

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
    }
}

cancelUpload() {
  if(this.uploadSub){
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

}
