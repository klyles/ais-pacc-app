import {Component, ViewContainerRef} from '@angular/core';
import {Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  public title = 'app works!';
  private apiURL='http://localhost:5000/api/patient_list';
  //data:any={};

  data: any = null;


  public constructor(private viewContainerRef: ViewContainerRef) {}

}
