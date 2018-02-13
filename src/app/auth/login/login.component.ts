import { DataServiceService } from './../../data-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";
import { ToasterConfig, ToasterService, Toast } from 'angular2-toaster';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [DataServiceService]
})
export class LoginComponent implements OnInit {
  @ViewChild("ngForm") private myForm: NgForm;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  working: Boolean = true;
  urlUserCodifex = "userCodifexes/login";
  // configuration du toaster
  public toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: "toast-top-right"
  });

  constructor(
    public dataService: DataServiceService,
    public router: Router,
    private toasterService: ToasterService
  ) {
    this.toasterService = toasterService;
  }

  popToast(type, titre, message) {
    const toast: Toast = {
      type: type,
      title: titre,
      body: message
    };
    this.toasterService.pop(toast);
  }

  ngOnInit() {}

  login(value) {
    this.working = false;
    console.log(this.urlUserCodifex);
    this.dataService.addData(this.urlUserCodifex, value.value).subscribe(
      data => {
        this.dataService.setToken(data.id);
        this.popToast("success", "Successful", "authentification reussit");
        this.dataService.setUser(data);
        document.getElementById("home").click();
        console.log(data);
      },
      error => {
        this.working = true;
        value.onReset();
        this.handleError(error);
      }
    );
  }

  handleError(error) {
    this.popToast("error", "Error", "authentification failed");
    console.log(error);
  }
}
