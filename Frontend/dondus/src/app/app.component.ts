import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dondus';

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
  handleEventClick(arg) {
    alert('Event clicked! ');
  }
}
