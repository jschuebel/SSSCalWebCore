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
  PeopleDataList : Person[] = [];
  AddressList : Address[] = [];
  selectedPerson: Person;
  selectedAddress: Address;
  
  sortColumn: string = 'Name';
  sortDirection : string = "asc";
  filterField:string = 'Name';
  filterValue:string = '';
  isFilteringRequest:boolean=false;
  startFilterTime:number;

  currentPage = 1;
  pageSize = 10;
  numberOfPages=0;
  closeResult: string;

  constructor(private _dataService:DataService) { 
    this.selectedPerson = new Person();
    this.selectedAddress = new Address();
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    let filterQuery='';
    let filterOp = 'contains'; //'gte';
    let prevFilterValue = this.filterValue;

    if (this.isFilteringRequest)
      filterQuery=`&filter[logic]=and&filter[filters][0][field]=${this.filterField}&filter[filters][0][operator]=${filterOp}&filter[filters][0][value]=${this.filterValue}`;
    var filterParams = `page=${this.currentPage}&pageSize=${this.pageSize}&sort[0][field]=${this.sortColumn}&sort[0][dir]=${this.sortDirection}${filterQuery}`;
    this._dataService.getUsers(filterParams)
    .subscribe(res => {
      this.PeopleDataList = res.data;
      console.log("peoplelist=",this.PeopleDataList);
      if (res.total>0 && res.total < this.pageSize)
        this.numberOfPages = 1;
      else
        this.numberOfPages = Math.round(res.total / this.pageSize);
      console.log("numberOfPages=",this.numberOfPages, "total returned",res.total);
      console.log("isFilteringRequest",this.isFilteringRequest, "prevFilterValue",prevFilterValue, "filterValue",this.filterValue);
      //if (filtered and value has changed requery)
      if (this.isFilteringRequest)
      {
        if (prevFilterValue != this.filterValue)
        {
          this.startFilterTime=0;
          this.isFilteringRequest=false;
          this.filter({ col:this.filterField, val:this.filterValue});
        }
        this.startFilterTime=0;
        this.isFilteringRequest=false;
      }

    });

  }

  setPage() {
    if (this.currentPage < 1) {
      this.currentPage=1;
    }
    else {
      if (this.currentPage > this.numberOfPages) {
        this.currentPage=this.numberOfPages;
      }
    }
    console.log("setPage currpage=", this.currentPage, "   pagesize=", this.pageSize);
    this.getData();
  }




  sort(data) {
    console.log("sort event=",data);
    this.sortColumn = data.col;
    this.sortDirection = 'asc';
    if (data.desc)
      this.sortDirection = 'desc';
    this.getData();
  }
  
  filter(data){
    console.log("filter event=",data, "startTime",this.startFilterTime, "isFilteringRequest",this.isFilteringRequest);
    this.filterField = data.col;
    this.filterValue = data.val;
    let duration = 0;
    if (this.startFilterTime>0)
    {
      duration = ((new Date()).getTime()-this.startFilterTime) / 1e4;
      console.log("duration",duration);
    }
    //if startTime==0 || duration((curr-startTime)/10000 > 0.500 && isFilteringRequest==false getdata
    if (((duration==0)||(duration > 0.300)) && this.isFilteringRequest==false)
    {
      console.log('----------------- filtering');
      this.startFilterTime=((new Date()).getTime());
      this.isFilteringRequest=true;
      this.currentPage = 1;
      this.getData();
    }
  }
  
  //method to hide popup
  hide()
  {
    this.showModal = false;
  }

  //show popup
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
