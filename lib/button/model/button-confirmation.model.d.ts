import { ButtonColor, ButtonType, ButtonSize } from './button.model';
export interface ConfirmationPopupButton {
    identifier: string;
    type: ButtonType;
    color: ButtonColor;
    size: ButtonSize;
    label?: string;
    icon?: string;
}
export interface ConfirmationPopup {
    identifier: string;
    title: string;
    message: string;
    width?: string;
    buttons: Array<ConfirmationPopupButton>;
}
