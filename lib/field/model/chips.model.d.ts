import { Field } from './field.model';
import { Observable } from 'rxjs';
import { DropdownOption } from './dropdown-option.model';
export interface ChipField extends Field {
    orientation?: ChipOrientation;
    options?: Array<DropdownOption>;
}
export interface Chip {
    key: string;
    value: string;
    disabled?: boolean;
    removable?: boolean;
}
export declare const enum ChipOrientation {
    HORIZONTAL = "HORIZONTAL",
    VERTICAL = "VERTICAL"
}
export interface RemoveFunc {
    (item: string): Observable<boolean>;
}
export interface ChipItemChangedEvent {
    values: string[];
    event: Event;
}
