import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from './page/page.component';
import { SectionComponent } from './section/section.component';

@NgModule({
  declarations: [HomePageComponent, SectionComponent],
  imports: [CommonModule, RouterModule],
  exports: [HomePageComponent]
})
export class HomeModule { }
