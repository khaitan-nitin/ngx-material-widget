import { Component, Input } from '@angular/core';
import { AbilityUtils } from '../../../utility/ability.utility';
import { Ability } from '@casl/ability';
export class FieldLayoutComponent {
    // radio: {} = {};
    // minDate: Date;
    // maxDate: Date;
    //protected dateService: NbDateService<Date>, protected autocompleteSearch: AutocompleteService
    constructor(ability) {
        this.ability = ability;
        AbilityUtils.setAbility(this.ability);
    }
    ngOnInit() {
    }
    initField() {
        // if (this.field.type == FieldType.RADIO) {
        //   this.radio[this.field.key] = null;
        // }
        // if (this.field.type == FieldType.CALENDAR)  {
        //   this.minDate = this.dateService.addDay(this.dateService.today(), this.field['min']);
        //   this.maxDate = this.dateService.addDay(this.dateService.today(), this.field['max']);
        // }    
    }
    isRequired() {
        let isRequired = false;
        if (this.field.validations && this.field.validations.length > 0) {
            for (let validation of this.field.validations) {
                if (validation.message.key == "required") {
                    isRequired = true;
                }
            }
        }
        return isRequired;
    }
    isValidDisplayType(fieldDiaplyType) {
        if (this.field) {
            return this.field.fieldDisplayType == fieldDiaplyType;
        }
        else {
            return false;
        }
    }
}
FieldLayoutComponent.decorators = [
    { type: Component, args: [{
                selector: 'cf-field-layout',
                template: "<p>field-layout works!</p>\n",
                styles: [""]
            },] }
];
FieldLayoutComponent.ctorParameters = () => [
    { type: Ability }
];
FieldLayoutComponent.propDecorators = {
    sourceIdentifier: [{ type: Input }],
    sourceIndex: [{ type: Input }],
    form: [{ type: Input }],
    field: [{ type: Input }],
    displayMode: [{ type: Input }],
    value: [{ type: Input }],
    dependencies: [{ type: Input }],
    row: [{ type: Input }],
    keyMap: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtbGF5b3V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvbml0aW5raGFpdGFuL05pdGluL3N0dWR5L2FuZ3VsYXIvbWF0ZXJpYWwvYWRtaW4tYnVpbGRlci1wbHVnaW4vcHJvamVjdHMvbmd4LW1hdGVyaWFsLXdpZGdldC9zcmMvIiwic291cmNlcyI6WyJsaWIvZmllbGQvY29tcG9uZW50L2ZpZWxkLWxheW91dC9maWVsZC1sYXlvdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSXpELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNoRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBT3hDLE1BQU0sT0FBTyxvQkFBb0I7SUFXL0Isa0JBQWtCO0lBRWxCLGlCQUFpQjtJQUNqQixpQkFBaUI7SUFFakIsK0ZBQStGO0lBQy9GLFlBQW9CLE9BQWdCO1FBQWhCLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDbEMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELFFBQVE7SUFDUixDQUFDO0lBRUQsU0FBUztRQUNQLDRDQUE0QztRQUM1Qyx1Q0FBdUM7UUFDdkMsSUFBSTtRQUVKLGdEQUFnRDtRQUNoRCx5RkFBeUY7UUFDekYseUZBQXlGO1FBQ3pGLFFBQVE7SUFDVixDQUFDO0lBRUQsVUFBVTtRQUNSLElBQUksVUFBVSxHQUFZLEtBQUssQ0FBQztRQUNoQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDL0QsS0FBSyxJQUFJLFVBQVUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtnQkFDN0MsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxVQUFVLEVBQUU7b0JBQ3hDLFVBQVUsR0FBRyxJQUFJLENBQUM7aUJBQ25CO2FBQ0Y7U0FDRjtRQUVELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxlQUFnQztRQUNqRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLElBQUksZUFBZSxDQUFDO1NBQ3ZEO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0gsQ0FBQzs7O1lBM0RGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQix3Q0FBNEM7O2FBRTdDOzs7WUFOUSxPQUFPOzs7K0JBUWIsS0FBSzswQkFDTCxLQUFLO21CQUNMLEtBQUs7b0JBQ0wsS0FBSzswQkFDTCxLQUFLO29CQUNMLEtBQUs7MkJBQ0wsS0FBSztrQkFDTCxLQUFLO3FCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZpZWxkRGlhcGx5VHlwZSwgRmllbGQsIEtleU1hcCB9IGZyb20gJy4uLy4uL21vZGVsJztcbmltcG9ydCB7IEZvcm1EaWFwbHlNb2RlIH0gZnJvbSAnLi4vLi4vLi4vZm9ybS9tb2RlbCc7XG5pbXBvcnQgeyBBYmlsaXR5VXRpbHMgfSBmcm9tICcuLi8uLi8uLi91dGlsaXR5L2FiaWxpdHkudXRpbGl0eSc7XG5pbXBvcnQgeyBBYmlsaXR5IH0gZnJvbSAnQGNhc2wvYWJpbGl0eSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NmLWZpZWxkLWxheW91dCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9maWVsZC1sYXlvdXQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9maWVsZC1sYXlvdXQuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGaWVsZExheW91dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHNvdXJjZUlkZW50aWZpZXI6IHN0cmluZztcbiAgQElucHV0KCkgc291cmNlSW5kZXg6IG51bWJlcjtcbiAgQElucHV0KCkgZm9ybTogRm9ybUdyb3VwO1xuICBASW5wdXQoKSBmaWVsZDogRmllbGQ7Ly8gfCBEcm9wZG93bkZpZWxkIHwgSW1hZ2VGaWVsZCB8IENhbGVuZGFyRmllbGQgfCBBdXRvY29tcGxldGVGaWVsZCB8IEZpbGVGaWVsZDsgXG4gIEBJbnB1dCgpIGRpc3BsYXlNb2RlOiBGb3JtRGlhcGx5TW9kZTtcbiAgQElucHV0KCkgdmFsdWU6IGFueTtcbiAgQElucHV0KCkgZGVwZW5kZW5jaWVzOiBhbnk7XG4gIEBJbnB1dCgpIHJvdzogYW55O1xuICBASW5wdXQoKSBrZXlNYXA6IEFycmF5PEtleU1hcD47XG5cbiAgLy8gcmFkaW86IHt9ID0ge307XG5cbiAgLy8gbWluRGF0ZTogRGF0ZTtcbiAgLy8gbWF4RGF0ZTogRGF0ZTtcblxuICAvL3Byb3RlY3RlZCBkYXRlU2VydmljZTogTmJEYXRlU2VydmljZTxEYXRlPiwgcHJvdGVjdGVkIGF1dG9jb21wbGV0ZVNlYXJjaDogQXV0b2NvbXBsZXRlU2VydmljZVxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFiaWxpdHk6IEFiaWxpdHkpIHsgXG4gICAgQWJpbGl0eVV0aWxzLnNldEFiaWxpdHkodGhpcy5hYmlsaXR5KTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgaW5pdEZpZWxkKCkge1xuICAgIC8vIGlmICh0aGlzLmZpZWxkLnR5cGUgPT0gRmllbGRUeXBlLlJBRElPKSB7XG4gICAgLy8gICB0aGlzLnJhZGlvW3RoaXMuZmllbGQua2V5XSA9IG51bGw7XG4gICAgLy8gfVxuXG4gICAgLy8gaWYgKHRoaXMuZmllbGQudHlwZSA9PSBGaWVsZFR5cGUuQ0FMRU5EQVIpICB7XG4gICAgLy8gICB0aGlzLm1pbkRhdGUgPSB0aGlzLmRhdGVTZXJ2aWNlLmFkZERheSh0aGlzLmRhdGVTZXJ2aWNlLnRvZGF5KCksIHRoaXMuZmllbGRbJ21pbiddKTtcbiAgICAvLyAgIHRoaXMubWF4RGF0ZSA9IHRoaXMuZGF0ZVNlcnZpY2UuYWRkRGF5KHRoaXMuZGF0ZVNlcnZpY2UudG9kYXkoKSwgdGhpcy5maWVsZFsnbWF4J10pO1xuICAgIC8vIH0gICAgXG4gIH1cblxuICBpc1JlcXVpcmVkKCk6IGJvb2xlYW4ge1xuICAgIGxldCBpc1JlcXVpcmVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuZmllbGQudmFsaWRhdGlvbnMgJiYgdGhpcy5maWVsZC52YWxpZGF0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGxldCB2YWxpZGF0aW9uIG9mIHRoaXMuZmllbGQudmFsaWRhdGlvbnMpIHtcbiAgICAgICAgaWYgKHZhbGlkYXRpb24ubWVzc2FnZS5rZXkgPT0gXCJyZXF1aXJlZFwiKSB7XG4gICAgICAgICAgaXNSZXF1aXJlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaXNSZXF1aXJlZDtcbiAgfVxuXG4gIGlzVmFsaWREaXNwbGF5VHlwZShmaWVsZERpYXBseVR5cGU6IEZpZWxkRGlhcGx5VHlwZSk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmZpZWxkKSB7XG4gICAgICByZXR1cm4gdGhpcy5maWVsZC5maWVsZERpc3BsYXlUeXBlID09IGZpZWxkRGlhcGx5VHlwZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIl19