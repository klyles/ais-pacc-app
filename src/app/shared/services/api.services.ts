import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { BaseHeader, BaseUrl, BaseICUrl } from './apiconfig';

@Injectable()
export class APIServices {
  protected baseUrl: string;
  protected headers: any;
  protected options: any;
  protected baseICUrl: string;

  constructor(protected _http: Http,
              private router: Router) {
    const _build = (<any> _http)._backend._browserXHR.build;
    (<any> _http)._backend._browserXHR.build = () => {
      const _xhr = _build();
      _xhr.withCredentials = true;
			/* set _xhr.withCredentials = true; when needed cookies to include in CORS */
      return _xhr;
    };
    this.baseUrl = BaseUrl;
    this.baseICUrl = BaseICUrl;
    this.headers = new Headers(BaseHeader);
    this.options = new RequestOptions({headers: this.headers});
  }

	/**
	 * extract json file data
	 * @param {Response} res [json]
	 * usage:
	 * Observable.map(extractData);
	 */
  protected extractData(res: Response) {
    const body = res.json();
    if (body) {
      return body.data || body
    } else {
      return {}
    }
  }
	/**
	 * error handler based on api response
	 * @param {any} error
	 * usage:
	 * Observable.catch(handleError);
	 */
  protected handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
