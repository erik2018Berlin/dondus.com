import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import {map} from "rxjs/operators";
import { AuthenticationService } from "./authentication.service";

@Injectable({ providedIn: 'root' })
export class AccountService {


  constructor(private http: HttpClient,private router: Router, private authenticationService: AuthenticationService) {

  }

  updateUser_name(currentUser) {
    const body = {access_token: currentUser.token};
    return this.http.post(`http://127.0.0.1:9000/users/${currentUser.user.id}`,body)
      .pipe(map(user => {
        this.authenticationService.currentUserValue = user;
        return user;
      }));
  }

  updateUser_password(currentUser,oldpassword, newpassword) {
    const body = {password: newpassword};
    let authorizationData = 'Basic ' + btoa(currentUser.user.email + ':' + oldpassword);
    const headers = { 'Authorization': authorizationData, 'Content-Type': 'application/json' };
    return this.http.post(`http://127.0.0.1:9000/users/${currentUser.user.id}/password`,body)
      .pipe(map(user => {
        this.authenticationService.currentUserValue = user;
        return user;
      }));
  }



}
