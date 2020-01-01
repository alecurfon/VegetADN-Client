import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class LoginRedirect implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('token') != undefined) {
      this.router.navigateByUrl('/search');
      return false;
    } else {
      return true;
    }
  }
}
