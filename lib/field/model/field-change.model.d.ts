export interface FieldChange {
    sourceIdentifier: string;
    sourceIndex: number;
    widgetArrayIndex: number;
    fieldIndex?: number;
    fieldKey: string;
    value: any;
    event: any;
}
