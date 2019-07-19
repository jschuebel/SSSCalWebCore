import { Person } from './Person';

export class EventsVM {
  total:number;
  data:Event[] = [];
}

export class Topic {
  id:number;
  topicTitle: string;
};

export class Event {
    id:number;
    UserID:number;
    TopicID:number;
    topicf:Topic;
    userName:string;
    Topic: string;
    Category: string;
    Date: Date;
    createdate: Date;
    repeatYearly: boolean;
    repeatMonthly: boolean;
    Description: string;
    DisplayOnly: string;
    eventperson: Person[] = [];
    Emails: number[] = [];
  };
