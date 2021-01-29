import { DependentOnField } from './dependent-on-field.model';
import { Validation } from '../../exception/model';
import { ControlPermission } from '../../privilege/model';
import { ButtonColor } from '../../button/model';
import { UploadFile } from '.';
export declare const enum FieldType {
    TEXT = "TEXT",
    HIDDEN = "HIDDEN",
    TEXTAREA = "TEXTAREA",
    PASSWORD = "PASSWORD",
    COLOR = "COLOR",
    EMAIL = "EMAIL",
    MONTH = "MONTH",
    WEEK = "WEEK",
    NUMBER = "NUMBER",
    TIME = "TIME",
    CALENDAR = "CALENDAR",
    SLIDER = "SLIDER",
    TOGGLE_OPTION = "TOGGLE_OPTION",
    CHECKBOX = "CHECKBOX",
    RADIO = "RADIO",
    AUTOCOMPLETE = "AUTOCOMPLETE",
    DROPDOWN = "DROPDOWN",
    IMAGE = "IMAGE",
    UPLOAD = "UPLOAD",
    HTML_EDITOR = "HTML_EDITOR",
    LABEL = "LABEL",
    BOOLEAN = "BOOLEAN",
    JSON = "JSON",
    IMAGE_AND_TEXT = "IMAGE_AND_TEXT",
    CHIPS = "CHIPS",
    TOOLBAR = "TOOLBAR",
    MULTI_IMAGE = "MULTI_IMAGE",
    PARAGRAPH = "PARAGRAPH"
}
export declare const enum FieldDiaplyType {
    HORIZONTAL = "HORIZONTAL",
    INLINE = "INLINE"
}
export declare const enum DisplayMode {
    HIDDEN = "HIDDEN",
    DISABLED = "DISABLED",
    LABEL = "LABEL"
}
export declare const enum FieldAppearance {
    FILL = "FILL",
    STANDARD = "STANDARD",
    OUTLINE = "outline"
}
export declare const enum HelpDiaplyType {
    PLAIN_TEXT = "PLAIN_TEXT",
    RIGHT_MODAL = "RIGHT_MODAL",
    TOOLTIP = "TOOLTIP"
}
export declare const enum HelpTextOrientation {
    BOTTOM = "BOTTOM",
    TOP = "TOP",
    LEFT = "LEFT",
    RIGHT = "RIGHT"
}
export declare const enum LabelTextAlign {
    LEFT = "left",
    RIGHT = "RIGHT"
}
export interface FieldHelp {
    icon?: string;
    title?: string;
    message: string;
    displayType: HelpDiaplyType;
    orientation?: HelpTextOrientation;
    withLabel?: boolean;
}
export interface FieldNavigate {
    icon?: string;
    text?: string;
    routeTo: Array<string>;
}
export interface Field {
    key: string;
    label?: string;
    icon?: string;
    type: FieldType;
    isReadOnly?: boolean;
    isUnique?: boolean;
    fieldDisplayType?: FieldDiaplyType;
    help?: FieldHelp;
    value?: Array<string> | string | Map<string, any> | Array<UploadFile> | Object;
    navigate?: FieldNavigate;
    placeholder?: string;
    dependentOnFields?: Array<DependentOnField>;
    validations?: Array<Validation>;
    displayMode?: DisplayMode;
    permission?: ControlPermission;
}
export interface AppearanceField {
    appearance: FieldAppearance;
}
export interface LabelField extends Field, AppearanceField {
    asBubble?: boolean;
    bubbleColor?: ButtonColor;
    textAlign?: LabelTextAlign;
}
export interface TextField extends Field, AppearanceField {
    ellipsis?: number;
    maxLength?: number;
    hasClear?: boolean;
    rows?: number;
}
export interface HtmlEditorField extends Field, AppearanceField {
    height?: number;
}
export interface InputField extends Field, AppearanceField {
    min?: number;
    max?: number;
}
