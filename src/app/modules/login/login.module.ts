import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { LoginPageComponent } from './page/page.component';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [RouterModule, ReactiveFormsModule],
  exports: [LoginPageComponent]
})
export class LoginModule { }
