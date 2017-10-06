import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InboundCallComponent} from './inbound-call.component';

const routes: Routes = [{
  path: '',
  component: InboundCallComponent,
  data: {pageTitle: 'Inbound'}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class InboundCallRoutingModule { }
