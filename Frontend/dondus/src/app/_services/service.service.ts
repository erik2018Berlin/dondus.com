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




}
