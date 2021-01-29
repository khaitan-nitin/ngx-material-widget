import { Component, ViewEncapsulation } from '@angular/core';
import { FieldLayoutComponent } from '../field-layout.component';
export class FieldVerticalLayoutComponent extends FieldLayoutComponent {
    //protected dateService: NbDateService<Date>, protected autocompleteSearch: AutocompleteService
    //  constructor() {
    //    super(dateService, autocompleteSearch);
    //  }
    ngOnInit() {
        this.initField();
    }
    displayVerticalForm() {
        return this.isValidDisplayType("INLINE" /* INLINE */);
    }
}
FieldVerticalLayoutComponent.decorators = [
    { type: Component, args: [{
                selector: 'cf-field-vertical-layout',
                template: "<div class=\"form-group\" *ngIf=\"displayVerticalForm()\">\n  <mat-form-field>\n    <mat-label class=\"label\">\n      {{field.label}}\n      <span class=\"required-label\" *ngIf=\"isRequired()\">*</span>\n    </mat-label>\n    <cf-field \n      [sourceIdentifier]=\"sourceIdentifier\" \n      [sourceIndex]=\"sourceIndex\" \n      [form]=\"form\" \n      [field]=\"field\" \n      [displayMode]=\"displayMode\" \n      [value]=\"value\" \n      [dependencies]=\"dependencies\"\n      [row]=\"row\"\n      [keyMap]=\"keyMap\"\n    ></cf-field>\n  </mat-form-field>\n</div>",
                encapsulation: ViewEncapsulation.None,
                styles: [""]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtdmVydGljYWwtbGF5b3V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvbml0aW5raGFpdGFuL05pdGluL3N0dWR5L2FuZ3VsYXIvbWF0ZXJpYWwvYWRtaW4tYnVpbGRlci1wbHVnaW4vcHJvamVjdHMvbmd4LW1hdGVyaWFsLXdpZGdldC9zcmMvIiwic291cmNlcyI6WyJsaWIvZmllbGQvY29tcG9uZW50L2ZpZWxkLWxheW91dC9maWVsZC12ZXJ0aWNhbC1sYXlvdXQvZmllbGQtdmVydGljYWwtbGF5b3V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBU2pFLE1BQU0sT0FBTyw0QkFBNkIsU0FBUSxvQkFBb0I7SUFDcEUsK0ZBQStGO0lBQ2pHLG1CQUFtQjtJQUNuQiw2Q0FBNkM7SUFDN0MsS0FBSztJQUVILFFBQVE7UUFDTixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELG1CQUFtQjtRQUNqQixPQUFPLElBQUksQ0FBQyxrQkFBa0IsdUJBQXdCLENBQUM7SUFDekQsQ0FBQzs7O1lBbEJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQyx3a0JBQXFEO2dCQUVyRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDdEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkTGF5b3V0Q29tcG9uZW50IH0gZnJvbSAnLi4vZmllbGQtbGF5b3V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWVsZERpYXBseVR5cGUgfSBmcm9tICcuLi8uLi8uLi9tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NmLWZpZWxkLXZlcnRpY2FsLWxheW91dCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9maWVsZC12ZXJ0aWNhbC1sYXlvdXQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9maWVsZC12ZXJ0aWNhbC1sYXlvdXQuY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBGaWVsZFZlcnRpY2FsTGF5b3V0Q29tcG9uZW50IGV4dGVuZHMgRmllbGRMYXlvdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAvL3Byb3RlY3RlZCBkYXRlU2VydmljZTogTmJEYXRlU2VydmljZTxEYXRlPiwgcHJvdGVjdGVkIGF1dG9jb21wbGV0ZVNlYXJjaDogQXV0b2NvbXBsZXRlU2VydmljZVxuLy8gIGNvbnN0cnVjdG9yKCkge1xuLy8gICAgc3VwZXIoZGF0ZVNlcnZpY2UsIGF1dG9jb21wbGV0ZVNlYXJjaCk7XG4vLyAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaW5pdEZpZWxkKCk7XG4gIH1cbiAgXG4gIGRpc3BsYXlWZXJ0aWNhbEZvcm0oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNWYWxpZERpc3BsYXlUeXBlKEZpZWxkRGlhcGx5VHlwZS5JTkxJTkUpO1xuICB9IFxufVxuIl19