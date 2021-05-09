import { OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ListComponent } from '../list.component';
import { Pagination } from '../../model';
import { Ability } from '@casl/ability';
import * as ɵngcc0 from '@angular/core';
export declare class StaticListComponent extends ListComponent implements OnInit {
    ability: Ability;
    breakpointObserver: BreakpointObserver;
    constructor(ability: Ability, breakpointObserver: BreakpointObserver);
    ngOnInit(): void;
    isList(): boolean;
    onSort(event: any): void;
    onPage(pageInfo: Pagination): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<StaticListComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<StaticListComponent, "mx-static-list", never, {}, {}, never, never>;
}

//# sourceMappingURL=static-list.component.d.ts.map