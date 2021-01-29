import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FieldComponent } from '../field/field.component';
import { Ability } from '@casl/ability';
import { FormUtils, ButtonUtils } from '../../../utility';
export class ParagraphComponent extends FieldComponent {
    constructor(router, ability) {
        super(router, ability);
        this.router = router;
        this.ability = ability;
        this.tokens = new Array();
        this.onButtonClick = new EventEmitter();
    }
    ngOnInit() {
        this.paragraphField = this.field;
        let words = this.paragraphField.template.split(' ');
        if (words && words.length > 0) {
            words.map(word => {
                var key = word.slice(1, -1);
                if (word.indexOf('{') == -1) {
                    this.tokens.push({ type: 'LABEL', value: word });
                }
                else if (word.indexOf('{') != -1 && this.paragraphField.fieldContexts[key] != undefined) {
                    this.tokens.push({ type: 'FIELD', field: this.paragraphField.fieldContexts[key] });
                    if (this.paragraphField.isReadOnly) {
                        this.paragraphField.fieldContexts[key]['isReadOnly'] = this.paragraphField.isReadOnly;
                    }
                    if (this.paragraphField.displayMode == "LABEL" /* LABEL */) {
                        this.paragraphField.fieldContexts[key]['displayMode'] = "LABEL" /* LABEL */;
                    }
                }
                else if (word.indexOf('{') != -1 && this.paragraphField.buttonContexts[key] != undefined) {
                    this.tokens.push({ type: 'BUTTON', button: this.paragraphField.buttonContexts[key] });
                    // if (this.paragraphField.isReadOnly) {
                    //     this.paragraphField.buttonContexts[key]['displayMode'] = DisplayMode.DISABLED;
                    // }
                }
            });
        }
    }
    fieldChange(fieldChange) {
        this.onFieldChange.emit(fieldChange);
    }
    isButtonDisable() {
        return ButtonUtils.isDisable(this.displayMode) || this.paragraphField.isReadOnly;
    }
    getFormValue() {
        return FormUtils.getRawValue(this.form);
    }
    buttonClick(event) {
        console.log(event);
        this.onButtonClick.emit(event);
    }
}
ParagraphComponent.decorators = [
    { type: Component, args: [{
                selector: 'cf-paragraph',
                template: "<ng-container *ngFor=\"let token of tokens\">\n    <ng-container *ngIf=\"token.type == 'LABEL'\">\n        <span class=\"text\">{{token.value}} </span>\n    </ng-container>\n    <ng-container *ngIf=\"token.type == 'FIELD'\">\n        <cf-field \n            [sourceType]=\"sourceType\"\n            [sourceIdentifier]=\"sourceIdentifier\" \n            [sourceIndex]=\"sourceIndex\" \n            [widgetArrayIndex]=\"widgetArrayIndex\"\n            [form]=\"form\" \n            [fieldControl]=\"fieldControl['controls'][token.field.key]\"\n            [keyMap]=\"keyMap\"\n            [field]=\"token.field\"\n            [displayMode]=\"displayMode\" \n            [value]=\"\" \n            (onFieldChange)=\"fieldChange($event)\" \n            class=\"field\">\n        </cf-field> \n    </ng-container> \n    <ng-container *ngIf=\"token.type == 'BUTTON'\">\n        <!-- \n        [buttonRoute]=\"buttonRoute\"\n        [parentHierarchy]=\"parentHierarchy\"\n         -->\n        <cf-button\n            [form]=\"form\"\n            [sourceIdentifier]=\"sourceIdentifier\"\n            [sourceIndex]=\"sourceIndex\"\n            class=\"button\"\n            [widgetArrayIndex]=\"widgetArrayIndex\"\n            [button]=\"token.button\"\n            [context]=\"getFormValue()\"\n            [originalData]=\"originalData\"\n            [formDisplayMode]=\"displayMode\"\n            [disabled]=\"isButtonDisable()\"\n            (onClick)=\"buttonClick($event)\"\n        ></cf-button>\n    </ng-container>\n</ng-container>",
                encapsulation: ViewEncapsulation.None,
                styles: [".text{vertical-align:middle}.button,.field{padding:0 10px}"]
            },] }
];
ParagraphComponent.ctorParameters = () => [
    { type: Router },
    { type: Ability }
];
ParagraphComponent.propDecorators = {
    onButtonClick: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYWdyYXBoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvbml0aW5raGFpdGFuL05pdGluL3N0dWR5L2FuZ3VsYXIvbWF0ZXJpYWwvYWRtaW4tYnVpbGRlci1wbHVnaW4vcHJvamVjdHMvbmd4LW1hdGVyaWFsLXdpZGdldC9zcmMvIiwic291cmNlcyI6WyJsaWIvZmllbGQvY29tcG9uZW50L3BhcmFncmFwaC9wYXJhZ3JhcGguY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFpQixNQUFNLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbEcsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBR3pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFRMUQsTUFBTSxPQUFPLGtCQUFtQixTQUFRLGNBQWM7SUFLbEQsWUFBbUIsTUFBYyxFQUFTLE9BQWdCO1FBQ3RELEtBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFEUixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUoxRCxXQUFNLEdBQXFCLElBQUksS0FBSyxFQUFhLENBQUM7UUFFeEMsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBSTdDLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLGNBQWMsR0FBb0IsSUFBSSxDQUFDLEtBQU0sQ0FBQztRQUNuRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFcEQsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDM0IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDYixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU1QixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7b0JBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDcEQ7cUJBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLFNBQVMsRUFBRTtvQkFDdkYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ25GLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUU7d0JBQ2hDLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDO3FCQUN6RjtvQkFDRCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyx1QkFBcUIsRUFBRTt3QkFDdEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLHNCQUFvQixDQUFDO3FCQUM3RTtpQkFDSjtxQkFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksU0FBUyxFQUFFO29CQUN4RixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDdEYsd0NBQXdDO29CQUN4QyxxRkFBcUY7b0JBQ3JGLElBQUk7aUJBQ1A7WUFDTCxDQUFDLENBQUMsQ0FBQTtTQUNMO0lBQ0wsQ0FBQztJQUVELFdBQVcsQ0FBQyxXQUF3QjtRQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsZUFBZTtRQUNYLE9BQU8sV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUM7SUFDckYsQ0FBQztJQUVELFlBQVk7UUFDUixPQUFPLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBVTtRQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLENBQUM7OztZQTFESixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLHdnREFBeUM7Z0JBRXpDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN4Qzs7O1lBYlEsTUFBTTtZQUtOLE9BQU87Ozs0QkFZWCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgRm9ybSwgRm9ybURpYXBseU1vZGUgfSBmcm9tICcuLi8uLi8uLi9mb3JtL21vZGVsJztcbmltcG9ydCB7IERpc3BsYXlNb2RlLCBGaWVsZENoYW5nZSwgS2V5TWFwIH0gZnJvbSAnLi4vLi4vbW9kZWwnO1xuaW1wb3J0IHsgRmllbGRDb21wb25lbnQgfSBmcm9tICcuLi9maWVsZC9maWVsZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGFyYWdyYXBoRmllbGQsIFRva2VuVHlwZSB9IGZyb20gJy4uLy4uL21vZGVsL3BhcmFncmFwaC5tb2RlbCc7XG5pbXBvcnQgeyBBYmlsaXR5IH0gZnJvbSAnQGNhc2wvYWJpbGl0eSc7XG5pbXBvcnQgeyBGb3JtVXRpbHMsIEJ1dHRvblV0aWxzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbGl0eSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnY2YtcGFyYWdyYXBoJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcGFyYWdyYXBoLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9wYXJhZ3JhcGguY29tcG9uZW50LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KSBcbmV4cG9ydCBjbGFzcyBQYXJhZ3JhcGhDb21wb25lbnQgZXh0ZW5kcyBGaWVsZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgdG9rZW5zOiBBcnJheTxUb2tlblR5cGU+ID0gbmV3IEFycmF5PFRva2VuVHlwZT4oKTtcbiAgICBwYXJhZ3JhcGhGaWVsZDogUGFyYWdyYXBoRmllbGQ7XG4gICAgQE91dHB1dCgpIG9uQnV0dG9uQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcm91dGVyOiBSb3V0ZXIsIHB1YmxpYyBhYmlsaXR5OiBBYmlsaXR5KSB7XG4gICAgICAgIHN1cGVyKHJvdXRlciwgYWJpbGl0eSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucGFyYWdyYXBoRmllbGQgPSAoPFBhcmFncmFwaEZpZWxkPnRoaXMuZmllbGQpO1xuICAgICAgICBsZXQgd29yZHMgPSB0aGlzLnBhcmFncmFwaEZpZWxkLnRlbXBsYXRlLnNwbGl0KCcgJyk7XG5cbiAgICAgICAgaWYgKHdvcmRzICYmIHdvcmRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHdvcmRzLm1hcCh3b3JkID0+IHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gd29yZC5zbGljZSgxLCAtMSk7XG5cbiAgICAgICAgICAgICAgICBpZiAod29yZC5pbmRleE9mKCd7JykgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2tlbnMucHVzaCh7IHR5cGU6ICdMQUJFTCcsIHZhbHVlOiB3b3JkIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAod29yZC5pbmRleE9mKCd7JykgIT0gLTEgJiYgdGhpcy5wYXJhZ3JhcGhGaWVsZC5maWVsZENvbnRleHRzW2tleV0gIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9rZW5zLnB1c2goeyB0eXBlOiAnRklFTEQnLCBmaWVsZDogdGhpcy5wYXJhZ3JhcGhGaWVsZC5maWVsZENvbnRleHRzW2tleV0gfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhcmFncmFwaEZpZWxkLmlzUmVhZE9ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyYWdyYXBoRmllbGQuZmllbGRDb250ZXh0c1trZXldWydpc1JlYWRPbmx5J10gPSB0aGlzLnBhcmFncmFwaEZpZWxkLmlzUmVhZE9ubHk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyYWdyYXBoRmllbGQuZGlzcGxheU1vZGUgPT0gRGlzcGxheU1vZGUuTEFCRUwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyYWdyYXBoRmllbGQuZmllbGRDb250ZXh0c1trZXldWydkaXNwbGF5TW9kZSddID0gRGlzcGxheU1vZGUuTEFCRUw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHdvcmQuaW5kZXhPZigneycpICE9IC0xICYmIHRoaXMucGFyYWdyYXBoRmllbGQuYnV0dG9uQ29udGV4dHNba2V5XSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2tlbnMucHVzaCh7IHR5cGU6ICdCVVRUT04nLCBidXR0b246IHRoaXMucGFyYWdyYXBoRmllbGQuYnV0dG9uQ29udGV4dHNba2V5XSB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKHRoaXMucGFyYWdyYXBoRmllbGQuaXNSZWFkT25seSkge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5wYXJhZ3JhcGhGaWVsZC5idXR0b25Db250ZXh0c1trZXldWydkaXNwbGF5TW9kZSddID0gRGlzcGxheU1vZGUuRElTQUJMRUQ7XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmllbGRDaGFuZ2UoZmllbGRDaGFuZ2U6IEZpZWxkQ2hhbmdlKSB7XG4gICAgICAgIHRoaXMub25GaWVsZENoYW5nZS5lbWl0KGZpZWxkQ2hhbmdlKTtcbiAgICB9XG5cbiAgICBpc0J1dHRvbkRpc2FibGUoKSAgIHtcbiAgICAgICAgcmV0dXJuIEJ1dHRvblV0aWxzLmlzRGlzYWJsZSh0aGlzLmRpc3BsYXlNb2RlKSB8fCB0aGlzLnBhcmFncmFwaEZpZWxkLmlzUmVhZE9ubHk7XG4gICAgfVxuXG4gICAgZ2V0Rm9ybVZhbHVlKCk6IGFueSB7XG4gICAgICAgIHJldHVybiBGb3JtVXRpbHMuZ2V0UmF3VmFsdWUodGhpcy5mb3JtKTtcbiAgICB9XG5cbiAgICBidXR0b25DbGljayhldmVudDogYW55KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICAgICAgdGhpcy5vbkJ1dHRvbkNsaWNrLmVtaXQoZXZlbnQpO1xuICAgIH1cbn1cbiJdfQ==