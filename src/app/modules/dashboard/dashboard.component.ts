import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardConfigDataService } from './services/dashboard-config-data.service';
import { DashboardRESTDataAPIService } from './services/dashboard-rest-data-api.service';
import { DashboardDataContainerService } from './services/dashboard-data-container.service';
import {Logger} from 'angular2-logger/core';

@Component({
  selector: 'dashboard-loading',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private _configService: DashboardConfigDataService, private _restAPI: DashboardRESTDataAPIService,
  private _dataService: DashboardDataContainerService, private log: Logger) {
    log.info('Dashboard Component Loaded. Getting API data.');
  }

  ngOnInit() {
    try {
      this.log.info('Loading dashboard components.');

      /* Generating and setting configuration. */
      this._configService.setConfiguration();
    } catch (e) {
      this.log.error(e);
    }
  }

  ngOnDestroy() {
    this.log.debug('Destroying components of dashboard and releasing resources.');
  }
}
