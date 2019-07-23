import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private notify = new Subject<any>();
  
  constructor() { }

  isAuthenticated() {
    let currTokenVal:string = localStorage.getItem("currToken");
    if (currTokenVal!==null) 
      return true;
    else 
        return false;
 }
 
  setAuthToken(token) {
    localStorage.setItem("currToken", token);
    this.notify.next({option:'updateToken'});
  }

  removeToken() {
    localStorage.removeItem("currToken");
    this.notify.next({option:'removeToken'});
 
  }

  getToken() {
    let currTokenVal:string = localStorage.getItem("currToken");
    return currTokenVal;
 }


}
