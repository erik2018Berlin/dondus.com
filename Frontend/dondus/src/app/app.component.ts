import {Component, Injectable} from '@angular/core';
import { Router } from '@angular/router';

import {AuthenticationService, ServiceService} from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {
  isCollapsed = true;
  currentUser: any;
  opened = false;


  sidebarTitle: string;
  sidebarId: string;
  sidebarImage: any;
  sidebarDesc: string;
  sidebarPrice: string;
  sidebarCategory: string;
  sidebarPostcodes : any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private serviceService: ServiceService,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  toggleSidebar(title: any, id: any, image: any, desc: any, price: any, category: any, postcodes: any): void {
    this.opened = !this.opened;
    this.sidebarTitle = title;
    this.sidebarId = id;
    this.sidebarImage = image;
    this.sidebarDesc = desc;
    this.sidebarPrice = price;
    this.sidebarCategory = category;
    this.sidebarPostcodes = postcodes;

  this.serviceService.getAllMeetingSlotsFromService(id)
    .subscribe(data => console.log(data))

  }

  closeSidebar(): void {
    //success= false
    //timeselecet
    //dateselecete
    this.opened = false;
  }
}
