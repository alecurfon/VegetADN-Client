import { Component, Input } from '@angular/core';

@Component({
  selector: 'search-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {

  @Input() type : string;
  @Input() data: any;

}
