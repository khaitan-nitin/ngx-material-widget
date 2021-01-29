import { Directive, Output, EventEmitter } from '@angular/core';
export class NgInit {
    constructor() {
        this.ngInit = new EventEmitter();
    }
    ngOnInit() {
        this.ngInit.emit();
    }
}
NgInit.decorators = [
    { type: Directive, args: [{
                selector: '[ngInit]'
            },] }
];
NgInit.propDecorators = {
    ngInit: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdJbml0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvbml0aW5raGFpdGFuL05pdGluL3N0dWR5L2FuZ3VsYXIvbWF0ZXJpYWwvYWRtaW4tYnVpbGRlci1wbHVnaW4vcHJvamVjdHMvbmd4LW1hdGVyaWFsLXdpZGdldC9zcmMvIiwic291cmNlcyI6WyJsaWIvbGlzdC9kaXJlY3RpdmVzL25nSW5pdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBUyxNQUFNLEVBQUMsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTXRFLE1BQU0sT0FBTyxNQUFNO0lBSG5CO1FBS0ksV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBS25ELENBQUM7SUFIRyxRQUFRO1FBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7WUFUSixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFVBQVU7YUFDckI7OztxQkFFRSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT3V0cHV0LEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ0luaXRdJ1xufSkgXG5leHBvcnQgY2xhc3MgTmdJbml0IHtcbiAgQE91dHB1dCgpXG4gICAgbmdJbml0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLm5nSW5pdC5lbWl0KCk7XG4gICAgfVxufVxuIl19