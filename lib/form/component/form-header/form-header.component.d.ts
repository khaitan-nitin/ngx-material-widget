import { OnInit, EventEmitter } from '@angular/core';
import { FormDiaplyMode, FormHeader, FormDescription, FormTitleIconPosition, FormHelp } from '../../model';
import { Field, TextField, InputField, DropdownField, ImageField, CalendarField, AutocompleteField, CheckboxField, FileField, RadioField, SliderField, ToggleField, FieldChange, HtmlEditorField, LabelField } from '../../../field/model';
import { Button } from '../../../button/model';
import { FormGroup } from '@angular/forms';
import { Ability } from '@casl/ability';
import * as ɵngcc0 from '@angular/core';
export declare class FormHeaderComponent implements OnInit {
    private ability;
    form: FormGroup;
    formHeaderConfig: FormHeader;
    description: FormDescription;
    help: FormHelp;
    _formDisplayMode: FormDiaplyMode;
    get formDisplayMode(): any;
    set formDisplayMode(_formDisplayMode: any);
    formIdentifier: string;
    sourceIndex: number;
    widgetArrayIndex: number;
    originalData: any;
    context: any;
    formActions: Array<Field | TextField | LabelField | InputField | DropdownField | HtmlEditorField | ImageField | CalendarField | AutocompleteField | CheckboxField | FileField | RadioField | SliderField | ToggleField | Button>;
    onFieldChange: EventEmitter<any>;
    onButtonClick: EventEmitter<any>;
    title: string;
    subtitle: string;
    iconPosition: FormTitleIconPosition;
    fields: Array<Field | TextField | LabelField | InputField | DropdownField | HtmlEditorField | ImageField | CalendarField | AutocompleteField | CheckboxField | FileField | RadioField | SliderField | ToggleField>;
    buttons: Array<Button>;
    formInitialized: boolean;
    constructor(ability: Ability);
    ngOnInit(): void;
    init(): void;
    getFormHeader(): void;
    setIconPosition(): void;
    saperateFormActions(): void;
    initFormGroup(): void;
    fieldChange(fieldChange: FieldChange): void;
    buttonClick(event: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<FormHeaderComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<FormHeaderComponent, "mx-form-header", never, { "formDisplayMode": "formDisplayMode"; "_formDisplayMode": "_formDisplayMode"; "form": "form"; "formHeaderConfig": "formHeaderConfig"; "description": "description"; "help": "help"; "formIdentifier": "formIdentifier"; "sourceIndex": "sourceIndex"; "widgetArrayIndex": "widgetArrayIndex"; "originalData": "originalData"; "context": "context"; "formActions": "formActions"; }, { "onFieldChange": "onFieldChange"; "onButtonClick": "onButtonClick"; }, never, never>;
}

//# sourceMappingURL=form-header.component.d.ts.map