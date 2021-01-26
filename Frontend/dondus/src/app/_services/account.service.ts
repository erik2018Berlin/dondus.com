import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from "@angular/router";
import {map} from "rxjs/operators";
import { AuthenticationService } from "./authentication.service";

@Injectable({ providedIn: 'root' })
export class AccountService {


  constructor(private http: HttpClient,private router: Router, private authenticationService: AuthenticationService) {

  }

  updateUser_name(currentUser,newName){
    const body = {access_token: currentUser.token, name: newName};
    this.http.put<any>('http://127.0.0.1:9000/users/' + currentUser.user.id, body).subscribe(data => {
      this.authenticationService.currentUserValue = data;
      return data;
    })
  }

  getAllProvidersFromUser(currentUser) {
    return this.http.get<any[]>(`http://127.0.0.1:9000/providers/user=` + currentUser.user.id + '/field=id');
  }

  getAllCustomersFromUser(currentUser) {
    return this.http.get<any[]>(`http://127.0.0.1:9000/customers/user=` + currentUser.user.id + '/field=id');
  }

  createProvider(currentUser,street, number, postcode, bankInformation){
    const body = {access_token: currentUser.token, street: street, number: number, postcode: postcode, bankInformation: bankInformation};
    this.http.post<any>('http://127.0.0.1:9000/providers', body).subscribe(data => {
      return data;
    })
  }

  createCustomer(currentUser,street, number, postcode, bankInformation){
    const body = {access_token: currentUser.token, street: street, number: number, postcode: postcode, bankInformation: bankInformation};
    this.http.post<any>('http://127.0.0.1:9000/customers', body).subscribe(data => {
      return data;
    })
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
