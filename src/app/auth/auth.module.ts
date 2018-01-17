import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {routing} from './auth.routing';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {SpinnerModule} from "angular2-spinner/dist";

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    SpinnerModule
  ],
  declarations: [LoginComponent, RegisterComponent]
})
export class AuthModule { }
