import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { User, Common } from '../_models/index';
import { Router } from '@angular/router';


@Injectable()
export class AuthenticationService  implements OnInit{

  public url = require("../apiurl.json");
  private commonURL = this.url[0].apiurl+'login/';

  constructor(
    private http: HttpClient,
     private router: Router,

  ) {

 }
  
  ngOnInit(): void {
    }

    
    resetPassword(pwd: string , uname: string) {
      return this.http.get<User>(this.commonURL+"resetPassword?newPassword="+pwd+"&userName="+uname);
    }

    checkUserName(uname: string){
      return this.http.get<User>(this.commonURL+"Checkuser?username="+uname);
    }

    login(uname: string, pwd: string) {
      return this.http.get<User>(this.commonURL+'login?username='+uname+'&password='+pwd);
    }
  
  }
  