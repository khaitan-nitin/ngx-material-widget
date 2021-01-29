import { Button, HoverButton, ButtonGroup } from '../../button/model';
import { ActionPage } from './action-page.model';
import { List, Record } from '../../list/model';
import { Form, FormTitleIconPosition } from '../../form/model';
import { Badge } from '../../button/model';
import { Wizard } from '../../wizard/model/wizard.model';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { ControlPermission } from '../../privilege/model';
import { DependentOnField } from '../../field/model';
export interface CrudDescription {
    text: string;
    bgColor?: string;
    textColor?: string;
    icon?: string;
}
export interface CrudHeaderIcon {
    font?: string;
    path?: string;
    position?: FormTitleIconPosition;
}
export interface CrudHeader {
    title: string;
    subtitle?: string;
    description?: CrudDescription;
    addModeTitle?: string;
    searchModeTitle?: string;
    editModeTitle?: string;
    viewModeTitle?: string;
    badge?: Badge;
    icon?: CrudHeaderIcon;
}
export declare const enum CrudWidgetType {
    FORM = "FORM",
    LIST = "LIST",
    WIZARD = "WIZARD"
}
export interface CrudWidget {
    widget: Form | List | Wizard;
    widgetType: CrudWidgetType;
    rowSpan: number;
    colSpan: number;
    displayOnAction: string;
    badge?: Badge;
    dependentOnFields?: Array<DependentOnField>;
    multiple?: {
        addMore: boolean;
        sectionTitle: string;
    };
    permission?: ControlPermission;
}
export interface CrudTab {
    identifier: string;
    label: string;
    description?: CrudDescription;
    statistic: string;
    displayOnAction: string;
    actions?: Array<Button>;
    widgets: Array<CrudWidget>;
    customPlugin?: CrudCustomPlugin;
    permission?: ControlPermission;
}
export interface CrudForm {
    displayType: CrudFormDisplayType;
    tabs: Array<CrudTab>;
}
export declare const enum CrudFormDisplayType {
    TAB = "TAB",
    ACCORDIAN = "ACCORDIAN"
}
export declare const enum CrudListDisplayType {
    TAB = "TAB",
    ACCORDIAN = "ACCORDIAN",
    LIST = "LIST"
}
export interface CrudList {
    displayType: CrudListDisplayType;
    style?: CrudStyle;
    lists: Array<List>;
    customPlugin?: CrudCustomPlugin;
    permission?: ControlPermission;
}
export interface CrudCustomPlugin {
    component?: any;
    placement?: CrudCustomPluginPlacement;
}
export declare const enum CrudCustomPluginPlacement {
    ABOVE = "ABOVE",
    BELOW = "BELOW"
}
export declare const enum SearchDisplayType {
    ABOVE_LIST = "ABOVE_LIST",
    RIGHT_MODAL = "RIGHT_MODAL",
    LEFT_MODAL = "LEFT_MODAL",
    BOTTOM_MODAL = "BOTTOM_MODAL"
}
export interface CrudSearch {
    form: Form;
    displayType: SearchDisplayType;
}
export interface CrudStyle {
    hideCard?: boolean;
}
export interface Crud {
    identifier: string;
    header: CrudHeader;
    actions?: Array<Button | HoverButton | ButtonGroup>;
    actionPages?: Array<ActionPage>;
    form?: CrudForm;
    quickLinks?: Array<Button | HoverButton | ButtonGroup>;
    search?: CrudSearch;
    list?: CrudList;
    modal?: CrudModal;
    template?: Template;
}
export interface CrudModal {
    width?: number;
}
export interface CrudFormData {
    badges?: Array<Badge>;
    record?: any;
    pageBackRoute: Array<any>;
    configPerTabs?: Map<string, CrudFormTabData>;
    originalData: any;
}
export interface CrudFormTabData {
    badges?: Array<Badge>;
    record?: any;
    pageBackRoute: Array<any>;
}
export interface CrudListData {
    badges?: Array<Badge>;
    records?: Array<Record>;
    pageBackRoute: Array<any>;
    searchData?: any;
    configPerTabs?: Map<string, CrudListTabData>;
    originalData: any;
    pageNo?: number;
    pageSize?: number;
}
export interface CrudListTabData {
    badges?: Array<Badge>;
    records?: Array<Record>;
    pageBackRoute: Array<any>;
}
