import { Button, ButtonGroup } from '../../button/model';
import { Column, ListCustomLayout } from './column.model';
import { Form, FormTitleIconPosition } from '../../form/model';
import { ControlPermission } from '../../privilege/model';
export declare const enum ListType {
    STATIC = "STATIC",
    DYNAMIC = "DYNAMIC"
}
export declare const enum PaginationType {
    ALL = "ALL",
    PAGE_WISE = "PAGE_WISE",
    NO_PAGE = "NO_PAGE",
    INFINIT_SCROLL = "INFINIT_SCROLL"
}
export declare const enum ListSortOrder {
    asc = "asc",
    desc = "desc"
}
export interface ListSelectable {
    label: string;
    icon: string;
}
export interface ListSort {
    column: string;
    order: ListSortOrder;
}
export interface ListDescription {
    text: string;
    bgColor?: string;
    textColor?: string;
    icon?: string;
}
export declare const enum ListShadeType {
    ALTERNATE = "ALTERNATE",
    HOVER = "HOVER"
}
export interface ListShade {
    type: ListShadeType;
}
export interface ListHeader {
    title: string;
    subtitle?: string;
    icon?: {
        font?: string;
        path?: string;
        position?: FormTitleIconPosition;
    };
    actions?: Array<Button>;
}
export interface List {
    identifier: string;
    header?: ListHeader;
    description?: ListDescription;
    stickyHeader?: boolean;
    listType: ListType;
    staticList?: StaticList;
    hasColumnSelection: boolean;
    uniqueKeys?: Array<string>;
    columns: Array<Column>;
    selectable?: ListSelectable;
    defaultSort?: ListSort;
    actionWidth?: number;
    actions: Array<Button | ButtonGroup>;
    rowAction?: string;
    disableRow?: Function;
    rowTextColor?: Function;
    rowBgColor?: Function;
    row?: TableRow;
    pagination: PaginationType;
    pageSize?: number;
    child?: ChildRecord;
    mobile?: ListMobileLayout;
    shade?: ListShade;
    hideFooter?: boolean;
    hideHeader?: boolean;
    hideHeaderRow?: boolean;
    style?: {
        fullWidth: boolean;
    };
    hideCard?: boolean;
    modal?: ListModal;
    permission?: ControlPermission;
}
export interface TableRow {
    click?: string;
    hover?: RowHover;
    template?: {
        css?: any;
        html?: any;
        layout?: ListCustomLayout;
    };
}
export interface RowHover {
    width: number;
    template?: {
        component?: any;
        layout?: ListCustomLayout;
    };
}
export interface ListMobileLayout extends ListCustomLayout {
    sorting?: Array<MobileSort>;
}
export interface MobileSort {
    key: string;
    label: string;
    direction: ListSortOrder;
}
export interface ListModal {
    width?: number;
}
export interface StaticList {
    hasOnPageFilter?: boolean;
}
export declare const enum ChildListType {
    LIST = "LIST",
    FORM = "FORM"
}
export interface ChildRecord {
    record: List | Form;
    type: ChildListType;
    recordIdentifier: string;
}
export interface InlineEditButton {
    identifier: string;
    label: string;
    icon: string;
}
export interface CellColor {
    textColor: string;
    bgColor: string;
}
