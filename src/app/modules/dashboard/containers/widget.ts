
import { NgGridItemConfig } from '../../../../vendors/angular2-grid/src/interfaces/INgGrid';
import { DataWidgetPropsInfo  } from '../interfaces/data-widget-props-info';

export class Widget implements NgGridItemConfig {

    widgetId: number;
    widgetType: number;
    widgetName: string;
    widgetDescription: string;
    payload: any = null;
    col: number = 1;
    row: number = 1;
    sizex: number = 1;
    sizey: number = 1;
    dragHandle: string = '.dashboard-drag-panel';
    resizeHandle: string = null;
    fixed: boolean = false;
    draggable: boolean = true;
    resizable: boolean = true;
    borderSize: number = 15;
    maxCols: number = 0;
    minCols: number = 0;
    maxRows: number = 0;
    minRows: number = 0;
    minWidth: number = 0;
    minHeight: number = 0;
    dataWidget: DataWidgetPropsInfo = null;

    constructor() {
    }
}
