import { CollectionUtils } from "./collection.utility";
export class DependentUtils {
    static displayDependencyField(dependentOnFields, supportingRecord, record) {
        let displayDependencyField = true;
        let displaySupportingDependencyField = true;
        if (dependentOnFields && dependentOnFields.length > 0 && record) {
            for (let dependentField of dependentOnFields) {
                let dependencyValue = "";
                try {
                    dependencyValue = eval("record." + dependentField.key);
                }
                catch (e) {
                }
                if (dependencyValue != undefined) {
                    if (dependentField.condition instanceof Array) {
                        if (dependencyValue instanceof Array) {
                            let hasMatch = false;
                            dependencyValue.forEach(value => {
                                if (dependentField.condition.indexOf(value) > -1) {
                                    hasMatch = true;
                                }
                            });
                            if (hasMatch) {
                                displayDependencyField = false;
                            }
                        }
                        else {
                            if (dependentField.condition.indexOf(dependencyValue) <= -1) {
                                displayDependencyField = false;
                            }
                        }
                    }
                    else {
                        if (dependencyValue instanceof Array) {
                            if (dependencyValue.indexOf(dependentField.condition) <= -1) {
                                displayDependencyField = false;
                            }
                        }
                        else {
                            if (dependencyValue != dependentField.condition) {
                                displayDependencyField = false;
                            }
                        }
                    }
                }
            }
        }
        if (dependentOnFields && dependentOnFields.length > 0 && supportingRecord) {
            for (let dependentField of dependentOnFields) {
                let dependencyValue = "";
                try {
                    dependencyValue = eval("supportingRecord." + dependentField.key);
                }
                catch (e) {
                }
                if (dependencyValue != undefined) {
                    if (dependentField.condition instanceof Array) {
                        if (dependencyValue instanceof Array) {
                            let hasMatch = false;
                            dependencyValue.forEach(value => {
                                if (dependentField.condition.indexOf(value) > -1) {
                                    hasMatch = true;
                                }
                            });
                            if (!hasMatch) {
                                displaySupportingDependencyField = false;
                            }
                        }
                        else {
                            if (dependentField.condition.indexOf(dependencyValue) <= -1) {
                                displaySupportingDependencyField = false;
                            }
                        }
                    }
                    else {
                        if (dependencyValue instanceof Array) {
                            if (dependencyValue.indexOf(dependentField.condition) <= -1) {
                                displaySupportingDependencyField = false;
                            }
                        }
                        else {
                            if (dependencyValue != dependentField.condition) {
                                displaySupportingDependencyField = false;
                            }
                        }
                    }
                }
            }
        }
        return displayDependencyField && displaySupportingDependencyField;
    }
    static getDependencyTree(formFields) {
        let dependency = {};
        for (let formField of formFields) {
            if (formField.field.dependentOnFields && formField.field.dependentOnFields.length > 0) {
                for (let dependentField of formField.field.dependentOnFields) {
                    if (dependency[dependentField.key] == undefined || dependency[dependentField.key] == null) {
                        dependency[dependentField.key] = new Array();
                    }
                    dependency[dependentField.key].push(formField.field.key);
                }
            }
        }
        return dependency;
    }
    static getDependencyTreeForButton(buttonLayout) {
        let dependency = {};
        if (buttonLayout && !CollectionUtils.isEmpty(buttonLayout.buttons)) {
            for (let button of buttonLayout.buttons) {
                if (button.dependentOnFields && button.dependentOnFields.length > 0) {
                    for (let dependentField of button.dependentOnFields) {
                        if (dependency[dependentField.key] == undefined || dependency[dependentField.key] == null) {
                            dependency[dependentField.key] = new Array();
                        }
                        dependency[dependentField.key].push(button.identifier);
                    }
                }
            }
        }
        if (buttonLayout && !CollectionUtils.isEmpty(buttonLayout.cells)) {
            for (let cell of buttonLayout.cells) {
                if (cell.buttons && !CollectionUtils.isEmpty(cell.buttons.buttons)) {
                    for (let button of cell.buttons.buttons) {
                        if (button.dependentOnFields && button.dependentOnFields.length > 0) {
                            for (let dependentField of button.dependentOnFields) {
                                if (dependency[dependentField.key] == undefined || dependency[dependentField.key] == null) {
                                    dependency[dependentField.key] = new Array();
                                }
                                dependency[dependentField.key].push(button.identifier);
                            }
                        }
                    }
                }
            }
        }
        return dependency;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwZW5kZW50LnV0aWxpdHkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL25pdGlua2hhaXRhbi9OaXRpbi9zdHVkeS9hbmd1bGFyL21hdGVyaWFsL2FkbWluLWJ1aWxkZXItcGx1Z2luL3Byb2plY3RzL25neC1tYXRlcmlhbC13aWRnZXQvc3JjLyIsInNvdXJjZXMiOlsibGliL3V0aWxpdHkvZGVwZW5kZW50LnV0aWxpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXZELE1BQU0sT0FBTyxjQUFjO0lBQ3pCLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxpQkFBMEMsRUFBRSxnQkFBcUIsRUFBRSxNQUFXO1FBQzFHLElBQUksc0JBQXNCLEdBQVksSUFBSSxDQUFDO1FBQzNDLElBQUksZ0NBQWdDLEdBQVksSUFBSSxDQUFDO1FBRXJELElBQUksaUJBQWlCLElBQUksaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxNQUFNLEVBQUU7WUFDL0QsS0FBSyxJQUFJLGNBQWMsSUFBSSxpQkFBaUIsRUFBRTtnQkFDNUMsSUFBSSxlQUFlLEdBQVEsRUFBRSxDQUFDO2dCQUM5QixJQUFJO29CQUNGLGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDeEQ7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7aUJBRVg7Z0JBRUQsSUFBSSxlQUFlLElBQUksU0FBUyxFQUFFO29CQUNoQyxJQUFJLGNBQWMsQ0FBQyxTQUFTLFlBQVksS0FBSyxFQUFFO3dCQUM3QyxJQUFJLGVBQWUsWUFBWSxLQUFLLEVBQUU7NEJBQ3BDLElBQUksUUFBUSxHQUFZLEtBQUssQ0FBQzs0QkFDakIsZUFBZ0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0NBQzVDLElBQW9CLGNBQWMsQ0FBQyxTQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENB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O1NBQ0Y7UUFFRCxJQUFJLFlBQVksSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQW9CLFlBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNwRixLQUFLLElBQUksSUFBSSxJQUF1QixZQUFhLENBQUMsS0FBSyxFQUFFO2dCQUN2RCxJQUFpQixJQUFJLENBQUMsT0FBUSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBYyxJQUFJLENBQUMsT0FBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUM5RixLQUFLLElBQUksTUFBTSxJQUFpQixJQUFJLENBQUMsT0FBUSxDQUFDLE9BQU8sRUFBRTt3QkFDckQsSUFBSSxNQUFNLENBQUMsaUJBQWlCLElBQUksTUFBTSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7NEJBQ25FLEtBQUssSUFBSSxjQUFjLElBQUksTUFBTSxDQUFDLGlCQUFpQixFQUFFO2dDQUNuRCxJQUFJLFVBQVUsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksU0FBUyxJQUFJLFVBQVUsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFO29DQUN6RixVQUFVLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7aUNBQ3REO2dDQUNELFVBQVUsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzs2QkFDeEQ7eUJBQ0Y7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGO1FBRUQsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGVwZW5kZW50T25GaWVsZCB9IGZyb20gXCIuLi9maWVsZC9tb2RlbFwiO1xuaW1wb3J0IHsgRm9ybUJ1dHRvbiwgRm9ybUJ1dHRvbkxheW91dCwgRm9ybUZpZWxkIH0gZnJvbSBcIi4uL2Zvcm0vbW9kZWxcIjtcbmltcG9ydCB7IENvbGxlY3Rpb25VdGlscyB9IGZyb20gXCIuL2NvbGxlY3Rpb24udXRpbGl0eVwiO1xuXG5leHBvcnQgY2xhc3MgRGVwZW5kZW50VXRpbHMge1xuICBzdGF0aWMgZGlzcGxheURlcGVuZGVuY3lGaWVsZChkZXBlbmRlbnRPbkZpZWxkczogQXJyYXk8RGVwZW5kZW50T25GaWVsZD4sIHN1cHBvcnRpbmdSZWNvcmQ6IGFueSwgcmVjb3JkOiBhbnkpOiBib29sZWFuIHtcbiAgICBsZXQgZGlzcGxheURlcGVuZGVuY3lGaWVsZDogYm9vbGVhbiA9IHRydWU7XG4gICAgbGV0IGRpc3BsYXlTdXBwb3J0aW5nRGVwZW5kZW5jeUZpZWxkOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGlmIChkZXBlbmRlbnRPbkZpZWxkcyAmJiBkZXBlbmRlbnRPbkZpZWxkcy5sZW5ndGggPiAwICYmIHJlY29yZCkge1xuICAgICAgZm9yIChsZXQgZGVwZW5kZW50RmllbGQgb2YgZGVwZW5kZW50T25GaWVsZHMpIHtcbiAgICAgICAgbGV0IGRlcGVuZGVuY3lWYWx1ZTogYW55ID0gXCJcIjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkZXBlbmRlbmN5VmFsdWUgPSBldmFsKFwicmVjb3JkLlwiICsgZGVwZW5kZW50RmllbGQua2V5KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGVwZW5kZW5jeVZhbHVlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmIChkZXBlbmRlbnRGaWVsZC5jb25kaXRpb24gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgaWYgKGRlcGVuZGVuY3lWYWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgIGxldCBoYXNNYXRjaDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAoPEFycmF5PGFueT4+ZGVwZW5kZW5jeVZhbHVlKS5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoKDxBcnJheTxzdHJpbmc+PmRlcGVuZGVudEZpZWxkLmNvbmRpdGlvbikuaW5kZXhPZih2YWx1ZSkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgaGFzTWF0Y2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGlmIChoYXNNYXRjaCkge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlEZXBlbmRlbmN5RmllbGQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKCg8QXJyYXk8c3RyaW5nPj5kZXBlbmRlbnRGaWVsZC5jb25kaXRpb24pLmluZGV4T2YoZGVwZW5kZW5jeVZhbHVlKSA8PSAtMSkge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlEZXBlbmRlbmN5RmllbGQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZGVwZW5kZW5jeVZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgaWYgKGRlcGVuZGVuY3lWYWx1ZS5pbmRleE9mKGRlcGVuZGVudEZpZWxkLmNvbmRpdGlvbikgPD0gLTEpIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGVwZW5kZW5jeUZpZWxkID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChkZXBlbmRlbmN5VmFsdWUgIT0gZGVwZW5kZW50RmllbGQuY29uZGl0aW9uKSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheURlcGVuZGVuY3lGaWVsZCA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGRlcGVuZGVudE9uRmllbGRzICYmIGRlcGVuZGVudE9uRmllbGRzLmxlbmd0aCA+IDAgJiYgc3VwcG9ydGluZ1JlY29yZCkge1xuICAgICAgZm9yIChsZXQgZGVwZW5kZW50RmllbGQgb2YgZGVwZW5kZW50T25GaWVsZHMpIHtcbiAgICAgICAgbGV0IGRlcGVuZGVuY3lWYWx1ZTogYW55ID0gXCJcIjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBkZXBlbmRlbmN5VmFsdWUgPSBldmFsKFwic3VwcG9ydGluZ1JlY29yZC5cIiArIGRlcGVuZGVudEZpZWxkLmtleSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRlcGVuZGVuY3lWYWx1ZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoZGVwZW5kZW50RmllbGQuY29uZGl0aW9uIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGlmIChkZXBlbmRlbmN5VmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICBsZXQgaGFzTWF0Y2ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgKDxBcnJheTxhbnk+PmRlcGVuZGVuY3lWYWx1ZSkuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCg8QXJyYXk8c3RyaW5nPj5kZXBlbmRlbnRGaWVsZC5jb25kaXRpb24pLmluZGV4T2YodmFsdWUpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgIGhhc01hdGNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBpZiAoIWhhc01hdGNoKSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheVN1cHBvcnRpbmdEZXBlbmRlbmN5RmllbGQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKCg8QXJyYXk8c3RyaW5nPj5kZXBlbmRlbnRGaWVsZC5jb25kaXRpb24pLmluZGV4T2YoZGVwZW5kZW5jeVZhbHVlKSA8PSAtMSkge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlTdXBwb3J0aW5nRGVwZW5kZW5jeUZpZWxkID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGRlcGVuZGVuY3lWYWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgIGlmIChkZXBlbmRlbmN5VmFsdWUuaW5kZXhPZihkZXBlbmRlbnRGaWVsZC5jb25kaXRpb24pIDw9IC0xKSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheVN1cHBvcnRpbmdEZXBlbmRlbmN5RmllbGQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGRlcGVuZGVuY3lWYWx1ZSAhPSBkZXBlbmRlbnRGaWVsZC5jb25kaXRpb24pIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5U3VwcG9ydGluZ0RlcGVuZGVuY3lGaWVsZCA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpc3BsYXlEZXBlbmRlbmN5RmllbGQgJiYgZGlzcGxheVN1cHBvcnRpbmdEZXBlbmRlbmN5RmllbGQ7XG4gIH1cblxuICBzdGF0aWMgZ2V0RGVwZW5kZW5jeVRyZWUoZm9ybUZpZWxkczogQXJyYXk8Rm9ybUZpZWxkPik6IGFueSB7XG4gICAgbGV0IGRlcGVuZGVuY3k6IGFueSA9IHt9O1xuXG4gICAgZm9yIChsZXQgZm9ybUZpZWxkIG9mIGZvcm1GaWVsZHMpIHtcbiAgICAgIGlmIChmb3JtRmllbGQuZmllbGQuZGVwZW5kZW50T25GaWVsZHMgJiYgZm9ybUZpZWxkLmZpZWxkLmRlcGVuZGVudE9uRmllbGRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yIChsZXQgZGVwZW5kZW50RmllbGQgb2YgZm9ybUZpZWxkLmZpZWxkLmRlcGVuZGVudE9uRmllbGRzKSB7XG4gICAgICAgICAgaWYgKGRlcGVuZGVuY3lbZGVwZW5kZW50RmllbGQua2V5XSA9PSB1bmRlZmluZWQgfHwgZGVwZW5kZW5jeVtkZXBlbmRlbnRGaWVsZC5rZXldID09IG51bGwpIHtcbiAgICAgICAgICAgIGRlcGVuZGVuY3lbZGVwZW5kZW50RmllbGQua2V5XSA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRlcGVuZGVuY3lbZGVwZW5kZW50RmllbGQua2V5XS5wdXNoKGZvcm1GaWVsZC5maWVsZC5rZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlcGVuZGVuY3k7XG4gIH1cblxuICBzdGF0aWMgZ2V0RGVwZW5kZW5jeVRyZWVGb3JCdXR0b24oYnV0dG9uTGF5b3V0OiBGb3JtQnV0dG9uIHwgRm9ybUJ1dHRvbkxheW91dCk6IGFueSB7XG4gICAgbGV0IGRlcGVuZGVuY3k6IGFueSA9IHt9O1xuXG4gICAgaWYgKGJ1dHRvbkxheW91dCAmJiAhQ29sbGVjdGlvblV0aWxzLmlzRW1wdHkoKDxGb3JtQnV0dG9uPmJ1dHRvbkxheW91dCkuYnV0dG9ucykpIHtcbiAgICAgIGZvciAobGV0IGJ1dHRvbiBvZiAoPEZvcm1CdXR0b24+YnV0dG9uTGF5b3V0KS5idXR0b25zKSB7XG4gICAgICAgIGlmIChidXR0b24uZGVwZW5kZW50T25GaWVsZHMgJiYgYnV0dG9uLmRlcGVuZGVudE9uRmllbGRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBmb3IgKGxldCBkZXBlbmRlbnRGaWVsZCBvZiBidXR0b24uZGVwZW5kZW50T25GaWVsZHMpIHtcbiAgICAgICAgICAgIGlmIChkZXBlbmRlbmN5W2RlcGVuZGVudEZpZWxkLmtleV0gPT0gdW5kZWZpbmVkIHx8IGRlcGVuZGVuY3lbZGVwZW5kZW50RmllbGQua2V5XSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIGRlcGVuZGVuY3lbZGVwZW5kZW50RmllbGQua2V5XSA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZXBlbmRlbmN5W2RlcGVuZGVudEZpZWxkLmtleV0ucHVzaChidXR0b24uaWRlbnRpZmllcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGJ1dHRvbkxheW91dCAmJiAhQ29sbGVjdGlvblV0aWxzLmlzRW1wdHkoKDxGb3JtQnV0dG9uTGF5b3V0PmJ1dHRvbkxheW91dCkuY2VsbHMpKSB7XG4gICAgICBmb3IgKGxldCBjZWxsIG9mICg8Rm9ybUJ1dHRvbkxheW91dD5idXR0b25MYXlvdXQpLmNlbGxzKSB7XG4gICAgICAgIGlmICgoPEZvcm1CdXR0b24+Y2VsbC5idXR0b25zKSAmJiAhQ29sbGVjdGlvblV0aWxzLmlzRW1wdHkoKDxGb3JtQnV0dG9uPmNlbGwuYnV0dG9ucykuYnV0dG9ucykpIHtcbiAgICAgICAgICBmb3IgKGxldCBidXR0b24gb2YgKDxGb3JtQnV0dG9uPmNlbGwuYnV0dG9ucykuYnV0dG9ucykge1xuICAgICAgICAgICAgaWYgKGJ1dHRvbi5kZXBlbmRlbnRPbkZpZWxkcyAmJiBidXR0b24uZGVwZW5kZW50T25GaWVsZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBmb3IgKGxldCBkZXBlbmRlbnRGaWVsZCBvZiBidXR0b24uZGVwZW5kZW50T25GaWVsZHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVwZW5kZW5jeVtkZXBlbmRlbnRGaWVsZC5rZXldID09IHVuZGVmaW5lZCB8fCBkZXBlbmRlbmN5W2RlcGVuZGVudEZpZWxkLmtleV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgZGVwZW5kZW5jeVtkZXBlbmRlbnRGaWVsZC5rZXldID0gbmV3IEFycmF5PHN0cmluZz4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVwZW5kZW5jeVtkZXBlbmRlbnRGaWVsZC5rZXldLnB1c2goYnV0dG9uLmlkZW50aWZpZXIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlcGVuZGVuY3k7XG4gIH1cbn0iXX0=