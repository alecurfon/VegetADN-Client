import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'login-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class LoginPageComponent {

  login = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router, private auth: AuthService) {}

  onSubmit() {
    this.auth.login(this.login.value).subscribe(
      (response) => {
        localStorage.setItem('username', response.username);
        localStorage.setItem('admin', response.admin);
        localStorage.setItem('token', response.auth_token);
      }, (error) => {}, () => {
        this.router.navigateByUrl('/search');
      }
    );
  }
}
