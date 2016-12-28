import {MenuItem} from 'primeng/primeng';

export class DashboardMenuDef implements MenuItem {
 label: string = null;
 icon: string = null;
 items: DashboardMenuDef[] = null;
 command?: (event?: any) => void;

  constructor( name: string, icon: string, arrSubMenu: DashboardMenuDef[]) {
    this.label = name;
    this.icon = icon;
    this.items = arrSubMenu;

    /* Event for Only Leaf Nodes.*/
    // this.command = (event) => this.onMenuClick(event);
  }

  commandEvt(menuClick) {
    this.command = (event) => menuClick(event);
  }

  get menuName(): string {
    return this.label;
  }

  set menuName(name: string) {
    this.label = name;
  }

  set iconName(icon: string) {
    this.icon = icon;
  }

  get iconName(): string {
    return this.icon;
  }

  set setSubMenuArr(arrSubMenu: DashboardMenuDef[]) {
    this.items = arrSubMenu;
  }

  get getSubMenuArr(): DashboardMenuDef[] {
    return this.items;
  }
}
