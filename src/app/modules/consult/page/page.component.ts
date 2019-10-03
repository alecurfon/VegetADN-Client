import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { RestfulService } from '@shared/services/restful.service.ts';

// import { Biodatabase } from '@shared/db_model/biodatabase.model.ts';
// import { Bioentry } from '@shared/db_model/bioentry.model.ts';
// import { Biosequence } from '@shared/db_model/biosequence.model.ts';
// import { Taxon } from '@shared/db_model/taxon.model.ts';
// import { TaxonName } from '@shared/db_model/taxon_name.model.ts';


@Component({
  selector: 'consult-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class ConsultPageComponent {

  constructor(private restfulApi: RestfulService) {}

  resultList: Array<any> = [];
  form = new FormGroup({
    type : new FormControl('biodatabase'),
    search : new FormControl('')
  });

  onSubmit() {
    this.restfulApi.search(this.form.value).subscribe(response => {
      this.resultList = response;
      console.log(response);
    }, error => {
      console.log(error);
      alert(error.error['message'] + '\nThe operation could not be completed.');
    });
  }
}
