import {Injectable, signal} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DarkThemeService {
  private localStorageKey = 'darkMode';
  private darkModeSubject = new BehaviorSubject<boolean>(this.getStoredDarkMode()) ;
  darkMode$: Observable<boolean> = this.darkModeSubject.asObservable();
  constructor() { }

  toggleDarkMode() {
    const newDarkMode = !this.darkModeSubject.value;
    this.darkModeSubject.next(newDarkMode);//dynamically update the value
    localStorage.setItem(this.localStorageKey, JSON.stringify(newDarkMode));
  }

  private getStoredDarkMode(): boolean {
    const storedDarkMode = localStorage.getItem(this.localStorageKey);
    return storedDarkMode !== null ? JSON.parse(storedDarkMode) : false;
  }
}
