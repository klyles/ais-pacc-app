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
  postResponse: any;
  sessionId: any;
  userId: any;
  userName: any;
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
    }
    this._loginService.onsubmit(this.form)
      .subscribe((response: any) => {
       this.postResponse = response;
       this.sessionId = response.sessionId;
       this.userId = response.userID;
       this.userName = response.userDisplayName;
       localStorage.setItem('SessionId', this.sessionId);
       localStorage.setItem('userName', this.userName);
       console.log(this.sessionId);
       console.log(this.userId);
    });
    alert('login successful! and navigating to ' + this.returnUrl + ' ');
    this.router.navigate([this.returnUrl]);
    this.isSignOn = true;
  }
}
