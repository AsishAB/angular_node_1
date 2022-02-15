import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { api_url } from '../Models/global-url.model';

import { Todo } from '../Models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todo:Todo[]=[];

  constructor(private http: HttpClient, private router: Router) { }


  getAllTodo() {
    return this.http.get<{todo:Todo[]}>(api_url+"api/get-all-todo")
  }

  getTodoFromId(id: number) {
    return this.http.get<{ todo:Todo }>(api_url+"api/get-todo-from-id/"+id)

  }
  addOrEditTodo(form_data: any) {
    return this.http.post<{response:any}>(api_url+"api/post-todo",form_data)
  }

  deleteTodo(id:number) {
    return this.http.delete<{response: any}>(api_url+"api/delete-todo/"+id);
  }

  markAsDone(id: number) {
    return this.http.get<{response: any}>(api_url+"api/mark-as-done/"+id);
  }
  deleteAllTodos() {
    return this.http.get<{response : any}>(api_url+"api/delete-all-todos");
  }

}
