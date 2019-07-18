import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { Address } from '../Model/Address';
import { Person, PersonsVM } from '../Model/Person';
import { Event, EventsVM } from '../Model/Event';

@Component({
  selector: 'app-eventsearch',
  templateUrl: './eventsearch.component.html',
  styleUrls: ['./eventsearch.component.css']
})
export class EventsearchComponent implements OnInit {
  isLoggedIn = false;
  message: string;
  Descrip: string;
  PeopleList : Person[] = [];
  SelectedPerson : Person;
  
  CategoryList = [];
  EventDataList:Event[] = [];

  currentPage = 1;
  pageSize = 10;
  numberOfPages=2;

  selectedEvent: any;
  selectedCategory: string;
  closeResult: string;
  
  fromDate: string;
  toDate: string;

  constructor(private _dataService:DataService) { }

  ngOnInit() {
//    this.isLoggedIn = this._authService.isAuthenticated();


    this.getEvents();
  }
  filter(){
    this.getEvents();
  }

  getEvents(){
    this.currentPage=1;
    this.numberOfPages=0;

    console.log("this.SelectedPerson",this.SelectedPerson, "fromDate", this.fromDate, "toDate", this.toDate, "selectedCategory", this.selectedCategory, "Descrip", this.Descrip);

    let id=0;
    if (this.SelectedPerson!=null)
      id = this.SelectedPerson.id;

      if (this.Descrip!=null && this.Descrip.trim().length==0) this.Descrip=null;
      if (this.fromDate!=null && this.fromDate.trim().length==0) this.fromDate=null;
      if (this.toDate!=null && this.toDate.trim().length==0) this.toDate=null;
      
      
    var filterParams = `page=${this.currentPage}&pageSize=${this.pageSize}`;
  
//    this._dataService.getEvents(id, this.fromDate, this.toDate, this.selectedCategory, this.Descrip)
    this._dataService.getEventsf(filterParams)
    .subscribe(res => {
      this.EventDataList = res.data;
      console.log("EventDataList=",this.EventDataList);
      if (this.EventDataList.length>0 && this.EventDataList.length < this.pageSize)
        this.numberOfPages = 1;
      else
        this.numberOfPages = Math.round(this.EventDataList.length / this.pageSize);
      this.setPage();
    });    
  }

  setPage() {
    if (this.currentPage < 1) {
      this.currentPage=1;
      return;
    }
    if (this.currentPage > this.numberOfPages) {
      this.currentPage=this.numberOfPages;
      return;
    }

    console.log("peoplelist len=",this.EventDataList.length, "  currpage=", this.currentPage, "   pagesize=", this.pageSize);
//    this.pagedItems = this.EventDataList.slice(this.currentPage*this.pageSize, this.currentPage*this.pageSize + this.pageSize);
  }



}
