import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {routing} from './app.routing';
import { HomeComponent } from './home/home.component';
import {HomeModule} from './home/home.module';
import { AuthComponent } from './auth/auth.component';
import {AuthModule} from './auth/auth.module';
import { FormsModule } from '@angular/forms';
import {SpinnerModule} from "angular2-spinner/dist";
import {HttpModule} from "@angular/http";
declare var require:any;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HomeModule,
    AuthModule,
    FormsModule,
    SpinnerModule,
    HttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
