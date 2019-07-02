import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { logging } from 'protractor';
import { userInfo } from 'os';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { LoginInfo } from '../_model/LoginInfo';
import { Globals } from '../Globals';
import { User } from '../_model/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //what is this?
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private loginInfo : LoginInfo;



  constructor(private http: HttpClient, private router : Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.loginInfo = new LoginInfo();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  async login(username: string, password: string) {
    let url = `${Globals.url}/user/login`;
    this.loginInfo.username = username;
    this.loginInfo.password = password;
    let user = await this.http.post<User>(url, this.loginInfo).toPromise();
    if (user && user.token) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    }
    return user;
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
