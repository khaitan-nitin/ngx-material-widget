import { OnChanges, ComponentRef, ViewContainerRef, Compiler } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class cfTemplateDirective implements OnChanges {
    private vcRef;
    private compiler;
    cfTemplate: string;
    cfTemplateContext: any;
    currentComponent: any;
    componentRef: ComponentRef<any>;
    constructor(vcRef: ViewContainerRef, compiler: Compiler);
    ngOnChanges(): void;
    updateProperties(): void;
    private createDynamicComponent;
    private createDynamicModule;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<cfTemplateDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<cfTemplateDirective, "[cfTemplate]", never, { "cfTemplate": "cfTemplate"; "cfTemplateContext": "cfTemplateContext"; "currentComponent": "currentComponent"; }, {}, never>;
}

//# sourceMappingURL=compile.directive.d.ts.map