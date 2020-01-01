import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestfulService {

  baseUrl: string = environment.api_url;

  constructor(private http: HttpClient) { }

  private static buildTokenHeaders(contentType?: boolean) {
    let headers = new HttpHeaders();
    if (contentType) { headers = headers.append('Content-Type', 'application/json'); }
    let value;
    if ((value = localStorage.getItem('token')) != null) {
      headers = headers.append('Authorization', 'Bearer ' + value);
    }
    return headers;
  }

  // Import files

  upload(biodb, fileList): Observable<any> {
    var data = new FormData();
    for (let f of fileList) {
      data.append('file', f, f.filename);
    }
    return this.http.post(this.baseUrl + '/upload/' + biodb, data,
      {headers:RestfulService.buildTokenHeaders()});
  }

  download(params): Observable<any> {
    return this.http.get(this.baseUrl + '/download',
      {
        headers:RestfulService.buildTokenHeaders(),
        params:params,
        responseType:'text'
      });
  }

  // Search

  prepareSearch(type): Observable<any> {
    return this.http.put(this.baseUrl + '/search?type=' + type, {},
      {headers:RestfulService.buildTokenHeaders()});
  }

  search(formData): Observable<any> {
    return this.http.get(this.baseUrl + '/search',
      {
        headers:RestfulService.buildTokenHeaders(),
        params:formData
      });
  }

  // Taxon

  getTaxon(id?): Observable<any> {
    let url = this.baseUrl + '/taxon';
    if(id != undefined) {
      url += '/' + id;
    }
    return this.http.get(url, {headers:RestfulService.buildTokenHeaders()});
  }

  // Bioentry

  getBioentry(id, args?): Observable<any> {
    var options = {};
    if(args != undefined) {
      options['params'] = args;
    }
    options['headers'] = RestfulService.buildTokenHeaders();
    return this.http.get(this.baseUrl + '/bioentry/' + id, options);
  }

  getBioentryList(args?): Observable<any> {
    var options={};
    if(args != undefined) {
      options['params'] = args;
    }
    options['headers'] = RestfulService.buildTokenHeaders();
    return this.http.get(this.baseUrl + '/bioentry', options);
  }

  // Biodatabases

  getBiodb(id, args?): Observable<any> {
    var options={};
    if(args != undefined) {
      options['params'] = args;
    }
    options['headers'] = RestfulService.buildTokenHeaders();
    return this.http.get(this.baseUrl + '/biodatabase/' + id, options);
  }

  getBiodbList(args?): Observable<any> {
    var options={};
    if(args != undefined) {
      options['params'] = args;
    }
    options['headers'] = RestfulService.buildTokenHeaders();
    return this.http.get(this.baseUrl + '/biodatabase', options);
  }

  createBiodb(data): Observable<any> {
    return this.http.post(this.baseUrl + '/biodatabase', data,
      {headers:RestfulService.buildTokenHeaders(true)});
  }

  updateBiodb(id, data): Observable<any> {
    return this.http.put(this.baseUrl + '/biodatabase/' + id, data,
      {headers:RestfulService.buildTokenHeaders(true)});
  }

  deleteBiodb(id): Observable<any> {
    return this.http.delete(this.baseUrl + '/biodatabase/' + id,
      {headers:RestfulService.buildTokenHeaders()});
  }
}
