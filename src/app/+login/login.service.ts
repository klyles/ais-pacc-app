import { APIServices } from './../shared/services/api.services';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { Http, Headers, RequestOptions } from '@angular/http';


@Injectable()
export class LoginService  extends APIServices {
  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }

  logout(): void {
    this.isLoggedIn = false;
  }
  onsubmit(credentials: any) {
    const url =  this.baseUrl + '/account/auth2';
    const body = 'username=' + credentials.username + '&password=' + credentials.password;
    console.log(body);
   // return this._http.post(url, this.options).map((response: any) => {return response.json(); }).catch(this.handleError.bind(this));

  }
}
