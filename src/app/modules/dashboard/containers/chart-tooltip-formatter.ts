import * as moment from 'moment';
import * as highcharts from 'highcharts';
import 'moment-timezone';
export class ChartTooltipFormatter {
  category: any[] = null;
  percentage: any[] = null;
  series: any = null;
  total: number = 0;
  x: number;
  y: number;

  constructor() {}

  /* Getting Series tooltip formatter. */
  getSeriesTooltipFormatter(timeZone: string) {
    return function() { return '<b>' + this.series.name + '</b></br>' +
        moment.tz(this.x, timeZone).format('MM/DD/YY HH:mm:ss') + '<br/>' +
        highcharts.numberFormat(this.y);
    };
  }
}
