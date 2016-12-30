import { Component, OnInit, Input } from '@angular/core';
import { Widget } from '../../containers/widget';
import { Logger } from 'angular2-logger/core';

@Component({
  selector: 'dashboard-widget',
  templateUrl: './dashboard-widget.component.html',
  styleUrls: ['./dashboard-widget.component.scss']
})
export class DashboardWidgetComponent implements OnInit {

  @Input()
  widget: Widget;

  constructor(private log: Logger) { }

  ngOnInit() {
    try {

      this.log.debug('widget = ', this.widget);

    } catch (e) {
      this.log.error('Error while generating widget componnent', e);
    }
  }

}
