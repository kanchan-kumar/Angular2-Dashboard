export class ChartLegend {
  align: string = 'center';
  backgroundColor: string = 'transparent';
  borderColor: string = '#999999';
  borderRadius: number = 0;
  borderWidth: number = 0;
  enabled: boolean = true;
  floating: boolean = false;
  itemDistance: number = 20;
  itemHiddenStyle: Object = { 'color': '#cccccc' };
  itemHoverStyle: Object = { 'color': '#000000' };
  itemMarginBottom: number = 0;
  itemMarginTop: number = 0;
  itemStyle: Object = { 'color': '#333333', 'cursor': 'pointer', 'fontSize': '12px', 'fontWeight': 'bold' };
  labelFormat: Object = '{name}';
  layout: string = 'horizontal';
  lineHeight: number = 16;
  margin: number = 12;
  padding: number = 8;
  reversed: boolean = false;
  rtl: boolean = false;
  shadow: boolean = false;
  squareSymbol: boolean = false;
  symbolPadding: number = 5;
  verticalAlign: string = 'bottom';
  x: number = 0;
  y: number = 0;
}
