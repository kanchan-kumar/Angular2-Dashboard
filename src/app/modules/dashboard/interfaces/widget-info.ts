

/**
 * This interface contains the information of single widget in layout.
 */
export interface WidgetInfo {
   widgetId: number;
   widgetType: number;
   dataAttrName: string;
   name: string;
   description: string;
   sizeX: number;
   sizeY: number;
   row: number;
   col: number;
}
