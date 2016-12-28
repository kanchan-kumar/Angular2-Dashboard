import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { TieredMenuModule, MenuModule, MenubarModule } from 'primeng/primeng';
import { Logger, Options as LoggerOptions, Level as LoggerLevel } from 'angular2-logger/core';
import { NgGrid, NgGridItem } from 'angular2-grid';

/* Import routes configuration. */
import {DASHBOARD_ROUTES} from './routes/dashboard.routes';

/* Importing Services. */
import { DashboardMenuNavigatorService } from './services/dashboard-menu-navigator.service';

/* Importing Components. */
import { DashboardComponent } from './dashboard.component';
import { DashboardTopPanelComponent } from './components/dashboard-top-panel/dashboard-top-panel.component';
import { DashboardMainComponent } from './components/dashboard-main/dashboard-main.component';
import { DashboardMenuNavPanelComponent } from './components/dashboard-menu-nav-panel/dashboard-menu-nav-panel.component';
import { DashboardTreePanelComponent } from './components/dashboard-tree-panel/dashboard-tree-panel.component';
import { DashboardLowerTabularPanelComponent } from './components/dashboard-lower-tabular-panel/dashboard-lower-tabular-panel.component';
import { DashboardRightPanelContainerComponent } from './components/dashboard-right-panel-container/dashboard-right-panel-container.component';
import { DashboardNavMenuComponent } from './components/dashboard-nav-menu/dashboard-nav-menu.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NgGrid,
    NgGridItem,
    DashboardTopPanelComponent,
    DashboardMainComponent,
    DashboardMenuNavPanelComponent,
    DashboardTreePanelComponent,
    DashboardLowerTabularPanelComponent,
    DashboardRightPanelContainerComponent,
    DashboardNavMenuComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(DASHBOARD_ROUTES),
    TieredMenuModule,
    MenuModule,
    MenubarModule,
    RouterModule
  ],
  providers: [
    { provide: LoggerOptions, useValue: { level: LoggerLevel.DEBUG } },
    Logger,
    DashboardMenuNavigatorService
  ],
  bootstrap: [DashboardComponent]
})
export class DashboardModule {
  constructor(private _appRef: ApplicationRef) { }

  ngDoBootstrap() {
    this._appRef.bootstrap(DashboardComponent);
  }
}
