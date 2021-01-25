import { Component, OnInit } from '@angular/core';
import { ServiceService } from "../../_services";
import {ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceListComponent implements OnInit {

  public items;// = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
  private image = "http://dummyimage.com/169x185.png/5fa2dd/ffffff";

  constructor(private serviceService :ServiceService) {
    this.serviceService.getAllServices().subscribe(x => {

      console.log(x);
    });
    this.items = this.serviceService.getAllServices();
    console.log(this.items);
  }

  ngOnInit(): void {
  }

}
