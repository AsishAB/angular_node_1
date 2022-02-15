export class Todo {
  todo_id!: number;
  todo_title !:string;
  todo_description !:string;
  todo_status !:number;
  todo_image :Object = null;
  todo_created_by?:any
}
