import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../+login/login.service';

declare var $: any;

@Component({
  selector: 'sa-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  searchMobileActive = false;
  sessionID: any;
  userName: any;
  constructor(private router: Router, private _loginService: LoginService) {
    this.isLoggedIn = false;
  }

  ngOnInit() {
  this.getUserTimeOut();
  }

  public getUserTimeOut() {
    setTimeout(() => this. getUserInfo(), 1000);
  }

  getUserInfo() {
    console.log('headers in it')
    this.sessionID = sessionStorage.getItem('SessionId');
    this.userName = sessionStorage.getItem('userName');
    console.log(this.userName);
  }
  toggleSearchMobile() {
    this.searchMobileActive = !this.searchMobileActive;

    $('body').toggleClass('search-mobile', this.searchMobileActive);
  }

  onFullScreen() {
    const $body = $('body');
    const documentMethods = {
      enter: ['requestFullscreen', 'mozRequestFullScreen', 'webkitRequestFullscreen', 'msRequestFullscreen'],
      exit: ['cancelFullScreen', 'mozCancelFullScreen', 'webkitCancelFullScreen', 'msCancelFullScreen']
    };

    if (!$body.hasClass('full-screen')) {
      $body.addClass('full-screen');
      document.documentElement[documentMethods.enter.filter((method) => {
        return document.documentElement[method]
      })[0]]()
    } else {
      $body.removeClass('full-screen');
      document[documentMethods.exit.filter((method) => {
        return document[method]
      })[0]]()
    }
  }

  onSubmit() {
    this.router.navigate(['/miscellaneous/search']);

  }
}
