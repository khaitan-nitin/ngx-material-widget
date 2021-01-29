import { Field } from './field.model';
import { ButtonColor } from '../../button/model';
export interface ToggleField extends Field {
    description?: string;
    color: ButtonColor;
    checked: boolean;
}
