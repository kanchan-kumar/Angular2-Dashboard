import { Injectable } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { DashboardMenuDef } from '../containers/dashboard-menu-def';
import { FavoriteTreeNodeInfo } from '../interfaces/favorite-tree-node-info';

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
         let name = this.truncateString(favNodeInfo[i].node, 15);
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
}
