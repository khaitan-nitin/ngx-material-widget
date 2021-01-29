import { FormUtils } from './form.utility';
import { StringUtils } from './string.utility';
import { MasterDataUtils } from './master-data.utility';
import { CollectionUtils } from '.';
export class FieldUtils {
    static isFieldDisabled(field, currentDisplayMode, value) {
        let isDisabled = false;
        if (FormUtils.isFormDisable(currentDisplayMode) || field.displayMode == "DISABLED" /* DISABLED */ || field.type == "HIDDEN" /* HIDDEN */ || field.isReadOnly || (field.isUnique && currentDisplayMode == "EDIT" /* EDIT */ && !StringUtils.isEmpty(value))) {
            isDisabled = true;
        }
        return isDisabled;
    }
    static displayEllipsis(charLimit, value) {
        let showEllipsis = false;
        let strValue = JSON.stringify(value);
        if (charLimit && charLimit > 0 && !StringUtils.isEmpty(strValue) && strValue.length > charLimit) {
            showEllipsis = true;
        }
        return showEllipsis;
    }
    static readOnlyField() {
        return ["IMAGE" /* IMAGE */, "IMAGE_AND_TEXT" /* IMAGE_AND_TEXT */, "JSON" /* JSON */, "LABEL" /* LABEL */, "BOOLEAN" /* BOOLEAN */];
    }
    static isEllipsisField(field) {
        let hasEllipsis;
        if ((field.type == "LABEL" /* LABEL */ || field.type == "TEXT" /* TEXT */ || field.type == "TEXTAREA" /* TEXTAREA */ || field.type == "EMAIL" /* EMAIL */ || field.type == "PASSWORD" /* PASSWORD */) && field.ellipsis > 0) {
            hasEllipsis = true;
        }
        return hasEllipsis;
    }
    static setOptionsUsingKey(field, masterDataKey) {
        if (!CollectionUtils.isEmpty(field)) {
            let options = MasterDataUtils.getMasterDataAsOptions(masterDataKey);
            field.options = options;
        }
    }
    static setOptionsUsingValues(field, keyMap) {
        if (!CollectionUtils.isEmpty(field)) {
            field.options = keyMap.options;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQudXRpbGl0eS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvbml0aW5raGFpdGFuL05pdGluL3N0dWR5L2FuZ3VsYXIvbWF0ZXJpYWwvYWRtaW4tYnVpbGRlci1wbHVnaW4vcHJvamVjdHMvbmd4LW1hdGVyaWFsLXdpZGdldC9zcmMvIiwic291cmNlcyI6WyJsaWIvdXRpbGl0eS9maWVsZC51dGlsaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUczQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxHQUFHLENBQUM7QUFFcEMsTUFBTSxPQUFPLFVBQVU7SUFDckIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFZLEVBQUUsa0JBQWtDLEVBQUUsS0FBNkI7UUFDcEcsSUFBSSxVQUFVLEdBQVksS0FBSyxDQUFDO1FBQ2hDLElBQUksU0FBUyxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEtBQUssQ0FBQyxXQUFXLDZCQUF3QixJQUFJLEtBQUssQ0FBQyxJQUFJLHlCQUFvQixJQUFJLEtBQUssQ0FBQyxVQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLGtCQUFrQixxQkFBdUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNsUCxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQ25CO1FBRUQsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxlQUFlLENBQUMsU0FBaUIsRUFBRSxLQUFVO1FBQ2xELElBQUksWUFBWSxHQUFZLEtBQUssQ0FBQztRQUVsQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLElBQUksU0FBUyxJQUFJLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsU0FBUyxFQUFFO1lBQy9GLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDckI7UUFDRCxPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBRUQsTUFBTSxDQUFDLGFBQWE7UUFDbEIsT0FBTyw2SEFBK0YsQ0FBQztJQUN6RyxDQUFDO0lBRUQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFZO1FBQ2pDLElBQUksV0FBb0IsQ0FBQztRQUV6QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksdUJBQW1CLElBQUksS0FBSyxDQUFDLElBQUkscUJBQWtCLElBQUksS0FBSyxDQUFDLElBQUksNkJBQXNCLElBQUksS0FBSyxDQUFDLElBQUksdUJBQW1CLElBQUksS0FBSyxDQUFDLElBQUksNkJBQXNCLENBQUMsSUFBZ0IsS0FBTSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUU7WUFDL00sV0FBVyxHQUFHLElBQUksQ0FBQztTQUNwQjtRQUVELE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxNQUFNLENBQUMsa0JBQWtCLENBQUMsS0FBcUUsRUFBRSxhQUFxQjtRQUNwSCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNuQyxJQUFJLE9BQU8sR0FBMEIsZUFBZSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRTNGLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxLQUFxRSxFQUFFLE1BQWM7UUFDaEgsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDbkMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybVV0aWxzIH0gZnJvbSAnLi9mb3JtLnV0aWxpdHknO1xuaW1wb3J0IHsgRmllbGQsIEZpZWxkVHlwZSwgVGV4dEZpZWxkLCBBdXRvY29tcGxldGVGaWVsZCwgQ2hlY2tib3hGaWVsZCwgUmFkaW9GaWVsZCwgRHJvcGRvd25GaWVsZCwgRHJvcGRvd25PcHRpb24sIEtleU1hcCwgRGlzcGxheU1vZGUgfSBmcm9tICcuLi9maWVsZC9tb2RlbCc7XG5pbXBvcnQgeyBGb3JtRGlhcGx5TW9kZSB9IGZyb20gJy4uL2Zvcm0vbW9kZWwnO1xuaW1wb3J0IHsgU3RyaW5nVXRpbHMgfSBmcm9tICcuL3N0cmluZy51dGlsaXR5JztcbmltcG9ydCB7IE1hc3RlckRhdGFVdGlscyB9IGZyb20gJy4vbWFzdGVyLWRhdGEudXRpbGl0eSc7IFxuaW1wb3J0IHsgQ29sbGVjdGlvblV0aWxzIH0gZnJvbSAnLic7XG5cbmV4cG9ydCBjbGFzcyBGaWVsZFV0aWxzIHtcbiAgc3RhdGljIGlzRmllbGREaXNhYmxlZChmaWVsZDogRmllbGQsIGN1cnJlbnREaXNwbGF5TW9kZTogRm9ybURpYXBseU1vZGUsIHZhbHVlOiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+KTogYm9vbGVhbiB7XG4gICAgbGV0IGlzRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBpZiAoRm9ybVV0aWxzLmlzRm9ybURpc2FibGUoY3VycmVudERpc3BsYXlNb2RlKSB8fCBmaWVsZC5kaXNwbGF5TW9kZSA9PSBEaXNwbGF5TW9kZS5ESVNBQkxFRCB8fCBmaWVsZC50eXBlID09IEZpZWxkVHlwZS5ISURERU4gfHwgZmllbGQuaXNSZWFkT25seSB8fCAoZmllbGQuaXNVbmlxdWUgJiYgY3VycmVudERpc3BsYXlNb2RlID09IEZvcm1EaWFwbHlNb2RlLkVESVQgJiYgIVN0cmluZ1V0aWxzLmlzRW1wdHkodmFsdWUpKSkge1xuICAgICAgaXNEaXNhYmxlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzRGlzYWJsZWQ7XG4gIH1cblxuICBzdGF0aWMgZGlzcGxheUVsbGlwc2lzKGNoYXJMaW1pdDogbnVtYmVyLCB2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gICAgbGV0IHNob3dFbGxpcHNpczogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgbGV0IHN0clZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgIGlmIChjaGFyTGltaXQgJiYgY2hhckxpbWl0ID4gMCAmJiAhU3RyaW5nVXRpbHMuaXNFbXB0eShzdHJWYWx1ZSkgJiYgc3RyVmFsdWUubGVuZ3RoID4gY2hhckxpbWl0KSB7XG4gICAgICBzaG93RWxsaXBzaXMgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gc2hvd0VsbGlwc2lzO1xuICB9XG5cbiAgc3RhdGljIHJlYWRPbmx5RmllbGQoKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgcmV0dXJuIFtGaWVsZFR5cGUuSU1BR0UsIEZpZWxkVHlwZS5JTUFHRV9BTkRfVEVYVCwgRmllbGRUeXBlLkpTT04sIEZpZWxkVHlwZS5MQUJFTCwgRmllbGRUeXBlLkJPT0xFQU5dO1xuICB9XG5cbiAgc3RhdGljIGlzRWxsaXBzaXNGaWVsZChmaWVsZDogRmllbGQpIHtcbiAgICBsZXQgaGFzRWxsaXBzaXM6IGJvb2xlYW47XG5cbiAgICBpZiAoKGZpZWxkLnR5cGUgPT0gRmllbGRUeXBlLkxBQkVMIHx8IGZpZWxkLnR5cGUgPT0gRmllbGRUeXBlLlRFWFQgfHwgZmllbGQudHlwZSA9PSBGaWVsZFR5cGUuVEVYVEFSRUEgfHwgZmllbGQudHlwZSA9PSBGaWVsZFR5cGUuRU1BSUwgfHwgZmllbGQudHlwZSA9PSBGaWVsZFR5cGUuUEFTU1dPUkQpICYmICg8VGV4dEZpZWxkPmZpZWxkKS5lbGxpcHNpcyA+IDApIHtcbiAgICAgIGhhc0VsbGlwc2lzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gaGFzRWxsaXBzaXM7XG4gIH1cblxuICBzdGF0aWMgc2V0T3B0aW9uc1VzaW5nS2V5KGZpZWxkOiBBdXRvY29tcGxldGVGaWVsZCB8IENoZWNrYm94RmllbGQgfCBSYWRpb0ZpZWxkIHwgRHJvcGRvd25GaWVsZCwgbWFzdGVyRGF0YUtleTogc3RyaW5nKSB7XG4gICAgaWYgKCFDb2xsZWN0aW9uVXRpbHMuaXNFbXB0eShmaWVsZCkpIHtcbiAgICAgIGxldCBvcHRpb25zOiBBcnJheTxEcm9wZG93bk9wdGlvbj4gPSBNYXN0ZXJEYXRhVXRpbHMuZ2V0TWFzdGVyRGF0YUFzT3B0aW9ucyhtYXN0ZXJEYXRhS2V5KTtcblxuICAgICAgZmllbGQub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHNldE9wdGlvbnNVc2luZ1ZhbHVlcyhmaWVsZDogQXV0b2NvbXBsZXRlRmllbGQgfCBDaGVja2JveEZpZWxkIHwgUmFkaW9GaWVsZCB8IERyb3Bkb3duRmllbGQsIGtleU1hcDogS2V5TWFwKSB7XG4gICAgaWYgKCFDb2xsZWN0aW9uVXRpbHMuaXNFbXB0eShmaWVsZCkpIHtcbiAgICAgIGZpZWxkLm9wdGlvbnMgPSBrZXlNYXAub3B0aW9uczsgXG4gICAgfVxuICB9XG59Il19