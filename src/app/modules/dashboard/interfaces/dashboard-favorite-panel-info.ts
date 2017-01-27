import { DashboardFavoritePanelGraphInfo } from './dashboard-favorite-panel-graph-info';

/**
 * This interface containing information about the single favorite panel and its graph.
 */
export interface DashboardFavoritePanelInfo {
  panelNumber: number;
  numGraphs: number;
  panelCaption: string;
  chartType: number;
  showLegends: boolean;
  panelGraphs: DashboardFavoritePanelGraphInfo[];
  arrTimeStamp: number[];
  others: number;
  errorCode: number;
  isMinMaxGraph: boolean;
  showLegendOnWidget: boolean;
  legendAlignmentOnWidget: string;
}
