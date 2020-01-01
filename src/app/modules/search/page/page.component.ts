import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';

import { FormGroup, FormControl } from '@angular/forms';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { RestfulService } from '@shared/services/restful.service';

@Component({
  selector: 'search-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class SearchPageComponent implements AfterViewInit {

  searchResult: Array<any> = [];
  searchForm = new FormGroup({
    type : new FormControl('biodatabase'),
    search : new FormControl(''),
  });
  searchValues = {'page': 1, 'page_size': 10, 'type': 'biodatabase', 'search': ''};
  numElements: number = 0;
  numPages: number = 1;
  loading = true;

  constructor(private restfulApi: RestfulService, private route: ActivatedRoute) {
    let preset = this.route.snapshot.queryParams.type;
    switch(preset) {
      case 'biodatabase':
      case 'bioentry':
      case 'taxon':
        this.searchForm.setValue({'type':preset,'search':''});
        break;
    }
  }

  ngAfterViewInit() {
    this.restfulApi.prepareSearch('biodatabase').subscribe(
      response => {}, error => {
      alert(error.error['message'] + '\nCould not update the search engine.\nIf the search results seem outdated,\ntry reloading the page.');
      });
    this.restfulApi.prepareSearch('bioentry').subscribe(
      response => {}, error => {
        alert(error.error['message'] + '\nCould not be refreshed the search engine.\nIf the search results look deprecated,\ntry reloading the page.');
      });
    this.searchEvent();
  }

  pageEvent(value) {
    this.searchValues.page = value;
    this.search();
  }

  searchEvent() {
    this.searchResult = [];
    this.searchValues = this.searchForm.value;
    this.searchValues.page = 1;
    this.searchValues.page_size = 10;
    this.search();
  }

  downloadAllEvent(values) {
    for(var entity of this.searchResult) {
      this.loading = true;
      let response = new Blob();
      let filename = entity.name + '_download.' + values.format;
      if(values.filename!='') {
        filename = values.filename + '_' + filename;
      }
      this.restfulApi.download({'biodatabase': entity.name, 'filename': filename, 'format': values.format})
        .subscribe(
          data => {
            response = new Blob([response, data], {'type': 'arraybuffer'});
          },
          error => {
            alert(error.error['message'] + '\nThe operation could not be completed.');
          },
          () => {
            this.loading = false;
            saveAs(response, filename);
          }
        );
    }
  }

  search() {
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
