import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class EnsureAdmin implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('admin') == "true") {
      return true;
    } else {
      this.router.navigateByUrl('/search');
      return false;
    }
  }
}
