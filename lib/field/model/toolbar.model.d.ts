import { AppearanceField, Field } from '.';
export interface ToolbarField extends Field, AppearanceField {
    title: string;
    menuItems: MenuItem[];
}
export interface MenuItem {
    label: string;
    icon: string;
    showOnMobile: boolean;
    showOnTablet: boolean;
    showOnDesktop: boolean;
    onClick: Function;
}
