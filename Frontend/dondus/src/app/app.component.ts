import {Component, Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { SitemenuComponent } from './pageitems/sitemenu/sitemenu.component';

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
  sidebarPostcodes: any;
  success: any = false;
  timeSelected: any;
  dateSelected: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private serviceService: ServiceService,
    // public sitemenuUtil: SitemenuComponent
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
    .subscribe(data => console.log(data));

  }

  closeSidebar(): void {
    // success= false
    this.success = false;
    // timeselecet
    this.timeSelected = null;
    // dateselecete
    this.dateSelected = null;
    this.opened = false;
  }
}
