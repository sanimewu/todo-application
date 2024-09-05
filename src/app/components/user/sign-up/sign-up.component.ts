import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  signupUsers: any[] = [];

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.signUpForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      mail: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit() {
    const localData = localStorage.getItem('signUpUsers');
    if (localData !== null) {
      this.signupUsers = JSON.parse(localData);
      console.log(this.signupUsers);
    }
  }

  onClick() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      const signupObj = this.signUpForm.getRawValue();
      console.log('signupObj', signupObj);
      this.signupUsers.push(signupObj);
      this.userService.getUserByMail(signupObj.mail).subscribe(res => {
        if (res.userFound) {
          alert("user Exists ");
        } else {
          localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers));
          this.signUpForm.reset();
          this.router.navigate(['/login']);
        }
      });

    }
  }

}
