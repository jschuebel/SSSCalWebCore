import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';

//import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators';

//import 'rxjs/add/operator/toPromise';
//replaced by Observable().toPromise

import { Address } from './Model/Address';
import { Event, EventsVM } from './Model/Event';
import { Person, PersonsVM } from './Model/Person';



@Injectable({
  providedIn: 'root'
})
export class DataService {
	result:any;
	result2:any;
 
  constructor(private _http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  login(person : Person ) {
    var hldperson = JSON.parse(JSON.stringify(person));
    return this._http.post<any>(`${this.baseUrl}api/auth/token`,{person:person});
     //.map(result=>this.result=result.json().data);
  }

  //https://blog.angularindepth.com/the-new-angular-httpclient-api-9e5c85fe3361
  //https://angular.io/guide/http  
  loggeduser() {
    /* Manual addition of header ****
    let currTokenVal:string = localStorage.getItem("currToken");

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + currTokenVal
      })
      };
    return this._http.post<any>("/api/test", {}, httpOptions);
      */
     return this._http.post<any>(`${this.baseUrl}api/auth/loggeduser`, {});
    

    /* pre-v7.0
    var headers = new Headers();
    let currTokenVal:string = localStorage.getItem("currToken");

    headers.append('Authorization', 'Bearer ' + currTokenVal);
    headers.append('Content-Type', 'application/json');

    return this._http2.post("/api/test",{})
     .map(result=>this.result=result.json().data);
    */
    }


  getPictures()  {
    //force result to string
      return this._http.get("./Inetpub.json", {responseType: 'text'});
  }

  getUsers(filterParams:string)
  {
      console.log("getUsers filterParams=", filterParams);
          
      return this._http.get<PersonsVM>(`${this.baseUrl}api/person?${filterParams}`);
  }

  getPerson(id:number) {
        console.log("url", `${this.baseUrl}api/person/` + id);
        return this._http.get<Person>(`${this.baseUrl}api/person/${id}`);
      }

  getEventsf(filterParams:string)
  {
    console.log("getEventsf filterParams=", filterParams);
    console.log("getEventsf url=", `${this.baseUrl}api/event?${filterParams}`);

      return this._http.get<EventsVM>(`${this.baseUrl}api/event?${filterParams}`);
  }

  getEvents(UserID:number, fromDate: string, toDate: string, cat: string, descrip : string) {
        //Restful : "/api/events/"+ UserID
        console.log("getEvents  UserId=", UserID, "  fromDate=", fromDate, "  toDate=", toDate, "  cat=", cat, "  descrip=", descrip);

        var rout=`${this.baseUrl}api/event`;
        if (UserID!==null && UserID!=0)
          rout+="?userid="+UserID;
    
        if (fromDate!=null) {
          if (rout.indexOf("?")==-1)  rout+="?"
          rout+="&fromdate="+fromDate;
        }
    
        if (toDate!=null) {
          if (rout.indexOf("?")==-1)  rout+="?"
          rout+="&todate="+toDate;
        }
    
        if (cat!=null) {
          if (rout.indexOf("?")==-1)  rout+="?"
          rout+="&cat="+cat;
        }
    
        if (descrip!=null) {
          if (rout.indexOf("?")==-1)  rout+="?"
          rout+="&descrip="+descrip;
        }
    
    
        console.log("getEvents rout=", rout,);
          
          return this._http.get<Array<Event>>(rout);
      }
    
      
      getAddresses() {
        return this._http.get<any>("/api/addresses");
      }
      
      getCategories()   {
        return this._http.get<any>("/api/categories");//.map(result=>this.result=result.json().data);
      }
    

}
