import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service'
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

  constructor(private _dataService:DataService, 
              private _authService:AuthService) { 
    this.isLoggedIn = this._authService.isAuthenticated();
    this.selectedPerson = new Person();
    this.selectedEvent = new Event();
  }

  ngOnInit() {
//    this.isLoggedIn = this._authService.isAuthenticated();
    let peopleSort = 'sort[0][field]=Name&sort[0][dir]=asc';
    this._dataService.getUsers(peopleSort)
    .subscribe(res => {
      var p = new Person();
      p.id=0;
      p.name="** Choose Person **";
      res.data.unshift(p)
      this.selectedPerson=p;
      this.getData();

      this.PeopleList = res.data;
      console.log("peoplelist=",this.PeopleList);
    },
    err => {
      console.log("Error from getUsers", err)
    });

  }


  filter(){
    this.getData();
  }

  getData(){
    console.log("this.SelectedPerson",this.selectedPerson, "fromDate", this.fromDate, "toDate", this.toDate, "selectedCategory", this.selectedCategory, "Descrip", this.Descrip);

    let filterQuery='';
    let filterOp = 'contains'; //'gte';
    let filterIndex=0;

    if (this.selectedPerson!=null && this.selectedPerson.id!=0) {
      filterQuery+=`&filter[logic]=and&filter[filters][${filterIndex}][field]=UserId&filter[filters][${filterIndex}][operator]=eq&filter[filters][${filterIndex}][value]=${this.selectedPerson.id}`;
      filterIndex++;
    }

    if (this.Descrip!=null) {
        if (this.Descrip.trim().length!=0) 
        {
          filterQuery+=`&filter[logic]=and&filter[filters][${filterIndex}][field]=Description&filter[filters][${filterIndex}][operator]=contains&filter[filters][${filterIndex}][value]=${this.Descrip}`;
          filterIndex++;
        }
    }
    if (this.fromDate!=null)
    {
      if (this.fromDate.trim().length!=0){
        filterQuery+=`&filter[logic]=and&filter[filters][${filterIndex}][field]=Date&filter[filters][${filterIndex}][operator]=gte&filter[filters][${filterIndex}][value]=${this.fromDate}`;
        filterIndex++;
      }
    }
    if (this.toDate!=null) {
      if (this.toDate.trim().length!=0) {
        filterQuery+=`&filter[logic]=and&filter[filters][${filterIndex}][field]=Date&filter[filters][${filterIndex}][operator]=lte&filter[filters][${filterIndex}][value]=${this.toDate}`;
        filterIndex++;
      }
    }

    //this.selectedCategory
    //filterQuery=`&filter[logic]=and&filter[filters][0][field]=topicf.topicTitle&filter[filters][0][operator]=contains&filter[filters][0][value]=Birthday`;
      
    var filterParams = `page=${this.currentPage}&pageSize=${this.pageSize}&sort[0][field]=${this.sortColumn}&sort[0][dir]=${this.sortDirection}${filterQuery}`;

    console.log('getData filterParams',filterParams);

//    this._dataService.getEvents(id, this.fromDate, this.toDate, this.selectedCategory, this.Descrip)
    this._dataService.getEventsf(filterParams)
    .subscribe(res => {
      this.EventDataList = res.data;
      console.log("EventDataList=",this.EventDataList, "Total", res.total);

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

 
   open(event : Event) {
    //console.log("open(event)=",event);
    //if (event.date!=null)
    //  event.date = new Date(formatDate(event.date, 'MM-dd-yyyy', 'en-US'));


    this.message = "here is the select id = " + event.id;
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
 
  onChangeName(person : Person) {
    console.log("person=",person);
    this.selectedPerson=person;
    this.getData();
  }

  onChange(Category) {
    console.log("Category=",Category);
    this.selectedCategory=Category;
    this.getData();
  }

}
