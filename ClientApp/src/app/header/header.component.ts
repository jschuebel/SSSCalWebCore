import { Component, OnInit } from '@angular/core';
import { Person } from '../Model/Person';

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

  constructor() { }

  ngOnInit() {
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
  openLogin(content) {
  // this.setActive('login');
  this.loginPerson.name = "";
  this.loginPerson.pager = "";
  this.showModal = true; // Show-Hide Modal Check

  }

  Login() {
    this.showModal = false;
    console.log("Login(person)=",this.loginPerson);
  }
}