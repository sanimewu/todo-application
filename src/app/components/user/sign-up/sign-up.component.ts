import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit{
  signUpForm: FormGroup;
  signupUsers:any[]=[];
  signupObj:any = {
    name:'',
    mail:'',
    password:'',
  }
  constructor(private fb: FormBuilder, private router:Router) {
    this.signUpForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required, Validators.email]),
      password:new FormControl ('', [Validators.required, Validators.minLength(6)]),
    });
  }
ngOnInit() {
    const localData = localStorage.getItem('signupUsers');
    if(localData!==null){
      this.signupUsers = JSON.parse(localData);
      console.log(this.signupUsers);
    }
}

  onClick() {
    if(this.signUpForm.valid){
      console.log(this.signUpForm.value);
      this.signupObj = { ...this.signUpForm.value };
      this.signupUsers.push(this.signupObj);
      localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers));
      this.signUpForm.reset();
      this.router.navigate(['/login']);
      this.signupObj = {
        name:'',
        mail:'',
        password:'',
      }
    }
  }

  validityCheck() {
    return this.signUpForm.get('mail')?.invalid && this.signUpForm.get('mail')?.touched || this.signUpForm.get('password')?.invalid && this.signUpForm.get('password')?.touched || this.signUpForm.get('name')?.invalid && this.signUpForm.get('name')?.touched;
  }
}
