import { Field, AutocompleteField, CheckboxField, RadioField, DropdownField, KeyMap } from '../field/model';
import { FormDiaplyMode } from '../form/model';
export declare class FieldUtils {
    static isFieldDisabled(field: Field, currentDisplayMode: FormDiaplyMode, value: string | Array<string>): boolean;
    static displayEllipsis(charLimit: number, value: any): boolean;
    static readOnlyField(): Array<string>;
    static isEllipsisField(field: Field): boolean;
    static setOptionsUsingKey(field: AutocompleteField | CheckboxField | RadioField | DropdownField, masterDataKey: string): void;
    static setOptionsUsingValues(field: AutocompleteField | CheckboxField | RadioField | DropdownField, keyMap: KeyMap): void;
}
