import { FormGroup, FormControl, FormArray } from '@angular/forms';
//import { isArray } from 'util';
import { ObjectUtils } from './object.utility';
import { CollectionUtils } from './collection.utility';
import { StringUtils } from './string.utility';
import { FieldUtils } from './field.utility';
import { DependentUtils } from './dependent.utility';
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
            if (!ObjectUtils.isEmpty(record) && !CollectionUtils.isEmpty(fieldValue) && Array.isArray(fieldValue)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS51dGlsaXR5LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9uaXRpbmtoYWl0YW4vTml0aW4vc3R1ZHkvYW5ndWxhci9tYXRlcmlhbC9hZG1pbi1idWlsZGVyLXBsdWdpbi9wcm9qZWN0cy9uZ3gtbWF0ZXJpYWwtd2lkZ2V0L3NyYy8iLCJzb3VyY2VzIjpbImxpYi91dGlsaXR5L2Zvcm0udXRpbGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBZSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRixpQ0FBaUM7QUFDakMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVyRCxNQUFNLE9BQU8sU0FBUztJQUNwQixNQUFNLENBQUMsYUFBYSxDQUFDLFdBQTJCO1FBQzlDLElBQUksV0FBVywyQkFBMEIsSUFBSSxXQUFXLHFCQUF1QixFQUFFO1lBQy9FLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFlLEVBQUUsS0FBWTtRQUMvQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMvQjtJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsbUJBQW1CLENBQUMsWUFBeUI7UUFD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ZSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxJQUFJLGdCQUFnQixFQUFFO29CQUM3RSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTt3QkFDL0IsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7cUJBQ3RCO29CQUNELElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUM5QixNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtxQkFDbkI7aUJBQ0Y7WUFDSCxDQUFDLENBQUMsQ0FBQTtTQUNIO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybURpYXBseU1vZGUsIEZvcm0sIEZvcm1GaWVsZCwgRm9ybUJ1dHRvbiB9IGZyb20gJy4uL2Zvcm0vbW9kZWwnO1xuaW1wb3J0IHsgRmllbGQsIEZpZWxkVHlwZSwgQXV0b2NvbXBsZXRlRmllbGQsIFJhZGlvRmllbGQsIENoZWNrYm94RmllbGQsIERyb3Bkb3duRmllbGQsIEtleU1hcCwgRGVwZW5kZW50T25GaWVsZCwgQ2FsZW5kYXJGaWVsZCwgUGFyYWdyYXBoRmllbGQgfSBmcm9tICcuLi9maWVsZC9tb2RlbCc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1Db250cm9sLCBWYWxpZGF0b3JGbiwgRm9ybUFycmF5IH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuLy9pbXBvcnQgeyBpc0FycmF5IH0gZnJvbSAndXRpbCc7XG5pbXBvcnQgeyBPYmplY3RVdGlscyB9IGZyb20gJy4vb2JqZWN0LnV0aWxpdHknO1xuaW1wb3J0IHsgQ29sbGVjdGlvblV0aWxzIH0gZnJvbSAnLi9jb2xsZWN0aW9uLnV0aWxpdHknO1xuaW1wb3J0IHsgU3RyaW5nVXRpbHMgfSBmcm9tICcuL3N0cmluZy51dGlsaXR5JztcbmltcG9ydCB7IEZpZWxkVXRpbHMgfSBmcm9tICcuL2ZpZWxkLnV0aWxpdHknO1xuaW1wb3J0IHsgRGVwZW5kZW50VXRpbHMgfSBmcm9tICcuL2RlcGVuZGVudC51dGlsaXR5JztcblxuZXhwb3J0IGNsYXNzIEZvcm1VdGlscyB7XG4gIHN0YXRpYyBpc0Zvcm1EaXNhYmxlKGRpc3BsYXlNb2RlOiBGb3JtRGlhcGx5TW9kZSk6IGJvb2xlYW4ge1xuICAgIGlmIChkaXNwbGF5TW9kZSA9PSBGb3JtRGlhcGx5TW9kZS5CTE9DS0VEIHx8IGRpc3BsYXlNb2RlID09IEZvcm1EaWFwbHlNb2RlLlZJRVcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7IFxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBkaXNhYmxlRmllbGQoZm9ybTogRm9ybUdyb3VwLCBmaWVsZDogRmllbGQpOiB2b2lkIHtcbiAgICBpZiAoZm9ybSAmJiBmb3JtLmdldChmaWVsZC5rZXkpKSB7XG4gICAgICBmb3JtLmdldChmaWVsZC5rZXkpLmRpc2FibGUoKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZGlzYWJsZUZpZWxkQ29udHJvbChmaWVsZENvbnRyb2w6IEZvcm1Db250cm9sKTogdm9pZCB7XG4gICAgaWYgKGZpZWxkQ29udHJvbCkge1xuICAgICAgZmllbGRDb250cm9sLmRpc2FibGUoKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgY2hlY2tVbmlxdWVJZGVudGlmaWVyKGZvcm1zOiBBcnJheTxGb3JtPikge1xuICAgIC8vICBUT0RPOiBcbiAgfVxuXG4gIHN0YXRpYyBnZXRSYXdWYWx1ZShmb3JtOiBGb3JtR3JvdXApIHtcbiAgICBsZXQgZm9ybVZhbHVlOiBhbnkgPSB7fTtcblxuICAgIGlmIChmb3JtKSB7XG4gICAgICBmb3JtVmFsdWUgPSBmb3JtLmdldFJhd1ZhbHVlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvcm1WYWx1ZTtcbiAgfVxuXG4gIHN0YXRpYyBpbml0Rm9ybUdyb3VwKGZvcm1GaWVsZHM6IEFycmF5PEZvcm1GaWVsZD4sIHN1cHBvcnRpbmdSZWNvcmQ6IGFueSwgcmVjb3JkOiBhbnksIGRpc3BsYXlNb2RlOiBGb3JtRGlhcGx5TW9kZSk6IEZvcm1Hcm91cCB7XG4gICAgbGV0IGZpZWxkQ29udHJvbHMgPSB7fTtcblxuICAgIGxldCBpc0Zvcm1EaXNhYmxlZCA9IHRoaXMuaXNGb3JtRGlzYWJsZShkaXNwbGF5TW9kZSk7XG5cbiAgICBmb3IgKGxldCBmb3JtRmllbGQgb2YgZm9ybUZpZWxkcykge1xuICAgICAgLy8gaWYgKCFDb2xsZWN0aW9uVXRpbHMuaXNFbXB0eShyZWNvcmQpKSB7XG4gICAgICBGb3JtVXRpbHMuaW5pdEZpZWxkR3JvdXAoZmllbGRDb250cm9scywgZm9ybUZpZWxkLCBzdXBwb3J0aW5nUmVjb3JkLCByZWNvcmQsIGRpc3BsYXlNb2RlKTtcbiAgICAgIC8vIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IEZvcm1Hcm91cChmaWVsZENvbnRyb2xzKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRGaWVsZFZhbGlkYXRpb24oZmllbGQ6IEZpZWxkKTogQXJyYXk8VmFsaWRhdG9yRm4+IHtcbiAgICBsZXQgdmFsaWRhdGlvbnM6IEFycmF5PFZhbGlkYXRvckZuPiA9IG5ldyBBcnJheTxWYWxpZGF0b3JGbj4oKTtcbiAgICBpZiAoZmllbGQudmFsaWRhdGlvbnMgJiYgZmllbGQudmFsaWRhdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChsZXQgdmFsIG9mIGZpZWxkLnZhbGlkYXRpb25zKSB7XG4gICAgICAgIHZhbGlkYXRpb25zLnB1c2godmFsLnR5cGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB2YWxpZGF0aW9ucztcbiAgfVxuXG4gIHN0YXRpYyBpbml0RmllbGRHcm91cChmaWVsZENvbnRyb2xzOiBhbnksIGZvcm1GaWVsZDogRm9ybUZpZWxkLCBzdXBwb3J0aW5nUmVjb3JkOiBhbnksIHJlY29yZDogYW55LCBkaXNwbGF5TW9kZTogRm9ybURpYXBseU1vZGUpOiBhbnkge1xuICAgIC8vICAgICAgICBmaWVsZC5oaWRlID0gZmFsc2U7XG4gICAgaWYgKCFEZXBlbmRlbnRVdGlscy5kaXNwbGF5RGVwZW5kZW5jeUZpZWxkKGZvcm1GaWVsZC5maWVsZC5kZXBlbmRlbnRPbkZpZWxkcywgc3VwcG9ydGluZ1JlY29yZCwgcmVjb3JkKSkge1xuICAgICAgaWYgKHJlY29yZCA9PSBudWxsKSB7XG4gICAgICAgIHJlY29yZCA9IHt9O1xuICAgICAgfVxuICAgICAgaWYgKGZvcm1GaWVsZC5hZGRNb3JlKSB7XG4gICAgICAgIHJlY29yZFtmb3JtRmllbGQuZmllbGQua2V5XSA9IFtdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVjb3JkW2Zvcm1GaWVsZC5maWVsZC5rZXldID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIC8vICAgICAgICAgIGZpZWxkLmhpZGUgPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCB2YWxpZGF0aW9uczogQXJyYXk8VmFsaWRhdG9yRm4+ID0gdGhpcy5nZXRGaWVsZFZhbGlkYXRpb24oZm9ybUZpZWxkLmZpZWxkKTtcblxuICAgIGlmIChmb3JtRmllbGQuZmllbGQudHlwZSA9PSBGaWVsZFR5cGUuQ0hFQ0tCT1gpIHtcbiAgICAgIGxldCBmaWVsZFZhbHVlID0gRm9ybVV0aWxzLmdldFZhbHVlVmlhRXZhbChyZWNvcmQsIGZvcm1GaWVsZC5maWVsZC5rZXkpO1xuICAgICAgaWYgKGZvcm1GaWVsZC5hZGRNb3JlKSB7XG4gICAgICAgIGxldCBvcHRpb25zOiBBcnJheTxhbnk+ID0gcmVjb3JkICYmIGZpZWxkVmFsdWUgPyBmaWVsZFZhbHVlIDogbmV3IEFycmF5PGFueT4oKTtcblxuICAgICAgICBmaWVsZENvbnRyb2xzW2Zvcm1GaWVsZC5maWVsZC5rZXldID0gbmV3IEZvcm1BcnJheShbXSk7XG4gICAgICAgIGZvciAobGV0IHZDbnQgPSAwOyB2Q250IDwgb3B0aW9ucy5sZW5ndGg7IHZDbnQrKykge1xuICAgICAgICAgIGxldCBvcHRzID0gdGhpcy5nZXRDaGVja2JveE9wdGlvbihkaXNwbGF5TW9kZSwgZm9ybUZpZWxkLmZpZWxkLCBvcHRpb25zW3ZDbnRdKTtcbiAgICAgICAgICBmaWVsZENvbnRyb2xzW2Zvcm1GaWVsZC5maWVsZC5rZXldLnB1c2godGhpcy5zZXRGb3JtR3JvdXAoZGlzcGxheU1vZGUsIGZvcm1GaWVsZC5maWVsZCwgb3B0cywgdmFsaWRhdGlvbnMpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IG9wdGlvbiA9IHJlY29yZCAmJiBmaWVsZFZhbHVlID8gZmllbGRWYWx1ZSA6IG51bGw7XG5cbiAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmdldENoZWNrYm94T3B0aW9uKGRpc3BsYXlNb2RlLCBmb3JtRmllbGQuZmllbGQsIG9wdGlvbik7XG4gICAgICAgIGZpZWxkQ29udHJvbHNbZm9ybUZpZWxkLmZpZWxkLmtleV0gPSB0aGlzLnNldEZvcm1Hcm91cChkaXNwbGF5TW9kZSwgZm9ybUZpZWxkLmZpZWxkLCBvcHRzLCB2YWxpZGF0aW9ucyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChmb3JtRmllbGQuZmllbGQudHlwZSA9PSBGaWVsZFR5cGUuQ0FMRU5EQVIgJiYgKDxDYWxlbmRhckZpZWxkPmZvcm1GaWVsZC5maWVsZCkuZGF0ZVJhbmdlKSB7XG4gICAgICBsZXQgY29udHJvbHMgPSB7fTtcbiAgICAgIGlmICh2YWxpZGF0aW9ucyAmJiB2YWxpZGF0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnRyb2xzWydzdGFydERhdGUnXSA9IG5ldyBGb3JtQ29udHJvbCgnJyx2YWxpZGF0aW9ucyk7XG4gICAgICAgIGNvbnRyb2xzWydlbmREYXRlJ10gPSBuZXcgRm9ybUNvbnRyb2woJycsIHZhbGlkYXRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRyb2xzWydzdGFydERhdGUnXSA9IG5ldyBGb3JtQ29udHJvbCgnJyk7XG4gICAgICAgIGNvbnRyb2xzWydlbmREYXRlJ10gPSBuZXcgRm9ybUNvbnRyb2woJycpO1xuICAgICAgfVxuICAgICAgZmllbGRDb250cm9sc1tmb3JtRmllbGQuZmllbGQua2V5XSA9IHRoaXMuc2V0Rm9ybUdyb3VwKGRpc3BsYXlNb2RlLCBmb3JtRmllbGQuZmllbGQsIGNvbnRyb2xzLCB2YWxpZGF0aW9ucyk7XG4gICAgfSBlbHNlIGlmIChmb3JtRmllbGQuZmllbGQudHlwZSA9PSBGaWVsZFR5cGUuUEFSQUdSQVBIICYmICFDb2xsZWN0aW9uVXRpbHMuaXNFbXB0eSgoPFBhcmFncmFwaEZpZWxkPmZvcm1GaWVsZC5maWVsZCkuZmllbGRDb250ZXh0cykpIHtcbiAgICAgIGxldCBmaWVsZFZhbHVlID0gRm9ybVV0aWxzLmdldFZhbHVlVmlhRXZhbChyZWNvcmQsIGZvcm1GaWVsZC5maWVsZC5rZXkpO1xuICAgICAgbGV0IGNvbnRyb2xzID0gdGhpcy5nZXRQYXJhZ3JhcGhGaWVsZHMoZGlzcGxheU1vZGUsIGZvcm1GaWVsZC5maWVsZCwgZmllbGRWYWx1ZSk7XG5cbiAgICAgIGZpZWxkQ29udHJvbHNbZm9ybUZpZWxkLmZpZWxkLmtleV0gPSB0aGlzLnNldEZvcm1Hcm91cChkaXNwbGF5TW9kZSwgZm9ybUZpZWxkLmZpZWxkLCBjb250cm9scywgdmFsaWRhdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZm9ybUZpZWxkLmFkZE1vcmUpIHtcbiAgICAgICAgbGV0IHZhbHVlczogQXJyYXk8YW55PiA9IHRoaXMuZ2V0Rm9ybUZpZWxkVmFsdWUocmVjb3JkLCBmb3JtRmllbGQpO1xuXG4gICAgICAgIGZpZWxkQ29udHJvbHNbZm9ybUZpZWxkLmZpZWxkLmtleV0gPSBuZXcgRm9ybUFycmF5KFtdKTtcbiAgICAgICAgaWYgKENvbGxlY3Rpb25VdGlscy5pc0VtcHR5KHZhbHVlcykpIHtcbiAgICAgICAgICBmaWVsZENvbnRyb2xzW2Zvcm1GaWVsZC5maWVsZC5rZXldLnB1c2godGhpcy5zZXRGb3JtQ29udHJvbChkaXNwbGF5TW9kZSwgZm9ybUZpZWxkLmZpZWxkLCBcIlwiLCB2YWxpZGF0aW9ucykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvciAobGV0IHZDbnQgPSAwOyB2Q250IDwgdmFsdWVzLmxlbmd0aDsgdkNudCsrKSB7XG4gICAgICAgICAgICBmaWVsZENvbnRyb2xzW2Zvcm1GaWVsZC5maWVsZC5rZXldLnB1c2godGhpcy5zZXRGb3JtQ29udHJvbChkaXNwbGF5TW9kZSwgZm9ybUZpZWxkLmZpZWxkLCB2YWx1ZXNbdkNudF0sIHZhbGlkYXRpb25zKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgdmFsdWU6IGFueSA9IHRoaXMuZ2V0Rm9ybUZpZWxkVmFsdWUocmVjb3JkLCBmb3JtRmllbGQpXG5cbiAgICAgICAgZmllbGRDb250cm9sc1tmb3JtRmllbGQuZmllbGQua2V5XSA9IHRoaXMuc2V0Rm9ybUNvbnRyb2woZGlzcGxheU1vZGUsIGZvcm1GaWVsZC5maWVsZCwgdmFsdWUsIHZhbGlkYXRpb25zKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmllbGRDb250cm9scztcbiAgfVxuXG4gIHN0YXRpYyBkYXRlUmFuZ2VWYWxpZGF0aW9uKGc6IEZvcm1Hcm91cCkgOiBhbnl7XG4gICAgcmV0dXJuIGcuZ2V0KCdzdGFydERhdGUnKS52YWx1ZSB8fCBnLmdldCgnZW5kRGF0ZScpLnZhbHVlXG4gICAgPyBudWxsIDogeydtaXNtYXRjaCc6IHRydWV9O1xuICB9XG4gIHN0YXRpYyBnZXRDaGVja2JveE9wdGlvbihkaXNwbGF5TW9kZTogRm9ybURpYXBseU1vZGUsIGZpZWxkOiBGaWVsZCwgb3B0aW9uczogQXJyYXk8c3RyaW5nPik6IGFueSB7XG4gICAgbGV0IG9wdHMgPSB7fTtcblxuICAgIGlmIChmaWVsZFsnb3B0aW9ucyddICYmIGZpZWxkWydvcHRpb25zJ10ubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChsZXQgb3B0IG9mIGZpZWxkWydvcHRpb25zJ10pIHtcbiAgICAgICAgaWYgKE9iamVjdFV0aWxzLmlzRW1wdHkob3B0aW9ucykpIHtcbiAgICAgICAgICBpZiAob3B0WydzZWxlY3RlZCddKSAge1xuICAgICAgICAgICAgb3B0LmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSAge1xuICAgICAgICAgICAgb3B0LmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IG9wdGlvblNlbGVjdGVkOiBib29sZWFuID0gb3B0aW9ucy5pbmRleE9mKG9wdC5rZXkpID4gLTE7XG4gICAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9uU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIG9wdC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3B0LmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb3B0c1tvcHQua2V5XSA9IG5ldyBGb3JtQ29udHJvbChvcHQuY2hlY2tlZCk7XG5cbiAgICAgICAgaWYgKEZpZWxkVXRpbHMuaXNGaWVsZERpc2FibGVkKGZpZWxkLCBkaXNwbGF5TW9kZSwgXCJcIikpIHtcbiAgICAgICAgICBvcHRzW29wdC5rZXldLmRpc2FibGUoKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wdHM7XG4gIH1cblxuICBzdGF0aWMgZ2V0UGFyYWdyYXBoRmllbGRzKGRpc3BsYXlNb2RlOiBGb3JtRGlhcGx5TW9kZSwgZmllbGQ6IEZpZWxkLCBmaWVsZFZhbHVlczogTWFwPHN0cmluZywgYW55Pik6IGFueSB7XG4gICAgbGV0IGZpZWxkQ29udGV4dHMgPSB7fTtcblxuICAgIGlmIChDb2xsZWN0aW9uVXRpbHMuaXNFbXB0eShmaWVsZFZhbHVlcykpIHtcbiAgICAgIGZpZWxkVmFsdWVzID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcbiAgICB9XG5cbiAgICBpZiAoKDxQYXJhZ3JhcGhGaWVsZD4gZmllbGQpLmZpZWxkQ29udGV4dHMgJiYgT2JqZWN0LmtleXMoKDxQYXJhZ3JhcGhGaWVsZD4gZmllbGQpLmZpZWxkQ29udGV4dHMpLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cygoPFBhcmFncmFwaEZpZWxkPiBmaWVsZCkuZmllbGRDb250ZXh0cykpIHtcbiAgICAgICAgbGV0IGZpZWxkQ29udGV4dEtleSA9ICg8UGFyYWdyYXBoRmllbGQ+IGZpZWxkKS5maWVsZENvbnRleHRzW2tleV07XG5cbiAgICAgICAgbGV0IHZhbGlkYXRpb25zOiBBcnJheTxWYWxpZGF0b3JGbj4gPSB0aGlzLmdldEZpZWxkVmFsaWRhdGlvbihmaWVsZENvbnRleHRLZXkpO1xuICAgICAgICBmaWVsZENvbnRleHRzW2ZpZWxkQ29udGV4dEtleS5rZXldID0gbmV3IEZvcm1Db250cm9sKGZpZWxkVmFsdWVzW2ZpZWxkQ29udGV4dEtleS5rZXldLCB2YWxpZGF0aW9ucyk7XG5cbiAgICAgICAgaWYgKEZpZWxkVXRpbHMuaXNGaWVsZERpc2FibGVkKGZpZWxkLCBkaXNwbGF5TW9kZSwgXCJcIikpIHtcbiAgICAgICAgICBmaWVsZENvbnRleHRzW2ZpZWxkQ29udGV4dEtleS5rZXldLmRpc2FibGUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmaWVsZENvbnRleHRzO1xuICB9XG5cbiAgc3RhdGljIHNldEZvcm1Hcm91cChkaXNwbGF5TW9kZTogRm9ybURpYXBseU1vZGUsIGZpZWxkOiBGaWVsZCwgdmFsdWU6IGFueSwgdmFsaWRhdGlvbnM6IEFycmF5PFZhbGlkYXRvckZuPik6IEZvcm1Hcm91cCB7XG4gICAgbGV0IGZvcm1Hcm91cDogRm9ybUdyb3VwO1xuXG4gICAgaWYgKGZpZWxkLnZhbGlkYXRpb25zICYmIGZpZWxkLnZhbGlkYXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvcm1Hcm91cCA9IG5ldyBGb3JtR3JvdXAodmFsdWUsIHZhbGlkYXRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9ybUdyb3VwID0gbmV3IEZvcm1Hcm91cCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKChGaWVsZFV0aWxzLmlzRmllbGREaXNhYmxlZChmaWVsZCwgZGlzcGxheU1vZGUsIHZhbHVlKSB8fCBmaWVsZC5pc1JlYWRPbmx5IHx8IGZpZWxkLnR5cGUgPT0gRmllbGRUeXBlLkhJRERFTikgJiYgIVN0cmluZ1V0aWxzLmlzRW1wdHkodmFsdWUpKSB7XG4gICAgICBmb3JtR3JvdXAuZGlzYWJsZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBmb3JtR3JvdXA7XG4gIH1cblxuICBzdGF0aWMgc2V0Rm9ybUNvbnRyb2woZGlzcGxheU1vZGU6IEZvcm1EaWFwbHlNb2RlLCBmaWVsZDogRmllbGQsIHZhbHVlOiBhbnksIHZhbGlkYXRpb25zOiBBcnJheTxWYWxpZGF0b3JGbj4pOiBGb3JtQ29udHJvbCB7XG4gICAgbGV0IGZvcm1Db250cm9sOiBGb3JtQ29udHJvbDtcblxuICAgIGlmIChmaWVsZC52YWxpZGF0aW9ucyAmJiBmaWVsZC52YWxpZGF0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCh2YWx1ZSwgdmFsaWRhdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKEZpZWxkVXRpbHMuaXNGaWVsZERpc2FibGVkKGZpZWxkLCBkaXNwbGF5TW9kZSwgdmFsdWUpKSB7XG4gICAgICBmb3JtQ29udHJvbC5kaXNhYmxlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcm1Db250cm9sLmVuYWJsZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBmb3JtQ29udHJvbDtcbiAgfVxuXG4gIHN0YXRpYyBnZXRGb3JtRmllbGRWYWx1ZShyZWNvcmQ6IGFueSwgZm9ybUZpZWxkOiBGb3JtRmllbGQpOiBhbnkge1xuICAgIGxldCB2YWx1ZTogYW55O1xuICAgIGxldCBmaWVsZFZhbHVlID0gRm9ybVV0aWxzLmdldFZhbHVlVmlhRXZhbChyZWNvcmQsIGZvcm1GaWVsZC5maWVsZC5rZXkpO1xuXG4gICAgaWYgKGZvcm1GaWVsZC5hZGRNb3JlKSB7XG4gICAgICBsZXQgZWxlbWVudHM6IEFycmF5PGFueT4gPSBuZXcgQXJyYXk8YW55PigpO1xuICAgICAgaWYgKCFPYmplY3RVdGlscy5pc0VtcHR5KHJlY29yZCkgJiYgIUNvbGxlY3Rpb25VdGlscy5pc0VtcHR5KGZpZWxkVmFsdWUpICYmIEFycmF5LmlzQXJyYXkoZmllbGRWYWx1ZSkpIHtcbiAgICAgICAgZWxlbWVudHMgPSBmaWVsZFZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudHMucHVzaChcIlwiKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgY250ID0gMDsgY250IDwgZWxlbWVudHMubGVuZ3RoOyBjbnQrKykge1xuICAgICAgICBlbGVtZW50c1tjbnRdID0gdGhpcy5nZXRGaWVsZFZhbHVlKGVsZW1lbnRzW2NudF0sIGZvcm1GaWVsZC5maWVsZCk7XG4gICAgICB9XG4gICAgICB2YWx1ZSA9IGVsZW1lbnRzO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcmVjb3JkVmFsdWUgPSBcIlwiO1xuICAgICAgaWYgKHJlY29yZCAmJiBmaWVsZFZhbHVlKSB7XG4gICAgICAgIHJlY29yZFZhbHVlID0gZmllbGRWYWx1ZTtcbiAgICAgIH1cbiAgICAgIHZhbHVlID0gdGhpcy5nZXRGaWVsZFZhbHVlKHJlY29yZFZhbHVlLCBmb3JtRmllbGQuZmllbGQpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIHN0YXRpYyBnZXRGaWVsZFZhbHVlKHJlY29yZFZhbHVlOiBhbnksIGZpZWxkOiBGaWVsZCk6IGFueSB7XG4gICAgbGV0IHZhbHVlOiBhbnkgPSBudWxsO1xuXG4gICAgaWYgKGZpZWxkLnZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IGZpZWxkLnZhbHVlO1xuICAgIH1cbiAgICBpZiAoIVN0cmluZ1V0aWxzLmlzRW1wdHkocmVjb3JkVmFsdWUpKSB7XG4gICAgICB2YWx1ZSA9IHJlY29yZFZhbHVlO1xuICAgIH1cbiAgICBpZiAodmFsdWUgPT0gdW5kZWZpbmVkIHx8IEpTT04uc3RyaW5naWZ5KHZhbHVlKSA9PT0gJ3t9Jykge1xuICAgICAgdmFsdWUgPSBcIlwiO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHN0YXRpYyByZXNldChmb3JtOiBGb3JtR3JvdXAsIGZvcm1Db25maWc/OiBGb3JtKTogdm9pZCB7XG4gICAgZm9ybS5yZXNldCgpO1xuXG4gICAgaWYgKGZvcm1Db25maWcgIT0gbnVsbCkge1xuICAgICAgZm9yIChsZXQgZmllbGQgb2YgZm9ybUNvbmZpZy5mb3JtRmllbGRzKSB7XG4gICAgICAgIGlmICgoPEZpZWxkPmZpZWxkLmZpZWxkKS50eXBlID09IEZpZWxkVHlwZS5BVVRPQ09NUExFVEUpIHtcbiAgICAgICAgICBmaWVsZFsnZGVmYXVsdCddID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRWYWx1ZVZpYUV2YWwocmVjb3JkOiBhbnksIGtleTogc3RyaW5nKTogYW55IHtcbiAgICBsZXQgdmFsdWUgPSBcIlwiO1xuICAgIHRyeSB7XG4gICAgICBpZiAoU3RyaW5nVXRpbHMuaXNFbXB0eSh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgPSByZWNvcmRba2V5XTtcbiAgICAgIH1cbiAgICAgIHZhbHVlID0gZXZhbChcInJlY29yZC5cIiArIGtleSk7XG4gICAgfSBjYXRjaCAoZSkgeyB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBzdGF0aWMgc2V0T3B0aW9uc1VzaW5nS2V5KGZvcm06IEZvcm0sIGZpZWxkS2V5OiBzdHJpbmcsIG1hc3RlckRhdGFLZXk6IHN0cmluZykge1xuICAgIGlmICghQ29sbGVjdGlvblV0aWxzLmlzRW1wdHkoZm9ybSkgJiYgIUNvbGxlY3Rpb25VdGlscy5pc0VtcHR5KGZvcm0uZm9ybUZpZWxkcykpIHtcbiAgICAgIGZvcm0uZm9ybUZpZWxkcy5mb3JFYWNoKGZvcm1GaWVsZCA9PiB7XG4gICAgICAgIGlmICghQ29sbGVjdGlvblV0aWxzLmlzRW1wdHkoZm9ybUZpZWxkKSAmJiAhQ29sbGVjdGlvblV0aWxzLmlzRW1wdHkoZm9ybUZpZWxkLmZpZWxkKSkge1xuICAgICAgICAgIGlmIChmb3JtRmllbGQuZmllbGQua2V5ID09IGZpZWxkS2V5ICYmIChmb3JtRmllbGQuZmllbGQudHlwZSA9PSBGaWVsZFR5cGUuQVVUT0NPTVBMRVRFIHx8IGZvcm1GaWVsZC5maWVsZC50eXBlID09IEZpZWxkVHlwZS5DSEVDS0JPWCB8fCBmb3JtRmllbGQuZmllbGQudHlwZSA9PSBGaWVsZFR5cGUuUkFESU8gfHwgZm9ybUZpZWxkLmZpZWxkLnR5cGUgPT0gRmllbGRUeXBlLkRST1BET1dOKSkge1xuICAgICAgICAgICAgRmllbGRVdGlscy5zZXRPcHRpb25zVXNpbmdLZXkoPEF1dG9jb21wbGV0ZUZpZWxkIHwgUmFkaW9GaWVsZCB8IENoZWNrYm94RmllbGQgfCBEcm9wZG93bkZpZWxkPmZvcm1GaWVsZC5maWVsZCwgbWFzdGVyRGF0YUtleSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBzZXRPcHRpb25zVXNpbmdWYWx1ZXMoZm9ybTogRm9ybSwgZmllbGRLZXk6IHN0cmluZywga2V5TWFwOiBLZXlNYXAsIHJlbGFvZEFsbDogYm9vbGVhbiwgcmVjb3JkOiBhbnkpIHtcbiAgICBpZiAoIUNvbGxlY3Rpb25VdGlscy5pc0VtcHR5KGZvcm0pICYmICFDb2xsZWN0aW9uVXRpbHMuaXNFbXB0eShmb3JtLmZvcm1GaWVsZHMpKSB7XG4gICAgICBmb3JtLmZvcm1GaWVsZHMuZm9yRWFjaChmb3JtRmllbGQgPT4ge1xuICAgICAgICBpZiAoIUNvbGxlY3Rpb25VdGlscy5pc0VtcHR5KGZvcm1GaWVsZCkgJiYgIUNvbGxlY3Rpb25VdGlscy5pc0VtcHR5KGZvcm1GaWVsZC5maWVsZCkpIHtcbiAgICAgICAgICBsZXQgaXNNYXRjaGluZ0RlcGVuZGVuZEtleU1hcDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgIGlmICghU3RyaW5nVXRpbHMuaXNFbXB0eSgoPEF1dG9jb21wbGV0ZUZpZWxkIHwgUmFkaW9GaWVsZCB8IENoZWNrYm94RmllbGQgfCBEcm9wZG93bkZpZWxkPmZvcm1GaWVsZC5maWVsZCkub3B0aW9uRGVwZW5kc09uKSkge1xuICAgICAgICAgICAgLy8gIGdldCBvcHRpb25EZXBlbmRzT24gZmllbGQgdmFsdWVcbiAgICAgICAgICAgIGxldCBvcHRpb25EZXBlbmRzT25WYWx1ZSA9IEZvcm1VdGlscy5nZXRWYWx1ZVZpYUV2YWwocmVjb3JkLCAoPEF1dG9jb21wbGV0ZUZpZWxkIHwgUmFkaW9GaWVsZCB8IENoZWNrYm94RmllbGQgfCBEcm9wZG93bkZpZWxkPmZvcm1GaWVsZC5maWVsZCkub3B0aW9uRGVwZW5kc09uKTtcblxuICAgICAgICAgICAgaWYgKGtleU1hcC5vcHRpb25EZXBlbmRzT25WYWx1ZSA9PSBvcHRpb25EZXBlbmRzT25WYWx1ZSkge1xuICAgICAgICAgICAgICBpc01hdGNoaW5nRGVwZW5kZW5kS2V5TWFwID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXNNYXRjaGluZ0RlcGVuZGVuZEtleU1hcCA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGZvcm1GaWVsZC5maWVsZC5rZXkgPT0gZmllbGRLZXkgJiYgKGZvcm1GaWVsZC5maWVsZC50eXBlID09IEZpZWxkVHlwZS5BVVRPQ09NUExFVEUgfHwgZm9ybUZpZWxkLmZpZWxkLnR5cGUgPT0gRmllbGRUeXBlLkNIRUNLQk9YIHx8IGZvcm1GaWVsZC5maWVsZC50eXBlID09IEZpZWxkVHlwZS5SQURJTyB8fCBmb3JtRmllbGQuZmllbGQudHlwZSA9PSBGaWVsZFR5cGUuRFJPUERPV04pKSB7XG4gICAgICAgICAgICBpZiAoaXNNYXRjaGluZ0RlcGVuZGVuZEtleU1hcCkgey8vfSB8fCByZWxhb2RBbGwpIHtcbiAgICAgICAgICAgICAgRmllbGRVdGlscy5zZXRPcHRpb25zVXNpbmdWYWx1ZXMoPEF1dG9jb21wbGV0ZUZpZWxkIHwgUmFkaW9GaWVsZCB8IENoZWNrYm94RmllbGQgfCBEcm9wZG93bkZpZWxkPmZvcm1GaWVsZC5maWVsZCwga2V5TWFwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGNoYW5nZUJ1dHRvbkxhYmVsSWNvbihmb3JtOiBGb3JtLCBidXR0b25JZGVudGlmaWVyOiBzdHJpbmcsIGxhYmVsPzogc3RyaW5nLCBpY29uPzogc3RyaW5nKSB7XG4gICAgaWYgKCFDb2xsZWN0aW9uVXRpbHMuaXNFbXB0eShmb3JtKSAmJiAhQ29sbGVjdGlvblV0aWxzLmlzRW1wdHkoPEZvcm1CdXR0b24+Zm9ybS5hY3Rpb24pICYmICFDb2xsZWN0aW9uVXRpbHMuaXNFbXB0eSgoPEZvcm1CdXR0b24+Zm9ybS5hY3Rpb24pLmJ1dHRvbnMpKSB7XG4gICAgICAoPEZvcm1CdXR0b24+Zm9ybS5hY3Rpb24pLmJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xuXG4gICAgICAgIGlmICghQ29sbGVjdGlvblV0aWxzLmlzRW1wdHkoYnV0dG9uKSAmJiBidXR0b24uaWRlbnRpZmllciA9PSBidXR0b25JZGVudGlmaWVyKSB7XG4gICAgICAgICAgaWYgKCFTdHJpbmdVdGlscy5pc0VtcHR5KGxhYmVsKSkge1xuICAgICAgICAgICAgYnV0dG9uLmxhYmVsID0gbGFiZWw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghU3RyaW5nVXRpbHMuaXNFbXB0eShpY29uKSkge1xuICAgICAgICAgICAgYnV0dG9uLmljb24gPSBpY29uXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxufSJdfQ==