import {Component, OnInit} from '@angular/core';
import {TodoService} from "../../../services/todo.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TodoInfo} from "../../../shared/todo";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss'
})
export class AddTodoComponent implements OnInit{
  addTodo:TodoInfo ={} as TodoInfo;
  formValue!: FormGroup;
  constructor(private todoService:TodoService, private fb:FormBuilder, private router:Router) {

  }
  ngOnInit(){
      this.formValue = this.fb.group({
        userId: ['', Validators.required],
        title: ['', Validators.required],
        description: ['', Validators.required],
        completed: ['', Validators.required],
      })
  }
  createLocation(){
    this.addTodo = {
      userId : this.formValue.value.userId,
      title : this.formValue.value.title,
      description : this.formValue.value.description,
      date: new Date().toISOString(),
      completed : this.formValue.value.completed,
    };

    this.todoService.createLocation(this.addTodo).subscribe((res)=>{
      console.log(res);
      this.formValue.reset();
    },
      (error)=>{
        console.log(error);
      })

    this.router.navigate(['/todo']);
  }

  previousPage() {
    this.router.navigate(['/todo']);
  }
}
