import { Component, ViewEncapsulation } from '@angular/core';
import { FieldLayoutComponent } from '../field-layout.component';
export class FieldInlineLayoutComponent extends FieldLayoutComponent {
    //protected dateService: NbDateService<Date>, protected autocompleteSearch: AutocompleteService
    //  constructor() {
    //    super(dateService, autocompleteSearch);
    //  }
    ngOnInit() {
        this.initField();
    }
    displayInlineForm() {
        return this.isValidDisplayType("INLINE" /* INLINE */);
    }
}
FieldInlineLayoutComponent.decorators = [
    { type: Component, args: [{
                selector: 'cf-field-inline-layout',
                template: "<div class=\"form-group row\" *ngIf=\"displayInlineForm()\" >\n    <div class=\"col-md-12\">\n      <mat-form-field>\n        <!-- <mat-label>{{field.label}}</mat-label> -->\n        <cf-field \n          [sourceIdentifier]=\"sourceIdentifier\" \n          [sourceIndex]=\"sourceIndex\" \n          [form]=\"form\" \n          [field]=\"field\" \n          [displayMode]=\"displayMode\" \n          [value]=\"value\" \n          [dependencies]=\"dependencies\"\n          [row]=\"row\"\n          [keyMap]=\"keyMap\"\n        ></cf-field>\n      </mat-form-field>\n    </div>\n  </div>",
                encapsulation: ViewEncapsulation.None,
                styles: [""]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtaW5saW5lLWxheW91dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL25pdGlua2hhaXRhbi9OaXRpbi9zdHVkeS9hbmd1bGFyL21hdGVyaWFsL2FkbWluLWJ1aWxkZXItcGx1Z2luL3Byb2plY3RzL25neC1tYXRlcmlhbC13aWRnZXQvc3JjLyIsInNvdXJjZXMiOlsibGliL2ZpZWxkL2NvbXBvbmVudC9maWVsZC1sYXlvdXQvZmllbGQtaW5saW5lLWxheW91dC9maWVsZC1pbmxpbmUtbGF5b3V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBU2pFLE1BQU0sT0FBTywwQkFBMkIsU0FBUSxvQkFBb0I7SUFDbEUsK0ZBQStGO0lBQ2pHLG1CQUFtQjtJQUNuQiw2Q0FBNkM7SUFDN0MsS0FBSztJQUVILFFBQVE7UUFDTixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELGlCQUFpQjtRQUNmLE9BQU8sSUFBSSxDQUFDLGtCQUFrQix1QkFBd0IsQ0FBQztJQUN6RCxDQUFDOzs7WUFsQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLHFsQkFBbUQ7Z0JBRW5ELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGRMYXlvdXRDb21wb25lbnQgfSBmcm9tICcuLi9maWVsZC1sYXlvdXQuY29tcG9uZW50JztcbmltcG9ydCB7IEZpZWxkRGlhcGx5VHlwZSB9IGZyb20gJy4uLy4uLy4uL21vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2YtZmllbGQtaW5saW5lLWxheW91dCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9maWVsZC1pbmxpbmUtbGF5b3V0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZmllbGQtaW5saW5lLWxheW91dC5jb21wb25lbnQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEZpZWxkSW5saW5lTGF5b3V0Q29tcG9uZW50IGV4dGVuZHMgRmllbGRMYXlvdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAvL3Byb3RlY3RlZCBkYXRlU2VydmljZTogTmJEYXRlU2VydmljZTxEYXRlPiwgcHJvdGVjdGVkIGF1dG9jb21wbGV0ZVNlYXJjaDogQXV0b2NvbXBsZXRlU2VydmljZVxuLy8gIGNvbnN0cnVjdG9yKCkge1xuLy8gICAgc3VwZXIoZGF0ZVNlcnZpY2UsIGF1dG9jb21wbGV0ZVNlYXJjaCk7XG4vLyAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaW5pdEZpZWxkKCk7XG4gIH1cbiAgXG4gIGRpc3BsYXlJbmxpbmVGb3JtKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWREaXNwbGF5VHlwZShGaWVsZERpYXBseVR5cGUuSU5MSU5FKTtcbiAgfVxufVxuIl19