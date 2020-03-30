import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DirectivesModule } from '@shared/directives/directives.module';
import { ImportPageComponent } from './page/page.component';

@NgModule({
  declarations: [ImportPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule
  ],
  exports: [ImportPageComponent]
})
export class ImportModule { }
