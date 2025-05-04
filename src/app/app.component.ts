import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "./services/user.service";
import {Router} from "@angular/router";
import {DarkThemeService} from "./services/dark-theme.service";
import {Subscription} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {signOut} from "@angular/fire/auth";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: false
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'todo-application';
  isDarkMode = false;

  private subscription: Subscription = new Subscription();
  darkThemeService: DarkThemeService = inject(DarkThemeService);

  constructor(public afAuth: AngularFireAuth, private router: Router) {
  }
  ngOnInit() {
    this.subscription  = this.darkThemeService.darkMode$.subscribe(res=>{
      this.isDarkMode = res;
    })
    console.log(this.darkThemeService.darkMode$);
  }

  login(){

  }
  toggleDarkMood(){
    this.darkThemeService.toggleDarkMode();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  signOut(){
    this.afAuth.signOut().then();
    this.router.navigate(['login']).then();
  };
}
