import { Logger } from 'angular2-logger/core';
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
  lengend: ChartLegend = null;
  series: ChartSeries[] = null;
  tooltip: ChartTooltip = null;

  constructor(private log: Logger) {
    this.getLineChartConfiguration();
  }

  /**
   * Creating Line series. Make sure that all required arguments are available before calling method.
   */
  getLineChartConfiguration() {
    try {
      /* Creating Chart Title for Line Chart. */
      this.title = new ChartTitle();
      this.title.text = 'My Chart';

      /* Creating Chart Options value. */
      this.chart = new ChartOptions();
      this.chart.zoomType = 'x';

      /* Creating Series. */
      this.series = new Array();
      this.series[0] = new ChartSeries();
      this.series[0].data = [29.9, 71.5, 106.4, 129.2];
    } catch (e) {
      this.log.error('Error while creating line series', e);
    }
  }

}
