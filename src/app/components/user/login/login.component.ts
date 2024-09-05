import {Component,OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  signupUsers:any[]=[];
  loginObj:any = {
    mail:'',
    password:'',
  }

  constructor(private fb: FormBuilder, private router:Router) {
    this.loginForm = this.fb.group({
      mail: new FormControl('', [Validators.required, Validators.email]),
      password:new FormControl ('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit() {
    if(localStorage.getItem('signUpUsers')){
      this.signupUsers = JSON.parse(localStorage.getItem('signUpUsers')!);
    }
  }
  onClick() {
    if(this.loginForm.valid){
      this.loginObj = { ...this.loginForm.value };
      const isUserExists = this.signupUsers.find(res=>res.mail===this.loginObj.mail && res.password===this.loginObj.password);
      console.log(isUserExists);
      if(isUserExists!==undefined){
        alert('Successfully logged in!');
        this.router.navigate(['/todo']);
      }
      else{
        alert('Wrong email or password!');
      }
    }
  }

  validityCheck() {
    return this.loginForm.get('mail')?.invalid && this.loginForm.get('mail')?.touched || this.loginForm.get('password')?.invalid && this.loginForm.get('password')?.touched
  }

}
