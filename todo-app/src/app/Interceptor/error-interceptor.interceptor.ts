// import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, throwError } from 'rxjs';
import { pipe } from 'rxjs';
import { ErrorDialogComponent } from '../ErrorDialog/error-dialog/error-dialog.component';

 @Injectable() // Not required as we wont be injecting any services
export class ErrorInterceptorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log("Inside Error Interceptor");
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let backendResponse = "Unknown HTTP Response. Check error-interceptor";
        let backendErrorMessage = "An Unknown Error occured";
        if(error.error.response && error.error.message) {
          backendResponse = error.error.response;
          backendErrorMessage = error.error.message;
        }

        //console.log(error.error.message);
        this.dialog.open(ErrorDialogComponent,{data: {response: backendResponse, message: backendErrorMessage}})
        return throwError(() => error);
      })

    );
  }
}
