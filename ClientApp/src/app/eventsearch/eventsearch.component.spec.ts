import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//import { BrowserModule } from '@angular/platform-browser';
//import: BrowserModule,
import { FormsModule }   from '@angular/forms';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { EventsearchComponent } from './eventsearch.component';
describe('EventsearchComponent', () => {
  let component: EventsearchComponent;
  let fixture: ComponentFixture<EventsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsearchComponent ],
      imports: [ 
        FormsModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
