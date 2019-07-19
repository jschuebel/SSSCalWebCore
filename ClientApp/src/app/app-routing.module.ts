import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PictureComponent } from './picture/picture.component';
import { PersonsearchComponent } from './personsearch/personsearch.component';
import { EventsearchComponent } from './eventsearch/eventsearch.component';

const routes: Routes = [{
  path: 'person',
  component: PersonsearchComponent
},
{
  path: 'event',
  component: EventsearchComponent
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
