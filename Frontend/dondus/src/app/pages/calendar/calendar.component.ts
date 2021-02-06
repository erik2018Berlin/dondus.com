import * as $ from 'jquery/dist/jquery.min.js';
import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import {AuthenticationService, ServiceService} from './../../_services';
import { CalendarService} from './../../_services';
import { Router } from '@angular/router';
import { CalendarOptions,FullCalendarComponent } from '@fullcalendar/angular';
import {first} from 'rxjs/operators';
import { AppComponent } from '../../app.component';


interface CalenderEntry {
  title: any;
  id: any;
  image: any;
  description: any;
  date: any;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  currentUser: any;
  error: string;
  calenderContent: CalenderEntry[] = [];

  public meeting;
  public service;

  @ViewChild('mycalendar', { static: true }) calendar: FullCalendarComponent;


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private calenderService: CalendarService,
    private serviceService : ServiceService,
    public util: AppComponent

  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  calendaroptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    height: 'auto',
    eventClick: this.handleEventClick.bind(this),
    events: this.calenderContent,
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      meridiem: false
    }
  };



  ngOnInit(): void {

    this.calenderContent = [];

    this.calenderService.getAllCalendarsFromUser(this.currentUser)
      .pipe(first())
      .subscribe(
        data => {
          if(data.length>0){
            for (var i = 0; i< data[0].meetingIds.length; i++){
          this.calenderService.getMeeting_withId(data[0].meetingIds[i]).then(service =>{
            this.calenderContent.push({title: service.title, id: service.id, image: 'http://dummyimage.com/169x185.png/5fa2dd/ffffff', description: service.description,date:  service.date.split('.')[0]});
            this.calendaroptions.events = this.calenderContent;
          });

            }
          }else{
            this.createCalendar();
          }
        },
        error => {
          this.error = error;
          // this.loading = false;
        });
  }


  handleEventClick(arg) {
    this.serviceService.getServiceWithId(arg.event.id)
      .subscribe(data => {
        this.util.toggleSidebar(data.title, data.id, 'http://dummyimage.com/169x185.png/5fa2dd/ffffff', data.description, data.price, data.category[0], data.postcodes);
      });
  }

  // tslint:disable-next-line:typedef
  createCalendar(){
    this.calenderService.createNewCalendar(this.currentUser, 'calendar_' + this.currentUser.user.name, [], '')
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          // this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          // this.loading = false;
        });
  }



}
