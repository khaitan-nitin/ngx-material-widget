import { OnInit } from '@angular/core';
import { CrudHeader, ActionPage, CrudList, CrudListData, Crud, CrudSearch, CrudTab } from '../../model';
import { Button, Badge, Action } from '../../../button/model';
import { KeyMap } from '../../../field/model';
import { FormDiaplyMode } from '../../../form/model';
export declare class CrudListComponentInterface implements OnInit {
    identifier: string;
    header: CrudHeader;
    actions: Array<Button>;
    actionPages: Array<ActionPage>;
    formReset: boolean;
    listReset: boolean;
    keyMap: Array<KeyMap>;
    quickLinks: Array<Button>;
    searchConfig: CrudSearch;
    searchData: any;
    listConfig: CrudList;
    listPageBackRoute: Array<string>;
    expandRowIndex: number;
    configListData: CrudListData;
    originalData: any;
    constructor();
    ngOnInit(): void;
    setCommonConfig(): void;
    setListConfig(): void;
    setBadges(): Array<Badge>;
    setCommonConfigUsingCrud(crud: Crud): void;
    setListConfigUsingCrud(crud: Crud): void;
    loadFilterParams(filterStr: string): void;
    setConfigListData(records: Array<any>, badges: Array<Badge>, route?: Array<string>): void;
    getRowKey(lIndex: number): Array<string>;
    getChildRowKey(lIndex: number): Array<string>;
    getChildRecordIdentifier(lIndex: number): string;
    beforeChangeMerge(action: Action, sourceIdentifier: string): {
        rows: Array<any>;
        rowIndex: number;
    };
    addRow(action: Action, sourceIdentifier: string, data?: any): {
        rows: Array<any>;
        rowIndex: number;
    };
    afterChangeMerge(): void;
    beforeChildChangeMerge(action: Action, sourceIdentifier: string): {
        rows: Array<any>;
        rowIndex: number;
    };
    addChildRow(action: Action, sourceIdentifier: string, data?: any): {
        rows: Array<any>;
        rowIndex: number;
    };
    setTabDisplayMode(crudTabs: Array<CrudTab>, formDisplayMode: FormDiaplyMode): void;
    afterChildChangeMerge(): void;
    setHeaderTitle(title: string): void;
    setHeaderDescription(description: string): void;
}
