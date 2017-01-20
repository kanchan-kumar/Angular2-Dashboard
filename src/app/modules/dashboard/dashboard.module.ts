import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { TieredMenuModule, MenuModule, MenubarModule, PanelModule, ButtonModule,
         SplitButtonModule, SlideMenuModule, PanelMenuModule, TreeModule, InputTextModule, DropdownModule,
         ContextMenuModule, DialogModule, ProgressBarModule } from 'primeng/primeng';
import { Logger, Options as LoggerOptions, Level as LoggerLevel } from '../../../vendors/angular2-logger/core';

import { NgGridModule } from '../../../vendors/angular2-grid/src/modules/NgGrid.module';
import { ChartModule } from 'angular2-highcharts';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { MomentModule } from 'angular2-moment';
import { PerfectScrollbarModule } from 'angular2-perfect-scrollbar';

/* Import routes configuration. */
import {DASHBOARD_ROUTES} from './routes/dashboard.routes';

/* Importing Services. */
import { DashboardMenuNavigatorService } from './services/dashboard-menu-navigator.service';
import { DashboardConfigDataService } from './services/dashboard-config-data.service';
import { DashboardRESTDataAPIService } from './services/dashboard-rest-data-api.service';
import { DashboardDataContainerService } from './services/dashboard-data-container.service';
import { DashboardWidgetDataService } from './services/dashboard-widget-data.service';
import { DashboardDataValidaterService } from './services/dashboard-data-validator.service';
import { DashboardChartProviderService } from './services/dashboard-chart-provider.service';
import { WidgetDataProcessorService } from './services/widget-data-processor.service';
import { ProgressBarService } from './services/progress-bar.service';
import { DashboardDataRequestHandlerService } from './services/dashboard-data-request-handler.service';
import { DashboardDataUtilsService } from './services/dashboard-data-utils.service';
import { TreeDataRequestHandlerService } from './services/tree-data-request-handler.service';

/* Import Pipes. */
import { RoundPipe } from 'angular-pipes/src/math/round.pipe';

/* Importing Components. */
import { DashboardComponent } from './dashboard.component';
import { DashboardTopPanelComponent } from './components/dashboard-top-panel/dashboard-top-panel.component';
import { DashboardMainComponent } from './components/dashboard-main/dashboard-main.component';
import { DashboardMenuNavPanelComponent } from './components/dashboard-menu-nav-panel/dashboard-menu-nav-panel.component';
import { DashboardTreePanelComponent } from './components/dashboard-tree-panel/dashboard-tree-panel.component';
import { DashboardLowerTabularPanelComponent } from './components/dashboard-lower-tabular-panel/dashboard-lower-tabular-panel.component';
import { DashboardRightPanelContainerComponent } from
'./components/dashboard-right-panel-container/dashboard-right-panel-container.component';
import { DashboardNavMenuComponent } from './components/dashboard-nav-menu/dashboard-nav-menu.component';
import { DashboardWidgetComponent } from './components/dashboard-widget/dashboard-widget.component';
import { DashboardOnePanelViewComponent } from './components/dashboard-one-panel-view/dashboard-one-panel-view.component';
import { DashboardProgressBarComponent } from './components/dashboard-progress-bar/dashboard-progress-bar.component';
import { DashboardStandardTreeComponent } from './components/dashboard-standard-tree/dashboard-standard-tree.component';
import { DashboardCustomTreeComponent } from './components/dashboard-custom-tree/dashboard-custom-tree.component';
import { PositionComponentDirective } from './directives/position-component.directive';

@NgModule({
  declarations: [

    /* Pipes. */
    RoundPipe,

    /*Component. */
    DashboardComponent,
    DashboardTopPanelComponent,
    DashboardMainComponent,
    DashboardMenuNavPanelComponent,
    DashboardTreePanelComponent,
    DashboardLowerTabularPanelComponent,
    DashboardRightPanelContainerComponent,
    DashboardNavMenuComponent,
    DashboardWidgetComponent,
    DashboardOnePanelViewComponent,
    DashboardProgressBarComponent,
    DashboardStandardTreeComponent,
    DashboardCustomTreeComponent,
    PositionComponentDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(DASHBOARD_ROUTES),
    SlimLoadingBarModule.forRoot(),
    PerfectScrollbarModule.forRoot(),
    ChartModule,
    TieredMenuModule,
    MenuModule,
    MenubarModule,
    NgGridModule,
    PanelModule,
    ButtonModule,
    SplitButtonModule,
    DialogModule,
    SlideMenuModule,
    ProgressBarModule,
    PanelMenuModule,
    TreeModule,
    InputTextModule,
    DropdownModule,
    ContextMenuModule,
    MomentModule,
  ],
  providers: [
    { provide: LoggerOptions, useValue: { level: LoggerLevel.DEBUG } },
    Logger,
    DashboardMenuNavigatorService,
    DashboardRESTDataAPIService,
    DashboardConfigDataService,
    DashboardDataContainerService,
    DashboardWidgetDataService,
    DashboardDataValidaterService,
    DashboardChartProviderService,
    WidgetDataProcessorService,
    ProgressBarService,
    DashboardDataRequestHandlerService,
    DashboardDataUtilsService,
    TreeDataRequestHandlerService
  ],
  exports: [
    DashboardComponent
  ],
  bootstrap: [DashboardComponent]
})
export class DashboardModule {
  constructor(private _appRef: ApplicationRef) { }

  ngDoBootstrap() {
    this._appRef.bootstrap(DashboardComponent);
  }
}
