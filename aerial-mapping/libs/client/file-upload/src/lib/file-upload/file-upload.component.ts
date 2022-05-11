import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { FileUploader } from "ng2-file-upload";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'aerial-mapping-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  constructor(private http: HttpClient) {
    //Code
  }

  fileName = "";

  ngOnInit() : void {
    console.log("onInitRan");
  }

  onFileSelected(event: any) {

    const file:File = event.target.files[0];

    if (file)
    {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append("thumbnail", file);
        //const upload$ = this.http.post("/api/thumbnail-upload", formData);
        //upload$.subscribe();
    }
  }

  onClearSelection()
  {
    //location.reload();
    this.ngOnInit();
  }

  // file:any;
  // getFile(event:any)
  // {
  //   this.file = event.target.files[0];
  //   console.log("File: ", this.file)
  // }

}
