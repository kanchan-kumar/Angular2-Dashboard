import { Component, OnInit, Input, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Widget } from '../../containers/widget';
import { Logger } from '../../../../../vendors/angular2-logger/core';
import { DashboardPanelData } from '../../containers/dashboard-panel-data';
import { DashboardWidgetDataService } from '../../services/dashboard-widget-data.service';
import { WIDGET_MAXIMIZE, WIDGET_CLOSE, WIDGET_SELECTION } from '../../constants/actions.constants';
import { WidgetActionInputs } from '../../containers/widget-action-inputs';
import { WidgetType } from '../../constants/widget-type.enum';
import { Subscription }   from 'rxjs/Subscription';
import { MenuItem } from '../../../../../vendors/primeng/primeng';

@Component({
  selector: 'dashboard-widget',
  templateUrl: './dashboard-widget.component.html',
  styleUrls: ['./dashboard-widget.component.scss']
})
export class DashboardWidgetComponent implements OnInit, AfterViewInit {

  @Input()
  widget: Widget;

  /* Native reference of chart. */
  nativeChartRef: any;

  /* Getting Widget DOM Object */
  @ViewChild('widgetRef') widgetRef: any;

  /* Panel Data Object Here. */
  panelData: DashboardPanelData = null;

  /* Widget Classes. */
  widgetClasses: string[] = ['dashboard-panel', 'dashboard-panel-color'];

  /* Emitting values to the parent on widget operation. */
  @Output() widgetAction: EventEmitter<any> = new EventEmitter();

  /*Data Subscriber of service.*/
  widgetBroadcastListener: Subscription;

  widgetMenuItems: MenuItem[];

  constructor(private log: Logger, private _widgetDataService: DashboardWidgetDataService) {
      this.widgetBroadcastListener = this._widgetDataService.widgetComProvider$.subscribe(
        action => {
          this.handleWidgetSelection(action);
      });

      this.widgetMenuItems = [
            {
                label: 'File',
                items: [{
                        label: 'New',
                        icon: 'fa-plus',
                        items: [
                            {label: 'Project'},
                            {label: 'Other'},
                        ]
                    },
                    {label: 'Open'},
                    {label: 'Quit'}
                ]
            },
            {
                label: 'Edit',
                icon: 'fa-edit',
                items: [
                    {label: 'Undo', icon: 'fa-mail-forward'},
                    {label: 'Redo', icon: 'fa-mail-reply'}
                ]
            }
        ];
  }

  ngOnInit() {
    try {

      this.log.debug('Processing widget of widget id = ' + this.widget.widgetId);
      this.log.debug('widget = ', this.widget);

      /* Now getting panel data. */
      this.panelData = this._widgetDataService.getPanelDataByPanelNumber(this.widget.widgetId);
      this.log.debug('Panel Data = ', this.panelData);

      if (this.widget.widgetType === WidgetType.DATA_TYPE_WIDGET) {
        this.panelData.dataWidget.dataWidgetHeight = (this._widgetDataService.$layoutConfiguration.row_height * this.widget.sizey) + 'px';
      }
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

    } catch (e) {
      this.log.error('Error while resizing chart on panel', e);
    }
  }

  /**
   * Handling event of widget maximize.
   */
  onWidgetMaximize($event) {
    try {

      this.log.debug('Going to maximize the widget with widget id = ' + this.widget.widgetId);
      $event.stopPropagation();

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
  onWidgetClose($event) {
    try {

      this.log.debug('Going to close the widget with widget id = ' + this.widget.widgetId);
      $event.stopPropagation();

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

  /* Handling widget selection event. */
   handleWidgetSelection(action) {
    try {
      if (this._widgetDataService.$activeWidgetId !== this.widget.widgetId) {
        this.widgetClasses = ['dashboard-panel', 'dashboard-panel-color'];
      }
    } catch (e) {
      this.log.error('Error while handling widget selection.', e);
    }
  }

  /* Handling widget selection event here. */
  onWidgetSelection($event) {
    try {
      if (this.widgetClasses.indexOf('dashboard-panel-selected') > 0) {
         this.log.debug('Widget ' + this.widget.widgetId + ' already selected.');
      } else {
        this.widgetClasses.push('dashboard-panel-selected');
        this.widgetClasses.push('dashboard-panel-selected-color');

        /* Creating instance of widget inputs. */
        let widgetInputs = new WidgetActionInputs();
        widgetInputs.panelData = this.panelData;
        widgetInputs.widget = this.widget;
        widgetInputs.widgetAction = WIDGET_SELECTION;

      /* Emitting the action here to other widget component. */
      this._widgetDataService.broadcastWidgetAction(widgetInputs);
      }

      $event.stopPropagation();
    } catch (e) {
      this.log.error('Error while selecting widget.', e);
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

  /* View checked life cycle event. */
  ngAfterViewInit() {
    try {
    } catch (e) {
      this.log.error('Error while checking view content in view checked lifecycle event', e);
    }
  }

}
