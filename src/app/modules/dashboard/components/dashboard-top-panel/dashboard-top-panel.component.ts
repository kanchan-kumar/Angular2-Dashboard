import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { DashboardMenuNavigatorService } from '../../services/dashboard-menu-navigator.service';
import { OPEN_SIDENAV, OPEN_TREE_SIDENAV } from '../../constants/actions.constants';
import { Logger } from 'angular2-logger/core';
import { DashboardMenuDef } from '../../containers/dashboard-menu-def';
import { DashboardNavMenu } from '../../containers/dashboard-nav-menu';

@Component({
  selector: 'dashboard-top-panel',
  providers: [ DashboardNavMenu ],
  templateUrl: './dashboard-top-panel.component.html',
  styleUrls: ['./dashboard-top-panel.component.scss']
})
export class DashboardTopPanelComponent implements OnInit, OnDestroy {

  lastSampleTime: number = Date.now();
  favName: string = '_default';
  private favOptions: DashboardMenuDef[];

  constructor(private _menuNavService: DashboardMenuNavigatorService,
              private log: Logger,
              private _navMenu: DashboardNavMenu,
              private ngZone: NgZone) {

    /*Getting favorite action menu here. */
    this.favOptions = _navMenu.getFavoriteMenuOptions(this.onFavClickAction);

    /* Putting the definition of component in global object for handling callback methods. */
    window['dashboardTopPanelRef'] = {
      zone: ngZone,
      component: this
    };
  }

  ngOnInit() {
  }

  /* Toggle Navigation Bar. */
  onMenuNavToggle() {
    this._menuNavService.toggleNavMenuAction(OPEN_SIDENAV);
  }

  /* Toggle tree navigation side bar. */
  onTreeNavToggle() {
    this._menuNavService.toggleNavMenuAction(OPEN_TREE_SIDENAV);
  }

  /* Handling favorite action menu click event. */
  onFavClickAction($event) {
    window['dashboardTopPanelRef'].zone.run((() => {
      window['dashboardTopPanelRef'].component.favMenuActionHandler($event);
    }));
  }

  /** Method is handler of favorite action. */
  favMenuActionHandler($event) {
    this.log.debug($event);
  }

  ngOnDestroy() {
    try {
      window['dashboardTopPanelRef'] = null;
    } catch (e) {}
  }
}
