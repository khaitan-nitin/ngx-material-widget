import { Directive, Input, ViewContainerRef, Compiler, Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { MaterialWidgetModule } from '../../ngx-material-widget.module';
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
                        selector: 'mx-dynamic-component',
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
                        //      imports: [CommonModule, MaterialWidgetModule],
                        imports: [CommonModule],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL25pdGlua2hhaXRhbi9OaXRpbi9zdHVkeS9hbmd1bGFyL21hdGVyaWFsL2FkbWluLWJ1aWxkZXItcGx1Z2luL3Byb2plY3RzL25neC1tYXRlcmlhbC13aWRnZXQvc3JjLyIsInNvdXJjZXMiOlsibGliL2xpc3QvZGlyZWN0aXZlcy9jb21waWxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFHTCxnQkFBZ0IsRUFDaEIsUUFBUSxFQUVSLFNBQVMsRUFDVCxRQUFRLEVBRVQsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBQzlDLDBFQUEwRTtBQUsxRSxNQUFNLE9BQU8sbUJBQW1CO0lBTzlCLFlBQW9CLEtBQXVCLEVBQVUsUUFBa0I7UUFBbkQsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO0lBQUksQ0FBQztJQUU1RSxXQUFXO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDcEIsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNyQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDeEIsT0FBTzthQUNSO1lBQ0QsTUFBTSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztTQUMzQztRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFFekIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQ0FBa0MsQ0FBQyxNQUFNLENBQUM7YUFDckQsSUFBSSxDQUFDLENBQUMsbUJBQXNELEVBQUUsRUFBRTtZQUMvRCxJQUFJLGdCQUFnQixHQUFHLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLEtBQUssU0FBUyxDQUFDLENBQUM7WUFFdkcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDdkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pFO0lBQ0gsQ0FBQztJQUVPLHNCQUFzQixDQUFDLFFBQWdCO1FBQzdDLE1BSU0sc0JBQXNCOzs7b0JBSjNCLFNBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUsc0JBQXNCO3dCQUNoQyxRQUFRLEVBQUUsUUFBUTtxQkFDbkI7O1FBRUQsT0FBTyxzQkFBc0IsQ0FBQztJQUNoQyxDQUFDO0lBRU8sbUJBQW1CLENBQUMsU0FBb0I7UUFDOUMsTUFNTSxlQUFlOzs7b0JBTnBCLFFBQVEsU0FBQzt3QkFDUiw2REFBNkQ7d0JBQ25FLHNEQUFzRDt3QkFDaEQsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO3dCQUN2QixZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUM7cUJBQzFCOztRQUVELE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7OztZQS9ERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7YUFDekI7OztZQVpDLGdCQUFnQjtZQUNoQixRQUFROzs7eUJBYVAsS0FBSztnQ0FDTCxLQUFLOytCQUNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIENvbXBvbmVudFJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgQ29tcGlsZXIsXG4gIE1vZHVsZVdpdGhDb21wb25lbnRGYWN0b3JpZXMsXG4gIENvbXBvbmVudCxcbiAgTmdNb2R1bGUsXG4gIFR5cGVcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nXG4vL2ltcG9ydCB7IE1hdGVyaWFsV2lkZ2V0TW9kdWxlIH0gZnJvbSAnLi4vLi4vbmd4LW1hdGVyaWFsLXdpZGdldC5tb2R1bGUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2ZUZW1wbGF0ZV0nXG59KVxuZXhwb3J0IGNsYXNzIGNmVGVtcGxhdGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBjZlRlbXBsYXRlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNmVGVtcGxhdGVDb250ZXh0OiBhbnk7XG4gIEBJbnB1dCgpIGN1cnJlbnRDb21wb25lbnQ6IGFueTtcblxuICBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgY29tcGlsZXI6IENvbXBpbGVyKSB7IH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICBpZiAoIXRoaXMuY2ZUZW1wbGF0ZSkge1xuICAgICAgaWYgKHRoaXMuY29tcG9uZW50UmVmKSB7XG4gICAgICAgIHRoaXMudXBkYXRlUHJvcGVydGllcygpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aHJvdyBFcnJvcignWW91IG11c3QgcHJvdmlkZSB0ZW1wbGF0ZS4nKTtcbiAgICB9XG5cbiAgICB0aGlzLnZjUmVmLmNsZWFyKCk7XG4gICAgdGhpcy5jb21wb25lbnRSZWYgPSBudWxsO1xuXG4gICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5jcmVhdGVEeW5hbWljQ29tcG9uZW50KHRoaXMuY2ZUZW1wbGF0ZSk7XG4gICAgY29uc3QgbW9kdWxlID0gdGhpcy5jcmVhdGVEeW5hbWljTW9kdWxlKGNvbXBvbmVudCk7XG5cbiAgICB0aGlzLmNvbXBpbGVyLmNvbXBpbGVNb2R1bGVBbmRBbGxDb21wb25lbnRzQXN5bmMobW9kdWxlKVxuICAgICAgLnRoZW4oKG1vZHVsZVdpdGhGYWN0b3JpZXM6IE1vZHVsZVdpdGhDb21wb25lbnRGYWN0b3JpZXM8YW55PikgPT4ge1xuICAgICAgICBsZXQgY29tcG9uZW50RmFjdG9yeSA9IG1vZHVsZVdpdGhGYWN0b3JpZXMuY29tcG9uZW50RmFjdG9yaWVzLmZpbmQoeCA9PiB4LmNvbXBvbmVudFR5cGUgPT09IGNvbXBvbmVudCk7XG5cbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYgPSB0aGlzLnZjUmVmLmNyZWF0ZUNvbXBvbmVudChjb21wb25lbnRGYWN0b3J5KTtcbiAgICAgICAgdGhpcy51cGRhdGVQcm9wZXJ0aWVzKCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuICB1cGRhdGVQcm9wZXJ0aWVzKCkge1xuICAgIGZvciAodmFyIHByb3AgaW4gdGhpcy5jZlRlbXBsYXRlQ29udGV4dCkge1xuICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2VbcHJvcF0gPSB0aGlzLmNmVGVtcGxhdGVDb250ZXh0W3Byb3BdO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRHluYW1pY0NvbXBvbmVudCh0ZW1wbGF0ZTogc3RyaW5nKSB7XG4gICAgQENvbXBvbmVudCh7XG4gICAgICBzZWxlY3RvcjogJ214LWR5bmFtaWMtY29tcG9uZW50JyxcbiAgICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxuICAgIH0pXG4gICAgY2xhc3MgQ3VzdG9tRHluYW1pY0NvbXBvbmVudCB7IH1cbiAgICByZXR1cm4gQ3VzdG9tRHluYW1pY0NvbXBvbmVudDtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRHluYW1pY01vZHVsZShjb21wb25lbnQ6IFR5cGU8YW55Pikge1xuICAgIEBOZ01vZHVsZSh7XG4gICAgICAvLyBFdmVyeSBlbGVtZW50IHlvdSBtaWdodCBuZWVkIG11c3QgYmUga25vd24gZm9yIHRoaXMgbW9kdWxlXG4vLyAgICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIE1hdGVyaWFsV2lkZ2V0TW9kdWxlXSxcbiAgICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgICAgZGVjbGFyYXRpb25zOiBbY29tcG9uZW50XVxuICAgIH0pXG4gICAgY2xhc3MgQ2ZEeW5hbWljTW9kdWxlIHsgfVxuICAgIHJldHVybiBDZkR5bmFtaWNNb2R1bGU7XG4gIH1cbn0iXX0=