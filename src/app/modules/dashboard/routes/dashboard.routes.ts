import {Routes} from '@angular/router';
import { DashboardRightPanelContainerComponent } from '../components/dashboard-right-panel-container/dashboard-right-panel-container.component';

export const DASHBOARD_ROUTES: Routes = [
  {path: '', component: DashboardRightPanelContainerComponent, pathMatch: 'full'},
  {path: 'dashboard', redirectTo: '', pathMatch: 'full' },
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];
