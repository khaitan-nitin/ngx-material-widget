import { Field } from './field.model';
export declare const enum ArrayDisplayType {
    AS_BULLET = "AS_BULLET",
    COMMA_SEPARATED = "COMMA_SEPARATED"
}
export interface ArrayField extends Field {
    displayType: ArrayDisplayType;
    showLess?: number;
}
