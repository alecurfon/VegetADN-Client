import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchPageComponent } from './page/page.component';
import { FormComponent } from './components/form/form.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ResultComponent } from './components/result/result.component';

@NgModule({
  declarations: [SearchPageComponent,FormComponent,PaginationComponent,ResultComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [SearchPageComponent]
})
export class SearchModule { }
