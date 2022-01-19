import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public editing: boolean = true;
  public busy: boolean = false;
  public formGroup: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.init();
  }

  private init() {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z ]*$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [Validators.required, this.noWhitespaceValidator]),
    });
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : {whitespace: true};
  }

  onSendMessageClicked() {
    this.editing = false;
    this.busy = true;
    setTimeout(() => {
      this.busy = false;
    }, 1500);
  }

  hasError(fieldName: string) {
    const field = this.formGroup.get(fieldName);
    return field.errors && !field.pristine && field.value;
  }

}
