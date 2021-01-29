export declare const enum PermissionAction {
    CREATE = "create",
    READ = "read",
    UPDATE = "update",
    DELETE = "delete"
}
export interface Permission {
    action: Array<string>;
    subject?: Array<string>;
    fields?: Array<string>;
    conditions?: any;
    inverted?: boolean;
    reason?: string;
}
export interface ControlPermission {
    subject: string;
    action: string;
}
