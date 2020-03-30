import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormComponent } from '../form/form.component';
import { RestfulService } from '@shared/services/restful.service';

@Component({
  selector: 'biodb-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class BiodbPageComponent implements OnInit {

  constructor(private restfulApi: RestfulService) {}

  @ViewChild(FormComponent, {static: false}) formDialog;
  biodbList: Array<any> = [];
  selectedIndex: number = -1;

  ngOnInit() {
    this.refreshBiodbList();
  }

  refreshBiodbList() {
    this.restfulApi.getBiodbList({'count':'yes'}).subscribe(
      response => {
        this.biodbList = response;
      }, error => {
        alert(error.error['message'] + '\nThe list of collections could not be loaded.');
      }
    );
  }

  selectBiodb(index) {
    this.selectedIndex = index;
    if(index<0) {
      this.formDialog.form.setValue({'name':'', 'authority':'', 'description':''});
    } else {
      let x = this.biodbList[index]
      this.formDialog.form.setValue({'name': x.name, 'authority': x.authority, 'description': x.description});
    }
  }

  formSubmitted(values) {
    if(this.selectedIndex<0) {
      this.createBiodb(values);
    } else {
      this.updateBiodb(values);
    }
  }

  createBiodb(values) {
    this.restfulApi
      .createBiodb({'name':values.name, 'authority':values.authority, 'description': values.description})
      .subscribe(
        response => {
          this.refreshBiodbList();
          alert(response['message']);
        }, error => {
          alert(error.error['message'] + '\nThe collection could not be created.');
        }
      );
  }

  updateBiodb(values) {
    this.restfulApi
      .updateBiodb(this.biodbList[this.selectedIndex].name,
        {'name':values.name, 'authority':values.authority, 'description': values.description})
      .subscribe(
        response => {
          this.refreshBiodbList();
          alert(response['message']);
        }, error => {
          alert(error.error['message'] + '\nThe collection could not be updated.');
        }
      );
  }

  removeBiodb(index) {
    if(!confirm("You are trying to remove the '"
      + this.biodbList[index].name + "' collection.\nAre you sure?")) {
      return;
    }
    this.restfulApi.deleteBiodb(this.biodbList[index].name)
      .subscribe(
        response => {
          this.refreshBiodbList();
          alert(response['message']);
        }, error => {
          alert(error.error['message'] + '\nThe collection could not be removed.');
        }
      );
  }
}
