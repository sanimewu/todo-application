import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth:AngularFireAuth) {
  }

  getUsers() {
    const users = JSON.parse(localStorage.getItem('signUpUsers') ?  localStorage.getItem('signUpUsers')!:'[]');
    return new BehaviorSubject(users);
  }
  getUserByMail(mail: string){
    const users:any[]= this.getUsers().getValue();
    console.log('service users: ',users);
    const userFound = users.find((user:any) => user.mail===mail);
    if(userFound){
      return new BehaviorSubject({userFound:true }).asObservable();
    }
    return new BehaviorSubject({userFound:false});
  }

  getGoogleSignIn():Observable<any>{
    const provider = new GoogleAuthProvider();
    return from(this.auth.signInWithPopup(provider));
  }

}
