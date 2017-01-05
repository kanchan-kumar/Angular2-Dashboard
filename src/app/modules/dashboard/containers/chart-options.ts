import { ChartEvents } from './chart-events';

export class ChartOptions {
  type: string = 'spline';
  alignTicks: boolean = true;
  animation: boolean = true;
  backgroundColor: string = 'transparent';
  borderColor: string = ' #335cad';
  borderWidth: number = 0;
  className: string = null;
  defaultSeriesType: string = 'line';
  margin: number[] = null;
  plotBackgroundColor: string = 'transparent';
  plotBackgroundImage: string = null;
  plotBorderColor: string = '#cccccc';
  plotBorderWidth: number = 0;
  plotShadow: boolean = false;
  reflow: boolean = true;
  renderTo: any = null;
  resetZoomButton: any = null;
  shadow: boolean = false;
  showAxes: boolean = false;
  spacing: number[] = [10, 10, 15, 10];
  style: any = null;
  width: number = 150;
  height: number = 120;
  zoomType: string = 'none';
  events: ChartEvents = null;
}
