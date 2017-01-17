import { TreeNode } from 'primeng/primeng';

export class TreeNodeDataInfo implements TreeNode {
    label?: string;
    data?: any;
    icon?: any;
    expandedIcon?: any;
    collapsedIcon?: any;
    children?: TreeNode[] = [{icon: 'fa-refresh fa-spin', label: 'Loading ...'}];
    leaf?: boolean;
    expanded?: boolean;
    type?: string;
    parent?: TreeNode;
    partialSelected?: boolean;
    graphID: number;
    groupID: number;
    lastHierarchicalComponent: boolean;
    nodeType: number;
}
