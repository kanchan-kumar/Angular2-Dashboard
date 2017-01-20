import { Injectable } from '@angular/core';
import { Logger } from '../../../../vendors/angular2-logger/core';
import { DashboardMenuDef } from '../containers/dashboard-menu-def';
import { FavoriteTreeNodeInfo } from '../interfaces/favorite-tree-node-info';
import { TreeNodeInfo } from '../interfaces/tree-node-info';
import { TreeNodeDataInfo } from '../containers/tree-node';

@Injectable()
export class DashboardDataUtilsService {

  constructor( private log: Logger) { }

    /**
   * Getting Number with fixed decimal and comma seperated/
   */
  getNumberWithPrecisionAndComma(number: number) {
    try {

     if (number < 10) {
       return number.toFixed(3);
     } else {
      return this.getNumberWithComma(number.toFixed(0));
     }
    } catch (e) {
      this.log.error('Error while converting number to decimal points.', e);
      return number;
    }
  }

  /** Getting number with comma seperated. */
  getNumberWithComma(number: any) {
    try {
      let parts = number.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.');
    } catch (e) {
      this.log.error('Error while trancating decimal number to specific digit.', e);
      return number;
    }
  }

  /** Trancating string upto specified number charecters.*/
  truncateString(str: string, upto: number): string {
    try {
      if (str.length < upto) {
        return str;
      } else  {
        return str.substring(0, upto - 1) + '..';
      }
    } catch (e) {
      return str;
    }
  }

  /* Method is used for processing favorite menu and make compatible to menu widget. */
  processFavoriteMenuDef(favNodeInfo: FavoriteTreeNodeInfo[], onFavMenuClick): DashboardMenuDef[] {
    try {

       /* List of favorite tree nodes. */
       let arrFavMenu = new Array();

       /* Iterating existing tree nodes. */
       for (let i = 0; i < favNodeInfo.length; i++) {

         /* Getting Name. */
         let name = favNodeInfo[i].node;
         let items = null;

         /* Creating Menu here. */
         let dashboardMenuDef = new DashboardMenuDef(name, null, items, null);

         /* Checking if menu has sub menu. */
         if (favNodeInfo[i].favoriteTreeDTO !== null && favNodeInfo[i].favoriteTreeDTO.length > 0) {
            dashboardMenuDef.setSubMenuArr = this.processFavoriteMenuDef(favNodeInfo[i].favoriteTreeDTO, onFavMenuClick);
         } else {
            dashboardMenuDef.commandEvt(onFavMenuClick);
         }

         arrFavMenu.push(dashboardMenuDef);
       }
      return arrFavMenu;
    } catch (e) {
      this.log.error('Error while processing favorite menu.', e);
      return null;
    }
  }

  /** Method is used for processing tree data and convert it to required tree data format. */
  getRequiredTreeDataFormat(treeNodeInfo: TreeNodeInfo[], parentHierarchy: string[]) {
    try {

      /* Container format of tree data. */
      let treeNodes = new Array();

      /* Iterating tree nodes. */
      for (let i = 0; i < treeNodeInfo.length; i++) {
        /* Create new tree node. */
        let treeNode = new TreeNodeDataInfo();
        treeNode.graphID = treeNodeInfo[i].graphID;
        treeNode.groupID = treeNodeInfo[i].groupID;
        treeNode.lastHierarchicalComponent = treeNodeInfo[i].lastHierarchicalComponent;
        treeNode.nodeType = treeNodeInfo[i].nodeType;
        treeNode.type = treeNodeInfo[i].type;
        treeNode.label = treeNodeInfo[i].text;
        treeNode.groupTypeVector = treeNodeInfo[i].groupTypeVector;

        /*Checking for parent hierarchy. */
        if (parentHierarchy === null) {
          treeNode.data = new Array().concat(treeNode.label);
        } else {
          treeNode.data = parentHierarchy.concat(treeNode.label);
        }

        /* Icon Selection. */
        switch (treeNode.type) {
          case 'Metrics':
            treeNode.icon = 'fa-hdd-o';
            break;
          case 'Group':
            treeNode.icon = 'fa-newspaper-o';
            break;
          case 'Tier':
            treeNode.icon = 'fa-cogs';
            break;
          case 'Server':
            treeNode.icon = 'fa-server';
            break;
          case 'Instance':
            treeNode.icon = 'fa-share-alt';
            break;
          case 'Interface':
            treeNode.icon = 'fa-crosshairs';
            break;
          default:
            treeNode.icon = 'fa-check';
        }

        /*Checking if current node has sub nodes. */
        if (Array.isArray(treeNodeInfo[i].children)) {
          treeNode.children = this.getRequiredTreeDataFormat(treeNodeInfo[i].children, treeNode.data);
        }

        /* checking for leaf node. */
        if (treeNodeInfo[i].children) {
          treeNode.expanded = treeNodeInfo[i].state.opened;
          treeNode.leaf = true;

          /** Adding tree node in array. */
          treeNodes.push(treeNode);
        } else {
          treeNodes.push({icon: 'fa-line-chart', label: treeNode.label, type: treeNode.type});
        }
      }
      console.log(treeNodes);

      return treeNodes;
    } catch (e) {
      this.log.error('Error while processing tree nodes.', e);
      return null;
    }
  }
}
