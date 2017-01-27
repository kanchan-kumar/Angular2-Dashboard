import { Injectable } from '@angular/core';
import { Logger } from '../../../../vendors/angular2-logger/core';
import { DashboardRESTDataAPIService } from '../services/dashboard-rest-data-api.service';
import { DashboardDataContainerService } from '../services/dashboard-data-container.service';
import { DashboardConfigDataService } from '../services/dashboard-config-data.service';
import { ProgressBarService } from './progress-bar.service';
import { DASHBOARD_STANDARD_TREE_DATA, DASHBOARD_STANDARD_TREE_SERACH }
from '../constants/rest-api-names.constants';

@Injectable()
export class TreeDataRequestHandlerService {

  constructor(private log: Logger,
              private _restAPI: DashboardRESTDataAPIService,
              private _dataService: DashboardDataContainerService,
              private _progessBar: ProgressBarService,
              private _config: DashboardConfigDataService) { }

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

  /* Getting URL for standard tree data update. */
  getStandardTreeURLForSearch(searchText, treeLevel = 'All', isFromPanel = false) {
    let urlParam = '&level=' + treeLevel + '&toSearch=' + searchText + '&searchGraphFromPanel' + isFromPanel;
    return this._config.getURLWithBasicParamByRESTAPI(DASHBOARD_STANDARD_TREE_SERACH) + urlParam;
  }

  /* Method is used for getting Standard tree data. */
  getStandardTreeData(restAPIURL: string) {
    try {
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
