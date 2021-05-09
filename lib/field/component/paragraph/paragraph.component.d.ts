import { EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FieldChange } from '../../model';
import { FieldComponent } from '../field/field.component';
import { ParagraphField, TokenType } from '../../model/paragraph.model';
import { Ability } from '@casl/ability';
import * as ɵngcc0 from '@angular/core';
export declare class ParagraphComponent extends FieldComponent implements OnInit {
    router: Router;
    ability: Ability;
    tokens: Array<TokenType>;
    paragraphField: ParagraphField;
    onButtonClick: EventEmitter<any>;
    constructor(router: Router, ability: Ability);
    ngOnInit(): void;
    fieldChange(fieldChange: FieldChange): void;
    isButtonDisable(): boolean;
    getFormValue(): any;
    buttonClick(event: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ParagraphComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<ParagraphComponent, "mx-paragraph", never, {}, { "onButtonClick": "onButtonClick"; }, never, never>;
}

//# sourceMappingURL=paragraph.component.d.ts.map