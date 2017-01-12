import { Component, OnInit } from '@angular/core';
import { DashboardMenuNavigatorService } from '../../services/dashboard-menu-navigator.service';
import { DashboardDataContainerService } from '../../services/dashboard-data-container.service';
import { Logger } from 'angular2-logger/core';
import { DashboardMenuDef } from '../../containers/dashboard-menu-def';
import { DashboardNavMenu } from '../../containers/dashboard-nav-menu';
import { Subscription }   from 'rxjs/Subscription';
import { FAVORITE_TREE_UPDATE_AVAILABLE } from '../../constants/actions.constants';
import { DashboardDataUtilsService } from '../../services/dashboard-data-utils.service';

@Component({
  selector: 'dashboard-menu-nav-panel',
  providers: [ DashboardNavMenu ],
  templateUrl: './dashboard-menu-nav-panel.component.html',
  styleUrls: ['./dashboard-menu-nav-panel.component.scss']
})
export class DashboardMenuNavPanelComponent implements OnInit {

  /*Data Subscriber of service.*/
  dataSubscription: Subscription;

  /* Menu Definition Array. */
  arrNavMenu = new Array<DashboardMenuDef>();

  /* Product Type. */
  productType: string = 'netstorm';

  constructor(private log: Logger, private _menuNavService: DashboardMenuNavigatorService, private _navMenu: DashboardNavMenu,
              private _dataService: DashboardDataContainerService,
              private _dataUtils: DashboardDataUtilsService) {
    this.arrNavMenu = _navMenu.getNavMenuByProductType(this.productType, this.menuClickActionHandler);
    log.debug('Menu Definition Array = ', this.arrNavMenu);
  }

  /*Menu Click Event Handler. */
  menuClickActionHandler(event) {
    try {
      console.log(event);
      console.log(event.item.label);
    } catch (e) {
      this.log.error('Error while handling favorite opertaion.', e);
    }
  }

  /* Handler for favorite menu click. */
  favoriteMenuActionHandler(event) {
    try {
      console.log(event);
      console.log(event.item.label);
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
        this.favoriteMenuActionHandler);

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
    this._menuNavService.toggleNavMenuAction('toggleMenuNav');
  }
}
