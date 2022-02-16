import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from 'src/app/Users/user-registration/user-registration.component';
import { LoginComponent } from 'src/app/Users/login/login.component';

const lazy_route:Routes = [
  {path: 'new-user', component: UserRegistrationComponent, } ,
  {path: 'login', component: LoginComponent} ,
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(lazy_route)

  ]
})
export class AuthRoutingModule { }
