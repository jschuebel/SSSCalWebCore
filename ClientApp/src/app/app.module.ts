import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PictureComponent } from './picture/picture.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


//needed for Modal popup  input control
import { FormsModule }   from '@angular/forms';


import { Windowref } from './windowref.service';
import { DataService } from './data.service';
import { PersonsearchComponent } from './personsearch/personsearch.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PictureComponent,
    PersonsearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataService, Windowref],
  bootstrap: [AppComponent]
})
export class AppModule { }
