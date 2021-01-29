import { Field, DropdownField, CalendarField, AutocompleteField, FileField, ImageField, ToggleField, TextField, InputField, CheckboxField, RadioField, SliderField, HtmlEditorField, LabelField } from '../../field/model';
import { Button } from '../../button/model';
export declare const enum ColumnHelpDiaplyType {
    PLAIN_TEXT = "PLAIN_TEXT"
}
export interface ColumnHelp {
    icon?: string;
    title?: string;
    message: string;
    displayType: ColumnHelpDiaplyType;
}
export interface Column {
    key?: string;
    label?: string;
    fields: Array<Field | TextField | LabelField | InputField | DropdownField | HtmlEditorField | ImageField | CalendarField | AutocompleteField | CheckboxField | FileField | RadioField | SliderField | ToggleField>;
    link?: Button;
    linkKey?: string;
    sortable?: boolean;
    show: boolean;
    width?: number;
    displayInline?: {
        separator: string;
    };
    textColor?: Function;
    bgColor?: Function;
    template?: {
        css?: any;
        html?: any;
        layout?: ListCustomLayout;
    };
}
export interface ListCustomLayout {
    cellCount?: number;
    rowHeight: number;
    cells: Array<CustomLayoutCell>;
}
export interface CustomLayoutCell {
    rows: number;
    cols: number;
    key?: string;
    label?: string;
    controls: Array<CellControl>;
    link?: Button;
    linkKey?: string;
    show: boolean;
    displayInline?: {
        separator: string;
    };
    textColor?: Function;
    bgColor?: Function;
}
export interface CellControl {
    key: string;
    control?: any;
    colIndex?: number;
    fullWidth?: boolean;
    fieldStyle?: {
        class: CellControllFieldClass;
    };
    cControlIndex?: number;
    type: CellControllType;
}
export declare const enum CellControllFieldClass {
    PRIMARY = "PRIMARY",
    SECONDARY = "SECONDARY",
    TERTIARY = "TERTIARY"
}
export declare const enum CellControllType {
    FIELD = "FIELD",
    BUTTON = "BUTTON"
}
