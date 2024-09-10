import {Component, inject, OnInit} from '@angular/core';
import {UserService} from "./services/user.service";
import {Router} from "@angular/router";
import {DarkThemeService} from "./services/dark-theme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'todo-application';
  isLoggedIn = false;
  darkThemeService: DarkThemeService = inject(DarkThemeService);
  constructor() {
  }
  ngOnInit() {

  }
  login(){
  }
  toggleDarkMood(){
    this.darkThemeService.updateDarkMood();
  }
}
