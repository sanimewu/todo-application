import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TodoInfo} from "../shared/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl: string = "http://localhost:3001/0";

  constructor(private http: HttpClient) {
  }

  getAllDistrict():Observable<any> {
    return this.http.get(this.baseUrl);
  }
  createLocation(todoAdd:TodoInfo): Observable<any> {
    return this.http.post(this.baseUrl, todoAdd);
  }
}
