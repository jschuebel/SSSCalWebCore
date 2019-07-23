import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { AuthService } from './auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

//    constructor(private auth: AuthService) {}
    constructor(private _authService:AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    //const authToken = this.auth.getAuthorizationToken();
    let currTokenVal:string = this._authService.getToken();
    //console.log("intercept tok", currTokenVal);
    if (currTokenVal!==null) {
    const  authToken:string = 'Bearer ' + currTokenVal;

    /*
    * The verbose way:
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });
    */
    // Clone the request and set the new header in one step.
    const authReq = req.clone({ setHeaders: { Authorization: authToken } });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
    }
    else return next.handle(req);

  }
}
