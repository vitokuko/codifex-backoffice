import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  providers: [DataServiceService]
})
export class HomeComponent implements OnInit {
  constructor(public dataService: DataServiceService, public router: Router) {}

  ngOnInit() {}

  logout() {
    this.dataService.logout();
    this.router.navigate(["/auth/login"]);
  }
}
