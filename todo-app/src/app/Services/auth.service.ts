import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { api_url } from '../Models/global-url.model';
import { LoginModel } from '../Models/login_details.model';
import { ResponseFromServer } from '../Models/response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token : string;
  private isAuthenticated = false;
  private userId: any;
  private tokenTimeout: NodeJS.Timer; /* Changes in  tsconfig.app.json. Check the detail below */
  private authStatusListener  = new Subject<boolean>();
  //Password is asish for all users
  constructor(private http: HttpClient, private route: Router) { }

  isUserAuthenticated() {
    return this.isAuthenticated;
  }

  checkUserLogin(loginDetails: LoginModel) {
    //console.log(loginDetails);
      this.http.post<{response: any}>(api_url+"login/loginUser", loginDetails).subscribe((result: ResponseFromServer) => {
      this.token = result.token;
      this.userId = result.userId;
      if(this.token) {
        const tokenExpireIn = result.expiresIn;
        const tokenExpiryInMilliSeconds = tokenExpireIn * 1000;
        this.setAuthTimer(tokenExpiryInMilliSeconds);
        this.authStatusListener.next(true);
        this.isAuthenticated = true;
        const now = new Date()
        const tokenExpiryDate = new Date(now.getTime() + tokenExpiryInMilliSeconds);
        this.saveAuthToken(this.token, tokenExpiryDate,this.userId);
        this.route.navigate(['/dashboard'])
      }

    });
  }

  getUserId() {
    return this.userId;
  }
  setAutoLogin() {
    // This is called in app.Component.ts
    //Check if the localstorage contains token. if it does, check expiry date and accordingly login automatically;
    const authInfo  = this.getAuthDataFromStorage();
    //console.log(authInfo);
    if(authInfo.token == '') {
      this.token = '';
      this.isAuthenticated = false;
      this.userId = '';
    }
    const now = new Date();
    const expiresIn = authInfo.expiryDate.getTime()  -  now.getTime(); //This value is in milliseconds
    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.isAuthenticated = true;
      const expiresInMilliSeconds = expiresIn;
      this.setAuthTimer(expiresInMilliSeconds)
      this.authStatusListener.next(true);
      this.userId = authInfo.userId;

    }
  }

  private setAuthTimer(duration: number) {
    this.tokenTimeout = setTimeout(() => {
      this.getLogout();
    }, duration);

  }


  getAuthToken() {
    return this.token;
  }

  getAuthStatus() {
    return this.authStatusListener.asObservable();
  }

  getLogout() {
    this.token = ''; //Clear the Authentication Token
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimeout);
    this.clearAuthToken();
    this.userId = '';
    this.route.navigate(['/login']);

  }

  private saveAuthToken(token: string, expirationDate: Date, userId: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
  }

  private getAuthDataFromStorage() {
    //If a user was logged in before s/he deleted the cookies and browser storage
    var token = localStorage.getItem('token');
    var expiryDate = localStorage.getItem('expirationDate');
    var userId = localStorage.getItem('userId');
    if (!token || !expiryDate) {
       token = '';
       userId='';
    }
    const storageData = {
      token: token,
      expiryDate : new Date(expiryDate),
      userId: userId
    }
    return storageData;
  }
}

/*

To make NodeJS.Timer to work :-

In the tsconfig.app.json in your working directory, try to add the attribute node to the types field. Like:

  {
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../out-tsc/app",
    "module": "es6",
    "baseUrl": "",
    "types": ["node"] --> ADD THIS
 ......
}

*/
