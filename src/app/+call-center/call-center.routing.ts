import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


export const routes: Routes = [
  {
    path: '', redirectTo: 'inbound-call', pathMatch: 'full'
  },
  {
    path: 'inbound-call',
    loadChildren: './+inbound-call/inbound-call.module#InboundCallModule',
  },
  {
    path: 'outbound-call',
    loadChildren: './+outbound-call/outbound-call.module#OutboundCallModule',
  }
];

export const routing = RouterModule.forChild(routes);
