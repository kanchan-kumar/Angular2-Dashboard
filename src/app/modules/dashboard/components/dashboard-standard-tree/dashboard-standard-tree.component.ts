import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/primeng';
import { Logger } from 'angular2-logger/core';
import { Subscription }   from 'rxjs/Subscription';
import { STANDARD_TREE_DATA_AVAILABLE } from '../../constants/actions.constants';
import { DashboardDataRequestHandlerService } from '../../services/dashboard-data-request-handler.service';
import { DashboardDataContainerService } from '../../services/dashboard-data-container.service';
import { DashboardDataUtilsService } from '../../services/dashboard-data-utils.service';
import { DashboardRESTDataAPIService } from '../../services/dashboard-rest-data-api.service';

@Component({
  selector: 'dashboard-standard-tree',
  templateUrl: './dashboard-standard-tree.component.html',
  styleUrls: ['./dashboard-standard-tree.component.scss']
})
export class DashboardStandardTreeComponent implements OnInit {

   /* Available Tree nodes. */
   nodes: TreeNode[];

   /*Selected Tree nodes.*/
   selectedNodes: TreeNode[];

   /*Data Subscriber of service.*/
   dataSubscription: Subscription;

   /* Standard tree height. */
   standardTreePanelHeight: string = '500px';

   /* Standard tree level menu. */
   treeLevels: any = null;

   /* Selected Level of tree. */
   selectedTreeLevel: string = 'all';

    constructor(private log: Logger, private _dataService: DashboardDataContainerService,
                private _requestHandler: DashboardDataRequestHandlerService,
                private _dataUtils: DashboardDataUtilsService,
                private _restAPI: DashboardRESTDataAPIService) {
                  this._requestHandler.getStandardTreeData();
                  this.initializeInputs();
                }

    /* Initializing inputs. */
    initializeInputs() {
      try {
        /* Defining levels. */
        this.treeLevels = [
          {value: 'all', display: 'All'},
          {value: 'group', display: 'Group'},
          {value: 'graph', display: 'Graph'},
          {value: 'vector', display: 'Vector'},
        ];
      } catch (e) {
        this.log.error('Error while initializing inputs for standard tree.', e);
      }
    }

    ngOnInit() {
      try {
        this.dataSubscription = this._dataService.treeDataObservable$.subscribe(
        action => {
          this.updateStandardTreeData(action);
      });
      /* Calculating tree height. */
      this.standardTreePanelHeight = (window.innerHeight - 100) + 'px';

      } catch (e) {
        this.log.error('Error while getting standard tree data.', e);
      }
    }

    /** Processing and update standard tree data. */
    updateStandardTreeData(action) {
      try {
        this.log.debug('Getting data from service. Action type = ' + action);

        /* Checking for action type */
        if (action === STANDARD_TREE_DATA_AVAILABLE) {
          /* Updating Layout widgets in favorite update. */
          this.nodes = this._dataUtils.getRequiredTreeDataFormat(this._dataService.getStandardTreeData(), null);

          /* Tree Nodes. */
          this.log.debug('Tree nodes = ', this.nodes);
        }
      } catch (e) {
        this.log.error('Error while updating data in standard tree.', e);
      }
    }

    /** Loading nodes dynamically from server. */
    loadNodes(event) {
      try {
        console.log(event);
        if (event.node && event.node.leaf) {
          // In a real application, make a call to a remote url
          // to load children of the current node and add the new nodes as children
          // this.nodeService.getLazyFiles().then(nodes => event.node.children = nodes);

          /*Creating URL for tree node update. */
          let treeURL = this._requestHandler.getStandardTreeURL(event.node.data);

          /* Subscribing to the data. */
          let dataSubscription = this._restAPI.getDataByRESTAPI(treeURL, '').subscribe(
            result => {
               if (result !== null && result !== undefined && result !== '') {
                  event.node.children =  this._dataUtils.getRequiredTreeDataFormat(result, event.node.data);
               }
             },
            err => { this.log.error('Error while getting standard tree node data from server', err); },
            () => { dataSubscription.unsubscribe();
            });
      }
    } catch (e) {
      this.log.error('Error while getting standard tree nodes data from server.', e);
    }
  }
}
