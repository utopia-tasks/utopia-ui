import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../entity/user';
import { StartUpService } from '../../service/start-up/start-up.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
  userCookie: string;
  sessionIdCookie: string;

  constructor(public router: Router, private cookieService: CookieService, private startUpService: StartUpService) {
  }

  ngOnInit(): void {
    this.startUpService.getPing().subscribe(res => {
      console.log(res);
    });
    this.user = new User();
    this.cookieService.set('token', 'password');
    this.userCookie = this.cookieService.get('token');
    // this.cookieService.set('sessionId','number');
    if (this.userCookie) {
      this.router.navigateByUrl('/all');
    }
  }

  signIn() {
    this.router.navigateByUrl('/all');
  }
}
