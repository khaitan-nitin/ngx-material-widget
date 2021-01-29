import { Field } from './field.model';
import { ButtonColor } from '../../button/model';
export interface SliderField extends Field {
    color: ButtonColor;
    invert: boolean;
    max: number;
    min: number;
    step: number;
    thumbLabel: boolean;
    tickInterval: number | "auto";
    vertical: boolean;
}
