import { FormDiaplyMode } from '../form/model';
import { Crud, CrudTab } from '../crud/model';
import { KeyMap } from '../field/model';
export declare class CrudUtils {
    static setOptionsUsingKey(crud: Crud, fieldKey: string, masterDataKey: string): void;
    static setOptionsUsingValues(crud: Crud, fieldKey: string, keyMap: KeyMap, relaodAll: boolean, record: any): void;
    static setDisplayType(crudTabs: Array<CrudTab>, formDisplayMode: FormDiaplyMode): void;
    static changeButtonLabelIcon(crudTabs: Array<CrudTab>, buttonIdentifier: string, label?: string, icon?: string): void;
}
