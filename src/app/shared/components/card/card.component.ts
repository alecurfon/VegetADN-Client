import { Component, Input } from '@angular/core';

import { RestfulService } from '@shared/services/restful.service'
import { DownloadService } from '@shared/services/download.service'

@Component({
  selector: 'card-component',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() type : string;
  @Input() data: any;

  constructor(private restfulApi: RestfulService, private download: DownloadService) {}

  prepareDownload() {
    if(this.type == 'biodatabase') {
      this.download.set(this.data.name);
    } else if(this.type == 'bioentry') {
      this.download.set(this.data.biodatabase.name, this.data.accession);
    }
  }
}
