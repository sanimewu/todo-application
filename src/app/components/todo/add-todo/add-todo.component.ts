import {Component, OnInit} from '@angular/core';
import {TodoService} from "../../../services/todo.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TodoInfo} from "../../../shared/todo";
import {Router} from "@angular/router";

@Component({
    selector: 'app-add-todo',
    templateUrl: './add-todo.component.html',
    styleUrl: './add-todo.component.scss',
    standalone: false
})
export class AddTodoComponent implements OnInit{
  addTodo:TodoInfo ={} as TodoInfo;
  formValue!: FormGroup;
  teamOptions:string[] = ['frontend', 'backend'];
  versionOptions: string[]=['124', '125','126'];
  priorityOptions: string[]=['Urgent', 'High', 'Normal'];

  constructor(private todoService:TodoService, private fb:FormBuilder, private router:Router) {

  }
  ngOnInit(){
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
      })

  }
  createLocation(){
    this.addTodo = {
      title : this.formValue.value.title,
      description : this.formValue.value.description,
      date: new Date().toISOString(),
      completed : this.formValue.value.completed,
    };

    this.todoService.createTodo(this.addTodo).subscribe({
      next: (res) => {
        this.formValue.reset();
        setTimeout(() => {
          this.router.navigate(['/todo']).then(() => {
          });
        }, 2000);
      },
      error: (error) => {
        console.log(error);
      }
    });

  }

  previousPage() {
    this.router.navigate(['/todo']).then();
  }

  get reportedByGroup():FormGroup {
    return this.formValue.get('reported_by') as FormGroup;
  }
  get assignedToGroup(): FormGroup {
    return this.formValue.get('assigned_to') as FormGroup;
  }
}
