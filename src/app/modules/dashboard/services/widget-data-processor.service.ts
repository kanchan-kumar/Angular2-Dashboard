import { Injectable } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Widget } from '../containers/widget';
import { DashboardPanelData } from '../containers/dashboard-panel-data';
import { DashboardDataUtilsService } from '../services/dashboard-data-utils.service';
import { DashboardDataValidaterService } from '../services/dashboard-data-validator.service';
import { DashboardFavoriteData } from '../interfaces/dashboard-favorite-data';
import { DataWidget } from '../containers/data-widget';
import { ErrorCodes } from '../constants/error-codes.enum';
import { AVERAGE, COUNT, LASTSAMPLE, MAXIMUM, MINIMUM, STDDEV } from '../constants/data-widget-attributes.constants';
import { DataWidgetIconNames } from '../constants/data-widget-icon-names';

@Injectable()
export class WidgetDataProcessorService {

  constructor( private log: Logger,
               private _dataUtils: DashboardDataUtilsService,
               private _dataValidator: DashboardDataValidaterService) { }

  /** Processing data for data widget. */
  getDataForDataWidget(dashboardFavoriteData: DashboardFavoriteData, widget: Widget, panelNumber,
  panelData: DashboardPanelData) {
    try {
    /* checking the data widget properties.*/
    if (! this._dataValidator.isValidObject(widget.dataWidget)) {
      /* Creating default instance for data widget. */
      panelData.errorCode = ErrorCodes.WIDGET_CONFIGURATION_ERROR;
      return;
    }

    /* Getting Properties of first graph. */
    /* Getting Data of Panel. */
    let firstGraphData =  dashboardFavoriteData.panelData[panelNumber].panelGraphs[0];

    /* Checking for data type of data widget. */
    panelData.dataWidget = new DataWidget();

    /* Setting common Properties. */
    panelData.dataWidget.dataAttrName = widget.dataWidget.dataAttrName;
    panelData.dataWidget.dataAttrDisplayName = widget.dataWidget.dataDisplayName;
    panelData.dataWidget.dataAttrIconName = widget.dataWidget.dataImgName;
    panelData.dataWidget.graphColor = firstGraphData.graphColor;

    switch (widget.dataWidget.dataAttrName) {
      case AVERAGE:
        panelData.dataWidget.dataAttrValue = this._dataUtils.getNumberWithPrecisionAndComma(firstGraphData.avg);
        break;
      case MINIMUM:
        panelData.dataWidget.dataAttrValue = this._dataUtils.getNumberWithPrecisionAndComma(firstGraphData.min);
        break;
      case MAXIMUM:
        panelData.dataWidget.dataAttrValue = this._dataUtils.getNumberWithPrecisionAndComma(firstGraphData.max);
        break;
      case STDDEV:
        panelData.dataWidget.dataAttrValue = this._dataUtils.getNumberWithPrecisionAndComma(firstGraphData.stdDev);
        break;
      case COUNT:
        panelData.dataWidget.dataAttrValue = this._dataUtils.getNumberWithPrecisionAndComma(firstGraphData.sampleCount);
        break;
      case LASTSAMPLE:
        panelData.dataWidget.dataAttrValue = this._dataUtils.getNumberWithPrecisionAndComma(firstGraphData.lastSample);
        break;
      default:
        panelData.dataWidget.dataAttrValue = '-';
      }
    } catch (e) {
      this.log.error('Error while generating data for data widget.', e);
      return;
    }
  }
}
