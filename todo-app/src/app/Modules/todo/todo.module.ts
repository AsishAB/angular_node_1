import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// import { FooterComponent } from 'src/app/CommonView/footer/footer.component';
// import { NavbarComponent } from 'src/app/CommonView/navbar/navbar.component';
// import { AddEditTodoComponent } from 'src/app/Todo/add-edit-todo/add-edit-todo.component';
// import { TodoListComponent } from 'src/app/Todo/todo-list/todo-list.component';
import { AngularMaterialsModule } from '../angular-materials/angular-materials.module';





@NgModule({
  declarations: [
    // TodoListComponent,
    // AddEditTodoComponent,


  ],
  imports: [
    AngularMaterialsModule,
    CommonModule,
    RouterModule,
    FormsModule,


  ],

  // exports: [
  // ]


})
export class TodoModule { }
