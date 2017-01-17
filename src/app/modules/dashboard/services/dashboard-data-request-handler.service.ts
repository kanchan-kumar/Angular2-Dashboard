import { Injectable } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { DashboardRESTDataAPIService } from '../services/dashboard-rest-data-api.service';
import { DashboardDataContainerService } from '../services/dashboard-data-container.service';
import { DashboardConfigDataService } from '../services/dashboard-config-data.service';
import { ProgressBarService } from './progress-bar.service';
import { DASHBOARD_INIT_DATA, DASHBOARD_ONLOAD_DATA, DASHBOARD_FAV_TREE_DATA, DASHBOARD_STANDARD_TREE_DATA }
from '../constants/rest-api-names.constants';

@Injectable()
export class DashboardDataRequestHandlerService {

  constructor(private log: Logger,
              private _restAPI: DashboardRESTDataAPIService,
              private _dataService: DashboardDataContainerService,
              private _progessBar: ProgressBarService,
              private _config: DashboardConfigDataService) { }

  /**
   * Getting Dashboard Configuration from server through REST API.
   */
  public getDashboardConfiguration() {
    try {

        /* Getting/Creating parameters. */
        let restAPIURL = this._config.getURLWithBasicParamByRESTAPI(DASHBOARD_INIT_DATA);
        this.log.log('URL for getting dashboard configuration = ' + restAPIURL);

        /* Getting configuration data for dashboard. */
        let configSubscription = this._restAPI.getDataByRESTAPI(restAPIURL, '')
        .subscribe(
          result => { this.log.debug('Configuration Data recieved successfully from server.', result); },
          err => { this.log.error('Error while getting dashboard configuration data from server', err);
                 this._progessBar.stopProgressBar(); },
          () => { this.log.debug('Dashboard Configuration Request completed successfully. Adding data in data container service.');

            /*unsubscribe/releasing resources.*/
            configSubscription.unsubscribe();

            /* Now getting Dashboard Layout data and Graph Data. */
            this.getDashboardDataOnLoad();

            /* Getting dashboard favorite tree data in parallel. */
            this.requestFavoriteTreeData();
          }
        );
    } catch (e) {
      this.log.error('Error on getting dashboard configuration data.', e);
      this._progessBar.stopProgressBar();
    }
  }

  /**
   * Method is used for getting layout and graph data from server.
   */
  public getDashboardDataOnLoad() {
    try {

        /* Getting/Creating parameters. */
        let url = this._config.getURLWithBasicParamByRESTAPI(DASHBOARD_ONLOAD_DATA);

        this.log.debug('URL for getting dashboard layout/graph data = ' + url);

        /* Getting layout/graph data for dashboard on load. */
        let dataSubscription = this._restAPI.getDataByRESTAPI(url, '')
        .subscribe(
          result => {
            this.log.debug('Data recieved successfully for layout/graph from server.', result);
            this._dataService.updateFavoriteData(result);
          },
          err => { this.log.error('Error while getting graph/layout data from server', err); this._progessBar.stopProgressBar(); },
          () => { this.log.debug('Dashboard Data Request completed successfully. Adding data in data container service.');

            /*unsubscribe/releasing resources.*/
            dataSubscription.unsubscribe();
            /* Stopping Progress Bar here. */
            this._progessBar.stopProgressBar();
        });
    } catch (e) {
      this.log.error('Error in getting dashboard layout and graph data. Please check server error logs.', e);
      this._progessBar.stopProgressBar();
    }
  }

  /* Method is used for getting favorite tree data. */
  requestFavoriteTreeData() {
    try {
       /* Composing URL. */
       let restAPIURL = this._config.getURLWithBasicParamByRESTAPI(DASHBOARD_FAV_TREE_DATA);

       /* Getting favorite tree data for dashboard. */
        let dataSubscription = this._restAPI.getDataByRESTAPI(restAPIURL, '')
        .subscribe(
          result => {
            this.log.log('Favorite tree data recieved successfully from server.', result);
            /* Now getting Dashboard Layout data and Graph Data. */
            this._dataService.updateFavoriteTreeData(result);
          },
          err => { this.log.error('Error while getting favorite tree data from server', err); },
          () => { this.log.debug('Dashboard favorite tree data request completed successfully. Adding data in data container service.');
            /*unsubscribe/releasing resources.*/
            dataSubscription.unsubscribe();
          }
        );
    } catch (e) {
      this.log.error('Error while getting data of favorite tree.', e);
    }
  }

  /* Getting URL for standard tree data update. */
  getStandardTreeURL(path: string[]) {
    let urlParam = '';
    if (path != null) {
      for (let i = 0; i < path.length; i++) {
        urlParam += '&path[]=' + path[i];
      }
    }
    return this._config.getURLWithBasicParamByRESTAPI(DASHBOARD_STANDARD_TREE_DATA) + urlParam;
  }

  /* Method is used for getting Standard tree data. */
  getStandardTreeData() {
    try {
       /* Composing URL. */
       let restAPIURL = this.getStandardTreeURL(null);

       /* Getting favorite tree data for dashboard. */
        let dataSubscription = this._restAPI.getDataByRESTAPI(restAPIURL, '')
        .subscribe(
          result => {
            this.log.log('Standard tree data recieved successfully from server.', result);
            /* Now getting Dashboard Layout data and Graph Data. */
            this._dataService.updateStandardTreeData(result);
          },
          err => { this.log.error('Error while getting standard tree data from server', err); },
          () => { this.log.debug('Dashboard standard tree data request completed successfully. Adding data in data container service.');
            /*unsubscribe/releasing resources.*/
            dataSubscription.unsubscribe();
          }
        );
    } catch (e) {
      this.log.error('Error while getting data of standard tree.', e);
    }
  }
}
