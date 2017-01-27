import { Component, OnInit, OnDestroy } from '@angular/core';
import { TabularDataProviderService } from '../../services/tabular-data-provider.service';
import { Logger } from '../../../../../vendors/angular2-logger/core';
import { TabularDataColumns } from '../../containers/tabular-data-columns';
import { UPDATE_LOWER_PANEL_ON_WIDGET_CHANGE, UPDATE_LOWER_PANEL_ON_DATA_CHANGE } from '../../constants/actions.constants';
import { Subscription } from 'rxjs/Subscription';
import { TabularData } from '../../containers/tabular-data';

@Component({
  selector: 'dashboard-lower-tabular-panel',
  templateUrl: './dashboard-lower-tabular-panel.component.html',
  styleUrls: ['./dashboard-lower-tabular-panel.component.scss']
})
export class DashboardLowerTabularPanelComponent implements OnInit, OnDestroy {

  /*Data Subscription. */
  private dataSubscription: Subscription;

  /* Columns of table to show. */
  tabularData: TabularData = null;

  constructor(private log: Logger,
              private _tableDataProvider: TabularDataProviderService) {
                /* Creating table data object. */
                this.tabularData = new TabularData();
              }

  ngOnInit() {
    try {

      /*Listening Event.*/
      this.dataSubscription = this._tableDataProvider.lowerPanelUpdateProvider$.subscribe(
        /*Getting Event Here.*/
        value => {

          this.log.info('Updating lower panel data on event = ' + value);
          /* Getting Table Columns. */
          this.tabularData.tableColumns = this._tableDataProvider.getLowerTableColumnsForSelectedPanel();

          /*Getting data for table.*/
          this.tabularData.tableData = this._tableDataProvider.getLowerPanelTableDataForSelectedPanel();
          this.tabularData.isCheckSelectionReq = true;
          this.checkSelectedRows();
          this.getColumnsForFiltering();
          console.log(this.tabularData);
      }
    );
    } catch (e) {
      this.log.error('Error while initializing the table data of lower panel.', e);
    }
  }

  /* Getting table columns for filtering. */
  getColumnsForFiltering() {
    try {

    } catch (e) {
      this.log.error('Error while getting columns for filtering in table.', e);
    }
  }

  /* Checking the selected rows of table. */
  checkSelectedRows() {
    try {
      if (this.tabularData.isCheckSelectionReq) {
        for (let i = 0; i < this.tabularData.tableData.length; i++) {
          if (this.tabularData.tableData[i].checked) {
            this.tabularData.tableSelectedRows.push(this.tabularData.tableData[i]['#']);
          }
        }
      }
    } catch (e) {
      this.log.error('Error while checking selected rows of lower table.', e);
    }
  }

  onAllRowSelectionChange($event) {
    try {
      this.log.debug($event);
    } catch (e) {
      this.log.error('Error while handling all rows selection event of lower panel table.', e);
    }
  }

  onRowSelectionChange($event) {
    try {
      this.log.debug($event);
      this.log.debug(this.tabularData);
    } catch (e) {
      this.log.error('Error while handling row selection event of lower panel table.', e);
    }
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
