export interface MasterDataCategory {
    key: string;
    name: string;
    description: string;
    image: string;
    active: boolean;
    subCategories: Array<MasterDataSubCategory>;
}
export interface MasterDataSubCategory {
    key: string;
    name: string;
    description: string;
    image: string;
    active: boolean;
    properties: Array<MasterData>;
}
export interface MasterData {
    type: string;
    label: string;
    description: string;
    items: Array<MasterDataItem>;
    access: string;
    isEditable: boolean;
    active: boolean;
}
export interface MasterDataItem {
    key: string;
    label: string;
    active: boolean;
}
