import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { PagenotfoundComponent } from './Errors/pagenotfound/pagenotfound.component';
import { HomepageComponent } from './Home/homepage/homepage.component';
import { AddEditTodoComponent } from './Todo/add-edit-todo/add-edit-todo.component';
import { TodoListComponent } from './Todo/todo-list/todo-list.component';
import { LoginComponent } from './Users/login/login.component';
import { UserRegistrationComponent } from './Users/user-registration/user-registration.component';

import { AuthGuard } from './Guards/auth-guard';
import { AddEditUserComponent } from './Users/add-edit-user/add-edit-user.component';
import { ManageUserComponent } from './Users/manage-user/manage-user.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  // {path: 'new-user', component: UserRegistrationComponent, } ,
  // {path: 'login', component: LoginComponent} ,
  { path: "user", loadChildren: () => import('./LazyLoading/auth-routing/auth-routing.module').then(m => m.AuthRoutingModule) },
  {path: 'dashboard', component: DashboardComponent , canActivate:[AuthGuard]},
  {path: 'todo', component: TodoListComponent
      // children: [
      //   {path: 'create-todo', component:AddEditTodoComponent}
      // ]

    , canActivate:[AuthGuard]} ,
  { path: 'add-edit-todo', component:AddEditTodoComponent , canActivate:[AuthGuard] },
  { path: 'add-edit-todo/:id', component:AddEditUserComponent , canActivate:[AuthGuard] },



  // { path: 'add-edit-user', component:AddEditTodoComponent , canActivate:[AuthGuard] },
  { path: 'manage-user', component:ManageUserComponent , canActivate:[AuthGuard] },



  { path: '**', component: PagenotfoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
