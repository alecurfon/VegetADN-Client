import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DownloadService } from '@shared/services/download.service';
import { RestfulService } from '@shared/services/restful.service';

@Component({
  selector: 'download-form',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent {

  @Input() download = true;
  @Output() submit = new EventEmitter<number>();
  form = new FormGroup({
    filename: new FormControl(''),
    format: new FormControl('fasta')
  });
  downloading = false;

  constructor(private downloadService: DownloadService, private restfulApi: RestfulService) {}

  onSubmit() {
    this.submit.emit(this.form.value);
    if(this.download) {
      this.downloading=true;
      let values = this.downloadService.get();
      let response = new Blob();
      this.restfulApi.download(
        {'biodatabase': values.biodatabase, 'bioentry': values.bioentry,
        'filename': this.form.value.filename, 'format': this.form.value.format})
        .subscribe(
          info => {
            response = new Blob([response, info], {'type': 'arraybuffer'});
          },
          error => {
            alert(error.error['message'] + '\nThe download could not be completed.');
          },
          () => {
            saveAs(response, this.form.value.filename);
            this.downloading=false;
          }
        );
    }
  }
}
