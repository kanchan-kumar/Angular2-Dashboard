import { Injectable } from '@angular/core';
import { DashboardDataContainerService } from './dashboard-data-container.service';
import { Logger } from 'angular2-logger/core';
import { WidgetConfiguration } from '../containers/widget-configuration';
import { Widget } from '../containers/widget';
import { WidgetInfo } from '../interfaces/widget-info';
import { DashboardPanelData } from '../containers/dashboard-panel-data';
import { DashboardDataValidatorService } from '../services/dashboard-data-validator.service';
import { WidgetType } from '../constants/widget-type.enum';
import { DashboardFavoriteData } from '../interfaces/dashboard-favorite-data';
import { DashboardChartProviderService } from './dashboard-chart-provider.service';
import { Chart } from '../containers/chart';

@Injectable()
export class DashboardWidgetDataService {

  private layoutConfiguration: WidgetConfiguration;
  private widgets: Widget[];
  private arrPanelData: DashboardPanelData[] = null;
  private activePanelNumber: number = 0;

  constructor( private _dataService: DashboardDataContainerService, private log: Logger,
               private _dataValidatorService: DashboardDataValidatorService,
               private _chartProvider: DashboardChartProviderService) {

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
        this.widgets[i].row = widget.row + 1;
        this.widgets[i].col = widget.col + 1;
        this.widgets[i].sizex = widget.sizeX;
        this.widgets[i].sizey = widget.sizeY;
        this.widgets[i].widgetId = widget.widgetId;
        this.widgets[i].widgetType = widget.widgetType;
        this.widgets[i].widgetName = widget.name;
        this.widgets[i].widgetDescription = widget.description;
        this.widgets[i].payload = 'object:' + i;
      }
    } catch (e) {
      this.log.error('Error while creating/updating dashboard widgets.', e);
    }
  }


  /**
   * Processing Favorite Graph Data and generate data for each panel.
   */
  processFavoriteGraphData() {
    try {

      this.log.debug('Generating panels data from favorite data.');

     let errorMsg = null;

     /* Getting layout and graph data information. */
     let dashboardFavoriteData = this._dataService.getDashboardFavoriteData();

     /* Here Checking for Dashboard Favorite Data Availability. */
     if (! this._dataValidatorService.isValidObject(dashboardFavoriteData)) {
        errorMsg = 'Error in validating favorite data. Please check the favorite and logs on server.';
        this.log.error(errorMsg);
        return errorMsg;
     }

    /* Now Checking for Error Code. */
    errorMsg = this._dataValidatorService.getErrorMessageByErrorCode(dashboardFavoriteData.errorCode);
    if (errorMsg != null) {
      this.log.error(errorMsg);
      return errorMsg;
    }

    /* Now Everything is fine. lets create the data of panels. */
    this.arrPanelData = new Array();

    /* Tracking Widget Based on panel. */
    /* Widget Number tells that which number of widget used by panel. Widgets may be less/more than favorite panels. */
    let widgetNumber = 0;

    /* Iterating and Processing Each Panel. */
    for ( let i = 0; i < dashboardFavoriteData.panelData.length; i++) {
       /* Getting and processing favorite panel Data. */
       this.arrPanelData[i] = new DashboardPanelData();

       /*Getting Widget Number. */
       /* Here we are checking if widget is less than available panel than repeat the widget. */
       if ( this.widgets.length <= widgetNumber) {
         widgetNumber = 0;
       }
       /* Getting Widget. */
       let widget = this.widgets[widgetNumber];

       this.log.debug('Going to process widget = ', widgetNumber);

       /* Process Graph Type Widget. */
       if (widget.widgetType === WidgetType.GRAPH_TYPE_WIDGET) {
         this.processGraphTypeWidget(dashboardFavoriteData, widget, i, this.arrPanelData[i]);
       } else if (widget.widgetType === WidgetType.DATA_TYPE_WIDGET) {
         this.processGraphTypeWidget(dashboardFavoriteData, widget, i, this.arrPanelData[i]);
       } else if (widget.widgetType === WidgetType.TABULER_TYPE_WIDGET) {
         this.processTabulerTypeWidget(dashboardFavoriteData, widget, i, this.arrPanelData[i]);
       }

       /* Changing Widget. */
       widgetNumber = widgetNumber + 1;
    }
    } catch (e) {
      this.log.error('Error while processing data of widget.', e);
    }
  }

  /**
   * Method is used for processing data of graph type widget.
   */
  processGraphTypeWidget(dashboardFavoriteData: DashboardFavoriteData, widget: Widget, panelNumber, panelData: DashboardPanelData ) {
    try {

      /* Getting Chart Type by panel number. */
      let chartType = dashboardFavoriteData.panelData[panelNumber].chartType;

      /* Here we are getting the chart data based on chart type in panel. */
      panelData.chart = this._chartProvider.getChartObjectByChartType(chartType, dashboardFavoriteData, panelNumber);
      panelData.panelTitle = dashboardFavoriteData.panelData[panelNumber].panelCaption;
      panelData.panelNumber = panelNumber;

      this.log.log('Panel ' + panelNumber + ' processed successfully.', panelData);
    } catch (e) {
      this.log.error('Error while processing data of graph type widget.', e);
    }
  }

  /**
   * Method is used for processing data of data type widget.
   */
  processDataTypeWidget(dashboardFavoriteData: DashboardFavoriteData, widget: Widget, panelNumber, panelData: DashboardPanelData ) {
    try {

    } catch (e) {
      this.log.error('Error while processing data of data type widget.', e);
    }
  }

  /**
   * Method is used for processing data of tabuler type widget.
   */
  processTabulerTypeWidget(dashboardFavoriteData: DashboardFavoriteData, widget: Widget, panelNumber, panelData: DashboardPanelData ) {
    try {

    } catch (e) {
      this.log.error('Error while processing data of tabuler type widget.', e);
    }
  }

  /* Getting panel data of specific panel.*/
  getPanelDataByPanelNumber(panelNumber: number) {
    try {
       if(panelNumber < this.arrPanelData.length) {
         return this.arrPanelData[panelNumber];
       }
    } catch (e) {
      this.log.error('Error while getting data of panel with panel number = ' + panelNumber, e );
      return null;
    }
  }

  /** Getting Empty chart object. */
  getEmptyChart(): Chart {
    try {
      return this._chartProvider.getEmptyChart();
    } catch (e) {
      this.log.error('Error while getting empty chart object.', e);
    }
  }

  /* Getting widget configuration. */
  getWidgetConfiguration() {
    return this.layoutConfiguration;
  }

  /* Getting available widgets array. */
  getWidgets() {
    return this.widgets;
  }

  /* Getting available panels array. */
  getPanelData() {
    return this.arrPanelData;
  }

  public get $layoutConfiguration(): WidgetConfiguration {
    return this.layoutConfiguration;
  }

  public set $layoutConfiguration(value: WidgetConfiguration) {
    this.layoutConfiguration = value;
  }
}
