
export class TreeNodeDataInfo {
    label?: string;
    data?: any;
    icon?: any;
    expandedIcon?: any;
    collapsedIcon?: any;
    children?: any = [{icon: 'fa-refresh fa-spin', label: 'Loading ...'}];
    leaf?: boolean;
    expanded?: boolean;
    type?: string;
    parent?: any;
    partialSelected?: boolean;
    graphID: number;
    groupID: number;
    lastHierarchicalComponent: boolean = false;
    nodeType: number;
    groupTypeVector: boolean = false;
}
