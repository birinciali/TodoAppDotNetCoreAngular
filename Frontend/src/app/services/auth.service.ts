import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { JwtHelper, tokenNotExpired } from "angular2-jwt";
import { Router } from '@angular/router';
import { Register } from '../models/register';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router:Router) {}

  path = "http://localhost:49846/api/auth/";
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();
  TOKEN_KEY ="token"

  login(user: User) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.httpClient
      .post(this.path + "login", user, { headers: headers })
      .subscribe(data => {
        this.saveToken(data);
        this.userToken = data;
        this.decodedToken = this.jwtHelper.decodeToken(data.toString());
        this.router.navigateByUrl('/home')
        //console.log("wqeqwe")
      });
  }

  register(register:Register)
  {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.httpClient
    .post(this.path + "register", register, { headers: headers })
    .subscribe(data=>{

    });
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  logOut(){
    localStorage.removeItem(this.TOKEN_KEY);
  }

  loggedIn(){
    return tokenNotExpired(this.TOKEN_KEY);
  }

  getCurrentUserId(){
    return this.jwtHelper.decodeToken(localStorage.getItem(this.TOKEN_KEY)).nameid;
  }

  get token(){
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
