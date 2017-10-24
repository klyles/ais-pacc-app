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
  idProviders: any;
  ssoHTML: any;
  singleSignOnToken: any;
  isSignOn: boolean;
  constructor(private router: Router, private LoginService: LoginService) { }

  ngOnInit() {
  // retrive the previousUrl from route params or default to '/'
    this.isSignOn = false;
    const prevUrl = localStorage.getItem('prevUrl');
    this.returnUrl = prevUrl ? prevUrl : '/dashboard/analytics';
    this.getIcFeatures();
    this.getIcVersion();
    this.getIcSSO();
    this.ssoTimeOut();
    // this.postSamlRequest();
  }
  getIcFeatures() {
    this.LoginService.getIcFeatures()
    .subscribe(
      (response: any) => {
        console.log(response);
      }
    )
  }
  getIcVersion() {
    this.LoginService.getIcVersion()
    .subscribe(
      (response: any) => {
        console.log(response);
      }
    )
  }
  getIcSSO() {
    this.LoginService.getIcSSO()
    .subscribe(
      (response: any) => {
        this.idProviders = response.authentication.identityProviders[0].identityProviderId;
      }
    )
  }
  public ssoTimeOut() {
    setTimeout(() => this.getIcSSOProviders(), 1000);
  }
  getIcSSOProviders() {
    this.LoginService.getSSOidProviders(this.idProviders)
    .subscribe(
      (response: any) => {
        console.log(this.ssoHTML);
      }
    )
    this.getSSOResponse();
  }
  getSSOResponse() {
    this.LoginService.getSSOResponse()
    .subscribe(
      (response: any) => {
        this.singleSignOnToken = response.singleSignOnToken;
        console.log(this.singleSignOnToken);
      }
    )
  }
  postSamlRequest() {
    this.LoginService.postSamlRequest()
  }
  onSubmit() {
    this.form = {
      '__type': 'urn:inin.com:connection:singleSignOnTokenConnectionRequestSettings',
      'applicationName': 'Interaction Connect',
      'singleSignOnToken': this.singleSignOnToken
      // 'SAMLRequest' : 'PHNhbWxwOkF1dGhuUmVxdWVzdCAgICB4bWxuczpzYW1sPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXNzZXJ0aW9uIiAgICB4bWxuczpzYW1scD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOnByb3RvY29sIiAgICBJRD0iX2YzNWY2ZTQ5MzMzYjM1MTc5MTQxZWEwODI5YjY1MDIwIiAgICBWZXJzaW9uPSIyLjAiICAgIElzc3VlSW5zdGFudD0iMjAxNy0xMC0yNFQxNjo0MzoxNy43MTEzNDdaIiAgICBEZXN0aW5hdGlvbj0iaHR0cHM6Ly9jaWNjcm0uYXNjZW5zaW9uLm9yZy9hcGkvYWh3aXZydHhwbGEwMDEuZHMuc2pocy5jb20vaWN3cy9jb25uZWN0aW9uL3NpbmdsZS1zaWduLW9uL2F1dGhlbnRpY2F0aW9uL1dpbmRvd3NJRFAvbG9naW4',
      // 'RelayState' : '90c22f9b-0a9d-4474-87f4-b48eccbe3095|r:https://ciccrm.ascension.org/#/single-sign-on/ahwivrtxpla001.ds.sjhs.com/ahwivrtxpla001.ds.sjhs.com'
    }
    this.LoginService.onsubmit(this.form);
    alert('login successful! and navigating to ' + this.returnUrl + ' ');
    this.router.navigate([this.returnUrl]);
    this.isSignOn = true;
  }

  // private setCookie(name: string, value: string, expireDays: number, path: string = '') {
  //   const d: Date = new Date();
  //   d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
  //   const expires = `expires=${d.toUTCString()}`;
  //   const cpath: string = path ? `; path=${path}` : '';
  //   document.cookie = `${name}=${value}; ${expires}${cpath}`;
  // }
  // public fetchCookie() {
  //   const path = 'accesion_CRM-Lite_internal';
  //   const expiry = new Date();
  //   const name = this.form.username;
  //   const password = this.form.password;
  //   const init_sso = this.isSignOn;
  //   document.cookie = 'CRM_seton=' + path + ';' + expiry + ';'
  //   + name + ';' + password + ';' + init_sso;
  //   console.log('setCookie');
  // }
}
