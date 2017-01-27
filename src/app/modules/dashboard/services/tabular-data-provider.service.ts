import { Injectable } from '@angular/core';
import { Logger } from '../../../../vendors/angular2-logger/core';
import { DashboardDataContainerService } from '../services/dashboard-data-container.service';
import { DashboardConfigDataService } from '../services/dashboard-config-data.service';
import { ProgressBarService } from './progress-bar.service';
import { TabularDataColumns } from '../containers/tabular-data-columns';
import { Subject } from 'rxjs/Subject';
import { DashboardDataUtilsService } from './dashboard-data-utils.service';

@Injectable()
export class TabularDataProviderService {

  /*Observable string sources.*/
  private lowerPanelTableUpdateService = new Subject<string>();

  /*Service Observable for getting data update for lower panel.*/
  lowerPanelUpdateProvider$ =  this.lowerPanelTableUpdateService.asObservable();

  constructor(private log: Logger,
              private _dataService: DashboardDataContainerService,
              private _configService: DashboardConfigDataService,
              private _dataUtilService: DashboardDataUtilsService) { }


  /*Service message commands.*/
  updateLowerPanel(value: string) {
    /*Observable string streams.*/
    this.lowerPanelTableUpdateService.next(value);
  }

  /** Getting table columns for normal graphs. */
  getLowerTableColumnsForNormalGraph(): Array<TabularDataColumns> {
    try {
      /* Default Columns. */
      let defaultCols = this._configService.$defaultLowerTableCols;

      /* Array of colums. */
      let arrColumns = new Array();

      /* Iterating through default columns. */
      for (let i = 0; i < defaultCols.length; i++) {
        let column = defaultCols[i];
        /* Creating column for lower panel */
        let lowerTableColumn = new TabularDataColumns();
        lowerTableColumn.field = column;
        lowerTableColumn.style = {'width': '8%'};
        lowerTableColumn.sortable = true;
        lowerTableColumn.selectionMode = 'single';
        lowerTableColumn.filter = true;
        lowerTableColumn.colClass = 'table-text-align-right';
        switch (column) {
          case 'checkbox': {
            lowerTableColumn.field = 'checked';
            lowerTableColumn.header = 'checkbox';
            lowerTableColumn.style = {'width': '2%'};
            lowerTableColumn.frozen = true;
            lowerTableColumn.sortable = false;
            lowerTableColumn.selectionMode = null;
            lowerTableColumn.filter = false;
            lowerTableColumn.colClass = 'table-text-align-center';

          } break;
          case '#': {
            lowerTableColumn.header = '#';
            lowerTableColumn.style = {'width': '2%'};
            lowerTableColumn.frozen = true;
            lowerTableColumn.sortable = false;
            lowerTableColumn.selectionMode = null;
            lowerTableColumn.filter = false;

          } break;
          case 'color': {
            lowerTableColumn.header = 'Color';
            lowerTableColumn.style = {'width': '6%'};
            lowerTableColumn.frozen = true;
            lowerTableColumn.sortable = false;
            lowerTableColumn.selectionMode = null;
            lowerTableColumn.filter = false;

          } break;
          case 'metricName': {
            lowerTableColumn.header = 'Metric Name';
            lowerTableColumn.style = {'width': '28%'};
            lowerTableColumn.colClass = 'table-text-align-left';
          } break;
          case 'avg': {
            lowerTableColumn.header = 'Avg';
          } break;
          case 'min': {
            lowerTableColumn.header = 'Min';
          } break;
          case 'max': {
            lowerTableColumn.header = 'Max';
          } break;
          case 'stddev': {
            lowerTableColumn.header = 'Std Dev';
          } break;
          case 'last': {
            lowerTableColumn.header = 'Last';
          } break;
          case 'samples': {
            lowerTableColumn.header = 'Samples';
          } break;
        }

        /* Adding in array. */
        arrColumns.push(lowerTableColumn);
      }
      return arrColumns;
    } catch (e) {
      this.log.error('Error while generating table columns for normal graph.', e);
      return null;
    }
  }

  /* Getting lower panel columns based on selected panel.*/
  getLowerTableColumnsForSelectedPanel() {
    try {
      let activePanelNum = this._configService.$activePanelNumber;
      this.log.debug('Updating Lower panel table columns for panel number ' + activePanelNum);
      return this.getLowerTableColumnsForNormalGraph();
    } catch (e) {
      this.log.error('Error while generating lower panel table columns for selected panel.', e);
    }
  }

  /* Getting lower panel data based on selected panel.*/
  getLowerPanelTableDataForSelectedPanel() {
    try {
      let activePanelNum = this._configService.$activePanelNumber;
      this.log.debug('Updating Lower panel table data for panel number ' + activePanelNum);
      return this.getLowerTableDataForNormalGraph();
    } catch (e) {
      this.log.error('Error while generating lower panel table columns for selected panel.', e);
    }
  }

  /* Getting lower panel columns for normal graphs.*/
  getLowerTableDataForNormalGraph() {
    try {
      let activePanelNum = this._configService.$activePanelNumber;

      /* Generating table data for normal graphs. */
      let tableData = new Array();

      /* Getting normal graphs columns. */
      let arrTableCols = this._configService.$defaultLowerTableCols;

      /* Getting dashboard favorite data. */
      let dashboardFavData = this._dataService.getDashboardFavoriteData();

      /* Checking for panel availability. */
      if (activePanelNum >= dashboardFavData.panelData.length) {
        this.log.error('Panel ' + activePanelNum + ' not available in active favorite.');
        return tableData;
      }

      /*Getting Panel Data.*/
      let favPanelData = dashboardFavData.panelData[activePanelNum];

      /* Now generating table data. */
      for (let i = 0; i < favPanelData.numGraphs; i++) {
        /*Getting panel graph.*/
        let favPanelGraph = favPanelData.panelGraphs[i];

        /* Creating row data for table. */
        let tableRow = {};

        /* Now Iterating for table columns. */
        for (let k = 0; k < arrTableCols.length; k++) {
            switch (arrTableCols[k]) {
              case 'checkbox': {
                tableRow['checked'] = favPanelGraph.isVisible;
              } break;
              case '#': {
                tableRow['#'] = i + 1;
              } break;
              case 'color': {
                tableRow['color'] = favPanelGraph.graphColor;
              } break;
              case 'metricName': {
                tableRow['metricName'] = favPanelGraph.graphName;
              } break;
              case 'avg': {
                tableRow['avg'] = this._dataUtilService.getNumberWithFixedDecimalAndComma(favPanelGraph.avg);
              } break;
              case 'min': {
                tableRow['min'] = this._dataUtilService.getNumberWithFixedDecimalAndComma(favPanelGraph.min);
              } break;
              case 'max': {
                tableRow['max'] = this._dataUtilService.getNumberWithFixedDecimalAndComma(favPanelGraph.max);
              } break;
              case 'stddev': {
                tableRow['stddev'] = this._dataUtilService.getNumberWithFixedDecimalAndComma(favPanelGraph.stdDev);
              } break;
              case 'last': {
                tableRow['last'] = this._dataUtilService.getNumberWithFixedDecimalAndComma(favPanelGraph.lastSample);
              } break;
              case 'samples': {
                tableRow['samples'] = favPanelGraph.sampleCount;
              } break;
          }
        }
        /* Adding Row in table. */
        tableData.push(tableRow);
      }
      return tableData;
    } catch (e) {
      this.log.error('Error while generating lower panel table columns for selected panel.', e);
      return new Array();
    }
  }
}
