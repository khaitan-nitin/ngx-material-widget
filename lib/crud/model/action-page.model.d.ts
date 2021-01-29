import { FormDiaplyMode } from "../../form/model";
export interface ActionPage {
    buttonIdentifier: string;
    formDisplayMode: FormDiaplyMode;
    associatedFormIdentifiers: Array<string>;
}
