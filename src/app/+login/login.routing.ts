import {ModuleWithProviders} from "@angular/core"
import {Routes, RouterModule} from '@angular/router';


export const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  }
];

export const routing = RouterModule.forChild(routes);
