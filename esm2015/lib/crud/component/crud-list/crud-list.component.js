import { Component, Input, Output, EventEmitter, ViewChild, Inject } from '@angular/core';
import { Ability } from '@casl/ability';
import { MatBottomSheetRef, MatBottomSheet } from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { AbilityUtils, StringUtils, CollectionUtils } from '../../../utility';
export class CrudListComponent {
    constructor(_bottomSheet, ability) {
        this._bottomSheet = _bottomSheet;
        this.ability = ability;
        this._expanded = false;
        this.onFormChange = new EventEmitter();
        this.onFieldChange = new EventEmitter();
        this.onButtonClick = new EventEmitter();
        this.onButtonIconClick = new EventEmitter();
        this.onSortClick = new EventEmitter();
        this.onPageClick = new EventEmitter();
        this.onTabClick = new EventEmitter();
        this.showSearchForm = false;
        this.listHeaders = new Array();
        this.searchOnFieldsCount = 0;
        this.searchOnFieldsButtons = new Array();
        AbilityUtils.setAbility(this.ability);
    }
    get configData() {
        return this._configData;
    }
    set configData(_configData) {
        this._configData = _configData;
        this.setConfigAsPerTab();
    }
    get expanded() {
        return this._expanded;
    }
    set expanded(_expanded) {
        this._expanded = _expanded;
    }
    ngOnInit() {
        this.searchButton = this.setSearchButton('searchButton', 'Search', 'search');
        this.searchModalButton = this.setSearchButton('searchCloseButton', 'Close', 'close');
        this.displaySearchForm();
        this.setListHeaders();
        this.setCrudHeader();
        if (this.searchConfig && this.searchConfig.displayType != "ABOVE_LIST" /* ABOVE_LIST */) {
            this.searchConfig.form.displayInColumns = 1;
        }
        this.setConfigAsPerTab();
    }
    setConfigAsPerTab(tabIdentifier) {
        if (this._configData) {
            this.badges = this._configData.badges;
            this.pageBackRoute = this._configData.pageBackRoute;
            this.records = this._configData.records;
            this.searchData = this._configData.searchData;
            this.searchOnFieldsCount = 0;
            this.searchOnFieldsButtons = new Array();
            if (this.searchData && !CollectionUtils.isEmpty(this.searchData)) {
                for (let cnt = 0; cnt < Object.keys(this.searchData).length; cnt++) {
                    if (!StringUtils.isEmpty(this.searchData[Object.keys(this.searchData)[cnt]])) {
                        this.searchOnFieldsCount++;
                        let filterButton = this.setSelectedFilterButton(Object.keys(this.searchData)[cnt], this.searchData[Object.keys(this.searchData)[cnt]]);
                        this.searchOnFieldsButtons.push(filterButton);
                    }
                }
            }
            if (this._configData.configPerTabs) {
                let tabIndex = 0;
                this._configData.configPerTabs.forEach((tabConfigData, tabKey) => {
                    if ((tabKey == tabIdentifier || (tabIndex == 0 && tabIdentifier == null)) && tabConfigData) {
                        if (tabConfigData.badges) {
                            this.badges = tabConfigData.badges;
                        }
                        if (tabConfigData.pageBackRoute) {
                            this.pageBackRoute = tabConfigData.pageBackRoute;
                        }
                        if (tabConfigData.records && tabConfigData.records.length > 0) {
                            this.records = this._configData.records;
                        }
                    }
                    tabIndex++;
                });
            }
        }
    }
    getTabIdentifier(tabTitle) {
        let tabIdentifier = '';
        if (this.listConfig && this.listConfig.displayType == "TAB" /* TAB */) {
            for (let index = 0; index < this.listConfig.lists.length; index++) {
                if (this.listHeaders[index].title == tabTitle) {
                    tabIdentifier = this.listConfig.lists[index].identifier;
                    break;
                }
            }
        }
        return tabIdentifier;
    }
    setListHeaders() {
        if (this.listConfig.lists) {
            for (let index = 0; index < this.listConfig.lists.length; index++) {
                this.listHeaders.push(this.listConfig.lists[index].header);
                // this.listConfig.lists[index].header = "";
            }
        }
    }
    setCrudHeader() {
        let title = "";
        if (this.header) {
            title = this.header.title;
        }
        if (this.listConfig.lists && this.listConfig.lists.length == 1 && this.listConfig.lists[0].header && this.listConfig.lists[0].header.title) {
            title = this.listConfig.lists[0].header.title;
            this.listConfig.lists[0].header.title = "";
        }
        this.title = title;
    }
    displaySearchForm() {
        if (this.listConfig && this.listConfig.lists && this.listConfig.lists.length > 0) {
            for (let lConfig of this.listConfig.lists) {
                if (lConfig.listType == "DYNAMIC" /* DYNAMIC */ && this.searchConfig) {
                    this.showSearchForm = true;
                    break;
                }
            }
        }
    }
    setSearchButton(identifier, label, icon) {
        return {
            identifier: identifier,
            label: label,
            color: "primary" /* PRIMARY */,
            size: "small" /* SMALL */,
            icon: icon,
            type: "GHOST" /* GHOST */,
            onlyIcon: true,
        };
    }
    setSelectedFilterButton(identifier, label) {
        return {
            identifier: identifier,
            groupIdentifier: "clearFilterField" /* CLEAR_FILTER_FIELD */,
            label: label,
            color: "primary" /* PRIMARY */,
            size: "tiny" /* TINY */,
            icon: "close",
            iconPosition: "RIGHT" /* RIGHT */,
            type: "STROKED" /* STROKED */,
        };
    }
    close() {
        this.sidenav.close();
    }
    fieldChange(fieldChange) {
        console.log(fieldChange);
        this.onFieldChange.emit(fieldChange);
    }
    formChange(form) {
        this.onFormChange.emit(form);
    }
    buttonClick(event) {
        console.log(event);
        this.onButtonClick.emit(event);
    }
    buttonIconClick(event) {
        this.onButtonIconClick.emit(event);
    }
    onSort(event) {
        console.log(event);
        this.onSortClick.emit(event);
    }
    onPage(event) {
        console.log(event);
        this.onPageClick.emit(event);
    }
    onAccordianChange(event) {
        console.log(event);
    }
    onTabChange(event) {
        console.log(event);
        this.setConfigAsPerTab(this.getTabIdentifier(event.tab.textLabel));
    }
    openBottomSheet() {
        let dialogRef = this._bottomSheet.open(BottomSearchSheet, {
            data: { searchConfig: this.searchConfig, searchData: this.searchData, reset: this.formReset },
        });
        this.buttonSubscriber = dialogRef.instance.onButtonClick.subscribe(event => this.buttonClick(event));
        this.fieldSubscriber = dialogRef.instance.onFieldChange.subscribe(event => this.fieldChange(event));
        this.formSubscriber = dialogRef.instance.onFormChange.subscribe(event => this.formChange(event));
        this.dialogRefSubscriber = dialogRef.afterDismissed().subscribe(() => {
            this.bottomUnsubscribe();
        });
    }
    ngOnDestroy() {
        this.bottomUnsubscribe();
        if (this.dialogRefSubscriber) {
            this.dialogRefSubscriber.unsubscribe();
        }
    }
    bottomUnsubscribe() {
        if (this.buttonSubscriber) {
            this.buttonSubscriber.unsubscribe();
        }
        if (this.fieldSubscriber) {
            this.fieldSubscriber.unsubscribe();
        }
        if (this.formSubscriber) {
            this.formSubscriber.unsubscribe();
        }
    }
}
CrudListComponent.decorators = [
    { type: Component, args: [{
                selector: 'mx-crud-list',
                template: "<mat-card \n  [style.padding.px]=\"listConfig && listConfig.style && listConfig.style.hideCard ? 0 : 'auto'\"\n  class=\"mx-crud-card\"\n  *ngIf=\"listConfig && (listConfig.permission == null || (listConfig.permission && (listConfig.permission['subject'] | can: listConfig.permission['action'])))\">\n  <mx-crud-header\n    [identifier]=\"identifier\"\n    [title]=\"title\"\n    [subtitle]=\"header.subtitle\"\n    [description]=\"header.description\"\n    [style]=\"listConfig.style\"\n    [badges]=\"badges\"\n    [icon]=\"header.icon\"\n    [pageBackRoute]=\"pageBackRoute\"\n    [formDisplayMode]=\"'CRUD_LIST'\"\n    [actions]=\"actions\" \n    [context]=\"records\"\n    [originalData]=\"_configData.originalData\"  \n    [style.width.%]=\"100\"\n    (onButtonClick)=\"buttonClick($event)\"\n  ></mx-crud-header>\n\n  <mat-card-content>  \n    <div \n      [style.margin]=\"listConfig && listConfig.style && listConfig.style.hideCard ? '0px 16px' : 'auto'\"\n      class=\"mdc-layout-grid mx-crud-header-desc\" \n      *ngIf=\"header.description && header.description.text\">\n      <div class=\"mdc-layout-grid__inner\">\n          <div class=\"mdc-layout-grid__cell--span-12\">\n              <div \n              [ngClass]=\"{'mx-crud-header-desc-without-bg': !header.description.bgColor, 'mx-crud-header-desc-with-bg': header.description.bgColor}\"\n              [style.background-color]=\"header.description.bgColor\"\n              [style.color]=\"header.description.textColor\"\n                  >\n                  <mat-icon class=\"mx-crud-header-desc-icon\" aria-hidden=\"true\" [attr.aria-label]=\"header.description.icon\" *ngIf=\"header.description.icon\">{{header.description.icon}}</mat-icon>\n                  <span>{{ header.description.text }}</span>\n              </div>\n          </div>\n      </div>\n    </div>\n    <!-- <mx-error></mx-error> -->\n    <div class=\"mdc-layout-grid mx-crud-body\">\n      <div class=\"mdc-layout-grid__inner\">\n        <div class=\"mdc-layout-grid__cell--span-12\" *ngIf=\"quickLinks && quickLinks.length > 0\">\n          <span class=\"mx-quicklinks\">\n            <mx-button-group\n              [buttons]=\"quickLinks\"\n              [sourceIdentifier]=\"identifier\"\n              [sourceIndex]=\"'0'\"\n              [context]=\"records\"\n              [originalData]=\"configData.originalData\"  \n              (onClick)=\"buttonClick($event)\"\n            ></mx-button-group>\n          </span>  \n        </div>\n      </div>\n      <div class=\"mdc-layout-grid__inner mx-crud-search-inline\" *ngIf=\"showSearchForm\">\n        <div class=\"mdc-layout-grid__cell--span-12\">\n          <ng-container *ngTemplateOutlet=\"cfsearchlayout\"></ng-container>\n        </div>\n      </div>\n\n      <div class=\"mdc-layout-grid__inner mx-crud-list\" *ngIf=\"listConfig.customPlugin && listConfig.customPlugin.placement == 'ABOVE' && listConfig.customPlugin.component\">\n        <div class=\"mdc-layout-grid__cell--span-12\">\n          <!-- <ndc-dynamic\n            [ndcDynamicComponent]=\"listConfig.customPlugin.component\"\n          ></ndc-dynamic> -->\n        </div>\n      </div>\n\n      <div class=\"mdc-layout-grid__inner mx-crud-list\">\n        <div class=\"mdc-layout-grid__cell--span-12\">\n          <ng-container *ngTemplateOutlet=\"cftablegroup\"></ng-container>\n        </div>\n      </div>\n      \n      <div class=\"mdc-layout-grid__inner mx-crud-list\" *ngIf=\"listConfig.customPlugin && listConfig.customPlugin.placement == 'BELOW' && listConfig.customPlugin.component\">\n        <div class=\"mdc-layout-grid__cell--span-12\">\n          <!-- <ndc-dynamic\n            [ndcDynamicComponent]=\"listConfig.customPlugin.component\"\n          ></ndc-dynamic> -->\n        </div>\n      </div>\n    </div>\n  </mat-card-content>\n</mat-card>\n\n<ng-template #cfsearchlayout>\n  <span *ngIf=\"searchConfig.displayType == 'ABOVE_LIST'\">\n    <ng-container *ngTemplateOutlet=\"cfsearch\"></ng-container>\n  </span>\n  <span class=\"\" *ngIf=\"searchConfig.displayType == 'LEFT_MODAL' || searchConfig.displayType == 'RIGHT_MODAL'\">\n    <!-- <mat-sidenav-container (backdropClick)=\"close('backdrop')\"> -->\n    <!-- <span class=\"mx-crud-search-strip-modal\"> -->\n      1<span class=\"mx-crud-search-modal\">\n        <mat-sidenav-content #searchSideNav>\n          <mx-button\n            [sourceIdentifier]=\"identifier\"\n            [sourceIndex]=\"'0'\"\n            [button]=\"searchButton\"\n            [context]=\"records\"\n            [originalData]=\"configData.originalData\"  \n            (onClick)=\"sidenav.open()\"\n          ></mx-button>\n\n          <span class=\"mx-crud-search-applied\">\n            <span class=\"mx-crud-search-label\" *ngIf=\"searchOnFieldsCount == null || searchOnFieldsCount == 0\">Apply Filter</span>\n            <span class=\"mx-crud-search-label\" *ngIf=\"searchOnFieldsCount && searchOnFieldsCount > 0\">Filters (<strong>{{ searchOnFieldsCount }}</strong>)</span>\n            <!-- {{searchOnFieldsButtons | json}} -->\n            <mx-button-group \n              [buttons]=\"searchOnFieldsButtons\" \n              [formDisplayMode]=\"'ADD'\"\n              [sourceIdentifier]=\"'searchFields'\"\n              [sourceIndex]=\"0\" \n              [widgetArrayIndex]=\"0\"\n              [originalData]=\"searchData\"\n              (onIconClick)=\"buttonIconClick\"\n            >\n            </mx-button-group>\n            <!-- <span *ngFor=\"let fButton of searchOnFieldsButtons\">\n              <mx-button\n                [sourceIdentifier]=\"fButton.identifier\"\n                [sourceIndex]=\"'0'\"\n                [button]=\"fButton\"\n              ></mx-button>\n            </span> -->\n          </span>\n        </mat-sidenav-content>\n      </span>\n    <!-- </span> -->\n\n    <mat-sidenav #sidenav [position]=\"searchConfig.displayType == 'LEFT_MODAL' ? 'start': 'end'\" (keydown.escape)=\"close()\" (backdropClick)=\"close()\" [disableClose]=\"false\">\n      <div class=\"mdc-layout-grid mx-crud-search-modal\">\n        <!-- <div class=\"mdc-layout-grid__inner\">\n          <div class=\"mdc-layout-grid__cell--span-12 mdc-layout-grid--align-right\">\n            <mx-button\n              [sourceIdentifier]=\"identifier\"\n              [sourceIndex]=\"'0'\"\n              [button]=\"searchModalButton\"\n              align = \"right\"\n              (onClick)=\"close()\"\n            ></mx-button>\n          </div>\n        </div> -->\n        <div class=\"mdc-layout-grid__inner\">\n          <div class=\"mdc-layout-grid__cell--span-12\">\n            <ng-container *ngTemplateOutlet=\"cfsearch\"></ng-container>\n          </div>\n        </div>\n      </div>\n    </mat-sidenav>\n  </span>\n  <span *ngIf=\"searchConfig.displayType == 'BOTTOM_MODAL'\">\n    <mx-button\n      [sourceIdentifier]=\"identifier\"\n      [sourceIndex]=\"'0'\"\n      [button]=\"searchButton\"\n      (onClick)=\"openBottomSheet()\"\n    ></mx-button>\n  </span>\n</ng-template>\n\n<ng-template #cfsearch>\n  <span>\n    <!-- {{searchData | json}}-- -->\n    <mx-form\n      [formConfig]=\"searchConfig.form\"\n      [sourceIndex]=\"'0'\"\n      [reset]=\"formReset\"\n      [record]=\"searchData\"\n      [keyMap]=\"keyMap\"\n      class=\"mx-crud-search\"\n      (onFieldChange)=\"fieldChange($event)\"\n      (onFormChange)=\"formChange($event)\"\n      (onButtonClick)=\"buttonClick($event)\"\n    ></mx-form>\n  </span>\n</ng-template>\n\n<ng-template #cftablegroup>\n  <span *ngIf=\"(listConfig.lists.length == 1) || (listConfig.lists.length > 1 && listConfig.displayType == 'LIST')\">\n    <span *ngFor=\"let lConfig of listConfig.lists\">\n      <ng-container *ngTemplateOutlet=\"cftable; context: {lConfig: lConfig, rIndex: 0}\"></ng-container>\n    </span>\n  </span>\n\n  <span *ngIf=\"listConfig.lists.length > 1 && listConfig.displayType == 'TAB'\">\n    <mat-tab-group (selectedTabChange)=\"onTabChange($event)\">\n      <mat-tab \n        *ngFor=\"let lConfig of listConfig.lists; let rIndex=index\"\n        [label]=\"listHeaders[rIndex].title\">\n        <ng-container *ngTemplateOutlet=\"cftable; context: {lConfig: lConfig, rIndex: rIndex}\"></ng-container>\n      </mat-tab>\n    </mat-tab-group>\n  </span>\n\n  <span class=\"mx-crud-list-accordian\" *ngIf=\"listConfig.lists.length > 1 && listConfig.displayType == 'ACCORDIAN'\">\n    <mat-accordion>\n      <mat-expansion-panel\n        *ngFor=\"let lConfig of listConfig.lists; let rIndex=index\"\n        [expanded]=\"rIndex === 0\"\n        (opened)=\"onAccordianChange(rIndex)\"> \n        <mat-expansion-panel-header>\n          <mat-panel-title>\n            {{listHeaders[rIndex].title}}\n          </mat-panel-title>\n        </mat-expansion-panel-header>\n        <ng-container *ngTemplateOutlet=\"cftable; context: {lConfig: lConfig, rIndex: rIndex}\"></ng-container>\n      </mat-expansion-panel>\n    </mat-accordion>\n  </span>\n</ng-template>\n\n<ng-template #cftable let-lConfig=\"lConfig\" let-rIndex=\"rIndex\">\n  <!-- <pre>\n    {{records | json}}\n    {{lConfig | json}}\n    CRUD _listReset: {{listReset}}<br/>\n  </pre> -->\n  <mx-static-list\n    *ngIf=\"lConfig.listType == 'STATIC'\"\n    [listConfig]=\"lConfig\"\n    [sourceIdentifier]=\"identifier\"\n    [sourceIndex]=\"rIndex\"\n    [record]=\"records && records[rIndex] ? records[rIndex] : []\"\n    [originalData]=\"configData.originalData\"  \n    [listReset]=\"listReset\"\n    [expanded]=\"_expanded\"\n    [expandRowIndex]=\"expandRowIndex\"\n    [keyMap]=\"keyMap\"\n    (onFormChange)=\"formChange($event)\"\n    (onFieldChange)=\"fieldChange($event)\"\n    (onButtonClick)=\"buttonClick($event)\"\n    (onPageChange)=\"onPage($event)\"\n    (onSortChange)=\"onSort($event)\"  \n  ></mx-static-list>  \n\n  <mx-dynamic-list\n    *ngIf=\"lConfig.listType == 'DYNAMIC'\"\n    [listConfig]=\"lConfig\"\n    [sourceIdentifier]=\"identifier\"\n    [sourceIndex]=\"rIndex\"\n    [record]=\"records && records[rIndex] ? records[rIndex] : []\"\n    [originalData]=\"configData.originalData\"  \n    [listReset]=\"listReset\"\n    [expanded]=\"_expanded\"\n    [expandRowIndex]=\"expandRowIndex\"\n    [keyMap]=\"keyMap\"\n    (onFormChange)=\"formChange($event)\"\n    (onFieldChange)=\"fieldChange($event)\"\n    (onButtonClick)=\"buttonClick($event)\"\n    (onPageChange)=\"onPage($event)\"\n    (onSortChange)=\"onSort($event)\"  \n  ></mx-dynamic-list>\n</ng-template>",
                styles: [".mx-crud-card{background-color:transparent}.mx-crud-search-strip-modal{padding:0 0 0 8px}.mx-list-search-btn{text-align:right}.mx-crud-search-applied{color:rgba(0,0,0,.54);font-size:12px}.mx-crud-search-applied .mx-crud-search-label{padding-right:8px}.mdc-layout-grid{padding-left:0!important;padding-right:0!important}.mx-crud-search-modal{padding-bottom:0!important;padding-right:8px;padding-top:0!important}.mx-crud-search-modal mat-sidenav-content{margin-left:0!important}.mx-crud-list{padding-bottom:20px!important;padding-top:10px!important}::ng-deep .mat-expansion-panel-header{padding:0 16px!important}::ng-deep .mat-expansion-panel-body{padding:0!important}.mx-crud-header-desc{margin-left:5px;padding:0}.mx-crud-header-desc-without-bg{padding:10px 0;width:auto}.mx-crud-header-desc-with-bg{padding:10px;width:auto}.mx-crud-header-desc-icon{font-size:15px;height:15px!important;margin-top:0;padding:0 5px 0 0;width:15px!important}.mx-crud-body{padding:0}"]
            },] }
];
CrudListComponent.ctorParameters = () => [
    { type: MatBottomSheet },
    { type: Ability }
];
CrudListComponent.propDecorators = {
    identifier: [{ type: Input }],
    header: [{ type: Input }],
    actions: [{ type: Input }],
    actionPages: [{ type: Input }],
    quickLinks: [{ type: Input }],
    searchConfig: [{ type: Input }],
    listConfig: [{ type: Input }],
    formReset: [{ type: Input }],
    originalData: [{ type: Input }],
    _configData: [{ type: Input }],
    configData: [{ type: Input }],
    keyMap: [{ type: Input }],
    listReset: [{ type: Input }],
    expanded: [{ type: Input }],
    expandRowIndex: [{ type: Input }],
    onFormChange: [{ type: Output }],
    onFieldChange: [{ type: Output }],
    onButtonClick: [{ type: Output }],
    onButtonIconClick: [{ type: Output }],
    onSortClick: [{ type: Output }],
    onPageClick: [{ type: Output }],
    onTabClick: [{ type: Output }],
    sidenav: [{ type: ViewChild, args: ['sidenav',] }]
};
export class BottomSearchSheet {
    constructor(_bottomSheetRef, data) {
        this._bottomSheetRef = _bottomSheetRef;
        this.data = data;
        this.onFormChange = new EventEmitter();
        this.onFieldChange = new EventEmitter();
        this.onButtonClick = new EventEmitter();
        console.log(this.data);
    }
    openLink(event) {
        this._bottomSheetRef.dismiss();
        event.preventDefault();
    }
    fieldChange(fieldChange) {
        this.onFieldChange.emit(fieldChange);
    }
    formChange(form) {
        this.onFormChange.emit(form);
    }
    buttonClick(event) {
        console.log(event);
        this.onButtonClick.emit(event);
    }
}
BottomSearchSheet.decorators = [
    { type: Component, args: [{
                selector: 'bottom-search-sheet',
                template: "<span class=\"mx-crud-bottom-search\" *ngIf=\"data\">\n  <mx-form\n    [formConfig]=\"data.searchConfig.form\"\n    [sourceIndex]=\"'0'\"\n    [record]=\"data.searchData\"\n    [reset]=\"data.reset\"\n    (onFieldChange)=\"fieldChange($event)\"\n    (onFormChange)=\"formChange($event)\"\n    (onButtonClick)=\"buttonClick($event)\"\n  ></mx-form>\n</span>",
                styles: [".mx-crud-bottom-search>.mat-bottom-sheet-container{padding:0!important}mat-sidenav-content{margin-left:16px}"]
            },] }
];
BottomSearchSheet.ctorParameters = () => [
    { type: MatBottomSheetRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_BOTTOM_SHEET_DATA,] }] }
];
BottomSearchSheet.propDecorators = {
    onFieldChange: [{ type: Output }],
    onButtonClick: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J1ZC1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvbml0aW5raGFpdGFuL05pdGluL3N0dWR5L2FuZ3VsYXIvbWF0ZXJpYWwvYWRtaW4tYnVpbGRlci1wbHVnaW4vcHJvamVjdHMvbmd4LW1hdGVyaWFsLXdpZGdldC9zcmMvIiwic291cmNlcyI6WyJsaWIvY3J1ZC9jb21wb25lbnQvY3J1ZC1saXN0L2NydWQtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBSzdHLE9BQU8sRUFBRSxPQUFPLEVBQVcsTUFBTSxlQUFlLENBQUM7QUFHakQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBTzlFLE1BQU0sT0FBTyxpQkFBaUI7SUFpRTVCLFlBQW9CLFlBQTRCLEVBQVUsT0FBZ0I7UUFBdEQsaUJBQVksR0FBWixZQUFZLENBQWdCO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQXRDMUUsY0FBUyxHQUFZLEtBQUssQ0FBQztRQVdqQixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbEMsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ25DLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNuQyxzQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXZDLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNqQyxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFFLENB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O1FBRzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3hCLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBaUI7UUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMvQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELFdBQVcsQ0FBQyxXQUF3QjtRQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQVM7UUFDbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFVO1FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQzs7O1lBOUJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixnWEFBdUM7O2FBRXhDOzs7WUFsU1EsaUJBQWlCOzRDQXdTb0QsTUFBTSxTQUFDLHFCQUFxQjs7OzRCQUh2RyxNQUFNOzRCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBWaWV3Q2hpbGQsIEluamVjdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWNvcmQsIExpc3RUeXBlLCBMaXN0SGVhZGVyIH0gZnJvbSAnLi4vLi4vLi4vbGlzdC9tb2RlbCc7XG5pbXBvcnQgeyBCdXR0b24sIEhvdmVyQnV0dG9uLCBCdXR0b25Hcm91cCwgQnV0dG9uQ29sb3IsIEJ1dHRvblR5cGUsIEJ1dHRvblNpemUsIEJhZGdlLCBJY29uUG9zaXRpb24sIEFjdGlvbiwgUmVzZXJ2ZWRCdXR0b24gfSBmcm9tICcuLi8uLi8uLi9idXR0b24vbW9kZWwnO1xuaW1wb3J0IHsgS2V5TWFwLCBGaWVsZENoYW5nZSB9IGZyb20gJy4uLy4uLy4uL2ZpZWxkL21vZGVsJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQWJpbGl0eSwgUmF3UnVsZSB9IGZyb20gJ0BjYXNsL2FiaWxpdHknO1xuaW1wb3J0IHsgQ3J1ZEhlYWRlciwgQ3J1ZExpc3QsIENydWRTZWFyY2gsIFNlYXJjaERpc3BsYXlUeXBlLCBBY3Rpb25QYWdlLCBDcnVkTGlzdERhdGEsIENydWRMaXN0VGFiRGF0YSwgQ3J1ZExpc3REaXNwbGF5VHlwZSwgQ3J1ZFN0eWxlIH0gZnJvbSAnLi4vLi4vbW9kZWwnO1xuaW1wb3J0IHsgTWF0U2lkZW5hdiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NpZGVuYXYnO1xuaW1wb3J0IHsgTWF0Qm90dG9tU2hlZXRSZWYsIE1hdEJvdHRvbVNoZWV0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYm90dG9tLXNoZWV0JztcbmltcG9ydCB7IE1BVF9CT1RUT01fU0hFRVRfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2JvdHRvbS1zaGVldCc7XG5pbXBvcnQgeyBBYmlsaXR5VXRpbHMsIFN0cmluZ1V0aWxzLCBDb2xsZWN0aW9uVXRpbHMgfSBmcm9tICcuLi8uLi8uLi91dGlsaXR5JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbXgtY3J1ZC1saXN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NydWQtbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NydWQtbGlzdC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIENydWRMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBpZGVudGlmaWVyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGhlYWRlcjogQ3J1ZEhlYWRlcjtcbiAgQElucHV0KCkgYWN0aW9uczogQXJyYXk8QnV0dG9uIHwgSG92ZXJCdXR0b24gfCBCdXR0b25Hcm91cD47XG4gIEBJbnB1dCgpIGFjdGlvblBhZ2VzOiBBcnJheTxBY3Rpb25QYWdlPjtcblxuICBASW5wdXQoKSBxdWlja0xpbmtzOiBBcnJheTxCdXR0b24gfCBIb3ZlckJ1dHRvbiB8IEJ1dHRvbkdyb3VwPjtcbiAgQElucHV0KCkgc2VhcmNoQ29uZmlnOiBDcnVkU2VhcmNoO1xuICBASW5wdXQoKSBsaXN0Q29uZmlnOiBDcnVkTGlzdDtcblxuICBASW5wdXQoKSBmb3JtUmVzZXQ6IGJvb2xlYW47XG5cbiAgQElucHV0KCkgb3JpZ2luYWxEYXRhOiBhbnk7XG4gIEBJbnB1dCgpIF9jb25maWdEYXRhOiBDcnVkTGlzdERhdGE7XG4gIGdldCBjb25maWdEYXRhKCk6IENydWRMaXN0RGF0YSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZ0RhdGE7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGNvbmZpZ0RhdGEoX2NvbmZpZ0RhdGE6IENydWRMaXN0RGF0YSkge1xuICAgIHRoaXMuX2NvbmZpZ0RhdGEgPSBfY29uZmlnRGF0YTtcbiAgICB0aGlzLnNldENvbmZpZ0FzUGVyVGFiKCk7XG4gIH1cblxuICBASW5wdXQoKSBrZXlNYXA6IEFycmF5PEtleU1hcD47XG5cbiAgQElucHV0KCkgbGlzdFJlc2V0OiBib29sZWFuO1xuXG4gIF9leHBhbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXQgZXhwYW5kZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2V4cGFuZGVkO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBleHBhbmRlZChfZXhwYW5kZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9leHBhbmRlZCA9IF9leHBhbmRlZDtcbiAgfVxuICBASW5wdXQoKVxuICBleHBhbmRSb3dJbmRleDogbnVtYmVyO1xuXG4gIEBPdXRwdXQoKSBvbkZvcm1DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkZpZWxkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25CdXR0b25DbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uQnV0dG9uSWNvbkNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBPdXRwdXQoKSBvblNvcnRDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uUGFnZUNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25UYWJDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICB0aXRsZTogc3RyaW5nO1xuICBzaG93U2VhcmNoRm9ybTogYm9vbGVhbiA9IGZhbHNlO1xuICBzZWFyY2hCdXR0b246IEJ1dHRvbjtcbiAgc2VhcmNoTW9kYWxCdXR0b246IEJ1dHRvbjtcbiAgbGlzdEhlYWRlcnM6IEFycmF5PExpc3RIZWFkZXI+ID0gbmV3IEFycmF5PExpc3RIZWFkZXI+KCk7XG5cbiAgYmFkZ2VzOiBBcnJheTxCYWRnZT47XG4gIHBhZ2VCYWNrUm91dGU6IEFycmF5PHN0cmluZz47XG4gIHJlY29yZHM6IEFycmF5PFJlY29yZD47XG4gIHNlYXJjaERhdGE6IGFueTtcbiAgc2VhcmNoT25GaWVsZHNDb3VudDogbnVtYmVyID0gMDtcbiAgc2VhcmNoT25GaWVsZHNCdXR0b25zOiBBcnJheTxCdXR0b24+ID0gbmV3IEFycmF5PEJ1dHRvbj4oKTtcblxuICBidXR0b25TdWJzY3JpYmVyOiBTdWJzY3JpcHRpb247XG4gIGZpZWxkU3Vic2NyaWJlcjogU3Vic2NyaXB0aW9uO1xuICBmb3JtU3Vic2NyaWJlcjogU3Vic2NyaXB0aW9uO1xuICBkaWFsb2dSZWZTdWJzY3JpYmVyOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfYm90dG9tU2hlZXQ6IE1hdEJvdHRvbVNoZWV0LCBwcml2YXRlIGFiaWxpdHk6IEFiaWxpdHkpIHtcbiAgICBBYmlsaXR5VXRpbHMuc2V0QWJpbGl0eSh0aGlzLmFiaWxpdHkpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zZWFyY2hCdXR0b24gPSB0aGlzLnNldFNlYXJjaEJ1dHRvbignc2VhcmNoQnV0dG9uJywgJ1NlYXJjaCcsICdzZWFyY2gnKTtcbiAgICB0aGlzLnNlYXJjaE1vZGFsQnV0dG9uID0gdGhpcy5zZXRTZWFyY2hCdXR0b24oJ3NlYXJjaENsb3NlQnV0dG9uJywgJ0Nsb3NlJywgJ2Nsb3NlJyk7XG4gICAgdGhpcy5kaXNwbGF5U2VhcmNoRm9ybSgpO1xuXG4gICAgdGhpcy5zZXRMaXN0SGVhZGVycygpO1xuICAgIHRoaXMuc2V0Q3J1ZEhlYWRlcigpO1xuXG4gICAgaWYgKHRoaXMuc2VhcmNoQ29uZmlnICYmIHRoaXMuc2VhcmNoQ29uZmlnLmRpc3BsYXlUeXBlICE9IFNlYXJjaERpc3BsYXlUeXBlLkFCT1ZFX0xJU1QpIHtcbiAgICAgIHRoaXMuc2VhcmNoQ29uZmlnLmZvcm0uZGlzcGxheUluQ29sdW1ucyA9IDE7XG4gICAgfVxuICAgIHRoaXMuc2V0Q29uZmlnQXNQZXJUYWIoKTsgXG4gIH1cblxuICBzZXRDb25maWdBc1BlclRhYih0YWJJZGVudGlmaWVyPzogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2NvbmZpZ0RhdGEpIHtcbiAgICAgIHRoaXMuYmFkZ2VzID0gdGhpcy5fY29uZmlnRGF0YS5iYWRnZXM7XG4gICAgICB0aGlzLnBhZ2VCYWNrUm91dGUgPSB0aGlzLl9jb25maWdEYXRhLnBhZ2VCYWNrUm91dGU7XG5cbiAgICAgIHRoaXMucmVjb3JkcyA9IHRoaXMuX2NvbmZpZ0RhdGEucmVjb3JkcztcblxuICAgICAgdGhpcy5zZWFyY2hEYXRhID0gdGhpcy5fY29uZmlnRGF0YS5zZWFyY2hEYXRhO1xuXG4gICAgICB0aGlzLnNlYXJjaE9uRmllbGRzQ291bnQgPSAwO1xuICAgICAgdGhpcy5zZWFyY2hPbkZpZWxkc0J1dHRvbnMgPSBuZXcgQXJyYXk8QnV0dG9uIHwgQnV0dG9uR3JvdXA+KCk7XG4gICAgICBpZiAodGhpcy5zZWFyY2hEYXRhICYmICFDb2xsZWN0aW9uVXRpbHMuaXNFbXB0eSh0aGlzLnNlYXJjaERhdGEpKSB7XG4gICAgICAgIGZvciAobGV0IGNudCA9IDA7IGNudCA8IE9iamVjdC5rZXlzKHRoaXMuc2VhcmNoRGF0YSkubGVuZ3RoOyBjbnQrKykge1xuICAgICAgICAgIGlmICghU3RyaW5nVXRpbHMuaXNFbXB0eSh0aGlzLnNlYXJjaERhdGFbT2JqZWN0LmtleXModGhpcy5zZWFyY2hEYXRhKVtjbnRdXSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoT25GaWVsZHNDb3VudCsrOyBcblxuICAgICAgICAgICAgbGV0IGZpbHRlckJ1dHRvbjogQnV0dG9uIHwgQnV0dG9uR3JvdXAgPSB0aGlzLnNldFNlbGVjdGVkRmlsdGVyQnV0dG9uKE9iamVjdC5rZXlzKHRoaXMuc2VhcmNoRGF0YSlbY250XSwgdGhpcy5zZWFyY2hEYXRhW09iamVjdC5rZXlzKHRoaXMuc2VhcmNoRGF0YSlbY250XV0pO1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hPbkZpZWxkc0J1dHRvbnMucHVzaChmaWx0ZXJCdXR0b24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fY29uZmlnRGF0YS5jb25maWdQZXJUYWJzKSB7XG4gICAgICAgIGxldCB0YWJJbmRleCA9IDA7XG4gICAgICAgIHRoaXMuX2NvbmZpZ0RhdGEuY29uZmlnUGVyVGFicy5mb3JFYWNoKCh0YWJDb25maWdEYXRhOiBDcnVkTGlzdFRhYkRhdGEsIHRhYktleTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgaWYgKCh0YWJLZXkgPT0gdGFiSWRlbnRpZmllciB8fCAodGFiSW5kZXggPT0gMCAmJiB0YWJJZGVudGlmaWVyID09IG51bGwpKSAmJiB0YWJDb25maWdEYXRhKSB7XG4gICAgICAgICAgICBpZiAodGFiQ29uZmlnRGF0YS5iYWRnZXMpIHtcbiAgICAgICAgICAgICAgdGhpcy5iYWRnZXMgPSB0YWJDb25maWdEYXRhLmJhZGdlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0YWJDb25maWdEYXRhLnBhZ2VCYWNrUm91dGUpIHtcbiAgICAgICAgICAgICAgdGhpcy5wYWdlQmFja1JvdXRlID0gdGFiQ29uZmlnRGF0YS5wYWdlQmFja1JvdXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRhYkNvbmZpZ0RhdGEucmVjb3JkcyAmJiB0YWJDb25maWdEYXRhLnJlY29yZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICB0aGlzLnJlY29yZHMgPSB0aGlzLl9jb25maWdEYXRhLnJlY29yZHM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHRhYkluZGV4Kys7XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0VGFiSWRlbnRpZmllcih0YWJUaXRsZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgdGFiSWRlbnRpZmllciA9ICcnO1xuICAgIGlmICh0aGlzLmxpc3RDb25maWcgJiYgdGhpcy5saXN0Q29uZmlnLmRpc3BsYXlUeXBlID09IENydWRMaXN0RGlzcGxheVR5cGUuVEFCKSB7XG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5saXN0Q29uZmlnLmxpc3RzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBpZiAodGhpcy5saXN0SGVhZGVyc1tpbmRleF0udGl0bGUgPT0gdGFiVGl0bGUpIHtcbiAgICAgICAgICB0YWJJZGVudGlmaWVyID0gdGhpcy5saXN0Q29uZmlnLmxpc3RzW2luZGV4XS5pZGVudGlmaWVyO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhYklkZW50aWZpZXI7XG4gIH1cblxuICBzZXRMaXN0SGVhZGVycygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5saXN0Q29uZmlnLmxpc3RzKSB7XG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5saXN0Q29uZmlnLmxpc3RzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICB0aGlzLmxpc3RIZWFkZXJzLnB1c2godGhpcy5saXN0Q29uZmlnLmxpc3RzW2luZGV4XS5oZWFkZXIpO1xuICAgICAgICAvLyB0aGlzLmxpc3RDb25maWcubGlzdHNbaW5kZXhdLmhlYWRlciA9IFwiXCI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0Q3J1ZEhlYWRlcigpOiB2b2lkIHtcbiAgICBsZXQgdGl0bGUgPSBcIlwiO1xuXG4gICAgaWYgKHRoaXMuaGVhZGVyKSB7XG4gICAgICB0aXRsZSA9IHRoaXMuaGVhZGVyLnRpdGxlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmxpc3RDb25maWcubGlzdHMgJiYgdGhpcy5saXN0Q29uZmlnLmxpc3RzLmxlbmd0aCA9PSAxICYmIHRoaXMubGlzdENvbmZpZy5saXN0c1swXS5oZWFkZXIgJiYgdGhpcy5saXN0Q29uZmlnLmxpc3RzWzBdLmhlYWRlci50aXRsZSkge1xuICAgICAgdGl0bGUgPSB0aGlzLmxpc3RDb25maWcubGlzdHNbMF0uaGVhZGVyLnRpdGxlO1xuXG4gICAgICB0aGlzLmxpc3RDb25maWcubGlzdHNbMF0uaGVhZGVyLnRpdGxlID0gXCJcIjtcbiAgICB9XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICB9XG5cbiAgZGlzcGxheVNlYXJjaEZvcm0oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubGlzdENvbmZpZyAmJiB0aGlzLmxpc3RDb25maWcubGlzdHMgJiYgdGhpcy5saXN0Q29uZmlnLmxpc3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IGxDb25maWcgb2YgdGhpcy5saXN0Q29uZmlnLmxpc3RzKSB7XG4gICAgICAgIGlmIChsQ29uZmlnLmxpc3RUeXBlID09IExpc3RUeXBlLkRZTkFNSUMgJiYgdGhpcy5zZWFyY2hDb25maWcpIHtcbiAgICAgICAgICB0aGlzLnNob3dTZWFyY2hGb3JtID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldFNlYXJjaEJ1dHRvbihpZGVudGlmaWVyOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcsIGljb246IHN0cmluZyk6IEJ1dHRvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICBsYWJlbDogbGFiZWwsXG4gICAgICBjb2xvcjogQnV0dG9uQ29sb3IuUFJJTUFSWSxcbiAgICAgIHNpemU6IEJ1dHRvblNpemUuU01BTEwsXG4gICAgICBpY29uOiBpY29uLFxuICAgICAgdHlwZTogQnV0dG9uVHlwZS5HSE9TVCxcbiAgICAgIG9ubHlJY29uOiB0cnVlLFxuICAgIH07XG4gIH1cblxuICBzZXRTZWxlY3RlZEZpbHRlckJ1dHRvbihpZGVudGlmaWVyOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcpOiBCdXR0b24gfCBCdXR0b25Hcm91cCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICBncm91cElkZW50aWZpZXI6IFJlc2VydmVkQnV0dG9uLkNMRUFSX0ZJTFRFUl9GSUVMRCxcbiAgICAgIGxhYmVsOiBsYWJlbCxcbiAgICAgIGNvbG9yOiBCdXR0b25Db2xvci5QUklNQVJZLFxuICAgICAgc2l6ZTogQnV0dG9uU2l6ZS5USU5ZLFxuICAgICAgaWNvbjogXCJjbG9zZVwiLFxuICAgICAgaWNvblBvc2l0aW9uOiBJY29uUG9zaXRpb24uUklHSFQsXG4gICAgICB0eXBlOiBCdXR0b25UeXBlLlNUUk9LRUQsXG4gICAgfTtcbiAgfVxuXG4gIEBWaWV3Q2hpbGQoJ3NpZGVuYXYnKSBzaWRlbmF2OiBNYXRTaWRlbmF2O1xuICBjbG9zZSgpIHtcbiAgICB0aGlzLnNpZGVuYXYuY2xvc2UoKTtcbiAgfVxuXG5cbiAgZmllbGRDaGFuZ2UoZmllbGRDaGFuZ2U6IEZpZWxkQ2hhbmdlKSB7XG4gICAgY29uc29sZS5sb2coZmllbGRDaGFuZ2UpO1xuICAgIHRoaXMub25GaWVsZENoYW5nZS5lbWl0KGZpZWxkQ2hhbmdlKTtcbiAgfVxuXG4gIGZvcm1DaGFuZ2UoZm9ybTogYW55KSB7XG4gICAgdGhpcy5vbkZvcm1DaGFuZ2UuZW1pdChmb3JtKTtcbiAgfVxuXG4gIGJ1dHRvbkNsaWNrKGV2ZW50OiBhbnkpIHtcbiAgICBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgdGhpcy5vbkJ1dHRvbkNsaWNrLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgYnV0dG9uSWNvbkNsaWNrKGV2ZW50OiBhbnkpICB7XG4gICAgdGhpcy5vbkJ1dHRvbkljb25DbGljay5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIG9uU29ydChldmVudDogYW55KSB7XG4gICAgY29uc29sZS5sb2coZXZlbnQpO1xuICAgIHRoaXMub25Tb3J0Q2xpY2suZW1pdChldmVudCk7XG4gIH1cblxuICBvblBhZ2UoZXZlbnQ6IGFueSkge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICB0aGlzLm9uUGFnZUNsaWNrLmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgb25BY2NvcmRpYW5DaGFuZ2UoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhldmVudCk7XG4gIH1cblxuICBvblRhYkNoYW5nZShldmVudDogYW55KSB7XG4gICAgY29uc29sZS5sb2coZXZlbnQpO1xuXG4gICAgdGhpcy5zZXRDb25maWdBc1BlclRhYih0aGlzLmdldFRhYklkZW50aWZpZXIoZXZlbnQudGFiLnRleHRMYWJlbCkpO1xuICB9XG5cbiAgb3BlbkJvdHRvbVNoZWV0KCk6IHZvaWQge1xuICAgIGxldCBkaWFsb2dSZWYgPSB0aGlzLl9ib3R0b21TaGVldC5vcGVuKEJvdHRvbVNlYXJjaFNoZWV0LCB7XG4gICAgICBkYXRhOiB7IHNlYXJjaENvbmZpZzogdGhpcy5zZWFyY2hDb25maWcsIHNlYXJjaERhdGE6IHRoaXMuc2VhcmNoRGF0YSwgcmVzZXQ6IHRoaXMuZm9ybVJlc2V0IH0sXG4gICAgfSk7XG5cbiAgICB0aGlzLmJ1dHRvblN1YnNjcmliZXIgPSBkaWFsb2dSZWYuaW5zdGFuY2Uub25CdXR0b25DbGljay5zdWJzY3JpYmUoZXZlbnQgPT4gdGhpcy5idXR0b25DbGljayhldmVudCkpO1xuICAgIHRoaXMuZmllbGRTdWJzY3JpYmVyID0gZGlhbG9nUmVmLmluc3RhbmNlLm9uRmllbGRDaGFuZ2Uuc3Vic2NyaWJlKGV2ZW50ID0+IHRoaXMuZmllbGRDaGFuZ2UoZXZlbnQpKTtcbiAgICB0aGlzLmZvcm1TdWJzY3JpYmVyID0gZGlhbG9nUmVmLmluc3RhbmNlLm9uRm9ybUNoYW5nZS5zdWJzY3JpYmUoZXZlbnQgPT4gdGhpcy5mb3JtQ2hhbmdlKGV2ZW50KSk7XG5cbiAgICB0aGlzLmRpYWxvZ1JlZlN1YnNjcmliZXIgPSBkaWFsb2dSZWYuYWZ0ZXJEaXNtaXNzZWQoKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgdGhpcy5ib3R0b21VbnN1YnNjcmliZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5ib3R0b21VbnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLmRpYWxvZ1JlZlN1YnNjcmliZXIpIHtcbiAgICAgIHRoaXMuZGlhbG9nUmVmU3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIGJvdHRvbVVuc3Vic2NyaWJlKCkge1xuICAgIGlmICh0aGlzLmJ1dHRvblN1YnNjcmliZXIpIHtcbiAgICAgIHRoaXMuYnV0dG9uU3Vic2NyaWJlci51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5maWVsZFN1YnNjcmliZXIpIHtcbiAgICAgIHRoaXMuZmllbGRTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmZvcm1TdWJzY3JpYmVyKSB7XG4gICAgICB0aGlzLmZvcm1TdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2JvdHRvbS1zZWFyY2gtc2hlZXQnLFxuICB0ZW1wbGF0ZVVybDogJ2JvdHRvbS1zZWFyY2gtc2hlZXQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2JvdHRvbS1zZWFyY2gtc2hlZXQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEJvdHRvbVNlYXJjaFNoZWV0IHtcbiAgb25Gb3JtQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25GaWVsZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uQnV0dG9uQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfYm90dG9tU2hlZXRSZWY6IE1hdEJvdHRvbVNoZWV0UmVmPEJvdHRvbVNlYXJjaFNoZWV0PiwgQEluamVjdChNQVRfQk9UVE9NX1NIRUVUX0RBVEEpIHB1YmxpYyBkYXRhOiBhbnkpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEpXG4gIH1cblxuICBvcGVuTGluayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuX2JvdHRvbVNoZWV0UmVmLmRpc21pc3MoKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgZmllbGRDaGFuZ2UoZmllbGRDaGFuZ2U6IEZpZWxkQ2hhbmdlKSB7XG4gICAgdGhpcy5vbkZpZWxkQ2hhbmdlLmVtaXQoZmllbGRDaGFuZ2UpO1xuICB9XG5cbiAgZm9ybUNoYW5nZShmb3JtOiBhbnkpIHtcbiAgICB0aGlzLm9uRm9ybUNoYW5nZS5lbWl0KGZvcm0pO1xuICB9XG5cbiAgYnV0dG9uQ2xpY2soZXZlbnQ6IGFueSkge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICB0aGlzLm9uQnV0dG9uQ2xpY2suZW1pdChldmVudCk7XG4gIH1cblxufSJdfQ==