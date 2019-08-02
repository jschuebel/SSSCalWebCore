import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { PersonsearchComponent } from './personsearch.component';
import { TablecolumnfilterComponent } from '../tablecolumnfilter/tablecolumnfilter.component';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { DataService } from '../data.service';
import { Person, PersonsVM } from '../Model/Person';
import { Address } from '../Model/Address';
import { Observable, of } from 'rxjs';


describe('PersonsearchComponent', () => {
  let component: PersonsearchComponent;
  let fixture: ComponentFixture<PersonsearchComponent>;
  let testBedService:DataService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonsearchComponent,    TablecolumnfilterComponent   ],
      imports: [ 
        BrowserModule,
        FormsModule,
        HttpClientTestingModule
      ],
      providers:[DataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(PersonsearchComponent);
    component = fixture.componentInstance;
    testBedService = TestBed.get(DataService);
    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it('should create DataService',
    inject([DataService], (injectedDataService:DataService) => {
      expect(injectedDataService).toBe(testBedService);
    })
  );

  it('should have getData', () => {
    expect(component.getData()).not.toBeNull()
  });

  

  it('should have 1 Person in PeopleDataList', () => {
    spyOn(testBedService,'getUsers').and.returnValue(of({
      total:1,
      data : [ new Person()]
    }));
    expect(component.getData()).not.toBeNull();
    expect(component.PeopleDataList.length).toEqual(1);
  });


/*
  it('should getdata exist',
  inject([DataService], (injectedDataService:DataService) => {
    expect(component.getData()).toBeTruthy();
  })
);
  
  it('should have 1 Person in PeopleDataList', () => {
    expect(component.getData()).not.toBeNull();
    expect(component.PeopleDataList.length).toEqual(1);
  });
*/
});
