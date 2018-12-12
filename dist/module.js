System.register(["lodash", "app/core/utils/kbn", "app/plugins/sdk", "./app/app", "./app/seriesHandler", "./app/renderer", "./app/utils"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var lodash_1, kbn_1, sdk_1, app_1, seriesHandler_1, renderer, utils, GrafanaBoomTableCtrl;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (kbn_1_1) {
                kbn_1 = kbn_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            },
            function (seriesHandler_1_1) {
                seriesHandler_1 = seriesHandler_1_1;
            },
            function (renderer_1) {
                renderer = renderer_1;
            },
            function (utils_1) {
                utils = utils_1;
            }
        ],
        execute: function () {
            sdk_1.loadPluginCss({
                dark: "plugins/" + app_1.plugin_id + "/css/default.dark.css",
                light: "plugins/" + app_1.plugin_id + "/css/default.light.css"
            });
            GrafanaBoomTableCtrl = (function (_super) {
                __extends(GrafanaBoomTableCtrl, _super);
                function GrafanaBoomTableCtrl($scope, $injector, $sce) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.valueNameOptions = app_1.config.valueNameOptions;
                    _this.unitFormats = kbn_1.default.getUnitFormats();
                    _this.optionOverrides = app_1.config.optionOverrides;
                    lodash_1.default.defaults(_this.panel, app_1.config.panelDefaults);
                    _this.events.on("data-received", _this.onDataReceived.bind(_this));
                    _this.events.on("init-edit-mode", _this.onInitEditMode.bind(_this));
                    if (_this.panel.activePatternIndex === -1) {
                        _this.panel.activePatternIndex = _this.panel.patterns.length;
                    }
                    _this.$sce = $sce;
                    return _this;
                }
                GrafanaBoomTableCtrl.prototype.onInitEditMode = function () {
                    this.addEditorTab("Patterns", "public/plugins/" + app_1.plugin_id + "/partials/patterns.html", 2);
                    this.addEditorTab("Options", "public/plugins/" + app_1.plugin_id + "/partials/options.html", 3);
                };
                GrafanaBoomTableCtrl.prototype.onDataReceived = function (data) {
                    this.dataReceived = data;
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.addPattern = function () {
                    var newPattern = {
                        name: "New Pattern",
                        pattern: "^server.*cpu$",
                        disabled: false,
                        delimiter: ".",
                        valueName: "avg",
                        row_name: this.panel.row_col_wrapper + "0" + this.panel.row_col_wrapper,
                        col_name: this.panel.row_col_wrapper + "1" + this.panel.row_col_wrapper,
                        thresholds: "70,90",
                        time_based_thresholds: [],
                        enable_time_based_thresholds: false,
                        enable_bgColor: false,
                        bgColors: "green|orange|red",
                        enable_bgColor_overrides: false,
                        bgColors_overrides: "0->green|2->red|1->yellow",
                        enable_TextColors: false,
                        textColors: "green|orange|red",
                        enable_TextColor_overrides: false,
                        textColors_overrides: "0->green|2->red|1->yellow",
                        enable_transform: false,
                        transform_values: "_value_|_value_|_value_",
                        enable_transform_overrides: false,
                        transform_values_overrides: "0->down|1->up",
                        decimals: 2,
                        tooltipTemplate: "Row Name : _row_name_ <br/>Col Name : _col_name_ <br/>Value : _value_",
                        format: "none",
                        null_color: "darkred",
                        null_text_color: "white",
                        null_value: "No data",
                        enable_clickable_cells: false,
                        clickable_cells_link: "",
                        filter: {
                            value_below: "",
                            value_above: "",
                        }
                    };
                    this.panel.patterns.push(newPattern);
                    this.panel.activePatternIndex = this.panel.patterns.length - 1;
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.movePattern = function (direction, index) {
                    var tempElement = this.panel.patterns[index];
                    if (direction === "UP") {
                        this.panel.patterns[index] = this.panel.patterns[index - 1];
                        this.panel.patterns[index - 1] = tempElement;
                        this.panel.activePatternIndex = index - 1;
                    }
                    if (direction === "DOWN") {
                        this.panel.patterns[index] = this.panel.patterns[index + 1];
                        this.panel.patterns[index + 1] = tempElement;
                        this.panel.activePatternIndex = index + 1;
                    }
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.removePattern = function (index) {
                    this.panel.patterns.splice(index, 1);
                    this.panel.activePatternIndex = (this.panel.patterns && this.panel.patterns.length > 0) ? (this.panel.patterns.length - 1) : -1;
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.clonePattern = function (index) {
                    var copiedPattern = Object.assign({}, this.panel.patterns[index]);
                    this.panel.patterns.push(copiedPattern);
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.add_time_based_thresholds = function (index) {
                    var new_time_based_threshold = {
                        name: "Early morning of everyday",
                        from: "0000",
                        to: "0530",
                        enabledDays: "Sun,Mon,Tue,Wed,Thu,Fri,Sat",
                        threshold: "70,90"
                    };
                    if (index === this.panel.patterns.length || index === -1) {
                        this.panel.defaultPattern.time_based_thresholds = this.panel.defaultPattern.time_based_thresholds || [];
                        this.panel.defaultPattern.time_based_thresholds.push(new_time_based_threshold);
                    }
                    else {
                        this.panel.patterns[index].time_based_thresholds = this.panel.patterns[index].time_based_thresholds || [];
                        this.panel.patterns[index].time_based_thresholds.push(new_time_based_threshold);
                    }
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.remove_time_based_thresholds = function (patternIndex, index) {
                    if (patternIndex === this.panel.patterns.length || patternIndex === -1) {
                        this.panel.defaultPattern.time_based_thresholds.splice(index, 1);
                    }
                    else {
                        this.panel.patterns[patternIndex].time_based_thresholds.splice(index, 1);
                    }
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.inverseBGColors = function (index) {
                    if (index === this.panel.patterns.length || index === -1) {
                        this.panel.defaultPattern.bgColors = this.panel.defaultPattern.bgColors.split("|").reverse().join("|");
                    }
                    else {
                        this.panel.patterns[index].bgColors = this.panel.patterns[index].bgColors.split("|").reverse().join("|");
                    }
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.inverseTextColors = function (index) {
                    if (index === this.panel.patterns.length || index === -1) {
                        this.panel.defaultPattern.textColors = this.panel.defaultPattern.textColors.split("|").reverse().join("|");
                    }
                    else {
                        this.panel.patterns[index].textColors = this.panel.patterns[index].textColors.split("|").reverse().join("|");
                    }
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.inverseTransformValues = function (index) {
                    if (index === this.panel.patterns.length || index === -1) {
                        this.panel.defaultPattern.transform_values = this.panel.defaultPattern.transform_values.split("|").reverse().join("|");
                    }
                    else {
                        this.panel.patterns[index].transform_values = this.panel.patterns[index].transform_values.split("|").reverse().join("|");
                    }
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.setUnitFormat = function (subItem, index) {
                    if (index === this.panel.patterns.length || index === this.panel.patterns.length) {
                        this.panel.defaultPattern.format = subItem.value;
                    }
                    else {
                        this.panel.patterns[index].format = subItem.value;
                    }
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.limitText = function (text, maxlength) {
                    if (text.split("").length > maxlength) {
                        text = text.substring(0, maxlength - 3) + "...";
                    }
                    return text;
                };
                GrafanaBoomTableCtrl.prototype.link = function (scope, elem, attrs, ctrl) {
                    if (scope) {
                        scope = scope;
                    }
                    if (attrs) {
                        attrs = attrs;
                    }
                    this.ctrl = ctrl;
                    this.elem = elem;
                };
                GrafanaBoomTableCtrl.prototype.getOptionOverride = function (propertyName) {
                    var option = lodash_1.default.find(this.panel.currentOptionOverrides, function (o) { return o.propertyName === propertyName; });
                    var default_option = lodash_1.default.find(app_1.config.optionOverrides, function (o) { return o.propertyName === propertyName; });
                    if (option) {
                        return option.value;
                    }
                    else {
                        return default_option.defaultValue;
                    }
                };
                GrafanaBoomTableCtrl.prototype.setOptionOverride = function (propertyName, value, text) {
                    var newOverrides = [];
                    if (lodash_1.default.filter(this.panel.currentOptionOverrides, function (o) { return o.propertyName === propertyName; }).length === 0) {
                        newOverrides.push({
                            propertyName: propertyName,
                            value: value,
                            text: text
                        });
                    }
                    if (this.panel.currentOptionOverrides.length > 0) {
                        lodash_1.default.each(this.panel.currentOptionOverrides, function (o) {
                            if (o.propertyName === propertyName) {
                                newOverrides.push({
                                    propertyName: propertyName,
                                    value: value,
                                    text: text
                                });
                            }
                            else {
                                newOverrides.push(o);
                            }
                        });
                    }
                    this.panel.currentOptionOverrides = newOverrides;
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.removeOptionOverride = function (option) {
                    var newOverrides = [];
                    if (this.panel.currentOptionOverrides.length > 0) {
                        lodash_1.default.each(this.panel.currentOptionOverrides, function (o) {
                            if (o.propertyName !== option) {
                                newOverrides.push(o);
                            }
                        });
                    }
                    this.panel.currentOptionOverrides = newOverrides;
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.adjustPanelHeight = function (panelHeight) {
                    var rootElem = this.elem.find(".table-panel-scroll");
                    var maxheightofpanel = this.panel.debug_mode ? panelHeight - 71 : panelHeight - 31;
                    rootElem.css({ "max-height": maxheightofpanel + "px" });
                };
                GrafanaBoomTableCtrl.templateUrl = "partials/module.html";
                return GrafanaBoomTableCtrl;
            }(sdk_1.MetricsPanelCtrl));
            exports_1("PanelCtrl", GrafanaBoomTableCtrl);
            GrafanaBoomTableCtrl.prototype.render = function () {
                var _this = this;
                if (this.dataReceived) {
                    this.panel.default_title_for_rows = this.panel.default_title_for_rows;
                    var metricsReceived_1 = utils.getFields(this.dataReceived, "target");
                    if (metricsReceived_1.length !== lodash_1.default.uniq(metricsReceived_1).length) {
                        var duplicateKeys = lodash_1.default.uniq(metricsReceived_1.filter(function (v) {
                            return metricsReceived_1.filter(function (t) { return t === v; }).length > 1;
                        }));
                        this.panel.error = utils.buildError("Duplicate keys found", "Duplicate key values : <br/> " + duplicateKeys.join("<br/> "));
                    }
                    else {
                        this.panel.error = undefined;
                        var dataComputed_1 = seriesHandler_1.compute(this.dataReceived.map(seriesHandler_1.defaultHandler.bind(this)), this.panel.defaultPattern || app_1.config.panelDefaults.defaultPattern, this.panel.patterns, this.panel.row_col_wrapper);
                        var rows_found = utils.getFields(dataComputed_1, "row_name");
                        var cols_found_1 = utils.getFields(dataComputed_1, "col_name");
                        var keys_found_1 = utils.getFields(dataComputed_1, "key_name");
                        var is_unique_keys = (keys_found_1.length === lodash_1.default.uniq(keys_found_1).length);
                        if (is_unique_keys) {
                            this.panel.error = undefined;
                            var output_1 = [];
                            lodash_1.default.each(lodash_1.default.uniq(rows_found), function (row_name) {
                                var o = {};
                                o.row = row_name;
                                o.cols = [];
                                lodash_1.default.each(lodash_1.default.uniq(cols_found_1), function (col_name) {
                                    var matched_value = (lodash_1.default.find(dataComputed_1, function (e) {
                                        return e.row_name === row_name && e.col_name === col_name;
                                    }));
                                    var mycol = {};
                                    mycol.name = col_name;
                                    mycol.value = matched_value ? matched_value.value || NaN : NaN;
                                    mycol.displayValue = matched_value ? matched_value.displayValue || matched_value.value || "N/A" : _this.panel.no_match_text || "N/A";
                                    mycol.bgColor = matched_value && matched_value.bgColor ? matched_value.bgColor : "transparent";
                                    mycol.textColor = matched_value && matched_value.textColor ? matched_value.textColor : "white";
                                    var tooltipTemplate = matched_value && matched_value.tooltipTemplate ? matched_value.tooltipTemplate : _this.ctrl.panel.defaultPattern.tooltipTemplate || "No matching series found for _row_name_ & _col_name_";
                                    if (matched_value) {
                                        mycol.tooltip = renderer.getTooltipMessage(tooltipTemplate, utils.getActualNameWithoutTransformSign(matched_value.actual_row_name || row_name), utils.getActualNameWithoutTransformSign(matched_value.actual_col_name || col_name), matched_value.valueFormatted || _this.panel.no_match_text || "N/A");
                                    }
                                    else {
                                        mycol.tooltip = renderer.getTooltipMessage(tooltipTemplate, utils.getActualNameWithoutTransformSign(row_name), utils.getActualNameWithoutTransformSign(col_name), "NaN" || _this.panel.no_match_text || "N/A");
                                    }
                                    mycol.tooltip = _this.$sce.trustAsHtml(mycol.tooltip);
                                    o.cols.push(mycol);
                                });
                                output_1.push(o);
                            });
                            renderer.buildHTML(this.elem, this.getOptionOverride("HIDE_HEADERS") === "true", this.getOptionOverride("HIDE_FIRST_COLUMN") === "true", this.getOptionOverride("TEXT_ALIGN_TABLE_HEADER"), cols_found_1, output_1, this.getOptionOverride("TEXT_ALIGN_FIRST_COLUMN"), this.getOptionOverride("TEXT_ALIGN_TABLE_CELLS"), this.panel.default_title_for_rows);
                        }
                        else {
                            var duplicateKeys = lodash_1.default.uniq(keys_found_1.filter(function (v) {
                                return keys_found_1.filter(function (t) { return t === v; }).length > 1;
                            }));
                            this.panel.error = utils.buildError("Duplicate keys found", "Duplicate key values : <br/> " + duplicateKeys.join("<br/> "));
                        }
                        if (this.panel.debug_mode === true) {
                            renderer.buildDebugHTML(this.elem, dataComputed_1);
                        }
                    }
                    this.adjustPanelHeight(this.ctrl.height);
                }
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFXQSxtQkFBYSxDQUFDO2dCQUNaLElBQUksRUFBRSxhQUFXLGVBQVMsMEJBQXVCO2dCQUNqRCxLQUFLLEVBQUUsYUFBVyxlQUFTLDJCQUF3QjthQUNwRCxDQUFDLENBQUM7O2dCQUVnQyx3Q0FBZ0I7Z0JBU2pELDhCQUFZLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSTtvQkFBbkMsWUFDRSxrQkFBTSxNQUFNLEVBQUUsU0FBUyxDQUFDLFNBUXpCO29CQVpELHNCQUFnQixHQUFzQixZQUFNLENBQUMsZ0JBQWdCLENBQUM7b0JBQzlELGlCQUFXLEdBQVEsYUFBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN4QyxxQkFBZSxHQUFRLFlBQU0sQ0FBQyxlQUFlLENBQUM7b0JBRzVDLGdCQUFDLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsWUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUM3QyxLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztvQkFDaEUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztvQkFDakUsSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixLQUFLLENBQUMsQ0FBQyxFQUFFO3dCQUN4QyxLQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztxQkFDNUQ7b0JBQ0QsS0FBSSxDQUFDLElBQUksR0FB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LENBQUMsVUFBQSxDQUFDO2dDQUM1QyxPQUFPLFlBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEtBQUssQ0FBQyxFQUFQLENBQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7NEJBQ3BELENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ0osSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsRUFBRSxrQ0FBZ0MsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUcsQ0FBQyxDQUFDO3lCQUM3SDt3QkFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxLQUFLLElBQUksRUFBRTs0QkFDbEMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGNBQVksQ0FBQyxDQUFDO3lCQUNsRDtxQkFDRjtvQkFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDMUM7WUFDSCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi9ub2RlX21vZHVsZXMvZ3JhZmFuYS1zZGstbW9ja3MvYXBwL2hlYWRlcnMvY29tbW9uLmQudHNcIiAvPlxyXG5cclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQga2JuIGZyb20gXCJhcHAvY29yZS91dGlscy9rYm5cIjtcclxuaW1wb3J0IHsgbG9hZFBsdWdpbkNzcywgTWV0cmljc1BhbmVsQ3RybCB9IGZyb20gXCJhcHAvcGx1Z2lucy9zZGtcIjtcclxuaW1wb3J0IHsgUGF0dGVybiwgVGltZUJhc2VUaHJlc2hvbGQsIFZhbHVlTmFtZU9wdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZXMvaW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgeyBwbHVnaW5faWQsIGNvbmZpZyB9IGZyb20gXCIuL2FwcC9hcHBcIjtcclxuaW1wb3J0IHsgY29tcHV0ZSwgZGVmYXVsdEhhbmRsZXIgfSBmcm9tIFwiLi9hcHAvc2VyaWVzSGFuZGxlclwiO1xyXG5pbXBvcnQgKiBhcyByZW5kZXJlciBmcm9tIFwiLi9hcHAvcmVuZGVyZXJcIjtcclxuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcIi4vYXBwL3V0aWxzXCI7XHJcblxyXG5sb2FkUGx1Z2luQ3NzKHtcclxuICBkYXJrOiBgcGx1Z2lucy8ke3BsdWdpbl9pZH0vY3NzL2RlZmF1bHQuZGFyay5jc3NgLFxyXG4gIGxpZ2h0OiBgcGx1Z2lucy8ke3BsdWdpbl9pZH0vY3NzL2RlZmF1bHQubGlnaHQuY3NzYFxyXG59KTtcclxuXHJcbmNsYXNzIEdyYWZhbmFCb29tVGFibGVDdHJsIGV4dGVuZHMgTWV0cmljc1BhbmVsQ3RybCB7XHJcbiAgc3RhdGljIHRlbXBsYXRlVXJsOiBzdHJpbmcgPSBcInBhcnRpYWxzL21vZHVsZS5odG1sXCI7XHJcbiAgY3RybDogYW55O1xyXG4gIGVsZW06IGFueTtcclxuICAkc2NlOiBhbnk7XHJcbiAgZGF0YVJlY2VpdmVkOiBhbnk7XHJcbiAgdmFsdWVOYW1lT3B0aW9uczogVmFsdWVOYW1lT3B0aW9uW10gPSBjb25maWcudmFsdWVOYW1lT3B0aW9ucztcclxuICB1bml0Rm9ybWF0czogYW55ID0ga2JuLmdldFVuaXRGb3JtYXRzKCk7XHJcbiAgb3B0aW9uT3ZlcnJpZGVzOiBhbnkgPSBjb25maWcub3B0aW9uT3ZlcnJpZGVzO1xyXG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJGluamVjdG9yLCAkc2NlKSB7XHJcbiAgICBzdXBlcigkc2NvcGUsICRpbmplY3Rvcik7XHJcbiAgICBfLmRlZmF1bHRzKHRoaXMucGFuZWwsIGNvbmZpZy5wYW5lbERlZmF1bHRzKTtcclxuICAgIHRoaXMuZXZlbnRzLm9uKFwiZGF0YS1yZWNlaXZlZFwiLCB0aGlzLm9uRGF0YVJlY2VpdmVkLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5ldmVudHMub24oXCJpbml0LWVkaXQtbW9kZVwiLCB0aGlzLm9uSW5pdEVkaXRNb2RlLmJpbmQodGhpcykpO1xyXG4gICAgaWYgKHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID09PSAtMSkge1xyXG4gICAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9IHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgdGhpcy4kc2NlID0gJHNjZTtcclxuICB9XHJcbiAgb25Jbml0RWRpdE1vZGUoKSB7XHJcbiAgICB0aGlzLmFkZEVkaXRvclRhYihcIlBhdHRlcm5zXCIsIGBwdWJsaWMvcGx1Z2lucy8ke3BsdWdpbl9pZH0vcGFydGlhbHMvcGF0dGVybnMuaHRtbGAsIDIpO1xyXG4gICAgdGhpcy5hZGRFZGl0b3JUYWIoXCJPcHRpb25zXCIsIGBwdWJsaWMvcGx1Z2lucy8ke3BsdWdpbl9pZH0vcGFydGlhbHMvb3B0aW9ucy5odG1sYCwgMyk7XHJcbiAgfVxyXG4gIG9uRGF0YVJlY2VpdmVkKGRhdGE6IGFueSkge1xyXG4gICAgdGhpcy5kYXRhUmVjZWl2ZWQgPSBkYXRhO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgYWRkUGF0dGVybigpIHtcclxuICAgIGxldCBuZXdQYXR0ZXJuOiBQYXR0ZXJuID0ge1xyXG4gICAgICBuYW1lOiBcIk5ldyBQYXR0ZXJuXCIsXHJcbiAgICAgIHBhdHRlcm46IFwiXnNlcnZlci4qY3B1JFwiLFxyXG4gICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgIGRlbGltaXRlcjogXCIuXCIsXHJcbiAgICAgIHZhbHVlTmFtZTogXCJhdmdcIixcclxuICAgICAgcm93X25hbWU6IHRoaXMucGFuZWwucm93X2NvbF93cmFwcGVyICsgXCIwXCIgKyB0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlcixcclxuICAgICAgY29sX25hbWU6IHRoaXMucGFuZWwucm93X2NvbF93cmFwcGVyICsgXCIxXCIgKyB0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlcixcclxuICAgICAgdGhyZXNob2xkczogXCI3MCw5MFwiLFxyXG4gICAgICB0aW1lX2Jhc2VkX3RocmVzaG9sZHM6IFtdLFxyXG4gICAgICBlbmFibGVfdGltZV9iYXNlZF90aHJlc2hvbGRzOiBmYWxzZSxcclxuICAgICAgZW5hYmxlX2JnQ29sb3I6IGZhbHNlLFxyXG4gICAgICBiZ0NvbG9yczogXCJncmVlbnxvcmFuZ2V8cmVkXCIsXHJcbiAgICAgIGVuYWJsZV9iZ0NvbG9yX292ZXJyaWRlczogZmFsc2UsXHJcbiAgICAgIGJnQ29sb3JzX292ZXJyaWRlczogXCIwLT5ncmVlbnwyLT5yZWR8MS0+eWVsbG93XCIsXHJcbiAgICAgIGVuYWJsZV9UZXh0Q29sb3JzOiBmYWxzZSxcclxuICAgICAgdGV4dENvbG9yczogXCJncmVlbnxvcmFuZ2V8cmVkXCIsXHJcbiAgICAgIGVuYWJsZV9UZXh0Q29sb3Jfb3ZlcnJpZGVzOiBmYWxzZSxcclxuICAgICAgdGV4dENvbG9yc19vdmVycmlkZXM6IFwiMC0+Z3JlZW58Mi0+cmVkfDEtPnllbGxvd1wiLFxyXG4gICAgICBlbmFibGVfdHJhbnNmb3JtOiBmYWxzZSxcclxuICAgICAgdHJhbnNmb3JtX3ZhbHVlczogXCJfdmFsdWVffF92YWx1ZV98X3ZhbHVlX1wiLFxyXG4gICAgICBlbmFibGVfdHJhbnNmb3JtX292ZXJyaWRlczogZmFsc2UsXHJcbiAgICAgIHRyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzOiBcIjAtPmRvd258MS0+dXBcIixcclxuICAgICAgZGVjaW1hbHM6IDIsXHJcbiAgICAgIHRvb2x0aXBUZW1wbGF0ZSA6IFwiUm93IE5hbWUgOiBfcm93X25hbWVfIDxici8+Q29sIE5hbWUgOiBfY29sX25hbWVfIDxici8+VmFsdWUgOiBfdmFsdWVfXCIsXHJcbiAgICAgIGZvcm1hdDogXCJub25lXCIsXHJcbiAgICAgIG51bGxfY29sb3I6IFwiZGFya3JlZFwiLFxyXG4gICAgICBudWxsX3RleHRfY29sb3I6IFwid2hpdGVcIixcclxuICAgICAgbnVsbF92YWx1ZTogXCJObyBkYXRhXCIsXHJcbiAgICAgIGVuYWJsZV9jbGlja2FibGVfY2VsbHM6IGZhbHNlLFxyXG4gICAgICBjbGlja2FibGVfY2VsbHNfbGluazogXCJcIixcclxuICAgICAgZmlsdGVyOiB7XHJcbiAgICAgICAgdmFsdWVfYmVsb3c6IFwiXCIsXHJcbiAgICAgICAgdmFsdWVfYWJvdmU6IFwiXCIsXHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGlzLnBhbmVsLnBhdHRlcm5zLnB1c2gobmV3UGF0dGVybik7XHJcbiAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9IHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoIC0gMTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIG1vdmVQYXR0ZXJuKGRpcmVjdGlvbjogU3RyaW5nLCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICBsZXQgdGVtcEVsZW1lbnQ6IFBhdHRlcm4gPSB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XTtcclxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiVVBcIikge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XSA9IHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXggLSAxXTtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleCAtIDFdID0gdGVtcEVsZW1lbnQ7XHJcbiAgICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID0gaW5kZXggLSAxO1xyXG4gICAgfVxyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJET1dOXCIpIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0gPSB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4ICsgMV07XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXggKyAxXSA9IHRlbXBFbGVtZW50O1xyXG4gICAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9IGluZGV4ICsgMTtcclxuICAgIH1cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHJlbW92ZVBhdHRlcm4oaW5kZXg6IG51bWJlcikge1xyXG4gICAgdGhpcy5wYW5lbC5wYXR0ZXJucy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSAodGhpcy5wYW5lbC5wYXR0ZXJucyAmJiB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCA+IDApID8gKHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoIC0gMSkgOiAtMTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIGNsb25lUGF0dGVybihpbmRleDogbnVtYmVyKSB7XHJcbiAgICBsZXQgY29waWVkUGF0dGVybjogUGF0dGVybiA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdKTtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMucHVzaChjb3BpZWRQYXR0ZXJuKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIGFkZF90aW1lX2Jhc2VkX3RocmVzaG9sZHMoaW5kZXg6IG51bWJlcikge1xyXG4gICAgbGV0IG5ld190aW1lX2Jhc2VkX3RocmVzaG9sZDogVGltZUJhc2VUaHJlc2hvbGQgPSB7XHJcbiAgICAgIG5hbWU6IFwiRWFybHkgbW9ybmluZyBvZiBldmVyeWRheVwiLFxyXG4gICAgICBmcm9tOiBcIjAwMDBcIixcclxuICAgICAgdG86IFwiMDUzMFwiLFxyXG4gICAgICBlbmFibGVkRGF5czogXCJTdW4sTW9uLFR1ZSxXZWQsVGh1LEZyaSxTYXRcIixcclxuICAgICAgdGhyZXNob2xkOiBcIjcwLDkwXCJcclxuICAgIH07XHJcbiAgICBpZiAoaW5kZXggPT09IHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoIHx8IGluZGV4ID09PSAtMSkge1xyXG4gICAgICB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLnRpbWVfYmFzZWRfdGhyZXNob2xkcyA9IHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4udGltZV9iYXNlZF90aHJlc2hvbGRzIHx8IFtdO1xyXG4gICAgICB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLnRpbWVfYmFzZWRfdGhyZXNob2xkcy5wdXNoKG5ld190aW1lX2Jhc2VkX3RocmVzaG9sZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS50aW1lX2Jhc2VkX3RocmVzaG9sZHMgPSB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS50aW1lX2Jhc2VkX3RocmVzaG9sZHMgfHwgW107XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdLnRpbWVfYmFzZWRfdGhyZXNob2xkcy5wdXNoKG5ld190aW1lX2Jhc2VkX3RocmVzaG9sZCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICByZW1vdmVfdGltZV9iYXNlZF90aHJlc2hvbGRzKHBhdHRlcm5JbmRleDogbnVtYmVyLCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICBpZiAocGF0dGVybkluZGV4ID09PSB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCB8fCBwYXR0ZXJuSW5kZXggPT09IC0xKSB7XHJcbiAgICAgIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4udGltZV9iYXNlZF90aHJlc2hvbGRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW3BhdHRlcm5JbmRleF0udGltZV9iYXNlZF90aHJlc2hvbGRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBpbnZlcnNlQkdDb2xvcnMoaW5kZXg6IG51bWJlcikge1xyXG4gICAgaWYgKGluZGV4ID09PSB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCB8fCBpbmRleCA9PT0gLTEpIHtcclxuICAgICAgdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybi5iZ0NvbG9ycyA9IHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4uYmdDb2xvcnMuc3BsaXQoXCJ8XCIpLnJldmVyc2UoKS5qb2luKFwifFwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdLmJnQ29sb3JzID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0uYmdDb2xvcnMuc3BsaXQoXCJ8XCIpLnJldmVyc2UoKS5qb2luKFwifFwiKTtcclxuICAgIH1cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIGludmVyc2VUZXh0Q29sb3JzKGluZGV4OiBudW1iZXIpIHtcclxuICAgIGlmIChpbmRleCA9PT0gdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggfHwgaW5kZXggPT09IC0xKSB7XHJcbiAgICAgIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4udGV4dENvbG9ycyA9IHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4udGV4dENvbG9ycy5zcGxpdChcInxcIikucmV2ZXJzZSgpLmpvaW4oXCJ8XCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0udGV4dENvbG9ycyA9IHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdLnRleHRDb2xvcnMuc3BsaXQoXCJ8XCIpLnJldmVyc2UoKS5qb2luKFwifFwiKTtcclxuICAgIH1cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIGludmVyc2VUcmFuc2Zvcm1WYWx1ZXMoaW5kZXg6IG51bWJlcikge1xyXG4gICAgaWYgKGluZGV4ID09PSB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCB8fCBpbmRleCA9PT0gLTEpIHtcclxuICAgICAgdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybi50cmFuc2Zvcm1fdmFsdWVzID0gdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybi50cmFuc2Zvcm1fdmFsdWVzLnNwbGl0KFwifFwiKS5yZXZlcnNlKCkuam9pbihcInxcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS50cmFuc2Zvcm1fdmFsdWVzID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0udHJhbnNmb3JtX3ZhbHVlcy5zcGxpdChcInxcIikucmV2ZXJzZSgpLmpvaW4oXCJ8XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHNldFVuaXRGb3JtYXQoc3ViSXRlbSwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgaWYgKGluZGV4ID09PSB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCB8fCBpbmRleCA9PT0gdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybi5mb3JtYXQgPSBzdWJJdGVtLnZhbHVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0uZm9ybWF0ID0gc3ViSXRlbS52YWx1ZTtcclxuICAgIH1cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIGxpbWl0VGV4dCh0ZXh0OiBTdHJpbmcsIG1heGxlbmd0aDogbnVtYmVyKSB7XHJcbiAgICBpZiAodGV4dC5zcGxpdChcIlwiKS5sZW5ndGggPiBtYXhsZW5ndGgpIHtcclxuICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDAsIG1heGxlbmd0aCAtIDMpICsgXCIuLi5cIjtcclxuICAgIH1cclxuICAgIHJldHVybiB0ZXh0O1xyXG4gIH1cclxuICBsaW5rKHNjb3BlLCBlbGVtLCBhdHRycywgY3RybCkge1xyXG4gICAgaWYgKHNjb3BlKSB7IHNjb3BlID0gc2NvcGU7IH1cclxuICAgIGlmIChhdHRycykgeyBhdHRycyA9IGF0dHJzOyB9XHJcbiAgICB0aGlzLmN0cmwgPSBjdHJsO1xyXG4gICAgdGhpcy5lbGVtID0gZWxlbTtcclxuICB9XHJcbiAgZ2V0T3B0aW9uT3ZlcnJpZGUocHJvcGVydHlOYW1lOiBTdHJpbmcpIHtcclxuICAgIGxldCBvcHRpb24gPSBfLmZpbmQodGhpcy5wYW5lbC5jdXJyZW50T3B0aW9uT3ZlcnJpZGVzLCBvID0+IG8ucHJvcGVydHlOYW1lID09PSBwcm9wZXJ0eU5hbWUpO1xyXG4gICAgbGV0IGRlZmF1bHRfb3B0aW9uID0gXy5maW5kKGNvbmZpZy5vcHRpb25PdmVycmlkZXMsIG8gPT4gby5wcm9wZXJ0eU5hbWUgPT09IHByb3BlcnR5TmFtZSk7XHJcbiAgICBpZiAob3B0aW9uKSB7XHJcbiAgICAgIHJldHVybiBvcHRpb24udmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZGVmYXVsdF9vcHRpb24uZGVmYXVsdFZhbHVlO1xyXG4gICAgfVxyXG4gIH1cclxuICBzZXRPcHRpb25PdmVycmlkZShwcm9wZXJ0eU5hbWU6IFN0cmluZywgdmFsdWU6IFN0cmluZywgdGV4dDogU3RyaW5nKSB7XHJcbiAgICBsZXQgbmV3T3ZlcnJpZGVzID0gW107XHJcbiAgICBpZiAoXy5maWx0ZXIodGhpcy5wYW5lbC5jdXJyZW50T3B0aW9uT3ZlcnJpZGVzLCBvID0+IG8ucHJvcGVydHlOYW1lID09PSBwcm9wZXJ0eU5hbWUpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBuZXdPdmVycmlkZXMucHVzaCh7XHJcbiAgICAgICAgcHJvcGVydHlOYW1lLFxyXG4gICAgICAgIHZhbHVlLFxyXG4gICAgICAgIHRleHRcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5wYW5lbC5jdXJyZW50T3B0aW9uT3ZlcnJpZGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgXy5lYWNoKHRoaXMucGFuZWwuY3VycmVudE9wdGlvbk92ZXJyaWRlcywgbyA9PiB7XHJcbiAgICAgICAgaWYgKG8ucHJvcGVydHlOYW1lID09PSBwcm9wZXJ0eU5hbWUpIHtcclxuICAgICAgICAgIG5ld092ZXJyaWRlcy5wdXNoKHtcclxuICAgICAgICAgICAgcHJvcGVydHlOYW1lLFxyXG4gICAgICAgICAgICB2YWx1ZSxcclxuICAgICAgICAgICAgdGV4dFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5ld092ZXJyaWRlcy5wdXNoKG8pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnBhbmVsLmN1cnJlbnRPcHRpb25PdmVycmlkZXMgPSBuZXdPdmVycmlkZXM7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICByZW1vdmVPcHRpb25PdmVycmlkZShvcHRpb246IFN0cmluZykge1xyXG4gICAgbGV0IG5ld092ZXJyaWRlcyA9IFtdO1xyXG4gICAgaWYgKHRoaXMucGFuZWwuY3VycmVudE9wdGlvbk92ZXJyaWRlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIF8uZWFjaCh0aGlzLnBhbmVsLmN1cnJlbnRPcHRpb25PdmVycmlkZXMsIG8gPT4ge1xyXG4gICAgICAgIGlmIChvLnByb3BlcnR5TmFtZSAhPT0gb3B0aW9uKSB7XHJcbiAgICAgICAgICBuZXdPdmVycmlkZXMucHVzaChvKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wYW5lbC5jdXJyZW50T3B0aW9uT3ZlcnJpZGVzID0gbmV3T3ZlcnJpZGVzO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgYWRqdXN0UGFuZWxIZWlnaHQocGFuZWxIZWlnaHQ6IG51bWJlcikge1xyXG4gICAgbGV0IHJvb3RFbGVtID0gdGhpcy5lbGVtLmZpbmQoXCIudGFibGUtcGFuZWwtc2Nyb2xsXCIpO1xyXG4gICAgbGV0IG1heGhlaWdodG9mcGFuZWwgPSB0aGlzLnBhbmVsLmRlYnVnX21vZGUgPyBwYW5lbEhlaWdodCAtIDcxIDogcGFuZWxIZWlnaHQgLSAzMTtcclxuICAgIHJvb3RFbGVtLmNzcyh7IFwibWF4LWhlaWdodFwiOiBtYXhoZWlnaHRvZnBhbmVsICsgXCJweFwiIH0pO1xyXG4gIH1cclxufVxyXG5cclxuR3JhZmFuYUJvb21UYWJsZUN0cmwucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICBpZiAodGhpcy5kYXRhUmVjZWl2ZWQpIHtcclxuICAgIHRoaXMucGFuZWwuZGVmYXVsdF90aXRsZV9mb3Jfcm93cyA9IHRoaXMucGFuZWwuZGVmYXVsdF90aXRsZV9mb3Jfcm93cztcclxuICAgIGxldCBtZXRyaWNzUmVjZWl2ZWQgPSB1dGlscy5nZXRGaWVsZHModGhpcy5kYXRhUmVjZWl2ZWQsIFwidGFyZ2V0XCIpO1xyXG4gICAgaWYgKG1ldHJpY3NSZWNlaXZlZC5sZW5ndGggIT09IF8udW5pcShtZXRyaWNzUmVjZWl2ZWQpLmxlbmd0aCkge1xyXG4gICAgICBsZXQgZHVwbGljYXRlS2V5cyA9IF8udW5pcShtZXRyaWNzUmVjZWl2ZWQuZmlsdGVyKHYgPT4ge1xyXG4gICAgICAgIHJldHVybiBtZXRyaWNzUmVjZWl2ZWQuZmlsdGVyKHQgPT4gdCA9PT0gdikubGVuZ3RoID4gMTtcclxuICAgICAgfSkpO1xyXG4gICAgICB0aGlzLnBhbmVsLmVycm9yID0gdXRpbHMuYnVpbGRFcnJvcihgRHVwbGljYXRlIGtleXMgZm91bmRgLCBgRHVwbGljYXRlIGtleSB2YWx1ZXMgOiA8YnIvPiAke2R1cGxpY2F0ZUtleXMuam9pbihcIjxici8+IFwiKX1gKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFuZWwuZXJyb3IgPSB1bmRlZmluZWQ7XHJcbiAgICAgIGxldCBkYXRhQ29tcHV0ZWQgPSBjb21wdXRlKHRoaXMuZGF0YVJlY2VpdmVkLm1hcChkZWZhdWx0SGFuZGxlci5iaW5kKHRoaXMpKSwgdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybiB8fCBjb25maWcucGFuZWxEZWZhdWx0cy5kZWZhdWx0UGF0dGVybiwgdGhpcy5wYW5lbC5wYXR0ZXJucywgdGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIpO1xyXG4gICAgICBsZXQgcm93c19mb3VuZCA9IHV0aWxzLmdldEZpZWxkcyhkYXRhQ29tcHV0ZWQsIFwicm93X25hbWVcIik7XHJcbiAgICAgIGxldCBjb2xzX2ZvdW5kID0gdXRpbHMuZ2V0RmllbGRzKGRhdGFDb21wdXRlZCwgXCJjb2xfbmFtZVwiKTtcclxuICAgICAgbGV0IGtleXNfZm91bmQgPSB1dGlscy5nZXRGaWVsZHMoZGF0YUNvbXB1dGVkLCBcImtleV9uYW1lXCIpO1xyXG4gICAgICBsZXQgaXNfdW5pcXVlX2tleXMgPSAoa2V5c19mb3VuZC5sZW5ndGggPT09IF8udW5pcShrZXlzX2ZvdW5kKS5sZW5ndGgpO1xyXG4gICAgICBpZiAoaXNfdW5pcXVlX2tleXMpIHtcclxuICAgICAgICB0aGlzLnBhbmVsLmVycm9yID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBvdXRwdXQgPSBbXTtcclxuICAgICAgICBfLmVhY2goXy51bmlxKHJvd3NfZm91bmQpLCAocm93X25hbWUpID0+IHtcclxuICAgICAgICAgIGxldCBvOiBhbnkgPSB7fTtcclxuICAgICAgICAgIG8ucm93ID0gcm93X25hbWU7XHJcbiAgICAgICAgICBvLmNvbHMgPSBbXTtcclxuICAgICAgICAgIF8uZWFjaChfLnVuaXEoY29sc19mb3VuZCksIChjb2xfbmFtZSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2hlZF92YWx1ZSA9IChfLmZpbmQoZGF0YUNvbXB1dGVkLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgIHJldHVybiBlLnJvd19uYW1lID09PSByb3dfbmFtZSAmJiBlLmNvbF9uYW1lID09PSBjb2xfbmFtZTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBsZXQgbXljb2wgOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgbXljb2wubmFtZSA9IGNvbF9uYW1lO1xyXG4gICAgICAgICAgICBteWNvbC52YWx1ZSA9IG1hdGNoZWRfdmFsdWUgPyBtYXRjaGVkX3ZhbHVlLnZhbHVlIHx8IE5hTiA6IE5hTjtcclxuICAgICAgICAgICAgbXljb2wuZGlzcGxheVZhbHVlID0gbWF0Y2hlZF92YWx1ZSA/IG1hdGNoZWRfdmFsdWUuZGlzcGxheVZhbHVlIHx8IG1hdGNoZWRfdmFsdWUudmFsdWUgfHwgXCJOL0FcIiA6IHRoaXMucGFuZWwubm9fbWF0Y2hfdGV4dCB8fCBcIk4vQVwiO1xyXG4gICAgICAgICAgICBteWNvbC5iZ0NvbG9yID0gbWF0Y2hlZF92YWx1ZSAmJiBtYXRjaGVkX3ZhbHVlLmJnQ29sb3IgPyBtYXRjaGVkX3ZhbHVlLmJnQ29sb3IgOiBcInRyYW5zcGFyZW50XCI7XHJcbiAgICAgICAgICAgIG15Y29sLnRleHRDb2xvciA9IG1hdGNoZWRfdmFsdWUgJiYgbWF0Y2hlZF92YWx1ZS50ZXh0Q29sb3IgPyBtYXRjaGVkX3ZhbHVlLnRleHRDb2xvciA6IFwid2hpdGVcIjtcclxuICAgICAgICAgICAgbGV0IHRvb2x0aXBUZW1wbGF0ZSA9IG1hdGNoZWRfdmFsdWUgJiYgbWF0Y2hlZF92YWx1ZS50b29sdGlwVGVtcGxhdGUgPyBtYXRjaGVkX3ZhbHVlLnRvb2x0aXBUZW1wbGF0ZSA6IHRoaXMuY3RybC5wYW5lbC5kZWZhdWx0UGF0dGVybi50b29sdGlwVGVtcGxhdGUgfHwgXCJObyBtYXRjaGluZyBzZXJpZXMgZm91bmQgZm9yIF9yb3dfbmFtZV8gJiBfY29sX25hbWVfXCI7XHJcbiAgICAgICAgICAgIGlmIChtYXRjaGVkX3ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgbXljb2wudG9vbHRpcCA9IHJlbmRlcmVyLmdldFRvb2x0aXBNZXNzYWdlKFxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcFRlbXBsYXRlLFxyXG4gICAgICAgICAgICAgICAgdXRpbHMuZ2V0QWN0dWFsTmFtZVdpdGhvdXRUcmFuc2Zvcm1TaWduKG1hdGNoZWRfdmFsdWUuYWN0dWFsX3Jvd19uYW1lIHx8IHJvd19uYW1lKSxcclxuICAgICAgICAgICAgICAgIHV0aWxzLmdldEFjdHVhbE5hbWVXaXRob3V0VHJhbnNmb3JtU2lnbihtYXRjaGVkX3ZhbHVlLmFjdHVhbF9jb2xfbmFtZSB8fCBjb2xfbmFtZSksXHJcbiAgICAgICAgICAgICAgICBtYXRjaGVkX3ZhbHVlLnZhbHVlRm9ybWF0dGVkIHx8IHRoaXMucGFuZWwubm9fbWF0Y2hfdGV4dCB8fCBcIk4vQVwiXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBteWNvbC50b29sdGlwID0gcmVuZGVyZXIuZ2V0VG9vbHRpcE1lc3NhZ2UoXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwVGVtcGxhdGUsXHJcbiAgICAgICAgICAgICAgICB1dGlscy5nZXRBY3R1YWxOYW1lV2l0aG91dFRyYW5zZm9ybVNpZ24ocm93X25hbWUpLFxyXG4gICAgICAgICAgICAgICAgdXRpbHMuZ2V0QWN0dWFsTmFtZVdpdGhvdXRUcmFuc2Zvcm1TaWduKGNvbF9uYW1lKSxcclxuICAgICAgICAgICAgICAgIFwiTmFOXCIgfHwgdGhpcy5wYW5lbC5ub19tYXRjaF90ZXh0IHx8IFwiTi9BXCJcclxuICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG15Y29sLnRvb2x0aXAgPSB0aGlzLiRzY2UudHJ1c3RBc0h0bWwobXljb2wudG9vbHRpcCk7XHJcbiAgICAgICAgICAgIG8uY29scy5wdXNoKG15Y29sKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgb3V0cHV0LnB1c2gobyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmVuZGVyZXIuYnVpbGRIVE1MKFxyXG4gICAgICAgICAgdGhpcy5lbGVtLFxyXG4gICAgICAgICAgdGhpcy5nZXRPcHRpb25PdmVycmlkZShcIkhJREVfSEVBREVSU1wiKSA9PT0gXCJ0cnVlXCIsXHJcbiAgICAgICAgICB0aGlzLmdldE9wdGlvbk92ZXJyaWRlKFwiSElERV9GSVJTVF9DT0xVTU5cIikgPT09IFwidHJ1ZVwiLFxyXG4gICAgICAgICAgdGhpcy5nZXRPcHRpb25PdmVycmlkZShcIlRFWFRfQUxJR05fVEFCTEVfSEVBREVSXCIpLFxyXG4gICAgICAgICAgY29sc19mb3VuZCxcclxuICAgICAgICAgIG91dHB1dCxcclxuICAgICAgICAgIHRoaXMuZ2V0T3B0aW9uT3ZlcnJpZGUoXCJURVhUX0FMSUdOX0ZJUlNUX0NPTFVNTlwiKSxcclxuICAgICAgICAgIHRoaXMuZ2V0T3B0aW9uT3ZlcnJpZGUoXCJURVhUX0FMSUdOX1RBQkxFX0NFTExTXCIpLFxyXG4gICAgICAgICAgdGhpcy5wYW5lbC5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgZHVwbGljYXRlS2V5cyA9IF8udW5pcShrZXlzX2ZvdW5kLmZpbHRlcih2ID0+IHtcclxuICAgICAgICAgIHJldHVybiBrZXlzX2ZvdW5kLmZpbHRlcih0ID0+IHQgPT09IHYpLmxlbmd0aCA+IDE7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIHRoaXMucGFuZWwuZXJyb3IgPSB1dGlscy5idWlsZEVycm9yKGBEdXBsaWNhdGUga2V5cyBmb3VuZGAsIGBEdXBsaWNhdGUga2V5IHZhbHVlcyA6IDxici8+ICR7ZHVwbGljYXRlS2V5cy5qb2luKFwiPGJyLz4gXCIpfWApO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLnBhbmVsLmRlYnVnX21vZGUgPT09IHRydWUpIHtcclxuICAgICAgICByZW5kZXJlci5idWlsZERlYnVnSFRNTCh0aGlzLmVsZW0sIGRhdGFDb21wdXRlZCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuYWRqdXN0UGFuZWxIZWlnaHQodGhpcy5jdHJsLmhlaWdodCk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICBHcmFmYW5hQm9vbVRhYmxlQ3RybCBhcyBQYW5lbEN0cmxcclxufTtcclxuIl19