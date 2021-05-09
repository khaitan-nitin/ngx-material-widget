import { Component, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { ObjectUtils, ButtonUtils, StringUtils, CollectionUtils } from '../../../utility';
import { AbilityUtils } from '../../../utility/ability.utility';
import { Ability } from '@casl/ability';
//export { Button, ObjectTree, ButtonGroup, HoverButton, Badge, ButtonType } from '../../model';
export class ButtonGroupComponent {
    constructor(ability) {
        this.ability = ability;
        this.onClick = new EventEmitter();
        this.onIconClick = new EventEmitter();
        this.buttonLists = new Array();
        this.buttonListsType = new Array();
        this.displayDesktopDD = false;
        this.displayTabletDD = false;
        this.displayMobileDD = false;
        this.hoverButtonLists = new Array();
        AbilityUtils.setAbility(this.ability);
    }
    get buttons() {
        return this._buttons;
    }
    set buttons(_buttons) {
        if (!(_buttons instanceof Array)) {
            let btns = new Array();
            btns.push(_buttons);
            _buttons = btns;
        }
        this._buttons = _buttons;
        this.getButtonList();
        this.getButtonType();
        this.displayDesktopDD = this.hasMobileButton('showOnDesktop');
        this.displayTabletDD = this.hasMobileButton('showOnTablet');
        this.displayMobileDD = this.hasMobileButton('showOnMobile');
        if (this.displayDesktopDD || this.displayMobileDD || this.displayTabletDD) {
            this.changeButtonTypeToGhost();
        }
    }
    ngOnInit() {
        // this.getButtonList();
        // this.getButtonType();
    }
    hasMobileButton(displayIn) {
        let hasButtonsForDropdown = false;
        if (!CollectionUtils.isEmpty(this.buttonLists)) {
            this.buttonLists.forEach(buttons => {
                if (!CollectionUtils.isEmpty(buttons) && buttons instanceof Array) {
                    buttons.forEach(button => {
                        if (button['showOnDesktop'] == null && button['showOnTablet'] == null && button['showOnMobile'] == null) {
                            button['showOnDesktop'] = true;
                            button['showOnTablet'] = true;
                            button['showOnMobile'] = true;
                        }
                        if (button[displayIn]) {
                            hasButtonsForDropdown = true;
                        }
                    });
                }
            });
        }
        return hasButtonsForDropdown;
    }
    changeButtonTypeToGhost() {
        this.hoverButtonLists = JSON.parse(JSON.stringify(this.buttonLists));
        if (!CollectionUtils.isEmpty(this.hoverButtonLists)) {
            this.hoverButtonLists.forEach(buttons => {
                if (!CollectionUtils.isEmpty(buttons) && buttons instanceof Array) {
                    buttons.forEach(button => {
                        button.type = "GHOST" /* GHOST */;
                    });
                }
            });
        }
    }
    getButtonList() {
        this.buttonLists = new Array();
        let buttonArray = new Array();
        let buttonArrayIndex = 0;
        if (this._buttons) {
            for (let index = 0; index < this._buttons.length; index++) {
                if (ButtonUtils.instanceOfButton(this._buttons[index])) {
                    if (ObjectUtils.isEmpty(buttonArray[buttonArrayIndex])) {
                        buttonArray[buttonArrayIndex] = new Array();
                        this.buttonLists.push(buttonArray[buttonArrayIndex]);
                    }
                    buttonArray[buttonArrayIndex].push(this._buttons[index]);
                }
                if (ButtonUtils.instanceOfButtonGroup(this._buttons[index]) || ButtonUtils.instanceOfChipButton(this._buttons[index])) {
                    let bgAdded = this.getGroupButton(this._buttons[index].groupIdentifier, this.buttonLists);
                    if (bgAdded) {
                        buttonArrayIndex++;
                    }
                }
            }
            let hoverButton = this.getHoverButtons();
            if (hoverButton && hoverButton.hoverButtons && hoverButton.hoverButtons.length > 0) {
                this.buttonLists.push(hoverButton);
                buttonArrayIndex++;
            }
        }
    }
    isGroupAdded(groupIdentifier, buttonLists) {
        let groupAdded = false;
        if (buttonLists) {
            groupAdded = buttonLists.filter(buttonList => buttonList && buttonList.groupIdentifier == groupIdentifier).length > 0;
        }
        return groupAdded;
    }
    getGroupButton(groupIdentifier, buttonLists) {
        let bgAdded = false;
        let gButtons = new Array();
        if (this._buttons && this.isGroupAdded(groupIdentifier, buttonLists) == false) {
            gButtons = this._buttons.filter(button => button.groupIdentifier == groupIdentifier).map(button => {
                button.width = '100';
                return button;
            });
            // To check if any button is fullwidth
            let width = gButtons.filter(gButton => gButton.fullWidth == true).length > 0 ? '100' : 'auto';
            let buttonWidth = 'auto';
            if (width != 'auto') {
                buttonWidth = (+width / gButtons.length);
            }
            buttonLists.push({
                groupIdentifier: groupIdentifier,
                width: width,
                buttonWidth: buttonWidth,
                groupButtons: gButtons
            });
            bgAdded = true;
        }
        return bgAdded;
    }
    getHoverButtons() {
        let hoverButtons = new Array();
        let groupIdentifier;
        let groupLabel;
        let groupIcon;
        let badge;
        let width = 'auto';
        if (this._buttons) {
            this._buttons.filter(button => ButtonUtils.instanceOfHoverButton(button)).forEach(button => {
                if (StringUtils.isEmpty(groupIdentifier)) {
                    groupIdentifier = button.groupIdentifier;
                }
                if (StringUtils.isEmpty(groupLabel)) {
                    groupLabel = button.groupLabel;
                }
                if (StringUtils.isEmpty(groupIcon)) {
                    groupIcon = button.groupIcon;
                }
                if (CollectionUtils.isEmpty(badge)) {
                    badge = button.badge;
                }
                if (button.fullWidth) {
                    width = '100';
                    button.width = '100';
                }
                hoverButtons.push(button);
            });
        }
        return { groupIdentifier: groupIdentifier, groupLabel: groupLabel, groupIcon: groupIcon, badge: badge, width: width, hoverButtons: hoverButtons };
    }
    getButtonType() {
        this.buttonListsType = new Array();
        if (this.buttonLists && this.buttonLists.length > 0) {
            for (let buttonList of this.buttonLists) {
                let buttonType = "";
                if (this.isButtonGroup(buttonList)) {
                    buttonType = 'ButtonGroup';
                }
                else if (this.isChipGroup(buttonList)) {
                    buttonType = 'ChipGroup';
                }
                else if (this.isButtonHover(buttonList)) {
                    buttonType = 'ButtonHover';
                }
                else if (this.isButtonArray(buttonList)) {
                    buttonType = 'ButtonArray';
                }
                this.buttonListsType.push(buttonType);
            }
        }
    }
    isButtonGroup(buttonList) {
        let isButtonGroup = false;
        if (buttonList && buttonList.groupButtons && buttonList.groupButtons.length > 0 && !StringUtils.isEmpty(buttonList.groupIdentifier)) {
            isButtonGroup = buttonList.groupButtons.filter(button => ButtonUtils.instanceOfButtonGroup(button)).length > 0;
        }
        return isButtonGroup;
    }
    isChipGroup(buttonList) {
        let isChipGroup = false;
        if (buttonList && buttonList.groupButtons && buttonList.groupButtons.length > 0 && !StringUtils.isEmpty(buttonList.groupIdentifier)) {
            isChipGroup = buttonList.groupButtons.filter(button => ButtonUtils.instanceOfChipButton(button)).length > 0;
            if (isChipGroup) {
                buttonList.groupButtons.forEach(button => ButtonUtils.instanceOfChipButton(button));
            }
        }
        return isChipGroup;
    }
    isButtonHover(buttonList) {
        return buttonList && buttonList.hoverButtons && buttonList.hoverButtons.length > 0;
    }
    isButtonArray(buttonList) {
        return buttonList instanceof Array;
    }
    click(event) {
        this.onClick.emit(event);
    }
    iconClick(event) {
        this.onIconClick.emit(event);
    }
}
ButtonGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'mx-button-group',
                template: "<!-- <pre>{{formDisplayMode | json}}</pre> -->\n<span class=\"mx-button-group\" *ngFor=\"let buttonList of buttonLists; let bIndex = index;\">\n    <mat-chip-list \n        *ngIf=\"buttonListsType[bIndex] == 'ChipGroup'\"\n        [style.width.%]=\"buttonList.width\" \n        [ngClass]=\"{'mx-button': bIndex < buttonLists.length - 1 }\"\n        class=\"mx-chip-group mx-chip-group-{{buttonList.groupIdentifier}}\"\n        aria-label=\"Chip Selection\">\n        <mx-button *ngFor=\"let button of buttonList.groupButtons\"\n            [form]=\"form\"\n            [ngClass]=\"{'mx-button': (bIndex + 1) != buttonList.length}\"\n            [style.width]=\"'calc(' + buttonList.buttonWidth + '% - 8px)'\"\n            [formDisplayMode]=\"formDisplayMode\"\n            [sourceIdentifier]=\"sourceIdentifier\"\n            [sourceIndex]=\"sourceIndex\"\n            [widgetArrayIndex]=\"widgetArrayIndex\"\n            [button]=\"button\"\n            [context]=\"context\" \n            [originalData]=\"originalData\"\n            [buttonRoute]=\"buttonRoute\"\n            [parentHierarchy]=\"parentHierarchy\"\n            [disabled]=\"disabled\"\n            (onClick)=\"click($event)\"\n            (onIconClick)=\"iconClick($event)\"\n        ></mx-button>\n    </mat-chip-list>\n    \n    <!-- appearance=\"legacy\" -->\n    <mat-button-toggle-group \n        *ngIf=\"buttonListsType[bIndex] == 'ButtonGroup'\"\n        [name]=\"buttonList.groupIdentifier\" \n        multiple=\"false\" \n        [ngClass]=\"{'mx-button': bIndex < buttonLists.length - 1 }\"\n        class=\"mx-toggle-group mx-toggle-group-{{buttonList.groupIdentifier}}\" \n        [style.width.%]=\"buttonList.width\"\n        #group=\"matButtonToggleGroup\">\n        <mx-button *ngFor=\"let button of buttonList.groupButtons\"\n            [form]=\"form\"\n            [style.width.%]=\"buttonList.buttonWidth\"\n            [formDisplayMode]=\"formDisplayMode\"\n            [sourceIdentifier]=\"sourceIdentifier\"\n            [sourceIndex]=\"sourceIndex\"\n            [widgetArrayIndex]=\"widgetArrayIndex\"\n            [button]=\"button\"\n            [context]=\"context\"\n            [originalData]=\"originalData\"\n            [buttonRoute]=\"buttonRoute\"\n            [parentHierarchy]=\"parentHierarchy\"\n            [disabled]=\"disabled\"\n            (onClick)=\"click($event)\"\n            (onIconClick)=\"iconClick($event)\"\n        ></mx-button>\n    </mat-button-toggle-group>\n\n    <span \n        *ngIf=\"buttonListsType[bIndex] == 'ButtonHover'\"\n        [ngClass]=\"{'mx-button': bIndex < buttonLists.length - 1}\"\n        class=\"mx-hover-group mx-hover-group-{{buttonList.groupIdentifier}}\"\n        [style.width.%]=\"100\">\n        <button \n            mat-raised-button \n            [matMenuTriggerFor]=\"menu\" \n            [ngClass]=\"{'mx-small-btn': buttonList.hoverButtons[0].size == 'small', 'mx-tiny-btn': buttonList.hoverButtons[0].size == 'tiny', 'mx-micro-btn': buttonList.hoverButtons[0].size == 'micro', 'mx-default-btn': buttonList.hoverButtons[0].size == 'default'}\"\n            [style.width.%]=\"buttonList.width\"\n            [attr.aria-label]=\"buttonList.groupLabel\"\n            [matBadge]=\"buttonList.badge ? buttonList.badge.content : ''\" \n            [matBadgeColor]=\"buttonList.badge ? buttonList.badge.color : ''\" \n            [matBadgePosition]=\"buttonList.badge ? buttonList.badge.position : ''\" \n            [matBadgeSize]=\"buttonList.badge ? buttonList.badge.size : ''\" \n            [matBadgeHidden]=\"buttonList.badge ? buttonList.badge.hide : false\">\n            <span class=\"mx-button-label mx-button-label-{{buttonList.groupIdentifier}}\" *ngIf=\"buttonList.groupLabel\">{{ buttonList.groupLabel }}</span>\n            <mat-icon\n                [ngClass]=\"{'mx-small-icon': buttonList.hoverButtons[0].size == 'small', 'mx-tiny-icon': buttonList.hoverButtons[0].size == 'tiny', 'mx-micro-icon': buttonList.hoverButtons[0].size == 'micro', 'mx-default-icon': buttonList.hoverButtons[0].size == 'default'}\"\n                class=\"mx-button-icon\"\n            >{{buttonList.groupIcon}}</mat-icon>\n        </button> \n        <mat-menu #menu=\"matMenu\">\n            <mx-button *ngFor=\"let button of buttonList.hoverButtons\"\n                [form]=\"form\" \n                [formDisplayMode]=\"formDisplayMode\"\n                [sourceIdentifier]=\"sourceIdentifier\"\n                [sourceIndex]=\"sourceIndex\"\n                [widgetArrayIndex]=\"widgetArrayIndex\"\n                [button]=\"button\"\n                [context]=\"context\"\n                [originalData]=\"originalData\"\n                [buttonRoute]=\"buttonRoute\"\n                [parentHierarchy]=\"parentHierarchy\"\n                [disabled]=\"disabled\"\n                (onClick)=\"click($event)\"\n                (onIconClick)=\"iconClick($event)\"\n                ></mx-button> \n        </mat-menu>\n    </span>\n    <span \n        [ngClass]=\"{'mx-button': bIndex < buttonLists.length - 1 }\"\n        class=\"mx-buttons-group\" \n        *ngIf=\"buttonListsType[bIndex] == 'ButtonArray'\">\n        <mx-button *ngFor=\"let button of buttonList; let index = index;\"\n            [form]=\"form\"\n            [formDisplayMode]=\"formDisplayMode\"\n            [sourceIdentifier]=\"sourceIdentifier\"\n            [sourceIndex]=\"sourceIndex\"\n            [widgetArrayIndex]=\"widgetArrayIndex\"\n            [button]=\"button\"\n            [context]=\"context\"\n            [originalData]=\"originalData\"\n            [buttonRoute]=\"buttonRoute\"\n            [parentHierarchy]=\"parentHierarchy\"\n            [disabled]=\"disabled\"\n            [ngClass]=\"{'mx-button': (index + 1) != buttonList.length}\"\n            (onClick)=\"click($event)\"\n            (onIconClick)=\"iconClick($event)\"\n            [fxShow]=\"button.showOnDesktop\" \n            [fxShow.xs]=\"button.showOnMobile\" \n            [fxShow.sm]=\"button.showOnTablet\"\n        ></mx-button> \n        <button \n            mat-icon-button \n            [matMenuTriggerFor]=\"dropMenu\" \n            [fxShow]=\"!displayDesktopDD\"\n            [fxShow.sm]=\"!displayTabletDD\"\n            [fxShow.xs]=\"!displayMobileDD\">\n            <mat-icon>more_vert</mat-icon>\n        </button>\n        <mat-menu class=\"mx-button-tooltip\" #dropMenu=\"matMenu\">\n            <ng-container *ngFor=\"let button of hoverButtonLists[bIndex]; let index = index;let last = last;\">\n                <div [fxShow]=\"!button.showOnDesktop\" \n                    [fxShow.sm]=\"!button.showOnTablet\" \n                    [fxShow.xs]=\"!button.showOnMobile\">\n                    <!-- <button mat-menu-item (onClick)=\"click($event)\">\n                        <mat-icon class=\"mr\">{{item.icon}}</mat-icon>\n                        {{item.label}}\n                    </button> -->\n                    <mx-button\n                        [form]=\"form\"\n                        [formDisplayMode]=\"formDisplayMode\"\n                        [sourceIdentifier]=\"sourceIdentifier\"\n                        [sourceIndex]=\"sourceIndex\"\n                        [widgetArrayIndex]=\"widgetArrayIndex\"\n                        [button]=\"button\"\n                        [context]=\"context\"\n                        [originalData]=\"originalData\"\n                        [buttonRoute]=\"buttonRoute\"\n                        [disabled]=\"disabled\"\n                        (onClick)=\"click($event)\"\n                        (onIconClick)=\"iconClick($event)\"\n                    ></mx-button>\n                    <mat-divider *ngIf=\"!last\"></mat-divider>\n                </div>\n            </ng-container>\n        </mat-menu>\n    </span>\n</span>",
                encapsulation: ViewEncapsulation.None,
                styles: [".mx-button-group{vertical-align:middle}.mx-chip-group{display:inline-flex}.mx-button{margin-right:8px}.mx-chip-group .mat-chip-list-wrapper .mat-standard-chip{margin:unset}.mx-chip-group .mat-chip-list-wrapper{width:inherit}.mx-button-tooltip.mat-menu-panel{min-height:auto}", ".mx-small-btn{box-sizing:border-box;line-height:30px;min-width:unset}.mx-small-icon{font-size:12px;height:12px;width:12px}.mx-small-btn ::ng-deep .mat-button-toggle-label-content,.mx-small-btn ::ng-deep .mx-button-label{line-height:30px}.mx-small-btn.mat-standard-chip{min-height:30px}.mx-tiny-btn{box-sizing:border-box;font-size:10px;line-height:24px;min-width:unset}.mx-tiny-icon{font-size:10px;height:10px;width:10px}.mx-tiny-btn ::ng-deep .mat-button-toggle-label-content,.mx-tiny-btn ::ng-deep .mx-button-label{line-height:24px}.mx-tiny-btn.mat-standard-chip{min-height:26px}.mx-micro-btn{box-sizing:border-box;font-size:8px;line-height:18px;min-width:unset}.mx-micro-icon{font-size:8px;height:8px;width:8px}.mx-micro-btn ::ng-deep .mat-button-toggle-label-content,.mx-micro-btn ::ng-deep .mx-button-label{line-height:18px}.mx-micro-btn.mat-standard-chip{min-height:20px}.mx-toggle-default-btn ::ng-deep .mat-button-toggle-label-content,.mx-toggle-default-btn ::ng-deep .mx-button-label{line-height:36px}.mx-chip-button{justify-content:center}.mx-chip-button .mat-standard-chip{margin:unset}.mx-button-wt-padding,.mx-button-wt-padding .mat-button{min-width:0!important;padding:0!important}.mat-button,.mat-flat-button,.mat-icon-button,.mat-stroked-button{padding:0 5px!important}"]
            },] }
];
ButtonGroupComponent.ctorParameters = () => [
    { type: Ability }
];
ButtonGroupComponent.propDecorators = {
    form: [{ type: Input }],
    formDisplayMode: [{ type: Input }],
    sourceIdentifier: [{ type: Input }],
    sourceIndex: [{ type: Input }],
    widgetArrayIndex: [{ type: Input }],
    _buttons: [{ type: Input }],
    buttons: [{ type: Input }],
    context: [{ type: Input }],
    originalData: [{ type: Input }],
    buttonRoute: [{ type: Input }],
    parentHierarchy: [{ type: Input }],
    disabled: [{ type: Input }],
    onClick: [{ type: Output }],
    onIconClick: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvbml0aW5raGFpdGFuL05pdGluL3N0dWR5L2FuZ3VsYXIvbWF0ZXJpYWwvYWRtaW4tYnVpbGRlci1wbHVnaW4vcHJvamVjdHMvbmd4LW1hdGVyaWFsLXdpZGdldC9zcmMvIiwic291cmNlcyI6WyJsaWIvYnV0dG9uL2NvbXBvbmVudC9idXR0b24tZ3JvdXAvYnV0dG9uLWdyb3VwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBS2xHLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMxRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4QyxnR0FBZ0c7QUFRaEcsTUFBTSxPQUFPLG9CQUFvQjtJQWlEL0IsWUFBb0IsT0FBZ0I7UUFBaEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQVgxQixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM3QixnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFM0MsZ0JBQVcsR0FBNkQsSUFBSSxLQUFLLEVBQXFELENBQUM7UUFDdkksb0JBQWUsR0FBa0IsSUFBSSxLQUFLLEVBQVUsQ0FBQztRQUVyRCxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMsb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFDakMsb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFDakMscUJBQWdCLEdBQTZELElBQUksS0FBSyxFQUFxRCxDQUFDO1FBRzFJLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FB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cHV0LCBWaWV3RW5jYXBzdWxhdGlvbiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJ1dHRvbiwgT2JqZWN0VHJlZSwgQnV0dG9uR3JvdXAsIEhvdmVyQnV0dG9uLCBCYWRnZSwgQnV0dG9uVHlwZSB9IGZyb20gJy4uLy4uL21vZGVsJztcbmltcG9ydCB7IEJ1dHRvbkdyb3VwTGlzdCwgSG92ZXJCdXR0b25MaXN0IH0gZnJvbSAnLi4vLi4vbW9kZWwvYnV0dG9uLWdyb3VwLm1vZGVsJztcbmltcG9ydCB7IEZvcm1EaWFwbHlNb2RlIH0gZnJvbSAnLi4vLi4vLi4vZm9ybS9tb2RlbCc7XG5pbXBvcnQgeyBPYmplY3RVdGlscywgQnV0dG9uVXRpbHMsIFN0cmluZ1V0aWxzLCBDb2xsZWN0aW9uVXRpbHMgfSBmcm9tICcuLi8uLi8uLi91dGlsaXR5JztcbmltcG9ydCB7IEFiaWxpdHlVdGlscyB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdHkvYWJpbGl0eS51dGlsaXR5JztcbmltcG9ydCB7IEFiaWxpdHkgfSBmcm9tICdAY2FzbC9hYmlsaXR5JztcblxuLy9leHBvcnQgeyBCdXR0b24sIE9iamVjdFRyZWUsIEJ1dHRvbkdyb3VwLCBIb3ZlckJ1dHRvbiwgQmFkZ2UsIEJ1dHRvblR5cGUgfSBmcm9tICcuLi8uLi9tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ214LWJ1dHRvbi1ncm91cCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9idXR0b24tZ3JvdXAuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9idXR0b24tZ3JvdXAuY29tcG9uZW50LnNjc3MnLCAnLi4vYnV0dG9uL2J1dHRvbi5jb21wb25lbnQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbkdyb3VwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZm9ybTogRm9ybUdyb3VwO1xuICBASW5wdXQoKSBmb3JtRGlzcGxheU1vZGU6IEZvcm1EaWFwbHlNb2RlO1xuXG4gIEBJbnB1dCgpIHNvdXJjZUlkZW50aWZpZXI6IHN0cmluZztcbiAgQElucHV0KCkgc291cmNlSW5kZXg6IG51bWJlcjtcbiAgQElucHV0KCkgd2lkZ2V0QXJyYXlJbmRleDogbnVtYmVyO1xuICBASW5wdXQoKSBfYnV0dG9uczogQXJyYXk8QnV0dG9uIHwgQnV0dG9uR3JvdXAgfCBIb3ZlckJ1dHRvbj47XG5cbiAgZ2V0IGJ1dHRvbnMoKTogQXJyYXk8QnV0dG9uIHwgQnV0dG9uR3JvdXAgfCBIb3ZlckJ1dHRvbj4ge1xuICAgIHJldHVybiB0aGlzLl9idXR0b25zO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBidXR0b25zKF9idXR0b25zOiBBcnJheTxCdXR0b24gfCBCdXR0b25Hcm91cCB8IEhvdmVyQnV0dG9uPikge1xuICAgIGlmICghKF9idXR0b25zIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICBsZXQgYnRucyA9IG5ldyBBcnJheTxCdXR0b24gfCBCdXR0b25Hcm91cCB8IEhvdmVyQnV0dG9uPigpO1xuICAgICAgYnRucy5wdXNoKF9idXR0b25zKTtcbiAgICAgIF9idXR0b25zID0gYnRucztcbiAgICB9XG4gICAgdGhpcy5fYnV0dG9ucyA9IF9idXR0b25zO1xuXG4gICAgdGhpcy5nZXRCdXR0b25MaXN0KCk7XG4gICAgdGhpcy5nZXRCdXR0b25UeXBlKCk7XG5cbiAgICB0aGlzLmRpc3BsYXlEZXNrdG9wREQgPSB0aGlzLmhhc01vYmlsZUJ1dHRvbignc2hvd09uRGVza3RvcCcpO1xuICAgIHRoaXMuZGlzcGxheVRhYmxldEREID0gdGhpcy5oYXNNb2JpbGVCdXR0b24oJ3Nob3dPblRhYmxldCcpO1xuICAgIHRoaXMuZGlzcGxheU1vYmlsZUREID0gdGhpcy5oYXNNb2JpbGVCdXR0b24oJ3Nob3dPbk1vYmlsZScpO1xuXG4gICAgaWYgKHRoaXMuZGlzcGxheURlc2t0b3BERCB8fCB0aGlzLmRpc3BsYXlNb2JpbGVERCB8fCB0aGlzLmRpc3BsYXlUYWJsZXRERCkgIHtcbiAgICAgIHRoaXMuY2hhbmdlQnV0dG9uVHlwZVRvR2hvc3QoKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBjb250ZXh0OiBhbnk7XG4gIEBJbnB1dCgpIG9yaWdpbmFsRGF0YTogYW55O1xuICBASW5wdXQoKSBidXR0b25Sb3V0ZTogQXJyYXk8c3RyaW5nPjtcbiAgQElucHV0KCkgcGFyZW50SGllcmFyY2h5OiBPYmplY3RUcmVlO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgQE91dHB1dCgpIG9uQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkljb25DbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBidXR0b25MaXN0czogQXJyYXk8QXJyYXk8QnV0dG9uPiB8IEJ1dHRvbkdyb3VwTGlzdCB8IEhvdmVyQnV0dG9uTGlzdD4gPSBuZXcgQXJyYXk8QXJyYXk8QnV0dG9uPiB8IEJ1dHRvbkdyb3VwTGlzdCB8IEhvdmVyQnV0dG9uTGlzdD4oKTtcbiAgYnV0dG9uTGlzdHNUeXBlOiBBcnJheTxzdHJpbmc+ID0gbmV3IEFycmF5PHN0cmluZz4oKTtcblxuICBkaXNwbGF5RGVza3RvcEREOiBib29sZWFuID0gZmFsc2U7XG4gIGRpc3BsYXlUYWJsZXRERDogYm9vbGVhbiA9IGZhbHNlO1xuICBkaXNwbGF5TW9iaWxlREQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaG92ZXJCdXR0b25MaXN0czogQXJyYXk8QXJyYXk8QnV0dG9uPiB8IEJ1dHRvbkdyb3VwTGlzdCB8IEhvdmVyQnV0dG9uTGlzdD4gPSBuZXcgQXJyYXk8QXJyYXk8QnV0dG9uPiB8IEJ1dHRvbkdyb3VwTGlzdCB8IEhvdmVyQnV0dG9uTGlzdD4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFiaWxpdHk6IEFiaWxpdHkpIHtcbiAgICBBYmlsaXR5VXRpbHMuc2V0QWJpbGl0eSh0aGlzLmFiaWxpdHkpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgLy8gdGhpcy5nZXRCdXR0b25MaXN0KCk7XG4gICAgLy8gdGhpcy5nZXRCdXR0b25UeXBlKCk7XG4gIH1cblxuICBoYXNNb2JpbGVCdXR0b24oZGlzcGxheUluOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBsZXQgaGFzQnV0dG9uc0ZvckRyb3Bkb3duOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBpZiAoIUNvbGxlY3Rpb25VdGlscy5pc0VtcHR5KHRoaXMuYnV0dG9uTGlzdHMpKSB7XG4gICAgICB0aGlzLmJ1dHRvbkxpc3RzLmZvckVhY2goYnV0dG9ucyA9PiB7XG4gICAgICAgIGlmICghQ29sbGVjdGlvblV0aWxzLmlzRW1wdHkoYnV0dG9ucykgJiYgYnV0dG9ucyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgKDxBcnJheTxCdXR0b24+PmJ1dHRvbnMpLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgICAgIGlmIChidXR0b25bJ3Nob3dPbkRlc2t0b3AnXSA9PSBudWxsICYmIGJ1dHRvblsnc2hvd09uVGFibGV0J10gPT0gbnVsbCAmJiBidXR0b25bJ3Nob3dPbk1vYmlsZSddID09IG51bGwpICB7XG4gICAgICAgICAgICAgIGJ1dHRvblsnc2hvd09uRGVza3RvcCddID0gdHJ1ZTtcbiAgICAgICAgICAgICAgYnV0dG9uWydzaG93T25UYWJsZXQnXSA9IHRydWU7XG4gICAgICAgICAgICAgIGJ1dHRvblsnc2hvd09uTW9iaWxlJ10gPSB0cnVlOyBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGJ1dHRvbltkaXNwbGF5SW5dKSB7XG4gICAgICAgICAgICAgIGhhc0J1dHRvbnNGb3JEcm9wZG93biA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhhc0J1dHRvbnNGb3JEcm9wZG93bjtcbiAgfVxuIFxuICBjaGFuZ2VCdXR0b25UeXBlVG9HaG9zdCgpIHtcbiAgICB0aGlzLmhvdmVyQnV0dG9uTGlzdHMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuYnV0dG9uTGlzdHMpKTtcblxuICAgIGlmICghQ29sbGVjdGlvblV0aWxzLmlzRW1wdHkodGhpcy5ob3ZlckJ1dHRvbkxpc3RzKSkge1xuICAgICAgdGhpcy5ob3ZlckJ1dHRvbkxpc3RzLmZvckVhY2goYnV0dG9ucyA9PiB7XG4gICAgICAgIGlmICghQ29sbGVjdGlvblV0aWxzLmlzRW1wdHkoYnV0dG9ucykgJiYgYnV0dG9ucyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgKDxBcnJheTxCdXR0b24+PmJ1dHRvbnMpLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgICAgIGJ1dHRvbi50eXBlID0gQnV0dG9uVHlwZS5HSE9TVDtcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXRCdXR0b25MaXN0KCkge1xuICAgIHRoaXMuYnV0dG9uTGlzdHMgPSBuZXcgQXJyYXk8QXJyYXk8QnV0dG9uPiB8IEJ1dHRvbkdyb3VwTGlzdCB8IEhvdmVyQnV0dG9uTGlzdD4oKTtcbiAgICBsZXQgYnV0dG9uQXJyYXk6IEFycmF5PEFycmF5PEJ1dHRvbj4+ID0gbmV3IEFycmF5PEFycmF5PEJ1dHRvbj4+KCk7XG4gICAgbGV0IGJ1dHRvbkFycmF5SW5kZXg6IG51bWJlciA9IDA7XG5cbiAgICBpZiAodGhpcy5fYnV0dG9ucykge1xuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuX2J1dHRvbnMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGlmIChCdXR0b25VdGlscy5pbnN0YW5jZU9mQnV0dG9uKHRoaXMuX2J1dHRvbnNbaW5kZXhdKSkge1xuICAgICAgICAgIGlmIChPYmplY3RVdGlscy5pc0VtcHR5KGJ1dHRvbkFycmF5W2J1dHRvbkFycmF5SW5kZXhdKSkge1xuICAgICAgICAgICAgYnV0dG9uQXJyYXlbYnV0dG9uQXJyYXlJbmRleF0gPSBuZXcgQXJyYXk8QnV0dG9uPigpO1xuXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbkxpc3RzLnB1c2goYnV0dG9uQXJyYXlbYnV0dG9uQXJyYXlJbmRleF0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJ1dHRvbkFycmF5W2J1dHRvbkFycmF5SW5kZXhdLnB1c2goPEJ1dHRvbj50aGlzLl9idXR0b25zW2luZGV4XSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEJ1dHRvblV0aWxzLmluc3RhbmNlT2ZCdXR0b25Hcm91cCh0aGlzLl9idXR0b25zW2luZGV4XSkgfHwgQnV0dG9uVXRpbHMuaW5zdGFuY2VPZkNoaXBCdXR0b24odGhpcy5fYnV0dG9uc1tpbmRleF0pKSB7XG4gICAgICAgICAgbGV0IGJnQWRkZWQgPSB0aGlzLmdldEdyb3VwQnV0dG9uKCg8QnV0dG9uR3JvdXA+dGhpcy5fYnV0dG9uc1tpbmRleF0pLmdyb3VwSWRlbnRpZmllciwgdGhpcy5idXR0b25MaXN0cylcblxuICAgICAgICAgIGlmIChiZ0FkZGVkKSB7XG4gICAgICAgICAgICBidXR0b25BcnJheUluZGV4Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCBob3ZlckJ1dHRvbjogSG92ZXJCdXR0b25MaXN0ID0gdGhpcy5nZXRIb3ZlckJ1dHRvbnMoKTtcbiAgICAgIGlmIChob3ZlckJ1dHRvbiAmJiBob3ZlckJ1dHRvbi5ob3ZlckJ1dHRvbnMgJiYgaG92ZXJCdXR0b24uaG92ZXJCdXR0b25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5idXR0b25MaXN0cy5wdXNoKGhvdmVyQnV0dG9uKTtcbiAgICAgICAgYnV0dG9uQXJyYXlJbmRleCsrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlzR3JvdXBBZGRlZChncm91cElkZW50aWZpZXI6IHN0cmluZywgYnV0dG9uTGlzdHM6IEFycmF5PEFycmF5PEJ1dHRvbj4gfCBCdXR0b25Hcm91cExpc3QgfCBIb3ZlckJ1dHRvbkxpc3Q+KTogYm9vbGVhbiB7XG4gICAgbGV0IGdyb3VwQWRkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGlmIChidXR0b25MaXN0cykge1xuICAgICAgZ3JvdXBBZGRlZCA9IGJ1dHRvbkxpc3RzLmZpbHRlcihidXR0b25MaXN0ID0+IGJ1dHRvbkxpc3QgJiYgKDxCdXR0b25Hcm91cExpc3Q+YnV0dG9uTGlzdCkuZ3JvdXBJZGVudGlmaWVyID09IGdyb3VwSWRlbnRpZmllcikubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gZ3JvdXBBZGRlZDtcbiAgfVxuXG4gIGdldEdyb3VwQnV0dG9uKGdyb3VwSWRlbnRpZmllcjogc3RyaW5nLCBidXR0b25MaXN0czogQXJyYXk8QXJyYXk8QnV0dG9uPiB8IEJ1dHRvbkdyb3VwTGlzdCB8IEhvdmVyQnV0dG9uTGlzdD4pOiBib29sZWFuIHtcbiAgICBsZXQgYmdBZGRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGxldCBnQnV0dG9uczogQXJyYXk8QnV0dG9uR3JvdXA+ID0gbmV3IEFycmF5PEJ1dHRvbkdyb3VwPigpO1xuXG4gICAgaWYgKHRoaXMuX2J1dHRvbnMgJiYgdGhpcy5pc0dyb3VwQWRkZWQoZ3JvdXBJZGVudGlmaWVyLCBidXR0b25MaXN0cykgPT0gZmFsc2UpIHtcbiAgICAgIGdCdXR0b25zID0gdGhpcy5fYnV0dG9ucy5maWx0ZXIoYnV0dG9uID0+ICg8QnV0dG9uR3JvdXA+YnV0dG9uKS5ncm91cElkZW50aWZpZXIgPT0gZ3JvdXBJZGVudGlmaWVyKS5tYXAoYnV0dG9uID0+IHtcbiAgICAgICAgYnV0dG9uLndpZHRoID0gJzEwMCc7XG4gICAgICAgIHJldHVybiA8QnV0dG9uR3JvdXA+YnV0dG9uO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFRvIGNoZWNrIGlmIGFueSBidXR0b24gaXMgZnVsbHdpZHRoXG4gICAgICBsZXQgd2lkdGggPSBnQnV0dG9ucy5maWx0ZXIoZ0J1dHRvbiA9PiBnQnV0dG9uLmZ1bGxXaWR0aCA9PSB0cnVlKS5sZW5ndGggPiAwID8gJzEwMCcgOiAnYXV0byc7XG4gICAgICBsZXQgYnV0dG9uV2lkdGg6IGFueSA9ICdhdXRvJztcbiAgICAgIGlmICh3aWR0aCAhPSAnYXV0bycpIHtcbiAgICAgICAgYnV0dG9uV2lkdGggPSAoK3dpZHRoIC8gZ0J1dHRvbnMubGVuZ3RoKTtcbiAgICAgIH1cblxuICAgICAgYnV0dG9uTGlzdHMucHVzaCh7XG4gICAgICAgIGdyb3VwSWRlbnRpZmllcjogZ3JvdXBJZGVudGlmaWVyLFxuICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgIGJ1dHRvbldpZHRoOiBidXR0b25XaWR0aCxcbiAgICAgICAgZ3JvdXBCdXR0b25zOiBnQnV0dG9uc1xuICAgICAgfSk7XG4gICAgICBiZ0FkZGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gYmdBZGRlZDtcbiAgfVxuXG4gIGdldEhvdmVyQnV0dG9ucygpOiBIb3ZlckJ1dHRvbkxpc3Qge1xuICAgIGxldCBob3ZlckJ1dHRvbnM6IEFycmF5PEhvdmVyQnV0dG9uPiA9IG5ldyBBcnJheTxIb3ZlckJ1dHRvbj4oKTtcbiAgICBsZXQgZ3JvdXBJZGVudGlmaWVyOiBzdHJpbmc7XG4gICAgbGV0IGdyb3VwTGFiZWw6IHN0cmluZztcbiAgICBsZXQgZ3JvdXBJY29uOiBzdHJpbmc7XG4gICAgbGV0IGJhZGdlOiBCYWRnZTtcbiAgICBsZXQgd2lkdGg6IHN0cmluZyA9ICdhdXRvJztcblxuICAgIGlmICh0aGlzLl9idXR0b25zKSB7XG4gICAgICB0aGlzLl9idXR0b25zLmZpbHRlcihidXR0b24gPT4gQnV0dG9uVXRpbHMuaW5zdGFuY2VPZkhvdmVyQnV0dG9uKGJ1dHRvbikpLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgaWYgKFN0cmluZ1V0aWxzLmlzRW1wdHkoZ3JvdXBJZGVudGlmaWVyKSkge1xuICAgICAgICAgIGdyb3VwSWRlbnRpZmllciA9ICg8SG92ZXJCdXR0b24+YnV0dG9uKS5ncm91cElkZW50aWZpZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFN0cmluZ1V0aWxzLmlzRW1wdHkoZ3JvdXBMYWJlbCkpIHtcbiAgICAgICAgICBncm91cExhYmVsID0gKDxIb3ZlckJ1dHRvbj5idXR0b24pLmdyb3VwTGFiZWw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFN0cmluZ1V0aWxzLmlzRW1wdHkoZ3JvdXBJY29uKSkge1xuICAgICAgICAgIGdyb3VwSWNvbiA9ICg8SG92ZXJCdXR0b24+YnV0dG9uKS5ncm91cEljb247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKENvbGxlY3Rpb25VdGlscy5pc0VtcHR5KGJhZGdlKSkge1xuICAgICAgICAgIGJhZGdlID0gKDxIb3ZlckJ1dHRvbj5idXR0b24pLmJhZGdlO1xuICAgICAgICB9XG4gICAgICAgIGlmICgoPEhvdmVyQnV0dG9uPmJ1dHRvbikuZnVsbFdpZHRoKSB7XG4gICAgICAgICAgd2lkdGggPSAnMTAwJztcbiAgICAgICAgICBidXR0b24ud2lkdGggPSAnMTAwJztcbiAgICAgICAgfVxuXG4gICAgICAgIGhvdmVyQnV0dG9ucy5wdXNoKDxIb3ZlckJ1dHRvbj5idXR0b24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgZ3JvdXBJZGVudGlmaWVyOiBncm91cElkZW50aWZpZXIsIGdyb3VwTGFiZWw6IGdyb3VwTGFiZWwsIGdyb3VwSWNvbjogZ3JvdXBJY29uLCBiYWRnZTogYmFkZ2UsIHdpZHRoOiB3aWR0aCwgaG92ZXJCdXR0b25zOiBob3ZlckJ1dHRvbnMgfTtcbiAgfVxuXG4gIGdldEJ1dHRvblR5cGUoKTogdm9pZCB7XG4gICAgdGhpcy5idXR0b25MaXN0c1R5cGUgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xuXG4gICAgaWYgKHRoaXMuYnV0dG9uTGlzdHMgJiYgdGhpcy5idXR0b25MaXN0cy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGxldCBidXR0b25MaXN0IG9mIHRoaXMuYnV0dG9uTGlzdHMpIHtcbiAgICAgICAgbGV0IGJ1dHRvblR5cGU6IHN0cmluZyA9IFwiXCI7XG4gICAgICAgIGlmICh0aGlzLmlzQnV0dG9uR3JvdXAoYnV0dG9uTGlzdCkpIHtcbiAgICAgICAgICBidXR0b25UeXBlID0gJ0J1dHRvbkdyb3VwJztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzQ2hpcEdyb3VwKGJ1dHRvbkxpc3QpKSB7XG4gICAgICAgICAgYnV0dG9uVHlwZSA9ICdDaGlwR3JvdXAnO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNCdXR0b25Ib3ZlcihidXR0b25MaXN0KSkge1xuICAgICAgICAgIGJ1dHRvblR5cGUgPSAnQnV0dG9uSG92ZXInO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNCdXR0b25BcnJheShidXR0b25MaXN0KSkge1xuICAgICAgICAgIGJ1dHRvblR5cGUgPSAnQnV0dG9uQXJyYXknO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5idXR0b25MaXN0c1R5cGUucHVzaChidXR0b25UeXBlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpc0J1dHRvbkdyb3VwKGJ1dHRvbkxpc3Q6IEFycmF5PEJ1dHRvbj4gfCBCdXR0b25Hcm91cExpc3QgfCBIb3ZlckJ1dHRvbkxpc3QpOiBib29sZWFuIHtcbiAgICBsZXQgaXNCdXR0b25Hcm91cDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgaWYgKGJ1dHRvbkxpc3QgJiYgKDxCdXR0b25Hcm91cExpc3Q+YnV0dG9uTGlzdCkuZ3JvdXBCdXR0b25zICYmICg8QnV0dG9uR3JvdXBMaXN0PmJ1dHRvbkxpc3QpLmdyb3VwQnV0dG9ucy5sZW5ndGggPiAwICYmICFTdHJpbmdVdGlscy5pc0VtcHR5KCg8QnV0dG9uR3JvdXBMaXN0PmJ1dHRvbkxpc3QpLmdyb3VwSWRlbnRpZmllcikpIHtcbiAgICAgIGlzQnV0dG9uR3JvdXAgPSAoPEJ1dHRvbkdyb3VwTGlzdD5idXR0b25MaXN0KS5ncm91cEJ1dHRvbnMuZmlsdGVyKGJ1dHRvbiA9PiBCdXR0b25VdGlscy5pbnN0YW5jZU9mQnV0dG9uR3JvdXAoYnV0dG9uKSkubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gaXNCdXR0b25Hcm91cDtcbiAgfVxuXG4gIGlzQ2hpcEdyb3VwKGJ1dHRvbkxpc3Q6IEFycmF5PEJ1dHRvbj4gfCBCdXR0b25Hcm91cExpc3QgfCBIb3ZlckJ1dHRvbkxpc3QpOiBib29sZWFuIHtcbiAgICBsZXQgaXNDaGlwR3JvdXA6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGlmIChidXR0b25MaXN0ICYmICg8QnV0dG9uR3JvdXBMaXN0PmJ1dHRvbkxpc3QpLmdyb3VwQnV0dG9ucyAmJiAoPEJ1dHRvbkdyb3VwTGlzdD5idXR0b25MaXN0KS5ncm91cEJ1dHRvbnMubGVuZ3RoID4gMCAmJiAhU3RyaW5nVXRpbHMuaXNFbXB0eSgoPEJ1dHRvbkdyb3VwTGlzdD5idXR0b25MaXN0KS5ncm91cElkZW50aWZpZXIpKSB7XG4gICAgICBpc0NoaXBHcm91cCA9ICg8QnV0dG9uR3JvdXBMaXN0PmJ1dHRvbkxpc3QpLmdyb3VwQnV0dG9ucy5maWx0ZXIoYnV0dG9uID0+IEJ1dHRvblV0aWxzLmluc3RhbmNlT2ZDaGlwQnV0dG9uKGJ1dHRvbikpLmxlbmd0aCA+IDA7XG5cbiAgICAgIGlmIChpc0NoaXBHcm91cCkge1xuICAgICAgICAoPEJ1dHRvbkdyb3VwTGlzdD5idXR0b25MaXN0KS5ncm91cEJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4gQnV0dG9uVXRpbHMuaW5zdGFuY2VPZkNoaXBCdXR0b24oYnV0dG9uKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzQ2hpcEdyb3VwO1xuICB9XG5cbiAgaXNCdXR0b25Ib3ZlcihidXR0b25MaXN0OiBBcnJheTxCdXR0b24+IHwgQnV0dG9uR3JvdXBMaXN0IHwgSG92ZXJCdXR0b25MaXN0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGJ1dHRvbkxpc3QgJiYgKDxIb3ZlckJ1dHRvbkxpc3Q+YnV0dG9uTGlzdCkuaG92ZXJCdXR0b25zICYmICg8SG92ZXJCdXR0b25MaXN0PmJ1dHRvbkxpc3QpLmhvdmVyQnV0dG9ucy5sZW5ndGggPiAwXG4gIH1cblxuICBpc0J1dHRvbkFycmF5KGJ1dHRvbkxpc3Q6IEFycmF5PEJ1dHRvbj4gfCBCdXR0b25Hcm91cExpc3QgfCBIb3ZlckJ1dHRvbkxpc3QpOiBib29sZWFuIHtcbiAgICByZXR1cm4gYnV0dG9uTGlzdCBpbnN0YW5jZW9mIEFycmF5O1xuICB9XG5cbiAgY2xpY2soZXZlbnQ6IGFueSkge1xuICAgIHRoaXMub25DbGljay5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIGljb25DbGljayhldmVudDogYW55KSB7XG4gICAgdGhpcy5vbkljb25DbGljay5lbWl0KGV2ZW50KTtcbiAgfVxufVxuIl19