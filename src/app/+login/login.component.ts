import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  form: any = {};
  returnUrl: string;
  constructor(private router: Router, private LoginService: LoginService) { }

  ngOnInit() {
  // retrive the previousUrl from route params or default to '/'

    const prevUrl = localStorage.getItem('prevUrl');
    this.returnUrl = prevUrl ? prevUrl : '/dashboard/analytics';
  }
  onSubmit() {
    this.LoginService.onsubmit(this.form);
    console.log(this.form);
    alert('login successful! and navigating to ' + this.returnUrl + ' ');
    this.router.navigate([this.returnUrl]);
  }
}
