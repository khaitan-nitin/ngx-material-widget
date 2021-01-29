import { ModalComponent } from '../component/modal/modal.component';
export class ModalUitls {
    //    static dialogRef: MatDialogRef<any, any>;
    static openDialog(modal, component) {
        let dialogRef;
        dialogRef = modal.dialog.open(component ? component : ModalComponent, {
            width: modal.widgetConfig.modal && modal.widgetConfig.modal.width ? modal.widgetConfig.modal.width + 'px' : '250px',
            data: {
                type: modal.type,
                widgetConfig: modal.widgetConfig,
                sourceIndex: modal.sourceIndex,
                context: modal.context,
                originalData: modal.originalData,
                keyMap: modal.keyMap,
                reset: modal.reset
            }
        });
        if (dialogRef.componentInstance.onButtonClick) {
            dialogRef.componentInstance.onButtonClick.subscribe(event => {
                console.log(event);
                if (eval("this.buttonClick")) {
                    eval("this.buttonClick(event)");
                }
            });
        }
        if (dialogRef.componentInstance.onFieldChange) {
            dialogRef.componentInstance.onFieldChange.subscribe((event) => {
                console.log(event);
                if (eval("this.fieldChange")) {
                    eval("this.fieldChange(event)");
                }
            }, this);
        }
        if (dialogRef.componentInstance.onFormChange) {
            dialogRef.componentInstance.onFormChange.subscribe(event => {
                console.log(event);
                if (eval("this.formChange")) {
                    eval("this.formChange(event)");
                }
            });
        }
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            //          this.invokeAction(result, event);
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwudXRpbC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvbml0aW5raGFpdGFuL05pdGluL3N0dWR5L2FuZ3VsYXIvbWF0ZXJpYWwvYWRtaW4tYnVpbGRlci1wbHVnaW4vcHJvamVjdHMvbmd4LW1hdGVyaWFsLXdpZGdldC9zcmMvIiwic291cmNlcyI6WyJsaWIvbW9kYWwvdXRpbGl0eS9tb2RhbC51dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUlwRSxNQUFNLE9BQU8sVUFBVTtJQUNyQiwrQ0FBK0M7SUFFL0MsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFZLEVBQUUsU0FBaUQ7UUFDL0UsSUFBSSxTQUFpQyxDQUFDO1FBQ3RDLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFO1lBQ3BFLEtBQUssRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU87WUFDbkgsSUFBSSxFQUFFO2dCQUNKLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtnQkFDaEIsWUFBWSxFQUFFLEtBQUssQ0FBQyxZQUFZO2dCQUNoQyxXQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVc7Z0JBQzlCLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztnQkFDdEIsWUFBWSxFQUFFLEtBQUssQ0FBQyxZQUFZO2dCQUNoQyxNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07Z0JBQ3BCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSzthQUNuQjtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksU0FBUyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRTtZQUM3QyxTQUFTLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFbkIsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRTtvQkFDNUIsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7aUJBQ2pDO1lBQ0gsQ0FBQyxDQUFDLENBQUE7U0FDSDtRQUVELElBQUksU0FBUyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRTtZQUM3QyxTQUFTLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQWtCLEVBQUUsRUFBRTtnQkFDekUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFbkIsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRTtvQkFDNUIsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7aUJBQ2pDO1lBQ0gsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO1NBQ1Q7UUFFRCxJQUFJLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUU7WUFDNUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRW5CLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7b0JBQzNCLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2lCQUNoQztZQUNILENBQUMsQ0FBQyxDQUFBO1NBQ0g7UUFFRCxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUNyQyw2Q0FBNkM7UUFDL0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2RhbCB9IGZyb20gJy4uL21vZGVsJztcbmltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb2RhbENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudC9tb2RhbC9tb2RhbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IEZpZWxkQ2hhbmdlIH0gZnJvbSAnLi4vLi4vZmllbGQvbW9kZWwnO1xuXG5leHBvcnQgY2xhc3MgTW9kYWxVaXRscyB7XG4gIC8vICAgIHN0YXRpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxhbnksIGFueT47XG5cbiAgc3RhdGljIG9wZW5EaWFsb2cobW9kYWw6IE1vZGFsLCBjb21wb25lbnQ/OiBDb21wb25lbnRUeXBlPGFueT4gfCBUZW1wbGF0ZVJlZjxhbnk+KTogdm9pZCB7XG4gICAgbGV0IGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPGFueSwgYW55PjtcbiAgICBkaWFsb2dSZWYgPSBtb2RhbC5kaWFsb2cub3Blbihjb21wb25lbnQgPyBjb21wb25lbnQgOiBNb2RhbENvbXBvbmVudCwge1xuICAgICAgd2lkdGg6IG1vZGFsLndpZGdldENvbmZpZy5tb2RhbCAmJiBtb2RhbC53aWRnZXRDb25maWcubW9kYWwud2lkdGggPyBtb2RhbC53aWRnZXRDb25maWcubW9kYWwud2lkdGggKyAncHgnIDogJzI1MHB4JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdHlwZTogbW9kYWwudHlwZSxcbiAgICAgICAgd2lkZ2V0Q29uZmlnOiBtb2RhbC53aWRnZXRDb25maWcsXG4gICAgICAgIHNvdXJjZUluZGV4OiBtb2RhbC5zb3VyY2VJbmRleCxcbiAgICAgICAgY29udGV4dDogbW9kYWwuY29udGV4dCxcbiAgICAgICAgb3JpZ2luYWxEYXRhOiBtb2RhbC5vcmlnaW5hbERhdGEsXG4gICAgICAgIGtleU1hcDogbW9kYWwua2V5TWFwLFxuICAgICAgICByZXNldDogbW9kYWwucmVzZXRcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2Uub25CdXR0b25DbGljaykge1xuICAgICAgZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLm9uQnV0dG9uQ2xpY2suc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXZlbnQpO1xuXG4gICAgICAgIGlmIChldmFsKFwidGhpcy5idXR0b25DbGlja1wiKSkge1xuICAgICAgICAgIGV2YWwoXCJ0aGlzLmJ1dHRvbkNsaWNrKGV2ZW50KVwiKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAoZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLm9uRmllbGRDaGFuZ2UpIHtcbiAgICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5vbkZpZWxkQ2hhbmdlLnN1YnNjcmliZSgoZXZlbnQ6IEZpZWxkQ2hhbmdlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcblxuICAgICAgICBpZiAoZXZhbChcInRoaXMuZmllbGRDaGFuZ2VcIikpIHtcbiAgICAgICAgICBldmFsKFwidGhpcy5maWVsZENoYW5nZShldmVudClcIik7XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpXG4gICAgfVxuXG4gICAgaWYgKGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5vbkZvcm1DaGFuZ2UpIHtcbiAgICAgIGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5vbkZvcm1DaGFuZ2Uuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXZlbnQpO1xuXG4gICAgICAgIGlmIChldmFsKFwidGhpcy5mb3JtQ2hhbmdlXCIpKSB7XG4gICAgICAgICAgZXZhbChcInRoaXMuZm9ybUNoYW5nZShldmVudClcIik7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnVGhlIGRpYWxvZyB3YXMgY2xvc2VkJyk7XG4gICAgICAvLyAgICAgICAgICB0aGlzLmludm9rZUFjdGlvbihyZXN1bHQsIGV2ZW50KTtcbiAgICB9KTtcbiAgfVxufSJdfQ==