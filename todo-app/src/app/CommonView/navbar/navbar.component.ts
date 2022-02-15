import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.isUserAuthenticated();
    this.authListenerSubs = this.authService.getAuthStatus().subscribe(result => {
      this.userIsAuthenticated = result;
    });
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  onLogout() {
    this.authService.getLogout();
  }

}
