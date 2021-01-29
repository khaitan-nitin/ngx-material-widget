import { DependentOnField } from "../field/model";
import { FormButton, FormButtonLayout, FormField } from "../form/model";
export declare class DependentUtils {
    static displayDependencyField(dependentOnFields: Array<DependentOnField>, supportingRecord: any, record: any): boolean;
    static getDependencyTree(formFields: Array<FormField>): any;
    static getDependencyTreeForButton(buttonLayout: FormButton | FormButtonLayout): any;
}
