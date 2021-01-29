import { Directive, Input, ViewContainerRef, Compiler, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBuilderModule } from '../../ngx-material-widget.module';
export class cfTemplateDirective {
    constructor(vcRef, compiler) {
        this.vcRef = vcRef;
        this.compiler = compiler;
    }
    ngOnChanges() {
        if (!this.cfTemplate) {
            if (this.componentRef) {
                this.updateProperties();
                return;
            }
            throw Error('You must provide template.');
        }
        this.vcRef.clear();
        this.componentRef = null;
        const component = this.createDynamicComponent(this.cfTemplate);
        const module = this.createDynamicModule(component);
        this.compiler.compileModuleAndAllComponentsAsync(module)
            .then((moduleWithFactories) => {
            let componentFactory = moduleWithFactories.componentFactories.find(x => x.componentType === component);
            this.componentRef = this.vcRef.createComponent(componentFactory);
            this.updateProperties();
        })
            .catch(error => {
            console.log(error);
        });
    }
    updateProperties() {
        for (var prop in this.cfTemplateContext) {
            this.componentRef.instance[prop] = this.cfTemplateContext[prop];
        }
    }
    createDynamicComponent(template) {
        class CustomDynamicComponent {
        }
        CustomDynamicComponent.decorators = [
            { type: Component, args: [{
                        selector: 'cf-dynamic-component',
                        template: template
                    },] }
        ];
        return CustomDynamicComponent;
    }
    createDynamicModule(component) {
        class CfDynamicModule {
        }
        CfDynamicModule.decorators = [
            { type: NgModule, args: [{
                        // Every element you might need must be known for this module
                        imports: [CommonModule, AdminBuilderModule],
                        declarations: [component]
                    },] }
        ];
        return CfDynamicModule;
    }
}
cfTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[cfTemplate]'
            },] }
];
cfTemplateDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: Compiler }
];
cfTemplateDirective.propDecorators = {
    cfTemplate: [{ type: Input }],
    cfTemplateContext: [{ type: Input }],
    currentComponent: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL25pdGlua2hhaXRhbi9OaXRpbi9zdHVkeS9hbmd1bGFyL21hdGVyaWFsL2FkbWluLWJ1aWxkZXItcGx1Z2luL3Byb2plY3RzL25neC1tYXRlcmlhbC13aWRnZXQvc3JjLyIsInNvdXJjZXMiOlsibGliL2xpc3QvZGlyZWN0aXZlcy9jb21waWxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFHTCxnQkFBZ0IsRUFDaEIsUUFBUSxFQUVSLFNBQVMsRUFDVCxRQUFRLEVBRVQsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBQzlDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBS3RFLE1BQU0sT0FBTyxtQkFBbUI7SUFPOUIsWUFBb0IsS0FBdUIsRUFBVSxRQUFrQjtRQUFuRCxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7SUFBSSxDQUFDO0lBRTVFLFdBQVc7UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUN4QixPQUFPO2FBQ1I7WUFDRCxNQUFNLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1NBQzNDO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUV6QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVuRCxJQUFJLENBQUMsUUFBUSxDQUFDLGtDQUFrQyxDQUFDLE1BQU0sQ0FBQzthQUNyRCxJQUFJLENBQUMsQ0FBQyxtQkFBc0QsRUFBRSxFQUFFO1lBQy9ELElBQUksZ0JBQWdCLEdBQUcsbUJBQW1CLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsS0FBSyxTQUFTLENBQUMsQ0FBQztZQUV2RyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxLQUFLLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakU7SUFDSCxDQUFDO0lBRU8sc0JBQXNCLENBQUMsUUFBZ0I7UUFDN0MsTUFJTSxzQkFBc0I7OztvQkFKM0IsU0FBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxzQkFBc0I7d0JBQ2hDLFFBQVEsRUFBRSxRQUFRO3FCQUNuQjs7UUFFRCxPQUFPLHNCQUFzQixDQUFDO0lBQ2hDLENBQUM7SUFFTyxtQkFBbUIsQ0FBQyxTQUFvQjtRQUM5QyxNQUtNLGVBQWU7OztvQkFMcEIsUUFBUSxTQUFDO3dCQUNSLDZEQUE2RDt3QkFDN0QsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGtCQUFrQixDQUFDO3dCQUMzQyxZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUM7cUJBQzFCOztRQUVELE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7OztZQTlERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7YUFDekI7OztZQVpDLGdCQUFnQjtZQUNoQixRQUFROzs7eUJBYVAsS0FBSztnQ0FDTCxLQUFLOytCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIENvbXBvbmVudFJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgQ29tcGlsZXIsXG4gIE1vZHVsZVdpdGhDb21wb25lbnRGYWN0b3JpZXMsXG4gIENvbXBvbmVudCxcbiAgTmdNb2R1bGUsXG4gIFR5cGVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nXG5pbXBvcnQgeyBBZG1pbkJ1aWxkZXJNb2R1bGUgfSBmcm9tICcuLi8uLi9uZ3gtbWF0ZXJpYWwtd2lkZ2V0Lm1vZHVsZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjZlRlbXBsYXRlXSdcbn0pXG5leHBvcnQgY2xhc3MgY2ZUZW1wbGF0ZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGNmVGVtcGxhdGU6IHN0cmluZztcbiAgQElucHV0KCkgY2ZUZW1wbGF0ZUNvbnRleHQ6IGFueTtcbiAgQElucHV0KCkgY3VycmVudENvbXBvbmVudDogYW55O1xuXG4gIGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZiwgcHJpdmF0ZSBjb21waWxlcjogQ29tcGlsZXIpIHsgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICghdGhpcy5jZlRlbXBsYXRlKSB7XG4gICAgICBpZiAodGhpcy5jb21wb25lbnRSZWYpIHtcbiAgICAgICAgdGhpcy51cGRhdGVQcm9wZXJ0aWVzKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRocm93IEVycm9yKCdZb3UgbXVzdCBwcm92aWRlIHRlbXBsYXRlLicpO1xuICAgIH1cblxuICAgIHRoaXMudmNSZWYuY2xlYXIoKTtcbiAgICB0aGlzLmNvbXBvbmVudFJlZiA9IG51bGw7XG5cbiAgICBjb25zdCBjb21wb25lbnQgPSB0aGlzLmNyZWF0ZUR5bmFtaWNDb21wb25lbnQodGhpcy5jZlRlbXBsYXRlKTtcbiAgICBjb25zdCBtb2R1bGUgPSB0aGlzLmNyZWF0ZUR5bmFtaWNNb2R1bGUoY29tcG9uZW50KTtcblxuICAgIHRoaXMuY29tcGlsZXIuY29tcGlsZU1vZHVsZUFuZEFsbENvbXBvbmVudHNBc3luYyhtb2R1bGUpXG4gICAgICAudGhlbigobW9kdWxlV2l0aEZhY3RvcmllczogTW9kdWxlV2l0aENvbXBvbmVudEZhY3Rvcmllczxhbnk+KSA9PiB7XG4gICAgICAgIGxldCBjb21wb25lbnRGYWN0b3J5ID0gbW9kdWxlV2l0aEZhY3Rvcmllcy5jb21wb25lbnRGYWN0b3JpZXMuZmluZCh4ID0+IHguY29tcG9uZW50VHlwZSA9PT0gY29tcG9uZW50KTtcblxuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZiA9IHRoaXMudmNSZWYuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudEZhY3RvcnkpO1xuICAgICAgICB0aGlzLnVwZGF0ZVByb3BlcnRpZXMoKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVByb3BlcnRpZXMoKSB7XG4gICAgZm9yICh2YXIgcHJvcCBpbiB0aGlzLmNmVGVtcGxhdGVDb250ZXh0KSB7XG4gICAgICB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZVtwcm9wXSA9IHRoaXMuY2ZUZW1wbGF0ZUNvbnRleHRbcHJvcF07XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVEeW5hbWljQ29tcG9uZW50KHRlbXBsYXRlOiBzdHJpbmcpIHtcbiAgICBAQ29tcG9uZW50KHtcbiAgICAgIHNlbGVjdG9yOiAnY2YtZHluYW1pYy1jb21wb25lbnQnLFxuICAgICAgdGVtcGxhdGU6IHRlbXBsYXRlXG4gICAgfSlcbiAgICBjbGFzcyBDdXN0b21EeW5hbWljQ29tcG9uZW50IHsgfVxuICAgIHJldHVybiBDdXN0b21EeW5hbWljQ29tcG9uZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVEeW5hbWljTW9kdWxlKGNvbXBvbmVudDogVHlwZTxhbnk+KSB7XG4gICAgQE5nTW9kdWxlKHtcbiAgICAgIC8vIEV2ZXJ5IGVsZW1lbnQgeW91IG1pZ2h0IG5lZWQgbXVzdCBiZSBrbm93biBmb3IgdGhpcyBtb2R1bGVcbiAgICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEFkbWluQnVpbGRlck1vZHVsZV0sXG4gICAgICBkZWNsYXJhdGlvbnM6IFtjb21wb25lbnRdXG4gICAgfSlcbiAgICBjbGFzcyBDZkR5bmFtaWNNb2R1bGUgeyB9XG4gICAgcmV0dXJuIENmRHluYW1pY01vZHVsZTtcbiAgfVxufSJdfQ==