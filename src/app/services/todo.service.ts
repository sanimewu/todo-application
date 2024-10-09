import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TodoInfo} from "../shared/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl: string = "http://localhost:5000/todos";

  constructor(private http: HttpClient) {
  }

  getAllTodo():Observable<any> {
    return this.http.get(this.baseUrl);
  }
  createTodo(todoAdd:TodoInfo): Observable<any> {
    return this.http.post(this.baseUrl, todoAdd);
  }
  onDeleted(id:any):Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  onEdit(id:any):Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  updateTodo(id: string, updatedTodo: TodoInfo): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, updatedTodo);
  }
}
