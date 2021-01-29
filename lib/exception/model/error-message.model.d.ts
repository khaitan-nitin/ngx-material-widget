export declare enum MessageDisplayType {
    SUCCESS = "SUCCESS",
    FAILURE = "FAILURE"
}
export interface Message {
    fieldKey?: string;
    code: string;
    text: string;
    stackTrace?: string;
    status: MessageDisplayType;
}
