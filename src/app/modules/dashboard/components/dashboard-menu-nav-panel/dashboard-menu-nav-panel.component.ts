import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { DashboardMenuNavigatorService } from '../../services/dashboard-menu-navigator.service';
import { DashboardDataContainerService } from '../../services/dashboard-data-container.service';
import { Logger } from 'angular2-logger/core';
import { DashboardMenuDef } from '../../containers/dashboard-menu-def';
import { DashboardNavMenu } from '../../containers/dashboard-nav-menu';
import { Subscription }   from 'rxjs/Subscription';
import { FAVORITE_TREE_UPDATE_AVAILABLE } from '../../constants/actions.constants';
import { DashboardDataUtilsService } from '../../services/dashboard-data-utils.service';
import { CLOSE_SIDENAV, INCREASE_SIDENAV, DECREASE_SIDENAV } from '../../constants/actions.constants';

@Component({
  selector: 'dashboard-menu-nav-panel',
  providers: [ DashboardNavMenu ],
  templateUrl: './dashboard-menu-nav-panel.component.html',
  styleUrls: ['./dashboard-menu-nav-panel.component.scss']
})
export class DashboardMenuNavPanelComponent implements OnInit, OnDestroy {

  /*Data Subscriber of service.*/
  dataSubscription: Subscription;

  /* Menu Definition Array. */
  arrNavMenu = new Array<DashboardMenuDef>();

  /* Product Type. */
  productType: string = 'netstorm';

  /* Height of left navigation menu. */
  navHeight: number = 400;

  constructor(private log: Logger, private _menuNavService: DashboardMenuNavigatorService, private _navMenu: DashboardNavMenu,
              private _dataService: DashboardDataContainerService,
              private _dataUtils: DashboardDataUtilsService,
              private ngZone: NgZone) {
    this.arrNavMenu = _navMenu.getNavMenuByProductType(this.productType, this.menuClick);

    /* Calculation of navigation menu height. */
    /* Adjustment of height excluding the top fixed menu. */
    this.navHeight = window.innerHeight - 62;

    /* Putting the definition of component in global object for handling callback methods. */
    window['dashboardNavPanelRef'] = {
      zone: ngZone,
      component: this
    };

    log.debug('Menu Definition Array = ', this.arrNavMenu);
  }

  /* Event for menu click. */
  menuClick($event) {
      window['dashboardNavPanelRef'].zone.run((() => {
      window['dashboardNavPanelRef'].component.menuClickActionHandler($event);
    }));
  }

  /* Event for favorite menu click. */
  favMenuClick($event) {
      window['dashboardNavPanelRef'].zone.run((() => {
      window['dashboardNavPanelRef'].component.favoriteMenuActionHandler($event);
    }));
  }

  /*Menu Click Event Handler. */
  menuClickActionHandler(event) {
    try {
      this.log.debug(event.item.label);
    } catch (e) {
      this.log.error('Error while handling favorite opertaion.', e);
    }
  }

  /* Handler for favorite menu click. */
  favoriteMenuActionHandler(event) {
    try {
      this.log.debug(event.item.label);
    } catch (e) {
      this.log.error('Error while handling favorite opertaion.', e);
    }
  }

  /**
   * Updating favorite tree structure.
   */
  updateFavoriteTree(action) {
    try {
      this.log.debug('Getting data from service. Action type = ' + action);

      /* Checking for action type */
      if (action === FAVORITE_TREE_UPDATE_AVAILABLE) {
        let favMenuDef = this._dataUtils.processFavoriteMenuDef(this._dataService.getDashboardFavoriteTreeData(),
        this.favMenuClick);

        /* Checking for valid data. */
        /* Updating data in menu definition. */
        if (favMenuDef != null && favMenuDef.length > 0) {
          /* Iterating menu to put favorite menu in menu defintion. */
          for (let i = 0; i < this.arrNavMenu.length; i++) {
            if (this.arrNavMenu[i].label === 'Favorites') {
              this.arrNavMenu[i].setSubMenuArr = favMenuDef;
              break;
            }
          }
        }
      }
    } catch (e) {
      this.log.error('Error while updating data in right panel widgets', e);
    }
  }

  ngOnInit() {
    try {
      this.dataSubscription = this._dataService.favoriteDataObservable$.subscribe(
        action => {
          this.updateFavoriteTree(action);
      });
    } catch (e) {
      this.log.error('Error while initializing dashboard right panel component.', e);
    }
  }

  /*Toggle Navigation Bar. */
  onMenuNavClose() {
    this._menuNavService.toggleNavMenuAction(CLOSE_SIDENAV);
  }

  /** For Increasing SideNav width. */
  increaseSideNavWidth() {
    this._menuNavService.toggleNavMenuAction(INCREASE_SIDENAV);
  }

  /** For Decreasing SideNav width. */
  decreaseSideNavWidth() {
    this._menuNavService.toggleNavMenuAction(DECREASE_SIDENAV);
  }

  ngOnDestroy() {
    try {
      window['dashboardNavPanelRef'] = null;
    } catch (e) {}
  }
}
