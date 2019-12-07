import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RestfulService } from '@shared/services/restful.service.ts';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class ConsultPageComponent implements OnInit {

  id:string;
  type:string;
  entity:any;

  constructor(private route: ActivatedRoute, private restfulApi: RestfulService) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.type = this.route.snapshot.paramMap.get('type');
    if(this.type == 'biodatabase') {
      this.biodatabaseInit();
    } else if(this.type == 'bioentry') {
      this.bioentryInit();
    } else if(this.type == 'taxon') {
      this.taxonInit();
    }
  }

  biodatabaseInit() {
    this.restfulApi.getBiodb(this.id).subscribe(response => {
      this.entity = response;
    }, error => {
      alert(error.error['message'] + '\nThe operation could not be completed.');
    });
  }

  bioentryInit() {
    this.restfulApi.getBioentry(this.id).subscribe(response => {
      this.entity = response;
    }, error => {
      alert(error.error['message'] + '\nThe operation could not be completed.');
    });
  }

  taxonInit() {
    this.restfulApi.getTaxon(this.id).subscribe(response => {
      this.entity = response;
    }, error => {
      alert(error.error['message'] + '\nThe operation could not be completed.');
    });
  }

}
