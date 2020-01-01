import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { LoginPageComponent } from './page/page.component';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [ReactiveFormsModule],
  exports: [LoginPageComponent]
})
export class LoginModule { }
