import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ObjectUtils, StringUtils } from '../../../utility';
import { AbilityUtils } from '../../../utility/ability.utility';
import { Ability } from '@casl/ability';
export class ButtonDeleteConfirmationComponent {
    constructor(dialogRef, data, ability) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.ability = ability;
        AbilityUtils.setAbility(this.ability);
    }
    ngOnInit() {
        this.title = this.resolve(this.data.confirmationConfig.title);
        this.message = this.resolve(this.data.confirmationConfig.message);
    }
    displayOnlyIcon(button) {
        return button && !StringUtils.isEmpty(button.icon) && StringUtils.isEmpty(button.label) ? true : false;
    }
    displayIcon(button) {
        return button && !StringUtils.isEmpty(button.icon) ? true : false;
    }
    resolve(text) {
        return ObjectUtils.resolve(text, this.data.originalData);
    }
    click(event) {
        this.dialogRef.close(event);
    }
}
ButtonDeleteConfirmationComponent.decorators = [
    { type: Component, args: [{
                selector: 'cf-button-delete-confirmation',
                template: "<h1 mat-dialog-title *ngIf=\"title\">{{title}}</h1>\n<div mat-dialog-content *ngIf=\"message\">\n  <p>{{message}}</p>\n</div>\n<div \n  mat-dialog-actions \n  [style.text-align]=\"'right'\"\n  class=\"cf-dialog-action\">\n    <!-- <button mat-flat-button *ngFor=\"let dialogButton of data.confirmationConfig.buttons\" \n        [color]=\"dialogButton.color\" [mat-dialog-close]=\"dialogButton.type\" cdkFocusInitial>\n        <mat-icon aria-hidden=\"true\" [attr.aria-label]=\"dialogButton.label\" [ngClass]=\"{'button-icon-text-padding': dialogButton.icon && dialogButton.label}\" *ngIf=\"displayIcon(dialogButton)\">{{dialogButton.icon}}</mat-icon>\n        <span *ngIf=\"!displayOnlyIcon(dialogButton)\">{{ dialogButton.label }}</span>\n    </button> -->\n    <!-- <pre>{{data | json}}</pre>  -->\n    <cf-button *ngFor=\"let button of data.confirmationConfig.buttons\"\n      [form]=\"data.form\"\n      [sourceIdentifier]=\"data.sourceIdentifier\"\n      [sourceIndex]=\"data.sourceIndex\"\n      [widgetArrayIndex]=\"data.widgetArrayIndex\"\n      [button]=\"button\"\n      [context]=\"data.context\"\n      [originalData]=\"data.originalData\"\n      [buttonRoute]=\"data.buttonRoute\"\n      [parentHierarchy]=\"data.parentHierarchy\"\n      class=\"cf-button\"\n      (onClick)=\"click($event)\"\n    ></cf-button>\n</div>",
                styles: [".cf-dialog-action{text-align:right}.cf-dialog-action>.cf-button{margin-right:8px}"]
            },] }
];
ButtonDeleteConfirmationComponent.ctorParameters = () => [
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] },
    { type: Ability }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWRlbGV0ZS1jb25maXJtYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9uaXRpbmtoYWl0YW4vTml0aW4vc3R1ZHkvYW5ndWxhci9tYXRlcmlhbC9hZG1pbi1idWlsZGVyLXBsdWdpbi9wcm9qZWN0cy9uZ3gtbWF0ZXJpYWwtd2lkZ2V0L3NyYy8iLCJzb3VyY2VzIjpbImxpYi9idXR0b24vY29tcG9uZW50L2J1dHRvbi1kZWxldGUtY29uZmlybWF0aW9uL2J1dHRvbi1kZWxldGUtY29uZmlybWF0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFHNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFtQnhDLE1BQU0sT0FBTyxpQ0FBaUM7SUFFNUMsWUFBbUIsU0FBMEQsRUFDM0MsSUFBZ0IsRUFDeEMsT0FBZ0I7UUFGUCxjQUFTLEdBQVQsU0FBUyxDQUFpRDtRQUMzQyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ3hDLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDdEIsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUtILFFBQVE7UUFDTixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsZUFBZSxDQUFDLE1BQStCO1FBQzdDLE9BQU8sTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ3pHLENBQUM7SUFFRCxXQUFXLENBQUMsTUFBK0I7UUFDekMsT0FBTyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDcEUsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFZO1FBQ2xCLE9BQU8sV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsS0FBSyxDQUFDLEtBQVU7UUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7WUFuQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwrQkFBK0I7Z0JBQ3pDLGcwQ0FBMEQ7O2FBRTNEOzs7WUF2QlEsWUFBWTs0Q0EyQmhCLE1BQU0sU0FBQyxlQUFlO1lBdEJsQixPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmLCBNQVRfRElBTE9HX0RBVEEgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgT2JqZWN0VXRpbHMsIFN0cmluZ1V0aWxzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbGl0eSc7XG5pbXBvcnQgeyBDb25maXJtYXRpb25Qb3B1cEJ1dHRvbiwgQ29uZmlybWF0aW9uUG9wdXAsIE9iamVjdFRyZWUgfSBmcm9tICcuLi8uLi9tb2RlbCc7XG5pbXBvcnQgeyBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBYmlsaXR5VXRpbHMgfSBmcm9tICcuLi8uLi8uLi91dGlsaXR5L2FiaWxpdHkudXRpbGl0eSc7XG5pbXBvcnQgeyBBYmlsaXR5IH0gZnJvbSAnQGNhc2wvYWJpbGl0eSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlhbG9nRGF0YSB7XG4gIGZvcm06IEZvcm1Hcm91cCxcbiAgc291cmNlSWRlbnRpZmllcjogc3RyaW5nLFxuICBzb3VyY2VJbmRleDogbnVtYmVyLFxuICB3aWRnZXRBcnJheUluZGV4OiBudW1iZXIsXG4gIGNvbnRleHQ6IGFueSxcbiAgb3JpZ2luYWxEYXRhOiBhbnksIFxuICBidXR0b25Sb3V0ZTogQXJyYXk8c3RyaW5nPixcbiAgcGFyZW50SGllcmFyY2h5OiBPYmplY3RUcmVlLFxuICBjb25maXJtYXRpb25Db25maWc6IENvbmZpcm1hdGlvblBvcHVwO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjZi1idXR0b24tZGVsZXRlLWNvbmZpcm1hdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9idXR0b24tZGVsZXRlLWNvbmZpcm1hdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2J1dHRvbi1kZWxldGUtY29uZmlybWF0aW9uLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQnV0dG9uRGVsZXRlQ29uZmlybWF0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8QnV0dG9uRGVsZXRlQ29uZmlybWF0aW9uQ29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IERpYWxvZ0RhdGEsXG4gICAgcHJpdmF0ZSBhYmlsaXR5OiBBYmlsaXR5KSB7IFxuICAgICAgQWJpbGl0eVV0aWxzLnNldEFiaWxpdHkodGhpcy5hYmlsaXR5KTtcbiAgICB9IFxuXG4gIHRpdGxlOiBzdHJpbmc7XG4gIG1lc3NhZ2U6IHN0cmluZztcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnRpdGxlID0gdGhpcy5yZXNvbHZlKHRoaXMuZGF0YS5jb25maXJtYXRpb25Db25maWcudGl0bGUpO1xuICAgIHRoaXMubWVzc2FnZSA9IHRoaXMucmVzb2x2ZSh0aGlzLmRhdGEuY29uZmlybWF0aW9uQ29uZmlnLm1lc3NhZ2UpO1xuICB9XG5cbiAgZGlzcGxheU9ubHlJY29uKGJ1dHRvbjogQ29uZmlybWF0aW9uUG9wdXBCdXR0b24pOiBib29sZWFuIHtcbiAgICByZXR1cm4gYnV0dG9uICYmICFTdHJpbmdVdGlscy5pc0VtcHR5KGJ1dHRvbi5pY29uKSAmJiBTdHJpbmdVdGlscy5pc0VtcHR5KGJ1dHRvbi5sYWJlbCkgPyB0cnVlIDogZmFsc2U7XG4gIH1cblxuICBkaXNwbGF5SWNvbihidXR0b246IENvbmZpcm1hdGlvblBvcHVwQnV0dG9uKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGJ1dHRvbiAmJiAhU3RyaW5nVXRpbHMuaXNFbXB0eShidXR0b24uaWNvbikgPyB0cnVlIDogZmFsc2U7XG4gIH1cblxuICByZXNvbHZlKHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIE9iamVjdFV0aWxzLnJlc29sdmUodGV4dCwgdGhpcy5kYXRhLm9yaWdpbmFsRGF0YSk7XG4gIH1cblxuICBjbGljayhldmVudDogYW55KSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoZXZlbnQpO1xuICB9XG59XG4iXX0=