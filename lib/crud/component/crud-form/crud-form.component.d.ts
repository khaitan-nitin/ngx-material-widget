import { OnInit, EventEmitter } from '@angular/core';
import { CrudHeader, ActionPage, CrudTab, CrudWidget, CrudFormData, CrudForm } from '../../model';
import { Badge, ButtonGroup, HoverButton, Button, ButtonColor, Action } from '../../../button/model';
import { Form, FormDiaplyMode } from '../../../form/model';
import { Wizard } from '../../../wizard/model';
import { List } from '../../../list/model';
import { FieldChange, KeyMap } from '../../../field/model';
import { Ability } from '@casl/ability';
import * as ɵngcc0 from '@angular/core';
export declare class CrudFormComponent implements OnInit {
    private ability;
    identifier: string;
    header: CrudHeader;
    actions: Array<Button | HoverButton | ButtonGroup>;
    actionPages: Array<ActionPage>;
    onAction: string;
    displayMode: FormDiaplyMode;
    form: CrudForm;
    reset: boolean;
    configData: CrudFormData;
    keyMap: Array<KeyMap>;
    onFormChange: EventEmitter<any>;
    onFieldChange: EventEmitter<any>;
    onButtonClick: EventEmitter<any>;
    onSortClick: EventEmitter<any>;
    onPageClick: EventEmitter<any>;
    title: string;
    backButton: Button;
    formsConfigToDisplay: Array<Form | List | Wizard>;
    rowsInTab: Array<Array<Array<CrudWidget>>>;
    badges: Array<Badge>;
    pageBackRoute: Array<string>;
    record: any;
    addWidget: Button;
    formTabLength: number;
    filteredTabs: Array<CrudTab>;
    constructor(ability: Ability);
    ngOnInit(): void;
    setFormTitle(): void;
    setFormHeader(header: CrudHeader, displayMode: FormDiaplyMode): void;
    setConfigAsPerTab(tabIdentifier?: string): void;
    getTabIdentifier(tabTitle: string): string;
    drawTabs(): void;
    drawTab(tabIndex: number, widgetIdentifiers: Array<string>): Array<Array<CrudWidget>>;
    displayWidget(widget: CrudWidget, supportingRecord: any, record: any): boolean;
    addWidgetButton(identifier: string, label: string, icon: string, color: ButtonColor): Button;
    fieldChange(fieldChange: FieldChange): void;
    formChange(form: any): void;
    buttonClick(action: Action): void;
    onTabChange(event: any): void;
    onAccordianChange(event: any): void;
    onSort(event: any): void;
    onPage(event: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<CrudFormComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<CrudFormComponent, "mx-crud-form", never, { "identifier": "identifier"; "header": "header"; "actions": "actions"; "actionPages": "actionPages"; "onAction": "onAction"; "displayMode": "displayMode"; "form": "form"; "reset": "reset"; "configData": "configData"; "keyMap": "keyMap"; }, { "onFormChange": "onFormChange"; "onFieldChange": "onFieldChange"; "onButtonClick": "onButtonClick"; "onSortClick": "onSortClick"; "onPageClick": "onPageClick"; }, never, never>;
}

//# sourceMappingURL=crud-form.component.d.ts.map