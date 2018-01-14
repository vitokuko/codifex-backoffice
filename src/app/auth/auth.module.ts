import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {routing} from "./auth.routing";
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [LoginComponent]
})
export class AuthModule { }
