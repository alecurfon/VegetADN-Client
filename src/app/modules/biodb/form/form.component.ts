import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'biodatabase-form',
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

  proceed() {
    this.submit.emit(this.form.value);
  }
}
