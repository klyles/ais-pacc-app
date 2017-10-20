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
  isSignOn: boolean;
  constructor(private router: Router, private LoginService: LoginService) { }

  ngOnInit() {
  // retrive the previousUrl from route params or default to '/'
    this.isSignOn = false;
    const prevUrl = localStorage.getItem('prevUrl');
    this.returnUrl = prevUrl ? prevUrl : '/dashboard/analytics';
  }
  onSubmit() {
    this.LoginService.onsubmit(this.form);
    console.log(this.form);
    alert('login successful! and navigating to ' + this.returnUrl + ' ');
    this.router.navigate([this.returnUrl]);
    this.isSignOn = true;
    this.fetchCookie();
  }

  private setCookie(name: string, value: string, expireDays: number, path: string = '') {
    const d: Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    const cpath: string = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }
  public fetchCookie() {
    const path = 'accesion_CRM-Lite_internal';
    const expiry = new Date();
    const name = this.form.username;
    const password = this.form.password;
    const init_sso = this.isSignOn;
    document.cookie = 'CRM_seton=' + path + ';' + expiry + ';'
    + name + ';' + password + ';' + init_sso;
    console.log('setCookie');
  }
}
