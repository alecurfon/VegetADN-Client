import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RestfulService } from '@shared/services/restful.service.ts';

@Component({
  selector: 'consult-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class ConsultPageComponent implements OnInit {

  id: string;
  type: string;
  entity: any = {};
  relatedType: any = {'biodatabase':'bioentry','bioentry':'biodatabase','taxon':'taxon'};
  relatedList: any[] = [];
  page: number = 1;
  page_size = 10;
  numPages: number = 1;
  numElements: number = 0;

  constructor(private route: ActivatedRoute, private restfulApi: RestfulService) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = params['id'];
        this.type = params['type'];
        this.initialiseState();
      }
    );
  }

  initialiseState() {
    if(this.type == 'biodatabase') {
      this.biodatabaseInit();
    } else if(this.type == 'bioentry') {
      this.bioentryInit();
    } else if(this.type == 'taxon') {
      this.taxonInit();
    }
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  biodatabaseInit() {
    this.restfulApi.getBiodb(this.id).subscribe(
      response => {
        this.entity = response;
      }, error => {
        alert(error.error['message'] + '\nThe operation could not be completed.');
      }
    );
    this.restfulApi.getBioentryList({'biodatabase':this.id, 'page':this.page, 'page_size':this.page_size}).subscribe(
      response => {
        this.relatedList = response['result'];
        this.numPages = response['pages'];
        this.numElements = response['total'];
      }, error => {
        alert(error.error['message'] + '\nThe operation could not be completed.');
      }
    );
  }

  bioentryInit() {
    let biodatabase = this.route.snapshot.params.biodatabase;
    this.restfulApi.getBioentry(this.id, {'biodatabase':biodatabase, 'sequence':'yes'}).subscribe(
      response => {
        this.entity = response;
      }, error => {
        alert(error.error['message'] + '\nThe operation could not be completed.');
      }
    );
    this.restfulApi.getBiodbList({'bioentry':this.id}).subscribe(
      response => {
        this.relatedList = response;
        this.page = 1;
        this.numPages = 1;
        this.numElements = this.relatedList.length;
      }, error => {
        alert(error.error['message'] + '\nThe operation could not be completed.');
      }
    );
  }

  taxonInit() {
    this.restfulApi.getTaxon(this.id).subscribe(response => {
      this.entity = response[0];
      this.relatedList = response.splice(1);
      this.page = 1;
      this.numPages = 1;
      this.numElements = this.relatedList.length;
    }, error => {
      alert(error.error['message'] + '\nThe operation could not be completed.');
    });
  }

  pageEvent(value) {
    this.page = value;
    this.ngOnInit();
  }

  firstElement(): number {
    return ((this.page-1)*this.page_size) +1;
  }

  lastElement(): number {
    let last = (this.firstElement()-1) + (this.page_size-0);
    if(last>this.numElements) {
      return this.numElements;
    }
    return last;
  }

}
