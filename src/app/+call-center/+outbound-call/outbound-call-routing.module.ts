import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OutboundCallComponent} from "./outbound-call.component";

const routes: Routes = [{
  path: '',
  component: OutboundCallComponent,
  data: {pageTitle: 'Outbound Calls'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OutboundCallRoutingModule { }
