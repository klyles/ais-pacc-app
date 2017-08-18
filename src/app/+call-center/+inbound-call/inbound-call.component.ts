import { Component, OnInit, ViewChild } from '@angular/core';
import {FadeInTop} from "../../shared/animations/fade-in-top.decorator";
import { ModalDirective } from 'ngx-bootstrap/modal';

@FadeInTop()
@Component({
  selector: 'sa-inbound-call',
  templateUrl: './inbound-call.component.html',
  styles: [`
  .display-none {
    visibility: hidden;
  }
  .display-block {
    visibility: visible;
  }`]
})
export class InboundCallComponent implements OnInit {
  @ViewChild('childModal') public childModal:ModalDirective;
  callStatus: string = '';

  startCallTime: any;
  endCallTime: any;
  callDuration: any;
  totalMinutes: any;
  totalSeconds: any;
  totalCallTime: any;

  startLoad: boolean;
  endLoad: boolean;

  constructor() {
    this.startLoad = false;
    this.endLoad = false;
  }

  ngOnInit() {
  }
  public saveNotes(): void {
   this.childModal.show();
  }
  public hideChildModal(): void {
   this.childModal.hide();
  }
  startCall() {
      this.startLoad = true;
      this.startCallTime =  Date.now();
      console.log(this.startCallTime);
  }
  endCall() {
      this.endLoad = true;
      this.endCallTime =  Date.now();
      console.log(this.endCallTime);
  }
  // getCallDuration(callDuration) {
  //     let callDuration = Math.abs(this.endCallTime - this.startCallTime) / 36e5;
  //     return callDuration;
  //     // this.totalMinutes = Math.floor(this.callDuration/60000);
  //     // this.totalSeconds = ((this.callDuration % 60000) / 1000).toFixed(0);
  //     // this.totalCallTime = this.totalMinutes + ":" + (this.totalSeconds < 10 ? '0': '') + this.totalSeconds;
  //     this.totalMinutes = (callDuration / 60000);
  //     // this.totalSeconds = (this.callDuration/1000) % 60;
  //     console.log(this.totalMinutes);
  // }

}
