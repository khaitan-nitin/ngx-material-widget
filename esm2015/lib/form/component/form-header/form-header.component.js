import { Component, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { CollectionUtils, ButtonUtils, FormUtils } from '../../../utility';
import { AbilityUtils } from '../../../utility/ability.utility';
import { Ability } from '@casl/ability';
export class FormHeaderComponent {
    constructor(ability) {
        this.ability = ability;
        this.onFieldChange = new EventEmitter();
        this.onButtonClick = new EventEmitter();
        this.fields = new Array();
        this.buttons = new Array();
        AbilityUtils.setAbility(this.ability);
    }
    ngOnInit() {
        this.getFormHeader();
        this.setIconPosition();
        this.saperateFormActions();
    }
    getFormHeader() {
        let title = this.formHeaderConfig.title;
        this.subtitle = this.formHeaderConfig.subtitle;
        switch (this.formDisplayMode) {
            case "SEARCH" /* SEARCH */: {
                title = this.formHeaderConfig.searchModeTitle ? this.formHeaderConfig.searchModeTitle : title;
            }
            case "ADD" /* ADD */: {
                title = this.formHeaderConfig.addModeTitle ? this.formHeaderConfig.addModeTitle : title;
            }
            case "EDIT" /* EDIT */: {
                title = this.formHeaderConfig.editModeTitle ? this.formHeaderConfig.editModeTitle : title;
            }
            case "VIEW" /* VIEW */: {
                title = this.formHeaderConfig.viewModeTitle ? this.formHeaderConfig.viewModeTitle : title;
            }
            default: {
                title = this.formHeaderConfig.title;
            }
        }
        if (this.widgetArrayIndex != null) {
            title += " - " + (this.widgetArrayIndex + 1);
        }
        this.title = title;
    }
    setIconPosition() {
        this.iconPosition = "BEFORE_TITLE" /* BEFORE_TITLE */;
        if (this.formHeaderConfig.icon && this.formHeaderConfig.icon.position) {
            this.iconPosition = this.formHeaderConfig.icon.position;
        }
    }
    saperateFormActions() {
        if (!CollectionUtils.isEmpty(this.formActions)) {
            this.formActions.forEach(formAction => {
                if (ButtonUtils.instanceOfAnyButtonType(formAction)) {
                    this.buttons.push(formAction);
                }
                else {
                    this.fields.push(formAction);
                }
            });
            this.initFormGroup();
        }
    }
    initFormGroup() {
        if (this.fields && this.fields.length > 0) {
            let formFields = new Array();
            this.fields.map(field => formFields.push({ 'field': field, 'addMore': false }));
            this.form = FormUtils.initFormGroup(formFields, {}, {}, "ADD" /* ADD */);
        }
    }
    fieldChange(fieldChange) {
        //    console.log(fieldChange);
        this.onFieldChange.emit(fieldChange);
    }
    buttonClick(event) {
        this.onButtonClick.emit(event);
    }
}
FormHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'cf-form-header',
                template: "<mat-card-header class=\"cf-form-header\">\n    <mat-icon \n        *ngIf=\"formHeaderConfig.icon && formHeaderConfig.icon.font && iconPosition == 'BEFORE_TITLE'\"\n        mat-card-avatar \n        aria-hidden=\"false\" \n        [style.margin-top.px]=\"subtitle ? 8 : 0\"\n        [attr.aria-label]=\"formHeaderConfig.icon.font\">{{ formHeaderConfig.icon.font }}</mat-icon>\n\n    <mat-card-title class=\"cf-form-header-title\">\n        {{ title }}\n        <mat-icon \n            mat-card-avatar\n            *ngIf=\"formHeaderConfig.icon && formHeaderConfig.icon.font && iconPosition == 'AFTER_TITLE'\"\n            aria-hidden=\"false\" \n            [attr.aria-label]=\"formHeaderConfig.icon.font\"\n            class=\"cf-form-header-after-icon\">\n            {{ formHeaderConfig.icon.font }}</mat-icon>\n    </mat-card-title>\n\n    <mat-card-subtitle class=\"cf-form-header-subtitle\" *ngIf=\"subtitle\">{{ subtitle }}</mat-card-subtitle>\n\n    <div class=\"cf-form-header-buttons\">\n        <cf-field \n            *ngFor=\"let field of fields\"\n            [sourceIdentifier]=\"formIdentifier\" \n            [sourceIndex]=\"sourceIndex\" \n            [widgetArrayIndex]=\"widgetArrayIndex\"\n            [form]=\"form\"\n            [field]=\"field\"\n            [displayMode]=\"formDisplayMode\" \n            [value]=\"\"\n            (onFieldChange)=\"fieldChange($event)\">\n        </cf-field> \n        <!-- {{context | json}} -->\n        <!-- {{ originalData | json }} -->\n        <cf-button-group \n            [buttons]=\"buttons\" \n            [form]=\"form\" \n            [sourceIdentifier]=\"formIdentifier\"\n            [sourceIndex]=\"sourceIndex\"\n            [widgetArrayIndex]=\"widgetArrayIndex\"\n            [context]=\"context\"\n            [originalData]=\"originalData\"\n            (onClick)=\"buttonClick($event)\">\n        </cf-button-group>  \n    </div>\n</mat-card-header>",
                encapsulation: ViewEncapsulation.None,
                styles: [".cf-form-header-buttons{position:absolute;right:0;text-align:right;top:5px}.mat-card-header-text{margin:0 0 10px}.cf-form-header-title{margin-top:0!important}.cf-form-header-after-icon{text-align:center}"]
            },] }
];
FormHeaderComponent.ctorParameters = () => [
    { type: Ability }
];
FormHeaderComponent.propDecorators = {
    form: [{ type: Input }],
    formHeaderConfig: [{ type: Input }],
    description: [{ type: Input }],
    formDisplayMode: [{ type: Input }],
    formIdentifier: [{ type: Input }],
    sourceIndex: [{ type: Input }],
    widgetArrayIndex: [{ type: Input }],
    originalData: [{ type: Input }],
    context: [{ type: Input }],
    formActions: [{ type: Input }],
    onFieldChange: [{ type: Output }],
    onButtonClick: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9uaXRpbmtoYWl0YW4vTml0aW4vc3R1ZHkvYW5ndWxhci9tYXRlcmlhbC9hZG1pbi1idWlsZGVyLXBsdWdpbi9wcm9qZWN0cy9uZ3gtbWF0ZXJpYWwtd2lkZ2V0L3NyYy8iLCJzb3VyY2VzIjpbImxpYi9mb3JtL2NvbXBvbmVudC9mb3JtLWhlYWRlci9mb3JtLWhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUtsRyxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMzRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVF4QyxNQUFNLE9BQU8sbUJBQW1CO0lBb0I5QixZQUFvQixPQUFnQjtRQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBVDFCLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNuQyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFLN0MsV0FBTSxHQUErTSxJQUFJLEtBQUssRUFBMEwsQ0FBQztRQUN6WixZQUFPLEdBQWtCLElBQUksS0FBSyxFQUFVLENBQUM7UUFHM0MsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFB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QUFhLENBQUMsVUFBVSxFQUFFLEVBQUUsRUFBRSxFQUFFLGtCQUFxQixDQUFDO1NBQzdFO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxXQUF3QjtRQUN0QywrQkFBK0I7UUFFM0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFVO1FBQ3BCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7OztZQXZHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsczVEQUEyQztnQkFFM0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3RDOzs7WUFQUSxPQUFPOzs7bUJBU2IsS0FBSzsrQkFDTCxLQUFLOzBCQUNMLEtBQUs7OEJBQ0wsS0FBSzs2QkFDTCxLQUFLOzBCQUNMLEtBQUs7K0JBQ0wsS0FBSzsyQkFDTCxLQUFLO3NCQUNMLEtBQUs7MEJBQ0wsS0FBSzs0QkFDTCxNQUFNOzRCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybURpYXBseU1vZGUsIEZvcm1IZWFkZXIsIEZvcm1GaWVsZCwgRm9ybURlc2NyaXB0aW9uLCBGb3JtVGl0bGVJY29uUG9zaXRpb24gfSBmcm9tICcuLi8uLi9tb2RlbCc7XG5pbXBvcnQgeyBGaWVsZCwgVGV4dEZpZWxkLCBJbnB1dEZpZWxkLCBEcm9wZG93bkZpZWxkLCBJbWFnZUZpZWxkLCBDYWxlbmRhckZpZWxkLCBBdXRvY29tcGxldGVGaWVsZCwgQ2hlY2tib3hGaWVsZCwgRmlsZUZpZWxkLCBSYWRpb0ZpZWxkLCBTbGlkZXJGaWVsZCwgVG9nZ2xlRmllbGQsIEZpZWxkQ2hhbmdlLCBIdG1sRWRpdG9yRmllbGQsIExhYmVsRmllbGQgfSBmcm9tICcuLi8uLi8uLi9maWVsZC9tb2RlbCc7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuLi8uLi8uLi9idXR0b24vbW9kZWwnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29sbGVjdGlvblV0aWxzLCBCdXR0b25VdGlscywgRm9ybVV0aWxzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbGl0eSc7XG5pbXBvcnQgeyBBYmlsaXR5VXRpbHMgfSBmcm9tICcuLi8uLi8uLi91dGlsaXR5L2FiaWxpdHkudXRpbGl0eSc7XG5pbXBvcnQgeyBBYmlsaXR5IH0gZnJvbSAnQGNhc2wvYWJpbGl0eSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NmLWZvcm0taGVhZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Zvcm0taGVhZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZm9ybS1oZWFkZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBGb3JtSGVhZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZm9ybTogRm9ybUdyb3VwO1xuICBASW5wdXQoKSBmb3JtSGVhZGVyQ29uZmlnOiBGb3JtSGVhZGVyO1xuICBASW5wdXQoKSBkZXNjcmlwdGlvbjogRm9ybURlc2NyaXB0aW9uO1xuICBASW5wdXQoKSBmb3JtRGlzcGxheU1vZGU6IEZvcm1EaWFwbHlNb2RlO1xuICBASW5wdXQoKSBmb3JtSWRlbnRpZmllcjogc3RyaW5nO1xuICBASW5wdXQoKSBzb3VyY2VJbmRleDogbnVtYmVyO1xuICBASW5wdXQoKSB3aWRnZXRBcnJheUluZGV4OiBudW1iZXI7XG4gIEBJbnB1dCgpIG9yaWdpbmFsRGF0YTogYW55O1xuICBASW5wdXQoKSBjb250ZXh0OiBhbnk7XG4gIEBJbnB1dCgpIGZvcm1BY3Rpb25zOiBBcnJheTxGaWVsZCB8IFRleHRGaWVsZCB8IExhYmVsRmllbGQgfCBJbnB1dEZpZWxkIHwgRHJvcGRvd25GaWVsZCB8IEh0bWxFZGl0b3JGaWVsZCB8IEltYWdlRmllbGQgfCBDYWxlbmRhckZpZWxkIHwgQXV0b2NvbXBsZXRlRmllbGQgfCBDaGVja2JveEZpZWxkIHwgRmlsZUZpZWxkIHwgUmFkaW9GaWVsZCB8IFNsaWRlckZpZWxkIHwgVG9nZ2xlRmllbGQgfCBCdXR0b24+O1xuICBAT3V0cHV0KCkgb25GaWVsZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTsgIFxuICBAT3V0cHV0KCkgb25CdXR0b25DbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICB0aXRsZTogc3RyaW5nO1xuICBzdWJ0aXRsZTogc3RyaW5nO1xuICBpY29uUG9zaXRpb246IEZvcm1UaXRsZUljb25Qb3NpdGlvbjtcbiAgZmllbGRzOiBBcnJheTxGaWVsZCB8IFRleHRGaWVsZCB8IExhYmVsRmllbGQgfCBJbnB1dEZpZWxkIHwgRHJvcGRvd25GaWVsZCB8IEh0bWxFZGl0b3JGaWVsZCB8IEltYWdlRmllbGQgfCBDYWxlbmRhckZpZWxkIHwgQXV0b2NvbXBsZXRlRmllbGQgfCBDaGVja2JveEZpZWxkIHwgRmlsZUZpZWxkIHwgUmFkaW9GaWVsZCB8IFNsaWRlckZpZWxkIHwgVG9nZ2xlRmllbGQ+ID0gbmV3IEFycmF5PEZpZWxkIHwgVGV4dEZpZWxkIHwgSW5wdXRGaWVsZCB8IERyb3Bkb3duRmllbGQgfCBIdG1sRWRpdG9yRmllbGQgfCBJbWFnZUZpZWxkIHwgQ2FsZW5kYXJGaWVsZCB8IEF1dG9jb21wbGV0ZUZpZWxkIHwgQ2hlY2tib3hGaWVsZCB8IEZpbGVGaWVsZCB8IFJhZGlvRmllbGQgfCBTbGlkZXJGaWVsZCB8IFRvZ2dsZUZpZWxkPigpO1xuICBidXR0b25zOiBBcnJheTxCdXR0b24+ID0gbmV3IEFycmF5PEJ1dHRvbj4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFiaWxpdHk6IEFiaWxpdHkpIHsgXG4gICAgQWJpbGl0eVV0aWxzLnNldEFiaWxpdHkodGhpcy5hYmlsaXR5KTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZ2V0Rm9ybUhlYWRlcigpO1xuICAgIHRoaXMuc2V0SWNvblBvc2l0aW9uKCk7XG4gICAgdGhpcy5zYXBlcmF0ZUZvcm1BY3Rpb25zKCk7IFxuICB9XG5cbiAgZ2V0Rm9ybUhlYWRlcigpOiB2b2lkIHtcbiAgICBsZXQgdGl0bGU6IHN0cmluZyA9IHRoaXMuZm9ybUhlYWRlckNvbmZpZy50aXRsZTtcbiAgICB0aGlzLnN1YnRpdGxlID0gdGhpcy5mb3JtSGVhZGVyQ29uZmlnLnN1YnRpdGxlO1xuXG4gICAgc3dpdGNoICh0aGlzLmZvcm1EaXNwbGF5TW9kZSkge1xuICAgICAgY2FzZSBGb3JtRGlhcGx5TW9kZS5TRUFSQ0g6IHtcbiAgICAgICAgdGl0bGUgPSB0aGlzLmZvcm1IZWFkZXJDb25maWcuc2VhcmNoTW9kZVRpdGxlID8gdGhpcy5mb3JtSGVhZGVyQ29uZmlnLnNlYXJjaE1vZGVUaXRsZSA6IHRpdGxlO1xuICAgICAgfVxuICAgICAgY2FzZSBGb3JtRGlhcGx5TW9kZS5BREQ6IHtcbiAgICAgICAgdGl0bGUgPSB0aGlzLmZvcm1IZWFkZXJDb25maWcuYWRkTW9kZVRpdGxlID8gdGhpcy5mb3JtSGVhZGVyQ29uZmlnLmFkZE1vZGVUaXRsZSA6IHRpdGxlO1xuICAgICAgfVxuICAgICAgY2FzZSBGb3JtRGlhcGx5TW9kZS5FRElUOiB7XG4gICAgICAgIHRpdGxlID0gdGhpcy5mb3JtSGVhZGVyQ29uZmlnLmVkaXRNb2RlVGl0bGUgPyB0aGlzLmZvcm1IZWFkZXJDb25maWcuZWRpdE1vZGVUaXRsZSA6IHRpdGxlO1xuICAgICAgfVxuICAgICAgY2FzZSBGb3JtRGlhcGx5TW9kZS5WSUVXOiB7XG4gICAgICAgIHRpdGxlID0gdGhpcy5mb3JtSGVhZGVyQ29uZmlnLnZpZXdNb2RlVGl0bGUgPyB0aGlzLmZvcm1IZWFkZXJDb25maWcudmlld01vZGVUaXRsZSA6IHRpdGxlO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICB0aXRsZSA9IHRoaXMuZm9ybUhlYWRlckNvbmZpZy50aXRsZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy53aWRnZXRBcnJheUluZGV4ICE9IG51bGwpICB7XG4gICAgICB0aXRsZSArPSBcIiAtIFwiICsgKHRoaXMud2lkZ2V0QXJyYXlJbmRleCArIDEpO1xuICAgIH1cblxuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgfVxuXG4gIHNldEljb25Qb3NpdGlvbigpIHtcbiAgICB0aGlzLmljb25Qb3NpdGlvbiA9IEZvcm1UaXRsZUljb25Qb3NpdGlvbi5CRUZPUkVfVElUTEU7XG4gICAgaWYgKHRoaXMuZm9ybUhlYWRlckNvbmZpZy5pY29uICYmIHRoaXMuZm9ybUhlYWRlckNvbmZpZy5pY29uLnBvc2l0aW9uKSAge1xuICAgICAgdGhpcy5pY29uUG9zaXRpb24gPSB0aGlzLmZvcm1IZWFkZXJDb25maWcuaWNvbi5wb3NpdGlvbjtcbiAgICB9XG4gIH1cblxuICBzYXBlcmF0ZUZvcm1BY3Rpb25zKCkge1xuICAgIGlmICghQ29sbGVjdGlvblV0aWxzLmlzRW1wdHkodGhpcy5mb3JtQWN0aW9ucykpIHtcbiAgICAgIHRoaXMuZm9ybUFjdGlvbnMuZm9yRWFjaChmb3JtQWN0aW9uID0+IHtcbiAgICAgICAgaWYgKEJ1dHRvblV0aWxzLmluc3RhbmNlT2ZBbnlCdXR0b25UeXBlKGZvcm1BY3Rpb24pKSB7XG4gICAgICAgICAgdGhpcy5idXR0b25zLnB1c2goPEJ1dHRvbj5mb3JtQWN0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmZpZWxkcy5wdXNoKDxGaWVsZCB8IFRleHRGaWVsZCB8IExhYmVsRmllbGQgfCBJbnB1dEZpZWxkIHwgRHJvcGRvd25GaWVsZCB8IEh0bWxFZGl0b3JGaWVsZCB8IEltYWdlRmllbGQgfCBDYWxlbmRhckZpZWxkIHwgQXV0b2NvbXBsZXRlRmllbGQgfCBDaGVja2JveEZpZWxkIHwgRmlsZUZpZWxkIHwgUmFkaW9GaWVsZCB8IFNsaWRlckZpZWxkIHwgVG9nZ2xlRmllbGQ+Zm9ybUFjdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIHRoaXMuaW5pdEZvcm1Hcm91cCgpO1xuICAgIH1cbiAgfVxuXG4gIGluaXRGb3JtR3JvdXAoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZmllbGRzICYmIHRoaXMuZmllbGRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBmb3JtRmllbGRzOiBBcnJheTxGb3JtRmllbGQ+ID0gbmV3IEFycmF5PEZvcm1GaWVsZD4oKTtcbiAgICAgIHRoaXMuZmllbGRzLm1hcChmaWVsZCA9PiBmb3JtRmllbGRzLnB1c2goeyAnZmllbGQnOiBmaWVsZCwgJ2FkZE1vcmUnOiBmYWxzZSB9KSk7XG5cbiAgICAgIHRoaXMuZm9ybSA9IEZvcm1VdGlscy5pbml0Rm9ybUdyb3VwKGZvcm1GaWVsZHMsIHt9LCB7fSwgRm9ybURpYXBseU1vZGUuQUREKTtcbiAgICB9XG4gIH1cblxuICBmaWVsZENoYW5nZShmaWVsZENoYW5nZTogRmllbGRDaGFuZ2UpIHtcbi8vICAgIGNvbnNvbGUubG9nKGZpZWxkQ2hhbmdlKTtcblxuICAgIHRoaXMub25GaWVsZENoYW5nZS5lbWl0KGZpZWxkQ2hhbmdlKTsgXG4gIH1cblxuICBidXR0b25DbGljayhldmVudDogYW55KSB7XG4gICAgdGhpcy5vbkJ1dHRvbkNsaWNrLmVtaXQoZXZlbnQpO1xuICB9XG59XG4iXX0=