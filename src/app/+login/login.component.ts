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
  constructor(private router: Router, private _loginService: LoginService) { }

  ngOnInit() {
  // retrieve the previousUrl from route params or default to '/'
    this.isSignOn = false;
    const prevUrl = localStorage.getItem('prevUrl');
    this.returnUrl = prevUrl ? prevUrl : '/dashboard/analytics';
    this.getIcFeatures();
    this.getIcVersion();
    this.getIcSSO();
    this.ssoTimeOut();
    // this.reDirectUri();
    // this.getSSOReturn();
    // this.postSamlRequest();
  }
  reDirectUri() {
    window.open('https://ciccrm.ascension.org/api/ahwivrtxpla001.ds.sjhs.com/icws/connection/single-sign-on' +
    '/identity-providers/' + this.idProviders + '?' +
    'singleSignOnCapabilities=saml2Post%2Csaml2Redirect&redirectUri=https%3A%2F%2Fwww.google.com');

    console.log('navigating to: https://www.google.com');
  //  this.getSSOResponse();
    this.responseTimeOut();
  }
  getIcFeatures() {
    this._loginService.getIcFeatures()
    .subscribe(
      (response: any) => {
        console.log(response);
      }
    )
  }
  getIcVersion() {
    this._loginService.getIcVersion()
    .subscribe(
      (response: any) => {
        console.log(response);
      }
    )
  }
  getIcSSO() {
    this._loginService.getIcSSO()
    .subscribe(
      (response: any) => {
        this.idProviders = response.authentication.identityProviders[0].identityProviderId;
      }
    )
    // this.reDirectUri();
  }
  public ssoTimeOut() {
    setTimeout(() => this.getIcSSOProviders(), 1000);
  }
  getIcSSOProviders() {
    this._loginService.getSSOidProviders(this.idProviders)
    .subscribe(
      (response: any) => {
        console.log(this.ssoHTML);
      }
    )
   this.reDirectUri();
  }
  public responseTimeOut() {
    setTimeout(() => this.getSSOResponse(), 5000);
  }
  getSSOResponse() {
    this._loginService.getSSOResponse()
    .subscribe(
      (response: any) => {
        this.singleSignOnToken = response.singleSignOnToken;
        console.log(this.singleSignOnToken);
      }
    )
  }
  postSamlRequest() {
    this._loginService.postSamlRequest()
  }
  getSSOReturn() {
    this._loginService.getSSOReturn()
    .subscribe(
      (response: any) => {
        console.log(response);
      }
    )
  }

  onSubmit() {
    this.form = {
      '__type': 'urn:inin.com:connection:singleSignOnTokenConnectionRequestSettings',
      'applicationName': 'Interaction Connect',
      'singleSignOnToken': this.singleSignOnToken
      // 'SAMLRequest' : 'PHNhbWxwOkF1dGhuUmVxdWVzdCAgICB4bWxuczpzYW1sPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXNzZXJ0aW9uIiAgICB4bWxuczpzYW1scD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOnByb3RvY29sIiAgICBJRD0iX2YzNWY2ZTQ5MzMzYjM1MTc5MTQxZWEwODI5YjY1MDIwIiAgICBWZXJzaW9uPSIyLjAiICAgIElzc3VlSW5zdGFudD0iMjAxNy0xMC0yNFQxNjo0MzoxNy43MTEzNDdaIiAgICBEZXN0aW5hdGlvbj0iaHR0cHM6Ly9jaWNjcm0uYXNjZW5zaW9uLm9yZy9hcGkvYWh3aXZydHhwbGEwMDEuZHMuc2pocy5jb20vaWN3cy9jb25uZWN0aW9uL3NpbmdsZS1zaWduLW9uL2F1dGhlbnRpY2F0aW9uL1dpbmRvd3NJRFAvbG9naW4',
      // 'RelayState' : '90c22f9b-0a9d-4474-87f4-b48eccbe3095|r:https://ciccrm.ascension.org/#/single-sign-on/ahwivrtxpla001.ds.sjhs.com/ahwivrtxpla001.ds.sjhs.com'
    }
    this._loginService.onsubmit(this.form)
    alert('login successful! and navigating to ' + this.returnUrl + ' ');
    this.router.navigate([this.returnUrl]);
    this.isSignOn = true;
  }
}
