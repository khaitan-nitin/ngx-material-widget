import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldDiaplyType, Field, KeyMap } from '../../model';
import { FormDiaplyMode } from '../../../form/model';
import { Ability } from '@casl/ability';
export declare class FieldLayoutComponent implements OnInit {
    private ability;
    sourceIdentifier: string;
    sourceIndex: number;
    form: FormGroup;
    field: Field;
    displayMode: FormDiaplyMode;
    value: any;
    dependencies: any;
    row: any;
    keyMap: Array<KeyMap>;
    constructor(ability: Ability);
    ngOnInit(): void;
    initField(): void;
    isRequired(): boolean;
    isValidDisplayType(fieldDiaplyType: FieldDiaplyType): boolean;
}
