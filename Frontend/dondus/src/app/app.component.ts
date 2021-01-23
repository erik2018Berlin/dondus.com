import {Component, OnInit} from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { FreeApiService } from './api_service/freeapi.service';
import { Calendars } from './api_service/calendars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private freeApiService: FreeApiService) {
  }
  title = 'dondus';
  calendarsLst: Calendars[];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    height: 'auto',
    eventClick: this.handleEventClick.bind(this),
    events: [
      { title: 'event 1', date: '2021-01-01' },
      { title: 'event 2', date: '2021-01-02' }
    ]
  };

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.freeApiService.getcalendars()
      .subscribe(
        data =>
        {
          this.calendarsLst = data;
        }
      );
  }

  // tslint:disable-next-line:typedef
  handleEventClick(arg) {
    alert('Event clicked! ');
  }
}
