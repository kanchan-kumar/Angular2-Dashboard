import { Chart } from './chart';
import { DataWidget } from './data-widget';

/**
 * Dashboard data for individual panel. Panel Can be any type like(Graph/Data/Tabular etc).
 */
export class DashboardPanelData {
  panelNumber: number = -1;
  chart: Chart = null;
  errorCode: number = -1;
  errorMsg: string = null;
  panelTitle: string = null;
  isHeaderReq: boolean = true;
  dataWidget: DataWidget = null;
}
