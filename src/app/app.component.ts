import { DataServiceService } from './data-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [DataServiceService]
})
export class AppComponent implements OnInit {
  title = "app";

  constructor(public dataService: DataServiceService, public router: Router) {}

  ngOnInit() {
    console.log(this.dataService.isConnected());
    if (this.dataService.isConnected() == false) {
      this.router.navigate(["/auth/login"]);
    } else {
      this.router.navigate(["/home/accueil"]);
    }
  }
}
