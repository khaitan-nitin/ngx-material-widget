import { BreakpointObserver } from "@angular/cdk/layout";
import { ChangeDetectorRef, EventEmitter, OnInit } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { Navigation, NavigationPannel } from "../../model";
import * as ɵngcc0 from '@angular/core';
export declare class NavigationComponent implements OnInit {
    breakpointObserver: BreakpointObserver;
    private ref;
    sidenav: MatSidenav;
    isExpanded: boolean;
    navigationPanel: NavigationPannel;
    navigation: Array<Navigation>;
    logout: EventEmitter<any>;
    showSubmenu: Array<boolean>;
    isShowing: boolean;
    showSubSubMenu: Array<any>;
    constructor(breakpointObserver: BreakpointObserver, ref: ChangeDetectorRef);
    ngAfterViewChecked(): void;
    mouseenter(): void;
    mouseleave(): void;
    logoutEvent(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NavigationComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<NavigationComponent, "admin-navigation", never, { "isExpanded": "isExpanded"; "navigation": "navigation"; "navigationPanel": "navigationPanel"; }, { "logout": "logout"; }, never, ["*"]>;
}

//# sourceMappingURL=navigation.component.d.ts.map