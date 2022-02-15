import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../Services/auth.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService : AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const authToken = this.authService.getAuthToken();
    if(!authToken) { // <--- not logged-in skip adding the header
      return next.handle(req);
    }
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", authToken)
    });
    //console.log("authRequest");

    return next.handle(authRequest);
  }


}

