import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'pagination-component',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input() items: Array<any>;
  @Input() itemsType: string;
  @Input() page: number;
  @Input() pages: number;
  @Output() change = new EventEmitter<number>();

  changePage(cmd) {
    switch(cmd) {
      case 'first':
        this.page = 1;
        break;
      case 'prev':
        this.page = this.page - 1;
        break;
      case 'next':
        this.page = this.page + 1;
        break;
      case 'last':
        this.page = this.pages;
        break;
      default:
        return;
    }
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    this.change.emit(this.page)
  }
}
