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
    topic: string;
    Category: string;
    date: Date;
    createdate: Date;
    repeatYearly: boolean;
    repeatMonthly: boolean;
    description: string;
    DisplayOnly: string;
    eventperson: Person[] = [];
    Emails: number[] = [];
  };
