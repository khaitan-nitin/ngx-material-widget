import { AppearanceField, Field } from './field.model';
export interface MultiImageField extends Field, AppearanceField {
    radius?: number;
    count?: number;
    showCount?: boolean;
    showAll: boolean;
    images: Array<MultiImage> | Array<string>;
}
export interface MultiImage {
    url: string;
    name: string;
}
