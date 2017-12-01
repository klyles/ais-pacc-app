import { NgModule } from '@angular/core';
import { CategoryPipe } from './searchPipe';
 @NgModule({
     declarations: [CategoryPipe],
     exports: [CategoryPipe]
 })

 export class SearchFilterPipeModule {}
