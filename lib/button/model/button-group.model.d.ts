import { ButtonGroup, HoverButton } from './button.model';
import { Badge } from './badge.model';
export declare class ButtonGroupList {
    groupIdentifier: string;
    width: any;
    buttonWidth: any;
    groupButtons: Array<ButtonGroup>;
}
export declare class HoverButtonList {
    groupIdentifier: string;
    groupLabel?: string;
    groupIcon?: string;
    badge?: Badge;
    width: string;
    hoverButtons: Array<HoverButton>;
}
