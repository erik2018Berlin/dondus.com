import {Component, OnInit} from '@angular/core';

import webpush from 'web-push';
import {SwPush, SwUpdate} from '@angular/service-worker';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'dondus';
  constructor(
    private update: SwUpdate,
    private swPush: SwPush
  ) {
  }

  // tslint:disable-next-line:typedef
  //ngOnInit(){
  //  this.subscribeToNotifications();
  //}

  // tslint:disable-next-line:typedef
  //subscribeToNotifications() {
  //  this.swPush.requestSubscription({
  //    serverPublicKey: this.VAPID_PUBLIC_KEY
  //  }).then(sub => console.log(sub)).catch(err => console.error('Could not subscribe to notifications', err));
  //}
}

// console.log(webpush.generateVAPIDKeys());

const publicKey = 'BJ5p-hXXpFo9SNXGBAeARqHUDiEecM7xEG1QoOTzrz6sUVd-wQuoklgqxI39MmiqMtsVbOCph-Ru3OPBdITUrW0';
const privateKey = 'BsFfOsk1RrWzFoQvcp183stM2ybTuXduPIwt3RSyoFk';
