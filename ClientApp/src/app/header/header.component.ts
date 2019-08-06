import { Component, OnInit } from '@angular/core';
import { Person } from '../Model/Person';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentChoice: string = "home";
  loginPerson: Person;
  isLoggedIn = false;
  message: string;
  showModal : boolean;

  constructor(private _dataService:DataService, 
    private _authService:AuthService) { }

  ngOnInit() {
    this.isLoggedIn = this._authService.isAuthenticated();
    this.loginPerson = new Person();
  }

  setActive(choice: string): void{
    this.currentChoice = choice;
  }

  getActive(choice: string) : string{
      if(this.currentChoice == choice)
          return "nav-link active";
      else
          return "nav-link";

  }

  hide()
  {
    this.showModal = false;
  }
  openLogin() {
  // this.setActive('login');
  this.loginPerson.name = "";
  this.loginPerson.pager = "";
  this.showModal = true; // Show-Hide Modal Check

  }


  Logout() {
    this._authService.removeToken();
    this.message = "";
   }

  Login() {
    this.showModal = false;
    console.log("Login(person)=",this.loginPerson);
    this._dataService.login(this.loginPerson)
    .subscribe(res => {
      console.log("back from user");
      console.log("Login Token =",res);
      this._authService.setAuthToken(res.access_token);
      this.message = "";
      //this.closeResult ="Login Access: Granted!";
      alert("Login Access: Granted!");
      //window.location.reload();
    },
    err => {
      console.log("Error from Login", err)
      if (err.status===403)
        this.message = "Login Failed! Access: " + err.statusText;
        //this.closeResult ="";
    });
  }

  checkAuth() {

    this._dataService.loggeduser()
    .subscribe(res => {
      console.log("back from api test");
      console.log("test Token =",res);
      this.message = "User:" + res.username + " Role:" + res.claims[0];
    },
    err => {
      console.log("Error from test", err)
      if (err.status===403)
        this.message = "Test Access: " + err.statusText;
    });
  }

}