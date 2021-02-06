import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from '../../app.component';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';


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

  public dateSelected: any;

  constructor(public util: AppComponent) {
  }

  ngOnInit(): void {
  }

  public getDate(event: MatDatepickerInputEvent<any>): void {
    this.dateSelected = event.value.getFullYear().toString() + '-' + (event.value.getMonth() + 1).toString() +
      '-' + event.value.getDate().toString();
  }

  public getTime(event: any): void {
    console.log(event.toString());
    document.getElementById('dateTimeInput').setAttribute('value', event.toString());
  }

}
