import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Widget } from '../../containers/widget';
import { Logger } from 'angular2-logger/core';
import { DashboardPanelData } from '../../containers/dashboard-panel-data';
import { DashboardWidgetDataService } from '../../services/dashboard-widget-data.service';
import { WIDGET_MAXIMIZE, WIDGET_CLOSE } from '../../constants/actions.constants';
import { WidgetActionInputs } from '../../containers/widget-action-inputs';
import { WidgetType } from '../../constants/widget-type.enum';

@Component({
  selector: 'dashboard-widget',
  templateUrl: './dashboard-widget.component.html',
  styleUrls: ['./dashboard-widget.component.scss']
})
export class DashboardWidgetComponent implements OnInit {

  @Input()
  widget: Widget;

  /* Native reference of chart. */
  nativeChartRef: any;

  /* Getting Widget DOM Object */
  @ViewChild('widgetRef') widgetRef: any;

  /* Panel Data Object Here. */
  panelData: DashboardPanelData = null;

  /* Emitting values to the parent on widget operation. */
  @Output() widgetAction: EventEmitter<any> = new EventEmitter();

  constructor(private log: Logger, private _widgetDataService: DashboardWidgetDataService) { }

  ngOnInit() {
    try {

      this.log.debug('Processing widget of widget id = ' + this.widget.widgetId);
      this.log.debug('widget = ', this.widget);

      /* Now getting panel data. */
      this.panelData = this._widgetDataService.getPanelDataByPanelNumber(this.widget.widgetId);
      this.log.debug('Panel Data = ', this.panelData);
    } catch (e) {
      this.log.error('Error while generating widget componnent', e);
    }
  }

  /* Method is used to resize and fit chart on panel. */
  resizeAndFitChartOnPanel() {
    try {

        this.log.debug('Resize chart on widget with widgetId = ' + this.widget.widgetId);

        /* Getting Current Widget Width and Height. */
        let currentWidgetWidth = this.widgetRef['nativeElement'].clientWidth;
        let currentWidgetHeight = this.widgetRef['nativeElement'].clientHeight;

        this.log.debug('Widget Id = ' + this.widget.widgetId + ', width = ' + currentWidgetWidth + ', height = ' + currentWidgetHeight );

        /* Adjusting height with excluding panel header height. */
        currentWidgetHeight = currentWidgetHeight - 10;

        /* Now Resizing chart based on widget width and height. */
        this.nativeChartRef.setSize(currentWidgetWidth, currentWidgetHeight);

    } catch (e) {
      this.log.error('Error while resizing chart on panel', e);
    }
  }

  /* Method is used to resize and fit data widget panel. */
  resizeAndFitDataWidget() {
    try {

        this.log.debug('Resize data widget with widgetId = ' + this.widget.widgetId);

        /* Getting Current Widget Width and Height. */
        let currentWidgetWidth = this.widgetRef['nativeElement'].clientWidth;
        let currentWidgetHeight = this.widgetRef['nativeElement'].clientHeight;

        this.log.debug('Widget Id = ' + this.widget.widgetId + ', width = ' + currentWidgetWidth + ', height = ' + currentWidgetHeight );

        /* Adjusting height with excluding panel header height. */
        this.panelData.dataWidget.dataWidgetHeight = (currentWidgetHeight - 20) + 'px';

        /* Now Resizing chart based on widget width and height. */

    } catch (e) {
      this.log.error('Error while resizing chart on panel', e);
    }
  }

  /**
   * Handling event of widget maximize.
   */
  onWidgetMaximize() {
    try {

      this.log.debug('Going to maximize the widget with widget id = ' + this.widget.widgetId);

      /* Creating instance of widget inputs. */
      let widgetInputs = new WidgetActionInputs();
      widgetInputs.panelData = this.panelData;
      widgetInputs.widget = this.widget;
      widgetInputs.widgetAction = WIDGET_MAXIMIZE;

      /* Emitting the action here to parent component. */
      this.widgetAction.emit(widgetInputs);

    } catch (e) {
      this.log.error('Error while maximizing the widget in widget component.', e);
    }
  }

  /**
   * Handling event of widget close action.
   */
  onWidgetClose() {
    try {

      this.log.debug('Going to close the widget with widget id = ' + this.widget.widgetId);

      /* Creating instance of widget inputs. */
      let widgetInputs = new WidgetActionInputs();
      widgetInputs.panelData = this.panelData;
      widgetInputs.widget = this.widget;
      widgetInputs.widgetAction = WIDGET_CLOSE;

      /* Emitting the action here to parent component. */
      this.widgetAction.emit(widgetInputs);

    } catch (e) {
      this.log.error('Error while closing the widget in widget component.', e);
    }
  }

  /* Getting Chart Native Reference. */
  load(nativeChartRef) {
    try {
      this.nativeChartRef = nativeChartRef;
      this.log.debug('Now chart width = ' + this.nativeChartRef['chartWidth'] +
      ', and chart height = ' + this.nativeChartRef['chartHeight']);

      /* Now resizing chart on Panel. */
      this.resizeAndFitChartOnPanel();
    } catch (e) {
      this.log.error('Error while getting native chart object on load event.', e);
    }
  }

  /* Event Emitted on every resize/dragging of item. */
  onChangeStop(_item) {
    try {
      this.log.debug('Widget is resized/positioned successfully with widget = ', _item);

      if (this.widget.widgetType === WidgetType.GRAPH_TYPE_WIDGET) {
        this.resizeAndFitChartOnPanel();
      } else if (this.widget.widgetType === WidgetType.DATA_TYPE_WIDGET) {
        this.resizeAndFitDataWidget();
      }

    } catch (e) {
      this.log.error('Error while processing resize/drag event of widget', e);
    }
  }

}
