import { OnInit } from '@angular/core';
import { ToolbarField, MenuItem } from '../../model/toolbar.model';
import * as ɵngcc0 from '@angular/core';
export declare class ToolbarComponent implements OnInit {
    field: ToolbarField;
    title: string;
    menuItems: MenuItem[];
    constructor();
    ngOnInit(): void;
    onMenuClick: (item: MenuItem) => void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<ToolbarComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<ToolbarComponent, "mx-toolbar", never, { "field": "field"; }, {}, never, never>;
}

//# sourceMappingURL=toolbar.component.d.ts.map