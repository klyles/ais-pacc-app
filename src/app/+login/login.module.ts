import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing } from './login.routing';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    FormsModule,
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
