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
    console.log(this.items);
  }

  ngOnInit(): void {
  }

  callOnSidebar(titel: any, id: any, image: any, desc: any): void {
    this.util.toggleSidebar(titel, id, image, desc);
  }

}
