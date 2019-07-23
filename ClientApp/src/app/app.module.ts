import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PictureComponent } from './picture/picture.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';


//needed for Modal popup  input control
import { FormsModule }   from '@angular/forms';


import { Windowref } from './windowref.service';
import { DataService } from './data.service';
import { AuthService } from './auth.service'
import { PersonsearchComponent } from './personsearch/personsearch.component';
import { EventsearchComponent } from './eventsearch/eventsearch.component';
import { TablecolumnfilterComponent } from './tablecolumnfilter/tablecolumnfilter.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PictureComponent,
    TablecolumnfilterComponent,
    EventsearchComponent,
    PersonsearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataService, AuthService, Windowref,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
