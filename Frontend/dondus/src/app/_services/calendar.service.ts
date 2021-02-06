import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import {Router} from '@angular/router';
import {combineLatest, forkJoin, pipe} from "rxjs";
import {map, mergeMap, switchMap} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class CalendarService {


  constructor(private http: HttpClient, private router: Router) {

  }



  getAllCalendarsFromUser(currentUser) {
    const params = new HttpParams().set('access_token', currentUser.token).set('userId', currentUser.user.id);
    return this.http.get<any[]>(`http://127.0.0.1:9000/calendars`, {params });
  }

    createNewCalendar(currentUser, calendarName, meetingSlotIds, notes) {
      const body = {access_token: currentUser.token, userId: currentUser.user.id, notes, name: calendarName, meetingIds: meetingSlotIds};
      return this.http.post(`http://127.0.0.1:9000/calendars`, body);
    }


    //get meeting with meeting id

  getMeetingSlotWithId(id: string) {
    return this.http.get<any[]>(`http://127.0.0.1:9000/meeting-slots/` + id);
  }

  getServiceWithId(id :string) {
    return this.http.get<any[]>(`http://127.0.0.1:9000/services/` + id);
  }


  async getMeeting_withId(id) {

      //get the customer
      const meeting = await this.http.get<any>(`http://127.0.0.1:9000/meeting-slots/` + id).toPromise();

      //get the contract from url
      const service = await this.http.get<any>(`http://127.0.0.1:9000/services/` + meeting.serviceId.id).toPromise();

      service.date = meeting.date;
      console.log(service);
      return service;
  }

}
