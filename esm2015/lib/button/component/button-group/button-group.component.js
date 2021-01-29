import { Component, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { ObjectUtils, ButtonUtils, StringUtils, CollectionUtils } from '../../../utility';
import { AbilityUtils } from '../../../utility/ability.utility';
import { Ability } from '@casl/ability';
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
                selector: 'cf-button-group',
                template: "<!-- <pre>{{formDisplayMode | json}}</pre> -->\n<span class=\"cf-button-group\" *ngFor=\"let buttonList of buttonLists; let bIndex = index;\">\n    <mat-chip-list \n        *ngIf=\"buttonListsType[bIndex] == 'ChipGroup'\"\n        [style.width.%]=\"buttonList.width\" \n        [ngClass]=\"{'cf-button': bIndex < buttonLists.length - 1 }\"\n        class=\"cf-chip-group cf-chip-group-{{buttonList.groupIdentifier}}\"\n        aria-label=\"Chip Selection\">\n        <cf-button *ngFor=\"let button of buttonList.groupButtons\"\n            [form]=\"form\"\n            [ngClass]=\"{'cf-button': (bIndex + 1) != buttonList.length}\"\n            [style.width]=\"'calc(' + buttonList.buttonWidth + '% - 8px)'\"\n            [formDisplayMode]=\"formDisplayMode\"\n            [sourceIdentifier]=\"sourceIdentifier\"\n            [sourceIndex]=\"sourceIndex\"\n            [widgetArrayIndex]=\"widgetArrayIndex\"\n            [button]=\"button\"\n            [context]=\"context\" \n            [originalData]=\"originalData\"\n            [buttonRoute]=\"buttonRoute\"\n            [parentHierarchy]=\"parentHierarchy\"\n            [disabled]=\"disabled\"\n            (onClick)=\"click($event)\"\n            (onIconClick)=\"iconClick($event)\"\n        ></cf-button>\n    </mat-chip-list>\n    \n    <!-- appearance=\"legacy\" -->\n    <mat-button-toggle-group \n        *ngIf=\"buttonListsType[bIndex] == 'ButtonGroup'\"\n        [name]=\"buttonList.groupIdentifier\" \n        multiple=\"false\" \n        [ngClass]=\"{'cf-button': bIndex < buttonLists.length - 1 }\"\n        class=\"cf-toggle-group cf-toggle-group-{{buttonList.groupIdentifier}}\" \n        [style.width.%]=\"buttonList.width\"\n        #group=\"matButtonToggleGroup\">\n        <cf-button *ngFor=\"let button of buttonList.groupButtons\"\n            [form]=\"form\"\n            [style.width.%]=\"buttonList.buttonWidth\"\n            [formDisplayMode]=\"formDisplayMode\"\n            [sourceIdentifier]=\"sourceIdentifier\"\n            [sourceIndex]=\"sourceIndex\"\n            [widgetArrayIndex]=\"widgetArrayIndex\"\n            [button]=\"button\"\n            [context]=\"context\"\n            [originalData]=\"originalData\"\n            [buttonRoute]=\"buttonRoute\"\n            [parentHierarchy]=\"parentHierarchy\"\n            [disabled]=\"disabled\"\n            (onClick)=\"click($event)\"\n            (onIconClick)=\"iconClick($event)\"\n        ></cf-button>\n    </mat-button-toggle-group>\n\n    <span \n        *ngIf=\"buttonListsType[bIndex] == 'ButtonHover'\"\n        [ngClass]=\"{'cf-button': bIndex < buttonLists.length - 1}\"\n        class=\"cf-hover-group cf-hover-group-{{buttonList.groupIdentifier}}\"\n        [style.width.%]=\"100\">\n        <button \n            mat-raised-button \n            [matMenuTriggerFor]=\"menu\" \n            [ngClass]=\"{'cf-small-btn': buttonList.hoverButtons[0].size == 'small', 'cf-tiny-btn': buttonList.hoverButtons[0].size == 'tiny', 'cf-micro-btn': buttonList.hoverButtons[0].size == 'micro', 'cf-default-btn': buttonList.hoverButtons[0].size == 'default'}\"\n            [style.width.%]=\"buttonList.width\"\n            [attr.aria-label]=\"buttonList.groupLabel\"\n            [matBadge]=\"buttonList.badge ? buttonList.badge.content : ''\" \n            [matBadgeColor]=\"buttonList.badge ? buttonList.badge.color : ''\" \n            [matBadgePosition]=\"buttonList.badge ? buttonList.badge.position : ''\" \n            [matBadgeSize]=\"buttonList.badge ? buttonList.badge.size : ''\" \n            [matBadgeHidden]=\"buttonList.badge ? buttonList.badge.hide : false\">\n            <span class=\"cf-button-label cf-button-label-{{buttonList.groupIdentifier}}\" *ngIf=\"buttonList.groupLabel\">{{ buttonList.groupLabel }}</span>\n            <mat-icon\n                [ngClass]=\"{'cf-small-icon': buttonList.hoverButtons[0].size == 'small', 'cf-tiny-icon': buttonList.hoverButtons[0].size == 'tiny', 'cf-micro-icon': buttonList.hoverButtons[0].size == 'micro', 'cf-default-icon': buttonList.hoverButtons[0].size == 'default'}\"\n                class=\"cf-button-icon\"\n            >{{buttonList.groupIcon}}</mat-icon>\n        </button> \n        <mat-menu #menu=\"matMenu\">\n            <cf-button *ngFor=\"let button of buttonList.hoverButtons\"\n                [form]=\"form\" \n                [formDisplayMode]=\"formDisplayMode\"\n                [sourceIdentifier]=\"sourceIdentifier\"\n                [sourceIndex]=\"sourceIndex\"\n                [widgetArrayIndex]=\"widgetArrayIndex\"\n                [button]=\"button\"\n                [context]=\"context\"\n                [originalData]=\"originalData\"\n                [buttonRoute]=\"buttonRoute\"\n                [parentHierarchy]=\"parentHierarchy\"\n                [disabled]=\"disabled\"\n                (onClick)=\"click($event)\"\n                (onIconClick)=\"iconClick($event)\"\n                ></cf-button> \n        </mat-menu>\n    </span>\n    <span \n        [ngClass]=\"{'cf-button': bIndex < buttonLists.length - 1 }\"\n        class=\"cf-buttons-group\" \n        *ngIf=\"buttonListsType[bIndex] == 'ButtonArray'\">\n        <cf-button *ngFor=\"let button of buttonList; let index = index;\"\n            [form]=\"form\"\n            [formDisplayMode]=\"formDisplayMode\"\n            [sourceIdentifier]=\"sourceIdentifier\"\n            [sourceIndex]=\"sourceIndex\"\n            [widgetArrayIndex]=\"widgetArrayIndex\"\n            [button]=\"button\"\n            [context]=\"context\"\n            [originalData]=\"originalData\"\n            [buttonRoute]=\"buttonRoute\"\n            [parentHierarchy]=\"parentHierarchy\"\n            [disabled]=\"disabled\"\n            [ngClass]=\"{'cf-button': (index + 1) != buttonList.length}\"\n            (onClick)=\"click($event)\"\n            (onIconClick)=\"iconClick($event)\"\n            [fxShow]=\"button.showOnDesktop\" \n            [fxShow.xs]=\"button.showOnMobile\" \n            [fxShow.sm]=\"button.showOnTablet\"\n        ></cf-button> \n        <button \n            mat-icon-button \n            [matMenuTriggerFor]=\"dropMenu\" \n            [fxShow]=\"!displayDesktopDD\"\n            [fxShow.sm]=\"!displayTabletDD\"\n            [fxShow.xs]=\"!displayMobileDD\">\n            <mat-icon>more_vert</mat-icon>\n        </button>\n        <mat-menu class=\"cf-button-tooltip\" #dropMenu=\"matMenu\">\n            <ng-container *ngFor=\"let button of hoverButtonLists[bIndex]; let index = index;let last = last;\">\n                <div [fxShow]=\"!button.showOnDesktop\" \n                    [fxShow.sm]=\"!button.showOnTablet\" \n                    [fxShow.xs]=\"!button.showOnMobile\">\n                    <!-- <button mat-menu-item (onClick)=\"click($event)\">\n                        <mat-icon class=\"mr\">{{item.icon}}</mat-icon>\n                        {{item.label}}\n                    </button> -->\n                    <cf-button\n                        [form]=\"form\"\n                        [formDisplayMode]=\"formDisplayMode\"\n                        [sourceIdentifier]=\"sourceIdentifier\"\n                        [sourceIndex]=\"sourceIndex\"\n                        [widgetArrayIndex]=\"widgetArrayIndex\"\n                        [button]=\"button\"\n                        [context]=\"context\"\n                        [originalData]=\"originalData\"\n                        [buttonRoute]=\"buttonRoute\"\n                        [disabled]=\"disabled\"\n                        (onClick)=\"click($event)\"\n                        (onIconClick)=\"iconClick($event)\"\n                    ></cf-button>\n                    <mat-divider *ngIf=\"!last\"></mat-divider>\n                </div>\n            </ng-container>\n        </mat-menu>\n    </span>\n</span>",
                encapsulation: ViewEncapsulation.None,
                styles: [".cf-button-group{vertical-align:middle}.cf-chip-group{display:inline-flex}.cf-button{margin-right:8px}.cf-chip-group .mat-chip-list-wrapper .mat-standard-chip{margin:unset}.cf-chip-group .mat-chip-list-wrapper{width:inherit}.cf-button-tooltip.mat-menu-panel{min-height:auto}", ".cf-small-btn{box-sizing:border-box;line-height:30px;min-width:unset}.cf-small-icon{font-size:12px;height:12px;width:12px}.cf-small-btn ::ng-deep .cf-button-label,.cf-small-btn ::ng-deep .mat-button-toggle-label-content{line-height:30px}.cf-small-btn.mat-standard-chip{min-height:30px}.cf-tiny-btn{box-sizing:border-box;font-size:10px;line-height:24px;min-width:unset}.cf-tiny-icon{font-size:10px;height:10px;width:10px}.cf-tiny-btn ::ng-deep .cf-button-label,.cf-tiny-btn ::ng-deep .mat-button-toggle-label-content{line-height:24px}.cf-tiny-btn.mat-standard-chip{min-height:26px}.cf-micro-btn{box-sizing:border-box;font-size:8px;line-height:18px;min-width:unset}.cf-micro-icon{font-size:8px;height:8px;width:8px}.cf-micro-btn ::ng-deep .cf-button-label,.cf-micro-btn ::ng-deep .mat-button-toggle-label-content{line-height:18px}.cf-micro-btn.mat-standard-chip{min-height:20px}.cf-toggle-default-btn ::ng-deep .cf-button-label,.cf-toggle-default-btn ::ng-deep .mat-button-toggle-label-content{line-height:36px}.cf-chip-button{justify-content:center}.cf-chip-button .mat-standard-chip{margin:unset}.cf-button-wt-padding,.cf-button-wt-padding .mat-button{min-width:0!important;padding:0!important}.mat-button,.mat-flat-button,.mat-icon-button,.mat-stroked-button{padding:0 5px!important}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvbml0aW5raGFpdGFuL05pdGluL3N0dWR5L2FuZ3VsYXIvbWF0ZXJpYWwvYWRtaW4tYnVpbGRlci1wbHVnaW4vcHJvamVjdHMvbmd4LW1hdGVyaWFsLXdpZGdldC9zcmMvIiwic291cmNlcyI6WyJsaWIvYnV0dG9uL2NvbXBvbmVudC9idXR0b24tZ3JvdXAvYnV0dG9uLWdyb3VwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBS2xHLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMxRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVF4QyxNQUFNLE9BQU8sb0JBQW9CO0lBaUQvQixZQUFvQixPQUFnQjtRQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBWDFCLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdCLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUzQyxnQkFBVyxHQUE2RCxJQUFJLEtBQUssRUFBcUQsQ0FBQztRQUN2SSxvQkFBZSxHQUFrQixJQUFJLEtBQUssRUFBVSxDQUFDO1FBRXJELHFCQUFnQixHQUFZLEtBQUssQ0FBQztRQUNsQyxvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUNqQyxvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUNqQyxxQkFBZ0IsR0FBNkQsSUFBSSxLQUFLLEVBQXFELENBQUM7UUFHMUksWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEMs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cHN1bGF0aW9uLCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQnV0dG9uLCBPYmplY3RUcmVlLCBCdXR0b25Hcm91cCwgSG92ZXJCdXR0b24sIEJhZGdlLCBCdXR0b25UeXBlIH0gZnJvbSAnLi4vLi4vbW9kZWwnO1xuaW1wb3J0IHsgQnV0dG9uR3JvdXBMaXN0LCBIb3ZlckJ1dHRvbkxpc3QgfSBmcm9tICcuLi8uLi9tb2RlbC9idXR0b24tZ3JvdXAubW9kZWwnO1xuaW1wb3J0IHsgRm9ybURpYXBseU1vZGUgfSBmcm9tICcuLi8uLi8uLi9mb3JtL21vZGVsJztcbmltcG9ydCB7IE9iamVjdFV0aWxzLCBCdXR0b25VdGlscywgU3RyaW5nVXRpbHMsIENvbGxlY3Rpb25VdGlscyB9IGZyb20gJy4uLy4uLy4uL3V0aWxpdHknO1xuaW1wb3J0IHsgQWJpbGl0eVV0aWxzIH0gZnJvbSAnLi4vLi4vLi4vdXRpbGl0eS9hYmlsaXR5LnV0aWxpdHknO1xuaW1wb3J0IHsgQWJpbGl0eSB9IGZyb20gJ0BjYXNsL2FiaWxpdHknO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjZi1idXR0b24tZ3JvdXAnLFxuICB0ZW1wbGF0ZVVybDogJy4vYnV0dG9uLWdyb3VwLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYnV0dG9uLWdyb3VwLmNvbXBvbmVudC5zY3NzJywgJy4uL2J1dHRvbi9idXR0b24uY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBCdXR0b25Hcm91cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGZvcm06IEZvcm1Hcm91cDtcbiAgQElucHV0KCkgZm9ybURpc3BsYXlNb2RlOiBGb3JtRGlhcGx5TW9kZTtcblxuICBASW5wdXQoKSBzb3VyY2VJZGVudGlmaWVyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNvdXJjZUluZGV4OiBudW1iZXI7XG4gIEBJbnB1dCgpIHdpZGdldEFycmF5SW5kZXg6IG51bWJlcjtcbiAgQElucHV0KCkgX2J1dHRvbnM6IEFycmF5PEJ1dHRvbiB8IEJ1dHRvbkdyb3VwIHwgSG92ZXJCdXR0b24+O1xuXG4gIGdldCBidXR0b25zKCk6IEFycmF5PEJ1dHRvbiB8IEJ1dHRvbkdyb3VwIHwgSG92ZXJCdXR0b24+IHtcbiAgICByZXR1cm4gdGhpcy5fYnV0dG9ucztcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgYnV0dG9ucyhfYnV0dG9uczogQXJyYXk8QnV0dG9uIHwgQnV0dG9uR3JvdXAgfCBIb3ZlckJ1dHRvbj4pIHtcbiAgICBpZiAoIShfYnV0dG9ucyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgbGV0IGJ0bnMgPSBuZXcgQXJyYXk8QnV0dG9uIHwgQnV0dG9uR3JvdXAgfCBIb3ZlckJ1dHRvbj4oKTtcbiAgICAgIGJ0bnMucHVzaChfYnV0dG9ucyk7XG4gICAgICBfYnV0dG9ucyA9IGJ0bnM7XG4gICAgfVxuICAgIHRoaXMuX2J1dHRvbnMgPSBfYnV0dG9ucztcblxuICAgIHRoaXMuZ2V0QnV0dG9uTGlzdCgpO1xuICAgIHRoaXMuZ2V0QnV0dG9uVHlwZSgpO1xuXG4gICAgdGhpcy5kaXNwbGF5RGVza3RvcEREID0gdGhpcy5oYXNNb2JpbGVCdXR0b24oJ3Nob3dPbkRlc2t0b3AnKTtcbiAgICB0aGlzLmRpc3BsYXlUYWJsZXRERCA9IHRoaXMuaGFzTW9iaWxlQnV0dG9uKCdzaG93T25UYWJsZXQnKTtcbiAgICB0aGlzLmRpc3BsYXlNb2JpbGVERCA9IHRoaXMuaGFzTW9iaWxlQnV0dG9uKCdzaG93T25Nb2JpbGUnKTtcblxuICAgIGlmICh0aGlzLmRpc3BsYXlEZXNrdG9wREQgfHwgdGhpcy5kaXNwbGF5TW9iaWxlREQgfHwgdGhpcy5kaXNwbGF5VGFibGV0REQpICB7XG4gICAgICB0aGlzLmNoYW5nZUJ1dHRvblR5cGVUb0dob3N0KCk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgY29udGV4dDogYW55O1xuICBASW5wdXQoKSBvcmlnaW5hbERhdGE6IGFueTtcbiAgQElucHV0KCkgYnV0dG9uUm91dGU6IEFycmF5PHN0cmluZz47XG4gIEBJbnB1dCgpIHBhcmVudEhpZXJhcmNoeTogT2JqZWN0VHJlZTtcbiAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW47XG4gIEBPdXRwdXQoKSBvbkNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25JY29uQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgYnV0dG9uTGlzdHM6IEFycmF5PEFycmF5PEJ1dHRvbj4gfCBCdXR0b25Hcm91cExpc3QgfCBIb3ZlckJ1dHRvbkxpc3Q+ID0gbmV3IEFycmF5PEFycmF5PEJ1dHRvbj4gfCBCdXR0b25Hcm91cExpc3QgfCBIb3ZlckJ1dHRvbkxpc3Q+KCk7XG4gIGJ1dHRvbkxpc3RzVHlwZTogQXJyYXk8c3RyaW5nPiA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XG5cbiAgZGlzcGxheURlc2t0b3BERDogYm9vbGVhbiA9IGZhbHNlO1xuICBkaXNwbGF5VGFibGV0REQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZGlzcGxheU1vYmlsZUREOiBib29sZWFuID0gZmFsc2U7XG4gIGhvdmVyQnV0dG9uTGlzdHM6IEFycmF5PEFycmF5PEJ1dHRvbj4gfCBCdXR0b25Hcm91cExpc3QgfCBIb3ZlckJ1dHRvbkxpc3Q+ID0gbmV3IEFycmF5PEFycmF5PEJ1dHRvbj4gfCBCdXR0b25Hcm91cExpc3QgfCBIb3ZlckJ1dHRvbkxpc3Q+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhYmlsaXR5OiBBYmlsaXR5KSB7XG4gICAgQWJpbGl0eVV0aWxzLnNldEFiaWxpdHkodGhpcy5hYmlsaXR5KTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIC8vIHRoaXMuZ2V0QnV0dG9uTGlzdCgpO1xuICAgIC8vIHRoaXMuZ2V0QnV0dG9uVHlwZSgpO1xuICB9XG5cbiAgaGFzTW9iaWxlQnV0dG9uKGRpc3BsYXlJbjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgbGV0IGhhc0J1dHRvbnNGb3JEcm9wZG93bjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgaWYgKCFDb2xsZWN0aW9uVXRpbHMuaXNFbXB0eSh0aGlzLmJ1dHRvbkxpc3RzKSkge1xuICAgICAgdGhpcy5idXR0b25MaXN0cy5mb3JFYWNoKGJ1dHRvbnMgPT4ge1xuICAgICAgICBpZiAoIUNvbGxlY3Rpb25VdGlscy5pc0VtcHR5KGJ1dHRvbnMpICYmIGJ1dHRvbnMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICg8QXJyYXk8QnV0dG9uPj5idXR0b25zKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgICAgICBpZiAoYnV0dG9uWydzaG93T25EZXNrdG9wJ10gPT0gbnVsbCAmJiBidXR0b25bJ3Nob3dPblRhYmxldCddID09IG51bGwgJiYgYnV0dG9uWydzaG93T25Nb2JpbGUnXSA9PSBudWxsKSAge1xuICAgICAgICAgICAgICBidXR0b25bJ3Nob3dPbkRlc2t0b3AnXSA9IHRydWU7XG4gICAgICAgICAgICAgIGJ1dHRvblsnc2hvd09uVGFibGV0J10gPSB0cnVlO1xuICAgICAgICAgICAgICBidXR0b25bJ3Nob3dPbk1vYmlsZSddID0gdHJ1ZTsgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChidXR0b25bZGlzcGxheUluXSkge1xuICAgICAgICAgICAgICBoYXNCdXR0b25zRm9yRHJvcGRvd24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBoYXNCdXR0b25zRm9yRHJvcGRvd247XG4gIH1cbiBcbiAgY2hhbmdlQnV0dG9uVHlwZVRvR2hvc3QoKSB7XG4gICAgdGhpcy5ob3ZlckJ1dHRvbkxpc3RzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmJ1dHRvbkxpc3RzKSk7XG5cbiAgICBpZiAoIUNvbGxlY3Rpb25VdGlscy5pc0VtcHR5KHRoaXMuaG92ZXJCdXR0b25MaXN0cykpIHtcbiAgICAgIHRoaXMuaG92ZXJCdXR0b25MaXN0cy5mb3JFYWNoKGJ1dHRvbnMgPT4ge1xuICAgICAgICBpZiAoIUNvbGxlY3Rpb25VdGlscy5pc0VtcHR5KGJ1dHRvbnMpICYmIGJ1dHRvbnMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICg8QXJyYXk8QnV0dG9uPj5idXR0b25zKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgICAgICBidXR0b24udHlwZSA9IEJ1dHRvblR5cGUuR0hPU1Q7XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0QnV0dG9uTGlzdCgpIHtcbiAgICB0aGlzLmJ1dHRvbkxpc3RzID0gbmV3IEFycmF5PEFycmF5PEJ1dHRvbj4gfCBCdXR0b25Hcm91cExpc3QgfCBIb3ZlckJ1dHRvbkxpc3Q+KCk7XG4gICAgbGV0IGJ1dHRvbkFycmF5OiBBcnJheTxBcnJheTxCdXR0b24+PiA9IG5ldyBBcnJheTxBcnJheTxCdXR0b24+PigpO1xuICAgIGxldCBidXR0b25BcnJheUluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgaWYgKHRoaXMuX2J1dHRvbnMpIHtcbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLl9idXR0b25zLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBpZiAoQnV0dG9uVXRpbHMuaW5zdGFuY2VPZkJ1dHRvbih0aGlzLl9idXR0b25zW2luZGV4XSkpIHtcbiAgICAgICAgICBpZiAoT2JqZWN0VXRpbHMuaXNFbXB0eShidXR0b25BcnJheVtidXR0b25BcnJheUluZGV4XSkpIHtcbiAgICAgICAgICAgIGJ1dHRvbkFycmF5W2J1dHRvbkFycmF5SW5kZXhdID0gbmV3IEFycmF5PEJ1dHRvbj4oKTtcblxuICAgICAgICAgICAgdGhpcy5idXR0b25MaXN0cy5wdXNoKGJ1dHRvbkFycmF5W2J1dHRvbkFycmF5SW5kZXhdKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBidXR0b25BcnJheVtidXR0b25BcnJheUluZGV4XS5wdXNoKDxCdXR0b24+dGhpcy5fYnV0dG9uc1tpbmRleF0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChCdXR0b25VdGlscy5pbnN0YW5jZU9mQnV0dG9uR3JvdXAodGhpcy5fYnV0dG9uc1tpbmRleF0pIHx8IEJ1dHRvblV0aWxzLmluc3RhbmNlT2ZDaGlwQnV0dG9uKHRoaXMuX2J1dHRvbnNbaW5kZXhdKSkge1xuICAgICAgICAgIGxldCBiZ0FkZGVkID0gdGhpcy5nZXRHcm91cEJ1dHRvbigoPEJ1dHRvbkdyb3VwPnRoaXMuX2J1dHRvbnNbaW5kZXhdKS5ncm91cElkZW50aWZpZXIsIHRoaXMuYnV0dG9uTGlzdHMpXG5cbiAgICAgICAgICBpZiAoYmdBZGRlZCkge1xuICAgICAgICAgICAgYnV0dG9uQXJyYXlJbmRleCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgaG92ZXJCdXR0b246IEhvdmVyQnV0dG9uTGlzdCA9IHRoaXMuZ2V0SG92ZXJCdXR0b25zKCk7XG4gICAgICBpZiAoaG92ZXJCdXR0b24gJiYgaG92ZXJCdXR0b24uaG92ZXJCdXR0b25zICYmIGhvdmVyQnV0dG9uLmhvdmVyQnV0dG9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuYnV0dG9uTGlzdHMucHVzaChob3ZlckJ1dHRvbik7XG4gICAgICAgIGJ1dHRvbkFycmF5SW5kZXgrKztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpc0dyb3VwQWRkZWQoZ3JvdXBJZGVudGlmaWVyOiBzdHJpbmcsIGJ1dHRvbkxpc3RzOiBBcnJheTxBcnJheTxCdXR0b24+IHwgQnV0dG9uR3JvdXBMaXN0IHwgSG92ZXJCdXR0b25MaXN0Pik6IGJvb2xlYW4ge1xuICAgIGxldCBncm91cEFkZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBpZiAoYnV0dG9uTGlzdHMpIHtcbiAgICAgIGdyb3VwQWRkZWQgPSBidXR0b25MaXN0cy5maWx0ZXIoYnV0dG9uTGlzdCA9PiBidXR0b25MaXN0ICYmICg8QnV0dG9uR3JvdXBMaXN0PmJ1dHRvbkxpc3QpLmdyb3VwSWRlbnRpZmllciA9PSBncm91cElkZW50aWZpZXIpLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdyb3VwQWRkZWQ7XG4gIH1cblxuICBnZXRHcm91cEJ1dHRvbihncm91cElkZW50aWZpZXI6IHN0cmluZywgYnV0dG9uTGlzdHM6IEFycmF5PEFycmF5PEJ1dHRvbj4gfCBCdXR0b25Hcm91cExpc3QgfCBIb3ZlckJ1dHRvbkxpc3Q+KTogYm9vbGVhbiB7XG4gICAgbGV0IGJnQWRkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBsZXQgZ0J1dHRvbnM6IEFycmF5PEJ1dHRvbkdyb3VwPiA9IG5ldyBBcnJheTxCdXR0b25Hcm91cD4oKTtcblxuICAgIGlmICh0aGlzLl9idXR0b25zICYmIHRoaXMuaXNHcm91cEFkZGVkKGdyb3VwSWRlbnRpZmllciwgYnV0dG9uTGlzdHMpID09IGZhbHNlKSB7XG4gICAgICBnQnV0dG9ucyA9IHRoaXMuX2J1dHRvbnMuZmlsdGVyKGJ1dHRvbiA9PiAoPEJ1dHRvbkdyb3VwPmJ1dHRvbikuZ3JvdXBJZGVudGlmaWVyID09IGdyb3VwSWRlbnRpZmllcikubWFwKGJ1dHRvbiA9PiB7XG4gICAgICAgIGJ1dHRvbi53aWR0aCA9ICcxMDAnO1xuICAgICAgICByZXR1cm4gPEJ1dHRvbkdyb3VwPmJ1dHRvbjtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBUbyBjaGVjayBpZiBhbnkgYnV0dG9uIGlzIGZ1bGx3aWR0aFxuICAgICAgbGV0IHdpZHRoID0gZ0J1dHRvbnMuZmlsdGVyKGdCdXR0b24gPT4gZ0J1dHRvbi5mdWxsV2lkdGggPT0gdHJ1ZSkubGVuZ3RoID4gMCA/ICcxMDAnIDogJ2F1dG8nO1xuICAgICAgbGV0IGJ1dHRvbldpZHRoOiBhbnkgPSAnYXV0byc7XG4gICAgICBpZiAod2lkdGggIT0gJ2F1dG8nKSB7XG4gICAgICAgIGJ1dHRvbldpZHRoID0gKCt3aWR0aCAvIGdCdXR0b25zLmxlbmd0aCk7XG4gICAgICB9XG5cbiAgICAgIGJ1dHRvbkxpc3RzLnB1c2goe1xuICAgICAgICBncm91cElkZW50aWZpZXI6IGdyb3VwSWRlbnRpZmllcixcbiAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICBidXR0b25XaWR0aDogYnV0dG9uV2lkdGgsXG4gICAgICAgIGdyb3VwQnV0dG9uczogZ0J1dHRvbnNcbiAgICAgIH0pO1xuICAgICAgYmdBZGRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJnQWRkZWQ7XG4gIH1cblxuICBnZXRIb3ZlckJ1dHRvbnMoKTogSG92ZXJCdXR0b25MaXN0IHtcbiAgICBsZXQgaG92ZXJCdXR0b25zOiBBcnJheTxIb3ZlckJ1dHRvbj4gPSBuZXcgQXJyYXk8SG92ZXJCdXR0b24+KCk7XG4gICAgbGV0IGdyb3VwSWRlbnRpZmllcjogc3RyaW5nO1xuICAgIGxldCBncm91cExhYmVsOiBzdHJpbmc7XG4gICAgbGV0IGdyb3VwSWNvbjogc3RyaW5nO1xuICAgIGxldCBiYWRnZTogQmFkZ2U7XG4gICAgbGV0IHdpZHRoOiBzdHJpbmcgPSAnYXV0byc7XG5cbiAgICBpZiAodGhpcy5fYnV0dG9ucykge1xuICAgICAgdGhpcy5fYnV0dG9ucy5maWx0ZXIoYnV0dG9uID0+IEJ1dHRvblV0aWxzLmluc3RhbmNlT2ZIb3ZlckJ1dHRvbihidXR0b24pKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgIGlmIChTdHJpbmdVdGlscy5pc0VtcHR5KGdyb3VwSWRlbnRpZmllcikpIHtcbiAgICAgICAgICBncm91cElkZW50aWZpZXIgPSAoPEhvdmVyQnV0dG9uPmJ1dHRvbikuZ3JvdXBJZGVudGlmaWVyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChTdHJpbmdVdGlscy5pc0VtcHR5KGdyb3VwTGFiZWwpKSB7XG4gICAgICAgICAgZ3JvdXBMYWJlbCA9ICg8SG92ZXJCdXR0b24+YnV0dG9uKS5ncm91cExhYmVsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChTdHJpbmdVdGlscy5pc0VtcHR5KGdyb3VwSWNvbikpIHtcbiAgICAgICAgICBncm91cEljb24gPSAoPEhvdmVyQnV0dG9uPmJ1dHRvbikuZ3JvdXBJY29uO1xuICAgICAgICB9XG4gICAgICAgIGlmIChDb2xsZWN0aW9uVXRpbHMuaXNFbXB0eShiYWRnZSkpIHtcbiAgICAgICAgICBiYWRnZSA9ICg8SG92ZXJCdXR0b24+YnV0dG9uKS5iYWRnZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKDxIb3ZlckJ1dHRvbj5idXR0b24pLmZ1bGxXaWR0aCkge1xuICAgICAgICAgIHdpZHRoID0gJzEwMCc7XG4gICAgICAgICAgYnV0dG9uLndpZHRoID0gJzEwMCc7XG4gICAgICAgIH1cblxuICAgICAgICBob3ZlckJ1dHRvbnMucHVzaCg8SG92ZXJCdXR0b24+YnV0dG9uKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB7IGdyb3VwSWRlbnRpZmllcjogZ3JvdXBJZGVudGlmaWVyLCBncm91cExhYmVsOiBncm91cExhYmVsLCBncm91cEljb246IGdyb3VwSWNvbiwgYmFkZ2U6IGJhZGdlLCB3aWR0aDogd2lkdGgsIGhvdmVyQnV0dG9uczogaG92ZXJCdXR0b25zIH07XG4gIH1cblxuICBnZXRCdXR0b25UeXBlKCk6IHZvaWQge1xuICAgIHRoaXMuYnV0dG9uTGlzdHNUeXBlID0gbmV3IEFycmF5PHN0cmluZz4oKTtcblxuICAgIGlmICh0aGlzLmJ1dHRvbkxpc3RzICYmIHRoaXMuYnV0dG9uTGlzdHMubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChsZXQgYnV0dG9uTGlzdCBvZiB0aGlzLmJ1dHRvbkxpc3RzKSB7XG4gICAgICAgIGxldCBidXR0b25UeXBlOiBzdHJpbmcgPSBcIlwiO1xuICAgICAgICBpZiAodGhpcy5pc0J1dHRvbkdyb3VwKGJ1dHRvbkxpc3QpKSB7XG4gICAgICAgICAgYnV0dG9uVHlwZSA9ICdCdXR0b25Hcm91cCc7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0NoaXBHcm91cChidXR0b25MaXN0KSkge1xuICAgICAgICAgIGJ1dHRvblR5cGUgPSAnQ2hpcEdyb3VwJztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzQnV0dG9uSG92ZXIoYnV0dG9uTGlzdCkpIHtcbiAgICAgICAgICBidXR0b25UeXBlID0gJ0J1dHRvbkhvdmVyJztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzQnV0dG9uQXJyYXkoYnV0dG9uTGlzdCkpIHtcbiAgICAgICAgICBidXR0b25UeXBlID0gJ0J1dHRvbkFycmF5JztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYnV0dG9uTGlzdHNUeXBlLnB1c2goYnV0dG9uVHlwZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaXNCdXR0b25Hcm91cChidXR0b25MaXN0OiBBcnJheTxCdXR0b24+IHwgQnV0dG9uR3JvdXBMaXN0IHwgSG92ZXJCdXR0b25MaXN0KTogYm9vbGVhbiB7XG4gICAgbGV0IGlzQnV0dG9uR3JvdXA6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGlmIChidXR0b25MaXN0ICYmICg8QnV0dG9uR3JvdXBMaXN0PmJ1dHRvbkxpc3QpLmdyb3VwQnV0dG9ucyAmJiAoPEJ1dHRvbkdyb3VwTGlzdD5idXR0b25MaXN0KS5ncm91cEJ1dHRvbnMubGVuZ3RoID4gMCAmJiAhU3RyaW5nVXRpbHMuaXNFbXB0eSgoPEJ1dHRvbkdyb3VwTGlzdD5idXR0b25MaXN0KS5ncm91cElkZW50aWZpZXIpKSB7XG4gICAgICBpc0J1dHRvbkdyb3VwID0gKDxCdXR0b25Hcm91cExpc3Q+YnV0dG9uTGlzdCkuZ3JvdXBCdXR0b25zLmZpbHRlcihidXR0b24gPT4gQnV0dG9uVXRpbHMuaW5zdGFuY2VPZkJ1dHRvbkdyb3VwKGJ1dHRvbikpLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzQnV0dG9uR3JvdXA7XG4gIH1cblxuICBpc0NoaXBHcm91cChidXR0b25MaXN0OiBBcnJheTxCdXR0b24+IHwgQnV0dG9uR3JvdXBMaXN0IHwgSG92ZXJCdXR0b25MaXN0KTogYm9vbGVhbiB7XG4gICAgbGV0IGlzQ2hpcEdyb3VwOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBpZiAoYnV0dG9uTGlzdCAmJiAoPEJ1dHRvbkdyb3VwTGlzdD5idXR0b25MaXN0KS5ncm91cEJ1dHRvbnMgJiYgKDxCdXR0b25Hcm91cExpc3Q+YnV0dG9uTGlzdCkuZ3JvdXBCdXR0b25zLmxlbmd0aCA+IDAgJiYgIVN0cmluZ1V0aWxzLmlzRW1wdHkoKDxCdXR0b25Hcm91cExpc3Q+YnV0dG9uTGlzdCkuZ3JvdXBJZGVudGlmaWVyKSkge1xuICAgICAgaXNDaGlwR3JvdXAgPSAoPEJ1dHRvbkdyb3VwTGlzdD5idXR0b25MaXN0KS5ncm91cEJ1dHRvbnMuZmlsdGVyKGJ1dHRvbiA9PiBCdXR0b25VdGlscy5pbnN0YW5jZU9mQ2hpcEJ1dHRvbihidXR0b24pKS5sZW5ndGggPiAwO1xuXG4gICAgICBpZiAoaXNDaGlwR3JvdXApIHtcbiAgICAgICAgKDxCdXR0b25Hcm91cExpc3Q+YnV0dG9uTGlzdCkuZ3JvdXBCdXR0b25zLmZvckVhY2goYnV0dG9uID0+IEJ1dHRvblV0aWxzLmluc3RhbmNlT2ZDaGlwQnV0dG9uKGJ1dHRvbikpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpc0NoaXBHcm91cDtcbiAgfVxuXG4gIGlzQnV0dG9uSG92ZXIoYnV0dG9uTGlzdDogQXJyYXk8QnV0dG9uPiB8IEJ1dHRvbkdyb3VwTGlzdCB8IEhvdmVyQnV0dG9uTGlzdCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBidXR0b25MaXN0ICYmICg8SG92ZXJCdXR0b25MaXN0PmJ1dHRvbkxpc3QpLmhvdmVyQnV0dG9ucyAmJiAoPEhvdmVyQnV0dG9uTGlzdD5idXR0b25MaXN0KS5ob3ZlckJ1dHRvbnMubGVuZ3RoID4gMFxuICB9XG5cbiAgaXNCdXR0b25BcnJheShidXR0b25MaXN0OiBBcnJheTxCdXR0b24+IHwgQnV0dG9uR3JvdXBMaXN0IHwgSG92ZXJCdXR0b25MaXN0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGJ1dHRvbkxpc3QgaW5zdGFuY2VvZiBBcnJheTtcbiAgfVxuXG4gIGNsaWNrKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLm9uQ2xpY2suZW1pdChldmVudCk7XG4gIH1cblxuICBpY29uQ2xpY2soZXZlbnQ6IGFueSkge1xuICAgIHRoaXMub25JY29uQ2xpY2suZW1pdChldmVudCk7XG4gIH1cbn1cbiJdfQ==