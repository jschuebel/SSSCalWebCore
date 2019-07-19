import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {formatDate } from '@angular/common';
import { Address } from '../Model/Address';
import { Person, PersonsVM } from '../Model/Person';
import { Event, EventsVM } from '../Model/Event';

@Component({
  selector: 'app-eventsearch',
  templateUrl: './eventsearch.component.html',
  styleUrls: ['./eventsearch.component.css']
})
export class EventsearchComponent implements OnInit {
  showModal : boolean;
  isLoggedIn = false;
  message: string;
  Descrip: string;
  PeopleList : Person[] = [];
  selectedPerson : Person;
  
  CategoryList = [];
  EventDataList:Event[] = [];

  sortColumn: string = 'Date';
  sortDirection : string = "asc";
  filterField:string = 'Date';
  filterValue:string = '';
  isFilteringRequest:boolean=false;
  startFilterTime:number;

  currentPage = 1;
  pageSize = 10;
  numberOfPages=0;

  selectedEvent: Event;
  selectedCategory: string;
  closeResult: string;
  
  fromDate: string;
  toDate: string;

  constructor(private _dataService:DataService) { 
    this.selectedPerson = new Person();
    this.selectedEvent = new Event();
  }

  ngOnInit() {
//    this.isLoggedIn = this._authService.isAuthenticated();
    this.getData();
  }
  filter(){
    this.getData();
  }

  getData(){
    console.log("this.SelectedPerson",this.selectedPerson, "fromDate", this.fromDate, "toDate", this.toDate, "selectedCategory", this.selectedCategory, "Descrip", this.Descrip);

    let id=0;
    if (this.selectedPerson!=null)
      id = this.selectedPerson.id;

      if (this.Descrip!=null && this.Descrip.trim().length==0) this.Descrip=null;
      if (this.fromDate!=null && this.fromDate.trim().length==0) this.fromDate=null;
      if (this.toDate!=null && this.toDate.trim().length==0) this.toDate=null;
      
      
    var filterParams = `page=${this.currentPage}&pageSize=${this.pageSize}&sort[0][field]=${this.sortColumn}&sort[0][dir]=${this.sortDirection}`;

//    this._dataService.getEvents(id, this.fromDate, this.toDate, this.selectedCategory, this.Descrip)
    this._dataService.getEventsf(filterParams)
    .subscribe(res => {
      this.EventDataList = res.data;
      console.log("EventDataList=",this.EventDataList);

      if (res.total>0 && res.total < this.pageSize)
        this.numberOfPages = 1;
      else
        this.numberOfPages = Math.round(res.total / this.pageSize);
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
    this.getData();
 }


   //method to hide popup
   hide()
   {
     this.showModal = false;
   }

 
   open(content, event) {
    // console.log("open(person)=",person);
//      if (event.Date!=null)
//        event.Date = this.toJSONLocal(event.Date);
    if (event.Date!=null)
      event.Date = formatDate(event.Date, 'yyyy-MM-dd', 'en-US');

    this.message = "here is the select id = " + event._id;
    this.selectedEvent=event;
    this.selectedCategory=event.Category;

    //console.log("open(selectedAddress)=",this.selectedAddress);
      
    this.showModal = true; // Show-Hide Modal Check
/*********  change to load event
    this._dataService.getPerson(person.id)
    .subscribe(res => {
      this.selectedPerson= res;
      console.log("selectedPerson=",this.selectedPerson);
      this.selectedAddress = res.address;
      console.log("selectedAddress=",this.selectedAddress);

      this.showModal = true; // Show-Hide Modal Check
    });
 */    
  }

  
  Save() {
    /*
    this._dataService.saveEvent(this.selectedEvent)
    .subscribe(res => {
      console.log("Save res =",res);
      this.message = res.data.status;
    },
    err => {
      console.log("Error from Save", err)
      if (err.status===403)
        this.message = "Event Access: " + err.statusText;
    });
  */
  }
 


}
