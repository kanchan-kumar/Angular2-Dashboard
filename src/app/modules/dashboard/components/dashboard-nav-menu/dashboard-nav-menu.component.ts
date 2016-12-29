import { Component, ViewChild, Input, OnInit } from '@angular/core';
import {Logger} from 'angular2-logger/core';
import { DashboardMenuDef } from '../../containers/dashboard-menu-def';

@Component({
  selector: 'dashboard-nav-menu',
  templateUrl: './dashboard-nav-menu.component.html',
  styleUrls: ['./dashboard-nav-menu.component.scss']
})
export class DashboardNavMenuComponent implements OnInit {

  @Input() navMenu: DashboardMenuDef = null;
  @Input() sidebarCollapsed: boolean = true;
  @Input() idx = 0;
  @ViewChild('menu') menu;
  private items: DashboardMenuDef[];

  constructor(private log: Logger) {
    log.debug('Menu Created for Menu Name = ' + this.navMenu);
  }

  /* Opening/Closing Navigation.*/
  openNavMenuBar($event) {
    if (this.navMenu.hasOwnProperty('items') && this.navMenu.getSubMenuArr != null) {
      this.menu.toggle($event);
      this.log.info('Opening Sub Menu of Menu = ', this.navMenu);
    } else {
      this.log.info('Sub Menu not available of Menu = ', this.navMenu);
    }
  }

  ngOnInit() {
    try {
      this.items = this.navMenu.getSubMenuArr;
      this.log.debug('Sub Menu for Menu Name = ', this.navMenu);
    } catch(e) {
      this.log.error(e);
    }
  }

  onclick(event) {
    let target = event.target || event.srcElement || event.currentTarget;
    let idAttr = target.attributes.id;
    let id = idAttr.nodeValue;
    console.log(id);
}

}
