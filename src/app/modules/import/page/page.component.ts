import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { RestfulService } from '@shared/services/restful.service.ts';
import { Biodatabase } from '@shared/db_model/biodatabase.model.ts';

@Component({
  selector: 'import-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class ImportPageComponent implements OnInit {

  constructor(private restfulApi: RestfulService) {}

  fileList: Array<File> = [];
  biodb = new FormControl(-1);
  biodbList: Array<Biodatabase> = [];
  uploading = false;

  ngOnInit() {
    this.restfulApi.getBiodb().subscribe(response => {
      this.biodbList = response;
    }, error => {
      alert(error.error + '\nThe biodatabases could not be loaded.');
    });
  }

  dropHandler(files) {
    for (var f of files) {
      this.fileList.push(f);
    }
  }

  updateRadio(i) {
    this.biodb.setValue(i);
  }

  updateFileList(event) {
    for (var file of event.target.files) {
      this.fileList.push(file);
    }
  }

  removeFile(row) {
    this.fileList.splice(row,1);
  }

  onSubmit() {
    this.uploading=true;
    let biodb_name = this.biodbList[this.biodb.value].name;
    this.restfulApi.upload(biodb_name, this.fileList).subscribe(response => {
      this.uploading=false;
      alert(response);
      this.fileList = [];
    }, error => {
      this.uploading=false;
      alert(error.error + '\nThe operation could not be completed.');
    });
  }
}
