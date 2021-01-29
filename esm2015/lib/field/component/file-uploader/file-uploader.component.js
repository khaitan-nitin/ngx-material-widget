import { HttpClient } from '@angular/common/http';
import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
export class FileUploaderComponent {
    constructor(_http) {
        this._http = _http;
        this.field = null;
        this.isFieldDisabled = false;
        this.param = 'file';
        this.fileList = [];
        this.multiple = false;
        this.fileType = "*.*";
        this.fileIcon = "";
        this.hideDownloadButton = false;
        this.hideDeleteFileButton = false;
        this.hideUploadButton = false;
        this.hideFileIconButton = false;
        this.hideDeleteAllButton = false;
        this.hideActionStrip = false;
        this.isUploaded = false;
        this.isUploadingInProgress = false;
        this.isFileImageType = false;
        this.setFileTypeAndIcon = (type) => {
            switch (type) {
                case "PDF" /* PDF */:
                    this.fileType = ".pdf";
                    this.fileIcon = "picture_as_pdf";
                    break;
                case "WORD" /* WORD */:
                    this.fileType = ".doc, .docx";
                    this.fileIcon = "attach_file";
                    break;
                case "IMAGE" /* IMAGE */:
                    this.fileType = this.getImageFileType();
                    this.fileIcon = "image";
                    this.isFileImageType = true;
                    break;
                case "VIDEO" /* VIDEO */:
                    this.fileType = "video/*";
                    this.fileIcon = "video_call";
                    break;
                case "EXCEL" /* EXCEL */:
                    this.fileType = ".xlsx, .xls, .csv";
                    this.fileIcon = "attach_file";
                    break;
                default:
                    this.fileType = ".*";
                    this.fileIcon = "attach_file";
                    break;
            }
        };
        this.onUploadClick = () => {
            const fileInput = this.fileInput.nativeElement;
            fileInput.onchange = () => {
                this.fileList = [];
                this.isUploadingInProgress = true;
                console.log(fileInput.files);
                for (let index = 0; index < fileInput.files.length; index++) {
                    const file = fileInput.files[index];
                    this.fileList.push({
                        data: file,
                        size: file.size,
                        name: file.name
                    });
                }
                this.field.onUploadClick(this.fileList).subscribe(result => {
                    this.isUploadingInProgress = false;
                    this.fileList = result;
                });
            };
            fileInput.click();
        };
        this.onDeleteAllClick = () => {
            if (this.isFunctionDefined(this.field.onDeleteAllClick)) {
                this.isUploadingInProgress = true;
                this.field.onDeleteAllClick(this.fileList).subscribe(result => {
                    this.isUploadingInProgress = false;
                    if (result) {
                        this.fileList = [];
                    }
                });
            }
        };
        this.onDeleteFileClick = (delFile) => {
            if (this.isFunctionDefined(this.field.onDeleteFileClick)) {
                this.isUploadingInProgress = true;
                this.field.onDeleteFileClick(delFile).subscribe(result => {
                    this.isUploadingInProgress = false;
                    if (result) {
                        this.fileList = this.fileList.filter(file => file !== delFile);
                    }
                });
            }
        };
        this.onShowAllItems = () => {
            this.showLess = this.fileList.length;
        };
        this.isFunctionDefined = (func) => {
            return typeof func == 'function';
        };
        this.getImageFileType = () => {
            if (this.field.subFileType) {
                return this.field.subFileType.map(x => 'image/' + x.toLowerCase()).join(',');
            }
            else {
                return "image/*";
            }
        };
    }
    ngOnInit() {
        var defaultUploadBtnText = this.field.multiple ? "Upload Files" : "Upload File";
        this.multiple = this.field.multiple;
        this.uploadButtonText = this.field.uploadButtonText || defaultUploadBtnText;
        this.setFileTypeAndIcon(this.field.fileType);
        this.fileList = this.field.value || [];
        if (this.field.displayMode == "LABEL" /* LABEL */) {
            this.hideDeleteFileButton = true;
            this.hideUploadButton = true;
            this.hideFileIconButton = true;
        }
        else {
            this.hideDeleteFileButton = this.field.hideDeleteFileButton !== undefined ? this.field.hideDeleteFileButton : false;
            this.hideUploadButton = this.field.hideUploadButton !== undefined ? this.field.hideUploadButton : false;
            this.hideFileIconButton = this.field.hideFileIconButton !== undefined ? this.field.hideFileIconButton : false;
        }
        this.hideDownloadButton = this.field.hideDownloadButton !== undefined ? this.field.hideDownloadButton : false;
        this.showLess = this.field.showLess || this.fileList.length;
        this.setFieldDisabled();
        this.setHideDeleteAllButton();
        this.setHideActionStrip();
    }
    setFieldDisabled() {
        if (this.isFieldDisabled) {
            this.hideDeleteAllButton = true;
            this.hideDeleteFileButton = true;
            this.hideUploadButton = true;
        }
    }
    setHideDeleteAllButton() {
        if (this.field.hideDeleteAllButton === undefined) {
            this.hideDeleteAllButton = false;
        }
        if (this.fileList.length <= 1 || this.field.displayMode == "LABEL" /* LABEL */) {
            this.hideDeleteAllButton = true;
        }
    }
    setHideActionStrip() {
        if (this.hideDeleteAllButton && this.hideUploadButton && this.showLess <= this.fileList.length) {
            this.hideActionStrip = true;
        }
    }
}
FileUploaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'cf-file-uploader',
                template: "<div class=\"cf-field-nm\">\n  <mat-card>\n    <mat-card-content *ngIf=\"fileList.length > 0\"  class=\"card-content\" \n      [ngClass]=\"{'cf-disable': disabled}\" >\n      <ul class=\"file-list\">\n        <ng-container *ngFor=\"let file of fileList; let index=index\">\n          <li class=\"file-item\" *ngIf=\"index < showLess\">\n            <span>\n                <img *ngIf=\"isFileImageType\" matListAvatar [src]=\"file.url\" alt=\"\" class=\"image\" />\n                <span>{{file.name}}</span>\n            </span>\n            <span>\n              <a mat-icon-button [href]=\"file.url\" download target=\"_blank\" [disabled]=\"disabled\" *ngIf=\"!hideDownloadButton\">\n                <mat-icon class=\"mat-24\">file_download</mat-icon>\n              </a>\n              <button mat-icon-button (click)=\"onDeleteFileClick(file)\" *ngIf=\"!hideDeleteFileButton\"\n                [disabled]=\"disabled || isUploadingInProgress\">\n                <mat-icon class=\"mat-24\" [color]=\"isUploadingInProgress? '' : 'warn'\">delete</mat-icon>\n              </button>\n            </span>\n          </li>\n        </ng-container>\n      </ul>\n    </mat-card-content>\n    <mat-card-actions \n      class=\"file-actions\"\n      [ngClass]=\"{'empty-list':fileList.length == 0}\"\n      *ngIf=\"!hideActionStrip\">\n      <div>\n        <div class=\"mat-mini-fab file-icon\" \n        [ngClass]=\"{'cf-disable': disabled}\"\n        *ngIf=\"!hideFileIconButton\">\n          <mat-icon>{{fileIcon}}</mat-icon>\n        </div>\n        <button mat-stroked-button color=\"primary\" (click)=\"onUploadClick()\"\n          [disabled]=\"disabled || isUploadingInProgress\"\n          *ngIf=\"!hideUploadButton\">\n          <mat-icon>file_upload</mat-icon>\n          {{uploadButtonText}}\n        </button>\n        <button  mat-button (click)=\"onShowAllItems()\"\n          [ngClass]=\"{'cf-disable': disabled}\"\n          [disabled]=\"disabled || isUploadingInProgress\"\n          *ngIf=\"showLess<fileList.length\">\n            Show All\n        </button>\n\n        <mat-spinner *ngIf=\"isUploadingInProgress\" [diameter]=\"18\" class=\"spinner\">\n        </mat-spinner>\n      </div>\n\n      <button mat-icon-button (click)=\"onDeleteAllClick()\"\n        [disabled]=\"disabled || isUploadingInProgress\"\n        [ngClass]=\"{'cf-disable': disabled}\"\n        *ngIf=\"!hideDeleteAllButton && fileList.length > 1\">\n        <mat-icon [color]=\"isUploadingInProgress? '' : 'warn'\">delete</mat-icon>\n      </button>\n    </mat-card-actions>\n  </mat-card>\n  <input type=\"file\" #fileInput\n    id=\"fileUpload\"\n    name=\"fileUpload\"\n    [multiple]=\"multiple\"\n    [accept]=\"fileType\"\n    style=\"display:none;\"\n  />\n</div>",
                encapsulation: ViewEncapsulation.None,
                styles: ["li,ul{list-style:none;margin:0;padding:0}#file-label{display:inline-flex;font-size:12px;line-height:18px;vertical-align:middle}#file-label mat-icon{font-size:18px;text-align:center}#file-label a{cursor:pointer}.file-icon{box-shadow:none}.file-icon .material-icons,.file-list .image{vertical-align:middle}.file-list .image{border:1px solid #4d4d4d;height:30px!important;margin-right:9px;width:30px!important}.file-list .file-item{align-items:center;border-bottom:1px solid #efeded;box-sizing:border-box;display:flex;flex-direction:row;height:40px;justify-content:space-between;padding:0;position:relative;width:100%}.file-list .file-item>span{padding-left:10px}.file-list .file-item:last-child{border-bottom:none;margin-bottom:5px}.file-list .mat-button-base:hover:not([disabled]){background:#efeded}.card-content{margin-bottom:0}.file-actions{border-top:1px solid #efeded;display:flex;justify-content:space-between;margin:0 -16px -8px;padding-top:11px}.file-actions .mat-mini-fab{box-shadow:none!important}.file-actions .spinner{float:right;margin-top:10px}.file-actions .mat-button-base,.file-actions>button,.file-actions>div{margin:0 16px}.file-actions .mat-button-base:hover:not([disabled]){background:#efeded}.file-actions.empty-list{border-top:none;justify-content:space-around;padding:0}.mat-card{margin-bottom:.25em}"]
            },] }
];
FileUploaderComponent.ctorParameters = () => [
    { type: HttpClient }
];
FileUploaderComponent.propDecorators = {
    field: [{ type: Input }],
    isFieldDisabled: [{ type: Input }],
    fileInput: [{ type: ViewChild, args: ["fileInput", { static: false },] }],
    disabled: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS11cGxvYWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL25pdGlua2hhaXRhbi9OaXRpbi9zdHVkeS9hbmd1bGFyL21hdGVyaWFsL2FkbWluLWJ1aWxkZXItcGx1Z2luL3Byb2plY3RzL25neC1tYXRlcmlhbC13aWRnZXQvc3JjLyIsInNvdXJjZXMiOlsibGliL2ZpZWxkL2NvbXBvbmVudC9maWxlLXVwbG9hZGVyL2ZpbGUtdXBsb2FkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFjLEtBQUssRUFBVSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFTbkcsTUFBTSxPQUFPLHFCQUFxQjtJQTZCOUIsWUFBb0IsS0FBaUI7UUFBakIsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQTVCNUIsVUFBSyxHQUFjLElBQUksQ0FBQztRQUN4QixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUcxQyxVQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ2YsYUFBUSxHQUFzQixFQUFFLENBQUM7UUFFakMsYUFBUSxHQUFZLEtBQUssQ0FBQztRQU8xQixhQUFRLEdBQVcsS0FBSyxDQUFDO1FBQ3pCLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFFdEIsdUJBQWtCLEdBQVksS0FBSyxDQUFDO1FBQ3BDLHlCQUFvQixHQUFZLEtBQUssQ0FBQztRQUN0QyxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMsdUJBQWtCLEdBQVksS0FBSyxDQUFDO1FBQ3BDLHdCQUFtQixHQUFZLEtBQUssQ0FBQztRQUNyQyxvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUVqQyxlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLDBCQUFxQixHQUFZLEtBQUssQ0FBQztRQUN2QyxvQkFBZSxHQUFZLEtBQUssQ0FBQztRQW1EekIsdUJBQWtCLEdBQUcs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QyxNQUFNLEVBQUU7WUFDNUYsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7U0FDL0I7SUFDTCxDQUFDOzs7WUFsRkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLG90RkFBNkM7Z0JBRTdDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN4Qzs7O1lBVFEsVUFBVTs7O29CQVdkLEtBQUs7OEJBQ0wsS0FBSzt3QkFDTCxTQUFTLFNBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTt1QkFDeEMsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERpc3BsYXlNb2RlLCBGaWxlRmllbGQsIFVwbG9hZERlbGV0ZUZ1bmMsIFVwbG9hZEZpbGUsIFVwbG9hZEZpbGVUeXBlLCBVcGxvYWRGdW5jIH0gZnJvbSAnLi4vLi4vbW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2NmLWZpbGUtdXBsb2FkZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9maWxlLXVwbG9hZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9maWxlLXVwbG9hZGVyLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBGaWxlVXBsb2FkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBJbnB1dCgpIGZpZWxkOiBGaWxlRmllbGQgPSBudWxsO1xuICAgIEBJbnB1dCgpIGlzRmllbGREaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBWaWV3Q2hpbGQoXCJmaWxlSW5wdXRcIiwgeyBzdGF0aWM6IGZhbHNlIH0pIGZpbGVJbnB1dDogRWxlbWVudFJlZjtcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgICBwYXJhbSA9ICdmaWxlJztcbiAgICBmaWxlTGlzdDogQXJyYXk8VXBsb2FkRmlsZT4gPSBbXTtcblxuICAgIG11bHRpcGxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBzaG93TGVzczogbnVtYmVyO1xuXG4gICAgYnJvd3NlQnV0dG9uVGV4dDogc3RyaW5nO1xuICAgIHVwbG9hZEJ1dHRvblRleHQ6IHN0cmluZztcblxuICAgIGZpbGVUeXBlOiBzdHJpbmcgPSBcIiouKlwiO1xuICAgIGZpbGVJY29uOiBzdHJpbmcgPSBcIlwiOyBcblxuICAgIGhpZGVEb3dubG9hZEJ1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGhpZGVEZWxldGVGaWxlQnV0dG9uOiBib29sZWFuID0gZmFsc2U7XG4gICAgaGlkZVVwbG9hZEJ1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGhpZGVGaWxlSWNvbkJ1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGhpZGVEZWxldGVBbGxCdXR0b246IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBoaWRlQWN0aW9uU3RyaXA6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGlzVXBsb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc1VwbG9hZGluZ0luUHJvZ3Jlc3M6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpc0ZpbGVJbWFnZVR5cGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnQpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHZhciBkZWZhdWx0VXBsb2FkQnRuVGV4dCA9IHRoaXMuZmllbGQubXVsdGlwbGUgPyBcIlVwbG9hZCBGaWxlc1wiIDogXCJVcGxvYWQgRmlsZVwiO1xuICAgICAgICB0aGlzLm11bHRpcGxlID0gdGhpcy5maWVsZC5tdWx0aXBsZTtcbiAgICAgICAgdGhpcy51cGxvYWRCdXR0b25UZXh0ID0gdGhpcy5maWVsZC51cGxvYWRCdXR0b25UZXh0IHx8IGRlZmF1bHRVcGxvYWRCdG5UZXh0O1xuICAgICAgICB0aGlzLnNldEZpbGVUeXBlQW5kSWNvbih0aGlzLmZpZWxkLmZpbGVUeXBlKTtcbiAgICAgICAgdGhpcy5maWxlTGlzdCA9ICg8QXJyYXk8VXBsb2FkRmlsZT4+dGhpcy5maWVsZC52YWx1ZSkgfHwgW107XG5cbiAgICAgICAgaWYgKHRoaXMuZmllbGQuZGlzcGxheU1vZGUgPT0gRGlzcGxheU1vZGUuTEFCRUwpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZURlbGV0ZUZpbGVCdXR0b24gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5oaWRlVXBsb2FkQnV0dG9uID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaGlkZUZpbGVJY29uQnV0dG9uID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVEZWxldGVGaWxlQnV0dG9uID0gdGhpcy5maWVsZC5oaWRlRGVsZXRlRmlsZUJ1dHRvbiAhPT0gdW5kZWZpbmVkID8gdGhpcy5maWVsZC5oaWRlRGVsZXRlRmlsZUJ1dHRvbiA6IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5oaWRlVXBsb2FkQnV0dG9uID0gdGhpcy5maWVsZC5oaWRlVXBsb2FkQnV0dG9uICE9PSB1bmRlZmluZWQgPyB0aGlzLmZpZWxkLmhpZGVVcGxvYWRCdXR0b24gOiBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaGlkZUZpbGVJY29uQnV0dG9uID0gdGhpcy5maWVsZC5oaWRlRmlsZUljb25CdXR0b24gIT09IHVuZGVmaW5lZCA/IHRoaXMuZmllbGQuaGlkZUZpbGVJY29uQnV0dG9uIDogZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhpZGVEb3dubG9hZEJ1dHRvbiA9IHRoaXMuZmllbGQuaGlkZURvd25sb2FkQnV0dG9uICE9PSB1bmRlZmluZWQgPyB0aGlzLmZpZWxkLmhpZGVEb3dubG9hZEJ1dHRvbiA6IGZhbHNlO1xuICAgICAgICB0aGlzLnNob3dMZXNzID0gdGhpcy5maWVsZC5zaG93TGVzcyB8fCB0aGlzLmZpbGVMaXN0Lmxlbmd0aDtcbiAgICAgICAgdGhpcy5zZXRGaWVsZERpc2FibGVkKCk7XG4gICAgICAgIHRoaXMuc2V0SGlkZURlbGV0ZUFsbEJ1dHRvbigpO1xuICAgICAgICB0aGlzLnNldEhpZGVBY3Rpb25TdHJpcCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0RmllbGREaXNhYmxlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNGaWVsZERpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGVEZWxldGVBbGxCdXR0b24gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5oaWRlRGVsZXRlRmlsZUJ1dHRvbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmhpZGVVcGxvYWRCdXR0b24gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRIaWRlRGVsZXRlQWxsQnV0dG9uKCkge1xuICAgICAgICBpZiAodGhpcy5maWVsZC5oaWRlRGVsZXRlQWxsQnV0dG9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZURlbGV0ZUFsbEJ1dHRvbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmZpbGVMaXN0Lmxlbmd0aCA8PSAxIHx8IHRoaXMuZmllbGQuZGlzcGxheU1vZGUgPT0gRGlzcGxheU1vZGUuTEFCRUwpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZURlbGV0ZUFsbEJ1dHRvbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHNldEhpZGVBY3Rpb25TdHJpcCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaGlkZURlbGV0ZUFsbEJ1dHRvbiAmJiB0aGlzLmhpZGVVcGxvYWRCdXR0b24gJiYgdGhpcy5zaG93TGVzcyA8PSB0aGlzLmZpbGVMaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5oaWRlQWN0aW9uU3RyaXAgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRGaWxlVHlwZUFuZEljb24gPSAodHlwZTogVXBsb2FkRmlsZVR5cGUpOiB2b2lkID0+IHtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFVwbG9hZEZpbGVUeXBlLlBERjpcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGVUeXBlID0gXCIucGRmXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5maWxlSWNvbiA9IFwicGljdHVyZV9hc19wZGZcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVXBsb2FkRmlsZVR5cGUuV09SRDpcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGVUeXBlID0gXCIuZG9jLCAuZG9jeFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsZUljb24gPSBcImF0dGFjaF9maWxlXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFVwbG9hZEZpbGVUeXBlLklNQUdFOlxuICAgICAgICAgICAgICAgIHRoaXMuZmlsZVR5cGUgPSB0aGlzLmdldEltYWdlRmlsZVR5cGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGVJY29uID0gXCJpbWFnZVwiO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNGaWxlSW1hZ2VUeXBlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVXBsb2FkRmlsZVR5cGUuVklERU86XG4gICAgICAgICAgICAgICAgdGhpcy5maWxlVHlwZSA9IFwidmlkZW8vKlwiO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsZUljb24gPSBcInZpZGVvX2NhbGxcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVXBsb2FkRmlsZVR5cGUuRVhDRUw6XG4gICAgICAgICAgICAgICAgdGhpcy5maWxlVHlwZSA9IFwiLnhsc3gsIC54bHMsIC5jc3ZcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGVJY29uID0gXCJhdHRhY2hfZmlsZVwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGVUeXBlID0gXCIuKlwiO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsZUljb24gPSBcImF0dGFjaF9maWxlXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblVwbG9hZENsaWNrID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICBjb25zdCBmaWxlSW5wdXQgPSB0aGlzLmZpbGVJbnB1dC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBmaWxlSW5wdXQub25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZpbGVMaXN0ID0gW107XG4gICAgICAgICAgICB0aGlzLmlzVXBsb2FkaW5nSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhmaWxlSW5wdXQuZmlsZXMpO1xuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGZpbGVJbnB1dC5maWxlcy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gZmlsZUlucHV0LmZpbGVzW2luZGV4XTtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGVMaXN0LnB1c2goPFVwbG9hZEZpbGU+e1xuICAgICAgICAgICAgICAgICAgICBkYXRhOiBmaWxlLFxuICAgICAgICAgICAgICAgICAgICBzaXplOiBmaWxlLnNpemUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGZpbGUubmFtZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5maWVsZC5vblVwbG9hZENsaWNrKHRoaXMuZmlsZUxpc3QpLnN1YnNjcmliZShyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNVcGxvYWRpbmdJblByb2dyZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5maWxlTGlzdCA9IHJlc3VsdDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBmaWxlSW5wdXQuY2xpY2soKTtcbiAgICB9XG5cbiAgICBvbkRlbGV0ZUFsbENsaWNrID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICBpZiAodGhpcy5pc0Z1bmN0aW9uRGVmaW5lZCh0aGlzLmZpZWxkLm9uRGVsZXRlQWxsQ2xpY2spKSB7XG4gICAgICAgICAgICB0aGlzLmlzVXBsb2FkaW5nSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmZpZWxkLm9uRGVsZXRlQWxsQ2xpY2sodGhpcy5maWxlTGlzdCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1VwbG9hZGluZ0luUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZUxpc3QgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRGVsZXRlRmlsZUNsaWNrID0gKGRlbEZpbGU6IFVwbG9hZEZpbGUpOiB2b2lkID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaXNGdW5jdGlvbkRlZmluZWQodGhpcy5maWVsZC5vbkRlbGV0ZUZpbGVDbGljaykpIHtcbiAgICAgICAgICAgIHRoaXMuaXNVcGxvYWRpbmdJblByb2dyZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZmllbGQub25EZWxldGVGaWxlQ2xpY2soZGVsRmlsZSkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1VwbG9hZGluZ0luUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZUxpc3QgPSB0aGlzLmZpbGVMaXN0LmZpbHRlcihmaWxlID0+IGZpbGUgIT09IGRlbEZpbGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25TaG93QWxsSXRlbXMgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2hvd0xlc3MgPSB0aGlzLmZpbGVMaXN0Lmxlbmd0aFxuICAgIH1cblxuICAgIGlzRnVuY3Rpb25EZWZpbmVkID0gKGZ1bmM6IFVwbG9hZEZ1bmMgfCBVcGxvYWREZWxldGVGdW5jKSA9PiB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgZnVuYyA9PSAnZnVuY3Rpb24nO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SW1hZ2VGaWxlVHlwZSA9ICgpOiBzdHJpbmcgPT4ge1xuICAgICAgICBpZiAodGhpcy5maWVsZC5zdWJGaWxlVHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmllbGQuc3ViRmlsZVR5cGUubWFwKHggPT4gJ2ltYWdlLycgKyB4LnRvTG93ZXJDYXNlKCkpLmpvaW4oJywnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBcImltYWdlLypcIjtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=