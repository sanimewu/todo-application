import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "./services/user.service";
import {Router} from "@angular/router";
import {DarkThemeService} from "./services/dark-theme.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'todo-application';
  isLoggedIn = false;
  isDarkMode = false;
  private subscription: Subscription = new Subscription();
  darkThemeService: DarkThemeService = inject(DarkThemeService);

  constructor() {
  }
  ngOnInit() {
    this.subscription  = this.darkThemeService.darkMode$.subscribe(res=>{
      this.isDarkMode = res;
    })
    console.log(this.darkThemeService.darkMode$);
  }
  login(){
    this.isLoggedIn = !this.isLoggedIn;
  }
  toggleDarkMood(){
    this.darkThemeService.toggleDarkMode();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
