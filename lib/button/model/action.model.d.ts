export interface ObjectTree {
    parent: any;
    hierarchyUp?: ObjectTree;
}
export interface Action {
    sourceIdentifier: string;
    sourceIndex: number;
    widgetArrayIndex: number;
    fieldIndex?: number;
    action: string;
    actionData?: any;
    data: any;
    parentHierarchy?: ObjectTree;
    originalData?: any;
    event: any;
}
