import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { CalendarComponent } from './calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!
import { DataService } from '../data.service';

class MockDataService extends DataService {
  getData() {}
}

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarComponent ],
      imports: [ 
        BrowserModule,
        FormsModule,
        FullCalendarModule,
        HttpClientTestingModule
      ],
      providers: [ {provide: DataService, useClass: MockDataService} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
