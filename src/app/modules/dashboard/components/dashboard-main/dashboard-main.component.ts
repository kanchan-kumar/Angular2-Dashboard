import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { DashboardMenuNavigatorService } from '../../services/dashboard-menu-navigator.service';
import { MdSidenav } from '@angular/material';
import { Logger } from '../../../../../vendors/angular2-logger/core';
import { OPEN_SIDENAV, CLOSE_SIDENAV, INCREASE_SIDENAV, DECREASE_SIDENAV,
         OPEN_TREE_SIDENAV, CLOSE_TREE_SIDENAV, INCREASE_TREE_SIDENAV, DECREASE_TREE_SIDENAV } from '../../constants/actions.constants';
import { DashboardConfigDataService } from '../../services/dashboard-config-data.service';

@Component({
  selector: 'dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  @ViewChild('navSideBar') menuSideNav: MdSidenav;
  @ViewChild('navTreeSideBar') menuTreeSideNav: MdSidenav;
  /*Left Side navigation width. */
  navWidth: number = 200;

  /*Right side tree navigation width. */
  navTreeWidth: number = 300;

  constructor(private _menuNavService: DashboardMenuNavigatorService,
              private log: Logger,
              private _config: DashboardConfigDataService) {

    /*Listening Event.*/
    this.subscription = _menuNavService.toggleMenuProvider$.subscribe(

      /*Getting Event Here.*/
      value => {
        this.log.info('Opening/Closing Navigation Menu. value = ' + value);

        switch (value) {
          case OPEN_SIDENAV: {
            this.menuSideNav.toggle();
              _config.$navWidth = this.navWidth;
            }
            break;
          case CLOSE_SIDENAV: {
            this.menuSideNav.toggle();
              _config.$navWidth = 0;
            }
            break;
          case INCREASE_SIDENAV:
            if (this.navWidth < 800) {
              this.navWidth += 50;
              _config.$navWidth = this.navWidth;
            }
            break;
          case DECREASE_SIDENAV:
            if (this.navWidth > 150) {
              this.navWidth -= 50;
              _config.$navWidth = this.navWidth;
            }
            break;
          case OPEN_TREE_SIDENAV: {
            this.menuTreeSideNav.toggle();
              _config.$navWidth = this.navWidth;
            }
            break;
          case CLOSE_TREE_SIDENAV: {
            this.menuTreeSideNav.toggle();
              _config.$navWidth = 0;
            }
            break;
          case INCREASE_TREE_SIDENAV:
            if (this.navTreeWidth < 800) {
              this.navTreeWidth += 50;
              _config.$navWidth = this.navWidth;
            }
            break;
          case DECREASE_TREE_SIDENAV:
            if (this.navTreeWidth > 150) {
              this.navTreeWidth -= 50;
              _config.$navWidth = this.navWidth;
            }
            break;
        }
      }
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
