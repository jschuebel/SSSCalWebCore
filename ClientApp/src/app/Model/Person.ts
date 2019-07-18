import { Event } from '../Model/Event';
import { Address } from '../Model/Address';

export class PersonsVM {
  total:number;
  data:Person[] = [];
}
export class Person {
    id:number;
    addressId:number;
    address:Address;
    name: string;
    homephone: string;
    eMail: string;
    mobile: string;
    work: string;
    pager: string;
    fax: string;
    birthdayAlert:boolean;
    events: Event[] = [];
    constructor() {
		this.name = "";
      this.events.push(new Event());
    }
    
  };

 
  //person":[{"_id":25,"id":25,"Name":"Professional Barbarbers","Home Phone":"214-368-1874","Work":"","Pager":"","Fax":"","Mobile":"","E-Mail":"Bills place","Address ID":1,"BirthdayAlert":false,"createdate":"1999-11-10T00:00:00.000Z"}]}