import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MydropDirective } from './mydrop.directive';

@NgModule({
  declarations: [MydropDirective],
  imports: [
    CommonModule
  ],
  exports: [
    MydropDirective
  ]
})
export class DirectivesModule { }
