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
  filter: string = 'All';

  constructor(private http: HttpClient, private router: Router, private todoService: TodoService) {
  }
  filterTasks(filterType: string) {
    this.filter = filterType;
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
  filteredTodos() {
    if (this.filter === 'Completed') {
      return this.addTodo.filter(todo => todo.completed === true);
    }
    if (this.filter === 'Active') {
      return this.addTodo.filter(todo => todo.completed === false);
    }
    return this.addTodo;
  }

  addTodolist() {
    this.router.navigate(['/add-todo']);
  }
}
