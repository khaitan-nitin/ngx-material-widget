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
        this.formInitialized = true;
        AbilityUtils.setAbility(this.ability);
    }
    get formDisplayMode() {
        return this._formDisplayMode;
    }
    set formDisplayMode(_formDisplayMode) {
        while (1) {
            if (this.formInitialized) {
                if (_formDisplayMode != this._formDisplayMode) {
                    this._formDisplayMode = _formDisplayMode;
                    this.init();
                }
                break;
            }
        }
    }
    ngOnInit() {
        this.formInitialized = true;
    }
    init() {
        this.getFormHeader();
        this.setIconPosition();
        this.saperateFormActions();
    }
    getFormHeader() {
        let title = this.formHeaderConfig.title;
        this.subtitle = this.formHeaderConfig.subtitle;
        switch (this._formDisplayMode) {
            case "SEARCH" /* SEARCH */: {
                title = this.formHeaderConfig.searchModeTitle ? this.formHeaderConfig.searchModeTitle : title;
                break;
            }
            case "ADD" /* ADD */: {
                title = this.formHeaderConfig.addModeTitle ? this.formHeaderConfig.addModeTitle : title;
                break;
            }
            case "EDIT" /* EDIT */: {
                title = this.formHeaderConfig.editModeTitle ? this.formHeaderConfig.editModeTitle : title;
                break;
            }
            case "VIEW" /* VIEW */: {
                title = this.formHeaderConfig.viewModeTitle ? this.formHeaderConfig.viewModeTitle : title;
                break;
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
        console.log("1");
        if (!CollectionUtils.isEmpty(this.formActions)) {
            this.buttons = [];
            this.fields = [];
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
            this.fields.map(field => {
                field.alwaysEnable = true;
                formFields.push({ 'field': field, 'addMore': false });
            });
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
                selector: 'mx-form-header',
                template: "<mat-card-header class=\"mx-form-header\">\n    <mat-icon \n        *ngIf=\"formHeaderConfig.icon && formHeaderConfig.icon.font && iconPosition == 'BEFORE_TITLE'\"\n        mat-card-avatar \n        aria-hidden=\"false\" \n        [style.margin-top.px]=\"subtitle ? 8 : 0\"\n        [attr.aria-label]=\"formHeaderConfig.icon.font\">{{ formHeaderConfig.icon.font }}</mat-icon>\n\n    <mat-card-title class=\"mx-form-header-title\">\n        {{ title }}\n        <mat-icon \n            mat-card-avatar\n            *ngIf=\"formHeaderConfig.icon && formHeaderConfig.icon.font && iconPosition == 'AFTER_TITLE'\"\n            aria-hidden=\"false\" \n            [attr.aria-label]=\"formHeaderConfig.icon.font\"\n            class=\"mx-form-header-after-icon\">\n            {{ formHeaderConfig.icon.font }}</mat-icon>\n            <mat-icon \n                *ngIf=\"help && help.message && help.icon\" \n                aria-hidden=\"true\" \n                [attr.aria-label]=\"help.message\" \n                [matTooltip]=\"help.message\"\n                [matTooltipPosition]=\"help.position\"\n                class=\"mx-hint-icon\">\n                {{help.icon ? help.icon : 'live_help'}}\n            </mat-icon>\n    </mat-card-title>\n\n    <mat-card-subtitle class=\"mx-form-header-subtitle\" *ngIf=\"subtitle\">{{ subtitle }}</mat-card-subtitle>\n\n    <div class=\"mx-form-header-buttons\">\n        <!-- {{fields | json}} -->\n        <mx-field \n            *ngFor=\"let field of fields\"\n            [sourceIdentifier]=\"formIdentifier\" \n            [sourceIndex]=\"sourceIndex\" \n            [widgetArrayIndex]=\"widgetArrayIndex\"\n            [form]=\"form\"\n            [fieldControl]=\"form.controls[field.key]\"\n            [field]=\"field\"\n            [displayMode]=\"_formDisplayMode\" \n            [value]=\"\"\n            (onFieldChange)=\"fieldChange($event)\">\n        </mx-field> \n        <span *ngIf=\"fields && fields.length > 0 && buttons && buttons.length > 0\" class=\"mx-form-header-between-action\"></span>\n        <!-- {{context | json}} -->\n        <!-- {{ originalData | json }} -->\n        <!-- --{{_formDisplayMode | json}}==== -->\n        <mx-button-group \n            [buttons]=\"buttons\" \n            [form]=\"form\" \n            [sourceIdentifier]=\"formIdentifier\"\n            [sourceIndex]=\"sourceIndex\"\n            [widgetArrayIndex]=\"widgetArrayIndex\"\n            [formDisplayMode]=\"_formDisplayMode\" \n            [context]=\"context\"\n            [originalData]=\"originalData\"\n            (onClick)=\"buttonClick($event)\">\n        </mx-button-group>  \n    </div>\n</mat-card-header>",
                encapsulation: ViewEncapsulation.None,
                styles: [".mx-form-header-buttons{position:absolute;right:0;text-align:right;top:5px}.mat-card-header-text{margin:0 0 10px}.mx-form-header-title{margin-top:0!important}.mx-form-header-after-icon{text-align:center}.mx-form-header-between-action{margin-right:8px}.mx-hint-icon{font-size:75%}"]
            },] }
];
FormHeaderComponent.ctorParameters = () => [
    { type: Ability }
];
FormHeaderComponent.propDecorators = {
    form: [{ type: Input }],
    formHeaderConfig: [{ type: Input }],
    description: [{ type: Input }],
    help: [{ type: Input }],
    _formDisplayMode: [{ type: Input }],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9uaXRpbmtoYWl0YW4vTml0aW4vc3R1ZHkvYW5ndWxhci9tYXRlcmlhbC9hZG1pbi1idWlsZGVyLXBsdWdpbi9wcm9qZWN0cy9uZ3gtbWF0ZXJpYWwtd2lkZ2V0L3NyYy8iLCJzb3VyY2VzIjpbImxpYi9mb3JtL2NvbXBvbmVudC9mb3JtLWhlYWRlci9mb3JtLWhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUtsRyxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMzRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVF4QyxNQUFNLE9BQU8sbUJBQW1CO0lBdUM5QixZQUFvQixPQUFnQjtRQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBWDFCLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNuQyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFLN0MsV0FBTSxHQUErTSxJQUFJLEtBQUssRUFBMEwsQ0FBQztRQUN6WixZQUFPLEdBQWtCLElBQUksS0FBSyxFQUFVLENBQUM7UUFFN0Msb0JBQWUsR0FBWSxJQUFJLENBQUM7UUFHOUIsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQW5DRCxJQUFJLGVBQWU7UUFDakIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDL0IsQ0FBQztJQUNELElBQ0ksZUFBZSxDQUFDLGdCQUFxQjtRQUN2QyxPQUFPLENBQUMsRUFB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QUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3RDOzs7WUFQUSxPQUFPOzs7bUJBU2IsS0FBSzsrQkFDTCxLQUFLOzBCQUNMLEtBQUs7bUJBQ0wsS0FBSzsrQkFDTCxLQUFLOzhCQUlMLEtBQUs7NkJBYUwsS0FBSzswQkFDTCxLQUFLOytCQUNMLEtBQUs7MkJBQ0wsS0FBSztzQkFDTCxLQUFLOzBCQUNMLEtBQUs7NEJBQ0wsTUFBTTs0QkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1EaWFwbHlNb2RlLCBGb3JtSGVhZGVyLCBGb3JtRmllbGQsIEZvcm1EZXNjcmlwdGlvbiwgRm9ybVRpdGxlSWNvblBvc2l0aW9uLCBGb3JtSGVscCB9IGZyb20gJy4uLy4uL21vZGVsJztcbmltcG9ydCB7IEZpZWxkLCBUZXh0RmllbGQsIElucHV0RmllbGQsIERyb3Bkb3duRmllbGQsIEltYWdlRmllbGQsIENhbGVuZGFyRmllbGQsIEF1dG9jb21wbGV0ZUZpZWxkLCBDaGVja2JveEZpZWxkLCBGaWxlRmllbGQsIFJhZGlvRmllbGQsIFNsaWRlckZpZWxkLCBUb2dnbGVGaWVsZCwgRmllbGRDaGFuZ2UsIEh0bWxFZGl0b3JGaWVsZCwgTGFiZWxGaWVsZCB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkL21vZGVsJztcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4uLy4uLy4uL2J1dHRvbi9tb2RlbCc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uVXRpbHMsIEJ1dHRvblV0aWxzLCBGb3JtVXRpbHMgfSBmcm9tICcuLi8uLi8uLi91dGlsaXR5JztcbmltcG9ydCB7IEFiaWxpdHlVdGlscyB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdHkvYWJpbGl0eS51dGlsaXR5JztcbmltcG9ydCB7IEFiaWxpdHkgfSBmcm9tICdAY2FzbC9hYmlsaXR5JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXgtZm9ybS1oZWFkZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vZm9ybS1oZWFkZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9mb3JtLWhlYWRlci5jb21wb25lbnQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1IZWFkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBmb3JtOiBGb3JtR3JvdXA7XG4gIEBJbnB1dCgpIGZvcm1IZWFkZXJDb25maWc6IEZvcm1IZWFkZXI7XG4gIEBJbnB1dCgpIGRlc2NyaXB0aW9uOiBGb3JtRGVzY3JpcHRpb247XG4gIEBJbnB1dCgpIGhlbHA6IEZvcm1IZWxwO1xuICBASW5wdXQoKSBfZm9ybURpc3BsYXlNb2RlOiBGb3JtRGlhcGx5TW9kZTtcbiAgZ2V0IGZvcm1EaXNwbGF5TW9kZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl9mb3JtRGlzcGxheU1vZGU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGZvcm1EaXNwbGF5TW9kZShfZm9ybURpc3BsYXlNb2RlOiBhbnkpIHtcbiAgICB3aGlsZSAoMSkge1xuICAgICAgaWYgKHRoaXMuZm9ybUluaXRpYWxpemVkKSB7XG4gICAgICAgIGlmIChfZm9ybURpc3BsYXlNb2RlICE9IHRoaXMuX2Zvcm1EaXNwbGF5TW9kZSkge1xuICAgICAgICAgIHRoaXMuX2Zvcm1EaXNwbGF5TW9kZSA9IF9mb3JtRGlzcGxheU1vZGU7XG4gICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgZm9ybUlkZW50aWZpZXI6IHN0cmluZztcbiAgQElucHV0KCkgc291cmNlSW5kZXg6IG51bWJlcjtcbiAgQElucHV0KCkgd2lkZ2V0QXJyYXlJbmRleDogbnVtYmVyO1xuICBASW5wdXQoKSBvcmlnaW5hbERhdGE6IGFueTtcbiAgQElucHV0KCkgY29udGV4dDogYW55O1xuICBASW5wdXQoKSBmb3JtQWN0aW9uczogQXJyYXk8RmllbGQgfCBUZXh0RmllbGQgfCBMYWJlbEZpZWxkIHwgSW5wdXRGaWVsZCB8IERyb3Bkb3duRmllbGQgfCBIdG1sRWRpdG9yRmllbGQgfCBJbWFnZUZpZWxkIHwgQ2FsZW5kYXJGaWVsZCB8IEF1dG9jb21wbGV0ZUZpZWxkIHwgQ2hlY2tib3hGaWVsZCB8IEZpbGVGaWVsZCB8IFJhZGlvRmllbGQgfCBTbGlkZXJGaWVsZCB8IFRvZ2dsZUZpZWxkIHwgQnV0dG9uPjtcbiAgQE91dHB1dCgpIG9uRmllbGRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkJ1dHRvbkNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHRpdGxlOiBzdHJpbmc7XG4gIHN1YnRpdGxlOiBzdHJpbmc7XG4gIGljb25Qb3NpdGlvbjogRm9ybVRpdGxlSWNvblBvc2l0aW9uO1xuICBmaWVsZHM6IEFycmF5PEZpZWxkIHwgVGV4dEZpZWxkIHwgTGFiZWxGaWVsZCB8IElucHV0RmllbGQgfCBEcm9wZG93bkZpZWxkIHwgSHRtbEVkaXRvckZpZWxkIHwgSW1hZ2VGaWVsZCB8IENhbGVuZGFyRmllbGQgfCBBdXRvY29tcGxldGVGaWVsZCB8IENoZWNrYm94RmllbGQgfCBGaWxlRmllbGQgfCBSYWRpb0ZpZWxkIHwgU2xpZGVyRmllbGQgfCBUb2dnbGVGaWVsZD4gPSBuZXcgQXJyYXk8RmllbGQgfCBUZXh0RmllbGQgfCBJbnB1dEZpZWxkIHwgRHJvcGRvd25GaWVsZCB8IEh0bWxFZGl0b3JGaWVsZCB8IEltYWdlRmllbGQgfCBDYWxlbmRhckZpZWxkIHwgQXV0b2NvbXBsZXRlRmllbGQgfCBDaGVja2JveEZpZWxkIHwgRmlsZUZpZWxkIHwgUmFkaW9GaWVsZCB8IFNsaWRlckZpZWxkIHwgVG9nZ2xlRmllbGQ+KCk7XG4gIGJ1dHRvbnM6IEFycmF5PEJ1dHRvbj4gPSBuZXcgQXJyYXk8QnV0dG9uPigpO1xuXG4gIGZvcm1Jbml0aWFsaXplZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhYmlsaXR5OiBBYmlsaXR5KSB7XG4gICAgQWJpbGl0eVV0aWxzLnNldEFiaWxpdHkodGhpcy5hYmlsaXR5KTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZm9ybUluaXRpYWxpemVkID0gdHJ1ZTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5nZXRGb3JtSGVhZGVyKCk7XG4gICAgdGhpcy5zZXRJY29uUG9zaXRpb24oKTtcbiAgICB0aGlzLnNhcGVyYXRlRm9ybUFjdGlvbnMoKTtcbiAgfVxuXG4gIGdldEZvcm1IZWFkZXIoKTogdm9pZCB7XG4gICAgbGV0IHRpdGxlOiBzdHJpbmcgPSB0aGlzLmZvcm1IZWFkZXJDb25maWcudGl0bGU7XG4gICAgdGhpcy5zdWJ0aXRsZSA9IHRoaXMuZm9ybUhlYWRlckNvbmZpZy5zdWJ0aXRsZTtcblxuICAgIHN3aXRjaCAodGhpcy5fZm9ybURpc3BsYXlNb2RlKSB7XG4gICAgICBjYXNlIEZvcm1EaWFwbHlNb2RlLlNFQVJDSDoge1xuICAgICAgICB0aXRsZSA9IHRoaXMuZm9ybUhlYWRlckNvbmZpZy5zZWFyY2hNb2RlVGl0bGUgPyB0aGlzLmZvcm1IZWFkZXJDb25maWcuc2VhcmNoTW9kZVRpdGxlIDogdGl0bGU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSBGb3JtRGlhcGx5TW9kZS5BREQ6IHtcbiAgICAgICAgdGl0bGUgPSB0aGlzLmZvcm1IZWFkZXJDb25maWcuYWRkTW9kZVRpdGxlID8gdGhpcy5mb3JtSGVhZGVyQ29uZmlnLmFkZE1vZGVUaXRsZSA6IHRpdGxlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgRm9ybURpYXBseU1vZGUuRURJVDoge1xuICAgICAgICB0aXRsZSA9IHRoaXMuZm9ybUhlYWRlckNvbmZpZy5lZGl0TW9kZVRpdGxlID8gdGhpcy5mb3JtSGVhZGVyQ29uZmlnLmVkaXRNb2RlVGl0bGUgOiB0aXRsZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIEZvcm1EaWFwbHlNb2RlLlZJRVc6IHtcbiAgICAgICAgdGl0bGUgPSB0aGlzLmZvcm1IZWFkZXJDb25maWcudmlld01vZGVUaXRsZSA/IHRoaXMuZm9ybUhlYWRlckNvbmZpZy52aWV3TW9kZVRpdGxlIDogdGl0bGU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICB0aXRsZSA9IHRoaXMuZm9ybUhlYWRlckNvbmZpZy50aXRsZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy53aWRnZXRBcnJheUluZGV4ICE9IG51bGwpIHtcbiAgICAgIHRpdGxlICs9IFwiIC0gXCIgKyAodGhpcy53aWRnZXRBcnJheUluZGV4ICsgMSk7XG4gICAgfVxuXG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICB9XG5cbiAgc2V0SWNvblBvc2l0aW9uKCkge1xuICAgIHRoaXMuaWNvblBvc2l0aW9uID0gRm9ybVRpdGxlSWNvblBvc2l0aW9uLkJFRk9SRV9USVRMRTtcbiAgICBpZiAodGhpcy5mb3JtSGVhZGVyQ29uZmlnLmljb24gJiYgdGhpcy5mb3JtSGVhZGVyQ29uZmlnLmljb24ucG9zaXRpb24pIHtcbiAgICAgIHRoaXMuaWNvblBvc2l0aW9uID0gdGhpcy5mb3JtSGVhZGVyQ29uZmlnLmljb24ucG9zaXRpb247XG4gICAgfVxuICB9XG5cbiAgc2FwZXJhdGVGb3JtQWN0aW9ucygpIHtcbiAgICBjb25zb2xlLmxvZyhcIjFcIik7XG4gICAgaWYgKCFDb2xsZWN0aW9uVXRpbHMuaXNFbXB0eSh0aGlzLmZvcm1BY3Rpb25zKSkge1xuICAgICAgdGhpcy5idXR0b25zID0gW107XG4gICAgICB0aGlzLmZpZWxkcyA9IFtdO1xuICAgICAgXG4gICAgICB0aGlzLmZvcm1BY3Rpb25zLmZvckVhY2goZm9ybUFjdGlvbiA9PiB7XG4gICAgICAgIGlmIChCdXR0b25VdGlscy5pbnN0YW5jZU9mQW55QnV0dG9uVHlwZShmb3JtQWN0aW9uKSkge1xuICAgICAgICAgIHRoaXMuYnV0dG9ucy5wdXNoKDxCdXR0b24+Zm9ybUFjdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5maWVsZHMucHVzaCg8RmllbGQgfCBUZXh0RmllbGQgfCBMYWJlbEZpZWxkIHwgSW5wdXRGaWVsZCB8IERyb3Bkb3duRmllbGQgfCBIdG1sRWRpdG9yRmllbGQgfCBJbWFnZUZpZWxkIHwgQ2FsZW5kYXJGaWVsZCB8IEF1dG9jb21wbGV0ZUZpZWxkIHwgQ2hlY2tib3hGaWVsZCB8IEZpbGVGaWVsZCB8IFJhZGlvRmllbGQgfCBTbGlkZXJGaWVsZCB8IFRvZ2dsZUZpZWxkPmZvcm1BY3Rpb24pO1xuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICB0aGlzLmluaXRGb3JtR3JvdXAoKTtcbiAgICB9XG4gIH1cblxuICBpbml0Rm9ybUdyb3VwKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmZpZWxkcyAmJiB0aGlzLmZpZWxkcy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgZm9ybUZpZWxkczogQXJyYXk8Rm9ybUZpZWxkPiA9IG5ldyBBcnJheTxGb3JtRmllbGQ+KCk7XG4gICAgICB0aGlzLmZpZWxkcy5tYXAoZmllbGQgPT4ge1xuICAgICAgICBmaWVsZC5hbHdheXNFbmFibGUgPSB0cnVlO1xuICAgICAgICBmb3JtRmllbGRzLnB1c2goeyAnZmllbGQnOiBmaWVsZCwgJ2FkZE1vcmUnOiBmYWxzZSB9KVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZm9ybSA9IEZvcm1VdGlscy5pbml0Rm9ybUdyb3VwKGZvcm1GaWVsZHMsIHt9LCB7fSwgRm9ybURpYXBseU1vZGUuQUREKTtcbiAgICB9XG4gIH1cblxuICBmaWVsZENoYW5nZShmaWVsZENoYW5nZTogRmllbGRDaGFuZ2UpIHtcbiAgICAvLyAgICBjb25zb2xlLmxvZyhmaWVsZENoYW5nZSk7XG5cbiAgICB0aGlzLm9uRmllbGRDaGFuZ2UuZW1pdChmaWVsZENoYW5nZSk7XG4gIH1cblxuICBidXR0b25DbGljayhldmVudDogYW55KSB7XG4gICAgdGhpcy5vbkJ1dHRvbkNsaWNrLmVtaXQoZXZlbnQpO1xuICB9XG59XG4iXX0=