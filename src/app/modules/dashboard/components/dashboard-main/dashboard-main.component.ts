import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { DashboardMenuNavigatorService } from '../../services/dashboard-menu-navigator.service';
import {MdSidenav} from '@angular/material';
import {Logger} from 'angular2-logger/core';

@Component({
  selector: 'dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {

  subscription: Subscription;
  @ViewChild('navSideBar') menuSideNav: MdSidenav;

  constructor(private _menuNavService: DashboardMenuNavigatorService, private log: Logger) {

    /*Listening Event.*/
    this.subscription = _menuNavService.toggleMenuProvider$.subscribe(

      /*Getting Event Here.*/
      value => {
        this.log.info('Opening/Closing Navigation Menu. value = ' + value);

        if (value === 'toggleMenuNav' ) {
          this.menuSideNav.toggle();
        }
      }
    );
  }

  ngOnInit() {
  }

}
