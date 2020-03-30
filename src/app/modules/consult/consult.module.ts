import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '@shared/components/components.module';
import { ConsultPageComponent } from './page/page.component';

@NgModule({
  declarations: [ConsultPageComponent],
  imports: [CommonModule,RouterModule,ComponentsModule],
  exports: [ConsultPageComponent]
})
export class ConsultModule { }
