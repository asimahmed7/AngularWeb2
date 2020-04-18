import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatCardActions } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) {
    console.log('iiii mundo');
  }

  username: string;

  password: string;

  showSpinner: boolean = false;


  ngOnInit() {
  }


  login(): void {
    if (this.username == 'admin' && this.password == 'admin') {
      this.router.navigate(["/emp/list"]);
    } else {
      alert("Invalid credentials");
    }
  }
}


