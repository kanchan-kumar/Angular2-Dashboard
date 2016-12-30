import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardDataContainerService } from '../../services/dashboard-data-container.service';
import { Logger } from 'angular2-logger/core';
import { Subscription }   from 'rxjs/Subscription';
import { DashboardWidgetDataService } from '../../services/dashboard-widget-data.service';
import { Widget } from '../../containers/widget';
import { WidgetConfiguration } from '../../containers/widget-configuration';
import { FAVORITE_UPDATE_AVAILABLE } from '../../constants/actions.constants';

@Component({
  selector: 'dashboard-right-panel-container',
  templateUrl: './dashboard-right-panel-container.component.html',
  styleUrls: ['./dashboard-right-panel-container.component.scss']
})
export class DashboardRightPanelContainerComponent implements OnInit, OnDestroy {

   /*Data Subscriber of service.*/
  dataSubscription: Subscription;

  /* Widgets Definition Array. */
  private widgets: Widget[];

  /* Layout Settings. */
  private layoutSettings: WidgetConfiguration;

  constructor(private log: Logger, private _dataService: DashboardDataContainerService,
  private _widgetService: DashboardWidgetDataService) {
  }

  ngOnInit() {
    try {
      this.dataSubscription = this._dataService.favoriteDataObservable$.subscribe(action => { this.updateLayoutAndGraphs(action); });

    } catch (e) {
      this.log.error('Error while initializing dashboard right panel component.', e);
    }
  }

  /**
   * Method is used for updating and creating graphs and layout structure.
   */
  updateLayoutAndGraphs(action) {
    try {
      this.log.debug('Getting data from service. Action type = ' + action);

      /* Checking for action type */
      if (action === FAVORITE_UPDATE_AVAILABLE) {

        /* Updating Layout widgets in favorite update. */
        this._widgetService.processLayoutWidgets();

        /* Getting Layout Settings. */
        this.layoutSettings = this._widgetService.getWidgetConfiguration();

        /* Now getting data of processed widget. */
        this.widgets = this._widgetService.getWidgets();

        this.log.debug('Updated widgets = ', this.widgets);
      }

    } catch (e) {
      this.log.error('Error while updating data in right panel widgets', e);
    }
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
