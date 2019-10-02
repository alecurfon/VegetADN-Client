import { Component, Input } from '@angular/core';

@Component({
  selector: 'home-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent {
  @Input() value: string;
  @Input() title: string;
  @Input() description: string;
}
