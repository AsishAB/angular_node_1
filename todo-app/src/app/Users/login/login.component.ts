import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthData } from 'src/app/Models/auth_data.model';
import { LoginModel } from 'src/app/Models/login_details.model';
import { ResponseFromServer } from 'src/app/Models/response.model';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isSubmitted = false;
  isValid = true;
  isLoading = false;
  response_from_server = new ResponseFromServer();

  constructor(private authService: AuthService) {


  }

  ngOnInit(): void {
    this.response_from_server.response = 's1';
  }

  loginUser(loginData: NgForm) {
    this.isSubmitted = true;
    if(loginData.invalid) {
      this.isValid = false;
      //console.log("Validation Errors");
      return;
    }
    const loginDetails : LoginModel = {
      username : loginData.value.username,
      password: loginData.value.password
    }

    this.authService.checkUserLogin(loginDetails);


    // subscribe((result: ResponseFromServer) => {
    //   this.response_from_server.response = result.response;
    //   this.response_from_server.message = result.message;
    //   console.log(result);

    // });
  }

}
