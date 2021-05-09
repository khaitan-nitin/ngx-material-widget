import { HttpClient } from '@angular/common/http';
import { ElementRef, OnInit } from '@angular/core';
import { FileField, UploadDeleteFunc, UploadFile, UploadFunc } from '../../model';
import * as ɵngcc0 from '@angular/core';
export declare class FileUploaderComponent implements OnInit {
    private _http;
    field: FileField;
    isFieldDisabled: boolean;
    fileInput: ElementRef;
    disabled: boolean;
    param: string;
    fileList: Array<UploadFile>;
    multiple: boolean;
    showLess: number;
    browseButtonText: string;
    uploadButtonText: string;
    fileType: string;
    fileIcon: string;
    hideDownloadButton: boolean;
    hideDeleteFileButton: boolean;
    hideUploadButton: boolean;
    hideFileIconButton: boolean;
    hideDeleteAllButton: boolean;
    hideActionStrip: boolean;
    isUploaded: boolean;
    isUploadingInProgress: boolean;
    isFileImageType: boolean;
    constructor(_http: HttpClient);
    ngOnInit(): void;
    private setFieldDisabled;
    private setHideDeleteAllButton;
    private setHideActionStrip;
    private setFileTypeAndIcon;
    onUploadClick: () => void;
    onDeleteAllClick: () => void;
    onDeleteFileClick: (delFile: UploadFile) => void;
    onShowAllItems: () => void;
    isFunctionDefined: (func: UploadFunc | UploadDeleteFunc) => boolean;
    private getImageFileType;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<FileUploaderComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<FileUploaderComponent, "mx-file-uploader", never, { "field": "field"; "isFieldDisabled": "isFieldDisabled"; "disabled": "disabled"; }, {}, never, never>;
}

//# sourceMappingURL=file-uploader.component.d.ts.map