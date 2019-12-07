import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';

import { BiodbPageComponent } from './page/page.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [BiodbPageComponent, FormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [BiodbPageComponent]
})
export class BiodbModule { }
