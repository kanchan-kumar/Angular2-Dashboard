import { Injectable } from '@angular/core';
import { DashboardDataContainerService } from './dashboard-data-container.service';
import { Logger } from 'angular2-logger/core';
import { WidgetConfiguration } from '../containers/widget-configuration';
import { Widget } from '../containers/widget';
import { WidgetInfo } from '../interfaces/widget-info';

@Injectable()
export class DashboardWidgetDataService {

  private layoutConfiguration: WidgetConfiguration;
  private widgets: Widget[];

  constructor( private _dataService: DashboardDataContainerService, private log: Logger) {

    /* Creating Instance for Layout configuration. */
    this.layoutConfiguration = new WidgetConfiguration();
  }

  /**
   * Processing layout widgets.
   */
  processLayoutWidgets() {
    try {

     /* Getting layout and graph data information. */
     let dashboardFavoriteData = this._dataService.getDashboardFavoriteData();
     let dashboardLayoutInfo = dashboardFavoriteData.dashboardLayoutData;

     /* Updating Layout Information. */
     this.layoutConfiguration.max_cols = dashboardLayoutInfo.columns;

     /* Creating Widgets Based on layout data. */
     this.createAndUpdateWidgets(dashboardLayoutInfo.panelLayoutDTO.widgets);

    } catch (e) {
      this.log.error('Error while processing data of widget.', e);
    }
  }

  /**
   * Creating/Updating dashboard widgets.
   */
  createAndUpdateWidgets( layoutWidgets: WidgetInfo[] ) {
    try {

      /* Creating widgets of layout widget length. */
      this.widgets = new Array(layoutWidgets.length);

      for ( let i = 0; i < layoutWidgets.length; i++ ) {
        let widget = layoutWidgets[i];

        /* Creating New Reference of Widget. */
        this.widgets[i] = new Widget();

        /* Copying the widget definition from layout. */
        this.widgets[i].row = widget.row;
        this.widgets[i].col = widget.col;
        this.widgets[i].sizex = widget.sizeX;
        this.widgets[i].sizey = widget.sizeY;
        this.widgets[i].widgetId = widget.widgetId;
        this.widgets[i].widgetType = widget.widgetType;
        this.widgets[i].widgetName = widget.name;
        this.widgets[i].widgetDescription = widget.description;
      }
    } catch (e) {
      this.log.error('Error while creating/updating dashboard widgets.', e);
    }
  }


  /**
   * Processing layout widgets data.
   */
  processWidgetData() {
    try {

    } catch (e) {
      this.log.error('Error while processing data of widget.', e);
    }
  }

  /* Getting widget configuration. */
  getWidgetConfiguration() {
    return this.layoutConfiguration;
  }

  /* Getting available widgets. */
  getWidgets() {
    return this.widgets;
  }

  public get $layoutConfiguration(): WidgetConfiguration {
    return this.layoutConfiguration;
  }

  public set $layoutConfiguration(value: WidgetConfiguration) {
    this.layoutConfiguration = value;
  }
}
