import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TodoService} from "../../../services/todo.service";

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.scss'
})
export class EditTodoComponent implements OnInit{
  formValue!: FormGroup;
  todoId!:string;

  constructor(private route:ActivatedRoute,private router:Router, private fb:FormBuilder,private todoService:TodoService) {
  }
  ngOnInit():void{
    this.todoId= this.route.snapshot.paramMap.get('id')||'';
    this.formValue = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      completed: ['', Validators.required],
    });
    this.todoService.onEdit(this.todoId).subscribe({
      next: data => {
        this.formValue.patchValue(data);
      }
    })
  }
  previousPage() {
    this.router.navigate(['/todo']);
  }

  OnSubmit() {
    if(this.formValue.valid){
      this.formValue.value.date = new Date();
      this.todoService.updateTodo(this.todoId, this.formValue.value).subscribe((res)=>{
        this.router.navigate(['/todo']);
      })
    }
  }
}
