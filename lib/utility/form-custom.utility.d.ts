import { Form, FormButton, FormButtonLayout, FormCellControl, FormCustomLayout, FormField } from "../form/model";
export declare class FormCustomUtils {
    static setCustomLayout(formConfig: Form, layout: FormCustomLayout): void;
    static getControl(formConfig: Form, cellControl: FormCellControl): any;
    static getFieldControl(formFields: Array<FormField>, controlKey: string): any;
    static getButtonControl(action: FormButton | FormButtonLayout, controlKey: string): any;
}
