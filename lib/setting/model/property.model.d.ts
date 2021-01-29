export interface PropertyCategory {
    key: string;
    name: string;
    description: string;
    image: string;
    active: boolean;
    subCategories: Array<PropertySubCategory>;
}
export interface PropertySubCategory {
    key: string;
    name: string;
    description: string;
    image: string;
    active: boolean;
    properties: Array<Property>;
}
export interface Property {
    key: string;
    value: any;
    description: string;
    type: string;
    isEditable: boolean;
    active: boolean;
}
export interface PropertyEnvironment {
    key: string;
    label: string;
    active: boolean;
}
