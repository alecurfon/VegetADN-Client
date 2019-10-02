import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestfulService {

  baseUrl: string = environment.api_url;

  constructor(private http: HttpClient) { }

  private buildHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return headers;
  }

  // Import files

  importFiles(biodb, fileList): Observable<any> {
    var data = new FormData();
    for (let f of fileList) {
      data.append('file', f);
    }
    return this.http.post(this.baseUrl + '/upload/' + biodb, data,
      { headers: this.buildHeaders() });
  }

  // Search

  search(type, concept): Observable<any> {
      return this.http.get(this.baseUrl + '/search/' + type, {'search' : concept});
  }

  // Bioentry

  getBioentry(id?): Observable<any> {
    if(id != undefined) {
      return this.http.get(this.baseUrl + '/bioentry/' + id);
    }
    return this.http.get(this.baseUrl + '/bioentry');
  }

  // Taxon

  getTaxon(id?): Observable<any> {
    if(id != undefined) {
      return this.http.get(this.baseUrl + '/taxon/' + id);
    }
    return this.http.get(this.baseUrl + '/taxon');
  }

  // Biodatabases

  getBiodb(id?): Observable<any> {
    if(id != undefined) {
      return this.http.get(this.baseUrl + '/biodatabase/' + id);
    }
    return this.http.get(this.baseUrl + '/biodatabase');
  }

  createBiodb(data): Observable<any> {
    return this.http.post(this.baseUrl + '/biodatabase', data);
  }

  updateBiodb(id, data): Observable<any> {
    return this.http.put(this.baseUrl + '/biodatabase/' + id, data);
  }

  deleteBiodb(id): Observable<any> {
    return this.http.delete(this.baseUrl + '/biodatabase/' + id);
  }
}
