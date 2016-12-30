import { Injectable } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { DashboardFavoriteData } from '../interfaces/dashboard-favorite-data';
import { Subject } from 'rxjs/Subject';
import { FAVORITE_UPDATE_AVAILABLE } from '../constants/actions.constants';

/**
 * This is the main data container service, contains all major information/data releated to favorites, layouts, etc.
 */
@Injectable()
export class DashboardDataContainerService {

  /* Dashboard Favorite data. */
  private dashboardFavoriteData: DashboardFavoriteData;

  /*Observable sources for favorite data updation.*/
  private favoriteDataUpdateBroadcaster = new Subject<string>();

  /* Service Observable for favorite updation broadcast. */
  favoriteDataObservable$ =  this.favoriteDataUpdateBroadcaster.asObservable();

  constructor(private log: Logger) { }

  /**
   * Method for updating Favorite data on service. Every time data updated in favorite, it broadcast to all subscribers.
   */
  public updateFavoriteData(favoritedata: DashboardFavoriteData) {
    try {

      this.log.log('Favorite data = ', favoritedata);

      /* Assigning Favorite Data Here. */
      this.dashboardFavoriteData = favoritedata;

      /* Notify to all subscribers for new data available. */
      this.favoriteDataUpdateBroadcaster.next(FAVORITE_UPDATE_AVAILABLE);

    } catch (e) {
      this.log.error('Error while processing and updating favorite data in service.', e);
    }
  }

   /*Getting Layout Information from favorite.*/
   getDashboardLayoutInfo() {
    return this.dashboardFavoriteData.dashboardLayoutData;
  }

  /*Getting Dashboard Favorite data. */
  public getDashboardFavoriteData() {
    return this.dashboardFavoriteData;
  }
}
