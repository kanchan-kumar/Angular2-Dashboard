import { ChartOptions } from './chart-options';
import { ChartxAxis } from './chartx-axis';
import { ChartyAxis } from './charty-axis';
import { ChartLegend } from './chart-legend';
import { ChartSeries } from './chart-series';
import { ChartTooltip } from './chart-tooltip';
import { ChartTitle } from './chart-title';
import { ChartPlotOptions } from './chart-plot-options';

export class Chart {
  title: ChartTitle = null;
  chart: ChartOptions = null;
  plotOptions: ChartPlotOptions = null;
  xAxis: ChartxAxis = null;
  yAxis: ChartyAxis = null;
  legend: ChartLegend = null;
  series: ChartSeries[] = null;
  tooltip: ChartTooltip = null;
  credits: Object = {enabled: false};

  constructor() {
  }
}
