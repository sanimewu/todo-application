import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl: string = "http://localhost:3000/districts";

  constructor(private http: HttpClient) {
  }

  getAllDistrict():Observable<any> {
    return this.http.get(this.baseUrl);
  }
}
