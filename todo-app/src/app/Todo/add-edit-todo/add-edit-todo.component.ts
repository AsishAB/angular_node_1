import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild,ElementRef, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { api_url } from 'src/app/Models/global-url.model';
import { Todo } from 'src/app/Models/todo.model';
import { TodoService } from 'src/app/Services/todo.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-todo',
  templateUrl: './add-edit-todo.component.html',
  styleUrls: ['./add-edit-todo.component.css']
})
export class AddEditTodoComponent implements OnInit {

  todo = new Todo();
  selected_file !: any;
  formtype='add';
  url_param:any;
  loading:boolean = false;
  response_from_server : any;
  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private todo_Service: TodoService,
    private router : Router,

    public dialog: MatDialog
    ) { }




  imageSelected(e){
    //console.log(e.target.files[0]);
    this.selected_file = e.target.files[0];
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      if(param.has("id")){
        this.url_param = parseInt(param.get("id"));
        this.formtype = 'edit';
      } else {
        this.url_param = '';
      }
      this.assignTodo(this.url_param);
    })
  }

  assignTodo(params) {
    this.loading = true;
    // console.log("params = "+params)
    if(params === '') {
      this.todo.todo_id = 0;
      this.todo.todo_title = '';
      this.todo.todo_description = '';
      this.todo.todo_image = '';
      this.todo.todo_status = 1;

    } else {
      this.todo_Service.getTodoFromId(params).subscribe((result) => {
        this.todo = result[0];
        this.todo.todo_image = api_url+this.todo.todo_image;

      })
    }
    this.loading = false;
  }
  onSubmit(form: NgForm) {
    this.loading = true;
    const fd = new FormData();
    fd.append('todo_id',this.todo.todo_id.toString());
    fd.append('todo_title',this.todo.todo_title);
    fd.append('todo_description', this.todo.todo_description);
    fd.append('todo_status', '1')
    if(this.selected_file){
      fd.append('todo_image', this.selected_file, this.selected_file.name)
    }

      this.todo_Service.addOrEditTodo(fd).subscribe(result => {

      this.response_from_server = result;

      //console.log(this.response_from_server.message);

      var dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '250px',
        data: {msg:this.response_from_server.message},
      });
    // if(this.formtype === 'add') {
    //   //console.log(this.response_from_server.message)
    //   //form.reset(); // Does not clear input type file

    // } else {
    //   var dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    //     width: '250px',
    //     data: {msg:this.response_from_server.message},
    //   });

    // }
    this.loading = false;
    this.router.navigate(['/todo']);

  });


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
