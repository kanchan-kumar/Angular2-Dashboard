import {MenuItem} from 'primeng/primeng';

export class DashboardMenuDef implements MenuItem {
 label: string = null;
 icon: string = null;
 items: DashboardMenuDef[] = null;
 command?: (event?: any) => void;

  constructor( name: string, icon: string, arrSubMenu: DashboardMenuDef[], onMenuClick) {
    this.label = name;
    this.icon = icon;
    this.items = arrSubMenu;

    /* Event for Only Leaf Nodes.*/
    this.command = (event) => onMenuClick(event);
  }

 commandEvt(onMenuClick) {
    this.command = (event) => onMenuClick(event);
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
