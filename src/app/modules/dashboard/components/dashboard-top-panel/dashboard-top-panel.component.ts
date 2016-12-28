import { Component, OnInit } from '@angular/core';
import { DashboardMenuNavigatorService } from '../../services/dashboard-menu-navigator.service';
import { MenuModule, MenuItem } from 'primeng/primeng';

@Component({
  selector: 'dashboard-top-panel',
  templateUrl: './dashboard-top-panel.component.html',
  styleUrls: ['./dashboard-top-panel.component.scss']
})
export class DashboardTopPanelComponent implements OnInit {

  lastSampleTime: number = Date.now();
  favName: string = '_default';
  private favOptions: MenuItem[];

  constructor(private _menuNavService: DashboardMenuNavigatorService) {

    this.favOptions = [
            {label: 'Refresh', icon: 'fa-plus'},
            {label: 'Update', icon: 'fa-download'}
          ];
  }

  ngOnInit() {
  }

  /* Toggle Navigation Bar. */
  onMenuNavToggle() {
    this._menuNavService.toggleNavMenuAction('toggleMenuNav');
  }
}
