import { Form } from '../../form/model';
import { List } from '../../list/model';
import { Template } from '@angular/compiler/src/render3/r3_ast';
export declare const enum OrientationType {
    HORIZONTAL = "HORIZONTAL",
    VERTICAL = "VERTICAL"
}
export declare const enum StepType {
    FORM = "FORM",
    LIST = "LIST"
}
export interface WizardConfirmation {
    title: string;
    detail: Array<Form | List>;
}
export interface WizardDescription {
    text: string;
    bgColor?: string;
}
export interface Wizard {
    identifier: string;
    title: string;
    description?: WizardDescription;
    pageBackRoute: Array<string>;
    orientation: OrientationType;
    template?: Template;
    linear: boolean;
    disableStepNavigation: boolean;
    steps: Array<WizardStep>;
    confirmationPage: WizardConfirmation;
}
export interface WizardStep {
    identifier: string;
    label: string;
    stepType: StepType;
    form: Form | List;
    showNextButton: boolean;
    nextButtonLabel?: string;
    showPreviousButton: boolean;
    previousButtonLabel?: string;
    isFinalStep: boolean;
}
export interface WizardNextAction {
    status: boolean;
    skip: number;
}
