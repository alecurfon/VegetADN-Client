import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConsultPageComponent } from './page/page.component';
import { SectionComponent } from './section/section.component';

@NgModule({
  declarations: [ConsultPageComponent,SectionComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [ConsultPageComponent]
})
export class ConsultModule { }
