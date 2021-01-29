import { Field } from "./field.model";
export interface CalendarField extends Field {
    minDate: Date;
    maxDate: Date;
    dateRange?: boolean;
}
