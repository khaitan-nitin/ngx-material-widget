import { DropdownOption } from "./dropdown-option.model";
export declare const enum KeyMapOptionType {
    CRUD = "CRUD",
    FORM = "FORM",
    LIST = "LIST"
}
export interface KeyMap {
    associations: Array<KeyMapAssociation>;
    optionDependsOnValue?: string;
    options: Array<DropdownOption>;
}
export interface KeyMapAssociation {
    componentIdentifier: string;
    fieldKey: string;
}
