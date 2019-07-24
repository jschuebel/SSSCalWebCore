import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DataService } from '../data.service';


//https://www.npmjs.com/package/@fullcalendar/angular
//defaultView: "dayGridMonth"
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarPlugins = [dayGridPlugin]; // important!
  eventsModel: any[] = [];
  viewDate: Date;
  sortColumn: string = 'Date';
  sortDirection : string = "asc";
  
  constructor(private _dataService:DataService) {
   }

  ngOnInit() {
    this.viewDate = new Date();
  }

  eventsModelLoad(model){
    console.log("!!!!!!!!!!!!!!!!!!!eventClick", model);

  }
  eventClick(model) {
    console.log("eventClick", model);
  }

  
  loading(model) {
    console.log("****** loading", model);
  }
}
