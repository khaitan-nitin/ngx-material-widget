import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MultiImage, MultiImageField } from '../../model/multi-image-field.model';
import * as ɵngcc0 from '@angular/core';
export declare class MultiImageComponent implements OnInit {
    field: MultiImageField;
    control: FormControl;
    disabled: boolean;
    radius: number;
    count: number;
    showCount: boolean;
    showAll: boolean;
    images: MultiImage[] | string[];
    lastItemLabel: string;
    showLastItem: boolean;
    hideTooltip: boolean;
    constructor();
    ngOnInit(): void;
    onShowAllClick: () => void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MultiImageComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MultiImageComponent, "mx-multi-image", never, { "field": "field"; "control": "control"; "disabled": "disabled"; }, {}, never, never>;
}

//# sourceMappingURL=multi-image.component.d.ts.map