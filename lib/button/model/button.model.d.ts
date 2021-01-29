import { FormDiaplyMode } from '../../form/model';
import { ConfirmationPopup } from './button-confirmation.model';
import { Badge } from './badge.model';
import { ControlPermission } from '../../privilege/model';
import { DependentOnField } from '../../field/model';
export declare const enum ButtonColor {
    DEFAULT = "",
    PRIMARY = "primary",
    ASCENT = "accent",
    WARN = "warn"
}
export declare const enum ButtonType {
    FLAT = "FLAT",
    GHOST = "GHOST",
    RAISED = "RAISED",
    STROKED = "STROKED",
    FAB = "FAB",
    CHIP = "CHIP",
    GROUP = "GROUP",
    DROPDOWN = "DROPDOWN"
}
export declare const enum ReservedButton {
    CLEAR_FILTER_FIELD = "clearFilterField",
    SEARCH = "search",
    CANCEL = "cancel",
    RESET = "reset",
    BACK = "back",
    ADD_FIELD = "add_field",
    REMOVE_FIELD = "remove_field",
    ROW_EXPAND = "row_expand",
    ROW_COLLAPSE = "row_collapse"
}
export declare const enum ButtonSize {
    MICRO = "micro",
    TINY = "tiny",
    SMALL = "small",
    DEFAULT = "default"
}
export declare const enum IconPosition {
    LEFT = "LEFT",
    RIGHT = "RIGHT",
    TOP = "TOP",
    BOTTOM = "BOTTOM"
}
export interface BaseButton {
    type: string;
    identifier: string;
    label: string;
    color: ButtonColor;
    size: ButtonSize;
    icon?: string;
    iconPosition?: IconPosition;
    onlyIcon?: boolean;
    badge?: Badge;
    alwaysEnable?: boolean;
    width?: string;
    showOnMobile?: boolean;
    showOnTablet?: boolean;
    showOnDesktop?: boolean;
    dependentOnFields?: Array<DependentOnField>;
    displayInFormModes?: Array<FormDiaplyMode>;
    confirmationConfiguration?: ConfirmationPopup;
    permission?: ControlPermission;
}
export interface Button extends BaseButton {
    routerLink?: Array<string>;
}
export interface ButtonGroup extends BaseButton {
    groupIdentifier: string;
    fullWidth?: boolean;
}
export interface HoverButton extends BaseButton {
    groupIdentifier: string;
    groupLabel?: string;
    groupIcon?: string;
    badge?: Badge;
    fullWidth?: boolean;
}
