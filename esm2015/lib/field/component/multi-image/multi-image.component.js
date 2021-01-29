import { Component, Input, ViewEncapsulation } from '@angular/core';
export class MultiImageComponent {
    constructor() {
        this.field = null;
        this.onShowAllClick = () => {
            this.count = this.images.length;
        };
    }
    ngOnInit() {
        this.radius = (this.field.radius || 5) * 10;
        this.showCount = this.field.showCount || false;
        this.showAll = this.field.showAll || false;
        this.images = this.field.images;
        this.images = this.images ? this.images : this.field.value;
        this.count = this.field.count || (this.images ? this.images.length : 0);
        if (this.showCount && (this.showAll || !this.showAll)) {
            this.lastItemLabel = '+' + (this.images.length - this.count);
        }
        else if (this.showAll && !this.showCount) {
            this.lastItemLabel = '>';
        }
        this.hideTooltip = this.images && this.images.length > 0 && (typeof this.images[0] == 'string');
    }
}
MultiImageComponent.decorators = [
    { type: Component, args: [{
                selector: 'cf-multi-image',
                template: "<div class=\"avatars cf-field-nm\"  [ngClass]=\"{'cf-disable': disabled}\">\n    <ng-container *ngFor=\"let img of images; let i=index,let last = last\">\n        <div class=\"avatar\"  *ngIf=\"i<count\" matTooltip=\"{{img.name}}\" [matTooltipDisabled]=\"hideTooltip\"\n            [style.margin-left.px]=\"i==0? 0:-radius/2\" [style.z-index]=\"1000-i\">\n            <img class=\"item\" src=\"{{img.url || img}}\" [style.width.px]=\"radius\" [style.height.px]=\"radius\"/>\n        </div>\n    </ng-container>\n    <span class=\"avatar\" *ngIf=\"(showCount || showAll) && (count !== images.length)\"\n        [style.margin-left.px]=\"-radius/2\" [style.width.px]=\"radius\">\n        <button class=\"item\"  (click)=\"onShowAllClick()\"\n            [style.padding-left.px]=\"radius/4\" \n            [disabled]=\"(disabled || !showAll)\" \n            [style.width.px]=\"radius\" \n            [style.height.px]=\"radius\">\n            {{lastItemLabel}}\n        </button>\n    </span>\n</div>",
                encapsulation: ViewEncapsulation.None,
                styles: [".avatars{display:flex;margin-bottom:1.25em!important;overflow:auto;width:100%}.item{align-items:center;background-color:#bbb;border-radius:9999px;box-shadow:0 0 0 2px #fff;color:#fff;display:flex;justify-content:center}button{background:transparent;border:none;color:#4d4d4d;font-size:18px}button:hover:not([disabled]){background-color:rgba(103,58,183,.5803921568627451);cursor:pointer}button:disabled:hover:not([disabled]){color:#ccc}"]
            },] }
];
MultiImageComponent.ctorParameters = () => [];
MultiImageComponent.propDecorators = {
    field: [{ type: Input }],
    control: [{ type: Input }],
    disabled: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktaW1hZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9uaXRpbmtoYWl0YW4vTml0aW4vc3R1ZHkvYW5ndWxhci9tYXRlcmlhbC9hZG1pbi1idWlsZGVyLXBsdWdpbi9wcm9qZWN0cy9uZ3gtbWF0ZXJpYWwtd2lkZ2V0L3NyYy8iLCJzb3VyY2VzIjpbImxpYi9maWVsZC9jb21wb25lbnQvbXVsdGktaW1hZ2UvbXVsdGktaW1hZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBVTVFLE1BQU0sT0FBTyxtQkFBbUI7SUFjNUI7UUFiUyxVQUFLLEdBQW9CLElBQUksQ0FBQztRQWlDdkMsbUJBQWMsR0FBRyxHQUFHLEVBQUU7WUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNwQyxDQUFDLENBQUE7SUF0QmUsQ0FBQztJQUVqQixRQUFRO1FBQ0osSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUU1QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQztRQUMvQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQW9DLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzlGLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFeEUsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNuRCxJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoRTthQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDeEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUM7U0FDNUI7UUFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDO0lBQ3BHLENBQUM7OztZQXRDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsZy9CQUEyQztnQkFFM0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3hDOzs7O29CQUVJLEtBQUs7c0JBQ0wsS0FBSzt1QkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNdWx0aUltYWdlLCBNdWx0aUltYWdlRmllbGQgfSBmcm9tICcuLi8uLi9tb2RlbC9tdWx0aS1pbWFnZS1maWVsZC5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnY2YtbXVsdGktaW1hZ2UnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9tdWx0aS1pbWFnZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbXVsdGktaW1hZ2UuY29tcG9uZW50LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIE11bHRpSW1hZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIGZpZWxkOiBNdWx0aUltYWdlRmllbGQgPSBudWxsO1xuICAgIEBJbnB1dCgpIGNvbnRyb2w6IEZvcm1Db250cm9sO1xuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgcmFkaXVzOiBudW1iZXI7XG4gICAgY291bnQ6IG51bWJlcjtcbiAgICBzaG93Q291bnQ6IGJvb2xlYW47XG4gICAgc2hvd0FsbDogYm9vbGVhbjtcbiAgICBpbWFnZXM6IE11bHRpSW1hZ2VbXSB8IHN0cmluZ1tdO1xuICAgIGxhc3RJdGVtTGFiZWw6IHN0cmluZztcbiAgICBzaG93TGFzdEl0ZW06IGJvb2xlYW47XG4gICAgaGlkZVRvb2x0aXA6IGJvb2xlYW47XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMucmFkaXVzID0gKHRoaXMuZmllbGQucmFkaXVzIHx8IDUpICogMTA7XG5cbiAgICAgICAgdGhpcy5zaG93Q291bnQgPSB0aGlzLmZpZWxkLnNob3dDb3VudCB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93QWxsID0gdGhpcy5maWVsZC5zaG93QWxsIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLmltYWdlcyA9IHRoaXMuZmllbGQuaW1hZ2VzO1xuICAgICAgICB0aGlzLmltYWdlcyA9IHRoaXMuaW1hZ2VzID8gdGhpcy5pbWFnZXMgOiA8QXJyYXk8c3RyaW5nPiB8IEFycmF5PE11bHRpSW1hZ2U+PnRoaXMuZmllbGQudmFsdWU7XG4gICAgICAgIHRoaXMuY291bnQgPSB0aGlzLmZpZWxkLmNvdW50IHx8ICh0aGlzLmltYWdlcyA/IHRoaXMuaW1hZ2VzLmxlbmd0aCA6IDApO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc2hvd0NvdW50ICYmICh0aGlzLnNob3dBbGwgfHwgIXRoaXMuc2hvd0FsbCkpIHtcbiAgICAgICAgICAgIHRoaXMubGFzdEl0ZW1MYWJlbCA9ICcrJyArICh0aGlzLmltYWdlcy5sZW5ndGggLSB0aGlzLmNvdW50KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNob3dBbGwgJiYgIXRoaXMuc2hvd0NvdW50KSB7XG4gICAgICAgICAgICB0aGlzLmxhc3RJdGVtTGFiZWwgPSAnPic7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhpZGVUb29sdGlwID0gdGhpcy5pbWFnZXMgJiYgdGhpcy5pbWFnZXMubGVuZ3RoID4gMCAmJiAodHlwZW9mIHRoaXMuaW1hZ2VzWzBdID09ICdzdHJpbmcnKTtcbiAgICB9XG5cbiAgICBvblNob3dBbGxDbGljayA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5jb3VudCA9IHRoaXMuaW1hZ2VzLmxlbmd0aDtcbiAgICB9XG59XG4iXX0=