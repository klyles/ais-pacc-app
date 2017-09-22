import { APIServices } from './../../shared/services/api.services';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { barChartDemoOptions } from '../../+graphs/+flot-charts/flot-examples';


@Injectable()
export class InboundService extends APIServices {

  getCallStatus(): Observable<any> {
    const url = this.baseUrl + '/call_statuses';
    console.log(url);
    return this._http.get(url, this.options).map((response: any) => {return response.json(); }).catch(this.handleError.bind(this));
  }
  getCallOutComes(): Observable<any> {
    const url = this.baseUrl + '/call_outcomes';
    console.log(url);
    return this._http.get(url, this.options).map((response: any) => {return response.json(); }).catch(this.handleError.bind(this));
  }
  getSearchData(param: string): Observable<any> {
    const url = this.baseUrl + '/Patients/search?filter=' + param;
    console.log(param);
    console.log(url);
    return this._http.get(url, this.options).map((response: any) => {return response.json(); }).catch(this.handleError.bind(this));
  }
  getPatientDetail(param: string) {
    const url = this.baseUrl + '/Patients/' + param;
    console.log(param);
    console.log(url);
    return this._http.get(url, this.options).map((response: any) => {return response.json(); }).catch(this.handleError.bind(this));
  }
  postNewPatient(newData: any) {
    const url = this.baseUrl + '/Patients/create?';
    console.log(url);
    console.log(newData);
    // let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded'});
    // const headers = new Headers({ 'Content-Type': 'application/json'});
    // const options = new RequestOptions({headers: headers});
  return this._http.post(url, newData, this.options).map((response: any) => {return response.json(); }).catch(this.handleError.bind(this));
   }
}
