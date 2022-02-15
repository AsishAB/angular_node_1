import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { api_url } from 'src/app/Models/global-url.model';
import { Todo } from 'src/app/Models/todo.model';
import { TodoService } from 'src/app/Services/todo.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  isLoading = false;
  all_todos:any;
  public userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  response_from_server: any;
  length = 0;
  constructor(private http:HttpClient, private todo_Service:TodoService,  public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit(): void {
    //console.log( this.userIsAuthenticated );
     this.getAllTodos();
     this.userIsAuthenticated = this.authService.isUserAuthenticated(); /* Important Read below  at the end of the page*/

     //Helpful while logout
     this.authListenerSubs = this.authService.getAuthStatus().subscribe(result => {
      //console.log(result);
      this.userIsAuthenticated = result;
    });
  }

  getAllTodos(){
    this.todo_Service.getAllTodo().subscribe((response) => {

      this.all_todos =  response;
      this.length = this.all_todos.length;
      //console.log(response)
      this.all_todos.forEach(element => {
        if(element.todo_image != null && element.todo_image != '' && element.todo_image != undefined) {
          element.todo_image = api_url+element.todo_image;
        } else {
          element.todo_image = "";
        }
      });
      this.isLoading = true;
    });
  }




  markAsDone(id) {
    this.todo_Service.markAsDone(id).subscribe(result => {
      this.response_from_server = result;
      var dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '250px',
        data: {msg:this.response_from_server.message},
      });
    })
  }

  deleteTodo(id) {

    this.todo_Service.deleteTodo(id).subscribe(result => {
      this.response_from_server = result;

      //console.log(result)
      var dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '250px',
        data: {msg:this.response_from_server.message},
      });
      this.all_todos.filter(item => item.todo_id !== id);


    });

  }
  deleteAllTodo() {
    this.todo_Service.deleteAllTodos().subscribe(result => {
      this.response_from_server = result;
      var dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '250px',
        data: {msg:this.response_from_server.message},
      });
      this.all_todos.splice(0);
    })
  }

}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './angular-dialog/dialog-overview-example-dialog.html',
})

export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public message: any

  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


/*
Since Angular is a single page application, it is stateless.
So, when a user is logging in, the Auth listener is fired. but, when we navigate to another route,
the auth listener is no longer fired. So, the result is not stored in userIsAuthenticated property.
So, we need another way to make sure that an userIsAuthenticated is set to the correct value

*/
