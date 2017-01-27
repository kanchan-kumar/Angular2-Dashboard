import { Component, OnInit, ViewChild, OnDestroy, NgZone } from '@angular/core';
import { Logger } from '../../../../../vendors/angular2-logger/core';
import { Subscription }   from 'rxjs/Subscription';
import { STANDARD_TREE_DATA_AVAILABLE } from '../../constants/actions.constants';
import { TreeDataRequestHandlerService } from '../../services/tree-data-request-handler.service';
import { DashboardDataContainerService } from '../../services/dashboard-data-container.service';
import { DashboardDataUtilsService } from '../../services/dashboard-data-utils.service';
import { DashboardRESTDataAPIService } from '../../services/dashboard-rest-data-api.service';
import { MenuItem, TreeNode } from 'primeng/primeng';
import * as jQuery from 'jquery';
import { DashboardNavMenu } from '../../containers/dashboard-nav-menu';

@Component({
  selector: 'dashboard-standard-tree',
  providers: [ DashboardNavMenu ],
  templateUrl: './dashboard-standard-tree.component.html',
  styleUrls: ['./dashboard-standard-tree.component.scss']
})
export class DashboardStandardTreeComponent implements OnInit, OnDestroy {

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
   selectedTreeLevel: string = 'All';

   /* Search Text. */
   searchText: string = '';

   /* Tree Menu Items. */
   standardTreeMenuItems: MenuItem[];

   /* Getting Reference of Menu. */
  @ViewChild('cm') treeMenu: any;

    constructor(private log: Logger, private _dataService: DashboardDataContainerService,
                private _requestHandler: TreeDataRequestHandlerService,
                private _dataUtils: DashboardDataUtilsService,
                private _restAPI: DashboardRESTDataAPIService,
                private _navMenu: DashboardNavMenu,
                private ngZone: NgZone) {
                  this._requestHandler.getStandardTreeData(this._requestHandler.getStandardTreeURL(null));
                  this.initializeInputs();
                }

    /* Initializing inputs. */
    initializeInputs() {
      try {
        /* Defining levels. */
        this.treeLevels = [
          {value: 'All', display: 'All'},
          {value: 'Group', display: 'Group'},
          {value: 'Graph', display: 'Graph'},
          {value: 'Vector', display: 'Vector'},
        ];

        /* Putting the definition of component in global object for handling callback methods. */
        window['dashboardTreeMenuRef'] = {
          zone: this.ngZone,
          component: this
        };

      } catch (e) {
        this.log.error('Error while initializing inputs for standard tree.', e);
      }
    }

    /* Event for menu click. */
    treeMenuClick($event) {
        window['dashboardTreeMenuRef'].zone.run((() => {
        window['dashboardTreeMenuRef'].component.treeMenuClickActionHandler($event);
      }));
    }

    /** Menu click handler of tree. */
    treeMenuClickActionHandler(event) {
    try {
      this.log.debug(event.item.label);
    } catch (e) {
      this.log.error('Error while handling tree menu opertaion.', e);
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

  /** Search any pattern based text/nodes in tree. */
  searchInTree() {
    try {
      this.log.debug('Going to serach text ' + this.searchText + ' at level ' + this.selectedTreeLevel);

      /* Checking for valid serach input. */
      if (this.searchText === undefined || this.searchText.length < 4) {
        this.log.warn('Seach text must be greater than four charecters. Aborting search.');
        return;
      }

       /* Composing URL. */
       let restAPIURL = this._requestHandler.getStandardTreeURLForSearch(this.searchText, this.selectedTreeLevel);
      /* Now getting data for search text. */
      this._requestHandler.getStandardTreeData(restAPIURL);

    } catch (e) {
      this.log.error('Error while doing search action in tree.', e);
    }
  }

  /* Node click handler. */
  onNodeClick(event) {
    try {
      console.log('click ', event);
    } catch (e) {
      this.log.error('Error while handing click operation on node.', e);
    }
  }

  /* Node right click handler. */
  onNodeRightClick(event: any) {
    try {
      this.log.debug(event.originalEvent.screenX, event.originalEvent.screenY);

      /* Getting menu based on node type. */
      this.standardTreeMenuItems = this._navMenu.getTreeMenuByLevel(event.node, this.treeMenuClick);

      /* Checking for node type menu. */
      if (this.standardTreeMenuItems == null) {
        this.treeMenu.toggle();
        this.log.error('No options available for node type.');
        return;
      }

      jQuery('.dashboard-tree-context-menu').css('top', event.originalEvent.layerY + 'px')
      .css('left', event.originalEvent.layerX + 'px');
    } catch (e) {
      this.log.error('Error while handing right click operation on node.', e);
    }
  }

  ngOnDestroy() {
    try {
      window['dashboardTreeMenuRef'] = null;
    } catch (e) {}
  }
}
