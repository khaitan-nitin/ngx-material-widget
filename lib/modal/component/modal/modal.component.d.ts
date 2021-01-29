import { OnInit, EventEmitter } from '@angular/core';
import { Form } from '../../../form/model';
import { List } from '../../../list/model';
import { KeyMap, FieldChange } from '../../../field/model';
import { MatDialogRef } from '@angular/material/dialog';
import { Ability } from '@casl/ability';
export interface DialogData {
    type: string;
    widgetConfig: Form | List;
    sourceIndex: number;
    context: any;
    originalData: any;
    keyMap: Array<KeyMap>;
    reset: boolean;
    currentInstance: any;
}
export declare class ModalComponent implements OnInit {
    dialogRef: MatDialogRef<ModalComponent>;
    data: DialogData;
    private ability;
    onFormChange: EventEmitter<any>;
    onFieldChange: EventEmitter<any>;
    onButtonClick: EventEmitter<any>;
    constructor(dialogRef: MatDialogRef<ModalComponent>, data: DialogData, ability: Ability);
    ngOnInit(): void;
    click(event: any): void;
    fieldChange(fieldChange: FieldChange): void;
    formChange(form: any): void;
    buttonClick(event: any): void;
}
