import { Component, Inject, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbilityUtils } from '../../../utility/ability.utility';
import { Ability } from '@casl/ability';
export class ModalComponent {
    constructor(dialogRef, data, ability) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.ability = ability;
        this.onFormChange = new EventEmitter();
        this.onFieldChange = new EventEmitter();
        this.onButtonClick = new EventEmitter();
        AbilityUtils.setAbility(this.ability);
    }
    ngOnInit() {
    }
    click(event) {
        this.dialogRef.close(event);
    }
    fieldChange(fieldChange) {
        console.log(fieldChange);
        this.onFieldChange.emit(fieldChange);
    }
    formChange(form) {
        this.onFormChange.emit(form);
    }
    buttonClick(event) {
        console.log(event);
        this.onButtonClick.emit(event);
    }
}
ModalComponent.decorators = [
    { type: Component, args: [{
                selector: 'cf-modal',
                template: "<!-- <h1 mat-dialog-title *ngIf=\"title\">{{title}}</h1>\n<div mat-dialog-content *ngIf=\"message\">\n  <p>{{message}}</p>\n</div>\n<div \n  mat-dialog-actions \n  [style.text-align]=\"'right'\"\n  class=\"cf-dialog-action\">\n</div> -->\n\n<!-- <pre>\n    {{data | json}}\n</pre> -->\n<cf-form \n    *ngIf=\"data && data.type == 'FORM'\"\n    [formConfig]=\"data.widgetConfig\"\n    [sourceIndex]=\"data.sourceIndex\"\n    [record]=\"data.context ? data.context[data.widgetConfig.identifier] : data.context\"\n    [originalData]=\"data.originalData && data.originalData.record ? data.originalData.record[data.widgetConfig.identifier] : {}\"  \n    [keyMap]=\"data.keyMap\"\n    [reset]=\"data.reset\"\n    (onFieldChange)=\"fieldChange($event)\"\n    (onFormChange)=\"formChange($event)\"\n    (onButtonClick)=\"buttonClick($event)\"\n></cf-form>\n",
                encapsulation: ViewEncapsulation.None,
                styles: [".cf-dialog-action{text-align:right}.cf-dialog-action>.cf-button{margin-right:8px}.mat-dialog-container{padding:0!important}"]
            },] }
];
ModalComponent.ctorParameters = () => [
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] },
    { type: Ability }
];
ModalComponent.propDecorators = {
    onFormChange: [{ type: Output }],
    onFieldChange: [{ type: Output }],
    onButtonClick: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9uaXRpbmtoYWl0YW4vTml0aW4vc3R1ZHkvYW5ndWxhci9tYXRlcmlhbC9hZG1pbi1idWlsZGVyLXBsdWdpbi9wcm9qZWN0cy9uZ3gtbWF0ZXJpYWwtd2lkZ2V0L3NyYy8iLCJzb3VyY2VzIjpbImxpYi9tb2RhbC9jb21wb25lbnQvbW9kYWwvbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJbkcsT0FBTyxFQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQW1CeEMsTUFBTSxPQUFPLGNBQWM7SUFLekIsWUFBbUIsU0FBdUMsRUFDeEIsSUFBZ0IsRUFDeEMsT0FBZ0I7UUFGUCxjQUFTLEdBQVQsU0FBUyxDQUE4QjtRQUN4QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ3hDLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFOaEIsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2xDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNuQyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFLekMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVILFFBQVE7SUFDUixDQUFDO0lBRUQsS0FBSyxDQUFDLEtBQVU7UUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsV0FBVyxDQUFDLFdBQXdCO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUFTO1FBQ2xCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBVTtRQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7OztZQXBDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLDYxQkFBcUM7Z0JBRXJDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN0Qzs7O1lBcEJRLFlBQVk7NENBMkJoQixNQUFNLFNBQUMsZUFBZTtZQXpCbEIsT0FBTzs7OzJCQW9CYixNQUFNOzRCQUNOLE1BQU07NEJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbmplY3QsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uLy4uLy4uL2Zvcm0vbW9kZWwnO1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gJy4uLy4uLy4uL2xpc3QvbW9kZWwnO1xuaW1wb3J0IHsgS2V5TWFwLCBGaWVsZENoYW5nZSB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkL21vZGVsJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IEFiaWxpdHlVdGlscyB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdHkvYWJpbGl0eS51dGlsaXR5JztcbmltcG9ydCB7IEFiaWxpdHkgfSBmcm9tICdAY2FzbC9hYmlsaXR5JztcblxuZXhwb3J0IGludGVyZmFjZSBEaWFsb2dEYXRhIHtcbiAgdHlwZTogc3RyaW5nLFxuICB3aWRnZXRDb25maWc6IEZvcm0gfCBMaXN0LFxuICBzb3VyY2VJbmRleDogbnVtYmVyLFxuICBjb250ZXh0OiBhbnksXG4gIG9yaWdpbmFsRGF0YTogYW55LFxuICBrZXlNYXA6IEFycmF5PEtleU1hcD4sXG4gIHJlc2V0OiBib29sZWFuLFxuICBjdXJyZW50SW5zdGFuY2U6IGFueVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjZi1tb2RhbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9tb2RhbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21vZGFsLmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAT3V0cHV0KCkgb25Gb3JtQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25GaWVsZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uQnV0dG9uQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPE1vZGFsQ29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IERpYWxvZ0RhdGEsXG4gICAgcHJpdmF0ZSBhYmlsaXR5OiBBYmlsaXR5KSB7IFxuICAgICAgQWJpbGl0eVV0aWxzLnNldEFiaWxpdHkodGhpcy5hYmlsaXR5KTtcbiAgICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gIH1cblxuICBjbGljayhldmVudDogYW55KSB7XG4gICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoZXZlbnQpO1xuICB9XG5cbiAgZmllbGRDaGFuZ2UoZmllbGRDaGFuZ2U6IEZpZWxkQ2hhbmdlKSB7XG4gICAgY29uc29sZS5sb2coZmllbGRDaGFuZ2UpO1xuICAgIHRoaXMub25GaWVsZENoYW5nZS5lbWl0KGZpZWxkQ2hhbmdlKTtcbiAgfVxuXG4gIGZvcm1DaGFuZ2UoZm9ybTogYW55KSB7XG4gICAgdGhpcy5vbkZvcm1DaGFuZ2UuZW1pdChmb3JtKTtcbiAgfVxuXG4gIGJ1dHRvbkNsaWNrKGV2ZW50OiBhbnkpIHtcbiAgICBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgdGhpcy5vbkJ1dHRvbkNsaWNrLmVtaXQoZXZlbnQpO1xuICB9XG59XG4iXX0=