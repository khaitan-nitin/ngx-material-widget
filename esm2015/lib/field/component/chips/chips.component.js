import { ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { FieldComponent } from '../field/field.component';
import { Ability } from '@casl/ability';
import { Router } from '@angular/router';
import { CollectionUtils, FieldUtils } from '../../../utility';
export class ChipsComponent extends FieldComponent {
    constructor(router, ability) {
        super(router, ability);
        this.router = router;
        this.ability = ability;
        this.field = null;
        this.onListChange = new EventEmitter();
        this.placeholder = '';
        this.separatorKeysCodes = [ENTER]; //SPACE
        this.chips = [];
        this.addOnBlur = true;
        this.addItem = ($event) => {
            const input = $event.input;
            const value = $event.value;
            let keyExists = this.keyExists(value.trim());
            // Add our item
            if ((value || '').trim() && !keyExists) {
                this.chips.push({
                    key: value.trim(),
                    value: value.trim(),
                    disabled: false,
                    removable: this.removable || true
                });
            }
            // Reset the input value
            if (input) {
                input.value = '';
            }
            this.triggerChangedEvent($event);
        };
        this.removeItem = ($event, item, index) => {
            this.chips.splice(index, 1);
            // if (this.isFunctionDefined(this.field.onRemoveItem)) {
            //     this.field.onRemoveItem(item.value).subscribe(result => {
            //         if (result) {
            //             this.chips.splice(index, 1);
            //             this.triggerChangedEvent($event);
            //         }
            //     });
            // }
        };
        this.drop = ($event) => {
            moveItemInArray(this.chips, $event.previousIndex, $event.currentIndex);
            this.triggerChangedEvent($event);
        };
        this.triggerChangedEvent = ($event) => {
            let values = this.chips.map(x => x.key);
            this.formControl.setValue(values);
            this.onListChange.emit({
                values: values,
                event: $event
            });
        };
        this.onSelected = (event) => {
            let keyExists = this.keyExists(event.option.value['key']);
            if (!keyExists) {
                this.chips.push({
                    key: event.option.value['key'],
                    value: event.option.value['value'],
                    removable: true,
                    disabled: false
                });
                this.input.nativeElement.value = '';
                this.triggerChangedEvent(event);
            }
        };
        this.isFunctionDefined = (func) => {
            return typeof func == 'function';
        };
    }
    ;
    setDescribedByIds(ids) {
        throw new Error('Method not implemented.');
    }
    onContainerClick(event) {
        throw new Error('Method not implemented.');
    }
    ngOnInit() {
        this.placeholder = this.field.placeholder || '';
        this.orientation = this.field.orientation || "HORIZONTAL" /* HORIZONTAL */;
        this.options = this.field.options || [];
        this.setChips();
    }
    setChips() {
        let values = this.formControl.value;
        let isReadOnly = FieldUtils.isFieldDisabled(this.field, this.displayMode, values);
        if (!CollectionUtils.isEmpty(values)) {
            values.forEach(value => {
                if (!CollectionUtils.isEmpty(this.field.options)) {
                    let optionMatch = null;
                    this.field.options.forEach(option => {
                        if (option.key == value) {
                            optionMatch = option;
                        }
                    });
                    if (optionMatch != null) {
                        this.chips.push({
                            key: optionMatch.key,
                            value: optionMatch.value,
                            disabled: isReadOnly,
                            removable: true
                        });
                    }
                    else {
                        this.chips.push({
                            key: value,
                            value: value,
                            disabled: isReadOnly,
                            removable: true
                        });
                    }
                }
                else {
                    this.chips.push({
                        key: value,
                        value: value,
                        disabled: isReadOnly,
                        removable: true
                    });
                }
            });
        }
        else {
            this.chips = [];
        }
    }
    keyExists(value) {
        let keyExists = false;
        this.chips.forEach(chip => {
            if (chip.key == value) {
                keyExists = true;
            }
        });
        return keyExists;
    }
    errors() {
        let errors = [];
        if (this.formControl != undefined) {
            if (this.formControl && this.formControl.errors) {
                Object.keys(this.formControl.errors).forEach(keyError => {
                    if (this.field.validations) {
                        for (let validation of this.field.validations) {
                            if (keyError === validation.message.key) {
                                errors[errors.length] = { error: keyError, message: validation.message.message };
                            }
                        }
                    }
                });
            }
        }
        return errors;
    }
}
ChipsComponent.decorators = [
    { type: Component, args: [{
                selector: 'cf-chips',
                template: "<ng-container *ngIf=\"!enableDragAndDrop && options.length==0\">\n    <ng-container *ngTemplateOutlet=\"chipListStandard\"></ng-container>\n</ng-container>\n<ng-container *ngIf=\"!enableDragAndDrop && options.length>0\">\n    <ng-container *ngTemplateOutlet=\"chipListAutoComplete\"></ng-container>\n</ng-container>\n\n<!-- Chip list Standard -->\n<ng-template #chipListStandard>\n    <mat-form-field \n        [appearance]=\"appearance | lowercase\"\n        class=\"cf-chip-list\">\n        <mat-label class=\"cf-field-lbl cf-field-lbl-{{field.key}}\" *ngIf=\"!(hideLabel == true) && field.fieldDisplayType != 'HORIZONTAL'\">\n          <strong>{{field.label}}</strong>\n          <span class=\"cf-field-lbl-req\" *ngIf=\"isRequired\">*</span>\n          <span *ngIf=\"field.help && field.help.message && field.help.displayType == 'PLAIN_TEXT' && field.help.withLabel\">\n            {{field.help.message}}\n          </span>\n        </mat-label>\n        <!-- <mat-label class=\"cf-field-lbl\" *ngIf=\"(hideLabel == true)\"> \n        </mat-label> -->\n  \n        <mat-icon \n          *ngIf=\"field.icon\" \n          matPrefix\n          aria-hidden=\"true\" \n          [attr.aria-label]=\"field.icon\" \n          class=\"cf-field-icon\" \n        >{{field.icon}}</mat-icon>\n  \n        <mat-chip-list #chipList [ngClass]=\"{'mat-chip-list-stacked': orientation === 'VERTICAL'}\">\n            <mat-chip *ngFor=\"let chip of chips;let i=index\" [removable]=\"chip.removable || true\"\n                (removed)=\"removeItem($event,chip,i)\" class=\"chip-item\" [disabled]=\"chip.disabled\">\n                {{chip.value}}\n                <mat-icon matChipRemove *ngIf=\"chip.removable\">cancel</mat-icon>\n            </mat-chip>\n            <!-- [formControl]=\"formControl\"  -->\n            <input \n                matInput \n                #input \n                [id]=\"field.key\"\n                [placeholder]=\"placeholder\" \n                [matChipInputFor]=\"chipList\"\n                [errorStateMatcher]=\"errorMatcher\"\n                [disabled]=\"disabled\"\n                [matChipInputSeparatorKeyCodes]=\"separatorKeysCodes\" \n                [matChipInputAddOnBlur]=\"addOnBlur\"\n                (matChipInputTokenEnd)=\"addItem($event)\" />\n        </mat-chip-list>\n        <cf-button\n            matSuffix\n            *ngIf=\"hasClear && !hasFieldNavigate && !(field.help && field.help.displayType == 'TOOLTIP' && field.help.message)\"\n            [button]=\"textClearButton\"\n            class=\"cf-field-clr-btn cf-field-clr-btn-{{field.key}}\"\n            (onClick)=\"cleanValue()\"\n        ></cf-button>\n        <cf-button\n            matSuffix\n            *ngIf=\"hasFieldNavigate\"\n            [button]=\"routeToButton\"\n            class=\"cf-field-clr-btn cf-field-clr-btn-{{field.key}}\"\n            (onClick)=\"resolvedValue = ''\"\n        ></cf-button> \n        <cf-tooltip matSuffix [field]=\"field\"></cf-tooltip>\n\n        <!-- <ng-container *ngTemplateOutlet=\"cfHelp;\"></ng-container> -->\n        <mat-hint *ngIf=\"field.help && field.help.message && field.help.displayType == 'PLAIN_TEXT' && !field.help.withLabel\" class=\"cf-field-hint\">\n            <mat-icon \n            aria-hidden=\"true\"  \n            [attr.aria-label]=\"field.help.message\" \n            class=\"cf-field-hint-icon\">\n            {{field.help.icon ? field.help.icon : 'live_help'}}\n            </mat-icon>\n            {{field.help.message}}\n        </mat-hint>\n\n        <mat-error aria-hidden=\"true\" [attr.aria-label]=\"error.message\" *ngFor=\"let error of errors()\" [innerHtml]=\"error.message\"></mat-error>\n    </mat-form-field>\n</ng-template>\n\n<!-- Chip list with Autocomplete -->\n<ng-template #chipListAutoComplete>\n    <mat-form-field class=\"cf-chip-list\">\n        <mat-label class=\"cf-field-lbl cf-field-lbl-{{field.key}}\" *ngIf=\"!(hideLabel == true) && field.fieldDisplayType != 'HORIZONTAL'\">\n            <strong>{{field.label}}</strong>\n            <span class=\"cf-field-lbl-req\" *ngIf=\"isRequired\">*</span>\n            <span *ngIf=\"field.help && field.help.message && field.help.displayType == 'PLAIN_TEXT' && field.help.withLabel\">\n              {{field.help.message}}\n            </span>\n          </mat-label>\n          <!-- <mat-label class=\"cf-field-lbl\" *ngIf=\"(hideLabel == true)\"> \n          </mat-label> -->\n    \n          <mat-icon \n            *ngIf=\"field.icon\" \n            matPrefix\n            aria-hidden=\"true\" \n            [attr.aria-label]=\"field.icon\" \n            class=\"cf-field-icon\" \n          >{{field.icon}}</mat-icon>\n      \n        <mat-chip-list #chipList [ngClass]=\"{'mat-chip-list-stacked': orientation === 'VERTICAL'}\">\n            <mat-chip *ngFor=\"let chip of chips;let i=index\" [removable]=\"chip.removable || true\"\n                (removed)=\"removeItem($event,chip,i)\" class=\"chip-item\" [disabled]=\"chip.disabled\">\n                {{chip.value}}\n                <mat-icon matChipRemove *ngIf=\"chip.removable\">cancel</mat-icon>\n            </mat-chip>\n            <!-- [formControl]=\"formControl\"  -->\n            <input \n                matInput \n                #input \n                [id]=\"field.key\"\n                [placeholder]=\"placeholder\" \n                [matChipInputFor]=\"chipList\"\n                [errorStateMatcher]=\"errorMatcher\"\n                [disabled]=\"disabled\"\n                [matChipInputSeparatorKeyCodes]=\"separatorKeysCodes\" \n                [matChipInputAddOnBlur]=\"addOnBlur\"\n                [matAutocomplete]=\"auto\" />\n        </mat-chip-list>\n        <mat-error aria-hidden=\"true\" [attr.aria-label]=\"error.message\" *ngFor=\"let error of errors()\" [innerHtml]=\"error.message\"></mat-error>\n        <mat-autocomplete #auto=\"matAutocomplete\" (optionSelected)=\"onSelected($event)\">\n            <mat-option \n                *ngFor=\"let option of options\" \n                [value]=\"option\"\n                [disabled]=\"option.disabled\" >\n                {{option.value}}\n                <!-- <span [innerHTML]=\"option.value | highlight: highlightAutoCompleteText\"></span> -->\n            </mat-option>\n        </mat-autocomplete>\n\n        <cf-button\n            matSuffix\n            *ngIf=\"hasClear && !hasFieldNavigate && !(field.help && field.help.displayType == 'TOOLTIP' && field.help.message)\"\n            [button]=\"textClearButton\"\n            class=\"cf-field-clr-btn cf-field-clr-btn-{{field.key}}\"\n            (onClick)=\"cleanValue()\"\n        ></cf-button>\n        <cf-button\n            matSuffix\n            *ngIf=\"hasFieldNavigate\"\n            [button]=\"routeToButton\"\n            class=\"cf-field-clr-btn cf-field-clr-btn-{{field.key}}\"\n            (onClick)=\"resolvedValue = ''\"\n        ></cf-button> \n        <cf-tooltip matSuffix [field]=\"field\"></cf-tooltip>\n\n        <!-- <ng-container *ngTemplateOutlet=\"cfHelp;\"></ng-container> -->\n        <mat-hint *ngIf=\"field.help && field.help.message && field.help.displayType == 'PLAIN_TEXT' && !field.help.withLabel\" class=\"cf-field-hint\">\n            <mat-icon \n            aria-hidden=\"true\" \n            [attr.aria-label]=\"field.help.message\" \n            class=\"cf-field-hint-icon\">\n            {{field.help.icon ? field.help.icon : 'live_help'}}\n            </mat-icon>\n            {{field.help.message}}\n        </mat-hint>\n\n        <mat-error aria-hidden=\"true\" [attr.aria-label]=\"error.message\" *ngFor=\"let error of errors()\" [innerHtml]=\"error.message\"></mat-error>\n\n    </mat-form-field>\n</ng-template>\n\n",
                styles: [".cf-chip-list{width:100%}.cf-chip-list .chip-item.cdk-drag-animating,.cf-chip-list .hip-item .cdk-drop-list-dragging{transition:transform .25s cubic-bezier(0,0,.2,1)}.cf-chip-list .mat-chip-list-stacked input.mat-chip-input{flex:none}"]
            },] }
];
ChipsComponent.ctorParameters = () => [
    { type: Router },
    { type: Ability }
];
ChipsComponent.propDecorators = {
    field: [{ type: Input }],
    disabled: [{ type: Input }],
    formControl: [{ type: Input }],
    errorMatcher: [{ type: Input }],
    input: [{ type: ViewChild, args: ['input',] }],
    matAutocomplete: [{ type: ViewChild, args: ['auto',] }],
    onListChange: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpcHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9uaXRpbmtoYWl0YW4vTml0aW4vc3R1ZHkvYW5ndWxhci9tYXRlcmlhbC9hZG1pbi1idWlsZGVyLXBsdWdpbi9wcm9qZWN0cy9uZ3gtbWF0ZXJpYWwtd2lkZ2V0L3NyYy8iLCJzb3VyY2VzIjpbImxpYi9maWVsZC9jb21wb25lbnQvY2hpcHMvY2hpcHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQVMsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsU0FBUyxFQUFjLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUt0RyxPQUFPLEVBQWUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFHdEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzFELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFZL0QsTUFBTSxPQUFPLGNBQWUsU0FBUSxjQUFjO0lBcUI5QyxZQUFtQixNQUFjLEVBQVMsT0FBZ0I7UUFDdEQsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQURSLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBcEJqRCxVQUFLLEdBQWMsSUFBSSxDQUFDO1FBU3ZCLGlCQUFZLEdBQXVDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEYsZ0JBQVcsR0FBVyxFQUFFLENBQUM7UUFDekIsdUJBQWtCLEdBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBLE9BQU87UUFHOUMsVUFBSyxHQUFXLEVBQUUs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QjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQStDRCxNQUFNO1FBQ0YsSUFBSSxNQUFNLEdBQThDLEVBQUUsQ0FBQztRQUMzRCxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksU0FBUyxFQUFFO1lBQy9CLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRTtnQkFFN0MsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDcEQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTt3QkFDeEIsS0FBSyxJQUFJLFVBQVUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTs0QkFDM0MsSUFBSSxRQUFRLEtBQUssVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7Z0NBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDOzZCQUNwRjt5QkFDSjtxQkFDSjtnQkFDTCxDQUFDLENBQUMsQ0FBQzthQUNOO1NBQ0o7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDOzs7WUFwTUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixnalBBQXFDOzthQUt4Qzs7O1lBWlEsTUFBTTtZQUROLE9BQU87OztvQkFlWCxLQUFLO3VCQUNMLEtBQUs7MEJBQ0wsS0FBSzsyQkFFTCxLQUFLO29CQUVMLFNBQVMsU0FBQyxPQUFPOzhCQUNqQixTQUFTLFNBQUMsTUFBTTsyQkFFaEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVOVEVSLCBTUEFDRSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXRBdXRvY29tcGxldGUsIE1hdEF1dG9jb21wbGV0ZVNlbGVjdGVkRXZlbnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9hdXRvY29tcGxldGUnO1xuaW1wb3J0IHsgTWF0Q2hpcElucHV0RXZlbnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGlwcyc7XG5pbXBvcnQgeyBDaGlwRmllbGQsIENoaXAsIENoaXBJdGVtQ2hhbmdlZEV2ZW50LCBDaGlwT3JpZW50YXRpb24sIFJlbW92ZUZ1bmMgfSBmcm9tICcuLi8uLi9tb2RlbC9jaGlwcy5tb2RlbCc7XG5pbXBvcnQgeyBDZGtEcmFnRHJvcCwgbW92ZUl0ZW1JbkFycmF5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQgeyBFcnJvclN0YXRlTWF0Y2hlciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuaW1wb3J0IHsgRHJvcGRvd25PcHRpb24gfSBmcm9tICcuLi8uLi9tb2RlbCc7XG5pbXBvcnQgeyBGaWVsZENvbXBvbmVudCB9IGZyb20gJy4uL2ZpZWxkL2ZpZWxkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBYmlsaXR5IH0gZnJvbSAnQGNhc2wvYWJpbGl0eSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQ29sbGVjdGlvblV0aWxzLCBGaWVsZFV0aWxzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbGl0eSc7XG5pbXBvcnQgeyBNYXRGb3JtRmllbGRDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnY2YtY2hpcHMnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jaGlwcy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vY2hpcHMuY29tcG9uZW50LnNjc3MnXSxcbiAgICAvLyBwcm92aWRlcnM6IFtcbiAgICAvLyAgICAgeyBwcm92aWRlOiBNYXRGb3JtRmllbGRDb250cm9sLCB1c2VFeGlzdGluZzogQ2hpcHNDb21wb25lbnQgfVxuICAgIC8vIF1cbn0pXG5leHBvcnQgY2xhc3MgQ2hpcHNDb21wb25lbnQgZXh0ZW5kcyBGaWVsZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQElucHV0KCkgZmllbGQ6IENoaXBGaWVsZCA9IG51bGw7XG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgQElucHV0KCkgZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sO1xuXG4gICAgQElucHV0KCkgZXJyb3JNYXRjaGVyOiBFcnJvclN0YXRlTWF0Y2hlcjtcblxuICAgIEBWaWV3Q2hpbGQoJ2lucHV0JykgaW5wdXQ6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD47XG4gICAgQFZpZXdDaGlsZCgnYXV0bycpIG1hdEF1dG9jb21wbGV0ZTogTWF0QXV0b2NvbXBsZXRlO1xuXG4gICAgQE91dHB1dCgpIG9uTGlzdENoYW5nZTogRXZlbnRFbWl0dGVyPENoaXBJdGVtQ2hhbmdlZEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTs7XG5cbiAgICBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XG4gICAgc2VwYXJhdG9yS2V5c0NvZGVzOiBudW1iZXJbXSA9IFtFTlRFUl07Ly9TUEFDRVxuICAgIGVuYWJsZURyYWdBbmREcm9wOiBib29sZWFuO1xuICAgIG9yaWVudGF0aW9uOiBDaGlwT3JpZW50YXRpb247XG4gICAgY2hpcHM6IENoaXBbXSA9IFtdO1xuICAgIG9wdGlvbnM6IEFycmF5PERyb3Bkb3duT3B0aW9uPjtcbiAgICBhZGRPbkJsdXI6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHJlbW92YWJsZTogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByb3V0ZXI6IFJvdXRlciwgcHVibGljIGFiaWxpdHk6IEFiaWxpdHkpIHtcbiAgICAgICAgc3VwZXIocm91dGVyLCBhYmlsaXR5KTtcbiAgICB9XG4gICAgc3RhdGVDaGFuZ2VzOiBPYnNlcnZhYmxlPHZvaWQ+O1xuICAgIGlkOiBzdHJpbmc7XG4gICAgbmdDb250cm9sOiBOZ0NvbnRyb2w7XG4gICAgZm9jdXNlZDogYm9vbGVhbjtcbiAgICBlbXB0eTogYm9vbGVhbjtcbiAgICBzaG91bGRMYWJlbEZsb2F0OiBib29sZWFuO1xuICAgIGVycm9yU3RhdGU6IGJvb2xlYW47XG4gICAgY29udHJvbFR5cGU/OiBzdHJpbmc7XG4gICAgYXV0b2ZpbGxlZD86IGJvb2xlYW47XG4gICAgdXNlckFyaWFEZXNjcmliZWRCeT86IHN0cmluZztcbiAgICBzZXREZXNjcmliZWRCeUlkcyhpZHM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWV0aG9kIG5vdCBpbXBsZW1lbnRlZC4nKTtcbiAgICB9XG4gICAgb25Db250YWluZXJDbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01ldGhvZCBub3QgaW1wbGVtZW50ZWQuJyk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSB0aGlzLmZpZWxkLnBsYWNlaG9sZGVyIHx8ICcnO1xuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gdGhpcy5maWVsZC5vcmllbnRhdGlvbiB8fCBDaGlwT3JpZW50YXRpb24uSE9SSVpPTlRBTDtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy5maWVsZC5vcHRpb25zIHx8IFtdO1xuXG4gICAgICAgIHRoaXMuc2V0Q2hpcHMoKTtcbiAgICB9XG5cbiAgICBzZXRDaGlwcygpIHtcbiAgICAgICAgbGV0IHZhbHVlczogQXJyYXk8c3RyaW5nPiA9IHRoaXMuZm9ybUNvbnRyb2wudmFsdWU7XG4gICAgICAgIGxldCBpc1JlYWRPbmx5OiBib29sZWFuID0gRmllbGRVdGlscy5pc0ZpZWxkRGlzYWJsZWQodGhpcy5maWVsZCwgdGhpcy5kaXNwbGF5TW9kZSwgdmFsdWVzKTtcblxuICAgICAgICBpZiAoIUNvbGxlY3Rpb25VdGlscy5pc0VtcHR5KHZhbHVlcykpIHtcbiAgICAgICAgICAgIHZhbHVlcy5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIUNvbGxlY3Rpb25VdGlscy5pc0VtcHR5KHRoaXMuZmllbGQub3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGlvbk1hdGNoOiBEcm9wZG93bk9wdGlvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmllbGQub3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uLmtleSA9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbk1hdGNoID0gb3B0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uTWF0Y2ggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlwcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IG9wdGlvbk1hdGNoLmtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogb3B0aW9uTWF0Y2gudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGlzUmVhZE9ubHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpcHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGlzUmVhZE9ubHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpcHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGlzUmVhZE9ubHksXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmFibGU6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNoaXBzID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRJdGVtID0gKCRldmVudDogTWF0Q2hpcElucHV0RXZlbnQpOiB2b2lkID0+IHtcbiAgICAgICAgY29uc3QgaW5wdXQgPSAkZXZlbnQuaW5wdXQ7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gJGV2ZW50LnZhbHVlO1xuXG4gICAgICAgIGxldCBrZXlFeGlzdHMgPSB0aGlzLmtleUV4aXN0cyh2YWx1ZS50cmltKCkpO1xuXG4gICAgICAgIC8vIEFkZCBvdXIgaXRlbVxuICAgICAgICBpZiAoKHZhbHVlIHx8ICcnKS50cmltKCkgJiYgIWtleUV4aXN0cykge1xuICAgICAgICAgICAgdGhpcy5jaGlwcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBrZXk6IHZhbHVlLnRyaW0oKSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUudHJpbSgpLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByZW1vdmFibGU6IHRoaXMucmVtb3ZhYmxlIHx8IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVzZXQgdGhlIGlucHV0IHZhbHVlXG4gICAgICAgIGlmIChpbnB1dCkge1xuICAgICAgICAgICAgaW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRyaWdnZXJDaGFuZ2VkRXZlbnQoJGV2ZW50IGFzIGFueSk7XG4gICAgfVxuXG4gICAga2V5RXhpc3RzKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGtleUV4aXN0cyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNoaXBzLmZvckVhY2goY2hpcCA9PiB7XG4gICAgICAgICAgICBpZiAoY2hpcC5rZXkgPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBrZXlFeGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4ga2V5RXhpc3RzO1xuICAgIH1cblxuICAgIHJlbW92ZUl0ZW0gPSAoJGV2ZW50OiBFdmVudCwgaXRlbTogQ2hpcCwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICB0aGlzLmNoaXBzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIC8vIGlmICh0aGlzLmlzRnVuY3Rpb25EZWZpbmVkKHRoaXMuZmllbGQub25SZW1vdmVJdGVtKSkge1xuICAgICAgICAvLyAgICAgdGhpcy5maWVsZC5vblJlbW92ZUl0ZW0oaXRlbS52YWx1ZSkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgIC8vICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAvLyAgICAgICAgICAgICB0aGlzLmNoaXBzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIC8vICAgICAgICAgICAgIHRoaXMudHJpZ2dlckNoYW5nZWRFdmVudCgkZXZlbnQpO1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyB9XG4gICAgfVxuXG4gICAgZHJvcCA9ICgkZXZlbnQ6IENka0RyYWdEcm9wPENoaXBbXT4pID0+IHtcbiAgICAgICAgbW92ZUl0ZW1JbkFycmF5KHRoaXMuY2hpcHMsICRldmVudC5wcmV2aW91c0luZGV4LCAkZXZlbnQuY3VycmVudEluZGV4KTtcbiAgICAgICAgdGhpcy50cmlnZ2VyQ2hhbmdlZEV2ZW50KCRldmVudCBhcyBhbnkpO1xuICAgIH1cblxuICAgIHRyaWdnZXJDaGFuZ2VkRXZlbnQgPSAoJGV2ZW50OiBFdmVudCB8IE1hdEF1dG9jb21wbGV0ZVNlbGVjdGVkRXZlbnQpID0+IHtcbiAgICAgICAgbGV0IHZhbHVlczogQXJyYXk8c3RyaW5nPiA9IHRoaXMuY2hpcHMubWFwKHggPT4geC5rZXkpO1xuICAgICAgICB0aGlzLmZvcm1Db250cm9sLnNldFZhbHVlKHZhbHVlcyk7XG4gICAgICAgIHRoaXMub25MaXN0Q2hhbmdlLmVtaXQoPENoaXBJdGVtQ2hhbmdlZEV2ZW50PntcbiAgICAgICAgICAgIHZhbHVlczogdmFsdWVzLFxuICAgICAgICAgICAgZXZlbnQ6ICRldmVudFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvblNlbGVjdGVkID0gKGV2ZW50OiBNYXRBdXRvY29tcGxldGVTZWxlY3RlZEV2ZW50KTogdm9pZCA9PiB7XG4gICAgICAgIGxldCBrZXlFeGlzdHMgPSB0aGlzLmtleUV4aXN0cyhldmVudC5vcHRpb24udmFsdWVbJ2tleSddKTtcblxuICAgICAgICBpZiAoIWtleUV4aXN0cykge1xuICAgICAgICAgICAgdGhpcy5jaGlwcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBrZXk6IGV2ZW50Lm9wdGlvbi52YWx1ZVsna2V5J10sXG4gICAgICAgICAgICAgICAgdmFsdWU6IGV2ZW50Lm9wdGlvbi52YWx1ZVsndmFsdWUnXSxcbiAgICAgICAgICAgICAgICByZW1vdmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyQ2hhbmdlZEV2ZW50KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzRnVuY3Rpb25EZWZpbmVkID0gKGZ1bmM6IFJlbW92ZUZ1bmMpID0+IHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBmdW5jID09ICdmdW5jdGlvbic7XG4gICAgfVxuXG4gICAgZXJyb3JzKCk6IEFycmF5PHsgZXJyb3I6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nIH0+IHtcbiAgICAgICAgbGV0IGVycm9yczogQXJyYXk8eyBlcnJvcjogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcgfT4gPSBbXTtcbiAgICAgICAgaWYgKHRoaXMuZm9ybUNvbnRyb2wgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5mb3JtQ29udHJvbCAmJiB0aGlzLmZvcm1Db250cm9sLmVycm9ycykge1xuXG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5mb3JtQ29udHJvbC5lcnJvcnMpLmZvckVhY2goa2V5RXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5maWVsZC52YWxpZGF0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdmFsaWRhdGlvbiBvZiB0aGlzLmZpZWxkLnZhbGlkYXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGtleUVycm9yID09PSB2YWxpZGF0aW9uLm1lc3NhZ2Uua2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yc1tlcnJvcnMubGVuZ3RoXSA9IHsgZXJyb3I6IGtleUVycm9yLCBtZXNzYWdlOiB2YWxpZGF0aW9uLm1lc3NhZ2UubWVzc2FnZSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlcnJvcnM7XG4gICAgfVxufVxuIl19