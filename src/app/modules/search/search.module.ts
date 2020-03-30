import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchPageComponent } from './page/page.component';
import { ComponentsModule } from '@shared/components/components.module';

@NgModule({
  declarations: [SearchPageComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule,ComponentsModule],
  exports: [SearchPageComponent]
})
export class SearchModule { }
