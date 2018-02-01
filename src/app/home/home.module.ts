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
import {ChartModule} from "angular2-highcharts";
import {HighchartsStatic} from "angular2-highcharts/dist/HighchartsService";
import { SpecificationComponent } from './specification/specification.component';
declare let require: any;


export function highchartsFactory() {
  const hc = require('highcharts/highstock');
  const dd = require('highcharts/modules/exporting');
  const de = require('highcharts/highcharts-3d.js');
  dd(hc);
  de(hc);
  return hc;
}

@NgModule({
  imports: [
    CommonModule,
    HomeRouting,
    FormsModule,
    ToasterModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpModule,
    IonRangeSliderModule,
    ChartModule
  ],
  providers: [
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ],
  declarations: [AccueilComponent, PavillonComponent, SpecificationComponent]
})
export class HomeModule { }
