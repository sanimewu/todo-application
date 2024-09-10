import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkThemeService {

  darkMood = signal<string>('null');
  constructor() { }

  updateDarkMood(){
    this.darkMood.update((res)=>(res==="dark"?"null":"dark"));
    return this.darkMood;
  }
}
