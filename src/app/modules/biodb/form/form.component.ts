import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'biodb-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  @Output() submit = new EventEmitter<number>();
  form = new FormGroup({
    name: new FormControl(''),
    authority: new FormControl(''),
    description: new FormControl('')
  });

  onSubmit() {
    this.submit.emit(this.form.value);
  }
}
