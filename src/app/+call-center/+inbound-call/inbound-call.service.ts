import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';


@Injectable()
export class InboundService {

  constructor(private _http: Http) {

  }
  getInboundData(): Observable<any> {
    const url = 'https://sb-fhir-dstu2.smarthealthit.org/api/smartdstu2/open/Patient/SMART-1551992';
    console.log(url);
    // let options = new RequestOptions({headers: headers})
    return this._http.get(url).map((response: any) => {return response.json(); });
  }
}

