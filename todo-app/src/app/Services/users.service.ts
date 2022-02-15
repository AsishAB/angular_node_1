import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api_url } from '../Models/global-url.model';
import { ResponseFromServer } from '../Models/response.model';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }


  registerNewUser(form:any) {
    return this.http.post<{response:any}>(api_url+"users/register-user",form)

  }
  getUserById(id: any) {
    return this.http.get<{response:any}>(api_url+"users/get-user-by-id/"+id);
  }
}
