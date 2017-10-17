import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  form: any = {};
  returnUrl: string;
  constructor(private router: Router, private LoginService: LoginService) { }

  ngOnInit() {
  // retrive the previousUrl from route params or default to '/'

    const prevUrl = localStorage.getItem('prevUrl');
    this.returnUrl = prevUrl ? prevUrl : '/dashboard/analytics';
    // this.setCookie(COOKIE_CONSENT, '1', COOKIE_CONSENT_EXPIRE_DAYS);
  }
  onSubmit() {
    this.LoginService.onsubmit(this.form);
    console.log(this.form);
    alert('login successful! and navigating to ' + this.returnUrl + ' ');
    this.router.navigate([this.returnUrl]);
    // this.setCookie(name, this.form.username, this.form);
  }

  // setCookie() {
  //   const cookieData = '{ ' +
  //   '"server":"' + $('#inin-server').val().trim() + '", ' +
  // //  '"port":"' + $('#inin-port').val().trim() + '", ' +
  //   '"username":"' + $('#inin-username').val().trim() + '",' +
  //   '"station":"' + $('#inin-station').val().trim() + '",'
  //   ' }';
  //     this.setCookie( cookieData, { expires: 31 });
  // }
  private setCookie(name: string, value: string, expireDays: number, path: string = '') {
    const d: Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    const cpath: string = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }
}
