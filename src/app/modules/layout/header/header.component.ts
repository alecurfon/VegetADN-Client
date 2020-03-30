import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private auth: AuthService, private router: Router) {}

  username: string = localStorage.getItem('username');
  admin: string = localStorage.getItem('admin');

  onLogout() {
    this.auth.logout().subscribe();
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    this.router.navigateByUrl('/login');
  }
}
