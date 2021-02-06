import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../_services';
import {ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceListComponent implements OnInit {

  public items;
  public image = 'http://dummyimage.com/169x185.png/5fa2dd/ffffff';

  constructor(private serviceService: ServiceService, private util: AppComponent) {
    this.items = this.serviceService.getAllServices();
   /* category: (2) ["Bauberatung", "Gassigehen"]
    createdAt: "2021-01-17T10:44:26.632Z"
    description: "volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar"
    id: "6004150a23027a67623f9d10"
    pictures: (2) ["http://dummyimage.com/169x185.png/5fa2dd/ffffff", "http://dummyimage.com/208x171.bmp/cc0000/ffffff"]
    postcodes: (6) ["10559", "13057", "10435", "14050", "12437", "10777"]
    price: "€3,27"
    providerId: {id: "6004150923027a67623f9c22"}
    title: "Tagtune"
    updatedAt: "2021-01-17T10:44:26.632Z"*/
  }

  ngOnInit(): void {
  }

  callOnSidebar(titel: any, id: any, image: any, desc: any, price: any, category: any, postcodes: any): void {
    this.util.toggleSidebar(titel, id, image, desc, price, category, postcodes);
  }

}
