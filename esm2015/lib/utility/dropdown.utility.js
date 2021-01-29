import { CollectionUtils } from '.';
export class DropdownUtils {
    static getValue(key, options) {
        let value;
        if (!CollectionUtils.isEmpty(options)) {
            options.forEach(option => {
                if (option.key == key) {
                    value = option.value;
                }
            });
        }
        return value;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24udXRpbGl0eS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvbml0aW5raGFpdGFuL05pdGluL3N0dWR5L2FuZ3VsYXIvbWF0ZXJpYWwvYWRtaW4tYnVpbGRlci1wbHVnaW4vcHJvamVjdHMvbmd4LW1hdGVyaWFsLXdpZGdldC9zcmMvIiwic291cmNlcyI6WyJsaWIvdXRpbGl0eS9kcm9wZG93bi51dGlsaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxHQUFHLENBQUM7QUFFcEMsTUFBTSxPQUFPLGFBQWE7SUFDeEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFXLEVBQUUsT0FBOEI7UUFDekQsSUFBSSxLQUFVLENBQUM7UUFFZixJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRztZQUN0QyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUN2QixJQUFJLE1BQU0sQ0FBQyxHQUFHLElBQUksR0FBRyxFQUFHO29CQUN0QixLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztpQkFDdEI7WUFDSCxDQUFDLENBQUMsQ0FBQTtTQUNIO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEcm9wZG93bk9wdGlvbiB9IGZyb20gJy4uL2ZpZWxkL21vZGVsJztcbmltcG9ydCB7IENvbGxlY3Rpb25VdGlscyB9IGZyb20gJy4nO1xuXG5leHBvcnQgY2xhc3MgRHJvcGRvd25VdGlscyB7XG4gIHN0YXRpYyBnZXRWYWx1ZShrZXk6IHN0cmluZywgb3B0aW9uczogQXJyYXk8RHJvcGRvd25PcHRpb24+KTogYW55ICB7XG4gICAgbGV0IHZhbHVlOiBhbnk7XG5cbiAgICBpZiAoIUNvbGxlY3Rpb25VdGlscy5pc0VtcHR5KG9wdGlvbnMpKSAge1xuICAgICAgb3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICAgIGlmIChvcHRpb24ua2V5ID09IGtleSkgIHtcbiAgICAgICAgICB2YWx1ZSA9IG9wdGlvbi52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn1cbiJdfQ==