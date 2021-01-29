import { MatDialog } from '@angular/material/dialog';
import { Crud } from '../../crud/model';
import { Form } from '../../form/model';
import { List } from '../../list/model';
import { KeyMap } from '../../field/model';
export declare const enum ModalWidgetType {
    FORM = "FORM",
    LIST = "LIST",
    CRUD = "CRUD"
}
export interface Modal {
    dialog: MatDialog;
    type: ModalWidgetType;
    widgetConfig: Form | List | Crud;
    context: any;
    originalData: any;
    keyMap: Array<KeyMap>;
    reset: boolean;
    event: any;
    sourceIndex?: number;
}
