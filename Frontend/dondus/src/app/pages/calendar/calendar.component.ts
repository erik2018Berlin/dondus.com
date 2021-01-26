import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../_services';
import { CalendarService} from './../../_services';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  currentUser: any;
  error: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private calenderService: CalendarService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  calendaroptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    height: 'auto',
    eventClick: this.handleEventClick.bind(this),
    events: [
      { title: 'Erik hat Geburtstag', date: '2021-09-14'}
    ]
  };

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  handleEventClick(arg) {
    alert('Event clicked! ');
  }

  // tslint:disable-next-line:typedef
  createCalendar(){
    this.calenderService.createNewCalendar(this.currentUser, 'testcalendar', ['6004150a23027a67623f9d91', '6004150a23027a67623f9d90'], 'blubb')
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
