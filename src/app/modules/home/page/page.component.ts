import { Component } from '@angular/core';

import { SECTIONS } from '@shared/sections';

@Component({
  selector: 'home-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class HomePageComponent {
  sections = SECTIONS;
}
