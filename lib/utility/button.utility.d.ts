import { Button, ButtonGroup, HoverButton, Action, ObjectTree } from '../button/model';
import { FormDiaplyMode } from '../form/model';
export declare class ButtonUtils {
    static instanceOfButton(object: any): object is Button;
    static instanceOfChipButton(object: any): object is ButtonGroup;
    static instanceOfButtonGroup(object: any): object is ButtonGroup;
    static instanceOfHoverButton(object: any): object is HoverButton;
    static instanceOfAnyButtonType(object: any): boolean;
    static hasWidth(buttons: Array<Button>): boolean;
    static setEqualWidth(buttons: Array<Button>): void;
    static getAction(sourceIdentifier: string, sourceIndex: number, widgetArrayIndex: number, identifier: string, parentHierarchy: ObjectTree, event: any, originalData: any, context: any, actionDialog: any): Action;
    static isDisable(displayMode: FormDiaplyMode): boolean;
}
