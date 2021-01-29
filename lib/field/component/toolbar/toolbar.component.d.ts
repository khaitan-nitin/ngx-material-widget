import { OnInit } from '@angular/core';
import { ToolbarField, MenuItem } from '../../model/toolbar.model';
export declare class ToolbarComponent implements OnInit {
    field: ToolbarField;
    title: string;
    menuItems: MenuItem[];
    constructor();
    ngOnInit(): void;
    onMenuClick: (item: MenuItem) => void;
}
