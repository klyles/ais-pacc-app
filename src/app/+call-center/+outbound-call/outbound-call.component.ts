import { Component, OnInit } from '@angular/core';
import {FadeInTop} from "../../shared/animations/fade-in-top.decorator";

@FadeInTop()
@Component({
  selector: 'sa-outbound-call',
  templateUrl: './outbound-call.component.html',
})
export class OutboundCallComponent implements OnInit {

  ngOnInit() {
  }

}
