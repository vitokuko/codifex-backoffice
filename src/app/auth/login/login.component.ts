import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('ngForm')
  private myForm: NgForm;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  working: Boolean = true;
  constructor(private router: Router) {
    var eventSource = new window['EventSource']("http://codifex-api.herokuapp.com/api/departements/change-stream? format=change-stream");
    eventSource.addEventListener('data', function(msg) {
      var raw = msg.data;
      var data = JSON.parse(raw);
      console.log(data); // => change obj
    });
  }

  ngOnInit() {

  }

  login(value) {
    console.log(value);
    //this.router.navigate(['/home']);
    document.getElementById('unique').click();
    this.working = false;
  }

}
