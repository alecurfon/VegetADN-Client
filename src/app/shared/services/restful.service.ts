import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestfulService {

  baseUrl: string = environment.api_url;

  constructor(private http: HttpClient) { }

  private static httpOptions(headersDict, paramsDict) {
    // // httpOptions {
    // //   headers?: HttpHeaders | { [header: string]: string | string[]; };
    // //   observe?: "body";
    // //   params?: HttpParams | { [param: string]: string | string[]; };
    // //   reportProgress?: boolean;
    // //   responseType: "arraybuffer";
    // //   withCredentials?: boolean;
    // // }
    // let headers = new HttpHeaders();
    // for(var key in headersDict) {
    //   headers = headers.append(key, headersDict[key]);
    // }
    // let params = new HttpParams();
    // for(var key in paramsDict) {
    //   params = params.append(key, paramsDict[key]);
    // }
    // console.log({'headers': headers, 'params': params});
    return {'headers':headersDict,'params':paramsDict};
  }

  // Import files

  upload(biodb, fileList): Observable<any> {
    var data = new FormData();
    for (let f of fileList) {
      data.append('file', f, f.filename);
    }
    return this.http.post(this.baseUrl + '/upload/' + biodb, data);
  }

  download(params): Observable<any> {
    let options = RestfulService.httpOptions({"Content-Type": "application/json"}, params);
    options['responseType'] = "text/plain";
    return this.http.get(this.baseUrl + '/download', options);
  }

  // Search

  prepareSearch(type): Observable<any> {
    return this.http.put(this.baseUrl + '/search?type=' + type, {});
  }

  search(formData): Observable<any> {
    return this.http.get(this.baseUrl + '/search', {'params':formData});
  }

  // Taxon

  getTaxon(id?): Observable<any> {
    if(id != undefined) {
      return this.http.get(this.baseUrl + '/taxon/' + id);
    }
    return this.http.get(this.baseUrl + '/taxon');
  }

  // Bioentry

  getBioentry(id, args?): Observable<any> {
    var options={};
    if(args != undefined) {
      options={'params':args};
    }
    return this.http.get(this.baseUrl + '/bioentry/' + id, options);
  }

  getBioentryList(args?): Observable<any> {
    var options={};
    if(args != undefined) {
      options={'params':args};
    }
    return this.http.get(this.baseUrl + '/bioentry', options);
  }

  // Biodatabases

  getBiodb(id, args?): Observable<any> {
    var options={};
    if(args != undefined) {
      options={'params':args};
    }
    return this.http.get(this.baseUrl + '/biodatabase/' + id, options);
  }

  getBiodbList(args?): Observable<any> {
    var options={};
    if(args != undefined) {
      options={'params':args};
    }
    return this.http.get(this.baseUrl + '/biodatabase', options);
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
