import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'sa-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  timeStamp: any;
  constructor() {}

  ngOnInit() {
     this.timeStamp =  Date.now();
  }

}
