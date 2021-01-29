import { FormDiaplyMode, Form, FormField } from '../form/model';
import { Field, KeyMap } from '../field/model';
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';
export declare class FormUtils {
    static isFormDisable(displayMode: FormDiaplyMode): boolean;
    static disableField(form: FormGroup, field: Field): void;
    static disableFieldControl(fieldControl: FormControl): void;
    static checkUniqueIdentifier(forms: Array<Form>): void;
    static getRawValue(form: FormGroup): any;
    static initFormGroup(formFields: Array<FormField>, supportingRecord: any, record: any, displayMode: FormDiaplyMode): FormGroup;
    static getFieldValidation(field: Field): Array<ValidatorFn>;
    static initFieldGroup(fieldControls: any, formField: FormField, supportingRecord: any, record: any, displayMode: FormDiaplyMode): any;
    static dateRangeValidation(g: FormGroup): any;
    static getCheckboxOption(displayMode: FormDiaplyMode, field: Field, options: Array<string>): any;
    static getParagraphFields(displayMode: FormDiaplyMode, field: Field, fieldValues: Map<string, any>): any;
    static setFormGroup(displayMode: FormDiaplyMode, field: Field, value: any, validations: Array<ValidatorFn>): FormGroup;
    static setFormControl(displayMode: FormDiaplyMode, field: Field, value: any, validations: Array<ValidatorFn>): FormControl;
    static getFormFieldValue(record: any, formField: FormField): any;
    static getFieldValue(recordValue: any, field: Field): any;
    static reset(form: FormGroup, formConfig?: Form): void;
    static getValueViaEval(record: any, key: string): any;
    static setOptionsUsingKey(form: Form, fieldKey: string, masterDataKey: string): void;
    static setOptionsUsingValues(form: Form, fieldKey: string, keyMap: KeyMap, relaodAll: boolean, record: any): void;
    static changeButtonLabelIcon(form: Form, buttonIdentifier: string, label?: string, icon?: string): void;
}
