import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { api_url } from '../Models/global-url.model';

@Injectable({
  providedIn: 'root'
})
export class GetUserDataService {

  constructor(private http: HttpClient, private route: Router) { }


  getUserData(id) {
      return this.http.get(api_url+'login/getUserDetails/'+id)
  }
}
