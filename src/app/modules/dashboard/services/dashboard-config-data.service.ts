import { Injectable } from '@angular/core';
import {Logger} from '../../../../vendors/angular2-logger/core';
import { DashboardRESTDataAPIService } from '../services/dashboard-rest-data-api.service';
import { DashboardDataContainerService } from '../services/dashboard-data-container.service';
import { DASHBOARD_REST_API_PATH } from '../constants/rest-api-names.constants';
import { ProgressBarService } from './progress-bar.service';

@Injectable()
export class DashboardConfigDataService {

  private host: string = 'localhost';
  private port: number = 8084;
  private clientConnectionKey: string;
  private userName: string = 'netstorm';
  private userGroup: string = 'netstorm';
  private testRun: string = '60080';
  private productName: string = 'netstorm';
  private navWidth: number = 0;
  private activePanelNumber: number = 0;
  private activeWidgetId: number = 0;

  /* Default Columns for Lower panel table. */
  private defaultLowerTableCols: Array<string> = ['checkbox', '#', 'color', 'metricName', 'avg', 'min', 'max', 'stddev', 'last', 'samples'];

  /* Configuration from server through REST API. */
  private timeZone: string = 'Asia/Kolkata';

  constructor(private log: Logger, private _restAPI: DashboardRESTDataAPIService,
              private _dataService: DashboardDataContainerService,
              private _progessBar: ProgressBarService
              ) { }

  /**
   * Method is used for setting initial configuration and generating connection key of client.
   */
  public setConfiguration() {
    try {
      /* Starting Progress Bar. */
      this._progessBar.startProgressBar('Getting Dashboard Configurations. Please wait ...');

       let timestamp = new Date().getTime();
       this.clientConnectionKey = this.userName + '.' + this.testRun + '.' + timestamp;

       this.log.info('Generating client connection key = ' + this.clientConnectionKey);
    } catch (e) {
      this.log.error(e);
      this._progessBar.stopProgressBar();
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

  /** Method is used for getting URL by REST API name. */
  public getURLWithBasicParamByRESTAPI(apiName: string): string {
    return this.getHostURL() + this.getURLParamByRESTAPIName(apiName);
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

  public get $timeZone(): string  {
    return this.timeZone;
  }

  public set $timeZone(value: string ) {
    this.timeZone = value;
  }

  public get $navWidth(): number  {
    return this.navWidth;
  }

  public set $navWidth(value: number ) {
    this.navWidth = value;
  }

  public get $defaultLowerTableCols(): Array<any>  {
    return this.defaultLowerTableCols;
  }

  public set $defaultLowerTableCols(value: Array<any> ) {
    this.defaultLowerTableCols = value;
  }

    public get $activePanelNumber(): number  {
    return this.activePanelNumber;
  }

  public set $activePanelNumber(value: number ) {
    this.activePanelNumber = value;
  }

  public get $activeWidgetId(): number  {
    return this.activeWidgetId;
  }

  public set $activeWidgetId(value: number ) {
    this.activeWidgetId = value;
  }
}
