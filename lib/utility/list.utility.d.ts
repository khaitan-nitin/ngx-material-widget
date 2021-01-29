import { CellControl, Column, List, ListCustomLayout } from '../list/model';
import { DropdownField, KeyMap } from '../field/model';
import { Button } from '../button/model';
export declare class ListUtils {
    static addColoumn(): void;
    static hideColoumn(): void;
    static setOptionsUsingKey(list: List, fieldKey: string, masterDataKey: string): void;
    static setOptionsUsingValues(list: List, fieldKey: string, keyMap: KeyMap, relaodAll: boolean, record: any): void;
    static getColumnKey(column: Column): string;
    static getColumnLabel(column: Column): string;
    static getColumnSelectorField(listConfig: List): DropdownField;
    static getMobileConfig(listConfig: List): void;
    static setCustomLayouts(listConfig: List): void;
    static hasRowHover(listConfig: List): boolean;
    static hasCustomRowLayout(listConfig: List): boolean;
    static hasCustomCellLayout(listConfig: List): boolean;
    static setCustomLayout(listConfig: List, layout: ListCustomLayout): void;
    static getControl(listConfig: List, cellControl: CellControl): {
        control?: any;
        colIndex?: number;
        cControlIndex?: number;
    };
    static getColumnControl(columns: Array<Column>, controlKey: string): {
        control?: any;
        colIndex?: number;
        cControlIndex?: number;
    };
    static getFieldControl(field: any, controlKey: string, colIndex: number, cControlIndex: number): {
        control?: any;
        colIndex?: number;
        cControlIndex?: number;
    };
    static getButtonControl(buttons: Array<Button>, controlKey: string): any;
}
