import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'search-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  @Output() submit = new EventEmitter<string>();
  @Output() download = new EventEmitter<string>();
  form = new FormGroup({
    type : new FormControl('biodatabase'),
    search : new FormControl(''),
    page : new FormControl(1),
    page_size : new FormControl(50)
  });
  format = new FormControl('fasta');

  search() {
    this.submit.emit();
  }

  export() {
    this.download.emit(this.format.value);
  }
}
