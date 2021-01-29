import { Modal } from '../model';
import { ComponentType } from '@angular/cdk/portal';
import { TemplateRef } from '@angular/core';
export declare class ModalUitls {
    static openDialog(modal: Modal, component?: ComponentType<any> | TemplateRef<any>): void;
}
