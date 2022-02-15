import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/Models/users.model';
import { AuthService } from 'src/app/Services/auth.service';
import { GetUserDataService } from 'src/app/Services/get-user-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public isUserAuthenticated = false;
  private userDetails: any;
  constructor(private authService: AuthService, private route: Router, private userDataService: GetUserDataService) { }

  ngOnInit(): void {
    this.checkUserAuthentication();
  }

  getUserDetails() {
    const userId = this.authService.getUserId();
  }


  checkUserAuthentication() {
    this.isUserAuthenticated = this.authService.isUserAuthenticated();
    if(!this.isUserAuthenticated) {
      console.log("User is not Authenticated");
      this.route.navigate(['/login']);
    }
  }

}
