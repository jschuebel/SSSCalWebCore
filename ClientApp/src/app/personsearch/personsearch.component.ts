import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { Address } from '../Model/Address';
import { Person, PersonsVM } from '../Model/Person';
import { Event } from '../Model/Event';
import  * as _ from 'lodash';

@Component({
  selector: 'app-personsearch',
  templateUrl: './personsearch.component.html',
  styleUrls: ['./personsearch.component.css']
})
export class PersonsearchComponent implements OnInit {
  showModal : boolean;
  isBusy = true;
  isLoggedIn = false;
  message: string;
  MasterPeopleDataList : Person[] = [];
  PeopleDataList : Person[] = [];
  AddressList : Address[] = [];
  pagedItems: Person[] = [];
  selectedPerson: Person;
  selectedAddress: Address;
  
  sortColumn: string = 'Name';
 
  currentPage = 0;
  pageSize = 10;
  numberOfPages=2;
  closeResult: string;

  constructor(private _dataService:DataService) { 
    this.selectedPerson = new Person();
    this.selectedAddress = new Address();
  }

  ngOnInit() {
    this._dataService.getUsers()
    .subscribe(res => {
      this.MasterPeopleDataList = res.data;
      console.log("peoplelist=",this.MasterPeopleDataList);
      this.numberOfPages = Math.round(res.total / this.pageSize);
      console.log("numberOfPages=",this.numberOfPages);
      this.PeopleDataList=this.MasterPeopleDataList;
      this.setPage();
    });
  }

  setPage() {
    if (this.currentPage < 0) {
      this.currentPage=0;
      return;
    }
    if (this.currentPage > this.numberOfPages-1) {
      this.currentPage=this.numberOfPages-1;
      return;
    }

    console.log("peoplelist len=",this.PeopleDataList.length, "  currpage=", this.currentPage, "   pagesize=", this.pageSize);
//    this.pagedItems = this.PeopleDataList.slice(this.currentPage*this.pageSize, this.currentPage*this.pageSize + this.pageSize);
    this.pagedItems = this.PeopleDataList;
    console.log("this.pagedItems=",this.pagedItems);
  }

  hide()
  {
    this.showModal = false;
  }

  openPerson(content, person) {
    console.log("open(person)=",person);

    this._dataService.getPerson(person.id)
    .subscribe(res => {
      this.selectedPerson= res;
      console.log("selectedPerson=",this.selectedPerson);
      this.selectedAddress = res.address;
      console.log("selectedAddress=",this.selectedAddress);

      this.showModal = true; // Show-Hide Modal Check
    });



  }

  Save() {
    this.showModal = false;
    console.log("Save(person)=",this.selectedPerson);
  }
}
