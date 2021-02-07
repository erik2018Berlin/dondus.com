import {Component, OnInit, Input, ViewChild, ElementRef, SimpleChanges, OnChanges, SimpleChange} from '@angular/core';
import { AppComponent } from '../../app.component';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {Router} from '@angular/router';
import {AuthenticationService, ServiceService} from '../../_services';



@Component({
  selector: 'app-sitemenu',
  templateUrl: './sitemenu.component.html',
  styleUrls: ['./sitemenu.component.css']
})

export class SitemenuComponent implements OnInit, OnChanges {

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

  @Input()
  public opened;

  firstOpen = true;
  currentUser: any;
  private month;
  private day;
  private wasSuccessful;
  private paymentSuccessfull;

  @ViewChild('paypalRef') private paypalRef: ElementRef;

  constructor(public util: AppComponent, public router: Router,
              private authenticationService: AuthenticationService,
              private serviceService: ServiceService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnChanges(changes: { [property: string]: SimpleChange }){
    let sidemenuOpened: SimpleChange = changes['opened'];

    if(sidemenuOpened.currentValue && this.firstOpen  || this.wasSuccessful && sidemenuOpened.currentValue){
      this.firstOpen = false;
      this.wasSuccessful = false;
        this.renderPaypalBtn();
    }

  }

  ngOnInit(): void {
    this.util.success = false;
    this.wasSuccessful = false;
    this.paymentSuccessfull = false;
  }


  renderPaypalBtn(){
     window.paypal.Buttons(
      {
        style:{
          layout: 'horizontal'
        },
        createOrder:(data, actions) =>{
          return actions.order.create({
            purchase_units:[
              {
                amount: {
                  value: (this.price.split("€")[1]).split(",")[0] + "." + (this.price.split("€")[1]).split(",")[1]
                }
              }
            ]
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then(details =>{
            this.paymentSuccessfull = true;
          });
        },
        onError: error =>{
          console.log(error);
        }
      }
    ).render(document.getElementById('paypalRef'));
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

    if (!this.currentUser){
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/services' }});
    }

    //TODO paypal integration


    if (this.serviceService.setBooking(this.id, (this.util.dateSelected + 'T' + this.util.timeSelected + ':00.000Z'), this.currentUser)){
      this.util.success = true;
      this.wasSuccessful = true;
    }

  }

}
