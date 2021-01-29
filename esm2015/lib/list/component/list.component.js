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
            if (this._record.rows.length != this.rowCount) {
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
        ListUtils.setCustomLayouts(this.listConfig);
    }
    sticky() {
        let header1 = document.querySelectorAll(".mat-toolbar");
        let header = document.getElementById("mySearch");
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
            type: "RAISED" /* RAISED */,
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
        if (this.inlineEditButtons[index].label == 'Edit') {
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
                if (this._listConfig.uniqueKeys.indexOf(formField.field.key) > -1) {
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
            if (this._record && this._record.rows && this._record.rows.length == this._record.total && (StringUtils.isEmpty(this._listConfig.header) && this._listConfig.description)) {
                this.hideCard = true;
            }
        }
        this.hideHeader = false;
        if ((!this._listConfig.header || StringUtils.isEmpty(this._listConfig.header.title)) && StringUtils.isEmpty(this._listConfig.description) || this._listConfig.hideHeader) {
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
            for (let button of this._listConfig.header.actions) {
                if (button.identifier == "listCrudSelectionButton") {
                    selectableExist = true;
                }
            }
            if (!selectableExist) {
                this._listConfig.header.actions.unshift(this.selectableButton("listCrudSelectionButton", this._listConfig.selectable.label, this._listConfig.selectable.icon));
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
        if (action.action == 'listCrudSelectionButton') {
            action.data = this.selection.selected;
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
        // if (this._listConfig.mobile && this._listConfig.mobile.displayVertical && this.isMobile) {
        //   this.displayVertical = true;
        // }
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
                selector: 'cf-list',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL25pdGlua2hhaXRhbi9OaXRpbi9zdHVkeS9hbmd1bGFyL21hdGVyaWFsL2FkbWluLWJ1aWxkZXItcGx1Z2luL3Byb2plY3RzL25neC1tYXRlcmlhbC13aWRnZXQvc3JjLyIsInNvdXJjZXMiOlsibGliL2xpc3QvY29tcG9uZW50L2xpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4SCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFtQixNQUFNLHFCQUFxQixDQUFDO0FBTXZGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVHLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBaUIxRCxNQUFNLE9BQU8sYUFBYTtJQXlIeEIsWUFBbUIs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QUM7Z0JBQ1QsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLGdDQUFvQztnQkFFcEMsVUFBVSxFQUFFO29CQUNWLE9BQU8sQ0FBQyxjQUFjLEVBQUU7d0JBQ3RCLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQzt3QkFDNUQsS0FBSyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQzt3QkFDekMsVUFBVSxDQUFDLHdCQUF3QixFQUFFLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO3FCQUN0RixDQUFDO2lCQUNIO2dCQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN0Qzs7O1lBakJRLE9BQU87WUFiUCxrQkFBa0I7OzswQkFnQ3hCLEtBQUs7eUJBSUwsS0FBSztzQkFRTCxLQUFLO3FCQUlMLEtBQUs7K0JBY0wsS0FBSzswQkFDTCxLQUFLOytCQUNMLEtBQUs7MkJBQ0wsS0FBSztxQkFDTCxLQUFLO3lCQUNMLEtBQUs7d0JBSUwsS0FBSzt1QkFTTCxLQUFLO3FCQUNMLEtBQUs7MkJBQ0wsTUFBTTs0QkFDTixNQUFNOzRCQUNOLE1BQU07MkJBQ04sTUFBTTsyQkFDTixNQUFNO3VCQU1OLEtBQUs7NkJBS0wsS0FBSzswQkFLTCxTQUFTLFNBQUMsWUFBWSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTswQkFLekMsU0FBUyxTQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95LCBJbnB1dCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQnJlYWtwb2ludE9ic2VydmVyLCBCcmVha3BvaW50cywgQnJlYWtwb2ludFN0YXRlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2xheW91dCc7XG5cbmltcG9ydCB7IExpc3QsIFJlY29yZCwgUGFnaW5hdGlvblR5cGUsIENlbGxDb2xvciwgQ29sdW1uLCBDaGlsZExpc3RUeXBlLCBDdXN0b21MYXlvdXRDZWxsLCBDZWxsQ29udHJvbGxUeXBlLCBDZWxsQ29udHJvbCB9IGZyb20gJy4uL21vZGVsJztcbmltcG9ydCB7IE9iamVjdFRyZWUsIEJ1dHRvbiwgQnV0dG9uVHlwZSwgQnV0dG9uQ29sb3IsIEJ1dHRvblNpemUsIEFjdGlvbiwgUmVzZXJ2ZWRCdXR0b24gfSBmcm9tICcuLi8uLi9idXR0b24vbW9kZWwnO1xuaW1wb3J0IHsgS2V5TWFwLCBGaWVsZFR5cGUsIEZpZWxkQXBwZWFyYW5jZSwgRmllbGREaWFwbHlUeXBlLCBUZXh0RmllbGQsIERyb3Bkb3duT3B0aW9uLCBEcm9wZG93bkZpZWxkLCBGaWVsZENoYW5nZSwgS2V5TWFwT3B0aW9uVHlwZSwgQXV0b2NvbXBsZXRlRmllbGQsIFJhZGlvRmllbGQsIENoZWNrYm94RmllbGQgfSBmcm9tICcuLi8uLi9maWVsZC9tb2RlbCc7XG5pbXBvcnQgeyBGb3JtRGlhcGx5TW9kZSwgRm9ybUZpZWxkLCBGb3JtVGl0bGVJY29uUG9zaXRpb24gfSBmcm9tICcuLi8uLi9mb3JtL21vZGVsJztcbmltcG9ydCB7IEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdFRhYmxlRGF0YVNvdXJjZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYmxlJztcbmltcG9ydCB7IE1hdFBhZ2luYXRvciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3BhZ2luYXRvcic7XG5pbXBvcnQgeyBNYXRTb3J0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc29ydCc7XG5pbXBvcnQgeyB0cmlnZ2VyLCBzdGF0ZSwgc3R5bGUsIHRyYW5zaXRpb24sIGFuaW1hdGUgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IEZpZWxkVXRpbHMsIEZvcm1VdGlscywgQ29sbGVjdGlvblV0aWxzLCBTdHJpbmdVdGlscywgS2V5TWFwVXRpbHMsIExpc3RVdGlscyB9IGZyb20gJy4uLy4uL3V0aWxpdHknO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgQWJpbGl0eSB9IGZyb20gJ0BjYXNsL2FiaWxpdHknO1xuaW1wb3J0IHsgQWJpbGl0eVV0aWxzLCBCdXR0b25VdGlscyB9IGZyb20gJy4uLy4uL3V0aWxpdHknO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0aW1lSW50ZXJ2YWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NmLWxpc3QnLFxuICB0ZW1wbGF0ZVVybDogJy4vbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2xpc3QuY29tcG9uZW50LnNjc3MnXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2RldGFpbEV4cGFuZCcsIFtcbiAgICAgIHN0YXRlKCdjb2xsYXBzZWQnLCBzdHlsZSh7IGhlaWdodDogJzBweCcsIG1pbkhlaWdodDogJzAnIH0pKSxcbiAgICAgIHN0YXRlKCdleHBhbmRlZCcsIHN0eWxlKHsgaGVpZ2h0OiAnKicgfSkpLFxuICAgICAgdHJhbnNpdGlvbignZXhwYW5kZWQgPD0+IGNvbGxhcHNlZCcsIGFuaW1hdGUoJzIyNW1zIGN1YmljLWJlemllcigwLjQsIDAuMCwgMC4yLCAxKScpKSxcbiAgICBdKSxcbiAgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBfbGlzdENvbmZpZzogTGlzdDtcbiAgZ2V0IGxpc3RDb25maWcoKTogTGlzdCB7XG4gICAgcmV0dXJuIHRoaXMuX2xpc3RDb25maWc7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGxpc3RDb25maWcoX2xpc3RDb25maWc6IExpc3QpIHtcbiAgICB0aGlzLl9saXN0Q29uZmlnID0gX2xpc3RDb25maWc7XG4gICAgdGhpcy5zZXRDb2x1bW5OYW1lcygpO1xuICAgIHRoaXMuc2V0RGV0YWlsQ29sdW1uQ291bnQoKTtcbiAgICB0aGlzLnNldENhcmRWaXNpYmlsaXR5KCk7XG4gIH1cblxuICBASW5wdXQoKSBfcmVjb3JkOiBSZWNvcmQ7XG4gIGdldCByZWNvcmQoKTogUmVjb3JkIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjb3JkO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCByZWNvcmQoX3JlY29yZDogUmVjb3JkKSB7XG4gICAgLy8gY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLT5cIilcbiAgICAvLyBjb25zb2xlLmxvZyhfcmVjb3JkKTtcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLl9yZWNvcmQpO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiPC0tLS0tLS0tLS0tLS0tXCIpXG4gICAgaWYgKCF0aGlzLnBhcmVudCB8fCAodGhpcy5wYXJlbnQgJiYgSlNPTi5zdHJpbmdpZnkoX3JlY29yZCkgIT0gSlNPTi5zdHJpbmdpZnkodGhpcy5fcmVjb3JkKSkpIHtcbiAgICAgIHRoaXMuX3JlY29yZCA9IF9yZWNvcmQ7XG5cbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgdGhpcy5zZXRDYXJkVmlzaWJpbGl0eSgpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIHNvdXJjZUlkZW50aWZpZXI6IHN0cmluZztcbiAgQElucHV0KCkgc291cmNlSW5kZXg6IG51bWJlcjtcbiAgQElucHV0KCkgd2lkZ2V0QXJyYXlJbmRleDogbnVtYmVyO1xuICBASW5wdXQoKSBvcmlnaW5hbERhdGE6IGFueTtcbiAgQElucHV0KCkgcGFyZW50OiBPYmplY3RUcmVlO1xuICBASW5wdXQoKSBfbGlzdFJlc2V0OiBib29sZWFuO1xuICBnZXQgbGlzdFJlc2V0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9saXN0UmVzZXQ7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGxpc3RSZXNldChfbGlzdFJlc2V0OiBib29sZWFuKSB7XG4gICAgdGhpcy5fbGlzdFJlc2V0ID0gX2xpc3RSZXNldDtcblxuICAgIGlmICh0aGlzLl9saXN0UmVzZXQpIHtcbiAgICAgIHRoaXMucmVzZXRJbmxpbmVFZGl0QnV0dG9uKCdpbmxpbmVFZGl0QnV0dG9uJywgJ0VkaXQnLCAnZWRpdCcpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuICBASW5wdXQoKSBrZXlNYXA6IEFycmF5PEtleU1hcD47XG4gIEBPdXRwdXQoKSBvbkZvcm1DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkZpZWxkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgb25CdXR0b25DbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uUGFnZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uU29ydENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBfZXhwYW5kZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0IGV4cGFuZGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9leHBhbmRlZDtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgZXhwYW5kZWQoX2V4cGFuZGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZXhwYW5kZWQgPSBfZXhwYW5kZWQ7XG4gIH1cblxuICBASW5wdXQoKVxuICBleHBhbmRSb3dJbmRleDogbnVtYmVyO1xuXG4gIGRhdGFTb3VyY2U6IE1hdFRhYmxlRGF0YVNvdXJjZTxhbnk+ID0gbmV3IE1hdFRhYmxlRGF0YVNvdXJjZSgpO1xuXG4gIEBWaWV3Q2hpbGQoTWF0UGFnaW5hdG9yLCB7IHN0YXRpYzogZmFsc2UgfSkgc2V0IGNvbnRlbnRQYWdlKHBhZ2luYXRpb246IE1hdFBhZ2luYXRvcikge1xuICAgIHRoaXMuZGF0YVNvdXJjZS5wYWdpbmF0b3IgPSBwYWdpbmF0aW9uO1xuICB9XG5cblxuICBAVmlld0NoaWxkKE1hdFNvcnQsIHsgc3RhdGljOiBmYWxzZSB9KSBzZXQgY29udGVudFNvcnQoc29ydDogTWF0U29ydCkge1xuICAgIHRoaXMuZGF0YVNvdXJjZS5zb3J0ID0gc29ydDtcbiAgfVxuXG4gIGNlbGxDb3VudDogbnVtYmVyID0gMTI7XG4gIGlzTW9iaWxlOiBib29sZWFuO1xuICBpc1RhYmxldDogYm9vbGVhbjtcbiAgaXNEZXNrdG9wOiBib29sZWFuO1xuICBkaXNwbGF5VmVydGljYWw6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBmb3JtOiBGb3JtR3JvdXA7XG4gIGNvbW1vbkxpc3RGb3JtOiBGb3JtR3JvdXA7XG4gIGZvcm1JbmRleDogbnVtYmVyID0gLTE7XG5cbiAgaW5saW5lRWRpdEJ1dHRvbnM6IEFycmF5PEJ1dHRvbj4gPSBuZXcgQXJyYXk8QnV0dG9uPigpO1xuICBoYXNEaXNwbGF5QWN0aW9uczogYm9vbGVhbiA9IGZhbHNlO1xuICBpc0lubGluZUVkaXRhYmxlOiBib29sZWFuID0gZmFsc2U7XG4gIGlubGluZUJ1dHRvblNpemU6IEJ1dHRvblNpemUgPSBCdXR0b25TaXplLkRFRkFVTFQ7XG4gIGNoaWxkUm93czogTWFwPG51bWJlciwgUmVjb3JkPiA9IG5ldyBNYXA8bnVtYmVyLCBSZWNvcmQ+KCk7XG4gIGNoaWxkQ29sdW1uQ291bnQ6IG51bWJlcjtcblxuICBkaXNwbGF5TW9kZXM6IEFycmF5PEZvcm1EaWFwbHlNb2RlPiA9IG5ldyBBcnJheTxGb3JtRGlhcGx5TW9kZT4oKTtcbiAgY29sdW1uTmFtZXM6IEFycmF5PHN0cmluZz4gPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xuICBjb2x1bW5Db25maWdzOiBBcnJheTxDb2x1bW4+ID0gbmV3IEFycmF5PENvbHVtbj4oKTtcbiAgdG90YWxEaXNwYWx5YWJsZVdpZHRoOiBudW1iZXI7XG5cbiAgc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbk1vZGVsPGFueT4odHJ1ZSwgW10pO1xuICBoaWRlQ2FyZDogYm9vbGVhbiA9IGZhbHNlO1xuICBoaWRlSGVhZGVyOiBib29sZWFuID0gZmFsc2U7XG4gIGhpZGVGb290ZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwYWdlU2l6ZU9wdGlvbnM6IEFycmF5PG51bWJlcj4gPSBbNSwgMTAsIDI1LCAxMDBdO1xuICByb3dDb3VudDogbnVtYmVyID0gMDtcbiAgbGltaXQ6IG51bWJlciA9IDA7XG4gIGV4cGFuZGVkUm93OiBhbnkgfCBudWxsO1xuICByb3dDb2xvcnM6IEFycmF5PENlbGxDb2xvcj4gPSBuZXcgQXJyYXk8Q2VsbENvbG9yPigpO1xuICBjZWxsQ29sb3JzOiBBcnJheTxBcnJheTxDZWxsQ29sb3I+PiA9IG5ldyBBcnJheTxBcnJheTxDZWxsQ29sb3I+PigpO1xuICBob3ZlclJvd0RhdGE6IGFueTtcbiAgaG92ZXJSb3dJbmRleDogbnVtYmVyO1xuXG4gIHNob3dDYXJkID0gZmFsc2U7XG4gIGljb25Qb3NpdGlvbjogRm9ybVRpdGxlSWNvblBvc2l0aW9uO1xuXG4gIGJyZWFrcG9pbnRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgYWJpbGl0eTogQWJpbGl0eSwgcHVibGljIGJyZWFrcG9pbnRPYnNlcnZlcjogQnJlYWtwb2ludE9ic2VydmVyKSB7XG4gICAgQWJpbGl0eVV0aWxzLnNldEFiaWxpdHkodGhpcy5hYmlsaXR5KTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmdldExheW91dCgpO1xuXG4gICAgdGhpcy5zZXRQYWdlU2l6ZSgpO1xuICAgIGlmICh0aGlzLl9yZWNvcmQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fcmVjb3JkID0geyB0b3RhbDogMTAsIHBhZ2VObzogMSwgcm93czogW10gfTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcmVjb3JkICYmIHRoaXMuX3JlY29yZC5yb3dzKSB7XG4gICAgICBpZiAodGhpcy5fcmVjb3JkLnJvd3MubGVuZ3RoICE9IHRoaXMucm93Q291bnQpIHtcbiAgICAgICAgdGhpcy5fcmVjb3JkLnJvd3MgPSBbLi4udGhpcy5fcmVjb3JkLnJvd3NdO1xuXG4gICAgICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhID0gdGhpcy5fcmVjb3JkLnJvd3M7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5yZXNldElubGluZUVkaXRCdXR0b24oJ2lubGluZUVkaXRCdXR0b24nLCAnRWRpdCcsICdlZGl0Jyk7XG4gICAgdGhpcy5wb3B1bGF0ZUFsbENoaWxkcygpO1xuXG4gICAgdGhpcy5zaG93Um93RWRpdGFibGUoKTtcbiAgICB0aGlzLmluaXRDb21tb25Gb3JtR3JvdXAoKTtcbiAgICB0aGlzLnNldENvbG9ycygpO1xuICAgIHRoaXMuc2V0SWNvblBvc2l0aW9uKCk7XG4gICAgdGhpcy5zZXRGaWx0ZXJCYXIoKTtcblxuICAgIExpc3RVdGlscy5zZXRDdXN0b21MYXlvdXRzKHRoaXMubGlzdENvbmZpZyk7ICBcbiAgfVxuXG4gIHNvcnREaXJlY3Rpb246ICdhc2MnIHwgJ2Rlc2MnIHwgJycgPSAnYXNjJztcbiAgc3RpY2t5KCkge1xuICAgIGxldCBoZWFkZXIxPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubWF0LXRvb2xiYXJcIik7XG4gICAgbGV0IGhlYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlTZWFyY2hcIik7XG4gICAgaWYoaGVhZGVyKXtcbiAgICAgIGxldCBzdGlja3kgPSBoZWFkZXIub2Zmc2V0VG9wO1xuICAgICAgaWYgKHdpbmRvdy5wYWdlWU9mZnNldCA+IHN0aWNreSkge1xuICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZChcInN0aWNreVwiKTtcbiAgIFxuICAgICAgICBoZWFkZXIxLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChcInN0aWNreS1oZWFkZXJcIik7XG4gICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKFwic3RpY2t5XCIpO1xuICAgICAgICBoZWFkZXIxLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcInN0aWNreS1oZWFkZXJcIik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uU2Nyb2xsZWQoZXZlbnQpe1xuICB9XG5cblxuICBjb250ZW50RmlsdGVyQ29sdW1uU3BhbjogbnVtYmVyO1xuICBjb2x1bW5TZWxlY3Rpb25Db2x1bW5TcGFuOiBudW1iZXI7XG5cbiAgc2V0RmlsdGVyQmFyKCkge1xuICAgIGlmICh0aGlzLl9saXN0Q29uZmlnLnN0YXRpY0xpc3QuaGFzT25QYWdlRmlsdGVyICYmICF0aGlzLl9saXN0Q29uZmlnLmhhc0NvbHVtblNlbGVjdGlvbikgIHtcbiAgICAgIHRoaXMuY29udGVudEZpbHRlckNvbHVtblNwYW4gPSAxMjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLl9saXN0Q29uZmlnLnN0YXRpY0xpc3QuaGFzT25QYWdlRmlsdGVyICYmIHRoaXMuX2xpc3RDb25maWcuaGFzQ29sdW1uU2VsZWN0aW9uKSAge1xuICAgICAgdGhpcy5jb2x1bW5TZWxlY3Rpb25Db2x1bW5TcGFuID0gMTI7XG4gICAgfVxuICB9XG5cbiAgc2V0UGFnZVNpemUoKSB7XG4gICAgaWYgKHRoaXMuX2xpc3RDb25maWcucGFnaW5hdGlvbiA9PSBQYWdpbmF0aW9uVHlwZS5BTEwpIHtcbiAgICAgIHRoaXMubGltaXQgPSB0aGlzLl9yZWNvcmQgJiYgdGhpcy5fcmVjb3JkLnJvd3MgPyB0aGlzLl9yZWNvcmQucm93cy5sZW5ndGggOiAxMDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX2xpc3RDb25maWcucGFnZVNpemUpIHtcbiAgICAgICAgdGhpcy5saW1pdCA9IHRoaXMuX2xpc3RDb25maWcucGFnZVNpemU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0SWNvblBvc2l0aW9uKCkge1xuICAgIHRoaXMuaWNvblBvc2l0aW9uID0gRm9ybVRpdGxlSWNvblBvc2l0aW9uLkJFRk9SRV9USVRMRTtcbiAgICBpZiAodGhpcy5fbGlzdENvbmZpZy5oZWFkZXIgJiYgdGhpcy5fbGlzdENvbmZpZy5oZWFkZXIuaWNvbiAmJiB0aGlzLl9saXN0Q29uZmlnLmhlYWRlci5pY29uLnBvc2l0aW9uKSB7XG4gICAgICB0aGlzLmljb25Qb3NpdGlvbiA9IHRoaXMuX2xpc3RDb25maWcuaGVhZGVyLmljb24ucG9zaXRpb247XG4gICAgfVxuICB9XG5cbiAgZmlsdGVyRmllbGQ6IFRleHRGaWVsZDtcbiAgZ2V0RmlsdGVyRmllbGQoKTogVGV4dEZpZWxkIHtcbiAgICB0aGlzLmZpbHRlckZpZWxkID0ge1xuICAgICAga2V5OiBcInBhZ2VGaWx0ZXJcIixcbiAgICAgIGxhYmVsOiBcIkZpbHRlclwiLFxuICAgICAgdHlwZTogRmllbGRUeXBlLlRFWFQsXG4gICAgICBpY29uOiBcInNlYXJjaFwiLFxuICAgICAgYXBwZWFyYW5jZTogRmllbGRBcHBlYXJhbmNlLlNUQU5EQVJELFxuICAgICAgaXNSZWFkT25seTogZmFsc2UsXG4gICAgICBmaWVsZERpc3BsYXlUeXBlOiBGaWVsZERpYXBseVR5cGUuSU5MSU5FLFxuICAgICAgcGxhY2Vob2xkZXI6IFwiVHlwZSB0byBkaXNwbGF5IGZpbHRlcmVkIGxpc3RcIixcbiAgICAgIHZhbHVlOiBcIlwiXG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzLmZpbHRlckZpZWxkO1xuICB9XG5cbiAgY29sdW1uU2VsZWN0b3JGaWVsZDogRHJvcGRvd25GaWVsZDtcbiAgZ2V0Q29sdW1uU2VsZWN0b3JGaWVsZCgpOiBEcm9wZG93bkZpZWxkIHtcbiAgICB0aGlzLmNvbHVtblNlbGVjdG9yRmllbGQgPSBMaXN0VXRpbHMuZ2V0Q29sdW1uU2VsZWN0b3JGaWVsZCh0aGlzLl9saXN0Q29uZmlnKTtcblxuICAgIHJldHVybiB0aGlzLmNvbHVtblNlbGVjdG9yRmllbGQ7XG4gIH1cblxuICB1cGRhdGVDb2x1bW5EaXNwbGF5KGV2ZW50OiBhbnkpIHtcbiAgICBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgZm9yIChsZXQgY29sdW1uIG9mIHRoaXMuX2xpc3RDb25maWcuY29sdW1ucykge1xuICAgICAgaWYgKGV2ZW50LnZhbHVlLmluZGV4T2YoTGlzdFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pKSA+IC0xKSB7XG4gICAgICAgIGNvbHVtbi5zaG93ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbHVtbi5zaG93ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zZXRDb2x1bW5OYW1lcygpO1xuICAgIHRoaXMuc2V0RGV0YWlsQ29sdW1uQ291bnQoKTtcbiAgfVxuXG4gIGlubGluRWRpdEJ1dHRvbihpZGVudGlmaWVyOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcsIGljb246IHN0cmluZyk6IEJ1dHRvbiB7XG4gICAgbGV0IGJ1dHRvbkNvbmZpZzogQnV0dG9uID0ge1xuICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgIHR5cGU6IEJ1dHRvblR5cGUuUkFJU0VELFxuICAgICAgbGFiZWw6IGxhYmVsLFxuICAgICAgY29sb3I6IEJ1dHRvbkNvbG9yLlBSSU1BUlksXG4gICAgICBzaXplOiBCdXR0b25TaXplLlNNQUxMLFxuICAgICAgaWNvbjogaWNvbixcbiAgICAgIG9ubHlJY29uOiBmYWxzZVxuICAgIH1cblxuICAgIHJldHVybiBidXR0b25Db25maWc7XG4gIH1cblxuICBnZXRDb2x1bW5MYWJlbChjb2x1bW46IENvbHVtbik6IHN0cmluZyB7XG4gICAgcmV0dXJuIExpc3RVdGlscy5nZXRDb2x1bW5MYWJlbChjb2x1bW4pO1xuICB9XG5cbiAgZ2V0Q29sdW1uS2V5KGNvbHVtbjogQ29sdW1uKTogc3RyaW5nIHtcbiAgICByZXR1cm4gTGlzdFV0aWxzLmdldENvbHVtbktleShjb2x1bW4pO1xuICB9XG5cbiAgcmVzZXRJbmxpbmVFZGl0QnV0dG9uKGlkZW50aWZpZXI6IHN0cmluZywgbGFiZWw6IHN0cmluZywgaWNvbjogc3RyaW5nKSB7XG4gICAgZm9yIChsZXQgY0luZGV4ID0gMDsgY0luZGV4IDwgdGhpcy5jb2x1bW5Db25maWdzLmxlbmd0aDsgY0luZGV4KyspIHtcblxuICAgICAgaWYgKCFDb2xsZWN0aW9uVXRpbHMuaXNFbXB0eSh0aGlzLl9saXN0Q29uZmlnLmFjdGlvbnMpKSB7XG4gICAgICAgIGZvciAobGV0IGFjdGlvbiBvZiB0aGlzLl9saXN0Q29uZmlnLmFjdGlvbnMpIHtcbiAgICAgICAgICBpZiAoYWN0aW9uLnBlcm1pc3Npb24gPT0gbnVsbCB8fCAodGhpcy5hYmlsaXR5LmNhbihhY3Rpb24ucGVybWlzc2lvblsnYWN0aW9uJ10sIGFjdGlvbi5wZXJtaXNzaW9uWydzdWJqZWN0J10pKSkge1xuICAgICAgICAgICAgdGhpcy5oYXNEaXNwbGF5QWN0aW9ucyA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaGFzRGlzcGxheUFjdGlvbnMpIHtcbiAgICAgICAgZm9yIChsZXQgZmllbGQgb2YgdGhpcy5jb2x1bW5Db25maWdzW2NJbmRleF0uZmllbGRzKSB7XG4gICAgICAgICAgaWYgKEZpZWxkVXRpbHMucmVhZE9ubHlGaWVsZCgpLmluZGV4T2YoZmllbGQudHlwZSkgPiAtMSkgeyB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc0lubGluZUVkaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaW5saW5lRWRpdEJ1dHRvbnMgPSBuZXcgQXJyYXk8QnV0dG9uPigpO1xuXG4gICAgaWYgKHRoaXMuX3JlY29yZCAmJiB0aGlzLl9yZWNvcmQucm93cykge1xuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuX3JlY29yZC5yb3dzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICB0aGlzLmlubGluZUVkaXRCdXR0b25zLnB1c2godGhpcy5pbmxpbkVkaXRCdXR0b24oaWRlbnRpZmllciwgbGFiZWwsIGljb24pKTtcblxuICAgICAgICB0aGlzLmRpc3BsYXlNb2Rlc1tpbmRleF0gPSBGb3JtRGlhcGx5TW9kZS5WSUVXO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmZvcm1JbmRleCA9IC0xO1xuXG4gICAgdGhpcy5zZXRDb2x1bW5OYW1lcygpO1xuICB9XG5cbiAgc2hvd1Jvd0VkaXRhYmxlKCkge1xuICAgIGlmICghQ29sbGVjdGlvblV0aWxzLmlzRW1wdHkodGhpcy5fbGlzdENvbmZpZy5hY3Rpb25zKSkge1xuICAgICAgdGhpcy5pbmxpbmVCdXR0b25TaXplID0gdGhpcy5fbGlzdENvbmZpZy5hY3Rpb25zWzBdLnNpemVcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcmVjb3JkICYmIHRoaXMuX3JlY29yZC5yb3dzKSB7XG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5fcmVjb3JkLnJvd3MubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGlmICh0aGlzLl9yZWNvcmQucm93c1tpbmRleF1bJ3Nob3dSb3dFZGl0YWJsZSddKSB7XG4gICAgICAgICAgdGhpcy5zZXRSb3dFZGl0YWJsaXR5KGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldFJvd0VkaXRhYmxpdHkoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLmZvcm1JbmRleCAhPSAtMSAmJiB0aGlzLmZvcm1JbmRleCAhPSBpbmRleCkge1xuICAgICAgdGhpcy5pbmxpbmVFZGl0QnV0dG9uc1t0aGlzLmZvcm1JbmRleF0uaWRlbnRpZmllciA9ICdpbmxpbmVFZGl0QnV0dG9uJztcbiAgICAgIHRoaXMuaW5saW5lRWRpdEJ1dHRvbnNbdGhpcy5mb3JtSW5kZXhdLmxhYmVsID0gJ0VkaXQnO1xuICAgICAgdGhpcy5pbmxpbmVFZGl0QnV0dG9uc1t0aGlzLmZvcm1JbmRleF0uaWNvbiA9ICdlZGl0JztcbiAgICAgIHRoaXMuaW5saW5lRWRpdEJ1dHRvbnNbdGhpcy5mb3JtSW5kZXhdLnNpemUgPSB0aGlzLmlubGluZUJ1dHRvblNpemU7XG4gICAgICB0aGlzLmZvcm1JbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAodGhpcy5pbmxpbmVFZGl0QnV0dG9uc1tpbmRleF0ubGFiZWwgPT0gJ0VkaXQnKSB7XG4gICAgICB0aGlzLmlubGluZUVkaXRCdXR0b25zW2luZGV4XS5pZGVudGlmaWVyID0gJ2NhbmNlbElubGluZVN0YXRpY0xpc3QnO1xuICAgICAgdGhpcy5pbmxpbmVFZGl0QnV0dG9uc1tpbmRleF0ubGFiZWwgPSAnQ2FuY2VsJztcbiAgICAgIHRoaXMuaW5saW5lRWRpdEJ1dHRvbnNbaW5kZXhdLmljb24gPSAnY2xvc2UnO1xuICAgICAgdGhpcy5pbmxpbmVFZGl0QnV0dG9uc1tpbmRleF0uc2l6ZSA9IHRoaXMuaW5saW5lQnV0dG9uU2l6ZTtcblxuICAgICAgaWYgKHRoaXMuX3JlY29yZCAmJiB0aGlzLl9yZWNvcmQucm93cykge1xuICAgICAgICBmb3IgKGxldCBySW5kZXggPSAwOyBySW5kZXggPCB0aGlzLl9yZWNvcmQucm93cy5sZW5ndGg7IHJJbmRleCsrKSB7XG4gICAgICAgICAgdGhpcy5kaXNwbGF5TW9kZXNbckluZGV4XSA9IEZvcm1EaWFwbHlNb2RlLlZJRVc7XG5cbiAgICAgICAgICBpZiAockluZGV4ICE9IGluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLmlubGluZUVkaXRCdXR0b25zW3JJbmRleF0uaWRlbnRpZmllciA9ICdpbmxpbmVFZGl0QnV0dG9uJztcbiAgICAgICAgICAgIHRoaXMuaW5saW5lRWRpdEJ1dHRvbnNbckluZGV4XS5sYWJlbCA9ICdFZGl0JztcbiAgICAgICAgICAgIHRoaXMuaW5saW5lRWRpdEJ1dHRvbnNbckluZGV4XS5pY29uID0gJ2VkaXQnO1xuICAgICAgICAgICAgdGhpcy5pbmxpbmVFZGl0QnV0dG9uc1tySW5kZXhdLnNpemUgPSB0aGlzLmlubGluZUJ1dHRvblNpemU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3JlY29yZC5yb3dzW2luZGV4XVsnZm9ybURpc3BsYXlNb2RlJ10pIHtcbiAgICAgICAgICB0aGlzLmRpc3BsYXlNb2Rlc1tpbmRleF0gPSB0aGlzLl9yZWNvcmQucm93c1tpbmRleF1bJ2Zvcm1EaXNwbGF5TW9kZSddO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZGlzcGxheU1vZGVzW2luZGV4XSA9IEZvcm1EaWFwbHlNb2RlLkVESVQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5pbml0Rm9ybUdyb3VwKGluZGV4KTtcbiAgICAgIHRoaXMuZm9ybUluZGV4ID0gaW5kZXg7XG4gICAgICB0aGlzLl9saXN0UmVzZXQgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbmxpbmVFZGl0QnV0dG9uc1tpbmRleF0uaWRlbnRpZmllciA9ICdpbmxpbmVFZGl0QnV0dG9uJztcbiAgICAgIHRoaXMuaW5saW5lRWRpdEJ1dHRvbnNbaW5kZXhdLmxhYmVsID0gJ0VkaXQnO1xuICAgICAgdGhpcy5pbmxpbmVFZGl0QnV0dG9uc1tpbmRleF0uaWNvbiA9ICdlZGl0JztcbiAgICAgIHRoaXMuaW5saW5lRWRpdEJ1dHRvbnNbaW5kZXhdLnNpemUgPSB0aGlzLmlubGluZUJ1dHRvblNpemU7XG4gICAgICB0aGlzLmZvcm1JbmRleCA9IC0xO1xuICAgIH1cblxuICAgIGxldCBpbmxpbmVCdXR0b25UZW1wID0gdGhpcy5pbmxpbmVFZGl0QnV0dG9uc1tpbmRleF07XG4gICAgdGhpcy5pbmxpbmVFZGl0QnV0dG9uc1tpbmRleF0gPSB1bmRlZmluZWQ7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmlubGluZUVkaXRCdXR0b25zW2luZGV4XSA9IGlubGluZUJ1dHRvblRlbXAsIDEwMCk7XG4gIH1cblxuICBwb3B1bGF0ZUFsbENoaWxkcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcmVjb3JkICYmIHRoaXMuX3JlY29yZC5yb3dzICYmIHRoaXMuX3JlY29yZC5yb3dzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IHJJbmRleCA9IDA7IHJJbmRleCA8IHRoaXMuX3JlY29yZC5yb3dzLmxlbmd0aDsgckluZGV4KyspIHtcbiAgICAgICAgdGhpcy5jaGlsZFJvd3NbckluZGV4XSA9IHRoaXMuZ2V0Q2hpbGRSb3dzKHRoaXMuX3JlY29yZC5yb3dzW3JJbmRleF0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldENoaWxkUm93cyhyb3c6IGFueSk6IGFueSB7XG4gICAgaWYgKHRoaXMuX2xpc3RDb25maWcgJiYgdGhpcy5fbGlzdENvbmZpZy5jaGlsZCAmJiByb3cpIHtcbiAgICAgIGxldCBkYXRhOiBBcnJheTxhbnk+IHwgYW55ID0gdGhpcy5fbGlzdENvbmZpZy5jaGlsZC5yZWNvcmRJZGVudGlmaWVyID8gcm93W3RoaXMuX2xpc3RDb25maWcuY2hpbGQucmVjb3JkSWRlbnRpZmllcl0gOiByb3c7XG5cbiAgICAgIGlmICh0aGlzLl9saXN0Q29uZmlnLmNoaWxkLnR5cGUgPT0gQ2hpbGRMaXN0VHlwZS5MSVNUKSB7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgbGV0IGNoaWxkRGF0YTogYW55O1xuICAgICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGNoaWxkRGF0YSA9IGRhdGE7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNoaWxkRGF0YSA9IG5ldyBBcnJheTxhbnk+KCk7XG4gICAgICAgICAgICBjaGlsZERhdGEucHVzaChkYXRhKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgcmVjb3JkOiBSZWNvcmQgPSB7XG4gICAgICAgICAgICBwYWdlTm86IDEsXG4gICAgICAgICAgICB0b3RhbDogY2hpbGREYXRhLmxlbmd0aCxcbiAgICAgICAgICAgIHJvd3M6IGNoaWxkRGF0YVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICByZXR1cm4gcmVjb3JkO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRWYWx1ZShjb2xJbmRleDogbnVtYmVyLCBjRmllbGRJbmRleDogbnVtYmVyLCByb3c6IGFueSwgdmFsdWU6IGFueSk6IGFueSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhbHVlID0gZXZhbChcInJvdy5cIiArIHRoaXMuY29sdW1uQ29uZmlnc1tjb2xJbmRleF0uZmllbGRzW2NGaWVsZEluZGV4XS5rZXkpO1xuICAgIH0gY2F0Y2ggKGUpIHsgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgdXBkYXRlRmlsdGVyKGZpZWxkKSB7XG4gICAgY29uc3QgZmlsdGVyVmFsdWUgPSBmaWVsZC52YWx1ZTtcbiAgICB0aGlzLmRhdGFTb3VyY2UuZmlsdGVyID0gZmlsdGVyVmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBpZiAodGhpcy5kYXRhU291cmNlLnBhZ2luYXRvcikge1xuICAgICAgdGhpcy5kYXRhU291cmNlLnBhZ2luYXRvci5maXJzdFBhZ2UoKTtcbiAgICB9XG4gIH1cblxuICBpbml0Rm9ybUdyb3VwKGNudDogbnVtYmVyKTogdm9pZCB7XG4gICAgbGV0IGZpZWxkQ29udHJvbHMgPSB7fTtcblxuICAgIGxldCByb3cgPSB0aGlzLmdldEN1cnJlbnRSZWNvcmQoY250KTtcblxuICAgIEtleU1hcFV0aWxzLnNldE9wdGlvbnNzVXNpbmdWYWx1ZXModGhpcy5rZXlNYXAsIGZhbHNlLCBLZXlNYXBPcHRpb25UeXBlLkxJU1QsIHRoaXMuX2xpc3RDb25maWcsIHJvdyk7XG5cbiAgICBmb3IgKGxldCBjb2x1bW4gb2YgdGhpcy5jb2x1bW5Db25maWdzKSB7XG4gICAgICBmb3IgKGxldCBmaWVsZCBvZiBjb2x1bW4uZmllbGRzKSB7XG4gICAgICAgIGxldCBmb3JtRmllbGQ6IEZvcm1GaWVsZCA9IHsgZmllbGQ6IGZpZWxkLCBhZGRNb3JlOiBmYWxzZSB9O1xuXG4gICAgICAgIGlmICh0aGlzLl9saXN0Q29uZmlnLnVuaXF1ZUtleXMuaW5kZXhPZihmb3JtRmllbGQuZmllbGQua2V5KSA+IC0xKSB7XG4gICAgICAgICAgZm9ybUZpZWxkLmZpZWxkLmlzVW5pcXVlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBGb3JtVXRpbHMuaW5pdEZpZWxkR3JvdXAoZmllbGRDb250cm9scywgZm9ybUZpZWxkLCBudWxsLCByb3csIHRoaXMuZGlzcGxheU1vZGVzW2NudF0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZm9ybSA9IG5ldyBGb3JtR3JvdXAoZmllbGRDb250cm9scyk7XG4gICAgdGhpcy5mb3JtSW5kZXggPSBjbnQ7XG4gIH1cblxuICBpbml0Q29tbW9uRm9ybUdyb3VwKCk6IHZvaWQge1xuICAgIGxldCBjb21tb25GaWVsZENvbnRyb2xzID0ge307XG5cbiAgICBGb3JtVXRpbHMuaW5pdEZpZWxkR3JvdXAoY29tbW9uRmllbGRDb250cm9scywgeyBmaWVsZDogdGhpcy5nZXRGaWx0ZXJGaWVsZCgpLCBhZGRNb3JlOiBmYWxzZSB9LCB7fSwge30sIEZvcm1EaWFwbHlNb2RlLkVESVQpO1xuICAgIEZvcm1VdGlscy5pbml0RmllbGRHcm91cChjb21tb25GaWVsZENvbnRyb2xzLCB7IGZpZWxkOiB0aGlzLmdldENvbHVtblNlbGVjdG9yRmllbGQoKSwgYWRkTW9yZTogZmFsc2UgfSwge30sIHt9LCBGb3JtRGlhcGx5TW9kZS5FRElUKTtcblxuICAgIHRoaXMuY29tbW9uTGlzdEZvcm0gPSBuZXcgRm9ybUdyb3VwKGNvbW1vbkZpZWxkQ29udHJvbHMpO1xuICB9XG5cbiAgZ2V0Q3VycmVudFJlY29yZChjbnQ6IG51bWJlcik6IGFueSB7XG4gICAgbGV0IHJlY29yZDogYW55ID0ge307XG5cbiAgICBpZiAodGhpcy5kYXRhU291cmNlICYmIHRoaXMuZGF0YVNvdXJjZVsnX3JlbmRlckRhdGEnXSAmJiB0aGlzLmRhdGFTb3VyY2VbJ19yZW5kZXJEYXRhJ11bJ192YWx1ZSddICYmIHRoaXMuZGF0YVNvdXJjZVsnX3JlbmRlckRhdGEnXVsnX3ZhbHVlJ11bY250XSkge1xuICAgICAgcmVjb3JkID0gdGhpcy5kYXRhU291cmNlWydfcmVuZGVyRGF0YSddWydfdmFsdWUnXVtjbnRdO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fcmVjb3JkICYmIHRoaXMuX3JlY29yZFsncm93cyddICYmIHRoaXMuX3JlY29yZFsncm93cyddW2NudF0pIHtcbiAgICAgIHJlY29yZCA9IHRoaXMuX3JlY29yZFsncm93cyddW2NudF07XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlY29yZDtcbiAgfVxuXG4gIGdldE9iamVjdFRyZWUoY3VycmVudFJvdzogYW55KTogT2JqZWN0VHJlZSB7XG4gICAgaWYgKHRoaXMuX2xpc3RDb25maWcgJiYgdGhpcy5fbGlzdENvbmZpZy51bmlxdWVLZXlzICYmIHRoaXMuX2xpc3RDb25maWcudW5pcXVlS2V5cy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQga2V5cyA9IHRoaXMuX2xpc3RDb25maWcudW5pcXVlS2V5cztcblxuICAgICAgbGV0IHZhbHVlczogQXJyYXk8c3RyaW5nPiA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XG4gICAgICBrZXlzLmZvckVhY2goa2V5ID0+IHZhbHVlcy5wdXNoKGN1cnJlbnRSb3dba2V5XSkpO1xuXG4gICAgICBsZXQgb2JqZWN0VHJlZTogT2JqZWN0VHJlZSA9IHtcbiAgICAgICAgcGFyZW50OiB7XG4gICAgICAgICAga2V5OiB2YWx1ZXNcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICAgIG9iamVjdFRyZWUuaGllcmFyY2h5VXAgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMucGFyZW50KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqZWN0VHJlZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIG51bWJlciBvZiBzZWxlY3RlZCBlbGVtZW50cyBtYXRjaGVzIHRoZSB0b3RhbCBudW1iZXIgb2Ygcm93cy4gKi9cbiAgaXNBbGxTZWxlY3RlZCgpIHtcbiAgICBjb25zdCBudW1TZWxlY3RlZCA9IHRoaXMuc2VsZWN0aW9uLnNlbGVjdGVkLmxlbmd0aDtcbiAgICBjb25zdCBudW1Sb3dzID0gdGhpcy5kYXRhU291cmNlLmRhdGEubGVuZ3RoO1xuICAgIHJldHVybiBudW1TZWxlY3RlZCA9PT0gbnVtUm93cztcbiAgfVxuXG4gIC8qKiBTZWxlY3RzIGFsbCByb3dzIGlmIHRoZXkgYXJlIG5vdCBhbGwgc2VsZWN0ZWQ7IG90aGVyd2lzZSBjbGVhciBzZWxlY3Rpb24uICovXG4gIG1hc3RlclRvZ2dsZSgpIHtcbiAgICB0aGlzLmlzQWxsU2VsZWN0ZWQoKSA/XG4gICAgICB0aGlzLnNlbGVjdGlvbi5jbGVhcigpIDpcbiAgICAgIHRoaXMuZGF0YVNvdXJjZS5kYXRhLmZvckVhY2gocm93ID0+IHRoaXMuc2VsZWN0aW9uLnNlbGVjdChyb3cpKTtcbiAgfVxuXG4gIC8qKiBUaGUgbGFiZWwgZm9yIHRoZSBjaGVja2JveCBvbiB0aGUgcGFzc2VkIHJvdyAqL1xuICBjaGVja2JveExhYmVsKHJvdz86IGFueSk6IHN0cmluZyB7XG4gICAgaWYgKCFyb3cpIHtcbiAgICAgIHJldHVybiBgJHt0aGlzLmlzQWxsU2VsZWN0ZWQoKSA/ICdzZWxlY3QnIDogJ2Rlc2VsZWN0J30gYWxsYDtcbiAgICB9XG4gICAgcmV0dXJuIGAke3RoaXMuc2VsZWN0aW9uLmlzU2VsZWN0ZWQocm93KSA/ICdkZXNlbGVjdCcgOiAnc2VsZWN0J30gcm93ICR7cm93LnBvc2l0aW9uICsgMX1gO1xuICB9XG5cbiAgc2V0Q2FyZFZpc2liaWxpdHkoKTogdm9pZCB7XG4gICAgdGhpcy5oaWRlQ2FyZCA9IGZhbHNlO1xuICAgIGlmICh0aGlzLl9saXN0Q29uZmlnLmhpZGVDYXJkIHx8ICh0aGlzLl9saXN0Q29uZmlnLmhpZGVIZWFkZXIgJiYgdGhpcy5fbGlzdENvbmZpZy5oaWRlRm9vdGVyKSkge1xuICAgICAgdGhpcy5oaWRlQ2FyZCA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGlkZUNhcmQgPT0gZmFsc2UpIHtcbiAgICAgIGlmICh0aGlzLl9yZWNvcmQgJiYgdGhpcy5fcmVjb3JkLnJvd3MgJiYgdGhpcy5fcmVjb3JkLnJvd3MubGVuZ3RoID09IHRoaXMuX3JlY29yZC50b3RhbCAmJiAoU3RyaW5nVXRpbHMuaXNFbXB0eSh0aGlzLl9saXN0Q29uZmlnLmhlYWRlcikgJiYgdGhpcy5fbGlzdENvbmZpZy5kZXNjcmlwdGlvbikpIHtcbiAgICAgICAgdGhpcy5oaWRlQ2FyZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5oaWRlSGVhZGVyID0gZmFsc2U7XG4gICAgaWYgKCghdGhpcy5fbGlzdENvbmZpZy5oZWFkZXIgfHwgU3RyaW5nVXRpbHMuaXNFbXB0eSh0aGlzLl9saXN0Q29uZmlnLmhlYWRlci50aXRsZSkpICYmIFN0cmluZ1V0aWxzLmlzRW1wdHkodGhpcy5fbGlzdENvbmZpZy5kZXNjcmlwdGlvbikgfHwgdGhpcy5fbGlzdENvbmZpZy5oaWRlSGVhZGVyKSB7XG4gICAgICB0aGlzLmhpZGVIZWFkZXIgPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMuaGlkZUZvb3RlciA9IGZhbHNlO1xuICAgIGlmICgodGhpcy5fcmVjb3JkICYmIHRoaXMuX3JlY29yZC5yb3dzICYmIHRoaXMuX3JlY29yZC5yb3dzLmxlbmd0aCA9PSB0aGlzLl9yZWNvcmQudG90YWwpIHx8IHRoaXMuX2xpc3RDb25maWcuaGlkZUZvb3Rlcikge1xuICAgICAgdGhpcy5oaWRlRm9vdGVyID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBzZXRDb2x1bW5OYW1lcygpOiB2b2lkIHtcbiAgICB0aGlzLmNvbHVtbk5hbWVzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcbiAgICB0aGlzLmNvbHVtbkNvbmZpZ3MgPSBuZXcgQXJyYXk8Q29sdW1uPigpO1xuXG4gICAgdGhpcy50b3RhbERpc3BhbHlhYmxlV2lkdGggPSAwO1xuXG4gICAgaWYgKHRoaXMuX2xpc3RDb25maWcuc2VsZWN0YWJsZSkge1xuICAgICAgdGhpcy5jb2x1bW5OYW1lcy5wdXNoKCdzZWxlY3QnKTtcblxuICAgICAgaWYgKCF0aGlzLl9saXN0Q29uZmlnLmhlYWRlcikge1xuICAgICAgICB0aGlzLl9saXN0Q29uZmlnLmhlYWRlciA9IHsgdGl0bGU6IFwiXCIgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLl9saXN0Q29uZmlnLmhlYWRlciB8fCBDb2xsZWN0aW9uVXRpbHMuaXNFbXB0eSh0aGlzLl9saXN0Q29uZmlnLmhlYWRlci5hY3Rpb25zKSkge1xuICAgICAgICB0aGlzLl9saXN0Q29uZmlnLmhlYWRlci5hY3Rpb25zID0gbmV3IEFycmF5PEJ1dHRvbj4oKTtcbiAgICAgIH1cblxuICAgICAgbGV0IHNlbGVjdGFibGVFeGlzdCA9IGZhbHNlO1xuICAgICAgZm9yIChsZXQgYnV0dG9uIG9mIHRoaXMuX2xpc3RDb25maWcuaGVhZGVyLmFjdGlvbnMpIHtcbiAgICAgICAgaWYgKCg8QnV0dG9uPmJ1dHRvbikuaWRlbnRpZmllciA9PSBcImxpc3RDcnVkU2VsZWN0aW9uQnV0dG9uXCIpIHtcbiAgICAgICAgICBzZWxlY3RhYmxlRXhpc3QgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghc2VsZWN0YWJsZUV4aXN0KSB7XG4gICAgICAgIHRoaXMuX2xpc3RDb25maWcuaGVhZGVyLmFjdGlvbnMudW5zaGlmdCh0aGlzLnNlbGVjdGFibGVCdXR0b24oXCJsaXN0Q3J1ZFNlbGVjdGlvbkJ1dHRvblwiLCB0aGlzLl9saXN0Q29uZmlnLnNlbGVjdGFibGUubGFiZWwsIHRoaXMuX2xpc3RDb25maWcuc2VsZWN0YWJsZS5pY29uKSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fbGlzdENvbmZpZy5jb2x1bW5zICYmIHRoaXMuX2xpc3RDb25maWcuY29sdW1ucy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLl9saXN0Q29uZmlnLmNvbHVtbnMuZmlsdGVyKGNvbHVtbiA9PiBjb2x1bW4uc2hvdyA9PSB0cnVlKS5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgIGxldCBoYXNEaXNwbGF5YWJsZUZpZWxkID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGZpZWxkIG9mIGNvbHVtbi5maWVsZHMpIHtcbiAgICAgICAgICBpZiAoZmllbGQucGVybWlzc2lvbiA9PSBudWxsIHx8IHRoaXMuYWJpbGl0eS5jYW4oZmllbGQucGVybWlzc2lvblsnYWN0aW9uJ10sIGZpZWxkLnBlcm1pc3Npb25bJ3N1YmplY3QnXSkpIHtcbiAgICAgICAgICAgIGhhc0Rpc3BsYXlhYmxlRmllbGQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNEaXNwbGF5YWJsZUZpZWxkKSB7XG4gICAgICAgICAgdGhpcy5jb2x1bW5OYW1lcy5wdXNoKExpc3RVdGlscy5nZXRDb2x1bW5LZXkoY29sdW1uKSk7XG4gICAgICAgICAgdGhpcy5jb2x1bW5Db25maWdzLnB1c2goY29sdW1uKTtcblxuICAgICAgICAgIHRoaXMudG90YWxEaXNwYWx5YWJsZVdpZHRoICs9IGNvbHVtbi53aWR0aDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGFzRGlzcGxheUFjdGlvbnMpIHtcbiAgICAgIHRoaXMuY29sdW1uTmFtZXMucHVzaCgnYWN0aW9uJyk7XG5cbiAgICAgIHRoaXMudG90YWxEaXNwYWx5YWJsZVdpZHRoICs9IHRoaXMuX2xpc3RDb25maWcuYWN0aW9uV2lkdGg7XG4gICAgfVxuICB9XG5cbiAgc2V0RGV0YWlsQ29sdW1uQ291bnQoKTogdm9pZCB7XG4gICAgdGhpcy5jaGlsZENvbHVtbkNvdW50ID0gdGhpcy5jb2x1bW5Db25maWdzLmxlbmd0aCArICh0aGlzLl9saXN0Q29uZmlnLmFjdGlvbnMgJiYgdGhpcy5fbGlzdENvbmZpZy5hY3Rpb25zLmxlbmd0aCA+IDAgPyAxIDogMCkgKyAodGhpcy5fbGlzdENvbmZpZy5zZWxlY3RhYmxlID8gMSA6IDApO1xuICB9XG5cbiAgc2V0Q29sb3JzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9yZWNvcmQgJiYgdGhpcy5fcmVjb3JkLnJvd3MpIHtcbiAgICAgIGZvciAobGV0IHJJbmRleCA9IDA7IHJJbmRleCA8IHRoaXMuX3JlY29yZC5yb3dzLmxlbmd0aDsgckluZGV4KyspIHtcbiAgICAgICAgaWYgKENvbGxlY3Rpb25VdGlscy5pc0VtcHR5KHRoaXMucm93Q29sb3JzW3JJbmRleF0pKSB7XG4gICAgICAgICAgdGhpcy5yb3dDb2xvcnMucHVzaCh7IGJnQ29sb3I6IFwiXCIsIHRleHRDb2xvcjogXCJcIiB9KTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcm93Q29sb3I6IENlbGxDb2xvciA9IHRoaXMucm93Q29sb3JzW3JJbmRleF07XG4gICAgICAgIGlmICh0aGlzLl9saXN0Q29uZmlnLnJvd0JnQ29sb3IpIHtcbiAgICAgICAgICByb3dDb2xvci5iZ0NvbG9yID0gdGhpcy5fbGlzdENvbmZpZy5yb3dCZ0NvbG9yKHRoaXMuX3JlY29yZC5yb3dzW3JJbmRleF0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9saXN0Q29uZmlnLnJvd1RleHRDb2xvcikge1xuICAgICAgICAgIHJvd0NvbG9yLnRleHRDb2xvciA9IHRoaXMuX2xpc3RDb25maWcucm93VGV4dENvbG9yKHRoaXMuX3JlY29yZC5yb3dzW3JJbmRleF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgY0luZGV4ID0gMDsgY0luZGV4IDwgdGhpcy5jb2x1bW5Db25maWdzLmxlbmd0aDsgY0luZGV4KyspIHtcbiAgICAgICAgICBpZiAoQ29sbGVjdGlvblV0aWxzLmlzRW1wdHkodGhpcy5jZWxsQ29sb3JzW3JJbmRleF0pKSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxDb2xvcnMucHVzaChuZXcgQXJyYXk8Q2VsbENvbG9yPigpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKENvbGxlY3Rpb25VdGlscy5pc0VtcHR5KHRoaXMuY2VsbENvbG9yc1tySW5kZXhdW2NJbmRleF0pKSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxDb2xvcnNbckluZGV4XVtjSW5kZXhdID0geyBiZ0NvbG9yOiBcIlwiLCB0ZXh0Q29sb3I6IFwiXCIgfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgY2VsbENvbG9yOiBDZWxsQ29sb3IgPSB0aGlzLmNlbGxDb2xvcnNbckluZGV4XVtjSW5kZXhdO1xuICAgICAgICAgIGlmIChTdHJpbmdVdGlscy5pc0VtcHR5KGNlbGxDb2xvci5iZ0NvbG9yKSkge1xuICAgICAgICAgICAgY2VsbENvbG9yLmJnQ29sb3IgPSByb3dDb2xvci5iZ0NvbG9yO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5jb2x1bW5Db25maWdzW2NJbmRleF0uYmdDb2xvcikge1xuICAgICAgICAgICAgY2VsbENvbG9yLmJnQ29sb3IgPSB0aGlzLmNvbHVtbkNvbmZpZ3NbY0luZGV4XS5iZ0NvbG9yKHRoaXMuX3JlY29yZC5yb3dzW3JJbmRleF0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChTdHJpbmdVdGlscy5pc0VtcHR5KGNlbGxDb2xvci50ZXh0Q29sb3IpKSB7XG4gICAgICAgICAgICBjZWxsQ29sb3IudGV4dENvbG9yID0gcm93Q29sb3IudGV4dENvbG9yO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5jb2x1bW5Db25maWdzW2NJbmRleF0udGV4dENvbG9yKSB7XG4gICAgICAgICAgICBjZWxsQ29sb3IudGV4dENvbG9yID0gdGhpcy5jb2x1bW5Db25maWdzW2NJbmRleF0udGV4dENvbG9yKHRoaXMuX3JlY29yZC5yb3dzW3JJbmRleF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNlbGVjdGFibGVCdXR0b24oaWRlbnRpZmllcjogc3RyaW5nLCBsYWJlbDogc3RyaW5nLCBpY29uOiBzdHJpbmcpOiBCdXR0b24ge1xuICAgIHJldHVybiB7XG4gICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgbGFiZWw6IGxhYmVsLFxuICAgICAgY29sb3I6IEJ1dHRvbkNvbG9yLlBSSU1BUlksXG4gICAgICBzaXplOiBCdXR0b25TaXplLlNNQUxMLFxuICAgICAgaWNvbjogaWNvbixcbiAgICAgIHR5cGU6IEJ1dHRvblR5cGUuRkxBVCxcbiAgICAgIG9ubHlJY29uOiBmYWxzZVxuICAgIH07XG4gIH1cblxuICBmaWVsZENoYW5nZShmaWVsZENoYW5nZTogRmllbGRDaGFuZ2UpIHtcbiAgICBjb25zb2xlLmxvZyhmaWVsZENoYW5nZSk7XG5cbiAgICB0aGlzLm9uRmllbGRDaGFuZ2UuZW1pdChmaWVsZENoYW5nZSk7XG4gICAgdGhpcy5mb3JtQ2hhbmdlKHRoaXMuZm9ybSk7XG5cbiAgICAvLyAgaWYgYSBmaWVsZCBvcHRpb25zIGFyZSBkZXBlbmRlbnQgb24gbWUsIHRoZW4gcmVsb2FkIGl0cyBvcHRpb25zIFxuICAgIGZpZWxkQ2hhbmdlLmZpZWxkS2V5O1xuICAgIHRoaXMuX2xpc3RDb25maWcuY29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICBjb2x1bW4uZmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgICBpZiAoKDxBdXRvY29tcGxldGVGaWVsZCB8IFJhZGlvRmllbGQgfCBDaGVja2JveEZpZWxkIHwgRHJvcGRvd25GaWVsZD5maWVsZCkub3B0aW9uRGVwZW5kc09uID09IGZpZWxkQ2hhbmdlLmZpZWxkS2V5KSB7XG4gICAgICAgICAgbGV0IHJvdyA9IEZvcm1VdGlscy5nZXRSYXdWYWx1ZSh0aGlzLmZvcm0pO1xuICAgICAgICAgIC8vbGV0IHJvdyA9IHRoaXMuZ2V0Q3VycmVudFJlY29yZChmaWVsZENoYW5nZS5zb3VyY2VJbmRleCk7XG4gICAgICAgICAgS2V5TWFwVXRpbHMuc2V0T3B0aW9uc3NVc2luZ1ZhbHVlcyh0aGlzLmtleU1hcCwgZmFsc2UsIEtleU1hcE9wdGlvblR5cGUuTElTVCwgdGhpcy5fbGlzdENvbmZpZywgcm93KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgZm9ybUNoYW5nZShmb3JtOiBGb3JtR3JvdXApIHtcbiAgICBjb25zb2xlLmxvZyhmb3JtKTtcblxuICAgIGlmIChmb3JtID09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5vbkZvcm1DaGFuZ2UuZW1pdCh0aGlzLmZvcm0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uRm9ybUNoYW5nZS5lbWl0KGZvcm0pO1xuICAgIH1cbiAgfVxuXG4gIGJ1dHRvbkNsaWNrKGFjdGlvbjogQWN0aW9uKSB7XG4gICAgY29uc29sZS5sb2coYWN0aW9uKTtcblxuICAgIGlmIChhY3Rpb24uYWN0aW9uID09ICdsaXN0Q3J1ZFNlbGVjdGlvbkJ1dHRvbicpIHtcbiAgICAgIGFjdGlvbi5kYXRhID0gdGhpcy5zZWxlY3Rpb24uc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgaWYgKGFjdGlvbi5hY3Rpb24gPT0gUmVzZXJ2ZWRCdXR0b24uUk9XX0VYUEFORCB8fCBhY3Rpb24uYWN0aW9uID09IFJlc2VydmVkQnV0dG9uLlJPV19DT0xMQVBTRSkge1xuICAgIH0gZWxzZSB7XG4gICAgICBhY3Rpb24uZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgdGhpcy5vbkJ1dHRvbkNsaWNrLmVtaXQoYWN0aW9uKTtcbiAgfVxuXG4gIGdldExheW91dCgpOiB2b2lkIHtcbiAgICB0aGlzLmJyZWFrcG9pbnRTdWJzY3JpcHRpb24gPSB0aGlzLmJyZWFrcG9pbnRPYnNlcnZlci5vYnNlcnZlKFtcbiAgICAgIEJyZWFrcG9pbnRzLlhTbWFsbCxcbiAgICAgIEJyZWFrcG9pbnRzLlNtYWxsLFxuICAgICAgQnJlYWtwb2ludHMuTWVkaXVtLFxuICAgICAgQnJlYWtwb2ludHMuTGFyZ2UsXG4gICAgICBCcmVha3BvaW50cy5YTGFyZ2VcbiAgICBdKS5zdWJzY3JpYmUoKHN0YXRlOiBCcmVha3BvaW50U3RhdGUpID0+IHtcbiAgICAgIGlmIChzdGF0ZS5icmVha3BvaW50c1tCcmVha3BvaW50cy5YU21hbGxdKSB7XG4gICAgICAgIHRoaXMuaXNNb2JpbGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmNlbGxDb3VudCA9IHRoaXMubGlzdENvbmZpZy5tb2JpbGUgJiYgdGhpcy5saXN0Q29uZmlnLm1vYmlsZS5jZWxsQ291bnQgPyB0aGlzLmxpc3RDb25maWcubW9iaWxlLmNlbGxDb3VudCA6IDQ7XG4gICAgICAgIHRoaXMuaGlkZUNhcmQgPSB0cnVlO1xuICAgICAgICBMaXN0VXRpbHMuZ2V0TW9iaWxlQ29uZmlnKHRoaXMubGlzdENvbmZpZyk7ICBcblxuICAgICAgICBjb25zb2xlLmxvZygnTWF0Y2hlcyBYU21hbGwgdmlld3BvcnQnKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdGF0ZS5icmVha3BvaW50c1tCcmVha3BvaW50cy5TbWFsbF0pIHtcbiAgICAgICAgdGhpcy5pc1RhYmxldCA9IHRydWU7XG4gICAgICAgIGNvbnNvbGUubG9nKCdNYXRjaGVzIFNtYWxsIHZpZXdwb3J0Jyk7XG4gICAgICB9XG4gICAgICBpZiAoc3RhdGUuYnJlYWtwb2ludHNbQnJlYWtwb2ludHMuTWVkaXVtXSkge1xuICAgICAgICB0aGlzLmlzRGVza3RvcCA9IHRydWU7XG4gICAgICAgIGNvbnNvbGUubG9nKCdNYXRjaGVzIE1lZGl1bSAgdmlld3BvcnQnKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdGF0ZS5icmVha3BvaW50c1tCcmVha3BvaW50cy5MYXJnZV0pIHtcbiAgICAgICAgdGhpcy5pc0Rlc2t0b3AgPSB0cnVlO1xuICAgICAgICBjb25zb2xlLmxvZygnTWF0Y2hlcyBMYXJnZSB2aWV3cG9ydCcpO1xuICAgICAgfVxuICAgICAgaWYgKHN0YXRlLmJyZWFrcG9pbnRzW0JyZWFrcG9pbnRzLlhMYXJnZV0pIHtcbiAgICAgICAgdGhpcy5pc0Rlc2t0b3AgPSB0cnVlO1xuICAgICAgICBjb25zb2xlLmxvZygnTWF0Y2hlcyBYTGFyZ2Ugdmlld3BvcnQnKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5yZXNldFZlcnRpY2FsRGlzcGxheSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcm93Q2xpY2socm93OiBhbnksIHJvd0luZGV4OiBhbnksIGNvbnRleHQ6IGFueSwgZXZlbnQ6IGFueSkge1xuICAgIGNvbnNvbGUubG9nKHJvdyk7XG4gICAgY29uc29sZS5sb2cocm93SW5kZXgpO1xuICAgIGNvbnNvbGUubG9nKGNvbnRleHQpO1xuXG4gICAgbGV0IGFjdGlvbkJ1dHRvbjogQnV0dG9uID0gbnVsbDtcbiAgICBpZiAoIUNvbGxlY3Rpb25VdGlscy5pc0VtcHR5KHRoaXMuX2xpc3RDb25maWcuYWN0aW9ucykpIHtcbiAgICAgIHRoaXMuX2xpc3RDb25maWcuYWN0aW9ucy5mb3JFYWNoKGFjdGlvbiA9PiB7XG4gICAgICAgIGlmIChhY3Rpb24uaWRlbnRpZmllciA9PSB0aGlzLl9saXN0Q29uZmlnLnJvd0FjdGlvbikge1xuICAgICAgICAgIGFjdGlvbkJ1dHRvbiA9IGFjdGlvbjtcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgaWYgKGFjdGlvbkJ1dHRvbiAhPSBudWxsKSB7XG4gICAgICAgIGxldCBhY3Rpb25PYmo6IEFjdGlvbiA9IEJ1dHRvblV0aWxzLmdldEFjdGlvbihcbiAgICAgICAgICB0aGlzLl9saXN0Q29uZmlnLmlkZW50aWZpZXIsXG4gICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgdGhpcy53aWRnZXRBcnJheUluZGV4LFxuICAgICAgICAgIGFjdGlvbkJ1dHRvbi5pZGVudGlmaWVyLFxuICAgICAgICAgIHRoaXMucGFyZW50LFxuICAgICAgICAgIGV2ZW50LFxuICAgICAgICAgIHJvdyxcbiAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgIG51bGwpO1xuXG4gICAgICAgIHRoaXMub25CdXR0b25DbGljay5lbWl0KGFjdGlvbk9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVzZXRWZXJ0aWNhbERpc3BsYXkoKTogdm9pZCB7XG4gICAgLy8gaWYgKHRoaXMuX2xpc3RDb25maWcubW9iaWxlICYmIHRoaXMuX2xpc3RDb25maWcubW9iaWxlLmRpc3BsYXlWZXJ0aWNhbCAmJiB0aGlzLmlzTW9iaWxlKSB7XG4gICAgLy8gICB0aGlzLmRpc3BsYXlWZXJ0aWNhbCA9IHRydWU7XG4gICAgLy8gfVxuICB9XG5cbiAgZ2V0QnV0dG9uKGNlbGw6IEN1c3RvbUxheW91dENlbGwpIHtcbiAgICBsZXQgYnV0dG9uczogQXJyYXk8Q2VsbENvbnRyb2w+ID0gbmV3IEFycmF5PENlbGxDb250cm9sPigpO1xuICAgIGlmICghQ29sbGVjdGlvblV0aWxzLmlzRW1wdHkoY2VsbCkgJiYgIUNvbGxlY3Rpb25VdGlscy5pc0VtcHR5KGNlbGwuY29udHJvbHMpKSB7XG4gICAgICBidXR0b25zID0gY2VsbC5jb250cm9scy5maWx0ZXIoY29udHJvbCA9PiBjb250cm9sLnR5cGUgPT0gQ2VsbENvbnRyb2xsVHlwZS5CVVRUT04pLm1hcChjb250cm9sID0+IGNvbnRyb2wuY29udHJvbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1dHRvbnM7XG4gIH1cblxuICB0b29sdGlwUG9zaXRpb24gPSB7ICd0b3AnOiAwLCAnbGVmdCc6IDAgfTtcbiAgb25Ib3ZlcihldmVudCwgcm93SW5kZXgsIHJvdykge1xuICAgIHRoaXMuaG92ZXJSb3dEYXRhID0gcm93O1xuICAgIHRoaXMuaG92ZXJSb3dJbmRleCA9IHJvd0luZGV4O1xuXG4gICAgdGhpcy50b29sdGlwUG9zaXRpb24udG9wID0gZXZlbnQueTtcbiAgICB0aGlzLnRvb2x0aXBQb3NpdGlvbi5sZWZ0ID0gZXZlbnQueDsgIFxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYnJlYWtwb2ludFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5icmVha3BvaW50U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=