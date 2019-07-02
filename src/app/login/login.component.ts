import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginInfo } from '../_model/LoginInfo';
import { AuthService } from '../_services/authservice';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit
{
	form: FormGroup = new FormGroup({
		username: new FormControl(),
		password: new FormControl(),
	});
	loginInfo : LoginInfo;

	constructor(private route: ActivatedRoute, private authservice : AuthService, private router : Router) 
	{ }

    returnUrl() {
        return this.route.snapshot.queryParams["returnUrl"] || "/";
    }

	ngOnInit() { }
	get f() { return this.form.controls; }
	async onSubmit(){
		let user = await this.authservice.login(this.f.username.value, this.f.password.value);
		if (user) {
			this.router.navigate([this.returnUrl()]);
		}
	}
}
