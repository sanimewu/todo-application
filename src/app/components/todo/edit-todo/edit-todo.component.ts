import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TodoService} from "../../../services/todo.service";

@Component({
    selector: 'app-edit-todo',
    templateUrl: './edit-todo.component.html',
    styleUrl: './edit-todo.component.scss',
    standalone: false
})
export class EditTodoComponent implements OnInit{
  formValue!: FormGroup;
  todoId!:string;
  teamOptions:string[] = ['Frontend', 'Backend','Both'];
  priorityOptions: string[]=['Urgent', 'High', 'Normal'];
  versionOptions: string[]=['124', '125','126'];
  constructor(private route:ActivatedRoute,private router:Router, private fb:FormBuilder,private todoService:TodoService) {
  }
  ngOnInit():void{
    this.todoId= this.route.snapshot.paramMap.get('id')||'';

    this.formValue = this.fb.group({
      subject: ['', Validators.required],
      completed: ['', Validators.required],
      date: [new Date()],
      id: [''],
      priority: ['',Validators.required],
      version: ['', Validators.required],
      team: ['', Validators.required],
      reported_by: this.fb.group({
        name: ['']
      }),
      concernedPerson: [''],
      assigned_to: this.fb.group({
        name: ['']
      })
    });

    this.todoService.onEdit(this.todoId).subscribe({
      next: data => {
        this.formValue.patchValue(data);
      }
    })
  }
  previousPage() {
    this.router.navigate(['/todo']).then();
  }

  OnSubmit() {
    if(this.formValue.valid){
      this.formValue.value.date = new Date();
      this.todoService.updateTodo(this.todoId, this.formValue.value).subscribe((res)=>{
        this.router.navigate(['/todo']).then();
      })
    }
  }

  get reportedByGroup():FormGroup {
    return this.formValue.get('reported_by') as FormGroup;
  }

  get assignedToGroup():FormGroup {
    return this.formValue.get('assigned_to') as FormGroup;
  }
}
