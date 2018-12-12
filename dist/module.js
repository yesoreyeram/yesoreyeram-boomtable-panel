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
                    _this.events.on("data-snapshot-load", _this.onDataReceived.bind(_this));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFXQSxtQkFBYSxDQUFDO2dCQUNaLElBQUksRUFBRSxhQUFXLGVBQVMsMEJBQXVCO2dCQUNqRCxLQUFLLEVBQUUsYUFBVyxlQUFTLDJCQUF3QjthQUNwRCxDQUFDLENBQUM7O2dCQUVnQyx3Q0FBZ0I7Z0JBU2pELDhCQUFZLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSTtvQkFBbkMsWUFDRSxrQkFBTSxNQUFNLEVBQUUsU0FBUyxDQUFDLFNBU3pCO29CQWJELHNCQUFnQixHQUFzQixZQUFNLENBQUMsZ0JBQWdCLENBQUM7b0JBQzlELGlCQUFXLEdBQVEsYUFBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN4QyxxQkFBZSxHQUFRLFlBQU0sQ0FBQyxlQUFlLENBQUM7b0JBRzVDLGdCQUFDLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsWUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUM3QyxLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztvQkFDaEUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztvQkFDckUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztvQkFDakUsSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixLQUFLLENBQUMsQ0FBQyxFQUFFO3dCQUN4QyxLQUFJ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QUMsS0FBSyxDQUFDLHNCQUFzQixDQUNsQyxDQUFDO3lCQUNIOzZCQUFNOzRCQUNMLElBQUksYUFBYSxHQUFHLGdCQUFDLENBQUMsSUFBSSxDQUFDLFlBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDO2dDQUM1QyxPQUFPLFlBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEtBQUssQ0FBQyxFQUFQLENBQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7NEJBQ3BELENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ0osSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsRUFBRSxrQ0FBZ0MsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUcsQ0FBQyxDQUFDO3lCQUM3SDt3QkFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxLQUFLLElBQUksRUFBRTs0QkFDbEMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGNBQVksQ0FBQyxDQUFDO3lCQUNsRDtxQkFDRjtvQkFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDMUM7WUFDSCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi9ub2RlX21vZHVsZXMvZ3JhZmFuYS1zZGstbW9ja3MvYXBwL2hlYWRlcnMvY29tbW9uLmQudHNcIiAvPlxyXG5cclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQga2JuIGZyb20gXCJhcHAvY29yZS91dGlscy9rYm5cIjtcclxuaW1wb3J0IHsgbG9hZFBsdWdpbkNzcywgTWV0cmljc1BhbmVsQ3RybCB9IGZyb20gXCJhcHAvcGx1Z2lucy9zZGtcIjtcclxuaW1wb3J0IHsgUGF0dGVybiwgVGltZUJhc2VUaHJlc2hvbGQsIFZhbHVlTmFtZU9wdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZXMvaW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgeyBwbHVnaW5faWQsIGNvbmZpZyB9IGZyb20gXCIuL2FwcC9hcHBcIjtcclxuaW1wb3J0IHsgY29tcHV0ZSwgZGVmYXVsdEhhbmRsZXIgfSBmcm9tIFwiLi9hcHAvc2VyaWVzSGFuZGxlclwiO1xyXG5pbXBvcnQgKiBhcyByZW5kZXJlciBmcm9tIFwiLi9hcHAvcmVuZGVyZXJcIjtcclxuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcIi4vYXBwL3V0aWxzXCI7XHJcblxyXG5sb2FkUGx1Z2luQ3NzKHtcclxuICBkYXJrOiBgcGx1Z2lucy8ke3BsdWdpbl9pZH0vY3NzL2RlZmF1bHQuZGFyay5jc3NgLFxyXG4gIGxpZ2h0OiBgcGx1Z2lucy8ke3BsdWdpbl9pZH0vY3NzL2RlZmF1bHQubGlnaHQuY3NzYFxyXG59KTtcclxuXHJcbmNsYXNzIEdyYWZhbmFCb29tVGFibGVDdHJsIGV4dGVuZHMgTWV0cmljc1BhbmVsQ3RybCB7XHJcbiAgc3RhdGljIHRlbXBsYXRlVXJsOiBzdHJpbmcgPSBcInBhcnRpYWxzL21vZHVsZS5odG1sXCI7XHJcbiAgY3RybDogYW55O1xyXG4gIGVsZW06IGFueTtcclxuICAkc2NlOiBhbnk7XHJcbiAgZGF0YVJlY2VpdmVkOiBhbnk7XHJcbiAgdmFsdWVOYW1lT3B0aW9uczogVmFsdWVOYW1lT3B0aW9uW10gPSBjb25maWcudmFsdWVOYW1lT3B0aW9ucztcclxuICB1bml0Rm9ybWF0czogYW55ID0ga2JuLmdldFVuaXRGb3JtYXRzKCk7XHJcbiAgb3B0aW9uT3ZlcnJpZGVzOiBhbnkgPSBjb25maWcub3B0aW9uT3ZlcnJpZGVzO1xyXG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJGluamVjdG9yLCAkc2NlKSB7XHJcbiAgICBzdXBlcigkc2NvcGUsICRpbmplY3Rvcik7XHJcbiAgICBfLmRlZmF1bHRzKHRoaXMucGFuZWwsIGNvbmZpZy5wYW5lbERlZmF1bHRzKTtcclxuICAgIHRoaXMuZXZlbnRzLm9uKFwiZGF0YS1yZWNlaXZlZFwiLCB0aGlzLm9uRGF0YVJlY2VpdmVkLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5ldmVudHMub24oXCJkYXRhLXNuYXBzaG90LWxvYWRcIiwgdGhpcy5vbkRhdGFSZWNlaXZlZC5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuZXZlbnRzLm9uKFwiaW5pdC1lZGl0LW1vZGVcIiwgdGhpcy5vbkluaXRFZGl0TW9kZS5iaW5kKHRoaXMpKTtcclxuICAgIGlmICh0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9PT0gLTEpIHtcclxuICAgICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aDtcclxuICAgIH1cclxuICAgIHRoaXMuJHNjZSA9ICRzY2U7XHJcbiAgfVxyXG4gIG9uSW5pdEVkaXRNb2RlKCkge1xyXG4gICAgdGhpcy5hZGRFZGl0b3JUYWIoXCJQYXR0ZXJuc1wiLCBgcHVibGljL3BsdWdpbnMvJHtwbHVnaW5faWR9L3BhcnRpYWxzL3BhdHRlcm5zLmh0bWxgLCAyKTtcclxuICAgIHRoaXMuYWRkRWRpdG9yVGFiKFwiT3B0aW9uc1wiLCBgcHVibGljL3BsdWdpbnMvJHtwbHVnaW5faWR9L3BhcnRpYWxzL29wdGlvbnMuaHRtbGAsIDMpO1xyXG4gIH1cclxuICBvbkRhdGFSZWNlaXZlZChkYXRhOiBhbnkpIHtcclxuICAgIHRoaXMuZGF0YVJlY2VpdmVkID0gZGF0YTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIGFkZFBhdHRlcm4oKSB7XHJcbiAgICBsZXQgbmV3UGF0dGVybjogUGF0dGVybiA9IHtcclxuICAgICAgbmFtZTogXCJOZXcgUGF0dGVyblwiLFxyXG4gICAgICBwYXR0ZXJuOiBcIl5zZXJ2ZXIuKmNwdSRcIixcclxuICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBkZWxpbWl0ZXI6IFwiLlwiLFxyXG4gICAgICB2YWx1ZU5hbWU6IFwiYXZnXCIsXHJcbiAgICAgIHJvd19uYW1lOiB0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlciArIFwiMFwiICsgdGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIsXHJcbiAgICAgIGNvbF9uYW1lOiB0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlciArIFwiMVwiICsgdGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIsXHJcbiAgICAgIHRocmVzaG9sZHM6IFwiNzAsOTBcIixcclxuICAgICAgdGltZV9iYXNlZF90aHJlc2hvbGRzOiBbXSxcclxuICAgICAgZW5hYmxlX3RpbWVfYmFzZWRfdGhyZXNob2xkczogZmFsc2UsXHJcbiAgICAgIGVuYWJsZV9iZ0NvbG9yOiBmYWxzZSxcclxuICAgICAgYmdDb2xvcnM6IFwiZ3JlZW58b3JhbmdlfHJlZFwiLFxyXG4gICAgICBlbmFibGVfYmdDb2xvcl9vdmVycmlkZXM6IGZhbHNlLFxyXG4gICAgICBiZ0NvbG9yc19vdmVycmlkZXM6IFwiMC0+Z3JlZW58Mi0+cmVkfDEtPnllbGxvd1wiLFxyXG4gICAgICBlbmFibGVfVGV4dENvbG9yczogZmFsc2UsXHJcbiAgICAgIHRleHRDb2xvcnM6IFwiZ3JlZW58b3JhbmdlfHJlZFwiLFxyXG4gICAgICBlbmFibGVfVGV4dENvbG9yX292ZXJyaWRlczogZmFsc2UsXHJcbiAgICAgIHRleHRDb2xvcnNfb3ZlcnJpZGVzOiBcIjAtPmdyZWVufDItPnJlZHwxLT55ZWxsb3dcIixcclxuICAgICAgZW5hYmxlX3RyYW5zZm9ybTogZmFsc2UsXHJcbiAgICAgIHRyYW5zZm9ybV92YWx1ZXM6IFwiX3ZhbHVlX3xfdmFsdWVffF92YWx1ZV9cIixcclxuICAgICAgZW5hYmxlX3RyYW5zZm9ybV9vdmVycmlkZXM6IGZhbHNlLFxyXG4gICAgICB0cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlczogXCIwLT5kb3dufDEtPnVwXCIsXHJcbiAgICAgIGRlY2ltYWxzOiAyLFxyXG4gICAgICB0b29sdGlwVGVtcGxhdGUgOiBcIlJvdyBOYW1lIDogX3Jvd19uYW1lXyA8YnIvPkNvbCBOYW1lIDogX2NvbF9uYW1lXyA8YnIvPlZhbHVlIDogX3ZhbHVlX1wiLFxyXG4gICAgICBmb3JtYXQ6IFwibm9uZVwiLFxyXG4gICAgICBudWxsX2NvbG9yOiBcImRhcmtyZWRcIixcclxuICAgICAgbnVsbF90ZXh0X2NvbG9yOiBcIndoaXRlXCIsXHJcbiAgICAgIG51bGxfdmFsdWU6IFwiTm8gZGF0YVwiLFxyXG4gICAgICBlbmFibGVfY2xpY2thYmxlX2NlbGxzOiBmYWxzZSxcclxuICAgICAgY2xpY2thYmxlX2NlbGxzX2xpbms6IFwiXCIsXHJcbiAgICAgIGZpbHRlcjoge1xyXG4gICAgICAgIHZhbHVlX2JlbG93OiBcIlwiLFxyXG4gICAgICAgIHZhbHVlX2Fib3ZlOiBcIlwiLFxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhpcy5wYW5lbC5wYXR0ZXJucy5wdXNoKG5ld1BhdHRlcm4pO1xyXG4gICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCAtIDE7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBtb3ZlUGF0dGVybihkaXJlY3Rpb246IFN0cmluZywgaW5kZXg6IG51bWJlcikge1xyXG4gICAgbGV0IHRlbXBFbGVtZW50OiBQYXR0ZXJuID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF07XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcIlVQXCIpIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0gPSB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4IC0gMV07XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXggLSAxXSA9IHRlbXBFbGVtZW50O1xyXG4gICAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9IGluZGV4IC0gMTtcclxuICAgIH1cclxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiRE9XTlwiKSB7XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleCArIDFdO1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4ICsgMV0gPSB0ZW1wRWxlbWVudDtcclxuICAgICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSBpbmRleCArIDE7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICByZW1vdmVQYXR0ZXJuKGluZGV4OiBudW1iZXIpIHtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID0gKHRoaXMucGFuZWwucGF0dGVybnMgJiYgdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggPiAwKSA/ICh0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCAtIDEpIDogLTE7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBjbG9uZVBhdHRlcm4oaW5kZXg6IG51bWJlcikge1xyXG4gICAgbGV0IGNvcGllZFBhdHRlcm46IFBhdHRlcm4gPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XSk7XHJcbiAgICB0aGlzLnBhbmVsLnBhdHRlcm5zLnB1c2goY29waWVkUGF0dGVybik7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBhZGRfdGltZV9iYXNlZF90aHJlc2hvbGRzKGluZGV4OiBudW1iZXIpIHtcclxuICAgIGxldCBuZXdfdGltZV9iYXNlZF90aHJlc2hvbGQ6IFRpbWVCYXNlVGhyZXNob2xkID0ge1xyXG4gICAgICBuYW1lOiBcIkVhcmx5IG1vcm5pbmcgb2YgZXZlcnlkYXlcIixcclxuICAgICAgZnJvbTogXCIwMDAwXCIsXHJcbiAgICAgIHRvOiBcIjA1MzBcIixcclxuICAgICAgZW5hYmxlZERheXM6IFwiU3VuLE1vbixUdWUsV2VkLFRodSxGcmksU2F0XCIsXHJcbiAgICAgIHRocmVzaG9sZDogXCI3MCw5MFwiXHJcbiAgICB9O1xyXG4gICAgaWYgKGluZGV4ID09PSB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCB8fCBpbmRleCA9PT0gLTEpIHtcclxuICAgICAgdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybi50aW1lX2Jhc2VkX3RocmVzaG9sZHMgPSB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLnRpbWVfYmFzZWRfdGhyZXNob2xkcyB8fCBbXTtcclxuICAgICAgdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybi50aW1lX2Jhc2VkX3RocmVzaG9sZHMucHVzaChuZXdfdGltZV9iYXNlZF90aHJlc2hvbGQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0udGltZV9iYXNlZF90aHJlc2hvbGRzID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0udGltZV9iYXNlZF90aHJlc2hvbGRzIHx8IFtdO1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS50aW1lX2Jhc2VkX3RocmVzaG9sZHMucHVzaChuZXdfdGltZV9iYXNlZF90aHJlc2hvbGQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgcmVtb3ZlX3RpbWVfYmFzZWRfdGhyZXNob2xkcyhwYXR0ZXJuSW5kZXg6IG51bWJlciwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgaWYgKHBhdHRlcm5JbmRleCA9PT0gdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggfHwgcGF0dGVybkluZGV4ID09PSAtMSkge1xyXG4gICAgICB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLnRpbWVfYmFzZWRfdGhyZXNob2xkcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1twYXR0ZXJuSW5kZXhdLnRpbWVfYmFzZWRfdGhyZXNob2xkcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgaW52ZXJzZUJHQ29sb3JzKGluZGV4OiBudW1iZXIpIHtcclxuICAgIGlmIChpbmRleCA9PT0gdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggfHwgaW5kZXggPT09IC0xKSB7XHJcbiAgICAgIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4uYmdDb2xvcnMgPSB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLmJnQ29sb3JzLnNwbGl0KFwifFwiKS5yZXZlcnNlKCkuam9pbihcInxcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS5iZ0NvbG9ycyA9IHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdLmJnQ29sb3JzLnNwbGl0KFwifFwiKS5yZXZlcnNlKCkuam9pbihcInxcIik7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBpbnZlcnNlVGV4dENvbG9ycyhpbmRleDogbnVtYmVyKSB7XHJcbiAgICBpZiAoaW5kZXggPT09IHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoIHx8IGluZGV4ID09PSAtMSkge1xyXG4gICAgICB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLnRleHRDb2xvcnMgPSB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLnRleHRDb2xvcnMuc3BsaXQoXCJ8XCIpLnJldmVyc2UoKS5qb2luKFwifFwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdLnRleHRDb2xvcnMgPSB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS50ZXh0Q29sb3JzLnNwbGl0KFwifFwiKS5yZXZlcnNlKCkuam9pbihcInxcIik7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBpbnZlcnNlVHJhbnNmb3JtVmFsdWVzKGluZGV4OiBudW1iZXIpIHtcclxuICAgIGlmIChpbmRleCA9PT0gdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggfHwgaW5kZXggPT09IC0xKSB7XHJcbiAgICAgIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4udHJhbnNmb3JtX3ZhbHVlcyA9IHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4udHJhbnNmb3JtX3ZhbHVlcy5zcGxpdChcInxcIikucmV2ZXJzZSgpLmpvaW4oXCJ8XCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0udHJhbnNmb3JtX3ZhbHVlcyA9IHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdLnRyYW5zZm9ybV92YWx1ZXMuc3BsaXQoXCJ8XCIpLnJldmVyc2UoKS5qb2luKFwifFwiKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBzZXRVbml0Rm9ybWF0KHN1Ykl0ZW0sIGluZGV4OiBudW1iZXIpIHtcclxuICAgIGlmIChpbmRleCA9PT0gdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggfHwgaW5kZXggPT09IHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4uZm9ybWF0ID0gc3ViSXRlbS52YWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdLmZvcm1hdCA9IHN1Ykl0ZW0udmFsdWU7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBsaW1pdFRleHQodGV4dDogU3RyaW5nLCBtYXhsZW5ndGg6IG51bWJlcikge1xyXG4gICAgaWYgKHRleHQuc3BsaXQoXCJcIikubGVuZ3RoID4gbWF4bGVuZ3RoKSB7XHJcbiAgICAgIHRleHQgPSB0ZXh0LnN1YnN0cmluZygwLCBtYXhsZW5ndGggLSAzKSArIFwiLi4uXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGV4dDtcclxuICB9XHJcbiAgbGluayhzY29wZSwgZWxlbSwgYXR0cnMsIGN0cmwpIHtcclxuICAgIGlmIChzY29wZSkgeyBzY29wZSA9IHNjb3BlOyB9XHJcbiAgICBpZiAoYXR0cnMpIHsgYXR0cnMgPSBhdHRyczsgfVxyXG4gICAgdGhpcy5jdHJsID0gY3RybDtcclxuICAgIHRoaXMuZWxlbSA9IGVsZW07XHJcbiAgfVxyXG4gIGdldE9wdGlvbk92ZXJyaWRlKHByb3BlcnR5TmFtZTogU3RyaW5nKSB7XHJcbiAgICBsZXQgb3B0aW9uID0gXy5maW5kKHRoaXMucGFuZWwuY3VycmVudE9wdGlvbk92ZXJyaWRlcywgbyA9PiBvLnByb3BlcnR5TmFtZSA9PT0gcHJvcGVydHlOYW1lKTtcclxuICAgIGxldCBkZWZhdWx0X29wdGlvbiA9IF8uZmluZChjb25maWcub3B0aW9uT3ZlcnJpZGVzLCBvID0+IG8ucHJvcGVydHlOYW1lID09PSBwcm9wZXJ0eU5hbWUpO1xyXG4gICAgaWYgKG9wdGlvbikge1xyXG4gICAgICByZXR1cm4gb3B0aW9uLnZhbHVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGRlZmF1bHRfb3B0aW9uLmRlZmF1bHRWYWx1ZTtcclxuICAgIH1cclxuICB9XHJcbiAgc2V0T3B0aW9uT3ZlcnJpZGUocHJvcGVydHlOYW1lOiBTdHJpbmcsIHZhbHVlOiBTdHJpbmcsIHRleHQ6IFN0cmluZykge1xyXG4gICAgbGV0IG5ld092ZXJyaWRlcyA9IFtdO1xyXG4gICAgaWYgKF8uZmlsdGVyKHRoaXMucGFuZWwuY3VycmVudE9wdGlvbk92ZXJyaWRlcywgbyA9PiBvLnByb3BlcnR5TmFtZSA9PT0gcHJvcGVydHlOYW1lKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgbmV3T3ZlcnJpZGVzLnB1c2goe1xyXG4gICAgICAgIHByb3BlcnR5TmFtZSxcclxuICAgICAgICB2YWx1ZSxcclxuICAgICAgICB0ZXh0XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMucGFuZWwuY3VycmVudE9wdGlvbk92ZXJyaWRlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIF8uZWFjaCh0aGlzLnBhbmVsLmN1cnJlbnRPcHRpb25PdmVycmlkZXMsIG8gPT4ge1xyXG4gICAgICAgIGlmIChvLnByb3BlcnR5TmFtZSA9PT0gcHJvcGVydHlOYW1lKSB7XHJcbiAgICAgICAgICBuZXdPdmVycmlkZXMucHVzaCh7XHJcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZSxcclxuICAgICAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgICAgIHRleHRcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBuZXdPdmVycmlkZXMucHVzaChvKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wYW5lbC5jdXJyZW50T3B0aW9uT3ZlcnJpZGVzID0gbmV3T3ZlcnJpZGVzO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgcmVtb3ZlT3B0aW9uT3ZlcnJpZGUob3B0aW9uOiBTdHJpbmcpIHtcclxuICAgIGxldCBuZXdPdmVycmlkZXMgPSBbXTtcclxuICAgIGlmICh0aGlzLnBhbmVsLmN1cnJlbnRPcHRpb25PdmVycmlkZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICBfLmVhY2godGhpcy5wYW5lbC5jdXJyZW50T3B0aW9uT3ZlcnJpZGVzLCBvID0+IHtcclxuICAgICAgICBpZiAoby5wcm9wZXJ0eU5hbWUgIT09IG9wdGlvbikge1xyXG4gICAgICAgICAgbmV3T3ZlcnJpZGVzLnB1c2gobyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoaXMucGFuZWwuY3VycmVudE9wdGlvbk92ZXJyaWRlcyA9IG5ld092ZXJyaWRlcztcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIGFkanVzdFBhbmVsSGVpZ2h0KHBhbmVsSGVpZ2h0OiBudW1iZXIpIHtcclxuICAgIGxldCByb290RWxlbSA9IHRoaXMuZWxlbS5maW5kKFwiLnRhYmxlLXBhbmVsLXNjcm9sbFwiKTtcclxuICAgIGxldCBtYXhoZWlnaHRvZnBhbmVsID0gdGhpcy5wYW5lbC5kZWJ1Z19tb2RlID8gcGFuZWxIZWlnaHQgLSA3MSA6IHBhbmVsSGVpZ2h0IC0gMzE7XHJcbiAgICByb290RWxlbS5jc3MoeyBcIm1heC1oZWlnaHRcIjogbWF4aGVpZ2h0b2ZwYW5lbCArIFwicHhcIiB9KTtcclxuICB9XHJcbn1cclxuXHJcbkdyYWZhbmFCb29tVGFibGVDdHJsLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKHRoaXMuZGF0YVJlY2VpdmVkKSB7XHJcbiAgICB0aGlzLnBhbmVsLmRlZmF1bHRfdGl0bGVfZm9yX3Jvd3MgPSB0aGlzLnBhbmVsLmRlZmF1bHRfdGl0bGVfZm9yX3Jvd3M7XHJcbiAgICBsZXQgbWV0cmljc1JlY2VpdmVkID0gdXRpbHMuZ2V0RmllbGRzKHRoaXMuZGF0YVJlY2VpdmVkLCBcInRhcmdldFwiKTtcclxuICAgIGlmIChtZXRyaWNzUmVjZWl2ZWQubGVuZ3RoICE9PSBfLnVuaXEobWV0cmljc1JlY2VpdmVkKS5sZW5ndGgpIHtcclxuICAgICAgbGV0IGR1cGxpY2F0ZUtleXMgPSBfLnVuaXEobWV0cmljc1JlY2VpdmVkLmZpbHRlcih2ID0+IHtcclxuICAgICAgICByZXR1cm4gbWV0cmljc1JlY2VpdmVkLmZpbHRlcih0ID0+IHQgPT09IHYpLmxlbmd0aCA+IDE7XHJcbiAgICAgIH0pKTtcclxuICAgICAgdGhpcy5wYW5lbC5lcnJvciA9IHV0aWxzLmJ1aWxkRXJyb3IoYER1cGxpY2F0ZSBrZXlzIGZvdW5kYCwgYER1cGxpY2F0ZSBrZXkgdmFsdWVzIDogPGJyLz4gJHtkdXBsaWNhdGVLZXlzLmpvaW4oXCI8YnIvPiBcIil9YCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbmVsLmVycm9yID0gdW5kZWZpbmVkO1xyXG4gICAgICBsZXQgZGF0YUNvbXB1dGVkID0gY29tcHV0ZSh0aGlzLmRhdGFSZWNlaXZlZC5tYXAoZGVmYXVsdEhhbmRsZXIuYmluZCh0aGlzKSksIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4gfHwgY29uZmlnLnBhbmVsRGVmYXVsdHMuZGVmYXVsdFBhdHRlcm4sIHRoaXMucGFuZWwucGF0dGVybnMsIHRoaXMucGFuZWwucm93X2NvbF93cmFwcGVyKTtcclxuICAgICAgbGV0IHJvd3NfZm91bmQgPSB1dGlscy5nZXRGaWVsZHMoZGF0YUNvbXB1dGVkLCBcInJvd19uYW1lXCIpO1xyXG4gICAgICBsZXQgY29sc19mb3VuZCA9IHV0aWxzLmdldEZpZWxkcyhkYXRhQ29tcHV0ZWQsIFwiY29sX25hbWVcIik7XHJcbiAgICAgIGxldCBrZXlzX2ZvdW5kID0gdXRpbHMuZ2V0RmllbGRzKGRhdGFDb21wdXRlZCwgXCJrZXlfbmFtZVwiKTtcclxuICAgICAgbGV0IGlzX3VuaXF1ZV9rZXlzID0gKGtleXNfZm91bmQubGVuZ3RoID09PSBfLnVuaXEoa2V5c19mb3VuZCkubGVuZ3RoKTtcclxuICAgICAgaWYgKGlzX3VuaXF1ZV9rZXlzKSB7XHJcbiAgICAgICAgdGhpcy5wYW5lbC5lcnJvciA9IHVuZGVmaW5lZDtcclxuICAgICAgICBsZXQgb3V0cHV0ID0gW107XHJcbiAgICAgICAgXy5lYWNoKF8udW5pcShyb3dzX2ZvdW5kKSwgKHJvd19uYW1lKSA9PiB7XHJcbiAgICAgICAgICBsZXQgbzogYW55ID0ge307XHJcbiAgICAgICAgICBvLnJvdyA9IHJvd19uYW1lO1xyXG4gICAgICAgICAgby5jb2xzID0gW107XHJcbiAgICAgICAgICBfLmVhY2goXy51bmlxKGNvbHNfZm91bmQpLCAoY29sX25hbWUpID0+IHtcclxuICAgICAgICAgICAgbGV0IG1hdGNoZWRfdmFsdWUgPSAoXy5maW5kKGRhdGFDb21wdXRlZCwgKGUpID0+IHtcclxuICAgICAgICAgICAgICByZXR1cm4gZS5yb3dfbmFtZSA9PT0gcm93X25hbWUgJiYgZS5jb2xfbmFtZSA9PT0gY29sX25hbWU7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgbGV0IG15Y29sIDogYW55ID0ge307XHJcbiAgICAgICAgICAgIG15Y29sLm5hbWUgPSBjb2xfbmFtZTtcclxuICAgICAgICAgICAgbXljb2wudmFsdWUgPSBtYXRjaGVkX3ZhbHVlID8gbWF0Y2hlZF92YWx1ZS52YWx1ZSB8fCBOYU4gOiBOYU47XHJcbiAgICAgICAgICAgIG15Y29sLmRpc3BsYXlWYWx1ZSA9IG1hdGNoZWRfdmFsdWUgPyBtYXRjaGVkX3ZhbHVlLmRpc3BsYXlWYWx1ZSB8fCBtYXRjaGVkX3ZhbHVlLnZhbHVlIHx8IFwiTi9BXCIgOiB0aGlzLnBhbmVsLm5vX21hdGNoX3RleHQgfHwgXCJOL0FcIjtcclxuICAgICAgICAgICAgbXljb2wuYmdDb2xvciA9IG1hdGNoZWRfdmFsdWUgJiYgbWF0Y2hlZF92YWx1ZS5iZ0NvbG9yID8gbWF0Y2hlZF92YWx1ZS5iZ0NvbG9yIDogXCJ0cmFuc3BhcmVudFwiO1xyXG4gICAgICAgICAgICBteWNvbC50ZXh0Q29sb3IgPSBtYXRjaGVkX3ZhbHVlICYmIG1hdGNoZWRfdmFsdWUudGV4dENvbG9yID8gbWF0Y2hlZF92YWx1ZS50ZXh0Q29sb3IgOiBcIndoaXRlXCI7XHJcbiAgICAgICAgICAgIGxldCB0b29sdGlwVGVtcGxhdGUgPSBtYXRjaGVkX3ZhbHVlICYmIG1hdGNoZWRfdmFsdWUudG9vbHRpcFRlbXBsYXRlID8gbWF0Y2hlZF92YWx1ZS50b29sdGlwVGVtcGxhdGUgOiB0aGlzLmN0cmwucGFuZWwuZGVmYXVsdFBhdHRlcm4udG9vbHRpcFRlbXBsYXRlIHx8IFwiTm8gbWF0Y2hpbmcgc2VyaWVzIGZvdW5kIGZvciBfcm93X25hbWVfICYgX2NvbF9uYW1lX1wiO1xyXG4gICAgICAgICAgICBpZiAobWF0Y2hlZF92YWx1ZSkge1xyXG4gICAgICAgICAgICAgIG15Y29sLnRvb2x0aXAgPSByZW5kZXJlci5nZXRUb29sdGlwTWVzc2FnZShcclxuICAgICAgICAgICAgICAgIHRvb2x0aXBUZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgIHV0aWxzLmdldEFjdHVhbE5hbWVXaXRob3V0VHJhbnNmb3JtU2lnbihtYXRjaGVkX3ZhbHVlLmFjdHVhbF9yb3dfbmFtZSB8fCByb3dfbmFtZSksXHJcbiAgICAgICAgICAgICAgICB1dGlscy5nZXRBY3R1YWxOYW1lV2l0aG91dFRyYW5zZm9ybVNpZ24obWF0Y2hlZF92YWx1ZS5hY3R1YWxfY29sX25hbWUgfHwgY29sX25hbWUpLFxyXG4gICAgICAgICAgICAgICAgbWF0Y2hlZF92YWx1ZS52YWx1ZUZvcm1hdHRlZCB8fCB0aGlzLnBhbmVsLm5vX21hdGNoX3RleHQgfHwgXCJOL0FcIlxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgbXljb2wudG9vbHRpcCA9IHJlbmRlcmVyLmdldFRvb2x0aXBNZXNzYWdlKFxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcFRlbXBsYXRlLFxyXG4gICAgICAgICAgICAgICAgdXRpbHMuZ2V0QWN0dWFsTmFtZVdpdGhvdXRUcmFuc2Zvcm1TaWduKHJvd19uYW1lKSxcclxuICAgICAgICAgICAgICAgIHV0aWxzLmdldEFjdHVhbE5hbWVXaXRob3V0VHJhbnNmb3JtU2lnbihjb2xfbmFtZSksXHJcbiAgICAgICAgICAgICAgICBcIk5hTlwiIHx8IHRoaXMucGFuZWwubm9fbWF0Y2hfdGV4dCB8fCBcIk4vQVwiXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBteWNvbC50b29sdGlwID0gdGhpcy4kc2NlLnRydXN0QXNIdG1sKG15Y29sLnRvb2x0aXApO1xyXG4gICAgICAgICAgICBvLmNvbHMucHVzaChteWNvbCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIG91dHB1dC5wdXNoKG8pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJlbmRlcmVyLmJ1aWxkSFRNTChcclxuICAgICAgICAgIHRoaXMuZWxlbSxcclxuICAgICAgICAgIHRoaXMuZ2V0T3B0aW9uT3ZlcnJpZGUoXCJISURFX0hFQURFUlNcIikgPT09IFwidHJ1ZVwiLFxyXG4gICAgICAgICAgdGhpcy5nZXRPcHRpb25PdmVycmlkZShcIkhJREVfRklSU1RfQ09MVU1OXCIpID09PSBcInRydWVcIixcclxuICAgICAgICAgIHRoaXMuZ2V0T3B0aW9uT3ZlcnJpZGUoXCJURVhUX0FMSUdOX1RBQkxFX0hFQURFUlwiKSxcclxuICAgICAgICAgIGNvbHNfZm91bmQsXHJcbiAgICAgICAgICBvdXRwdXQsXHJcbiAgICAgICAgICB0aGlzLmdldE9wdGlvbk92ZXJyaWRlKFwiVEVYVF9BTElHTl9GSVJTVF9DT0xVTU5cIiksXHJcbiAgICAgICAgICB0aGlzLmdldE9wdGlvbk92ZXJyaWRlKFwiVEVYVF9BTElHTl9UQUJMRV9DRUxMU1wiKSxcclxuICAgICAgICAgIHRoaXMucGFuZWwuZGVmYXVsdF90aXRsZV9mb3Jfcm93c1xyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGR1cGxpY2F0ZUtleXMgPSBfLnVuaXEoa2V5c19mb3VuZC5maWx0ZXIodiA9PiB7XHJcbiAgICAgICAgICByZXR1cm4ga2V5c19mb3VuZC5maWx0ZXIodCA9PiB0ID09PSB2KS5sZW5ndGggPiAxO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICB0aGlzLnBhbmVsLmVycm9yID0gdXRpbHMuYnVpbGRFcnJvcihgRHVwbGljYXRlIGtleXMgZm91bmRgLCBgRHVwbGljYXRlIGtleSB2YWx1ZXMgOiA8YnIvPiAke2R1cGxpY2F0ZUtleXMuam9pbihcIjxici8+IFwiKX1gKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5wYW5lbC5kZWJ1Z19tb2RlID09PSB0cnVlKSB7XHJcbiAgICAgICAgcmVuZGVyZXIuYnVpbGREZWJ1Z0hUTUwodGhpcy5lbGVtLCBkYXRhQ29tcHV0ZWQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLmFkanVzdFBhbmVsSGVpZ2h0KHRoaXMuY3RybC5oZWlnaHQpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgR3JhZmFuYUJvb21UYWJsZUN0cmwgYXMgUGFuZWxDdHJsXHJcbn07XHJcbiJdfQ==