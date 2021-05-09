import { PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as ɵngcc0 from '@angular/core';
export declare class SafeHtmlPipe implements PipeTransform {
    protected sanitizer: DomSanitizer;
    constructor(sanitizer: DomSanitizer);
    transform(value: any, args?: any): SafeHtml;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<SafeHtmlPipe, never>;
    static ɵpipe: ɵngcc0.ɵɵPipeDefWithMeta<SafeHtmlPipe, "safeHtml">;
}

//# sourceMappingURL=safeHtml.pipe.d.ts.map