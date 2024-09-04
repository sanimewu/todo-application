import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginUsers:any[]=[];
  loginObj:any = {
    mail:'',
    password:'',
  }

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      mail: new FormControl('', [Validators.required, Validators.email]),
      password:new FormControl ('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onClick() {
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
    }
  }

  validityCheck() {
    return this.loginForm.get('mail')?.invalid && this.loginForm.get('mail')?.touched || this.loginForm.get('password')?.invalid && this.loginForm.get('password')?.touched
  }

}
