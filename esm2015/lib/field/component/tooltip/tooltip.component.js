import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CollectionUtils, StringUtils } from '../../../utility';
export class TooltipComponent {
    constructor() {
        this.field = null;
    }
    ngOnInit() {
        this.hasFieldNavigate = this.fieldNavigate();
        if (this.field.help && this.field.help.orientation) {
            this.placement = this.field.help.orientation.toLowerCase();
        }
        else {
            this.placement = 'bottom';
        }
        ;
    }
    fieldNavigate() {
        let hasFieldNavigate = false;
        if (this.field.navigate && (!StringUtils.isEmpty(this.field.navigate.icon) || !StringUtils.isEmpty(this.field.navigate.text)) && !CollectionUtils.isEmpty(this.field.navigate.routeTo)) {
            hasFieldNavigate = true;
        }
        return hasFieldNavigate;
    }
}
TooltipComponent.decorators = [
    { type: Component, args: [{
                selector: 'cf-tooltip',
                template: "    <!-- <mat-icon  matSuffix inline=\"true\"> {{field.help.icon ? field.help.icon : 'live_help'}}</mat-icon> -->\n<span *ngIf=\"field.help && field.help.message && !hasFieldNavigate && field.help.displayType == 'TOOLTIP'\" \n    [tooltip]=\"HtmlContent\"\n    [placement]=\"placement\"\n    theme=\"light\"\n    content-type=\"template\"\n    class=\"cf-field-hint cf-field-hint-inline cf-field-hint-{{field.key}}\">\n    \n    <button mat-icon-button class=\"cf-tooltip-button\">\n        <mat-icon inline=\"true\"> {{field.help.icon ? field.help.icon : 'live_help'}}</mat-icon>\n    </button>\n</span>\n\n<ng-template #HtmlContent>\n    <mat-card class=\"tooltip-card\">\n        <mat-card-header>\n            {{field.help.title}}\n        </mat-card-header>\n        <mat-card-content>\n            {{field.help.message}}\n        </mat-card-content>\n    </mat-card>\n</ng-template>",
                encapsulation: ViewEncapsulation.None,
                styles: [".tooltip{background-color:#fff!important;max-width:260px;padding:0!important}.tooltip .tooltip-card{margin:0!important;padding:0!important}.tooltip .tooltip-card .mat-card-header{background-color:#e5e3e3!important;color:#4d4d4d}.tooltip .tooltip-card .mat-card-content,.tooltip .tooltip-card .mat-card-header{padding:10px;text-align:left}.tooltip-top:after{border-color:#444 transparent transparent!important;border-width:7px!important;margin-left:-7px!important}.cf-tooltip-button{color:rgba(0,0,0,.54)}"]
            },] }
];
TooltipComponent.ctorParameters = () => [];
TooltipComponent.propDecorators = {
    field: [{ type: Input }],
    control: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL25pdGlua2hhaXRhbi9OaXRpbi9zdHVkeS9hbmd1bGFyL21hdGVyaWFsL2FkbWluLWJ1aWxkZXItcGx1Z2luL3Byb2plY3RzL25neC1tYXRlcmlhbC13aWRnZXQvc3JjLyIsInNvdXJjZXMiOlsibGliL2ZpZWxkL2NvbXBvbmVudC90b29sdGlwL3Rvb2x0aXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTVFLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFTaEUsTUFBTSxPQUFPLGdCQUFnQjtJQUt6QjtRQUpTLFVBQUssR0FBVSxJQUFJLENBQUM7SUFJYixDQUFDO0lBRWpCLFFBQVE7UUFDSixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzdDLElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQy9DLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzlEO2FBQU07WUFDSCxJQUFJLENBQUMsU0FBUyxHQUFFLFFBQVEsQ0FBQTtTQUMzQjtRQUFBLENBQUM7SUFDTixDQUFDO0lBRUQsYUFBYTtRQUNULElBQUksZ0JBQWdCLEdBQVksS0FBSyxDQUFDO1FBQ3RDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3BMLGdCQUFnQixHQUFHLElBQUksQ0FBQztTQUMzQjtRQUNELE9BQU8sZ0JBQWdCLENBQUM7SUFDNUIsQ0FBQzs7O1lBNUJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsbzRCQUF1QztnQkFFdkMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3hDOzs7O29CQUVJLEtBQUs7c0JBQ0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ29sbGVjdGlvblV0aWxzLCBTdHJpbmdVdGlscyB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdHknO1xuaW1wb3J0IHsgRmllbGQsIEhlbHBUZXh0T3JpZW50YXRpb24gfSBmcm9tICcuLi8uLi9tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnY2YtdG9vbHRpcCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3Rvb2x0aXAuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3Rvb2x0aXAuY29tcG9uZW50LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFRvb2x0aXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIGZpZWxkOiBGaWVsZCA9IG51bGw7XG4gICAgQElucHV0KCkgY29udHJvbDogRm9ybUNvbnRyb2w7XG4gICAgaGFzRmllbGROYXZpZ2F0ZTogYm9vbGVhbjtcbiAgICBwbGFjZW1lbnQ6IHN0cmluZztcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuaGFzRmllbGROYXZpZ2F0ZSA9IHRoaXMuZmllbGROYXZpZ2F0ZSgpO1xuICAgICAgICBpZih0aGlzLmZpZWxkLmhlbHAgJiYgdGhpcy5maWVsZC5oZWxwLm9yaWVudGF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnBsYWNlbWVudCA9IHRoaXMuZmllbGQuaGVscC5vcmllbnRhdGlvbi50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wbGFjZW1lbnQgPSdib3R0b20nXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZmllbGROYXZpZ2F0ZSgpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGhhc0ZpZWxkTmF2aWdhdGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuZmllbGQubmF2aWdhdGUgJiYgKCFTdHJpbmdVdGlscy5pc0VtcHR5KHRoaXMuZmllbGQubmF2aWdhdGUuaWNvbikgfHwgIVN0cmluZ1V0aWxzLmlzRW1wdHkodGhpcy5maWVsZC5uYXZpZ2F0ZS50ZXh0KSkgJiYgIUNvbGxlY3Rpb25VdGlscy5pc0VtcHR5KHRoaXMuZmllbGQubmF2aWdhdGUucm91dGVUbykpIHtcbiAgICAgICAgICAgIGhhc0ZpZWxkTmF2aWdhdGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoYXNGaWVsZE5hdmlnYXRlO1xuICAgIH1cblxufVxuIl19