import { Injectable } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import * as moment from 'moment';
import { ChartType } from '../constants/chart-type.enum';
import { DashboardFavoriteData } from '../interfaces/dashboard-favorite-data';
import { Chart } from '../containers/chart';
import { ChartSeries } from '../containers/chart-series';
import { ChartSeriesPoint } from '../containers/chart-series-point';
import { ChartOptions } from '../containers/chart-options';
import { ChartxAxis } from '../containers/chartx-axis';
import { ChartyAxis } from '../containers/charty-axis';
import { ChartLegend } from '../containers/chart-legend';
import { ChartTooltip } from '../containers/chart-tooltip';
import { ChartTitle } from '../containers/chart-title';
import { ChartPlotOptions } from '../containers/chart-plot-options';
import { DashboardDataValidaterService } from '../services/dashboard-data-validator.service';
import { DashboardConfigDataService } from './dashboard-config-data.service';
import { ChartTooltipFormatter } from '../containers/chart-tooltip-formatter';


/**
 * Service is used for creating chart based on chart Type.
 */
@Injectable()
export class DashboardChartProviderService {

  constructor(private log: Logger, private _dataVaildator: DashboardDataValidaterService,
              private _config: DashboardConfigDataService) {
  }

  getSeriesTooltipFormatter() {
    try {
      return `'<b>' + this.series.name + '</b><br/>'
        moment(this.x, this._config.$timeZone).format('MM/DD/YY  HH:mm:ss') + '<br/>'
        this._dataVaildator.getNumberWithComma(this.y)`;
    } catch (e) {
      this.log.error('Error while creating tooltip formatter for series.', e);
    }
  }

  /* Method is used for getting chart based on chart type. */
  getChartObjectByChartType( chartType: number, dashboardFavoriteData: DashboardFavoriteData, panelNumber: number): Chart {
    try {

      /* Checking for Chart Type. */
      switch (chartType) {
        case ChartType.LINE_CHART:
          return this.getLineChart(dashboardFavoriteData, panelNumber);
        case ChartType.AREA_CHART:
          return this.getAreaChart(dashboardFavoriteData, panelNumber);
        case ChartType.STACKED_AREA_CHART:
          return this.getStackedAreaChart(dashboardFavoriteData, panelNumber);
        case ChartType.BAR_CHART_AVG_ALL:
          return this.getBarChart(dashboardFavoriteData, panelNumber);
        case ChartType.STACKED_BAR_CHART:
          return this.getStackedBarChart(dashboardFavoriteData, panelNumber);
        default:
          return this.getLineChart(dashboardFavoriteData, panelNumber);
      }

    } catch (e) {
      this.log.error('Error while creating chart object.', e);
      return null;
    }
  }

  /**
   * Setting Legends on chart like line, Bar, stacked Bar etc.
   */
  setLegnedOnSeries( legendPosition: string, legend: ChartLegend) {
    try {

      if (legendPosition === 'right' || legendPosition === 'left') {
        legend.verticalAlign = 'top';
        legend.layout = 'vertical';
      } else {
        legend.verticalAlign = 'bottom';
        legend.layout = 'horizontal';
      }

    } catch(e) {
      this.log.error('Error while setting legend on chart', e);
    }
  }

  /**
   * Creating DataSet for Line/Bar/stacked etc for Normal Graph Type.
   * Line/Bar/Area Chart can have many type of dataset including series, category etc.
   */
  getDataSetForSeries(dashboardFavoriteData: DashboardFavoriteData, panelNumber: number): Array<ChartSeries> {
    try {

      /* Getting Data of Panel. */
      let panelData = dashboardFavoriteData.panelData[panelNumber];

      /* Getting Timestamp array. */
      let arrTimestamp = dashboardFavoriteData.arrTimestamp;

      /* Getting total samples. */
      let totalSamples = dashboardFavoriteData.totalSamples;

      /* Now getting Panel Graphs. */
      let panelGraphs = panelData.panelGraphs;

      /* Now creating array of chart series. */
      let arrChartSeries = new Array();

      /* Iterating through Number of graphs. */
      for ( let k = 0; k < panelData.panelGraphs.length; k++) {

        /* Getting One Graph. */
        let graphInfo = panelGraphs[k];

        /* Now checking graph availability. */
        if (! this._dataVaildator.isValidObject(graphInfo.graphData)) {
          this.log.log('Graph data not available for graph = ' + graphInfo.graphName);
          continue;
        }

        /* Chart series data. */
        let arrSeriesData = new Array();

        /* Now Iterating through samples. */
        for ( let i = 0; i < totalSamples; i++) {
          /* Creating Instance of one series. */
          let chartSeriesData = new ChartSeriesPoint();
          chartSeriesData.y = graphInfo.graphData[i];
          chartSeriesData.x = arrTimestamp[i];

          /* Adding series point in series data. */
          arrSeriesData.push(chartSeriesData);
        }

        /* Creating Object of one series. */
        let chartSeries = new ChartSeries();

        /* Now setting information in chart series. */
        chartSeries.data = arrSeriesData;
        chartSeries.name = graphInfo.graphName;
        chartSeries.color = graphInfo.graphColor;
        chartSeries.visible = graphInfo.isVisible;

        /* Now Adding Chart Series in array. */
        arrChartSeries.push(chartSeries);
      }

      return arrChartSeries;
    } catch (e) {
      this.log.error('Error while creating series type chart dataset.', e);
      return null;
    }
  }

  /**
   * Getting empty chart object.
   */
  getEmptyChart(): Chart {
    try {
      /* Creating empty chart object. */
      let emptyChart = new Chart();

      /* Creating Chart Title for Line Chart. */
      let title = new ChartTitle();
      title.text = '';

      /* Creating Chart Options value. */
      let chartOptions = new ChartOptions();
      chartOptions.width = 500;
      chartOptions.height = 500;

      /* Creating Chart Legend Here. */
      let legend = new ChartLegend();
      legend.enabled = false;

      /* Creating Y Axis Here. */
      let yAxis = new ChartyAxis();

      /* Creating DataSet For Line Chart. */
      let chartSeries = new ChartSeries();
      chartSeries.data = [];

      /* Setting chart object. */
      emptyChart.chart = chartOptions;
      emptyChart.title = title;
      emptyChart.yAxis = yAxis;
      emptyChart.series = [chartSeries];
      emptyChart.legend = legend;
      emptyChart.lang = {noData: 'Data not available.'};

      return emptyChart;
    } catch (e) {
      this.log.error('Error while getting empty chart configuration', e);
      return null;
    }
  }

  /**
   * Method is used to get line chart configuration.
   */
  getLineChart(dashboardFavoriteData: DashboardFavoriteData, panelNumber: number): Chart {
    try {

      /* Getting Data of Panel. */
      let panelData = dashboardFavoriteData.panelData[panelNumber];

      /* Creating Chart Title for Line Chart. */
      let title = new ChartTitle();
      title.text = null;

      /* Creating Chart Options value. */
      let chartOptions = new ChartOptions();
      chartOptions.zoomType = 'x';

      /* Creating Chart Legend Here. */
      let legend = new ChartLegend();
      legend.enabled = panelData.showLegendOnWidget;
      this.setLegnedOnSeries(panelData.legendAlignmentOnWidget, legend);

      /* Creating DataSet For Line Chart. */
      let chartSeries = this.getDataSetForSeries(dashboardFavoriteData, panelNumber);

      /* Creating Y Axis Here. */
      let yAxis = new ChartyAxis();

      /* Creating X Axis Here. */
      let xAxis = new ChartxAxis();
      xAxis.type = 'datetime';

      /* Creating the chart tooltip. */
      let tooltip = new ChartTooltip();
      tooltip.valueSuffix = '(Sample)';
      tooltip.formatter = new ChartTooltipFormatter().getSeriesTooltipFormatter(this._config.$timeZone);

      /* Creating chart object. */
      let lineChart = new Chart();

      /* Setting chart object. */
      lineChart.chart = chartOptions;
      lineChart.series = chartSeries;
      lineChart.title = title;
      lineChart.yAxis = yAxis;
      lineChart.xAxis = xAxis;
      lineChart.legend = legend;
      lineChart.tooltip = tooltip;

      return lineChart;

    } catch (e) {
      this.log.error('Error while creating line chart object.', e);
      return null;
    }
  }

    /**
   * Method is used to get area chart configuration.
   */
  getAreaChart(dashboardFavoriteData: DashboardFavoriteData, panelNumber: number): Chart {
    try {

      /* Getting Data of Panel. */
      let panelData = dashboardFavoriteData.panelData[panelNumber];

      /* Creating Chart Title for area Chart. */
      let title = new ChartTitle();
      title.text = null;

      /* Creating Chart Options value. */
      let chartOptions = new ChartOptions();
      chartOptions.zoomType = 'x';
      chartOptions.type = 'area';

      /* Creating Chart Legend Here. */
      let legend = new ChartLegend();
      legend.enabled = panelData.showLegendOnWidget;
      this.setLegnedOnSeries(panelData.legendAlignmentOnWidget, legend);

      /* Creating DataSet For area Chart. */
      let chartSeries = this.getDataSetForSeries(dashboardFavoriteData, panelNumber);

      /* Creating Y Axis Here. */
      let yAxis = new ChartyAxis();

      /* Creating X Axis Here. */
      let xAxis = new ChartxAxis();
      xAxis.type = 'datetime';

      /* Creating the chart tooltip. */
      let tooltip = new ChartTooltip();
      tooltip.valueSuffix = '(Sample)';
      tooltip.formatter = new ChartTooltipFormatter().getSeriesTooltipFormatter(this._config.$timeZone);

      /* Creating chart object. */
      let areaChart = new Chart();

      /* Setting chart object. */
      areaChart.chart = chartOptions;
      areaChart.series = chartSeries;
      areaChart.title = title;
      areaChart.yAxis = yAxis;
      areaChart.xAxis = xAxis;
      areaChart.legend = legend;
      areaChart.tooltip = tooltip;

      return areaChart;

    } catch (e) {
      this.log.error('Error while creating area chart object.', e);
      return null;
    }
  }

  /**
   * Method is used to get stacked area chart configuration.
   */
  getStackedAreaChart(dashboardFavoriteData: DashboardFavoriteData, panelNumber: number): Chart {
    try {

      /* Getting Data of Panel. */
      let panelData = dashboardFavoriteData.panelData[panelNumber];

      /* Creating Chart Title for stacked area Chart. */
      let title = new ChartTitle();
      title.text = null;

      /* Creating Chart Options value. */
      let chartOptions = new ChartOptions();
      chartOptions.zoomType = 'x';
      chartOptions.type = 'area';

      /* Creating Chart Legend Here. */
      let legend = new ChartLegend();
      legend.enabled = panelData.showLegendOnWidget;
      this.setLegnedOnSeries(panelData.legendAlignmentOnWidget, legend);

      /* Creating DataSet For stacked area Chart. */
      let chartSeries = this.getDataSetForSeries(dashboardFavoriteData, panelNumber);

      /* Creating Y Axis Here. */
      let yAxis = new ChartyAxis();

      /* Creating X Axis Here. */
      let xAxis = new ChartxAxis();
      xAxis.type = 'datetime';

      /* Creating the chart tooltip. */
      let tooltip = new ChartTooltip();
      tooltip.valueSuffix = '(Sample)';
      tooltip.formatter = new ChartTooltipFormatter().getSeriesTooltipFormatter(this._config.$timeZone);

      /* Creating chart object. */
      let stackedAreaChart = new Chart();

      /* Setting chart object. */
      stackedAreaChart.chart = chartOptions;
      stackedAreaChart.series = chartSeries;
      stackedAreaChart.title = title;
      stackedAreaChart.yAxis = yAxis;
      stackedAreaChart.xAxis = xAxis;
      stackedAreaChart.legend = legend;
      stackedAreaChart.tooltip = tooltip;

      return stackedAreaChart;

    } catch (e) {
      this.log.error('Error while creating stacked area chart object.', e);
      return null;
    }
  }

    /**
   * Method is used to get line chart configuration.
   */
  getBarChart(dashboardFavoriteData: DashboardFavoriteData, panelNumber: number): Chart {
    try {

      /* Getting Data of Panel. */
      let panelData = dashboardFavoriteData.panelData[panelNumber];

      /* Creating Chart Title for Bar Chart. */
      let title = new ChartTitle();
      title.text = null;

      /* Creating Chart Options value. */
      let chartOptions = new ChartOptions();
      chartOptions.zoomType = 'x';
      chartOptions.type = 'column';

      /* Creating Chart Legend Here. */
      let legend = new ChartLegend();
      legend.enabled = panelData.showLegendOnWidget;
      this.setLegnedOnSeries(panelData.legendAlignmentOnWidget, legend);

      /* Creating DataSet For Bar Chart. */
      let chartSeries = this.getDataSetForSeries(dashboardFavoriteData, panelNumber);

      /* Creating Y Axis Here. */
      let yAxis = new ChartyAxis();

      /* Creating X Axis Here. */
      let xAxis = new ChartxAxis();
      xAxis.type = 'datetime';

      /* Creating the chart tooltip. */
      let tooltip = new ChartTooltip();
      tooltip.valueSuffix = '(Sample)';
      tooltip.formatter = new ChartTooltipFormatter().getSeriesTooltipFormatter(this._config.$timeZone);

      /* Creating chart object. */
      let barChart = new Chart();

      /* Setting chart object. */
      barChart.chart = chartOptions;
      barChart.series = chartSeries;
      barChart.title = title;
      barChart.yAxis = yAxis;
      barChart.xAxis = xAxis;
      barChart.legend = legend;
      barChart.tooltip = tooltip;

      return barChart;

    } catch (e) {
      this.log.error('Error while creating bar chart object.', e);
      return null;
    }
  }

    /**
   * Method is used to get line chart configuration.
   */
  getStackedBarChart(dashboardFavoriteData: DashboardFavoriteData, panelNumber: number): Chart {
    try {

      /* Getting Data of Panel. */
      let panelData = dashboardFavoriteData.panelData[panelNumber];

      /* Creating Chart Title for stacked bar Chart. */
      let title = new ChartTitle();
      title.text = null;

      /* Creating Chart Options value. */
      let chartOptions = new ChartOptions();
      chartOptions.zoomType = 'x';
      chartOptions.type = 'column';

      /* Creating Chart Legend Here. */
      let legend = new ChartLegend();
      legend.enabled = panelData.showLegendOnWidget;
      this.setLegnedOnSeries(panelData.legendAlignmentOnWidget, legend);

      /* Creating DataSet For stacked bar Chart. */
      let chartSeries = this.getDataSetForSeries(dashboardFavoriteData, panelNumber);

      /* Creating Y Axis Here. */
      let yAxis = new ChartyAxis();

      /* Creating X Axis Here. */
      let xAxis = new ChartxAxis();
      xAxis.type = 'datetime';

      /* Creating the chart tooltip. */
      let tooltip = new ChartTooltip();
      tooltip.valueSuffix = '(Sample)';
      tooltip.formatter = new ChartTooltipFormatter().getSeriesTooltipFormatter(this._config.$timeZone);

      /* Creating chart object. */
      let stackedBarChart = new Chart();

      /* Setting chart object. */
      stackedBarChart.chart = chartOptions;
      stackedBarChart.series = chartSeries;
      stackedBarChart.title = title;
      stackedBarChart.yAxis = yAxis;
      stackedBarChart.xAxis = xAxis;
      stackedBarChart.legend = legend;
      stackedBarChart.tooltip = tooltip;

      return stackedBarChart;

    } catch (e) {
      this.log.error('Error while creating stacked bar chart object.', e);
      return null;
    }
  }
}
