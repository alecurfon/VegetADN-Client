import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'login-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class LoginPageComponent {

  login = new FormGroup({
    userCtl: new FormControl(''),
    passwdCtl: new FormControl('')
  });

  onSubmit() {
    console.warn(this.login.value);
    if (this.login.valid) {
      console.log("Form Submitted!");
      this.login.reset();
    } else {
      console.log("Form Incomplite!");
    }
  }
}
