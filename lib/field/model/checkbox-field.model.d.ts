import { Field } from './field.model';
import { DropdownOption } from './dropdown-option.model';
import { OptionDisplayTemplate } from './radio.model';
export declare const enum DisplayType {
    VERTICAL = "VERTICAL",
    INLINE = "INLINE"
}
export interface CheckboxField extends Field {
    displayType: DisplayType;
    showLess?: number;
    showAllLabel?: string;
    options: Array<DropdownOption>;
    optionDependsOn?: string;
    defaultImageUrl?: string;
    displayTemplate: OptionDisplayTemplate;
}
