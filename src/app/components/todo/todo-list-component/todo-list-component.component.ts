import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {TodoService} from "../../../services/todo.service";
import {TodoInfo} from "../../../shared/todo";

@Component({
  selector: 'app-todo-list-component',
  templateUrl: './todo-list-component.component.html',
  styleUrl: './todo-list-component.component.scss'
})
export class TodoListComponentComponent implements OnInit{
  addTodo: any[] = [];

  constructor(private http: HttpClient, private router: Router, private todoService: TodoService) {
  }
  ngOnInit() {
    this.todoService.getAllDistrict().subscribe(
      (data:any[]) => {
        this.addTodo = data;
      },
      (error) => {
        console.error('Error fetching districts:', error);
      }
    );

  }
}
