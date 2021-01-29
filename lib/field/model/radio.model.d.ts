import { Field } from './field.model';
import { DropdownOption } from './dropdown-option.model';
export declare const enum OptionDisplayTemplate {
    CLASSIC = "CLASSIC",
    LIST = "LIST"
}
export declare const enum RadioDisplayType {
    VERTICAL = "VERTICAL",
    INLINE = "INLINE"
}
export interface RadioField extends Field {
    displayType: RadioDisplayType;
    showLess?: number;
    showAllLabel?: string;
    options: Array<DropdownOption>;
    optionDependsOn?: string;
    defaultImageUrl?: string;
    displayTemplate: OptionDisplayTemplate;
}
