import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './accueil/accueil.component';
import {HomeRouting} from "./home.routing";
import { PavillonComponent } from './pavillon/pavillon.component';
import {FormsModule} from "@angular/forms";
import {ToasterModule} from "angular2-toaster";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {HttpModule} from "@angular/http";
import {IonRangeSliderModule} from "ng2-ion-range-slider";

@NgModule({
  imports: [
    CommonModule,
    HomeRouting,
    FormsModule,
    ToasterModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpModule,
    IonRangeSliderModule
  ],
  declarations: [AccueilComponent, PavillonComponent]
})
export class HomeModule { }
