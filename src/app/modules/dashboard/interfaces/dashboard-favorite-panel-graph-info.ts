
/**
 * This interface is used for containing information of panel graph and its data.
 */
export interface DashboardFavoritePanelGraphInfo {

  graphName: string;
  graphData: number[];
  min: number;
  max: number;
  avg: number;
  stdDev: number;k
  lastSample: number;
  sampleCount: number;
  ggv: string;
  graphColor: string;
  slabName: string[];
  dialGraphExp: string;
  errorCode: number;
  weightedScaleValue: number;
  scaleInterval: number;
  mapKey: string;
  percentChange: string;
  isVisible: boolean;
  isDerived: boolean;
  geoMapDataMap: Object;
}
