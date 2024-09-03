import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  isButtonDisabled() {
    return this.loginForm.invalid;
  }

  onClick() {
    if(this.loginForm.invalid){

    }
  }
}


export interface Login {
  mail:FormControl<string| null>;
  password:FormControl<string | null>;
}
