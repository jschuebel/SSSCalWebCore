import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';

//import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators';

//import 'rxjs/add/operator/toPromise';
//replaced by Observable().toPromise

import { Address } from './Model/Address';
import { Event } from './Model/Event';
import { Person, PersonsVM } from './Model/Person';



@Injectable({
  providedIn: 'root'
})
export class DataService {
	result:any;
	result2:any;
 
  constructor(private _http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getPictures()  {
    //force result to string
      return this._http.get("./Inetpub.json", {responseType: 'text'});
  }

  getUsers() {
      return this._http.get<PersonsVM>(this.baseUrl + 'api/person?page=1&pageSize=10');
}

  getPerson(id:number) {
        console.log("id",id);
        console.log("url", this.baseUrl + 'api/person/' + id);
        return this._http.get<Person>(this.baseUrl + 'api/person/' + id);
      }
    


}
