import { Component, OnInit } from '@angular/core';
import { DashboardMenuNavigatorService } from '../../services/dashboard-menu-navigator.service';
import { Logger } from 'angular2-logger/core';
import { DashboardMenuDef } from '../../containers/dashboard-menu-def';
import { DashboardNavMenu } from '../../containers/dashboard-nav-menu';

@Component({
  selector: 'dashboard-menu-nav-panel',
  providers: [ DashboardNavMenu ],
  templateUrl: './dashboard-menu-nav-panel.component.html',
  styleUrls: ['./dashboard-menu-nav-panel.component.scss']
})
export class DashboardMenuNavPanelComponent implements OnInit {

  /* Menu Definition Array. */
  arrNavMenu = new Array<DashboardMenuDef>();

  /* Product Type. */
  productType: string = 'netstorm';

  constructor(private log: Logger, private _menuNavService: DashboardMenuNavigatorService, private _navMenu: DashboardNavMenu) {
    this.arrNavMenu = _navMenu.getNavMenuByProductType(this.productType, this.onMenuClick);
    log.debug('Menu Definition Array = ', this.arrNavMenu);
  }

  /*Menu Click Event Handler. */
  onMenuClick(event) {
      this.log.debug(event);
      this.log.debug(event.item.label);
  }

  ngOnInit() {
  }

  /*Toggle Navigation Bar. */
  onMenuNavClose() {
    this._menuNavService.toggleNavMenuAction('toggleMenuNav');
  }
}
