import { TestBed, inject } from '@angular/core/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';

import { Address } from './Model/Address';
import { Event, EventsVM } from './Model/Event';
import { Person, PersonsVM } from './Model/Person';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ DataService]
    });
  });

  it(
    'should get events',
    inject(
      [HttpTestingController, DataService],
      (
        httpMock: HttpTestingController,
        dataService: DataService
      ) => {
        // ...our test logic here
        let mockUsers: EventsVM = {
          total:1,
          data : [ new Event()]
        };

        dataService.getEventsf("page=1&pageSize=10&sort[0][field]=Name&sort[0][dir]=asc").subscribe(res  => {
//          expect(res.data).toEqual(mockUsers);
          expect(res.data).toBeTruthy();
        });

        const mockReq = httpMock.expectOne('http://localhost:9876/api/event?page=1&pageSize=10&sort[0][field]=Name&sort[0][dir]=asc');
        expect(mockReq.request.method).toEqual('GET');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockUsers);

        httpMock.verify();



      }
    )
  );
});