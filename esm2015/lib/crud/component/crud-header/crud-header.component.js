import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CollectionUtils } from '../../../utility';
import { AbilityUtils } from '../../../utility/ability.utility';
import { Ability } from '@casl/ability';
export class CrudHeaderComponent {
    constructor(ability) {
        this.ability = ability;
        this.onButtonClick = new EventEmitter();
        this.badgeButtons = new Array();
        AbilityUtils.setAbility(this.ability);
    }
    get pageBackRoute() {
        return this._pageBackRoute;
    }
    set pageBackRoute(_pageBackRoute) {
        this._pageBackRoute = _pageBackRoute;
        this.addBackButton();
    }
    ngOnInit() {
        this.setIconPosition();
        this.addBackButton();
        this.transformBadgeButtons();
    }
    setIconPosition() {
        this.iconPosition = "BEFORE_TITLE" /* BEFORE_TITLE */;
        if (this.icon && this.icon.position) {
            this.iconPosition = this.icon.position;
        }
    }
    transformBadgeButtons() {
        if (this.badges && this.badges.length > 0) {
            let index = 0;
            for (let badge of this.badges) {
                this.badgeButtons.push({
                    identifier: 'crudHeaderBadge-' + index,
                    type: "CHIP" /* CHIP */,
                    label: badge.content,
                    color: this.badgeColorToButtonColor(badge.color),
                    size: "micro" /* MICRO */,
                    groupIdentifier: "crudHeaderGroup",
                });
            }
        }
    }
    badgeColorToButtonColor(color) {
        let buttonColor;
        if (color == "accent" /* ASCENT */) {
            buttonColor = "accent" /* ASCENT */;
        }
        else if (color == "primary" /* PRIMARY */) {
            buttonColor = "primary" /* PRIMARY */;
        }
        else if (color == "warn" /* WARN */) {
            buttonColor = "warn" /* WARN */;
        }
        return buttonColor;
    }
    addBackButton() {
        if (!this._pageBackRoute || CollectionUtils.isEmpty(this._pageBackRoute)) {
            return;
        }
        let backButton;
        if (CollectionUtils.isEmpty(this.actions)) {
            this.actions = new Array();
        }
        backButton = {
            identifier: "crudBackButton",
            label: "Back",
            color: "primary" /* PRIMARY */,
            size: "small" /* SMALL */,
            icon: "keyboard_return",
            type: "GHOST" /* GHOST */,
            onlyIcon: false,
            routerLink: this._pageBackRoute,
            displayInFormModes: [
                "CRUD_FORM" /* CRUD_FORM */
            ]
        };
        let backAlreadyAdded = false;
        for (let action of this.actions) {
            if (action.identifier == "crudBackButton") {
                backAlreadyAdded = true;
            }
        }
        if (!backAlreadyAdded) {
            this.actions.unshift(backButton);
            this.actions = JSON.parse(JSON.stringify(this.actions));
        }
    }
    buttonClick(event) {
        console.log(event);
        this.onButtonClick.emit(event);
    }
}
CrudHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'mx-crud-header',
                template: "<div \n  class=\"mx-header\"\n  [style.padding]=\"style && style.hideCard ? '0px 16px' : 'auto'\"\n>\n    <div class=\"mdc-layout-grid\">\n        <div class=\"mdc-layout-grid__inner\">\n          <div class=\"mdc-layout-grid__cell--span-{{actions && actions.length > 0 ? 6 : 12}}-desktop mdc-layout-grid__cell--span-{{actions && actions.length > 0 ? 4 : 8}}-tablet mdc-layout-grid__cell--span-{{actions && actions.length > 0 ? 3 : 4}}-phone mdc-layout-grid__cell--align-middle\">\n            <mat-card-header class=\"mx-crud-header\">\n              <mat-icon\n                mat-card-avatar \n                class=\"mx-crud-header-icon-before\"\n                *ngIf=\"icon && icon.font && iconPosition == 'BEFORE_TITLE'\"\n                aria-hidden=\"false\" \n                [style.margin-top.px]=\"subtitle ? 8 : 0\"\n                [attr.aria-label]=\"icon.font\"\n                >{{ icon.font }}</mat-icon>\n\n              <mat-card-title>\n                {{ title }} \n                <mat-icon \n                  class=\"mx-crud-header-icon-after\"\n                  *ngIf=\"icon && icon.font && iconPosition == 'AFTER_TITLE'\"\n                  aria-hidden=\"false\" [attr.aria-label]=\"icon.font\">{{ icon.font }}</mat-icon>\n              </mat-card-title>\n              \n              <!-- <mat-card-subtitle *ngIf=\"description && description.text && !description.bgColor\">{{ description.text }}</mat-card-subtitle> -->\n\n              <mat-card-subtitle class=\"mx-crud-header-subtitle\" *ngIf=\"subtitle\">{{ subtitle }}</mat-card-subtitle>\n\n              <span class=\"mx-crud-header-badge\" *ngIf=\"badges && badges.length > 0\"> \n                  <mx-button-group\n                      [buttons]=\"badgeButtons\"\n                      [sourceIdentifier]=\"identifier\"\n                      [sourceIndex]=\"'0'\"\n                      (onClick)=\"buttonClick($event)\"\n                  ></mx-button-group>\n              </span>\n            </mat-card-header>\n          </div>\n          <div \n            class=\"mdc-layout-grid__cell--span-{{actions && actions.length > 0 ? 6 : 0}}-desktop mdc-layout-grid__cell--span-{{actions && actions.length > 0 ? 4 : 0}}-tablet mdc-layout-grid__cell--span-{{actions && actions.length > 0 ? 1 : 0}}-phone mdc-layout-grid__cell--align-middle mdc-layout-grid--align-right mx-crud-header-button\" \n            *ngIf=\"actions && actions.length > 0\">\n            <!-- <pre>{{actions | json}}</pre> --> \n            <mx-button-group\n                [buttons]=\"actions\"\n                [sourceIdentifier]=\"identifier\"\n                [formDisplayMode]=\"formDisplayMode\"\n                [sourceIndex]=\"'0'\"\n                [originalData]=\"originalData\"\n                [context]=\"context\"\n                (onClick)=\"buttonClick($event)\"\n            ></mx-button-group> \n          </div>\n        </div> \n    </div>\n</div>\n<mat-divider class=\"mx-crud-header-divider\" *ngIf=\"(title || (actions && actions.length > 0)) && description && !description.bgColor\"></mat-divider>\n",
                styles: [".mx-crud-header ::ng-deep .mat-card-header-text{margin:0!important}.mx-crud-header .mat-card-title{margin-top:6px}.mx-crud-header .mat-card-avatar{font-size:40px;padding-right:8px}.mat-card-subtitle,.mx-crud-header-subtitle .mat-card-subtitle{padding-top:0!important}.mx-crud-header-btns{background:#faebd7;margin-left:8px;padding:2px 5px}.mx-header>.mdc-layout-grid{padding:0!important}.mx-crud-header-button{margin-top:-8px}.mx-crud-header-badge{vertical-align:text-bottom}.mdc-layout-grid{padding:0 0 10px!important}.mx-crud-header-icon-after{padding-left:10px}"]
            },] }
];
CrudHeaderComponent.ctorParameters = () => [
    { type: Ability }
];
CrudHeaderComponent.propDecorators = {
    identifier: [{ type: Input }],
    title: [{ type: Input }],
    subtitle: [{ type: Input }],
    description: [{ type: Input }],
    badges: [{ type: Input }],
    icon: [{ type: Input }],
    style: [{ type: Input }],
    _pageBackRoute: [{ type: Input }],
    pageBackRoute: [{ type: Input }],
    formDisplayMode: [{ type: Input }],
    actions: [{ type: Input }],
    showHeader: [{ type: Input }],
    originalData: [{ type: Input }],
    context: [{ type: Input }],
    onButtonClick: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J1ZC1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9uaXRpbmtoYWl0YW4vTml0aW4vc3R1ZHkvYW5ndWxhci9tYXRlcmlhbC9hZG1pbi1idWlsZGVyLXBsdWdpbi9wcm9qZWN0cy9uZ3gtbWF0ZXJpYWwtd2lkZ2V0L3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jcnVkL2NvbXBvbmVudC9jcnVkLWhlYWRlci9jcnVkLWhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUvRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFHbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPeEMsTUFBTSxPQUFPLG1CQUFtQjtJQTZCOUIsWUFBb0IsT0FBZ0I7UUFBaEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUwxQixrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFHN0MsaUJBQVksR0FBdUIsSUFBSSxLQUFLLEVBQWUsQ0FBQztRQUcxRCxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBckJELElBQUksYUFBYTtRQUNmLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsSUFDSSxhQUFhLENBQUMsY0FBNkI7UUFDN0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFnQkQsUUFBUTtRQUNOLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIs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Q2pDLENBQUM7OztZQTFIRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsNmhHQUEyQzs7YUFFNUM7OztZQU5RLE9BQU87Ozt5QkFRYixLQUFLO29CQUNMLEtBQUs7dUJBQ0wsS0FBSzswQkFDTCxLQUFLO3FCQUNMLEtBQUs7bUJBQ0wsS0FBSztvQkFDTCxLQUFLOzZCQUVMLEtBQUs7NEJBSUwsS0FBSzs4QkFNTCxLQUFLO3NCQUNMLEtBQUs7eUJBQ0wsS0FBSzsyQkFDTCxLQUFLO3NCQUNMLEtBQUs7NEJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJ1dHRvbiwgQnV0dG9uQ29sb3IsIEJ1dHRvblR5cGUsIEJhZGdlLCBCYWRnZUNvbG9yLCBCdXR0b25Hcm91cCwgSG92ZXJCdXR0b24sIEJ1dHRvblNpemUgfSBmcm9tICcuLi8uLi8uLi9idXR0b24vbW9kZWwnO1xuaW1wb3J0IHsgQ29sbGVjdGlvblV0aWxzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbGl0eSc7XG5pbXBvcnQgeyBDcnVkRGVzY3JpcHRpb24sIENydWRIZWFkZXJJY29uLCBDcnVkU3R5bGUgfSBmcm9tICcuLi8uLi9tb2RlbCc7XG5pbXBvcnQgeyBGb3JtRGlhcGx5TW9kZSwgRm9ybVRpdGxlSWNvblBvc2l0aW9uIH0gZnJvbSAnLi4vLi4vLi4vZm9ybS9tb2RlbCc7XG5pbXBvcnQgeyBBYmlsaXR5VXRpbHMgfSBmcm9tICcuLi8uLi8uLi91dGlsaXR5L2FiaWxpdHkudXRpbGl0eSc7XG5pbXBvcnQgeyBBYmlsaXR5IH0gZnJvbSAnQGNhc2wvYWJpbGl0eSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ214LWNydWQtaGVhZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NydWQtaGVhZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY3J1ZC1oZWFkZXIuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDcnVkSGVhZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgaWRlbnRpZmllcjogc3RyaW5nO1xuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nOyBcbiAgQElucHV0KCkgc3VidGl0bGU6IHN0cmluZzsgXG4gIEBJbnB1dCgpIGRlc2NyaXB0aW9uOiBDcnVkRGVzY3JpcHRpb247XG4gIEBJbnB1dCgpIGJhZGdlczogQXJyYXk8QmFkZ2U+O1xuICBASW5wdXQoKSBpY29uOiBDcnVkSGVhZGVySWNvbjtcbiAgQElucHV0KCkgc3R5bGU6IENydWRTdHlsZTtcblxuICBASW5wdXQoKSBfcGFnZUJhY2tSb3V0ZTogQXJyYXk8c3RyaW5nPjtcbiAgZ2V0IHBhZ2VCYWNrUm91dGUoKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX3BhZ2VCYWNrUm91dGU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHBhZ2VCYWNrUm91dGUoX3BhZ2VCYWNrUm91dGU6IEFycmF5PHN0cmluZz4pIHtcbiAgICB0aGlzLl9wYWdlQmFja1JvdXRlID0gX3BhZ2VCYWNrUm91dGU7XG4gICAgdGhpcy5hZGRCYWNrQnV0dG9uKCk7XG4gIH0gXG5cbiAgQElucHV0KCkgZm9ybURpc3BsYXlNb2RlOiBGb3JtRGlhcGx5TW9kZTtcbiAgQElucHV0KCkgYWN0aW9uczogQXJyYXk8QnV0dG9uIHwgSG92ZXJCdXR0b24gfCBCdXR0b25Hcm91cD47XG4gIEBJbnB1dCgpIHNob3dIZWFkZXI6IGJvb2xlYW47XG4gIEBJbnB1dCgpIG9yaWdpbmFsRGF0YTogYW55O1xuICBASW5wdXQoKSBjb250ZXh0OiBhbnk7XG4gIEBPdXRwdXQoKSBvbkJ1dHRvbkNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGljb25Qb3NpdGlvbjogRm9ybVRpdGxlSWNvblBvc2l0aW9uO1xuICBiYWRnZUJ1dHRvbnM6IEFycmF5PEJ1dHRvbkdyb3VwPiA9IG5ldyBBcnJheTxCdXR0b25Hcm91cD4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFiaWxpdHk6IEFiaWxpdHkpIHsgXG4gICAgQWJpbGl0eVV0aWxzLnNldEFiaWxpdHkodGhpcy5hYmlsaXR5KTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2V0SWNvblBvc2l0aW9uKCk7XG4gICAgdGhpcy5hZGRCYWNrQnV0dG9uKCk7XG4gICAgdGhpcy50cmFuc2Zvcm1CYWRnZUJ1dHRvbnMoKTtcbiAgfVxuXG4gIHNldEljb25Qb3NpdGlvbigpIHtcbiAgICB0aGlzLmljb25Qb3NpdGlvbiA9IEZvcm1UaXRsZUljb25Qb3NpdGlvbi5CRUZPUkVfVElUTEU7XG4gICAgaWYgKHRoaXMuaWNvbiAmJiB0aGlzLmljb24ucG9zaXRpb24pICB7XG4gICAgICB0aGlzLmljb25Qb3NpdGlvbiA9IHRoaXMuaWNvbi5wb3NpdGlvbjtcbiAgICB9XG4gIH1cblxuICB0cmFuc2Zvcm1CYWRnZUJ1dHRvbnMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYmFkZ2VzICYmIHRoaXMuYmFkZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBpbmRleDogbnVtYmVyID0gMDtcbiAgICAgIGZvciAobGV0IGJhZGdlIG9mIHRoaXMuYmFkZ2VzKSB7XG4gICAgICAgIHRoaXMuYmFkZ2VCdXR0b25zLnB1c2goe1xuICAgICAgICAgIGlkZW50aWZpZXI6ICdjcnVkSGVhZGVyQmFkZ2UtJyArIGluZGV4LFxuICAgICAgICAgIHR5cGU6IEJ1dHRvblR5cGUuQ0hJUCxcbiAgICAgICAgICBsYWJlbDogYmFkZ2UuY29udGVudCxcbiAgICAgICAgICBjb2xvcjogdGhpcy5iYWRnZUNvbG9yVG9CdXR0b25Db2xvcihiYWRnZS5jb2xvciksXG4gICAgICAgICAgc2l6ZTogQnV0dG9uU2l6ZS5NSUNSTyxcbiAgICAgICAgICBncm91cElkZW50aWZpZXI6IFwiY3J1ZEhlYWRlckdyb3VwXCIsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGJhZGdlQ29sb3JUb0J1dHRvbkNvbG9yKGNvbG9yOiBCYWRnZUNvbG9yKTogQnV0dG9uQ29sb3Ige1xuICAgIGxldCBidXR0b25Db2xvcjogQnV0dG9uQ29sb3I7XG4gICAgaWYgKGNvbG9yID09IEJhZGdlQ29sb3IuQVNDRU5UKSB7XG4gICAgICBidXR0b25Db2xvciA9IEJ1dHRvbkNvbG9yLkFTQ0VOVDtcbiAgICB9IGVsc2UgaWYgKGNvbG9yID09IEJhZGdlQ29sb3IuUFJJTUFSWSkge1xuICAgICAgYnV0dG9uQ29sb3IgPSBCdXR0b25Db2xvci5QUklNQVJZO1xuICAgIH0gZWxzZSBpZiAoY29sb3IgPT0gQmFkZ2VDb2xvci5XQVJOKSB7XG4gICAgICBidXR0b25Db2xvciA9IEJ1dHRvbkNvbG9yLldBUk47XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1dHRvbkNvbG9yO1xuICB9XG5cbiAgYWRkQmFja0J1dHRvbigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX3BhZ2VCYWNrUm91dGUgfHwgQ29sbGVjdGlvblV0aWxzLmlzRW1wdHkodGhpcy5fcGFnZUJhY2tSb3V0ZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgYmFja0J1dHRvbjogQnV0dG9uO1xuXG4gICAgaWYgKENvbGxlY3Rpb25VdGlscy5pc0VtcHR5KHRoaXMuYWN0aW9ucykpIHtcbiAgICAgIHRoaXMuYWN0aW9ucyA9IG5ldyBBcnJheTxCdXR0b24gfCBIb3ZlckJ1dHRvbiB8IEJ1dHRvbkdyb3VwPigpO1xuICAgIH1cblxuICAgIGJhY2tCdXR0b24gPSB7XG4gICAgICBpZGVudGlmaWVyOiBcImNydWRCYWNrQnV0dG9uXCIsXG4gICAgICBsYWJlbDogXCJCYWNrXCIsXG4gICAgICBjb2xvcjogQnV0dG9uQ29sb3IuUFJJTUFSWSxcbiAgICAgIHNpemU6IEJ1dHRvblNpemUuU01BTEwsXG4gICAgICBpY29uOiBcImtleWJvYXJkX3JldHVyblwiLFxuICAgICAgdHlwZTogQnV0dG9uVHlwZS5HSE9TVCxcbiAgICAgIG9ubHlJY29uOiBmYWxzZSxcbiAgICAgIHJvdXRlckxpbms6IHRoaXMuX3BhZ2VCYWNrUm91dGUsXG4gICAgICBkaXNwbGF5SW5Gb3JtTW9kZXM6IFtcbiAgICAgICAgRm9ybURpYXBseU1vZGUuQ1JVRF9GT1JNXG4gICAgICBdXG4gICAgfTtcblxuICAgIGxldCBiYWNrQWxyZWFkeUFkZGVkID0gZmFsc2U7XG4gICAgZm9yIChsZXQgYWN0aW9uIG9mIHRoaXMuYWN0aW9ucykge1xuICAgICAgaWYgKGFjdGlvbi5pZGVudGlmaWVyID09IFwiY3J1ZEJhY2tCdXR0b25cIikge1xuICAgICAgICBiYWNrQWxyZWFkeUFkZGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWJhY2tBbHJlYWR5QWRkZWQpIHtcbiAgICAgIHRoaXMuYWN0aW9ucy51bnNoaWZ0KGJhY2tCdXR0b24pO1xuXG4gICAgICB0aGlzLmFjdGlvbnMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuYWN0aW9ucykpO1xuICAgIH1cbiAgfVxuXG4gIGJ1dHRvbkNsaWNrKGV2ZW50OiBhbnkpIHtcbiAgICBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgdGhpcy5vbkJ1dHRvbkNsaWNrLmVtaXQoZXZlbnQpO1xuICB9XG59XG4iXX0=