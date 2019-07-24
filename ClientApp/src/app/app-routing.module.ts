import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PictureComponent } from './picture/picture.component';
import { PersonsearchComponent } from './personsearch/personsearch.component';
import { EventsearchComponent } from './eventsearch/eventsearch.component';
import { CalendarComponent } from './calendar/calendar.component';


const routes: Routes = [{
  path: '',
  redirectTo: 'calendar',
  pathMatch: 'full'
},
{
  path: 'person',
  component: PersonsearchComponent
},
{
  path: 'event',
  component: EventsearchComponent
},
{
  path: 'calendar',
  component: CalendarComponent
},
{
  path: 'picture',
  component: PictureComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
