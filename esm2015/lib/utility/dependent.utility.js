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
        if (!CollectionUtils.isEmpty(buttonLayout.buttons)) {
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
        if (!CollectionUtils.isEmpty(buttonLayout.cells)) {
            for (let cell of buttonLayout.cells) {
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
        return dependency;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwZW5kZW50LnV0aWxpdHkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL25pdGlua2hhaXRhbi9OaXRpbi9zdHVkeS9hbmd1bGFyL21hdGVyaWFsL2FkbWluLWJ1aWxkZXItcGx1Z2luL3Byb2plY3RzL25neC1tYXRlcmlhbC13aWRnZXQvc3JjLyIsInNvdXJjZXMiOlsibGliL3V0aWxpdHkvZGVwZW5kZW50LnV0aWxpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXZELE1BQU0sT0FBTyxjQUFjO0lBQ3pCLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxpQkFBMEMsRUFBRSxnQkFBcUIsRUFBRSxNQUFXO1FBQzFHLElBQUksc0JBQXNCLEdBQVksSUFBSSxDQUFDO1FBQzNDLElBQUksZ0NBQWdDLEdBQVksSUFBSSxDQUFDO1FBRXJELElBQUksaUJBQWlCLElBQUksaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxNQUFNLEVBQUU7WUFDL0QsS0FBSyxJQUFJLGNBQWMsSUFBSSxpQkFBaUIsRUFBRTtnQkFDNUMsSUFBSSxlQUFlLEdBQVEsRUFBRSxDQUFDO2dCQUM5QixJQUFJO29CQUNGLGVBQWUsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDeEQ7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7aUJBRVg7Z0JBRUQsSUFBSSxlQUFlLElBQUksU0FBUyxFQUFFO29CQUNoQyxJQUFJLGNBQWMsQ0FBQyxTQUFTLFlBQVksS0FBSyxFQUFFO3dCQUM3QyxJQUFJLGVBQWUsWUFBWSxLQUFLLEVBQUU7NEJBQ3BDLElBQUksUUFBUSxHQUFZLEtBQUssQ0FBQzs0QkFDakIsZUFBZ0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0NBQzVDLElBQW9CLGNBQWMsQ0FBQyxTQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO29DQUNqRSxRQUFRLEdBQUcsSUFBSSxDQUFDO2lDQUNqQjs0QkFDSCxDQUFDLENBQUMsQ0FBQzs0QkFDSCxJQUFJLFFBQVEsRUFBRTtnQ0FDWixzQkFBc0IsR0FBRyxLQUFLLENBQUM7NkJBQ2hDO3lCQUNGOzZCQUFNOzRCQUNMLElBQW9CLGNBQWMsQ0FBQyxTQUFVLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO2dDQUM1RSxzQkFBc0IsR0FBRyxLQUFLLENBQUM7NkJBQ2hDO3lCQUNGO3FCQUNGO3lCQUFNO3dCQUNMLElBQUksZUFBZSxZQUFZLEtBQUssRUFBRTs0QkFDcEMsSUFBSSxlQUFlLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtnQ0FDM0Qsc0JBQXNCLEdBQUcsS0FBSyxDQUFDOzZCQUNoQzt5QkFDRjs2QkFBTTs0QkFDTCxJQUFJLGVBQWUsSUFBSSxjQUFjLENBQUMsU0FBUyxFQUFFO2dDQUMvQyxzQkFBc0IsR0FBRyxLQUFLLENBQUM7NkJBQ2hDO3lCQUNGO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRjtRQUVELElBQUksaUJBQWlCLElBQUksaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxnQkFBZ0IsRUFBRTtZQUN6RSxLQUFLLElBQUksY0FBYyxJQUFJLGlCQUFpQixFQUFFO2dCQUM1QyxJQUFJLGVBQWUsR0FBUSxFQUFFLENBQUM7Z0JBQzlCLElBQUk7b0JBQ0YsZUFBZSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ2xFO2dCQUFDLE9BQU8sQ0FBQyxFQUFFO2lCQUVYO2dCQUVELElBQUksZUFBZSxJQUFJLFNBQVMsRUFBRTtvQkFDaEMsSUFBSSxjQUFjLENBQUMsU0FBUyxZQUFZLEtBQUssRUFBRTt3QkFDN0MsSUFBSSxlQUFlLFlBQVksS0FBSyxFQUFFOzRCQUNwQyxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7NEJBQ1IsZUFBZ0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0NBQzVDLElBQW9CLGNBQWMsQ0FBQyxTQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO29DQUNqRSxRQUFRLEdBQUcsSUFBSSxDQUFDO2lDQUNqQjs0QkFDSCxDQUFDLENBQUMsQ0FBQzs0QkFDSCxJQUFJLENBQUMsUUFBUSxFQUFFO2dDQUNiLGdDQUFnQyxHQUFHLEtBQUssQ0FBQzs2QkFDMUM7eUJBQ0Y7NkJBQU07NEJBQ0wsSUFBb0IsY0FBYyxDQUFDLFNBQVUsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7Z0NBQzVFLGdDQUFnQyxHQUFHLEtBQUssQ0FBQzs2QkFDMUM7eUJBQ0Y7cUJBQ0Y7eUJBQU07d0JBQ0wsSUFBSSxlQUFlLFlBQVksS0FBSyxFQUFFOzRCQUNwQyxJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO2dDQUMzRCxnQ0FBZ0MsR0FBRyxLQUFLLENBQUM7NkJBQzFDO3lCQUNGOzZCQUFNOzRCQUNMLElBQUksZUFBZSxJQUFJLGNBQWMsQ0FBQyxTQUFTLEVBQUU7Z0NBQy9DLGdDQUFnQyxHQUFHLEtBQUssQ0FBQzs2QkFDMUM7eUJBQ0Y7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGO1FBRUQsT0FBTyxzQkFBc0IsSUFBSSxnQ0FBZ0MsQ0FBQztJQUNwRSxDQUFDO0lBRUQsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFVBQTRCO1FBQ25ELElBQUksVUFBVSxHQUFRLEVBQUUsQ0FBQztRQUV6QixLQUFLLElBQUksU0FBUyxJQUFJLFVBQVUsRUFBRTtZQUNoQyxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNyRixLQUFLLElBQUksY0FBYyxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUU7b0JBQzVELElBQUksVUFBVSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxTQUFTLElBQUksVUFBVSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUU7d0JBQ3pGLFVBQVUsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0FBQztxQkFDdEQ7b0JBQ0QsVUFBVSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDMUQ7YUFDRjtTQUNGO1FBRUQsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUVELE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxZQUEyQztRQUMzRSxJQUFJLFVBQVUsR0FBUSxFQUFFLENBQUM7UUFFekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQWMsWUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2hFLEtBQUssSUFBSSxNQUFNLElBQWlCLFlBQWEsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3JELElBQUksTUFBTSxDQUFDLGlCQUFpQixJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUNuRSxLQUFLLElBQUksY0FBYyxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRTt3QkFDbkQsSUFBSSxVQUFVLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLFNBQVMsSUFBSSxVQUFVLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRTs0QkFDekYsVUFBVSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO3lCQUN0RDt3QkFDRCxVQUFVLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7cUJBQ3hEO2lCQUNGO2FBQ0Y7U0FDRjtRQUVELElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFvQixZQUFhLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDcEUsS0FBSyxJQUFJLElBQUksSUFBdUIsWUFBYSxDQUFDLEtBQUssRUFBRTtnQkFDdkQsS0FBSyxJQUFJLE1BQU0sSUFBaUIsSUFBSSxDQUFDLE9BQVEsQ0FBQyxPQUFPLEVBQUU7b0JBQ3JELElBQUksTUFBTSxDQUFDLGlCQUFpQixJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO3dCQUNuRSxLQUFLLElBQUksY0FBYyxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRTs0QkFDbkQsSUFBSSxVQUFVLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLFNBQVMsSUFBSSxVQUFVLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRTtnQ0FDekYsVUFBVSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDOzZCQUN0RDs0QkFDRCxVQUFVLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7eUJBQ3hEO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRjtRQUVELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERlcGVuZGVudE9uRmllbGQgfSBmcm9tIFwiLi4vZmllbGQvbW9kZWxcIjtcbmltcG9ydCB7IEZvcm1CdXR0b24sIEZvcm1CdXR0b25MYXlvdXQsIEZvcm1GaWVsZCB9IGZyb20gXCIuLi9mb3JtL21vZGVsXCI7XG5pbXBvcnQgeyBDb2xsZWN0aW9uVXRpbHMgfSBmcm9tIFwiLi9jb2xsZWN0aW9uLnV0aWxpdHlcIjtcblxuZXhwb3J0IGNsYXNzIERlcGVuZGVudFV0aWxzIHtcbiAgc3RhdGljIGRpc3BsYXlEZXBlbmRlbmN5RmllbGQoZGVwZW5kZW50T25GaWVsZHM6IEFycmF5PERlcGVuZGVudE9uRmllbGQ+LCBzdXBwb3J0aW5nUmVjb3JkOiBhbnksIHJlY29yZDogYW55KTogYm9vbGVhbiB7XG4gICAgbGV0IGRpc3BsYXlEZXBlbmRlbmN5RmllbGQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgIGxldCBkaXNwbGF5U3VwcG9ydGluZ0RlcGVuZGVuY3lGaWVsZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBpZiAoZGVwZW5kZW50T25GaWVsZHMgJiYgZGVwZW5kZW50T25GaWVsZHMubGVuZ3RoID4gMCAmJiByZWNvcmQpIHtcbiAgICAgIGZvciAobGV0IGRlcGVuZGVudEZpZWxkIG9mIGRlcGVuZGVudE9uRmllbGRzKSB7XG4gICAgICAgIGxldCBkZXBlbmRlbmN5VmFsdWU6IGFueSA9IFwiXCI7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZGVwZW5kZW5jeVZhbHVlID0gZXZhbChcInJlY29yZC5cIiArIGRlcGVuZGVudEZpZWxkLmtleSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRlcGVuZGVuY3lWYWx1ZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoZGVwZW5kZW50RmllbGQuY29uZGl0aW9uIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGlmIChkZXBlbmRlbmN5VmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICBsZXQgaGFzTWF0Y2g6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgKDxBcnJheTxhbnk+PmRlcGVuZGVuY3lWYWx1ZSkuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCg8QXJyYXk8c3RyaW5nPj5kZXBlbmRlbnRGaWVsZC5jb25kaXRpb24pLmluZGV4T2YodmFsdWUpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgIGhhc01hdGNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBpZiAoaGFzTWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGVwZW5kZW5jeUZpZWxkID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmICgoPEFycmF5PHN0cmluZz4+ZGVwZW5kZW50RmllbGQuY29uZGl0aW9uKS5pbmRleE9mKGRlcGVuZGVuY3lWYWx1ZSkgPD0gLTEpIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5RGVwZW5kZW5jeUZpZWxkID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGRlcGVuZGVuY3lWYWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgIGlmIChkZXBlbmRlbmN5VmFsdWUuaW5kZXhPZihkZXBlbmRlbnRGaWVsZC5jb25kaXRpb24pIDw9IC0xKSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheURlcGVuZGVuY3lGaWVsZCA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoZGVwZW5kZW5jeVZhbHVlICE9IGRlcGVuZGVudEZpZWxkLmNvbmRpdGlvbikge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlEZXBlbmRlbmN5RmllbGQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkZXBlbmRlbnRPbkZpZWxkcyAmJiBkZXBlbmRlbnRPbkZpZWxkcy5sZW5ndGggPiAwICYmIHN1cHBvcnRpbmdSZWNvcmQpIHtcbiAgICAgIGZvciAobGV0IGRlcGVuZGVudEZpZWxkIG9mIGRlcGVuZGVudE9uRmllbGRzKSB7XG4gICAgICAgIGxldCBkZXBlbmRlbmN5VmFsdWU6IGFueSA9IFwiXCI7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZGVwZW5kZW5jeVZhbHVlID0gZXZhbChcInN1cHBvcnRpbmdSZWNvcmQuXCIgKyBkZXBlbmRlbnRGaWVsZC5rZXkpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZXBlbmRlbmN5VmFsdWUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKGRlcGVuZGVudEZpZWxkLmNvbmRpdGlvbiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBpZiAoZGVwZW5kZW5jeVZhbHVlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgbGV0IGhhc01hdGNoID0gZmFsc2U7XG4gICAgICAgICAgICAgICg8QXJyYXk8YW55Pj5kZXBlbmRlbmN5VmFsdWUpLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgIGlmICgoPEFycmF5PHN0cmluZz4+ZGVwZW5kZW50RmllbGQuY29uZGl0aW9uKS5pbmRleE9mKHZhbHVlKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICBoYXNNYXRjaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgaWYgKCFoYXNNYXRjaCkge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlTdXBwb3J0aW5nRGVwZW5kZW5jeUZpZWxkID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmICgoPEFycmF5PHN0cmluZz4+ZGVwZW5kZW50RmllbGQuY29uZGl0aW9uKS5pbmRleE9mKGRlcGVuZGVuY3lWYWx1ZSkgPD0gLTEpIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5U3VwcG9ydGluZ0RlcGVuZGVuY3lGaWVsZCA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChkZXBlbmRlbmN5VmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICBpZiAoZGVwZW5kZW5jeVZhbHVlLmluZGV4T2YoZGVwZW5kZW50RmllbGQuY29uZGl0aW9uKSA8PSAtMSkge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlTdXBwb3J0aW5nRGVwZW5kZW5jeUZpZWxkID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChkZXBlbmRlbmN5VmFsdWUgIT0gZGVwZW5kZW50RmllbGQuY29uZGl0aW9uKSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheVN1cHBvcnRpbmdEZXBlbmRlbmN5RmllbGQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkaXNwbGF5RGVwZW5kZW5jeUZpZWxkICYmIGRpc3BsYXlTdXBwb3J0aW5nRGVwZW5kZW5jeUZpZWxkO1xuICB9XG5cbiAgc3RhdGljIGdldERlcGVuZGVuY3lUcmVlKGZvcm1GaWVsZHM6IEFycmF5PEZvcm1GaWVsZD4pOiBhbnkge1xuICAgIGxldCBkZXBlbmRlbmN5OiBhbnkgPSB7fTtcblxuICAgIGZvciAobGV0IGZvcm1GaWVsZCBvZiBmb3JtRmllbGRzKSB7XG4gICAgICBpZiAoZm9ybUZpZWxkLmZpZWxkLmRlcGVuZGVudE9uRmllbGRzICYmIGZvcm1GaWVsZC5maWVsZC5kZXBlbmRlbnRPbkZpZWxkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAobGV0IGRlcGVuZGVudEZpZWxkIG9mIGZvcm1GaWVsZC5maWVsZC5kZXBlbmRlbnRPbkZpZWxkcykge1xuICAgICAgICAgIGlmIChkZXBlbmRlbmN5W2RlcGVuZGVudEZpZWxkLmtleV0gPT0gdW5kZWZpbmVkIHx8IGRlcGVuZGVuY3lbZGVwZW5kZW50RmllbGQua2V5XSA9PSBudWxsKSB7XG4gICAgICAgICAgICBkZXBlbmRlbmN5W2RlcGVuZGVudEZpZWxkLmtleV0gPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkZXBlbmRlbmN5W2RlcGVuZGVudEZpZWxkLmtleV0ucHVzaChmb3JtRmllbGQuZmllbGQua2V5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkZXBlbmRlbmN5O1xuICB9XG5cbiAgc3RhdGljIGdldERlcGVuZGVuY3lUcmVlRm9yQnV0dG9uKGJ1dHRvbkxheW91dDogRm9ybUJ1dHRvbiB8IEZvcm1CdXR0b25MYXlvdXQpOiBhbnkge1xuICAgIGxldCBkZXBlbmRlbmN5OiBhbnkgPSB7fTtcblxuICAgIGlmICghQ29sbGVjdGlvblV0aWxzLmlzRW1wdHkoKDxGb3JtQnV0dG9uPmJ1dHRvbkxheW91dCkuYnV0dG9ucykpIHtcbiAgICAgIGZvciAobGV0IGJ1dHRvbiBvZiAoPEZvcm1CdXR0b24+YnV0dG9uTGF5b3V0KS5idXR0b25zKSB7XG4gICAgICAgIGlmIChidXR0b24uZGVwZW5kZW50T25GaWVsZHMgJiYgYnV0dG9uLmRlcGVuZGVudE9uRmllbGRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBmb3IgKGxldCBkZXBlbmRlbnRGaWVsZCBvZiBidXR0b24uZGVwZW5kZW50T25GaWVsZHMpIHtcbiAgICAgICAgICAgIGlmIChkZXBlbmRlbmN5W2RlcGVuZGVudEZpZWxkLmtleV0gPT0gdW5kZWZpbmVkIHx8IGRlcGVuZGVuY3lbZGVwZW5kZW50RmllbGQua2V5XSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIGRlcGVuZGVuY3lbZGVwZW5kZW50RmllbGQua2V5XSA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZXBlbmRlbmN5W2RlcGVuZGVudEZpZWxkLmtleV0ucHVzaChidXR0b24uaWRlbnRpZmllcik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFDb2xsZWN0aW9uVXRpbHMuaXNFbXB0eSgoPEZvcm1CdXR0b25MYXlvdXQ+YnV0dG9uTGF5b3V0KS5jZWxscykpIHtcbiAgICAgIGZvciAobGV0IGNlbGwgb2YgKDxGb3JtQnV0dG9uTGF5b3V0PmJ1dHRvbkxheW91dCkuY2VsbHMpIHtcbiAgICAgICAgZm9yIChsZXQgYnV0dG9uIG9mICg8Rm9ybUJ1dHRvbj5jZWxsLmJ1dHRvbnMpLmJ1dHRvbnMpIHtcbiAgICAgICAgICBpZiAoYnV0dG9uLmRlcGVuZGVudE9uRmllbGRzICYmIGJ1dHRvbi5kZXBlbmRlbnRPbkZpZWxkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBkZXBlbmRlbnRGaWVsZCBvZiBidXR0b24uZGVwZW5kZW50T25GaWVsZHMpIHtcbiAgICAgICAgICAgICAgaWYgKGRlcGVuZGVuY3lbZGVwZW5kZW50RmllbGQua2V5XSA9PSB1bmRlZmluZWQgfHwgZGVwZW5kZW5jeVtkZXBlbmRlbnRGaWVsZC5rZXldID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBkZXBlbmRlbmN5W2RlcGVuZGVudEZpZWxkLmtleV0gPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRlcGVuZGVuY3lbZGVwZW5kZW50RmllbGQua2V5XS5wdXNoKGJ1dHRvbi5pZGVudGlmaWVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGVwZW5kZW5jeTtcbiAgfVxufSJdfQ==