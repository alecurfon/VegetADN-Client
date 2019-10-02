import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConsultPageComponent } from './page/page.component';

@NgModule({
  declarations: [ConsultPageComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ConsultPageComponent]
})
export class ConsultModule { }
