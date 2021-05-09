import { Component, Input, EventEmitter, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FieldUtils, FormUtils, CollectionUtils, StringUtils, KeyMapUtils, ListUtils } from '../../utility';
import { SelectionModel } from '@angular/cdk/collections';
import { Ability } from '@casl/ability';
import { AbilityUtils, ButtonUtils } from '../../utility';
export class ListComponent {
    constructor(ability, breakpointObserver) {
        this.ability = ability;
        this.breakpointObserver = breakpointObserver;
        this.onFormChange = new EventEmitter();
        this.onFieldChange = new EventEmitter();
        this.onButtonClick = new EventEmitter();
        this.onPageChange = new EventEmitter();
        this.onSortChange = new EventEmitter();
        this._expanded = false;
        this.dataSource = new MatTableDataSource();
        this.cellCount = 12;
        this.isCustomTemplate = false;
        this.displayVertical = false;
        this.formIndex = -1;
        this.inlineEditButtons = new Array();
        this.hasDisplayActions = false;
        this.isInlineEditable = false;
        this.inlineButtonSize = "default" /* DEFAULT */;
        this.childRows = new Map();
        this.displayModes = new Array();
        this.columnNames = new Array();
        this.columnConfigs = new Array();
        this.selection = new SelectionModel(true, []);
        this.hideCard = false;
        this.hideHeader = false;
        this.hideFooter = false;
        this.pageSizeOptions = [5, 10, 25, 100];
        this.rowCount = 0;
        this.limit = 0;
        this.rowColors = new Array();
        this.cellColors = new Array();
        this.showCard = false;
        this.selectableAdded = false;
        this.sortDirection = 'asc';
        this.tooltipPosition = { 'top': 0, 'left': 0 };
        AbilityUtils.setAbility(this.ability);
    }
    get listConfig() {
        return this._listConfig;
    }
    set listConfig(_listConfig) {
        this._listConfig = _listConfig;
        this.setColumnNames();
        this.setDetailColumnCount();
        this.setCardVisibility();
    }
    get record() {
        return this._record;
    }
    set record(_record) {
        // console.log("-------------->")
        // console.log(_record);
        // console.log(this._record);
        // console.log("<--------------")
        if (!this.parent || (this.parent && JSON.stringify(_record) != JSON.stringify(this._record))) {
            this._record = _record;
            this.init();
            this.setCardVisibility();
            this.showRowEditable();
        }
    }
    get listReset() {
        return this._listReset;
    }
    set listReset(_listReset) {
        this._listReset = _listReset;
        if (this._listReset) {
            this.resetInlineEditButton('inlineEditButton', 'Edit', 'edit');
        }
    }
    get expanded() {
        return this._expanded;
    }
    set expanded(_expanded) {
        this._expanded = _expanded;
    }
    set contentPage(pagination) {
        this.dataSource.paginator = pagination;
    }
    set contentSort(sort) {
        this.dataSource.sort = sort;
    }
    ngOnInit() {
    }
    init() {
        this.getLayout();
        this.setPageSize();
        if (this._record === undefined) {
            this._record = { total: 10, pageNo: 1, rows: [] };
        }
        if (this._record && this._record.rows) {
            if (this._record.rows.length != this.rowCount || this._record.rows.length == 0) {
                this._record.rows = [...this._record.rows];
                this.dataSource.data = this._record.rows;
            }
        }
        this.resetInlineEditButton('inlineEditButton', 'Edit', 'edit');
        this.populateAllChilds();
        this.showRowEditable();
        this.initCommonFormGroup();
        this.setColors();
        this.setIconPosition();
        this.setFilterBar();
        this.setCustomTemplate();
        ListUtils.setCustomLayouts(this.listConfig);
    }
    setCustomTemplate() {
        // let hasCustomColumn: boolean = false;
        //  check if we have column template
        // if (!CollectionUtils.isEmpty(this._listConfig?.columns))  {
        //   this._listConfig?.columns.forEach(column => {
        //     if (column.template && column.template.layout) {
        //       hasCustomColumn = true;
        //     }
        //   });
        // }
        var _a, _b, _c;
        if (((_c = (_b = (_a = this._listConfig) === null || _a === void 0 ? void 0 : _a.row) === null || _b === void 0 ? void 0 : _b.template) === null || _c === void 0 ? void 0 : _c.layout) && !(this.isMobile && this._listConfig.mobile && this._listConfig.mobile.rowHeight)) {
            this.isCustomTemplate = true;
        }
    }
    sticky() {
        let header1 = document.querySelectorAll(".mat-toolbar");
        let header = document.getElementById("mxMobileSearchStrip");
        if (header) {
            let sticky = header.offsetTop;
            if (window.pageYOffset > sticky) {
                header.classList.add("sticky");
                header1.forEach((el) => {
                    el.classList.add("sticky-header");
                });
            }
            else {
                header.classList.remove("sticky");
                header1.forEach((el) => {
                    el.classList.remove("sticky-header");
                });
            }
        }
    }
    onScrolled(event) {
    }
    setFilterBar() {
        if (!this._listConfig.staticList) {
            this._listConfig.staticList = {};
        }
        if (this._listConfig.staticList.hasOnPageFilter && !this._listConfig.hasColumnSelection) {
            this.contentFilterColumnSpan = 12;
        }
        if (!this._listConfig.staticList.hasOnPageFilter && this._listConfig.hasColumnSelection) {
            this.columnSelectionColumnSpan = 12;
        }
    }
    setPageSize() {
        if (this._listConfig.pagination == "ALL" /* ALL */) {
            this.limit = this._record && this._record.rows ? this._record.rows.length : 10;
        }
        else {
            if (this._listConfig.pageSize) {
                this.limit = this._listConfig.pageSize;
            }
        }
    }
    setIconPosition() {
        this.iconPosition = "BEFORE_TITLE" /* BEFORE_TITLE */;
        if (this._listConfig.header && this._listConfig.header.icon && this._listConfig.header.icon.position) {
            this.iconPosition = this._listConfig.header.icon.position;
        }
    }
    getFilterField() {
        this.filterField = {
            key: "pageFilter",
            label: "Filter",
            type: "TEXT" /* TEXT */,
            icon: "search",
            appearance: "STANDARD" /* STANDARD */,
            isReadOnly: false,
            fieldDisplayType: "INLINE" /* INLINE */,
            placeholder: "Type to display filtered list",
            value: ""
        };
        return this.filterField;
    }
    getColumnSelectorField() {
        this.columnSelectorField = ListUtils.getColumnSelectorField(this._listConfig);
        return this.columnSelectorField;
    }
    updateColumnDisplay(event) {
        console.log(event);
        for (let column of this._listConfig.columns) {
            if (event.value.indexOf(ListUtils.getColumnKey(column)) > -1) {
                column.show = true;
            }
            else {
                column.show = false;
            }
        }
        this.setColumnNames();
        this.setDetailColumnCount();
    }
    inlinEditButton(identifier, label, icon) {
        let buttonConfig = {
            identifier: identifier,
            type: "FLAT" /* FLAT */,
            label: label,
            color: "primary" /* PRIMARY */,
            size: "small" /* SMALL */,
            icon: icon,
            onlyIcon: false
        };
        return buttonConfig;
    }
    getColumnLabel(column) {
        return ListUtils.getColumnLabel(column);
    }
    getColumnKey(column) {
        return ListUtils.getColumnKey(column);
    }
    resetInlineEditButton(identifier, label, icon) {
        for (let cIndex = 0; cIndex < this.columnConfigs.length; cIndex++) {
            if (!CollectionUtils.isEmpty(this._listConfig.actions)) {
                for (let action of this._listConfig.actions) {
                    if (action.permission == null || (this.ability.can(action.permission['action'], action.permission['subject']))) {
                        this.hasDisplayActions = true;
                        break;
                    }
                }
            }
            if (this.hasDisplayActions) {
                for (let field of this.columnConfigs[cIndex].fields) {
                    if (FieldUtils.readOnlyField().indexOf(field.type) > -1) { }
                    else {
                        this.isInlineEditable = true;
                        break;
                    }
                }
            }
        }
        this.inlineEditButtons = new Array();
        if (this._record && this._record.rows) {
            for (let index = 0; index < this._record.rows.length; index++) {
                this.inlineEditButtons.push(this.inlinEditButton(identifier, label, icon));
                this.displayModes[index] = "VIEW" /* VIEW */;
            }
        }
        this.formIndex = -1;
        this.setColumnNames();
    }
    showRowEditable() {
        if (!CollectionUtils.isEmpty(this._listConfig.actions)) {
            this.inlineButtonSize = this._listConfig.actions[0].size;
        }
        if (this._record && this._record.rows) {
            for (let index = 0; index < this._record.rows.length; index++) {
                if (this._record.rows[index]['showRowEditable']) {
                    this.setRowEditablity(index);
                }
            }
        }
    }
    setRowEditablity(index) {
        if (this.formIndex != -1 && this.formIndex != index) {
            this.inlineEditButtons[this.formIndex].identifier = 'inlineEditButton';
            this.inlineEditButtons[this.formIndex].label = 'Edit';
            this.inlineEditButtons[this.formIndex].icon = 'edit';
            this.inlineEditButtons[this.formIndex].size = this.inlineButtonSize;
            this.formIndex = -1;
        }
        if (this.inlineEditButtons[index] && this.inlineEditButtons[index].label == 'Edit') {
            this.inlineEditButtons[index].identifier = 'cancelInlineStaticList';
            this.inlineEditButtons[index].label = 'Cancel';
            this.inlineEditButtons[index].icon = 'close';
            this.inlineEditButtons[index].size = this.inlineButtonSize;
            if (this._record && this._record.rows) {
                for (let rIndex = 0; rIndex < this._record.rows.length; rIndex++) {
                    this.displayModes[rIndex] = "VIEW" /* VIEW */;
                    if (rIndex != index) {
                        this.inlineEditButtons[rIndex].identifier = 'inlineEditButton';
                        this.inlineEditButtons[rIndex].label = 'Edit';
                        this.inlineEditButtons[rIndex].icon = 'edit';
                        this.inlineEditButtons[rIndex].size = this.inlineButtonSize;
                    }
                }
                if (this._record.rows[index]['formDisplayMode']) {
                    this.displayModes[index] = this._record.rows[index]['formDisplayMode'];
                }
                else {
                    this.displayModes[index] = "EDIT" /* EDIT */;
                }
            }
            this.initFormGroup(index);
            this.formIndex = index;
            this._listReset = false;
        }
        else {
            this.inlineEditButtons[index].identifier = 'inlineEditButton';
            this.inlineEditButtons[index].label = 'Edit';
            this.inlineEditButtons[index].icon = 'edit';
            this.inlineEditButtons[index].size = this.inlineButtonSize;
            this.formIndex = -1;
        }
        let inlineButtonTemp = this.inlineEditButtons[index];
        this.inlineEditButtons[index] = undefined;
        setTimeout(() => this.inlineEditButtons[index] = inlineButtonTemp, 100);
    }
    populateAllChilds() {
        if (this._record && this._record.rows && this._record.rows.length > 0) {
            for (let rIndex = 0; rIndex < this._record.rows.length; rIndex++) {
                this.childRows[rIndex] = this.getChildRows(this._record.rows[rIndex]);
            }
        }
    }
    getChildRows(row) {
        if (this._listConfig && this._listConfig.child && row) {
            let data = this._listConfig.child.recordIdentifier ? row[this._listConfig.child.recordIdentifier] : row;
            if (this._listConfig.child.type == "LIST" /* LIST */) {
                if (data) {
                    let childData;
                    if (data instanceof Array) {
                        childData = data;
                    }
                    else {
                        childData = new Array();
                        childData.push(data);
                    }
                    let record = {
                        pageNo: 1,
                        total: childData.length,
                        rows: childData
                    };
                    return record;
                }
            }
            else {
                return data;
            }
        }
    }
    getValue(colIndex, cFieldIndex, row, value) {
        try {
            value = eval("row." + this.columnConfigs[colIndex].fields[cFieldIndex].key);
        }
        catch (e) { }
        return value;
    }
    updateFilter(field) {
        const filterValue = field.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
    initFormGroup(cnt) {
        let fieldControls = {};
        let row = this.getCurrentRecord(cnt);
        KeyMapUtils.setOptionssUsingValues(this.keyMap, false, "LIST" /* LIST */, this._listConfig, row);
        for (let column of this.columnConfigs) {
            for (let field of column.fields) {
                let formField = { field: field, addMore: false };
                if (this._listConfig.uniqueKeys && this._listConfig.uniqueKeys.indexOf(formField.field.key) > -1) {
                    formField.field.isUnique = true;
                }
                FormUtils.initFieldGroup(fieldControls, formField, null, row, this.displayModes[cnt]);
            }
        }
        this.form = new FormGroup(fieldControls);
        this.formIndex = cnt;
    }
    initCommonFormGroup() {
        let commonFieldControls = {};
        FormUtils.initFieldGroup(commonFieldControls, { field: this.getFilterField(), addMore: false }, {}, {}, "EDIT" /* EDIT */);
        FormUtils.initFieldGroup(commonFieldControls, { field: this.getColumnSelectorField(), addMore: false }, {}, {}, "EDIT" /* EDIT */);
        this.commonListForm = new FormGroup(commonFieldControls);
    }
    getCurrentRecord(cnt) {
        let record = {};
        if (this.dataSource && this.dataSource['_renderData'] && this.dataSource['_renderData']['_value'] && this.dataSource['_renderData']['_value'][cnt]) {
            record = this.dataSource['_renderData']['_value'][cnt];
        }
        else if (this._record && this._record['rows'] && this._record['rows'][cnt]) {
            record = this._record['rows'][cnt];
        }
        return record;
    }
    getObjectTree(currentRow) {
        if (this._listConfig && this._listConfig.uniqueKeys && this._listConfig.uniqueKeys.length > 0) {
            let keys = this._listConfig.uniqueKeys;
            let values = new Array();
            keys.forEach(key => values.push(currentRow[key]));
            let objectTree = {
                parent: {
                    key: values
                }
            };
            if (this.parent) {
                objectTree.hierarchyUp = JSON.parse(JSON.stringify(this.parent));
            }
            return objectTree;
        }
        else {
            return null;
        }
    }
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }
    /** The label for the checkbox on the passed row */
    checkboxLabel(row) {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }
    setCardVisibility() {
        this.hideCard = false;
        if (this._listConfig.hideCard || (this._listConfig.hideHeader && this._listConfig.hideFooter)) {
            this.hideCard = true;
        }
        if (this.hideCard == false) {
            if (this._record && this._record.rows && this._record.rows.length == this._record.total && (StringUtils.isEmpty(this._listConfig.header) && !this._listConfig.description)) {
                this.hideCard = true;
            }
        }
        this.hideHeader = false;
        if (((this._listConfig.header && StringUtils.isEmpty(this._listConfig.header.title)) && StringUtils.isEmpty(this._listConfig.description)) || this._listConfig.hideHeader) {
            this.hideHeader = true;
        }
        this.hideFooter = false;
        if ((this._record && this._record.rows && this._record.rows.length == this._record.total) || this._listConfig.hideFooter) {
            this.hideFooter = true;
        }
    }
    setColumnNames() {
        this.columnNames = new Array();
        this.columnConfigs = new Array();
        this.totalDispalyableWidth = 0;
        if (this._listConfig.selectable) {
            this.columnNames.push('select');
            if (!this._listConfig.header) {
                this._listConfig.header = { title: "" };
            }
            if (!this._listConfig.header || CollectionUtils.isEmpty(this._listConfig.header.actions)) {
                this._listConfig.header.actions = new Array();
            }
            let selectableExist = false;
            // for (let button of this._listConfig.header.actions) { 
            //   if ((<Button>button).identifier == "listCrudSelectionButton") {
            //     selectableExist = true;
            //   }
            // }
            // if (!selectableExist) {
            //   this._listConfig.header.actions.unshift(this.selectableButton("listCrudSelectionButton", this._listConfig.selectable.label, this._listConfig.selectable.icon))
            // } 
            if (!this.selectableAdded) {
                this._listConfig.header.actions.unshift(...this._listConfig.selectable);
                this.selectableAdded = true;
            }
        }
        if (this._listConfig.columns && this._listConfig.columns.length > 0) {
            this._listConfig.columns.filter(column => column.show == true).forEach(column => {
                let hasDisplayableField = false;
                for (let field of column.fields) {
                    if (field.permission == null || this.ability.can(field.permission['action'], field.permission['subject'])) {
                        hasDisplayableField = true;
                    }
                }
                if (hasDisplayableField) {
                    this.columnNames.push(ListUtils.getColumnKey(column));
                    this.columnConfigs.push(column);
                    this.totalDispalyableWidth += column.width;
                }
            });
        }
        if (this.hasDisplayActions) {
            this.columnNames.push('action');
            this.totalDispalyableWidth += this._listConfig.actionWidth;
        }
    }
    setDetailColumnCount() {
        this.childColumnCount = this.columnConfigs.length + (this._listConfig.actions && this._listConfig.actions.length > 0 ? 1 : 0) + (this._listConfig.selectable ? 1 : 0);
    }
    setColors() {
        if (this._record && this._record.rows) {
            for (let rIndex = 0; rIndex < this._record.rows.length; rIndex++) {
                if (CollectionUtils.isEmpty(this.rowColors[rIndex])) {
                    this.rowColors.push({ bgColor: "", textColor: "" });
                }
                let rowColor = this.rowColors[rIndex];
                if (this._listConfig.rowBgColor) {
                    rowColor.bgColor = this._listConfig.rowBgColor(this._record.rows[rIndex]);
                }
                if (this._listConfig.rowTextColor) {
                    rowColor.textColor = this._listConfig.rowTextColor(this._record.rows[rIndex]);
                }
                for (let cIndex = 0; cIndex < this.columnConfigs.length; cIndex++) {
                    if (CollectionUtils.isEmpty(this.cellColors[rIndex])) {
                        this.cellColors.push(new Array());
                    }
                    if (CollectionUtils.isEmpty(this.cellColors[rIndex][cIndex])) {
                        this.cellColors[rIndex][cIndex] = { bgColor: "", textColor: "" };
                    }
                    let cellColor = this.cellColors[rIndex][cIndex];
                    if (StringUtils.isEmpty(cellColor.bgColor)) {
                        cellColor.bgColor = rowColor.bgColor;
                    }
                    if (this.columnConfigs[cIndex].bgColor) {
                        cellColor.bgColor = this.columnConfigs[cIndex].bgColor(this._record.rows[rIndex]);
                    }
                    if (StringUtils.isEmpty(cellColor.textColor)) {
                        cellColor.textColor = rowColor.textColor;
                    }
                    if (this.columnConfigs[cIndex].textColor) {
                        cellColor.textColor = this.columnConfigs[cIndex].textColor(this._record.rows[rIndex]);
                    }
                }
            }
        }
    }
    selectableButton(identifier, label, icon) {
        return {
            identifier: identifier,
            label: label,
            color: "primary" /* PRIMARY */,
            size: "small" /* SMALL */,
            icon: icon,
            type: "FLAT" /* FLAT */,
            onlyIcon: false
        };
    }
    fieldChange(fieldChange) {
        console.log(fieldChange);
        this.onFieldChange.emit(fieldChange);
        this.formChange(this.form);
        //  if a field options are dependent on me, then reload its options 
        fieldChange.fieldKey;
        this._listConfig.columns.forEach(column => {
            column.fields.forEach(field => {
                if (field.optionDependsOn == fieldChange.fieldKey) {
                    let row = FormUtils.getRawValue(this.form);
                    //let row = this.getCurrentRecord(fieldChange.sourceIndex);
                    KeyMapUtils.setOptionssUsingValues(this.keyMap, false, "LIST" /* LIST */, this._listConfig, row);
                }
            });
        });
    }
    formChange(form) {
        console.log(form);
        if (form == undefined) {
            this.onFormChange.emit(this.form);
        }
        else {
            this.onFormChange.emit(form);
        }
    }
    buttonClick(action) {
        console.log(action);
        if (!CollectionUtils.isEmpty(this._listConfig.selectable)) {
            this._listConfig.selectable.forEach(selectButton => {
                if (action.action == selectButton.identifier) {
                    action.data = this.selection.selected;
                }
            });
        }
        if (action.action == "row_expand" /* ROW_EXPAND */ || action.action == "row_collapse" /* ROW_COLLAPSE */) {
        }
        else {
            action.event.stopPropagation();
        }
        this.onButtonClick.emit(action);
    }
    getLayout() {
        this.breakpointSubscription = this.breakpointObserver.observe([
            Breakpoints.XSmall,
            Breakpoints.Small,
            Breakpoints.Medium,
            Breakpoints.Large,
            Breakpoints.XLarge
        ]).subscribe((state) => {
            if (state.breakpoints[Breakpoints.XSmall]) {
                this.isMobile = true;
                this.cellCount = this.listConfig.mobile && this.listConfig.mobile.cellCount ? this.listConfig.mobile.cellCount : 4;
                this.hideCard = true;
                ListUtils.getMobileConfig(this.listConfig);
                console.log('Matches XSmall viewport');
            }
            if (state.breakpoints[Breakpoints.Small]) {
                this.isTablet = true;
                console.log('Matches Small viewport');
            }
            if (state.breakpoints[Breakpoints.Medium]) {
                this.isDesktop = true;
                console.log('Matches Medium  viewport');
            }
            if (state.breakpoints[Breakpoints.Large]) {
                this.isDesktop = true;
                console.log('Matches Large viewport');
            }
            if (state.breakpoints[Breakpoints.XLarge]) {
                this.isDesktop = true;
                console.log('Matches XLarge viewport');
            }
            this.setCustomTemplate();
            this.resetVerticalDisplay();
        });
    }
    rowClick(row, rowIndex, context, event) {
        console.log(row);
        console.log(rowIndex);
        console.log(context);
        let actionButton = null;
        if (!CollectionUtils.isEmpty(this._listConfig.actions)) {
            this._listConfig.actions.forEach(action => {
                if (action.identifier == this._listConfig.rowAction) {
                    actionButton = action;
                }
            });
            if (actionButton != null) {
                let actionObj = ButtonUtils.getAction(this._listConfig.identifier, rowIndex, this.widgetArrayIndex, actionButton.identifier, this.parent, event, row, context, null);
                this.onButtonClick.emit(actionObj);
            }
        }
    }
    resetVerticalDisplay() {
        // if (!this.isCustomTemplate && !(this.isMobile && this._listConfig.mobile && this._listConfig.mobile.rowHeight)) {
        if (this.isMobile && !(this._listConfig.mobile && this._listConfig.mobile.rowHeight) && !this.isCustomTemplate) {
            this.displayVertical = true;
        }
    }
    getButton(cell) {
        let buttons = new Array();
        if (!CollectionUtils.isEmpty(cell) && !CollectionUtils.isEmpty(cell.controls)) {
            buttons = cell.controls.filter(control => control.type == "BUTTON" /* BUTTON */).map(control => control.control);
        }
        return buttons;
    }
    onHover(event, rowIndex, row) {
        this.hoverRowData = row;
        this.hoverRowIndex = rowIndex;
        this.tooltipPosition.top = event.y;
        this.tooltipPosition.left = event.x;
    }
    ngOnDestroy() {
        if (this.breakpointSubscription) {
            this.breakpointSubscription.unsubscribe();
        }
    }
}
ListComponent.decorators = [
    { type: Component, args: [{
                selector: 'mx-list',
                template: "<p>list works!</p>\n",
                animations: [
                    trigger('detailExpand', [
                        state('collapsed', style({ height: '0px', minHeight: '0' })),
                        state('expanded', style({ height: '*' })),
                        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                    ]),
                ],
                encapsulation: ViewEncapsulation.None,
                styles: [""]
            },] }
];
ListComponent.ctorParameters = () => [
    { type: Ability },
    { type: BreakpointObserver }
];
ListComponent.propDecorators = {
    _listConfig: [{ type: Input }],
    listConfig: [{ type: Input }],
    _record: [{ type: Input }],
    record: [{ type: Input }],
    sourceIdentifier: [{ type: Input }],
    sourceIndex: [{ type: Input }],
    widgetArrayIndex: [{ type: Input }],
    originalData: [{ type: Input }],
    parent: [{ type: Input }],
    _listReset: [{ type: Input }],
    listReset: [{ type: Input }],
    disabled: [{ type: Input }],
    keyMap: [{ type: Input }],
    onFormChange: [{ type: Output }],
    onFieldChange: [{ type: Output }],
    onButtonClick: [{ type: Output }],
    onPageChange: [{ type: Output }],
    onSortChange: [{ type: Output }],
    expanded: [{ type: Input }],
    expandRowIndex: [{ type: Input }],
    contentPage: [{ type: ViewChild, args: [MatPaginator, { static: false },] }],
    contentSort: [{ type: ViewChild, args: [MatSort, { static: false },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL25pdGlua2hhaXRhbi9OaXRpbi9zdHVkeS9hbmd1bGFyL21hdGVyaWFsL2FkbWluLWJ1aWxkZXItcGx1Z2luL3Byb2plY3RzL25neC1tYXRlcmlhbC13aWRnZXQvc3JjLyIsInNvdXJjZXMiOlsibGliL2xpc3QvY29tcG9uZW50L2xpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4SCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFtQixNQUFNLHFCQUFxQixDQUFDO0FBTXZGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVHLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBZ0IxRCxNQUFNLE9BQU8sYUFBYTtJQTRIeEIsWUFBbUIs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SSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzNDO0lBQ0gsQ0FBQzs7O1lBN3pCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLGdDQUFvQztnQkFFcEMsVUFBVSxFQUFFO29CQUNWLE9BQU8sQ0FBQyxjQUFjLEVBQUU7d0JBQ3RCLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQzt3QkFDNUQsS0FBSyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQzt3QkFDekMsVUFBVSxDQUFDLHdCQUF3QixFQUFFLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO3FCQUN0RixDQUFDO2lCQUNIO2dCQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN0Qzs7O1lBaEJRLE9BQU87WUFiUCxrQkFBa0I7OzswQkErQnhCLEtBQUs7eUJBSUwsS0FBSztzQkFRTCxLQUFLO3FCQUlMLEtBQUs7K0JBZUwsS0FBSzswQkFDTCxLQUFLOytCQUNMLEtBQUs7MkJBQ0wsS0FBSztxQkFDTCxLQUFLO3lCQUNMLEtBQUs7d0JBSUwsS0FBSzt1QkFTTCxLQUFLO3FCQUNMLEtBQUs7MkJBQ0wsTUFBTTs0QkFDTixNQUFNOzRCQUNOLE1BQU07MkJBQ04sTUFBTTsyQkFDTixNQUFNO3VCQU1OLEtBQUs7NkJBS0wsS0FBSzswQkFLTCxTQUFTLFNBQUMsWUFBWSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTswQkFLekMsU0FBUyxTQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95LCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQnJlYWtwb2ludE9ic2VydmVyLCBCcmVha3BvaW50cywgQnJlYWtwb2ludFN0YXRlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2xheW91dCc7XG5cbmltcG9ydCB7IExpc3QsIFJlY29yZCwgUGFnaW5hdGlvblR5cGUsIENlbGxDb2xvciwgQ29sdW1uLCBDaGlsZExpc3RUeXBlLCBDdXN0b21MYXlvdXRDZWxsLCBDZWxsQ29udHJvbGxUeXBlLCBDZWxsQ29udHJvbCB9IGZyb20gJy4uL21vZGVsJztcbmltcG9ydCB7IE9iamVjdFRyZWUsIEJ1dHRvbiwgQnV0dG9uVHlwZSwgQnV0dG9uQ29sb3IsIEJ1dHRvblNpemUsIEFjdGlvbiwgUmVzZXJ2ZWRCdXR0b24gfSBmcm9tICcuLi8uLi9idXR0b24vbW9kZWwnO1xuaW1wb3J0IHsgS2V5TWFwLCBGaWVsZFR5cGUsIEZpZWxkQXBwZWFyYW5jZSwgRmllbGREaWFwbHlUeXBlLCBUZXh0RmllbGQsIERyb3Bkb3duT3B0aW9uLCBEcm9wZG93bkZpZWxkLCBGaWVsZENoYW5nZSwgS2V5TWFwT3B0aW9uVHlwZSwgQXV0b2NvbXBsZXRlRmllbGQsIFJhZGlvRmllbGQsIENoZWNrYm94RmllbGQgfSBmcm9tICcuLi8uLi9maWVsZC9tb2RlbCc7XG5pbXBvcnQgeyBGb3JtRGlhcGx5TW9kZSwgRm9ybUZpZWxkLCBGb3JtVGl0bGVJY29uUG9zaXRpb24gfSBmcm9tICcuLi8uLi9mb3JtL21vZGVsJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdFRhYmxlRGF0YVNvdXJjZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYmxlJztcbmltcG9ydCB7IE1hdFBhZ2luYXRvciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3BhZ2luYXRvcic7XG5pbXBvcnQgeyBNYXRTb3J0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc29ydCc7XG5pbXBvcnQgeyB0cmlnZ2VyLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIGFuaW1hdGUgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IEZpZWxkVXRpbHMsIEZvcm1VdGlscywgQ29sbGVjdGlvblV0aWxzLCBTdHJpbmdVdGlscywgS2V5TWFwVXRpbHMsIExpc3RVdGlscyB9IGZyb20gJy4uLy4uL3V0aWxpdHknO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgQWJpbGl0eSB9IGZyb20gJ0BjYXNsL2FiaWxpdHknO1xuaW1wb3J0IHsgQWJpbGl0eVV0aWxzLCBCdXR0b25VdGlscyB9IGZyb20gJy4uLy4uL3V0aWxpdHknO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ214LWxpc3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2xpc3QuY29tcG9uZW50LnNjc3MnXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2RldGFpbEV4cGFuZCcsIFtcbiAgICAgIHN0YXRlKCdjb2xsYXBzZWQnLCBzdHlsZSh7IGhlaWdodDogJzBweCcsIG1pbkhlaWdodDogJzAnIH0pKSxcbiAgICAgIHN0YXRlKCdleHBhbmRlZCcsIHN0eWxlKHsgaGVpZ2h0OiAnKicgfSkpLFxuICAgICAgdHJhbnNpdGlvbignZXhwYW5kZWQgPD0+IGNvbGxhcHNlZCcsIGFuaW1hdGUoJzIyNW1zIGN1YmljLWJlemllcigwLjQsIDAuMCwgMC4yLCAxKScpKSxcbiAgICBdKSxcbiAgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBfbGlzdENvbmZpZzogTGlzdDtcbiAgZ2V0IGxpc3RDb25maWcoKTogTGlzdCB7XG4gICAgcmV0dXJuIHRoaXMuX2xpc3RDb25maWc7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGxpc3RDb25maWcoX2xpc3RDb25maWc6IExpc3QpIHtcbiAgICB0aGlzLl9saXN0Q29uZmlnID0gX2xpc3RDb25maWc7XG4gICAgdGhpcy5zZXRDb2x1bW5OYW1lcygpO1xuICAgIHRoaXMuc2V0RGV0YWlsQ29sdW1uQ291bnQoKTtcbiAgICB0aGlzLnNldENhcmRWaXNpYmlsaXR5KCk7XG4gIH1cblxuICBASW5wdXQoKSBfcmVjb3JkOiBSZWNvcmQ7XG4gIGdldCByZWNvcmQoKTogUmVjb3JkIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjb3JkO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCByZWNvcmQoX3JlY29yZDogUmVjb3JkKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLT5cIilcbiAgICAvLyBjb25zb2xlLmxvZyhfcmVjb3JkKTtcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLl9yZWNvcmQpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiPC0tLS0tLS0tLS0tLS0tXCIpXG4gICAgaWYgKCF0aGlzLnBhcmVudCB8fCAodGhpcy5wYXJlbnQgJiYgSlNPTi5zdHJpbmdpZnkoX3JlY29yZCkgIT0gSlNPTi5zdHJpbmdpZnkodGhpcy5fcmVjb3JkKSkpIHtcbiAgICAgIHRoaXMuX3JlY29yZCA9IF9yZWNvcmQ7XG5cbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgdGhpcy5zZXRDYXJkVmlzaWJpbGl0eSgpO1xuICAgICAgdGhpcy5zaG93Um93RWRpdGFibGUoKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBzb3VyY2VJZGVudGlmaWVyOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNvdXJjZUluZGV4OiBudW1iZXI7XG4gIEBJbnB1dCgpIHdpZGdldEFycmF5SW5kZXg6IG51bWJlcjtcbiAgQElucHV0KCkgb3JpZ2luYWxEYXRhOiBhbnk7XG4gIEBJbnB1dCgpIHBhcmVudDogT2JqZWN0VHJlZTtcbiAgQElucHV0KCkgX2xpc3RSZXNldDogYm9vbGVhbjtcbiAgZ2V0IGxpc3RSZXNldCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbGlzdFJlc2V0O1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBsaXN0UmVzZXQoX2xpc3RSZXNldDogYm9vbGVhbikge1xuICAgIHRoaXMuX2xpc3RSZXNldCA9IF9saXN0UmVzZXQ7XG5cbiAgICBpZiAodGhpcy5fbGlzdFJlc2V0KSB7XG4gICAgICB0aGlzLnJlc2V0SW5saW5lRWRpdEJ1dHRvbignaW5saW5lRWRpdEJ1dHRvbicsICdFZGl0JywgJ2VkaXQnKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgQElucHV0KCkga2V5TWFwOiBBcnJheTxLZXlNYXA+O1xuICBAT3V0cHV0KCkgb25Gb3JtQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25GaWVsZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uQnV0dG9uQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvblBhZ2VDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvblNvcnRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgX2V4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGdldCBleHBhbmRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZXhwYW5kZWQ7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGV4cGFuZGVkKF9leHBhbmRlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX2V4cGFuZGVkID0gX2V4cGFuZGVkO1xuICB9XG5cbiAgQElucHV0KClcbiAgZXhwYW5kUm93SW5kZXg6IG51bWJlcjtcblxuICBkYXRhU291cmNlOiBNYXRUYWJsZURhdGFTb3VyY2U8YW55PiA9IG5ldyBNYXRUYWJsZURhdGFTb3VyY2UoKTtcblxuICBAVmlld0NoaWxkKE1hdFBhZ2luYXRvciwgeyBzdGF0aWM6IGZhbHNlIH0pIHNldCBjb250ZW50UGFnZShwYWdpbmF0aW9uOiBNYXRQYWdpbmF0b3IpIHtcbiAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yID0gcGFnaW5hdGlvbjtcbiAgfVxuXG5cbiAgQFZpZXdDaGlsZChNYXRTb3J0LCB7IHN0YXRpYzogZmFsc2UgfSkgc2V0IGNvbnRlbnRTb3J0KHNvcnQ6IE1hdFNvcnQpIHtcbiAgICB0aGlzLmRhdGFTb3VyY2Uuc29ydCA9IHNvcnQ7XG4gIH1cblxuICBjZWxsQ291bnQ6IG51bWJlciA9IDEyO1xuICBpc0N1c3RvbVRlbXBsYXRlOiBib29sZWFuID0gZmFsc2U7XG4gIGlzTW9iaWxlOiBib29sZWFuO1xuICBpc1RhYmxldDogYm9vbGVhbjtcbiAgaXNEZXNrdG9wOiBib29sZWFuO1xuICBkaXNwbGF5VmVydGljYWw6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBmb3JtOiBGb3JtR3JvdXA7XG4gIGNvbW1vbkxpc3RGb3JtOiBGb3JtR3JvdXA7XG4gIGZvcm1JbmRleDogbnVtYmVyID0gLTE7XG5cbiAgaW5saW5lRWRpdEJ1dHRvbnM6IEFycmF5PEJ1dHRvbj4gPSBuZXcgQXJyYXk8QnV0dG9uPigpO1xuICBoYXNEaXNwbGF5QWN0aW9uczogYm9vbGVhbiA9IGZhbHNlO1xuICBpc0lubGluZUVkaXRhYmxlOiBib29sZWFuID0gZmFsc2U7XG4gIGlubGluZUJ1dHRvblNpemU6IEJ1dHRvblNpemUgPSBCdXR0b25TaXplLkRFRkFVTFQ7XG4gIGNoaWxkUm93czogTWFwPG51bWJlciwgUmVjb3JkPiA9IG5ldyBNYXA8bnVtYmVyLCBSZWNvcmQ+KCk7XG4gIGNoaWxkQ29sdW1uQ291bnQ6IG51bWJlcjtcblxuICBkaXNwbGF5TW9kZXM6IEFycmF5PEZvcm1EaWFwbHlNb2RlPiA9IG5ldyBBcnJheTxGb3JtRGlhcGx5TW9kZT4oKTtcbiAgY29sdW1uTmFtZXM6IEFycmF5PHN0cmluZz4gPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xuICBjb2x1bW5Db25maWdzOiBBcnJheTxDb2x1bW4+ID0gbmV3IEFycmF5PENvbHVtbj4oKTtcbiAgdG90YWxEaXNwYWx5YWJsZVdpZHRoOiBudW1iZXI7XG5cbiAgc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbk1vZGVsPGFueT4odHJ1ZSwgW10pO1xuICBoaWRlQ2FyZDogYm9vbGVhbiA9IGZhbHNlO1xuICBoaWRlSGVhZGVyOiBib29sZWFuID0gZmFsc2U7XG4gIGhpZGVGb290ZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwYWdlU2l6ZU9wdGlvbnM6IEFycmF5PG51bWJlcj4gPSBbNSwgMTAsIDI1LCAxMDBdO1xuICByb3dDb3VudDogbnVtYmVyID0gMDtcbiAgbGltaXQ6IG51bWJlciA9IDA7XG4gIGV4cGFuZGVkUm93OiBhbnkgfCBudWxsO1xuICByb3dDb2xvcnM6IEFycmF5PENlbGxDb2xvcj4gPSBuZXcgQXJyYXk8Q2VsbENvbG9yPigpO1xuICBjZWxsQ29sb3JzOiBBcnJheTxBcnJheTxDZWxsQ29sb3I+PiA9IG5ldyBBcnJheTxBcnJheTxDZWxsQ29sb3I+PigpO1xuICBob3ZlclJvd0RhdGE6IGFueTtcbiAgaG92ZXJSb3dJbmRleDogbnVtYmVyO1xuXG4gIHNob3dDYXJkID0gZmFsc2U7XG4gIGljb25Qb3NpdGlvbjogRm9ybVRpdGxlSWNvblBvc2l0aW9uO1xuICBzZWxlY3RhYmxlQWRkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBicmVha3BvaW50U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IocHVibGljIGFiaWxpdHk6IEFiaWxpdHksIHB1YmxpYyBicmVha3BvaW50T2JzZXJ2ZXI6IEJyZWFrcG9pbnRPYnNlcnZlcikge1xuICAgIEFiaWxpdHlVdGlscy5zZXRBYmlsaXR5KHRoaXMuYWJpbGl0eSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5nZXRMYXlvdXQoKTtcblxuICAgIHRoaXMuc2V0UGFnZVNpemUoKTtcbiAgICBpZiAodGhpcy5fcmVjb3JkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX3JlY29yZCA9IHsgdG90YWw6IDEwLCBwYWdlTm86IDEsIHJvd3M6IFtdIH07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3JlY29yZCAmJiB0aGlzLl9yZWNvcmQucm93cykge1xuICAgICAgaWYgKHRoaXMuX3JlY29yZC5yb3dzLmxlbmd0aCAhPSB0aGlzLnJvd0NvdW50IHx8IHRoaXMuX3JlY29yZC5yb3dzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgIHRoaXMuX3JlY29yZC5yb3dzID0gWy4uLnRoaXMuX3JlY29yZC5yb3dzXTtcblxuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YSA9IHRoaXMuX3JlY29yZC5yb3dzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucmVzZXRJbmxpbmVFZGl0QnV0dG9uKCdpbmxpbmVFZGl0QnV0dG9uJywgJ0VkaXQnLCAnZWRpdCcpO1xuICAgIHRoaXMucG9wdWxhdGVBbGxDaGlsZHMoKTtcblxuICAgIHRoaXMuc2hvd1Jvd0VkaXRhYmxlKCk7XG4gICAgdGhpcy5pbml0Q29tbW9uRm9ybUdyb3VwKCk7XG4gICAgdGhpcy5zZXRDb2xvcnMoKTtcbiAgICB0aGlzLnNldEljb25Qb3NpdGlvbigpO1xuICAgIHRoaXMuc2V0RmlsdGVyQmFyKCk7XG4gICAgdGhpcy5zZXRDdXN0b21UZW1wbGF0ZSgpO1xuXG4gICAgTGlzdFV0aWxzLnNldEN1c3RvbUxheW91dHModGhpcy5saXN0Q29uZmlnKTtcbiAgfVxuXG4gIHNldEN1c3RvbVRlbXBsYXRlKCkge1xuICAgIC8vIGxldCBoYXNDdXN0b21Db2x1bW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvLyAgY2hlY2sgaWYgd2UgaGF2ZSBjb2x1bW4gdGVtcGxhdGVcbiAgICAvLyBpZiAoIUNvbGxlY3Rpb25VdGlscy5pc0VtcHR5KHRoaXMuX2xpc3RDb25maWc/LmNvbHVtbnMpKSAge1xuICAgIC8vICAgdGhpcy5fbGlzdENvbmZpZz8uY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgLy8gICAgIGlmIChjb2x1bW4udGVtcGxhdGUgJiYgY29sdW1uLnRlbXBsYXRlLmxheW91dCkge1xuICAgIC8vICAgICAgIGhhc0N1c3RvbUNvbHVtbiA9IHRydWU7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH0pO1xuICAgIC8vIH1cblxuICAgIGlmICh0aGlzLl9saXN0Q29uZmlnPy5yb3c/LnRlbXBsYXRlPy5sYXlvdXQgJiYgISh0aGlzLmlzTW9iaWxlICYmIHRoaXMuX2xpc3RDb25maWcubW9iaWxlICYmIHRoaXMuX2xpc3RDb25maWcubW9iaWxlLnJvd0hlaWdodCkpIHtcbiAgICAgIHRoaXMuaXNDdXN0b21UZW1wbGF0ZSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgc29ydERpcmVjdGlvbjogJ2FzYycgfCAnZGVzYycgfCAnJyA9ICdhc2MnO1xuICBzdGlja3koKSB7XG4gICAgbGV0IGhlYWRlcjEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1hdC10b29sYmFyXCIpO1xuICAgIGxldCBoZWFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm14TW9iaWxlU2VhcmNoU3RyaXBcIik7XG4gICAgaWYgKGhlYWRlcikge1xuICAgICAgbGV0IHN0aWNreSA9IGhlYWRlci5vZmZzZXRUb3A7XG4gICAgICBpZiAod2luZG93LnBhZ2VZT2Zmc2V0ID4gc3RpY2t5KSB7XG4gICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKFwic3RpY2t5XCIpO1xuXG4gICAgICAgIGhlYWRlcjEuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKFwic3RpY2t5LWhlYWRlclwiKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZShcInN0aWNreVwiKTtcbiAgICAgICAgaGVhZGVyMS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJzdGlja3ktaGVhZGVyXCIpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblNjcm9sbGVkKGV2ZW50KSB7XG4gIH1cblxuXG4gIGNvbnRlbnRGaWx0ZXJDb2x1bW5TcGFuOiBudW1iZXI7XG4gIGNvbHVtblNlbGVjdGlvbkNvbHVtblNwYW46IG51bWJlcjtcblxuICBzZXRGaWx0ZXJCYXIoKSB7XG4gICAgaWYgKCF0aGlzLl9saXN0Q29uZmlnLnN0YXRpY0xpc3QpIHtcbiAgICAgIHRoaXMuX2xpc3RDb25maWcuc3RhdGljTGlzdCA9IHt9O1xuICAgIH1cbiAgICBpZiAodGhpcy5fbGlzdENvbmZpZy5zdGF0aWNMaXN0Lmhhc09uUGFnZUZpbHRlciAmJiAhdGhpcy5fbGlzdENvbmZpZy5oYXNDb2x1bW5TZWxlY3Rpb24pIHtcbiAgICAgIHRoaXMuY29udGVudEZpbHRlckNvbHVtblNwYW4gPSAxMjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLl9saXN0Q29uZmlnLnN0YXRpY0xpc3QuaGFzT25QYWdlRmlsdGVyICYmIHRoaXMuX2xpc3RDb25maWcuaGFzQ29sdW1uU2VsZWN0aW9uKSB7XG4gICAgICB0aGlzLmNvbHVtblNlbGVjdGlvbkNvbHVtblNwYW4gPSAxMjtcbiAgICB9XG4gIH1cblxuICBzZXRQYWdlU2l6ZSgpIHtcbiAgICBpZiAodGhpcy5fbGlzdENvbmZpZy5wYWdpbmF0aW9uID09IFBhZ2luYXRpb25UeXBlLkFMTCkge1xuICAgICAgdGhpcy5saW1pdCA9IHRoaXMuX3JlY29yZCAmJiB0aGlzLl9yZWNvcmQucm93cyA/IHRoaXMuX3JlY29yZC5yb3dzLmxlbmd0aCA6IDEwO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5fbGlzdENvbmZpZy5wYWdlU2l6ZSkge1xuICAgICAgICB0aGlzLmxpbWl0ID0gdGhpcy5fbGlzdENvbmZpZy5wYWdlU2l6ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRJY29uUG9zaXRpb24oKSB7XG4gICAgdGhpcy5pY29uUG9zaXRpb24gPSBGb3JtVGl0bGVJY29uUG9zaXRpb24uQkVGT1JFX1RJVExFO1xuICAgIGlmICh0aGlzLl9saXN0Q29uZmlnLmhlYWRlciAmJiB0aGlzLl9saXN0Q29uZmlnLmhlYWRlci5pY29uICYmIHRoaXMuX2xpc3RDb25maWcuaGVhZGVyLmljb24ucG9zaXRpb24pIHtcbiAgICAgIHRoaXMuaWNvblBvc2l0aW9uID0gdGhpcy5fbGlzdENvbmZpZy5oZWFkZXIuaWNvbi5wb3NpdGlvbjtcbiAgICB9XG4gIH1cblxuICBmaWx0ZXJGaWVsZDogVGV4dEZpZWxkO1xuICBnZXRGaWx0ZXJGaWVsZCgpOiBUZXh0RmllbGQge1xuICAgIHRoaXMuZmlsdGVyRmllbGQgPSB7XG4gICAgICBrZXk6IFwicGFnZUZpbHRlclwiLFxuICAgICAgbGFiZWw6IFwiRmlsdGVyXCIsXG4gICAgICB0eXBlOiBGaWVsZFR5cGUuVEVYVCxcbiAgICAgIGljb246IFwic2VhcmNoXCIsXG4gICAgICBhcHBlYXJhbmNlOiBGaWVsZEFwcGVhcmFuY2UuU1RBTkRBUkQsXG4gICAgICBpc1JlYWRPbmx5OiBmYWxzZSxcbiAgICAgIGZpZWxkRGlzcGxheVR5cGU6IEZpZWxkRGlhcGx5VHlwZS5JTkxJTkUsXG4gICAgICBwbGFjZWhvbGRlcjogXCJUeXBlIHRvIGRpc3BsYXkgZmlsdGVyZWQgbGlzdFwiLFxuICAgICAgdmFsdWU6IFwiXCJcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyRmllbGQ7XG4gIH1cblxuICBjb2x1bW5TZWxlY3RvckZpZWxkOiBEcm9wZG93bkZpZWxkO1xuICBnZXRDb2x1bW5TZWxlY3RvckZpZWxkKCk6IERyb3Bkb3duRmllbGQge1xuICAgIHRoaXMuY29sdW1uU2VsZWN0b3JGaWVsZCA9IExpc3RVdGlscy5nZXRDb2x1bW5TZWxlY3RvckZpZWxkKHRoaXMuX2xpc3RDb25maWcpO1xuXG4gICAgcmV0dXJuIHRoaXMuY29sdW1uU2VsZWN0b3JGaWVsZDtcbiAgfVxuXG4gIHVwZGF0ZUNvbHVtbkRpc3BsYXkoZXZlbnQ6IGFueSkge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICBmb3IgKGxldCBjb2x1bW4gb2YgdGhpcy5fbGlzdENvbmZpZy5jb2x1bW5zKSB7XG4gICAgICBpZiAoZXZlbnQudmFsdWUuaW5kZXhPZihMaXN0VXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbikpID4gLTEpIHtcbiAgICAgICAgY29sdW1uLnNob3cgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29sdW1uLnNob3cgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNldENvbHVtbk5hbWVzKCk7XG4gICAgdGhpcy5zZXREZXRhaWxDb2x1bW5Db3VudCgpO1xuICB9XG5cbiAgaW5saW5FZGl0QnV0dG9uKGlkZW50aWZpZXI6IHN0cmluZywgbGFiZWw6IHN0cmluZywgaWNvbjogc3RyaW5nKTogQnV0dG9uIHtcbiAgICBsZXQgYnV0dG9uQ29uZmlnOiBCdXR0b24gPSB7XG4gICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgdHlwZTogQnV0dG9uVHlwZS5GTEFULFxuICAgICAgbGFiZWw6IGxhYmVsLFxuICAgICAgY29sb3I6IEJ1dHRvbkNvbG9yLlBSSU1BUlksXG4gICAgICBzaXplOiBCdXR0b25TaXplLlNNQUxMLFxuICAgICAgaWNvbjogaWNvbixcbiAgICAgIG9ubHlJY29uOiBmYWxzZVxuICAgIH1cblxuICAgIHJldHVybiBidXR0b25Db25maWc7XG4gIH1cblxuICBnZXRDb2x1bW5MYWJlbChjb2x1bW46IENvbHVtbik6IHN0cmluZyB7XG4gICAgcmV0dXJuIExpc3RVdGlscy5nZXRDb2x1bW5MYWJlbChjb2x1bW4pO1xuICB9XG5cbiAgZ2V0Q29sdW1uS2V5KGNvbHVtbjogQ29sdW1uKTogc3RyaW5nIHtcbiAgICByZXR1cm4gTGlzdFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pO1xuICB9XG5cbiAgcmVzZXRJbmxpbmVFZGl0QnV0dG9uKGlkZW50aWZpZXI6IHN0cmluZywgbGFiZWw6IHN0cmluZywgaWNvbjogc3RyaW5nKSB7XG4gICAgZm9yIChsZXQgY0luZGV4ID0gMDsgY0luZGV4IDwgdGhpcy5jb2x1bW5Db25maWdzLmxlbmd0aDsgY0luZGV4KyspIHtcblxuICAgICAgaWYgKCFDb2xsZWN0aW9uVXRpbHMuaXNFbXB0eSh0aGlzLl9saXN0Q29uZmlnLmFjdGlvbnMpKSB7XG4gICAgICAgIGZvciAobGV0IGFjdGlvbiBvZiB0aGlzLl9saXN0Q29uZmlnLmFjdGlvbnMpIHtcbiAgICAgICAgICBpZiAoYWN0aW9uLnBlcm1pc3Npb24gPT0gbnVsbCB8fCAodGhpcy5hYmlsaXR5LmNhbihhY3Rpb24ucGVybWlzc2lvblsnYWN0aW9uJ10sIGFjdGlvbi5wZXJtaXNzaW9uWydzdWJqZWN0J10pKSkge1xuICAgICAgICAgICAgdGhpcy5oYXNEaXNwbGF5QWN0aW9ucyA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaGFzRGlzcGxheUFjdGlvbnMpIHtcbiAgICAgICAgZm9yIChsZXQgZmllbGQgb2YgdGhpcy5jb2x1bW5Db25maWdzW2NJbmRleF0uZmllbGRzKSB7XG4gICAgICAgICAgaWYgKEZpZWxkVXRpbHMucmVhZE9ubHlGaWVsZCgpLmluZGV4T2YoZmllbGQudHlwZSkgPiAtMSkgeyB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc0lubGluZUVkaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaW5saW5lRWRpdEJ1dHRvbnMgPSBuZXcgQXJyYXk8QnV0dG9uPigpO1xuXG4gICAgaWYgKHRoaXMuX3JlY29yZCAmJiB0aGlzLl9yZWNvcmQucm93cykge1xuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuX3JlY29yZC5yb3dzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICB0aGlzLmlubGluZUVkaXRCdXR0b25zLnB1c2godGhpcy5pbmxpbkVkaXRCdXR0b24oaWRlbnRpZmllciwgbGFiZWwsIGljb24pKTtcblxuICAgICAgICB0aGlzLmRpc3BsYXlNb2Rlc1tpbmRleF0gPSBGb3JtRGlhcGx5TW9kZS5WSUVXO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmZvcm1JbmRleCA9IC0xO1xuXG4gICAgdGhpcy5zZXRDb2x1bW5OYW1lcygpO1xuICB9XG5cbiAgc2hvd1Jvd0VkaXRhYmxlKCkge1xuICAgIGlmICghQ29sbGVjdGlvblV0aWxzLmlzRW1wdHkodGhpcy5fbGlzdENvbmZpZy5hY3Rpb25zKSkge1xuICAgICAgdGhpcy5pbmxpbmVCdXR0b25TaXplID0gdGhpcy5fbGlzdENvbmZpZy5hY3Rpb25zWzBdLnNpemVcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcmVjb3JkICYmIHRoaXMuX3JlY29yZC5yb3dzKSB7XG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5fcmVjb3JkLnJvd3MubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGlmICh0aGlzLl9yZWNvcmQucm93c1tpbmRleF1bJ3Nob3dSb3dFZGl0YWJsZSddKSB7XG4gICAgICAgICAgdGhpcy5zZXRSb3dFZGl0YWJsaXR5KGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldFJvd0VkaXRhYmxpdHkoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLmZvcm1JbmRleCAhPSAtMSAmJiB0aGlzLmZvcm1JbmRleCAhPSBpbmRleCkge1xuICAgICAgdGhpcy5pbmxpbmVFZGl0QnV0dG9uc1t0aGlzLmZvcm1JbmRleF0uaWRlbnRpZmllciA9ICdpbmxpbmVFZGl0QnV0dG9uJztcbiAgICAgIHRoaXMuaW5saW5lRWRpdEJ1dHRvbnNbdGhpcy5mb3JtSW5kZXhdLmxhYmVsID0gJ0VkaXQnO1xuICAgICAgdGhpcy5pbmxpbmVFZGl0QnV0dG9uc1t0aGlzLmZvcm1JbmRleF0uaWNvbiA9ICdlZGl0JztcbiAgICAgIHRoaXMuaW5saW5lRWRpdEJ1dHRvbnNbdGhpcy5mb3JtSW5kZXhdLnNpemUgPSB0aGlzLmlubGluZUJ1dHRvblNpemU7XG4gICAgICB0aGlzLmZvcm1JbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAodGhpcy5pbmxpbmVFZGl0QnV0dG9uc1tpbmRleF0gJiYgdGhpcy5pbmxpbmVFZGl0QnV0dG9uc1tpbmRleF0ubGFiZWwgPT0gJ0VkaXQnKSB7XG4gICAgICB0aGlzLmlubGluZUVkaXRCdXR0b25zW2luZGV4XS5pZGVudGlmaWVyID0gJ2NhbmNlbElubGluZVN0YXRpY0xpc3QnO1xuICAgICAgdGhpcy5pbmxpbmVFZGl0QnV0dG9uc1tpbmRleF0ubGFiZWwgPSAnQ2FuY2VsJztcbiAgICAgIHRoaXMuaW5saW5lRWRpdEJ1dHRvbnNbaW5kZXhdLmljb24gPSAnY2xvc2UnO1xuICAgICAgdGhpcy5pbmxpbmVFZGl0QnV0dG9uc1tpbmRleF0uc2l6ZSA9IHRoaXMuaW5saW5lQnV0dG9uU2l6ZTtcblxuICAgICAgaWYgKHRoaXMuX3JlY29yZCAmJiB0aGlzLl9yZWNvcmQucm93cykge1xuICAgICAgICBmb3IgKGxldCBySW5kZXggPSAwOyBySW5kZXggPCB0aGlzLl9yZWNvcmQucm93cy5sZW5ndGg7IHJJbmRleCsrKSB7XG4gICAgICAgICAgdGhpcy5kaXNwbGF5TW9kZXNbckluZGV4XSA9IEZvcm1EaWFwbHlNb2RlLlZJRVc7XG5cbiAgICAgICAgICBpZiAockluZGV4ICE9IGluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLmlubGluZUVkaXRCdXR0b25zW3JJbmRleF0uaWRlbnRpZmllciA9ICdpbmxpbmVFZGl0QnV0dG9uJztcbiAgICAgICAgICAgIHRoaXMuaW5saW5lRWRpdEJ1dHRvbnNbckluZGV4XS5sYWJlbCA9ICdFZGl0JztcbiAgICAgICAgICAgIHRoaXMuaW5saW5lRWRpdEJ1dHRvbnNbckluZGV4XS5pY29uID0gJ2VkaXQnO1xuICAgICAgICAgICAgdGhpcy5pbmxpbmVFZGl0QnV0dG9uc1tySW5kZXhdLnNpemUgPSB0aGlzLmlubGluZUJ1dHRvblNpemU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3JlY29yZC5yb3dzW2luZGV4XVsnZm9ybURpc3BsYXlNb2RlJ10pIHtcbiAgICAgICAgICB0aGlzLmRpc3BsYXlNb2Rlc1tpbmRleF0gPSB0aGlzLl9yZWNvcmQucm93c1tpbmRleF1bJ2Zvcm1EaXNwbGF5TW9kZSddO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZGlzcGxheU1vZGVzW2luZGV4XSA9IEZvcm1EaWFwbHlNb2RlLkVESVQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5pbml0Rm9ybUdyb3VwKGluZGV4KTtcbiAgICAgIHRoaXMuZm9ybUluZGV4ID0gaW5kZXg7XG4gICAgICB0aGlzLl9saXN0UmVzZXQgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbmxpbmVFZGl0QnV0dG9uc1tpbmRleF0uaWRlbnRpZmllciA9ICdpbmxpbmVFZGl0QnV0dG9uJztcbiAgICAgIHRoaXMuaW5saW5lRWRpdEJ1dHRvbnNbaW5kZXhdLmxhYmVsID0gJ0VkaXQnO1xuICAgICAgdGhpcy5pbmxpbmVFZGl0QnV0dG9uc1tpbmRleF0uaWNvbiA9ICdlZGl0JztcbiAgICAgIHRoaXMuaW5saW5lRWRpdEJ1dHRvbnNbaW5kZXhdLnNpemUgPSB0aGlzLmlubGluZUJ1dHRvblNpemU7XG4gICAgICB0aGlzLmZvcm1JbmRleCA9IC0xO1xuICAgIH1cblxuICAgIGxldCBpbmxpbmVCdXR0b25UZW1wID0gdGhpcy5pbmxpbmVFZGl0QnV0dG9uc1tpbmRleF07XG4gICAgdGhpcy5pbmxpbmVFZGl0QnV0dG9uc1tpbmRleF0gPSB1bmRlZmluZWQ7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmlubGluZUVkaXRCdXR0b25zW2luZGV4XSA9IGlubGluZUJ1dHRvblRlbXAsIDEwMCk7XG4gIH1cblxuICBwb3B1bGF0ZUFsbENoaWxkcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcmVjb3JkICYmIHRoaXMuX3JlY29yZC5yb3dzICYmIHRoaXMuX3JlY29yZC5yb3dzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IHJJbmRleCA9IDA7IHJJbmRleCA8IHRoaXMuX3JlY29yZC5yb3dzLmxlbmd0aDsgckluZGV4KyspIHtcbiAgICAgICAgdGhpcy5jaGlsZFJvd3NbckluZGV4XSA9IHRoaXMuZ2V0Q2hpbGRSb3dzKHRoaXMuX3JlY29yZC5yb3dzW3JJbmRleF0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldENoaWxkUm93cyhyb3c6IGFueSk6IGFueSB7XG4gICAgaWYgKHRoaXMuX2xpc3RDb25maWcgJiYgdGhpcy5fbGlzdENvbmZpZy5jaGlsZCAmJiByb3cpIHtcbiAgICAgIGxldCBkYXRhOiBBcnJheTxhbnk+IHwgYW55ID0gdGhpcy5fbGlzdENvbmZpZy5jaGlsZC5yZWNvcmRJZGVudGlmaWVyID8gcm93W3RoaXMuX2xpc3RDb25maWcuY2hpbGQucmVjb3JkSWRlbnRpZmllcl0gOiByb3c7XG5cbiAgICAgIGlmICh0aGlzLl9saXN0Q29uZmlnLmNoaWxkLnR5cGUgPT0gQ2hpbGRMaXN0VHlwZS5MSVNUKSB7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgbGV0IGNoaWxkRGF0YTogYW55O1xuICAgICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGNoaWxkRGF0YSA9IGRhdGE7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNoaWxkRGF0YSA9IG5ldyBBcnJheTxhbnk+KCk7XG4gICAgICAgICAgICBjaGlsZERhdGEucHVzaChkYXRhKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgcmVjb3JkOiBSZWNvcmQgPSB7XG4gICAgICAgICAgICBwYWdlTm86IDEsXG4gICAgICAgICAgICB0b3RhbDogY2hpbGREYXRhLmxlbmd0aCxcbiAgICAgICAgICAgIHJvd3M6IGNoaWxkRGF0YVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICByZXR1cm4gcmVjb3JkO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRWYWx1ZShjb2xJbmRleDogbnVtYmVyLCBjRmllbGRJbmRleDogbnVtYmVyLCByb3c6IGFueSwgdmFsdWU6IGFueSk6IGFueSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhbHVlID0gZXZhbChcInJvdy5cIiArIHRoaXMuY29sdW1uQ29uZmlnc1tjb2xJbmRleF0uZmllbGRzW2NGaWVsZEluZGV4XS5rZXkpO1xuICAgIH0gY2F0Y2ggKGUpIHsgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgdXBkYXRlRmlsdGVyKGZpZWxkKSB7XG4gICAgY29uc3QgZmlsdGVyVmFsdWUgPSBmaWVsZC52YWx1ZTtcbiAgICB0aGlzLmRhdGFTb3VyY2UuZmlsdGVyID0gZmlsdGVyVmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBpZiAodGhpcy5kYXRhU291cmNlLnBhZ2luYXRvcikge1xuICAgICAgdGhpcy5kYXRhU291cmNlLnBhZ2luYXRvci5maXJzdFBhZ2UoKTtcbiAgICB9XG4gIH1cblxuICBpbml0Rm9ybUdyb3VwKGNudDogbnVtYmVyKTogdm9pZCB7XG4gICAgbGV0IGZpZWxkQ29udHJvbHMgPSB7fTtcblxuICAgIGxldCByb3cgPSB0aGlzLmdldEN1cnJlbnRSZWNvcmQoY250KTtcblxuICAgIEtleU1hcFV0aWxzLnNldE9wdGlvbnNzVXNpbmdWYWx1ZXModGhpcy5rZXlNYXAsIGZhbHNlLCBLZXlNYXBPcHRpb25UeXBlLkxJU1QsIHRoaXMuX2xpc3RDb25maWcsIHJvdyk7XG5cbiAgICBmb3IgKGxldCBjb2x1bW4gb2YgdGhpcy5jb2x1bW5Db25maWdzKSB7XG4gICAgICBmb3IgKGxldCBmaWVsZCBvZiBjb2x1bW4uZmllbGRzKSB7XG4gICAgICAgIGxldCBmb3JtRmllbGQ6IEZvcm1GaWVsZCA9IHsgZmllbGQ6IGZpZWxkLCBhZGRNb3JlOiBmYWxzZSB9O1xuXG4gICAgICAgIGlmICh0aGlzLl9saXN0Q29uZmlnLnVuaXF1ZUtleXMgJiYgdGhpcy5fbGlzdENvbmZpZy51bmlxdWVLZXlzLmluZGV4T2YoZm9ybUZpZWxkLmZpZWxkLmtleSkgPiAtMSkge1xuICAgICAgICAgIGZvcm1GaWVsZC5maWVsZC5pc1VuaXF1ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgRm9ybVV0aWxzLmluaXRGaWVsZEdyb3VwKGZpZWxkQ29udHJvbHMsIGZvcm1GaWVsZCwgbnVsbCwgcm93LCB0aGlzLmRpc3BsYXlNb2Rlc1tjbnRdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmZvcm0gPSBuZXcgRm9ybUdyb3VwKGZpZWxkQ29udHJvbHMpO1xuICAgIHRoaXMuZm9ybUluZGV4ID0gY250O1xuICB9XG5cbiAgaW5pdENvbW1vbkZvcm1Hcm91cCgpOiB2b2lkIHtcbiAgICBsZXQgY29tbW9uRmllbGRDb250cm9scyA9IHt9O1xuXG4gICAgRm9ybVV0aWxzLmluaXRGaWVsZEdyb3VwKGNvbW1vbkZpZWxkQ29udHJvbHMsIHsgZmllbGQ6IHRoaXMuZ2V0RmlsdGVyRmllbGQoKSwgYWRkTW9yZTogZmFsc2UgfSwge30sIHt9LCBGb3JtRGlhcGx5TW9kZS5FRElUKTtcbiAgICBGb3JtVXRpbHMuaW5pdEZpZWxkR3JvdXAoY29tbW9uRmllbGRDb250cm9scywgeyBmaWVsZDogdGhpcy5nZXRDb2x1bW5TZWxlY3RvckZpZWxkKCksIGFkZE1vcmU6IGZhbHNlIH0sIHt9LCB7fSwgRm9ybURpYXBseU1vZGUuRURJVCk7XG5cbiAgICB0aGlzLmNvbW1vbkxpc3RGb3JtID0gbmV3IEZvcm1Hcm91cChjb21tb25GaWVsZENvbnRyb2xzKTtcbiAgfVxuXG4gIGdldEN1cnJlbnRSZWNvcmQoY250OiBudW1iZXIpOiBhbnkge1xuICAgIGxldCByZWNvcmQ6IGFueSA9IHt9O1xuXG4gICAgaWYgKHRoaXMuZGF0YVNvdXJjZSAmJiB0aGlzLmRhdGFTb3VyY2VbJ19yZW5kZXJEYXRhJ10gJiYgdGhpcy5kYXRhU291cmNlWydfcmVuZGVyRGF0YSddWydfdmFsdWUnXSAmJiB0aGlzLmRhdGFTb3VyY2VbJ19yZW5kZXJEYXRhJ11bJ192YWx1ZSddW2NudF0pIHtcbiAgICAgIHJlY29yZCA9IHRoaXMuZGF0YVNvdXJjZVsnX3JlbmRlckRhdGEnXVsnX3ZhbHVlJ11bY250XTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3JlY29yZCAmJiB0aGlzLl9yZWNvcmRbJ3Jvd3MnXSAmJiB0aGlzLl9yZWNvcmRbJ3Jvd3MnXVtjbnRdKSB7XG4gICAgICByZWNvcmQgPSB0aGlzLl9yZWNvcmRbJ3Jvd3MnXVtjbnRdO1xuICAgIH1cblxuICAgIHJldHVybiByZWNvcmQ7XG4gIH1cblxuICBnZXRPYmplY3RUcmVlKGN1cnJlbnRSb3c6IGFueSk6IE9iamVjdFRyZWUge1xuICAgIGlmICh0aGlzLl9saXN0Q29uZmlnICYmIHRoaXMuX2xpc3RDb25maWcudW5pcXVlS2V5cyAmJiB0aGlzLl9saXN0Q29uZmlnLnVuaXF1ZUtleXMubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IGtleXMgPSB0aGlzLl9saXN0Q29uZmlnLnVuaXF1ZUtleXM7XG5cbiAgICAgIGxldCB2YWx1ZXM6IEFycmF5PHN0cmluZz4gPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xuICAgICAga2V5cy5mb3JFYWNoKGtleSA9PiB2YWx1ZXMucHVzaChjdXJyZW50Um93W2tleV0pKTtcblxuICAgICAgbGV0IG9iamVjdFRyZWU6IE9iamVjdFRyZWUgPSB7XG4gICAgICAgIHBhcmVudDoge1xuICAgICAgICAgIGtleTogdmFsdWVzXG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLnBhcmVudCkge1xuICAgICAgICBvYmplY3RUcmVlLmhpZXJhcmNoeVVwID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLnBhcmVudCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9iamVjdFRyZWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBudW1iZXIgb2Ygc2VsZWN0ZWQgZWxlbWVudHMgbWF0Y2hlcyB0aGUgdG90YWwgbnVtYmVyIG9mIHJvd3MuICovXG4gIGlzQWxsU2VsZWN0ZWQoKSB7XG4gICAgY29uc3QgbnVtU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGlvbi5zZWxlY3RlZC5sZW5ndGg7XG4gICAgY29uc3QgbnVtUm93cyA9IHRoaXMuZGF0YVNvdXJjZS5kYXRhLmxlbmd0aDtcbiAgICByZXR1cm4gbnVtU2VsZWN0ZWQgPT09IG51bVJvd3M7XG4gIH1cblxuICAvKiogU2VsZWN0cyBhbGwgcm93cyBpZiB0aGV5IGFyZSBub3QgYWxsIHNlbGVjdGVkOyBvdGhlcndpc2UgY2xlYXIgc2VsZWN0aW9uLiAqL1xuICBtYXN0ZXJUb2dnbGUoKSB7XG4gICAgdGhpcy5pc0FsbFNlbGVjdGVkKCkgP1xuICAgICAgdGhpcy5zZWxlY3Rpb24uY2xlYXIoKSA6XG4gICAgICB0aGlzLmRhdGFTb3VyY2UuZGF0YS5mb3JFYWNoKHJvdyA9PiB0aGlzLnNlbGVjdGlvbi5zZWxlY3Qocm93KSk7XG4gIH1cblxuICAvKiogVGhlIGxhYmVsIGZvciB0aGUgY2hlY2tib3ggb24gdGhlIHBhc3NlZCByb3cgKi9cbiAgY2hlY2tib3hMYWJlbChyb3c/OiBhbnkpOiBzdHJpbmcge1xuICAgIGlmICghcm93KSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5pc0FsbFNlbGVjdGVkKCkgPyAnc2VsZWN0JyA6ICdkZXNlbGVjdCd9IGFsbGA7XG4gICAgfVxuICAgIHJldHVybiBgJHt0aGlzLnNlbGVjdGlvbi5pc1NlbGVjdGVkKHJvdykgPyAnZGVzZWxlY3QnIDogJ3NlbGVjdCd9IHJvdyAke3Jvdy5wb3NpdGlvbiArIDF9YDtcbiAgfVxuXG4gIHNldENhcmRWaXNpYmlsaXR5KCk6IHZvaWQge1xuICAgIHRoaXMuaGlkZUNhcmQgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5fbGlzdENvbmZpZy5oaWRlQ2FyZCB8fCAodGhpcy5fbGlzdENvbmZpZy5oaWRlSGVhZGVyICYmIHRoaXMuX2xpc3RDb25maWcuaGlkZUZvb3RlcikpIHtcbiAgICAgIHRoaXMuaGlkZUNhcmQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmhpZGVDYXJkID09IGZhbHNlKSB7XG4gICAgICBpZiAodGhpcy5fcmVjb3JkICYmIHRoaXMuX3JlY29yZC5yb3dzICYmIHRoaXMuX3JlY29yZC5yb3dzLmxlbmd0aCA9PSB0aGlzLl9yZWNvcmQudG90YWwgJiYgKFN0cmluZ1V0aWxzLmlzRW1wdHkodGhpcy5fbGlzdENvbmZpZy5oZWFkZXIpICYmICF0aGlzLl9saXN0Q29uZmlnLmRlc2NyaXB0aW9uKSkge1xuICAgICAgICB0aGlzLmhpZGVDYXJkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmhpZGVIZWFkZXIgPSBmYWxzZTtcbiAgICBpZiAoKCh0aGlzLl9saXN0Q29uZmlnLmhlYWRlciAmJiBTdHJpbmdVdGlscy5pc0VtcHR5KHRoaXMuX2xpc3RDb25maWcuaGVhZGVyLnRpdGxlKSkgJiYgU3RyaW5nVXRpbHMuaXNFbXB0eSh0aGlzLl9saXN0Q29uZmlnLmRlc2NyaXB0aW9uKSkgfHwgdGhpcy5fbGlzdENvbmZpZy5oaWRlSGVhZGVyKSB7XG4gICAgICB0aGlzLmhpZGVIZWFkZXIgPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMuaGlkZUZvb3RlciA9IGZhbHNlO1xuICAgIGlmICgodGhpcy5fcmVjb3JkICYmIHRoaXMuX3JlY29yZC5yb3dzICYmIHRoaXMuX3JlY29yZC5yb3dzLmxlbmd0aCA9PSB0aGlzLl9yZWNvcmQudG90YWwpIHx8IHRoaXMuX2xpc3RDb25maWcuaGlkZUZvb3Rlcikge1xuICAgICAgdGhpcy5oaWRlRm9vdGVyID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBzZXRDb2x1bW5OYW1lcygpOiB2b2lkIHtcbiAgICB0aGlzLmNvbHVtbk5hbWVzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcbiAgICB0aGlzLmNvbHVtbkNvbmZpZ3MgPSBuZXcgQXJyYXk8Q29sdW1uPigpO1xuXG4gICAgdGhpcy50b3RhbERpc3BhbHlhYmxlV2lkdGggPSAwO1xuXG4gICAgaWYgKHRoaXMuX2xpc3RDb25maWcuc2VsZWN0YWJsZSkge1xuICAgICAgdGhpcy5jb2x1bW5OYW1lcy5wdXNoKCdzZWxlY3QnKTtcblxuICAgICAgaWYgKCF0aGlzLl9saXN0Q29uZmlnLmhlYWRlcikge1xuICAgICAgICB0aGlzLl9saXN0Q29uZmlnLmhlYWRlciA9IHsgdGl0bGU6IFwiXCIgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLl9saXN0Q29uZmlnLmhlYWRlciB8fCBDb2xsZWN0aW9uVXRpbHMuaXNFbXB0eSh0aGlzLl9saXN0Q29uZmlnLmhlYWRlci5hY3Rpb25zKSkge1xuICAgICAgICB0aGlzLl9saXN0Q29uZmlnLmhlYWRlci5hY3Rpb25zID0gbmV3IEFycmF5PEJ1dHRvbj4oKTtcbiAgICAgIH1cblxuICAgICAgbGV0IHNlbGVjdGFibGVFeGlzdCA9IGZhbHNlO1xuICAgICAgLy8gZm9yIChsZXQgYnV0dG9uIG9mIHRoaXMuX2xpc3RDb25maWcuaGVhZGVyLmFjdGlvbnMpIHsgXG4gICAgICAvLyAgIGlmICgoPEJ1dHRvbj5idXR0b24pLmlkZW50aWZpZXIgPT0gXCJsaXN0Q3J1ZFNlbGVjdGlvbkJ1dHRvblwiKSB7XG4gICAgICAvLyAgICAgc2VsZWN0YWJsZUV4aXN0ID0gdHJ1ZTtcbiAgICAgIC8vICAgfVxuICAgICAgLy8gfVxuXG4gICAgICAvLyBpZiAoIXNlbGVjdGFibGVFeGlzdCkge1xuICAgICAgLy8gICB0aGlzLl9saXN0Q29uZmlnLmhlYWRlci5hY3Rpb25zLnVuc2hpZnQodGhpcy5zZWxlY3RhYmxlQnV0dG9uKFwibGlzdENydWRTZWxlY3Rpb25CdXR0b25cIiwgdGhpcy5fbGlzdENvbmZpZy5zZWxlY3RhYmxlLmxhYmVsLCB0aGlzLl9saXN0Q29uZmlnLnNlbGVjdGFibGUuaWNvbikpXG4gICAgICAvLyB9IFxuXG4gICAgICBpZiAoIXRoaXMuc2VsZWN0YWJsZUFkZGVkKSB7XG4gICAgICAgIHRoaXMuX2xpc3RDb25maWcuaGVhZGVyLmFjdGlvbnMudW5zaGlmdCguLi50aGlzLl9saXN0Q29uZmlnLnNlbGVjdGFibGUpO1xuICAgICAgICB0aGlzLnNlbGVjdGFibGVBZGRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2xpc3RDb25maWcuY29sdW1ucyAmJiB0aGlzLl9saXN0Q29uZmlnLmNvbHVtbnMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5fbGlzdENvbmZpZy5jb2x1bW5zLmZpbHRlcihjb2x1bW4gPT4gY29sdW1uLnNob3cgPT0gdHJ1ZSkuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgICBsZXQgaGFzRGlzcGxheWFibGVGaWVsZCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBmaWVsZCBvZiBjb2x1bW4uZmllbGRzKSB7XG4gICAgICAgICAgaWYgKGZpZWxkLnBlcm1pc3Npb24gPT0gbnVsbCB8fCB0aGlzLmFiaWxpdHkuY2FuKGZpZWxkLnBlcm1pc3Npb25bJ2FjdGlvbiddLCBmaWVsZC5wZXJtaXNzaW9uWydzdWJqZWN0J10pKSB7XG4gICAgICAgICAgICBoYXNEaXNwbGF5YWJsZUZpZWxkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFzRGlzcGxheWFibGVGaWVsZCkge1xuICAgICAgICAgIHRoaXMuY29sdW1uTmFtZXMucHVzaChMaXN0VXRpbHMuZ2V0Q29sdW1uS2V5KGNvbHVtbikpO1xuICAgICAgICAgIHRoaXMuY29sdW1uQ29uZmlncy5wdXNoKGNvbHVtbik7XG5cbiAgICAgICAgICB0aGlzLnRvdGFsRGlzcGFseWFibGVXaWR0aCArPSBjb2x1bW4ud2lkdGg7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmhhc0Rpc3BsYXlBY3Rpb25zKSB7XG4gICAgICB0aGlzLmNvbHVtbk5hbWVzLnB1c2goJ2FjdGlvbicpO1xuXG4gICAgICB0aGlzLnRvdGFsRGlzcGFseWFibGVXaWR0aCArPSB0aGlzLl9saXN0Q29uZmlnLmFjdGlvbldpZHRoO1xuICAgIH1cbiAgfVxuXG4gIHNldERldGFpbENvbHVtbkNvdW50KCk6IHZvaWQge1xuICAgIHRoaXMuY2hpbGRDb2x1bW5Db3VudCA9IHRoaXMuY29sdW1uQ29uZmlncy5sZW5ndGggKyAodGhpcy5fbGlzdENvbmZpZy5hY3Rpb25zICYmIHRoaXMuX2xpc3RDb25maWcuYWN0aW9ucy5sZW5ndGggPiAwID8gMSA6IDApICsgKHRoaXMuX2xpc3RDb25maWcuc2VsZWN0YWJsZSA/IDEgOiAwKTtcbiAgfVxuXG4gIHNldENvbG9ycygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcmVjb3JkICYmIHRoaXMuX3JlY29yZC5yb3dzKSB7XG4gICAgICBmb3IgKGxldCBySW5kZXggPSAwOyBySW5kZXggPCB0aGlzLl9yZWNvcmQucm93cy5sZW5ndGg7IHJJbmRleCsrKSB7XG4gICAgICAgIGlmIChDb2xsZWN0aW9uVXRpbHMuaXNFbXB0eSh0aGlzLnJvd0NvbG9yc1tySW5kZXhdKSkge1xuICAgICAgICAgIHRoaXMucm93Q29sb3JzLnB1c2goeyBiZ0NvbG9yOiBcIlwiLCB0ZXh0Q29sb3I6IFwiXCIgfSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJvd0NvbG9yOiBDZWxsQ29sb3IgPSB0aGlzLnJvd0NvbG9yc1tySW5kZXhdO1xuICAgICAgICBpZiAodGhpcy5fbGlzdENvbmZpZy5yb3dCZ0NvbG9yKSB7XG4gICAgICAgICAgcm93Q29sb3IuYmdDb2xvciA9IHRoaXMuX2xpc3RDb25maWcucm93QmdDb2xvcih0aGlzLl9yZWNvcmQucm93c1tySW5kZXhdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fbGlzdENvbmZpZy5yb3dUZXh0Q29sb3IpIHtcbiAgICAgICAgICByb3dDb2xvci50ZXh0Q29sb3IgPSB0aGlzLl9saXN0Q29uZmlnLnJvd1RleHRDb2xvcih0aGlzLl9yZWNvcmQucm93c1tySW5kZXhdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IGNJbmRleCA9IDA7IGNJbmRleCA8IHRoaXMuY29sdW1uQ29uZmlncy5sZW5ndGg7IGNJbmRleCsrKSB7XG4gICAgICAgICAgaWYgKENvbGxlY3Rpb25VdGlscy5pc0VtcHR5KHRoaXMuY2VsbENvbG9yc1tySW5kZXhdKSkge1xuICAgICAgICAgICAgdGhpcy5jZWxsQ29sb3JzLnB1c2gobmV3IEFycmF5PENlbGxDb2xvcj4oKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChDb2xsZWN0aW9uVXRpbHMuaXNFbXB0eSh0aGlzLmNlbGxDb2xvcnNbckluZGV4XVtjSW5kZXhdKSkge1xuICAgICAgICAgICAgdGhpcy5jZWxsQ29sb3JzW3JJbmRleF1bY0luZGV4XSA9IHsgYmdDb2xvcjogXCJcIiwgdGV4dENvbG9yOiBcIlwiIH07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IGNlbGxDb2xvcjogQ2VsbENvbG9yID0gdGhpcy5jZWxsQ29sb3JzW3JJbmRleF1bY0luZGV4XTtcbiAgICAgICAgICBpZiAoU3RyaW5nVXRpbHMuaXNFbXB0eShjZWxsQ29sb3IuYmdDb2xvcikpIHtcbiAgICAgICAgICAgIGNlbGxDb2xvci5iZ0NvbG9yID0gcm93Q29sb3IuYmdDb2xvcjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMuY29sdW1uQ29uZmlnc1tjSW5kZXhdLmJnQ29sb3IpIHtcbiAgICAgICAgICAgIGNlbGxDb2xvci5iZ0NvbG9yID0gdGhpcy5jb2x1bW5Db25maWdzW2NJbmRleF0uYmdDb2xvcih0aGlzLl9yZWNvcmQucm93c1tySW5kZXhdKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoU3RyaW5nVXRpbHMuaXNFbXB0eShjZWxsQ29sb3IudGV4dENvbG9yKSkge1xuICAgICAgICAgICAgY2VsbENvbG9yLnRleHRDb2xvciA9IHJvd0NvbG9yLnRleHRDb2xvcjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMuY29sdW1uQ29uZmlnc1tjSW5kZXhdLnRleHRDb2xvcikge1xuICAgICAgICAgICAgY2VsbENvbG9yLnRleHRDb2xvciA9IHRoaXMuY29sdW1uQ29uZmlnc1tjSW5kZXhdLnRleHRDb2xvcih0aGlzLl9yZWNvcmQucm93c1tySW5kZXhdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZWxlY3RhYmxlQnV0dG9uKGlkZW50aWZpZXI6IHN0cmluZywgbGFiZWw6IHN0cmluZywgaWNvbjogc3RyaW5nKTogQnV0dG9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgIGxhYmVsOiBsYWJlbCxcbiAgICAgIGNvbG9yOiBCdXR0b25Db2xvci5QUklNQVJZLFxuICAgICAgc2l6ZTogQnV0dG9uU2l6ZS5TTUFMTCxcbiAgICAgIGljb246IGljb24sXG4gICAgICB0eXBlOiBCdXR0b25UeXBlLkZMQVQsXG4gICAgICBvbmx5SWNvbjogZmFsc2VcbiAgICB9O1xuICB9XG5cbiAgZmllbGRDaGFuZ2UoZmllbGRDaGFuZ2U6IEZpZWxkQ2hhbmdlKSB7XG4gICAgY29uc29sZS5sb2coZmllbGRDaGFuZ2UpO1xuXG4gICAgdGhpcy5vbkZpZWxkQ2hhbmdlLmVtaXQoZmllbGRDaGFuZ2UpO1xuICAgIHRoaXMuZm9ybUNoYW5nZSh0aGlzLmZvcm0pO1xuXG4gICAgLy8gIGlmIGEgZmllbGQgb3B0aW9ucyBhcmUgZGVwZW5kZW50IG9uIG1lLCB0aGVuIHJlbG9hZCBpdHMgb3B0aW9ucyBcbiAgICBmaWVsZENoYW5nZS5maWVsZEtleTtcbiAgICB0aGlzLl9saXN0Q29uZmlnLmNvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgY29sdW1uLmZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgICAgaWYgKCg8QXV0b2NvbXBsZXRlRmllbGQgfCBSYWRpb0ZpZWxkIHwgQ2hlY2tib3hGaWVsZCB8IERyb3Bkb3duRmllbGQ+ZmllbGQpLm9wdGlvbkRlcGVuZHNPbiA9PSBmaWVsZENoYW5nZS5maWVsZEtleSkge1xuICAgICAgICAgIGxldCByb3cgPSBGb3JtVXRpbHMuZ2V0UmF3VmFsdWUodGhpcy5mb3JtKTtcbiAgICAgICAgICAvL2xldCByb3cgPSB0aGlzLmdldEN1cnJlbnRSZWNvcmQoZmllbGRDaGFuZ2Uuc291cmNlSW5kZXgpO1xuICAgICAgICAgIEtleU1hcFV0aWxzLnNldE9wdGlvbnNzVXNpbmdWYWx1ZXModGhpcy5rZXlNYXAsIGZhbHNlLCBLZXlNYXBPcHRpb25UeXBlLkxJU1QsIHRoaXMuX2xpc3RDb25maWcsIHJvdyk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIGZvcm1DaGFuZ2UoZm9ybTogRm9ybUdyb3VwKSB7XG4gICAgY29uc29sZS5sb2coZm9ybSk7XG5cbiAgICBpZiAoZm9ybSA9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMub25Gb3JtQ2hhbmdlLmVtaXQodGhpcy5mb3JtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vbkZvcm1DaGFuZ2UuZW1pdChmb3JtKTtcbiAgICB9XG4gIH1cblxuICBidXR0b25DbGljayhhY3Rpb246IEFjdGlvbikge1xuICAgIGNvbnNvbGUubG9nKGFjdGlvbik7XG5cbiAgICBpZiAoIUNvbGxlY3Rpb25VdGlscy5pc0VtcHR5KHRoaXMuX2xpc3RDb25maWcuc2VsZWN0YWJsZSkpIHtcbiAgICAgIHRoaXMuX2xpc3RDb25maWcuc2VsZWN0YWJsZS5mb3JFYWNoKHNlbGVjdEJ1dHRvbiA9PiB7XG4gICAgICAgIGlmIChhY3Rpb24uYWN0aW9uID09IHNlbGVjdEJ1dHRvbi5pZGVudGlmaWVyKSB7XG4gICAgICAgICAgYWN0aW9uLmRhdGEgPSB0aGlzLnNlbGVjdGlvbi5zZWxlY3RlZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGFjdGlvbi5hY3Rpb24gPT0gUmVzZXJ2ZWRCdXR0b24uUk9XX0VYUEFORCB8fCBhY3Rpb24uYWN0aW9uID09IFJlc2VydmVkQnV0dG9uLlJPV19DT0xMQVBTRSkge1xuICAgIH0gZWxzZSB7XG4gICAgICBhY3Rpb24uZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgdGhpcy5vbkJ1dHRvbkNsaWNrLmVtaXQoYWN0aW9uKTtcbiAgfVxuXG4gIGdldExheW91dCgpOiB2b2lkIHtcbiAgICB0aGlzLmJyZWFrcG9pbnRTdWJzY3JpcHRpb24gPSB0aGlzLmJyZWFrcG9pbnRPYnNlcnZlci5vYnNlcnZlKFtcbiAgICAgIEJyZWFrcG9pbnRzLlhTbWFsbCxcbiAgICAgIEJyZWFrcG9pbnRzLlNtYWxsLFxuICAgICAgQnJlYWtwb2ludHMuTWVkaXVtLFxuICAgICAgQnJlYWtwb2ludHMuTGFyZ2UsXG4gICAgICBCcmVha3BvaW50cy5YTGFyZ2VcbiAgICBdKS5zdWJzY3JpYmUoKHN0YXRlOiBCcmVha3BvaW50U3RhdGUpID0+IHtcbiAgICAgIGlmIChzdGF0ZS5icmVha3BvaW50c1tCcmVha3BvaW50cy5YU21hbGxdKSB7XG4gICAgICAgIHRoaXMuaXNNb2JpbGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNlbGxDb3VudCA9IHRoaXMubGlzdENvbmZpZy5tb2JpbGUgJiYgdGhpcy5saXN0Q29uZmlnLm1vYmlsZS5jZWxsQ291bnQgPyB0aGlzLmxpc3RDb25maWcubW9iaWxlLmNlbGxDb3VudCA6IDQ7XG4gICAgICAgIHRoaXMuaGlkZUNhcmQgPSB0cnVlO1xuICAgICAgICBMaXN0VXRpbHMuZ2V0TW9iaWxlQ29uZmlnKHRoaXMubGlzdENvbmZpZyk7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ01hdGNoZXMgWFNtYWxsIHZpZXdwb3J0Jyk7XG4gICAgICB9XG4gICAgICBpZiAoc3RhdGUuYnJlYWtwb2ludHNbQnJlYWtwb2ludHMuU21hbGxdKSB7XG4gICAgICAgIHRoaXMuaXNUYWJsZXQgPSB0cnVlO1xuICAgICAgICBjb25zb2xlLmxvZygnTWF0Y2hlcyBTbWFsbCB2aWV3cG9ydCcpO1xuICAgICAgfVxuICAgICAgaWYgKHN0YXRlLmJyZWFrcG9pbnRzW0JyZWFrcG9pbnRzLk1lZGl1bV0pIHtcbiAgICAgICAgdGhpcy5pc0Rlc2t0b3AgPSB0cnVlO1xuICAgICAgICBjb25zb2xlLmxvZygnTWF0Y2hlcyBNZWRpdW0gIHZpZXdwb3J0Jyk7XG4gICAgICB9XG4gICAgICBpZiAoc3RhdGUuYnJlYWtwb2ludHNbQnJlYWtwb2ludHMuTGFyZ2VdKSB7XG4gICAgICAgIHRoaXMuaXNEZXNrdG9wID0gdHJ1ZTtcbiAgICAgICAgY29uc29sZS5sb2coJ01hdGNoZXMgTGFyZ2Ugdmlld3BvcnQnKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdGF0ZS5icmVha3BvaW50c1tCcmVha3BvaW50cy5YTGFyZ2VdKSB7XG4gICAgICAgIHRoaXMuaXNEZXNrdG9wID0gdHJ1ZTtcbiAgICAgICAgY29uc29sZS5sb2coJ01hdGNoZXMgWExhcmdlIHZpZXdwb3J0Jyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0Q3VzdG9tVGVtcGxhdGUoKTtcbiAgICAgIHRoaXMucmVzZXRWZXJ0aWNhbERpc3BsYXkoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJvd0NsaWNrKHJvdzogYW55LCByb3dJbmRleDogYW55LCBjb250ZXh0OiBhbnksIGV2ZW50OiBhbnkpIHtcbiAgICBjb25zb2xlLmxvZyhyb3cpO1xuICAgIGNvbnNvbGUubG9nKHJvd0luZGV4KTtcbiAgICBjb25zb2xlLmxvZyhjb250ZXh0KTtcblxuICAgIGxldCBhY3Rpb25CdXR0b246IEJ1dHRvbiA9IG51bGw7XG4gICAgaWYgKCFDb2xsZWN0aW9uVXRpbHMuaXNFbXB0eSh0aGlzLl9saXN0Q29uZmlnLmFjdGlvbnMpKSB7XG4gICAgICB0aGlzLl9saXN0Q29uZmlnLmFjdGlvbnMuZm9yRWFjaChhY3Rpb24gPT4ge1xuICAgICAgICBpZiAoYWN0aW9uLmlkZW50aWZpZXIgPT0gdGhpcy5fbGlzdENvbmZpZy5yb3dBY3Rpb24pIHtcbiAgICAgICAgICBhY3Rpb25CdXR0b24gPSBhY3Rpb247XG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIGlmIChhY3Rpb25CdXR0b24gIT0gbnVsbCkge1xuICAgICAgICBsZXQgYWN0aW9uT2JqOiBBY3Rpb24gPSBCdXR0b25VdGlscy5nZXRBY3Rpb24oXG4gICAgICAgICAgdGhpcy5fbGlzdENvbmZpZy5pZGVudGlmaWVyLFxuICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIHRoaXMud2lkZ2V0QXJyYXlJbmRleCxcbiAgICAgICAgICBhY3Rpb25CdXR0b24uaWRlbnRpZmllcixcbiAgICAgICAgICB0aGlzLnBhcmVudCxcbiAgICAgICAgICBldmVudCxcbiAgICAgICAgICByb3csXG4gICAgICAgICAgY29udGV4dCxcbiAgICAgICAgICBudWxsKTtcblxuICAgICAgICB0aGlzLm9uQnV0dG9uQ2xpY2suZW1pdChhY3Rpb25PYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlc2V0VmVydGljYWxEaXNwbGF5KCk6IHZvaWQge1xuICAgIC8vIGlmICghdGhpcy5pc0N1c3RvbVRlbXBsYXRlICYmICEodGhpcy5pc01vYmlsZSAmJiB0aGlzLl9saXN0Q29uZmlnLm1vYmlsZSAmJiB0aGlzLl9saXN0Q29uZmlnLm1vYmlsZS5yb3dIZWlnaHQpKSB7XG4gICAgaWYgKHRoaXMuaXNNb2JpbGUgJiYgISh0aGlzLl9saXN0Q29uZmlnLm1vYmlsZSAmJiB0aGlzLl9saXN0Q29uZmlnLm1vYmlsZS5yb3dIZWlnaHQpICYmICF0aGlzLmlzQ3VzdG9tVGVtcGxhdGUpIHtcbiAgICAgIHRoaXMuZGlzcGxheVZlcnRpY2FsID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBnZXRCdXR0b24oY2VsbDogQ3VzdG9tTGF5b3V0Q2VsbCkge1xuICAgIGxldCBidXR0b25zOiBBcnJheTxDZWxsQ29udHJvbD4gPSBuZXcgQXJyYXk8Q2VsbENvbnRyb2w+KCk7XG4gICAgaWYgKCFDb2xsZWN0aW9uVXRpbHMuaXNFbXB0eShjZWxsKSAmJiAhQ29sbGVjdGlvblV0aWxzLmlzRW1wdHkoY2VsbC5jb250cm9scykpIHtcbiAgICAgIGJ1dHRvbnMgPSBjZWxsLmNvbnRyb2xzLmZpbHRlcihjb250cm9sID0+IGNvbnRyb2wudHlwZSA9PSBDZWxsQ29udHJvbGxUeXBlLkJVVFRPTikubWFwKGNvbnRyb2wgPT4gY29udHJvbC5jb250cm9sKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnV0dG9ucztcbiAgfVxuXG4gIHRvb2x0aXBQb3NpdGlvbiA9IHsgJ3RvcCc6IDAsICdsZWZ0JzogMCB9O1xuICBvbkhvdmVyKGV2ZW50LCByb3dJbmRleCwgcm93KSB7XG4gICAgdGhpcy5ob3ZlclJvd0RhdGEgPSByb3c7XG4gICAgdGhpcy5ob3ZlclJvd0luZGV4ID0gcm93SW5kZXg7XG5cbiAgICB0aGlzLnRvb2x0aXBQb3NpdGlvbi50b3AgPSBldmVudC55O1xuICAgIHRoaXMudG9vbHRpcFBvc2l0aW9uLmxlZnQgPSBldmVudC54O1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYnJlYWtwb2ludFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5icmVha3BvaW50U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=