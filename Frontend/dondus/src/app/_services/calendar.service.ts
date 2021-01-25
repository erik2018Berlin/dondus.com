import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({ providedIn: 'root' })
export class CalendarService {


  constructor(private http: HttpClient,private router: Router) {

  }



  getAllCalendarsFromUser(currentUser) {
    let params = new HttpParams().set("access_token",currentUser.token);
    return this.http.get<any[]>(`http://127.0.0.1:9000/calendars`, {params: params });
  }

    createNewCalendar(currentUser) {
      const body = {access_token: currentUser.token, userId: currentUser.user.id};
      return this.http.post(`http://127.0.0.1:9000/calendars`,body);
    }

}
