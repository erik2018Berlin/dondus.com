import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from '../../app.component';

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

  constructor(private util: AppComponent) {
  }

  ngOnInit(): void {
  }

}
