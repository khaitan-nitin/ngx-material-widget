(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/forms'), require('@angular/router'), require('@angular/cdk/layout'), require('@angular/material/button-toggle'), require('@angular/material/chips'), require('@angular/material/icon'), require('@angular/material/badge'), require('@angular/material/dialog'), require('@angular/material/button'), require('@angular/material/menu'), require('@angular/material/card'), require('@angular/material/tabs'), require('@angular/material/expansion'), require('@angular/material/sidenav'), require('@angular/material/bottom-sheet'), require('@angular/material/divider'), require('@angular/material/form-field'), require('@angular/material/input'), require('@angular/material/autocomplete'), require('@angular/material/select'), require('@angular/material/checkbox'), require('@angular/material/radio'), require('@angular/material/datepicker'), require('@angular/material-moment-adapter'), require('@angular/material/slider'), require('@angular/material/slide-toggle'), require('@angular/material/tooltip'), require('@angular/material/list'), require('@angular/material/table'), require('@angular/material/sort'), require('@angular/material/paginator'), require('@angular/material/grid-list'), require('@angular/material/progress-bar'), require('@angular/material/progress-spinner'), require('@angular/common/http'), require('@casl/angular'), require('@casl/ability'), require('ng2-tooltip-directive'), require('util'), require('crypto-js'), require('@angular/animations'), require('@angular/cdk/collections'), require('ngx-quill'), require('@angular/cdk/keycodes'), require('@angular/cdk/drag-drop'), require('@angular/flex-layout'), require('@angular/material/toolbar'), require('ngx-infinite-scroll'), require('@material-extended/mde'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('ngx-material-widget', ['exports', '@angular/core', '@angular/common', '@angular/forms', '@angular/router', '@angular/cdk/layout', '@angular/material/button-toggle', '@angular/material/chips', '@angular/material/icon', '@angular/material/badge', '@angular/material/dialog', '@angular/material/button', '@angular/material/menu', '@angular/material/card', '@angular/material/tabs', '@angular/material/expansion', '@angular/material/sidenav', '@angular/material/bottom-sheet', '@angular/material/divider', '@angular/material/form-field', '@angular/material/input', '@angular/material/autocomplete', '@angular/material/select', '@angular/material/checkbox', '@angular/material/radio', '@angular/material/datepicker', '@angular/material-moment-adapter', '@angular/material/slider', '@angular/material/slide-toggle', '@angular/material/tooltip', '@angular/material/list', '@angular/material/table', '@angular/material/sort', '@angular/material/paginator', '@angular/material/grid-list', '@angular/material/progress-bar', '@angular/material/progress-spinner', '@angular/common/http', '@casl/angular', '@casl/ability', 'ng2-tooltip-directive', 'util', 'crypto-js', '@angular/animations', '@angular/cdk/collections', 'ngx-quill', '@angular/cdk/keycodes', '@angular/cdk/drag-drop', '@angular/flex-layout', '@angular/material/toolbar', 'ngx-infinite-scroll', '@material-extended/mde', '@angular/platform-browser'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ngx-material-widget'] = {}, global.ng.core, global.ng.common, global.ng.forms, global.ng.router, global.ng.cdk.layout, global.ng.material.buttonToggle, global.ng.material.chips, global.ng.material.icon, global.ng.material.badge, global.ng.material.dialog, global.ng.material.button, global.ng.material.menu, global.ng.material.card, global.ng.material.tabs, global.ng.material.expansion, global.ng.material.sidenav, global.ng.material.bottomSheet, global.ng.material.divider, global.ng.material.formField, global.ng.material.input, global.ng.material.autocomplete, global.ng.material.select, global.ng.material.checkbox, global.ng.material.radio, global.ng.material.datepicker, global.ng.materialMomentAdapter, global.ng.material.slider, global.ng.material.slideToggle, global.ng.material.tooltip, global.ng.material.list, global.ng.material.table, global.ng.material.sort, global.ng.material.paginator, global.ng.material.gridList, global.ng.material.progressBar, global.ng.material.progressSpinner, global.ng.common.http, global.angular, global.ability, global.ng2TooltipDirective, global.util, global.CryptoJS, global.ng.animations, global.ng.cdk.collections, global.ngxQuill, global.ng.cdk.keycodes, global.ng.cdk.dragDrop, global.ng.flexLayout, global.ng.material.toolbar, global.ngxInfiniteScroll, global.mde, global.ng.platformBrowser));
}(this, (function (exports, core, common, forms, router, layout, buttonToggle, chips, icon, badge, dialog, button, menu, card, tabs, expansion, sidenav, bottomSheet, divider, formField, input, autocomplete, select, checkbox, radio, datepicker, materialMomentAdapter, slider, slideToggle, tooltip, list, table, sort, paginator, gridList, progressBar, progressSpinner, http, angular, ability, ng2TooltipDirective, util, CryptoJS, animations, collections, ngxQuill, keycodes, dragDrop, flexLayout, toolbar, ngxInfiniteScroll, mde, platformBrowser) { 'use strict';

    var BadgeUitls = /** @class */ (function () {
        function BadgeUitls() {
        }
        return BadgeUitls;
    }());

    var CollectionUtils = /** @class */ (function () {
        function CollectionUtils() {
        }
        CollectionUtils.isEmpty = function (value) {
            if (value == null || value == undefined || value == "" || value.length == 0) {
                return true;
            }
            else {
                return false;
            }
        };
        return CollectionUtils;
    }());

    var ButtonUtils = /** @class */ (function () {
        function ButtonUtils() {
        }
        ButtonUtils.instanceOfButton = function (object) {
            return 'type' in object &&
                //            !('groupIdentifier' in object) &&
                (object['type'] != "CHIP" /* CHIP */ && object['type'] != "GROUP" /* GROUP */ && object['type'] != "DROPDOWN" /* DROPDOWN */) &&
                (object['type'] == "FLAT" /* FLAT */ || object['type'] == "GHOST" /* GHOST */ || object['type'] == "RAISED" /* RAISED */ || object['type'] == "FAB" /* FAB */ || object['type'] == "STROKED" /* STROKED */);
        };
        ButtonUtils.instanceOfChipButton = function (object) {
            return 'type' in object && 'groupIdentifier' in object && object['type'] == "CHIP" /* CHIP */;
        };
        ButtonUtils.instanceOfButtonGroup = function (object) {
            return 'type' in object && 'groupIdentifier' in object && object['type'] == "GROUP" /* GROUP */;
        };
        ButtonUtils.instanceOfHoverButton = function (object) {
            return 'type' in object && 'groupIdentifier' in object && object['type'] == "DROPDOWN" /* DROPDOWN */;
        };
        ButtonUtils.instanceOfAnyButtonType = function (object) {
            var isButton = false;
            if (this.instanceOfButton(object) || this.instanceOfChipButton(object) || this.instanceOfButtonGroup(object) || this.instanceOfHoverButton(object)) {
                isButton = true;
            }
            return isButton;
        };
        ButtonUtils.hasWidth = function (buttons) {
            var hasButtonWidth = false;
            if (!CollectionUtils.isEmpty(buttons) && buttons.filter(function (button) { return button.width != null && button.width != ""; }).length > 0) {
                hasButtonWidth = true;
            }
            return hasButtonWidth;
        };
        ButtonUtils.setEqualWidth = function (buttons) {
            if (!CollectionUtils.isEmpty(buttons)) {
                var buttonCount = buttons.length;
                var buttonWidth_1 = 100 / buttonCount;
                buttons.forEach(function (button) {
                    button.width = "" + buttonWidth_1;
                });
            }
        };
        ButtonUtils.getAction = function (sourceIdentifier, sourceIndex, widgetArrayIndex, identifier, parentHierarchy, event, originalData, context, actionDialog) {
            var data = null;
            if (originalData) {
                data = Object.assign(Object.assign({}, originalData), context);
            }
            else {
                data = context;
                originalData = context;
            }
            var action = {
                sourceIdentifier: sourceIdentifier,
                sourceIndex: sourceIndex,
                widgetArrayIndex: widgetArrayIndex,
                action: identifier,
                actionData: actionDialog,
                data: data,
                originalData: originalData,
                parentHierarchy: parentHierarchy,
                event: event
            };
            return action;
        };
        ButtonUtils.isDisable = function (displayMode) {
            if (displayMode == "BLOCKED" /* BLOCKED */ || displayMode == "VIEW" /* VIEW */) {
                return true;
            }
            else {
                return false;
            }
        };
        return ButtonUtils;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var DependentUtils = /** @class */ (function () {
        function DependentUtils() {
        }
        DependentUtils.displayDependencyField = function (dependentOnFields, supportingRecord, record) {
            var e_1, _a, e_2, _b;
            var displayDependencyField = true;
            var displaySupportingDependencyField = true;
            if (dependentOnFields && dependentOnFields.length > 0 && record) {
                var _loop_1 = function (dependentField) {
                    var dependencyValue = "";
                    try {
                        dependencyValue = eval("record." + dependentField.key);
                    }
                    catch (e) {
                    }
                    if (dependencyValue != undefined) {
                        if (dependentField.condition instanceof Array) {
                            if (dependencyValue instanceof Array) {
                                var hasMatch_1 = false;
                                dependencyValue.forEach(function (value) {
                                    if (dependentField.condition.indexOf(value) > -1) {
                                        hasMatch_1 = true;
                                    }
                                });
                                if (hasMatch_1) {
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
                };
                try {
                    for (var dependentOnFields_1 = __values(dependentOnFields), dependentOnFields_1_1 = dependentOnFields_1.next(); !dependentOnFields_1_1.done; dependentOnFields_1_1 = dependentOnFields_1.next()) {
                        var dependentField = dependentOnFields_1_1.value;
                        _loop_1(dependentField);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (dependentOnFields_1_1 && !dependentOnFields_1_1.done && (_a = dependentOnFields_1.return)) _a.call(dependentOnFields_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            if (dependentOnFields && dependentOnFields.length > 0 && supportingRecord) {
                var _loop_2 = function (dependentField) {
                    var dependencyValue = "";
                    try {
                        dependencyValue = eval("supportingRecord." + dependentField.key);
                    }
                    catch (e) {
                    }
                    if (dependencyValue != undefined) {
                        if (dependentField.condition instanceof Array) {
                            if (dependencyValue instanceof Array) {
                                var hasMatch_2 = false;
                                dependencyValue.forEach(function (value) {
                                    if (dependentField.condition.indexOf(value) > -1) {
                                        hasMatch_2 = true;
                                    }
                                });
                                if (!hasMatch_2) {
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
                };
                try {
                    for (var dependentOnFields_2 = __values(dependentOnFields), dependentOnFields_2_1 = dependentOnFields_2.next(); !dependentOnFields_2_1.done; dependentOnFields_2_1 = dependentOnFields_2.next()) {
                        var dependentField = dependentOnFields_2_1.value;
                        _loop_2(dependentField);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (dependentOnFields_2_1 && !dependentOnFields_2_1.done && (_b = dependentOnFields_2.return)) _b.call(dependentOnFields_2);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            return displayDependencyField && displaySupportingDependencyField;
        };
        DependentUtils.getDependencyTree = function (formFields) {
            var e_3, _a, e_4, _b;
            var dependency = {};
            try {
                for (var formFields_1 = __values(formFields), formFields_1_1 = formFields_1.next(); !formFields_1_1.done; formFields_1_1 = formFields_1.next()) {
                    var formField = formFields_1_1.value;
                    if (formField.field.dependentOnFields && formField.field.dependentOnFields.length > 0) {
                        try {
                            for (var _c = (e_4 = void 0, __values(formField.field.dependentOnFields)), _d = _c.next(); !_d.done; _d = _c.next()) {
                                var dependentField = _d.value;
                                if (dependency[dependentField.key] == undefined || dependency[dependentField.key] == null) {
                                    dependency[dependentField.key] = new Array();
                                }
                                dependency[dependentField.key].push(formField.field.key);
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (formFields_1_1 && !formFields_1_1.done && (_a = formFields_1.return)) _a.call(formFields_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return dependency;
        };
        DependentUtils.getDependencyTreeForButton = function (buttonLayout) {
            var e_5, _a, e_6, _b, e_7, _c, e_8, _d, e_9, _e;
            var dependency = {};
            if (!CollectionUtils.isEmpty(buttonLayout.buttons)) {
                try {
                    for (var _f = __values(buttonLayout.buttons), _g = _f.next(); !_g.done; _g = _f.next()) {
                        var button = _g.value;
                        if (button.dependentOnFields && button.dependentOnFields.length > 0) {
                            try {
                                for (var _h = (e_6 = void 0, __values(button.dependentOnFields)), _j = _h.next(); !_j.done; _j = _h.next()) {
                                    var dependentField = _j.value;
                                    if (dependency[dependentField.key] == undefined || dependency[dependentField.key] == null) {
                                        dependency[dependentField.key] = new Array();
                                    }
                                    dependency[dependentField.key].push(button.identifier);
                                }
                            }
                            catch (e_6_1) { e_6 = { error: e_6_1 }; }
                            finally {
                                try {
                                    if (_j && !_j.done && (_b = _h.return)) _b.call(_h);
                                }
                                finally { if (e_6) throw e_6.error; }
                            }
                        }
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_g && !_g.done && (_a = _f.return)) _a.call(_f);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            }
            if (!CollectionUtils.isEmpty(buttonLayout.cells)) {
                try {
                    for (var _k = __values(buttonLayout.cells), _l = _k.next(); !_l.done; _l = _k.next()) {
                        var cell = _l.value;
                        try {
                            for (var _m = (e_8 = void 0, __values(cell.buttons.buttons)), _o = _m.next(); !_o.done; _o = _m.next()) {
                                var button = _o.value;
                                if (button.dependentOnFields && button.dependentOnFields.length > 0) {
                                    try {
                                        for (var _p = (e_9 = void 0, __values(button.dependentOnFields)), _q = _p.next(); !_q.done; _q = _p.next()) {
                                            var dependentField = _q.value;
                                            if (dependency[dependentField.key] == undefined || dependency[dependentField.key] == null) {
                                                dependency[dependentField.key] = new Array();
                                            }
                                            dependency[dependentField.key].push(button.identifier);
                                        }
                                    }
                                    catch (e_9_1) { e_9 = { error: e_9_1 }; }
                                    finally {
                                        try {
                                            if (_q && !_q.done && (_e = _p.return)) _e.call(_p);
                                        }
                                        finally { if (e_9) throw e_9.error; }
                                    }
                                }
                            }
                        }
                        catch (e_8_1) { e_8 = { error: e_8_1 }; }
                        finally {
                            try {
                                if (_o && !_o.done && (_d = _m.return)) _d.call(_m);
                            }
                            finally { if (e_8) throw e_8.error; }
                        }
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (_l && !_l.done && (_c = _k.return)) _c.call(_k);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
            }
            return dependency;
        };
        return DependentUtils;
    }());

    var ObjectUtils = /** @class */ (function () {
        function ObjectUtils() {
        }
        ObjectUtils.isEmpty = function (obj) {
            return obj == undefined || Object.keys(obj).length === 0;
        };
        ObjectUtils.resolve = function (text, obj) {
            if (!this.isEmpty(obj)) {
                for (var key in obj) {
                    text = text.replace('{' + key + '}', obj[key]);
                }
            }
            return text;
        };
        ObjectUtils.unflatten = function (_json) {
            function jsonToObj(data, result) {
                return Object.keys(data).reduce(function (acc, current, index) {
                    var inlineKeys = current.split('.');
                    var firstProp = inlineKeys.shift();
                    var hasProps = inlineKeys.length >= 1;
                    if (hasProps) {
                        var parsedKey = parseInt(inlineKeys[0], 10);
                        var isNextKeyNumber = !isNaN(parsedKey);
                        var _nextData = {};
                        if (!acc[firstProp]) {
                            acc[firstProp] = isNextKeyNumber ? [] : {};
                        }
                        if (isNextKeyNumber) {
                            var _index = parseInt(inlineKeys.shift(), 10);
                            var isValueInArray = acc[firstProp].length - 1 >= _index;
                            var currentValueObj = acc[firstProp][_index];
                            _nextData[inlineKeys.join('.')] = data[current];
                            acc[firstProp][_index] = isValueInArray
                                ? Object.assign(currentValueObj, jsonToObj(_nextData, currentValueObj))
                                : jsonToObj(_nextData, {});
                        }
                        else {
                            _nextData[inlineKeys.join('.')] = data[current];
                            Object.assign(acc[firstProp], jsonToObj(_nextData, acc[firstProp]));
                        }
                    }
                    else {
                        acc[firstProp] = data[current];
                    }
                    return acc;
                }, result);
            }
            return jsonToObj(_json, {});
        };
        ;
        return ObjectUtils;
    }());

    var StringUtils = /** @class */ (function () {
        function StringUtils() {
        }
        StringUtils.isEmpty = function (value) {
            if (value == null || value == undefined || value == "" || value.length == 0) {
                return true;
            }
            else {
                return false;
            }
        };
        return StringUtils;
    }());

    var FormUtils = /** @class */ (function () {
        function FormUtils() {
        }
        FormUtils.isFormDisable = function (displayMode) {
            if (displayMode == "BLOCKED" /* BLOCKED */ || displayMode == "VIEW" /* VIEW */) {
                return true;
            }
            else {
                return false;
            }
        };
        FormUtils.disableField = function (form, field) {
            if (form && form.get(field.key)) {
                form.get(field.key).disable();
            }
        };
        FormUtils.disableFieldControl = function (fieldControl) {
            if (fieldControl) {
                fieldControl.disable();
            }
        };
        FormUtils.checkUniqueIdentifier = function (forms) {
            //  TODO: 
        };
        FormUtils.getRawValue = function (form) {
            var formValue = {};
            if (form) {
                formValue = form.getRawValue();
            }
            return formValue;
        };
        FormUtils.initFormGroup = function (formFields, supportingRecord, record, displayMode) {
            var e_1, _a;
            var fieldControls = {};
            var isFormDisabled = this.isFormDisable(displayMode);
            try {
                for (var formFields_1 = __values(formFields), formFields_1_1 = formFields_1.next(); !formFields_1_1.done; formFields_1_1 = formFields_1.next()) {
                    var formField = formFields_1_1.value;
                    // if (!CollectionUtils.isEmpty(record)) {
                    FormUtils.initFieldGroup(fieldControls, formField, supportingRecord, record, displayMode);
                    // }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (formFields_1_1 && !formFields_1_1.done && (_a = formFields_1.return)) _a.call(formFields_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return new forms.FormGroup(fieldControls);
        };
        FormUtils.getFieldValidation = function (field) {
            var e_2, _a;
            var validations = new Array();
            if (field.validations && field.validations.length > 0) {
                try {
                    for (var _b = __values(field.validations), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var val = _c.value;
                        validations.push(val.type);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            return validations;
        };
        FormUtils.initFieldGroup = function (fieldControls, formField, supportingRecord, record, displayMode) {
            //        field.hide = false;
            if (!DependentUtils.displayDependencyField(formField.field.dependentOnFields, supportingRecord, record)) {
                if (record == null) {
                    record = {};
                }
                if (formField.addMore) {
                    record[formField.field.key] = [];
                }
                else {
                    record[formField.field.key] = null;
                }
                //          field.hide = true;
                return;
            }
            var validations = this.getFieldValidation(formField.field);
            if (formField.field.type == "CHECKBOX" /* CHECKBOX */) {
                var fieldValue = FormUtils.getValueViaEval(record, formField.field.key);
                if (formField.addMore) {
                    var options = record && fieldValue ? fieldValue : new Array();
                    fieldControls[formField.field.key] = new forms.FormArray([]);
                    for (var vCnt = 0; vCnt < options.length; vCnt++) {
                        var opts = this.getCheckboxOption(displayMode, formField.field, options[vCnt]);
                        fieldControls[formField.field.key].push(this.setFormGroup(displayMode, formField.field, opts, validations));
                    }
                }
                else {
                    var option = record && fieldValue ? fieldValue : null;
                    var opts = this.getCheckboxOption(displayMode, formField.field, option);
                    fieldControls[formField.field.key] = this.setFormGroup(displayMode, formField.field, opts, validations);
                }
            }
            else if (formField.field.type == "CALENDAR" /* CALENDAR */ && formField.field.dateRange) {
                var controls = {};
                if (validations && validations.length > 0) {
                    controls['startDate'] = new forms.FormControl('', validations);
                    controls['endDate'] = new forms.FormControl('', validations);
                }
                else {
                    controls['startDate'] = new forms.FormControl('');
                    controls['endDate'] = new forms.FormControl('');
                }
                fieldControls[formField.field.key] = this.setFormGroup(displayMode, formField.field, controls, validations);
            }
            else if (formField.field.type == "PARAGRAPH" /* PARAGRAPH */ && !CollectionUtils.isEmpty(formField.field.fieldContexts)) {
                var fieldValue = FormUtils.getValueViaEval(record, formField.field.key);
                var controls = this.getParagraphFields(displayMode, formField.field, fieldValue);
                fieldControls[formField.field.key] = this.setFormGroup(displayMode, formField.field, controls, validations);
            }
            else {
                if (formField.addMore) {
                    var values = this.getFormFieldValue(record, formField);
                    fieldControls[formField.field.key] = new forms.FormArray([]);
                    if (CollectionUtils.isEmpty(values)) {
                        fieldControls[formField.field.key].push(this.setFormControl(displayMode, formField.field, "", validations));
                    }
                    else {
                        for (var vCnt = 0; vCnt < values.length; vCnt++) {
                            fieldControls[formField.field.key].push(this.setFormControl(displayMode, formField.field, values[vCnt], validations));
                        }
                    }
                }
                else {
                    var value = this.getFormFieldValue(record, formField);
                    fieldControls[formField.field.key] = this.setFormControl(displayMode, formField.field, value, validations);
                }
            }
            return fieldControls;
        };
        FormUtils.dateRangeValidation = function (g) {
            return g.get('startDate').value || g.get('endDate').value
                ? null : { 'mismatch': true };
        };
        FormUtils.getCheckboxOption = function (displayMode, field, options) {
            var e_3, _a;
            var opts = {};
            if (field['options'] && field['options'].length > 0) {
                try {
                    for (var _b = __values(field['options']), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var opt = _c.value;
                        if (ObjectUtils.isEmpty(options)) {
                            if (opt['selected']) {
                                opt.checked = true;
                            }
                            else {
                                opt.checked = false;
                            }
                        }
                        else {
                            var optionSelected = options.indexOf(opt.key) > -1;
                            if (options && optionSelected) {
                                opt.checked = true;
                            }
                            else {
                                opt.checked = false;
                            }
                        }
                        opts[opt.key] = new forms.FormControl(opt.checked);
                        if (FieldUtils.isFieldDisabled(field, displayMode, "")) {
                            opts[opt.key].disable();
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
            return opts;
        };
        FormUtils.getParagraphFields = function (displayMode, field, fieldValues) {
            var e_4, _a;
            var fieldContexts = {};
            if (CollectionUtils.isEmpty(fieldValues)) {
                fieldValues = new Map();
            }
            if (field.fieldContexts && Object.keys(field.fieldContexts).length > 0) {
                try {
                    for (var _b = __values(Object.keys(field.fieldContexts)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var key = _c.value;
                        var fieldContextKey = field.fieldContexts[key];
                        var validations = this.getFieldValidation(fieldContextKey);
                        fieldContexts[fieldContextKey.key] = new forms.FormControl(fieldValues[fieldContextKey.key], validations);
                        if (FieldUtils.isFieldDisabled(field, displayMode, "")) {
                            fieldContexts[fieldContextKey.key].disable();
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
            return fieldContexts;
        };
        FormUtils.setFormGroup = function (displayMode, field, value, validations) {
            var formGroup;
            if (field.validations && field.validations.length > 0) {
                formGroup = new forms.FormGroup(value, validations);
            }
            else {
                formGroup = new forms.FormGroup(value);
            }
            if ((FieldUtils.isFieldDisabled(field, displayMode, value) || field.isReadOnly || field.type == "HIDDEN" /* HIDDEN */) && !StringUtils.isEmpty(value)) {
                formGroup.disable();
            }
            return formGroup;
        };
        FormUtils.setFormControl = function (displayMode, field, value, validations) {
            var formControl;
            if (field.validations && field.validations.length > 0) {
                formControl = new forms.FormControl(value, validations);
            }
            else {
                formControl = new forms.FormControl(value);
            }
            if (FieldUtils.isFieldDisabled(field, displayMode, value)) {
                formControl.disable();
            }
            else {
                formControl.enable();
            }
            return formControl;
        };
        FormUtils.getFormFieldValue = function (record, formField) {
            var value;
            var fieldValue = FormUtils.getValueViaEval(record, formField.field.key);
            if (formField.addMore) {
                var elements = new Array();
                if (!ObjectUtils.isEmpty(record) && !CollectionUtils.isEmpty(fieldValue) && util.isArray(fieldValue)) {
                    elements = fieldValue;
                }
                else {
                    elements.push("");
                }
                for (var cnt = 0; cnt < elements.length; cnt++) {
                    elements[cnt] = this.getFieldValue(elements[cnt], formField.field);
                }
                value = elements;
            }
            else {
                var recordValue = "";
                if (record && fieldValue) {
                    recordValue = fieldValue;
                }
                value = this.getFieldValue(recordValue, formField.field);
            }
            return value;
        };
        FormUtils.getFieldValue = function (recordValue, field) {
            var value = null;
            if (field.value) {
                value = field.value;
            }
            if (!StringUtils.isEmpty(recordValue)) {
                value = recordValue;
            }
            if (value == undefined || JSON.stringify(value) === '{}') {
                value = "";
            }
            return value;
        };
        FormUtils.reset = function (form, formConfig) {
            var e_5, _a;
            form.reset();
            if (formConfig != null) {
                try {
                    for (var _b = __values(formConfig.formFields), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var field = _c.value;
                        if (field.field.type == "AUTOCOMPLETE" /* AUTOCOMPLETE */) {
                            field['default'] = null;
                        }
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            }
        };
        FormUtils.getValueViaEval = function (record, key) {
            var value = "";
            try {
                if (StringUtils.isEmpty(value)) {
                    value = record[key];
                }
                value = eval("record." + key);
            }
            catch (e) { }
            return value;
        };
        FormUtils.setOptionsUsingKey = function (form, fieldKey, masterDataKey) {
            if (!CollectionUtils.isEmpty(form) && !CollectionUtils.isEmpty(form.formFields)) {
                form.formFields.forEach(function (formField) {
                    if (!CollectionUtils.isEmpty(formField) && !CollectionUtils.isEmpty(formField.field)) {
                        if (formField.field.key == fieldKey && (formField.field.type == "AUTOCOMPLETE" /* AUTOCOMPLETE */ || formField.field.type == "CHECKBOX" /* CHECKBOX */ || formField.field.type == "RADIO" /* RADIO */ || formField.field.type == "DROPDOWN" /* DROPDOWN */)) {
                            FieldUtils.setOptionsUsingKey(formField.field, masterDataKey);
                        }
                    }
                });
            }
        };
        FormUtils.setOptionsUsingValues = function (form, fieldKey, keyMap, relaodAll, record) {
            if (!CollectionUtils.isEmpty(form) && !CollectionUtils.isEmpty(form.formFields)) {
                form.formFields.forEach(function (formField) {
                    if (!CollectionUtils.isEmpty(formField) && !CollectionUtils.isEmpty(formField.field)) {
                        var isMatchingDependendKeyMap = false;
                        if (!StringUtils.isEmpty(formField.field.optionDependsOn)) {
                            //  get optionDependsOn field value
                            var optionDependsOnValue = FormUtils.getValueViaEval(record, formField.field.optionDependsOn);
                            if (keyMap.optionDependsOnValue == optionDependsOnValue) {
                                isMatchingDependendKeyMap = true;
                            }
                        }
                        else {
                            isMatchingDependendKeyMap = true;
                        }
                        if (formField.field.key == fieldKey && (formField.field.type == "AUTOCOMPLETE" /* AUTOCOMPLETE */ || formField.field.type == "CHECKBOX" /* CHECKBOX */ || formField.field.type == "RADIO" /* RADIO */ || formField.field.type == "DROPDOWN" /* DROPDOWN */)) {
                            if (isMatchingDependendKeyMap) { //} || relaodAll) {
                                FieldUtils.setOptionsUsingValues(formField.field, keyMap);
                            }
                        }
                    }
                });
            }
        };
        FormUtils.changeButtonLabelIcon = function (form, buttonIdentifier, label, icon) {
            if (!CollectionUtils.isEmpty(form) && !CollectionUtils.isEmpty(form.action) && !CollectionUtils.isEmpty(form.action.buttons)) {
                form.action.buttons.forEach(function (button) {
                    if (!CollectionUtils.isEmpty(button) && button.identifier == buttonIdentifier) {
                        if (!StringUtils.isEmpty(label)) {
                            button.label = label;
                        }
                        if (!StringUtils.isEmpty(icon)) {
                            button.icon = icon;
                        }
                    }
                });
            }
        };
        return FormUtils;
    }());

    var MasterDataUtils = /** @class */ (function () {
        function MasterDataUtils() {
        }
        MasterDataUtils.getMasterDataFromLocalStore = function (key) {
            var masterDataMap = JSON.parse(localStorage.getItem("masterData"));
            return masterDataMap[key];
        };
        MasterDataUtils.getMasterDataAsOptions = function (masterDataKey) {
            var masterData = MasterDataUtils.getMasterDataFromLocalStore(masterDataKey);
            var options = new Array();
            masterData.items.forEach(function (record) {
                options.push({ key: record.key, value: record.label });
            });
            return options;
        };
        return MasterDataUtils;
    }());

    var FieldUtils = /** @class */ (function () {
        function FieldUtils() {
        }
        FieldUtils.isFieldDisabled = function (field, currentDisplayMode, value) {
            var isDisabled = false;
            if (FormUtils.isFormDisable(currentDisplayMode) || field.displayMode == "DISABLED" /* DISABLED */ || field.type == "HIDDEN" /* HIDDEN */ || field.isReadOnly || (field.isUnique && currentDisplayMode == "EDIT" /* EDIT */ && !StringUtils.isEmpty(value))) {
                isDisabled = true;
            }
            return isDisabled;
        };
        FieldUtils.displayEllipsis = function (charLimit, value) {
            var showEllipsis = false;
            var strValue = JSON.stringify(value);
            if (charLimit && charLimit > 0 && !StringUtils.isEmpty(strValue) && strValue.length > charLimit) {
                showEllipsis = true;
            }
            return showEllipsis;
        };
        FieldUtils.readOnlyField = function () {
            return ["IMAGE" /* IMAGE */, "IMAGE_AND_TEXT" /* IMAGE_AND_TEXT */, "JSON" /* JSON */, "LABEL" /* LABEL */, "BOOLEAN" /* BOOLEAN */];
        };
        FieldUtils.isEllipsisField = function (field) {
            var hasEllipsis;
            if ((field.type == "LABEL" /* LABEL */ || field.type == "TEXT" /* TEXT */ || field.type == "TEXTAREA" /* TEXTAREA */ || field.type == "EMAIL" /* EMAIL */ || field.type == "PASSWORD" /* PASSWORD */) && field.ellipsis > 0) {
                hasEllipsis = true;
            }
            return hasEllipsis;
        };
        FieldUtils.setOptionsUsingKey = function (field, masterDataKey) {
            if (!CollectionUtils.isEmpty(field)) {
                var options = MasterDataUtils.getMasterDataAsOptions(masterDataKey);
                field.options = options;
            }
        };
        FieldUtils.setOptionsUsingValues = function (field, keyMap) {
            if (!CollectionUtils.isEmpty(field)) {
                field.options = keyMap.options;
            }
        };
        return FieldUtils;
    }());

    var FormCustomUtils = /** @class */ (function () {
        function FormCustomUtils() {
        }
        FormCustomUtils.setCustomLayout = function (formConfig, layout) {
            var _this = this;
            if (layout && !CollectionUtils.isEmpty(layout.cells)) {
                layout.cells.forEach(function (cell) {
                    if (!CollectionUtils.isEmpty(cell.controls)) {
                        cell.controls.forEach(function (control) {
                            if (CollectionUtils.isEmpty(control.control)) {
                                var resolvedControl = {};
                                resolvedControl = _this.getControl(formConfig, control);
                                control.control = resolvedControl;
                                // if (control.type == CellControllType.BUTTON && control.control['type'] == ButtonType.CHIP) {
                                //     control.control['groupIdentifier'] = control.control.identifier + cell.rows + cell.cols;
                                // }
                            }
                        });
                    }
                });
            }
            console.log(formConfig.layout);
        };
        FormCustomUtils.getControl = function (formConfig, cellControl) {
            var control = {};
            if (cellControl.control) {
                control = cellControl.control;
            }
            else if (!CollectionUtils.isEmpty(formConfig) && !CollectionUtils.isEmpty(formConfig.formFields) && cellControl.type == "FIELD" /* FIELD */) {
                control = this.getFieldControl(formConfig.formFields, cellControl.key);
            }
            else if (!CollectionUtils.isEmpty(formConfig) && !CollectionUtils.isEmpty(formConfig.action) && cellControl.type == "BUTTON" /* BUTTON */) {
                control = this.getButtonControl(formConfig.action, cellControl.key);
            }
            return control;
        };
        FormCustomUtils.getFieldControl = function (formFields, controlKey) {
            var control = {};
            formFields.forEach(function (formField) {
                if (!CollectionUtils.isEmpty(formField.field) && formField.field.key == controlKey) {
                    control = formField;
                }
            });
            return control;
        };
        FormCustomUtils.getButtonControl = function (action, controlKey) {
            var control;
            if (StringUtils.isEmpty(action['rowHeight'])) {
                action.buttons.forEach(function (button) {
                    if (button.identifier == controlKey) {
                        control = button;
                    }
                });
            }
            else {
                action.cells.forEach(function (cell) {
                    cell.buttons.buttons.forEach(function (button) {
                        if (button.identifier == controlKey) {
                            control = button;
                        }
                    });
                });
            }
            return control;
        };
        return FormCustomUtils;
    }());

    var ListUtils = /** @class */ (function () {
        function ListUtils() {
        }
        ListUtils.addColoumn = function () {
        };
        ListUtils.hideColoumn = function () {
        };
        ListUtils.setOptionsUsingKey = function (list, fieldKey, masterDataKey) {
            if (!CollectionUtils.isEmpty(list) && !CollectionUtils.isEmpty(list.columns)) {
                list.columns.forEach(function (column) {
                    if (!CollectionUtils.isEmpty(column) && !CollectionUtils.isEmpty(column.fields)) {
                        column.fields.forEach(function (field) {
                            if (!CollectionUtils.isEmpty(field) && field.key == fieldKey && (field.type == "AUTOCOMPLETE" /* AUTOCOMPLETE */ || field.type == "CHECKBOX" /* CHECKBOX */ || field.type == "RADIO" /* RADIO */ || field.type == "DROPDOWN" /* DROPDOWN */)) {
                                FieldUtils.setOptionsUsingKey(field, masterDataKey);
                            }
                        });
                    }
                });
            }
        };
        ListUtils.setOptionsUsingValues = function (list, fieldKey, keyMap, relaodAll, record) {
            if (!CollectionUtils.isEmpty(list) && !CollectionUtils.isEmpty(list.columns)) {
                list.columns.forEach(function (column) {
                    if (!CollectionUtils.isEmpty(column) && !CollectionUtils.isEmpty(column.fields)) {
                        column.fields.forEach(function (field) {
                            var isMatchingDependendKeyMap = false;
                            if (!StringUtils.isEmpty(field.optionDependsOn)) {
                                //  get optionDependsOn field value
                                var optionDependsOnValue = FormUtils.getValueViaEval(record, field.optionDependsOn);
                                if (keyMap.optionDependsOnValue == optionDependsOnValue) {
                                    isMatchingDependendKeyMap = true;
                                }
                            }
                            else {
                                isMatchingDependendKeyMap = true;
                            }
                            if (!CollectionUtils.isEmpty(field) && field.key == fieldKey && (field.type == "AUTOCOMPLETE" /* AUTOCOMPLETE */ || field.type == "CHECKBOX" /* CHECKBOX */ || field.type == "RADIO" /* RADIO */ || field.type == "DROPDOWN" /* DROPDOWN */)) {
                                if (isMatchingDependendKeyMap) { //} || relaodAll)   {
                                    FieldUtils.setOptionsUsingValues(field, keyMap);
                                }
                            }
                        });
                    }
                });
            }
        };
        ListUtils.getColumnKey = function (column) {
            var key;
            if (column.key) {
                key = column.key;
            }
            else {
                if (column.fields && column.fields.length > 0) {
                    key = column.fields[0].key;
                }
            }
            return key;
        };
        ListUtils.getColumnLabel = function (column) {
            var label;
            if (column.label) {
                label = column.label;
            }
            else {
                if (column.fields && column.fields.length > 0) {
                    label = column.fields[0].label;
                }
            }
            return label;
        };
        ListUtils.getColumnSelectorField = function (listConfig) {
            var e_1, _a;
            var options = new Array();
            var values = new Array();
            try {
                for (var _b = __values(listConfig.columns), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var column = _c.value;
                    var key = this.getColumnKey(column);
                    var label = this.getColumnLabel(column);
                    options.push({
                        key: key,
                        value: label,
                        disabled: false,
                        selected: column.show
                    });
                    if (column.show) {
                        values.push(key);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var columnSelectorField = {
                key: "columnSelector",
                label: "Display Column",
                type: "DROPDOWN" /* DROPDOWN */,
                appearance: "STANDARD" /* STANDARD */,
                isReadOnly: false,
                fieldDisplayType: "INLINE" /* INLINE */,
                placeholder: "Columns to display",
                options: options,
                multiselect: true,
                value: values
            };
            return columnSelectorField;
        };
        ListUtils.getMobileConfig = function (listConfig) {
            if (!CollectionUtils.isEmpty(listConfig) && !CollectionUtils.isEmpty(listConfig.mobile) && !CollectionUtils.isEmpty(listConfig.mobile.cells)) {
                this.setCustomLayout(listConfig, listConfig.mobile);
            }
        };
        ListUtils.setCustomLayouts = function (listConfig) {
            var _this = this;
            if (this.hasRowHover(listConfig)) {
                this.setCustomLayout(listConfig, listConfig.row.hover.template.layout);
            }
            if (this.hasCustomCellLayout(listConfig)) {
                listConfig.columns.forEach(function (column) {
                    if (column.template && column.template.layout) {
                        _this.setCustomLayout(listConfig, column.template.layout);
                    }
                });
            }
            if (this.hasCustomRowLayout(listConfig)) {
                this.setCustomLayout(listConfig, listConfig.row.template.layout);
            }
        };
        ListUtils.hasRowHover = function (listConfig) {
            var hasHoverConfig = false;
            if (listConfig && listConfig.row && listConfig.row.hover && listConfig.row.hover.template && listConfig.row.hover.template.layout) {
                hasHoverConfig = true;
            }
            return hasHoverConfig;
        };
        ListUtils.hasCustomRowLayout = function (listConfig) {
            var hasCustomRowLayout = false;
            if (listConfig && listConfig.row && listConfig.row.template && listConfig.row.template.layout) {
                hasCustomRowLayout = true;
            }
            return hasCustomRowLayout;
        };
        ListUtils.hasCustomCellLayout = function (listConfig) {
            var hasCustomCellLayout = false;
            if (listConfig && !CollectionUtils.isEmpty(listConfig.columns)) {
                listConfig.columns.forEach(function (column) {
                    if (column.template && column.template.layout) {
                        hasCustomCellLayout = true;
                    }
                });
            }
            return hasCustomCellLayout;
        };
        ListUtils.setCustomLayout = function (listConfig, layout) {
            var _this = this;
            if (layout && !CollectionUtils.isEmpty(layout.cells)) {
                layout.cells.forEach(function (cell) {
                    if (!CollectionUtils.isEmpty(cell.controls)) {
                        cell.controls.forEach(function (control) {
                            if (CollectionUtils.isEmpty(control.control)) {
                                var resolvedControl = {};
                                resolvedControl = _this.getControl(listConfig, control);
                                control.control = resolvedControl.control;
                                control.colIndex = resolvedControl.colIndex;
                                control.cControlIndex = resolvedControl.cControlIndex;
                                // if (control.type == CellControllType.BUTTON && control.control['type'] == ButtonType.CHIP) {
                                //     control.control['groupIdentifier'] = control.control.identifier + cell.rows + cell.cols;
                                // }
                            }
                        });
                    }
                });
            }
        };
        ListUtils.getControl = function (listConfig, cellControl) {
            var control = {};
            if (cellControl.control) {
                control = { control: cellControl.control, colIndex: 0, cControlIndex: 0 };
            }
            else if (!CollectionUtils.isEmpty(listConfig) && !CollectionUtils.isEmpty(listConfig.columns) && cellControl.type == "FIELD" /* FIELD */) {
                control = this.getColumnControl(listConfig.columns, cellControl.key);
            }
            else if (!CollectionUtils.isEmpty(listConfig) && !CollectionUtils.isEmpty(listConfig.actions) && cellControl.type == "BUTTON" /* BUTTON */) {
                control.control = this.getButtonControl(listConfig.actions, cellControl.key);
                control.colIndex = listConfig.columns.length;
            }
            return control;
        };
        ListUtils.getColumnControl = function (columns, controlKey) {
            var control = {};
            var colIndex = 0;
            columns.forEach(function (column) {
                if (!CollectionUtils.isEmpty(column.fields) && CollectionUtils.isEmpty(control.control)) {
                    var cControlIndex_1 = 0;
                    column.fields.forEach(function (field) {
                        if (CollectionUtils.isEmpty(control.control)) {
                            control = ListUtils.getFieldControl(field, controlKey, colIndex, cControlIndex_1);
                            cControlIndex_1++;
                        }
                    });
                }
                colIndex++;
            });
            return control;
        };
        ListUtils.getFieldControl = function (field, controlKey, colIndex, cControlIndex) {
            var control = {};
            if (field.key == controlKey) {
                control.control = field;
                control.colIndex = colIndex;
                control.cControlIndex = cControlIndex;
                console.log("1111111");
                console.log(control);
            }
            return control;
        };
        ListUtils.getButtonControl = function (buttons, controlKey) {
            var control;
            buttons.forEach(function (button) {
                if (button.identifier == controlKey) {
                    control = button;
                }
            });
            return control;
        };
        return ListUtils;
    }());

    var PropertyUtils = /** @class */ (function () {
        function PropertyUtils() {
        }
        PropertyUtils.getPropertyFromLocalStore = function (key) {
            var propertiesMap = JSON.parse(localStorage.getItem("properties"));
            return propertiesMap[key];
        };
        return PropertyUtils;
    }());

    var SecurityUtils = /** @class */ (function () {
        function SecurityUtils() {
        }
        SecurityUtils.encrypt = function (data) {
            try {
                return CryptoJS.AES.encrypt(JSON.stringify(data), 'key').toString();
            }
            catch (e) {
                Error(e);
            }
        };
        SecurityUtils.decrypt = function (data) {
            try {
                var bytes = CryptoJS.AES.decrypt(data, 'key');
                if (bytes.toString()) {
                    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                }
                return data;
            }
            catch (e) {
                Error(e);
            }
        };
        return SecurityUtils;
    }());

    var DropdownUtils = /** @class */ (function () {
        function DropdownUtils() {
        }
        DropdownUtils.getValue = function (key, options) {
            var value;
            if (!CollectionUtils.isEmpty(options)) {
                options.forEach(function (option) {
                    if (option.key == key) {
                        value = option.value;
                    }
                });
            }
            return value;
        };
        return DropdownUtils;
    }());

    var CrudUtils = /** @class */ (function () {
        function CrudUtils() {
        }
        CrudUtils.setOptionsUsingKey = function (crud, fieldKey, masterDataKey) {
            if (!CollectionUtils.isEmpty(crud) && !CollectionUtils.isEmpty(crud.form) && !CollectionUtils.isEmpty(crud.form.tabs)) {
                crud.form.tabs.forEach(function (tab) {
                    if (!CollectionUtils.isEmpty(tab) && !CollectionUtils.isEmpty(tab.widgets)) {
                        tab.widgets.forEach(function (widget) {
                            if (!CollectionUtils.isEmpty(widget) && widget.widgetType == "FORM" /* FORM */) {
                                FormUtils.setOptionsUsingKey(widget.widget, fieldKey, masterDataKey);
                            }
                            if (!CollectionUtils.isEmpty(widget) && widget.widgetType == "LIST" /* LIST */) {
                                ListUtils.setOptionsUsingKey(widget.widget, fieldKey, masterDataKey);
                            }
                        });
                    }
                });
            }
            if (!CollectionUtils.isEmpty(crud) && !CollectionUtils.isEmpty(crud.list) && !CollectionUtils.isEmpty(crud.list.lists)) {
                crud.list.lists.forEach(function (list) {
                    if (!CollectionUtils.isEmpty(list)) {
                        ListUtils.setOptionsUsingKey(list, fieldKey, masterDataKey);
                    }
                });
            }
            if (!CollectionUtils.isEmpty(crud) && !CollectionUtils.isEmpty(crud.search) && !CollectionUtils.isEmpty(crud.search.form)) {
                FormUtils.setOptionsUsingKey(crud.search.form, fieldKey, masterDataKey);
            }
        };
        CrudUtils.setOptionsUsingValues = function (crud, fieldKey, keyMap, relaodAll, record) {
            if (!CollectionUtils.isEmpty(crud) && !CollectionUtils.isEmpty(crud.form) && !CollectionUtils.isEmpty(crud.form.tabs)) {
                crud.form.tabs.forEach(function (tab) {
                    if (!CollectionUtils.isEmpty(tab) && !CollectionUtils.isEmpty(tab.widgets)) {
                        tab.widgets.forEach(function (widget) {
                            if (!CollectionUtils.isEmpty(widget) && widget.widgetType == "FORM" /* FORM */) {
                                FormUtils.setOptionsUsingValues(widget.widget, fieldKey, keyMap, relaodAll, record);
                            }
                            if (!CollectionUtils.isEmpty(widget) && widget.widgetType == "LIST" /* LIST */) {
                                ListUtils.setOptionsUsingValues(widget.widget, fieldKey, keyMap, relaodAll, record);
                            }
                        });
                    }
                });
            }
            if (!CollectionUtils.isEmpty(crud) && !CollectionUtils.isEmpty(crud.list) && !CollectionUtils.isEmpty(crud.list.lists)) {
                crud.list.lists.forEach(function (list) {
                    if (!CollectionUtils.isEmpty(list)) {
                        ListUtils.setOptionsUsingValues(list, fieldKey, keyMap, relaodAll, record);
                    }
                });
            }
            if (!CollectionUtils.isEmpty(crud) && !CollectionUtils.isEmpty(crud.search) && !CollectionUtils.isEmpty(crud.search.form)) {
                FormUtils.setOptionsUsingValues(crud.search.form, fieldKey, keyMap, relaodAll, record);
            }
        };
        CrudUtils.setDisplayType = function (crudTabs, formDisplayMode) {
            if (!CollectionUtils.isEmpty(crudTabs)) {
                crudTabs.forEach(function (tab) {
                    if (!CollectionUtils.isEmpty(tab) && !CollectionUtils.isEmpty(tab.widgets)) {
                        tab.widgets.forEach(function (widget) {
                            if (!CollectionUtils.isEmpty(widget) && widget.widgetType == "FORM" /* FORM */) {
                                widget.widget.displayMode = formDisplayMode;
                            }
                        });
                    }
                });
            }
        };
        CrudUtils.changeButtonLabelIcon = function (crudTabs, buttonIdentifier, label, icon) {
            if (!CollectionUtils.isEmpty(crudTabs)) {
                crudTabs.forEach(function (tab) {
                    if (!CollectionUtils.isEmpty(tab) && !CollectionUtils.isEmpty(tab.widgets)) {
                        tab.widgets.forEach(function (widget) {
                            if (!CollectionUtils.isEmpty(widget) && widget.widgetType == "FORM" /* FORM */) {
                                FormUtils.changeButtonLabelIcon(widget.widget, buttonIdentifier, label, icon);
                            }
                        });
                    }
                });
            }
        };
        return CrudUtils;
    }());

    var KeyMapUtils = /** @class */ (function () {
        function KeyMapUtils() {
        }
        KeyMapUtils.push = function (keyMaps, associations, options, optionType, optionComponent, optionDependsOnValue, record) {
            // if (CollectionUtils.isEmpty(keyMaps)) {
            //   keyMaps = new Array<KeyMap>();
            // }
            var optionsDD;
            if (!(options instanceof Array)) {
                optionsDD = MasterDataUtils.getMasterDataAsOptions(options);
            }
            else {
                optionsDD = options;
            }
            if (!CollectionUtils.isEmpty(associations)) {
                keyMaps.push(KeyMapUtils.generateKeyMap(associations, options, optionDependsOnValue));
                KeyMapUtils.setOptionssUsingValues(keyMaps, true, optionType, optionComponent, record);
            }
            return keyMaps;
        };
        KeyMapUtils.generateKeyMap = function (associations, options, optionDependsOnValue) {
            // if (CollectionUtils.isEmpty(keyMaps)) {
            //   keyMaps = new Array<KeyMap>();
            // }
            var optionsDD;
            if (!(options instanceof Array)) {
                optionsDD = MasterDataUtils.getMasterDataAsOptions(options);
            }
            else {
                optionsDD = options;
            }
            var keyMap;
            if (!CollectionUtils.isEmpty(associations)) {
                keyMap = { associations: associations, options: optionsDD, optionDependsOnValue: optionDependsOnValue };
            }
            return keyMap;
        };
        KeyMapUtils.setOptionssUsingValues = function (keyMaps, relaodAll, optionType, optionComponent, record) {
            if (!CollectionUtils.isEmpty(keyMaps)) {
                keyMaps.forEach(function (keyMap) {
                    if (!CollectionUtils.isEmpty(keyMap.associations)) {
                        keyMap.associations.forEach(function (association) {
                            if (optionType != null && "CRUD" /* CRUD */ == optionType) {
                                CrudUtils.setOptionsUsingValues(optionComponent, association.fieldKey, keyMap, relaodAll, record);
                            }
                            if ("FORM" /* FORM */ == optionType) {
                                FormUtils.setOptionsUsingValues(optionComponent, association.fieldKey, keyMap, relaodAll, record);
                            }
                            if ("LIST" /* LIST */ == optionType) {
                                ListUtils.setOptionsUsingValues(optionComponent, association.fieldKey, keyMap, relaodAll, record);
                            }
                        });
                    }
                });
            }
        };
        KeyMapUtils.getValue = function (keyMaps, fieldKey, valueAsKey) {
            var value = "";
            if (!CollectionUtils.isEmpty(keyMaps)) {
                keyMaps.forEach(function (keyMap) {
                    if (!CollectionUtils.isEmpty(keyMap.associations)) {
                        keyMap.associations.forEach(function (association) {
                            if (association.fieldKey == fieldKey && !CollectionUtils.isEmpty(keyMap.options)) {
                                keyMap.options.forEach(function (option) {
                                    if (option.key == valueAsKey) {
                                        value = option.value;
                                    }
                                });
                            }
                        });
                    }
                });
            }
            return value;
        };
        return KeyMapUtils;
    }());

    var AbilityUtils = /** @class */ (function () {
        function AbilityUtils() {
        }
        AbilityUtils.setAbility = function (ability) {
            var user = JSON.parse(localStorage.getItem("user"));
            if (user && user['permissions']) {
                var rules = user['permissions'];
                ability.update(rules);
            }
        };
        return AbilityUtils;
    }());

    // export * from './crud.utility';

    var ButtonDeleteConfirmationComponent = /** @class */ (function () {
        function ButtonDeleteConfirmationComponent(dialogRef, data, ability) {
            this.dialogRef = dialogRef;
            this.data = data;
            this.ability = ability;
            AbilityUtils.setAbility(this.ability);
        }
        ButtonDeleteConfirmationComponent.prototype.ngOnInit = function () {
            this.title = this.resolve(this.data.confirmationConfig.title);
            this.message = this.resolve(this.data.confirmationConfig.message);
        };
        ButtonDeleteConfirmationComponent.prototype.displayOnlyIcon = function (button) {
            return button && !StringUtils.isEmpty(button.icon) && StringUtils.isEmpty(button.label) ? true : false;
        };
        ButtonDeleteConfirmationComponent.prototype.displayIcon = function (button) {
            return button && !StringUtils.isEmpty(button.icon) ? true : false;
        };
        ButtonDeleteConfirmationComponent.prototype.resolve = function (text) {
            return ObjectUtils.resolve(text, this.data.originalData);
        };
        ButtonDeleteConfirmationComponent.prototype.click = function (event) {
            this.dialogRef.close(event);
        };
        return ButtonDeleteConfirmationComponent;
    }());
    ButtonDeleteConfirmationComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'cf-button-delete-confirmation',
                    template: "<h1 mat-dialog-title *ngIf=\"title\">{{title}}</h1>\n<div mat-dialog-content *ngIf=\"message\">\n  <p>{{message}}</p>\n</div>\n<div \n  mat-dialog-actions \n  [style.text-align]=\"'right'\"\n  class=\"cf-dialog-action\">\n    <!-- <button mat-flat-button *ngFor=\"let dialogButton of data.confirmationConfig.buttons\" \n        [color]=\"dialogButton.color\" [mat-dialog-close]=\"dialogButton.type\" cdkFocusInitial>\n        <mat-icon aria-hidden=\"true\" [attr.aria-label]=\"dialogButton.label\" [ngClass]=\"{'button-icon-text-padding': dialogButton.icon && dialogButton.label}\" *ngIf=\"displayIcon(dialogButton)\">{{dialogButton.icon}}</mat-icon>\n        <span *ngIf=\"!displayOnlyIcon(dialogButton)\">{{ dialogButton.label }}</span>\n    </button> -->\n    <!-- <pre>{{data | json}}</pre>  -->\n    <cf-button *ngFor=\"let button of data.confirmationConfig.buttons\"\n      [form]=\"data.form\"\n      [sourceIdentifier]=\"data.sourceIdentifier\"\n      [sourceIndex]=\"data.sourceIndex\"\n      [widgetArrayIndex]=\"data.widgetArrayIndex\"\n      [button]=\"button\"\n      [context]=\"data.context\"\n      [originalData]=\"data.originalData\"\n      [buttonRoute]=\"data.buttonRoute\"\n      [parentHierarchy]=\"data.parentHierarchy\"\n      class=\"cf-button\"\n      (onClick)=\"click($event)\"\n    ></cf-button>\n</div>",
                    styles: [".cf-dialog-action{text-align:right}.cf-dialog-action>.cf-button{margin-right:8px}"]
                },] }
    ];
    ButtonDeleteConfirmationComponent.ctorParameters = function () { return [
        { type: dialog.MatDialogRef },
        { type: undefined, decorators: [{ type: core.Inject, args: [dialog.MAT_DIALOG_DATA,] }] },
        { type: ability.Ability }
    ]; };

    var ButtonComponent = /** @class */ (function () {
        function ButtonComponent(dialog, router, route, ability) {
            this.dialog = dialog;
            this.router = router;
            this.route = route;
            this.ability = ability;
            this.onClick = new core.EventEmitter();
            this.onIconClick = new core.EventEmitter();
            this.routerLink = [];
            this.displayButton = true;
            this.isButtonDisabled = false;
            this.isDisplayOnlyIcon = false;
            this.hasIconDisplay = false;
            this.isFlatButton = false;
            this.isGhostButton = false;
            this.isRaisedButton = false;
            this.isStrokedButton = false;
            this.isFabButton = false;
            this.isChip = false;
            this.isLink = false;
            this.isGroupButton = false;
            this.isMenuButton = false;
            this.buttonWithoutPadding = false;
            this.state = true;
            AbilityUtils.setAbility(this.ability);
        }
        Object.defineProperty(ButtonComponent.prototype, "button", {
            get: function () {
                return this._button;
            },
            set: function (_button) {
                this._button = _button;
                if (StringUtils.isEmpty(this.label) || !StringUtils.isEmpty(this._button.label)) {
                    this.label = this._button.label;
                }
                if (StringUtils.isEmpty(this._button.width)) {
                    this._button.width = '';
                }
                else {
                    this._button.width = this._button.width + '%';
                    document.documentElement.style.setProperty('--width', this._button.width + '%');
                }
                if (StringUtils.isEmpty(this._button.iconPosition)) {
                    this._button.iconPosition = "LEFT" /* LEFT */;
                }
            },
            enumerable: false,
            configurable: true
        });
        ButtonComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (this.displayButton) {
                this.setLabel();
                this.setButtonEnable();
                if (this.form) {
                    this.formSubscription = this.form.valueChanges.subscribe(function (obj) {
                        _this.setButtonEnable();
                    });
                }
                this.setButtonDisplay();
                this.setOnlyIconDisplay();
                this.setIconDisplay();
                this.setLink();
                this.setGroupButton();
                this.setFlatButton();
                this.setGhostButton();
                this.setRaisedButton();
                this.setStrokedButton();
                this.setFabButton();
                this.setChip();
                this.setButtonWithoutPadding();
                this.setMenuButton();
            }
        };
        ButtonComponent.prototype.setButtonDisplay = function () {
            if ((!CollectionUtils.isEmpty(this._button.displayInFormModes) && this._button.displayInFormModes.indexOf(this.formDisplayMode) <= -1) || !DependentUtils.displayDependencyField(this._button.dependentOnFields, null, this.context ? this.context : this.originalData)) {
                this.displayButton = false;
            }
        };
        ButtonComponent.prototype.setButtonWithoutPadding = function () {
            if (this._button.identifier == "fieldTextClearBtn" || this._button.identifier == "fieldRouteToBtn" || this._button.identifier == "listFieldAsLink" || this.identifier == "listFieldAsLink") {
                this.buttonWithoutPadding = true;
            }
        };
        ButtonComponent.prototype.setLabel = function () {
            if (StringUtils.isEmpty(this.label)) {
                this.label = this._button.label;
            }
        };
        ButtonComponent.prototype.click = function (event) {
            if (!CollectionUtils.isEmpty(this._button.confirmationConfiguration)) {
                this.openDialog(event);
            }
            else {
                this.invokeAction(null, event);
            }
        };
        ButtonComponent.prototype.openDialog = function (event) {
            var _this = this;
            var dialogRef = this.dialog.open(ButtonDeleteConfirmationComponent, {
                width: this._button.confirmationConfiguration.width ? this._button.confirmationConfiguration.width : '250px',
                data: {
                    form: this.form,
                    sourceIdentifier: this.sourceIdentifier,
                    sourceIndex: this.sourceIndex,
                    widgetArrayIndex: this.widgetArrayIndex,
                    context: this.context,
                    originalData: this.originalData,
                    buttonRoute: this.buttonRoute,
                    parentHierarchy: this.parentHierarchy,
                    confirmationConfig: this._button.confirmationConfiguration,
                }
            });
            dialogRef.afterClosed().subscribe(function (result) {
                console.log('The dialog was closed');
                _this.invokeAction(result, event);
            });
        };
        ButtonComponent.prototype.invokeAction = function (actionDialog, event) {
            if (this._button.identifier == "crudBackButton" && this.buttonRoute && this.buttonRoute.length > 0) {
                this.router.navigate(this.buttonRoute, { skipLocationChange: false, replaceUrl: true });
                return;
            }
            if (this._button.identifier == "reset" /* RESET */) {
                FormUtils.reset(this.form);
                this.context = {};
            }
            var action = ButtonUtils.getAction(this.sourceIdentifier, this.sourceIndex, this.widgetArrayIndex, this._button.identifier, this.parentHierarchy, event, this.originalData, this.context, actionDialog);
            if (this._button.identifier == "search" /* SEARCH */ || this._button.identifier == "reset" /* RESET */) {
                this.addSearchParamsInUrl(action.data);
            }
            else {
                this.onClick.emit(action);
            }
        };
        ButtonComponent.prototype.iconClick = function (event) {
            var action = ButtonUtils.getAction(this.sourceIdentifier, this.sourceIndex, this.widgetArrayIndex, this._button.identifier, this.parentHierarchy, event, this.originalData, this.context, null);
            if (this._button['groupIdentifier'] == "clearFilterField" /* CLEAR_FILTER_FIELD */) {
                delete action.data[action.action];
                this.addSearchParamsInUrl(action.data);
            }
            else {
                this.onIconClick.emit(action);
            }
        };
        ButtonComponent.prototype.addSearchParamsInUrl = function (filterData) {
            var queryParams = { filter: SecurityUtils.encrypt(filterData) };
            this.router.navigate([], {
                relativeTo: this.route,
                queryParams: queryParams,
                queryParamsHandling: 'merge',
                skipLocationChange: false,
                replaceUrl: true
            });
        };
        ButtonComponent.prototype.setButtonEnable = function () {
            var isButtonDisabled = false;
            if (this.form) {
                isButtonDisabled = !this.form.valid;
            }
            if (this.form && this.form.disabled) {
                isButtonDisabled = false;
            }
            if (this._button.identifier == "search" /* SEARCH */ || this._button.identifier == "cancel" /* CANCEL */ || this._button.identifier == "reset" /* RESET */ || this._button.identifier == "add_field" /* ADD_FIELD */ || this._button.identifier == "remove_field" /* REMOVE_FIELD */ || this._button.alwaysEnable == true) {
                isButtonDisabled = false;
            }
            if (this.disabled) {
                isButtonDisabled = this.disabled;
            }
            this.isButtonDisabled = isButtonDisabled;
        };
        ButtonComponent.prototype.setOnlyIconDisplay = function () {
            this.isDisplayOnlyIcon = this._button && this._button.onlyIcon && !StringUtils.isEmpty(this._button.icon) ? true : false;
        };
        ButtonComponent.prototype.setIconDisplay = function () {
            this.hasIconDisplay = this._button && this._button.icon ? true : false;
        };
        ButtonComponent.prototype.setFlatButton = function () {
            this.isFlatButton = this._button && ButtonUtils.instanceOfButton(this._button) ? this._button.type == "FLAT" /* FLAT */ && !this.isGroupButton && !this.isLink : false;
        };
        ButtonComponent.prototype.setGhostButton = function () {
            this.isGhostButton = this._button && ButtonUtils.instanceOfButton(this._button) ? this._button.type == "GHOST" /* GHOST */ && !this.isGroupButton && !this.isLink : false;
        };
        ButtonComponent.prototype.setRaisedButton = function () {
            this.isRaisedButton = this._button && ButtonUtils.instanceOfButton(this._button) ? this._button.type == "RAISED" /* RAISED */ && !this.isGroupButton && !this.isLink : false;
        };
        ButtonComponent.prototype.setStrokedButton = function () {
            this.isStrokedButton = this._button && ButtonUtils.instanceOfButton(this._button) ? this._button.type == "STROKED" /* STROKED */ && !this.isGroupButton && !this.isLink : false;
        };
        ButtonComponent.prototype.setFabButton = function () {
            this.isFabButton = this._button && ButtonUtils.instanceOfButton(this._button) ? this._button.type == "FAB" /* FAB */ && !this.isGroupButton && !this.isLink : false;
        };
        ButtonComponent.prototype.setChip = function () {
            this.isChip = this._button && ButtonUtils.instanceOfChipButton(this._button) && !StringUtils.isEmpty(this._button.groupIdentifier) ? true : false;
        };
        ButtonComponent.prototype.setLink = function () {
            this.isLink = this._button && !StringUtils.isEmpty(this.label) ? !CollectionUtils.isEmpty(this._button.routerLink) : false;
            this.routerLink = this._button.routerLink;
        };
        ButtonComponent.prototype.setGroupButton = function () {
            this.isGroupButton = this._button && ButtonUtils.instanceOfButtonGroup(this._button) && !StringUtils.isEmpty(this._button.groupIdentifier) ? true : false;
        };
        ButtonComponent.prototype.setMenuButton = function () {
            this.isMenuButton = this._button && ButtonUtils.instanceOfHoverButton(this._button) ? true : false;
        };
        ButtonComponent.prototype.ngOnDestroy = function () {
            if (this.formSubscription) {
                this.formSubscription.unsubscribe();
            }
        };
        return ButtonComponent;
    }());
    ButtonComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'cf-button',
                    template: "<!-- <pre>{{ _button.size == 'small' }}</pre> -->\n<span \n    [style.width]=\"_button.width\"\n    class=\"cf-button-wrapper\" \n    *ngIf=\"_button && displayButton && (_button.permission == null || (_button.permission && (_button.permission['subject'] | can: _button.permission['action'])))\">\n    <button \n        mat-menu-item  \n        *ngIf=\"isMenuButton\"\n        [disabled]=\"isButtonDisabled\" \n        [ngClass]=\"{'cf-small-btn': _button.size == 'small', 'cf-tiny-btn': _button.size == 'tiny', 'cf-micro-btn': _button.size == 'micro', 'cf-default-btn': _button.size == 'default'}\" \n        class=\"cf-menu-button cf-menu-button-{{_button.identifier}}\"\n        [ngStyle]=\"{'width': 'calc(' + _button.width + ' - 8px)'}\"\n        [attr.color]=\"_button.color\"  \n        (click)=\"click($event)\" \n    >\n        <ng-container *ngTemplateOutlet=\"cfButtonIcon\"></ng-container>\n    </button>\n\n    <button \n        mat-flat-button\n        *ngIf=\"isFlatButton\"\n        [color]=\"_button.color\" \n        [disabled]=\"isButtonDisabled\" \n        [ngClass]=\"{'cf-small-btn': _button.size == 'small', 'cf-tiny-btn': _button.size == 'tiny', 'cf-micro-btn': _button.size == 'micro', 'cf-default-btn': _button.size == 'default'}\" \n        class=\"cf-flat-button cf-flat-button-{{_button.identifier}}\"\n        [ngStyle]=\"{'width': _button.width == '' || _button.width == '100%' ? _button.width : 'calc(' + _button.width + ' - 8px)'}\"\n        (click)=\"click($event)\" \n        [matBadge]=\"_button.badge ? _button.badge.content : ''\" \n        [matBadgeColor]=\"_button.badge ? _button.badge.color : ''\" \n        [matBadgePosition]=\"_button.badge ? _button.badge.position : ''\" \n        [matBadgeSize]=\"_button.badge ? _button.badge.size : ''\"  \n        [matBadgeHidden]=\"_button.badge ? _button.badge.hide : false\"\n    >\n        <ng-container *ngTemplateOutlet=\"cfButtonIcon\"></ng-container>\n    </button> \n\n    <button \n        mat-button \n        *ngIf=\"isGhostButton\"\n        [color]=\"_button.color\" \n        [disabled]=\"isButtonDisabled\" \n        [ngClass]=\"{'cf-small-btn': _button.size == 'small', 'cf-tiny-btn': _button.size == 'tiny', 'cf-micro-btn': _button.size == 'micro', 'cf-default-btn': _button.size == 'default', 'cf-button-wt-padding': buttonWithoutPadding == true}\" \n        class=\"cf-ghost-button cf-ghost-button-{{_button.identifier}}\"\n        [ngStyle]=\"{'width': _button.width == '' || _button.width == '100%' ? _button.width : 'calc(' + _button.width + ' - 8px)'}\"\n        (click)=\"click($event)\" \n        [matBadge]=\"_button.badge ? _button.badge.content : ''\" \n        [matBadgeColor]=\"_button.badge ? _button.badge.color : ''\" \n        [matBadgePosition]=\"_button.badge ? _button.badge.position : ''\" \n        [matBadgeSize]=\"_button.badge ? _button.badge.size : ''\" \n        [matBadgeHidden]=\"_button.badge ? _button.badge.hide : false\"\n    >\n        <ng-container *ngTemplateOutlet=\"cfButtonIcon\"></ng-container>    \n    </button>\n    \n    <button \n        mat-raised-button \n        *ngIf=\"isRaisedButton\"\n        [color]=\"_button.color\" \n        [ngClass]=\"{'cf-small-btn': _button.size == 'small', 'cf-tiny-btn': _button.size == 'tiny', 'cf-micro-btn': _button.size == 'micro', 'cf-default-btn': _button.size == 'default'}\" \n        class=\"cf-raised-button cf-raised-button-{{_button.identifier}}\"\n        [ngStyle]=\"{'width': _button.width == '' || _button.width == '100%' ? _button.width : 'calc(' + _button.width + ' - 8px)'}\"\n        [disabled]=\"isButtonDisabled\" \n        (click)=\"click($event)\" \n        [matBadge]=\"_button.badge ? _button.badge.content : ''\" \n        [matBadgeColor]=\"_button.badge ? _button.badge.color : ''\" \n        [matBadgePosition]=\"_button.badge ? _button.badge.position : ''\" \n        [matBadgeSize]=\"_button.badge ? _button.badge.size : ''\" \n        [matBadgeHidden]=\"_button.badge ? _button.badge.hide : false\"\n    >\n        <ng-container *ngTemplateOutlet=\"cfButtonIcon\"></ng-container>\n    </button>\n\n    <button \n        mat-stroked-button \n        *ngIf=\"isStrokedButton\"\n        [color]=\"_button.color\" \n        [disabled]=\"isButtonDisabled\" \n        [ngClass]=\"{'cf-small-btn': _button.size == 'small', 'cf-tiny-btn': _button.size == 'tiny', 'cf-micro-btn': _button.size == 'micro', 'cf-default-btn': _button.size == 'default'}\" \n        class=\"cf-stroked-button cf-stroked-button-{{_button.identifier}}\"\n        [ngStyle]=\"{'width': _button.width == '' || _button.width == '100%' ? _button.width : 'calc(' + _button.width + ' - 8px)'}\"\n        (click)=\"click($event)\" \n        [matBadge]=\"_button.badge ? _button.badge.content : ''\" \n        [matBadgeColor]=\"_button.badge ? _button.badge.color : ''\" \n        [matBadgePosition]=\"_button.badge ? _button.badge.position : ''\" \n        [matBadgeSize]=\"_button.badge ? _button.badge.size : ''\" \n        [matBadgeHidden]=\"_button.badge ? _button.badge.hide : false\"\n    >\n        <ng-container *ngTemplateOutlet=\"cfButtonIcon\"></ng-container>\n    </button>\n\n    <button \n        mat-fab \n        *ngIf=\"isFabButton\"\n        [color]=\"_button.color\" \n        [disabled]=\"isButtonDisabled\"  \n        [ngClass]=\"{'cf-small-btn': _button.size == 'small', 'cf-tiny-btn': _button.size == 'tiny', 'cf-micro-btn': _button.size == 'micro', 'cf-default-btn': _button.size == 'default'}\" \n        class=\"cf-fab-button cf-fab-button-{{_button.identifier}}\"\n        [ngStyle]=\"{'width': _button.width == '' || _button.width == '100%' ? _button.width : 'calc(' + _button.width + ' - 8px)'}\"\n        (click)=\"click($event)\" \n        [matBadge]=\"_button.badge ? _button.badge.content : ''\" \n        [matBadgeColor]=\"_button.badge ? _button.badge.color : ''\" \n        [matBadgePosition]=\"_button.badge ? _button.badge.position : ''\" \n        [matBadgeSize]=\"_button.badge ? _button.badge.size : ''\" \n        [matBadgeHidden]=\"_button.badge ? _button.badge.hide : false\"\n    >\n        <ng-container *ngTemplateOutlet=\"cfButtonIcon\"></ng-container>\n    </button>\n \n    <mat-chip \n        [selected]=\"state\" \n        *ngIf=\"isChip\" \n        [ngClass]=\"{'cf-small-btn': _button.size == 'small', 'cf-tiny-btn': _button.size == 'tiny', 'cf-micro-btn': _button.size == 'micro', 'cf-default-btn': _button.size == 'default'}\" \n        class=\"cf-chip-button cf-chip-button-{{_button.identifier}}\"\n        [ngStyle]=\"{'width': _button.width == '' || _button.width == '100%' ? _button.width : 'calc(' + _button.width + ' - 8px)'}\"\n        [color]=\"_button.color\" \n        [disabled]=\"isButtonDisabled\" \n        (click)=\"click($event)\" \n        [matBadge]=\"_button.badge ? _button.badge.content : ''\" \n        [matBadgeColor]=\"_button.badge ? _button.badge.color : ''\" \n        [matBadgePosition]=\"_button.badge ? _button.badge.position : ''\" \n        [matBadgeSize]=\"_button.badge ? _button.badge.size : ''\" \n        [matBadgeHidden]=\"_button.badge ? _button.badge.hide : false\"\n    >\n        <ng-container *ngTemplateOutlet=\"cfButtonIcon\"></ng-container>\n    </mat-chip>\n    <!-- {{_button | json}} -->\n    <a \n        mat-button \n        *ngIf=\"isLink\"\n        [color]=\"_button.color\" \n        [disabled]=\"isButtonDisabled\"  \n        [ngClass]=\"{'cf-small-btn': _button.size == 'small', 'cf-tiny-btn': _button.size == 'tiny', 'cf-micro-btn': _button.size == 'micro', 'cf-default-btn': _button.size == 'default', 'cf-button-wt-padding': buttonWithoutPadding == true}\" \n        class=\"cf-link cf-link-{{_button.identifier}}\"\n        [ngStyle]=\"{'width': _button.width == '' || _button.width == '100%' ? _button.width : 'calc(' + _button.width + ' - 8px)'}\"\n        [routerLink]=\"routerLink\" \n        [matTooltip]=\"_button.label\"\n        [matBadge]=\"_button.badge ? _button.badge.content : ''\" \n        [matBadgeColor]=\"_button.badge ? _button.badge.color : ''\" \n        [matBadgePosition]=\"_button.badge ? _button.badge.position : ''\" \n        [matBadgeSize]=\"_button.badge ? _button.badge.size : ''\" \n        [matBadgeHidden]=\"_button.badge ? _button.badge.hide : false\"\n    >\n        <ng-container *ngTemplateOutlet=\"cfButtonIcon\"></ng-container>\n    </a>\n\n    <!-- appearance=\"legacy\"  -->\n    <mat-button-toggle \n        *ngIf=\"isGroupButton\" \n        [value]=\"_button.identifier\" \n        [disabled]=\"isButtonDisabled\" \n        [attr.aria-label]=\"label\" \n        [ngClass]=\"{'cf-small-btn': _button.size == 'small', 'cf-tiny-btn': _button.size == 'tiny', 'cf-micro-btn': _button.size == 'micro', 'cf-toggle-default-btn': _button.size == 'default'}\" \n        class=\"cf-toggle-button cf-button-{{_button.identifier}}\"\n        [ngStyle]=\"{'width': _button.width == '' || _button.width == '100%' ? _button.width : 'calc(' + _button.width + ' - 8px)'}\"\n        (change)=\"click($event)\" \n        [matBadge]=\"_button.badge ? _button.badge.content : ''\" \n        [matBadgeColor]=\"_button.badge ? _button.badge.color : ''\" \n        [matBadgePosition]=\"_button.badge ? _button.badge.position : ''\"  \n        [matBadgeSize]=\"_button.badge ? _button.badge.size : ''\" \n        [matBadgeHidden]=\"_button.badge ? _button.badge.hide : false\"\n    >\n        <ng-container *ngTemplateOutlet=\"cfButtonIcon\"></ng-container>\n    </mat-button-toggle>\n</span>\n\n<ng-template #cfButtonIcon>\n    <mat-icon \n        (click)=\"iconClick($event)\" \n        aria-hidden=\"true\" \n        [attr.aria-label]=\"label\" \n        [ngClass]=\"{'cf-small-icon': _button.size == 'small', 'cf-tiny-icon': _button.size == 'tiny', 'cf-micro-icon': _button.size == 'micro'}\"  \n        class=\"cf-button-icon cf-button-icon-{{_button.identifier}}\"\n        [style.padding-right.px]=\"!isDisplayOnlyIcon ? 5 : 0\"\n        *ngIf=\"hasIconDisplay && (_button.iconPosition == 'LEFT' || _button.iconPosition == 'TOP')\">\n            {{_button.icon}}\n    </mat-icon>\n    <br *ngIf=\"hasIconDisplay && _button.iconPosition == 'TOP' && !isDisplayOnlyIcon\"/>\n    <span class=\"cf-button-label cf-button-label-{{_button.identifier}}\" *ngIf=\"!isDisplayOnlyIcon\">{{ label }}</span>\n    <br *ngIf=\"hasIconDisplay && _button.iconPosition == 'BOTTOM' && !isDisplayOnlyIcon\"/>\n    <mat-icon \n        (click)=\"iconClick($event)\" \n        aria-hidden=\"true\" \n        [attr.aria-label]=\"label\" \n        [ngClass]=\"{'cf-small-icon': _button.size == 'small', 'cf-tiny-icon': _button.size == 'tiny', 'cf-micro-icon': _button.size == 'micro'}\"  \n        class=\"cf-button-icon cf-button-icon-{{_button.identifier}}\"\n        [style.padding-left.px]=\"!isDisplayOnlyIcon ? 5 : 0\"\n        *ngIf=\"hasIconDisplay && (_button.iconPosition == 'RIGHT' || _button.iconPosition == 'BOTTOM')\">\n            {{_button.icon}}\n    </mat-icon>\n</ng-template>",
                    styles: [".cf-small-btn{box-sizing:border-box;line-height:30px;min-width:unset}.cf-small-icon{font-size:12px;height:12px;width:12px}.cf-small-btn ::ng-deep .cf-button-label,.cf-small-btn ::ng-deep .mat-button-toggle-label-content{line-height:30px}.cf-small-btn.mat-standard-chip{min-height:30px}.cf-tiny-btn{box-sizing:border-box;font-size:10px;line-height:24px;min-width:unset}.cf-tiny-icon{font-size:10px;height:10px;width:10px}.cf-tiny-btn ::ng-deep .cf-button-label,.cf-tiny-btn ::ng-deep .mat-button-toggle-label-content{line-height:24px}.cf-tiny-btn.mat-standard-chip{min-height:26px}.cf-micro-btn{box-sizing:border-box;font-size:8px;line-height:18px;min-width:unset}.cf-micro-icon{font-size:8px;height:8px;width:8px}.cf-micro-btn ::ng-deep .cf-button-label,.cf-micro-btn ::ng-deep .mat-button-toggle-label-content{line-height:18px}.cf-micro-btn.mat-standard-chip{min-height:20px}.cf-toggle-default-btn ::ng-deep .cf-button-label,.cf-toggle-default-btn ::ng-deep .mat-button-toggle-label-content{line-height:36px}.cf-chip-button{justify-content:center}.cf-chip-button .mat-standard-chip{margin:unset}.cf-button-wt-padding,.cf-button-wt-padding .mat-button{min-width:0!important;padding:0!important}.mat-button,.mat-flat-button,.mat-icon-button,.mat-stroked-button{padding:0 5px!important}"]
                },] }
    ];
    ButtonComponent.ctorParameters = function () { return [
        { type: dialog.MatDialog },
        { type: router.Router },
        { type: router.ActivatedRoute },
        { type: ability.Ability }
    ]; };
    ButtonComponent.propDecorators = {
        form: [{ type: core.Input }],
        formDisplayMode: [{ type: core.Input }],
        sourceIdentifier: [{ type: core.Input }],
        sourceIndex: [{ type: core.Input }],
        widgetArrayIndex: [{ type: core.Input }],
        identifier: [{ type: core.Input }],
        context: [{ type: core.Input }],
        originalData: [{ type: core.Input }],
        label: [{ type: core.Input }],
        buttonRoute: [{ type: core.Input }],
        parentHierarchy: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        onClick: [{ type: core.Output }],
        onIconClick: [{ type: core.Output }],
        _button: [{ type: core.Input }],
        button: [{ type: core.Input }]
    };

    var ButtonGroupComponent = /** @class */ (function () {
        function ButtonGroupComponent(ability) {
            this.ability = ability;
            this.onClick = new core.EventEmitter();
            this.onIconClick = new core.EventEmitter();
            this.buttonLists = new Array();
            this.buttonListsType = new Array();
            this.displayDesktopDD = false;
            this.displayTabletDD = false;
            this.displayMobileDD = false;
            this.hoverButtonLists = new Array();
            AbilityUtils.setAbility(this.ability);
        }
        Object.defineProperty(ButtonGroupComponent.prototype, "buttons", {
            get: function () {
                return this._buttons;
            },
            set: function (_buttons) {
                if (!(_buttons instanceof Array)) {
                    var btns = new Array();
                    btns.push(_buttons);
                    _buttons = btns;
                }
                this._buttons = _buttons;
                this.getButtonList();
                this.getButtonType();
                this.displayDesktopDD = this.hasMobileButton('showOnDesktop');
                this.displayTabletDD = this.hasMobileButton('showOnTablet');
                this.displayMobileDD = this.hasMobileButton('showOnMobile');
                if (this.displayDesktopDD || this.displayMobileDD || this.displayTabletDD) {
                    this.changeButtonTypeToGhost();
                }
            },
            enumerable: false,
            configurable: true
        });
        ButtonGroupComponent.prototype.ngOnInit = function () {
            // this.getButtonList();
            // this.getButtonType();
        };
        ButtonGroupComponent.prototype.hasMobileButton = function (displayIn) {
            var hasButtonsForDropdown = false;
            if (!CollectionUtils.isEmpty(this.buttonLists)) {
                this.buttonLists.forEach(function (buttons) {
                    if (!CollectionUtils.isEmpty(buttons) && buttons instanceof Array) {
                        buttons.forEach(function (button) {
                            if (button['showOnDesktop'] == null && button['showOnTablet'] == null && button['showOnMobile'] == null) {
                                button['showOnDesktop'] = true;
                                button['showOnTablet'] = true;
                                button['showOnMobile'] = true;
                            }
                            if (button[displayIn]) {
                                hasButtonsForDropdown = true;
                            }
                        });
                    }
                });
            }
            return hasButtonsForDropdown;
        };
        ButtonGroupComponent.prototype.changeButtonTypeToGhost = function () {
            this.hoverButtonLists = JSON.parse(JSON.stringify(this.buttonLists));
            if (!CollectionUtils.isEmpty(this.hoverButtonLists)) {
                this.hoverButtonLists.forEach(function (buttons) {
                    if (!CollectionUtils.isEmpty(buttons) && buttons instanceof Array) {
                        buttons.forEach(function (button) {
                            button.type = "GHOST" /* GHOST */;
                        });
                    }
                });
            }
        };
        ButtonGroupComponent.prototype.getButtonList = function () {
            this.buttonLists = new Array();
            var buttonArray = new Array();
            var buttonArrayIndex = 0;
            if (this._buttons) {
                for (var index = 0; index < this._buttons.length; index++) {
                    if (ButtonUtils.instanceOfButton(this._buttons[index])) {
                        if (ObjectUtils.isEmpty(buttonArray[buttonArrayIndex])) {
                            buttonArray[buttonArrayIndex] = new Array();
                            this.buttonLists.push(buttonArray[buttonArrayIndex]);
                        }
                        buttonArray[buttonArrayIndex].push(this._buttons[index]);
                    }
                    if (ButtonUtils.instanceOfButtonGroup(this._buttons[index]) || ButtonUtils.instanceOfChipButton(this._buttons[index])) {
                        var bgAdded = this.getGroupButton(this._buttons[index].groupIdentifier, this.buttonLists);
                        if (bgAdded) {
                            buttonArrayIndex++;
                        }
                    }
                }
                var hoverButton = this.getHoverButtons();
                if (hoverButton && hoverButton.hoverButtons && hoverButton.hoverButtons.length > 0) {
                    this.buttonLists.push(hoverButton);
                    buttonArrayIndex++;
                }
            }
        };
        ButtonGroupComponent.prototype.isGroupAdded = function (groupIdentifier, buttonLists) {
            var groupAdded = false;
            if (buttonLists) {
                groupAdded = buttonLists.filter(function (buttonList) { return buttonList && buttonList.groupIdentifier == groupIdentifier; }).length > 0;
            }
            return groupAdded;
        };
        ButtonGroupComponent.prototype.getGroupButton = function (groupIdentifier, buttonLists) {
            var bgAdded = false;
            var gButtons = new Array();
            if (this._buttons && this.isGroupAdded(groupIdentifier, buttonLists) == false) {
                gButtons = this._buttons.filter(function (button) { return button.groupIdentifier == groupIdentifier; }).map(function (button) {
                    button.width = '100';
                    return button;
                });
                // To check if any button is fullwidth
                var width = gButtons.filter(function (gButton) { return gButton.fullWidth == true; }).length > 0 ? '100' : 'auto';
                var buttonWidth = 'auto';
                if (width != 'auto') {
                    buttonWidth = (+width / gButtons.length);
                }
                buttonLists.push({
                    groupIdentifier: groupIdentifier,
                    width: width,
                    buttonWidth: buttonWidth,
                    groupButtons: gButtons
                });
                bgAdded = true;
            }
            return bgAdded;
        };
        ButtonGroupComponent.prototype.getHoverButtons = function () {
            var hoverButtons = new Array();
            var groupIdentifier;
            var groupLabel;
            var groupIcon;
            var badge;
            var width = 'auto';
            if (this._buttons) {
                this._buttons.filter(function (button) { return ButtonUtils.instanceOfHoverButton(button); }).forEach(function (button) {
                    if (StringUtils.isEmpty(groupIdentifier)) {
                        groupIdentifier = button.groupIdentifier;
                    }
                    if (StringUtils.isEmpty(groupLabel)) {
                        groupLabel = button.groupLabel;
                    }
                    if (StringUtils.isEmpty(groupIcon)) {
                        groupIcon = button.groupIcon;
                    }
                    if (CollectionUtils.isEmpty(badge)) {
                        badge = button.badge;
                    }
                    if (button.fullWidth) {
                        width = '100';
                        button.width = '100';
                    }
                    hoverButtons.push(button);
                });
            }
            return { groupIdentifier: groupIdentifier, groupLabel: groupLabel, groupIcon: groupIcon, badge: badge, width: width, hoverButtons: hoverButtons };
        };
        ButtonGroupComponent.prototype.getButtonType = function () {
            var e_1, _a;
            this.buttonListsType = new Array();
            if (this.buttonLists && this.buttonLists.length > 0) {
                try {
                    for (var _b = __values(this.buttonLists), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var buttonList = _c.value;
                        var buttonType = "";
                        if (this.isButtonGroup(buttonList)) {
                            buttonType = 'ButtonGroup';
                        }
                        else if (this.isChipGroup(buttonList)) {
                            buttonType = 'ChipGroup';
                        }
                        else if (this.isButtonHover(buttonList)) {
                            buttonType = 'ButtonHover';
                        }
                        else if (this.isButtonArray(buttonList)) {
                            buttonType = 'ButtonArray';
                        }
                        this.buttonListsType.push(buttonType);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        };
        ButtonGroupComponent.prototype.isButtonGroup = function (buttonList) {
            var isButtonGroup = false;
            if (buttonList && buttonList.groupButtons && buttonList.groupButtons.length > 0 && !StringUtils.isEmpty(buttonList.groupIdentifier)) {
                isButtonGroup = buttonList.groupButtons.filter(function (button) { return ButtonUtils.instanceOfButtonGroup(button); }).length > 0;
            }
            return isButtonGroup;
        };
        ButtonGroupComponent.prototype.isChipGroup = function (buttonList) {
            var isChipGroup = false;
            if (buttonList && buttonList.groupButtons && buttonList.groupButtons.length > 0 && !StringUtils.isEmpty(buttonList.groupIdentifier)) {
                isChipGroup = buttonList.groupButtons.filter(function (button) { return ButtonUtils.instanceOfChipButton(button); }).length > 0;
                if (isChipGroup) {
                    buttonList.groupButtons.forEach(function (button) { return ButtonUtils.instanceOfChipButton(button); });
                }
            }
            return isChipGroup;
        };
        ButtonGroupComponent.prototype.isButtonHover = function (buttonList) {
            return buttonList && buttonList.hoverButtons && buttonList.hoverButtons.length > 0;
        };
        ButtonGroupComponent.prototype.isButtonArray = function (buttonList) {
            return buttonList instanceof Array;
        };
        ButtonGroupComponent.prototype.click = function (event) {
            this.onClick.emit(event);
        };
        ButtonGroupComponent.prototype.iconClick = function (event) {
            this.onIconClick.emit(event);
        };
        return ButtonGroupComponent;
    }());
    ButtonGroupComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'cf-button-group',
                    template: "<!-- <pre>{{formDisplayMode | json}}</pre> -->\n<span class=\"cf-button-group\" *ngFor=\"let buttonList of buttonLists; let bIndex = index;\">\n    <mat-chip-list \n        *ngIf=\"buttonListsType[bIndex] == 'ChipGroup'\"\n        [style.width.%]=\"buttonList.width\" \n        [ngClass]=\"{'cf-button': bIndex < buttonLists.length - 1 }\"\n        class=\"cf-chip-group cf-chip-group-{{buttonList.groupIdentifier}}\"\n        aria-label=\"Chip Selection\">\n        <cf-button *ngFor=\"let button of buttonList.groupButtons\"\n            [form]=\"form\"\n            [ngClass]=\"{'cf-button': (bIndex + 1) != buttonList.length}\"\n            [style.width]=\"'calc(' + buttonList.buttonWidth + '% - 8px)'\"\n            [formDisplayMode]=\"formDisplayMode\"\n            [sourceIdentifier]=\"sourceIdentifier\"\n            [sourceIndex]=\"sourceIndex\"\n            [widgetArrayIndex]=\"widgetArrayIndex\"\n            [button]=\"button\"\n            [context]=\"context\" \n            [originalData]=\"originalData\"\n            [buttonRoute]=\"buttonRoute\"\n            [parentHierarchy]=\"parentHierarchy\"\n            [disabled]=\"disabled\"\n            (onClick)=\"click($event)\"\n            (onIconClick)=\"iconClick($event)\"\n        ></cf-button>\n    </mat-chip-list>\n    \n    <!-- appearance=\"legacy\" -->\n    <mat-button-toggle-group \n        *ngIf=\"buttonListsType[bIndex] == 'ButtonGroup'\"\n        [name]=\"buttonList.groupIdentifier\" \n        multiple=\"false\" \n        [ngClass]=\"{'cf-button': bIndex < buttonLists.length - 1 }\"\n        class=\"cf-toggle-group cf-toggle-group-{{buttonList.groupIdentifier}}\" \n        [style.width.%]=\"buttonList.width\"\n        #group=\"matButtonToggleGroup\">\n        <cf-button *ngFor=\"let button of buttonList.groupButtons\"\n            [form]=\"form\"\n            [style.width.%]=\"buttonList.buttonWidth\"\n            [formDisplayMode]=\"formDisplayMode\"\n            [sourceIdentifier]=\"sourceIdentifier\"\n            [sourceIndex]=\"sourceIndex\"\n            [widgetArrayIndex]=\"widgetArrayIndex\"\n            [button]=\"button\"\n            [context]=\"context\"\n            [originalData]=\"originalData\"\n            [buttonRoute]=\"buttonRoute\"\n            [parentHierarchy]=\"parentHierarchy\"\n            [disabled]=\"disabled\"\n            (onClick)=\"click($event)\"\n            (onIconClick)=\"iconClick($event)\"\n        ></cf-button>\n    </mat-button-toggle-group>\n\n    <span \n        *ngIf=\"buttonListsType[bIndex] == 'ButtonHover'\"\n        [ngClass]=\"{'cf-button': bIndex < buttonLists.length - 1}\"\n        class=\"cf-hover-group cf-hover-group-{{buttonList.groupIdentifier}}\"\n        [style.width.%]=\"100\">\n        <button \n            mat-raised-button \n            [matMenuTriggerFor]=\"menu\" \n            [ngClass]=\"{'cf-small-btn': buttonList.hoverButtons[0].size == 'small', 'cf-tiny-btn': buttonList.hoverButtons[0].size == 'tiny', 'cf-micro-btn': buttonList.hoverButtons[0].size == 'micro', 'cf-default-btn': buttonList.hoverButtons[0].size == 'default'}\"\n            [style.width.%]=\"buttonList.width\"\n            [attr.aria-label]=\"buttonList.groupLabel\"\n            [matBadge]=\"buttonList.badge ? buttonList.badge.content : ''\" \n            [matBadgeColor]=\"buttonList.badge ? buttonList.badge.color : ''\" \n            [matBadgePosition]=\"buttonList.badge ? buttonList.badge.position : ''\" \n            [matBadgeSize]=\"buttonList.badge ? buttonList.badge.size : ''\" \n            [matBadgeHidden]=\"buttonList.badge ? buttonList.badge.hide : false\">\n            <span class=\"cf-button-label cf-button-label-{{buttonList.groupIdentifier}}\" *ngIf=\"buttonList.groupLabel\">{{ buttonList.groupLabel }}</span>\n            <mat-icon\n                [ngClass]=\"{'cf-small-icon': buttonList.hoverButtons[0].size == 'small', 'cf-tiny-icon': buttonList.hoverButtons[0].size == 'tiny', 'cf-micro-icon': buttonList.hoverButtons[0].size == 'micro', 'cf-default-icon': buttonList.hoverButtons[0].size == 'default'}\"\n                class=\"cf-button-icon\"\n            >{{buttonList.groupIcon}}</mat-icon>\n        </button> \n        <mat-menu #menu=\"matMenu\">\n            <cf-button *ngFor=\"let button of buttonList.hoverButtons\"\n                [form]=\"form\" \n                [formDisplayMode]=\"formDisplayMode\"\n                [sourceIdentifier]=\"sourceIdentifier\"\n                [sourceIndex]=\"sourceIndex\"\n                [widgetArrayIndex]=\"widgetArrayIndex\"\n                [button]=\"button\"\n                [context]=\"context\"\n                [originalData]=\"originalData\"\n                [buttonRoute]=\"buttonRoute\"\n                [parentHierarchy]=\"parentHierarchy\"\n                [disabled]=\"disabled\"\n                (onClick)=\"click($event)\"\n                (onIconClick)=\"iconClick($event)\"\n                ></cf-button> \n        </mat-menu>\n    </span>\n    <span \n        [ngClass]=\"{'cf-button': bIndex < buttonLists.length - 1 }\"\n        class=\"cf-buttons-group\" \n        *ngIf=\"buttonListsType[bIndex] == 'ButtonArray'\">\n        <cf-button *ngFor=\"let button of buttonList; let index = index;\"\n            [form]=\"form\"\n            [formDisplayMode]=\"formDisplayMode\"\n            [sourceIdentifier]=\"sourceIdentifier\"\n            [sourceIndex]=\"sourceIndex\"\n            [widgetArrayIndex]=\"widgetArrayIndex\"\n            [button]=\"button\"\n            [context]=\"context\"\n            [originalData]=\"originalData\"\n            [buttonRoute]=\"buttonRoute\"\n            [parentHierarchy]=\"parentHierarchy\"\n            [disabled]=\"disabled\"\n            [ngClass]=\"{'cf-button': (index + 1) != buttonList.length}\"\n            (onClick)=\"click($event)\"\n            (onIconClick)=\"iconClick($event)\"\n            [fxShow]=\"button.showOnDesktop\" \n            [fxShow.xs]=\"button.showOnMobile\" \n            [fxShow.sm]=\"button.showOnTablet\"\n        ></cf-button> \n        <button \n            mat-icon-button \n            [matMenuTriggerFor]=\"dropMenu\" \n            [fxShow]=\"!displayDesktopDD\"\n            [fxShow.sm]=\"!displayTabletDD\"\n            [fxShow.xs]=\"!displayMobileDD\">\n            <mat-icon>more_vert</mat-icon>\n        </button>\n        <mat-menu class=\"cf-button-tooltip\" #dropMenu=\"matMenu\">\n            <ng-container *ngFor=\"let button of hoverButtonLists[bIndex]; let index = index;let last = last;\">\n                <div [fxShow]=\"!button.showOnDesktop\" \n                    [fxShow.sm]=\"!button.showOnTablet\" \n                    [fxShow.xs]=\"!button.showOnMobile\">\n                    <!-- <button mat-menu-item (onClick)=\"click($event)\">\n                        <mat-icon class=\"mr\">{{item.icon}}</mat-icon>\n                        {{item.label}}\n                    </button> -->\n                    <cf-button\n                        [form]=\"form\"\n                        [formDisplayMode]=\"formDisplayMode\"\n                        [sourceIdentifier]=\"sourceIdentifier\"\n                        [sourceIndex]=\"sourceIndex\"\n                        [widgetArrayIndex]=\"widgetArrayIndex\"\n                        [button]=\"button\"\n                        [context]=\"context\"\n                        [originalData]=\"originalData\"\n                        [buttonRoute]=\"buttonRoute\"\n                        [disabled]=\"disabled\"\n                        (onClick)=\"click($event)\"\n                        (onIconClick)=\"iconClick($event)\"\n                    ></cf-button>\n                    <mat-divider *ngIf=\"!last\"></mat-divider>\n                </div>\n            </ng-container>\n        </mat-menu>\n    </span>\n</span>",
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".cf-button-group{vertical-align:middle}.cf-chip-group{display:inline-flex}.cf-button{margin-right:8px}.cf-chip-group .mat-chip-list-wrapper .mat-standard-chip{margin:unset}.cf-chip-group .mat-chip-list-wrapper{width:inherit}.cf-button-tooltip.mat-menu-panel{min-height:auto}", ".cf-small-btn{box-sizing:border-box;line-height:30px;min-width:unset}.cf-small-icon{font-size:12px;height:12px;width:12px}.cf-small-btn ::ng-deep .cf-button-label,.cf-small-btn ::ng-deep .mat-button-toggle-label-content{line-height:30px}.cf-small-btn.mat-standard-chip{min-height:30px}.cf-tiny-btn{box-sizing:border-box;font-size:10px;line-height:24px;min-width:unset}.cf-tiny-icon{font-size:10px;height:10px;width:10px}.cf-tiny-btn ::ng-deep .cf-button-label,.cf-tiny-btn ::ng-deep .mat-button-toggle-label-content{line-height:24px}.cf-tiny-btn.mat-standard-chip{min-height:26px}.cf-micro-btn{box-sizing:border-box;font-size:8px;line-height:18px;min-width:unset}.cf-micro-icon{font-size:8px;height:8px;width:8px}.cf-micro-btn ::ng-deep .cf-button-label,.cf-micro-btn ::ng-deep .mat-button-toggle-label-content{line-height:18px}.cf-micro-btn.mat-standard-chip{min-height:20px}.cf-toggle-default-btn ::ng-deep .cf-button-label,.cf-toggle-default-btn ::ng-deep .mat-button-toggle-label-content{line-height:36px}.cf-chip-button{justify-content:center}.cf-chip-button .mat-standard-chip{margin:unset}.cf-button-wt-padding,.cf-button-wt-padding .mat-button{min-width:0!important;padding:0!important}.mat-button,.mat-flat-button,.mat-icon-button,.mat-stroked-button{padding:0 5px!important}"]
                },] }
    ];
    ButtonGroupComponent.ctorParameters = function () { return [
        { type: ability.Ability }
    ]; };
    ButtonGroupComponent.propDecorators = {
        form: [{ type: core.Input }],
        formDisplayMode: [{ type: core.Input }],
        sourceIdentifier: [{ type: core.Input }],
        sourceIndex: [{ type: core.Input }],
        widgetArrayIndex: [{ type: core.Input }],
        _buttons: [{ type: core.Input }],
        buttons: [{ type: core.Input }],
        context: [{ type: core.Input }],
        originalData: [{ type: core.Input }],
        buttonRoute: [{ type: core.Input }],
        parentHierarchy: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        onClick: [{ type: core.Output }],
        onIconClick: [{ type: core.Output }]
    };

    var CrudFormComponent = /** @class */ (function () {
        function CrudFormComponent(ability) {
            this.ability = ability;
            this.onFormChange = new core.EventEmitter();
            this.onFieldChange = new core.EventEmitter();
            this.onButtonClick = new core.EventEmitter();
            this.onSortClick = new core.EventEmitter();
            this.onPageClick = new core.EventEmitter();
            this.formsConfigToDisplay = new Array();
            this.rowsInTab = new Array();
            AbilityUtils.setAbility(this.ability);
        }
        CrudFormComponent.prototype.ngOnInit = function () {
            this.filterForms();
            this.drawTabs();
            this.setConfigAsPerTab();
            this.addWidget = this.addWidgetButton("addWidget", "Add", "add", "primary" /* PRIMARY */);
        };
        CrudFormComponent.prototype.setConfigAsPerTab = function (tabIdentifier) {
            var _this = this;
            if (this.configData) {
                this.badges = this.configData.badges;
                this.pageBackRoute = this.configData.pageBackRoute;
                this.record = this.configData.record;
                if (this.configData.configPerTabs) {
                    var tabIndex_1 = 0;
                    this.configData.configPerTabs.forEach(function (tabConfigData, tabKey) {
                        if ((tabKey == tabIdentifier || (tabIndex_1 == 0 && tabIdentifier == null)) && tabConfigData) {
                            if (tabConfigData.badges) {
                                _this.badges = tabConfigData.badges;
                            }
                            if (tabConfigData.pageBackRoute) {
                                _this.pageBackRoute = tabConfigData.pageBackRoute;
                            }
                            if (tabConfigData.record) {
                                _this.record = _this.configData.record;
                            }
                        }
                        tabIndex_1++;
                    });
                }
            }
        };
        CrudFormComponent.prototype.getTabIdentifier = function (tabTitle) {
            var e_1, _a;
            var tabIdentifier = '';
            if (this.form && this.form.tabs) {
                try {
                    for (var _b = __values(this.form.tabs), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var tab = _c.value;
                        if (tab.label == tabTitle) {
                            tabIdentifier = tab.identifier;
                            break;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            return tabIdentifier;
        };
        CrudFormComponent.prototype.drawTabs = function () {
            if (this.form && this.form.tabs && this.form.tabs.length > 0) {
                for (var tIndex = 0; tIndex < this.form.tabs.length; tIndex++) {
                    if (this.form.tabs[tIndex] && (this.form.tabs[tIndex].permission == null || (this.form.tabs[tIndex].permission && (this.ability.can(this.form.tabs[tIndex].permission['action'], this.form.tabs[tIndex].permission['subject']))))) {
                        this.rowsInTab.push(this.drawTab(tIndex));
                    }
                }
            }
        };
        CrudFormComponent.prototype.drawTab = function (tabIndex) {
            var e_2, _a;
            var rows = new Array();
            var rIndex = 0;
            if (this.form && this.form.tabs && this.form.tabs.length > 0) {
                for (var tIndex = 0; tIndex < this.form.tabs.length; tIndex++) {
                    if (this.form.tabs[tIndex].widgets && this.form.tabs[tIndex].widgets.length > 0 && tIndex == tabIndex) {
                        var _loop_1 = function (widget) {
                            if (widget &&
                                (widget.permission == null ||
                                    (widget.permission && (this_1.ability.can(widget.permission['action'], widget.permission['subject']))))) {
                                if (CollectionUtils.isEmpty(rows[rIndex])) {
                                    rows[rIndex] = new Array();
                                }
                                var colCount_1 = 0;
                                rows[rIndex].forEach(function (row) { return colCount_1 += row.colSpan; });
                                if (colCount_1 < 2) {
                                    rows[rIndex].push(widget);
                                }
                                else {
                                    rIndex++;
                                    rows[rIndex] = new Array();
                                    rows[rIndex].push(widget);
                                }
                            }
                        };
                        var this_1 = this;
                        try {
                            for (var _b = (e_2 = void 0, __values(this.form.tabs[tIndex].widgets)), _c = _b.next(); !_c.done; _c = _b.next()) {
                                var widget = _c.value;
                                _loop_1(widget);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                }
            }
            console.log(rows);
            return rows;
        };
        CrudFormComponent.prototype.displayWidget = function (widget, supportingRecord, record) {
            return DependentUtils.displayDependencyField(widget.dependentOnFields, supportingRecord, record);
        };
        CrudFormComponent.prototype.filterForms = function () {
            var e_3, _a, e_4, _b, e_5, _c, e_6, _d;
            var formIdentifiers;
            if (this.actionPages && this.actions) {
                try {
                    for (var _e = __values(this.actionPages), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var actionPage = _f.value;
                        try {
                            for (var _g = (e_4 = void 0, __values(this.actions)), _h = _g.next(); !_h.done; _h = _g.next()) {
                                var action = _h.value;
                                if (actionPage.buttonIdentifier == action.identifier) {
                                    formIdentifiers = actionPage.associatedFormIdentifiers;
                                }
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                if (this.form && this.form.tabs && formIdentifiers) {
                    try {
                        for (var _j = __values(this.form.tabs), _k = _j.next(); !_k.done; _k = _j.next()) {
                            var tab = _k.value;
                            try {
                                for (var _l = (e_6 = void 0, __values(tab.widgets)), _m = _l.next(); !_m.done; _m = _l.next()) {
                                    var widget = _m.value;
                                    if (formIdentifiers.indexOf(widget.widget.identifier) > -1) {
                                        widget.widget['display'] = true;
                                    }
                                }
                            }
                            catch (e_6_1) { e_6 = { error: e_6_1 }; }
                            finally {
                                try {
                                    if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                                }
                                finally { if (e_6) throw e_6.error; }
                            }
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                }
                else {
                    this.form.tabs.forEach(function (tab) { return tab.widgets.forEach(function (widget) { return widget.widget['display'] = true; }); });
                }
            }
            else {
                this.form.tabs.forEach(function (tab) { return tab.widgets.forEach(function (widget) { return widget.widget['display'] = true; }); });
            }
        };
        CrudFormComponent.prototype.addWidgetButton = function (identifier, label, icon, color) {
            var buttonConfig = {
                identifier: identifier,
                type: "GHOST" /* GHOST */,
                label: label,
                color: color,
                size: "small" /* SMALL */,
                icon: icon,
                onlyIcon: false,
                alwaysEnable: true
            };
            return buttonConfig;
        };
        CrudFormComponent.prototype.fieldChange = function (fieldChange) {
            console.log(fieldChange);
            this.onFieldChange.emit(fieldChange);
        };
        CrudFormComponent.prototype.formChange = function (form) {
            this.onFormChange.emit(form);
        };
        CrudFormComponent.prototype.buttonClick = function (action) {
            console.log(action);
            if (action.action == "addWidget") {
                if (this.record[action.sourceIdentifier] && this.record[action.sourceIdentifier] instanceof Array) {
                    this.record[action.sourceIdentifier].push({});
                }
                else {
                    this.record[action.sourceIdentifier] = new Array();
                    this.record[action.sourceIdentifier].push({});
                }
            }
            this.onButtonClick.emit(action);
        };
        CrudFormComponent.prototype.onTabChange = function (event) {
            console.log(event);
            this.setConfigAsPerTab(this.getTabIdentifier(event.tab.textLabel));
        };
        CrudFormComponent.prototype.onAccordianChange = function (event) {
            console.log(event);
        };
        CrudFormComponent.prototype.onSort = function (event) {
            console.log(event);
            this.onSortClick.emit(event);
        };
        CrudFormComponent.prototype.onPage = function (event) {
            console.log(event);
            this.onPageClick.emit(event);
        };
        return CrudFormComponent;
    }());
    CrudFormComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'cf-crud-form',
                    template: "<mat-card class=\"cf-crud-card\">\n    <!-- {{configData | json}} -->\n    <mat-card-header class=\"cf-list-header\">\n        <cf-crud-header\n            [identifier]=\"identifier\"\n            [title]=\"header.title\"\n            [subtitle]=\"header.subtitle\"\n            [description]=\"header.description\"\n            [badges]=\"badges\"\n            [icon]=\"header.icon\"\n            [pageBackRoute]=\"pageBackRoute\"\n            [formDisplayMode]=\"'CRUD_FORM'\"\n            [actions]=\"actions\"\n            [originalData]=\"configData.originalData\"  \n            [context]=\"record\"\n            [style.width.%]=\"100\"\n            (onButtonClick)=\"buttonClick($event)\"\n        ></cf-crud-header>\n    </mat-card-header> \n  \n    <mat-card-content class=\"cf-crud-content\">\n        <div class=\"mdc-layout-grid cf-crud-header\" *ngIf=\"header.description && header.description.text && header.description.bgColor\">\n            <div class=\"mdc-layout-grid__inner\">\n                <div class=\"mdc-layout-grid__cell--span-12\">\n                    <div \n                        class=\"cf-crud-header-desc\"\n                        [style.background-color]=\"header.description.bgColor\"\n                        [style.color]=\"header.description.textColor\"\n                    >\n                        <mat-icon class=\"cf-crud-header-desc-icon\" aria-hidden=\"true\" [attr.aria-label]=\"header.description.icon\" *ngIf=\"header.description.icon\">{{header.description.icon}}</mat-icon>\n                        <span>{{ header.description.text }}</span>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <!-- <cf-error></cf-error> -->\n\n        <span *ngIf=\"form && form.displayType == 'TAB' && form.tabs && form.tabs.length > 1\">\n            <mat-tab-group (selectedTabChange)=\"onTabChange($event)\">\n              <mat-tab \n                *ngFor=\"let tab of form.tabs; let tIndex=index\"\n                [label]=\"tab.label\">\n                <ng-container *ngTemplateOutlet=\"cfTab; context: {tab: tab, record: record, formRows: rowsInTab[tIndex], tIndex: tIndex}\"></ng-container>\n              </mat-tab>\n            </mat-tab-group>\n        </span>\n        <span *ngIf=\"form && form.displayType == 'ACCORDIAN' && form.tabs && form.tabs.length > 1\">\n            <mat-accordion>\n                <mat-expansion-panel\n                  *ngFor=\"let tab of form.tabs; let tIndex=index\"\n                  [expanded]=\"tIndex === 0\"\n                  (opened)=\"onAccordianChange(tIndex)\">\n                  <mat-expansion-panel-header>\n                    <mat-panel-title>\n                      {{tab.label}}\n                    </mat-panel-title>\n                  </mat-expansion-panel-header>\n                  <ng-container *ngTemplateOutlet=\"cfTab; context: {tab: tab, record: record, formRows: rowsInTab[tIndex], tIndex: tIndex}\"></ng-container>\n                </mat-expansion-panel>\n            </mat-accordion>\n        </span>\n        <span *ngIf=\"form && form.tabs && form.tabs.length == 1\">\n            <span \n                *ngFor=\"let tab of form.tabs; let tIndex=index\">\n                <ng-container *ngTemplateOutlet=\"cfTab; context: {tab: tab, record: record, formRows: rowsInTab[tIndex], tIndex: tIndex}\"></ng-container>\n            </span>\n        </span>\n    </mat-card-content>\n</mat-card>\n  \n<ng-template #cfTab let-tab=\"tab\" let-record=\"record\" let-formRows=\"formRows\" let-tIndex=\"tIndex\">\n    <!-- {{record | json}} -->\n    <div \n        class=\"mdc-layout-grid cf-crud-tab\"\n        *ngIf=\"tab && (tab.permission == null || (tab.permission && (tab.permission['subject'] | can: tab.permission['action'])))\"\n    >\n        <div class=\"mdc-layout-grid__inner cf-crud-tab-header\" *ngIf=\"tab.description && tab.description.text\">\n            <div class=\"mdc-layout-grid__cell--span-12\">\n                {{tab.description.text}} \n            </div>\n        </div>\n\n        <div class=\"mdc-layout-grid__inner\" *ngIf=\"tab.customPlugin && tab.customPlugin.component\">\n            <div class=\"mdc-layout-grid__cell--span-12\">\n                <!-- <ndc-dynamic\n                    [ndcDynamicComponent]=\"tab.customPlugin.component\"\n                ></ndc-dynamic> -->\n            </div>\n        </div>\n\n        <div \n            *ngFor=\"let row of formRows; let rIndex = index;\" \n            class=\"mdc-layout-grid__inner cf-crud-tab-form\"> \n            <div\n                *ngFor=\"let cell of row\" \n                class=\"mdc-layout-grid__cell--span-{{cell.colSpan * 6}} cf-crud-form\">\n                <!-- <pre>--{{configData.record[cell.widget.identifier] | json}}--</pre> -->\n\n                <span *ngIf=\"cell.multiple && cell.multiple.addMore; else singleCell\">\n                    <mat-card  *ngIf=\"displayWidget(cell, record, record[cell.widget.identifier] && record[cell.widget.identifier][0] ? record[cell.widget.identifier][0] : {})\" class=\"cf-crud-child-widgets\">\n                        <!-- {{configData | json}} -->\n                        <mat-card-header class=\"cf-list-header\"> \n                            <mat-card-title>{{ cell.multiple.sectionTitle }}</mat-card-title>\n                            <cf-button \n                                class=\"cf-crud-widget-addmore\"\n                                [sourceIdentifier]=\"cell.widget.identifier\"\n                                [sourceIndex]=\"rIndex\" \n                                [context]=\"record\"\n                                [originalData]=\"configData.record[cell.widget.identifier]\"\n                                [button]=\"addWidget\"\n                                (onClick)=\"buttonClick($event);$event.event.stopPropagation()\"\n                            ></cf-button> \n                        </mat-card-header> \n                        <mat-divider class=\"cf-crud-form-header-divider\"></mat-divider>\n                        <mat-card-content class=\"cf-crud-child-widgets-content\">\n                            <span *ngIf=\"record[cell.widget.identifier] && record[cell.widget.identifier].length > 0; else newCellAtIndex;\">\n                                <span *ngFor=\"let cellAtIndex of record[cell.widget.identifier]; let cellArrayIndex = index;\">\n                                    <ng-container *ngTemplateOutlet=\"cfWidget; context: {\n                                        cell: cell, \n                                        supportingRecord: record,\n                                        record: record[cell.widget.identifier][cellArrayIndex], \n                                        configData: configData.record[cell.widget.identifier][cellArrayIndex], \n                                        multiple: true,\n                                        cellArrayIndex: cellArrayIndex,\n                                        tIndex: tIndex\n                                    }\"></ng-container>\n                                </span>\n                            </span>\n                            <ng-template #newCellAtIndex>\n                                <ng-container *ngTemplateOutlet=\"cfWidget; context: {\n                                    cell: cell, \n                                    supportingRecord: {},\n                                    record: {}, \n                                    configData: {}, \n                                    multiple: true,\n                                    cellArrayIndex: 0,\n                                    tIndex: tIndex\n                                }\"></ng-container>\n                            </ng-template>\n                        </mat-card-content>\n                    </mat-card>\n                </span>\n                <ng-template #singleCell>\n                    <span *ngIf=\"displayWidget(cell, record, record[cell.widget.identifier])\">\n                        <ng-container *ngTemplateOutlet=\"cfWidget; context: {\n                            cell: cell, \n                            supportingRecord: record,\n                            record: record[cell.widget.identifier], \n                            configData: configData.record[cell.widget.identifier], \n                            multiple: false,\n                            cellArrayIndex: null,\n                            tIndex: tIndex\n                        }\"></ng-container>\n                    </span>\n                </ng-template>\n            </div>\n        </div>\n    </div>\n</ng-template>\n\n<ng-template #cfWidget let-cell=\"cell\" let-supportingRecord=\"supportingRecord\" let-record=\"record\" let-configData=\"configData\" let-multiple=\"multiple\" let-cellArrayIndex=\"cellArrayIndex\" let-tIndex=\"tIndex\">\n    <cf-form \n        *ngIf=\"cell.widgetType == 'FORM'\"\n        [formConfig]=\"cell.widget\"\n        [sourceIndex]=\"tIndex\"\n        [widgetArrayIndex]=\"cellArrayIndex\"\n        [record]=\"record\"\n        [originalData]=\"configData\"  \n        [keyMap]=\"keyMap\"\n        [reset]=\"reset\" \n        (onFieldChange)=\"fieldChange($event)\"\n        (onFormChange)=\"formChange($event)\"\n        (onButtonClick)=\"buttonClick($event)\"\n    ></cf-form>\n\n    <cf-static-list\n        *ngIf=\"cell.widgetType == 'LIST' && cell.widget.listType == 'STATIC'\"\n        [listConfig]=\"cell.widget\"\n        [sourceIdentifier]=\"identifier\"\n        [sourceIndex]=\"tIndex\"\n        [widgetArrayIndex]=\"cellArrayIndex\"\n        [record]=\"record\"\n        [originalData]=\"configData\"  \n        [keyMap]=\"keyMap\"\n        (onFormChange)=\"formChange($event)\"\n        (onFieldChange)=\"fieldChange($event)\"\n        (onButtonClick)=\"buttonClick($event)\"\n        (onPageChange)=\"onPage($event)\"\n        (onSortChange)=\"onSort($event)\"  \n    ></cf-static-list>\n    <!-- [expanded]=\"_expanded\" -->\n\n    <cf-dynamic-list\n        *ngIf=\"cell.widgetType == 'LIST' && cell.widget.listType == 'DYNAMIC'\"\n        [listConfig]=\"cell.widget\"\n        [sourceIdentifier]=\"identifier\"\n        [sourceIndex]=\"tIndex\"\n        [widgetArrayIndex]=\"cellArrayIndex\"\n        [record]=\"record\"\n        [originalData]=\"configData\"  \n        [keyMap]=\"keyMap\"\n        (onFormChange)=\"formChange($event)\"\n        (onFieldChange)=\"fieldChange($event)\"\n        (onButtonClick)=\"buttonClick($event)\"\n        (onPageChange)=\"onPage($event)\"\n        (onSortChange)=\"onSort($event)\"  \n    ></cf-dynamic-list>\n</ng-template>",
                    styles: [":root{--mdc-layout-grid-column-width-desktop:72px;--mdc-layout-grid-column-width-phone:72px;--mdc-layout-grid-column-width-tablet:72px;--mdc-layout-grid-gutter-desktop:24px;--mdc-layout-grid-gutter-phone:16px;--mdc-layout-grid-gutter-tablet:16px;--mdc-layout-grid-margin-desktop:24px;--mdc-layout-grid-margin-phone:16px;--mdc-layout-grid-margin-tablet:16px}@media (min-width:840px){.mdc-layout-grid{box-sizing:border-box;margin:0 auto;padding:24px;padding:var(--mdc-layout-grid-margin-desktop,24px)}}@media (min-width:600px) and (max-width:839px){.mdc-layout-grid{box-sizing:border-box;margin:0 auto;padding:16px;padding:var(--mdc-layout-grid-margin-tablet,16px)}}@media (max-width:599px){.mdc-layout-grid{box-sizing:border-box;margin:0 auto;padding:16px;padding:var(--mdc-layout-grid-margin-phone,16px)}}@media (min-width:840px){.mdc-layout-grid__inner{align-items:stretch;display:flex;flex-flow:row wrap;margin:-12px;margin:calc(var(--mdc-layout-grid-gutter-desktop, 24px)/2*-1)}@supports (display:grid){.mdc-layout-grid__inner{-ms-grid-columns:(minmax(0,1fr))[12];display:-ms-grid;display:grid;grid-gap:24px;grid-gap:var(--mdc-layout-grid-gutter-desktop,24px);grid-template-columns:repeat(12,minmax(0,1fr));margin:0}}}@media (min-width:600px) and (max-width:839px){.mdc-layout-grid__inner{align-items:stretch;display:flex;flex-flow:row wrap;margin:-8px;margin:calc(var(--mdc-layout-grid-gutter-tablet, 16px)/2*-1)}@supports (display:grid){.mdc-layout-grid__inner{-ms-grid-columns:(minmax(0,1fr))[8];display:-ms-grid;display:grid;grid-gap:16px;grid-gap:var(--mdc-layout-grid-gutter-tablet,16px);grid-template-columns:repeat(8,minmax(0,1fr));margin:0}}}@media (max-width:599px){.mdc-layout-grid__inner{align-items:stretch;display:flex;flex-flow:row wrap;margin:-8px;margin:calc(var(--mdc-layout-grid-gutter-phone, 16px)/2*-1)}@supports (display:grid){.mdc-layout-grid__inner{-ms-grid-columns:(minmax(0,1fr))[4];display:-ms-grid;display:grid;grid-gap:16px;grid-gap:var(--mdc-layout-grid-gutter-phone,16px);grid-template-columns:repeat(4,minmax(0,1fr));margin:0}}}@media (min-width:840px){.mdc-layout-grid__cell{box-sizing:border-box;margin:12px;margin:calc(var(--mdc-layout-grid-gutter-desktop, 24px)/2);width:calc(33.33333% - 24px);width:calc(33.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell{-ms-grid-column-span:4;grid-column-end:span 4;margin:0;width:auto}}.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-desktop{width:calc(8.33333% - 24px);width:calc(8.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-desktop{-ms-grid-column-span:1;grid-column-end:span 1;width:auto}}.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-desktop{width:calc(16.66667% - 24px);width:calc(16.66667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-desktop{-ms-grid-column-span:2;grid-column-end:span 2;width:auto}}.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-desktop{width:calc(25% - 24px);width:calc(25% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-desktop{-ms-grid-column-span:3;grid-column-end:span 3;width:auto}}.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-desktop{width:calc(33.33333% - 24px);width:calc(33.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-desktop{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-desktop{width:calc(41.66667% - 24px);width:calc(41.66667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-desktop{-ms-grid-column-span:5;grid-column-end:span 5;width:auto}}.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-desktop{width:calc(50% - 24px);width:calc(50% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-desktop{-ms-grid-column-span:6;grid-column-end:span 6;width:auto}}.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-desktop{width:calc(58.33333% - 24px);width:calc(58.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-desktop{-ms-grid-column-span:7;grid-column-end:span 7;width:auto}}.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-desktop{width:calc(66.66667% - 24px);width:calc(66.66667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-desktop{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-desktop{width:calc(75% - 24px);width:calc(75% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-desktop{-ms-grid-column-span:9;grid-column-end:span 9;width:auto}}.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-desktop{width:calc(83.33333% - 24px);width:calc(83.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-desktop{-ms-grid-column-span:10;grid-column-end:span 10;width:auto}}.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-desktop{width:calc(91.66667% - 24px);width:calc(91.66667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-desktop{-ms-grid-column-span:11;grid-column-end:span 11;width:auto}}.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-desktop{width:calc(100% - 24px);width:calc(100% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-desktop{-ms-grid-column-span:12;grid-column-end:span 12;width:auto}}}@media (min-width:600px) and (max-width:839px){.mdc-layout-grid__cell{box-sizing:border-box;margin:8px;margin:calc(var(--mdc-layout-grid-gutter-tablet, 16px)/2);width:calc(50% - 16px);width:calc(50% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell{-ms-grid-column-span:4;grid-column-end:span 4;margin:0;width:auto}}.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-tablet{width:calc(12.5% - 16px);width:calc(12.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-tablet{-ms-grid-column-span:1;grid-column-end:span 1;width:auto}}.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-tablet{width:calc(25% - 16px);width:calc(25% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-tablet{-ms-grid-column-span:2;grid-column-end:span 2;width:auto}}.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-tablet{width:calc(37.5% - 16px);width:calc(37.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-tablet{-ms-grid-column-span:3;grid-column-end:span 3;width:auto}}.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-tablet{width:calc(50% - 16px);width:calc(50% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-tablet{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-tablet{width:calc(62.5% - 16px);width:calc(62.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-tablet{-ms-grid-column-span:5;grid-column-end:span 5;width:auto}}.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-tablet{width:calc(75% - 16px);width:calc(75% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-tablet{-ms-grid-column-span:6;grid-column-end:span 6;width:auto}}.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-tablet{width:calc(87.5% - 16px);width:calc(87.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-tablet{-ms-grid-column-span:7;grid-column-end:span 7;width:auto}}.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}}@media (max-width:599px){.mdc-layout-grid__cell{box-sizing:border-box;margin:8px;margin:calc(var(--mdc-layout-grid-gutter-phone, 16px)/2);width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell{-ms-grid-column-span:4;grid-column-end:span 4;margin:0;width:auto}}.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-phone{width:calc(25% - 16px);width:calc(25% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-phone{-ms-grid-column-span:1;grid-column-end:span 1;width:auto}}.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-phone{width:calc(50% - 16px);width:calc(50% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-phone{-ms-grid-column-span:2;grid-column-end:span 2;width:auto}}.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-phone{width:calc(75% - 16px);width:calc(75% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-phone{-ms-grid-column-span:3;grid-column-end:span 3;width:auto}}.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}}.mdc-layout-grid__cell--order-1{order:1}.mdc-layout-grid__cell--order-2{order:2}.mdc-layout-grid__cell--order-3{order:3}.mdc-layout-grid__cell--order-4{order:4}.mdc-layout-grid__cell--order-5{order:5}.mdc-layout-grid__cell--order-6{order:6}.mdc-layout-grid__cell--order-7{order:7}.mdc-layout-grid__cell--order-8{order:8}.mdc-layout-grid__cell--order-9{order:9}.mdc-layout-grid__cell--order-10{order:10}.mdc-layout-grid__cell--order-11{order:11}.mdc-layout-grid__cell--order-12{order:12}.mdc-layout-grid__cell--align-top{align-self:flex-start}@supports (display:grid){.mdc-layout-grid__cell--align-top{-ms-grid-row-align:start;align-self:start}}.mdc-layout-grid__cell--align-middle{-ms-grid-row-align:center;align-self:center}.mdc-layout-grid__cell--align-bottom{align-self:flex-end}@supports (display:grid){.mdc-layout-grid__cell--align-bottom{-ms-grid-row-align:end;align-self:end}}@media (min-width:840px){.mdc-layout-grid--fixed-column-width{width:1176px;width:calc(var(--mdc-layout-grid-column-width-desktop, 72px)*12 + var(--mdc-layout-grid-gutter-desktop, 24px)*11 + var(--mdc-layout-grid-margin-desktop, 24px)*2)}}@media (min-width:600px) and (max-width:839px){.mdc-layout-grid--fixed-column-width{width:720px;width:calc(var(--mdc-layout-grid-column-width-tablet, 72px)*8 + var(--mdc-layout-grid-gutter-tablet, 16px)*7 + var(--mdc-layout-grid-margin-tablet, 16px)*2)}}@media (max-width:599px){.mdc-layout-grid--fixed-column-width{width:368px;width:calc(var(--mdc-layout-grid-column-width-phone, 72px)*4 + var(--mdc-layout-grid-gutter-phone, 16px)*3 + var(--mdc-layout-grid-margin-phone, 16px)*2)}}.mdc-layout-grid--align-left{margin-left:0;margin-right:auto}.mdc-layout-grid--align-right{margin-left:auto;margin-right:0}.cf-crud-card{background-color:transparent}.cf-crud-form{padding-bottom:20px}.cf-crud-tab{padding:0!important}.cf-crud-tab-header{padding:20px 0!important}.cf-crud-tab-form{margin:1px}.cf-crud-header{padding:0}.cf-crud-header-desc{padding:5px 10px;width:auto}.cf-crud-header-desc-icon{font-size:15px;height:15px!important;margin-top:0;padding:0 5px 0 0;width:15px!important}.cf-crud-child-widgets{background-color:#f5f5f5}.cf-crud-child-widgets-content{padding-top:20px}.cf-crud-widget-addmore{margin-top:-8px}.cf-crud-content{padding-top:16px}"]
                },] }
    ];
    CrudFormComponent.ctorParameters = function () { return [
        { type: ability.Ability }
    ]; };
    CrudFormComponent.propDecorators = {
        identifier: [{ type: core.Input }],
        header: [{ type: core.Input }],
        actions: [{ type: core.Input }],
        actionPages: [{ type: core.Input }],
        form: [{ type: core.Input }],
        reset: [{ type: core.Input }],
        configData: [{ type: core.Input }],
        keyMap: [{ type: core.Input }],
        onFormChange: [{ type: core.Output }],
        onFieldChange: [{ type: core.Output }],
        onButtonClick: [{ type: core.Output }],
        onSortClick: [{ type: core.Output }],
        onPageClick: [{ type: core.Output }]
    };

    var CrudListComponent = /** @class */ (function () {
        function CrudListComponent(_bottomSheet, ability) {
            this._bottomSheet = _bottomSheet;
            this.ability = ability;
            this._expanded = false;
            this.onFormChange = new core.EventEmitter();
            this.onFieldChange = new core.EventEmitter();
            this.onButtonClick = new core.EventEmitter();
            this.onButtonIconClick = new core.EventEmitter();
            this.onSortClick = new core.EventEmitter();
            this.onPageClick = new core.EventEmitter();
            this.onTabClick = new core.EventEmitter();
            this.showSearchForm = false;
            this.listHeaders = new Array();
            this.searchOnFieldsCount = 0;
            this.searchOnFieldsButtons = new Array();
            AbilityUtils.setAbility(this.ability);
        }
        Object.defineProperty(CrudListComponent.prototype, "configData", {
            get: function () {
                return this._configData;
            },
            set: function (_configData) {
                this._configData = _configData;
                this.setConfigAsPerTab();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(CrudListComponent.prototype, "expanded", {
            get: function () {
                return this._expanded;
            },
            set: function (_expanded) {
                this._expanded = _expanded;
            },
            enumerable: false,
            configurable: true
        });
        CrudListComponent.prototype.ngOnInit = function () {
            this.searchButton = this.setSearchButton('searchButton', 'Search', 'search');
            this.searchModalButton = this.setSearchButton('searchCloseButton', 'Close', 'close');
            this.displaySearchForm();
            this.setListHeaders();
            this.setCrudHeader();
            if (this.searchConfig && this.searchConfig.displayType != "ABOVE_LIST" /* ABOVE_LIST */) {
                this.searchConfig.form.displayInColumns = 1;
            }
            this.setConfigAsPerTab();
        };
        CrudListComponent.prototype.setConfigAsPerTab = function (tabIdentifier) {
            var _this = this;
            if (this._configData) {
                this.badges = this._configData.badges;
                this.pageBackRoute = this._configData.pageBackRoute;
                this.records = this._configData.records;
                this.searchData = this._configData.searchData;
                this.searchOnFieldsCount = 0;
                this.searchOnFieldsButtons = new Array();
                if (this.searchData && !CollectionUtils.isEmpty(this.searchData)) {
                    for (var cnt = 0; cnt < Object.keys(this.searchData).length; cnt++) {
                        if (!StringUtils.isEmpty(this.searchData[Object.keys(this.searchData)[cnt]])) {
                            this.searchOnFieldsCount++;
                            var filterButton = this.setSelectedFilterButton(Object.keys(this.searchData)[cnt], this.searchData[Object.keys(this.searchData)[cnt]]);
                            this.searchOnFieldsButtons.push(filterButton);
                        }
                    }
                }
                if (this._configData.configPerTabs) {
                    var tabIndex_1 = 0;
                    this._configData.configPerTabs.forEach(function (tabConfigData, tabKey) {
                        if ((tabKey == tabIdentifier || (tabIndex_1 == 0 && tabIdentifier == null)) && tabConfigData) {
                            if (tabConfigData.badges) {
                                _this.badges = tabConfigData.badges;
                            }
                            if (tabConfigData.pageBackRoute) {
                                _this.pageBackRoute = tabConfigData.pageBackRoute;
                            }
                            if (tabConfigData.records && tabConfigData.records.length > 0) {
                                _this.records = _this._configData.records;
                            }
                        }
                        tabIndex_1++;
                    });
                }
            }
        };
        CrudListComponent.prototype.getTabIdentifier = function (tabTitle) {
            var tabIdentifier = '';
            if (this.listConfig && this.listConfig.displayType == "TAB" /* TAB */) {
                for (var index = 0; index < this.listConfig.lists.length; index++) {
                    if (this.listHeaders[index].title == tabTitle) {
                        tabIdentifier = this.listConfig.lists[index].identifier;
                        break;
                    }
                }
            }
            return tabIdentifier;
        };
        CrudListComponent.prototype.setListHeaders = function () {
            if (this.listConfig.lists) {
                for (var index = 0; index < this.listConfig.lists.length; index++) {
                    this.listHeaders.push(this.listConfig.lists[index].header);
                    // this.listConfig.lists[index].header = "";
                }
            }
        };
        CrudListComponent.prototype.setCrudHeader = function () {
            var title = "";
            if (this.header) {
                title = this.header.title;
            }
            if (this.listConfig.lists && this.listConfig.lists.length == 1 && this.listConfig.lists[0].header && this.listConfig.lists[0].header.title) {
                title = this.listConfig.lists[0].header.title;
                this.listConfig.lists[0].header.title = "";
            }
            this.title = title;
        };
        CrudListComponent.prototype.displaySearchForm = function () {
            var e_1, _a;
            if (this.listConfig && this.listConfig.lists && this.listConfig.lists.length > 0) {
                try {
                    for (var _b = __values(this.listConfig.lists), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var lConfig = _c.value;
                        if (lConfig.listType == "DYNAMIC" /* DYNAMIC */ && this.searchConfig) {
                            this.showSearchForm = true;
                            break;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        };
        CrudListComponent.prototype.setSearchButton = function (identifier, label, icon) {
            return {
                identifier: identifier,
                label: label,
                color: "primary" /* PRIMARY */,
                size: "small" /* SMALL */,
                icon: icon,
                type: "GHOST" /* GHOST */,
                onlyIcon: true,
            };
        };
        CrudListComponent.prototype.setSelectedFilterButton = function (identifier, label) {
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
        };
        CrudListComponent.prototype.close = function () {
            this.sidenav.close();
        };
        CrudListComponent.prototype.fieldChange = function (fieldChange) {
            console.log(fieldChange);
            this.onFieldChange.emit(fieldChange);
        };
        CrudListComponent.prototype.formChange = function (form) {
            this.onFormChange.emit(form);
        };
        CrudListComponent.prototype.buttonClick = function (event) {
            console.log(event);
            this.onButtonClick.emit(event);
        };
        CrudListComponent.prototype.buttonIconClick = function (event) {
            this.onButtonIconClick.emit(event);
        };
        CrudListComponent.prototype.onSort = function (event) {
            console.log(event);
            this.onSortClick.emit(event);
        };
        CrudListComponent.prototype.onPage = function (event) {
            console.log(event);
            this.onPageClick.emit(event);
        };
        CrudListComponent.prototype.onAccordianChange = function (event) {
            console.log(event);
        };
        CrudListComponent.prototype.onTabChange = function (event) {
            console.log(event);
            this.setConfigAsPerTab(this.getTabIdentifier(event.tab.textLabel));
        };
        CrudListComponent.prototype.openBottomSheet = function () {
            var _this = this;
            var dialogRef = this._bottomSheet.open(BottomSearchSheet, {
                data: { searchConfig: this.searchConfig, searchData: this.searchData, reset: this.formReset },
            });
            this.buttonSubscriber = dialogRef.instance.onButtonClick.subscribe(function (event) { return _this.buttonClick(event); });
            this.fieldSubscriber = dialogRef.instance.onFieldChange.subscribe(function (event) { return _this.fieldChange(event); });
            this.formSubscriber = dialogRef.instance.onFormChange.subscribe(function (event) { return _this.formChange(event); });
            this.dialogRefSubscriber = dialogRef.afterDismissed().subscribe(function () {
                _this.bottomUnsubscribe();
            });
        };
        CrudListComponent.prototype.ngOnDestroy = function () {
            this.bottomUnsubscribe();
            if (this.dialogRefSubscriber) {
                this.dialogRefSubscriber.unsubscribe();
            }
        };
        CrudListComponent.prototype.bottomUnsubscribe = function () {
            if (this.buttonSubscriber) {
                this.buttonSubscriber.unsubscribe();
            }
            if (this.fieldSubscriber) {
                this.fieldSubscriber.unsubscribe();
            }
            if (this.formSubscriber) {
                this.formSubscriber.unsubscribe();
            }
        };
        return CrudListComponent;
    }());
    CrudListComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'cf-crud-list',
                    template: "<mat-card \n  [style.padding.px]=\"listConfig && listConfig.style && listConfig.style.hideCard ? 0 : 'auto'\"\n  class=\"cf-crud-card\"\n  *ngIf=\"listConfig && (listConfig.permission == null || (listConfig.permission && (listConfig.permission['subject'] | can: listConfig.permission['action'])))\">\n  <cf-crud-header\n    [identifier]=\"identifier\"\n    [title]=\"title\"\n    [subtitle]=\"header.subtitle\"\n    [description]=\"header.description\"\n    [style]=\"listConfig.style\"\n    [badges]=\"badges\"\n    [icon]=\"header.icon\"\n    [pageBackRoute]=\"pageBackRoute\"\n    [formDisplayMode]=\"'CRUD_LIST'\"\n    [actions]=\"actions\" \n    [context]=\"records\"\n    [originalData]=\"_configData.originalData\"  \n    [style.width.%]=\"100\"\n    (onButtonClick)=\"buttonClick($event)\"\n  ></cf-crud-header>\n\n  <mat-card-content>  \n    <div \n      [style.margin]=\"listConfig && listConfig.style && listConfig.style.hideCard ? '0px 16px' : 'auto'\"\n      class=\"mdc-layout-grid cf-crud-header-desc\" \n      *ngIf=\"header.description && header.description.text\">\n      <div class=\"mdc-layout-grid__inner\">\n          <div class=\"mdc-layout-grid__cell--span-12\">\n              <div \n              [ngClass]=\"{'cf-crud-header-desc-without-bg': !header.description.bgColor, 'cf-crud-header-desc-with-bg': header.description.bgColor}\"\n              [style.background-color]=\"header.description.bgColor\"\n              [style.color]=\"header.description.textColor\"\n                  >\n                  <mat-icon class=\"cf-crud-header-desc-icon\" aria-hidden=\"true\" [attr.aria-label]=\"header.description.icon\" *ngIf=\"header.description.icon\">{{header.description.icon}}</mat-icon>\n                  <span>{{ header.description.text }}</span>\n              </div>\n          </div>\n      </div>\n    </div>\n    <!-- <cf-error></cf-error> -->\n    <div class=\"mdc-layout-grid cf-crud-body\">\n      <div class=\"mdc-layout-grid__inner\">\n        <div class=\"mdc-layout-grid__cell--span-12\" *ngIf=\"quickLinks && quickLinks.length > 0\">\n          <span class=\"cf-quicklinks\">\n            <cf-button-group\n              [buttons]=\"quickLinks\"\n              [sourceIdentifier]=\"identifier\"\n              [sourceIndex]=\"'0'\"\n              [context]=\"records\"\n              [originalData]=\"configData.originalData\"  \n              (onClick)=\"buttonClick($event)\"\n            ></cf-button-group>\n          </span>  \n        </div>\n      </div>\n      <div class=\"mdc-layout-grid__inner cf-crud-search-inline\" *ngIf=\"showSearchForm\">\n        <div class=\"mdc-layout-grid__cell--span-12\">\n          <ng-container *ngTemplateOutlet=\"cfsearchlayout\"></ng-container>\n        </div>\n      </div>\n\n      <div class=\"mdc-layout-grid__inner cf-crud-list\" *ngIf=\"listConfig.customPlugin && listConfig.customPlugin.placement == 'ABOVE' && listConfig.customPlugin.component\">\n        <div class=\"mdc-layout-grid__cell--span-12\">\n          <!-- <ndc-dynamic\n            [ndcDynamicComponent]=\"listConfig.customPlugin.component\"\n          ></ndc-dynamic> -->\n        </div>\n      </div>\n\n      <div class=\"mdc-layout-grid__inner cf-crud-list\">\n        <div class=\"mdc-layout-grid__cell--span-12\">\n          <ng-container *ngTemplateOutlet=\"cftablegroup\"></ng-container>\n        </div>\n      </div>\n      \n      <div class=\"mdc-layout-grid__inner cf-crud-list\" *ngIf=\"listConfig.customPlugin && listConfig.customPlugin.placement == 'BELOW' && listConfig.customPlugin.component\">\n        <div class=\"mdc-layout-grid__cell--span-12\">\n          <!-- <ndc-dynamic\n            [ndcDynamicComponent]=\"listConfig.customPlugin.component\"\n          ></ndc-dynamic> -->\n        </div>\n      </div>\n    </div>\n  </mat-card-content>\n</mat-card>\n\n<ng-template #cfsearchlayout>\n  <span *ngIf=\"searchConfig.displayType == 'ABOVE_LIST'\">\n    <ng-container *ngTemplateOutlet=\"cfsearch\"></ng-container>\n  </span>\n  <span class=\"\" *ngIf=\"searchConfig.displayType == 'LEFT_MODAL' || searchConfig.displayType == 'RIGHT_MODAL'\">\n    <!-- <mat-sidenav-container (backdropClick)=\"close('backdrop')\"> -->\n    <!-- <span class=\"cf-crud-search-strip-modal\"> -->\n      <span class=\"cf-crud-search-modal\">\n        <mat-sidenav-content>\n          <cf-button\n            [sourceIdentifier]=\"identifier\"\n            [sourceIndex]=\"'0'\"\n            [button]=\"searchButton\"\n            [context]=\"records\"\n            [originalData]=\"configData.originalData\"  \n            (onClick)=\"sidenav.open()\"\n          ></cf-button>\n\n          <span class=\"cf-crud-search-applied\">\n            <span class=\"cf-crud-search-label\" *ngIf=\"searchOnFieldsCount == null || searchOnFieldsCount == 0\">Apply Filter</span>\n            <span class=\"cf-crud-search-label\" *ngIf=\"searchOnFieldsCount && searchOnFieldsCount > 0\">Filters (<strong>{{ searchOnFieldsCount }}</strong>)</span>\n            <!-- {{searchOnFieldsButtons | json}} -->\n            <cf-button-group \n              [buttons]=\"searchOnFieldsButtons\" \n              [formDisplayMode]=\"'ADD'\"\n              [sourceIdentifier]=\"'searchFields'\"\n              [sourceIndex]=\"0\" \n              [widgetArrayIndex]=\"0\"\n              [originalData]=\"searchData\"\n              (onIconClick)=\"buttonIconClick\"\n            >\n            </cf-button-group>\n            <!-- <span *ngFor=\"let fButton of searchOnFieldsButtons\">\n              <cf-button\n                [sourceIdentifier]=\"fButton.identifier\"\n                [sourceIndex]=\"'0'\"\n                [button]=\"fButton\"\n              ></cf-button>\n            </span> -->\n          </span>\n        </mat-sidenav-content>\n      </span>\n    <!-- </span> -->\n\n    <mat-sidenav #sidenav [position]=\"searchConfig.displayType == 'LEFT_MODAL' ? 'start': 'end'\" (keydown.escape)=\"close()\" (backdropClick)=\"close()\" [disableClose]=\"false\">\n      <div class=\"mdc-layout-grid cf-crud-search-modal\">\n        <!-- <div class=\"mdc-layout-grid__inner\">\n          <div class=\"mdc-layout-grid__cell--span-12 mdc-layout-grid--align-right\">\n            <cf-button\n              [sourceIdentifier]=\"identifier\"\n              [sourceIndex]=\"'0'\"\n              [button]=\"searchModalButton\"\n              align = \"right\"\n              (onClick)=\"close()\"\n            ></cf-button>\n          </div>\n        </div> -->\n        <div class=\"mdc-layout-grid__inner\">\n          <div class=\"mdc-layout-grid__cell--span-12\">\n            <ng-container *ngTemplateOutlet=\"cfsearch\"></ng-container>\n          </div>\n        </div>\n      </div>\n    </mat-sidenav>\n  </span>\n  <span *ngIf=\"searchConfig.displayType == 'BOTTOM_MODAL'\">\n    <cf-button\n      [sourceIdentifier]=\"identifier\"\n      [sourceIndex]=\"'0'\"\n      [button]=\"searchButton\"\n      (onClick)=\"openBottomSheet()\"\n    ></cf-button>\n  </span>\n</ng-template>\n\n<ng-template #cfsearch>\n  <span>\n    <!-- {{searchData | json}}-- -->\n    <cf-form\n      [formConfig]=\"searchConfig.form\"\n      [sourceIndex]=\"'0'\"\n      [reset]=\"formReset\"\n      [record]=\"searchData\"\n      [keyMap]=\"keyMap\"\n      class=\"cf-crud-search\"\n      (onFieldChange)=\"fieldChange($event)\"\n      (onFormChange)=\"formChange($event)\"\n      (onButtonClick)=\"buttonClick($event)\"\n    ></cf-form>\n  </span>\n</ng-template>\n\n<ng-template #cftablegroup>\n  <span *ngIf=\"(listConfig.lists.length == 1) || (listConfig.lists.length > 1 && listConfig.displayType == 'LIST')\">\n    <span *ngFor=\"let lConfig of listConfig.lists\">\n      <ng-container *ngTemplateOutlet=\"cftable; context: {lConfig: lConfig, rIndex: 0}\"></ng-container>\n    </span>\n  </span>\n\n  <span *ngIf=\"listConfig.lists.length > 1 && listConfig.displayType == 'TAB'\">\n    <mat-tab-group (selectedTabChange)=\"onTabChange($event)\">\n      <mat-tab \n        *ngFor=\"let lConfig of listConfig.lists; let rIndex=index\"\n        [label]=\"listHeaders[rIndex].title\">\n        <ng-container *ngTemplateOutlet=\"cftable; context: {lConfig: lConfig, rIndex: rIndex}\"></ng-container>\n      </mat-tab>\n    </mat-tab-group>\n  </span>\n\n  <span class=\"cf-crud-list-accordian\" *ngIf=\"listConfig.lists.length > 1 && listConfig.displayType == 'ACCORDIAN'\">\n    <mat-accordion>\n      <mat-expansion-panel\n        *ngFor=\"let lConfig of listConfig.lists; let rIndex=index\"\n        [expanded]=\"rIndex === 0\"\n        (opened)=\"onAccordianChange(rIndex)\"> \n        <mat-expansion-panel-header>\n          <mat-panel-title>\n            {{listHeaders[rIndex].title}}\n          </mat-panel-title>\n        </mat-expansion-panel-header>\n        <ng-container *ngTemplateOutlet=\"cftable; context: {lConfig: lConfig, rIndex: rIndex}\"></ng-container>\n      </mat-expansion-panel>\n    </mat-accordion>\n  </span>\n</ng-template>\n\n<ng-template #cftable let-lConfig=\"lConfig\" let-rIndex=\"rIndex\">\n  <!-- <pre>\n    {{records | json}}\n    {{lConfig | json}}\n    CRUD _listReset: {{listReset}}<br/>\n  </pre> -->\n  <cf-static-list\n    *ngIf=\"lConfig.listType == 'STATIC'\"\n    [listConfig]=\"lConfig\"\n    [sourceIdentifier]=\"identifier\"\n    [sourceIndex]=\"rIndex\"\n    [record]=\"records && records[rIndex] ? records[rIndex] : []\"\n    [originalData]=\"configData.originalData\"  \n    [listReset]=\"listReset\"\n    [expanded]=\"_expanded\"\n    [expandRowIndex]=\"expandRowIndex\"\n    [keyMap]=\"keyMap\"\n    (onFormChange)=\"formChange($event)\"\n    (onFieldChange)=\"fieldChange($event)\"\n    (onButtonClick)=\"buttonClick($event)\"\n    (onPageChange)=\"onPage($event)\"\n    (onSortChange)=\"onSort($event)\"  \n  ></cf-static-list>  \n\n  <cf-dynamic-list\n    *ngIf=\"lConfig.listType == 'DYNAMIC'\"\n    [listConfig]=\"lConfig\"\n    [sourceIdentifier]=\"identifier\"\n    [sourceIndex]=\"rIndex\"\n    [record]=\"records && records[rIndex] ? records[rIndex] : []\"\n    [originalData]=\"configData.originalData\"  \n    [listReset]=\"listReset\"\n    [expanded]=\"_expanded\"\n    [expandRowIndex]=\"expandRowIndex\"\n    [keyMap]=\"keyMap\"\n    (onFormChange)=\"formChange($event)\"\n    (onFieldChange)=\"fieldChange($event)\"\n    (onButtonClick)=\"buttonClick($event)\"\n    (onPageChange)=\"onPage($event)\"\n    (onSortChange)=\"onSort($event)\"  \n  ></cf-dynamic-list>\n</ng-template>",
                    styles: [":root{--mdc-layout-grid-column-width-desktop:72px;--mdc-layout-grid-column-width-phone:72px;--mdc-layout-grid-column-width-tablet:72px;--mdc-layout-grid-gutter-desktop:24px;--mdc-layout-grid-gutter-phone:16px;--mdc-layout-grid-gutter-tablet:16px;--mdc-layout-grid-margin-desktop:24px;--mdc-layout-grid-margin-phone:16px;--mdc-layout-grid-margin-tablet:16px}@media (min-width:840px){.mdc-layout-grid{box-sizing:border-box;margin:0 auto;padding:24px;padding:var(--mdc-layout-grid-margin-desktop,24px)}}@media (min-width:600px) and (max-width:839px){.mdc-layout-grid{box-sizing:border-box;margin:0 auto;padding:16px;padding:var(--mdc-layout-grid-margin-tablet,16px)}}@media (max-width:599px){.mdc-layout-grid{box-sizing:border-box;margin:0 auto;padding:16px;padding:var(--mdc-layout-grid-margin-phone,16px)}}@media (min-width:840px){.mdc-layout-grid__inner{align-items:stretch;display:flex;flex-flow:row wrap;margin:-12px;margin:calc(var(--mdc-layout-grid-gutter-desktop, 24px)/2*-1)}@supports (display:grid){.mdc-layout-grid__inner{-ms-grid-columns:(minmax(0,1fr))[12];display:-ms-grid;display:grid;grid-gap:24px;grid-gap:var(--mdc-layout-grid-gutter-desktop,24px);grid-template-columns:repeat(12,minmax(0,1fr));margin:0}}}@media (min-width:600px) and (max-width:839px){.mdc-layout-grid__inner{align-items:stretch;display:flex;flex-flow:row wrap;margin:-8px;margin:calc(var(--mdc-layout-grid-gutter-tablet, 16px)/2*-1)}@supports (display:grid){.mdc-layout-grid__inner{-ms-grid-columns:(minmax(0,1fr))[8];display:-ms-grid;display:grid;grid-gap:16px;grid-gap:var(--mdc-layout-grid-gutter-tablet,16px);grid-template-columns:repeat(8,minmax(0,1fr));margin:0}}}@media (max-width:599px){.mdc-layout-grid__inner{align-items:stretch;display:flex;flex-flow:row wrap;margin:-8px;margin:calc(var(--mdc-layout-grid-gutter-phone, 16px)/2*-1)}@supports (display:grid){.mdc-layout-grid__inner{-ms-grid-columns:(minmax(0,1fr))[4];display:-ms-grid;display:grid;grid-gap:16px;grid-gap:var(--mdc-layout-grid-gutter-phone,16px);grid-template-columns:repeat(4,minmax(0,1fr));margin:0}}}@media (min-width:840px){.mdc-layout-grid__cell{box-sizing:border-box;margin:12px;margin:calc(var(--mdc-layout-grid-gutter-desktop, 24px)/2);width:calc(33.33333% - 24px);width:calc(33.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell{-ms-grid-column-span:4;grid-column-end:span 4;margin:0;width:auto}}.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-desktop{width:calc(8.33333% - 24px);width:calc(8.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-desktop{-ms-grid-column-span:1;grid-column-end:span 1;width:auto}}.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-desktop{width:calc(16.66667% - 24px);width:calc(16.66667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-desktop{-ms-grid-column-span:2;grid-column-end:span 2;width:auto}}.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-desktop{width:calc(25% - 24px);width:calc(25% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-desktop{-ms-grid-column-span:3;grid-column-end:span 3;width:auto}}.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-desktop{width:calc(33.33333% - 24px);width:calc(33.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-desktop{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-desktop{width:calc(41.66667% - 24px);width:calc(41.66667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-desktop{-ms-grid-column-span:5;grid-column-end:span 5;width:auto}}.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-desktop{width:calc(50% - 24px);width:calc(50% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-desktop{-ms-grid-column-span:6;grid-column-end:span 6;width:auto}}.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-desktop{width:calc(58.33333% - 24px);width:calc(58.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-desktop{-ms-grid-column-span:7;grid-column-end:span 7;width:auto}}.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-desktop{width:calc(66.66667% - 24px);width:calc(66.66667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-desktop{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-desktop{width:calc(75% - 24px);width:calc(75% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-desktop{-ms-grid-column-span:9;grid-column-end:span 9;width:auto}}.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-desktop{width:calc(83.33333% - 24px);width:calc(83.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-desktop{-ms-grid-column-span:10;grid-column-end:span 10;width:auto}}.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-desktop{width:calc(91.66667% - 24px);width:calc(91.66667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-desktop{-ms-grid-column-span:11;grid-column-end:span 11;width:auto}}.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-desktop{width:calc(100% - 24px);width:calc(100% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-desktop{-ms-grid-column-span:12;grid-column-end:span 12;width:auto}}}@media (min-width:600px) and (max-width:839px){.mdc-layout-grid__cell{box-sizing:border-box;margin:8px;margin:calc(var(--mdc-layout-grid-gutter-tablet, 16px)/2);width:calc(50% - 16px);width:calc(50% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell{-ms-grid-column-span:4;grid-column-end:span 4;margin:0;width:auto}}.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-tablet{width:calc(12.5% - 16px);width:calc(12.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-tablet{-ms-grid-column-span:1;grid-column-end:span 1;width:auto}}.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-tablet{width:calc(25% - 16px);width:calc(25% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-tablet{-ms-grid-column-span:2;grid-column-end:span 2;width:auto}}.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-tablet{width:calc(37.5% - 16px);width:calc(37.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-tablet{-ms-grid-column-span:3;grid-column-end:span 3;width:auto}}.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-tablet{width:calc(50% - 16px);width:calc(50% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-tablet{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-tablet{width:calc(62.5% - 16px);width:calc(62.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-tablet{-ms-grid-column-span:5;grid-column-end:span 5;width:auto}}.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-tablet{width:calc(75% - 16px);width:calc(75% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-tablet{-ms-grid-column-span:6;grid-column-end:span 6;width:auto}}.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-tablet{width:calc(87.5% - 16px);width:calc(87.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-tablet{-ms-grid-column-span:7;grid-column-end:span 7;width:auto}}.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}}@media (max-width:599px){.mdc-layout-grid__cell{box-sizing:border-box;margin:8px;margin:calc(var(--mdc-layout-grid-gutter-phone, 16px)/2);width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell{-ms-grid-column-span:4;grid-column-end:span 4;margin:0;width:auto}}.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-phone{width:calc(25% - 16px);width:calc(25% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-phone{-ms-grid-column-span:1;grid-column-end:span 1;width:auto}}.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-phone{width:calc(50% - 16px);width:calc(50% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-phone{-ms-grid-column-span:2;grid-column-end:span 2;width:auto}}.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-phone{width:calc(75% - 16px);width:calc(75% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-phone{-ms-grid-column-span:3;grid-column-end:span 3;width:auto}}.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}}.mdc-layout-grid__cell--order-1{order:1}.mdc-layout-grid__cell--order-2{order:2}.mdc-layout-grid__cell--order-3{order:3}.mdc-layout-grid__cell--order-4{order:4}.mdc-layout-grid__cell--order-5{order:5}.mdc-layout-grid__cell--order-6{order:6}.mdc-layout-grid__cell--order-7{order:7}.mdc-layout-grid__cell--order-8{order:8}.mdc-layout-grid__cell--order-9{order:9}.mdc-layout-grid__cell--order-10{order:10}.mdc-layout-grid__cell--order-11{order:11}.mdc-layout-grid__cell--order-12{order:12}.mdc-layout-grid__cell--align-top{align-self:flex-start}@supports (display:grid){.mdc-layout-grid__cell--align-top{-ms-grid-row-align:start;align-self:start}}.mdc-layout-grid__cell--align-middle{-ms-grid-row-align:center;align-self:center}.mdc-layout-grid__cell--align-bottom{align-self:flex-end}@supports (display:grid){.mdc-layout-grid__cell--align-bottom{-ms-grid-row-align:end;align-self:end}}@media (min-width:840px){.mdc-layout-grid--fixed-column-width{width:1176px;width:calc(var(--mdc-layout-grid-column-width-desktop, 72px)*12 + var(--mdc-layout-grid-gutter-desktop, 24px)*11 + var(--mdc-layout-grid-margin-desktop, 24px)*2)}}@media (min-width:600px) and (max-width:839px){.mdc-layout-grid--fixed-column-width{width:720px;width:calc(var(--mdc-layout-grid-column-width-tablet, 72px)*8 + var(--mdc-layout-grid-gutter-tablet, 16px)*7 + var(--mdc-layout-grid-margin-tablet, 16px)*2)}}@media (max-width:599px){.mdc-layout-grid--fixed-column-width{width:368px;width:calc(var(--mdc-layout-grid-column-width-phone, 72px)*4 + var(--mdc-layout-grid-gutter-phone, 16px)*3 + var(--mdc-layout-grid-margin-phone, 16px)*2)}}.mdc-layout-grid--align-left{margin-left:0;margin-right:auto}.mdc-layout-grid--align-right{margin-left:auto;margin-right:0}.cf-crud-card{background-color:transparent}.cf-crud-search-strip-modal{padding:0 0 0 8px}.cf-list-search-btn{text-align:right}.cf-crud-search-applied{color:rgba(0,0,0,.54);font-size:12px}.cf-crud-search-applied .cf-crud-search-label{padding-right:8px}.mdc-layout-grid{padding-left:0!important;padding-right:0!important}.cf-crud-search-modal{padding-bottom:0!important;padding-right:8px;padding-top:0!important}.cf-crud-search-modal mat-sidenav-content{margin-left:0!important}.cf-crud-list{padding-bottom:20px!important;padding-top:10px!important}::ng-deep .mat-expansion-panel-header{padding:0 16px!important}::ng-deep .mat-expansion-panel-body{padding:0!important}.cf-crud-header-desc{margin-left:5px;padding:0}.cf-crud-header-desc-without-bg{padding:10px 0;width:auto}.cf-crud-header-desc-with-bg{padding:10px;width:auto}.cf-crud-header-desc-icon{font-size:15px;height:15px!important;margin-top:0;padding:0 5px 0 0;width:15px!important}.cf-crud-body{padding:0}"]
                },] }
    ];
    CrudListComponent.ctorParameters = function () { return [
        { type: bottomSheet.MatBottomSheet },
        { type: ability.Ability }
    ]; };
    CrudListComponent.propDecorators = {
        identifier: [{ type: core.Input }],
        header: [{ type: core.Input }],
        actions: [{ type: core.Input }],
        actionPages: [{ type: core.Input }],
        quickLinks: [{ type: core.Input }],
        searchConfig: [{ type: core.Input }],
        listConfig: [{ type: core.Input }],
        formReset: [{ type: core.Input }],
        originalData: [{ type: core.Input }],
        _configData: [{ type: core.Input }],
        configData: [{ type: core.Input }],
        keyMap: [{ type: core.Input }],
        listReset: [{ type: core.Input }],
        expanded: [{ type: core.Input }],
        expandRowIndex: [{ type: core.Input }],
        onFormChange: [{ type: core.Output }],
        onFieldChange: [{ type: core.Output }],
        onButtonClick: [{ type: core.Output }],
        onButtonIconClick: [{ type: core.Output }],
        onSortClick: [{ type: core.Output }],
        onPageClick: [{ type: core.Output }],
        onTabClick: [{ type: core.Output }],
        sidenav: [{ type: core.ViewChild, args: ['sidenav',] }]
    };
    var BottomSearchSheet = /** @class */ (function () {
        function BottomSearchSheet(_bottomSheetRef, data) {
            this._bottomSheetRef = _bottomSheetRef;
            this.data = data;
            this.onFormChange = new core.EventEmitter();
            this.onFieldChange = new core.EventEmitter();
            this.onButtonClick = new core.EventEmitter();
            console.log(this.data);
        }
        BottomSearchSheet.prototype.openLink = function (event) {
            this._bottomSheetRef.dismiss();
            event.preventDefault();
        };
        BottomSearchSheet.prototype.fieldChange = function (fieldChange) {
            this.onFieldChange.emit(fieldChange);
        };
        BottomSearchSheet.prototype.formChange = function (form) {
            this.onFormChange.emit(form);
        };
        BottomSearchSheet.prototype.buttonClick = function (event) {
            console.log(event);
            this.onButtonClick.emit(event);
        };
        return BottomSearchSheet;
    }());
    BottomSearchSheet.decorators = [
        { type: core.Component, args: [{
                    selector: 'bottom-search-sheet',
                    template: "<span class=\"cf-crud-bottom-search\" *ngIf=\"data\">\n  <cf-form\n    [formConfig]=\"data.searchConfig.form\"\n    [sourceIndex]=\"'0'\"\n    [record]=\"data.searchData\"\n    [reset]=\"data.reset\"\n    (onFieldChange)=\"fieldChange($event)\"\n    (onFormChange)=\"formChange($event)\"\n    (onButtonClick)=\"buttonClick($event)\"\n  ></cf-form>\n</span>",
                    styles: [":root{--mdc-layout-grid-column-width-desktop:72px;--mdc-layout-grid-column-width-phone:72px;--mdc-layout-grid-column-width-tablet:72px;--mdc-layout-grid-gutter-desktop:24px;--mdc-layout-grid-gutter-phone:16px;--mdc-layout-grid-gutter-tablet:16px;--mdc-layout-grid-margin-desktop:24px;--mdc-layout-grid-margin-phone:16px;--mdc-layout-grid-margin-tablet:16px}@media (min-width:840px){.mdc-layout-grid{box-sizing:border-box;margin:0 auto;padding:24px;padding:var(--mdc-layout-grid-margin-desktop,24px)}}@media (min-width:600px) and (max-width:839px){.mdc-layout-grid{box-sizing:border-box;margin:0 auto;padding:16px;padding:var(--mdc-layout-grid-margin-tablet,16px)}}@media (max-width:599px){.mdc-layout-grid{box-sizing:border-box;margin:0 auto;padding:16px;padding:var(--mdc-layout-grid-margin-phone,16px)}}@media (min-width:840px){.mdc-layout-grid__inner{align-items:stretch;display:flex;flex-flow:row wrap;margin:-12px;margin:calc(var(--mdc-layout-grid-gutter-desktop, 24px)/2*-1)}@supports (display:grid){.mdc-layout-grid__inner{-ms-grid-columns:(minmax(0,1fr))[12];display:-ms-grid;display:grid;grid-gap:24px;grid-gap:var(--mdc-layout-grid-gutter-desktop,24px);grid-template-columns:repeat(12,minmax(0,1fr));margin:0}}}@media (min-width:600px) and (max-width:839px){.mdc-layout-grid__inner{align-items:stretch;display:flex;flex-flow:row wrap;margin:-8px;margin:calc(var(--mdc-layout-grid-gutter-tablet, 16px)/2*-1)}@supports (display:grid){.mdc-layout-grid__inner{-ms-grid-columns:(minmax(0,1fr))[8];display:-ms-grid;display:grid;grid-gap:16px;grid-gap:var(--mdc-layout-grid-gutter-tablet,16px);grid-template-columns:repeat(8,minmax(0,1fr));margin:0}}}@media (max-width:599px){.mdc-layout-grid__inner{align-items:stretch;display:flex;flex-flow:row wrap;margin:-8px;margin:calc(var(--mdc-layout-grid-gutter-phone, 16px)/2*-1)}@supports (display:grid){.mdc-layout-grid__inner{-ms-grid-columns:(minmax(0,1fr))[4];display:-ms-grid;display:grid;grid-gap:16px;grid-gap:var(--mdc-layout-grid-gutter-phone,16px);grid-template-columns:repeat(4,minmax(0,1fr));margin:0}}}@media (min-width:840px){.mdc-layout-grid__cell{box-sizing:border-box;margin:12px;margin:calc(var(--mdc-layout-grid-gutter-desktop, 24px)/2);width:calc(33.33333% - 24px);width:calc(33.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell{-ms-grid-column-span:4;grid-column-end:span 4;margin:0;width:auto}}.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-desktop{width:calc(8.33333% - 24px);width:calc(8.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-desktop{-ms-grid-column-span:1;grid-column-end:span 1;width:auto}}.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-desktop{width:calc(16.66667% - 24px);width:calc(16.66667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-desktop{-ms-grid-column-span:2;grid-column-end:span 2;width:auto}}.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-desktop{width:calc(25% - 24px);width:calc(25% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-desktop{-ms-grid-column-span:3;grid-column-end:span 3;width:auto}}.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-desktop{width:calc(33.33333% - 24px);width:calc(33.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-desktop{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-desktop{width:calc(41.66667% - 24px);width:calc(41.66667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-desktop{-ms-grid-column-span:5;grid-column-end:span 5;width:auto}}.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-desktop{width:calc(50% - 24px);width:calc(50% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-desktop{-ms-grid-column-span:6;grid-column-end:span 6;width:auto}}.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-desktop{width:calc(58.33333% - 24px);width:calc(58.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-desktop{-ms-grid-column-span:7;grid-column-end:span 7;width:auto}}.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-desktop{width:calc(66.66667% - 24px);width:calc(66.66667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-desktop{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-desktop{width:calc(75% - 24px);width:calc(75% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-desktop{-ms-grid-column-span:9;grid-column-end:span 9;width:auto}}.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-desktop{width:calc(83.33333% - 24px);width:calc(83.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-desktop{-ms-grid-column-span:10;grid-column-end:span 10;width:auto}}.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-desktop{width:calc(91.66667% - 24px);width:calc(91.66667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-desktop{-ms-grid-column-span:11;grid-column-end:span 11;width:auto}}.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-desktop{width:calc(100% - 24px);width:calc(100% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-desktop{-ms-grid-column-span:12;grid-column-end:span 12;width:auto}}}@media (min-width:600px) and (max-width:839px){.mdc-layout-grid__cell{box-sizing:border-box;margin:8px;margin:calc(var(--mdc-layout-grid-gutter-tablet, 16px)/2);width:calc(50% - 16px);width:calc(50% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell{-ms-grid-column-span:4;grid-column-end:span 4;margin:0;width:auto}}.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-tablet{width:calc(12.5% - 16px);width:calc(12.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-tablet{-ms-grid-column-span:1;grid-column-end:span 1;width:auto}}.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-tablet{width:calc(25% - 16px);width:calc(25% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-tablet{-ms-grid-column-span:2;grid-column-end:span 2;width:auto}}.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-tablet{width:calc(37.5% - 16px);width:calc(37.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-tablet{-ms-grid-column-span:3;grid-column-end:span 3;width:auto}}.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-tablet{width:calc(50% - 16px);width:calc(50% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-tablet{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-tablet{width:calc(62.5% - 16px);width:calc(62.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-tablet{-ms-grid-column-span:5;grid-column-end:span 5;width:auto}}.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-tablet{width:calc(75% - 16px);width:calc(75% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-tablet{-ms-grid-column-span:6;grid-column-end:span 6;width:auto}}.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-tablet{width:calc(87.5% - 16px);width:calc(87.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-tablet{-ms-grid-column-span:7;grid-column-end:span 7;width:auto}}.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}}@media (max-width:599px){.mdc-layout-grid__cell{box-sizing:border-box;margin:8px;margin:calc(var(--mdc-layout-grid-gutter-phone, 16px)/2);width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell{-ms-grid-column-span:4;grid-column-end:span 4;margin:0;width:auto}}.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-phone{width:calc(25% - 16px);width:calc(25% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-phone{-ms-grid-column-span:1;grid-column-end:span 1;width:auto}}.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-phone{width:calc(50% - 16px);width:calc(50% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-phone{-ms-grid-column-span:2;grid-column-end:span 2;width:auto}}.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-phone{width:calc(75% - 16px);width:calc(75% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-phone{-ms-grid-column-span:3;grid-column-end:span 3;width:auto}}.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}}.mdc-layout-grid__cell--order-1{order:1}.mdc-layout-grid__cell--order-2{order:2}.mdc-layout-grid__cell--order-3{order:3}.mdc-layout-grid__cell--order-4{order:4}.mdc-layout-grid__cell--order-5{order:5}.mdc-layout-grid__cell--order-6{order:6}.mdc-layout-grid__cell--order-7{order:7}.mdc-layout-grid__cell--order-8{order:8}.mdc-layout-grid__cell--order-9{order:9}.mdc-layout-grid__cell--order-10{order:10}.mdc-layout-grid__cell--order-11{order:11}.mdc-layout-grid__cell--order-12{order:12}.mdc-layout-grid__cell--align-top{align-self:flex-start}@supports (display:grid){.mdc-layout-grid__cell--align-top{-ms-grid-row-align:start;align-self:start}}.mdc-layout-grid__cell--align-middle{-ms-grid-row-align:center;align-self:center}.mdc-layout-grid__cell--align-bottom{align-self:flex-end}@supports (display:grid){.mdc-layout-grid__cell--align-bottom{-ms-grid-row-align:end;align-self:end}}@media (min-width:840px){.mdc-layout-grid--fixed-column-width{width:1176px;width:calc(var(--mdc-layout-grid-column-width-desktop, 72px)*12 + var(--mdc-layout-grid-gutter-desktop, 24px)*11 + var(--mdc-layout-grid-margin-desktop, 24px)*2)}}@media (min-width:600px) and (max-width:839px){.mdc-layout-grid--fixed-column-width{width:720px;width:calc(var(--mdc-layout-grid-column-width-tablet, 72px)*8 + var(--mdc-layout-grid-gutter-tablet, 16px)*7 + var(--mdc-layout-grid-margin-tablet, 16px)*2)}}@media (max-width:599px){.mdc-layout-grid--fixed-column-width{width:368px;width:calc(var(--mdc-layout-grid-column-width-phone, 72px)*4 + var(--mdc-layout-grid-gutter-phone, 16px)*3 + var(--mdc-layout-grid-margin-phone, 16px)*2)}}.mdc-layout-grid--align-left{margin-left:0;margin-right:auto}.mdc-layout-grid--align-right{margin-left:auto;margin-right:0}.cf-crud-bottom-search>.mat-bottom-sheet-container{padding:0!important}mat-sidenav-content{margin-left:16px}"]
                },] }
    ];
    BottomSearchSheet.ctorParameters = function () { return [
        { type: bottomSheet.MatBottomSheetRef },
        { type: undefined, decorators: [{ type: core.Inject, args: [bottomSheet.MAT_BOTTOM_SHEET_DATA,] }] }
    ]; };
    BottomSearchSheet.propDecorators = {
        onFieldChange: [{ type: core.Output }],
        onButtonClick: [{ type: core.Output }]
    };

    var FileUploaderComponent = /** @class */ (function () {
        function FileUploaderComponent(_http) {
            var _this = this;
            this._http = _http;
            this.field = null;
            this.isFieldDisabled = false;
            this.param = 'file';
            this.fileList = [];
            this.multiple = false;
            this.fileType = "*.*";
            this.fileIcon = "";
            this.hideDownloadButton = false;
            this.hideDeleteFileButton = false;
            this.hideUploadButton = false;
            this.hideFileIconButton = false;
            this.hideDeleteAllButton = false;
            this.hideActionStrip = false;
            this.isUploaded = false;
            this.isUploadingInProgress = false;
            this.isFileImageType = false;
            this.setFileTypeAndIcon = function (type) {
                switch (type) {
                    case "PDF" /* PDF */:
                        _this.fileType = ".pdf";
                        _this.fileIcon = "picture_as_pdf";
                        break;
                    case "WORD" /* WORD */:
                        _this.fileType = ".doc, .docx";
                        _this.fileIcon = "attach_file";
                        break;
                    case "IMAGE" /* IMAGE */:
                        _this.fileType = _this.getImageFileType();
                        _this.fileIcon = "image";
                        _this.isFileImageType = true;
                        break;
                    case "VIDEO" /* VIDEO */:
                        _this.fileType = "video/*";
                        _this.fileIcon = "video_call";
                        break;
                    case "EXCEL" /* EXCEL */:
                        _this.fileType = ".xlsx, .xls, .csv";
                        _this.fileIcon = "attach_file";
                        break;
                    default:
                        _this.fileType = ".*";
                        _this.fileIcon = "attach_file";
                        break;
                }
            };
            this.onUploadClick = function () {
                var fileInput = _this.fileInput.nativeElement;
                fileInput.onchange = function () {
                    _this.fileList = [];
                    _this.isUploadingInProgress = true;
                    console.log(fileInput.files);
                    for (var index = 0; index < fileInput.files.length; index++) {
                        var file = fileInput.files[index];
                        _this.fileList.push({
                            data: file,
                            size: file.size,
                            name: file.name
                        });
                    }
                    _this.field.onUploadClick(_this.fileList).subscribe(function (result) {
                        _this.isUploadingInProgress = false;
                        _this.fileList = result;
                    });
                };
                fileInput.click();
            };
            this.onDeleteAllClick = function () {
                if (_this.isFunctionDefined(_this.field.onDeleteAllClick)) {
                    _this.isUploadingInProgress = true;
                    _this.field.onDeleteAllClick(_this.fileList).subscribe(function (result) {
                        _this.isUploadingInProgress = false;
                        if (result) {
                            _this.fileList = [];
                        }
                    });
                }
            };
            this.onDeleteFileClick = function (delFile) {
                if (_this.isFunctionDefined(_this.field.onDeleteFileClick)) {
                    _this.isUploadingInProgress = true;
                    _this.field.onDeleteFileClick(delFile).subscribe(function (result) {
                        _this.isUploadingInProgress = false;
                        if (result) {
                            _this.fileList = _this.fileList.filter(function (file) { return file !== delFile; });
                        }
                    });
                }
            };
            this.onShowAllItems = function () {
                _this.showLess = _this.fileList.length;
            };
            this.isFunctionDefined = function (func) {
                return typeof func == 'function';
            };
            this.getImageFileType = function () {
                if (_this.field.subFileType) {
                    return _this.field.subFileType.map(function (x) { return 'image/' + x.toLowerCase(); }).join(',');
                }
                else {
                    return "image/*";
                }
            };
        }
        FileUploaderComponent.prototype.ngOnInit = function () {
            var defaultUploadBtnText = this.field.multiple ? "Upload Files" : "Upload File";
            this.multiple = this.field.multiple;
            this.uploadButtonText = this.field.uploadButtonText || defaultUploadBtnText;
            this.setFileTypeAndIcon(this.field.fileType);
            this.fileList = this.field.value || [];
            if (this.field.displayMode == "LABEL" /* LABEL */) {
                this.hideDeleteFileButton = true;
                this.hideUploadButton = true;
                this.hideFileIconButton = true;
            }
            else {
                this.hideDeleteFileButton = this.field.hideDeleteFileButton !== undefined ? this.field.hideDeleteFileButton : false;
                this.hideUploadButton = this.field.hideUploadButton !== undefined ? this.field.hideUploadButton : false;
                this.hideFileIconButton = this.field.hideFileIconButton !== undefined ? this.field.hideFileIconButton : false;
            }
            this.hideDownloadButton = this.field.hideDownloadButton !== undefined ? this.field.hideDownloadButton : false;
            this.showLess = this.field.showLess || this.fileList.length;
            this.setFieldDisabled();
            this.setHideDeleteAllButton();
            this.setHideActionStrip();
        };
        FileUploaderComponent.prototype.setFieldDisabled = function () {
            if (this.isFieldDisabled) {
                this.hideDeleteAllButton = true;
                this.hideDeleteFileButton = true;
                this.hideUploadButton = true;
            }
        };
        FileUploaderComponent.prototype.setHideDeleteAllButton = function () {
            if (this.field.hideDeleteAllButton === undefined) {
                this.hideDeleteAllButton = false;
            }
            if (this.fileList.length <= 1 || this.field.displayMode == "LABEL" /* LABEL */) {
                this.hideDeleteAllButton = true;
            }
        };
        FileUploaderComponent.prototype.setHideActionStrip = function () {
            if (this.hideDeleteAllButton && this.hideUploadButton && this.showLess <= this.fileList.length) {
                this.hideActionStrip = true;
            }
        };
        return FileUploaderComponent;
    }());
    FileUploaderComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'cf-file-uploader',
                    template: "<div class=\"cf-field-nm\">\n  <mat-card>\n    <mat-card-content *ngIf=\"fileList.length > 0\"  class=\"card-content\" \n      [ngClass]=\"{'cf-disable': disabled}\" >\n      <ul class=\"file-list\">\n        <ng-container *ngFor=\"let file of fileList; let index=index\">\n          <li class=\"file-item\" *ngIf=\"index < showLess\">\n            <span>\n                <img *ngIf=\"isFileImageType\" matListAvatar [src]=\"file.url\" alt=\"\" class=\"image\" />\n                <span>{{file.name}}</span>\n            </span>\n            <span>\n              <a mat-icon-button [href]=\"file.url\" download target=\"_blank\" [disabled]=\"disabled\" *ngIf=\"!hideDownloadButton\">\n                <mat-icon class=\"mat-24\">file_download</mat-icon>\n              </a>\n              <button mat-icon-button (click)=\"onDeleteFileClick(file)\" *ngIf=\"!hideDeleteFileButton\"\n                [disabled]=\"disabled || isUploadingInProgress\">\n                <mat-icon class=\"mat-24\" [color]=\"isUploadingInProgress? '' : 'warn'\">delete</mat-icon>\n              </button>\n            </span>\n          </li>\n        </ng-container>\n      </ul>\n    </mat-card-content>\n    <mat-card-actions \n      class=\"file-actions\"\n      [ngClass]=\"{'empty-list':fileList.length == 0}\"\n      *ngIf=\"!hideActionStrip\">\n      <div>\n        <div class=\"mat-mini-fab file-icon\" \n        [ngClass]=\"{'cf-disable': disabled}\"\n        *ngIf=\"!hideFileIconButton\">\n          <mat-icon>{{fileIcon}}</mat-icon>\n        </div>\n        <button mat-stroked-button color=\"primary\" (click)=\"onUploadClick()\"\n          [disabled]=\"disabled || isUploadingInProgress\"\n          *ngIf=\"!hideUploadButton\">\n          <mat-icon>file_upload</mat-icon>\n          {{uploadButtonText}}\n        </button>\n        <button  mat-button (click)=\"onShowAllItems()\"\n          [ngClass]=\"{'cf-disable': disabled}\"\n          [disabled]=\"disabled || isUploadingInProgress\"\n          *ngIf=\"showLess<fileList.length\">\n            Show All\n        </button>\n\n        <mat-spinner *ngIf=\"isUploadingInProgress\" [diameter]=\"18\" class=\"spinner\">\n        </mat-spinner>\n      </div>\n\n      <button mat-icon-button (click)=\"onDeleteAllClick()\"\n        [disabled]=\"disabled || isUploadingInProgress\"\n        [ngClass]=\"{'cf-disable': disabled}\"\n        *ngIf=\"!hideDeleteAllButton && fileList.length > 1\">\n        <mat-icon [color]=\"isUploadingInProgress? '' : 'warn'\">delete</mat-icon>\n      </button>\n    </mat-card-actions>\n  </mat-card>\n  <input type=\"file\" #fileInput\n    id=\"fileUpload\"\n    name=\"fileUpload\"\n    [multiple]=\"multiple\"\n    [accept]=\"fileType\"\n    style=\"display:none;\"\n  />\n</div>",
                    encapsulation: core.ViewEncapsulation.None,
                    styles: ["li,ul{list-style:none;margin:0;padding:0}#file-label{display:inline-flex;font-size:12px;line-height:18px;vertical-align:middle}#file-label mat-icon{font-size:18px;text-align:center}#file-label a{cursor:pointer}.file-icon{box-shadow:none}.file-icon .material-icons,.file-list .image{vertical-align:middle}.file-list .image{border:1px solid #4d4d4d;height:30px!important;margin-right:9px;width:30px!important}.file-list .file-item{align-items:center;border-bottom:1px solid #efeded;box-sizing:border-box;display:flex;flex-direction:row;height:40px;justify-content:space-between;padding:0;position:relative;width:100%}.file-list .file-item>span{padding-left:10px}.file-list .file-item:last-child{border-bottom:none;margin-bottom:5px}.file-list .mat-button-base:hover:not([disabled]){background:#efeded}.card-content{margin-bottom:0}.file-actions{border-top:1px solid #efeded;display:flex;justify-content:space-between;margin:0 -16px -8px;padding-top:11px}.file-actions .mat-mini-fab{box-shadow:none!important}.file-actions .spinner{float:right;margin-top:10px}.file-actions .mat-button-base,.file-actions>button,.file-actions>div{margin:0 16px}.file-actions .mat-button-base:hover:not([disabled]){background:#efeded}.file-actions.empty-list{border-top:none;justify-content:space-around;padding:0}.mat-card{margin-bottom:.25em}"]
                },] }
    ];
    FileUploaderComponent.ctorParameters = function () { return [
        { type: http.HttpClient }
    ]; };
    FileUploaderComponent.propDecorators = {
        field: [{ type: core.Input }],
        isFieldDisabled: [{ type: core.Input }],
        fileInput: [{ type: core.ViewChild, args: ["fileInput", { static: false },] }],
        disabled: [{ type: core.Input }]
    };

    var quillConfiguration = {
        formula: true,
        toolbar: [
            //      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote'],
            //      ['blockquote', 'code-block'],
            //      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'align': [] }, { 'indent': '-1' }],
            [{ 'indent': '+1' }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }, 'formula'],
            //      ['formula'],
            //      [{ 'direction': 'rtl' }],                         // text direction
            ['link', 'image', 'video'] // link and image, video
        ]
    };

    var FieldErrorStateMatcher = /** @class */ (function () {
        function FieldErrorStateMatcher() {
        }
        FieldErrorStateMatcher.prototype.isErrorState = function (control, form) {
            //    console.log("111");
            return !!(control && control.invalid && (control.dirty || control.touched));
        };
        return FieldErrorStateMatcher;
    }());
    var FieldComponent = /** @class */ (function () {
        function FieldComponent(router, ability) {
            var _this = this;
            this.router = router;
            this.ability = ability;
            this.onDependentFieldChange = new core.EventEmitter();
            this.onFieldChange = new core.EventEmitter();
            this.onFormChange = new core.EventEmitter();
            this.onButtonClick = new core.EventEmitter();
            this.ellipsisRequired = false;
            this.editorOptions = quillConfiguration;
            this.onListSelectionFuc = null;
            this.listOptions = null;
            this.dateRange = false;
            this.minLengthForTrigger = 3;
            this.highlightAutoCompleteText = '';
            this.onShowAllOptions = function () {
                _this.showLess = _this.field.options.length;
            };
            this.autoCompleteInputHasValue = false;
            this.onListImageLoadError = function ($event) {
                $event.target.src = _this.field.defaultImageUrl;
            };
            AbilityUtils.setAbility(this.ability);
        }
        Object.defineProperty(FieldComponent.prototype, "displayMode", {
            get: function () {
                return this._displayMode;
            },
            set: function (_displayMode) {
                this._displayMode = _displayMode;
                this.isFieldDisabled = this.fieldDisabled();
            },
            enumerable: false,
            configurable: true
        });
        FieldComponent.prototype.isEditorErrorState = function () {
            return !!(this.fieldControl && this.fieldControl.invalid && (this.fieldControl.dirty || this.fieldControl.touched));
        };
        FieldComponent.prototype.ngOnInit = function () {
            if (this.field.placeholder == undefined) {
                this.field.placeholder = "";
            }
            if (this.field.ellipsis && this.field.ellipsis > 0) {
                this.charLimit = this.field.ellipsis;
            }
            this.matcher = new FieldErrorStateMatcher();
            this.getValue(this.field, this.value);
            this.isRequired = this.required();
            this.isFieldDisabled = this.fieldDisabled();
            this.hasFieldNavigate = this.fieldNavigate();
            this.hasHintIcon = this.displayHintIcon();
            this.setMaxLength();
            this.setNumberMinMax();
            this.setAppearance();
            this.setOptionInDisplay();
            this.getImagePath(this.field);
            this.setRows();
            this.setHeight();
            this.setClear();
            this.setAsBubble();
            this.setTextAlign();
            this.setAddMoreDisplayInColumn();
            this.setMinLengthForTrigger();
            //    this.autocompleteInit();
            this.setDisplayTemplate();
            this.setCalendar();
            this.setShowLess();
            this.textClearButton = this.setTextClearButton('fieldTextClearBtn', "Clear Text", "cancel", null);
            if (this.field.navigate) {
                this.routeToButton = this.setTextClearButton('fieldRouteToBtn', this.field.navigate.text, this.field.navigate.icon ? this.field.navigate.icon : "call_made", this.field.navigate.routeTo);
            }
            this.helpModalButton = this.setHelpButton('helpCloseButton', 'Close', 'close');
            this.plusButton = this.addRemoveButton("add_field" /* ADD_FIELD */, "Add", "add");
            this.minusButton = this.addRemoveButton("remove_field" /* REMOVE_FIELD */, "Minus", "remove");
        };
        FieldComponent.prototype.setDisplayTemplate = function () {
            if ((this.field.type == "RADIO" /* RADIO */ || this.field.type == "CHECKBOX" /* CHECKBOX */) && StringUtils.isEmpty(this.field.displayTemplate)) {
                this.field.displayTemplate = "CLASSIC" /* CLASSIC */;
            }
        };
        FieldComponent.prototype.setAddMoreDisplayInColumn = function () {
            if (this.isAddMore) {
                if (this.device == 'desktop') {
                    if (this.displayInColumns < 6) {
                        this.addMoreFieldDisplayInColumns = 10;
                        this.addMoreButtonDisplayInColumns = 2;
                    }
                    else {
                        this.addMoreFieldDisplayInColumns = 11;
                        this.addMoreButtonDisplayInColumns = 1;
                    }
                }
                if (this.device == 'tablet') {
                    if (this.displayInColumns < 6) {
                        this.addMoreFieldDisplayInColumns = 6;
                        this.addMoreButtonDisplayInColumns = 2;
                    }
                    else {
                        this.addMoreFieldDisplayInColumns = 7;
                        this.addMoreButtonDisplayInColumns = 1;
                    }
                }
                if (this.device == 'mobile') {
                    if (this.displayInColumns < 3) {
                        this.addMoreFieldDisplayInColumns = 3;
                        this.addMoreButtonDisplayInColumns = 2;
                    }
                    else {
                        this.addMoreFieldDisplayInColumns = 3;
                        this.addMoreButtonDisplayInColumns = 1;
                    }
                }
            }
        };
        FieldComponent.prototype.setMinLengthForTrigger = function () {
            this.minLengthForTrigger = this.field.minLengthForTrigger ? this.field.minLengthForTrigger : 3;
        };
        FieldComponent.prototype.setRows = function () {
            this.rows = this.field.rows ? this.field.rows : 1;
        };
        FieldComponent.prototype.setHeight = function () {
            this.height = this.field.height ? this.field.height : 300;
        };
        FieldComponent.prototype.setAppearance = function () {
            this.appearance = this.field.appearance ? this.field.appearance : 'standard';
        };
        FieldComponent.prototype.setAsBubble = function () {
            this.asBubble = this.field.asBubble ? this.field.asBubble : false;
            this.bubbleColor = this.field.bubbleColor ? this.field.bubbleColor : "" /* DEFAULT */;
        };
        FieldComponent.prototype.setTextAlign = function () {
            this.textAlign = this.field.textAlign ? this.field.textAlign : "left" /* LEFT */;
        };
        FieldComponent.prototype.setMaxLength = function () {
            this.maxLength = this.field.maxLength ? this.field.maxLength : 1000000;
        };
        FieldComponent.prototype.setNumberMinMax = function () {
            this.min = this.field.min ? this.field.min : null;
            this.max = this.field.max ? this.field.max : null;
        };
        FieldComponent.prototype.displayHintIcon = function () {
            return this.field.help && this.field.help.icon ? true : false;
        };
        FieldComponent.prototype.close = function () {
            this.sidenav.close();
        };
        FieldComponent.prototype.open = function () {
            this.sidenav.open();
        };
        FieldComponent.prototype.setHelpButton = function (identifier, label, icon) {
            return {
                identifier: identifier,
                label: label,
                color: "primary" /* PRIMARY */,
                size: "small" /* SMALL */,
                icon: icon,
                type: "GHOST" /* GHOST */,
                onlyIcon: true,
            };
        };
        FieldComponent.prototype.required = function () {
            var e_1, _a;
            var isRequired = false;
            if (this.field.validations && this.field.validations.length > 0) {
                try {
                    for (var _b = __values(this.field.validations), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var validation = _c.value;
                        if (validation.message.key == "required") {
                            isRequired = true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            if (StringUtils.isEmpty(this.field.label)) {
                isRequired = false;
            }
            return isRequired;
        };
        FieldComponent.prototype.fieldNavigate = function () {
            var hasFieldNavigate = false;
            if (this.field.navigate &&
                (!StringUtils.isEmpty(this.field.navigate.icon) || !StringUtils.isEmpty(this.field.navigate.text)) &&
                !CollectionUtils.isEmpty(this.field.navigate.routeTo)) {
                hasFieldNavigate = true;
            }
            return hasFieldNavigate;
        };
        FieldComponent.prototype.fieldDisabled = function () {
            var isDisabled = false;
            isDisabled = FieldUtils.isFieldDisabled(this.field, this._displayMode, this.resolvedValue);
            if (isDisabled) {
                FormUtils.disableFieldControl(this.fieldControl);
            }
            return isDisabled;
        };
        FieldComponent.prototype.getValue = function (field, txt) {
            var _this = this;
            var value = "";
            var initialLength = 0;
            var finalLength = 0;
            if (this.fieldControl != undefined) {
                value = this.fieldControl.value;
            }
            else {
                value = txt;
            }
            if (field.type != "DROPDOWN" /* DROPDOWN */) {
                if (this.keyMap && this.keyMap.length > 0) {
                    this.keyMap
                        .filter(function (objs) {
                        var hasAssociation = false;
                        if (!CollectionUtils.isEmpty(objs) && !CollectionUtils.isEmpty(objs.associations)) {
                            objs.associations.forEach(function (element) {
                                if (element.fieldKey == field.key && element.componentIdentifier == _this.sourceIdentifier) {
                                    hasAssociation = true;
                                }
                            });
                        }
                        return hasAssociation;
                    })
                        .forEach(function (field) {
                        if (field['options'] && field['options'].length > 0) {
                            for (var index = 0; index < field['options'].length; index++) {
                                if (field['options'][index].key == value) {
                                    value = field['options'][index].value;
                                    break;
                                }
                            }
                        }
                    });
                }
            }
            this.resolvedValue = value;
            if (FieldUtils.isEllipsisField(this.field) && FieldUtils.displayEllipsis(this.charLimit, this.resolvedValue)) {
                value = JSON.stringify(value);
                initialLength = value.length;
                value = value.substr(0, this.field.ellipsis);
                finalLength = value.length;
                value += "...";
                if (initialLength > finalLength) {
                    this.ellipsisRequired = true;
                }
            }
            return value;
        };
        FieldComponent.prototype.displayFullText = function () {
            var resolvedValueStr = JSON.stringify(this.resolvedValue);
            if (!StringUtils.isEmpty(resolvedValueStr)) {
                this.charLimit = resolvedValueStr.length;
            }
        };
        FieldComponent.prototype.displayShortText = function () {
            if (this.field.ellipsis && this.field.ellipsis > 0) {
                this.charLimit = this.field.ellipsis;
                this.displayEllipsis();
            }
        };
        FieldComponent.prototype.displayEllipsis = function () {
            return FieldUtils.displayEllipsis(this.charLimit, this.resolvedValue);
        };
        FieldComponent.prototype.setCalendar = function () {
            if (this.field.type === "CALENDAR" /* CALENDAR */) {
                this.dateRange = this.field.dateRange;
            }
        };
        ///////////////////////////// AUTOCOMPLETE - START ///////////////////////////
        FieldComponent.prototype.invokeOnChangeOnField = function (value, input) {
            var invokeOnChange = false;
            if (this.field.type == "AUTOCOMPLETE" /* AUTOCOMPLETE */) {
                this.autoCompleteInputHasValue = !!value;
                if (value.length >= this.minLengthForTrigger) {
                    this.autoCompleteInputHasValue = !!value;
                    this.highlightAutoCompleteText = value;
                }
                else {
                    this.autoCompleteInputHasValue = false;
                    this.highlightAutoCompleteText = '';
                }
                invokeOnChange = true;
            }
            else {
                invokeOnChange = true;
            }
            return invokeOnChange;
        };
        FieldComponent.prototype.autocompleteDisplayFn = function (option) {
            var value;
            if (option != null && option.key != null) {
                value = option.value;
            }
            else {
                value = option;
            }
            return value;
        };
        FieldComponent.prototype._filter = function (value) {
            var filterValue = value.toLowerCase();
            var result = this.field.options.filter(function (option) { return option.value.toLowerCase().includes(filterValue); });
            this.autoCompleteResultCount = result.length;
            return result;
        };
        ///////////////////////////// AUTOCOMPLETE - END ///////////////////////////
        ///////////////////////////// DROPDOWN OPTION - START ///////////////////////////
        FieldComponent.prototype.setOptionInDisplay = function () {
            if (this.field['options'] && this.fieldControl) {
                var key = this.fieldControl.value;
                for (var cnt = 0; cnt < this.field['options'].length; cnt++) {
                    if (this.field['options'][cnt].key === key) {
                        this.field['options'][cnt].checked = true;
                    }
                }
            }
        };
        FieldComponent.prototype.setClear = function () {
            var hasClear = false;
            if (this.resolvedValue && this.field.hasClear && (this.field.type == "TEXT" /* TEXT */ ||
                this.field.type == "TEXTAREA" /* TEXTAREA */ ||
                this.field.type == "EMAIL" /* EMAIL */ ||
                this.field.type == "PASSWORD" /* PASSWORD */ ||
                this.field.type == "COLOR" /* COLOR */ ||
                this.field.type == "MONTH" /* MONTH */ ||
                this.field.type == "WEEK" /* WEEK */ ||
                this.field.type == "NUMBER" /* NUMBER */ ||
                this.field.type == "DROPDOWN" /* DROPDOWN */ ||
                this.field.type == "AUTOCOMPLETE" /* AUTOCOMPLETE */ ||
                this.field.type == "CHIPS" /* CHIPS */ ||
                this.field.type == "TIME" /* TIME */ ||
                this.field.type == "CALENDAR" /* CALENDAR */)) {
                hasClear = true;
            }
            this.hasClear = hasClear;
        };
        FieldComponent.prototype.cleanValue = function () {
            this.resolvedValue = "";
            this.fieldControl.setValue("");
            this.setClear();
        };
        FieldComponent.prototype.getResolveTextWithKey = function (field) {
            var value = "";
            if (this.row != undefined) {
                if (this.row[field['resolveOptionWithKey']]) {
                    value = this.row[field['resolveOptionWithKey']];
                }
            }
            return value;
        };
        FieldComponent.prototype.getDropdownValue = function (field, txt) {
            var value = "";
            if (this.fieldControl != undefined) {
                if (this.fieldControl.value) {
                    value = this.fieldControl.value;
                }
            }
            else {
                value = txt;
            }
            if (field['options'] && field['options'].length > 0) {
                for (var index = 0; index < field['options'].length; index++) {
                    var isSelected = false;
                    if (value instanceof Array) {
                        if (value.indexOf(field['options'][index].key) > -1) {
                            isSelected = true;
                        }
                    }
                    else if (value instanceof String) {
                        if (field['options'][index].key == value) {
                            isSelected = true;
                        }
                    }
                    else if (value instanceof Object) {
                        if (value[field['options'][index].key]) {
                            isSelected = true;
                        }
                    }
                    if (isSelected) {
                        value = field['options'][index].value;
                        break;
                    }
                }
            }
            return value;
        };
        ///////////////////////////// DROPDOWN OPTION - END ///////////////////////////
        ///////////////////////////// UPLOAD - START ///////////////////////////
        // imgURL: any;
        // onUpload(event) {
        //   let file: File = {
        //     'source': this.sourceIdentifier,
        //     'index': this.index,
        //     'field': this.field.key,
        //     'files': event.target.files
        //   };
        //   this.field['onUpload'](file);
        //   var reader = new FileReader();
        //   reader.readAsDataURL(file.files[0]);
        //   reader.onload = (_event) => {
        //     this.imgURL = reader.result;
        //   }
        // }
        ///////////////////////////// UPLOAD - END ///////////////////////////
        ///////////////////////////// IMAGE - START ///////////////////////////
        FieldComponent.prototype.getImagePath = function (field) {
            //    console.log(path);
            if (!StringUtils.isEmpty(this.resolvedValue) && this.resolvedValue instanceof String && this.resolvedValue.indexOf("http://") <= -1) {
                // if (this.resolvedValue.startsWith("/")) {
                //   this.resolvedValue = Properties.contentUrl + this.resolvedValue;
                // } else {
                //   this.resolvedValue = Properties.contentUrl + "/" + this.resolvedValue;
                // }
            }
            this.imagePath = this.resolvedValue;
        };
        ///////////////////////////// IMAGE - END ///////////////////////////
        ///////////////////////////// SLIDER - START ///////////////////////////
        //   getSliderTickInterval(): number | 'auto' {
        // //    if ((<SliderField>this.field)..showTicks) {
        //       return (<SliderField>this.field).autoTicks ? 'auto' : this.tickInterval;
        // //    }
        //     return 0;
        //   }
        ///////////////////////////// SLIDER - END ///////////////////////////
        ///////////////////////////// EVENTS - START ///////////////////////////
        FieldComponent.prototype.onAutocompleteChange = function (autocomplate) {
            var value = autocomplate.option.value;
            // console.log(value);
            this.onChangeEvent(this.field.key, value, autocomplate);
        };
        FieldComponent.prototype.onToggleChange = function (toggle) {
            console.log(toggle);
            var value = toggle.checked;
            //    console.log(value);
            this.onChangeEvent(this.field.key, value, toggle);
        };
        FieldComponent.prototype.onSliderChange = function (slider) {
            //    console.log(slider);
            var value = slider.value;
            //    console.log(value);
            this.onChangeEvent(this.field.key, value, slider);
        };
        FieldComponent.prototype.onRadioChange = function (radio) {
            //    console.log(radio);
            var value = radio.value;
            //    console.log(value);
            this.onChangeEvent(this.field.key, value, radio);
        };
        FieldComponent.prototype.onCheckboxChange = function (option, checkbox) {
            var key = option.key;
            var value = checkbox.checked;
            // console.log(key + ": " + value);
            this.onChangeEvent(key, value, checkbox);
        };
        FieldComponent.prototype.setShowLess = function () {
            if (this.field.type === "RADIO" /* RADIO */ || this.field.type === "CHECKBOX" /* CHECKBOX */) {
                this.showLess = this.field.showLess || this.field.options.length;
            }
        };
        FieldComponent.prototype.onOptionChange = function (options) {
            var value = this.listView.selectedOptions.selected.map(function (x) { return x.value; });
            if (this.field.type == 'CHECKBOX') {
                var selectedOptions = options.source._value;
                var currentOptions = this.fieldControl.value;
                for (var key in currentOptions) {
                    if (selectedOptions.indexOf(key) > -1) {
                        currentOptions[key] = true;
                    }
                    else {
                        currentOptions[key] = false;
                    }
                }
                this.fieldControl.setValue(currentOptions);
            }
            else if (this.field.type == 'RADIO') {
                var selectedOptions = options.source._value;
                if (CollectionUtils.isEmpty(selectedOptions)) {
                    this.fieldControl.setValue(null);
                    value = null;
                }
                else {
                    this.fieldControl.setValue(selectedOptions[0]);
                    value = value[0];
                }
            }
            this.onChangeEvent(this.field.key, value, options);
        };
        FieldComponent.prototype.onHtmlEditorChange = function ($event) {
            // console.log($event);
            //    console.log(value);
            this.onChangeEvent(this.field.key, $event.html, $event);
        };
        FieldComponent.prototype.onChipsListChange = function ($event) {
            this.onChangeEvent(this.field.key, $event.values, $event);
        };
        FieldComponent.prototype.onInputChange = function (input) {
            console.log(input);
            var value = input.target.value;
            //    console.log(value);
            if (this.invokeOnChangeOnField(value, input)) {
                this.onChangeEvent(this.field.key, value, input);
            }
        };
        FieldComponent.prototype.onDateChange = function (date, type) {
            var key = this.field.key;
            if (!StringUtils.isEmpty(type)) {
                key = this.field.key + "." + type;
            }
            //    console.log(date.value);
            var value = date.value;
            //    console.log(value);
            this.onChangeEvent(key, value, date);
        };
        FieldComponent.prototype.onChange = function (dropdown) {
            //    console.log(dropdown.value);
            var value = dropdown.value;
            this.onChangeEvent(this.field.key, value, dropdown);
        };
        FieldComponent.prototype.onFileChange = function (event) {
            var _this = this;
            // console.log(event);
            this.onChangeEvent(this.field.key, event, event);
            var reader = new FileReader();
            reader.readAsDataURL(event[0]);
            reader.onload = function (_event) {
                _this.imgURL = reader.result;
            };
        };
        FieldComponent.prototype.onParagraphChange = function (event) {
            //    console.log(event); 
            this.onChangeEvent(this.field.key, event, event);
        };
        FieldComponent.prototype.buttonClick = function (event) {
            this.onButtonClick.emit(event);
        };
        FieldComponent.prototype.onChangeEvent = function (key, value, event) {
            var _this = this;
            this.resolvedValue = value;
            this.setClear();
            setTimeout(function () {
                //      if ((this.dependencies && this.dependencies[this.field.key]) || this.field.type == FieldType.CHECKBOX || this.field.type == FieldType.DROPDOWN) {
                if ((_this.dependencies && _this.dependencies[_this.field.key])) {
                    var action = {
                        sourceIdentifier: _this.sourceIdentifier,
                        sourceIndex: _this.sourceIndex,
                        widgetArrayIndex: _this.widgetArrayIndex,
                        fieldIndex: _this.fieldIndex,
                        action: _this.field.key,
                        data: _this.form.getRawValue(),
                        parentHierarchy: null,
                        event: event
                    };
                    _this.onDependentFieldChange.emit(action);
                }
            }, 200);
            var fieldChange = {
                sourceIdentifier: this.sourceIdentifier,
                sourceIndex: this.sourceIndex,
                widgetArrayIndex: this.widgetArrayIndex,
                fieldIndex: this.fieldIndex,
                fieldKey: key,
                value: value,
                event: event
            };
            this.onFieldChange.emit(fieldChange);
        };
        // onChangeSearch(val: string) {
        //   console.log("onChangeSearch");
        //   let autocomplete: Autocomplete = {
        //     'source': this.sourceIdentifier,
        //     'index': this.index,
        //     'field': this.field.key,
        //     'searchText': val
        //   };
        //   this.autocompleteService.invoke(autocomplete);
        // }
        ///////////////////////////// EVENTS - END ///////////////////////////
        ///////////////////////////// ERROR - START ///////////////////////////
        FieldComponent.prototype.errors = function () {
            var _this = this;
            var errors = [];
            if (this.fieldControl != undefined) {
                if (this.fieldControl && this.fieldControl.errors) {
                    Object.keys(this.fieldControl.errors).forEach(function (keyError) {
                        var e_2, _a;
                        if (_this.field.validations) {
                            try {
                                for (var _b = __values(_this.field.validations), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    var validation = _c.value;
                                    if (keyError === validation.message.key) {
                                        errors[errors.length] = { error: keyError, message: validation.message.message };
                                    }
                                    else {
                                        //errors[errors.length] = {error: keyError, message: this.fieldControl.errors[keyError]};
                                    }
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                        }
                    });
                }
                else if (this.fieldControl instanceof forms.FormGroup) {
                    if (this.fieldControl.controls && this.fieldControl.controls['startDate'] && this.fieldControl.controls['startDate'].errors) {
                        Object.keys(this.fieldControl.controls['startDate'].errors).forEach(function (keyError) {
                            var e_3, _a;
                            if (_this.field.validations) {
                                try {
                                    for (var _b = __values(_this.field.validations), _c = _b.next(); !_c.done; _c = _b.next()) {
                                        var validation = _c.value;
                                        if (keyError === validation.message.key) {
                                            errors[errors.length] = { error: keyError, message: validation.message.message };
                                        }
                                    }
                                }
                                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                finally {
                                    try {
                                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                    }
                                    finally { if (e_3) throw e_3.error; }
                                }
                            }
                        });
                    }
                }
            }
            return errors;
        };
        ///////////////////////////// ERROR - END ///////////////////////////
        FieldComponent.prototype.setTextClearButton = function (identifier, label, icon, routeTo) {
            return {
                identifier: identifier,
                label: label,
                color: "primary" /* PRIMARY */,
                size: "small" /* SMALL */,
                icon: icon,
                type: "GHOST" /* GHOST */,
                onlyIcon: true,
                routerLink: routeTo
            };
        };
        FieldComponent.prototype.addField = function (field) {
            var validations = FormUtils.getFieldValidation(field);
            this.form.controls[field.key].push(FormUtils.setFormControl(this.displayMode, field, null, validations));
            this.onFormChange.emit(this.form);
        };
        FieldComponent.prototype.removeField = function (field, index) {
            this.form.controls[field.key].controls.splice(index, 1);
            this.onFormChange.emit(this.form);
        };
        FieldComponent.prototype.addRemoveButton = function (identifier, label, icon) {
            return {
                identifier: identifier,
                label: label,
                color: "primary" /* PRIMARY */,
                size: "small" /* SMALL */,
                icon: icon,
                type: "FLAT" /* FLAT */,
                onlyIcon: true
            };
        };
        FieldComponent.prototype.onFileComplete = function (data) {
            // console.log(data); // We just print out data bubbled up from event emitter.
        };
        return FieldComponent;
    }());
    FieldComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'cf-field',
                    template: "<!-- {{field.fieldDisplayType}} -->\n<div \n  class=\"mdc-layout-grid cf-field-horizontal-container\" \n  *ngIf=\"(!(hideLabel == true) && field.fieldDisplayType == 'HORIZONTAL') && (field && (field.permission == null || (field.permission && (field.permission['subject'] | can: field.permission['action']))))\"\n> \n  <div class=\"mdc-layout-grid__inner\">\n    <div class=\"mdc-layout-grid__cell--span-3\">\n      <span \n        *ngIf=\"!isAddMore || (isAddMore && (fieldIndex == 0  || fieldIndex == null))\"\n        class=\"cf-field-lbl cf-field-lbl-{{field.key}}\" \n        [ngClass]=\"{'cf-field-lbl-horizontal': (field.type != 'CHECKBOX' && field.type != 'RADIO' && field.type != 'SLIDER' && field.type != 'TOGGLE_OPTION' && field.type != 'UPLOAD' && field.type != 'IMAGE' && field.type != 'BOOLEAN' && field.type != 'JSON'), 'cf-field-lbl-horizontal-premitive': !(field.type != 'CHECKBOX' && field.type != 'RADIO' && field.type != 'SLIDER' && field.type != 'TOGGLE_OPTION' && field.type != 'UPLOAD' && field.type != 'IMAGE' && field.type != 'BOOLEAN' && field.type != 'JSON')}\">\n        <strong>{{field.label}}</strong>\n        <span class=\"cf-field-lbl-req\" *ngIf=\"isRequired\">*</span>\n        <!-- <span   \n          *ngIf=\"field.help && field.help.message && hasFieldNavigate && field.help.displayType == 'TOOLTIP'\" \n          matTooltip=\"{{field.help.message}}\"\n          matTooltipPosition=\"above\"\n          class=\"cf-field-hint cf-field-hint-{{field.key}}\">  \n          <mat-icon   \n            aria-hidden=\"true\" \n            [attr.aria-label]=\"field.help.message\" \n            class=\"cf-field-hint-icon cf-field-hint-icon-{{field.key}}\" \n          >{{field.help.icon ? field.help.icon : 'live_help'}}</mat-icon>\n        </span>   -->\n        <span *ngIf=\"field.help && field.help.message && field.help.displayType == 'RIGHT_MODAL'\">\n          <ng-container \n            *ngTemplateOutlet=\"cfhelpmodal\" \n          ></ng-container>\n        </span>  \n        <span *ngIf=\"field.help && field.help.message && field.help.displayType == 'PLAIN_TEXT' && field.help.withLabel\">\n          {{field.help.message}}\n        </span>\n      </span>\n    </div> \n    <div class=\"mdc-layout-grid__cell--span-9 mdc-layout-grid--align-right\" [style.width.%]=\"100\">\n      <ng-container *ngTemplateOutlet=\"cffield\"></ng-container>\n    </div>\n  </div>\n</div>\n<span \n  *ngIf=\"(field.fieldDisplayType != 'HORIZONTAL') && (field && (field.permission == null || (field.permission && (field.permission['subject'] | can: field.permission['action']))))\"\n>\n  <ng-container *ngTemplateOutlet=\"cffield\"></ng-container>\n</span>\n\n<ng-template #cffield>\n  <!-- {{field.type}} -->\n  <span *ngIf=\"(!form && !fieldControl) || field.displayMode == 'LABEL'\" [ngSwitch]=\"field.type\" class=\"cf-field cf-field-key-{{field.key}}\" [ngClass]=\"{'cf-field-lbl-horizontal': (field.type == 'LABEL' || field.type == 'BOOLEAN') && field.fieldDisplayType == 'HORIZONTAL', 'cf-field-lbl': (field.type == 'LABEL' || field.type == 'BOOLEAN') && sourceType == 'FORM'}\">\n    <mat-label class=\"cf-field-lbl cf-field-lbl-{{field.key}} cf-field-lbl-inline\" \n      *ngIf=\"field.fieldDisplayType != 'HORIZONTAL' && field.type != 'PARAGRAPH' && field.type != 'TOGGLE_OPTION' && !hideLabel\">\n      <strong>{{field.label}}</strong>\n      <span class=\"cf-field-lbl-req\" *ngIf=\"isRequired\">*</span>\n      <cf-tooltip matSuffix [field]=\"field\"></cf-tooltip>\n      <!-- <span  \n        *ngIf=\"field.help && field.help.message && hasFieldNavigate && field.help.displayType == 'TOOLTIP'\" \n        matTooltip=\"{{field.help.message}}\"\n        matTooltipPosition=\"above\"\n        class=\"cf-field-hint cf-field-hint-{{field.key}}\">  \n        <mat-icon  \n          aria-hidden=\"true\" \n          [attr.aria-label]=\"field.help.message\" \n          class=\"cf-field-hint-icon cf-field-hint-icon-{{field.key}}\" \n        >{{field.help.icon ? field.help.icon : 'live_help'}}</mat-icon>\n      </span>   -->\n      <span *ngIf=\"field.help && field.help.message && field.help.displayType == 'RIGHT_MODAL'\">\n        <ng-container \n          *ngTemplateOutlet=\"cfhelpmodal\" \n        ></ng-container>\n      </span>  \n      <span *ngIf=\"field.help && field.help.message && field.help.displayType == 'PLAIN_TEXT' && field.help.withLabel\">\n        {{field.help.message}}\n      </span>\n    </mat-label>\n\n    <span *ngSwitchCase=\"'IMAGE'\"\n      [ngClass]=\"{'cf-field-value-wrapper-horizontal': field.fieldDisplayType != 'HORIZONTAL', 'cf-field-value-wrapper-vertical': field.fieldDisplayType == 'HORIZONTAL'}\">\n      <img \n        class=\"cf-field-image cf-field-image-{{field.key}}\" \n        [src]=\"imagePath\"\n        [style.width.px]=\"field['width'] ? field['width'] : 'auto'\">\n    </span>\n    <span *ngSwitchCase=\"'BOOLEAN'\" \n      [ngClass]=\"{'cf-field-value-wrapper-horizontal': field.fieldDisplayType != 'HORIZONTAL', 'cf-field-value-wrapper-vertical': field.fieldDisplayType == 'HORIZONTAL'}\"\n      class=\"mat-input-element cf-field-boolean cf-field-boolean-{{field.key}}\">\n      <mat-icon class=\"cf-field-boolean-success\" *ngIf=\"resolvedValue == true\" aria-hidden=\"true\">done</mat-icon>\n      <mat-icon class=\"cf-field-boolean-failure\" *ngIf=\"resolvedValue == false\" aria-hidden=\"true\">close</mat-icon>\n    </span>\n    <span *ngSwitchCase=\"'DROPDOWN'\"\n      [ngClass]=\"{'cf-field-value-wrapper-horizontal': field.fieldDisplayType != 'HORIZONTAL', 'cf-field-value-wrapper-vertical': field.fieldDisplayType == 'HORIZONTAL'}\"> \n      <span *ngIf=\"value == true || value == false\" class=\"mat-input-element  cf-field-boolean cf-field-boolean-{{field.key}}\">\n        <mat-icon class=\"cf-field-boolean-success\" *ngIf=\"resolvedValue == true\" aria-hidden=\"true\">done</mat-icon>\n        <mat-icon class=\"cf-field-boolean-failure\" *ngIf=\"resolvedValue == false\" aria-hidden=\"true\">close</mat-icon>\n      </span>\n      <span *ngIf=\"value != true && value != false\" class=\"cf-field-value cf-field-value-{{field.key}}\">\n        {{getDropdownValue(field, value)}}\n      </span>\n    </span>  \n    <span *ngSwitchCase=\"'CHECKBOX'\"\n      [ngClass]=\"{'cf-field-value-wrapper-horizontal': field.fieldDisplayType != 'HORIZONTAL', 'cf-field-value-wrapper-vertical': field.fieldDisplayType == 'HORIZONTAL'}\"> \n      <span *ngIf=\"value == true || value == false\" class=\"mat-input-element  cf-field-boolean cf-field-boolean-{{field.key}}\">\n        <mat-icon class=\"cf-field-boolean-success\" *ngIf=\"resolvedValue == true\" aria-hidden=\"true\">done</mat-icon>\n        <mat-icon class=\"cf-field-boolean-failure\" *ngIf=\"resolvedValue == false\" aria-hidden=\"true\">close</mat-icon>\n      </span>\n      <span *ngIf=\"value != true && value != false\" class=\"cf-field-value cf-field-value-{{field.key}}\">\n        {{getDropdownValue(field, value)}}\n      </span>\n    </span>  \n    <span *ngSwitchCase=\"'RADIO'\"\n      [ngClass]=\"{'cf-field-value-wrapper-horizontal': field.fieldDisplayType != 'HORIZONTAL', 'cf-field-value-wrapper-vertical': field.fieldDisplayType == 'HORIZONTAL'}\"> \n      <span *ngIf=\"value == true || value == false\" class=\"mat-input-element  cf-field-boolean cf-field-boolean-{{field.key}}\">\n        <mat-icon class=\"cf-field-boolean-success\" *ngIf=\"resolvedValue == true\" aria-hidden=\"true\">done</mat-icon>\n        <mat-icon class=\"cf-field-boolean-failure\" *ngIf=\"resolvedValue == false\" aria-hidden=\"true\">close</mat-icon>\n      </span>\n      <span *ngIf=\"value != true && value != false\" class=\"cf-field-value cf-field-value-{{field.key}}\">\n        {{getDropdownValue(field, value)}}\n      </span>\n    </span>  \n    <span *ngSwitchCase=\"'AUTOCOMPLETE'\" \n      [ngClass]=\"{'cf-field-value-wrapper-horizontal': field.fieldDisplayType != 'HORIZONTAL', 'cf-field-value-wrapper-vertical': field.fieldDisplayType == 'HORIZONTAL'}\"\n      class=\"mat-form-field cf-field-value cf-field-value-{{field.key}}\">\n      {{field['resolveTextWithKey'] ? getResolveTextWithKey(field) : resolvedValue}}\n    </span>\n    <span *ngSwitchCase=\"'JSON'\">\n      <div class=\"cf-field-nm mdc-layout-grid cf-field-showmore-pannel cf-field-showmore-pannel-{{field.key}}\">\n        <div class=\"mdc-layout-grid__inner cf-field-showmore-pannel-content\">\n          <div class=\"mdc-layout-grid__cell--span-12\">\n            <div *ngIf=\"displayEllipsis(); else elseValue\" (click)=\"displayFullText()\" class=\"cf-field-short-value\">\n              {{getValue(field, value)}}...\n            </div>\n            <ng-template #elseValue> \n              <span (click)=\"displayShortText()\" class=\"cf-field-value\">\n                <pre>{{getValue(field, value) | json}}</pre>\n              </span>\n            </ng-template>\n          </div>\n        </div>\n        <div class=\"mdc-layout-grid__inner cf-field-showmore-pannel-action\" (click)=\"displayFullText()\" *ngIf=\"displayEllipsis() && ellipsisRequired\">\n          <div class=\"mdc-layout-grid__cell--span-12\">\n            Show More\n            <mat-icon>expand_more</mat-icon>\n          </div>\n        </div>\n        <div class=\"mdc-layout-grid__inner cf-field-showmore-pannel-action\" (click)=\"displayShortText()\" *ngIf=\"!displayEllipsis() && ellipsisRequired\">\n          <div class=\"mdc-layout-grid__cell--span-12\">\n            Show Less\n            <mat-icon>expand_less</mat-icon>\n          </div>\n        </div>\n      </div>\n    </span>\n    <span *ngSwitchCase=\"'PARAGRAPH'\" class=\"cf-field-paragraph\">\n      <!-- <span class=\"cf-field\"> -->\n        <cf-paragraph [field]=\"field\"\n          [sourceType]=\"sourceType\"\n          [sourceIdentifier]=\"sourceIdentifier\"\n          [sourceIndex]=\"sourceIndex\" \n          [widgetArrayIndex]=\"widgetArrayIndex\" \n          [form]=\"form\" \n          [keyMap]=\"keyMap\"\n          [field]=\"field\"\n          [displayMode]=\"displayMode\"\n          [originalData]=\"originalData\"\n          [fieldControl]=\"fieldControl\"\n          [dependencies]=\"dependencies\"\n          (onFieldChange)=\"onParagraphChange($event)\"\n          (onButtonClick)=\"buttonClick($event)\"\n          ></cf-paragraph>\n        <!-- </span> -->\n    </span>\n    <span *ngSwitchCase=\"'MULTI_IMAGE'\">\n      <cf-multi-image [field]=\"field\" [disabled]=\"isFieldDisabled\"></cf-multi-image>\n      <ng-container *ngTemplateOutlet=\"cfhelplaintext\"></ng-container>\n    </span>\n    <span *ngSwitchCase=\"'UPLOAD'\">\n      <cf-file-uploader [field]=\"field\" [disabled]=\"isFieldDisabled\"></cf-file-uploader>\n    </span>\n    <span *ngSwitchCase=\"'EMAIL'\">\n      <a href=\"mailto:{{getValue(field, value)}}\">{{getValue(field, value)}}</a>\n    </span>\n    <span *ngSwitchDefault>\n      <!-- displayFullText(value) -->\n      <span [ngClass]=\"{'cf-field-value-wrapper-horizontal': field.fieldDisplayType != 'HORIZONTAL', 'cf-field-value-wrapper-vertical': field.fieldDisplayType == 'HORIZONTAL'}\" [style.text-align]=\"textAlign\" *ngIf=\"!asBubble; else elseAsBubble\">\n        <span *ngIf=\"displayEllipsis(); else elseValue\" (click)=\"displayFullText()\" class=\"cf-field-short-value\" [innerHtml]=\"getValue(field, value)\">\n          ...\n        </span>\n        <ng-template #elseValue>\n          <span (click)=\"displayShortText()\" class=\"cf-field-value\" [innerHtml]=\"getValue(field, value)\">\n          </span>\n        </ng-template> \n      </span>\n      <ng-template #elseAsBubble>\n        <mat-chip-list [attr.aria-label]=\"getValue(field, value)\">\n          <mat-chip class=\"cf-small-bubble\" [color]=\"bubbleColor\" selected>{{getValue(field, value)}}</mat-chip>\n        </mat-chip-list>\n      </ng-template>\n    </span>\n  </span>\n\n  <span *ngIf=\"form && fieldControl && matcher && field.displayMode != 'LABEL' && !isAddMore\" class=\"cf-field\" [ngClass]=\"{'cf-field-lbl-horizontal': (field.type == 'LABEL' || field.type == 'BOOLEAN') && field.fieldDisplayType == 'HORIZONTAL', 'cf-field-lbl-for-label': (field.type == 'LABEL' || field.type == 'BOOLEAN') && sourceType == 'FORM'}\">\n    <ng-container *ngTemplateOutlet=\"cffieldeditable\"></ng-container>\n  </span>\n\n  <span *ngIf=\"form && fieldControl && matcher && field.displayMode != 'LABEL' && isAddMore\" class=\"cf-field\">\n    <div class=\"mdc-layout-grid cf-form-add-more-row\">\n      <div class=\"mdc-layout-grid__inner\">\n        <div class=\"mdc-layout-grid__cell--span-{{isAddMore ? addMoreFieldDisplayInColumns : (addMoreFieldDisplayInColumns + addMoreButtonDisplayInColumns)}} mdc-layout-grid__cell--align-middle\">\n          <ng-container *ngTemplateOutlet=\"cffieldeditable\"></ng-container>\n        </div>\n        <div class=\"mdc-layout-grid__cell--span-{{addMoreButtonDisplayInColumns}} mdc-layout-grid__cell--align-middle\" *ngIf=\"isAddMore\">\n          <cf-button\n            *ngIf=\"fieldIndex != form.controls[field.key]['controls'].length - 1\"\n            [disabled]=\"!(addMorePermission == null || (addMorePermission && (addMorePermission['subject'] | can: addMorePermission['action'])))\"\n            [form]=\"form\"\n            [sourceIdentifier]=\"sourceIdentifier\"\n            [sourceIndex]=\"sourceIndex\"\n            [widgetArrayIndex]=\"widgetArrayIndex\"\n            [button]=\"minusButton\"\n            class=\"cf-field-addmore cf-field-addmore-{{field.key}}\"\n            (onClick)=\"removeField(field, fieldIndex)\"\n          ></cf-button>\n          <cf-button\n            *ngIf=\"fieldIndex == form.controls[field.key]['controls'].length - 1\"\n            [form]=\"form\"\n            [sourceIdentifier]=\"sourceIdentifier\"\n            [sourceIndex]=\"sourceIndex\"\n            [widgetArrayIndex]=\"widgetArrayIndex\"\n            [button]=\"plusButton\"\n            class=\"cf-field-addmore cf-field-addmore-{{field.key}}\"\n            (onClick)=\"addField(field)\"\n          ></cf-button>\n        </div>\n      </div>\n    </div>\n  </span>\n</ng-template>\n\n<ng-template #cffieldeditable>\n  <span [ngSwitch]=\"field.type\">\n    <!-- [appearance]=\"appearance | lowercase\"  -->\n    <!-- [appearance]=\"appearance | lowercase\" -->\n    <mat-form-field \n      class=\"cf-field\"\n      [ngClass]=\"{'cf-inbuild-type': (field.type== 'TIME' || field.type== 'COLOR' || field.type== 'WEEK' || field.type== 'MONTH'|| field.type== 'NUMBER'), 'cf-field-horizontal': field.fieldDisplayType == 'HORIZONTAL'}\" \n      *ngIf=\"field.type != 'PARAGRAPH' && field.type != 'MULTI_IMAGE' && field.type != 'CHECKBOX' && field.type != 'TOOLBAR' && field.type != 'CHIPS' && field.type != 'HTML_EDITOR' && field.type != 'RADIO' && field.type != 'SLIDER' && field.type != 'TOGGLE_OPTION' && field.type != 'UPLOAD' && field.type != 'IMAGE' && field.type != 'BOOLEAN' && field.type != 'CALENDAR' && field.type != 'JSON' && field.type != 'LABEL'\">\n      <mat-label class=\"cf-field-lbl cf-field-lbl-{{field.key}}\" *ngIf=\"!(hideLabel == true) && field.fieldDisplayType != 'HORIZONTAL'\">\n        <strong>{{field.label}}</strong>\n        <span class=\"cf-field-lbl-req\" *ngIf=\"isRequired\">*</span>\n        <span *ngIf=\"field.help && field.help.message && field.help.displayType == 'PLAIN_TEXT' && field.help.withLabel\">\n          {{field.help.message}}\n        </span>\n      </mat-label>\n      <!-- <mat-label class=\"cf-field-lbl\" *ngIf=\"(hideLabel == true)\"> \n      </mat-label> -->\n\n      <mat-icon \n        *ngIf=\"field.icon\" \n        matPrefix\n        aria-hidden=\"true\" \n        [attr.aria-label]=\"field.icon\" \n        class=\"cf-field-icon\" \n      >{{field.icon}}</mat-icon>\n\n      <span *ngSwitchCase=\"'TEXT'\">\n        <input  \n          matInput \n          [id]=\"field.key\" \n          [formControl]=\"fieldControl\" \n          [errorStateMatcher]=\"matcher\" \n          [maxLength]=\"maxLength\"\n          [placeholder]=\"field.placeholder\"\n          [disabled]=\"isFieldDisabled\"\n          class=\"mat-input-element cf-field-text cf-field-text-{{field.key}}\"\n          (input)=\"onInputChange($event)\"/>\n      </span>\n      <!-- <input  \n        *ngSwitchCase=\"'HIDDEN'\" \n        matInput \n        type=\"hidden\"\n        [formControl]=\"fieldControl\" \n        [errorStateMatcher]=\"matcher\"\n        [placeholder]=\"field.placeholder\"\n        [disabled]=\"isFieldDisabled\"\n      > -->\n\n      <!-- [mat-autosize]=\"'true'\" -->\n      <textarea\n        *ngSwitchCase=\"'TEXTAREA'\" \n        matInput \n        [id]=\"field.key\" \n        [formControl]=\"fieldControl\" \n        [errorStateMatcher]=\"matcher\"\n        [maxLength]=\"maxLength\"\n        rows=\"{{rows}}\"\n        [placeholder]=\"field.placeholder\"\n        [disabled]=\"isFieldDisabled\"\n        class=\"mat-input-element cf-field-textarea cf-field-textarea-{{field.key}}\"\n        (input)=\"onInputChange($event)\"> \n      </textarea>\n      <!-- <br/> -->  \n      <mat-hint hintLabel=\"end\" *ngIf=\"field.type == 'TEXTAREA' && maxLength && maxLength > 0 && maxLength != 1000000\"><strong>{{fieldControl.value.length}}</strong> / {{maxLength}} characters</mat-hint>\n\n      <input \n        *ngSwitchCase=\"'COLOR'\" \n        matInput \n        type=\"color\"\n        [id]=\"field.key\" \n        [formControl]=\"fieldControl\" \n        [errorStateMatcher]=\"matcher\"\n        [placeholder]=\"field.placeholder\"\n        [disabled]=\"isFieldDisabled\"\n        class=\"mat-input-element cf-field-color cf-field-color-{{field.key}}\"\n        (input)=\"onInputChange($event)\"/>\n      <input \n        *ngSwitchCase=\"'EMAIL'\" \n        matInput \n        type=\"email\"\n        [id]=\"field.key\" \n        [formControl]=\"fieldControl\" \n        [errorStateMatcher]=\"matcher\"\n        [maxLength]=\"maxLength\"\n        [placeholder]=\"field.placeholder\"\n        [disabled]=\"isFieldDisabled\"\n        class=\"mat-input-element cf-field-email cf-field-email-{{field.key}}\"\n        (input)=\"onInputChange($event)\"/>\n      <input \n        *ngSwitchCase=\"'MONTH'\" \n        matInput \n        type=\"month\"\n        [id]=\"field.key\" \n        [formControl]=\"fieldControl\" \n        [errorStateMatcher]=\"matcher\"\n        [maxLength]=\"maxLength\"\n        [placeholder]=\"field.placeholder\"\n        [disabled]=\"isFieldDisabled\"\n        class=\"mat-input-element cf-field-month cf-field-month-{{field.key}}\"\n        (input)=\"onInputChange($event)\"/>\n      <input \n        *ngSwitchCase=\"'NUMBER'\" \n        matInput \n        type=\"number\"\n        [id]=\"field.key\" \n        [formControl]=\"fieldControl\" \n        [errorStateMatcher]=\"matcher\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [placeholder]=\"field.placeholder\"\n        [disabled]=\"isFieldDisabled\"\n        class=\"mat-input-element cf-field-number cf-field-number-{{field.key}}\"\n        (input)=\"onInputChange($event)\"/>\n      <input \n        *ngSwitchCase=\"'PASSWORD'\" \n        matInput \n        type=\"password\"\n        [id]=\"field.key\" \n        [formControl]=\"fieldControl\" \n        [errorStateMatcher]=\"matcher\"\n        [maxLength]=\"maxLength\"\n        [placeholder]=\"field.placeholder\"\n        [disabled]=\"isFieldDisabled\"\n        class=\"mat-input-element cf-field-password cf-field-password-{{field.key}}\"\n        (input)=\"onInputChange($event)\"/>\n      <input \n        *ngSwitchCase=\"'TIME'\" \n        matInput \n        type=\"time\"\n        [id]=\"field.key\" \n        [formControl]=\"fieldControl\" \n        [errorStateMatcher]=\"matcher\"\n        [placeholder]=\"field.placeholder\"\n        [disabled]=\"isFieldDisabled\"\n        class=\"mat-input-element cf-field-time cf-field-time-{{field.key}}\"\n        (input)=\"onInputChange($event)\"/>\n      <input \n        *ngSwitchCase=\"'WEEK'\" \n        matInput \n        type=\"week\"\n        [id]=\"field.key\" \n        [formControl]=\"fieldControl\" \n        [errorStateMatcher]=\"matcher\"\n        [placeholder]=\"field.placeholder\"\n        [disabled]=\"isFieldDisabled\"\n        class=\"mat-input-element cf-field-week cf-field-week-{{field.key}}\"\n        (input)=\"onInputChange($event)\"/>\n      <span *ngSwitchCase=\"'DROPDOWN'\">\n        <mat-select\n          [id]=\"field.key\" \n          [formControl]=\"fieldControl\"\n          [errorStateMatcher]=\"matcher\"\n          [multiple]=\"field['multiselect']\"\n          [placeholder]=\"field.placeholder\"\n          [disabled]=\"isFieldDisabled\"\n          class=\"mat-input-element cf-field-dropdown cf-field-dropdown-{{field.key}}\"\n          (selectionChange)=\"onChange($event)\">\n          <mat-option class=\"mat-option\" *ngIf=\"field['defaultOption']\">{{field['defaultOption']}}</mat-option>\n          <mat-option class=\"mat-option\" *ngFor=\"let option of field['options']\" [value]=\"option.key\" [disabled]=\"option.disabled\" >{{option.value}}</mat-option>\n        </mat-select>\n      </span>\n      <span *ngSwitchCase=\"'AUTOCOMPLETE'\"> \n        <input \n          matInput \n          [id]=\"field.key\"  \n          [formControl]=\"fieldControl\" \n          [errorStateMatcher]=\"matcher\"\n          [attr.aria-label]=\"field.label\" \n          [placeholder]=\"field.placeholder\"\n          [matAutocomplete]=\"auto\"\n          class=\"mat-input-element cf-field-autocomplete cf-field-autocomplete-{{field.key}}\"\n          [disabled]=\"isFieldDisabled\"\n          (input)=\"onInputChange($event)\"/>\n        <mat-autocomplete \n          #auto=\"matAutocomplete\"\n          [displayWith]=\"autocompleteDisplayFn\"\n          (optionSelected)=\"onAutocompleteChange($event)\">\n          <mat-option \n            class=\"mat-option cf-field-autocomplete-option cf-field-autocomplete-option-{{field.key}}\" \n            *ngIf=\"field['defaultOption']\">\n            {{field['defaultOption']}}\n          </mat-option>\n          <mat-option \n            class=\"mat-option cf-field-autocomplete-option cf-field-autocomplete-option-{{field.key}}\" \n            *ngFor=\"let option of field['options']\" \n            [value]=\"option\" \n            [disabled]=\"option.disabled\" >\n            <span [innerHTML]=\"option.value | highlight: highlightAutoCompleteText\"></span>\n          </mat-option>\n          <mat-option *ngIf=\"(field['options'])?.length==0 && autoCompleteInputHasValue\">\n            {{field['noRecordFound'] ? field['noRecordFound'] : 'No Result Found'}}\n          </mat-option>\n        </mat-autocomplete>\n      </span> \n      <!-- <cf-button\n        matSuffix\n        *ngIf=\"hasClear && !hasFieldNavigate && !(field.help && field.help.displayType == 'TOOLTIP' && field.help.message)\"\n        [button]=\"textClearButton\"\n        class=\"cf-field-clr-btn cf-field-clr-btn-{{field.key}}\"\n        (onClick)=\"cleanValue()\"\n      ></cf-button> -->\n      <cf-button\n        matSuffix\n        *ngIf=\"hasFieldNavigate\"\n        [button]=\"routeToButton\"\n        class=\"cf-field-clr-btn cf-field-clr-btn-{{field.key}}\"\n        (onClick)=\"resolvedValue = ''\"\n      ></cf-button> \n      <cf-tooltip matSuffix [field]=\"field\"></cf-tooltip>\n\n      <!-- <ng-container *ngTemplateOutlet=\"cfHelp;\"></ng-container> -->\n      <mat-hint *ngIf=\"field.help && field.help.message && field.help.displayType == 'PLAIN_TEXT' && !field.help.withLabel\" class=\"cf-field-hint\">\n        <mat-icon \n          aria-hidden=\"true\" \n          [attr.aria-label]=\"field.help.message\" \n          class=\"cf-field-hint-icon\">\n          {{field.help.icon ? field.help.icon : 'live_help'}}\n        </mat-icon>\n        <span>{{field.help.message}}</span>\n      </mat-hint>\n\n      <mat-error aria-hidden=\"true\" [attr.aria-label]=\"error.message\" *ngFor=\"let error of errors()\" [innerHtml]=\"error.message\"></mat-error>\n    </mat-form-field>\n\n    <span *ngSwitchCase=\"'CALENDAR'\">\n      <!-- [appearance]=\"appearance | lowercase\" -->\n      <mat-form-field \n        class=\"cf-field\" \n        *ngIf=\"dateRange\">\n        <mat-label class=\"cf-field-lbl cf-field-lbl-{{field.key}}\" *ngIf=\"!(hideLabel == true) && field.fieldDisplayType != 'HORIZONTAL'\" class=\"cf-field-label\">\n          <strong>{{field.label}}</strong>\n          <span class=\"cf-field-lbl-req\" *ngIf=\"isRequired\">*</span>\n          <span *ngIf=\"field.help && field.help.message && field.help.displayType == 'PLAIN_TEXT' && field.help.withLabel\">\n            {{field.help.message}}\n          </span>\n        </mat-label>\n        <mat-date-range-input [formGroup]=\"fieldControl\" [rangePicker]=\"datePicker\" >\n          <input \n            matStartDate\n            matInput\n            [id]=\"field.key\" \n            formControlName=\"startDate\" \n            [min]=\"field['minDate']\"\n            [disabled]=\"isFieldDisabled\"\n            [errorStateMatcher]=\"matcher\"\n            placeholder=\"Start date\"\n            (dateChange)=\"onDateChange($event, 'startDate')\">\n          <input \n            matEndDate\n            matInput\n            [id]=\"field.key\" \n            [max]=\"field['maxDate']\"\n            [disabled]=\"isFieldDisabled\"\n            [errorStateMatcher]=\"matcher\"\n            formControlName=\"endDate\" \n            placeholder=\"End date\"\n            (dateChange)=\"onDateChange($event, 'endDate')\">\n        </mat-date-range-input>\n        <mat-datepicker-toggle matSuffix [for]=\"datePicker\" ></mat-datepicker-toggle>\n        <mat-date-range-picker #datePicker ></mat-date-range-picker>\n\n        <!-- <cf-button\n          matSuffix\n          *ngIf=\"hasClear && !hasFieldNavigate && !(field.help && field.help.displayType == 'TOOLTIP' && field.help.message)\"\n          [button]=\"textClearButton\"\n          class=\"cf-field-clr-btn cf-field-clr-btn-{{field.key}}\"\n          (onClick)=\"cleanValue()\"\n        ></cf-button> -->\n        <cf-button\n          matSuffix\n          *ngIf=\"hasFieldNavigate\"\n          [button]=\"routeToButton\"\n          class=\"cf-field-clr-btn cf-field-clr-btn-{{field.key}}\"\n          (onClick)=\"resolvedValue = ''\"\n        ></cf-button> \n        <cf-tooltip matSuffix [field]=\"field\"></cf-tooltip>\n\n        <!-- <ng-container *ngTemplateOutlet=\"cfHelp;\"></ng-container> -->\n        <mat-hint *ngIf=\"field.help && field.help.message && field.help.displayType == 'PLAIN_TEXT' && !field.help.withLabel\" class=\"cf-field-hint\">\n          <mat-icon \n            aria-hidden=\"true\" \n            [attr.aria-label]=\"field.help.message\" \n            class=\"cf-field-hint-icon\">\n            {{field.help.icon ? field.help.icon : 'live_help'}}\n          </mat-icon>\n          <span>{{field.help.message}}</span>\n        </mat-hint>\n        <mat-error aria-hidden=\"true\" [attr.aria-label]=\"error.message\" *ngFor=\"let error of errors()\" [innerHtml]=\"error.message\"></mat-error>\n      </mat-form-field>\n      <!-- [appearance]=\"appearance | lowercase\" -->\n      <mat-form-field \n        class=\"cf-field\" \n        *ngIf=\"!dateRange\">\n        <mat-label class=\"cf-field-lbl cf-field-lbl-{{field.key}}\" *ngIf=\"!(hideLabel == true) && field.fieldDisplayType != 'HORIZONTAL'\" class=\"cf-field-label\">\n          <strong>{{field.label}}</strong>\n          <span class=\"cf-field-lbl-req\" *ngIf=\"isRequired\">*</span>\n          <span *ngIf=\"field.help && field.help.message && field.help.displayType == 'PLAIN_TEXT' && field.help.withLabel\">\n            {{field.help.message}}\n          </span>  \n        </mat-label>      \n        <input \n            matInput \n            [matDatepicker]=\"picker\"\n            [id]=\"field.key\" \n            [formControl]=\"fieldControl\" \n            [matDatepickerFilter]=\"field['filter']\"\n            [min]=\"field['minDate']\"\n            [max]=\"field['maxDate']\"\n            [errorStateMatcher]=\"matcher\"\n            [disabled]=\"isFieldDisabled\"\n            class=\"mat-input-element cf-field-datepicker cf-field-datepicker-{{field.key}}\" \n            (dateChange)=\"onDateChange($event, '')\" />\n        <mat-datepicker-toggle   matSuffix [for]=\"picker\" ></mat-datepicker-toggle>\n        <mat-datepicker #picker ></mat-datepicker>\n        <!-- <cf-button\n          matSuffix\n          *ngIf=\"hasClear && !hasFieldNavigate && !(field.help && field.help.displayType == 'TOOLTIP' && field.help.message)\"\n          [button]=\"textClearButton\"\n          class=\"cf-field-clr-btn cf-field-clr-btn-{{field.key}}\"\n          (onClick)=\"cleanValue()\"\n        ></cf-button> -->\n        <cf-button\n          matSuffix\n          *ngIf=\"hasFieldNavigate\"\n          [button]=\"routeToButton\"\n          class=\"cf-field-clr-btn cf-field-clr-btn-{{field.key}}\"\n          (onClick)=\"resolvedValue = ''\"\n        ></cf-button>\n\n        <!-- <ng-container *ngTemplateOutlet=\"cfHelp;\"></ng-container> -->\n        <mat-hint *ngIf=\"field.help && field.help.message && field.help.displayType == 'PLAIN_TEXT' && !field.help.withLabel\" class=\"cf-field-hint\">\n          <mat-icon \n            aria-hidden=\"true\" \n            [attr.aria-label]=\"field.help.message\" \n            class=\"cf-field-hint-icon\">\n            {{field.help.icon ? field.help.icon : 'live_help'}}\n          </mat-icon>\n          <span>{{field.help.message}}</span>\n        </mat-hint>\n        <cf-tooltip matSuffix [field]=\"field\"></cf-tooltip>\n        <mat-error aria-hidden=\"true\" [attr.aria-label]=\"error.message\" *ngFor=\"let error of errors()\" [innerHtml]=\"error.message\"></mat-error>\n      </mat-form-field>\n    </span>\n\n    <mat-label class=\"cf-field-lbl cf-field-lbl-{{field.key}} cf-field-lbl-inline\" \n      *ngIf=\"!(field.type != 'MULTI_IMAGE' && field.type != 'TOOLBAR' && field.type != 'CHECKBOX' && field.type != 'HTML_EDITOR' && field.type != 'RADIO' && field.type != 'SLIDER' && field.type != 'UPLOAD' && field.type != 'IMAGE' && field.type != 'BOOLEAN' && field.type != 'JSON' && field.type != 'LABEL') && !(hideLabel == true) && field.fieldDisplayType != 'HORIZONTAL'\">\n      <strong>{{field.label}}</strong>\n      <span class=\"cf-field-lbl-req\" *ngIf=\"isRequired\">*</span>\n      <cf-tooltip matSuffix [field]=\"field\"></cf-tooltip>\n      <!-- <span  \n        *ngIf=\"field.help && field.help.message && hasFieldNavigate && field.help.displayType == 'TOOLTIP'\" \n        matTooltip=\"{{field.help.message}}\"\n        matTooltipPosition=\"above\"\n        class=\"cf-field-hint cf-field-hint-{{field.key}}\">  \n        <mat-icon  \n          aria-hidden=\"true\" \n          [attr.aria-label]=\"field.help.message\" \n          class=\"cf-field-hint-icon cf-field-hint-icon-{{field.key}}\" \n        >{{field.help.icon ? field.help.icon : 'live_help'}}</mat-icon>\n      </span>   -->\n      <span *ngIf=\"field.help && field.help.message && field.help.displayType == 'RIGHT_MODAL'\">\n        <ng-container \n          *ngTemplateOutlet=\"cfhelpmodal\" \n        ></ng-container>\n      </span>  \n      <span *ngIf=\"field.help && field.help.message && field.help.displayType == 'PLAIN_TEXT' && field.help.withLabel\">\n        {{field.help.message}}\n      </span>\n    </mat-label>\n    <span *ngSwitchCase=\"'HTML_EDITOR'\" >\n      <div class=\"cf-field-nm\">\n        <quill-editor \n          [ngClass]=\"{'cf-editor-invalid': isEditorErrorState(), 'cf-disable': isFieldDisabled}\"  \n          class=\"cf-field-nm\"\n          [styles]=\"{height: height + 'px','margin-bottom': isEditorErrorState() ? 0 : '1.25em'}\"\n          (onEditorChanged)=\"onHtmlEditorChange($event)\"\n          [id]=\"field.key\" \n          [formControl]=\"fieldControl\" \n          [disabled]=\"isFieldDisabled\"\n          [placeholder]=\"field.placeholder\"\n          [readOnly]=\"isFieldDisabled\"\n          [modules]=\"editorOptions\" \n        >\n        </quill-editor>\n        <span *ngIf=\"isEditorErrorState()\" class=\"cf-field-editor-error\">\n          <mat-error aria-hidden=\"true\" [attr.aria-label]=\"error.message\" *ngFor=\"let error of errors()\" [innerHtml]=\"error.message\"></mat-error>\n        </span> \n        <ng-container *ngTemplateOutlet=\"cfhelplaintext\"></ng-container>\n      </div>\n    </span>\n\n    <span *ngSwitchCase=\"'CHECKBOX'\" class=\"mat-input-element cf-field-chk-group\">\n      <div \n        [ngClass]=\"{'cf-field-checkbox-horizontal': field['displayType'] == 'INLINE'}\"\n        class=\"cf-field-nm\"\n        *ngIf=\"field['displayTemplate'] == 'CLASSIC'; else elseValue\">\n        <span \n          *ngFor=\"let option of field['options']\" \n          class=\"cf-field-chk\">\n          <mat-checkbox \n              class=\"mat-checkbox mat-accent cf-field-chk-inner cf-field-chk-inner-{{field.key}}\"\n              [ngClass]=\"{'cf-field-checkbox-horizontal': field['displayType'] == 'INLINE'}\"\n              [formControl]=\"fieldControl['controls'][option.key]\" \n              [disabled]=\"option.disabled || isFieldDisabled\"\n              (change)=\"onCheckboxChange(option, $event)\">\n            {{option.value}}\n          </mat-checkbox>\n          <i *ngIf=\"option.description\" class=\"cf-field-chk-desc cf-field-chk-desc-{{field.key}}\" [ngClass]=\"{'cf-disabled': option.disabled || isFieldDisabled}\">{{option.description}}</i>\n        </span>\n        <ng-container *ngTemplateOutlet=\"cfhelplaintext\"></ng-container>\n      </div>\n      <ng-template #elseValue>\n        <ng-container *ngTemplateOutlet=\"cfoptiontemplate\"></ng-container>\n      </ng-template>\n    </span>\n    <span *ngSwitchCase=\"'RADIO'\">\n      <!-- =={{field | json}} -->\n      <mat-radio-group \n        *ngIf=\"field['displayTemplate'] == 'CLASSIC'; else elseValue\"\n        [id]=\"field.key\" \n        [formControl]=\"fieldControl\" \n        class=\"cf-field-nm cf-field-radio-group cf-field-radio-group-{{field.key}}\"\n        [ngClass]=\"{'cf-field-radio-horizontal': field['displayType'] == 'INLINE'}\"\n        (change)=\"onRadioChange($event)\"> \n          <span \n          [ngClass]=\"{'cf-field-radio-horizontal-padding': field['displayType'] == 'INLINE'}\"\n          *ngFor=\"let option of field['options']\">\n            <mat-radio-button \n              class=\"mat-radio-button mat-accent cf-field-radio cf-field-radio-{{field.key}}\"\n              [value]=\"option.key\" \n              [disabled]=\"option.disabled || isFieldDisabled\">\n              {{option.value}}\n            </mat-radio-button>\n            <br *ngIf=\"option.description\"/><i *ngIf=\"option.description\" class=\"cf-field-radio-desc\" [ngClass]=\"{'cf-disabled': option.disabled || isFieldDisabled}\">{{option.description}}</i>\n          </span>\n          <ng-container *ngTemplateOutlet=\"cfhelplaintext\"></ng-container>\n        </mat-radio-group>\n      <ng-template #elseValue>\n        <ng-container *ngTemplateOutlet=\"cfoptiontemplate\"></ng-container>\n      </ng-template>\n    </span>\n    <span *ngSwitchCase=\"'SLIDER'\">\n      <mat-slider\n        [id]=\"field.key\" \n        [formControl]=\"fieldControl\"\n        [invert]=\"field['invert']\"\n        [max]=\"field['max']\"\n        [min]=\"field['min']\"\n        [step]=\"field['step']\"\n        [thumbLabel]=\"field['thumbLabel']\"\n        [tickInterval]=\"field['tickInterval']\"\n        [vertical]=\"field['vertical']\"\n        class=\"mat-slider cf-field-slider cf-field-slider-{{field.key}}\"\n        [disabled]=\"isFieldDisabled\"\n        (change)=\"onSliderChange($event)\">\n      </mat-slider>\n      <ng-container *ngTemplateOutlet=\"cfhelplaintext\"></ng-container>\n    </span>\n    <span *ngSwitchCase=\"'TOGGLE_OPTION'\">\n      <mat-slide-toggle \n        [formControl]=\"fieldControl\"\n        [color]=\"field['color']\" \n        [checked]=\"field['checked']\"\n        [disabled]=\"isFieldDisabled\"\n        class=\"mat-slide-toggle cf-field-toggle cf-field-toggle-{{field.key}}\"\n        (change)=\"onToggleChange($event)\">\n        {{field['label']}}\n        <span *ngIf=\"field['description']\">{{field['description']}}</span>\n      </mat-slide-toggle>\n    </span>\n    <span *ngSwitchCase=\"'UPLOAD'\">\n      <cf-file-uploader [field]=\"field\" [disabled]=\"isFieldDisabled\"></cf-file-uploader>\n      <ng-container *ngTemplateOutlet=\"cfhelplaintext\"></ng-container>\n    </span>\n    <span *ngSwitchCase=\"'MULTI_IMAGE'\">\n      <cf-multi-image [field]=\"field\" [disabled]=\"isFieldDisabled\"></cf-multi-image>\n      <ng-container *ngTemplateOutlet=\"cfhelplaintext\"></ng-container>\n    </span>\n    <span *ngSwitchCase=\"'IMAGE'\"\n      [ngClass]=\"{'cf-field-value-wrapper-horizontal': field.fieldDisplayType != 'HORIZONTAL', 'cf-field-value-wrapper-vertical': field.fieldDisplayType == 'HORIZONTAL'}\">\n      <img class=\"cf-field-image cf-field-image-{{field.key}}\" [src]=\"imagePath\" \n        [style.width.px]=\"field['width'] ? field['width'] : 'auto'\">\n    </span>\n    <span *ngSwitchCase=\"'BOOLEAN'\" \n      [ngClass]=\"{'cf-field-value-wrapper-horizontal': field.fieldDisplayType != 'HORIZONTAL', 'cf-field-value-wrapper-vertical': field.fieldDisplayType == 'HORIZONTAL'}\"\n      class=\"mat-input-element cf-field-boolean cf-field-boolean-{{field.key}}\">\n      <mat-icon class=\"cf-field-boolean-success\" *ngIf=\"resolvedValue == true\" aria-hidden=\"true\">done</mat-icon>\n      <mat-icon class=\"cf-field-boolean-failure\" *ngIf=\"resolvedValue == false\" aria-hidden=\"true\">close</mat-icon>\n    </span>\n    <span *ngSwitchCase=\"'JSON'\" class=\"cf-field-json cf-field-json-{{field.key}}\">\n      <div class=\"cf-field-nm mdc-layout-grid cf-field-showmore-pannel cf-field-showmore-pannel-{{field.key}}\">\n        <div class=\"mdc-layout-grid__inner cf-field-showmore-pannel-content\">\n          <div class=\"mdc-layout-grid__cell--span-12\">\n            <div *ngIf=\"displayEllipsis(); else elseValue\" (click)=\"displayFullText()\" class=\"cf-field-short-value\">\n              {{getValue(field, value)}}...\n            </div>\n            <ng-template #elseValue>\n              <span (click)=\"displayShortText()\" class=\"cf-field-value\">\n                <pre>{{getValue(field, value) | json}}</pre>\n              </span>\n            </ng-template>\n          </div>\n        </div>\n        <div class=\"mdc-layout-grid__inner cf-field-showmore-pannel-action\" (click)=\"displayFullText()\" *ngIf=\"displayEllipsis() && ellipsisRequired\">\n          <div class=\"mdc-layout-grid__cell--span-12\">\n            Show More\n            <mat-icon>expand_more</mat-icon>\n          </div>\n        </div>\n        <div class=\"mdc-layout-grid__inner cf-field-showmore-pannel-action\" (click)=\"displayShortText()\" *ngIf=\"!displayEllipsis() && ellipsisRequired\">\n          <div class=\"mdc-layout-grid__cell--span-12\">\n            Show Less\n            <mat-icon>expand_less</mat-icon>\n          </div>\n        </div>\n      </div>\n    </span>  \n    <span *ngSwitchCase=\"'CHIPS'\">\n      <cf-chips [field]=\"field\"  \n        [formControl]=\"fieldControl\"\n        [disabled]=\"isFieldDisabled\"\n        [errorMatcher]=\"matcher\"\n        (onListChange)=\"onChipsListChange($event)\"\n      ></cf-chips>\n    </span>\n    <span *ngSwitchCase=\"'PARAGRAPH'\" class=\"cf-field-paragraph\">\n      <!-- [sourceType]=\"'FORM'\" -->\n      <cf-paragraph [field]=\"field\"\n        [sourceType]=\"sourceType\"\n        [sourceIdentifier]=\"sourceIdentifier\"\n        [sourceIndex]=\"sourceIndex\" \n        [widgetArrayIndex]=\"widgetArrayIndex\"\n        [form]=\"form\" \n        [keyMap]=\"keyMap\"\n        [field]=\"field\"\n        [displayMode]=\"displayMode\"\n        [originalData]=\"originalData\"\n        [fieldControl]=\"fieldControl\"\n        [dependencies]=\"dependencies\"\n        (onFieldChange)=\"onParagraphChange($event)\"\n        (onButtonClick)=\"buttonClick($event)\"\n        ></cf-paragraph>\n      <ng-container *ngTemplateOutlet=\"cfhelplaintext\"></ng-container>\n    </span>\n    <span *ngSwitchCase=\"'TOOLBAR'\">\n      <cf-toolbar [field]=\"field\"></cf-toolbar>\n    </span>\n    <span *ngSwitchDefault>\n      <!-- displayFullText(value) -->\n      <span [ngClass]=\"{'cf-field-value-wrapper-horizontal': field.fieldDisplayType != 'HORIZONTAL', 'cf-field-value-wrapper-vertical': field.fieldDisplayType == 'HORIZONTAL'}\" [style.text-align]=\"textAlign\" *ngIf=\"!asBubble; else elseAsBubble\">\n        <span class=\"cf-field-short-value\" [innerHtml]=\"resolvedValue\">\n          ...\n        </span>\n      </span>\n      <ng-template #elseAsBubble>\n        <mat-chip-list [attr.aria-label]=\"resolvedValue\">\n          <mat-chip class=\"cf-small-bubble\" [color]=\"bubbleColor\" selected>{{resolvedValue}}</mat-chip>\n        </mat-chip-list>\n      </ng-template>\n    </span>    \n  </span>\n</ng-template>\n\n<ng-template #cfhelplaintext>\n  <mat-hint *ngIf=\"field.help && field.help.message && field.help.displayType == 'PLAIN_TEXT' && !field.help.withLabel\" class=\"cf-field-hint cf-field-hint-nm\">\n    <mat-icon \n      aria-hidden=\"true\" \n      [attr.aria-label]=\"field.help && field.help.message\" \n      class=\"cf-field-hint-icon\">{{field.help && field.help.icon ? field.help.icon : 'live_help'}}</mat-icon>\n    {{field.help.message}}\n  </mat-hint>\n</ng-template>\n\n<ng-template #cfhelpmodal>\n    <mat-sidenav #sidenav [position]=\"'end'\" (keydown.escape)=\"close()\" disableClose>\n      <div class=\"mdc-layout-grid cf-crud-search-modal cf-crud-search-modal-{{field.key}}\">\n        <div class=\"mdc-layout-grid__inner\">\n          <div class=\"mdc-layout-grid__cell--span-9 cf-field-help-modal-header\">\n            <strong>{{field.help.title}}</strong>\n          </div>\n          <div class=\"mdc-layout-grid__cell--span-3 mdc-layout-grid--align-right\">\n            <cf-button\n              [sourceIdentifier]=\"field.key\"\n              [sourceIndex]=\"'0'\"\n              [widgetArrayIndex]=\"'0'\"\n              [button]=\"helpModalButton\"\n              align = \"right\"\n              (onClick)=\"close()\"\n            ></cf-button>\n          </div>\n        </div>\n        <div class=\"mdc-layout-grid__inner cf-field-help-modal-divider\">\n          <div class=\"mdc-layout-grid__cell--span-12\">\n            <mat-divider class=\"cf-field-help-divider\"></mat-divider>\n          </div>\n        </div>\n        <div class=\"mdc-layout-grid__inner cf-field-help-modal-description\">\n          <div class=\"mdc-layout-grid__cell--span-12\">\n            {{field.help.message}}\n          </div>\n        </div>\n      </div>\n    </mat-sidenav>\n    <br/>\n    <mat-sidenav-content class=\"cf-field-help-modal\">\n      <span \n        matTooltip=\"Click for help\"\n        matTooltipPosition=\"above\"\n        class=\"cf-field-hint cf-field-hint-{{field.key}}\"\n        (click)=\"open()\"\n        >\n        <mat-icon \n          aria-hidden=\"true\"  \n          [attr.aria-label]=\"field.help.message\" \n          class=\"cf-field-hint-icon cf-field-hint-icon-{{field.key}}\" \n          (click)=\"open()\"\n        >{{field.help.icon ? field.help.icon : 'live_help'}}</mat-icon>\n      </span>  \n    </mat-sidenav-content>\n</ng-template>\n\n<ng-template #cfoptiontemplate> \n  <mat-selection-list \n    #listView \n    [multiple]=\"field.type == 'CHECKBOX'\" \n    (selectionChange)=\"onOptionChange($event)\"\n    class=\"cf-field-list cf-field-nm\">\n    <ng-container \n      *ngFor=\"let option of field['options']; let index=index,let last = last\">\n      <mat-list-option \n        *ngIf=\"index < showLess\" \n        [value]=\"option.key\" \n        [selected]=\"field.type == 'CHECKBOX' ? option.checked : option.key == fieldControl.value\"\n        [disabled]=\"option.disabled || isFieldDisabled\"\n        class=\"cf-field-list-option\">\n        <img \n          *ngIf=\"option.image || field['defaultImageUrl']\" \n          matListAvatar \n          [src]=\"option.image\" \n          (error)=\"onListImageLoadError($event)\"  \n          alt=\"\" \n          class=\"cf-field-list-image\"/>\n          <h3 matLine class=\"primary\">\n            {{option.value}}\n          </h3>\n          <p matLine class=\"secondary\">\n            <span>{{option.description}}</span>\n          </p>\n        <mat-divider *ngIf=\"!last\"></mat-divider>\n      </mat-list-option>\n    </ng-container>\n  </mat-selection-list>\n  <span class=\"cf-show-all-btn\">\n    <button  mat-button (click)=\"onShowAllOptions()\" *ngIf=\"showLess < field['options'].length\">\n      {{field['showAllLabel'] ? field['showAllLabel'] : 'Show All'}}\n      <mat-icon aria-hidden=\"true\">keyboard_arrow_down</mat-icon>\n    </button>\n  </span>\n  <ng-container *ngTemplateOutlet=\"cfhelplaintext\"></ng-container>\n</ng-template>",
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".cf-field-lbl,.cf-field-lbl-for-label{display:block}.cf-field-lbl-horizontal{padding-top:20px}.cf-field-lbl-horizontal-premitive{padding-top:13px}.cf-field-hint-inline{text-align:right}.cf-field-hint-nm{font-size:75%}.cf-field-hint-nm .cf-field-hint-icon{height:1em;width:1em}.cf-field-hint-icon{font-size:100%!important}.cf-field-hint .mat-icon{margin-right:4px!important;vertical-align:middle!important}.cf-field{width:100%}.cf-field-chk-group{padding-top:24px}.cf-field-chk{display:flex;flex-direction:column;margin:0}.cf-field-chk-inner{margin:5px 0}.cf-field-chk-desc{padding-left:22px}.cf-field-radio-group{display:flex;flex-direction:column;margin:0}.cf-field-radio{margin:5px 0}.cf-field-radio-desc{padding-left:26px}.cf-disabled{color:rgba(0,0,0,.54)}.cf-field-slider{width:100%}.cf-field-slider .mat-slider-wrapper{top:16px!important}.cf-field-toggle{height:48px!important}.cf-field-help-modal{margin-left:0!important;width:20px}.cf-field-help-modal-header{font-size:20px;font-weight:500;padding:16px 16px 8px}.cf-field-help-modal-divider{padding:12px 16px 0}.cf-field-help-modal-description{padding:16px 16px 8px}.cf-form-add-more-row{padding:0!important}.cf-field-upload{vertical-align:middle}.cf-field-upload .file-input-text{display:none!important}.cf-field-img{padding-top:5px}.cf-field-showmore-pannel{background-color:#eff0f1;border-radius:3px;margin-bottom:1em!important;overflow:auto;padding:0 8px!important;width:auto}.cf-field-showmore-pannel-content{padding-bottom:5px}.cf-field-showmore-pannel-action{border-top:1px solid #d3d3d3;color:grey;padding-top:5px;text-align:center}.cf-field-horizontal-container{padding:0!important}.cf-field-horizontal-container label#mat-form-field-label-1{color:transparent}.cf-field-horizontal-container .cf-field-nm{margin-top:6px}.cf-field-boolean-success,.cf-success{color:green}.cf-failure,.cf-field-boolean-failure{color:red}.cf-field-boolean{margin-bottom:1.25em!important}.cf-field-addmore .mat-button,.mat-flat-button,.mat-icon-button,.mat-stroked-button{min-width:30px!important}.cf-small-bubble{box-sizing:border-box!important;font-size:10px;line-height:24px;margin-top:12px!important;min-height:24px!important;min-width:unset;padding:0 8px!important}.cf-field-value-wrapper-horizontal{padding-top:8px}.cf-field-value-wrapper-vertical{display:block;padding-bottom:12px}.cf-field-list{padding-bottom:8px}.cf-field-list>div{margin-bottom:1.25em;text-align:center}.cf-field-list .cf-field-list-option[aria-selected=true]{background:rgba(203,197,197,.2)!important}.cf-field-list .cf-field-list-option .cf-field-list-image{border:1px solid #4d4d4d;height:30px!important;width:30px!important}.cf-field-list .cf-field-list-option .primary{margin:5px 0}.cf-field-list .cf-field-list-option .secondary{font-style:italic}.cf-field-list .cf-field-list-option:not(:last-child){border-bottom:1px solid #ebebeb}.cf-field-list .cf-field-list-option:nth-last-child(2){border-bottom:none}.highlight{font-weight:700}.cf-show-all-btn{display:block}.cf-field-paragraph .cf-field{width:auto!important}.cf-field-paragraph .cf-field .cf-field-lbl,.cf-field-paragraph .cf-field .cf-field-value-wrapper-horizontal{display:inline;width:auto!important}.cf-field-lbl-inline{color:rgba(0,0,0,.54);font-size:10px;height:10px;line-height:10px;margin-bottom:8px}.cf-field-lbl-inline .mat-icon-button{color:rgba(0,0,0,.54);height:10px;line-height:8px;width:30px}.mat-slide-toggle{line-height:unset;margin-top:4px}.ql-toolbar.ql-snow{border:none;border-radius:4px 4px 0 0;box-shadow:0 0 1px -1px rgba(0,0,0,.2),0 0 1px 0 rgba(0,0,0,.14),0 0 3px 0 rgba(0,0,0,.12)}.ql-container.ql-snow{border:none;border-radius:0 0 4px 4px;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)!important}.cf-field-editor-error{font-size:75%}.cf-field-editor-error .mat-error{margin-bottom:1.25em;margin-top:.5416666667em}.cf-editor-invalid .ql-toolbar.ql-snow{border:1px solid #f44336;border-bottom:none}.cf-editor-invalid .ql-container.ql-snow{border:1px solid #f44336}.cf-field-chk-group .cf-field-chk:last-child,.cf-field-radio-group{margin-bottom:1.25em!important}.cf-field-radio-horizontal{display:inline-block}.cf-field-radio-horizontal-padding{padding-right:10px}.cf-field-checkbox-horizontal{display:flex;padding-right:10px}.cf-disable,.cf-disable .ql-container,.cf-disable .ql-toolbar{opacity:.38}.cf-disable .mat-list-item-disabled{background:none}.cf-disable.cf-field-list:hover{outline:none}input[type=color],input[type=month],input[type=number],input[type=time],input[type=week]{-webkit-appearance:none;border:none;height:16px}input[type=color]::-webkit-color-swatch-wrapper{padding:0}input[type=color]::-webkit-color-swatch{border:none}"]
                },] }
    ];
    FieldComponent.ctorParameters = function () { return [
        { type: router.Router },
        { type: ability.Ability }
    ]; };
    FieldComponent.propDecorators = {
        sourceType: [{ type: core.Input }],
        sourceIdentifier: [{ type: core.Input }],
        sourceIndex: [{ type: core.Input }],
        widgetArrayIndex: [{ type: core.Input }],
        form: [{ type: core.Input }],
        fieldControl: [{ type: core.Input }],
        fieldIndex: [{ type: core.Input }],
        field: [{ type: core.Input }],
        originalData: [{ type: core.Input }],
        _displayMode: [{ type: core.Input }],
        displayMode: [{ type: core.Input }],
        hideLabel: [{ type: core.Input }],
        value: [{ type: core.Input }],
        isAddMore: [{ type: core.Input }],
        addMorePermission: [{ type: core.Input }],
        device: [{ type: core.Input }],
        displayInColumns: [{ type: core.Input }],
        dependencies: [{ type: core.Input }],
        row: [{ type: core.Input }],
        keyMap: [{ type: core.Input }],
        onDependentFieldChange: [{ type: core.Output }],
        onFieldChange: [{ type: core.Output }],
        onFormChange: [{ type: core.Output }],
        onButtonClick: [{ type: core.Output }],
        listView: [{ type: core.ViewChild, args: ['listView',] }],
        sidenav: [{ type: core.ViewChild, args: ['sidenav',] }]
    };

    var FieldLayoutComponent = /** @class */ (function () {
        // radio: {} = {};
        // minDate: Date;
        // maxDate: Date;
        //protected dateService: NbDateService<Date>, protected autocompleteSearch: AutocompleteService
        function FieldLayoutComponent(ability) {
            this.ability = ability;
            AbilityUtils.setAbility(this.ability);
        }
        FieldLayoutComponent.prototype.ngOnInit = function () {
        };
        FieldLayoutComponent.prototype.initField = function () {
            // if (this.field.type == FieldType.RADIO) {
            //   this.radio[this.field.key] = null;
            // }
            // if (this.field.type == FieldType.CALENDAR)  {
            //   this.minDate = this.dateService.addDay(this.dateService.today(), this.field['min']);
            //   this.maxDate = this.dateService.addDay(this.dateService.today(), this.field['max']);
            // }    
        };
        FieldLayoutComponent.prototype.isRequired = function () {
            var e_1, _a;
            var isRequired = false;
            if (this.field.validations && this.field.validations.length > 0) {
                try {
                    for (var _b = __values(this.field.validations), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var validation = _c.value;
                        if (validation.message.key == "required") {
                            isRequired = true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            return isRequired;
        };
        FieldLayoutComponent.prototype.isValidDisplayType = function (fieldDiaplyType) {
            if (this.field) {
                return this.field.fieldDisplayType == fieldDiaplyType;
            }
            else {
                return false;
            }
        };
        return FieldLayoutComponent;
    }());
    FieldLayoutComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'cf-field-layout',
                    template: "<p>field-layout works!</p>\n",
                    styles: [""]
                },] }
    ];
    FieldLayoutComponent.ctorParameters = function () { return [
        { type: ability.Ability }
    ]; };
    FieldLayoutComponent.propDecorators = {
        sourceIdentifier: [{ type: core.Input }],
        sourceIndex: [{ type: core.Input }],
        form: [{ type: core.Input }],
        field: [{ type: core.Input }],
        displayMode: [{ type: core.Input }],
        value: [{ type: core.Input }],
        dependencies: [{ type: core.Input }],
        row: [{ type: core.Input }],
        keyMap: [{ type: core.Input }]
    };

    var FieldHorizontalLayoutComponent = /** @class */ (function (_super) {
        __extends(FieldHorizontalLayoutComponent, _super);
        function FieldHorizontalLayoutComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //protected dateService: NbDateService<Date>, protected autocompleteSearch: AutocompleteService
        //  constructor() {
        //    super(dateService, autocompleteSearch);
        //  }
        FieldHorizontalLayoutComponent.prototype.ngOnInit = function () {
            this.initField();
        };
        FieldHorizontalLayoutComponent.prototype.displayHorizonalForm = function () {
            return this.isValidDisplayType("HORIZONTAL" /* HORIZONTAL */);
        };
        return FieldHorizontalLayoutComponent;
    }(FieldLayoutComponent));
    FieldHorizontalLayoutComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'cf-field-horizontal-layout',
                    template: "<!-- <div class=\"form-group row\" *ngIf=\"displayHorizonalForm()\">\n  <mat-form-field>\n    <mat-label class=\"label col-md-3 col-form-label\">\n      {{field.label}}\n      <span class=\"required-label\" *ngIf=\"isRequired()\">*</span>\n    </mat-label> -->\n    <!-- <div class=\"col-md-9\"> -->\n      <cf-field\n        [sourceIdentifier]=\"sourceIdentifier\" \n        [sourceIndex]=\"sourceIndex\" \n        [form]=\"form\" \n        [field]=\"field\" \n        [displayMode]=\"displayMode\" \n        [value]=\"value\" \n        [dependencies]=\"dependencies\"\n        [row]=\"row\"\n        [keyMap]=\"keyMap\"\n      ></cf-field>\n    <!-- </div> -->\n  <!-- </mat-form-field>\n</div> -->",
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [""]
                },] }
    ];

    var FieldInlineLayoutComponent = /** @class */ (function (_super) {
        __extends(FieldInlineLayoutComponent, _super);
        function FieldInlineLayoutComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //protected dateService: NbDateService<Date>, protected autocompleteSearch: AutocompleteService
        //  constructor() {
        //    super(dateService, autocompleteSearch);
        //  }
        FieldInlineLayoutComponent.prototype.ngOnInit = function () {
            this.initField();
        };
        FieldInlineLayoutComponent.prototype.displayInlineForm = function () {
            return this.isValidDisplayType("INLINE" /* INLINE */);
        };
        return FieldInlineLayoutComponent;
    }(FieldLayoutComponent));
    FieldInlineLayoutComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'cf-field-inline-layout',
                    template: "<div class=\"form-group row\" *ngIf=\"displayInlineForm()\" >\n    <div class=\"col-md-12\">\n      <mat-form-field>\n        <!-- <mat-label>{{field.label}}</mat-label> -->\n        <cf-field \n          [sourceIdentifier]=\"sourceIdentifier\" \n          [sourceIndex]=\"sourceIndex\" \n          [form]=\"form\" \n          [field]=\"field\" \n          [displayMode]=\"displayMode\" \n          [value]=\"value\" \n          [dependencies]=\"dependencies\"\n          [row]=\"row\"\n          [keyMap]=\"keyMap\"\n        ></cf-field>\n      </mat-form-field>\n    </div>\n  </div>",
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [""]
                },] }
    ];

    var FieldVerticalLayoutComponent = /** @class */ (function (_super) {
        __extends(FieldVerticalLayoutComponent, _super);
        function FieldVerticalLayoutComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        //protected dateService: NbDateService<Date>, protected autocompleteSearch: AutocompleteService
        //  constructor() {
        //    super(dateService, autocompleteSearch);
        //  }
        FieldVerticalLayoutComponent.prototype.ngOnInit = function () {
            this.initField();
        };
        FieldVerticalLayoutComponent.prototype.displayVerticalForm = function () {
            return this.isValidDisplayType("INLINE" /* INLINE */);
        };
        return FieldVerticalLayoutComponent;
    }(FieldLayoutComponent));
    FieldVerticalLayoutComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'cf-field-vertical-layout',
                    template: "<div class=\"form-group\" *ngIf=\"displayVerticalForm()\">\n  <mat-form-field>\n    <mat-label class=\"label\">\n      {{field.label}}\n      <span class=\"required-label\" *ngIf=\"isRequired()\">*</span>\n    </mat-label>\n    <cf-field \n      [sourceIdentifier]=\"sourceIdentifier\" \n      [sourceIndex]=\"sourceIndex\" \n      [form]=\"form\" \n      [field]=\"field\" \n      [displayMode]=\"displayMode\" \n      [value]=\"value\" \n      [dependencies]=\"dependencies\"\n      [row]=\"row\"\n      [keyMap]=\"keyMap\"\n    ></cf-field>\n  </mat-form-field>\n</div>",
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [""]
                },] }
    ];

    var ListComponent = /** @class */ (function () {
        function ListComponent(ability, breakpointObserver) {
            this.ability = ability;
            this.breakpointObserver = breakpointObserver;
            this.onFormChange = new core.EventEmitter();
            this.onFieldChange = new core.EventEmitter();
            this.onButtonClick = new core.EventEmitter();
            this.onPageChange = new core.EventEmitter();
            this.onSortChange = new core.EventEmitter();
            this._expanded = false;
            this.dataSource = new table.MatTableDataSource();
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
            this.selection = new collections.SelectionModel(true, []);
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
        Object.defineProperty(ListComponent.prototype, "listConfig", {
            get: function () {
                return this._listConfig;
            },
            set: function (_listConfig) {
                this._listConfig = _listConfig;
                this.setColumnNames();
                this.setDetailColumnCount();
                this.setCardVisibility();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListComponent.prototype, "record", {
            get: function () {
                return this._record;
            },
            set: function (_record) {
                // console.log("-------------->")
                // console.log(_record);
                // console.log(this._record);
                // console.log("<--------------")
                if (!this.parent || (this.parent && JSON.stringify(_record) != JSON.stringify(this._record))) {
                    this._record = _record;
                    this.init();
                    this.setCardVisibility();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListComponent.prototype, "listReset", {
            get: function () {
                return this._listReset;
            },
            set: function (_listReset) {
                this._listReset = _listReset;
                if (this._listReset) {
                    this.resetInlineEditButton('inlineEditButton', 'Edit', 'edit');
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListComponent.prototype, "expanded", {
            get: function () {
                return this._expanded;
            },
            set: function (_expanded) {
                this._expanded = _expanded;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListComponent.prototype, "contentPage", {
            set: function (pagination) {
                this.dataSource.paginator = pagination;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ListComponent.prototype, "contentSort", {
            set: function (sort) {
                this.dataSource.sort = sort;
            },
            enumerable: false,
            configurable: true
        });
        ListComponent.prototype.ngOnInit = function () {
        };
        ListComponent.prototype.init = function () {
            this.getLayout();
            this.setPageSize();
            if (this._record === undefined) {
                this._record = { total: 10, pageNo: 1, rows: [] };
            }
            if (this._record && this._record.rows) {
                if (this._record.rows.length != this.rowCount) {
                    this._record.rows = __spread(this._record.rows);
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
        };
        ListComponent.prototype.sticky = function () {
            var header1 = document.querySelectorAll(".mat-toolbar");
            var header = document.getElementById("mySearch");
            if (header) {
                var sticky = header.offsetTop;
                if (window.pageYOffset > sticky) {
                    header.classList.add("sticky");
                    header1.forEach(function (el) {
                        el.classList.add("sticky-header");
                    });
                }
                else {
                    header.classList.remove("sticky");
                    header1.forEach(function (el) {
                        el.classList.remove("sticky-header");
                    });
                }
            }
        };
        ListComponent.prototype.onScrolled = function (event) {
        };
        ListComponent.prototype.setFilterBar = function () {
            if (this._listConfig.staticList.hasOnPageFilter && !this._listConfig.hasColumnSelection) {
                this.contentFilterColumnSpan = 12;
            }
            if (!this._listConfig.staticList.hasOnPageFilter && this._listConfig.hasColumnSelection) {
                this.columnSelectionColumnSpan = 12;
            }
        };
        ListComponent.prototype.setPageSize = function () {
            if (this._listConfig.pagination == "ALL" /* ALL */) {
                this.limit = this._record && this._record.rows ? this._record.rows.length : 10;
            }
            else {
                if (this._listConfig.pageSize) {
                    this.limit = this._listConfig.pageSize;
                }
            }
        };
        ListComponent.prototype.setIconPosition = function () {
            this.iconPosition = "BEFORE_TITLE" /* BEFORE_TITLE */;
            if (this._listConfig.header && this._listConfig.header.icon && this._listConfig.header.icon.position) {
                this.iconPosition = this._listConfig.header.icon.position;
            }
        };
        ListComponent.prototype.getFilterField = function () {
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
        };
        ListComponent.prototype.getColumnSelectorField = function () {
            this.columnSelectorField = ListUtils.getColumnSelectorField(this._listConfig);
            return this.columnSelectorField;
        };
        ListComponent.prototype.updateColumnDisplay = function (event) {
            var e_1, _a;
            console.log(event);
            try {
                for (var _b = __values(this._listConfig.columns), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var column = _c.value;
                    if (event.value.indexOf(ListUtils.getColumnKey(column)) > -1) {
                        column.show = true;
                    }
                    else {
                        column.show = false;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.setColumnNames();
            this.setDetailColumnCount();
        };
        ListComponent.prototype.inlinEditButton = function (identifier, label, icon) {
            var buttonConfig = {
                identifier: identifier,
                type: "RAISED" /* RAISED */,
                label: label,
                color: "primary" /* PRIMARY */,
                size: "small" /* SMALL */,
                icon: icon,
                onlyIcon: false
            };
            return buttonConfig;
        };
        ListComponent.prototype.getColumnLabel = function (column) {
            return ListUtils.getColumnLabel(column);
        };
        ListComponent.prototype.getColumnKey = function (column) {
            return ListUtils.getColumnKey(column);
        };
        ListComponent.prototype.resetInlineEditButton = function (identifier, label, icon) {
            var e_2, _a, e_3, _b;
            for (var cIndex = 0; cIndex < this.columnConfigs.length; cIndex++) {
                if (!CollectionUtils.isEmpty(this._listConfig.actions)) {
                    try {
                        for (var _c = (e_2 = void 0, __values(this._listConfig.actions)), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var action = _d.value;
                            if (action.permission == null || (this.ability.can(action.permission['action'], action.permission['subject']))) {
                                this.hasDisplayActions = true;
                                break;
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
                if (this.hasDisplayActions) {
                    try {
                        for (var _e = (e_3 = void 0, __values(this.columnConfigs[cIndex].fields)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var field = _f.value;
                            if (FieldUtils.readOnlyField().indexOf(field.type) > -1) { }
                            else {
                                this.isInlineEditable = true;
                                break;
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
            this.inlineEditButtons = new Array();
            if (this._record && this._record.rows) {
                for (var index = 0; index < this._record.rows.length; index++) {
                    this.inlineEditButtons.push(this.inlinEditButton(identifier, label, icon));
                    this.displayModes[index] = "VIEW" /* VIEW */;
                }
            }
            this.formIndex = -1;
            this.setColumnNames();
        };
        ListComponent.prototype.showRowEditable = function () {
            if (!CollectionUtils.isEmpty(this._listConfig.actions)) {
                this.inlineButtonSize = this._listConfig.actions[0].size;
            }
            if (this._record && this._record.rows) {
                for (var index = 0; index < this._record.rows.length; index++) {
                    if (this._record.rows[index]['showRowEditable']) {
                        this.setRowEditablity(index);
                    }
                }
            }
        };
        ListComponent.prototype.setRowEditablity = function (index) {
            var _this = this;
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
                    for (var rIndex = 0; rIndex < this._record.rows.length; rIndex++) {
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
            var inlineButtonTemp = this.inlineEditButtons[index];
            this.inlineEditButtons[index] = undefined;
            setTimeout(function () { return _this.inlineEditButtons[index] = inlineButtonTemp; }, 100);
        };
        ListComponent.prototype.populateAllChilds = function () {
            if (this._record && this._record.rows && this._record.rows.length > 0) {
                for (var rIndex = 0; rIndex < this._record.rows.length; rIndex++) {
                    this.childRows[rIndex] = this.getChildRows(this._record.rows[rIndex]);
                }
            }
        };
        ListComponent.prototype.getChildRows = function (row) {
            if (this._listConfig && this._listConfig.child && row) {
                var data = this._listConfig.child.recordIdentifier ? row[this._listConfig.child.recordIdentifier] : row;
                if (this._listConfig.child.type == "LIST" /* LIST */) {
                    if (data) {
                        var childData = void 0;
                        if (data instanceof Array) {
                            childData = data;
                        }
                        else {
                            childData = new Array();
                            childData.push(data);
                        }
                        var record = {
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
        };
        ListComponent.prototype.getValue = function (colIndex, cFieldIndex, row, value) {
            try {
                value = eval("row." + this.columnConfigs[colIndex].fields[cFieldIndex].key);
            }
            catch (e) { }
            return value;
        };
        ListComponent.prototype.updateFilter = function (field) {
            var filterValue = field.value;
            this.dataSource.filter = filterValue.trim().toLowerCase();
            if (this.dataSource.paginator) {
                this.dataSource.paginator.firstPage();
            }
        };
        ListComponent.prototype.initFormGroup = function (cnt) {
            var e_4, _a, e_5, _b;
            var fieldControls = {};
            var row = this.getCurrentRecord(cnt);
            KeyMapUtils.setOptionssUsingValues(this.keyMap, false, "LIST" /* LIST */, this._listConfig, row);
            try {
                for (var _c = __values(this.columnConfigs), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var column = _d.value;
                    try {
                        for (var _e = (e_5 = void 0, __values(column.fields)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var field = _f.value;
                            var formField = { field: field, addMore: false };
                            if (this._listConfig.uniqueKeys.indexOf(formField.field.key) > -1) {
                                formField.field.isUnique = true;
                            }
                            FormUtils.initFieldGroup(fieldControls, formField, null, row, this.displayModes[cnt]);
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_4) throw e_4.error; }
            }
            this.form = new forms.FormGroup(fieldControls);
            this.formIndex = cnt;
        };
        ListComponent.prototype.initCommonFormGroup = function () {
            var commonFieldControls = {};
            FormUtils.initFieldGroup(commonFieldControls, { field: this.getFilterField(), addMore: false }, {}, {}, "EDIT" /* EDIT */);
            FormUtils.initFieldGroup(commonFieldControls, { field: this.getColumnSelectorField(), addMore: false }, {}, {}, "EDIT" /* EDIT */);
            this.commonListForm = new forms.FormGroup(commonFieldControls);
        };
        ListComponent.prototype.getCurrentRecord = function (cnt) {
            var record = {};
            if (this.dataSource && this.dataSource['_renderData'] && this.dataSource['_renderData']['_value'] && this.dataSource['_renderData']['_value'][cnt]) {
                record = this.dataSource['_renderData']['_value'][cnt];
            }
            else if (this._record && this._record['rows'] && this._record['rows'][cnt]) {
                record = this._record['rows'][cnt];
            }
            return record;
        };
        ListComponent.prototype.getObjectTree = function (currentRow) {
            if (this._listConfig && this._listConfig.uniqueKeys && this._listConfig.uniqueKeys.length > 0) {
                var keys = this._listConfig.uniqueKeys;
                var values_1 = new Array();
                keys.forEach(function (key) { return values_1.push(currentRow[key]); });
                var objectTree = {
                    parent: {
                        key: values_1
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
        };
        /** Whether the number of selected elements matches the total number of rows. */
        ListComponent.prototype.isAllSelected = function () {
            var numSelected = this.selection.selected.length;
            var numRows = this.dataSource.data.length;
            return numSelected === numRows;
        };
        /** Selects all rows if they are not all selected; otherwise clear selection. */
        ListComponent.prototype.masterToggle = function () {
            var _this = this;
            this.isAllSelected() ?
                this.selection.clear() :
                this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
        };
        /** The label for the checkbox on the passed row */
        ListComponent.prototype.checkboxLabel = function (row) {
            if (!row) {
                return (this.isAllSelected() ? 'select' : 'deselect') + " all";
            }
            return (this.selection.isSelected(row) ? 'deselect' : 'select') + " row " + (row.position + 1);
        };
        ListComponent.prototype.setCardVisibility = function () {
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
        };
        ListComponent.prototype.setColumnNames = function () {
            var e_6, _a;
            var _this = this;
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
                var selectableExist = false;
                try {
                    for (var _b = __values(this._listConfig.header.actions), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var button = _c.value;
                        if (button.identifier == "listCrudSelectionButton") {
                            selectableExist = true;
                        }
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
                if (!selectableExist) {
                    this._listConfig.header.actions.unshift(this.selectableButton("listCrudSelectionButton", this._listConfig.selectable.label, this._listConfig.selectable.icon));
                }
            }
            if (this._listConfig.columns && this._listConfig.columns.length > 0) {
                this._listConfig.columns.filter(function (column) { return column.show == true; }).forEach(function (column) {
                    var e_7, _a;
                    var hasDisplayableField = false;
                    try {
                        for (var _b = __values(column.fields), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var field = _c.value;
                            if (field.permission == null || _this.ability.can(field.permission['action'], field.permission['subject'])) {
                                hasDisplayableField = true;
                            }
                        }
                    }
                    catch (e_7_1) { e_7 = { error: e_7_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_7) throw e_7.error; }
                    }
                    if (hasDisplayableField) {
                        _this.columnNames.push(ListUtils.getColumnKey(column));
                        _this.columnConfigs.push(column);
                        _this.totalDispalyableWidth += column.width;
                    }
                });
            }
            if (this.hasDisplayActions) {
                this.columnNames.push('action');
                this.totalDispalyableWidth += this._listConfig.actionWidth;
            }
        };
        ListComponent.prototype.setDetailColumnCount = function () {
            this.childColumnCount = this.columnConfigs.length + (this._listConfig.actions && this._listConfig.actions.length > 0 ? 1 : 0) + (this._listConfig.selectable ? 1 : 0);
        };
        ListComponent.prototype.setColors = function () {
            if (this._record && this._record.rows) {
                for (var rIndex = 0; rIndex < this._record.rows.length; rIndex++) {
                    if (CollectionUtils.isEmpty(this.rowColors[rIndex])) {
                        this.rowColors.push({ bgColor: "", textColor: "" });
                    }
                    var rowColor = this.rowColors[rIndex];
                    if (this._listConfig.rowBgColor) {
                        rowColor.bgColor = this._listConfig.rowBgColor(this._record.rows[rIndex]);
                    }
                    if (this._listConfig.rowTextColor) {
                        rowColor.textColor = this._listConfig.rowTextColor(this._record.rows[rIndex]);
                    }
                    for (var cIndex = 0; cIndex < this.columnConfigs.length; cIndex++) {
                        if (CollectionUtils.isEmpty(this.cellColors[rIndex])) {
                            this.cellColors.push(new Array());
                        }
                        if (CollectionUtils.isEmpty(this.cellColors[rIndex][cIndex])) {
                            this.cellColors[rIndex][cIndex] = { bgColor: "", textColor: "" };
                        }
                        var cellColor = this.cellColors[rIndex][cIndex];
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
        };
        ListComponent.prototype.selectableButton = function (identifier, label, icon) {
            return {
                identifier: identifier,
                label: label,
                color: "primary" /* PRIMARY */,
                size: "small" /* SMALL */,
                icon: icon,
                type: "FLAT" /* FLAT */,
                onlyIcon: false
            };
        };
        ListComponent.prototype.fieldChange = function (fieldChange) {
            var _this = this;
            console.log(fieldChange);
            this.onFieldChange.emit(fieldChange);
            this.formChange(this.form);
            //  if a field options are dependent on me, then reload its options 
            fieldChange.fieldKey;
            this._listConfig.columns.forEach(function (column) {
                column.fields.forEach(function (field) {
                    if (field.optionDependsOn == fieldChange.fieldKey) {
                        var row = FormUtils.getRawValue(_this.form);
                        //let row = this.getCurrentRecord(fieldChange.sourceIndex);
                        KeyMapUtils.setOptionssUsingValues(_this.keyMap, false, "LIST" /* LIST */, _this._listConfig, row);
                    }
                });
            });
        };
        ListComponent.prototype.formChange = function (form) {
            console.log(form);
            if (form == undefined) {
                this.onFormChange.emit(this.form);
            }
            else {
                this.onFormChange.emit(form);
            }
        };
        ListComponent.prototype.buttonClick = function (action) {
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
        };
        ListComponent.prototype.getLayout = function () {
            var _this = this;
            this.breakpointSubscription = this.breakpointObserver.observe([
                layout.Breakpoints.XSmall,
                layout.Breakpoints.Small,
                layout.Breakpoints.Medium,
                layout.Breakpoints.Large,
                layout.Breakpoints.XLarge
            ]).subscribe(function (state) {
                if (state.breakpoints[layout.Breakpoints.XSmall]) {
                    _this.isMobile = true;
                    _this.cellCount = _this.listConfig.mobile && _this.listConfig.mobile.cellCount ? _this.listConfig.mobile.cellCount : 4;
                    _this.hideCard = true;
                    ListUtils.getMobileConfig(_this.listConfig);
                    console.log('Matches XSmall viewport');
                }
                if (state.breakpoints[layout.Breakpoints.Small]) {
                    _this.isTablet = true;
                    console.log('Matches Small viewport');
                }
                if (state.breakpoints[layout.Breakpoints.Medium]) {
                    _this.isDesktop = true;
                    console.log('Matches Medium  viewport');
                }
                if (state.breakpoints[layout.Breakpoints.Large]) {
                    _this.isDesktop = true;
                    console.log('Matches Large viewport');
                }
                if (state.breakpoints[layout.Breakpoints.XLarge]) {
                    _this.isDesktop = true;
                    console.log('Matches XLarge viewport');
                }
                _this.resetVerticalDisplay();
            });
        };
        ListComponent.prototype.rowClick = function (row, rowIndex, context, event) {
            var _this = this;
            console.log(row);
            console.log(rowIndex);
            console.log(context);
            var actionButton = null;
            if (!CollectionUtils.isEmpty(this._listConfig.actions)) {
                this._listConfig.actions.forEach(function (action) {
                    if (action.identifier == _this._listConfig.rowAction) {
                        actionButton = action;
                    }
                });
                if (actionButton != null) {
                    var actionObj = ButtonUtils.getAction(this._listConfig.identifier, rowIndex, this.widgetArrayIndex, actionButton.identifier, this.parent, event, row, context, null);
                    this.onButtonClick.emit(actionObj);
                }
            }
        };
        ListComponent.prototype.resetVerticalDisplay = function () {
            // if (this._listConfig.mobile && this._listConfig.mobile.displayVertical && this.isMobile) {
            //   this.displayVertical = true;
            // }
        };
        ListComponent.prototype.getButton = function (cell) {
            var buttons = new Array();
            if (!CollectionUtils.isEmpty(cell) && !CollectionUtils.isEmpty(cell.controls)) {
                buttons = cell.controls.filter(function (control) { return control.type == "BUTTON"; } /* BUTTON */).map(function (control) { return control.control; });
            }
            return buttons;
        };
        ListComponent.prototype.onHover = function (event, rowIndex, row) {
            this.hoverRowData = row;
            this.hoverRowIndex = rowIndex;
            this.tooltipPosition.top = event.y;
            this.tooltipPosition.left = event.x;
        };
        ListComponent.prototype.ngOnDestroy = function () {
            if (this.breakpointSubscription) {
                this.breakpointSubscription.unsubscribe();
            }
        };
        return ListComponent;
    }());
    ListComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'cf-list',
                    template: "<p>list works!</p>\n",
                    animations: [
                        animations.trigger('detailExpand', [
                            animations.state('collapsed', animations.style({ height: '0px', minHeight: '0' })),
                            animations.state('expanded', animations.style({ height: '*' })),
                            animations.transition('expanded <=> collapsed', animations.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                        ]),
                    ],
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [""]
                },] }
    ];
    ListComponent.ctorParameters = function () { return [
        { type: ability.Ability },
        { type: layout.BreakpointObserver }
    ]; };
    ListComponent.propDecorators = {
        _listConfig: [{ type: core.Input }],
        listConfig: [{ type: core.Input }],
        _record: [{ type: core.Input }],
        record: [{ type: core.Input }],
        sourceIdentifier: [{ type: core.Input }],
        sourceIndex: [{ type: core.Input }],
        widgetArrayIndex: [{ type: core.Input }],
        originalData: [{ type: core.Input }],
        parent: [{ type: core.Input }],
        _listReset: [{ type: core.Input }],
        listReset: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        keyMap: [{ type: core.Input }],
        onFormChange: [{ type: core.Output }],
        onFieldChange: [{ type: core.Output }],
        onButtonClick: [{ type: core.Output }],
        onPageChange: [{ type: core.Output }],
        onSortChange: [{ type: core.Output }],
        expanded: [{ type: core.Input }],
        expandRowIndex: [{ type: core.Input }],
        contentPage: [{ type: core.ViewChild, args: [paginator.MatPaginator, { static: false },] }],
        contentSort: [{ type: core.ViewChild, args: [sort.MatSort, { static: false },] }]
    };

    var StaticListComponent = /** @class */ (function (_super) {
        __extends(StaticListComponent, _super);
        function StaticListComponent(ability, breakpointObserver) {
            var _this = _super.call(this, ability, breakpointObserver) || this;
            _this.ability = ability;
            _this.breakpointObserver = breakpointObserver;
            window.onscroll = function () { _this.sticky(); };
            return _this;
        }
        StaticListComponent.prototype.ngOnInit = function () {
            this.init();
        };
        StaticListComponent.prototype.isList = function () {
            return this.listConfig.listType == "STATIC" /* STATIC */;
        };
        StaticListComponent.prototype.onSort = function (event) {
            var queryParams = { sorton: event['active'], sortdir: event['direction'] };
            this.expandedRow = null;
            var action = {
                sourceIdentifier: this.sourceIdentifier ? this.sourceIdentifier : this._listConfig.identifier,
                sourceIndex: this.sourceIndex ? this.sourceIndex : 0,
                widgetArrayIndex: this.widgetArrayIndex,
                action: this._listConfig.identifier,
                actionData: queryParams,
                data: this.record,
                originalData: this.record,
                parentHierarchy: this.parent,
                event: event
            };
            console.log(action);
            this.onSortChange.emit(action);
        };
        StaticListComponent.prototype.onPage = function (pageInfo) {
            console.log("scrolled:-", pageInfo);
            var action = {
                sourceIdentifier: this.sourceIdentifier ? this.sourceIdentifier : this._listConfig.identifier,
                sourceIndex: this.sourceIndex ? this.sourceIndex : 0,
                widgetArrayIndex: this.widgetArrayIndex,
                action: this._listConfig.identifier,
                actionData: pageInfo,
                data: this.record,
                originalData: this.record,
                parentHierarchy: this.parent,
                event: pageInfo
            };
            console.log(action);
            this.onPageChange.emit(action);
        };
        StaticListComponent.prototype.ngOnDestroy = function () {
        };
        return StaticListComponent;
    }(ListComponent));
    StaticListComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'cf-static-list',
                    template: "<!-- <pre>\n  {{displayVertical | json}}----\n</pre>  -->\n<mat-card [class.cf-table-hidden]=\"!(_listConfig && isList()) || hideCard || !(_listConfig && _listConfig.header && _listConfig.description && (_listConfig.permission == null || (_listConfig.permission && (_listConfig.permission['subject'] | can: _listConfig.permission['action']))))\">\n  <mat-card-header class=\"cf-list-header\" *ngIf=\"hideHeader == false\">\n    <mat-icon \n      mat-card-avatar  \n      *ngIf=\"_listConfig.header.icon && _listConfig.header.icon.font && iconPosition == 'BEFORE_TITLE'\"\n      aria-hidden=\"false\" \n      [style.margin-top.px]=\"_listConfig.header.subtitle ? 8 : 0\"\n      [attr.aria-label]=\"_listConfig.header.icon.font\">\n      {{ _listConfig.header.icon.font }}\n    </mat-icon>\n\n    <mat-card-title *ngIf=\"_listConfig.header && _listConfig.header.title\">\n      {{_listConfig.header.title}}\n      <mat-icon \n        *ngIf=\"_listConfig.header.icon && _listConfig.header.icon.font && iconPosition == 'AFTER_TITLE'\"\n        aria-hidden=\"false\" [attr.aria-label]=\"_listConfig.header.icon.font\">{{ _listConfig.header.icon.font }}</mat-icon>\n    </mat-card-title>\n    \n    <mat-card-subtitle class=\"cf-list-header-subtitle\" *ngIf=\"_listConfig.header.subtitle\">{{ _listConfig.header.subtitle }}</mat-card-subtitle>\n\n    <div class=\"cf-list-header-buttons\">\n      <cf-button-group \n          [buttons]=\"_listConfig.header.actions\" \n          [sourceIdentifier]=\"sourceIdentifier\"\n          [sourceIndex]=\"sourceIndex\"\n          [widgetArrayIndex]=\"widgetArrayIndex\"\n          [originalData]=\"originalData\"\n          (onClick)=\"buttonClick($event)\">\n      </cf-button-group> \n    </div>\n  </mat-card-header>\n  <mat-card-content>\n    <div class=\"mdc-layout-grid cf-table\" *ngIf=\"_listConfig.description && _listConfig.description.text && _listConfig.description.bgColor\">\n      <div class=\"mdc-layout-grid__inner\">\n        <div class=\"mdc-layout-grid__cell--span-12\">\n          <div \n            class=\"cf-list-header-desc\"\n            [style.background-color]=\"_listConfig.description.bgColor\"\n            [style.color]=\"_listConfig.description.textColor\"\n          >\n            <mat-icon class=\"cf-list-header-desc-icon\" aria-hidden=\"true\" [attr.aria-label]=\"_listConfig.description.icon\" *ngIf=\"_listConfig.description.icon\">{{_listConfig.description.icon}}</mat-icon>\n            <span>{{ _listConfig.description.text }}</span>\n          </div>\n        </div>\n      </div>\n    </div>\n    <mat-divider class=\"cf-list-header-divider\" *ngIf=\"_listConfig.header && _listConfig.description && !_listConfig.description.bgColor\"></mat-divider>\n    <mat-card-subtitle *ngIf=\"_listConfig.description && _listConfig.description.text && !_listConfig.description.bgColor\">{{ _listConfig.description.text }}</mat-card-subtitle>\n  </mat-card-content>\n</mat-card>\n\n<span [class.cf-table-hidden]=\"!(_listConfig && isList()) || hideCard || !(_listConfig && (_listConfig.permission == null || (_listConfig.permission && (_listConfig.permission['subject'] | can: _listConfig.permission['action']))))\">\n    <ng-container *ngTemplateOutlet=\"cftable\"></ng-container>\n</span>\n\n<mat-card [class.cf-table-hidden]=\"hideFooter == true && (!(_listConfig && isList()) || hideCard || !(_listConfig && (_listConfig.permission == null || (_listConfig.permission && (_listConfig.permission['subject'] | can: _listConfig.permission['action'])))))\" *ngIf=\"_listConfig.pagination!='INFINIT_SCROLL'\">\n  <mat-card-actions \n    *ngIf=\"hideFooter == false\"\n    class=\"actions-align-right\" \n    align=\"right\">\n    <mat-paginator \n      [length]=\"_record.total\" \n      [pageSize]=\"limit\"\n      [pageSizeOptions]=\"pageSizeOptions\"\n      (page)=\"onPage($event)\"\n      [ngClass]=\"{'page-wise': _listConfig.pagination=='NO_PAGE'}\"\n      [hidePageSize]=\"_listConfig.pagination=='NO_PAGE'\"\n    ></mat-paginator>\n  </mat-card-actions>\n</mat-card>\n\n<span *ngIf=\"(hideCard && _listConfig && (_listConfig.permission == null || (_listConfig.permission && (_listConfig.permission['subject'] | can: _listConfig.permission['action']))))\">\n  <ng-container *ngTemplateOutlet=\"cftable\"></ng-container>\n</span>\n\n<ng-template #cftable>\n  <span *ngIf=\"!isMobile\">\n    <ng-container *ngTemplateOutlet=\"cftablelist\"></ng-container>\n  </span>\n  <span *ngIf=\"isMobile && _listConfig.mobile\">\n    <ng-container \n      [ngTemplateOutlet]=\"cftablemobile\"\n      [ngTemplateOutletContext]=\"{layout: _listConfig.mobile}\"></ng-container>\n  </span>\n</ng-template>\n\n<ng-template #cftablemobile let-layout=\"layout\">\n  <div class=\"mdc-layout-grid cf-card-list\">\n    <div class=\"mdc-layout-grid__inner\" id=\"mySearch\" *ngIf=\"_listConfig.staticList.hasOnPageFilter\">\n      <div \n        *ngIf=\"_listConfig.staticList.hasOnPageFilter\"\n        class=\"search-mobile-container mdc-layout-grid__cell--span-{{ _listConfig.staticList.hasOnPageFilter && !layout.sorting ? 12 : 9}}\"\n      >\n        <cf-field \n          [sourceType]=\"'FORM'\"\n          [form]=\"commonListForm\" \n          [fieldControl]=\"(commonListForm != undefined && commonListForm.controls['pageFilter']) ? commonListForm.controls['pageFilter'] : null\"\n          [field]=\"filterField\"\n          [hideLabel]=\"true\"\n          [displayMode]=\"'EDIT'\" \n          [value]=\"\"\n          (onFieldChange)=\"updateFilter($event);$event.event.stopPropagation()\"\n          class=\"cf-list-search-field search-mobile\"\n          [style.width.%]=\"100\">\n        </cf-field>  \n        <div> \n          <mat-icon \n            class=\"cf-mobile-filter-icon\" \n            [ngClass]=\"{'rote':this.sortDirection=='desc'}\" \n            [matMenuTriggerFor]=\"filterMenu\" \n            aria-label=\"Filter Menu\"\n          >filter_list</mat-icon>\n          <!-- (click)=\"(sortDirection == 'asc' ? sortDirection = 'desc' : sortDirection = 'asc');_record.rows=_record.rows.reverse();\" -->\n          <mat-menu #filterMenu=\"matMenu\">\n            <button \n              class=\"cf-mobile-filter-link\"\n              *ngFor=\"let sorting of _listConfig.mobile.sorting\" \n              mat-menu-item\n              (click)=\"onSort({'action':sorting.key, 'direction':sorting.direction})\"\n            >{{sorting.label}}</button>\n          </mat-menu>\n        </div>\n      </div>\n    </div>\n\n    <div [ngClass]=\"{'wrapper-a': _listConfig.pagination=='INFINIT_SCROLL'}\" infiniteScroll [infiniteScrollDistance]=\"2\" [infiniteScrollThrottle]=\"1.5\" [infiniteScrollContainer]=\"scrollRow\" #scrollRow (scrolled)=\"onPage($event)\">\n      <!-- <pre>{{_listConfig.mobile.cells | json}}</pre> -->\n      <mat-card class=\"cf-card-mobile\" *ngFor=\"let row of _record.rows; let rowIndex=index\">\n        <mat-card-content>\n          <mat-grid-list [cols]=\"cellCount\" [rowHeight]=\"_listConfig.mobile.rowHeight\">\n            <mat-grid-tile *ngFor=\"let cell of _listConfig.mobile.cells\" [colspan]=\"cell.cols\" [rowspan]=\"cell.rows\">\n              <div class=\"cf-card-mobile-cell\"\n                *ngIf=\"!(cell.displayInline && cell.displayInline.separator && cell.controls && cell.controls.length > 0); else elseValue;\">\n                <ng-container [ngTemplateOutlet]=\"cfCustomCell\"\n                  [ngTemplateOutletContext]=\"{cell:cell, row:row, rowIndex:rowIndex}\"></ng-container>\n              </div>\n              <ng-template #elseValue>\n                <div class=\"cf-card-mobile-cell-inline\">\n                  <ng-container [ngTemplateOutlet]=\"cfCustomCell\"\n                    [ngTemplateOutletContext]=\"{cell:cell, row:row, rowIndex:rowIndex}\"></ng-container>\n                </div>\n              </ng-template>\n            </mat-grid-tile>\n          </mat-grid-list>\n        </mat-card-content>\n      </mat-card>\n    </div>\n  </div>\n</ng-template>\n\n<ng-template #cfCustomRowLayout let-layout=\"layout\" let-row=\"row\" let-rowIndex=\"rowIndex\" let-withCard=\"withCard\"> \n  <mat-card class=\"cf-card-mobile\" *ngIf=\"withCard\">\n    <mat-card-content>\n      <ng-container  \n        [ngTemplateOutlet]=\"cfCustomRow\"\n        [ngTemplateOutletContext]=\"{layout: layout, row: row, rowIndex: rowIndex}\"\n      ></ng-container>\n    </mat-card-content>\n  </mat-card>\n  <span class=\"cf-card-mobile\" *ngIf=\"!withCard\">\n    <ng-container  \n      [ngTemplateOutlet]=\"cfCustomRow\"\n      [ngTemplateOutletContext]=\"{layout: layout, row: row, rowIndex: rowIndex}\"\n    ></ng-container>\n  </span>\n</ng-template>\n\n<ng-template #cfCustomRow let-layout=\"layout\" let-row=\"row\" let-rowIndex=\"rowIndex\"> \n  <mat-grid-list \n      [cols]=\"cellCount\"  \n      [rowHeight]=\"layout.rowHeight\">\n      <mat-grid-tile\n        *ngFor=\"let cell of layout.cells\"\n        [colspan]=\"cell.cols\"\n        [rowspan]=\"cell.rows\">\n        <div class=\"cf-card-mobile-cell\" *ngIf=\"!(cell.displayInline && cell.displayInline.separator && cell.controls && cell.controls.length > 0); else elseValue;\"> \n          <ng-container \n            [ngTemplateOutlet]=\"cfCustomCell\"\n            [ngTemplateOutletContext]=\"{cell:cell, row:row, rowIndex:rowIndex}\"\n          ></ng-container>\n        </div>\n        <ng-template #elseValue>\n          <div class=\"cf-card-mobile-cell-inline\">\n            <ng-container \n              [ngTemplateOutlet]=\"cfCustomCell\"\n              [ngTemplateOutletContext]=\"{cell:cell, row:row, rowIndex:rowIndex}\"\n            ></ng-container>\n          </div>\n        </ng-template>\n      </mat-grid-tile>\n    </mat-grid-list>   \n</ng-template>\n\n<ng-template #cfCustomCell let-cell=\"cell\" let-row=\"row\" let-rowIndex=\"rowIndex\"> \n  <span \n    [ngClass]=\"{'fullwidth': control.fullWidth}\"\n    *ngFor=\"let control of cell.controls; let cControlIndex = index;\">\n    <!-- {{control.control.key}} --> \n    <span \n      class=\"cf-card-mobile-control-separator\"\n      *ngIf=\"cell.displayInline && cell.displayInline.separator && cControlIndex > 0\" \n      [innerHtml]=\"cell.displayInline.separator\"></span>\n\n    <!-- =={{cell.link | json}}--{{cell.linkKey}}--=={{control.control.key}}=={{control.type}}== -->\n    <!-- //{{control.colIndex}}-{{control.cControlIndex}} -->\n    <cf-field\n      *ngIf=\"control.control && (!cell.link || (cell.link && cell.linkKey && cell.linkKey != control.control.key)) && control.type == 'FIELD'\" \n      [sourceType]=\"'LIST'\"\n      [sourceIdentifier]=\"_listConfig.identifier\" \n      [sourceIndex]=\"rowIndex\" \n      [widgetArrayIndex]=\"widgetArrayIndex\"\n      [form]=\"(formIndex == rowIndex && form != undefined) ? form : null\" \n      [fieldControl]=\"(formIndex == rowIndex && form != undefined) ? form.controls[control.control.key] : null\"\n      [field]=\"control.control\"\n      [displayMode]=\"displayModes[rowIndex]\" \n      [hideLabel]=\"true\"\n      [value]=\"getValue(control.colIndex, control.cControlIndex, row, control.control.value)\" \n      class=\"cf-list-field\"\n      [ngClass]=\"{'cf-list-field-disabled': (_listConfig && row && _listConfig.disableRow && _listConfig.disableRow(row)) || disabled, 'cf-primary-text': control.fieldStyle && control.fieldStyle.class == 'PRIMARY', 'cf-secondary-text': control.fieldStyle && control.fieldStyle.class == 'SECONDARY', 'cf-tertiary-text': control.fieldStyle && control.fieldStyle.class == 'TERTIARY'}\"\n      [row]=\"row\"\n      [keyMap]=\"keyMap\"\n      (onFieldChange)=\"fieldChange($event);$event.event && $event.event.stopPropagation ? $event.event.stopPropagation(): ''\">\n    </cf-field>\n    <cf-button\n      *ngIf=\"cell.link && ((cell.linkKey && cell.linkKey == control.control.key) || !cell.linkKey) && control.type == 'FIELD'\" \n      [identifier]=\"'listFieldAsLink'\"\n      [form]=\"(formIndex == rowIndex && form != undefined) ? form : null\"\n      [sourceIdentifier]=\"_listConfig.identifier\"\n      [sourceIndex]=\"rowIndex\"\n      [widgetArrayIndex]=\"widgetArrayIndex\"\n      [button]=\"cell.link\"\n      [label]=\"getValue(control.colIndex, control.cControlIndex, row, control.control.value)\"\n      [context]=\"(formIndex == rowIndex && form != undefined) ? form.value : null\"\n      [originalData]=\"row\"\n      [parentHierarchy]=\"parent\"\n      [disabled]=\"(_listConfig && row && _listConfig.disableRow && _listConfig.disableRow(row)) || disabled\"\n      (onClick)=\"buttonClick($event);$event.event.stopPropagation()\"\n    ></cf-button>\n\n    <!-- [formDisplayMode]=\"formConfig.displayMode\" -->\n    <!-- <cf-button-group \n      [ngClass]=\"{'fullwidth': control.fullWidth}\"\n      *ngIf=\"control.type == 'BUTTON'\"\n      [buttons]=\"control.control\" \n      [form]=\"(formIndex == rowIndex && form != undefined) ? form : null\" \n      [sourceIdentifier]=\"_listConfig.identifier\"\n      [sourceIndex]=\"rowIndex\" \n      [widgetArrayIndex]=\"widgetArrayIndex\"\n      [originalData]=\"row\"\n      [context]=\"(formIndex == rowIndex && form != undefined) ? form.value : null\" \n      (onClick)=\"buttonClick($event)\">\n    </cf-button-group> -->\n\n    <cf-button \n      *ngIf=\"control.type == 'BUTTON'\"\n      [form]=\"(formIndex == rowIndex && form != undefined) ? form : null\"\n      [sourceIdentifier]=\"_listConfig.identifier\"\n      [sourceIndex]=\"rowIndex\" \n      [widgetArrayIndex]=\"widgetArrayIndex\"\n      [button]=\"control.control\"\n      [context]=\"(formIndex == rowIndex && form != undefined) ? form.value : null\" \n      [originalData]=\"row\"\n      [parentHierarchy]=\"parent\" \n      [disabled]=\"(_listConfig && row && _listConfig.disableRow && _listConfig.disableRow(row)) || disabled\"\n      (onClick)=\"setRowEditablity(rowIndex);buttonClick($event);$event.event.stopPropagation()\"\n    ></cf-button> \n  </span>\n</ng-template>\n\n<ng-template #cftablelist>\n  <div class=\"mdc-layout-grid cf-table\">\n    <div class=\"mdc-layout-grid__inner\" *ngIf=\"_listConfig.staticList.hasOnPageFilter || _listConfig.hasColumnSelection\">\n      <div \n        *ngIf=\"_listConfig.staticList.hasOnPageFilter\"\n        class=\"mdc-layout-grid__cell--span-{{ _listConfig.staticList.hasOnPageFilter && !_listConfig.hasColumnSelection ? 12 : 9}}\"\n      >\n        <cf-field \n          [sourceType]=\"'FORM'\"\n          [form]=\"commonListForm\" \n          [fieldControl]=\"(commonListForm != undefined && commonListForm.controls['pageFilter']) ? commonListForm.controls['pageFilter'] : null\"\n          [field]=\"filterField\"\n          [hideLabel]=\"true\"\n          [displayMode]=\"'EDIT'\" \n          [value]=\"\"\n          (onFieldChange)=\"updateFilter($event);$event.event.stopPropagation()\"\n          class=\"cf-list-search-field\"\n          [style.width.%]=\"100\">\n        </cf-field>  \n      </div>\n      <div \n        *ngIf=\"_listConfig.hasColumnSelection\" \n        class=\"mdc-layout-grid__cell--span-{{!_listConfig.staticList.hasOnPageFilter && _listConfig.hasColumnSelection ? 12 : 3}} mdc-layout-grid--align-right\" \n        [style.width.%]=\"100\">\n        <cf-field\n          [sourceType]=\"'FORM'\"\n          [form]=\"commonListForm\" \n          [fieldControl]=\"(commonListForm != undefined && commonListForm.controls['columnSelector']) ? commonListForm.controls['columnSelector'] : null\"\n          [field]=\"columnSelectorField\"\n          [hideLabel]=\"true\"\n          [displayMode]=\"'EDIT'\" \n          class=\"cf-list-sel-col-field\"\n          (onFieldChange)=\"updateColumnDisplay($event)\"\n          [style.width.%]=\"100\">\n        </cf-field>  \n        <!-- ;$event.event.stopPropagation() -->\n      </div>\n    </div>\n    <div class=\"mdc-layout-grid__inner\">\n      <div class=\"mdc-layout-grid__cell--span-12\" *ngIf=\"columnNames\">\n        <table  \n          mat-table  \n          [dataSource]=\"dataSource\" \n          class=\"cf-table\"\n          [ngClass]=\"{'cf-table-hover': _listConfig.shade && _listConfig.shade.type == 'HOVER', 'cf-table-alternate': _listConfig.shade && _listConfig.shade.type == 'ALTERNATE', 'cf-table-without-header': _listConfig.hideHeaderRow}\"\n          multiTemplateDataRows\n          matSort\n          [matSortActive]=\"_listConfig.defaultSort ? _listConfig.defaultSort.column : ''\" \n          matSortDisableClear  \n          [style.width.%]=\"'100'\"\n          [matSortDirection]=\"_listConfig.defaultSort ? _listConfig.defaultSort.order: ''\"\n          (matSortChange)=\"onSort($event)\">\n          \n          <ng-container matColumnDef=\"select\">\n            <th \n              [class.cf-table-header-hidden]=\"_listConfig.hideHeaderRow\"\n              mat-header-cell \n              *matHeaderCellDef \n              class=\"selectable-column\">\n              <mat-checkbox \n                class=\"cf-list-checkbox-selectable\"\n                (change)=\"$event ? masterToggle() : null\"\n                [checked]=\"selection.hasValue() && isAllSelected()\"\n                [indeterminate]=\"selection.hasValue() && !isAllSelected()\"\n                [aria-label]=\"checkboxLabel()\">\n              </mat-checkbox>\n            </th>\n            <td \n              mat-cell \n              *matCellDef=\"let row; let rowIndex = dataIndex\"\n              [style.background-color]=\"rowColors && rowColors[rowIndex] ? rowColors[rowIndex].bgColor : ''\"\n              [style.color]=\"rowColors && rowColors[rowIndex] ? rowColors[rowIndex].textColor : ''\"\n              class=\"selectable-column\">\n              <mat-checkbox \n                class=\"cf-list-checkbox-selectable\"\n                [disabled]=\"(_listConfig && row && _listConfig.disableRow && _listConfig.disableRow(row)) || disabled\"\n                (click)=\"$event.event.stopPropagation()\"\n                (change)=\"$event ? selection.toggle(row) : null\"\n                [checked]=\"selection.isSelected(row)\"\n                [aria-label]=\"checkboxLabel(row)\">\n              </mat-checkbox>\n            </td>\n          </ng-container>\n          \n          <ng-container \n            *ngFor=\"let column of columnConfigs; let colIndex = index\"\n            [matColumnDef]=\"getColumnKey(column)\">\n            <th \n              mat-header-cell \n              *matHeaderCellDef\n              mat-sort-header\n              disableClear\n              [disabled]=\"!column.sortable\"\n              [class.cf-table-header-hidden]=\"_listConfig.hideHeaderRow\"\n              [ngClass]=\"{'cf-list-field-first': colIndex == 0}\"\n              [style.width.%]=\"displayVertical ? '100' : column.width / totalDispalyableWidth * 100\">\n              {{getColumnLabel(column)}}\n            </th> \n            <!-- [attr.data-label]=\"getColumnLabel(column)\" -->\n            <td \n              mat-cell \n              *matCellDef=\"let row; let rowIndex = dataIndex\"\n              class=\"cf-table-data-cell\"\n              [style.background-color]=\"cellColors && cellColors[rowIndex] && cellColors[rowIndex][colIndex] ? cellColors[rowIndex][colIndex].bgColor : ''\"\n              [style.color]=\"cellColors && cellColors[rowIndex] && cellColors[rowIndex][colIndex] ? cellColors[rowIndex][colIndex].textColor : ''\"\n              [style.width.%]=\"displayVertical ? '100' : column.width / totalDispalyableWidth * 100\"\n              (click)=\"_listConfig.rowAction ? rowClick(row, rowIndex, ((formIndex == rowIndex && form != undefined) ? form.value : null), $event) : _listConfig.rowAction\"\n              >\n \n              <ng-container *ngIf=\"column?.template?.html || column?.template?.layout; else elseDefault\">\n                <span *ngIf=\"column?.template?.html\">\n                  <ng-container *cfTemplate=\"'<style>'+column?.template?.css+'</style>' + column?.template?.html; context: {row: row, index: rowIndex}\"></ng-container>\n                </span>\n                <span *ngIf=\"column?.template?.layout\">\n                  <!-- {{row | json}}--- -->\n                  <ng-container  \n                    [ngTemplateOutlet]=\"cfCustomRowLayout\"\n                    [ngTemplateOutletContext]=\"{layout: column.template.layout, row: row, rowIndex: rowIndex, withCard: false}\"\n                  ></ng-container>\n                </span>\n              </ng-container>\n              <ng-template #elseDefault>\n                <div [ngClass]=\"{'cf-list-field-not-first': cFieldIndex > 0, 'cf-list-field-inline': column.displayInline && column.displayInline.separator}\" *ngFor=\"let field of column.fields; let cFieldIndex = index;\">\n                  <span *ngIf=\"column.displayInline && column.displayInline.separator && cFieldIndex > 0\">{{column.displayInline.separator}}</span>\n                  <cf-field\n                    *ngIf=\"!column.link || (column.link && column.linkKey && column.linkKey != field.key)\" \n                    [sourceType]=\"'LIST'\"\n                    [sourceIdentifier]=\"_listConfig.identifier\" \n                    [sourceIndex]=\"rowIndex\" \n                    [widgetArrayIndex]=\"widgetArrayIndex\"\n                    [form]=\"(formIndex == rowIndex && form != undefined) ? form : null\" \n                    [fieldControl]=\"(formIndex == rowIndex && form != undefined) ? form.controls[field.key] : null\"\n                    [field]=\"field\"\n                    [displayMode]=\"displayModes[rowIndex]\" \n                    [hideLabel]=\"true\"\n                    [value]=\"getValue(colIndex, cFieldIndex, row, field.value)\" \n                    class=\"cf-list-field\"\n                    [ngClass]=\"{'cf-list-field-disabled': (_listConfig && row && _listConfig.disableRow && _listConfig.disableRow(row)) || disabled}\"\n                    [row]=\"row\"\n                    [keyMap]=\"keyMap\"\n                    (onFieldChange)=\"fieldChange($event);$event.event && $event.event.stopPropagation ? $event.event.stopPropagation(): ''\">\n                  </cf-field>\n                  <cf-button\n                    *ngIf=\"column.link && ((column.linkKey && column.linkKey == field.key) || !column.linkKey)\" \n                    [identifier]=\"'listFieldAsLink'\"\n                    [form]=\"(formIndex == rowIndex && form != undefined) ? form : null\"\n                    [sourceIdentifier]=\"_listConfig.identifier\"\n                    [sourceIndex]=\"rowIndex\"\n                    [widgetArrayIndex]=\"widgetArrayIndex\"\n                    [button]=\"column.link\"\n                    [label]=\"getValue(colIndex, cFieldIndex, row, field.value)\"\n                    [context]=\"(formIndex == rowIndex && form != undefined) ? form.value : null\"\n                    [originalData]=\"row\"\n                    [parentHierarchy]=\"parent\"\n                    [disabled]=\"(_listConfig && row && _listConfig.disableRow && _listConfig.disableRow(row)) || disabled\"\n                    (onClick)=\"buttonClick($event);$event.event.stopPropagation()\"\n                  ></cf-button>\n                </div>\n              </ng-template>\n            </td>\n          </ng-container>\n      \n          <ng-container matColumnDef=\"expandedRow\"> \n            <td mat-cell *matCellDef=\"let row; let rowIndex = dataIndex\" [attr.colspan]=\"childColumnCount\">\n              <div class=\"cf-element-detail\"\n                  [@detailExpand]=\"row == expandedRow || this._expanded == true ? 'expanded' : 'collapsed'\">\n                <cf-static-list \n                  *ngIf=\"_listConfig.child && _listConfig.child.type == 'LIST' && _listConfig.child.record && (row == expandedRow || _expanded == true)\"\n                  [listConfig]=\"_listConfig.child.record\" \n                  [sourceIdentifier]=\"sourceIdentifier\"\n                  [record]=\"getChildRows(expandedRow)\" \n                  [keyMap]=\"keyMap\"\n                  [expanded]=\"_expanded\"\n                  [listReset]=\"listReset\"\n                  [parent]=\"getObjectTree(row)\"\n                  [style.width.%]=\"100\"\n                  [disabled]=\"(_listConfig && row && _listConfig.disableRow && _listConfig.disableRow(row)) || disabled\"\n                  (onFormChange)=\"formChange($event)\"\n                  (onFieldChange)=\"fieldChange($event);$event.event.stopPropagation()\"\n                  (onButtonClick)=\"buttonClick($event);$event.event.stopPropagation()\"\n                  (onPageChange)=\"onPage($event)\"\n                  (onSortChange)=\"onSort($event)\"  \n                >\n                </cf-static-list>\n                <cf-form\n                    *ngIf=\"_listConfig.child && _listConfig.child.type == 'FORM' && (row == expandedRow || _expanded == true)\"\n                    [formConfig]=\"_listConfig.child.record\"\n                    [sourceIdentifier]=\"_listConfig.identifier\"\n                    [sourceIndex]=\"rowIndex\"\n                    [widgetArrayIndex]=\"widgetArrayIndex\"\n                    [style.width.%]=\"100\"\n                    (onFormChange)=\"formChange($event)\"\n                    (onFieldChange)=\"fieldChange($event)\"\n                    (onButtonClick)=\"buttonClick($event)\"\n                ></cf-form>\n              </div>\n            </td> \n          </ng-container>\n      \n          <ng-container \n            *ngIf=\"_listConfig.actions && _listConfig.actions.length > 0\"\n            matColumnDef=\"action\">\n            <th \n              mat-header-cell \n              *matHeaderCellDef\n              class=\"cf-list-action-col\"\n              [class.cf-table-header-hidden]=\"_listConfig.hideHeaderRow\"\n              [style.width.%]=\"displayVertical ? '100' : _listConfig.actionWidth / totalDispalyableWidth * 100\"\n              >\n              Action\n            </th>\n            <td \n              mat-cell \n              *matCellDef=\"let row; let rowIndex = dataIndex\"\n              class=\"cf-list-action-col\"\n              [style.background-color]=\"rowColors && rowColors[rowIndex] ? rowColors[rowIndex].bgColor : ''\"\n              [style.color]=\"rowColors && rowColors[rowIndex] ? rowColors[rowIndex].textColor : ''\"\n              [style.width.%]=\"displayVertical ? '100' : _listConfig.actionWidth / totalDispalyableWidth * 100\"\n              > \n              <!-- --{{inlineEditButtons[rowIndex].size}} -->\n              <cf-button \n                *ngIf=\"isInlineEditable && inlineEditButtons && inlineEditButtons[rowIndex] && inlineEditButtons[rowIndex].icon\"\n                [form]=\"(formIndex == rowIndex && form != undefined) ? form : null\"\n                [sourceIdentifier]=\"_listConfig.identifier\"\n                [sourceIndex]=\"rowIndex\" \n                [widgetArrayIndex]=\"widgetArrayIndex\"\n                [button]=\"inlineEditButtons[rowIndex]\"\n                class=\"cf-button\"\n                [context]=\"(formIndex == rowIndex && form != undefined) ? form.value : null\" \n                [originalData]=\"row\"\n                [parentHierarchy]=\"parent\" \n                [disabled]=\"(_listConfig && row && _listConfig.disableRow && _listConfig.disableRow(row)) || disabled\"\n                (onClick)=\"setRowEditablity(rowIndex);buttonClick($event);$event.event.stopPropagation()\"\n              ></cf-button> \n              <cf-button-group\n                  *ngIf=\"!isInlineEditable || (inlineEditButtons && inlineEditButtons[rowIndex] && inlineEditButtons[rowIndex].label == 'Cancel')\"\n                  [buttons]=\"_listConfig.actions\"\n                  [form]=\"(formIndex == rowIndex && form != undefined) ? form : null\"\n                  [sourceIdentifier]=\"_listConfig.identifier\"\n                  [sourceIndex]=\"rowIndex\"\n                  [widgetArrayIndex]=\"widgetArrayIndex\"\n                  [context]=\"(formIndex == rowIndex && form != undefined) ? form.value : null\"\n                  [originalData]=\"row\"\n                  [parentHierarchy]=\"parent\"\n                  [disabled]=\"(_listConfig && row && _listConfig.disableRow && _listConfig.disableRow(row)) || disabled\"\n                  (onClick)=\"buttonClick($event);\"\n              ></cf-button-group>\n            </td>\n          </ng-container> \n          <tr \n            mat-header-row \n            *matHeaderRowDef=\"columnNames; sticky: _listConfig.stickyHeader\"\n          ></tr>\n          <div *ngIf=\"(_listConfig.row &&_listConfig.row.hover);else withoutTooltip\">\n            <tr \n              mat-row \n              *matRowDef=\"let row; columns: columnNames; let i = dataIndex;\"\n              [tooltip]=\"rowHoverTemplate\"\n              show-delay=\"300\"\n              [position]=\"tooltipPosition\"\n              [width]=\"_listConfig?.row?.hover?.width\"  \n              theme=\"light\"\n              content-type=\"template\"\n              class=\"cf-row\"\n              [ngClass]=\"{'without-hover': !(_listConfig.row &&_listConfig.row.hover)}\"\n              (mouseenter)=\"onHover($event,i, (_listConfig && _listConfig.child && _listConfig.child.record && expandedRow === row) ? null : row)\" \n              (click)=\"expandedRow = (_listConfig && _listConfig.child && _listConfig.child.record && expandedRow === row) ? null : row\"\n            ></tr>\n          </div>\n\n          <ng-template #withoutTooltip>\n            <tr \n              mat-row \n              *matRowDef=\"let row; columns: columnNames; let i = dataIndex;\"\n              class=\"cf-row\"\n              [ngClass]=\"{'without-hover': !(_listConfig.row &&_listConfig.row.hover)}\"\n              (click)=\"expandedRow = (_listConfig && _listConfig.child && _listConfig.child.record && expandedRow === row) ? null : row\"\n            ></tr>\n          </ng-template>\n          <!-- [tooltip]=\"rowHoverTemplate\"\n          placement=\"bottom\"\n          content-type=\"template\"\n          hideDelayTouchscreen=0\n          hide-delay=100\n          show-delay=100\n          animation-duration=100\n          max-width=_listConfig?.row?.hover?.width\n          display=\"_listConfig.row && _listConfig.row.hover && (_listConfig.row.hover.template || _listConfig.row.hover.layout)\"\n          theme=\"light\"\n           -->\n          <tr  \n            style=\"background-color: aliceblue;\"\n            mat-row  \n            *matRowDef=\"let row; columns: ['expandedRow']\" \n            [ngClass]=\"{'cf-detail-row-hide': !_listConfig.child || !_listConfig.child.record}\"\n            class=\"cf-detail-row\"\n          ></tr>\n        </table>\n      </div>\n    </div>\n  </div>\n</ng-template> \n\n<ng-template #rowHoverTemplate>\n  <div *ngIf=\"_listConfig?.row?.hover && _listConfig.row.hover.template && _listConfig.row.hover.template.component\" [ngStyle]=\"{'width': _listConfig.row.hover.width + 'px'}\">\n    <!-- <ndc-dynamic\n      [ndcDynamicComponent]=\"_listConfig.row.hover.template.component\"\n      [ndcDynamicInputs]=\"hoverRowData\"\n    ></ndc-dynamic> -->\n  </div>\n  <div *ngIf=\"_listConfig?.row?.hover && _listConfig.row.hover.template && _listConfig.row.hover.template.layout\" [ngStyle]=\"{'width': _listConfig.row.hover.width + 'px'}\" class=\"cf-list-hover-tooltip\">\n    <ng-container  \n      [ngTemplateOutlet]=\"cfCustomRowLayout\"\n      [ngTemplateOutletContext]=\"{layout: _listConfig.row.hover.template.layout, row: hoverRowData, rowIndex: hoverRowIndex, withCard: false}\"\n    ></ng-container>\n  </div>\n</ng-template> \n\n<ng-template #rowTemplate>\n  <div *ngIf=\"_listConfig?.row?.template\">\n    <!-- <ndc-dynamic [ndcDynamicComponent]=\"_listConfig.row.template\"></ndc-dynamic> -->\n  </div>\n</ng-template>",
                    animations: [
                        animations.trigger('detailExpand', [
                            animations.state('collapsed', animations.style({ height: '0px', minHeight: '0' })),
                            animations.state('expanded', animations.style({ height: '*' })),
                            animations.transition('expanded <=> collapsed', animations.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                        ]),
                    ],
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [":root{--mdc-layout-grid-column-width-desktop:72px;--mdc-layout-grid-column-width-phone:72px;--mdc-layout-grid-column-width-tablet:72px;--mdc-layout-grid-gutter-desktop:24px;--mdc-layout-grid-gutter-phone:16px;--mdc-layout-grid-gutter-tablet:16px;--mdc-layout-grid-margin-desktop:24px;--mdc-layout-grid-margin-phone:16px;--mdc-layout-grid-margin-tablet:16px}@media (min-width:840px){.mdc-layout-grid{box-sizing:border-box;margin:0 auto;padding:24px;padding:var(--mdc-layout-grid-margin-desktop,24px)}}@media (min-width:600px) and (max-width:839px){.mdc-layout-grid{box-sizing:border-box;margin:0 auto;padding:16px;padding:var(--mdc-layout-grid-margin-tablet,16px)}}@media (max-width:599px){.mdc-layout-grid{box-sizing:border-box;margin:0 auto;padding:16px;padding:var(--mdc-layout-grid-margin-phone,16px)}}@media (min-width:840px){.mdc-layout-grid__inner{align-items:stretch;display:flex;flex-flow:row wrap;margin:-12px;margin:calc(var(--mdc-layout-grid-gutter-desktop, 24px)/2*-1)}@supports (display:grid){.mdc-layout-grid__inner{-ms-grid-columns:(minmax(0,1fr))[12];display:-ms-grid;display:grid;grid-gap:24px;grid-gap:var(--mdc-layout-grid-gutter-desktop,24px);grid-template-columns:repeat(12,minmax(0,1fr));margin:0}}}@media (min-width:600px) and (max-width:839px){.mdc-layout-grid__inner{align-items:stretch;display:flex;flex-flow:row wrap;margin:-8px;margin:calc(var(--mdc-layout-grid-gutter-tablet, 16px)/2*-1)}@supports (display:grid){.mdc-layout-grid__inner{-ms-grid-columns:(minmax(0,1fr))[8];display:-ms-grid;display:grid;grid-gap:16px;grid-gap:var(--mdc-layout-grid-gutter-tablet,16px);grid-template-columns:repeat(8,minmax(0,1fr));margin:0}}}@media (max-width:599px){.mdc-layout-grid__inner{align-items:stretch;display:flex;flex-flow:row wrap;margin:-8px;margin:calc(var(--mdc-layout-grid-gutter-phone, 16px)/2*-1)}@supports (display:grid){.mdc-layout-grid__inner{-ms-grid-columns:(minmax(0,1fr))[4];display:-ms-grid;display:grid;grid-gap:16px;grid-gap:var(--mdc-layout-grid-gutter-phone,16px);grid-template-columns:repeat(4,minmax(0,1fr));margin:0}}}@media (min-width:840px){.mdc-layout-grid__cell{box-sizing:border-box;margin:12px;margin:calc(var(--mdc-layout-grid-gutter-desktop, 24px)/2);width:calc(33.33333% - 24px);width:calc(33.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell{-ms-grid-column-span:4;grid-column-end:span 4;margin:0;width:auto}}.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-desktop{width:calc(8.33333% - 24px);width:calc(8.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-desktop{-ms-grid-column-span:1;grid-column-end:span 1;width:auto}}.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-desktop{width:calc(16.66667% - 24px);width:calc(16.66667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-desktop{-ms-grid-column-span:2;grid-column-end:span 2;width:auto}}.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-desktop{width:calc(25% - 24px);width:calc(25% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-desktop{-ms-grid-column-span:3;grid-column-end:span 3;width:auto}}.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-desktop{width:calc(33.33333% - 24px);width:calc(33.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-desktop{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-desktop{width:calc(41.66667% - 24px);width:calc(41.66667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-desktop{-ms-grid-column-span:5;grid-column-end:span 5;width:auto}}.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-desktop{width:calc(50% - 24px);width:calc(50% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-desktop{-ms-grid-column-span:6;grid-column-end:span 6;width:auto}}.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-desktop{width:calc(58.33333% - 24px);width:calc(58.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-desktop{-ms-grid-column-span:7;grid-column-end:span 7;width:auto}}.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-desktop{width:calc(66.66667% - 24px);width:calc(66.66667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-desktop{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-desktop{width:calc(75% - 24px);width:calc(75% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-desktop{-ms-grid-column-span:9;grid-column-end:span 9;width:auto}}.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-desktop{width:calc(83.33333% - 24px);width:calc(83.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-desktop{-ms-grid-column-span:10;grid-column-end:span 10;width:auto}}.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-desktop{width:calc(91.66667% - 24px);width:calc(91.66667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-desktop{-ms-grid-column-span:11;grid-column-end:span 11;width:auto}}.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-desktop{width:calc(100% - 24px);width:calc(100% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-desktop{-ms-grid-column-span:12;grid-column-end:span 12;width:auto}}}@media (min-width:600px) and (max-width:839px){.mdc-layout-grid__cell{box-sizing:border-box;margin:8px;margin:calc(var(--mdc-layout-grid-gutter-tablet, 16px)/2);width:calc(50% - 16px);width:calc(50% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell{-ms-grid-column-span:4;grid-column-end:span 4;margin:0;width:auto}}.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-tablet{width:calc(12.5% - 16px);width:calc(12.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-tablet{-ms-grid-column-span:1;grid-column-end:span 1;width:auto}}.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-tablet{width:calc(25% - 16px);width:calc(25% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-tablet{-ms-grid-column-span:2;grid-column-end:span 2;width:auto}}.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-tablet{width:calc(37.5% - 16px);width:calc(37.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-tablet{-ms-grid-column-span:3;grid-column-end:span 3;width:auto}}.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-tablet{width:calc(50% - 16px);width:calc(50% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-tablet{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-tablet{width:calc(62.5% - 16px);width:calc(62.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-tablet{-ms-grid-column-span:5;grid-column-end:span 5;width:auto}}.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-tablet{width:calc(75% - 16px);width:calc(75% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-tablet{-ms-grid-column-span:6;grid-column-end:span 6;width:auto}}.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-tablet{width:calc(87.5% - 16px);width:calc(87.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-tablet{-ms-grid-column-span:7;grid-column-end:span 7;width:auto}}.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}}@media (max-width:599px){.mdc-layout-grid__cell{box-sizing:border-box;margin:8px;margin:calc(var(--mdc-layout-grid-gutter-phone, 16px)/2);width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell{-ms-grid-column-span:4;grid-column-end:span 4;margin:0;width:auto}}.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-phone{width:calc(25% - 16px);width:calc(25% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-phone{-ms-grid-column-span:1;grid-column-end:span 1;width:auto}}.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-phone{width:calc(50% - 16px);width:calc(50% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-phone{-ms-grid-column-span:2;grid-column-end:span 2;width:auto}}.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-phone{width:calc(75% - 16px);width:calc(75% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-phone{-ms-grid-column-span:3;grid-column-end:span 3;width:auto}}.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}}.mdc-layout-grid__cell--order-1{order:1}.mdc-layout-grid__cell--order-2{order:2}.mdc-layout-grid__cell--order-3{order:3}.mdc-layout-grid__cell--order-4{order:4}.mdc-layout-grid__cell--order-5{order:5}.mdc-layout-grid__cell--order-6{order:6}.mdc-layout-grid__cell--order-7{order:7}.mdc-layout-grid__cell--order-8{order:8}.mdc-layout-grid__cell--order-9{order:9}.mdc-layout-grid__cell--order-10{order:10}.mdc-layout-grid__cell--order-11{order:11}.mdc-layout-grid__cell--order-12{order:12}.mdc-layout-grid__cell--align-top{align-self:flex-start}@supports (display:grid){.mdc-layout-grid__cell--align-top{-ms-grid-row-align:start;align-self:start}}.mdc-layout-grid__cell--align-middle{-ms-grid-row-align:center;align-self:center}.mdc-layout-grid__cell--align-bottom{align-self:flex-end}@supports (display:grid){.mdc-layout-grid__cell--align-bottom{-ms-grid-row-align:end;align-self:end}}@media (min-width:840px){.mdc-layout-grid--fixed-column-width{width:1176px;width:calc(var(--mdc-layout-grid-column-width-desktop, 72px)*12 + var(--mdc-layout-grid-gutter-desktop, 24px)*11 + var(--mdc-layout-grid-margin-desktop, 24px)*2)}}@media (min-width:600px) and (max-width:839px){.mdc-layout-grid--fixed-column-width{width:720px;width:calc(var(--mdc-layout-grid-column-width-tablet, 72px)*8 + var(--mdc-layout-grid-gutter-tablet, 16px)*7 + var(--mdc-layout-grid-margin-tablet, 16px)*2)}}@media (max-width:599px){.mdc-layout-grid--fixed-column-width{width:368px;width:calc(var(--mdc-layout-grid-column-width-phone, 72px)*4 + var(--mdc-layout-grid-gutter-phone, 16px)*3 + var(--mdc-layout-grid-margin-phone, 16px)*2)}}.mdc-layout-grid--align-left{margin-left:0;margin-right:auto}.mdc-layout-grid--align-right{margin-left:auto;margin-right:0}.cf-list-header .mat-card-header-text{margin:0!important}.cf-list-header .mat-card-title{margin-top:6px}.cf-list-header .mat-card-avatar{font-size:40px;padding-right:8px}.cf-list-header-subtitle .mat-card-subtitle,.mat-card-subtitle{padding-top:0!important}.cf-list-header-buttons{position:absolute;right:5px;top:5px}.cf-table-header-hidden,.cf-table-hidden{display:none!important}.cf-table-without-header thead,.cf-table-without-header tr.mat-header-row{height:0!important}table{width:100%}.cf-table{padding:0!important}td,th{max-width:200px;white-space:normal;word-wrap:break-word}.cf-element-detail{border-left:2px groove #f5f5f5;display:flex;overflow:hidden;padding-right:3px;width:100%}.cf-list-action-col{text-align:right!important}tr.cf-detail-row{background-color:#f5f5f5;height:0!important}tr.cf-detail-row-hide{display:none!important}.sticky{position:-webkit-sticky;position:sticky}.selectable-column{padding-right:1%}.rote{transform:rotateX(180deg)}.cf-element-detail>th.mat-header-cell:last-of-type,td.mat-cell:last-of-type,td.mat-footer-cell:last-of-type{padding-right:0!important}.mat-card-content{margin-bottom:0!important}.cf-list-header-desc{margin:5px 0 5px 15px;padding:5px 10px;width:auto}.cf-list-header-desc-icon{font-size:15px;height:15px;margin-top:0;padding:0 5px 0 0;width:15px}.cf-table-alternate tr.mat-row:nth-child(odd),.cf-table-hover tr.mat-row:hover{background:#f5f5f5}.cf-table-alternate tr.mat-row:not(:nth-child(4n+1)){background:#fff}.cf-table-data-cell{padding:0 10px 0 0!important}.cf-list-field .mat-form-field-appearance-standard .mat-form-field-flex{padding-top:0}.cf-list-field-not-first{padding-top:5px}.cf-list-field-first{padding-left:0!important}.cf-list-field-disabled{color:rgba(0,0,0,.5411764705882353)}.cf-list-checkbox-selectable{padding-right:12px}.cf-list-field-inline{display:inline}@media screen and (max-width:599px){.mat-table{border:0;vertical-align:middle}.mat-table caption{font-size:1em}.mat-table .mat-header-row{display:none}.mat-table .mat-header-cell{border:10px solid;clip:rect(0 0 0 0);height:1px;margin:-1px;padding:0;position:absolute;width:1px}.mat-table .mat-row{border-bottom:5px solid #ddd;display:block;height:unset}.mat-table .mat-cell{display:block;font-size:1em;font-weight:700;margin-bottom:4%;min-height:48px}.mat-table .mat-cell:before{content:attr(data-label);float:left;font-size:.85em;font-weight:400}.mat-table .mat-cell:last-child{border-bottom:0}.mat-table .mat-cell:first-child{margin-top:4%}.mat-table .mat-row td{max-width:unset}}.cf-card-list{padding:0}.cf-card-list mat-card{padding:8px}.cf-card-mobile{margin-bottom:12px;word-wrap:break-word}.cf-card-mobile .mat-grid-tile .mat-figure{justify-content:unset}.cf-card-mobile .cf-primary-text .cf-field-value{font-size:18px;font-weight:400;margin-bottom:none}.cf-card-mobile .cf-secondary-text .cf-field-value{font-size:14px;font-weight:300;margin-bottom:none;margin-top:4px}.cf-card-mobile .cf-tertiary-text .cf-field-value{font-size:12px;font-weight:300;margin-bottom:none;margin-top:8px}.cf-card-mobile .cf-card-mobile-cell{display:block;width:100%}.cf-card-mobile .cf-card-mobile-cell .fullwidth button{width:100%}.cf-card-mobile .cf-card-mobile-cell .cf-primary-text .cf-field-value,.cf-card-mobile .cf-card-mobile-cell .cf-secondary-text .cf-field-value,.cf-card-mobile .cf-card-mobile-cell .cf-tertiary-text .cf-field-value{display:block}.cf-card-mobile .cf-card-mobile-cell .fullwidth button,.cf-card-mobile .cf-card-mobile-cell .fullwidth mat-chip{width:100%}.cf-card-mobile .cf-card-mobile-cell-inline{display:inline-block;width:100%}.cf-card-mobile .cf-card-mobile-cell-inline .cf-card-mobile-control-separator{padding:4px}.hover-template{display:none;position:absolute;z-index:9999}.cf-row:hover .without-hover{pointer-events:none}.wrapper-a{height:69vh;overflow-y:auto}.search-mobile{margin-right:10px}.search-mobile-container{display:flex}.sticky{background:#fff;border-bottom:1px solid #d3cece;left:0;margin:0 auto;padding:10px 20px;position:fixed;right:0;top:0;width:88%;z-index:99}.sticky+.content{padding-top:102px}.cf-mobile-filter-icon{padding-top:8px}.cf-mobile-filter-link{text-align:end}.cf-list-hover-tooltip{padding:8px}"]
                },] }
    ];
    StaticListComponent.ctorParameters = function () { return [
        { type: ability.Ability },
        { type: layout.BreakpointObserver }
    ]; };

    var DynamicListComponent = /** @class */ (function (_super) {
        __extends(DynamicListComponent, _super);
        function DynamicListComponent(ability, breakpointObserver) {
            var _this = _super.call(this, ability, breakpointObserver) || this;
            _this.ability = ability;
            _this.breakpointObserver = breakpointObserver;
            window.onscroll = function () { _this.sticky(); };
            return _this;
        }
        DynamicListComponent.prototype.ngOnInit = function () {
            this.init();
        };
        DynamicListComponent.prototype.isList = function () {
            return this._listConfig.listType == "DYNAMIC" /* DYNAMIC */;
        };
        DynamicListComponent.prototype.onSort = function (event) {
            var queryParams = { sorton: event['active'], sortdir: event['direction'] };
            var action = {
                sourceIdentifier: this.sourceIdentifier ? this.sourceIdentifier : this._listConfig.identifier,
                sourceIndex: this.sourceIndex ? this.sourceIndex : 0,
                widgetArrayIndex: this.widgetArrayIndex,
                action: this._listConfig.identifier,
                actionData: queryParams,
                data: this.record,
                originalData: this.record,
                parentHierarchy: this.parent,
                event: event
            };
            console.log(action);
            this.onSortChange.emit(action);
        };
        DynamicListComponent.prototype.onPage = function (pageInfo) {
            console.log(pageInfo);
            var action = {
                sourceIdentifier: this.sourceIdentifier ? this.sourceIdentifier : this._listConfig.identifier,
                sourceIndex: this.sourceIndex ? this.sourceIndex : 0,
                widgetArrayIndex: this.widgetArrayIndex,
                action: this._listConfig.identifier,
                actionData: pageInfo,
                data: this.record,
                originalData: this.record,
                parentHierarchy: this.parent,
                event: pageInfo
            };
            console.log(action);
            this.onPageChange.emit(action);
        };
        return DynamicListComponent;
    }(ListComponent));
    DynamicListComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'cf-dynamic-list',
                    template: "<!-- <pre>\n  {{displayVertical | json}}----\n</pre>  -->\n<mat-card [class.cf-table-hidden]=\"!(_listConfig && isList()) || hideCard || !(_listConfig && _listConfig.header && _listConfig.description && (_listConfig.permission == null || (_listConfig.permission && (_listConfig.permission['subject'] | can: _listConfig.permission['action']))))\">\n  <mat-card-header class=\"cf-list-header\" *ngIf=\"hideHeader == false\">\n    <mat-icon \n      mat-card-avatar  \n      *ngIf=\"_listConfig.header.icon && _listConfig.header.icon.font && iconPosition == 'BEFORE_TITLE'\"\n      aria-hidden=\"false\" \n      [style.margin-top.px]=\"_listConfig.header.subtitle ? 8 : 0\"\n      [attr.aria-label]=\"_listConfig.header.icon.font\">\n      {{ _listConfig.header.icon.font }}\n    </mat-icon>\n\n    <mat-card-title *ngIf=\"_listConfig.header && _listConfig.header.title\">\n      {{_listConfig.header.title}}\n      <mat-icon \n        *ngIf=\"_listConfig.header.icon && _listConfig.header.icon.font && iconPosition == 'AFTER_TITLE'\"\n        aria-hidden=\"false\" [attr.aria-label]=\"_listConfig.header.icon.font\">{{ _listConfig.header.icon.font }}</mat-icon>\n    </mat-card-title>\n    \n    <mat-card-subtitle class=\"cf-list-header-subtitle\" *ngIf=\"_listConfig.header.subtitle\">{{ _listConfig.header.subtitle }}</mat-card-subtitle>\n\n    <div class=\"cf-list-header-buttons\">\n      <cf-button-group \n          [buttons]=\"_listConfig.header.actions\" \n          [sourceIdentifier]=\"sourceIdentifier\"\n          [sourceIndex]=\"sourceIndex\"\n          [widgetArrayIndex]=\"widgetArrayIndex\"\n          [originalData]=\"originalData\"\n          (onClick)=\"buttonClick($event)\">\n      </cf-button-group> \n    </div>\n  </mat-card-header>\n  <mat-card-content>\n    <div class=\"mdc-layout-grid cf-table\" *ngIf=\"_listConfig.description && _listConfig.description.text && _listConfig.description.bgColor\">\n      <div class=\"mdc-layout-grid__inner\">\n        <div class=\"mdc-layout-grid__cell--span-12\">\n          <div \n            class=\"cf-list-header-desc\"\n            [style.background-color]=\"_listConfig.description.bgColor\"\n            [style.color]=\"_listConfig.description.textColor\"\n          >\n            <mat-icon class=\"cf-list-header-desc-icon\" aria-hidden=\"true\" [attr.aria-label]=\"_listConfig.description.icon\" *ngIf=\"_listConfig.description.icon\">{{_listConfig.description.icon}}</mat-icon>\n            <span>{{ _listConfig.description.text }}</span>\n          </div>\n        </div>\n      </div>\n    </div>\n    <mat-divider class=\"cf-list-header-divider\" *ngIf=\"_listConfig.header && _listConfig.description && !_listConfig.description.bgColor\"></mat-divider>\n    <mat-card-subtitle *ngIf=\"_listConfig.description && _listConfig.description.text && !_listConfig.description.bgColor\">{{ _listConfig.description.text }}</mat-card-subtitle>\n  </mat-card-content>\n</mat-card>\n\n<span [class.cf-table-hidden]=\"!(_listConfig && isList()) || hideCard || !(_listConfig && (_listConfig.permission == null || (_listConfig.permission && (_listConfig.permission['subject'] | can: _listConfig.permission['action']))))\">\n    <ng-container *ngTemplateOutlet=\"cftable\"></ng-container>\n</span>\n\n<mat-card [class.cf-table-hidden]=\"hideFooter == true && (!(_listConfig && isList()) || hideCard || !(_listConfig && (_listConfig.permission == null || (_listConfig.permission && (_listConfig.permission['subject'] | can: _listConfig.permission['action'])))))\" *ngIf=\"_listConfig.pagination!='INFINIT_SCROLL'\">\n  <mat-card-actions \n    *ngIf=\"hideFooter == false\"\n    class=\"actions-align-right\" \n    align=\"right\">\n    <mat-paginator \n      [length]=\"_record.total\" \n      [pageSize]=\"limit\"\n      [pageSizeOptions]=\"pageSizeOptions\"\n      (page)=\"onPage($event)\"\n      [ngClass]=\"{'page-wise': _listConfig.pagination=='NO_PAGE'}\"\n      [hidePageSize]=\"_listConfig.pagination=='NO_PAGE'\"\n    ></mat-paginator>\n  </mat-card-actions>\n</mat-card>\n\n<span *ngIf=\"(hideCard && _listConfig && (_listConfig.permission == null || (_listConfig.permission && (_listConfig.permission['subject'] | can: _listConfig.permission['action']))))\">\n  <ng-container *ngTemplateOutlet=\"cftable\"></ng-container>\n</span>\n\n<ng-template #cftable>\n  <span *ngIf=\"!isMobile\">\n    <ng-container *ngTemplateOutlet=\"cftablelist\"></ng-container>\n  </span>\n  <span *ngIf=\"isMobile && _listConfig.mobile\">\n    <ng-container \n      [ngTemplateOutlet]=\"cftablemobile\"\n      [ngTemplateOutletContext]=\"{layout: _listConfig.mobile}\"></ng-container>\n  </span>\n</ng-template>\n\n<ng-template #cftablemobile let-layout=\"layout\">\n  <div class=\"mdc-layout-grid cf-card-list\">\n    <div class=\"mdc-layout-grid__inner\" id=\"mySearch\" *ngIf=\"_listConfig.staticList.hasOnPageFilter\">\n      <div \n        *ngIf=\"_listConfig.staticList.hasOnPageFilter\"\n        class=\"search-mobile-container mdc-layout-grid__cell--span-{{ _listConfig.staticList.hasOnPageFilter && !layout.sorting ? 12 : 9}}\"\n      >\n        <cf-field \n          [sourceType]=\"'FORM'\"\n          [form]=\"commonListForm\" \n          [fieldControl]=\"(commonListForm != undefined && commonListForm.controls['pageFilter']) ? commonListForm.controls['pageFilter'] : null\"\n          [field]=\"filterField\"\n          [hideLabel]=\"true\"\n          [displayMode]=\"'EDIT'\" \n          [value]=\"\"\n          (onFieldChange)=\"updateFilter($event);$event.event.stopPropagation()\"\n          class=\"cf-list-search-field search-mobile\"\n          [style.width.%]=\"100\">\n        </cf-field>  \n        <div> \n          <mat-icon \n            class=\"cf-mobile-filter-icon\" \n            [ngClass]=\"{'rote':this.sortDirection=='desc'}\" \n            [matMenuTriggerFor]=\"filterMenu\" \n            aria-label=\"Filter Menu\"\n          >filter_list</mat-icon>\n          <!-- (click)=\"(sortDirection == 'asc' ? sortDirection = 'desc' : sortDirection = 'asc');_record.rows=_record.rows.reverse();\" -->\n          <mat-menu #filterMenu=\"matMenu\">\n            <button \n              class=\"cf-mobile-filter-link\"\n              *ngFor=\"let sorting of _listConfig.mobile.sorting\" \n              mat-menu-item\n              (click)=\"onSort({'action':sorting.key, 'direction':sorting.direction})\"\n            >{{sorting.label}}</button>\n          </mat-menu>\n        </div>\n      </div>\n    </div>\n\n    <div [ngClass]=\"{'wrapper-a': _listConfig.pagination=='INFINIT_SCROLL'}\" infiniteScroll [infiniteScrollDistance]=\"2\" [infiniteScrollThrottle]=\"1.5\" [infiniteScrollContainer]=\"scrollRow\" #scrollRow (scrolled)=\"onPage($event)\">\n      <!-- <pre>{{_listConfig.mobile.cells | json}}</pre> -->\n      <mat-card class=\"cf-card-mobile\" *ngFor=\"let row of _record.rows; let rowIndex=index\">\n        <mat-card-content>\n          <mat-grid-list [cols]=\"cellCount\" [rowHeight]=\"_listConfig.mobile.rowHeight\">\n            <mat-grid-tile *ngFor=\"let cell of _listConfig.mobile.cells\" [colspan]=\"cell.cols\" [rowspan]=\"cell.rows\">\n              <div class=\"cf-card-mobile-cell\"\n                *ngIf=\"!(cell.displayInline && cell.displayInline.separator && cell.controls && cell.controls.length > 0); else elseValue;\">\n                <ng-container [ngTemplateOutlet]=\"cfCustomCell\"\n                  [ngTemplateOutletContext]=\"{cell:cell, row:row, rowIndex:rowIndex}\"></ng-container>\n              </div>\n              <ng-template #elseValue>\n                <div class=\"cf-card-mobile-cell-inline\">\n                  <ng-container [ngTemplateOutlet]=\"cfCustomCell\"\n                    [ngTemplateOutletContext]=\"{cell:cell, row:row, rowIndex:rowIndex}\"></ng-container>\n                </div>\n              </ng-template>\n            </mat-grid-tile>\n          </mat-grid-list>\n        </mat-card-content>\n      </mat-card>\n    </div>\n  </div>\n</ng-template>\n\n<ng-template #cfCustomRowLayout let-layout=\"layout\" let-row=\"row\" let-rowIndex=\"rowIndex\" let-withCard=\"withCard\"> \n  <mat-card class=\"cf-card-mobile\" *ngIf=\"withCard\">\n    <mat-card-content>\n      <ng-container  \n        [ngTemplateOutlet]=\"cfCustomRow\"\n        [ngTemplateOutletContext]=\"{layout: layout, row: row, rowIndex: rowIndex}\"\n      ></ng-container>\n    </mat-card-content>\n  </mat-card>\n  <span class=\"cf-card-mobile\" *ngIf=\"!withCard\">\n    <ng-container  \n      [ngTemplateOutlet]=\"cfCustomRow\"\n      [ngTemplateOutletContext]=\"{layout: layout, row: row, rowIndex: rowIndex}\"\n    ></ng-container>\n  </span>\n</ng-template>\n\n<ng-template #cfCustomRow let-layout=\"layout\" let-row=\"row\" let-rowIndex=\"rowIndex\"> \n  <mat-grid-list \n      [cols]=\"cellCount\"  \n      [rowHeight]=\"layout.rowHeight\">\n      <mat-grid-tile\n        *ngFor=\"let cell of layout.cells\"\n        [colspan]=\"cell.cols\"\n        [rowspan]=\"cell.rows\">\n        <div class=\"cf-card-mobile-cell\" *ngIf=\"!(cell.displayInline && cell.displayInline.separator && cell.controls && cell.controls.length > 0); else elseValue;\"> \n          <ng-container \n            [ngTemplateOutlet]=\"cfCustomCell\"\n            [ngTemplateOutletContext]=\"{cell:cell, row:row, rowIndex:rowIndex}\"\n          ></ng-container>\n        </div>\n        <ng-template #elseValue>\n          <div class=\"cf-card-mobile-cell-inline\">\n            <ng-container \n              [ngTemplateOutlet]=\"cfCustomCell\"\n              [ngTemplateOutletContext]=\"{cell:cell, row:row, rowIndex:rowIndex}\"\n            ></ng-container>\n          </div>\n        </ng-template>\n      </mat-grid-tile>\n    </mat-grid-list>   \n</ng-template>\n\n<ng-template #cfCustomCell let-cell=\"cell\" let-row=\"row\" let-rowIndex=\"rowIndex\"> \n  <span \n    [ngClass]=\"{'fullwidth': control.fullWidth}\"\n    *ngFor=\"let control of cell.controls; let cControlIndex = index;\">\n    <!-- {{control.control.key}} --> \n    <span \n      class=\"cf-card-mobile-control-separator\"\n      *ngIf=\"cell.displayInline && cell.displayInline.separator && cControlIndex > 0\" \n      [innerHtml]=\"cell.displayInline.separator\"></span>\n\n    <!-- =={{cell.link | json}}--{{cell.linkKey}}--=={{control.control.key}}=={{control.type}}== -->\n    <!-- //{{control.colIndex}}-{{control.cControlIndex}} -->\n    <cf-field\n      *ngIf=\"control.control && (!cell.link || (cell.link && cell.linkKey && cell.linkKey != control.control.key)) && control.type == 'FIELD'\" \n      [sourceType]=\"'LIST'\"\n      [sourceIdentifier]=\"_listConfig.identifier\" \n      [sourceIndex]=\"rowIndex\" \n      [widgetArrayIndex]=\"widgetArrayIndex\"\n      [form]=\"(formIndex == rowIndex && form != undefined) ? form : null\" \n      [fieldControl]=\"(formIndex == rowIndex && form != undefined) ? form.controls[control.control.key] : null\"\n      [field]=\"control.control\"\n      [displayMode]=\"displayModes[rowIndex]\" \n      [hideLabel]=\"true\"\n      [value]=\"getValue(control.colIndex, control.cControlIndex, row, control.control.value)\" \n      class=\"cf-list-field\"\n      [ngClass]=\"{'cf-list-field-disabled': (_listConfig && row && _listConfig.disableRow && _listConfig.disableRow(row)) || disabled, 'cf-primary-text': control.fieldStyle && control.fieldStyle.class == 'PRIMARY', 'cf-secondary-text': control.fieldStyle && control.fieldStyle.class == 'SECONDARY', 'cf-tertiary-text': control.fieldStyle && control.fieldStyle.class == 'TERTIARY'}\"\n      [row]=\"row\"\n      [keyMap]=\"keyMap\"\n      (onFieldChange)=\"fieldChange($event);$event.event && $event.event.stopPropagation ? $event.event.stopPropagation(): ''\">\n    </cf-field>\n    <cf-button\n      *ngIf=\"cell.link && ((cell.linkKey && cell.linkKey == control.control.key) || !cell.linkKey) && control.type == 'FIELD'\" \n      [identifier]=\"'listFieldAsLink'\"\n      [form]=\"(formIndex == rowIndex && form != undefined) ? form : null\"\n      [sourceIdentifier]=\"_listConfig.identifier\"\n      [sourceIndex]=\"rowIndex\"\n      [widgetArrayIndex]=\"widgetArrayIndex\"\n      [button]=\"cell.link\"\n      [label]=\"getValue(control.colIndex, control.cControlIndex, row, control.control.value)\"\n      [context]=\"(formIndex == rowIndex && form != undefined) ? form.value : null\"\n      [originalData]=\"row\"\n      [parentHierarchy]=\"parent\"\n      [disabled]=\"(_listConfig && row && _listConfig.disableRow && _listConfig.disableRow(row)) || disabled\"\n      (onClick)=\"buttonClick($event);$event.event.stopPropagation()\"\n    ></cf-button>\n\n    <!-- [formDisplayMode]=\"formConfig.displayMode\" -->\n    <!-- <cf-button-group \n      [ngClass]=\"{'fullwidth': control.fullWidth}\"\n      *ngIf=\"control.type == 'BUTTON'\"\n      [buttons]=\"control.control\" \n      [form]=\"(formIndex == rowIndex && form != undefined) ? form : null\" \n      [sourceIdentifier]=\"_listConfig.identifier\"\n      [sourceIndex]=\"rowIndex\" \n      [widgetArrayIndex]=\"widgetArrayIndex\"\n      [originalData]=\"row\"\n      [context]=\"(formIndex == rowIndex && form != undefined) ? form.value : null\" \n      (onClick)=\"buttonClick($event)\">\n    </cf-button-group> -->\n\n    <cf-button \n      *ngIf=\"control.type == 'BUTTON'\"\n      [form]=\"(formIndex == rowIndex && form != undefined) ? form : null\"\n      [sourceIdentifier]=\"_listConfig.identifier\"\n      [sourceIndex]=\"rowIndex\" \n      [widgetArrayIndex]=\"widgetArrayIndex\"\n      [button]=\"control.control\"\n      [context]=\"(formIndex == rowIndex && form != undefined) ? form.value : null\" \n      [originalData]=\"row\"\n      [parentHierarchy]=\"parent\" \n      [disabled]=\"(_listConfig && row && _listConfig.disableRow && _listConfig.disableRow(row)) || disabled\"\n      (onClick)=\"setRowEditablity(rowIndex);buttonClick($event);$event.event.stopPropagation()\"\n    ></cf-button> \n  </span>\n</ng-template>\n\n<ng-template #cftablelist>\n  <div class=\"mdc-layout-grid cf-table\">\n    <div class=\"mdc-layout-grid__inner\" *ngIf=\"_listConfig.staticList.hasOnPageFilter || _listConfig.hasColumnSelection\">\n      <div \n        *ngIf=\"_listConfig.staticList.hasOnPageFilter\"\n        class=\"mdc-layout-grid__cell--span-{{ _listConfig.staticList.hasOnPageFilter && !_listConfig.hasColumnSelection ? 12 : 9}}\"\n      >\n        <cf-field \n          [sourceType]=\"'FORM'\"\n          [form]=\"commonListForm\" \n          [fieldControl]=\"(commonListForm != undefined && commonListForm.controls['pageFilter']) ? commonListForm.controls['pageFilter'] : null\"\n          [field]=\"filterField\"\n          [hideLabel]=\"true\"\n          [displayMode]=\"'EDIT'\" \n          [value]=\"\"\n          (onFieldChange)=\"updateFilter($event);$event.event.stopPropagation()\"\n          class=\"cf-list-search-field\"\n          [style.width.%]=\"100\">\n        </cf-field>  \n      </div>\n      <div \n        *ngIf=\"_listConfig.hasColumnSelection\" \n        class=\"mdc-layout-grid__cell--span-{{!_listConfig.staticList.hasOnPageFilter && _listConfig.hasColumnSelection ? 12 : 3}} mdc-layout-grid--align-right\" \n        [style.width.%]=\"100\">\n        <cf-field\n          [sourceType]=\"'FORM'\"\n          [form]=\"commonListForm\" \n          [fieldControl]=\"(commonListForm != undefined && commonListForm.controls['columnSelector']) ? commonListForm.controls['columnSelector'] : null\"\n          [field]=\"columnSelectorField\"\n          [hideLabel]=\"true\"\n          [displayMode]=\"'EDIT'\" \n          class=\"cf-list-sel-col-field\"\n          (onFieldChange)=\"updateColumnDisplay($event)\"\n          [style.width.%]=\"100\">\n        </cf-field>  \n        <!-- ;$event.event.stopPropagation() -->\n      </div>\n    </div>\n    <div class=\"mdc-layout-grid__inner\">\n      <div class=\"mdc-layout-grid__cell--span-12\" *ngIf=\"columnNames\">\n        <table  \n          mat-table  \n          [dataSource]=\"dataSource\" \n          class=\"cf-table\"\n          [ngClass]=\"{'cf-table-hover': _listConfig.shade && _listConfig.shade.type == 'HOVER', 'cf-table-alternate': _listConfig.shade && _listConfig.shade.type == 'ALTERNATE', 'cf-table-without-header': _listConfig.hideHeaderRow}\"\n          multiTemplateDataRows\n          matSort\n          [matSortActive]=\"_listConfig.defaultSort ? _listConfig.defaultSort.column : ''\" \n          matSortDisableClear  \n          [style.width.%]=\"'100'\"\n          [matSortDirection]=\"_listConfig.defaultSort ? _listConfig.defaultSort.order: ''\"\n          (matSortChange)=\"onSort($event)\">\n          \n          <ng-container matColumnDef=\"select\">\n            <th \n              [class.cf-table-header-hidden]=\"_listConfig.hideHeaderRow\"\n              mat-header-cell \n              *matHeaderCellDef \n              class=\"selectable-column\">\n              <mat-checkbox \n                class=\"cf-list-checkbox-selectable\"\n                (change)=\"$event ? masterToggle() : null\"\n                [checked]=\"selection.hasValue() && isAllSelected()\"\n                [indeterminate]=\"selection.hasValue() && !isAllSelected()\"\n                [aria-label]=\"checkboxLabel()\">\n              </mat-checkbox>\n            </th>\n            <td \n              mat-cell \n              *matCellDef=\"let row; let rowIndex = dataIndex\"\n              [style.background-color]=\"rowColors && rowColors[rowIndex] ? rowColors[rowIndex].bgColor : ''\"\n              [style.color]=\"rowColors && rowColors[rowIndex] ? rowColors[rowIndex].textColor : ''\"\n              class=\"selectable-column\">\n              <mat-checkbox \n                class=\"cf-list-checkbox-selectable\"\n                [disabled]=\"(_listConfig && row && _listConfig.disableRow && _listConfig.disableRow(row)) || disabled\"\n                (click)=\"$event.event.stopPropagation()\"\n                (change)=\"$event ? selection.toggle(row) : null\"\n                [checked]=\"selection.isSelected(row)\"\n                [aria-label]=\"checkboxLabel(row)\">\n              </mat-checkbox>\n            </td>\n          </ng-container>\n          \n          <ng-container \n            *ngFor=\"let column of columnConfigs; let colIndex = index\"\n            [matColumnDef]=\"getColumnKey(column)\">\n            <th \n              mat-header-cell \n              *matHeaderCellDef\n              mat-sort-header\n              disableClear\n              [disabled]=\"!column.sortable\"\n              [class.cf-table-header-hidden]=\"_listConfig.hideHeaderRow\"\n              [ngClass]=\"{'cf-list-field-first': colIndex == 0}\"\n              [style.width.%]=\"displayVertical ? '100' : column.width / totalDispalyableWidth * 100\">\n              {{getColumnLabel(column)}}\n            </th> \n            <!-- [attr.data-label]=\"getColumnLabel(column)\" -->\n            <td \n              mat-cell \n              *matCellDef=\"let row; let rowIndex = dataIndex\"\n              class=\"cf-table-data-cell\"\n              [style.background-color]=\"cellColors && cellColors[rowIndex] && cellColors[rowIndex][colIndex] ? cellColors[rowIndex][colIndex].bgColor : ''\"\n              [style.color]=\"cellColors && cellColors[rowIndex] && cellColors[rowIndex][colIndex] ? cellColors[rowIndex][colIndex].textColor : ''\"\n              [style.width.%]=\"displayVertical ? '100' : column.width / totalDispalyableWidth * 100\"\n              (click)=\"_listConfig.rowAction ? rowClick(row, rowIndex, ((formIndex == rowIndex && form != undefined) ? form.value : null), $event) : _listConfig.rowAction\"\n              >\n \n              <ng-container *ngIf=\"column?.template?.html || column?.template?.layout; else elseDefault\">\n                <span *ngIf=\"column?.template?.html\">\n                  <ng-container *cfTemplate=\"'<style>'+column?.template?.css+'</style>' + column?.template?.html; context: {row: row, index: rowIndex}\"></ng-container>\n                </span>\n                <span *ngIf=\"column?.template?.layout\">\n                  <!-- {{row | json}}--- -->\n                  <ng-container  \n                    [ngTemplateOutlet]=\"cfCustomRowLayout\"\n                    [ngTemplateOutletContext]=\"{layout: column.template.layout, row: row, rowIndex: rowIndex, withCard: false}\"\n                  ></ng-container>\n                </span>\n              </ng-container>\n              <ng-template #elseDefault>\n                <div [ngClass]=\"{'cf-list-field-not-first': cFieldIndex > 0, 'cf-list-field-inline': column.displayInline && column.displayInline.separator}\" *ngFor=\"let field of column.fields; let cFieldIndex = index;\">\n                  <span *ngIf=\"column.displayInline && column.displayInline.separator && cFieldIndex > 0\">{{column.displayInline.separator}}</span>\n                  <cf-field\n                    *ngIf=\"!column.link || (column.link && column.linkKey && column.linkKey != field.key)\" \n                    [sourceType]=\"'LIST'\"\n                    [sourceIdentifier]=\"_listConfig.identifier\" \n                    [sourceIndex]=\"rowIndex\" \n                    [widgetArrayIndex]=\"widgetArrayIndex\"\n                    [form]=\"(formIndex == rowIndex && form != undefined) ? form : null\" \n                    [fieldControl]=\"(formIndex == rowIndex && form != undefined) ? form.controls[field.key] : null\"\n                    [field]=\"field\"\n                    [displayMode]=\"displayModes[rowIndex]\" \n                    [hideLabel]=\"true\"\n                    [value]=\"getValue(colIndex, cFieldIndex, row, field.value)\" \n                    class=\"cf-list-field\"\n                    [ngClass]=\"{'cf-list-field-disabled': (_listConfig && row && _listConfig.disableRow && _listConfig.disableRow(row)) || disabled}\"\n                    [row]=\"row\"\n                    [keyMap]=\"keyMap\"\n                    (onFieldChange)=\"fieldChange($event);$event.event && $event.event.stopPropagation ? $event.event.stopPropagation(): ''\">\n                  </cf-field>\n                  <cf-button\n                    *ngIf=\"column.link && ((column.linkKey && column.linkKey == field.key) || !column.linkKey)\" \n                    [identifier]=\"'listFieldAsLink'\"\n                    [form]=\"(formIndex == rowIndex && form != undefined) ? form : null\"\n                    [sourceIdentifier]=\"_listConfig.identifier\"\n                    [sourceIndex]=\"rowIndex\"\n                    [widgetArrayIndex]=\"widgetArrayIndex\"\n                    [button]=\"column.link\"\n                    [label]=\"getValue(colIndex, cFieldIndex, row, field.value)\"\n                    [context]=\"(formIndex == rowIndex && form != undefined) ? form.value : null\"\n                    [originalData]=\"row\"\n                    [parentHierarchy]=\"parent\"\n                    [disabled]=\"(_listConfig && row && _listConfig.disableRow && _listConfig.disableRow(row)) || disabled\"\n                    (onClick)=\"buttonClick($event);$event.event.stopPropagation()\"\n                  ></cf-button>\n                </div>\n              </ng-template>\n            </td>\n          </ng-container>\n      \n          <ng-container matColumnDef=\"expandedRow\"> \n            <td mat-cell *matCellDef=\"let row; let rowIndex = dataIndex\" [attr.colspan]=\"childColumnCount\">\n              <div class=\"cf-element-detail\"\n                  [@detailExpand]=\"row == expandedRow || this._expanded == true ? 'expanded' : 'collapsed'\">\n                <cf-static-list \n                  *ngIf=\"_listConfig.child && _listConfig.child.type == 'LIST' && _listConfig.child.record && (row == expandedRow || _expanded == true)\"\n                  [listConfig]=\"_listConfig.child.record\" \n                  [sourceIdentifier]=\"sourceIdentifier\"\n                  [record]=\"getChildRows(expandedRow)\" \n                  [keyMap]=\"keyMap\"\n                  [expanded]=\"_expanded\"\n                  [listReset]=\"listReset\"\n                  [parent]=\"getObjectTree(row)\"\n                  [style.width.%]=\"100\"\n                  [disabled]=\"(_listConfig && row && _listConfig.disableRow && _listConfig.disableRow(row)) || disabled\"\n                  (onFormChange)=\"formChange($event)\"\n                  (onFieldChange)=\"fieldChange($event);$event.event.stopPropagation()\"\n                  (onButtonClick)=\"buttonClick($event);$event.event.stopPropagation()\"\n                  (onPageChange)=\"onPage($event)\"\n                  (onSortChange)=\"onSort($event)\"  \n                >\n                </cf-static-list>\n                <cf-form\n                    *ngIf=\"_listConfig.child && _listConfig.child.type == 'FORM' && (row == expandedRow || _expanded == true)\"\n                    [formConfig]=\"_listConfig.child.record\"\n                    [sourceIdentifier]=\"_listConfig.identifier\"\n                    [sourceIndex]=\"rowIndex\"\n                    [widgetArrayIndex]=\"widgetArrayIndex\"\n                    [style.width.%]=\"100\"\n                    (onFormChange)=\"formChange($event)\"\n                    (onFieldChange)=\"fieldChange($event)\"\n                    (onButtonClick)=\"buttonClick($event)\"\n                ></cf-form>\n              </div>\n            </td> \n          </ng-container>\n      \n          <ng-container \n            *ngIf=\"_listConfig.actions && _listConfig.actions.length > 0\"\n            matColumnDef=\"action\">\n            <th \n              mat-header-cell \n              *matHeaderCellDef\n              class=\"cf-list-action-col\"\n              [class.cf-table-header-hidden]=\"_listConfig.hideHeaderRow\"\n              [style.width.%]=\"displayVertical ? '100' : _listConfig.actionWidth / totalDispalyableWidth * 100\"\n              >\n              Action\n            </th>\n            <td \n              mat-cell \n              *matCellDef=\"let row; let rowIndex = dataIndex\"\n              class=\"cf-list-action-col\"\n              [style.background-color]=\"rowColors && rowColors[rowIndex] ? rowColors[rowIndex].bgColor : ''\"\n              [style.color]=\"rowColors && rowColors[rowIndex] ? rowColors[rowIndex].textColor : ''\"\n              [style.width.%]=\"displayVertical ? '100' : _listConfig.actionWidth / totalDispalyableWidth * 100\"\n              > \n              <!-- --{{inlineEditButtons[rowIndex].size}} -->\n              <cf-button \n                *ngIf=\"isInlineEditable && inlineEditButtons && inlineEditButtons[rowIndex] && inlineEditButtons[rowIndex].icon\"\n                [form]=\"(formIndex == rowIndex && form != undefined) ? form : null\"\n                [sourceIdentifier]=\"_listConfig.identifier\"\n                [sourceIndex]=\"rowIndex\" \n                [widgetArrayIndex]=\"widgetArrayIndex\"\n                [button]=\"inlineEditButtons[rowIndex]\"\n                class=\"cf-button\"\n                [context]=\"(formIndex == rowIndex && form != undefined) ? form.value : null\" \n                [originalData]=\"row\"\n                [parentHierarchy]=\"parent\" \n                [disabled]=\"(_listConfig && row && _listConfig.disableRow && _listConfig.disableRow(row)) || disabled\"\n                (onClick)=\"setRowEditablity(rowIndex);buttonClick($event);$event.event.stopPropagation()\"\n              ></cf-button> \n              <cf-button-group\n                  *ngIf=\"!isInlineEditable || (inlineEditButtons && inlineEditButtons[rowIndex] && inlineEditButtons[rowIndex].label == 'Cancel')\"\n                  [buttons]=\"_listConfig.actions\"\n                  [form]=\"(formIndex == rowIndex && form != undefined) ? form : null\"\n                  [sourceIdentifier]=\"_listConfig.identifier\"\n                  [sourceIndex]=\"rowIndex\"\n                  [widgetArrayIndex]=\"widgetArrayIndex\"\n                  [context]=\"(formIndex == rowIndex && form != undefined) ? form.value : null\"\n                  [originalData]=\"row\"\n                  [parentHierarchy]=\"parent\"\n                  [disabled]=\"(_listConfig && row && _listConfig.disableRow && _listConfig.disableRow(row)) || disabled\"\n                  (onClick)=\"buttonClick($event);\"\n              ></cf-button-group>\n            </td>\n          </ng-container> \n          <tr \n            mat-header-row \n            *matHeaderRowDef=\"columnNames; sticky: _listConfig.stickyHeader\"\n          ></tr>\n          <div *ngIf=\"(_listConfig.row &&_listConfig.row.hover);else withoutTooltip\">\n            <tr \n              mat-row \n              *matRowDef=\"let row; columns: columnNames; let i = dataIndex;\"\n              [tooltip]=\"rowHoverTemplate\"\n              show-delay=\"300\"\n              [position]=\"tooltipPosition\"\n              [width]=\"_listConfig?.row?.hover?.width\"  \n              theme=\"light\"\n              content-type=\"template\"\n              class=\"cf-row\"\n              [ngClass]=\"{'without-hover': !(_listConfig.row &&_listConfig.row.hover)}\"\n              (mouseenter)=\"onHover($event,i, (_listConfig && _listConfig.child && _listConfig.child.record && expandedRow === row) ? null : row)\" \n              (click)=\"expandedRow = (_listConfig && _listConfig.child && _listConfig.child.record && expandedRow === row) ? null : row\"\n            ></tr>\n          </div>\n\n          <ng-template #withoutTooltip>\n            <tr \n              mat-row \n              *matRowDef=\"let row; columns: columnNames; let i = dataIndex;\"\n              class=\"cf-row\"\n              [ngClass]=\"{'without-hover': !(_listConfig.row &&_listConfig.row.hover)}\"\n              (click)=\"expandedRow = (_listConfig && _listConfig.child && _listConfig.child.record && expandedRow === row) ? null : row\"\n            ></tr>\n          </ng-template>\n          <!-- [tooltip]=\"rowHoverTemplate\"\n          placement=\"bottom\"\n          content-type=\"template\"\n          hideDelayTouchscreen=0\n          hide-delay=100\n          show-delay=100\n          animation-duration=100\n          max-width=_listConfig?.row?.hover?.width\n          display=\"_listConfig.row && _listConfig.row.hover && (_listConfig.row.hover.template || _listConfig.row.hover.layout)\"\n          theme=\"light\"\n           -->\n          <tr  \n            style=\"background-color: aliceblue;\"\n            mat-row  \n            *matRowDef=\"let row; columns: ['expandedRow']\" \n            [ngClass]=\"{'cf-detail-row-hide': !_listConfig.child || !_listConfig.child.record}\"\n            class=\"cf-detail-row\"\n          ></tr>\n        </table>\n      </div>\n    </div>\n  </div>\n</ng-template> \n\n<ng-template #rowHoverTemplate>\n  <div *ngIf=\"_listConfig?.row?.hover && _listConfig.row.hover.template && _listConfig.row.hover.template.component\" [ngStyle]=\"{'width': _listConfig.row.hover.width + 'px'}\">\n    <!-- <ndc-dynamic\n      [ndcDynamicComponent]=\"_listConfig.row.hover.template.component\"\n      [ndcDynamicInputs]=\"hoverRowData\"\n    ></ndc-dynamic> -->\n  </div>\n  <div *ngIf=\"_listConfig?.row?.hover && _listConfig.row.hover.template && _listConfig.row.hover.template.layout\" [ngStyle]=\"{'width': _listConfig.row.hover.width + 'px'}\" class=\"cf-list-hover-tooltip\">\n    <ng-container  \n      [ngTemplateOutlet]=\"cfCustomRowLayout\"\n      [ngTemplateOutletContext]=\"{layout: _listConfig.row.hover.template.layout, row: hoverRowData, rowIndex: hoverRowIndex, withCard: false}\"\n    ></ng-container>\n  </div>\n</ng-template> \n\n<ng-template #rowTemplate>\n  <div *ngIf=\"_listConfig?.row?.template\">\n    <!-- <ndc-dynamic [ndcDynamicComponent]=\"_listConfig.row.template\"></ndc-dynamic> -->\n  </div>\n</ng-template>",
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [":root{--mdc-layout-grid-column-width-desktop:72px;--mdc-layout-grid-column-width-phone:72px;--mdc-layout-grid-column-width-tablet:72px;--mdc-layout-grid-gutter-desktop:24px;--mdc-layout-grid-gutter-phone:16px;--mdc-layout-grid-gutter-tablet:16px;--mdc-layout-grid-margin-desktop:24px;--mdc-layout-grid-margin-phone:16px;--mdc-layout-grid-margin-tablet:16px}@media (min-width:840px){.mdc-layout-grid{box-sizing:border-box;margin:0 auto;padding:24px;padding:var(--mdc-layout-grid-margin-desktop,24px)}}@media (min-width:600px) and (max-width:839px){.mdc-layout-grid{box-sizing:border-box;margin:0 auto;padding:16px;padding:var(--mdc-layout-grid-margin-tablet,16px)}}@media (max-width:599px){.mdc-layout-grid{box-sizing:border-box;margin:0 auto;padding:16px;padding:var(--mdc-layout-grid-margin-phone,16px)}}@media (min-width:840px){.mdc-layout-grid__inner{align-items:stretch;display:flex;flex-flow:row wrap;margin:-12px;margin:calc(var(--mdc-layout-grid-gutter-desktop, 24px)/2*-1)}@supports (display:grid){.mdc-layout-grid__inner{-ms-grid-columns:(minmax(0,1fr))[12];display:-ms-grid;display:grid;grid-gap:24px;grid-gap:var(--mdc-layout-grid-gutter-desktop,24px);grid-template-columns:repeat(12,minmax(0,1fr));margin:0}}}@media (min-width:600px) and (max-width:839px){.mdc-layout-grid__inner{align-items:stretch;display:flex;flex-flow:row wrap;margin:-8px;margin:calc(var(--mdc-layout-grid-gutter-tablet, 16px)/2*-1)}@supports (display:grid){.mdc-layout-grid__inner{-ms-grid-columns:(minmax(0,1fr))[8];display:-ms-grid;display:grid;grid-gap:16px;grid-gap:var(--mdc-layout-grid-gutter-tablet,16px);grid-template-columns:repeat(8,minmax(0,1fr));margin:0}}}@media (max-width:599px){.mdc-layout-grid__inner{align-items:stretch;display:flex;flex-flow:row wrap;margin:-8px;margin:calc(var(--mdc-layout-grid-gutter-phone, 16px)/2*-1)}@supports (display:grid){.mdc-layout-grid__inner{-ms-grid-columns:(minmax(0,1fr))[4];display:-ms-grid;display:grid;grid-gap:16px;grid-gap:var(--mdc-layout-grid-gutter-phone,16px);grid-template-columns:repeat(4,minmax(0,1fr));margin:0}}}@media (min-width:840px){.mdc-layout-grid__cell{box-sizing:border-box;margin:12px;margin:calc(var(--mdc-layout-grid-gutter-desktop, 24px)/2);width:calc(33.33333% - 24px);width:calc(33.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell{-ms-grid-column-span:4;grid-column-end:span 4;margin:0;width:auto}}.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-desktop{width:calc(8.33333% - 24px);width:calc(8.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-desktop{-ms-grid-column-span:1;grid-column-end:span 1;width:auto}}.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-desktop{width:calc(16.66667% - 24px);width:calc(16.66667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-desktop{-ms-grid-column-span:2;grid-column-end:span 2;width:auto}}.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-desktop{width:calc(25% - 24px);width:calc(25% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-desktop{-ms-grid-column-span:3;grid-column-end:span 3;width:auto}}.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-desktop{width:calc(33.33333% - 24px);width:calc(33.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-desktop{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-desktop{width:calc(41.66667% - 24px);width:calc(41.66667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-desktop{-ms-grid-column-span:5;grid-column-end:span 5;width:auto}}.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-desktop{width:calc(50% - 24px);width:calc(50% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-desktop{-ms-grid-column-span:6;grid-column-end:span 6;width:auto}}.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-desktop{width:calc(58.33333% - 24px);width:calc(58.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-desktop{-ms-grid-column-span:7;grid-column-end:span 7;width:auto}}.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-desktop{width:calc(66.66667% - 24px);width:calc(66.66667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-desktop{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-desktop{width:calc(75% - 24px);width:calc(75% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-desktop{-ms-grid-column-span:9;grid-column-end:span 9;width:auto}}.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-desktop{width:calc(83.33333% - 24px);width:calc(83.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-desktop{-ms-grid-column-span:10;grid-column-end:span 10;width:auto}}.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-desktop{width:calc(91.66667% - 24px);width:calc(91.66667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-desktop{-ms-grid-column-span:11;grid-column-end:span 11;width:auto}}.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-desktop{width:calc(100% - 24px);width:calc(100% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-desktop{-ms-grid-column-span:12;grid-column-end:span 12;width:auto}}}@media (min-width:600px) and (max-width:839px){.mdc-layout-grid__cell{box-sizing:border-box;margin:8px;margin:calc(var(--mdc-layout-grid-gutter-tablet, 16px)/2);width:calc(50% - 16px);width:calc(50% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell{-ms-grid-column-span:4;grid-column-end:span 4;margin:0;width:auto}}.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-tablet{width:calc(12.5% - 16px);width:calc(12.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-tablet{-ms-grid-column-span:1;grid-column-end:span 1;width:auto}}.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-tablet{width:calc(25% - 16px);width:calc(25% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-tablet{-ms-grid-column-span:2;grid-column-end:span 2;width:auto}}.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-tablet{width:calc(37.5% - 16px);width:calc(37.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-tablet{-ms-grid-column-span:3;grid-column-end:span 3;width:auto}}.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-tablet{width:calc(50% - 16px);width:calc(50% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-tablet{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-tablet{width:calc(62.5% - 16px);width:calc(62.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-tablet{-ms-grid-column-span:5;grid-column-end:span 5;width:auto}}.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-tablet{width:calc(75% - 16px);width:calc(75% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-tablet{-ms-grid-column-span:6;grid-column-end:span 6;width:auto}}.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-tablet{width:calc(87.5% - 16px);width:calc(87.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-tablet{-ms-grid-column-span:7;grid-column-end:span 7;width:auto}}.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}}@media (max-width:599px){.mdc-layout-grid__cell{box-sizing:border-box;margin:8px;margin:calc(var(--mdc-layout-grid-gutter-phone, 16px)/2);width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell{-ms-grid-column-span:4;grid-column-end:span 4;margin:0;width:auto}}.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-phone{width:calc(25% - 16px);width:calc(25% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-phone{-ms-grid-column-span:1;grid-column-end:span 1;width:auto}}.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-phone{width:calc(50% - 16px);width:calc(50% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-phone{-ms-grid-column-span:2;grid-column-end:span 2;width:auto}}.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-phone{width:calc(75% - 16px);width:calc(75% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-phone{-ms-grid-column-span:3;grid-column-end:span 3;width:auto}}.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}}.mdc-layout-grid__cell--order-1{order:1}.mdc-layout-grid__cell--order-2{order:2}.mdc-layout-grid__cell--order-3{order:3}.mdc-layout-grid__cell--order-4{order:4}.mdc-layout-grid__cell--order-5{order:5}.mdc-layout-grid__cell--order-6{order:6}.mdc-layout-grid__cell--order-7{order:7}.mdc-layout-grid__cell--order-8{order:8}.mdc-layout-grid__cell--order-9{order:9}.mdc-layout-grid__cell--order-10{order:10}.mdc-layout-grid__cell--order-11{order:11}.mdc-layout-grid__cell--order-12{order:12}.mdc-layout-grid__cell--align-top{align-self:flex-start}@supports (display:grid){.mdc-layout-grid__cell--align-top{-ms-grid-row-align:start;align-self:start}}.mdc-layout-grid__cell--align-middle{-ms-grid-row-align:center;align-self:center}.mdc-layout-grid__cell--align-bottom{align-self:flex-end}@supports (display:grid){.mdc-layout-grid__cell--align-bottom{-ms-grid-row-align:end;align-self:end}}@media (min-width:840px){.mdc-layout-grid--fixed-column-width{width:1176px;width:calc(var(--mdc-layout-grid-column-width-desktop, 72px)*12 + var(--mdc-layout-grid-gutter-desktop, 24px)*11 + var(--mdc-layout-grid-margin-desktop, 24px)*2)}}@media (min-width:600px) and (max-width:839px){.mdc-layout-grid--fixed-column-width{width:720px;width:calc(var(--mdc-layout-grid-column-width-tablet, 72px)*8 + var(--mdc-layout-grid-gutter-tablet, 16px)*7 + var(--mdc-layout-grid-margin-tablet, 16px)*2)}}@media (max-width:599px){.mdc-layout-grid--fixed-column-width{width:368px;width:calc(var(--mdc-layout-grid-column-width-phone, 72px)*4 + var(--mdc-layout-grid-gutter-phone, 16px)*3 + var(--mdc-layout-grid-margin-phone, 16px)*2)}}.mdc-layout-grid--align-left{margin-left:0;margin-right:auto}.mdc-layout-grid--align-right{margin-left:auto;margin-right:0}.cf-list-header .mat-card-header-text{margin:0!important}.cf-list-header .mat-card-title{margin-top:6px}.cf-list-header .mat-card-avatar{font-size:40px;padding-right:8px}.cf-list-header-subtitle .mat-card-subtitle,.mat-card-subtitle{padding-top:0!important}.cf-list-header-buttons{position:absolute;right:5px;top:5px}.cf-table-header-hidden,.cf-table-hidden{display:none!important}.cf-table-without-header thead,.cf-table-without-header tr.mat-header-row{height:0!important}table{width:100%}.cf-table{padding:0!important}td,th{max-width:200px;white-space:normal;word-wrap:break-word}.cf-element-detail{border-left:2px groove #f5f5f5;display:flex;overflow:hidden;padding-right:3px;width:100%}.cf-list-action-col{text-align:right!important}tr.cf-detail-row{background-color:#f5f5f5;height:0!important}tr.cf-detail-row-hide{display:none!important}.sticky{position:-webkit-sticky;position:sticky}.selectable-column{padding-right:1%}.rote{transform:rotateX(180deg)}.cf-element-detail>th.mat-header-cell:last-of-type,td.mat-cell:last-of-type,td.mat-footer-cell:last-of-type{padding-right:0!important}.mat-card-content{margin-bottom:0!important}.cf-list-header-desc{margin:5px 0 5px 15px;padding:5px 10px;width:auto}.cf-list-header-desc-icon{font-size:15px;height:15px;margin-top:0;padding:0 5px 0 0;width:15px}.cf-table-alternate tr.mat-row:nth-child(odd),.cf-table-hover tr.mat-row:hover{background:#f5f5f5}.cf-table-alternate tr.mat-row:not(:nth-child(4n+1)){background:#fff}.cf-table-data-cell{padding:0 10px 0 0!important}.cf-list-field .mat-form-field-appearance-standard .mat-form-field-flex{padding-top:0}.cf-list-field-not-first{padding-top:5px}.cf-list-field-first{padding-left:0!important}.cf-list-field-disabled{color:rgba(0,0,0,.5411764705882353)}.cf-list-checkbox-selectable{padding-right:12px}.cf-list-field-inline{display:inline}@media screen and (max-width:599px){.mat-table{border:0;vertical-align:middle}.mat-table caption{font-size:1em}.mat-table .mat-header-row{display:none}.mat-table .mat-header-cell{border:10px solid;clip:rect(0 0 0 0);height:1px;margin:-1px;padding:0;position:absolute;width:1px}.mat-table .mat-row{border-bottom:5px solid #ddd;display:block;height:unset}.mat-table .mat-cell{display:block;font-size:1em;font-weight:700;margin-bottom:4%;min-height:48px}.mat-table .mat-cell:before{content:attr(data-label);float:left;font-size:.85em;font-weight:400}.mat-table .mat-cell:last-child{border-bottom:0}.mat-table .mat-cell:first-child{margin-top:4%}.mat-table .mat-row td{max-width:unset}}.cf-card-list{padding:0}.cf-card-list mat-card{padding:8px}.cf-card-mobile{margin-bottom:12px;word-wrap:break-word}.cf-card-mobile .mat-grid-tile .mat-figure{justify-content:unset}.cf-card-mobile .cf-primary-text .cf-field-value{font-size:18px;font-weight:400;margin-bottom:none}.cf-card-mobile .cf-secondary-text .cf-field-value{font-size:14px;font-weight:300;margin-bottom:none;margin-top:4px}.cf-card-mobile .cf-tertiary-text .cf-field-value{font-size:12px;font-weight:300;margin-bottom:none;margin-top:8px}.cf-card-mobile .cf-card-mobile-cell{display:block;width:100%}.cf-card-mobile .cf-card-mobile-cell .fullwidth button{width:100%}.cf-card-mobile .cf-card-mobile-cell .cf-primary-text .cf-field-value,.cf-card-mobile .cf-card-mobile-cell .cf-secondary-text .cf-field-value,.cf-card-mobile .cf-card-mobile-cell .cf-tertiary-text .cf-field-value{display:block}.cf-card-mobile .cf-card-mobile-cell .fullwidth button,.cf-card-mobile .cf-card-mobile-cell .fullwidth mat-chip{width:100%}.cf-card-mobile .cf-card-mobile-cell-inline{display:inline-block;width:100%}.cf-card-mobile .cf-card-mobile-cell-inline .cf-card-mobile-control-separator{padding:4px}.hover-template{display:none;position:absolute;z-index:9999}.cf-row:hover .without-hover{pointer-events:none}.wrapper-a{height:69vh;overflow-y:auto}.search-mobile{margin-right:10px}.search-mobile-container{display:flex}.sticky{background:#fff;border-bottom:1px solid #d3cece;left:0;margin:0 auto;padding:10px 20px;position:fixed;right:0;top:0;width:88%;z-index:99}.sticky+.content{padding-top:102px}.cf-mobile-filter-icon{padding-top:8px}.cf-mobile-filter-link{text-align:end}.cf-list-hover-tooltip{padding:8px}"]
                },] }
    ];
    DynamicListComponent.ctorParameters = function () { return [
        { type: ability.Ability },
        { type: layout.BreakpointObserver }
    ]; };

    var ModalComponent = /** @class */ (function () {
        function ModalComponent(dialogRef, data, ability) {
            this.dialogRef = dialogRef;
            this.data = data;
            this.ability = ability;
            this.onFormChange = new core.EventEmitter();
            this.onFieldChange = new core.EventEmitter();
            this.onButtonClick = new core.EventEmitter();
            AbilityUtils.setAbility(this.ability);
        }
        ModalComponent.prototype.ngOnInit = function () {
        };
        ModalComponent.prototype.click = function (event) {
            this.dialogRef.close(event);
        };
        ModalComponent.prototype.fieldChange = function (fieldChange) {
            console.log(fieldChange);
            this.onFieldChange.emit(fieldChange);
        };
        ModalComponent.prototype.formChange = function (form) {
            this.onFormChange.emit(form);
        };
        ModalComponent.prototype.buttonClick = function (event) {
            console.log(event);
            this.onButtonClick.emit(event);
        };
        return ModalComponent;
    }());
    ModalComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'cf-modal',
                    template: "<!-- <h1 mat-dialog-title *ngIf=\"title\">{{title}}</h1>\n<div mat-dialog-content *ngIf=\"message\">\n  <p>{{message}}</p>\n</div>\n<div \n  mat-dialog-actions \n  [style.text-align]=\"'right'\"\n  class=\"cf-dialog-action\">\n</div> -->\n\n<!-- <pre>\n    {{data | json}}\n</pre> -->\n<cf-form \n    *ngIf=\"data && data.type == 'FORM'\"\n    [formConfig]=\"data.widgetConfig\"\n    [sourceIndex]=\"data.sourceIndex\"\n    [record]=\"data.context ? data.context[data.widgetConfig.identifier] : data.context\"\n    [originalData]=\"data.originalData && data.originalData.record ? data.originalData.record[data.widgetConfig.identifier] : {}\"  \n    [keyMap]=\"data.keyMap\"\n    [reset]=\"data.reset\"\n    (onFieldChange)=\"fieldChange($event)\"\n    (onFormChange)=\"formChange($event)\"\n    (onButtonClick)=\"buttonClick($event)\"\n></cf-form>\n",
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".cf-dialog-action{text-align:right}.cf-dialog-action>.cf-button{margin-right:8px}.mat-dialog-container{padding:0!important}"]
                },] }
    ];
    ModalComponent.ctorParameters = function () { return [
        { type: dialog.MatDialogRef },
        { type: undefined, decorators: [{ type: core.Inject, args: [dialog.MAT_DIALOG_DATA,] }] },
        { type: ability.Ability }
    ]; };
    ModalComponent.propDecorators = {
        onFormChange: [{ type: core.Output }],
        onFieldChange: [{ type: core.Output }],
        onButtonClick: [{ type: core.Output }]
    };

    var AdminLayoutComponent = /** @class */ (function () {
        function AdminLayoutComponent(ability) {
            this.ability = ability;
            AbilityUtils.setAbility(this.ability);
        }
        AdminLayoutComponent.prototype.ngOnInit = function () {
        };
        return AdminLayoutComponent;
    }());
    AdminLayoutComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'app-admin-layout',
                    template: "<p>admin-layout works!</p>\n",
                    styles: [""]
                },] }
    ];
    AdminLayoutComponent.ctorParameters = function () { return [
        { type: ability.Ability }
    ]; };

    var CrudHeaderComponent = /** @class */ (function () {
        function CrudHeaderComponent(ability) {
            this.ability = ability;
            this.onButtonClick = new core.EventEmitter();
            this.badgeButtons = new Array();
            AbilityUtils.setAbility(this.ability);
        }
        Object.defineProperty(CrudHeaderComponent.prototype, "pageBackRoute", {
            get: function () {
                return this._pageBackRoute;
            },
            set: function (_pageBackRoute) {
                this._pageBackRoute = _pageBackRoute;
                this.addBackButton();
            },
            enumerable: false,
            configurable: true
        });
        CrudHeaderComponent.prototype.ngOnInit = function () {
            this.setIconPosition();
            this.addBackButton();
            this.transformBadgeButtons();
        };
        CrudHeaderComponent.prototype.setIconPosition = function () {
            this.iconPosition = "BEFORE_TITLE" /* BEFORE_TITLE */;
            if (this.icon && this.icon.position) {
                this.iconPosition = this.icon.position;
            }
        };
        CrudHeaderComponent.prototype.transformBadgeButtons = function () {
            var e_1, _a;
            if (this.badges && this.badges.length > 0) {
                var index = 0;
                try {
                    for (var _b = __values(this.badges), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var badge = _c.value;
                        this.badgeButtons.push({
                            identifier: 'crudHeaderBadge-' + index,
                            type: "CHIP" /* CHIP */,
                            label: badge.content,
                            color: this.badgeColorToButtonColor(badge.color),
                            size: "micro" /* MICRO */,
                            groupIdentifier: "crudHeaderGroup",
                        });
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        };
        CrudHeaderComponent.prototype.badgeColorToButtonColor = function (color) {
            var buttonColor;
            if (color == "accent" /* ASCENT */) {
                buttonColor = "accent" /* ASCENT */;
            }
            else if (color == "primary" /* PRIMARY */) {
                buttonColor = "primary" /* PRIMARY */;
            }
            else if (color == "warn" /* WARN */) {
                buttonColor = "warn" /* WARN */;
            }
            return buttonColor;
        };
        CrudHeaderComponent.prototype.addBackButton = function () {
            var e_2, _a;
            if (!this._pageBackRoute || CollectionUtils.isEmpty(this._pageBackRoute)) {
                return;
            }
            var backButton;
            if (CollectionUtils.isEmpty(this.actions)) {
                this.actions = new Array();
            }
            backButton = {
                identifier: "crudBackButton",
                label: "Back",
                color: "primary" /* PRIMARY */,
                size: "small" /* SMALL */,
                icon: "keyboard_return",
                type: "GHOST" /* GHOST */,
                onlyIcon: false,
                routerLink: this._pageBackRoute,
                displayInFormModes: [
                    "CRUD_FORM" /* CRUD_FORM */
                ]
            };
            var backAlreadyAdded = false;
            try {
                for (var _b = __values(this.actions), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var action = _c.value;
                    if (action.identifier == "crudBackButton") {
                        backAlreadyAdded = true;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            if (!backAlreadyAdded) {
                this.actions.unshift(backButton);
                this.actions = JSON.parse(JSON.stringify(this.actions));
            }
        };
        CrudHeaderComponent.prototype.buttonClick = function (event) {
            console.log(event);
            this.onButtonClick.emit(event);
        };
        return CrudHeaderComponent;
    }());
    CrudHeaderComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'cf-crud-header',
                    template: "<div \n  class=\"cf-header\"\n  [style.padding]=\"style && style.hideCard ? '0px 16px' : 'auto'\"\n>\n    <div class=\"mdc-layout-grid\">\n        <div class=\"mdc-layout-grid__inner\">\n          <div class=\"mdc-layout-grid__cell--span-{{actions && actions.length > 0 ? 6 : 12}}-desktop mdc-layout-grid__cell--span-{{actions && actions.length > 0 ? 4 : 8}}-tablet mdc-layout-grid__cell--span-{{actions && actions.length > 0 ? 3 : 4}}-phone mdc-layout-grid__cell--align-middle\">\n            <mat-card-header class=\"cf-crud-header\">\n              <mat-icon\n                mat-card-avatar \n                class=\"cf-crud-header-icon-before\"\n                *ngIf=\"icon && icon.font && iconPosition == 'BEFORE_TITLE'\"\n                aria-hidden=\"false\" \n                [style.margin-top.px]=\"subtitle ? 8 : 0\"\n                [attr.aria-label]=\"icon.font\"\n                >{{ icon.font }}</mat-icon>\n\n              <mat-card-title>\n                {{ title }} \n                <mat-icon \n                  class=\"cf-crud-header-icon-after\"\n                  *ngIf=\"icon && icon.font && iconPosition == 'AFTER_TITLE'\"\n                  aria-hidden=\"false\" [attr.aria-label]=\"icon.font\">{{ icon.font }}</mat-icon>\n              </mat-card-title>\n              \n              <!-- <mat-card-subtitle *ngIf=\"description && description.text && !description.bgColor\">{{ description.text }}</mat-card-subtitle> -->\n\n              <mat-card-subtitle class=\"cf-crud-header-subtitle\" *ngIf=\"subtitle\">{{ subtitle }}</mat-card-subtitle>\n\n              <span class=\"cf-crud-header-badge\" *ngIf=\"badges && badges.length > 0\"> \n                  <cf-button-group\n                      [buttons]=\"badgeButtons\"\n                      [sourceIdentifier]=\"identifier\"\n                      [sourceIndex]=\"'0'\"\n                      (onClick)=\"buttonClick($event)\"\n                  ></cf-button-group>\n              </span>\n            </mat-card-header>\n          </div>\n          <div \n            class=\"mdc-layout-grid__cell--span-{{actions && actions.length > 0 ? 6 : 0}}-desktop mdc-layout-grid__cell--span-{{actions && actions.length > 0 ? 4 : 0}}-tablet mdc-layout-grid__cell--span-{{actions && actions.length > 0 ? 1 : 0}}-phone mdc-layout-grid__cell--align-middle mdc-layout-grid--align-right cf-crud-header-button\" \n            *ngIf=\"actions && actions.length > 0\">\n            <!-- <pre>{{actions | json}}</pre> --> \n            <cf-button-group\n                [buttons]=\"actions\"\n                [sourceIdentifier]=\"identifier\"\n                [formDisplayMode]=\"formDisplayMode\"\n                [sourceIndex]=\"'0'\"\n                [originalData]=\"originalData\"\n                [context]=\"context\"\n                (onClick)=\"buttonClick($event)\"\n            ></cf-button-group> \n          </div>\n        </div> \n    </div>\n</div>\n<mat-divider class=\"cf-crud-header-divider\" *ngIf=\"(title || (actions && actions.length > 0)) && description && !description.bgColor\"></mat-divider>\n",
                    styles: [":root{--mdc-layout-grid-column-width-desktop:72px;--mdc-layout-grid-column-width-phone:72px;--mdc-layout-grid-column-width-tablet:72px;--mdc-layout-grid-gutter-desktop:24px;--mdc-layout-grid-gutter-phone:16px;--mdc-layout-grid-gutter-tablet:16px;--mdc-layout-grid-margin-desktop:24px;--mdc-layout-grid-margin-phone:16px;--mdc-layout-grid-margin-tablet:16px}@media (min-width:840px){.mdc-layout-grid{box-sizing:border-box;margin:0 auto;padding:24px;padding:var(--mdc-layout-grid-margin-desktop,24px)}}@media (min-width:600px) and (max-width:839px){.mdc-layout-grid{box-sizing:border-box;margin:0 auto;padding:16px;padding:var(--mdc-layout-grid-margin-tablet,16px)}}@media (max-width:599px){.mdc-layout-grid{box-sizing:border-box;margin:0 auto;padding:16px;padding:var(--mdc-layout-grid-margin-phone,16px)}}@media (min-width:840px){.mdc-layout-grid__inner{align-items:stretch;display:flex;flex-flow:row wrap;margin:-12px;margin:calc(var(--mdc-layout-grid-gutter-desktop, 24px)/2*-1)}@supports (display:grid){.mdc-layout-grid__inner{-ms-grid-columns:(minmax(0,1fr))[12];display:-ms-grid;display:grid;grid-gap:24px;grid-gap:var(--mdc-layout-grid-gutter-desktop,24px);grid-template-columns:repeat(12,minmax(0,1fr));margin:0}}}@media (min-width:600px) and (max-width:839px){.mdc-layout-grid__inner{align-items:stretch;display:flex;flex-flow:row wrap;margin:-8px;margin:calc(var(--mdc-layout-grid-gutter-tablet, 16px)/2*-1)}@supports (display:grid){.mdc-layout-grid__inner{-ms-grid-columns:(minmax(0,1fr))[8];display:-ms-grid;display:grid;grid-gap:16px;grid-gap:var(--mdc-layout-grid-gutter-tablet,16px);grid-template-columns:repeat(8,minmax(0,1fr));margin:0}}}@media (max-width:599px){.mdc-layout-grid__inner{align-items:stretch;display:flex;flex-flow:row wrap;margin:-8px;margin:calc(var(--mdc-layout-grid-gutter-phone, 16px)/2*-1)}@supports (display:grid){.mdc-layout-grid__inner{-ms-grid-columns:(minmax(0,1fr))[4];display:-ms-grid;display:grid;grid-gap:16px;grid-gap:var(--mdc-layout-grid-gutter-phone,16px);grid-template-columns:repeat(4,minmax(0,1fr));margin:0}}}@media (min-width:840px){.mdc-layout-grid__cell{box-sizing:border-box;margin:12px;margin:calc(var(--mdc-layout-grid-gutter-desktop, 24px)/2);width:calc(33.33333% - 24px);width:calc(33.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell{-ms-grid-column-span:4;grid-column-end:span 4;margin:0;width:auto}}.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-desktop{width:calc(8.33333% - 24px);width:calc(8.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-desktop{-ms-grid-column-span:1;grid-column-end:span 1;width:auto}}.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-desktop{width:calc(16.66667% - 24px);width:calc(16.66667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-desktop{-ms-grid-column-span:2;grid-column-end:span 2;width:auto}}.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-desktop{width:calc(25% - 24px);width:calc(25% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-desktop{-ms-grid-column-span:3;grid-column-end:span 3;width:auto}}.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-desktop{width:calc(33.33333% - 24px);width:calc(33.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-desktop{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-desktop{width:calc(41.66667% - 24px);width:calc(41.66667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-desktop{-ms-grid-column-span:5;grid-column-end:span 5;width:auto}}.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-desktop{width:calc(50% - 24px);width:calc(50% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-desktop{-ms-grid-column-span:6;grid-column-end:span 6;width:auto}}.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-desktop{width:calc(58.33333% - 24px);width:calc(58.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-desktop{-ms-grid-column-span:7;grid-column-end:span 7;width:auto}}.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-desktop{width:calc(66.66667% - 24px);width:calc(66.66667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-desktop{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-desktop{width:calc(75% - 24px);width:calc(75% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-desktop{-ms-grid-column-span:9;grid-column-end:span 9;width:auto}}.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-desktop{width:calc(83.33333% - 24px);width:calc(83.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-desktop{-ms-grid-column-span:10;grid-column-end:span 10;width:auto}}.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-desktop{width:calc(91.66667% - 24px);width:calc(91.66667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-desktop{-ms-grid-column-span:11;grid-column-end:span 11;width:auto}}.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-desktop{width:calc(100% - 24px);width:calc(100% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-desktop{-ms-grid-column-span:12;grid-column-end:span 12;width:auto}}}@media (min-width:600px) and (max-width:839px){.mdc-layout-grid__cell{box-sizing:border-box;margin:8px;margin:calc(var(--mdc-layout-grid-gutter-tablet, 16px)/2);width:calc(50% - 16px);width:calc(50% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell{-ms-grid-column-span:4;grid-column-end:span 4;margin:0;width:auto}}.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-tablet{width:calc(12.5% - 16px);width:calc(12.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-tablet{-ms-grid-column-span:1;grid-column-end:span 1;width:auto}}.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-tablet{width:calc(25% - 16px);width:calc(25% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-tablet{-ms-grid-column-span:2;grid-column-end:span 2;width:auto}}.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-tablet{width:calc(37.5% - 16px);width:calc(37.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-tablet{-ms-grid-column-span:3;grid-column-end:span 3;width:auto}}.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-tablet{width:calc(50% - 16px);width:calc(50% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-tablet{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-tablet{width:calc(62.5% - 16px);width:calc(62.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-tablet{-ms-grid-column-span:5;grid-column-end:span 5;width:auto}}.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-tablet{width:calc(75% - 16px);width:calc(75% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-tablet{-ms-grid-column-span:6;grid-column-end:span 6;width:auto}}.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-tablet{width:calc(87.5% - 16px);width:calc(87.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-tablet{-ms-grid-column-span:7;grid-column-end:span 7;width:auto}}.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}}@media (max-width:599px){.mdc-layout-grid__cell{box-sizing:border-box;margin:8px;margin:calc(var(--mdc-layout-grid-gutter-phone, 16px)/2);width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell{-ms-grid-column-span:4;grid-column-end:span 4;margin:0;width:auto}}.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-phone{width:calc(25% - 16px);width:calc(25% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-phone{-ms-grid-column-span:1;grid-column-end:span 1;width:auto}}.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-phone{width:calc(50% - 16px);width:calc(50% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-phone{-ms-grid-column-span:2;grid-column-end:span 2;width:auto}}.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-phone{width:calc(75% - 16px);width:calc(75% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-phone{-ms-grid-column-span:3;grid-column-end:span 3;width:auto}}.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}}.mdc-layout-grid__cell--order-1{order:1}.mdc-layout-grid__cell--order-2{order:2}.mdc-layout-grid__cell--order-3{order:3}.mdc-layout-grid__cell--order-4{order:4}.mdc-layout-grid__cell--order-5{order:5}.mdc-layout-grid__cell--order-6{order:6}.mdc-layout-grid__cell--order-7{order:7}.mdc-layout-grid__cell--order-8{order:8}.mdc-layout-grid__cell--order-9{order:9}.mdc-layout-grid__cell--order-10{order:10}.mdc-layout-grid__cell--order-11{order:11}.mdc-layout-grid__cell--order-12{order:12}.mdc-layout-grid__cell--align-top{align-self:flex-start}@supports (display:grid){.mdc-layout-grid__cell--align-top{-ms-grid-row-align:start;align-self:start}}.mdc-layout-grid__cell--align-middle{-ms-grid-row-align:center;align-self:center}.mdc-layout-grid__cell--align-bottom{align-self:flex-end}@supports (display:grid){.mdc-layout-grid__cell--align-bottom{-ms-grid-row-align:end;align-self:end}}@media (min-width:840px){.mdc-layout-grid--fixed-column-width{width:1176px;width:calc(var(--mdc-layout-grid-column-width-desktop, 72px)*12 + var(--mdc-layout-grid-gutter-desktop, 24px)*11 + var(--mdc-layout-grid-margin-desktop, 24px)*2)}}@media (min-width:600px) and (max-width:839px){.mdc-layout-grid--fixed-column-width{width:720px;width:calc(var(--mdc-layout-grid-column-width-tablet, 72px)*8 + var(--mdc-layout-grid-gutter-tablet, 16px)*7 + var(--mdc-layout-grid-margin-tablet, 16px)*2)}}@media (max-width:599px){.mdc-layout-grid--fixed-column-width{width:368px;width:calc(var(--mdc-layout-grid-column-width-phone, 72px)*4 + var(--mdc-layout-grid-gutter-phone, 16px)*3 + var(--mdc-layout-grid-margin-phone, 16px)*2)}}.mdc-layout-grid--align-left{margin-left:0;margin-right:auto}.mdc-layout-grid--align-right{margin-left:auto;margin-right:0}.cf-crud-header ::ng-deep .mat-card-header-text{margin:0!important}.cf-crud-header .mat-card-title{margin-top:6px}.cf-crud-header .mat-card-avatar{font-size:40px;padding-right:8px}.cf-crud-header-subtitle .mat-card-subtitle,.mat-card-subtitle{padding-top:0!important}.cf-crud-header-btns{background:#faebd7;margin-left:8px;padding:2px 5px}.cf-header>.mdc-layout-grid{padding:0!important}.cf-crud-header-button{margin-top:-8px}.cf-crud-header-badge{vertical-align:text-bottom}.mdc-layout-grid{padding:0 0 10px!important}.cf-crud-header-icon-after{padding-left:10px}"]
                },] }
    ];
    CrudHeaderComponent.ctorParameters = function () { return [
        { type: ability.Ability }
    ]; };
    CrudHeaderComponent.propDecorators = {
        identifier: [{ type: core.Input }],
        title: [{ type: core.Input }],
        subtitle: [{ type: core.Input }],
        description: [{ type: core.Input }],
        badges: [{ type: core.Input }],
        icon: [{ type: core.Input }],
        style: [{ type: core.Input }],
        _pageBackRoute: [{ type: core.Input }],
        pageBackRoute: [{ type: core.Input }],
        formDisplayMode: [{ type: core.Input }],
        actions: [{ type: core.Input }],
        showHeader: [{ type: core.Input }],
        originalData: [{ type: core.Input }],
        context: [{ type: core.Input }],
        onButtonClick: [{ type: core.Output }]
    };

    var FormHeaderComponent = /** @class */ (function () {
        function FormHeaderComponent(ability) {
            this.ability = ability;
            this.onFieldChange = new core.EventEmitter();
            this.onButtonClick = new core.EventEmitter();
            this.fields = new Array();
            this.buttons = new Array();
            AbilityUtils.setAbility(this.ability);
        }
        FormHeaderComponent.prototype.ngOnInit = function () {
            this.getFormHeader();
            this.setIconPosition();
            this.saperateFormActions();
        };
        FormHeaderComponent.prototype.getFormHeader = function () {
            var title = this.formHeaderConfig.title;
            this.subtitle = this.formHeaderConfig.subtitle;
            switch (this.formDisplayMode) {
                case "SEARCH" /* SEARCH */: {
                    title = this.formHeaderConfig.searchModeTitle ? this.formHeaderConfig.searchModeTitle : title;
                }
                case "ADD" /* ADD */: {
                    title = this.formHeaderConfig.addModeTitle ? this.formHeaderConfig.addModeTitle : title;
                }
                case "EDIT" /* EDIT */: {
                    title = this.formHeaderConfig.editModeTitle ? this.formHeaderConfig.editModeTitle : title;
                }
                case "VIEW" /* VIEW */: {
                    title = this.formHeaderConfig.viewModeTitle ? this.formHeaderConfig.viewModeTitle : title;
                }
                default: {
                    title = this.formHeaderConfig.title;
                }
            }
            if (this.widgetArrayIndex != null) {
                title += " - " + (this.widgetArrayIndex + 1);
            }
            this.title = title;
        };
        FormHeaderComponent.prototype.setIconPosition = function () {
            this.iconPosition = "BEFORE_TITLE" /* BEFORE_TITLE */;
            if (this.formHeaderConfig.icon && this.formHeaderConfig.icon.position) {
                this.iconPosition = this.formHeaderConfig.icon.position;
            }
        };
        FormHeaderComponent.prototype.saperateFormActions = function () {
            var _this = this;
            if (!CollectionUtils.isEmpty(this.formActions)) {
                this.formActions.forEach(function (formAction) {
                    if (ButtonUtils.instanceOfAnyButtonType(formAction)) {
                        _this.buttons.push(formAction);
                    }
                    else {
                        _this.fields.push(formAction);
                    }
                });
                this.initFormGroup();
            }
        };
        FormHeaderComponent.prototype.initFormGroup = function () {
            if (this.fields && this.fields.length > 0) {
                var formFields_1 = new Array();
                this.fields.map(function (field) { return formFields_1.push({ 'field': field, 'addMore': false }); });
                this.form = FormUtils.initFormGroup(formFields_1, {}, {}, "ADD" /* ADD */);
            }
        };
        FormHeaderComponent.prototype.fieldChange = function (fieldChange) {
            //    console.log(fieldChange);
            this.onFieldChange.emit(fieldChange);
        };
        FormHeaderComponent.prototype.buttonClick = function (event) {
            this.onButtonClick.emit(event);
        };
        return FormHeaderComponent;
    }());
    FormHeaderComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'cf-form-header',
                    template: "<mat-card-header class=\"cf-form-header\">\n    <mat-icon \n        *ngIf=\"formHeaderConfig.icon && formHeaderConfig.icon.font && iconPosition == 'BEFORE_TITLE'\"\n        mat-card-avatar \n        aria-hidden=\"false\" \n        [style.margin-top.px]=\"subtitle ? 8 : 0\"\n        [attr.aria-label]=\"formHeaderConfig.icon.font\">{{ formHeaderConfig.icon.font }}</mat-icon>\n\n    <mat-card-title class=\"cf-form-header-title\">\n        {{ title }}\n        <mat-icon \n            mat-card-avatar\n            *ngIf=\"formHeaderConfig.icon && formHeaderConfig.icon.font && iconPosition == 'AFTER_TITLE'\"\n            aria-hidden=\"false\" \n            [attr.aria-label]=\"formHeaderConfig.icon.font\"\n            class=\"cf-form-header-after-icon\">\n            {{ formHeaderConfig.icon.font }}</mat-icon>\n    </mat-card-title>\n\n    <mat-card-subtitle class=\"cf-form-header-subtitle\" *ngIf=\"subtitle\">{{ subtitle }}</mat-card-subtitle>\n\n    <div class=\"cf-form-header-buttons\">\n        <cf-field \n            *ngFor=\"let field of fields\"\n            [sourceIdentifier]=\"formIdentifier\" \n            [sourceIndex]=\"sourceIndex\" \n            [widgetArrayIndex]=\"widgetArrayIndex\"\n            [form]=\"form\"\n            [field]=\"field\"\n            [displayMode]=\"formDisplayMode\" \n            [value]=\"\"\n            (onFieldChange)=\"fieldChange($event)\">\n        </cf-field> \n        <!-- {{context | json}} -->\n        <!-- {{ originalData | json }} -->\n        <cf-button-group \n            [buttons]=\"buttons\" \n            [form]=\"form\" \n            [sourceIdentifier]=\"formIdentifier\"\n            [sourceIndex]=\"sourceIndex\"\n            [widgetArrayIndex]=\"widgetArrayIndex\"\n            [context]=\"context\"\n            [originalData]=\"originalData\"\n            (onClick)=\"buttonClick($event)\">\n        </cf-button-group>  \n    </div>\n</mat-card-header>",
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".cf-form-header-buttons{position:absolute;right:0;text-align:right;top:5px}.mat-card-header-text{margin:0 0 10px}.cf-form-header-title{margin-top:0!important}.cf-form-header-after-icon{text-align:center}"]
                },] }
    ];
    FormHeaderComponent.ctorParameters = function () { return [
        { type: ability.Ability }
    ]; };
    FormHeaderComponent.propDecorators = {
        form: [{ type: core.Input }],
        formHeaderConfig: [{ type: core.Input }],
        description: [{ type: core.Input }],
        formDisplayMode: [{ type: core.Input }],
        formIdentifier: [{ type: core.Input }],
        sourceIndex: [{ type: core.Input }],
        widgetArrayIndex: [{ type: core.Input }],
        originalData: [{ type: core.Input }],
        context: [{ type: core.Input }],
        formActions: [{ type: core.Input }],
        onFieldChange: [{ type: core.Output }],
        onButtonClick: [{ type: core.Output }]
    };

    var FormComponent = /** @class */ (function () {
        //  unflatten = require('flat').unflatten;
        function FormComponent(ability, breakpointObserver) {
            this.ability = ability;
            this.breakpointObserver = breakpointObserver;
            this.onFormChange = new core.EventEmitter();
            this.onFieldChange = new core.EventEmitter();
            this.onButtonClick = new core.EventEmitter();
            this.formFields = new Array();
            this.cellCount = 12;
            this.showButtons = true;
            this.formLayouts = new Array();
            AbilityUtils.setAbility(this.ability);
        }
        Object.defineProperty(FormComponent.prototype, "supportingRecord", {
            get: function () {
                return this._supportingRecord;
            },
            set: function (_supportingRecord) {
                this._supportingRecord = _supportingRecord;
                this.initFormGroup();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FormComponent.prototype, "record", {
            get: function () {
                return this._record;
            },
            set: function (_record) {
                this._record = _record;
                this.initFormGroup();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FormComponent.prototype, "reset", {
            get: function () {
                return this._reset;
            },
            set: function (_reset) {
                this._reset = _reset;
                if (this._reset == true) {
                    FormUtils.reset(this.form, this.formConfig);
                }
            },
            enumerable: false,
            configurable: true
        });
        FormComponent.prototype.ngOnInit = function () {
            this.getLayout();
            this.getActions();
            //    this.fieldDefaultSetting();
            this.dependencies = Object.assign(Object.assign({}, DependentUtils.getDependencyTree(this.formConfig.formFields)), DependentUtils.getDependencyTreeForButton(this.formConfig.action));
            this.getCustomLayout();
        };
        FormComponent.prototype.getCustomLayout = function () {
            if (this.formConfig.showCustomLayout) {
                FormCustomUtils.setCustomLayout(this.formConfig, this.formConfig.layout);
            }
            else {
                this.formConfig.showCustomLayout = false;
            }
        };
        FormComponent.prototype.getActions = function () {
            if (this.formConfig && this.formConfig.action && this.formConfig.action.align && this.formConfig.action.buttons && this.formConfig.action.buttons.length > 0) {
                this.formButton = this.formConfig.action;
            }
            if (this.formConfig && this.formConfig.action && this.formConfig.action.cells && this.formConfig.action.cells.length > 0) {
                this.formButtonLayout = this.formConfig.action;
            }
        };
        FormComponent.prototype.dependentFieldChange = function (action) {
            var _this = this;
            if (this.formConfig.identifier == action.sourceIdentifier) {
                var newRecord = ObjectUtils.unflatten(this.form.getRawValue());
                this.record = Object.assign(Object.assign({}, this.record), newRecord);
                console.log(this.record);
                this.initFormGroup();
                this.showButtons = false;
                setTimeout(function () {
                    _this.showButtons = true;
                }, 50);
            }
        };
        FormComponent.prototype.fieldChange = function (fieldChange) {
            this.onFieldChange.emit(fieldChange);
            this.onFormChange.emit(this.form);
        };
        FormComponent.prototype.buttonClick = function (event) {
            this.onButtonClick.emit(event);
        };
        FormComponent.prototype.fieldDefaultSetting = function () {
            var e_1, _a;
            if (this.formConfig) {
                try {
                    for (var _b = __values(this.formConfig.formFields), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var formField = _c.value;
                        if (!formField.field.fieldDisplayType) {
                            formField.field.fieldDisplayType = this.formConfig.displayType;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                if (!this.formConfig.displayInColumns) {
                    this.formConfig.displayInColumns = 1;
                }
            }
            this.setTitle();
        };
        FormComponent.prototype.setTitle = function () {
            if (this.formConfig.header) {
                var title = this.formConfig.header.title;
                switch (this.formConfig.displayMode) {
                    case "ADD" /* ADD */:
                        if (this.formConfig.header.addModeTitle) {
                            title = this.formConfig.header.addModeTitle;
                        }
                        break;
                    case "EDIT" /* EDIT */:
                        if (this.formConfig.header.editModeTitle) {
                            title = this.formConfig.header.editModeTitle;
                        }
                        break;
                    case "VIEW" /* VIEW */:
                        if (this.formConfig.header.viewModeTitle) {
                            title = this.formConfig.header.viewModeTitle;
                        }
                        break;
                    case "BLOCKED" /* BLOCKED */:
                        if (this.formConfig.header.viewModeTitle) {
                            title = this.formConfig.header.viewModeTitle;
                        }
                        break;
                }
                this.formConfig.header.title = title;
            }
        };
        FormComponent.prototype.initFormGroup = function () {
            KeyMapUtils.setOptionssUsingValues(this.keyMap, false, "FORM" /* FORM */, this.formConfig, this._record);
            this.form = FormUtils.initFormGroup(this.formConfig.formFields, this._supportingRecord, this._record, this.formConfig.displayMode);
            this.onFormChange.emit(this.form);
            if (this.isMobile || this.isTablet || this.isDesktop) {
                this.resetDisplayInColumn();
            }
        };
        // isValidButton(button: Button): boolean {
        //   let isValid: boolean = false;
        //   if (button.displayInFormModes.indexOf(this.formConfig.displayMode) > -1) {
        //     isValid = true;
        //   }
        //   return isValid;
        // }
        // isNewRow(index: number): string {
        //   let displayRow: string = "";
        //   if (index % this.formConfig.displayInColumns == 0) {
        //     displayRow = "row";
        //   }
        //   return displayRow;
        // }
        FormComponent.prototype.getFormValue = function () {
            return FormUtils.getRawValue(this.form);
        };
        FormComponent.prototype.transformRows = function () {
            var e_2, _a;
            var sectionLabel = "";
            var formLayouts = new Array();
            var index = -1;
            var displayInColumns = this.formConfig.displayInColumns;
            if (this.formConfig.formFields) {
                try {
                    for (var _b = __values(this.formConfig.formFields), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var formField = _c.value;
                        if (this.form.controls[formField.field.key] && DependentUtils.displayDependencyField(formField.field.dependentOnFields, this._supportingRecord, this._record)) {
                            if (formField.separator || sectionLabel == "") {
                                formLayouts.push({
                                    sectionLabel: formField && formField.separator && formField.separator.label ? formField.separator.label : "",
                                    sectionIcon: formField && formField.separator && formField.separator.icon ? formField.separator.icon : "",
                                    sectionExpandable: formField && formField.separator && formField.separator.expandable ? formField.separator.expandable : null,
                                    rows: new Array()
                                });
                                sectionLabel = "-";
                                index++;
                            }
                            if (formLayouts[index]) {
                                var rLength = formLayouts[index].rows.length;
                                if (formLayouts[index].rows.length == 0) {
                                    formLayouts[index].rows.push({ columns: new Array() });
                                    formLayouts[index].rows[0].columns = new Array();
                                }
                                var cLength = this.formFieldRowColumnCount(formLayouts, index);
                                if (cLength >= displayInColumns) {
                                    formLayouts[index].rows[rLength] = { columns: new Array() };
                                }
                                formLayouts[index].rows[formLayouts[index].rows.length - 1].columns.push(formField);
                            }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            this.formLayouts = formLayouts;
        };
        FormComponent.prototype.formFieldRowColumnCount = function (formLayouts, index) {
            var colCount = 0;
            for (var cCnt = 0; cCnt < formLayouts[index].rows[formLayouts[index].rows.length - 1].columns.length; cCnt++) {
                if (formLayouts[index].rows[formLayouts[index].rows.length - 1].columns[cCnt].displayInColumns) {
                    colCount += formLayouts[index].rows[formLayouts[index].rows.length - 1].columns[cCnt].displayInColumns;
                }
                else {
                    colCount += 1;
                    formLayouts[index].rows[formLayouts[index].rows.length - 1].columns[cCnt].displayInColumns = 1;
                }
            }
            return colCount;
        };
        FormComponent.prototype.toggleList = function (formLayout) {
            if (formLayout.sectionExpandable && formLayout.sectionExpandable.allowed) {
                if (formLayout.sectionExpandable.default == "EXPAND" /* EXPAND */) {
                    formLayout.sectionExpandable.default = "COLLAPSE" /* COLLAPSE */;
                }
                else {
                    formLayout.sectionExpandable.default = "EXPAND" /* EXPAND */;
                }
            }
        };
        FormComponent.prototype.getLayout = function () {
            var _this = this;
            this.breakpointSubscription = this.breakpointObserver.observe([
                layout.Breakpoints.XSmall,
                layout.Breakpoints.Small,
                layout.Breakpoints.Medium,
                layout.Breakpoints.Large,
                layout.Breakpoints.XLarge
            ]).subscribe(function (state) {
                if (state.breakpoints[layout.Breakpoints.XSmall]) {
                    _this.isMobile = true;
                    console.log('Matches XSmall viewport');
                }
                if (state.breakpoints[layout.Breakpoints.Small]) {
                    _this.isTablet = true;
                    console.log('Matches Small viewport');
                }
                if (state.breakpoints[layout.Breakpoints.Medium]) {
                    _this.isDesktop = true;
                    console.log('Matches Medium  viewport');
                }
                if (state.breakpoints[layout.Breakpoints.Large]) {
                    _this.isDesktop = true;
                    console.log('Matches Large viewport');
                }
                if (state.breakpoints[layout.Breakpoints.XLarge]) {
                    _this.isDesktop = true;
                    console.log('Matches XLarge viewport');
                }
                _this.resetButtonDisplay();
                _this.resetDisplayInColumn();
            });
        };
        FormComponent.prototype.resetButtonDisplay = function () {
            if (this.formConfig && this.formConfig.action && !CollectionUtils.isEmpty(this.formConfig.action.buttons)) {
                if ((this.isMobile || this.isTablet) && !ButtonUtils.hasWidth(this.formConfig.action.buttons)) {
                    ButtonUtils.setEqualWidth(this.formConfig.action.buttons);
                }
            }
        };
        FormComponent.prototype.resetDisplayInColumn = function () {
            var _this = this;
            if (this.formConfig && this.formConfig.displayInColumns) {
                if (this.isMobile) {
                    this.cellCount = 4;
                    this.formConfig.displayInColumns = this.getNewDisplayInColumn("mobile", this.formConfig.displayInColumns);
                }
                if (this.isTablet) {
                    this.cellCount = 8;
                    this.formConfig.displayInColumns = this.getNewDisplayInColumn("tablet", this.formConfig.displayInColumns);
                }
            }
            if (this.formConfig && !CollectionUtils.isEmpty(this.formConfig.formFields)) {
                this.formConfig.formFields.forEach(function (formField) {
                    if (formField.displayInColumns) {
                        if (_this.isMobile) {
                            _this.cellCount = 4;
                            formField.displayInColumns = _this.getNewDisplayInColumn("mobile", formField.displayInColumns);
                        }
                        if (_this.isTablet) {
                            _this.cellCount = 8;
                            formField.displayInColumns = _this.getNewDisplayInColumn("tablet", formField.displayInColumns);
                        }
                    }
                    else {
                        formField.displayInColumns = 1;
                    }
                });
            }
            this.fieldDefaultSetting();
            this.transformRows();
        };
        FormComponent.prototype.getNewDisplayInColumn = function (device, displayInColumn) {
            var displayInColumnMap = new Map();
            var mobileMap = new Map();
            mobileMap.set(12, 1);
            mobileMap.set(11, 1);
            mobileMap.set(10, 1);
            mobileMap.set(9, 1);
            mobileMap.set(8, 1);
            mobileMap.set(7, 1);
            mobileMap.set(6, 1);
            mobileMap.set(5, 1);
            mobileMap.set(4, 1);
            mobileMap.set(3, 1);
            mobileMap.set(2, 1);
            mobileMap.set(1, 1);
            displayInColumnMap.set("mobile", mobileMap);
            var tabletMap = new Map();
            tabletMap.set(12, 2);
            tabletMap.set(11, 2);
            tabletMap.set(10, 2);
            tabletMap.set(9, 2);
            tabletMap.set(8, 2);
            tabletMap.set(7, 2);
            tabletMap.set(6, 2);
            tabletMap.set(5, 2);
            tabletMap.set(4, 2);
            tabletMap.set(3, 2);
            tabletMap.set(2, 2);
            tabletMap.set(1, 1);
            displayInColumnMap.set("tablet", tabletMap);
            return displayInColumnMap.get(device).get(displayInColumn);
        };
        FormComponent.prototype.ngOnDestroy = function () {
            if (this.breakpointSubscription) {
                this.breakpointSubscription.unsubscribe();
            }
        };
        return FormComponent;
    }());
    FormComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'cf-form',
                    template: "<mat-card *ngIf=\"(isMobile || isTablet || isDesktop) && formConfig && (formConfig.permission == null || (formConfig.permission && (formConfig.permission['subject'] | can: formConfig.permission['action'])))\" class=\"cf-form-container\">\n  <!-- <mat-card *ngIf=\"formConfig && (formConfig.permission == null || (formConfig.permission && (formConfig.permission['subject'] | can: formConfig.permission['action'])))\"> -->\n  \n  <cf-form-header \n    *ngIf=\"formConfig.header && formConfig.header.title\"\n    class=\"cf-form-header\"\n    [formHeaderConfig]=\"formConfig.header\"  \n    [description]=\"formConfig.description\"\n    [sourceIndex]=\"sourceIndex\"\n    [widgetArrayIndex]=\"widgetArrayIndex\"\n    [formDisplayMode]=\"formConfig.displayMode\" \n    [formIdentifier]=\"formConfig.identifier\"\n    [form]=\"form\"\n    [originalData]=\"originalData\"\n    [context]=\"getFormValue()\"\n    [formActions]=\"formConfig.header.actions\"\n    (onFieldChange)=\"fieldChange($event)\"\n    (onButtonClick)=\"buttonClick($event)\"\n  ></cf-form-header>  \n\n  <mat-card-content *ngIf=\"!formConfig.showCustomLayout\">\n    <div class=\"mdc-layout-grid cf-table\" *ngIf=\"formConfig.description && formConfig.description.text && formConfig.description.bgColor\">\n      <div class=\"mdc-layout-grid__inner\">\n        <div class=\"mdc-layout-grid__cell--span-{{cellCount}}\">\n          <div \n            class=\"cf-form-header-desc\"\n            [style.background-color]=\"formConfig.description.bgColor\"\n            [style.color]=\"formConfig.description.textColor\"\n          >\n            <mat-icon class=\"cf-form-header-desc-icon\" aria-hidden=\"true\" [attr.aria-label]=\"formConfig.description.icon\" *ngIf=\"formConfig.description.icon\">{{formConfig.description.icon}}</mat-icon>\n            <span>{{ formConfig.description.text }}</span>\n          </div>\n        </div>\n      </div>\n    </div>\n    <mat-divider class=\"cf-form-header-divider\" *ngIf=\"formConfig.formFields && formConfig.formFields.length > 0 && (formConfig.header && formConfig.header.title) && (!formConfig.description || !formConfig.description.bgColor)\"></mat-divider>\n    <mat-card-subtitle *ngIf=\"formConfig.description && formConfig.description.text && !formConfig.description.bgColor\">{{ formConfig.description.text }}</mat-card-subtitle>\n\n    <div class=\"fields-container\">\n      <mat-list *ngFor=\"let formLayout of formLayouts\">\n        <mat-list-item \n          *ngIf=\"formLayout.sectionLabel\" \n          class=\"cf-form-separator\" \n          (click)=\"toggleList(formLayout)\">\n          <!-- <mat-icon *ngIf=\"formLayout.sectionIcon\" matListIcon>{{ formLayout.sectionIcon }}</mat-icon> -->\n          <span>\n            <span [ngClass]=\"{'cf-form-separator-expandable': formLayout.sectionExpandable && formLayout.sectionExpandable.allowed}\">\n              {{formLayout.sectionLabel}}\n            </span>\n            <mat-icon class=\"cf-form-section-showhide\" *ngIf=\"formLayout.sectionExpandable && formLayout.sectionExpandable.allowed && formLayout.sectionExpandable.default == 'COLLAPSE'\" matListIcon>keyboard_arrow_down</mat-icon>\n            <mat-icon class=\"cf-form-section-showhide\" *ngIf=\"formLayout.sectionExpandable && formLayout.sectionExpandable.allowed && formLayout.sectionExpandable.default == 'EXPAND'\" matListIcon>keyboard_arrow_up</mat-icon>\n          </span>\n          \n        </mat-list-item>\n        <mat-divider class=\"cf-form-section-divider\" *ngIf=\"formLayout.sectionLabel && ((!formLayout.sectionExpandable || !formLayout.sectionExpandable.allowed) || (formLayout.sectionExpandable && formLayout.sectionExpandable.allowed && formLayout.sectionExpandable.default == 'EXPAND'))\"></mat-divider>\n        <div class=\"mdc-layout-grid cf-form-field-container\" [hidden]=\"formLayout.sectionExpandable && formLayout.sectionExpandable.allowed && formLayout.sectionExpandable.default == 'COLLAPSE'\">\n          <!-- <pre>{{formLayout | json}}</pre> -->\n          <div class=\"mdc-layout-grid__inner\" *ngFor=\"let row of formLayout.rows; let rIndex = index;\">\n            <div class=\"mdc-layout-grid__cell--span-{{cellCount / formConfig.displayInColumns * (column.displayInColumns ? column.displayInColumns : 1)}} mdc-layout-grid__cell--align-top\" *ngFor=\"let column of row.columns\">\n              <!-- <pre>\n                {{column | json}}\n                {{form.controls[column.field.key]}}\n              </pre> -->\n              <ng-container \n                [ngTemplateOutlet]=\"cfControl\"\n                [ngTemplateOutletContext]=\"{formField: column}\"\n              ></ng-container>\n            </div>\n          </div>\n        </div> \n      </mat-list>\n    </div>\n  </mat-card-content>\n  <!-- <pre>{{originalData | json}}</pre> -->\n\n  <mat-card-content class=\"cf-card-mobile\" *ngIf=\"formConfig.showCustomLayout\">\n    <mat-grid-list \n      [cols]=\"formConfig.layout.cellCount\"  \n      [rowHeight]=\"formConfig.layout.rowHeight\">\n      <mat-grid-tile\n        *ngFor=\"let cell of formConfig.layout.cells\"\n        [colspan]=\"cell.cols\"\n        [rowspan]=\"cell.rows\">\n        <span class=\"cf-card-mobile-cell-container\" *ngIf=\"cell.controls && cell.controls.length > 0; else elseValue;\">\n          <div class=\"cf-card-mobile-cell-inline\" *ngIf=\"cell.displayInline && cell.displayInline.separator; else elseValue;\"> \n            <ng-container \n              [ngTemplateOutlet]=\"cfCustomCell\"\n              [ngTemplateOutletContext]=\"{cell:cell}\"\n            ></ng-container>\n          </div>\n          <ng-template #elseValue>\n            <div class=\"cf-card-mobile-cell\">\n              <ng-container  \n                [ngTemplateOutlet]=\"cfCustomCell\"\n                [ngTemplateOutletContext]=\"{cell:cell}\"\n              ></ng-container>\n            </div>\n          </ng-template>\n        </span>\n        <ng-template #elseValue>\n          <span\n            *ngIf=\"cell.separator && (cell.separator.label || cell.separator.icon)\" \n            class=\"cf-form-separator\" \n          >\n            <mat-icon *ngIf=\"cell.separator.icon\" matListIcon>{{ cell.separator.icon }}</mat-icon>\n            <span>{{cell.separator.label}}</span>\n          </span>\n        </ng-template>\n    </mat-grid-tile>\n    </mat-grid-list>   \n  </mat-card-content>\n\n  <mat-card-actions \n    class=\"cf-form-action\"  \n    [style.text-align]=\"formButton.align\"\n    *ngIf=\"formButton && showButtons\">\n    <cf-button-group \n      [buttons]=\"formButton.buttons\" \n      [form]=\"form\" \n      [formDisplayMode]=\"formConfig.displayMode\"\n      [sourceIdentifier]=\"formConfig.identifier\"\n      [sourceIndex]=\"sourceIndex\" \n      [widgetArrayIndex]=\"widgetArrayIndex\"\n      [originalData]=\"originalData\"\n      [context]=\"getFormValue()\" \n      (onClick)=\"buttonClick($event)\"> \n    </cf-button-group>\n  </mat-card-actions> \n\n  <mat-card-actions  \n    class=\"cf-form-action\"  \n    *ngIf=\"formButtonLayout && showButtons\">\n    <mat-grid-list \n      [cols]=\"cellCount\"  \n      [rowHeight]=\"formButtonLayout.rowHeight\">\n      <mat-grid-tile\n        *ngFor=\"let cell of formButtonLayout.cells\"\n        [colspan]=\"cell.cols\"\n        [rowspan]=\"cell.rows\"> \n        <div [ngClass]=\"{'cf-form-button-grid-cell-left': cell.buttons.align == 'left', 'cf-form-button-grid-cell-right': cell.buttons.align == 'right'}\">\n          <cf-button-group \n            [buttons]=\"cell.buttons.buttons\" \n            [form]=\"form\" \n            [formDisplayMode]=\"formConfig.displayMode\"\n            [sourceIdentifier]=\"formConfig.identifier\"\n            [sourceIndex]=\"sourceIndex\" \n            [widgetArrayIndex]=\"widgetArrayIndex\"\n            [originalData]=\"originalData\"\n            [context]=\"getFormValue()\" \n            (onClick)=\"buttonClick($event)\">\n          </cf-button-group>\n        </div>\n      </mat-grid-tile>\n    </mat-grid-list>\n  </mat-card-actions> \n</mat-card>\n\n<ng-template #cfCustomCell let-cell=\"cell\"> \n  <span \n    [ngClass]=\"{'fullwidth': control.fullWidth}\"\n    *ngFor=\"let control of cell.controls; let cControlIndex = index;\">\n    <!-- {{control.control.key}} --> \n    <span \n      class=\"cf-card-mobile-control-separator\"\n      *ngIf=\"cell.displayInline && cell.displayInline.separator && cControlIndex > 0\" \n      [innerHtml]=\"cell.displayInline.separator\"></span>\n\n      <!-- =={{cell.link | json}}--{{cell.linkKey}}--=={{control.control.key}}=={{control.type}}== -->\n      <!-- //{{control.colIndex}}-{{control.cControlIndex}} -->\n      <ng-container \n        *ngIf=\"control.type == 'FIELD'\"\n        [ngTemplateOutlet]=\"cfControl\"\n        [ngTemplateOutletContext]=\"{formField: control.control}\"\n      ></ng-container>\n  </span>\n</ng-template>\n\n<ng-template #cfControl let-formField=\"formField\">\n  <cf-field \n    *ngIf=\"formField && !formField.addMore\"\n    [sourceType]=\"'FORM'\"\n    [sourceIdentifier]=\"formConfig.identifier\" \n    [sourceIndex]=\"sourceIndex\" \n    [widgetArrayIndex]=\"widgetArrayIndex\"\n    [form]=\"form\" \n    [keyMap]=\"keyMap\"\n    [fieldControl]=\"form.controls[formField.field.key]\"\n    [field]=\"formField.field\"\n    [originalData]=\"originalData\"\n    [displayMode]=\"formConfig.displayMode\" \n    [value]=\"\" \n    [dependencies]=\"dependencies\"\n    (onDependentFieldChange)=\"dependentFieldChange($event)\"\n    (onFieldChange)=\"fieldChange($event)\"\n    (onButtonClick)=\"buttonClick($event)\"\n    class=\"cf-form-field\">\n  </cf-field>\n  <ng-template [ngIf]=\"formField && formField.addMore\">\n    <span *ngFor=\"let fieldControl of form.controls[formField.field.key]['controls']; let i=index;\">\n      <cf-field\n        [sourceType]=\"'FORM'\"\n        [sourceIdentifier]=\"formConfig.identifier\" \n        [sourceIndex]=\"sourceIndex\" \n        [widgetArrayIndex]=\"widgetArrayIndex\"\n        [fieldIndex]=\"i\"\n        [form]=\"form\" \n        [keyMap]=\"keyMap\"\n        [fieldControl]=\"fieldControl\"\n        [field]=\"formField.field\"\n        [originalData]=\"originalData\"\n        [displayMode]=\"formConfig.displayMode\" \n        [value]=\"\" \n        [isAddMore]=\"formField.addMore\"\n        [addMorePermission]=\"formField.addMorePermission\"\n        [device]=\"isDesktop ? 'desktop' : (isTablet ? 'tablet' : 'mobile')\"\n        [displayInColumns]=\"cellCount / formConfig.displayInColumns * (formField.displayInColumns ? formField.displayInColumns : 1)\"\n        [dependencies]=\"dependencies\"\n        (onDependentFieldChange)=\"dependentFieldChange($event)\"\n        (onFieldChange)=\"fieldChange($event)\"\n        (onButtonClick)=\"buttonClick($event)\"\n        class=\"cf-form-field\">\n      </cf-field>\n    </span>\n  </ng-template>\n</ng-template>\n\n",
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [":root{--mdc-layout-grid-column-width-desktop:72px;--mdc-layout-grid-column-width-phone:72px;--mdc-layout-grid-column-width-tablet:72px;--mdc-layout-grid-gutter-desktop:24px;--mdc-layout-grid-gutter-phone:16px;--mdc-layout-grid-gutter-tablet:16px;--mdc-layout-grid-margin-desktop:24px;--mdc-layout-grid-margin-phone:16px;--mdc-layout-grid-margin-tablet:16px}@media (min-width:840px){.mdc-layout-grid{box-sizing:border-box;margin:0 auto;padding:24px;padding:var(--mdc-layout-grid-margin-desktop,24px)}}@media (min-width:600px) and (max-width:839px){.mdc-layout-grid{box-sizing:border-box;margin:0 auto;padding:16px;padding:var(--mdc-layout-grid-margin-tablet,16px)}}@media (max-width:599px){.mdc-layout-grid{box-sizing:border-box;margin:0 auto;padding:16px;padding:var(--mdc-layout-grid-margin-phone,16px)}}@media (min-width:840px){.mdc-layout-grid__inner{align-items:stretch;display:flex;flex-flow:row wrap;margin:-12px;margin:calc(var(--mdc-layout-grid-gutter-desktop, 24px)/2*-1)}@supports (display:grid){.mdc-layout-grid__inner{-ms-grid-columns:(minmax(0,1fr))[12];display:-ms-grid;display:grid;grid-gap:24px;grid-gap:var(--mdc-layout-grid-gutter-desktop,24px);grid-template-columns:repeat(12,minmax(0,1fr));margin:0}}}@media (min-width:600px) and (max-width:839px){.mdc-layout-grid__inner{align-items:stretch;display:flex;flex-flow:row wrap;margin:-8px;margin:calc(var(--mdc-layout-grid-gutter-tablet, 16px)/2*-1)}@supports (display:grid){.mdc-layout-grid__inner{-ms-grid-columns:(minmax(0,1fr))[8];display:-ms-grid;display:grid;grid-gap:16px;grid-gap:var(--mdc-layout-grid-gutter-tablet,16px);grid-template-columns:repeat(8,minmax(0,1fr));margin:0}}}@media (max-width:599px){.mdc-layout-grid__inner{align-items:stretch;display:flex;flex-flow:row wrap;margin:-8px;margin:calc(var(--mdc-layout-grid-gutter-phone, 16px)/2*-1)}@supports (display:grid){.mdc-layout-grid__inner{-ms-grid-columns:(minmax(0,1fr))[4];display:-ms-grid;display:grid;grid-gap:16px;grid-gap:var(--mdc-layout-grid-gutter-phone,16px);grid-template-columns:repeat(4,minmax(0,1fr));margin:0}}}@media (min-width:840px){.mdc-layout-grid__cell{box-sizing:border-box;margin:12px;margin:calc(var(--mdc-layout-grid-gutter-desktop, 24px)/2);width:calc(33.33333% - 24px);width:calc(33.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell{-ms-grid-column-span:4;grid-column-end:span 4;margin:0;width:auto}}.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-desktop{width:calc(8.33333% - 24px);width:calc(8.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-desktop{-ms-grid-column-span:1;grid-column-end:span 1;width:auto}}.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-desktop{width:calc(16.66667% - 24px);width:calc(16.66667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-desktop{-ms-grid-column-span:2;grid-column-end:span 2;width:auto}}.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-desktop{width:calc(25% - 24px);width:calc(25% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-desktop{-ms-grid-column-span:3;grid-column-end:span 3;width:auto}}.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-desktop{width:calc(33.33333% - 24px);width:calc(33.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-desktop{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-desktop{width:calc(41.66667% - 24px);width:calc(41.66667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-desktop{-ms-grid-column-span:5;grid-column-end:span 5;width:auto}}.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-desktop{width:calc(50% - 24px);width:calc(50% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-desktop{-ms-grid-column-span:6;grid-column-end:span 6;width:auto}}.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-desktop{width:calc(58.33333% - 24px);width:calc(58.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-desktop{-ms-grid-column-span:7;grid-column-end:span 7;width:auto}}.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-desktop{width:calc(66.66667% - 24px);width:calc(66.66667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-desktop{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-desktop{width:calc(75% - 24px);width:calc(75% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-desktop{-ms-grid-column-span:9;grid-column-end:span 9;width:auto}}.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-desktop{width:calc(83.33333% - 24px);width:calc(83.33333% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-desktop{-ms-grid-column-span:10;grid-column-end:span 10;width:auto}}.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-desktop{width:calc(91.66667% - 24px);width:calc(91.66667% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-desktop{-ms-grid-column-span:11;grid-column-end:span 11;width:auto}}.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-desktop{width:calc(100% - 24px);width:calc(100% - var(--mdc-layout-grid-gutter-desktop, 24px))}@supports (display:grid){.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-desktop{-ms-grid-column-span:12;grid-column-end:span 12;width:auto}}}@media (min-width:600px) and (max-width:839px){.mdc-layout-grid__cell{box-sizing:border-box;margin:8px;margin:calc(var(--mdc-layout-grid-gutter-tablet, 16px)/2);width:calc(50% - 16px);width:calc(50% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell{-ms-grid-column-span:4;grid-column-end:span 4;margin:0;width:auto}}.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-tablet{width:calc(12.5% - 16px);width:calc(12.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-tablet{-ms-grid-column-span:1;grid-column-end:span 1;width:auto}}.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-tablet{width:calc(25% - 16px);width:calc(25% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-tablet{-ms-grid-column-span:2;grid-column-end:span 2;width:auto}}.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-tablet{width:calc(37.5% - 16px);width:calc(37.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-tablet{-ms-grid-column-span:3;grid-column-end:span 3;width:auto}}.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-tablet{width:calc(50% - 16px);width:calc(50% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-tablet{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-tablet{width:calc(62.5% - 16px);width:calc(62.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-tablet{-ms-grid-column-span:5;grid-column-end:span 5;width:auto}}.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-tablet{width:calc(75% - 16px);width:calc(75% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-tablet{-ms-grid-column-span:6;grid-column-end:span 6;width:auto}}.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-tablet{width:calc(87.5% - 16px);width:calc(87.5% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-tablet{-ms-grid-column-span:7;grid-column-end:span 7;width:auto}}.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-tablet{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-tablet, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-tablet{-ms-grid-column-span:8;grid-column-end:span 8;width:auto}}}@media (max-width:599px){.mdc-layout-grid__cell{box-sizing:border-box;margin:8px;margin:calc(var(--mdc-layout-grid-gutter-phone, 16px)/2);width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell{-ms-grid-column-span:4;grid-column-end:span 4;margin:0;width:auto}}.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-phone{width:calc(25% - 16px);width:calc(25% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-1,.mdc-layout-grid__cell--span-1-phone{-ms-grid-column-span:1;grid-column-end:span 1;width:auto}}.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-phone{width:calc(50% - 16px);width:calc(50% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-2,.mdc-layout-grid__cell--span-2-phone{-ms-grid-column-span:2;grid-column-end:span 2;width:auto}}.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-phone{width:calc(75% - 16px);width:calc(75% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-3,.mdc-layout-grid__cell--span-3-phone{-ms-grid-column-span:3;grid-column-end:span 3;width:auto}}.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-4,.mdc-layout-grid__cell--span-4-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-5,.mdc-layout-grid__cell--span-5-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-6,.mdc-layout-grid__cell--span-6-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-7,.mdc-layout-grid__cell--span-7-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-8,.mdc-layout-grid__cell--span-8-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-9,.mdc-layout-grid__cell--span-9-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-10,.mdc-layout-grid__cell--span-10-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-11,.mdc-layout-grid__cell--span-11-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-phone{width:calc(100% - 16px);width:calc(100% - var(--mdc-layout-grid-gutter-phone, 16px))}@supports (display:grid){.mdc-layout-grid__cell--span-12,.mdc-layout-grid__cell--span-12-phone{-ms-grid-column-span:4;grid-column-end:span 4;width:auto}}}.mdc-layout-grid__cell--order-1{order:1}.mdc-layout-grid__cell--order-2{order:2}.mdc-layout-grid__cell--order-3{order:3}.mdc-layout-grid__cell--order-4{order:4}.mdc-layout-grid__cell--order-5{order:5}.mdc-layout-grid__cell--order-6{order:6}.mdc-layout-grid__cell--order-7{order:7}.mdc-layout-grid__cell--order-8{order:8}.mdc-layout-grid__cell--order-9{order:9}.mdc-layout-grid__cell--order-10{order:10}.mdc-layout-grid__cell--order-11{order:11}.mdc-layout-grid__cell--order-12{order:12}.mdc-layout-grid__cell--align-top{align-self:flex-start}@supports (display:grid){.mdc-layout-grid__cell--align-top{-ms-grid-row-align:start;align-self:start}}.mdc-layout-grid__cell--align-middle{-ms-grid-row-align:center;align-self:center}.mdc-layout-grid__cell--align-bottom{align-self:flex-end}@supports (display:grid){.mdc-layout-grid__cell--align-bottom{-ms-grid-row-align:end;align-self:end}}@media (min-width:840px){.mdc-layout-grid--fixed-column-width{width:1176px;width:calc(var(--mdc-layout-grid-column-width-desktop, 72px)*12 + var(--mdc-layout-grid-gutter-desktop, 24px)*11 + var(--mdc-layout-grid-margin-desktop, 24px)*2)}}@media (min-width:600px) and (max-width:839px){.mdc-layout-grid--fixed-column-width{width:720px;width:calc(var(--mdc-layout-grid-column-width-tablet, 72px)*8 + var(--mdc-layout-grid-gutter-tablet, 16px)*7 + var(--mdc-layout-grid-margin-tablet, 16px)*2)}}@media (max-width:599px){.mdc-layout-grid--fixed-column-width{width:368px;width:calc(var(--mdc-layout-grid-column-width-phone, 72px)*4 + var(--mdc-layout-grid-gutter-phone, 16px)*3 + var(--mdc-layout-grid-margin-phone, 16px)*2)}}.mdc-layout-grid--align-left{margin-left:0;margin-right:auto}.mdc-layout-grid--align-right{margin-left:auto;margin-right:0}body{margin:0}.cf-form-container{box-shadow:none!important}.cf-form-field{width:100%}.cf-form-separator{font-size:12px}.cf-form-separator .mat-list-item-content{padding-left:0!important}.mdc-layout-grid{padding:0!important}.mat-card-header-text{margin:0}.cf-form-header-desc{padding:5px 10px;width:auto}.cf-form-header-desc-icon{font-size:15px;height:15px!important;margin-top:0;padding:0 5px 0 0;width:15px!important}.mat-card-subtitle{padding-top:12px}.cf-form-field-container{padding-top:8px!important}.fields-container .mat-list-base{padding-top:0!important}.cf-form-separator-expandable{color:#00f!important;cursor:pointer;text-decoration:underline}.cf-form-section-showhide{font-size:16px!important;height:16px!important;width:16px!important}.cf-form-button-grid-cell-left{bottom:8px;left:8px;position:absolute}.cf-form-button-grid-cell-right{bottom:8px;position:absolute;right:8px}.cf-form-section-divider{border-top-color:#696969;border-top-width:2px!important}::-webkit-scrollbar{height:8px;width:8px}::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 4px rgba(0,0,0,.38);border-radius:2px}::-webkit-scrollbar-thumb{-webkit-box-shadow:inset 0 0 2px rgba(0,0,0,.5);border-radius:8px}::-webkit-scrollbar-thumb,::-webkit-scrollbar-thumb:window-inactive{background:rgba(0,0,0,.38)}.cf-card-mobile{margin-bottom:12px;word-wrap:break-word}.cf-card-mobile .mat-grid-tile .mat-figure{justify-content:unset}.cf-card-mobile .cf-primary-text .cf-field-value{font-size:18px;font-weight:400;margin-bottom:none}.cf-card-mobile .cf-secondary-text .cf-field-value{font-size:14px;font-weight:300;margin-bottom:none;margin-top:4px}.cf-card-mobile .cf-tertiary-text .cf-field-value{font-size:12px;font-weight:300;margin-bottom:none;margin-top:8px}.cf-card-mobile .cf-card-mobile-cell-container{width:100%}.cf-card-mobile .cf-card-mobile-cell{display:block;padding:4px;width:100%}.cf-card-mobile .cf-card-mobile-cell .fullwidth button{width:100%}.cf-card-mobile .cf-card-mobile-cell .cf-primary-text .cf-field-value,.cf-card-mobile .cf-card-mobile-cell .cf-secondary-text .cf-field-value,.cf-card-mobile .cf-card-mobile-cell .cf-tertiary-text .cf-field-value{display:block}.cf-card-mobile .cf-card-mobile-cell .fullwidth button,.cf-card-mobile .cf-card-mobile-cell .fullwidth mat-chip{width:100%}.cf-card-mobile .cf-card-mobile-cell-inline{display:inline-block;width:100%}.cf-card-mobile .cf-card-mobile-cell-inline .cf-card-mobile-control-separator{padding:4px}"]
                },] }
    ];
    FormComponent.ctorParameters = function () { return [
        { type: ability.Ability },
        { type: layout.BreakpointObserver }
    ]; };
    FormComponent.propDecorators = {
        formConfig: [{ type: core.Input }],
        sourceIdentifier: [{ type: core.Input }],
        sourceIndex: [{ type: core.Input }],
        widgetArrayIndex: [{ type: core.Input }],
        originalData: [{ type: core.Input }],
        keyMap: [{ type: core.Input }],
        onFormChange: [{ type: core.Output }],
        onFieldChange: [{ type: core.Output }],
        onButtonClick: [{ type: core.Output }],
        supportingRecord: [{ type: core.Input }],
        record: [{ type: core.Input }],
        reset: [{ type: core.Input }],
        form: [{ type: core.Input }]
    };

    //extends ModalInterfaceComponent
    var CrudListComponentInterface = /** @class */ (function () {
        function CrudListComponentInterface() {
            this.keyMap = new Array();
            // super();
        }
        CrudListComponentInterface.prototype.ngOnInit = function () {
            this.setCommonConfig();
            this.setListConfig();
        };
        CrudListComponentInterface.prototype.setCommonConfig = function () {
        };
        CrudListComponentInterface.prototype.setListConfig = function () {
        };
        CrudListComponentInterface.prototype.setBadges = function () {
            return null;
        };
        CrudListComponentInterface.prototype.setCommonConfigUsingCrud = function (crud) {
            //  Config
            this.identifier = crud.identifier;
            this.header = crud.header;
            //  Tab wise data/setting
            //this.keyMap = {};
            this.listReset = true;
        };
        CrudListComponentInterface.prototype.setListConfigUsingCrud = function (crud) {
            //  Config
            this.quickLinks = crud.quickLinks;
            this.searchConfig = crud.search;
            this.listConfig = crud.list;
            this.actions = crud.actions;
            this.setConfigListData([], []);
        };
        CrudListComponentInterface.prototype.loadFilterParams = function (filterStr) {
            if (filterStr != null) {
                var filter = SecurityUtils.decrypt(filterStr);
                this.configListData.searchData = filter;
            }
            else {
            }
            this.configListData.pageNo = 1;
        };
        CrudListComponentInterface.prototype.setConfigListData = function (records, badges, route) {
            var configListDataNew = {
                pageBackRoute: route,
                badges: badges,
                records: records,
                originalData: this.originalData
            };
            this.configListData = Object.assign(Object.assign({}, this.configListData), configListDataNew);
        };
        CrudListComponentInterface.prototype.getRowKey = function (lIndex) {
            var keys;
            if (this.listConfig && this.listConfig.lists && this.listConfig.lists[lIndex]) {
                keys = this.listConfig.lists[lIndex].uniqueKeys;
            }
            else {
                keys = new Array();
            }
            return keys;
        };
        CrudListComponentInterface.prototype.getChildRowKey = function (lIndex) {
            var keys;
            if (this.listConfig && this.listConfig.lists && this.listConfig.lists[lIndex] && this.listConfig.lists[lIndex].child && this.listConfig.lists[lIndex].child.record && this.listConfig.lists[lIndex].child.record.uniqueKeys) {
                keys = this.listConfig.lists[lIndex].child.record.uniqueKeys;
            }
            else {
                keys = new Array();
            }
            return keys;
        };
        CrudListComponentInterface.prototype.getChildRecordIdentifier = function (lIndex) {
            var childRecordIdentifier;
            if (this.listConfig && this.listConfig.lists && this.listConfig.lists[lIndex] && this.listConfig.lists[lIndex].child) {
                childRecordIdentifier = this.listConfig.lists[lIndex].child.recordIdentifier;
            }
            else {
                childRecordIdentifier = "";
            }
            return childRecordIdentifier;
        };
        CrudListComponentInterface.prototype.beforeChangeMerge = function (action, sourceIdentifier) {
            var e_1, _a;
            var rows;
            var rowIndex = -1;
            if (this.configListData && this.configListData.records) {
                for (var lIndex = 0; lIndex < this.configListData.records.length; lIndex++) {
                    if (this.listConfig.lists[lIndex].identifier == sourceIdentifier) {
                        for (var rIndex = 0; rIndex < this.configListData.records[lIndex].rows.length; rIndex++) {
                            var keys = this.getRowKey(lIndex);
                            var isMatchingRow = true;
                            try {
                                for (var keys_1 = (e_1 = void 0, __values(keys)), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                                    var key = keys_1_1.value;
                                    if (this.configListData.records[lIndex].rows[rIndex][key] != action.originalData[key]) {
                                        isMatchingRow = false;
                                    }
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                            if (isMatchingRow) {
                                this.configListData.records[lIndex].rows[rIndex] = Object.assign(Object.assign({}, action.originalData), action.data);
                                rows = this.configListData.records[lIndex].rows;
                                rowIndex = rIndex;
                                break;
                            }
                        }
                    }
                }
            }
            return { rows: rows, rowIndex: rowIndex };
        };
        CrudListComponentInterface.prototype.addRow = function (action, sourceIdentifier, data) {
            var rows;
            var rowIndex = -1;
            if (this.configListData && this.configListData.records) {
                for (var lIndex = 0; lIndex < this.configListData.records.length; lIndex++) {
                    if (this.listConfig.lists[lIndex].identifier == sourceIdentifier) {
                        if (CollectionUtils.isEmpty(data)) {
                            this.configListData.records[lIndex].rows.push({});
                        }
                        else {
                            this.configListData.records[lIndex].rows.push(data);
                        }
                        rows = this.configListData.records[lIndex].rows;
                        rowIndex = this.configListData.records[lIndex].rows.length - 1;
                        break;
                    }
                }
            }
            return { rows: rows, rowIndex: rowIndex };
        };
        CrudListComponentInterface.prototype.afterChangeMerge = function () {
            this.configListData = JSON.parse(JSON.stringify(this.configListData));
            this.listReset = true;
        };
        CrudListComponentInterface.prototype.beforeChildChangeMerge = function (action, sourceIdentifier) {
            var e_2, _a, e_3, _b;
            var rows;
            var rowIndex = -1;
            if (this.configListData && this.configListData.records) {
                for (var lIndex = 0; lIndex < this.configListData.records.length; lIndex++) {
                    if (this.listConfig.lists[lIndex].identifier == sourceIdentifier) {
                        for (var rIndex = 0; rIndex < this.configListData.records[lIndex].rows.length; rIndex++) {
                            var keys = this.getRowKey(lIndex);
                            var isMatchingRow = true;
                            try {
                                for (var keys_2 = (e_2 = void 0, __values(keys)), keys_2_1 = keys_2.next(); !keys_2_1.done; keys_2_1 = keys_2.next()) {
                                    var key = keys_2_1.value;
                                    if (action.parentHierarchy.parent['key'].indexOf(this.configListData.records[lIndex].rows[rIndex][key]) < -1) {
                                        isMatchingRow = false;
                                    }
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (keys_2_1 && !keys_2_1.done && (_a = keys_2.return)) _a.call(keys_2);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                            if (isMatchingRow) {
                                var childRecordIdentifier = this.getChildRecordIdentifier(lIndex);
                                for (var cIndex = 0; cIndex < this.configListData.records[lIndex].rows[rIndex][childRecordIdentifier].length; cIndex++) {
                                    var keys_4 = this.getChildRowKey(lIndex);
                                    var isChildMatchingRow = true;
                                    try {
                                        for (var keys_3 = (e_3 = void 0, __values(keys_4)), keys_3_1 = keys_3.next(); !keys_3_1.done; keys_3_1 = keys_3.next()) {
                                            var key = keys_3_1.value;
                                            if (this.configListData.records[lIndex].rows[rIndex][childRecordIdentifier][cIndex][key] != action.originalData[key]) {
                                                isChildMatchingRow = false;
                                            }
                                        }
                                    }
                                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                    finally {
                                        try {
                                            if (keys_3_1 && !keys_3_1.done && (_b = keys_3.return)) _b.call(keys_3);
                                        }
                                        finally { if (e_3) throw e_3.error; }
                                    }
                                    if (isChildMatchingRow) {
                                        this.configListData.records[lIndex].rows[rIndex][childRecordIdentifier][cIndex] = Object.assign(Object.assign({}, action.originalData), action.data);
                                        rows = this.configListData.records[lIndex].rows[rIndex][childRecordIdentifier];
                                        rowIndex = cIndex;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return { rows: rows, rowIndex: rowIndex };
        };
        CrudListComponentInterface.prototype.addChildRow = function (action, sourceIdentifier, data) {
            var e_4, _a;
            var rows;
            var rowIndex = -1;
            if (this.configListData && this.configListData.records) {
                for (var lIndex = 0; lIndex < this.configListData.records.length; lIndex++) {
                    if (this.listConfig.lists[lIndex].identifier == action.sourceIdentifier) {
                        for (var rIndex = 0; rIndex < this.configListData.records[lIndex].rows.length; rIndex++) {
                            var keys = this.getRowKey(lIndex);
                            var isMatchingRow = true;
                            try {
                                for (var keys_5 = (e_4 = void 0, __values(keys)), keys_5_1 = keys_5.next(); !keys_5_1.done; keys_5_1 = keys_5.next()) {
                                    var key = keys_5_1.value;
                                    if (action.originalData[key].indexOf(this.configListData.records[lIndex].rows[rIndex][key]) < -1) {
                                        isMatchingRow = false;
                                    }
                                }
                            }
                            catch (e_4_1) { e_4 = { error: e_4_1 }; }
                            finally {
                                try {
                                    if (keys_5_1 && !keys_5_1.done && (_a = keys_5.return)) _a.call(keys_5);
                                }
                                finally { if (e_4) throw e_4.error; }
                            }
                            if (isMatchingRow) {
                                var childRecordIdentifier = this.getChildRecordIdentifier(lIndex);
                                for (var cIndex = 0; cIndex < this.configListData.records[lIndex].rows[rIndex][childRecordIdentifier].length; cIndex++) {
                                    if (CollectionUtils.isEmpty(data)) {
                                        this.configListData.records[lIndex].rows[rIndex][childRecordIdentifier].push({});
                                    }
                                    else {
                                        this.configListData.records[lIndex].rows[rIndex][childRecordIdentifier].push(data);
                                    }
                                    rows = this.configListData.records[lIndex].rows[rIndex][childRecordIdentifier];
                                    rowIndex = cIndex;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            return { rows: rows, rowIndex: rowIndex };
        };
        CrudListComponentInterface.prototype.setTabDisplayMode = function (crudTabs, formDisplayMode) {
            CrudUtils.setDisplayType(crudTabs, formDisplayMode);
        };
        CrudListComponentInterface.prototype.afterChildChangeMerge = function () {
            this.afterChangeMerge();
        };
        CrudListComponentInterface.prototype.setHeaderTitle = function (title) {
            this.header.title = title;
        };
        CrudListComponentInterface.prototype.setHeaderDescription = function (description) {
            this.header.description.text = description;
        };
        return CrudListComponentInterface;
    }());
    CrudListComponentInterface.decorators = [
        { type: core.Component, args: [{
                    selector: 'cf-crud-list-interface',
                    template: "<p>crud-list works!</p>\n",
                    styles: [""]
                },] }
    ];
    CrudListComponentInterface.ctorParameters = function () { return []; };

    var ChipsComponent = /** @class */ (function (_super) {
        __extends(ChipsComponent, _super);
        function ChipsComponent(router, ability) {
            var _this = _super.call(this, router, ability) || this;
            _this.router = router;
            _this.ability = ability;
            _this.field = null;
            _this.onListChange = new core.EventEmitter();
            _this.placeholder = '';
            _this.separatorKeysCodes = [keycodes.ENTER]; //SPACE
            _this.chips = [];
            _this.addOnBlur = true;
            _this.addItem = function ($event) {
                var input = $event.input;
                var value = $event.value;
                var keyExists = _this.keyExists(value.trim());
                // Add our item
                if ((value || '').trim() && !keyExists) {
                    _this.chips.push({
                        key: value.trim(),
                        value: value.trim(),
                        disabled: false,
                        removable: _this.removable || true
                    });
                }
                // Reset the input value
                if (input) {
                    input.value = '';
                }
                _this.triggerChangedEvent($event);
            };
            _this.removeItem = function ($event, item, index) {
                _this.chips.splice(index, 1);
                // if (this.isFunctionDefined(this.field.onRemoveItem)) {
                //     this.field.onRemoveItem(item.value).subscribe(result => {
                //         if (result) {
                //             this.chips.splice(index, 1);
                //             this.triggerChangedEvent($event);
                //         }
                //     });
                // }
            };
            _this.drop = function ($event) {
                dragDrop.moveItemInArray(_this.chips, $event.previousIndex, $event.currentIndex);
                _this.triggerChangedEvent($event);
            };
            _this.triggerChangedEvent = function ($event) {
                var values = _this.chips.map(function (x) { return x.key; });
                _this.formControl.setValue(values);
                _this.onListChange.emit({
                    values: values,
                    event: $event
                });
            };
            _this.onSelected = function (event) {
                var keyExists = _this.keyExists(event.option.value['key']);
                if (!keyExists) {
                    _this.chips.push({
                        key: event.option.value['key'],
                        value: event.option.value['value'],
                        removable: true,
                        disabled: false
                    });
                    _this.input.nativeElement.value = '';
                    _this.triggerChangedEvent(event);
                }
            };
            _this.isFunctionDefined = function (func) {
                return typeof func == 'function';
            };
            return _this;
        }
        ;
        ChipsComponent.prototype.setDescribedByIds = function (ids) {
            throw new Error('Method not implemented.');
        };
        ChipsComponent.prototype.onContainerClick = function (event) {
            throw new Error('Method not implemented.');
        };
        ChipsComponent.prototype.ngOnInit = function () {
            this.placeholder = this.field.placeholder || '';
            this.orientation = this.field.orientation || "HORIZONTAL" /* HORIZONTAL */;
            this.options = this.field.options || [];
            this.setChips();
        };
        ChipsComponent.prototype.setChips = function () {
            var _this = this;
            var values = this.formControl.value;
            var isReadOnly = FieldUtils.isFieldDisabled(this.field, this.displayMode, values);
            if (!CollectionUtils.isEmpty(values)) {
                values.forEach(function (value) {
                    if (!CollectionUtils.isEmpty(_this.field.options)) {
                        var optionMatch_1 = null;
                        _this.field.options.forEach(function (option) {
                            if (option.key == value) {
                                optionMatch_1 = option;
                            }
                        });
                        if (optionMatch_1 != null) {
                            _this.chips.push({
                                key: optionMatch_1.key,
                                value: optionMatch_1.value,
                                disabled: isReadOnly,
                                removable: true
                            });
                        }
                        else {
                            _this.chips.push({
                                key: value,
                                value: value,
                                disabled: isReadOnly,
                                removable: true
                            });
                        }
                    }
                    else {
                        _this.chips.push({
                            key: value,
                            value: value,
                            disabled: isReadOnly,
                            removable: true
                        });
                    }
                });
            }
            else {
                this.chips = [];
            }
        };
        ChipsComponent.prototype.keyExists = function (value) {
            var keyExists = false;
            this.chips.forEach(function (chip) {
                if (chip.key == value) {
                    keyExists = true;
                }
            });
            return keyExists;
        };
        ChipsComponent.prototype.errors = function () {
            var _this = this;
            var errors = [];
            if (this.formControl != undefined) {
                if (this.formControl && this.formControl.errors) {
                    Object.keys(this.formControl.errors).forEach(function (keyError) {
                        var e_1, _a;
                        if (_this.field.validations) {
                            try {
                                for (var _b = __values(_this.field.validations), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    var validation = _c.value;
                                    if (keyError === validation.message.key) {
                                        errors[errors.length] = { error: keyError, message: validation.message.message };
                                    }
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                        }
                    });
                }
            }
            return errors;
        };
        return ChipsComponent;
    }(FieldComponent));
    ChipsComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'cf-chips',
                    template: "<ng-container *ngIf=\"!enableDragAndDrop && options.length==0\">\n    <ng-container *ngTemplateOutlet=\"chipListStandard\"></ng-container>\n</ng-container>\n<ng-container *ngIf=\"!enableDragAndDrop && options.length>0\">\n    <ng-container *ngTemplateOutlet=\"chipListAutoComplete\"></ng-container>\n</ng-container>\n\n<!-- Chip list Standard -->\n<ng-template #chipListStandard>\n    <mat-form-field \n        [appearance]=\"appearance | lowercase\"\n        class=\"cf-chip-list\">\n        <mat-label class=\"cf-field-lbl cf-field-lbl-{{field.key}}\" *ngIf=\"!(hideLabel == true) && field.fieldDisplayType != 'HORIZONTAL'\">\n          <strong>{{field.label}}</strong>\n          <span class=\"cf-field-lbl-req\" *ngIf=\"isRequired\">*</span>\n          <span *ngIf=\"field.help && field.help.message && field.help.displayType == 'PLAIN_TEXT' && field.help.withLabel\">\n            {{field.help.message}}\n          </span>\n        </mat-label>\n        <!-- <mat-label class=\"cf-field-lbl\" *ngIf=\"(hideLabel == true)\"> \n        </mat-label> -->\n  \n        <mat-icon \n          *ngIf=\"field.icon\" \n          matPrefix\n          aria-hidden=\"true\" \n          [attr.aria-label]=\"field.icon\" \n          class=\"cf-field-icon\" \n        >{{field.icon}}</mat-icon>\n  \n        <mat-chip-list #chipList [ngClass]=\"{'mat-chip-list-stacked': orientation === 'VERTICAL'}\">\n            <mat-chip *ngFor=\"let chip of chips;let i=index\" [removable]=\"chip.removable || true\"\n                (removed)=\"removeItem($event,chip,i)\" class=\"chip-item\" [disabled]=\"chip.disabled\">\n                {{chip.value}}\n                <mat-icon matChipRemove *ngIf=\"chip.removable\">cancel</mat-icon>\n            </mat-chip>\n            <!-- [formControl]=\"formControl\"  -->\n            <input \n                matInput \n                #input \n                [id]=\"field.key\"\n                [placeholder]=\"placeholder\" \n                [matChipInputFor]=\"chipList\"\n                [errorStateMatcher]=\"errorMatcher\"\n                [disabled]=\"disabled\"\n                [matChipInputSeparatorKeyCodes]=\"separatorKeysCodes\" \n                [matChipInputAddOnBlur]=\"addOnBlur\"\n                (matChipInputTokenEnd)=\"addItem($event)\" />\n        </mat-chip-list>\n        <cf-button\n            matSuffix\n            *ngIf=\"hasClear && !hasFieldNavigate && !(field.help && field.help.displayType == 'TOOLTIP' && field.help.message)\"\n            [button]=\"textClearButton\"\n            class=\"cf-field-clr-btn cf-field-clr-btn-{{field.key}}\"\n            (onClick)=\"cleanValue()\"\n        ></cf-button>\n        <cf-button\n            matSuffix\n            *ngIf=\"hasFieldNavigate\"\n            [button]=\"routeToButton\"\n            class=\"cf-field-clr-btn cf-field-clr-btn-{{field.key}}\"\n            (onClick)=\"resolvedValue = ''\"\n        ></cf-button> \n        <cf-tooltip matSuffix [field]=\"field\"></cf-tooltip>\n\n        <!-- <ng-container *ngTemplateOutlet=\"cfHelp;\"></ng-container> -->\n        <mat-hint *ngIf=\"field.help && field.help.message && field.help.displayType == 'PLAIN_TEXT' && !field.help.withLabel\" class=\"cf-field-hint\">\n            <mat-icon \n            aria-hidden=\"true\"  \n            [attr.aria-label]=\"field.help.message\" \n            class=\"cf-field-hint-icon\">\n            {{field.help.icon ? field.help.icon : 'live_help'}}\n            </mat-icon>\n            {{field.help.message}}\n        </mat-hint>\n\n        <mat-error aria-hidden=\"true\" [attr.aria-label]=\"error.message\" *ngFor=\"let error of errors()\" [innerHtml]=\"error.message\"></mat-error>\n    </mat-form-field>\n</ng-template>\n\n<!-- Chip list with Autocomplete -->\n<ng-template #chipListAutoComplete>\n    <mat-form-field class=\"cf-chip-list\">\n        <mat-label class=\"cf-field-lbl cf-field-lbl-{{field.key}}\" *ngIf=\"!(hideLabel == true) && field.fieldDisplayType != 'HORIZONTAL'\">\n            <strong>{{field.label}}</strong>\n            <span class=\"cf-field-lbl-req\" *ngIf=\"isRequired\">*</span>\n            <span *ngIf=\"field.help && field.help.message && field.help.displayType == 'PLAIN_TEXT' && field.help.withLabel\">\n              {{field.help.message}}\n            </span>\n          </mat-label>\n          <!-- <mat-label class=\"cf-field-lbl\" *ngIf=\"(hideLabel == true)\"> \n          </mat-label> -->\n    \n          <mat-icon \n            *ngIf=\"field.icon\" \n            matPrefix\n            aria-hidden=\"true\" \n            [attr.aria-label]=\"field.icon\" \n            class=\"cf-field-icon\" \n          >{{field.icon}}</mat-icon>\n      \n        <mat-chip-list #chipList [ngClass]=\"{'mat-chip-list-stacked': orientation === 'VERTICAL'}\">\n            <mat-chip *ngFor=\"let chip of chips;let i=index\" [removable]=\"chip.removable || true\"\n                (removed)=\"removeItem($event,chip,i)\" class=\"chip-item\" [disabled]=\"chip.disabled\">\n                {{chip.value}}\n                <mat-icon matChipRemove *ngIf=\"chip.removable\">cancel</mat-icon>\n            </mat-chip>\n            <!-- [formControl]=\"formControl\"  -->\n            <input \n                matInput \n                #input \n                [id]=\"field.key\"\n                [placeholder]=\"placeholder\" \n                [matChipInputFor]=\"chipList\"\n                [errorStateMatcher]=\"errorMatcher\"\n                [disabled]=\"disabled\"\n                [matChipInputSeparatorKeyCodes]=\"separatorKeysCodes\" \n                [matChipInputAddOnBlur]=\"addOnBlur\"\n                [matAutocomplete]=\"auto\" />\n        </mat-chip-list>\n        <mat-error aria-hidden=\"true\" [attr.aria-label]=\"error.message\" *ngFor=\"let error of errors()\" [innerHtml]=\"error.message\"></mat-error>\n        <mat-autocomplete #auto=\"matAutocomplete\" (optionSelected)=\"onSelected($event)\">\n            <mat-option \n                *ngFor=\"let option of options\" \n                [value]=\"option\"\n                [disabled]=\"option.disabled\" >\n                {{option.value}}\n                <!-- <span [innerHTML]=\"option.value | highlight: highlightAutoCompleteText\"></span> -->\n            </mat-option>\n        </mat-autocomplete>\n\n        <cf-button\n            matSuffix\n            *ngIf=\"hasClear && !hasFieldNavigate && !(field.help && field.help.displayType == 'TOOLTIP' && field.help.message)\"\n            [button]=\"textClearButton\"\n            class=\"cf-field-clr-btn cf-field-clr-btn-{{field.key}}\"\n            (onClick)=\"cleanValue()\"\n        ></cf-button>\n        <cf-button\n            matSuffix\n            *ngIf=\"hasFieldNavigate\"\n            [button]=\"routeToButton\"\n            class=\"cf-field-clr-btn cf-field-clr-btn-{{field.key}}\"\n            (onClick)=\"resolvedValue = ''\"\n        ></cf-button> \n        <cf-tooltip matSuffix [field]=\"field\"></cf-tooltip>\n\n        <!-- <ng-container *ngTemplateOutlet=\"cfHelp;\"></ng-container> -->\n        <mat-hint *ngIf=\"field.help && field.help.message && field.help.displayType == 'PLAIN_TEXT' && !field.help.withLabel\" class=\"cf-field-hint\">\n            <mat-icon \n            aria-hidden=\"true\" \n            [attr.aria-label]=\"field.help.message\" \n            class=\"cf-field-hint-icon\">\n            {{field.help.icon ? field.help.icon : 'live_help'}}\n            </mat-icon>\n            {{field.help.message}}\n        </mat-hint>\n\n        <mat-error aria-hidden=\"true\" [attr.aria-label]=\"error.message\" *ngFor=\"let error of errors()\" [innerHtml]=\"error.message\"></mat-error>\n\n    </mat-form-field>\n</ng-template>\n\n",
                    styles: [".cf-chip-list{width:100%}.cf-chip-list .chip-item.cdk-drag-animating,.cf-chip-list .hip-item .cdk-drop-list-dragging{transition:transform .25s cubic-bezier(0,0,.2,1)}.cf-chip-list .mat-chip-list-stacked input.mat-chip-input{flex:none}"]
                },] }
    ];
    ChipsComponent.ctorParameters = function () { return [
        { type: router.Router },
        { type: ability.Ability }
    ]; };
    ChipsComponent.propDecorators = {
        field: [{ type: core.Input }],
        disabled: [{ type: core.Input }],
        formControl: [{ type: core.Input }],
        errorMatcher: [{ type: core.Input }],
        input: [{ type: core.ViewChild, args: ['input',] }],
        matAutocomplete: [{ type: core.ViewChild, args: ['auto',] }],
        onListChange: [{ type: core.Output }]
    };

    var ToolbarComponent = /** @class */ (function () {
        function ToolbarComponent() {
            this.field = null;
            this.onMenuClick = function (item) {
                item.onClick(item);
            };
        }
        ToolbarComponent.prototype.ngOnInit = function () {
            this.title = this.field.title;
            this.menuItems = this.field.menuItems;
        };
        return ToolbarComponent;
    }());
    ToolbarComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'cf-toolbar',
                    template: "<span>\n    <button mat-button *ngFor=\"let item of menuItems\" (click)=\"onMenuClick(item)\"\n    [fxShow]=\"item.showOnDesktop\" \n    [fxShow.xs]=\"item.showOnMobile\"\n    [fxShow.sm]=\"item.showOnTablet\">\n        <mat-icon class=\"mr\">{{item.icon}}</mat-icon>\n        {{item.label}}\n    </button>\n    <button mat-icon-button [matMenuTriggerFor]=\"dropMenu\">\n        <mat-icon>more_vert</mat-icon>\n    </button>\n    <mat-menu #dropMenu=\"matMenu\">\n        <ng-container *ngFor=\"let item of menuItems\">\n            <div [fxShow]=\"!item.showOnDesktop\" \n                [fxShow.sm]=\"!item.showOnTablet\" \n                [fxShow.xs]=\"!item.showOnMobile\">\n                <button mat-menu-item (click)=\"onMenuClick(item)\">\n                    <mat-icon class=\"mr\">{{item.icon}}</mat-icon>\n                    {{item.label}}\n                </button>\n                <mat-divider></mat-divider>\n            </div>\n        </ng-container>\n    </mat-menu>\n</span>",
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".cf-chip-list{width:100%}.cf-chip-list .chip-item.cdk-drag-animating,.cf-chip-list .hip-item .cdk-drop-list-dragging{transition:transform .25s cubic-bezier(0,0,.2,1)}"]
                },] }
    ];
    ToolbarComponent.ctorParameters = function () { return []; };
    ToolbarComponent.propDecorators = {
        field: [{ type: core.Input }]
    };

    var MultiImageComponent = /** @class */ (function () {
        function MultiImageComponent() {
            var _this = this;
            this.field = null;
            this.onShowAllClick = function () {
                _this.count = _this.images.length;
            };
        }
        MultiImageComponent.prototype.ngOnInit = function () {
            this.radius = (this.field.radius || 5) * 10;
            this.showCount = this.field.showCount || false;
            this.showAll = this.field.showAll || false;
            this.images = this.field.images;
            this.images = this.images ? this.images : this.field.value;
            this.count = this.field.count || (this.images ? this.images.length : 0);
            if (this.showCount && (this.showAll || !this.showAll)) {
                this.lastItemLabel = '+' + (this.images.length - this.count);
            }
            else if (this.showAll && !this.showCount) {
                this.lastItemLabel = '>';
            }
            this.hideTooltip = this.images && this.images.length > 0 && (typeof this.images[0] == 'string');
        };
        return MultiImageComponent;
    }());
    MultiImageComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'cf-multi-image',
                    template: "<div class=\"avatars cf-field-nm\"  [ngClass]=\"{'cf-disable': disabled}\">\n    <ng-container *ngFor=\"let img of images; let i=index,let last = last\">\n        <div class=\"avatar\"  *ngIf=\"i<count\" matTooltip=\"{{img.name}}\" [matTooltipDisabled]=\"hideTooltip\"\n            [style.margin-left.px]=\"i==0? 0:-radius/2\" [style.z-index]=\"1000-i\">\n            <img class=\"item\" src=\"{{img.url || img}}\" [style.width.px]=\"radius\" [style.height.px]=\"radius\"/>\n        </div>\n    </ng-container>\n    <span class=\"avatar\" *ngIf=\"(showCount || showAll) && (count !== images.length)\"\n        [style.margin-left.px]=\"-radius/2\" [style.width.px]=\"radius\">\n        <button class=\"item\"  (click)=\"onShowAllClick()\"\n            [style.padding-left.px]=\"radius/4\" \n            [disabled]=\"(disabled || !showAll)\" \n            [style.width.px]=\"radius\" \n            [style.height.px]=\"radius\">\n            {{lastItemLabel}}\n        </button>\n    </span>\n</div>",
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".avatars{display:flex;margin-bottom:1.25em!important;overflow:auto;width:100%}.item{align-items:center;background-color:#bbb;border-radius:9999px;box-shadow:0 0 0 2px #fff;color:#fff;display:flex;justify-content:center}button{background:transparent;border:none;color:#4d4d4d;font-size:18px}button:hover:not([disabled]){background-color:rgba(103,58,183,.5803921568627451);cursor:pointer}button:disabled:hover:not([disabled]){color:#ccc}"]
                },] }
    ];
    MultiImageComponent.ctorParameters = function () { return []; };
    MultiImageComponent.propDecorators = {
        field: [{ type: core.Input }],
        control: [{ type: core.Input }],
        disabled: [{ type: core.Input }]
    };

    var ParagraphComponent = /** @class */ (function (_super) {
        __extends(ParagraphComponent, _super);
        function ParagraphComponent(router, ability) {
            var _this = _super.call(this, router, ability) || this;
            _this.router = router;
            _this.ability = ability;
            _this.tokens = new Array();
            _this.onButtonClick = new core.EventEmitter();
            return _this;
        }
        ParagraphComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.paragraphField = this.field;
            var words = this.paragraphField.template.split(' ');
            if (words && words.length > 0) {
                words.map(function (word) {
                    var key = word.slice(1, -1);
                    if (word.indexOf('{') == -1) {
                        _this.tokens.push({ type: 'LABEL', value: word });
                    }
                    else if (word.indexOf('{') != -1 && _this.paragraphField.fieldContexts[key] != undefined) {
                        _this.tokens.push({ type: 'FIELD', field: _this.paragraphField.fieldContexts[key] });
                        if (_this.paragraphField.isReadOnly) {
                            _this.paragraphField.fieldContexts[key]['isReadOnly'] = _this.paragraphField.isReadOnly;
                        }
                        if (_this.paragraphField.displayMode == "LABEL" /* LABEL */) {
                            _this.paragraphField.fieldContexts[key]['displayMode'] = "LABEL" /* LABEL */;
                        }
                    }
                    else if (word.indexOf('{') != -1 && _this.paragraphField.buttonContexts[key] != undefined) {
                        _this.tokens.push({ type: 'BUTTON', button: _this.paragraphField.buttonContexts[key] });
                        // if (this.paragraphField.isReadOnly) {
                        //     this.paragraphField.buttonContexts[key]['displayMode'] = DisplayMode.DISABLED;
                        // }
                    }
                });
            }
        };
        ParagraphComponent.prototype.fieldChange = function (fieldChange) {
            this.onFieldChange.emit(fieldChange);
        };
        ParagraphComponent.prototype.isButtonDisable = function () {
            return ButtonUtils.isDisable(this.displayMode) || this.paragraphField.isReadOnly;
        };
        ParagraphComponent.prototype.getFormValue = function () {
            return FormUtils.getRawValue(this.form);
        };
        ParagraphComponent.prototype.buttonClick = function (event) {
            console.log(event);
            this.onButtonClick.emit(event);
        };
        return ParagraphComponent;
    }(FieldComponent));
    ParagraphComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'cf-paragraph',
                    template: "<ng-container *ngFor=\"let token of tokens\">\n    <ng-container *ngIf=\"token.type == 'LABEL'\">\n        <span class=\"text\">{{token.value}} </span>\n    </ng-container>\n    <ng-container *ngIf=\"token.type == 'FIELD'\">\n        <cf-field \n            [sourceType]=\"sourceType\"\n            [sourceIdentifier]=\"sourceIdentifier\" \n            [sourceIndex]=\"sourceIndex\" \n            [widgetArrayIndex]=\"widgetArrayIndex\"\n            [form]=\"form\" \n            [fieldControl]=\"fieldControl['controls'][token.field.key]\"\n            [keyMap]=\"keyMap\"\n            [field]=\"token.field\"\n            [displayMode]=\"displayMode\" \n            [value]=\"\" \n            (onFieldChange)=\"fieldChange($event)\" \n            class=\"field\">\n        </cf-field> \n    </ng-container> \n    <ng-container *ngIf=\"token.type == 'BUTTON'\">\n        <!-- \n        [buttonRoute]=\"buttonRoute\"\n        [parentHierarchy]=\"parentHierarchy\"\n         -->\n        <cf-button\n            [form]=\"form\"\n            [sourceIdentifier]=\"sourceIdentifier\"\n            [sourceIndex]=\"sourceIndex\"\n            class=\"button\"\n            [widgetArrayIndex]=\"widgetArrayIndex\"\n            [button]=\"token.button\"\n            [context]=\"getFormValue()\"\n            [originalData]=\"originalData\"\n            [formDisplayMode]=\"displayMode\"\n            [disabled]=\"isButtonDisable()\"\n            (onClick)=\"buttonClick($event)\"\n        ></cf-button>\n    </ng-container>\n</ng-container>",
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".text{vertical-align:middle}.button,.field{padding:0 10px}"]
                },] }
    ];
    ParagraphComponent.ctorParameters = function () { return [
        { type: router.Router },
        { type: ability.Ability }
    ]; };
    ParagraphComponent.propDecorators = {
        onButtonClick: [{ type: core.Output }]
    };

    var HighlightPipe = /** @class */ (function () {
        function HighlightPipe() {
        }
        HighlightPipe.prototype.transform = function (text, search) {
            var pattern = search
                .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
                .split(' ')
                .filter(function (t) { return t.length > 0; })
                .join('|');
            var regex = new RegExp(pattern, 'gi');
            return search ? text.replace(regex, function (match) { return "<b>" + match + "</b>"; }) : text;
        };
        return HighlightPipe;
    }());
    HighlightPipe.decorators = [
        { type: core.Pipe, args: [{ name: 'highlight' },] }
    ];

    var TooltipComponent = /** @class */ (function () {
        function TooltipComponent() {
            this.field = null;
        }
        TooltipComponent.prototype.ngOnInit = function () {
            this.hasFieldNavigate = this.fieldNavigate();
            if (this.field.help && this.field.help.orientation) {
                this.placement = this.field.help.orientation.toLowerCase();
            }
            else {
                this.placement = 'bottom';
            }
            ;
        };
        TooltipComponent.prototype.fieldNavigate = function () {
            var hasFieldNavigate = false;
            if (this.field.navigate && (!StringUtils.isEmpty(this.field.navigate.icon) || !StringUtils.isEmpty(this.field.navigate.text)) && !CollectionUtils.isEmpty(this.field.navigate.routeTo)) {
                hasFieldNavigate = true;
            }
            return hasFieldNavigate;
        };
        return TooltipComponent;
    }());
    TooltipComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'cf-tooltip',
                    template: "    <!-- <mat-icon  matSuffix inline=\"true\"> {{field.help.icon ? field.help.icon : 'live_help'}}</mat-icon> -->\n<span *ngIf=\"field.help && field.help.message && !hasFieldNavigate && field.help.displayType == 'TOOLTIP'\" \n    [tooltip]=\"HtmlContent\"\n    [placement]=\"placement\"\n    theme=\"light\"\n    content-type=\"template\"\n    class=\"cf-field-hint cf-field-hint-inline cf-field-hint-{{field.key}}\">\n    \n    <button mat-icon-button class=\"cf-tooltip-button\">\n        <mat-icon inline=\"true\"> {{field.help.icon ? field.help.icon : 'live_help'}}</mat-icon>\n    </button>\n</span>\n\n<ng-template #HtmlContent>\n    <mat-card class=\"tooltip-card\">\n        <mat-card-header>\n            {{field.help.title}}\n        </mat-card-header>\n        <mat-card-content>\n            {{field.help.message}}\n        </mat-card-content>\n    </mat-card>\n</ng-template>",
                    encapsulation: core.ViewEncapsulation.None,
                    styles: [".tooltip{background-color:#fff!important;max-width:260px;padding:0!important}.tooltip .tooltip-card{margin:0!important;padding:0!important}.tooltip .tooltip-card .mat-card-header{background-color:#e5e3e3!important;color:#4d4d4d}.tooltip .tooltip-card .mat-card-content,.tooltip .tooltip-card .mat-card-header{padding:10px;text-align:left}.tooltip-top:after{border-color:#444 transparent transparent!important;border-width:7px!important;margin-left:-7px!important}.cf-tooltip-button{color:rgba(0,0,0,.54)}"]
                },] }
    ];
    TooltipComponent.ctorParameters = function () { return []; };
    TooltipComponent.propDecorators = {
        field: [{ type: core.Input }],
        control: [{ type: core.Input }]
    };

    var NgInit = /** @class */ (function () {
        function NgInit() {
            this.ngInit = new core.EventEmitter();
        }
        NgInit.prototype.ngOnInit = function () {
            this.ngInit.emit();
        };
        return NgInit;
    }());
    NgInit.decorators = [
        { type: core.Directive, args: [{
                    selector: '[ngInit]'
                },] }
    ];
    NgInit.propDecorators = {
        ngInit: [{ type: core.Output }]
    };

    var SafeHtmlPipe = /** @class */ (function () {
        function SafeHtmlPipe(sanitizer) {
            this.sanitizer = sanitizer;
        }
        SafeHtmlPipe.prototype.transform = function (value, args) {
            return this.sanitizer.bypassSecurityTrustHtml(value);
        };
        return SafeHtmlPipe;
    }());
    SafeHtmlPipe.decorators = [
        { type: core.Pipe, args: [{
                    name: 'safeHtml'
                },] }
    ];
    SafeHtmlPipe.ctorParameters = function () { return [
        { type: platformBrowser.DomSanitizer }
    ]; };

    var cfTemplateDirective = /** @class */ (function () {
        function cfTemplateDirective(vcRef, compiler) {
            this.vcRef = vcRef;
            this.compiler = compiler;
        }
        cfTemplateDirective.prototype.ngOnChanges = function () {
            var _this = this;
            if (!this.cfTemplate) {
                if (this.componentRef) {
                    this.updateProperties();
                    return;
                }
                throw Error('You must provide template.');
            }
            this.vcRef.clear();
            this.componentRef = null;
            var component = this.createDynamicComponent(this.cfTemplate);
            var module = this.createDynamicModule(component);
            this.compiler.compileModuleAndAllComponentsAsync(module)
                .then(function (moduleWithFactories) {
                var componentFactory = moduleWithFactories.componentFactories.find(function (x) { return x.componentType === component; });
                _this.componentRef = _this.vcRef.createComponent(componentFactory);
                _this.updateProperties();
            })
                .catch(function (error) {
                console.log(error);
            });
        };
        cfTemplateDirective.prototype.updateProperties = function () {
            for (var prop in this.cfTemplateContext) {
                this.componentRef.instance[prop] = this.cfTemplateContext[prop];
            }
        };
        cfTemplateDirective.prototype.createDynamicComponent = function (template) {
            var CustomDynamicComponent = /** @class */ (function () {
                function CustomDynamicComponent() {
                }
                return CustomDynamicComponent;
            }());
            CustomDynamicComponent.decorators = [
                { type: core.Component, args: [{
                            selector: 'cf-dynamic-component',
                            template: template
                        },] }
            ];
            return CustomDynamicComponent;
        };
        cfTemplateDirective.prototype.createDynamicModule = function (component) {
            var CfDynamicModule = /** @class */ (function () {
                function CfDynamicModule() {
                }
                return CfDynamicModule;
            }());
            CfDynamicModule.decorators = [
                { type: core.NgModule, args: [{
                            // Every element you might need must be known for this module
                            imports: [common.CommonModule, AdminBuilderModule],
                            declarations: [component]
                        },] }
            ];
            return CfDynamicModule;
        };
        return cfTemplateDirective;
    }());
    cfTemplateDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[cfTemplate]'
                },] }
    ];
    cfTemplateDirective.ctorParameters = function () { return [
        { type: core.ViewContainerRef },
        { type: core.Compiler }
    ]; };
    cfTemplateDirective.propDecorators = {
        cfTemplate: [{ type: core.Input }],
        cfTemplateContext: [{ type: core.Input }],
        currentComponent: [{ type: core.Input }]
    };

    var NavigationComponent = /** @class */ (function () {
        function NavigationComponent() {
            this.isExpanded = true;
            this.logout = new core.EventEmitter();
            this.showSubmenu = [false];
            this.isShowing = false;
            this.showSubSubMenu = [[false, false], false];
            // this.navigation = this.navigationPanel[0].navigations;
        }
        NavigationComponent.prototype.mouseenter = function () {
            if (!this.isExpanded) {
                this.isShowing = true;
            }
        };
        NavigationComponent.prototype.mouseleave = function () {
            if (!this.isExpanded) {
                this.isShowing = false;
            }
        };
        NavigationComponent.prototype.logoutEvent = function () {
            this.logout.emit();
        };
        NavigationComponent.prototype.ngOnInit = function () {
            this.navigation = this.navigationPanel.navigations;
        };
        return NavigationComponent;
    }());
    NavigationComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'admin-navigation',
                    template: "<mat-sidenav-container class=\"admin-container\" autosize>\n  <mat-sidenav #sidenav class=\"admin-sidenav\"\n    [ngClass]=\"{'side-width':(isExpanded || isShowing),'mobile-side-remove':!isExpanded,'collaps-width':(!isExpanded && !isShowing)}\"\n    mode=\"side\" opened=\"true\" (mouseenter)=\"mouseenter()\" (mouseleave)=\"mouseleave()\">\n    <span class=\"flex-layout\">\n\n      <mat-nav-list>\n        <div *ngFor=\"let data of navigation;let i=index\">\n          <!-- <mat-list-item (click)=\"showSubmenu[0] = !showSubmenu[0]\" class=\"parent\">\n          <span class=\"full-width\" *ngIf=\"isExpanded || isShowing\">{{data.name}}</span>\n          <mat-icon mat-list-icon>{{data.icon}}</mat-icon>\n          <mat-icon class=\"menu-button\" [ngClass]=\"{'rotated' : showSubmenu[0]}\" *ngIf=\"isExpanded || isShowing\">\n            expand_more</mat-icon>\n        </mat-list-item> -->\n          <ng-container *ngTemplateOutlet=\"mainmenu; context: {menu:data,index:i}\"></ng-container>\n\n        </div>\n      </mat-nav-list>\n\n      <footer *ngIf=\"navigationPanel.footer\">\n        <mat-nav-list>\n          <mat-list-item *ngIf=\"navigationPanel.footer.logout\" (click)=\"logoutEvent()\">\n            <ng-container *ngIf=\"navigationPanel.footer?.template.content as tmpl; else footertemplate\">\n\n              <ng-container cfTemplate [cfTemplate]=\"'<style>'+navigationPanel.footer?.template?.css+'</style>'+tmpl\">\n              </ng-container>\n            </ng-container>\n          </mat-list-item>\n        </mat-nav-list>\n\n\n      </footer>\n\n    </span>\n  </mat-sidenav>\n\n  <ng-content></ng-content>\n</mat-sidenav-container>\n\n<ng-template #submenu let-menu=\"menu\" let-j=\"mainindex\" let-s=\"subindex\">\n\n  <div class=\"submenu\" [ngClass]=\"{'expanded' :(s>=0?showSubSubMenu[j][s]:showSubmenu[j])}\"\n    *ngIf=\"isShowing || isExpanded\">\n    <div *ngFor=\"let item of menu;let m=index\">\n\n      <div *ngIf=\"item?.children;else nochild\">\n        <mat-list-item (click)=\"showSubSubMenu[j][m] = !showSubSubMenu[j][m]\" class=\"parent\">\n          <span class=\"full-width\" *ngIf=\"isExpanded || isShowing\">\n            <span *ngIf=\"item.name;else submenuImage\">{{item.name}}</span>\n            <span [matBadge]=\"item?.subText?.text\" *ngIf=\"item?.subText?.displayType=='BADGE'\"\n              matBadgeOverlap=\"false\"></span>\n            <span *ngIf=\"item?.subText?.displayType=='PLAIN_TEXT'\" class=\"sub-text\">{{item?.subText?.text}}</span>\n          </span>\n          <mat-icon *ngIf=\"item.icon;else subimageIcon\" mat-list-icon>{{item.icon}}</mat-icon>\n          <mat-icon class=\"menu-button\" [ngClass]=\"{'rotated' : showSubSubMenu[j][m]}\" *ngIf=\"isExpanded || isShowing\">\n            expand_more</mat-icon>\n        </mat-list-item>\n        <span *ngIf=\"showSubSubMenu[j][m]\">\n          <ng-container *ngTemplateOutlet=\"submenu; context: {menu:item.children,mainindex:j,subindex:m}\">\n          </ng-container>\n        </span>\n      </div>\n      <ng-template #nochild>\n\n        <mat-list-item [routerLink]=\"[item?.route]\" routerLinkActive=\"active\">\n          <span *ngIf=\"item.name;else submenuImage\">{{item.name}}</span>\n          <span [matBadge]=\"item?.subText?.text\" *ngIf=\"item?.subText?.displayType=='BADGE'\"\n            matBadgeOverlap=\"false\"></span>\n          <span *ngIf=\"item?.subText?.displayType=='PLAIN_TEXT'\" class=\"sub-text\">{{item?.subText?.text}}</span>\n          <mat-icon *ngIf=\"item.icon;else subimageIcon\" mat-list-icon>\n            {{item.icon}}</mat-icon>\n        </mat-list-item>\n\n      </ng-template>\n      <mat-divider *ngIf=\"item?.divider\"></mat-divider>\n\n      <ng-template #subimageIcon>\n        <img [src]=\"item.image\" class=\"image-icon\">\n      </ng-template>\n\n      <ng-template #submenuImage>\n        <img [src]=\"item.nameAsImage\" class=\"image-name\">\n      </ng-template>\n    </div>\n    <!-- <mat-list-item>SubSubmenu Item 2</mat-list-item> -->\n  </div>\n</ng-template>\n\n<ng-template #mainmenu let-menu=\"menu\" let-i=\"index\">\n  <div *ngIf=\"menu.children;else nochild\">\n    <mat-list-item (click)=\"showSubmenu[i] = !showSubmenu[i]\" class=\"parent\">\n      <span class=\"full-width\" *ngIf=\"isExpanded || isShowing\">\n        <span *ngIf=\"menu.name;else menuImage\">{{menu.name}}</span>\n        <span [matBadge]=\"menu?.subText?.text\" *ngIf=\"menu?.subText?.displayType=='BADGE'\"\n          matBadgeOverlap=\"false\"></span>\n\n        <span *ngIf=\"menu?.subText?.displayType=='PLAIN_TEXT'\" class=\"sub-text\">{{menu?.subText?.text}}</span>\n      </span>\n      <mat-icon *ngIf=\"menu.icon;else imageIcon\" mat-list-icon>{{menu.icon}} </mat-icon>\n\n      <mat-icon class=\"menu-button\" [ngClass]=\"{'rotated' : showSubmenu[i]}\" *ngIf=\"isExpanded || isShowing\">\n        expand_more\n      </mat-icon>\n    </mat-list-item>\n    <span *ngIf=\"showSubmenu[i]\">\n      <ng-container *ngTemplateOutlet=\"submenu; context: {menu:menu.children,mainindex:i}\"></ng-container>\n    </span>\n  </div>\n  <ng-template #nochild>\n\n    <mat-list-item class=\"parent\" [routerLink]=\"[menu?.route]\" routerLinkActive=\"active\"><span class=\"full-width\"\n        *ngIf=\"isExpanded || isShowing\"> <span *ngIf=\"menu.name;else menuImage\">{{menu.name}}</span></span>\n      <mat-icon *ngIf=\"menu.icon;else imageIcon\" mat-list-icon>\n        {{menu.icon}}</mat-icon>\n    </mat-list-item>\n  </ng-template>\n  <mat-divider *ngIf=\"menu?.divider\"></mat-divider>\n  <ng-template #imageIcon>\n    <img [src]=\"menu.image\" class=\"image-icon\">\n  </ng-template>\n\n  <ng-template #menuImage>\n    <img [src]=\"menu.nameAsImage\" class=\"image-name\">\n  </ng-template>\n</ng-template>\n\n\n<ng-template #footertemplate>\n\n  <mat-icon mat-list-icon>power_settings_new</mat-icon>\n  <span *ngIf=\"isExpanded || isShowing\">Logout</span>\n\n</ng-template>\n\n\n<button mat-mini-fab color=\"primary\" [ngClass]=\"{'minimize':(!isExpanded && !isShowing)}\"\n  (click)=\"isExpanded = !isExpanded\" class=\"menu-side-button\" aria-label=\"Menu collapse\">\n  <mat-icon> keyboard_arrow_left</mat-icon>\n</button>",
                    styles: [".admin-sidenav-content{align-items:center;display:flex;height:100%;justify-content:center}.admin-sidenav{-moz-user-select:none;-ms-user-select:none;-webkit-user-select:none;user-select:none}.full-width{align-items:center;display:flex;padding-left:10px;width:100%}.menu-button{transform:rotate(0deg);transition:.3s ease-in-out}.menu-button.rotated{transform:rotate(180deg)}.submenu{overflow-y:hidden;padding-left:30px;transform:scaleY(0);transform-origin:top;transition:transform .3s ease}.submenu.expanded{transform:scaleY(1)}.side-width{width:250px}.collaps-width{width:65px}.menu-side-button{background:#fff;color:#000;left:238px;position:absolute;top:110px;z-index:9}@media (max-width:599px){.menu-side-button{display:none}}.menu-side-button.minimize{left:52px;transform:rotate(180deg)}@media (max-width:599px){.mobile-side-remove{display:none}}mat-sidenav-container{min-height:88vh}.image-icon{width:32px}.image-name{width:92px;z-index:-1}.sub-text{background:#673ab7;border-radius:5px;color:#fff;margin:5px;padding:5px}.mat-badge-medium.mat-badge-above .mat-badge-content{top:-18px}.flex-beetween{align-content:space-between}.flex-beetween,.flex-layout{display:flex;flex-direction:column}.flex-layout{height:100%;justify-content:space-between}"]
                },] }
    ];
    NavigationComponent.ctorParameters = function () { return []; };
    NavigationComponent.propDecorators = {
        sidenav: [{ type: core.ViewChild, args: ['sidenav',] }],
        isExpanded: [{ type: core.Input }],
        navigationPanel: [{ type: core.Input }],
        navigation: [{ type: core.Input }],
        logout: [{ type: core.Output }]
    };

    var ɵ0 = new ability.Ability();
    var AdminBuilderModule = /** @class */ (function () {
        function AdminBuilderModule() {
        }
        return AdminBuilderModule;
    }());
    AdminBuilderModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [
                        ButtonComponent,
                        ButtonGroupComponent,
                        ButtonDeleteConfirmationComponent,
                        CrudHeaderComponent,
                        CrudFormComponent,
                        CrudListComponent,
                        CrudListComponentInterface,
                        BottomSearchSheet,
                        FileUploaderComponent,
                        FieldComponent,
                        FieldHorizontalLayoutComponent,
                        FieldVerticalLayoutComponent,
                        FieldInlineLayoutComponent,
                        FieldLayoutComponent,
                        FormHeaderComponent,
                        FormComponent,
                        AdminLayoutComponent,
                        ListComponent,
                        StaticListComponent,
                        DynamicListComponent,
                        ModalComponent,
                        ChipsComponent,
                        ToolbarComponent,
                        MultiImageComponent,
                        ParagraphComponent,
                        HighlightPipe,
                        TooltipComponent,
                        NgInit,
                        SafeHtmlPipe,
                        cfTemplateDirective,
                        NavigationComponent
                    ],
                    imports: [
                        // ButtonModule,
                        // CrudModule,
                        // FieldModule,
                        // ListModule,
                        // ModalModule,
                        // NavigationModule,
                        // PageModule,
                        // PrivilegeModule, 
                        // SettingModule
                        common.CommonModule,
                        //    BrowserModule,
                        //    BrowserAnimationsModule,
                        //    NoopAnimationsModule,
                        http.HttpClientModule,
                        router.RouterModule,
                        //    DynamicModule,
                        mde.MdePopoverModule,
                        forms.ReactiveFormsModule,
                        ng2TooltipDirective.TooltipModule,
                        layout.LayoutModule,
                        button.MatButtonModule,
                        buttonToggle.MatButtonToggleModule,
                        menu.MatMenuModule,
                        chips.MatChipsModule,
                        icon.MatIconModule,
                        badge.MatBadgeModule,
                        dialog.MatDialogModule,
                        card.MatCardModule,
                        tabs.MatTabsModule,
                        expansion.MatExpansionModule,
                        sidenav.MatSidenavModule,
                        bottomSheet.MatBottomSheetModule,
                        divider.MatDividerModule,
                        icon.MatIconModule,
                        formField.MatFormFieldModule,
                        input.MatInputModule,
                        icon.MatIconModule,
                        select.MatSelectModule,
                        autocomplete.MatAutocompleteModule,
                        checkbox.MatCheckboxModule,
                        radio.MatRadioModule,
                        datepicker.MatDatepickerModule,
                        materialMomentAdapter.MatMomentDateModule,
                        slider.MatSliderModule,
                        slideToggle.MatSlideToggleModule,
                        list.MatListModule,
                        table.MatTableModule,
                        sort.MatSortModule,
                        paginator.MatPaginatorModule,
                        gridList.MatGridListModule,
                        progressBar.MatProgressBarModule,
                        progressSpinner.MatProgressSpinnerModule,
                        dragDrop.DragDropModule,
                        // FroalaEditorModule.forRoot(), 
                        // FroalaViewModule.forRoot(),
                        //    MatFileUploadModule,
                        // ReactiveFormsModule,
                        // EditorModule,
                        tooltip.MatTooltipModule,
                        divider.MatDividerModule,
                        sidenav.MatSidenavModule,
                        expansion.MatExpansionModule,
                        formField.MatFormFieldModule,
                        card.MatCardModule,
                        divider.MatDividerModule,
                        button.MatButtonModule,
                        icon.MatIconModule,
                        card.MatCardModule,
                        divider.MatDividerModule,
                        formField.MatFormFieldModule,
                        icon.MatIconModule,
                        checkbox.MatCheckboxModule,
                        dialog.MatDialogModule,
                        ngxQuill.QuillModule.forRoot(),
                        angular.AbilityModule,
                        flexLayout.FlexLayoutModule,
                        toolbar.MatToolbarModule,
                        ngxInfiniteScroll.InfiniteScrollModule
                    ],
                    exports: [
                        ButtonComponent,
                        ButtonGroupComponent,
                        CrudListComponentInterface,
                        CrudFormComponent,
                        CrudListComponent,
                        FileUploaderComponent,
                        FieldComponent,
                        // FieldHorizontalLayoutComponent,
                        // FieldVerticalLayoutComponent, 
                        // FieldInlineLayoutComponent,
                        FormComponent,
                        StaticListComponent,
                        DynamicListComponent,
                        ModalComponent,
                        //    DynamicModule,
                        mde.MdePopoverModule,
                        button.MatButtonModule,
                        buttonToggle.MatButtonToggleModule,
                        menu.MatMenuModule,
                        chips.MatChipsModule,
                        icon.MatIconModule,
                        badge.MatBadgeModule,
                        dialog.MatDialogModule,
                        card.MatCardModule,
                        tabs.MatTabsModule,
                        expansion.MatExpansionModule,
                        sidenav.MatSidenavModule,
                        bottomSheet.MatBottomSheetModule,
                        divider.MatDividerModule,
                        icon.MatIconModule,
                        formField.MatFormFieldModule,
                        input.MatInputModule,
                        icon.MatIconModule,
                        select.MatSelectModule,
                        autocomplete.MatAutocompleteModule,
                        checkbox.MatCheckboxModule,
                        radio.MatRadioModule,
                        datepicker.MatDatepickerModule,
                        materialMomentAdapter.MatMomentDateModule,
                        slider.MatSliderModule,
                        slideToggle.MatSlideToggleModule,
                        list.MatListModule,
                        table.MatTableModule,
                        sort.MatSortModule,
                        paginator.MatPaginatorModule,
                        gridList.MatGridListModule,
                        progressBar.MatProgressBarModule,
                        progressSpinner.MatProgressSpinnerModule,
                        // FroalaEditorModule.forRoot(), 
                        // FroalaViewModule.forRoot(),
                        //    MatFileUploadModule,
                        // ReactiveFormsModule,
                        // EditorModule,
                        tooltip.MatTooltipModule,
                        divider.MatDividerModule,
                        sidenav.MatSidenavModule,
                        expansion.MatExpansionModule,
                        formField.MatFormFieldModule,
                        card.MatCardModule,
                        divider.MatDividerModule,
                        button.MatButtonModule,
                        icon.MatIconModule,
                        card.MatCardModule,
                        divider.MatDividerModule,
                        formField.MatFormFieldModule,
                        icon.MatIconModule,
                        checkbox.MatCheckboxModule,
                        dialog.MatDialogModule,
                        ngxInfiniteScroll.InfiniteScrollModule,
                        // AdminLayoutComponent
                        NgInit,
                        SafeHtmlPipe,
                        cfTemplateDirective,
                        NavigationComponent
                    ],
                    providers: [
                        { provide: ability.Ability, useValue: ɵ0 },
                        { provide: ability.PureAbility, useExisting: ability.Ability },
                    ]
                },] }
    ];

    // export interface ButtonTooltip   {
    //     width: number,
    //     template?: {
    //         component?: any,
    //         layout?: ListCustomLayout,
    //     }
    // }

    // import { ActionPage } from './action-page.model';
    // import { Crud } from './crud.model';
    // export {
    //   ActionPage,
    //   Crud 
    // };

    var ModalUitls = /** @class */ (function () {
        function ModalUitls() {
        }
        //    static dialogRef: MatDialogRef<any, any>;
        ModalUitls.openDialog = function (modal, component) {
            var dialogRef;
            dialogRef = modal.dialog.open(component ? component : ModalComponent, {
                width: modal.widgetConfig.modal && modal.widgetConfig.modal.width ? modal.widgetConfig.modal.width + 'px' : '250px',
                data: {
                    type: modal.type,
                    widgetConfig: modal.widgetConfig,
                    sourceIndex: modal.sourceIndex,
                    context: modal.context,
                    originalData: modal.originalData,
                    keyMap: modal.keyMap,
                    reset: modal.reset
                }
            });
            if (dialogRef.componentInstance.onButtonClick) {
                dialogRef.componentInstance.onButtonClick.subscribe(function (event) {
                    console.log(event);
                    if (eval("this.buttonClick")) {
                        eval("this.buttonClick(event)");
                    }
                });
            }
            if (dialogRef.componentInstance.onFieldChange) {
                dialogRef.componentInstance.onFieldChange.subscribe(function (event) {
                    console.log(event);
                    if (eval("this.fieldChange")) {
                        eval("this.fieldChange(event)");
                    }
                }, this);
            }
            if (dialogRef.componentInstance.onFormChange) {
                dialogRef.componentInstance.onFormChange.subscribe(function (event) {
                    console.log(event);
                    if (eval("this.formChange")) {
                        eval("this.formChange(event)");
                    }
                });
            }
            dialogRef.afterClosed().subscribe(function (result) {
                console.log('The dialog was closed');
                //          this.invokeAction(result, event);
            });
        };
        return ModalUitls;
    }());

    /*
     * Public API Surface of ngx-material-widget
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AbilityUtils = AbilityUtils;
    exports.AdminBuilderModule = AdminBuilderModule;
    exports.AdminLayoutComponent = AdminLayoutComponent;
    exports.BadgeUitls = BadgeUitls;
    exports.BottomSearchSheet = BottomSearchSheet;
    exports.ButtonComponent = ButtonComponent;
    exports.ButtonGroupComponent = ButtonGroupComponent;
    exports.ButtonUtils = ButtonUtils;
    exports.CollectionUtils = CollectionUtils;
    exports.CrudFormComponent = CrudFormComponent;
    exports.CrudListComponent = CrudListComponent;
    exports.CrudListComponentInterface = CrudListComponentInterface;
    exports.CrudUtils = CrudUtils;
    exports.DependentUtils = DependentUtils;
    exports.DropdownUtils = DropdownUtils;
    exports.DynamicListComponent = DynamicListComponent;
    exports.FieldComponent = FieldComponent;
    exports.FieldErrorStateMatcher = FieldErrorStateMatcher;
    exports.FieldUtils = FieldUtils;
    exports.FormComponent = FormComponent;
    exports.FormCustomUtils = FormCustomUtils;
    exports.FormHeaderComponent = FormHeaderComponent;
    exports.FormUtils = FormUtils;
    exports.KeyMapUtils = KeyMapUtils;
    exports.ListUtils = ListUtils;
    exports.MasterDataUtils = MasterDataUtils;
    exports.ModalComponent = ModalComponent;
    exports.ModalUitls = ModalUitls;
    exports.ObjectUtils = ObjectUtils;
    exports.PropertyUtils = PropertyUtils;
    exports.SecurityUtils = SecurityUtils;
    exports.StaticListComponent = StaticListComponent;
    exports.StringUtils = StringUtils;
    exports.ɵ0 = ɵ0;
    exports.ɵa = ButtonDeleteConfirmationComponent;
    exports.ɵb = CrudHeaderComponent;
    exports.ɵc = FileUploaderComponent;
    exports.ɵd = FieldComponent;
    exports.ɵe = FieldHorizontalLayoutComponent;
    exports.ɵf = FieldVerticalLayoutComponent;
    exports.ɵg = FieldInlineLayoutComponent;
    exports.ɵh = FieldLayoutComponent;
    exports.ɵi = FormHeaderComponent;
    exports.ɵj = FormComponent;
    exports.ɵk = ListComponent;
    exports.ɵl = ChipsComponent;
    exports.ɵm = ToolbarComponent;
    exports.ɵn = MultiImageComponent;
    exports.ɵo = ParagraphComponent;
    exports.ɵp = HighlightPipe;
    exports.ɵq = TooltipComponent;
    exports.ɵr = NgInit;
    exports.ɵs = SafeHtmlPipe;
    exports.ɵt = cfTemplateDirective;
    exports.ɵu = NavigationComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-material-widget.umd.js.map
