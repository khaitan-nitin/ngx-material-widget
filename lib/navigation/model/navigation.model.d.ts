import { ControlPermission } from '../../privilege/model';
export interface NavigationPannel {
    templateKey: string;
    canCollapse: boolean;
    defaultCollapse: boolean;
    header: NavigationPannelHeader;
    navigations: Array<Navigation>;
    footer: NavigationPannelFooter;
}
export interface NavigationPannelHeader {
    logo: boolean;
    profile: boolean;
    notification: boolean;
    template?: any;
}
export interface Logo {
    name: string;
    image: string;
}
export interface NavigationPannelFooter {
    logout: boolean;
    template?: any;
}
export interface Navigation {
    name: string;
    nameAsImage?: string;
    imageAfter?: string;
    subText?: NavigationSubText;
    icon?: string;
    image?: string;
    route?: string;
    permission?: ControlPermission;
    children?: Array<Navigation>;
    divider?: boolean;
}
export interface NavigationSubText {
    text: string;
    displayType: SubTextType;
}
export declare const enum SubTextType {
    PLAIN_TEXT = "PLAIN_TEXT",
    BADGE = "BADGE"
}
export interface NavigationFlatNode {
    expandable: boolean;
    name: string;
    level: number;
}
