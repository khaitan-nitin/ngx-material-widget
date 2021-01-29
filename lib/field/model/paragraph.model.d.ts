import { Button, ButtonGroup, HoverButton } from '../../button/model';
import { AppearanceField, AutocompleteField, CalendarField, CheckboxField, DropdownField, Field, FileField, HtmlEditorField, ImageField, InputField, LabelField, RadioField, SliderField, TextField, ToggleField } from '.';
export declare const enum TemplateSource {
    INTERNAL = "INTERNAL",
    EXTERNAL = "EXTERNAL"
}
export interface ParagraphField extends Field, AppearanceField {
    template: string;
    source?: TemplateSource;
    fieldContexts?: any;
    buttonContexts?: any;
}
export interface TokenType {
    type: string;
    field?: Field | TextField | LabelField | InputField | DropdownField | HtmlEditorField | ImageField | CalendarField | AutocompleteField | CheckboxField | FileField | RadioField | SliderField | ToggleField;
    button?: Button | ButtonGroup | HoverButton;
    value?: string;
}
