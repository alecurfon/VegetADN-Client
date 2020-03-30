import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  biodatabase: string;
  bioentry: string;

  set(biodb_name, accession?) {
    this.biodatabase = biodb_name;
    if(accession) {
      this.bioentry = accession;
    } else {
      this.bioentry = '';
    }
  }

  get(): any {
    return { biodatabase: this.biodatabase, bioentry: this.bioentry };
  }
}
