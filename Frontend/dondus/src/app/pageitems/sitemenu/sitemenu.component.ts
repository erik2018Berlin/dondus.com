import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from '../../app.component';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {Router} from '@angular/router';
import {AuthenticationService, ServiceService} from '../../_services';



@Component({
  selector: 'app-sitemenu',
  templateUrl: './sitemenu.component.html',
  styleUrls: ['./sitemenu.component.css']
})

export class SitemenuComponent implements OnInit {

  @Input()
  public title;

  @Input()
  public id;

  @Input()
  public image;

  @Input()
  public description;

  @Input()
  public price;

  @Input()
  public cateory;

  @Input()
  public postcodes;

  @Input()
  public timeslots;

  currentUser: any;
  private month;
  private day;

  constructor(public util: AppComponent, public router: Router,
              private authenticationService: AuthenticationService,
              private serviceService: ServiceService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.util.success = false;
  }

  public getDate(event: MatDatepickerInputEvent<any>): void {

    if ((event.value.getMonth() + 1) < 10){
      this.month = '0' + (event.value.getMonth() + 1).toString();
    }else{
      this.month = (event.value.getMonth() + 1).toString();
    }

    if (event.value.getDate() < 10){
      this.day = '0' + event.value.getDate().toString();
    }else{
      this.day = event.value.getDate().toString();
    }

    this.util.dateSelected = event.value.getFullYear().toString() + '-' + this.month +
      '-' + this.day;
  }

  public getTime(event: any): void {
    this.util.timeSelected = event.toString();
  }

  public goPaypal(): void{
    // todo prüfen ob der User eingeloggt ist
    if (!this.currentUser){
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/services' }});
    }

    // todo Termin im Calender eintragen
    if (this.serviceService.setBooking(this.id, (this.util.dateSelected + 'T' + this.util.timeSelected + ':00.000Z'), this.currentUser)){
      this.util.success = true;
    }


    // --> meeting-slot erstellen + get calendar from user + put on calendar with calendarID
    // sucess nachricht -> "Buchungsanfrage abgeschlossen"

    // todo, wenn das darüber alles geht, dann setzten wir paypal zwischen login abfrage und calendar eintragen
    // alert('Ich bin Paypal, gib mir Geld!');
    // alert('Ausgewähltes Datum: ' + this.dateSelected + '\n Ausgewählte Uhrzeit: ' + this.timeSelected);
  }

}
