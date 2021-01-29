import { Component, ViewEncapsulation } from '@angular/core';
import { FieldLayoutComponent } from '../field-layout.component';
export class FieldHorizontalLayoutComponent extends FieldLayoutComponent {
    //protected dateService: NbDateService<Date>, protected autocompleteSearch: AutocompleteService
    //  constructor() {
    //    super(dateService, autocompleteSearch);
    //  }
    ngOnInit() {
        this.initField();
    }
    displayHorizonalForm() {
        return this.isValidDisplayType("HORIZONTAL" /* HORIZONTAL */);
    }
}
FieldHorizontalLayoutComponent.decorators = [
    { type: Component, args: [{
                selector: 'cf-field-horizontal-layout',
                template: "<!-- <div class=\"form-group row\" *ngIf=\"displayHorizonalForm()\">\n  <mat-form-field>\n    <mat-label class=\"label col-md-3 col-form-label\">\n      {{field.label}}\n      <span class=\"required-label\" *ngIf=\"isRequired()\">*</span>\n    </mat-label> -->\n    <!-- <div class=\"col-md-9\"> -->\n      <cf-field\n        [sourceIdentifier]=\"sourceIdentifier\" \n        [sourceIndex]=\"sourceIndex\" \n        [form]=\"form\" \n        [field]=\"field\" \n        [displayMode]=\"displayMode\" \n        [value]=\"value\" \n        [dependencies]=\"dependencies\"\n        [row]=\"row\"\n        [keyMap]=\"keyMap\"\n      ></cf-field>\n    <!-- </div> -->\n  <!-- </mat-form-field>\n</div> -->",
                encapsulation: ViewEncapsulation.None,
                styles: [""]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtaG9yaXpvbnRhbC1sYXlvdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9uaXRpbmtoYWl0YW4vTml0aW4vc3R1ZHkvYW5ndWxhci9tYXRlcmlhbC9hZG1pbi1idWlsZGVyLXBsdWdpbi9wcm9qZWN0cy9uZ3gtbWF0ZXJpYWwtd2lkZ2V0L3NyYy8iLCJzb3VyY2VzIjpbImxpYi9maWVsZC9jb21wb25lbnQvZmllbGQtbGF5b3V0L2ZpZWxkLWhvcml6b250YWwtbGF5b3V0L2ZpZWxkLWhvcml6b250YWwtbGF5b3V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBU2pFLE1BQU0sT0FBTyw4QkFBK0IsU0FBUSxvQkFBb0I7SUFDdEUsK0ZBQStGO0lBQ2pHLG1CQUFtQjtJQUNuQiw2Q0FBNkM7SUFDN0MsS0FBSztJQUVILFFBQVE7UUFDTixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELG9CQUFvQjtRQUNsQixPQUFPLElBQUksQ0FBQyxrQkFBa0IsK0JBQTRCLENBQUM7SUFDN0QsQ0FBQzs7O1lBbEJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNEJBQTRCO2dCQUN0Qyx3c0JBQXVEO2dCQUV2RCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDdEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkTGF5b3V0Q29tcG9uZW50IH0gZnJvbSAnLi4vZmllbGQtbGF5b3V0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGaWVsZERpYXBseVR5cGUgfSBmcm9tICcuLi8uLi8uLi9tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NmLWZpZWxkLWhvcml6b250YWwtbGF5b3V0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpZWxkLWhvcml6b250YWwtbGF5b3V0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZmllbGQtaG9yaXpvbnRhbC1sYXlvdXQuY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBGaWVsZEhvcml6b250YWxMYXlvdXRDb21wb25lbnQgZXh0ZW5kcyBGaWVsZExheW91dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIC8vcHJvdGVjdGVkIGRhdGVTZXJ2aWNlOiBOYkRhdGVTZXJ2aWNlPERhdGU+LCBwcm90ZWN0ZWQgYXV0b2NvbXBsZXRlU2VhcmNoOiBBdXRvY29tcGxldGVTZXJ2aWNlXG4vLyAgY29uc3RydWN0b3IoKSB7XG4vLyAgICBzdXBlcihkYXRlU2VydmljZSwgYXV0b2NvbXBsZXRlU2VhcmNoKTtcbi8vICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pbml0RmllbGQoKTtcbiAgfVxuXG4gIGRpc3BsYXlIb3Jpem9uYWxGb3JtKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWREaXNwbGF5VHlwZShGaWVsZERpYXBseVR5cGUuSE9SSVpPTlRBTCk7XG4gIH1cbn1cbiJdfQ==