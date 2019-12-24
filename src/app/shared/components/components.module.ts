import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardComponent } from './card/card.component';
import { DownloadComponent } from './download/download.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [CardComponent,DownloadComponent,PaginationComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [CardComponent,DownloadComponent,PaginationComponent]
})
export class ComponentsModule { }
