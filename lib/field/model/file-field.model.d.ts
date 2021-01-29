import { Observable } from 'rxjs';
import { UploadFile } from '.';
import { Field } from './field.model';
export declare const enum AcceptEncoding {
    IMAGE = "jpeg/",
    JSON = "application/json",
    CSV = "application/csv"
}
export interface FileField extends Field {
    fileType?: UploadFileType;
    subFileType?: ImageFileType[];
    multiple: boolean;
    imageWidth?: number;
    showLess?: number;
    hideUploadButton?: boolean;
    uploadButtonText: string;
    hideDownloadButton?: boolean;
    hideDeleteFileButton?: boolean;
    hideDeleteAllButton?: boolean;
    hideFileIconButton?: boolean;
    showCameraButton?: boolean;
    onUploadClick: UploadFunc;
    onDeleteFileClick?: UploadDeleteFunc;
    onDeleteAllClick?: UploadDeleteFunc;
}
export declare const enum UploadFileType {
    IMAGE = "IMAGE",
    VIDEO = "VIDEO",
    PDF = "PDF",
    EXCEL = "EXCEL",
    WORD = "WORD",
    ALL = "ALL"
}
export declare const enum ImageFileType {
    BMP = "BMP",
    JPEG = "JPEG",
    JPG = "JPG",
    GIF = "GIF",
    PNG = "PNG"
}
export interface UploadFunc {
    (files: Array<UploadFile>): Observable<Array<UploadFile>>;
}
export interface UploadDeleteFunc {
    (files: Array<UploadFile> | UploadFile): Observable<boolean>;
}
