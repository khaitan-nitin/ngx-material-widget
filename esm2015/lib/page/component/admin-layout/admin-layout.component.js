import { Component } from '@angular/core';
import { AbilityUtils } from '../../../utility/ability.utility';
import { Ability } from '@casl/ability';
export class AdminLayoutComponent {
    constructor(ability) {
        this.ability = ability;
        AbilityUtils.setAbility(this.ability);
    }
    ngOnInit() {
    }
}
AdminLayoutComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-admin-layout',
                template: "<p>admin-layout works!</p>\n",
                styles: [""]
            },] }
];
AdminLayoutComponent.ctorParameters = () => [
    { type: Ability }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4tbGF5b3V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvbml0aW5raGFpdGFuL05pdGluL3N0dWR5L2FuZ3VsYXIvbWF0ZXJpYWwvYWRtaW4tYnVpbGRlci1wbHVnaW4vcHJvamVjdHMvbmd4LW1hdGVyaWFsLXdpZGdldC9zcmMvIiwic291cmNlcyI6WyJsaWIvcGFnZS9jb21wb25lbnQvYWRtaW4tbGF5b3V0L2FkbWluLWxheW91dC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDaEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU94QyxNQUFNLE9BQU8sb0JBQW9CO0lBRS9CLFlBQW9CLE9BQWdCO1FBQWhCLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDbEMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELFFBQVE7SUFDUixDQUFDOzs7WUFaRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsd0NBQTRDOzthQUU3Qzs7O1lBTlEsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYmlsaXR5VXRpbHMgfSBmcm9tICcuLi8uLi8uLi91dGlsaXR5L2FiaWxpdHkudXRpbGl0eSc7XG5pbXBvcnQgeyBBYmlsaXR5IH0gZnJvbSAnQGNhc2wvYWJpbGl0eSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1hZG1pbi1sYXlvdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vYWRtaW4tbGF5b3V0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYWRtaW4tbGF5b3V0LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQWRtaW5MYXlvdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYWJpbGl0eTogQWJpbGl0eSkgeyBcbiAgICBBYmlsaXR5VXRpbHMuc2V0QWJpbGl0eSh0aGlzLmFiaWxpdHkpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gIH1cblxufVxuIl19