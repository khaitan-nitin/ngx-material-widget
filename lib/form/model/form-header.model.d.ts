import { Button } from "../../button/model";
import { Field, DropdownField, ImageField, CalendarField, AutocompleteField, CheckboxField, FileField, TextField, InputField, RadioField, SliderField, ToggleField, HtmlEditorField, LabelField } from "../../field/model";
export declare const enum FormTitleIconPosition {
    BEFORE_TITLE = "BEFORE_TITLE",
    AFTER_TITLE = "AFTER_TITLE"
}
export interface FormHeader {
    title: string;
    subtitle?: string;
    addModeTitle?: string;
    editModeTitle?: string;
    viewModeTitle?: string;
    searchModeTitle?: string;
    actions?: Array<Field | TextField | LabelField | InputField | DropdownField | HtmlEditorField | ImageField | CalendarField | AutocompleteField | CheckboxField | FileField | RadioField | SliderField | ToggleField | Button>;
    icon?: {
        font?: string;
        path?: string;
        position?: FormTitleIconPosition;
    };
}
