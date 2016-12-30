import { Injectable } from '@angular/core';
import {Logger} from 'angular2-logger/core';
import { DashboardRESTDataAPIService } from '../services/dashboard-rest-data-api.service';
import { DashboardDataContainerService } from '../services/dashboard-data-container.service';
import { DASHBOARD_REST_API_PATH, DASHBOARD_INIT_DATA, DASHBOARD_ONLOAD_DATA } from '../constants/rest-api-names.constants';

@Injectable()
export class DashboardConfigDataService {

  private host: string = 'localhost';
  private port: number = 8084;
  private clientConnectionKey: string;
  private userName: string = 'netstorm';
  private userGroup: string = 'netstorm';
  private testRun: string = '60080';
  private productName: string = 'netstorm';

  /* Configuration from server through REST API. */
  private timeZone: string = 'IST';

  constructor(private log: Logger, private _restAPI: DashboardRESTDataAPIService, private _dataService: DashboardDataContainerService) { }

  /**
   * Method is used for setting initial configuration and generating connection key of client.
   */
  public setConfiguration() {
    try {

       let timestamp = new Date().getTime();
       this.clientConnectionKey = this.userName + '.' + this.testRun + '.' + timestamp;

       this.log.info('Generating client connection key = ' + this.clientConnectionKey);

        /* Getting/Creating parameters. */
        let host = this.getHostURL();
        let restAPI = this.getURLParamByRESTAPIName(DASHBOARD_INIT_DATA);
        let url = host + restAPI;
        this.log.log('URL for getting dashboard configuration = ' + url);
        this.getDashboardConfiguration(url);

    } catch (e) {
      this.log.error(e);
    }
  }

  /**
   * Getting Dashboard Configuration from server through REST API.
   */
  public getDashboardConfiguration(url: string) {
    try {
        /* Getting configuration data for dashboard. */
        let configSubscription = this._restAPI.getDataByRESTAPI(url, '')
        .subscribe(
          result => { this.log.debug('Configuration Data recieved successfully from server.', result); },
          err => { this.log.error('Error while getting data configuration from server', err); },
          () => { this.log.debug('Dashboard Configuration Request completed successfully. Adding data in data container service.');

            /*unsubscribe/releasing resources.*/
            configSubscription.unsubscribe();

            /* Now getting Dashboard Layout data and Graph Data. */
            this.getDashboardDataOnLoad();

          }
        );
    } catch (e) {
      this.log.error('Error on getting dashboard configuration data.', e);
    }
  }

  /**
   * Method is used for getting layout and graph data from server.
   */
  public getDashboardDataOnLoad() {
    try {

        /* Getting/Creating parameters. */
        let host = this.getHostURL();
        let restAPI = this.getURLParamByRESTAPIName(DASHBOARD_ONLOAD_DATA);
        let url = host + restAPI;
        this.log.debug('URL for getting dashboard layout/graph data = ' + url);

        /* Getting layout/graph data for dashboard on load. */
        let dataSubscription = this._restAPI.getDataByRESTAPI(url, '')
        .subscribe(
          result => {
            this.log.debug('Data recieved successfully for layout/graph from server.', result);
            this._dataService.updateFavoriteData(result);
          },
          err => { this.log.error('Error while getting graph/layout data from server', err); },
          () => { this.log.debug('Dashboard Data Request completed successfully. Adding data in data container service.');

            /*unsubscribe/releasing resources.*/
            dataSubscription.unsubscribe();
        });
    } catch (e) {
      this.log.error('Error in getting dashboard layout and graph data. Please check server error logs.', e);
    }
  }

  /**
   * Method is used for getting URL.
   */
  public getHostURL() {
    try {
       return 'http://' + this.host + ':' + this.port;
    } catch (e) {
      this.log.error(e);
      return null;
    }
  }

  /**
   * Method is used for getting common URL Parameters of REST API by API Name.
   */
  public getURLParamByRESTAPIName( apiName: string) {
    try {
       return DASHBOARD_REST_API_PATH + apiName + '?client_connection_key=' +
       this.clientConnectionKey + '&userName=' + this.userName + '&testRun=' + this.testRun + '&prodType=' + this.productName;
    } catch (e) {
      this.log.error(e);
      return null;
    }
  }
  public get $host(): string  {
    return this.host;
  }

  public set $host(value: string ) {
    this.host = value;
  }

  public get $port(): number  {
    return this.port;
  }

  public set $port(value: number ) {
    this.port = value;
  }

  public get $clientConnectionKey(): string {
    return this.clientConnectionKey;
  }

  public set $clientConnectionKey(value: string) {
    this.clientConnectionKey = value;
  }

  public get $userName(): string  {
    return this.userName;
  }

  public set $userName(value: string ) {
    this.userName = value;
  }

  public get $testRun(): string  {
    return this.testRun;
  }

  public set $testRun(value: string ) {
    this.testRun = value;
  }

  public get $userGroup(): string  {
    return this.userGroup;
  }

  public set $userGroup(value: string ) {
    this.userGroup = value;
  }

  public get $productName(): string  {
    return this.productName;
  }

  public set $productName(value: string ) {
    this.productName = value;
  }
}
