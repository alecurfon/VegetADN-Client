import { Component, Input } from '@angular/core';

@Component({
  selector: 'consult-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent {

  @Input() type : string;
  @Input() data: any;

}
