import {Component, OnInit} from '@angular/core';
import {UserService} from "./services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'todo-application';
  isLoggedIn = false;

  constructor(private userService: UserService, private router: Router) {
  }
  ngOnInit() {

  }
  login(){

  }
}
