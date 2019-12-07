import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultPageComponent } from './page/page.component';

@NgModule({
  declarations: [ConsultPageComponent],
  imports: [
    CommonModule
  ],
  exports: [ConsultPageComponent]
})
export class ConsultModule { }
