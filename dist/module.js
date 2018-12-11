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
                    if ($sce) {
                        $sce = $sce;
                    }
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
                                    if (matched_value) {
                                        mycol.tooltip = renderer.getTooltipMessage(utils.getActualNameWithoutTransformSign(matched_value.actual_row_name || row_name), utils.getActualNameWithoutTransformSign(matched_value.actual_col_name || col_name), matched_value.valueFormatted || _this.panel.no_match_text || "N/A");
                                    }
                                    else {
                                        mycol.tooltip = renderer.getTooltipMessage(utils.getActualNameWithoutTransformSign(row_name), utils.getActualNameWithoutTransformSign(col_name), "NaN" || _this.panel.no_match_text || "N/A");
                                    }
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
                        renderer.buildDebugHTML(this.elem, dataComputed_1);
                    }
                    this.adjustPanelHeight(this.ctrl.height);
                }
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFXQSxtQkFBYSxDQUFDO2dCQUNaLElBQUksRUFBRSxhQUFXLGVBQVMsMEJBQXVCO2dCQUNqRCxLQUFLLEVBQUUsYUFBVyxlQUFTLDJCQUF3QjthQUNwRCxDQUFDLENBQUM7O2dCQUVnQyx3Q0FBZ0I7Z0JBUWpELDhCQUFZLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSTtvQkFBbkMsWUFDRSxrQkFBTSxNQUFNLEVBQUUsU0FBUyxDQUFDLFNBUXpCO29CQVpELHNCQUFnQixHQUFzQixZQUFNLENBQUMsZ0JBQWdCLENBQUM7b0JBQzlELGlCQUFXLEdBQVEsYUFBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN4QyxxQkFBZSxHQUFRLFlBQU0sQ0FBQyxlQUFlLENBQUM7b0JBRzVDLGdCQUFDLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsWUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUM3QyxLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztvQkFDaEUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztvQkFDakUsSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixLQUFLLENBQUMsQ0FBQyxFQUFFO3dCQUN4QyxLQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztxQkFDNUQ7b0JBQ0QsSUFBSSxJQUFJLEVBQUU7d0JB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N0g7d0JBQ0QsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGNBQVksQ0FBQyxDQUFDO3FCQUNsRDtvQkFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDMUM7WUFDSCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi9ub2RlX21vZHVsZXMvZ3JhZmFuYS1zZGstbW9ja3MvYXBwL2hlYWRlcnMvY29tbW9uLmQudHNcIiAvPlxyXG5cclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQga2JuIGZyb20gXCJhcHAvY29yZS91dGlscy9rYm5cIjtcclxuaW1wb3J0IHsgbG9hZFBsdWdpbkNzcywgTWV0cmljc1BhbmVsQ3RybCB9IGZyb20gXCJhcHAvcGx1Z2lucy9zZGtcIjtcclxuaW1wb3J0IHsgUGF0dGVybiwgVGltZUJhc2VUaHJlc2hvbGQsIFZhbHVlTmFtZU9wdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZXMvaW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgeyBwbHVnaW5faWQsIGNvbmZpZyB9IGZyb20gXCIuL2FwcC9hcHBcIjtcclxuaW1wb3J0IHsgY29tcHV0ZSwgZGVmYXVsdEhhbmRsZXIgfSBmcm9tIFwiLi9hcHAvc2VyaWVzSGFuZGxlclwiO1xyXG5pbXBvcnQgKiBhcyByZW5kZXJlciBmcm9tIFwiLi9hcHAvcmVuZGVyZXJcIjtcclxuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcIi4vYXBwL3V0aWxzXCI7XHJcblxyXG5sb2FkUGx1Z2luQ3NzKHtcclxuICBkYXJrOiBgcGx1Z2lucy8ke3BsdWdpbl9pZH0vY3NzL2RlZmF1bHQuZGFyay5jc3NgLFxyXG4gIGxpZ2h0OiBgcGx1Z2lucy8ke3BsdWdpbl9pZH0vY3NzL2RlZmF1bHQubGlnaHQuY3NzYFxyXG59KTtcclxuXHJcbmNsYXNzIEdyYWZhbmFCb29tVGFibGVDdHJsIGV4dGVuZHMgTWV0cmljc1BhbmVsQ3RybCB7XHJcbiAgc3RhdGljIHRlbXBsYXRlVXJsOiBzdHJpbmcgPSBcInBhcnRpYWxzL21vZHVsZS5odG1sXCI7XHJcbiAgY3RybDogYW55O1xyXG4gIGVsZW06IGFueTtcclxuICBkYXRhUmVjZWl2ZWQ6IGFueTtcclxuICB2YWx1ZU5hbWVPcHRpb25zOiBWYWx1ZU5hbWVPcHRpb25bXSA9IGNvbmZpZy52YWx1ZU5hbWVPcHRpb25zO1xyXG4gIHVuaXRGb3JtYXRzOiBhbnkgPSBrYm4uZ2V0VW5pdEZvcm1hdHMoKTtcclxuICBvcHRpb25PdmVycmlkZXM6IGFueSA9IGNvbmZpZy5vcHRpb25PdmVycmlkZXM7XHJcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkaW5qZWN0b3IsICRzY2UpIHtcclxuICAgIHN1cGVyKCRzY29wZSwgJGluamVjdG9yKTtcclxuICAgIF8uZGVmYXVsdHModGhpcy5wYW5lbCwgY29uZmlnLnBhbmVsRGVmYXVsdHMpO1xyXG4gICAgdGhpcy5ldmVudHMub24oXCJkYXRhLXJlY2VpdmVkXCIsIHRoaXMub25EYXRhUmVjZWl2ZWQuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLmV2ZW50cy5vbihcImluaXQtZWRpdC1tb2RlXCIsIHRoaXMub25Jbml0RWRpdE1vZGUuYmluZCh0aGlzKSk7XHJcbiAgICBpZiAodGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPT09IC0xKSB7XHJcbiAgICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID0gdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICBpZiAoJHNjZSkgeyAkc2NlID0gJHNjZTsgfVxyXG4gIH1cclxuICBvbkluaXRFZGl0TW9kZSgpIHtcclxuICAgIHRoaXMuYWRkRWRpdG9yVGFiKFwiUGF0dGVybnNcIiwgYHB1YmxpYy9wbHVnaW5zLyR7cGx1Z2luX2lkfS9wYXJ0aWFscy9wYXR0ZXJucy5odG1sYCwgMik7XHJcbiAgICB0aGlzLmFkZEVkaXRvclRhYihcIk9wdGlvbnNcIiwgYHB1YmxpYy9wbHVnaW5zLyR7cGx1Z2luX2lkfS9wYXJ0aWFscy9vcHRpb25zLmh0bWxgLCAzKTtcclxuICB9XHJcbiAgb25EYXRhUmVjZWl2ZWQoZGF0YTogYW55KSB7XHJcbiAgICB0aGlzLmRhdGFSZWNlaXZlZCA9IGRhdGE7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBhZGRQYXR0ZXJuKCkge1xyXG4gICAgbGV0IG5ld1BhdHRlcm46IFBhdHRlcm4gPSB7XHJcbiAgICAgIG5hbWU6IFwiTmV3IFBhdHRlcm5cIixcclxuICAgICAgcGF0dGVybjogXCJec2VydmVyLipjcHUkXCIsXHJcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgZGVsaW1pdGVyOiBcIi5cIixcclxuICAgICAgdmFsdWVOYW1lOiBcImF2Z1wiLFxyXG4gICAgICByb3dfbmFtZTogdGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIgKyBcIjBcIiArIHRoaXMucGFuZWwucm93X2NvbF93cmFwcGVyLFxyXG4gICAgICBjb2xfbmFtZTogdGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIgKyBcIjFcIiArIHRoaXMucGFuZWwucm93X2NvbF93cmFwcGVyLFxyXG4gICAgICB0aHJlc2hvbGRzOiBcIjcwLDkwXCIsXHJcbiAgICAgIHRpbWVfYmFzZWRfdGhyZXNob2xkczogW10sXHJcbiAgICAgIGVuYWJsZV90aW1lX2Jhc2VkX3RocmVzaG9sZHM6IGZhbHNlLFxyXG4gICAgICBlbmFibGVfYmdDb2xvcjogZmFsc2UsXHJcbiAgICAgIGJnQ29sb3JzOiBcImdyZWVufG9yYW5nZXxyZWRcIixcclxuICAgICAgZW5hYmxlX2JnQ29sb3Jfb3ZlcnJpZGVzOiBmYWxzZSxcclxuICAgICAgYmdDb2xvcnNfb3ZlcnJpZGVzOiBcIjAtPmdyZWVufDItPnJlZHwxLT55ZWxsb3dcIixcclxuICAgICAgZW5hYmxlX1RleHRDb2xvcnM6IGZhbHNlLFxyXG4gICAgICB0ZXh0Q29sb3JzOiBcImdyZWVufG9yYW5nZXxyZWRcIixcclxuICAgICAgZW5hYmxlX1RleHRDb2xvcl9vdmVycmlkZXM6IGZhbHNlLFxyXG4gICAgICB0ZXh0Q29sb3JzX292ZXJyaWRlczogXCIwLT5ncmVlbnwyLT5yZWR8MS0+eWVsbG93XCIsXHJcbiAgICAgIGVuYWJsZV90cmFuc2Zvcm06IGZhbHNlLFxyXG4gICAgICB0cmFuc2Zvcm1fdmFsdWVzOiBcIl92YWx1ZV98X3ZhbHVlX3xfdmFsdWVfXCIsXHJcbiAgICAgIGVuYWJsZV90cmFuc2Zvcm1fb3ZlcnJpZGVzOiBmYWxzZSxcclxuICAgICAgdHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXM6IFwiMC0+ZG93bnwxLT51cFwiLFxyXG4gICAgICBkZWNpbWFsczogMixcclxuICAgICAgZm9ybWF0OiBcIm5vbmVcIixcclxuICAgICAgbnVsbF9jb2xvcjogXCJkYXJrcmVkXCIsXHJcbiAgICAgIG51bGxfdGV4dF9jb2xvcjogXCJ3aGl0ZVwiLFxyXG4gICAgICBudWxsX3ZhbHVlOiBcIk5vIGRhdGFcIixcclxuICAgICAgZW5hYmxlX2NsaWNrYWJsZV9jZWxsczogZmFsc2UsXHJcbiAgICAgIGNsaWNrYWJsZV9jZWxsc19saW5rOiBcIlwiLFxyXG4gICAgICBmaWx0ZXI6IHtcclxuICAgICAgICB2YWx1ZV9iZWxvdzogXCJcIixcclxuICAgICAgICB2YWx1ZV9hYm92ZTogXCJcIixcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMucHVzaChuZXdQYXR0ZXJuKTtcclxuICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID0gdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggLSAxO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgbW92ZVBhdHRlcm4oZGlyZWN0aW9uOiBTdHJpbmcsIGluZGV4OiBudW1iZXIpIHtcclxuICAgIGxldCB0ZW1wRWxlbWVudDogUGF0dGVybiA9IHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdO1xyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJVUFwiKSB7XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleCAtIDFdO1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4IC0gMV0gPSB0ZW1wRWxlbWVudDtcclxuICAgICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSBpbmRleCAtIDE7XHJcbiAgICB9XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcIkRPV05cIikge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XSA9IHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXggKyAxXTtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleCArIDFdID0gdGVtcEVsZW1lbnQ7XHJcbiAgICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID0gaW5kZXggKyAxO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgcmVtb3ZlUGF0dGVybihpbmRleDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnBhbmVsLnBhdHRlcm5zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9ICh0aGlzLnBhbmVsLnBhdHRlcm5zICYmIHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoID4gMCkgPyAodGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggLSAxKSA6IC0xO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgY2xvbmVQYXR0ZXJuKGluZGV4OiBudW1iZXIpIHtcclxuICAgIGxldCBjb3BpZWRQYXR0ZXJuOiBQYXR0ZXJuID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0pO1xyXG4gICAgdGhpcy5wYW5lbC5wYXR0ZXJucy5wdXNoKGNvcGllZFBhdHRlcm4pO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgYWRkX3RpbWVfYmFzZWRfdGhyZXNob2xkcyhpbmRleDogbnVtYmVyKSB7XHJcbiAgICBsZXQgbmV3X3RpbWVfYmFzZWRfdGhyZXNob2xkOiBUaW1lQmFzZVRocmVzaG9sZCA9IHtcclxuICAgICAgbmFtZTogXCJFYXJseSBtb3JuaW5nIG9mIGV2ZXJ5ZGF5XCIsXHJcbiAgICAgIGZyb206IFwiMDAwMFwiLFxyXG4gICAgICB0bzogXCIwNTMwXCIsXHJcbiAgICAgIGVuYWJsZWREYXlzOiBcIlN1bixNb24sVHVlLFdlZCxUaHUsRnJpLFNhdFwiLFxyXG4gICAgICB0aHJlc2hvbGQ6IFwiNzAsOTBcIlxyXG4gICAgfTtcclxuICAgIGlmIChpbmRleCA9PT0gdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggfHwgaW5kZXggPT09IC0xKSB7XHJcbiAgICAgIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4udGltZV9iYXNlZF90aHJlc2hvbGRzID0gdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybi50aW1lX2Jhc2VkX3RocmVzaG9sZHMgfHwgW107XHJcbiAgICAgIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4udGltZV9iYXNlZF90aHJlc2hvbGRzLnB1c2gobmV3X3RpbWVfYmFzZWRfdGhyZXNob2xkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdLnRpbWVfYmFzZWRfdGhyZXNob2xkcyA9IHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdLnRpbWVfYmFzZWRfdGhyZXNob2xkcyB8fCBbXTtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0udGltZV9iYXNlZF90aHJlc2hvbGRzLnB1c2gobmV3X3RpbWVfYmFzZWRfdGhyZXNob2xkKTtcclxuICAgIH1cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHJlbW92ZV90aW1lX2Jhc2VkX3RocmVzaG9sZHMocGF0dGVybkluZGV4OiBudW1iZXIsIGluZGV4OiBudW1iZXIpIHtcclxuICAgIGlmIChwYXR0ZXJuSW5kZXggPT09IHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoIHx8IHBhdHRlcm5JbmRleCA9PT0gLTEpIHtcclxuICAgICAgdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybi50aW1lX2Jhc2VkX3RocmVzaG9sZHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbcGF0dGVybkluZGV4XS50aW1lX2Jhc2VkX3RocmVzaG9sZHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIGludmVyc2VCR0NvbG9ycyhpbmRleDogbnVtYmVyKSB7XHJcbiAgICBpZiAoaW5kZXggPT09IHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoIHx8IGluZGV4ID09PSAtMSkge1xyXG4gICAgICB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLmJnQ29sb3JzID0gdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybi5iZ0NvbG9ycy5zcGxpdChcInxcIikucmV2ZXJzZSgpLmpvaW4oXCJ8XCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0uYmdDb2xvcnMgPSB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS5iZ0NvbG9ycy5zcGxpdChcInxcIikucmV2ZXJzZSgpLmpvaW4oXCJ8XCIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgaW52ZXJzZVRleHRDb2xvcnMoaW5kZXg6IG51bWJlcikge1xyXG4gICAgaWYgKGluZGV4ID09PSB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCB8fCBpbmRleCA9PT0gLTEpIHtcclxuICAgICAgdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybi50ZXh0Q29sb3JzID0gdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybi50ZXh0Q29sb3JzLnNwbGl0KFwifFwiKS5yZXZlcnNlKCkuam9pbihcInxcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS50ZXh0Q29sb3JzID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0udGV4dENvbG9ycy5zcGxpdChcInxcIikucmV2ZXJzZSgpLmpvaW4oXCJ8XCIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgaW52ZXJzZVRyYW5zZm9ybVZhbHVlcyhpbmRleDogbnVtYmVyKSB7XHJcbiAgICBpZiAoaW5kZXggPT09IHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoIHx8IGluZGV4ID09PSAtMSkge1xyXG4gICAgICB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLnRyYW5zZm9ybV92YWx1ZXMgPSB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLnRyYW5zZm9ybV92YWx1ZXMuc3BsaXQoXCJ8XCIpLnJldmVyc2UoKS5qb2luKFwifFwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdLnRyYW5zZm9ybV92YWx1ZXMgPSB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS50cmFuc2Zvcm1fdmFsdWVzLnNwbGl0KFwifFwiKS5yZXZlcnNlKCkuam9pbihcInxcIik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgc2V0VW5pdEZvcm1hdChzdWJJdGVtLCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICBpZiAoaW5kZXggPT09IHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoIHx8IGluZGV4ID09PSB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLmZvcm1hdCA9IHN1Ykl0ZW0udmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS5mb3JtYXQgPSBzdWJJdGVtLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgbGltaXRUZXh0KHRleHQ6IFN0cmluZywgbWF4bGVuZ3RoOiBudW1iZXIpIHtcclxuICAgIGlmICh0ZXh0LnNwbGl0KFwiXCIpLmxlbmd0aCA+IG1heGxlbmd0aCkge1xyXG4gICAgICB0ZXh0ID0gdGV4dC5zdWJzdHJpbmcoMCwgbWF4bGVuZ3RoIC0gMykgKyBcIi4uLlwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRleHQ7XHJcbiAgfVxyXG4gIGxpbmsoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsKSB7XHJcbiAgICBpZiAoc2NvcGUpIHsgc2NvcGUgPSBzY29wZTsgfVxyXG4gICAgaWYgKGF0dHJzKSB7IGF0dHJzID0gYXR0cnM7IH1cclxuICAgIHRoaXMuY3RybCA9IGN0cmw7XHJcbiAgICB0aGlzLmVsZW0gPSBlbGVtO1xyXG4gIH1cclxuICBnZXRPcHRpb25PdmVycmlkZShwcm9wZXJ0eU5hbWU6IFN0cmluZykge1xyXG4gICAgbGV0IG9wdGlvbiA9IF8uZmluZCh0aGlzLnBhbmVsLmN1cnJlbnRPcHRpb25PdmVycmlkZXMsIG8gPT4gby5wcm9wZXJ0eU5hbWUgPT09IHByb3BlcnR5TmFtZSk7XHJcbiAgICBsZXQgZGVmYXVsdF9vcHRpb24gPSBfLmZpbmQoY29uZmlnLm9wdGlvbk92ZXJyaWRlcywgbyA9PiBvLnByb3BlcnR5TmFtZSA9PT0gcHJvcGVydHlOYW1lKTtcclxuICAgIGlmIChvcHRpb24pIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbi52YWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBkZWZhdWx0X29wdGlvbi5kZWZhdWx0VmFsdWU7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHNldE9wdGlvbk92ZXJyaWRlKHByb3BlcnR5TmFtZTogU3RyaW5nLCB2YWx1ZTogU3RyaW5nLCB0ZXh0OiBTdHJpbmcpIHtcclxuICAgIGxldCBuZXdPdmVycmlkZXMgPSBbXTtcclxuICAgIGlmIChfLmZpbHRlcih0aGlzLnBhbmVsLmN1cnJlbnRPcHRpb25PdmVycmlkZXMsIG8gPT4gby5wcm9wZXJ0eU5hbWUgPT09IHByb3BlcnR5TmFtZSkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIG5ld092ZXJyaWRlcy5wdXNoKHtcclxuICAgICAgICBwcm9wZXJ0eU5hbWUsXHJcbiAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgdGV4dFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnBhbmVsLmN1cnJlbnRPcHRpb25PdmVycmlkZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICBfLmVhY2godGhpcy5wYW5lbC5jdXJyZW50T3B0aW9uT3ZlcnJpZGVzLCBvID0+IHtcclxuICAgICAgICBpZiAoby5wcm9wZXJ0eU5hbWUgPT09IHByb3BlcnR5TmFtZSkge1xyXG4gICAgICAgICAgbmV3T3ZlcnJpZGVzLnB1c2goe1xyXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWUsXHJcbiAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICB0ZXh0XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmV3T3ZlcnJpZGVzLnB1c2gobyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoaXMucGFuZWwuY3VycmVudE9wdGlvbk92ZXJyaWRlcyA9IG5ld092ZXJyaWRlcztcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHJlbW92ZU9wdGlvbk92ZXJyaWRlKG9wdGlvbjogU3RyaW5nKSB7XHJcbiAgICBsZXQgbmV3T3ZlcnJpZGVzID0gW107XHJcbiAgICBpZiAodGhpcy5wYW5lbC5jdXJyZW50T3B0aW9uT3ZlcnJpZGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgXy5lYWNoKHRoaXMucGFuZWwuY3VycmVudE9wdGlvbk92ZXJyaWRlcywgbyA9PiB7XHJcbiAgICAgICAgaWYgKG8ucHJvcGVydHlOYW1lICE9PSBvcHRpb24pIHtcclxuICAgICAgICAgIG5ld092ZXJyaWRlcy5wdXNoKG8pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnBhbmVsLmN1cnJlbnRPcHRpb25PdmVycmlkZXMgPSBuZXdPdmVycmlkZXM7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBhZGp1c3RQYW5lbEhlaWdodChwYW5lbEhlaWdodDogbnVtYmVyKSB7XHJcbiAgICBsZXQgcm9vdEVsZW0gPSB0aGlzLmVsZW0uZmluZChcIi50YWJsZS1wYW5lbC1zY3JvbGxcIik7XHJcbiAgICBsZXQgbWF4aGVpZ2h0b2ZwYW5lbCA9IHRoaXMucGFuZWwuZGVidWdfbW9kZSA/IHBhbmVsSGVpZ2h0IC0gNzEgOiBwYW5lbEhlaWdodCAtIDMxO1xyXG4gICAgcm9vdEVsZW0uY3NzKHsgXCJtYXgtaGVpZ2h0XCI6IG1heGhlaWdodG9mcGFuZWwgKyBcInB4XCIgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5HcmFmYW5hQm9vbVRhYmxlQ3RybC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gIGlmICh0aGlzLmRhdGFSZWNlaXZlZCkge1xyXG4gICAgdGhpcy5wYW5lbC5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzID0gdGhpcy5wYW5lbC5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzO1xyXG4gICAgbGV0IG1ldHJpY3NSZWNlaXZlZCA9IHV0aWxzLmdldEZpZWxkcyh0aGlzLmRhdGFSZWNlaXZlZCwgXCJ0YXJnZXRcIik7XHJcbiAgICBpZiAobWV0cmljc1JlY2VpdmVkLmxlbmd0aCAhPT0gXy51bmlxKG1ldHJpY3NSZWNlaXZlZCkubGVuZ3RoKSB7XHJcbiAgICAgIGxldCBkdXBsaWNhdGVLZXlzID0gXy51bmlxKG1ldHJpY3NSZWNlaXZlZC5maWx0ZXIodiA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG1ldHJpY3NSZWNlaXZlZC5maWx0ZXIodCA9PiB0ID09PSB2KS5sZW5ndGggPiAxO1xyXG4gICAgICB9KSk7XHJcbiAgICAgIHRoaXMucGFuZWwuZXJyb3IgPSB1dGlscy5idWlsZEVycm9yKGBEdXBsaWNhdGUga2V5cyBmb3VuZGAsIGBEdXBsaWNhdGUga2V5IHZhbHVlcyA6IDxici8+ICR7ZHVwbGljYXRlS2V5cy5qb2luKFwiPGJyLz4gXCIpfWApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5lbC5lcnJvciA9IHVuZGVmaW5lZDtcclxuICAgICAgbGV0IGRhdGFDb21wdXRlZCA9IGNvbXB1dGUodGhpcy5kYXRhUmVjZWl2ZWQubWFwKGRlZmF1bHRIYW5kbGVyLmJpbmQodGhpcykpLCB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuIHx8IGNvbmZpZy5wYW5lbERlZmF1bHRzLmRlZmF1bHRQYXR0ZXJuLCB0aGlzLnBhbmVsLnBhdHRlcm5zLCB0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlcik7XHJcbiAgICAgIGxldCByb3dzX2ZvdW5kID0gdXRpbHMuZ2V0RmllbGRzKGRhdGFDb21wdXRlZCwgXCJyb3dfbmFtZVwiKTtcclxuICAgICAgbGV0IGNvbHNfZm91bmQgPSB1dGlscy5nZXRGaWVsZHMoZGF0YUNvbXB1dGVkLCBcImNvbF9uYW1lXCIpO1xyXG4gICAgICBsZXQga2V5c19mb3VuZCA9IHV0aWxzLmdldEZpZWxkcyhkYXRhQ29tcHV0ZWQsIFwia2V5X25hbWVcIik7XHJcbiAgICAgIGxldCBpc191bmlxdWVfa2V5cyA9IChrZXlzX2ZvdW5kLmxlbmd0aCA9PT0gXy51bmlxKGtleXNfZm91bmQpLmxlbmd0aCk7XHJcbiAgICAgIGlmIChpc191bmlxdWVfa2V5cykge1xyXG4gICAgICAgIHRoaXMucGFuZWwuZXJyb3IgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgbGV0IG91dHB1dCA9IFtdO1xyXG4gICAgICAgIF8uZWFjaChfLnVuaXEocm93c19mb3VuZCksIChyb3dfbmFtZSkgPT4ge1xyXG4gICAgICAgICAgbGV0IG86IGFueSA9IHt9O1xyXG4gICAgICAgICAgby5yb3cgPSByb3dfbmFtZTtcclxuICAgICAgICAgIG8uY29scyA9IFtdO1xyXG4gICAgICAgICAgXy5lYWNoKF8udW5pcShjb2xzX2ZvdW5kKSwgKGNvbF9uYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaGVkX3ZhbHVlID0gKF8uZmluZChkYXRhQ29tcHV0ZWQsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGUucm93X25hbWUgPT09IHJvd19uYW1lICYmIGUuY29sX25hbWUgPT09IGNvbF9uYW1lO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIGxldCBteWNvbCA6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICBteWNvbC5uYW1lID0gY29sX25hbWU7XHJcbiAgICAgICAgICAgIG15Y29sLnZhbHVlID0gbWF0Y2hlZF92YWx1ZSA/IG1hdGNoZWRfdmFsdWUudmFsdWUgfHwgTmFOIDogTmFOO1xyXG4gICAgICAgICAgICBteWNvbC5kaXNwbGF5VmFsdWUgPSBtYXRjaGVkX3ZhbHVlID8gbWF0Y2hlZF92YWx1ZS5kaXNwbGF5VmFsdWUgfHwgbWF0Y2hlZF92YWx1ZS52YWx1ZSB8fCBcIk4vQVwiIDogdGhpcy5wYW5lbC5ub19tYXRjaF90ZXh0IHx8IFwiTi9BXCI7XHJcbiAgICAgICAgICAgIG15Y29sLmJnQ29sb3IgPSBtYXRjaGVkX3ZhbHVlICYmIG1hdGNoZWRfdmFsdWUuYmdDb2xvciA/IG1hdGNoZWRfdmFsdWUuYmdDb2xvciA6IFwidHJhbnNwYXJlbnRcIjtcclxuICAgICAgICAgICAgbXljb2wudGV4dENvbG9yID0gbWF0Y2hlZF92YWx1ZSAmJiBtYXRjaGVkX3ZhbHVlLnRleHRDb2xvciA/IG1hdGNoZWRfdmFsdWUudGV4dENvbG9yIDogXCJ3aGl0ZVwiO1xyXG4gICAgICAgICAgICBpZiAobWF0Y2hlZF92YWx1ZSkge1xyXG4gICAgICAgICAgICAgIG15Y29sLnRvb2x0aXAgPSByZW5kZXJlci5nZXRUb29sdGlwTWVzc2FnZSh1dGlscy5nZXRBY3R1YWxOYW1lV2l0aG91dFRyYW5zZm9ybVNpZ24obWF0Y2hlZF92YWx1ZS5hY3R1YWxfcm93X25hbWUgfHwgcm93X25hbWUpLCB1dGlscy5nZXRBY3R1YWxOYW1lV2l0aG91dFRyYW5zZm9ybVNpZ24obWF0Y2hlZF92YWx1ZS5hY3R1YWxfY29sX25hbWUgfHwgY29sX25hbWUpLCBtYXRjaGVkX3ZhbHVlLnZhbHVlRm9ybWF0dGVkIHx8IHRoaXMucGFuZWwubm9fbWF0Y2hfdGV4dCB8fCBcIk4vQVwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBteWNvbC50b29sdGlwID0gcmVuZGVyZXIuZ2V0VG9vbHRpcE1lc3NhZ2UodXRpbHMuZ2V0QWN0dWFsTmFtZVdpdGhvdXRUcmFuc2Zvcm1TaWduKHJvd19uYW1lKSwgdXRpbHMuZ2V0QWN0dWFsTmFtZVdpdGhvdXRUcmFuc2Zvcm1TaWduKGNvbF9uYW1lKSwgXCJOYU5cIiB8fCB0aGlzLnBhbmVsLm5vX21hdGNoX3RleHQgfHwgXCJOL0FcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgby5jb2xzLnB1c2gobXljb2wpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBvdXRwdXQucHVzaChvKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZW5kZXJlci5idWlsZEhUTUwoXHJcbiAgICAgICAgICB0aGlzLmVsZW0sXHJcbiAgICAgICAgICB0aGlzLmdldE9wdGlvbk92ZXJyaWRlKFwiSElERV9IRUFERVJTXCIpID09PSBcInRydWVcIixcclxuICAgICAgICAgIHRoaXMuZ2V0T3B0aW9uT3ZlcnJpZGUoXCJISURFX0ZJUlNUX0NPTFVNTlwiKSA9PT0gXCJ0cnVlXCIsXHJcbiAgICAgICAgICB0aGlzLmdldE9wdGlvbk92ZXJyaWRlKFwiVEVYVF9BTElHTl9UQUJMRV9IRUFERVJcIiksXHJcbiAgICAgICAgICBjb2xzX2ZvdW5kLFxyXG4gICAgICAgICAgb3V0cHV0LFxyXG4gICAgICAgICAgdGhpcy5nZXRPcHRpb25PdmVycmlkZShcIlRFWFRfQUxJR05fRklSU1RfQ09MVU1OXCIpLFxyXG4gICAgICAgICAgdGhpcy5nZXRPcHRpb25PdmVycmlkZShcIlRFWFRfQUxJR05fVEFCTEVfQ0VMTFNcIiksXHJcbiAgICAgICAgICB0aGlzLnBhbmVsLmRlZmF1bHRfdGl0bGVfZm9yX3Jvd3NcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBkdXBsaWNhdGVLZXlzID0gXy51bmlxKGtleXNfZm91bmQuZmlsdGVyKHYgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGtleXNfZm91bmQuZmlsdGVyKHQgPT4gdCA9PT0gdikubGVuZ3RoID4gMTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgdGhpcy5wYW5lbC5lcnJvciA9IHV0aWxzLmJ1aWxkRXJyb3IoYER1cGxpY2F0ZSBrZXlzIGZvdW5kYCwgYER1cGxpY2F0ZSBrZXkgdmFsdWVzIDogPGJyLz4gJHtkdXBsaWNhdGVLZXlzLmpvaW4oXCI8YnIvPiBcIil9YCk7XHJcbiAgICAgIH1cclxuICAgICAgcmVuZGVyZXIuYnVpbGREZWJ1Z0hUTUwodGhpcy5lbGVtLCBkYXRhQ29tcHV0ZWQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hZGp1c3RQYW5lbEhlaWdodCh0aGlzLmN0cmwuaGVpZ2h0KTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQge1xyXG4gIEdyYWZhbmFCb29tVGFibGVDdHJsIGFzIFBhbmVsQ3RybFxyXG59O1xyXG4iXX0=