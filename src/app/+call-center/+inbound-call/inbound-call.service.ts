import { APIServices } from './../../shared/services/api.services';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { barChartDemoOptions } from '../../+graphs/+flot-charts/flot-examples';


@Injectable()
export class InboundService extends APIServices {

  getInboundData(): Observable<any> {
    const url = 'https://sb-fhir-dstu2.smarthealthit.org/api/smartdstu2/open/Patient/SMART-1551992';
    console.log(url);
    return this._http.get(url, this.options).map((response: any) => {return response.json(); }).catch(this.handleError.bind(this));
  }
  getPatientsList(): Observable<any> {
    const url = this.baseUrl + '/Patients';
    console.log(url);
    return this._http.get(url, this.options).map((response: any) => {return response.json(); }).catch(this.handleError.bind(this));
    // return this._http.get('assets/api/json/patientsList.json');
  }
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
}
