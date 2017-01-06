import { Widget } from '../containers/widget';
import { DashboardPanelData } from '../containers/dashboard-panel-data';

/**
 * Class is used for keeping widget inputs for handling widget operations.
 */
export class WidgetActionInputs {
  widgetAction: string = null;
  widget: Widget = null;
  panelData: DashboardPanelData = null;
}
