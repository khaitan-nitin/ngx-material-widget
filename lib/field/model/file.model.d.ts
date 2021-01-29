export interface Files {
    sourceIdentifier: string;
    index: number;
    fieldKey: string;
    files: UploadFile[];
}
export interface UploadFile {
    name: string;
    size?: number;
    url?: string;
    data?: any;
}
