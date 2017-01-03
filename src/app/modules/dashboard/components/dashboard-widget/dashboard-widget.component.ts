import { Component, OnInit, Input } from '@angular/core';
import { Widget } from '../../containers/widget';
import { Logger } from 'angular2-logger/core';
import { Chart } from '../../containers/chart';

@Component({
  selector: 'dashboard-widget',
  templateUrl: './dashboard-widget.component.html',
  styleUrls: ['./dashboard-widget.component.scss']
})
export class DashboardWidgetComponent implements OnInit {

  @Input()
  widget: Widget;

  /* Chart Object if Graph Type Widget. */
  chart: Chart;

  /* Native reference of chart. */
  nativeChartRef: Object;

  constructor(private log: Logger) { }

  ngOnInit() {
    try {

      this.log.debug('Processing widget of widget id = ' + this.widget.widgetId);
      this.log.debug('widget = ', this.widget);

      /* Creating Empty Chart Object. */
      this.chart = new Chart(this.log);
      this.log.debug('chart = ', this.chart);

    } catch (e) {
      this.log.error('Error while generating widget componnent', e);
    }
  }

  /* Getting Chart Native Reference. */
  load(nativeChartRef) {
    this.nativeChartRef = nativeChartRef;
    this.log.debug('Native chart reference = ', this.nativeChartRef);
  }


  /* Event Emitted on every resize/dragging of item. */
  onChangeStop(_item) {
    try {
      this.log.debug('Widget is resized/positioned successfully with widgetId = ', _item);
      this.log.debug('Now Processing widget on resize.', this.widget);
    } catch (e) {
      this.log.error('Error while processing resize/drag event of widget', e);
    }
  }

}
