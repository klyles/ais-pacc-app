import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutboundCallRoutingModule } from './outbound-call-routing.module';
import { OutboundCallComponent } from './outbound-call.component';

@NgModule({
  imports: [
    CommonModule,
    OutboundCallRoutingModule
  ],
  declarations: [OutboundCallComponent]
})
export class OutboundCallModule { }
