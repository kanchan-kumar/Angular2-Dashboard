import { Component, OnInit } from '@angular/core';
import { DashboardMenuNavigatorService } from '../../services/dashboard-menu-navigator.service';
import { DashboardDataContainerService } from '../../services/dashboard-data-container.service';
import { Logger } from '../../../../../vendors/angular2-logger/core';
import { Subscription }   from 'rxjs/Subscription';
import { DashboardDataUtilsService } from '../../services/dashboard-data-utils.service';
import { CLOSE_TREE_SIDENAV, INCREASE_TREE_SIDENAV, DECREASE_TREE_SIDENAV } from '../../constants/actions.constants';

@Component({
  selector: 'dashboard-tree-panel',
  templateUrl: './dashboard-tree-panel.component.html',
  styleUrls: ['./dashboard-tree-panel.component.scss']
})
export class DashboardTreePanelComponent implements OnInit {

  constructor(private log: Logger,
              private _menuNavService: DashboardMenuNavigatorService) { }

  ngOnInit() {
  }

    /*Toggle Tree Navigation Bar. */
  onTreeNavClose() {
    this._menuNavService.toggleNavMenuAction(CLOSE_TREE_SIDENAV);
  }

  /** For Increasing Tree SideNav width. */
  increaseTreeNavWidth() {
    this._menuNavService.toggleNavMenuAction(INCREASE_TREE_SIDENAV);
  }

  /** For Decreasing Tree SideNav width. */
  decreaseTreeNavWidth() {
    this._menuNavService.toggleNavMenuAction(DECREASE_TREE_SIDENAV);
  }
}
