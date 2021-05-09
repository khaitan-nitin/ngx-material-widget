import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Field } from '../../model';
import * as ɵngcc0 from '@angular/core';
export declare class TooltipComponent implements OnInit {
    field: Field;
    control: FormControl;
    hasFieldNavigate: boolean;
    placement: string;
    constructor();
    ngOnInit(): void;
    fieldNavigate(): boolean;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<TooltipComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<TooltipComponent, "mx-tooltip", never, { "field": "field"; "control": "control"; }, {}, never, never>;
}

//# sourceMappingURL=tooltip.component.d.ts.map