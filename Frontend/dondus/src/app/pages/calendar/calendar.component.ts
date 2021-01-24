import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../_services';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  currentUser: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
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

}
