import { TreeNodeStateInfo } from './tree-node-state-info';

export interface TreeNodeInfo {
  children: boolean;
  graphID: number;
  groupID: number;
  lastHierarchicalComponent: boolean;
  nodeType: number;
  state: TreeNodeStateInfo;
  text: string;
  type: string;
}
