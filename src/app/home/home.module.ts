import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilComponent } from './accueil/accueil.component';
import {HomeRouting} from "./home.routing";

@NgModule({
  imports: [
    CommonModule,
    HomeRouting
  ],
  declarations: [AccueilComponent]
})
export class HomeModule { }
