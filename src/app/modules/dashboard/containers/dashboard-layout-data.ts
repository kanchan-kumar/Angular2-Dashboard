import { Widget } from './widget';

export class DashboardLayoutData {
   widgets: Widget[];
   layoutId: number = 1;
   rowMargin: number = 5;
   colMargin: number = 5;
   columns: number = 30;
   layoutFile: string;

   constructor() {

   }
}
