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
  pages = 1;
  total = 0;
  type = '';
  form = new FormGroup({
    type : new FormControl('biodatabase'),
    search : new FormControl(''),
    page : new FormControl(1),
    page_size : new FormControl(50)
  });

  serializeItem(object) {
    var result = '';
    for (let key in object) {
      if((key.indexOf('id') > -1) || (object[key] == undefined)) {
        continue;
      }
      result += key + ' : ' + object[key] + ',\t';
    }
    return result;
  }

  changePage(type) {
    switch(type) {
      case 'first':
        this.form.controls['page'].setValue(1);
        break;
      case 'prev':
        this.form.controls['page'].setValue(this.form.value['page'] - 1);
        break;
      case 'next':
        this.form.controls['page'].setValue(this.form.value['page'] + 1);
        break;
      case 'last':
        this.form.controls['page'].setValue(this.pages);
        break;
      default:
        return;
    }
    this.onSubmit();
  }

  search() {
    this.form.controls['page'].setValue(1);
    this.pages = 1;
    this.onSubmit();
  }

  onSubmit() {
    this.type = this.form.value['type'];
    this.restfulApi.search(this.form.value).subscribe(response => {
      this.resultList = response['result'];
      this.pages = response['pages'];
      this.total = response['total'];
      console.log(response);
    }, error => {
      console.log(error);
      alert(error.error['message'] + '\nThe operation could not be completed.');
    });
  }
}
