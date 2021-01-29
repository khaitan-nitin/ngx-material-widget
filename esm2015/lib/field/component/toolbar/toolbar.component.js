import { Component, Input, ViewEncapsulation } from '@angular/core';
export class ToolbarComponent {
    constructor() {
        this.field = null;
        this.onMenuClick = (item) => {
            item.onClick(item);
        };
    }
    ngOnInit() {
        this.title = this.field.title;
        this.menuItems = this.field.menuItems;
    }
}
ToolbarComponent.decorators = [
    { type: Component, args: [{
                selector: 'cf-toolbar',
                template: "<span>\n    <button mat-button *ngFor=\"let item of menuItems\" (click)=\"onMenuClick(item)\"\n    [fxShow]=\"item.showOnDesktop\" \n    [fxShow.xs]=\"item.showOnMobile\"\n    [fxShow.sm]=\"item.showOnTablet\">\n        <mat-icon class=\"mr\">{{item.icon}}</mat-icon>\n        {{item.label}}\n    </button>\n    <button mat-icon-button [matMenuTriggerFor]=\"dropMenu\">\n        <mat-icon>more_vert</mat-icon>\n    </button>\n    <mat-menu #dropMenu=\"matMenu\">\n        <ng-container *ngFor=\"let item of menuItems\">\n            <div [fxShow]=\"!item.showOnDesktop\" \n                [fxShow.sm]=\"!item.showOnTablet\" \n                [fxShow.xs]=\"!item.showOnMobile\">\n                <button mat-menu-item (click)=\"onMenuClick(item)\">\n                    <mat-icon class=\"mr\">{{item.icon}}</mat-icon>\n                    {{item.label}}\n                </button>\n                <mat-divider></mat-divider>\n            </div>\n        </ng-container>\n    </mat-menu>\n</span>",
                encapsulation: ViewEncapsulation.None,
                styles: [".cf-chip-list{width:100%}.cf-chip-list .chip-item.cdk-drag-animating,.cf-chip-list .hip-item .cdk-drop-list-dragging{transition:transform .25s cubic-bezier(0,0,.2,1)}"]
            },] }
];
ToolbarComponent.ctorParameters = () => [];
ToolbarComponent.propDecorators = {
    field: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbGJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL25pdGlua2hhaXRhbi9OaXRpbi9zdHVkeS9hbmd1bGFyL21hdGVyaWFsL2FkbWluLWJ1aWxkZXItcGx1Z2luL3Byb2plY3RzL25neC1tYXRlcmlhbC13aWRnZXQvc3JjLyIsInNvdXJjZXMiOlsibGliL2ZpZWxkL2NvbXBvbmVudC90b29sYmFyL3Rvb2xiYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBUzVFLE1BQU0sT0FBTyxnQkFBZ0I7SUFLekI7UUFKUyxVQUFLLEdBQWlCLElBQUksQ0FBQztRQVdwQyxnQkFBVyxHQUFHLENBQUMsSUFBYyxFQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUE7SUFUZSxDQUFDO0lBRWpCLFFBQVE7UUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7SUFDM0MsQ0FBQzs7O1lBaEJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsKytCQUF1QztnQkFFdkMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3hDOzs7O29CQUVJLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUb29sYmFyRmllbGQsIE1lbnVJdGVtIH0gZnJvbSAnLi4vLi4vbW9kZWwvdG9vbGJhci5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnY2YtdG9vbGJhcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3Rvb2xiYXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3Rvb2xiYXIuY29tcG9uZW50LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFRvb2xiYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIGZpZWxkOiBUb29sYmFyRmllbGQgPSBudWxsO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgbWVudUl0ZW1zOiBNZW51SXRlbVtdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICAgdGhpcy50aXRsZSA9IHRoaXMuZmllbGQudGl0bGU7XG4gICAgICAgICB0aGlzLm1lbnVJdGVtcyA9IHRoaXMuZmllbGQubWVudUl0ZW1zO1xuICAgIH1cblxuICAgIG9uTWVudUNsaWNrID0gKGl0ZW06IE1lbnVJdGVtKT0+IHtcbiAgICAgICAgaXRlbS5vbkNsaWNrKGl0ZW0pO1xuICAgIH1cbiAgICBcbn1cbiJdfQ==