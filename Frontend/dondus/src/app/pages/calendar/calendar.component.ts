import * as $ from 'jquery/dist/jquery.min.js';
import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { AuthenticationService } from './../../_services';
import { CalendarService} from './../../_services';
import { Router } from '@angular/router';
import { CalendarOptions,FullCalendarComponent } from '@fullcalendar/angular';
import {first} from 'rxjs/operators';
import {AppComponent} from "../../app.component";



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
    public util: AppComponent

  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  calendaroptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    height: 'auto',
    eventClick: this.handleEventClick.bind(this),
    events: this.calenderContent,
    eventTimeFormat: { // like '14:30:00'
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      meridiem: false
    }
  };


  ngOnInit(): void {


    this.calenderService.getAllCalendarsFromUser(this.currentUser)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          if(data.length>0){
            for (var i = 0; i< data[0].meetingIds.length; i++){







              this.calenderService.getMeetingSlotWithId(data[0].meetingIds[i])
                .pipe(first())
                .subscribe(
                  data => {
                    this.meeting = data;
                    console.log(this.meeting)

                     this.calenderService.getServiceWithId(this.meeting.serviceId.id)
                        .pipe(first())
                        .subscribe(
                          service => {
                          this.service = service;
                          console.log(this.meeting.date)
                            this.calenderContent.push({title: this.service.title, id: this.service.id, image: 'http://dummyimage.com/169x185.png/5fa2dd/ffffff', description: this.service.description,date:  this.meeting.date.split('.')[0]});//date:  '2021-09-14'});
                           this.calendaroptions.events = this.calenderContent;

                          },
                          error => {
                            this.error = error;
                            // this.loading = false;
                          });

                  },
                  error => {
                    this.error = error;
                    // this.loading = false;
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
    //todo sidemenu füllen und öffnene
    alert('Event clicked! ');
  }


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

  // tslint:disable-next-line:typedef
  ontestClick() {

    this.calenderService.getAllCalendarsFromUser(this.currentUser)
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
