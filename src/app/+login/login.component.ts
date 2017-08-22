import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
	form: any = {};
	returnUrl: string;
	constructor(private router: Router) { }

	ngOnInit() {
		// retrive the previousUrl from route params or default to '/'

		let prevUrl = localStorage.getItem('prevUrl');
		this.returnUrl = prevUrl ? prevUrl : '/dashboard/analytics';
	}
	onSubmit() {
		alert('login successful! and navigating to ' + this.returnUrl + ' ');
		this.router.navigate([this.returnUrl]);
	}
}
