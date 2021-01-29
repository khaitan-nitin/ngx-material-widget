import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { isArray } from 'util';
import { ObjectUtils } from './object.utility';
import { CollectionUtils } from './collection.utility';
import { StringUtils } from './string.utility';
import { FieldUtils } from './field.utility';
import { DependentUtils } from '.';
export class FormUtils {
    static isFormDisable(displayMode) {
        if (displayMode == "BLOCKED" /* BLOCKED */ || displayMode == "VIEW" /* VIEW */) {
            return true;
        }
        else {
            return false;
        }
    }
    static disableField(form, field) {
        if (form && form.get(field.key)) {
            form.get(field.key).disable();
        }
    }
    static disableFieldControl(fieldControl) {
        if (fieldControl) {
            fieldControl.disable();
        }
    }
    static checkUniqueIdentifier(forms) {
        //  TODO: 
    }
    static getRawValue(form) {
        let formValue = {};
        if (form) {
            formValue = form.getRawValue();
        }
        return formValue;
    }
    static initFormGroup(formFields, supportingRecord, record, displayMode) {
        let fieldControls = {};
        let isFormDisabled = this.isFormDisable(displayMode);
        for (let formField of formFields) {
            // if (!CollectionUtils.isEmpty(record)) {
            FormUtils.initFieldGroup(fieldControls, formField, supportingRecord, record, displayMode);
            // }
        }
        return new FormGroup(fieldControls);
    }
    static getFieldValidation(field) {
        let validations = new Array();
        if (field.validations && field.validations.length > 0) {
            for (let val of field.validations) {
                validations.push(val.type);
            }
        }
        return validations;
    }
    static initFieldGroup(fieldControls, formField, supportingRecord, record, displayMode) {
        //        field.hide = false;
        if (!DependentUtils.displayDependencyField(formField.field.dependentOnFields, supportingRecord, record)) {
            if (record == null) {
                record = {};
            }
            if (formField.addMore) {
                record[formField.field.key] = [];
            }
            else {
                record[formField.field.key] = null;
            }
            //          field.hide = true;
            return;
        }
        let validations = this.getFieldValidation(formField.field);
        if (formField.field.type == "CHECKBOX" /* CHECKBOX */) {
            let fieldValue = FormUtils.getValueViaEval(record, formField.field.key);
            if (formField.addMore) {
                let options = record && fieldValue ? fieldValue : new Array();
                fieldControls[formField.field.key] = new FormArray([]);
                for (let vCnt = 0; vCnt < options.length; vCnt++) {
                    let opts = this.getCheckboxOption(displayMode, formField.field, options[vCnt]);
                    fieldControls[formField.field.key].push(this.setFormGroup(displayMode, formField.field, opts, validations));
                }
            }
            else {
                let option = record && fieldValue ? fieldValue : null;
                let opts = this.getCheckboxOption(displayMode, formField.field, option);
                fieldControls[formField.field.key] = this.setFormGroup(displayMode, formField.field, opts, validations);
            }
        }
        else if (formField.field.type == "CALENDAR" /* CALENDAR */ && formField.field.dateRange) {
            let controls = {};
            if (validations && validations.length > 0) {
                controls['startDate'] = new FormControl('', validations);
                controls['endDate'] = new FormControl('', validations);
            }
            else {
                controls['startDate'] = new FormControl('');
                controls['endDate'] = new FormControl('');
            }
            fieldControls[formField.field.key] = this.setFormGroup(displayMode, formField.field, controls, validations);
        }
        else if (formField.field.type == "PARAGRAPH" /* PARAGRAPH */ && !CollectionUtils.isEmpty(formField.field.fieldContexts)) {
            let fieldValue = FormUtils.getValueViaEval(record, formField.field.key);
            let controls = this.getParagraphFields(displayMode, formField.field, fieldValue);
            fieldControls[formField.field.key] = this.setFormGroup(displayMode, formField.field, controls, validations);
        }
        else {
            if (formField.addMore) {
                let values = this.getFormFieldValue(record, formField);
                fieldControls[formField.field.key] = new FormArray([]);
                if (CollectionUtils.isEmpty(values)) {
                    fieldControls[formField.field.key].push(this.setFormControl(displayMode, formField.field, "", validations));
                }
                else {
                    for (let vCnt = 0; vCnt < values.length; vCnt++) {
                        fieldControls[formField.field.key].push(this.setFormControl(displayMode, formField.field, values[vCnt], validations));
                    }
                }
            }
            else {
                let value = this.getFormFieldValue(record, formField);
                fieldControls[formField.field.key] = this.setFormControl(displayMode, formField.field, value, validations);
            }
        }
        return fieldControls;
    }
    static dateRangeValidation(g) {
        return g.get('startDate').value || g.get('endDate').value
            ? null : { 'mismatch': true };
    }
    static getCheckboxOption(displayMode, field, options) {
        let opts = {};
        if (field['options'] && field['options'].length > 0) {
            for (let opt of field['options']) {
                if (ObjectUtils.isEmpty(options)) {
                    if (opt['selected']) {
                        opt.checked = true;
                    }
                    else {
                        opt.checked = false;
                    }
                }
                else {
                    let optionSelected = options.indexOf(opt.key) > -1;
                    if (options && optionSelected) {
                        opt.checked = true;
                    }
                    else {
                        opt.checked = false;
                    }
                }
                opts[opt.key] = new FormControl(opt.checked);
                if (FieldUtils.isFieldDisabled(field, displayMode, "")) {
                    opts[opt.key].disable();
                }
            }
        }
        return opts;
    }
    static getParagraphFields(displayMode, field, fieldValues) {
        let fieldContexts = {};
        if (CollectionUtils.isEmpty(fieldValues)) {
            fieldValues = new Map();
        }
        if (field.fieldContexts && Object.keys(field.fieldContexts).length > 0) {
            for (let key of Object.keys(field.fieldContexts)) {
                let fieldContextKey = field.fieldContexts[key];
                let validations = this.getFieldValidation(fieldContextKey);
                fieldContexts[fieldContextKey.key] = new FormControl(fieldValues[fieldContextKey.key], validations);
                if (FieldUtils.isFieldDisabled(field, displayMode, "")) {
                    fieldContexts[fieldContextKey.key].disable();
                }
            }
        }
        return fieldContexts;
    }
    static setFormGroup(displayMode, field, value, validations) {
        let formGroup;
        if (field.validations && field.validations.length > 0) {
            formGroup = new FormGroup(value, validations);
        }
        else {
            formGroup = new FormGroup(value);
        }
        if ((FieldUtils.isFieldDisabled(field, displayMode, value) || field.isReadOnly || field.type == "HIDDEN" /* HIDDEN */) && !StringUtils.isEmpty(value)) {
            formGroup.disable();
        }
        return formGroup;
    }
    static setFormControl(displayMode, field, value, validations) {
        let formControl;
        if (field.validations && field.validations.length > 0) {
            formControl = new FormControl(value, validations);
        }
        else {
            formControl = new FormControl(value);
        }
        if (FieldUtils.isFieldDisabled(field, displayMode, value)) {
            formControl.disable();
        }
        else {
            formControl.enable();
        }
        return formControl;
    }
    static getFormFieldValue(record, formField) {
        let value;
        let fieldValue = FormUtils.getValueViaEval(record, formField.field.key);
        if (formField.addMore) {
            let elements = new Array();
            if (!ObjectUtils.isEmpty(record) && !CollectionUtils.isEmpty(fieldValue) && isArray(fieldValue)) {
                elements = fieldValue;
            }
            else {
                elements.push("");
            }
            for (let cnt = 0; cnt < elements.length; cnt++) {
                elements[cnt] = this.getFieldValue(elements[cnt], formField.field);
            }
            value = elements;
        }
        else {
            let recordValue = "";
            if (record && fieldValue) {
                recordValue = fieldValue;
            }
            value = this.getFieldValue(recordValue, formField.field);
        }
        return value;
    }
    static getFieldValue(recordValue, field) {
        let value = null;
        if (field.value) {
            value = field.value;
        }
        if (!StringUtils.isEmpty(recordValue)) {
            value = recordValue;
        }
        if (value == undefined || JSON.stringify(value) === '{}') {
            value = "";
        }
        return value;
    }
    static reset(form, formConfig) {
        form.reset();
        if (formConfig != null) {
            for (let field of formConfig.formFields) {
                if (field.field.type == "AUTOCOMPLETE" /* AUTOCOMPLETE */) {
                    field['default'] = null;
                }
            }
        }
    }
    static getValueViaEval(record, key) {
        let value = "";
        try {
            if (StringUtils.isEmpty(value)) {
                value = record[key];
            }
            value = eval("record." + key);
        }
        catch (e) { }
        return value;
    }
    static setOptionsUsingKey(form, fieldKey, masterDataKey) {
        if (!CollectionUtils.isEmpty(form) && !CollectionUtils.isEmpty(form.formFields)) {
            form.formFields.forEach(formField => {
                if (!CollectionUtils.isEmpty(formField) && !CollectionUtils.isEmpty(formField.field)) {
                    if (formField.field.key == fieldKey && (formField.field.type == "AUTOCOMPLETE" /* AUTOCOMPLETE */ || formField.field.type == "CHECKBOX" /* CHECKBOX */ || formField.field.type == "RADIO" /* RADIO */ || formField.field.type == "DROPDOWN" /* DROPDOWN */)) {
                        FieldUtils.setOptionsUsingKey(formField.field, masterDataKey);
                    }
                }
            });
        }
    }
    static setOptionsUsingValues(form, fieldKey, keyMap, relaodAll, record) {
        if (!CollectionUtils.isEmpty(form) && !CollectionUtils.isEmpty(form.formFields)) {
            form.formFields.forEach(formField => {
                if (!CollectionUtils.isEmpty(formField) && !CollectionUtils.isEmpty(formField.field)) {
                    let isMatchingDependendKeyMap = false;
                    if (!StringUtils.isEmpty(formField.field.optionDependsOn)) {
                        //  get optionDependsOn field value
                        let optionDependsOnValue = FormUtils.getValueViaEval(record, formField.field.optionDependsOn);
                        if (keyMap.optionDependsOnValue == optionDependsOnValue) {
                            isMatchingDependendKeyMap = true;
                        }
                    }
                    else {
                        isMatchingDependendKeyMap = true;
                    }
                    if (formField.field.key == fieldKey && (formField.field.type == "AUTOCOMPLETE" /* AUTOCOMPLETE */ || formField.field.type == "CHECKBOX" /* CHECKBOX */ || formField.field.type == "RADIO" /* RADIO */ || formField.field.type == "DROPDOWN" /* DROPDOWN */)) {
                        if (isMatchingDependendKeyMap) { //} || relaodAll) {
                            FieldUtils.setOptionsUsingValues(formField.field, keyMap);
                        }
                    }
                }
            });
        }
    }
    static changeButtonLabelIcon(form, buttonIdentifier, label, icon) {
        if (!CollectionUtils.isEmpty(form) && !CollectionUtils.isEmpty(form.action) && !CollectionUtils.isEmpty(form.action.buttons)) {
            form.action.buttons.forEach(button => {
                if (!CollectionUtils.isEmpty(button) && button.identifier == buttonIdentifier) {
                    if (!StringUtils.isEmpty(label)) {
                        button.label = label;
                    }
                    if (!StringUtils.isEmpty(icon)) {
                        button.icon = icon;
                    }
                }
            });
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS51dGlsaXR5LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9uaXRpbmtoYWl0YW4vTml0aW4vc3R1ZHkvYW5ndWxhci9tYXRlcmlhbC9hZG1pbi1idWlsZGVyLXBsdWdpbi9wcm9qZWN0cy9uZ3gtbWF0ZXJpYWwtd2lkZ2V0L3NyYy8iLCJzb3VyY2VzIjpbImxpYi91dGlsaXR5L2Zvcm0udXRpbGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBZSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sR0FBRyxDQUFDO0FBRW5DLE1BQU0sT0FBTyxTQUFTO0lBQ3BCLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBMkI7UUFDOUMsSUFBSSxXQUFXLDJCQUEwQixJQUFJLFdBQVcscUJBQXVCLEVBQUU7WUFDL0UsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsWUFBWSxDQUFDLElBQWUsRUFBRSxLQUFZO1FBQy9DLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQy9CO0lBQ0gsQ0FBQztJQUVELE1BQU0s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akQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLFVBQVUsSUFBSSxnQkFBZ0IsRUFBRTtvQkFDN0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7d0JBQy9CLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO3FCQUN0QjtvQkFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDOUIsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7cUJBQ25CO2lCQUNGO1lBQ0gsQ0FBQyxDQUFDLENBQUE7U0FDSDtJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvcm1EaWFwbHlNb2RlLCBGb3JtLCBGb3JtRmllbGQsIEZvcm1CdXR0b24gfSBmcm9tICcuLi9mb3JtL21vZGVsJztcbmltcG9ydCB7IEZpZWxkLCBGaWVsZFR5cGUsIEF1dG9jb21wbGV0ZUZpZWxkLCBSYWRpb0ZpZWxkLCBDaGVja2JveEZpZWxkLCBEcm9wZG93bkZpZWxkLCBLZXlNYXAsIERlcGVuZGVudE9uRmllbGQsIENhbGVuZGFyRmllbGQsIFBhcmFncmFwaEZpZWxkIH0gZnJvbSAnLi4vZmllbGQvbW9kZWwnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgVmFsaWRhdG9yRm4sIEZvcm1BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICd1dGlsJztcbmltcG9ydCB7IE9iamVjdFV0aWxzIH0gZnJvbSAnLi9vYmplY3QudXRpbGl0eSc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uVXRpbHMgfSBmcm9tICcuL2NvbGxlY3Rpb24udXRpbGl0eSc7XG5pbXBvcnQgeyBTdHJpbmdVdGlscyB9IGZyb20gJy4vc3RyaW5nLnV0aWxpdHknO1xuaW1wb3J0IHsgRmllbGRVdGlscyB9IGZyb20gJy4vZmllbGQudXRpbGl0eSc7XG5pbXBvcnQgeyBEZXBlbmRlbnRVdGlscyB9IGZyb20gJy4nO1xuXG5leHBvcnQgY2xhc3MgRm9ybVV0aWxzIHtcbiAgc3RhdGljIGlzRm9ybURpc2FibGUoZGlzcGxheU1vZGU6IEZvcm1EaWFwbHlNb2RlKTogYm9vbGVhbiB7XG4gICAgaWYgKGRpc3BsYXlNb2RlID09IEZvcm1EaWFwbHlNb2RlLkJMT0NLRUQgfHwgZGlzcGxheU1vZGUgPT0gRm9ybURpYXBseU1vZGUuVklFVykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZGlzYWJsZUZpZWxkKGZvcm06IEZvcm1Hcm91cCwgZmllbGQ6IEZpZWxkKTogdm9pZCB7XG4gICAgaWYgKGZvcm0gJiYgZm9ybS5nZXQoZmllbGQua2V5KSkge1xuICAgICAgZm9ybS5nZXQoZmllbGQua2V5KS5kaXNhYmxlKCk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGRpc2FibGVGaWVsZENvbnRyb2woZmllbGRDb250cm9sOiBGb3JtQ29udHJvbCk6IHZvaWQge1xuICAgIGlmIChmaWVsZENvbnRyb2wpIHtcbiAgICAgIGZpZWxkQ29udHJvbC5kaXNhYmxlKCk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGNoZWNrVW5pcXVlSWRlbnRpZmllcihmb3JtczogQXJyYXk8Rm9ybT4pIHtcbiAgICAvLyAgVE9ETzogXG4gIH1cblxuICBzdGF0aWMgZ2V0UmF3VmFsdWUoZm9ybTogRm9ybUdyb3VwKSB7XG4gICAgbGV0IGZvcm1WYWx1ZTogYW55ID0ge307XG5cbiAgICBpZiAoZm9ybSkge1xuICAgICAgZm9ybVZhbHVlID0gZm9ybS5nZXRSYXdWYWx1ZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBmb3JtVmFsdWU7XG4gIH1cblxuICBzdGF0aWMgaW5pdEZvcm1Hcm91cChmb3JtRmllbGRzOiBBcnJheTxGb3JtRmllbGQ+LCBzdXBwb3J0aW5nUmVjb3JkOiBhbnksIHJlY29yZDogYW55LCBkaXNwbGF5TW9kZTogRm9ybURpYXBseU1vZGUpOiBGb3JtR3JvdXAge1xuICAgIGxldCBmaWVsZENvbnRyb2xzID0ge307XG5cbiAgICBsZXQgaXNGb3JtRGlzYWJsZWQgPSB0aGlzLmlzRm9ybURpc2FibGUoZGlzcGxheU1vZGUpO1xuXG4gICAgZm9yIChsZXQgZm9ybUZpZWxkIG9mIGZvcm1GaWVsZHMpIHtcbiAgICAgIC8vIGlmICghQ29sbGVjdGlvblV0aWxzLmlzRW1wdHkocmVjb3JkKSkge1xuICAgICAgRm9ybVV0aWxzLmluaXRGaWVsZEdyb3VwKGZpZWxkQ29udHJvbHMsIGZvcm1GaWVsZCwgc3VwcG9ydGluZ1JlY29yZCwgcmVjb3JkLCBkaXNwbGF5TW9kZSk7XG4gICAgICAvLyB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBGb3JtR3JvdXAoZmllbGRDb250cm9scyk7XG4gIH1cblxuICBzdGF0aWMgZ2V0RmllbGRWYWxpZGF0aW9uKGZpZWxkOiBGaWVsZCk6IEFycmF5PFZhbGlkYXRvckZuPiB7XG4gICAgbGV0IHZhbGlkYXRpb25zOiBBcnJheTxWYWxpZGF0b3JGbj4gPSBuZXcgQXJyYXk8VmFsaWRhdG9yRm4+KCk7XG4gICAgaWYgKGZpZWxkLnZhbGlkYXRpb25zICYmIGZpZWxkLnZhbGlkYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IHZhbCBvZiBmaWVsZC52YWxpZGF0aW9ucykge1xuICAgICAgICB2YWxpZGF0aW9ucy5wdXNoKHZhbC50eXBlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdGlvbnM7XG4gIH1cblxuICBzdGF0aWMgaW5pdEZpZWxkR3JvdXAoZmllbGRDb250cm9sczogYW55LCBmb3JtRmllbGQ6IEZvcm1GaWVsZCwgc3VwcG9ydGluZ1JlY29yZDogYW55LCByZWNvcmQ6IGFueSwgZGlzcGxheU1vZGU6IEZvcm1EaWFwbHlNb2RlKTogYW55IHtcbiAgICAvLyAgICAgICAgZmllbGQuaGlkZSA9IGZhbHNlO1xuICAgIGlmICghRGVwZW5kZW50VXRpbHMuZGlzcGxheURlcGVuZGVuY3lGaWVsZChmb3JtRmllbGQuZmllbGQuZGVwZW5kZW50T25GaWVsZHMsIHN1cHBvcnRpbmdSZWNvcmQsIHJlY29yZCkpIHtcbiAgICAgIGlmIChyZWNvcmQgPT0gbnVsbCkge1xuICAgICAgICByZWNvcmQgPSB7fTtcbiAgICAgIH1cbiAgICAgIGlmIChmb3JtRmllbGQuYWRkTW9yZSkge1xuICAgICAgICByZWNvcmRbZm9ybUZpZWxkLmZpZWxkLmtleV0gPSBbXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlY29yZFtmb3JtRmllbGQuZmllbGQua2V5XSA9IG51bGw7XG4gICAgICB9XG4gICAgICAvLyAgICAgICAgICBmaWVsZC5oaWRlID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgdmFsaWRhdGlvbnM6IEFycmF5PFZhbGlkYXRvckZuPiA9IHRoaXMuZ2V0RmllbGRWYWxpZGF0aW9uKGZvcm1GaWVsZC5maWVsZCk7XG5cbiAgICBpZiAoZm9ybUZpZWxkLmZpZWxkLnR5cGUgPT0gRmllbGRUeXBlLkNIRUNLQk9YKSB7XG4gICAgICBsZXQgZmllbGRWYWx1ZSA9IEZvcm1VdGlscy5nZXRWYWx1ZVZpYUV2YWwocmVjb3JkLCBmb3JtRmllbGQuZmllbGQua2V5KTtcbiAgICAgIGlmIChmb3JtRmllbGQuYWRkTW9yZSkge1xuICAgICAgICBsZXQgb3B0aW9uczogQXJyYXk8YW55PiA9IHJlY29yZCAmJiBmaWVsZFZhbHVlID8gZmllbGRWYWx1ZSA6IG5ldyBBcnJheTxhbnk+KCk7XG5cbiAgICAgICAgZmllbGRDb250cm9sc1tmb3JtRmllbGQuZmllbGQua2V5XSA9IG5ldyBGb3JtQXJyYXkoW10pO1xuICAgICAgICBmb3IgKGxldCB2Q250ID0gMDsgdkNudCA8IG9wdGlvbnMubGVuZ3RoOyB2Q250KyspIHtcbiAgICAgICAgICBsZXQgb3B0cyA9IHRoaXMuZ2V0Q2hlY2tib3hPcHRpb24oZGlzcGxheU1vZGUsIGZvcm1GaWVsZC5maWVsZCwgb3B0aW9uc1t2Q250XSk7XG4gICAgICAgICAgZmllbGRDb250cm9sc1tmb3JtRmllbGQuZmllbGQua2V5XS5wdXNoKHRoaXMuc2V0Rm9ybUdyb3VwKGRpc3BsYXlNb2RlLCBmb3JtRmllbGQuZmllbGQsIG9wdHMsIHZhbGlkYXRpb25zKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBvcHRpb24gPSByZWNvcmQgJiYgZmllbGRWYWx1ZSA/IGZpZWxkVmFsdWUgOiBudWxsO1xuXG4gICAgICAgIGxldCBvcHRzID0gdGhpcy5nZXRDaGVja2JveE9wdGlvbihkaXNwbGF5TW9kZSwgZm9ybUZpZWxkLmZpZWxkLCBvcHRpb24pO1xuICAgICAgICBmaWVsZENvbnRyb2xzW2Zvcm1GaWVsZC5maWVsZC5rZXldID0gdGhpcy5zZXRGb3JtR3JvdXAoZGlzcGxheU1vZGUsIGZvcm1GaWVsZC5maWVsZCwgb3B0cywgdmFsaWRhdGlvbnMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZm9ybUZpZWxkLmZpZWxkLnR5cGUgPT0gRmllbGRUeXBlLkNBTEVOREFSICYmICg8Q2FsZW5kYXJGaWVsZD5mb3JtRmllbGQuZmllbGQpLmRhdGVSYW5nZSkge1xuICAgICAgbGV0IGNvbnRyb2xzID0ge307XG4gICAgICBpZiAodmFsaWRhdGlvbnMgJiYgdmFsaWRhdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb250cm9sc1snc3RhcnREYXRlJ10gPSBuZXcgRm9ybUNvbnRyb2woJycsdmFsaWRhdGlvbnMpO1xuICAgICAgICBjb250cm9sc1snZW5kRGF0ZSddID0gbmV3IEZvcm1Db250cm9sKCcnLCB2YWxpZGF0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250cm9sc1snc3RhcnREYXRlJ10gPSBuZXcgRm9ybUNvbnRyb2woJycpO1xuICAgICAgICBjb250cm9sc1snZW5kRGF0ZSddID0gbmV3IEZvcm1Db250cm9sKCcnKTtcbiAgICAgIH1cbiAgICAgIGZpZWxkQ29udHJvbHNbZm9ybUZpZWxkLmZpZWxkLmtleV0gPSB0aGlzLnNldEZvcm1Hcm91cChkaXNwbGF5TW9kZSwgZm9ybUZpZWxkLmZpZWxkLCBjb250cm9scywgdmFsaWRhdGlvbnMpO1xuICAgIH0gZWxzZSBpZiAoZm9ybUZpZWxkLmZpZWxkLnR5cGUgPT0gRmllbGRUeXBlLlBBUkFHUkFQSCAmJiAhQ29sbGVjdGlvblV0aWxzLmlzRW1wdHkoKDxQYXJhZ3JhcGhGaWVsZD5mb3JtRmllbGQuZmllbGQpLmZpZWxkQ29udGV4dHMpKSB7XG4gICAgICBsZXQgZmllbGRWYWx1ZSA9IEZvcm1VdGlscy5nZXRWYWx1ZVZpYUV2YWwocmVjb3JkLCBmb3JtRmllbGQuZmllbGQua2V5KTtcbiAgICAgIGxldCBjb250cm9scyA9IHRoaXMuZ2V0UGFyYWdyYXBoRmllbGRzKGRpc3BsYXlNb2RlLCBmb3JtRmllbGQuZmllbGQsIGZpZWxkVmFsdWUpO1xuXG4gICAgICBmaWVsZENvbnRyb2xzW2Zvcm1GaWVsZC5maWVsZC5rZXldID0gdGhpcy5zZXRGb3JtR3JvdXAoZGlzcGxheU1vZGUsIGZvcm1GaWVsZC5maWVsZCwgY29udHJvbHMsIHZhbGlkYXRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGZvcm1GaWVsZC5hZGRNb3JlKSB7XG4gICAgICAgIGxldCB2YWx1ZXM6IEFycmF5PGFueT4gPSB0aGlzLmdldEZvcm1GaWVsZFZhbHVlKHJlY29yZCwgZm9ybUZpZWxkKTtcblxuICAgICAgICBmaWVsZENvbnRyb2xzW2Zvcm1GaWVsZC5maWVsZC5rZXldID0gbmV3IEZvcm1BcnJheShbXSk7XG4gICAgICAgIGlmIChDb2xsZWN0aW9uVXRpbHMuaXNFbXB0eSh2YWx1ZXMpKSB7XG4gICAgICAgICAgZmllbGRDb250cm9sc1tmb3JtRmllbGQuZmllbGQua2V5XS5wdXNoKHRoaXMuc2V0Rm9ybUNvbnRyb2woZGlzcGxheU1vZGUsIGZvcm1GaWVsZC5maWVsZCwgXCJcIiwgdmFsaWRhdGlvbnMpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKGxldCB2Q250ID0gMDsgdkNudCA8IHZhbHVlcy5sZW5ndGg7IHZDbnQrKykge1xuICAgICAgICAgICAgZmllbGRDb250cm9sc1tmb3JtRmllbGQuZmllbGQua2V5XS5wdXNoKHRoaXMuc2V0Rm9ybUNvbnRyb2woZGlzcGxheU1vZGUsIGZvcm1GaWVsZC5maWVsZCwgdmFsdWVzW3ZDbnRdLCB2YWxpZGF0aW9ucykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHZhbHVlOiBhbnkgPSB0aGlzLmdldEZvcm1GaWVsZFZhbHVlKHJlY29yZCwgZm9ybUZpZWxkKVxuXG4gICAgICAgIGZpZWxkQ29udHJvbHNbZm9ybUZpZWxkLmZpZWxkLmtleV0gPSB0aGlzLnNldEZvcm1Db250cm9sKGRpc3BsYXlNb2RlLCBmb3JtRmllbGQuZmllbGQsIHZhbHVlLCB2YWxpZGF0aW9ucyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpZWxkQ29udHJvbHM7XG4gIH1cblxuICBzdGF0aWMgZGF0ZVJhbmdlVmFsaWRhdGlvbihnOiBGb3JtR3JvdXApIDogYW55e1xuICAgIHJldHVybiBnLmdldCgnc3RhcnREYXRlJykudmFsdWUgfHwgZy5nZXQoJ2VuZERhdGUnKS52YWx1ZVxuICAgID8gbnVsbCA6IHsnbWlzbWF0Y2gnOiB0cnVlfTtcbiAgfVxuICBzdGF0aWMgZ2V0Q2hlY2tib3hPcHRpb24oZGlzcGxheU1vZGU6IEZvcm1EaWFwbHlNb2RlLCBmaWVsZDogRmllbGQsIG9wdGlvbnM6IEFycmF5PHN0cmluZz4pOiBhbnkge1xuICAgIGxldCBvcHRzID0ge307XG5cbiAgICBpZiAoZmllbGRbJ29wdGlvbnMnXSAmJiBmaWVsZFsnb3B0aW9ucyddLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IG9wdCBvZiBmaWVsZFsnb3B0aW9ucyddKSB7XG4gICAgICAgIGlmIChPYmplY3RVdGlscy5pc0VtcHR5KG9wdGlvbnMpKSB7XG4gICAgICAgICAgaWYgKG9wdFsnc2VsZWN0ZWQnXSkgIHtcbiAgICAgICAgICAgIG9wdC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2UgIHtcbiAgICAgICAgICAgIG9wdC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBvcHRpb25TZWxlY3RlZDogYm9vbGVhbiA9IG9wdGlvbnMuaW5kZXhPZihvcHQua2V5KSA+IC0xO1xuICAgICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvblNlbGVjdGVkKSB7XG4gICAgICAgICAgICBvcHQuY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9wdC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG9wdHNbb3B0LmtleV0gPSBuZXcgRm9ybUNvbnRyb2wob3B0LmNoZWNrZWQpO1xuXG4gICAgICAgIGlmIChGaWVsZFV0aWxzLmlzRmllbGREaXNhYmxlZChmaWVsZCwgZGlzcGxheU1vZGUsIFwiXCIpKSB7XG4gICAgICAgICAgb3B0c1tvcHQua2V5XS5kaXNhYmxlKCk7XG4gICAgICAgIH1cblxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvcHRzO1xuICB9XG5cbiAgc3RhdGljIGdldFBhcmFncmFwaEZpZWxkcyhkaXNwbGF5TW9kZTogRm9ybURpYXBseU1vZGUsIGZpZWxkOiBGaWVsZCwgZmllbGRWYWx1ZXM6IE1hcDxzdHJpbmcsIGFueT4pOiBhbnkge1xuICAgIGxldCBmaWVsZENvbnRleHRzID0ge307XG5cbiAgICBpZiAoQ29sbGVjdGlvblV0aWxzLmlzRW1wdHkoZmllbGRWYWx1ZXMpKSB7XG4gICAgICBmaWVsZFZhbHVlcyA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gICAgfVxuXG4gICAgaWYgKCg8UGFyYWdyYXBoRmllbGQ+IGZpZWxkKS5maWVsZENvbnRleHRzICYmIE9iamVjdC5rZXlzKCg8UGFyYWdyYXBoRmllbGQ+IGZpZWxkKS5maWVsZENvbnRleHRzKS5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXMoKDxQYXJhZ3JhcGhGaWVsZD4gZmllbGQpLmZpZWxkQ29udGV4dHMpKSB7XG4gICAgICAgIGxldCBmaWVsZENvbnRleHRLZXkgPSAoPFBhcmFncmFwaEZpZWxkPiBmaWVsZCkuZmllbGRDb250ZXh0c1trZXldO1xuXG4gICAgICAgIGxldCB2YWxpZGF0aW9uczogQXJyYXk8VmFsaWRhdG9yRm4+ID0gdGhpcy5nZXRGaWVsZFZhbGlkYXRpb24oZmllbGRDb250ZXh0S2V5KTtcbiAgICAgICAgZmllbGRDb250ZXh0c1tmaWVsZENvbnRleHRLZXkua2V5XSA9IG5ldyBGb3JtQ29udHJvbChmaWVsZFZhbHVlc1tmaWVsZENvbnRleHRLZXkua2V5XSwgdmFsaWRhdGlvbnMpO1xuXG4gICAgICAgIGlmIChGaWVsZFV0aWxzLmlzRmllbGREaXNhYmxlZChmaWVsZCwgZGlzcGxheU1vZGUsIFwiXCIpKSB7XG4gICAgICAgICAgZmllbGRDb250ZXh0c1tmaWVsZENvbnRleHRLZXkua2V5XS5kaXNhYmxlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmllbGRDb250ZXh0cztcbiAgfVxuXG4gIHN0YXRpYyBzZXRGb3JtR3JvdXAoZGlzcGxheU1vZGU6IEZvcm1EaWFwbHlNb2RlLCBmaWVsZDogRmllbGQsIHZhbHVlOiBhbnksIHZhbGlkYXRpb25zOiBBcnJheTxWYWxpZGF0b3JGbj4pOiBGb3JtR3JvdXAge1xuICAgIGxldCBmb3JtR3JvdXA6IEZvcm1Hcm91cDtcblxuICAgIGlmIChmaWVsZC52YWxpZGF0aW9ucyAmJiBmaWVsZC52YWxpZGF0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3JtR3JvdXAgPSBuZXcgRm9ybUdyb3VwKHZhbHVlLCB2YWxpZGF0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcm1Hcm91cCA9IG5ldyBGb3JtR3JvdXAodmFsdWUpO1xuICAgIH1cblxuICAgIGlmICgoRmllbGRVdGlscy5pc0ZpZWxkRGlzYWJsZWQoZmllbGQsIGRpc3BsYXlNb2RlLCB2YWx1ZSkgfHwgZmllbGQuaXNSZWFkT25seSB8fCBmaWVsZC50eXBlID09IEZpZWxkVHlwZS5ISURERU4pICYmICFTdHJpbmdVdGlscy5pc0VtcHR5KHZhbHVlKSkge1xuICAgICAgZm9ybUdyb3VwLmRpc2FibGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZm9ybUdyb3VwO1xuICB9XG5cbiAgc3RhdGljIHNldEZvcm1Db250cm9sKGRpc3BsYXlNb2RlOiBGb3JtRGlhcGx5TW9kZSwgZmllbGQ6IEZpZWxkLCB2YWx1ZTogYW55LCB2YWxpZGF0aW9uczogQXJyYXk8VmFsaWRhdG9yRm4+KTogRm9ybUNvbnRyb2wge1xuICAgIGxldCBmb3JtQ29udHJvbDogRm9ybUNvbnRyb2w7XG5cbiAgICBpZiAoZmllbGQudmFsaWRhdGlvbnMgJiYgZmllbGQudmFsaWRhdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgZm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2wodmFsdWUsIHZhbGlkYXRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2wodmFsdWUpO1xuICAgIH1cblxuICAgIGlmIChGaWVsZFV0aWxzLmlzRmllbGREaXNhYmxlZChmaWVsZCwgZGlzcGxheU1vZGUsIHZhbHVlKSkge1xuICAgICAgZm9ybUNvbnRyb2wuZGlzYWJsZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3JtQ29udHJvbC5lbmFibGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZm9ybUNvbnRyb2w7XG4gIH1cblxuICBzdGF0aWMgZ2V0Rm9ybUZpZWxkVmFsdWUocmVjb3JkOiBhbnksIGZvcm1GaWVsZDogRm9ybUZpZWxkKTogYW55IHtcbiAgICBsZXQgdmFsdWU6IGFueTtcbiAgICBsZXQgZmllbGRWYWx1ZSA9IEZvcm1VdGlscy5nZXRWYWx1ZVZpYUV2YWwocmVjb3JkLCBmb3JtRmllbGQuZmllbGQua2V5KTtcblxuICAgIGlmIChmb3JtRmllbGQuYWRkTW9yZSkge1xuICAgICAgbGV0IGVsZW1lbnRzOiBBcnJheTxhbnk+ID0gbmV3IEFycmF5PGFueT4oKTtcbiAgICAgIGlmICghT2JqZWN0VXRpbHMuaXNFbXB0eShyZWNvcmQpICYmICFDb2xsZWN0aW9uVXRpbHMuaXNFbXB0eShmaWVsZFZhbHVlKSAmJiBpc0FycmF5KGZpZWxkVmFsdWUpKSB7XG4gICAgICAgIGVsZW1lbnRzID0gZmllbGRWYWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnRzLnB1c2goXCJcIik7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGNudCA9IDA7IGNudCA8IGVsZW1lbnRzLmxlbmd0aDsgY250KyspIHtcbiAgICAgICAgZWxlbWVudHNbY250XSA9IHRoaXMuZ2V0RmllbGRWYWx1ZShlbGVtZW50c1tjbnRdLCBmb3JtRmllbGQuZmllbGQpO1xuICAgICAgfVxuICAgICAgdmFsdWUgPSBlbGVtZW50cztcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHJlY29yZFZhbHVlID0gXCJcIjtcbiAgICAgIGlmIChyZWNvcmQgJiYgZmllbGRWYWx1ZSkge1xuICAgICAgICByZWNvcmRWYWx1ZSA9IGZpZWxkVmFsdWU7XG4gICAgICB9XG4gICAgICB2YWx1ZSA9IHRoaXMuZ2V0RmllbGRWYWx1ZShyZWNvcmRWYWx1ZSwgZm9ybUZpZWxkLmZpZWxkKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICBzdGF0aWMgZ2V0RmllbGRWYWx1ZShyZWNvcmRWYWx1ZTogYW55LCBmaWVsZDogRmllbGQpOiBhbnkge1xuICAgIGxldCB2YWx1ZTogYW55ID0gbnVsbDtcblxuICAgIGlmIChmaWVsZC52YWx1ZSkge1xuICAgICAgdmFsdWUgPSBmaWVsZC52YWx1ZTtcbiAgICB9XG4gICAgaWYgKCFTdHJpbmdVdGlscy5pc0VtcHR5KHJlY29yZFZhbHVlKSkge1xuICAgICAgdmFsdWUgPSByZWNvcmRWYWx1ZTtcbiAgICB9XG4gICAgaWYgKHZhbHVlID09IHVuZGVmaW5lZCB8fCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgPT09ICd7fScpIHtcbiAgICAgIHZhbHVlID0gXCJcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBzdGF0aWMgcmVzZXQoZm9ybTogRm9ybUdyb3VwLCBmb3JtQ29uZmlnPzogRm9ybSk6IHZvaWQge1xuICAgIGZvcm0ucmVzZXQoKTtcblxuICAgIGlmIChmb3JtQ29uZmlnICE9IG51bGwpIHtcbiAgICAgIGZvciAobGV0IGZpZWxkIG9mIGZvcm1Db25maWcuZm9ybUZpZWxkcykge1xuICAgICAgICBpZiAoKDxGaWVsZD5maWVsZC5maWVsZCkudHlwZSA9PSBGaWVsZFR5cGUuQVVUT0NPTVBMRVRFKSB7XG4gICAgICAgICAgZmllbGRbJ2RlZmF1bHQnXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0VmFsdWVWaWFFdmFsKHJlY29yZDogYW55LCBrZXk6IHN0cmluZyk6IGFueSB7XG4gICAgbGV0IHZhbHVlID0gXCJcIjtcbiAgICB0cnkge1xuICAgICAgaWYgKFN0cmluZ1V0aWxzLmlzRW1wdHkodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlID0gcmVjb3JkW2tleV07XG4gICAgICB9XG4gICAgICB2YWx1ZSA9IGV2YWwoXCJyZWNvcmQuXCIgKyBrZXkpO1xuICAgIH0gY2F0Y2ggKGUpIHsgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgc3RhdGljIHNldE9wdGlvbnNVc2luZ0tleShmb3JtOiBGb3JtLCBmaWVsZEtleTogc3RyaW5nLCBtYXN0ZXJEYXRhS2V5OiBzdHJpbmcpIHtcbiAgICBpZiAoIUNvbGxlY3Rpb25VdGlscy5pc0VtcHR5KGZvcm0pICYmICFDb2xsZWN0aW9uVXRpbHMuaXNFbXB0eShmb3JtLmZvcm1GaWVsZHMpKSB7XG4gICAgICBmb3JtLmZvcm1GaWVsZHMuZm9yRWFjaChmb3JtRmllbGQgPT4ge1xuICAgICAgICBpZiAoIUNvbGxlY3Rpb25VdGlscy5pc0VtcHR5KGZvcm1GaWVsZCkgJiYgIUNvbGxlY3Rpb25VdGlscy5pc0VtcHR5KGZvcm1GaWVsZC5maWVsZCkpIHtcbiAgICAgICAgICBpZiAoZm9ybUZpZWxkLmZpZWxkLmtleSA9PSBmaWVsZEtleSAmJiAoZm9ybUZpZWxkLmZpZWxkLnR5cGUgPT0gRmllbGRUeXBlLkFVVE9DT01QTEVURSB8fCBmb3JtRmllbGQuZmllbGQudHlwZSA9PSBGaWVsZFR5cGUuQ0hFQ0tCT1ggfHwgZm9ybUZpZWxkLmZpZWxkLnR5cGUgPT0gRmllbGRUeXBlLlJBRElPIHx8IGZvcm1GaWVsZC5maWVsZC50eXBlID09IEZpZWxkVHlwZS5EUk9QRE9XTikpIHtcbiAgICAgICAgICAgIEZpZWxkVXRpbHMuc2V0T3B0aW9uc1VzaW5nS2V5KDxBdXRvY29tcGxldGVGaWVsZCB8IFJhZGlvRmllbGQgfCBDaGVja2JveEZpZWxkIHwgRHJvcGRvd25GaWVsZD5mb3JtRmllbGQuZmllbGQsIG1hc3RlckRhdGFLZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgc2V0T3B0aW9uc1VzaW5nVmFsdWVzKGZvcm06IEZvcm0sIGZpZWxkS2V5OiBzdHJpbmcsIGtleU1hcDogS2V5TWFwLCByZWxhb2RBbGw6IGJvb2xlYW4sIHJlY29yZDogYW55KSB7XG4gICAgaWYgKCFDb2xsZWN0aW9uVXRpbHMuaXNFbXB0eShmb3JtKSAmJiAhQ29sbGVjdGlvblV0aWxzLmlzRW1wdHkoZm9ybS5mb3JtRmllbGRzKSkge1xuICAgICAgZm9ybS5mb3JtRmllbGRzLmZvckVhY2goZm9ybUZpZWxkID0+IHtcbiAgICAgICAgaWYgKCFDb2xsZWN0aW9uVXRpbHMuaXNFbXB0eShmb3JtRmllbGQpICYmICFDb2xsZWN0aW9uVXRpbHMuaXNFbXB0eShmb3JtRmllbGQuZmllbGQpKSB7XG4gICAgICAgICAgbGV0IGlzTWF0Y2hpbmdEZXBlbmRlbmRLZXlNYXA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICBpZiAoIVN0cmluZ1V0aWxzLmlzRW1wdHkoKDxBdXRvY29tcGxldGVGaWVsZCB8IFJhZGlvRmllbGQgfCBDaGVja2JveEZpZWxkIHwgRHJvcGRvd25GaWVsZD5mb3JtRmllbGQuZmllbGQpLm9wdGlvbkRlcGVuZHNPbikpIHtcbiAgICAgICAgICAgIC8vICBnZXQgb3B0aW9uRGVwZW5kc09uIGZpZWxkIHZhbHVlXG4gICAgICAgICAgICBsZXQgb3B0aW9uRGVwZW5kc09uVmFsdWUgPSBGb3JtVXRpbHMuZ2V0VmFsdWVWaWFFdmFsKHJlY29yZCwgKDxBdXRvY29tcGxldGVGaWVsZCB8IFJhZGlvRmllbGQgfCBDaGVja2JveEZpZWxkIHwgRHJvcGRvd25GaWVsZD5mb3JtRmllbGQuZmllbGQpLm9wdGlvbkRlcGVuZHNPbik7XG5cbiAgICAgICAgICAgIGlmIChrZXlNYXAub3B0aW9uRGVwZW5kc09uVmFsdWUgPT0gb3B0aW9uRGVwZW5kc09uVmFsdWUpIHtcbiAgICAgICAgICAgICAgaXNNYXRjaGluZ0RlcGVuZGVuZEtleU1hcCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlzTWF0Y2hpbmdEZXBlbmRlbmRLZXlNYXAgPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChmb3JtRmllbGQuZmllbGQua2V5ID09IGZpZWxkS2V5ICYmIChmb3JtRmllbGQuZmllbGQudHlwZSA9PSBGaWVsZFR5cGUuQVVUT0NPTVBMRVRFIHx8IGZvcm1GaWVsZC5maWVsZC50eXBlID09IEZpZWxkVHlwZS5DSEVDS0JPWCB8fCBmb3JtRmllbGQuZmllbGQudHlwZSA9PSBGaWVsZFR5cGUuUkFESU8gfHwgZm9ybUZpZWxkLmZpZWxkLnR5cGUgPT0gRmllbGRUeXBlLkRST1BET1dOKSkge1xuICAgICAgICAgICAgaWYgKGlzTWF0Y2hpbmdEZXBlbmRlbmRLZXlNYXApIHsvL30gfHwgcmVsYW9kQWxsKSB7XG4gICAgICAgICAgICAgIEZpZWxkVXRpbHMuc2V0T3B0aW9uc1VzaW5nVmFsdWVzKDxBdXRvY29tcGxldGVGaWVsZCB8IFJhZGlvRmllbGQgfCBDaGVja2JveEZpZWxkIHwgRHJvcGRvd25GaWVsZD5mb3JtRmllbGQuZmllbGQsIGtleU1hcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBjaGFuZ2VCdXR0b25MYWJlbEljb24oZm9ybTogRm9ybSwgYnV0dG9uSWRlbnRpZmllcjogc3RyaW5nLCBsYWJlbD86IHN0cmluZywgaWNvbj86IHN0cmluZykge1xuICAgIGlmICghQ29sbGVjdGlvblV0aWxzLmlzRW1wdHkoZm9ybSkgJiYgIUNvbGxlY3Rpb25VdGlscy5pc0VtcHR5KDxGb3JtQnV0dG9uPmZvcm0uYWN0aW9uKSAmJiAhQ29sbGVjdGlvblV0aWxzLmlzRW1wdHkoKDxGb3JtQnV0dG9uPmZvcm0uYWN0aW9uKS5idXR0b25zKSkge1xuICAgICAgKDxGb3JtQnV0dG9uPmZvcm0uYWN0aW9uKS5idXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcblxuICAgICAgICBpZiAoIUNvbGxlY3Rpb25VdGlscy5pc0VtcHR5KGJ1dHRvbikgJiYgYnV0dG9uLmlkZW50aWZpZXIgPT0gYnV0dG9uSWRlbnRpZmllcikge1xuICAgICAgICAgIGlmICghU3RyaW5nVXRpbHMuaXNFbXB0eShsYWJlbCkpIHtcbiAgICAgICAgICAgIGJ1dHRvbi5sYWJlbCA9IGxhYmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIVN0cmluZ1V0aWxzLmlzRW1wdHkoaWNvbikpIHtcbiAgICAgICAgICAgIGJ1dHRvbi5pY29uID0gaWNvblxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn0iXX0=