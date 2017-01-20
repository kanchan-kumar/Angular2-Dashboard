import { NgGridConfig } from  '../../../../vendors/angular2-grid/src/interfaces/INgGrid';

export class WidgetConfiguration implements NgGridConfig  {
    margins?: number[];
    draggable?: boolean;
    resizable?: boolean;
    max_cols?: number;
    max_rows?: number;
    visible_cols?: number;
    visible_rows?: number;
    min_cols?: number;
    min_rows?: number;
    col_width?: number;
    row_height?: number;
    cascade?: string;
    min_width?: number;
    min_height?: number;
    fix_to_grid?: boolean;
    auto_style?: boolean;
    auto_resize?: boolean;
    maintain_ratio?: boolean;
    prefer_new?: boolean;
    zoom_on_drag?: boolean;
    limit_to_screen?: boolean;

    constructor() {

      /* Here we created the default configuration. */
      this.margins = [5, 5];
      this.draggable = true;
      this.resizable = true;
      this.auto_resize = false;
      this.auto_style = true;
      this.min_cols = 1;
      this.max_cols = 100;
      this.min_rows = 1;
      this.max_rows = 100;
      this.fix_to_grid = false;
      this.visible_cols = 30;
      this.visible_rows = 0;
      this.cascade = 'up';
      this.prefer_new = true;
      this.zoom_on_drag = false;
      this.maintain_ratio = false;
      this.col_width = 45;
      this.row_height = 35;
      this.min_width = 50;
      this.min_height = 50;
      this.limit_to_screen = true;
    }
}
