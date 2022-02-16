import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserRegistrationComponent } from './Users/user-registration/user-registration.component';
import { HomepageComponent } from './Home/homepage/homepage.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './Users/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// import { TodoListComponent } from './Todo/todo-list/todo-list.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagenotfoundComponent } from './Errors/pagenotfound/pagenotfound.component';
import { OnlyNumberDirective } from './Directives/only-number.directive';
import { AuthInterceptor } from './Interceptor/auth-interceptor';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { ErrorInterceptorInterceptor } from './Interceptor/error-interceptor.interceptor';
import { ErrorDialogComponent } from './ErrorDialog/error-dialog/error-dialog.component';
import { AngularMaterialsModule } from './Modules/angular-materials/angular-materials.module';
import { TodoModule } from './Modules/todo/todo.module';

import { NavbarComponent } from './CommonView/navbar/navbar.component';
import { FooterComponent } from './CommonView/footer/footer.component';
import { AddEditTodoComponent } from './Todo/add-edit-todo/add-edit-todo.component';
import { TodoListComponent } from './Todo/todo-list/todo-list.component';
// import { AuthRoutingModule } from './LazyLoading/auth-routing/auth-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    HomepageComponent,
    LoginComponent,

    NavbarComponent,
    FooterComponent,
    AddEditTodoComponent,
    TodoListComponent,

    PagenotfoundComponent,
    OnlyNumberDirective,
    DashboardComponent,
    ErrorDialogComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    AngularMaterialsModule,

    TodoModule,
    //AuthRoutingModule
    // CommonViewModule



  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, // multi: true tells Angular to Overwrite the existng HTTP_INTERCEPTORS, rather add it to existing ones
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorInterceptor, multi: true } // multi: true tells Angular to Overwrite the existng HTTP_INTERCEPTORS, rather add it to existing ones


  ],
  bootstrap: [AppComponent],
  /*
    A bootstrapped component is an entry component that
    Angular loads into the DOM during the bootstrap process (application launch).
    Other entry components are loaded dynamically by other means, such as with the router.
  */
  //entryComponents:[ErrorDialogComponent] // entryComponents tells Angular that the following components are going to be used, even when Angular does not see it
})
export class AppModule { }
