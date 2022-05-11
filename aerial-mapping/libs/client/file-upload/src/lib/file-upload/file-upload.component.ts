import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aerial-mapping-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  constructor() {
    //Code
  }

  ngOnInit(): void {}

  file:any;
  getFile(event:any)
  {
    this.file = event.target.files[0];
    console.log("File: ", this.file)
  }

}
