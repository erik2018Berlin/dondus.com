import {Component, Injectable} from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';

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

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  toggleSidebar(title: any, id: any, image: any, desc: any): void {
    this.opened = !this.opened;
    this.sidebarTitle = title;
    this.sidebarId = id;
    this.sidebarImage = image;
    this.sidebarDesc = desc;
  }

  closeSidebar(): void {
    this.opened = false;
  }
}
