import { AppearanceField, Field } from './field.model';
import { DropdownOption } from './dropdown-option.model';
export interface DropdownField extends Field, AppearanceField {
    multiselect: boolean;
    options: Array<DropdownOption>;
    defaultOption?: string;
    optionDependsOn?: string;
}
