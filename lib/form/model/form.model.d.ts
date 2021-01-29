import { Field, FieldDiaplyType, FileField, AutocompleteField, CalendarField, DropdownField, ImageField, CheckboxField, TextField, InputField, RadioField, SliderField, ToggleField, HtmlEditorField, LabelField, ChipField, MultiImageField, ParagraphField } from '../../field/model';
import { Button, HoverButton, ButtonGroup } from '../../button/model';
import { FormHeader } from './form-header.model';
import { ToolbarField } from '../../field/model/toolbar.model';
import { ControlPermission } from '../../privilege/model';
export declare const enum FormDiaplyMode {
    SEARCH = "SEARCH",
    ADD = "ADD",
    EDIT = "EDIT",
    VIEW = "VIEW",
    BLOCKED = "BLOCKED",
    ONLY_BUTTON = "ONLY_BUTTON",
    IN_LIST = "IN_LIST",
    CRUD_LIST = "CRUD_LIST",
    CRUD_FORM = "CRUD_FORM"
}
export declare const enum FormTemplate {
    DEFAULT = "DEFAULT"
}
export declare const enum FormSectionExpand {
    EXPAND = "EXPAND",
    COLLAPSE = "COLLAPSE"
}
export interface FormSeparator {
    label?: string;
    icon?: string;
    expandable?: {
        allowed: boolean;
        default: FormSectionExpand;
    };
    beforeField: boolean;
}
export interface FormField {
    field: Field | TextField | LabelField | InputField | DropdownField | HtmlEditorField | ImageField | CalendarField | AutocompleteField | CheckboxField | FileField | RadioField | SliderField | ToggleField | ChipField | ToolbarField | MultiImageField | ParagraphField;
    addMore?: boolean;
    addMorePermission?: ControlPermission;
    displayInColumns?: number;
    separator?: FormSeparator;
}
export interface FormDescription {
    text: string;
    bgColor?: string;
    textColor?: string;
    icon?: string;
}
export interface FormButton {
    align: string;
    buttons?: Array<Button | ButtonGroup | HoverButton>;
}
export interface FormButtonLayout {
    rowHeight: number;
    cells: Array<FormButtonGrid>;
}
export interface FormButtonGrid {
    rows: number;
    cols: number;
    buttons: FormButton;
}
export interface Form {
    identifier: string;
    header?: FormHeader;
    description?: FormDescription;
    displayInColumns?: number;
    formFields: Array<FormField>;
    modal?: FormModal;
    action?: FormButton | FormButtonLayout;
    displayType: FieldDiaplyType;
    displayMode: FormDiaplyMode;
    help?: FormHelp;
    permission?: ControlPermission;
    showCustomLayout?: boolean;
    layout?: FormCustomLayout;
}
export interface FormModal {
    width?: number;
}
export interface FormHelp {
    icon: string;
    message: string;
}
export interface FormLayout {
    sectionLabel?: string;
    sectionIcon?: string;
    sectionExpandable?: {
        allowed: boolean;
        default: FormSectionExpand;
    };
    rows?: Array<FormLayoutRow>;
}
export interface FormLayoutRow {
    columns?: Array<FormField>;
}
export interface FormCustomLayout {
    cellCount?: number;
    rowHeight: number;
    cells: Array<FormCustomLayoutCell>;
}
export interface FormCustomLayoutCell {
    rows: number;
    cols: number;
    key?: string;
    label?: string;
    controls: Array<FormCellControl>;
    separator?: FormSeparator;
    show: boolean;
    displayInline?: {
        separator: string;
    };
    textColor?: Function;
    bgColor?: Function;
}
export interface FormCellControl {
    key: string;
    control?: any;
    fullWidth?: boolean;
    type: FormCellControlType;
}
export declare const enum FormCellControlType {
    FIELD = "FIELD",
    BUTTON = "BUTTON"
}
