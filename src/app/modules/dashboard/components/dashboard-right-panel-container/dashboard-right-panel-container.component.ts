import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { DashboardDataContainerService } from '../../services/dashboard-data-container.service';
import { Logger } from 'angular2-logger/core';
import { Subscription }   from 'rxjs/Subscription';
import { DashboardWidgetDataService } from '../../services/dashboard-widget-data.service';
import { Widget } from '../../containers/widget';
import { WidgetConfiguration } from '../../containers/widget-configuration';
import { FAVORITE_UPDATE_AVAILABLE } from '../../constants/actions.constants';
import { WidgetActionInputs } from '../../containers/widget-action-inputs';
import { WIDGET_MAXIMIZE, WIDGET_MINIMIZE, WIDGET_CLOSE } from '../../constants/actions.constants';

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

  /* Flag for Single Panel View Mode. */
  private isSinglePanelView: boolean = false;

  /* Layout Settings. */
  private layoutSettings: WidgetConfiguration;

  /* One/Single Panel View input object. */
  private singlePanelViewInputs: WidgetActionInputs = null;

  /* Initial height of panel. */
  panelHeight: string = '600px';

  constructor(private log: Logger, private _dataService: DashboardDataContainerService,
  private _widgetService: DashboardWidgetDataService) {
  }

  ngOnInit() {
    try {
      this.dataSubscription = this._dataService.favoriteDataObservable$.subscribe(
        action => {
          this.updateLayoutAndGraphs(action);
      });

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

      /* Resizing the layout. */
      this.panelHeight = window.innerHeight - 40 + 'px';

      /* Checking for action type */
      if (action === FAVORITE_UPDATE_AVAILABLE) {

        /* Updating Layout widgets in favorite update. */
        this._widgetService.processLayoutWidgets();

        /* Now processing graphs on panel. */
        this._widgetService.processFavoriteGraphData();

        /* Getting Layout Settings. */
        this.layoutSettings = this._widgetService.getWidgetConfiguration();

        /* Now getting data of processed widget. */
        this.widgets = this._widgetService.getWidgets();
      }

    } catch (e) {
      this.log.error('Error while updating data in right panel widgets', e);
    }
  }

  /**
   * Method called for any widget action.
   */
  onWidgetAction(action: WidgetActionInputs) {
    try {
      this.log.debug('Handling widget action with widget id = ' + action.widget.widgetId + ', action = ' + action.widgetAction);

      /* Checking for actions. */
      switch (action.widgetAction) {
        case WIDGET_MAXIMIZE:
          this.isSinglePanelView = true;
          this.singlePanelViewInputs = action;
          break;
        case WIDGET_CLOSE:
          this.onCloseWidget(action);
          break;
        case WIDGET_MINIMIZE:
          this.isSinglePanelView = false;
          break;
        default:
          this.log.debug('Unknown/Unhandled widget action type found. Action type = ' + action.widgetAction);
      }

    } catch (e) {
      this.log.error('Error while handling widget operation.', e);
    }
  }

  /**
   * Method is used for handling widget close operation.
   */
  onCloseWidget(action: WidgetActionInputs) {
    try {
      this.log.debug('Going to close widget with widget id = ' + action.widget.widgetId);
    } catch (e) {
      this.log.error('Error while closing/removing widget.', e);
    }
  }

  /* Event comes when any widget resized. */
  onResizeStop(itemConfig) {
    try {
      this.log.debug('Resize stopped of grid with widgetId = ' + itemConfig._config.widgetId);
    } catch (e) {
      this.log.error('Error while processing the widget resize event', e);
    }
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    try {
      this.log.debug('window resized.', event);
      /* Need to apply Observable cancellation logic here. */
      /* Re calculate colWidth of widget here. */
      /* Now updating column width and row height based on inputs. */
      let colWidth = window.innerWidth / this.layoutSettings.visible_cols;

     /* Setting column width of each widget. */
     this.layoutSettings.col_width = colWidth - 12;
    } catch (e) {
      this.log.error('Error while handling window resize event.', e);
    }
  }
}
