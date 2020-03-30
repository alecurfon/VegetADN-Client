import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestfulService } from './restful.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL: string = 'http://localhost:5000/auth';
  private headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {}

  login(user): Observable<any> {
    let url: string = this.BASE_URL + '/login';
    return this.http.post(url, user, {headers: this.headers});
  }

  logout(): Observable<any> {
    let token = localStorage.getItem('token');
    let url: string = this.BASE_URL + '/logout';
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '
      + localStorage.getItem('token'));
    return this.http.post(url, {}, {headers: headers});
  }
}
