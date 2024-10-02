import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {TodoService} from "../../../services/todo.service";
import {TodoInfo} from "../../../shared/todo";
import {switchMap} from "rxjs";

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
    this.todoService.getAllTodo().subscribe(
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

  onDeleteBtn(todoId: any) {
    const isConfirmed = window.confirm('Are you sure you want to delete this todo?');

    if (isConfirmed) {
      this.todoService.onDeleted(todoId).pipe(
          switchMap(() => this.todoService.getAllTodo())
        )
        .subscribe({
          next: (todos) => {
            this.addTodo = todos;
            console.log('Todo deleted and list updated successfully.');
          },
          error: (err) => {
            console.error('Error occurred:', err);
          }
        });
    } else {
      console.log('Deletion canceled.');
    }
  }


  onEditBtn(todoId:any) {
    const isConfirmed = window.confirm('Are you sure you want to Edit this todo?');
    if (isConfirmed) {
        this.router.navigate(['/edit-todo',todoId]);
    }
    else {
      console.log('Edit Cancel');
    }
  }
}
