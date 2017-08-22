import { Component, ViewContainerRef } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

// app routes

import { AppState } from './app.service';
import 'rxjs/add/operator/pairwise';


@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  public title = 'app works!';
  private apiURL = 'http://localhost:5000/api/patient_list';
	// data:any={};

  data: any = null;

  temp: any = {
    prev: undefined,
    curr: undefined
  }
  public constructor(private viewContainerRef: ViewContainerRef,
    public appState: AppState, private router: Router
  ) {
    /**
    * Implementing localStorage to set previous Url based on router NavigationStart and NavigationEnd events;
    * (e) is the parameter in the below snippet;
    * [0] and [1] are the properties for router events;
    */
		// save prev and curr url's;
    this.router.events.pairwise().subscribe((e) => {
      this.temp['prev'] = e[0]['url'] ? e[0]['url'] : undefined;
      this.temp['curr'] = e[1]['url'] ? e[1]['url'] : undefined;

      if (this.temp['prev'] && this.temp['curr'] && this.temp['prev'] !== this.temp['curr']) {
        localStorage.setItem('prevUrl', this.temp.prev);
      }
    })
  }
}

