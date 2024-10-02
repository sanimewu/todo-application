import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/user/login/login.component";
import {SignUpComponent} from "./components/user/sign-up/sign-up.component";
import {TodoListComponentComponent} from "./components/todo/todo-list-component/todo-list-component.component";
import {NotFoundComponentComponent} from "./components/others/not-found-component/not-found-component.component";
import {AddTodoComponent} from "./components/todo/add-todo/add-todo.component";
import {EditTodoComponent} from "./components/todo/edit-todo/edit-todo.component";

const routes: Routes = [
  {path:'', redirectTo: '/login', pathMatch: 'full' },
  {path:'login', component: LoginComponent},
  {path:'signup', component: SignUpComponent},
  {path: 'todo', component:TodoListComponentComponent},
  {path: 'add-todo', component:AddTodoComponent},
  {path: 'edit-todo/:id', component: EditTodoComponent },
  {path:'**', component: NotFoundComponentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
