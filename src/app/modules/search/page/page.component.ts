import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';

import { FormComponent } from '../components/form/form.component';
import { RestfulService } from '@shared/services/restful.service.ts';

@Component({
  selector: 'search-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class SearchPageComponent implements AfterViewInit {

  @ViewChild(FormComponent, {static: false}) searchForm;
  searchResult: Array<any> = [];
  searchValues = {'page': 1, 'page_size': 50, 'type': 'biodatabase', 'search': ''};
  numElements: number = 0;
  numPages: number = 1;
  loading = false;
  // updated = false;

  constructor(private restfulApi: RestfulService, private route: ActivatedRoute) {
    let preset = this.route.snapshot.queryParams.type;
    switch(preset) {
      case 'biodatabase':
      case 'bioentry':
      case 'taxon':
        this.searchValues.type = preset;
        break;
    }
  }

  ngAfterViewInit() {
    this.searchForm.form.setValue(this.searchValues);
  }

  refreshSearch() {
    this.loading = true;
    this.restfulApi.prepareSearch(this.searchForm.form.value.type).subscribe(response => {
      this.loading = false;
      // this.updated = true;
    }, error => {
      this.loading = false;
      alert(error.error['message'] + '\nCould not refresh properly.');
    });
  }

  pageEvent(value) {
    this.searchValues.page = value;
    this.onSubmit();
  }

  searchEvent() {
    this.searchResult = [];
    this.searchValues = this.searchForm.form.value;
    this.searchValues.page = 1;
    this.onSubmit();
  }

  downloadEvent(format) {
    this.loading = true;
    this.restfulApi.download({'type': 'biodatabase', 'id': 'default', 'filename': 'file', 'format': format})
    .subscribe(
      data => {
        saveAs(data, 'filename');
        this.loading = false;
      }, error => {
        this.loading = false;
        alert(error.error['message'] + '\nThe operation could not be completed.');
    });
  }

  onSubmit() {
    this.loading = true;
    this.restfulApi.search(this.searchValues).subscribe(response => {
      this.loading = false;
      this.searchResult = response['result'];
      this.numPages = response['pages'];
      this.numElements = response['total'];
    }, error => {
      this.loading = false;
      alert(error.error['message'] + '\nThe operation could not be completed.');
    });
  }

  firstElement(): number {
    return ((this.searchValues.page-1)*this.searchValues.page_size) +1;
  }

  lastElement(): number {
    let last = (this.firstElement()-1) + (this.searchValues.page_size-0);
    if(last>this.numElements) {
      return this.numElements;
    }
    return last;
  }
}
