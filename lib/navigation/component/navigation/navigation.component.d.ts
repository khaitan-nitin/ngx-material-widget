import { EventEmitter, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Navigation, NavigationPannel } from '../../model';
export declare class NavigationComponent implements OnInit {
    sidenav: MatSidenav;
    isExpanded: boolean;
    navigationPanel: NavigationPannel;
    navigation: Array<Navigation>;
    logout: EventEmitter<any>;
    showSubmenu: Array<boolean>;
    isShowing: boolean;
    showSubSubMenu: Array<any>;
    constructor();
    mouseenter(): void;
    mouseleave(): void;
    logoutEvent(): void;
    ngOnInit(): void;
}
