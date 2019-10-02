import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms';

import { BiodbPageComponent } from './page/page.component';

@NgModule({
  declarations: [BiodbPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [BiodbPageComponent]
})
export class BiodbModule { }
