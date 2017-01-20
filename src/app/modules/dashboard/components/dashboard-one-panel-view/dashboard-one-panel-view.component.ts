import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Logger } from '../../../../../vendors/angular2-logger/core';
import { DashboardWidgetDataService } from '../../services/dashboard-widget-data.service';
import { WIDGET_MINIMIZE } from '../../constants/actions.constants';
import { WidgetActionInputs } from '../../containers/widget-action-inputs';
import { DashboardPanelData } from '../../containers/dashboard-panel-data';
import { DashboardConfigDataService } from '../../services/dashboard-config-data.service';

@Component({
  selector: 'dashboard-one-panel-view',
  templateUrl: './dashboard-one-panel-view.component.html',
  styleUrls: ['./dashboard-one-panel-view.component.scss']
})
export class DashboardOnePanelViewComponent implements OnInit {

  /* Used for getting inputs from parent component. */
  widgetInputValues: WidgetActionInputs;

  /* Native reference of chart. */
  nativeChartRef: any;

  /* Emitting values to the parent on widget operation. */
  @Output() widgetAction: EventEmitter<any> = new EventEmitter();

  /* Initial height of panel. */
  panelHeight: string = '300px';

  constructor(private log: Logger,
              private _widgetDataService: DashboardWidgetDataService,
              private _config: DashboardConfigDataService) { }

  ngOnInit() {
    try {
      this.widgetInputValues = new WidgetActionInputs();
      this.widgetInputValues.panelData = new DashboardPanelData();
      this.widgetInputValues.panelData.panelTitle = '...';
      this.widgetInputValues.panelData.chart = this._widgetDataService.getEmptyChart();

      /* Setting height of panel. */
      this.panelHeight = (window.innerHeight - 50) + 'px';

      this.log.debug('Initializing single panel view with widget = ', this.widgetInputValues, ', height = ' + this.panelHeight);
    } catch (e) {
      this.log.error('Error while initializing single panel view.', e);
    }
  }

  /* Method is used to resize and fit chart on panel. */
  resizeAndFitChartOnPanel() {
    try {

        this.log.debug('Resizing chart on single panel view.');
        /* Adjusting height with excluding panel header height. */
        let adjustedHeight = window.innerHeight - 130;
        let adjustedWidth = window.innerWidth - this._config.$navWidth - 20;

        /* Now Resizing chart based on widget width and height. */
        this.nativeChartRef.setSize(adjustedWidth, adjustedHeight);

    } catch (e) {
      this.log.error('Error while resizing chart on panel', e);
    }
  }

  @Input()
  set widgetInputs(widgetInputValues: WidgetActionInputs) {
    try {
      this.log.debug('Updating single panel view with widget inputs = ', widgetInputValues);
      this.widgetInputValues = widgetInputValues;
    } catch (e) {
      this.log.error('Error while setting widget inputs in single panel view.', e);
    }
  }

  /**
   * Handling event of widget minimize.
   */
  onWidgetMinimize($event) {
    try {

      this.log.debug('Going to minimize the widget with widget id = ' + this.widgetInputValues.widget.widgetId);
      $event.stopPropagation();

      /* Now setting widget action property here. */
      this.widgetInputValues.widgetAction = WIDGET_MINIMIZE;

      /* Emitting the action here to parent component. */
      this.widgetAction.emit(this.widgetInputValues);

    } catch (e) {
      this.log.error('Error while minimizing the widget in widget component.', e);
    }
  }

   /* Getting Chart Native Reference. */
  load(nativeChartRef) {
    try {
      this.nativeChartRef = nativeChartRef;
      this.log.debug('Single panel chart width = ' + this.nativeChartRef['chartWidth'] +
      ', and chart height = ' + this.nativeChartRef['chartHeight']);

      /* Resizing and fitting chart on panel. */
      this.resizeAndFitChartOnPanel();
    } catch (e) {
      this.log.error('Error while getting native chart object on load event.', e);
    }
  }

}
