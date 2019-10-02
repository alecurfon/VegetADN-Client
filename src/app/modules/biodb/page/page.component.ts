import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { RestfulService } from '@shared/services/restful.service.ts';
import { Biodatabase } from '@shared/db_model/biodatabase.model.ts';

@Component({
  selector: 'biodb-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class BiodbPageComponent implements OnInit {

  constructor(private restfulApi: RestfulService) {}

  biodbList: Array<Biodatabase> = [];
  selectedIndex: number = -1;

  form = new FormGroup({
    name: new FormControl(''),
    authority: new FormControl(''),
    description: new FormControl('')
  });

  ngOnInit() {
    this.resfreshBiodbList();
  }

  selectBiodb(index) {
    this.selectedIndex = index;
    this.form.setValue({
      name: this.biodbList[index].name,
      authority: this.biodbList[index].authority,
      description: this.biodbList[index].description
    })
    this.showBiodbList();
  }

  showBiodbList() {
    var x = document.getElementById("biodbTable")
    if(x.style.visibility == 'visible') {
      x.style.width = '0';
      x.style.visibility = 'hidden';
    } else {
      this.resfreshBiodbList();
      x.style.visibility = 'visible';
      x.style.width = '90vw';
    }
  }

  resfreshBiodbList() {
    this.restfulApi.getBiodb().subscribe(response => {
       this.biodbList = response;
    }, error => {
       alert(error.error['message'] + '\nThe operation could not be completed.');
    });
  }

  createBiodb() {
    this.restfulApi.createBiodb(this.form.value).subscribe(response => {
       alert(response['message']);
       this.form.reset();
    }, error => {
       alert(error.error['message'] + '\nThe operation could not be completed.');
    });
    this.selectedIndex = -1;
  }

  updateBiodb() {
    this.restfulApi.updateBiodb(this.biodbList[this.selectedIndex].biodatabase_id,
      this.form.value).subscribe(response => {
       alert(response['message']);
       this.form.reset();
    }, error => {
       alert(error.error['message'] + '\nThe operation could not be completed.');
    });
    this.selectedIndex = -1;
  }

  removeBiodb(index) {
    if(!confirm("You are trying to remove the "
      + this.biodbList[index].name + " collection.\nAre you sure?")) {
      console.log('Canceled.');
      return;
    }
    this.restfulApi.deleteBiodb(this.biodbList[index].biodatabase_id).subscribe(response => {
       alert(response['message']);
    }, error => {
       alert(error.error['message'] + '\nThe operation could not be completed.');
    });
    this.selectedIndex = -1;
  }
}
