import { DisplayMode } from "./field.model";
export interface DependentOnField {
    key: string;
    condition: string | Array<string | number> | number | boolean;
    displayMode: DisplayMode;
}
