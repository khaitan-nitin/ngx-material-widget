import { OnInit, EventEmitter } from '@angular/core';
import { Button, ButtonColor, Badge, BadgeColor, ButtonGroup, HoverButton } from '../../../button/model';
import { CrudDescription, CrudHeaderIcon, CrudStyle } from '../../model';
import { FormDiaplyMode, FormTitleIconPosition } from '../../../form/model';
import { Ability } from '@casl/ability';
import * as ɵngcc0 from '@angular/core';
export declare class CrudHeaderComponent implements OnInit {
    private ability;
    identifier: string;
    title: string;
    subtitle: string;
    description: CrudDescription;
    badges: Array<Badge>;
    icon: CrudHeaderIcon;
    style: CrudStyle;
    _pageBackRoute: Array<string>;
    get pageBackRoute(): Array<string>;
    set pageBackRoute(_pageBackRoute: Array<string>);
    formDisplayMode: FormDiaplyMode;
    actions: Array<Button | HoverButton | ButtonGroup>;
    showHeader: boolean;
    originalData: any;
    context: any;
    onButtonClick: EventEmitter<any>;
    iconPosition: FormTitleIconPosition;
    badgeButtons: Array<ButtonGroup>;
    constructor(ability: Ability);
    ngOnInit(): void;
    setIconPosition(): void;
    transformBadgeButtons(): void;
    badgeColorToButtonColor(color: BadgeColor): ButtonColor;
    addBackButton(): void;
    buttonClick(event: any): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<CrudHeaderComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<CrudHeaderComponent, "mx-crud-header", never, { "pageBackRoute": "pageBackRoute"; "_pageBackRoute": "_pageBackRoute"; "actions": "actions"; "identifier": "identifier"; "title": "title"; "subtitle": "subtitle"; "description": "description"; "badges": "badges"; "icon": "icon"; "style": "style"; "formDisplayMode": "formDisplayMode"; "showHeader": "showHeader"; "originalData": "originalData"; "context": "context"; }, { "onButtonClick": "onButtonClick"; }, never, never>;
}

//# sourceMappingURL=crud-header.component.d.ts.map