import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from "@angular/router";



@Injectable({ providedIn: 'root' })
export class ServiceService {


  constructor(private http: HttpClient,private router: Router) {
  }

  getAllServices() {
    return this.http.get<any[]>(`http://127.0.0.1:9000/services?limit=100`);
  }

  getServiceWithId(id){
    return this.http.get<any>(`http://127.0.0.1:9000/services/` + id);
  }

  getAllMeetingSlotsFromService(serviceId) {

    const params = new HttpParams().set('serviceId', serviceId);
    return this.http.get<any[]>(`http://127.0.0.1:9000/meeting-slots`, {params });
  }


  async setBooking(serviceId, date, currentUser) {
/*
    //POST Meeting-slot
    const body = {access_token: currentUser.token, serviceId : serviceId   ,  date: date};
    const meetingslot =  await this.http.post<any>(`http://127.0.0.1:9000/meeting-slots`, body).toPromise();
    console.log("meetingslot: " + meetingslot);

    //GET calendar from user
    const params = new HttpParams().set('access_token', currentUser.token).set('userId', currentUser.user.id);
    const calendarFromUser = await this.http.get<any>(`http://127.0.0.1:9000/calendars`, {params }).toPromise();
    var meetingIds = calendarFromUser[0].meetingIds;
    meetingIds.push(meetingslot.id);
    console.log("calendar from User: " + calendarFromUser);


    //PUT calendar with id
    const cal_body = {access_token: currentUser.token,meetingIds: meetingIds, name: calendarFromUser[0].name , userId: currentUser.user.id};
    const updatedCalendar =  await this.http.put(`http://127.0.0.1:9000/calendars/` + calendarFromUser[0].id, cal_body).toPromise();
    console.log("updated Calendar: " + updatedCalendar);
    */
    return true;

  }



}
