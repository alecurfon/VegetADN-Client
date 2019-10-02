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
  biodb = new FormControl(0);
  biodbList: Array<Biodatabase> = [];

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
    let biodb_name = this.biodbList[this.biodb.value].name;
    this.restfulApi.importFiles(biodb_name, this.fileList).subscribe(response => {
      alert(response);
      this.fileList = [];
    }, error => {
      alert(error.error + '\nThe operation could not be completed.');
    });
  }
}
