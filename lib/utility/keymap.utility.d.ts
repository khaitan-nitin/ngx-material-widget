import { KeyMap, KeyMapAssociation, DropdownOption, KeyMapOptionType } from '../field/model';
import { Crud } from '../crud/model';
import { Form } from '../form/model';
import { List } from '../list/model';
export declare class KeyMapUtils {
    static push(keyMaps: Array<KeyMap>, associations: Array<KeyMapAssociation>, options: Array<DropdownOption> | string, optionType: KeyMapOptionType, optionComponent: Crud | Form | List, optionDependsOnValue?: string, record?: any): Array<KeyMap>;
    static generateKeyMap(associations: Array<KeyMapAssociation>, options: Array<DropdownOption> | string, optionDependsOnValue?: string): KeyMap;
    static setOptionssUsingValues(keyMaps: Array<KeyMap>, relaodAll: boolean, optionType: KeyMapOptionType, optionComponent: Crud | Form | List, record?: any): void;
    static getValue(keyMaps: Array<KeyMap>, fieldKey: string, valueAsKey: any): any;
}
