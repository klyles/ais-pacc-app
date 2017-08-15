import { Component, OnInit } from '@angular/core';
import {FadeInTop} from "../../shared/animations/fade-in-top.decorator";

@FadeInTop()
@Component({
  selector: 'sa-inbound-call',
  templateUrl: './inbound-call.component.html',
})
export class InboundCallComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
