import { NgGridConfig } from 'angular2-grid';

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
      this.margins = [10];
      this.draggable = true;
      this.resizable = true;
      this.auto_resize = true;
      this.auto_style = true;
      this.min_cols = 0;
      this.max_cols = 0;
      this.min_rows = 0;
      this.max_rows = 0;
      this.fix_to_grid = false;
      this.visible_cols = 0;
      this.visible_rows = 0;
      this.cascade = 'up';
      this.prefer_new = true;
      this.zoom_on_drag = false;
      this.maintain_ratio = false;
      this.col_width = 250;
      this.row_height = 250;
      this.min_width = 100;
      this.min_height = 100;
      this.limit_to_screen = true;
    }
}
