import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { RestfulService } from '@shared/services/restful.service.ts';

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
  result_type = '';
  loading = false;
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
    this.resultList = [];
    this.onSubmit();
  }

  onSubmit() {
    console.log(this.form.value)
    this.result_type = this.form.value['type'];
    this.loading = true;
    this.restfulApi.search(this.form.value).subscribe(response => {
      this.loading = false;
      this.resultList = response['result'];
      this.pages = response['pages'];
      this.total = response['total'];
      console.log(response);
    }, error => {
      this.loading = false;
      console.log(error);
      alert(error.error['message'] + '\nThe operation could not be completed.');
    });
  }
}
