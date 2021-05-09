import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmationPopupButton, ConfirmationPopup, ObjectTree } from '../../model';
import { FormGroup } from '@angular/forms';
import { Ability } from '@casl/ability';
import * as ɵngcc0 from '@angular/core';
export interface DialogData {
    form: FormGroup;
    sourceIdentifier: string;
    sourceIndex: number;
    widgetArrayIndex: number;
    context: any;
    originalData: any;
    buttonRoute: Array<string>;
    parentHierarchy: ObjectTree;
    confirmationConfig: ConfirmationPopup;
}
export declare class ButtonDeleteConfirmationComponent implements OnInit {
    dialogRef: MatDialogRef<ButtonDeleteConfirmationComponent>;
    data: DialogData;
    private ability;
    constructor(dialogRef: MatDialogRef<ButtonDeleteConfirmationComponent>, data: DialogData, ability: Ability);
    title: string;
    message: string;
    ngOnInit(): void;
    displayOnlyIcon(button: ConfirmationPopupButton): boolean;
    displayIcon(button: ConfirmationPopupButton): boolean;
    resolve(text: string): string;
    click(event: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ButtonDeleteConfirmationComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<ButtonDeleteConfirmationComponent, "mx-button-delete-confirmation", never, {}, {}, never, never>;
}

//# sourceMappingURL=button-delete-confirmation.component.d.ts.map