import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {routing} from './auth.routing';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {SpinnerModule} from "angular2-spinner/dist";
import { ToasterModule } from "angular2-toaster";
import {
  BrowserAnimationsModule,
  NoopAnimationsModule
} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
    SpinnerModule,
    ToasterModule,
    BrowserAnimationsModule,
    NoopAnimationsModule
  ],
  declarations: [LoginComponent, RegisterComponent]
})
export class AuthModule {}
