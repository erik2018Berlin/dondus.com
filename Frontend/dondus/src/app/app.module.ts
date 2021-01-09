import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule, SwUpdate, SwPush } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(update: SwUpdate, push: SwPush, snackbar: MatSnackBar) {
    update.available.subscribe(aUpdate => {
      console.log('update available');
      const snack = snackbar.open('Hello World', 'Reload');

      snack
        .onAction()
        .subscribe(() => {
          window.location.reload();
        });
    });

    push.messages.subscribe(msg => {
      console.log(msg);
      snackbar.open(JSON.stringify(msg));
    });

    const key = 'BJ5p-hXXpFo9SNXGBAeARqHUDiEecM7xEG1QoOTzrz6sUVd-wQuoklgqxI39MmiqMtsVbOCph-Ru3OPBdITUrW0';
    push.requestSubscription({serverPublicKey: key})
      .then(pushSubscription => {
        console.log(pushSubscription.toJSON());
      });
  }
}
