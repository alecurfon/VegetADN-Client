import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutPageComponent } from './page/page.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [LayoutPageComponent, FooterComponent, HeaderComponent],
  imports: [RouterModule, CommonModule],
  exports: [LayoutPageComponent]
})
export class LayoutModule { }
