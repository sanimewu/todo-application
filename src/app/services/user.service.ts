import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
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

}
