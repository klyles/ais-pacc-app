import { APIServices } from './api.services';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { Http, Headers, RequestOptions } from '@angular/http';



@Injectable()
export class LoginService extends APIServices {
  isLoggedIn: boolean = false;
  host = 'testing host';

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }

  logout(): void {
    this.isLoggedIn = false;
  }
  onsubmit(form) {
    const url = this.baseICUrl;
    console.log(url);
    const headers = new Headers({
      'Accept-Language': 'en-US'
    })
    const options = new RequestOptions({ headers: headers });
    // return this._http.post(url, credentials, options).map(res => res.json()).subscribe();
    // const url =  this.baseUrl + '/account/auth2';
    // const body = 'username=' + credentials.username + '&password=' + credentials.password;
    return this._http.post(url, form, options).map((response: any) => { return response.json(); }).catch(this.handleError.bind(this));
  }
  getIcFeatures(): Observable<any> {
    const url = this.baseICUrl + '/features';
    console.log(url);
    return this._http.get(url, this.options).map((response: any) => { return response.json(); }).catch(this.handleError.bind(this));
  }
  getSSOReturn(): Observable<any> {
    const url = this.baseICUrl + '/single-sign-on/return';
    console.log(url);
    return this._http.get(url, this.options).map((response: any) => { return response.json(); }).catch(this.handleError.bind(this));
  }
  getIcVersion(): Observable<any> {
    const url = this.baseICUrl + '/version';
    console.log(url);
    return this._http.get(url, this.options).map((response: any) => { return response.json(); }).catch(this.handleError.bind(this));
  }
  getIcSSO(): Observable<any> {
    const url = this.baseICUrl + '/server-info?singleSignOnCapabilities=saml2Post,saml2Redirect';
    console.log(url);
    return this._http.get(url, this.options).map((response: any) => { return response.json(); }).catch(this.handleError.bind(this));
  }
  getSSOResponse(): Observable<any> {
    const url = this.baseICUrl + '/single-sign-on/response';
    console.log(url);
    return this._http.get(url, this.options).map((response: any) => { return response.json(); }).catch(this.handleError.bind(this));
  }
  getSSOidProviders(id_provider): Observable<any> {
    const url = this.baseICUrl + '/single-sign-on/identity-providers/' + id_provider + '?singleSignOnCapabilities=' +
      'saml2Post%2Csaml2Redirect&' +
      'redirectUri=https://www.google.com';
    // 'redirectUri=http%3A%2F%2Flocalhost%3A4200%2Flogin';
    // 'redirectUri=https%3A%2F%2Fciccrm.ascension.org%2F%23%2Fsingle-sign-on%2Fahwivrtxpla001.ds.sjhs.com';
    console.log(url);
    return this._http.get(url, this.options).map((response: any) => { return response.json(); }).catch(this.handleError.bind(this));
  }
  postSamlRequest() {
    const url = this.baseICUrl + '/features';
    console.log(url);
    const headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this._http.post(url, options).map(res => res.json()).subscribe();
  }
}
