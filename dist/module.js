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
                                    if (!matched_value) {
                                        matched_value = {
                                            value: NaN,
                                            displayValue: _this.panel.no_match_text || "N/A",
                                            tooltip: "No Values found"
                                        };
                                    }
                                    o.cols.push({
                                        "name": col_name,
                                        "value": matched_value.value,
                                        "displayValue": matched_value.displayValue || matched_value.value,
                                        "tooltip": renderer.getTooltipMessage(utils.getActualNameWithoutTransformSign(matched_value.actual_row_name), utils.getActualNameWithoutTransformSign(matched_value.actual_col_name), matched_value.valueFormatted),
                                        "bgColor": matched_value.bgColor || "transparent",
                                        "textColor": matched_value.textColor || "white"
                                    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFXQSxtQkFBYSxDQUFDO2dCQUNaLElBQUksRUFBRSxhQUFXLGVBQVMsMEJBQXVCO2dCQUNqRCxLQUFLLEVBQUUsYUFBVyxlQUFTLDJCQUF3QjthQUNwRCxDQUFDLENBQUM7O2dCQUVnQyx3Q0FBZ0I7Z0JBUWpELDhCQUFZLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSTtvQkFBbkMsWUFDRSxrQkFBTSxNQUFNLEVBQUUsU0FBUyxDQUFDLFNBUXpCO29CQVpELHNCQUFnQixHQUFzQixZQUFNLENBQUMsZ0JBQWdCLENBQUM7b0JBQzlELGlCQUFXLEdBQVEsYUFBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN4QyxxQkFBZSxHQUFRLFlBQU0sQ0FBQyxlQUFlLENBQUM7b0JBRzVDLGdCQUFDLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsWUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUM3QyxLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztvQkFDaEUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztvQkFDakUsSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixLQUFLLENBQUMsQ0FBQyxFQUFFO3dCQUN4QyxLQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztxQkFDNUQ7b0JBQ0QsSUFBSSxJQUFJLEVBQUU7d0JBQUUsSUFBSSxHQUFHLElBQUksQ0FBQztxQkFBRTs7Z0JBQzVCLENBQUM7Z0JBQ0QsNkNBQWMsR0FBZDtvQkFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxvQkFBa0IsZUFBUyw0QkFBeUIsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDdkYsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsb0JBQWtCLGVBQVMsMkJBQXdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZGLENBQUM7Z0JBQ0QsNkNBQWMsR0FBZCxVQUFlLElBQVM7b0JBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO29CQUN6QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hCLENBQUM7Z0JBQ0QseUNBQVUsR0FBVjtvQkFDRSxJQUFJLFVBQVUsR0FBWTt3QkFDeEIsSUFBSSxFQUFFLGFBQWE7d0JBQ25CLE9BQU8sRUFBRSxlQUFlO3dCQUN4QixRQUFRLEVBQUUsS0FBSzt3QkFDZixTQUFTLEVBQUUsR0FBRzt3QkFDZCxTQUFTLEVBQUUsS0FBSzt3QkFDaEIsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWU7d0JBQ3ZFLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlO3dCQUN2RSxVQUFVLEVBQUUsT0FBTzt3QkFDbkIscUJBQXFCLEVBQUUsRUFBRTt3QkFDekIsNEJBQTRCLEVBQUUsS0FBSzt3QkFDbkMsY0FBYyxFQUFFLEtBQUs7d0JBQ3JCLFFBQVEsRUFBRSxrQkFBa0I7d0JBQzVCLHdCQUF3QixFQUFFLEtBQUs7d0JBQy9CLGtCQUFrQixFQUFFLDJCQUEyQjt3QkFDL0MsaUJBQWlCLEVBQUUsS0FBSzt3QkFDeEIsVUFBVSxFQUFFLGtCQUFrQjt3QkFDOUIsMEJBQTBCLEVBQUUsS0FBSzt3QkFDakMsb0JBQW9CLEVBQUUsMkJBQTJCO3dCQUNqRCxnQkFBZ0IsRUFBRSxLQUFLO3dCQUN2QixnQkFBZ0IsRUFBRSx5QkFBeUI7d0JBQzNDLDBCQUEwQixFQUFFLEtBQUs7d0JBQ2pDLDBCQUEwQixFQUFFLGVBQWU7d0JBQzNDLFFBQVEsRUFBRSxDQUFDO3dCQUNYLE1BQU0sRUFBRSxNQUFNO3dCQUNkLFVBQVUsRUFBRSxTQUFTO3dCQUNyQixlQUFlLEVBQUUsT0FBTzt3QkFDeEIsVUFBVSxFQUFFLFNBQVM7d0JBQ3JCLHNCQUFzQixFQUFFLEtBQUs7d0JBQzdCLG9CQUFvQixFQUFFLEVBQUU7d0JBQ3hCLE1BQU0sRUFBRTs0QkFDTixXQUFXLEVBQUUsRUFBRTs0QkFDZixXQUFXLEVBQUUsRUFBRTt5QkFDaEI7cUJBQ0YsQ0FBQztvQkFDRixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDL0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNoQixDQUFDO2dCQUNELDBDQUFXLEdBQVgsVUFBWSxTQUFpQixFQUFFLEtBQWE7b0JBQzFDLElBQUksV0FBVyxHQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN0RCxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7d0JBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDNUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQzt3QkFDN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO3FCQUMzQztvQkFDRCxJQUFJLFNBQVMsS0FBSyxNQUFNLEVBQUU7d0JBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDNUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQzt3QkFDN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO3FCQUMzQztvQkFDRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hCLENBQUM7Z0JBQ0QsNENBQWEsR0FBYixVQUFjLEtBQWE7b0JBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDaEksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNoQixDQUFDO2dCQUNELDJDQUFZLEdBQVosVUFBYSxLQUFhO29CQUN4QixJQUFJLGFBQWEsR0FBWSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUMzRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQztnQkFDRCx3REFBeUIsR0FBekIsVUFBMEIsS0FBYTtvQkFDckMsSUFBSSx3QkFBd0IsR0FBc0I7d0JBQ2hELElBQUksRUFBRSwyQkFBMkI7d0JBQ2pDLElBQUksRUFBRSxNQUFNO3dCQUNaLEVBQUUsRUFBRSxNQUFNO3dCQUNWLFdBQVcsRUFBRSw2QkFBNkI7d0JBQzFDLFNBQVMsRUFBRSxPQUFPO3FCQUNuQixDQUFDO29CQUNGLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEVBQUU7d0JBQ3hELElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLHFCQUFxQixJQUFJLEVBQUUsQ0FBQzt3QkFDeEcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7cUJBQ2hGO3lCQUFNO3dCQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLHFCQUFxQixJQUFJLEVBQUUsQ0FBQzt3QkFDMUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUM7cUJBQ2pGO29CQUNELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQztnQkFDRCwyREFBNEIsR0FBNUIsVUFBNkIsWUFBb0IsRUFBRSxLQUFhO29CQUM5RCxJQUFJLFlBQVksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksWUFBWSxLQUFLLENBQUMsQ0FBQyxFQUFFO3dCQUN0RSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUNsRTt5QkFBTTt3QkFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUMxRTtvQkFDRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hCLENBQUM7Z0JBQ0QsOENBQWUsR0FBZixVQUFnQixLQUFhO29CQUMzQixJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO3dCQUN4RCxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ3hHO3lCQUFNO3dCQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDMUc7b0JBQ0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNoQixDQUFDO2dCQUNELGdEQUFpQixHQUFqQixVQUFrQixLQUFhO29CQUM3QixJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO3dCQUN4RCxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQzVHO3lCQUFNO3dCQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDOUc7b0JBQ0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNoQixDQUFDO2dCQUNELHFEQUFzQixHQUF0QixVQUF1QixLQUFhO29CQUNsQyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO3dCQUN4RCxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUN4SDt5QkFBTTt3QkFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUMxSDtvQkFFRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hCLENBQUM7Z0JBQ0QsNENBQWEsR0FBYixVQUFjLE9BQU8sRUFBRSxLQUFhO29CQUNsQyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTt3QkFDaEYsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7cUJBQ2xEO3lCQUFNO3dCQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO3FCQUNuRDtvQkFDRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hCLENBQUM7Z0JBQ0Qsd0NBQVMsR0FBVCxVQUFVLElBQVksRUFBRSxTQUFpQjtvQkFDdkMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxTQUFTLEVBQUU7d0JBQ3JDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxTQUFTLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO3FCQUNqRDtvQkFDRCxPQUFPLElBQUksQ0FBQztnQkFDZCxDQUFDO2dCQUNELG1DQUFJLEdBQUosVUFBSyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJO29CQUMzQixJQUFJLEtBQUssRUFBRTt3QkFBRSxLQUFLLEdBQUcsS0FBSyxDQUFDO3FCQUFFO29CQUM3QixJQUFJLEtBQUssRUFBRTt3QkFBRSxLQUFLLEdBQUcsS0FBSyxDQUFDO3FCQUFFO29CQUM3QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ25CLENBQUM7Z0JBQ0QsZ0RBQWlCLEdBQWpCLFVBQWtCLFlBQW9CO29CQUNwQyxJQUFJLE1BQU0sR0FBRyxnQkFBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFzQixFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFlBQVksS0FBSyxZQUFZLEVBQS9CLENBQStCLENBQUMsQ0FBQztvQkFDN0YsSUFBSSxjQUFjLEdBQUcsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsWUFBTSxDQUFDLGVBQWUsRUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxZQUFZLEtBQUssWUFBWSxFQUEvQixDQUErQixDQUFDLENBQUM7b0JBQzFGLElBQUksTUFBTSxFQUFFO3dCQUNWLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQztxQkFDckI7eUJBQU07d0JBQ0wsT0FBTyxjQUFjLENBQUMsWUFBWSxDQUFDO3FCQUNwQztnQkFDSCxDQUFDO2dCQUNELGdEQUFpQixHQUFqQixVQUFrQixZQUFvQixFQUFFLEtBQWEsRUFBRSxJQUFZO29CQUNqRSxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUM7b0JBQ3RCLElBQUksZ0JBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsRUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxZQUFZLEtBQUssWUFBWSxFQUEvQixDQUErQixDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTt3QkFDbEcsWUFBWSxDQUFDLElBQUksQ0FBQzs0QkFDaEIsWUFBWSxjQUFBOzRCQUNaLEtBQUssT0FBQTs0QkFDTCxJQUFJLE1BQUE7eUJBQ0wsQ0FBQyxDQUFDO3FCQUNKO29CQUNELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO3dCQUNoRCxnQkFBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFzQixFQUFFLFVBQUEsQ0FBQzs0QkFDekMsSUFBSSxDQUFDLENBQUMsWUFBWSxLQUFLLFlBQVksRUFBRTtnQ0FDbkMsWUFBWSxDQUFDLElBQUksQ0FBQztvQ0FDaEIsWUFBWSxjQUFBO29DQUNaLEtBQUssT0FBQTtvQ0FDTCxJQUFJLE1BQUE7aUNBQ0wsQ0FBQyxDQUFDOzZCQUNKO2lDQUFNO2dDQUNMLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7NkJBQ3RCO3dCQUNILENBQUMsQ0FBQyxDQUFDO3FCQUNKO29CQUNELElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEdBQUcsWUFBWSxDQUFDO29CQUNqRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hCLENBQUM7Z0JBQ0QsbURBQW9CLEdBQXBCLFVBQXFCLE1BQWM7b0JBQ2pDLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztvQkFDdEIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7d0JBQ2hELGdCQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUUsVUFBQSxDQUFDOzRCQUN6QyxJQUFJLENBQUMsQ0FBQyxZQUFZLEtBQUssTUFBTSxFQUFFO2dDQUM3QixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzZCQUN0Qjt3QkFDSCxDQUFDLENBQUMsQ0FBQztxQkFDSjtvQkFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFzQixHQUFHLFlBQVksQ0FBQztvQkFDakQsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNoQixDQUFDO2dCQUNELGdEQUFpQixHQUFqQixVQUFrQixXQUFtQjtvQkFDbkMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztvQkFDckQsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztvQkFDbkYsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRCxDQUFDO2dCQWpOTSxnQ0FBVyxHQUFXLHNCQUFzQixDQUFDO2dCQWtOdEQsMkJBQUM7YUFBQSxBQW5ORCxDQUFtQyxzQkFBZ0I7O1lBcU5uRCxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHO2dCQUFBLGlCQWtFdkM7Z0JBakVDLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDO29CQUN0RSxJQUFJLGlCQUFlLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUNuRSxJQUFJLGlCQUFlLENBQUMsTUFBTSxLQUFLLGdCQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFlLENBQUMsQ0FBQyxNQUFNLEVBQUU7d0JBQzdELElBQUksYUFBYSxHQUFHLGdCQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFlLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQzs0QkFDakQsT0FBTyxpQkFBZSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsS0FBSyxDQUFDLEVBQVAsQ0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzt3QkFDekQsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDSixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLHNCQUFzQixFQUFFLGtDQUFnQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBRyxDQUFDLENBQUM7cUJBQzdIO3lCQUFNO3dCQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQzt3QkFDN0IsSUFBSSxjQUFZLEdBQUcsdUJBQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyw4QkFBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxJQUFJLFlBQU0sQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7d0JBQ2hNLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsY0FBWSxFQUFFLFVBQVUsQ0FBQyxDQUFDO3dCQUMzRCxJQUFJLFlBQVUsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLGNBQVksRUFBRSxVQUFVLENBQUMsQ0FBQzt3QkFDM0QsSUFBSSxZQUFVLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxjQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7d0JBQzNELElBQUksY0FBYyxHQUFHLENBQUMsWUFBVSxDQUFDLE1BQU0sS0FBSyxnQkFBQyxDQUFDLElBQUksQ0FBQyxZQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDdkUsSUFBSSxjQUFjLEVBQUU7NEJBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQzs0QkFDN0IsSUFBSSxRQUFNLEdBQUcsRUFBRSxDQUFDOzRCQUNoQixnQkFBQyxDQUFDLElBQUksQ0FBQyxnQkFBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFDLFFBQVE7Z0NBQ2xDLElBQUksQ0FBQyxHQUFRLEVBQUUsQ0FBQztnQ0FDaEIsQ0FBQyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUM7Z0NBQ2pCLENBQUMsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO2dDQUNaLGdCQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFDLENBQUMsSUFBSSxDQUFDLFlBQVUsQ0FBQyxFQUFFLFVBQUMsUUFBUTtvQ0FDbEMsSUFBSSxhQUFhLEdBQUcsQ0FBQyxnQkFBQyxDQUFDLElBQUksQ0FBQyxjQUFZLEVBQUUsVUFBQyxDQUFDO3dDQUMxQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEtBQUssUUFBUSxJQUFJLENBQUMsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDO29DQUM1RCxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUNKLElBQUksQ0FBQyxhQUFhLEVBQUU7d0NBQ2xCLGFBQWEsR0FBRzs0Q0FDZCxLQUFLLEVBQUUsR0FBRzs0Q0FDVixZQUFZLEVBQUUsS0FBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLElBQUksS0FBSzs0Q0FDL0MsT0FBTyxFQUFHLGlCQUFpQjt5Q0FDNUIsQ0FBQztxQ0FDTDtvQ0FDQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzt3Q0FDVixNQUFNLEVBQUUsUUFBUTt3Q0FDaEIsT0FBTyxFQUFFLGFBQWEsQ0FBQyxLQUFLO3dDQUM1QixjQUFjLEVBQUUsYUFBYSxDQUFDLFlBQVksSUFBSSxhQUFhLENBQUMsS0FBSzt3Q0FDakUsU0FBUyxFQUFHLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBRSxLQUFLLENBQUMsaUNBQWlDLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLEVBQUUsYUFBYSxDQUFDLGNBQWMsQ0FBQzt3Q0FDck4sU0FBUyxFQUFFLGFBQWEsQ0FBQyxPQUFPLElBQUksYUFBYTt3Q0FDakQsV0FBVyxFQUFFLGFBQWEsQ0FBQyxTQUFTLElBQUksT0FBTztxQ0FDaEQsQ0FBQyxDQUFDO2dDQUNMLENBQUMsQ0FBQyxDQUFDO2dDQUNILFFBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2pCLENBQUMsQ0FBQyxDQUFDOzRCQUNILFFBQVEsQ0FBQyxTQUFTLENBQ2hCLElBQUksQ0FBQyxJQUFJLEVBQ1QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxLQUFLLE1BQU0sRUFDakQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixDQUFDLEtBQUssTUFBTSxFQUN0RCxJQUFJLENBQUMsaUJBQWlCLENBQUMseUJBQXlCLENBQUMsRUFDakQsWUFBVSxFQUNWLFFBQU0sRUFDTixJQUFJLENBQUMsaUJBQWlCLENBQUMseUJBQXlCLENBQUMsRUFDakQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLHdCQUF3QixDQUFDLEVBQ2hELElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQ2xDLENBQUM7eUJBQ0g7NkJBQU07NEJBQ0wsSUFBSSxhQUFhLEdBQUcsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsWUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUM7Z0NBQzVDLE9BQU8sWUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsS0FBSyxDQUFDLEVBQVAsQ0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs0QkFDcEQsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDSixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLHNCQUFzQixFQUFFLGtDQUFnQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBRyxDQUFDLENBQUM7eUJBQzdIO3dCQUNELFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxjQUFZLENBQUMsQ0FBQztxQkFDbEQ7b0JBQ0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQzFDO1lBQ0gsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vbm9kZV9tb2R1bGVzL2dyYWZhbmEtc2RrLW1vY2tzL2FwcC9oZWFkZXJzL2NvbW1vbi5kLnRzXCIgLz5cclxuXHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IGtibiBmcm9tIFwiYXBwL2NvcmUvdXRpbHMva2JuXCI7XHJcbmltcG9ydCB7IGxvYWRQbHVnaW5Dc3MsIE1ldHJpY3NQYW5lbEN0cmwgfSBmcm9tIFwiYXBwL3BsdWdpbnMvc2RrXCI7XHJcbmltcG9ydCB7IFBhdHRlcm4sIFRpbWVCYXNlVGhyZXNob2xkLCBWYWx1ZU5hbWVPcHRpb24gfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2ludGVyZmFjZXNcIjtcclxuaW1wb3J0IHsgcGx1Z2luX2lkLCBjb25maWcgfSBmcm9tIFwiLi9hcHAvYXBwXCI7XHJcbmltcG9ydCB7IGNvbXB1dGUsIGRlZmF1bHRIYW5kbGVyIH0gZnJvbSBcIi4vYXBwL3Nlcmllc0hhbmRsZXJcIjtcclxuaW1wb3J0ICogYXMgcmVuZGVyZXIgZnJvbSBcIi4vYXBwL3JlbmRlcmVyXCI7XHJcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gXCIuL2FwcC91dGlsc1wiO1xyXG5cclxubG9hZFBsdWdpbkNzcyh7XHJcbiAgZGFyazogYHBsdWdpbnMvJHtwbHVnaW5faWR9L2Nzcy9kZWZhdWx0LmRhcmsuY3NzYCxcclxuICBsaWdodDogYHBsdWdpbnMvJHtwbHVnaW5faWR9L2Nzcy9kZWZhdWx0LmxpZ2h0LmNzc2BcclxufSk7XHJcblxyXG5jbGFzcyBHcmFmYW5hQm9vbVRhYmxlQ3RybCBleHRlbmRzIE1ldHJpY3NQYW5lbEN0cmwge1xyXG4gIHN0YXRpYyB0ZW1wbGF0ZVVybDogc3RyaW5nID0gXCJwYXJ0aWFscy9tb2R1bGUuaHRtbFwiO1xyXG4gIGN0cmw6IGFueTtcclxuICBlbGVtOiBhbnk7XHJcbiAgZGF0YVJlY2VpdmVkOiBhbnk7XHJcbiAgdmFsdWVOYW1lT3B0aW9uczogVmFsdWVOYW1lT3B0aW9uW10gPSBjb25maWcudmFsdWVOYW1lT3B0aW9ucztcclxuICB1bml0Rm9ybWF0czogYW55ID0ga2JuLmdldFVuaXRGb3JtYXRzKCk7XHJcbiAgb3B0aW9uT3ZlcnJpZGVzOiBhbnkgPSBjb25maWcub3B0aW9uT3ZlcnJpZGVzO1xyXG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJGluamVjdG9yLCAkc2NlKSB7XHJcbiAgICBzdXBlcigkc2NvcGUsICRpbmplY3Rvcik7XHJcbiAgICBfLmRlZmF1bHRzKHRoaXMucGFuZWwsIGNvbmZpZy5wYW5lbERlZmF1bHRzKTtcclxuICAgIHRoaXMuZXZlbnRzLm9uKFwiZGF0YS1yZWNlaXZlZFwiLCB0aGlzLm9uRGF0YVJlY2VpdmVkLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5ldmVudHMub24oXCJpbml0LWVkaXQtbW9kZVwiLCB0aGlzLm9uSW5pdEVkaXRNb2RlLmJpbmQodGhpcykpO1xyXG4gICAgaWYgKHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID09PSAtMSkge1xyXG4gICAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9IHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgaWYgKCRzY2UpIHsgJHNjZSA9ICRzY2U7IH1cclxuICB9XHJcbiAgb25Jbml0RWRpdE1vZGUoKSB7XHJcbiAgICB0aGlzLmFkZEVkaXRvclRhYihcIlBhdHRlcm5zXCIsIGBwdWJsaWMvcGx1Z2lucy8ke3BsdWdpbl9pZH0vcGFydGlhbHMvcGF0dGVybnMuaHRtbGAsIDIpO1xyXG4gICAgdGhpcy5hZGRFZGl0b3JUYWIoXCJPcHRpb25zXCIsIGBwdWJsaWMvcGx1Z2lucy8ke3BsdWdpbl9pZH0vcGFydGlhbHMvb3B0aW9ucy5odG1sYCwgMyk7XHJcbiAgfVxyXG4gIG9uRGF0YVJlY2VpdmVkKGRhdGE6IGFueSkge1xyXG4gICAgdGhpcy5kYXRhUmVjZWl2ZWQgPSBkYXRhO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgYWRkUGF0dGVybigpIHtcclxuICAgIGxldCBuZXdQYXR0ZXJuOiBQYXR0ZXJuID0ge1xyXG4gICAgICBuYW1lOiBcIk5ldyBQYXR0ZXJuXCIsXHJcbiAgICAgIHBhdHRlcm46IFwiXnNlcnZlci4qY3B1JFwiLFxyXG4gICAgICBkaXNhYmxlZDogZmFsc2UsXHJcbiAgICAgIGRlbGltaXRlcjogXCIuXCIsXHJcbiAgICAgIHZhbHVlTmFtZTogXCJhdmdcIixcclxuICAgICAgcm93X25hbWU6IHRoaXMucGFuZWwucm93X2NvbF93cmFwcGVyICsgXCIwXCIgKyB0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlcixcclxuICAgICAgY29sX25hbWU6IHRoaXMucGFuZWwucm93X2NvbF93cmFwcGVyICsgXCIxXCIgKyB0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlcixcclxuICAgICAgdGhyZXNob2xkczogXCI3MCw5MFwiLFxyXG4gICAgICB0aW1lX2Jhc2VkX3RocmVzaG9sZHM6IFtdLFxyXG4gICAgICBlbmFibGVfdGltZV9iYXNlZF90aHJlc2hvbGRzOiBmYWxzZSxcclxuICAgICAgZW5hYmxlX2JnQ29sb3I6IGZhbHNlLFxyXG4gICAgICBiZ0NvbG9yczogXCJncmVlbnxvcmFuZ2V8cmVkXCIsXHJcbiAgICAgIGVuYWJsZV9iZ0NvbG9yX292ZXJyaWRlczogZmFsc2UsXHJcbiAgICAgIGJnQ29sb3JzX292ZXJyaWRlczogXCIwLT5ncmVlbnwyLT5yZWR8MS0+eWVsbG93XCIsXHJcbiAgICAgIGVuYWJsZV9UZXh0Q29sb3JzOiBmYWxzZSxcclxuICAgICAgdGV4dENvbG9yczogXCJncmVlbnxvcmFuZ2V8cmVkXCIsXHJcbiAgICAgIGVuYWJsZV9UZXh0Q29sb3Jfb3ZlcnJpZGVzOiBmYWxzZSxcclxuICAgICAgdGV4dENvbG9yc19vdmVycmlkZXM6IFwiMC0+Z3JlZW58Mi0+cmVkfDEtPnllbGxvd1wiLFxyXG4gICAgICBlbmFibGVfdHJhbnNmb3JtOiBmYWxzZSxcclxuICAgICAgdHJhbnNmb3JtX3ZhbHVlczogXCJfdmFsdWVffF92YWx1ZV98X3ZhbHVlX1wiLFxyXG4gICAgICBlbmFibGVfdHJhbnNmb3JtX292ZXJyaWRlczogZmFsc2UsXHJcbiAgICAgIHRyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzOiBcIjAtPmRvd258MS0+dXBcIixcclxuICAgICAgZGVjaW1hbHM6IDIsXHJcbiAgICAgIGZvcm1hdDogXCJub25lXCIsXHJcbiAgICAgIG51bGxfY29sb3I6IFwiZGFya3JlZFwiLFxyXG4gICAgICBudWxsX3RleHRfY29sb3I6IFwid2hpdGVcIixcclxuICAgICAgbnVsbF92YWx1ZTogXCJObyBkYXRhXCIsXHJcbiAgICAgIGVuYWJsZV9jbGlja2FibGVfY2VsbHM6IGZhbHNlLFxyXG4gICAgICBjbGlja2FibGVfY2VsbHNfbGluazogXCJcIixcclxuICAgICAgZmlsdGVyOiB7XHJcbiAgICAgICAgdmFsdWVfYmVsb3c6IFwiXCIsXHJcbiAgICAgICAgdmFsdWVfYWJvdmU6IFwiXCIsXHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGlzLnBhbmVsLnBhdHRlcm5zLnB1c2gobmV3UGF0dGVybik7XHJcbiAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9IHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoIC0gMTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIG1vdmVQYXR0ZXJuKGRpcmVjdGlvbjogU3RyaW5nLCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICBsZXQgdGVtcEVsZW1lbnQ6IFBhdHRlcm4gPSB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XTtcclxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiVVBcIikge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XSA9IHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXggLSAxXTtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleCAtIDFdID0gdGVtcEVsZW1lbnQ7XHJcbiAgICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID0gaW5kZXggLSAxO1xyXG4gICAgfVxyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJET1dOXCIpIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0gPSB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4ICsgMV07XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXggKyAxXSA9IHRlbXBFbGVtZW50O1xyXG4gICAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9IGluZGV4ICsgMTtcclxuICAgIH1cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHJlbW92ZVBhdHRlcm4oaW5kZXg6IG51bWJlcikge1xyXG4gICAgdGhpcy5wYW5lbC5wYXR0ZXJucy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSAodGhpcy5wYW5lbC5wYXR0ZXJucyAmJiB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCA+IDApID8gKHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoIC0gMSkgOiAtMTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIGNsb25lUGF0dGVybihpbmRleDogbnVtYmVyKSB7XHJcbiAgICBsZXQgY29waWVkUGF0dGVybjogUGF0dGVybiA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdKTtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMucHVzaChjb3BpZWRQYXR0ZXJuKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIGFkZF90aW1lX2Jhc2VkX3RocmVzaG9sZHMoaW5kZXg6IG51bWJlcikge1xyXG4gICAgbGV0IG5ld190aW1lX2Jhc2VkX3RocmVzaG9sZDogVGltZUJhc2VUaHJlc2hvbGQgPSB7XHJcbiAgICAgIG5hbWU6IFwiRWFybHkgbW9ybmluZyBvZiBldmVyeWRheVwiLFxyXG4gICAgICBmcm9tOiBcIjAwMDBcIixcclxuICAgICAgdG86IFwiMDUzMFwiLFxyXG4gICAgICBlbmFibGVkRGF5czogXCJTdW4sTW9uLFR1ZSxXZWQsVGh1LEZyaSxTYXRcIixcclxuICAgICAgdGhyZXNob2xkOiBcIjcwLDkwXCJcclxuICAgIH07XHJcbiAgICBpZiAoaW5kZXggPT09IHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoIHx8IGluZGV4ID09PSAtMSkge1xyXG4gICAgICB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLnRpbWVfYmFzZWRfdGhyZXNob2xkcyA9IHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4udGltZV9iYXNlZF90aHJlc2hvbGRzIHx8IFtdO1xyXG4gICAgICB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLnRpbWVfYmFzZWRfdGhyZXNob2xkcy5wdXNoKG5ld190aW1lX2Jhc2VkX3RocmVzaG9sZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS50aW1lX2Jhc2VkX3RocmVzaG9sZHMgPSB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS50aW1lX2Jhc2VkX3RocmVzaG9sZHMgfHwgW107XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdLnRpbWVfYmFzZWRfdGhyZXNob2xkcy5wdXNoKG5ld190aW1lX2Jhc2VkX3RocmVzaG9sZCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICByZW1vdmVfdGltZV9iYXNlZF90aHJlc2hvbGRzKHBhdHRlcm5JbmRleDogbnVtYmVyLCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICBpZiAocGF0dGVybkluZGV4ID09PSB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCB8fCBwYXR0ZXJuSW5kZXggPT09IC0xKSB7XHJcbiAgICAgIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4udGltZV9iYXNlZF90aHJlc2hvbGRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW3BhdHRlcm5JbmRleF0udGltZV9iYXNlZF90aHJlc2hvbGRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBpbnZlcnNlQkdDb2xvcnMoaW5kZXg6IG51bWJlcikge1xyXG4gICAgaWYgKGluZGV4ID09PSB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCB8fCBpbmRleCA9PT0gLTEpIHtcclxuICAgICAgdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybi5iZ0NvbG9ycyA9IHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4uYmdDb2xvcnMuc3BsaXQoXCJ8XCIpLnJldmVyc2UoKS5qb2luKFwifFwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdLmJnQ29sb3JzID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0uYmdDb2xvcnMuc3BsaXQoXCJ8XCIpLnJldmVyc2UoKS5qb2luKFwifFwiKTtcclxuICAgIH1cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIGludmVyc2VUZXh0Q29sb3JzKGluZGV4OiBudW1iZXIpIHtcclxuICAgIGlmIChpbmRleCA9PT0gdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggfHwgaW5kZXggPT09IC0xKSB7XHJcbiAgICAgIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4udGV4dENvbG9ycyA9IHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4udGV4dENvbG9ycy5zcGxpdChcInxcIikucmV2ZXJzZSgpLmpvaW4oXCJ8XCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0udGV4dENvbG9ycyA9IHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdLnRleHRDb2xvcnMuc3BsaXQoXCJ8XCIpLnJldmVyc2UoKS5qb2luKFwifFwiKTtcclxuICAgIH1cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIGludmVyc2VUcmFuc2Zvcm1WYWx1ZXMoaW5kZXg6IG51bWJlcikge1xyXG4gICAgaWYgKGluZGV4ID09PSB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCB8fCBpbmRleCA9PT0gLTEpIHtcclxuICAgICAgdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybi50cmFuc2Zvcm1fdmFsdWVzID0gdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybi50cmFuc2Zvcm1fdmFsdWVzLnNwbGl0KFwifFwiKS5yZXZlcnNlKCkuam9pbihcInxcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS50cmFuc2Zvcm1fdmFsdWVzID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0udHJhbnNmb3JtX3ZhbHVlcy5zcGxpdChcInxcIikucmV2ZXJzZSgpLmpvaW4oXCJ8XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHNldFVuaXRGb3JtYXQoc3ViSXRlbSwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgaWYgKGluZGV4ID09PSB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCB8fCBpbmRleCA9PT0gdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybi5mb3JtYXQgPSBzdWJJdGVtLnZhbHVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0uZm9ybWF0ID0gc3ViSXRlbS52YWx1ZTtcclxuICAgIH1cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIGxpbWl0VGV4dCh0ZXh0OiBTdHJpbmcsIG1heGxlbmd0aDogbnVtYmVyKSB7XHJcbiAgICBpZiAodGV4dC5zcGxpdChcIlwiKS5sZW5ndGggPiBtYXhsZW5ndGgpIHtcclxuICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDAsIG1heGxlbmd0aCAtIDMpICsgXCIuLi5cIjtcclxuICAgIH1cclxuICAgIHJldHVybiB0ZXh0O1xyXG4gIH1cclxuICBsaW5rKHNjb3BlLCBlbGVtLCBhdHRycywgY3RybCkge1xyXG4gICAgaWYgKHNjb3BlKSB7IHNjb3BlID0gc2NvcGU7IH1cclxuICAgIGlmIChhdHRycykgeyBhdHRycyA9IGF0dHJzOyB9XHJcbiAgICB0aGlzLmN0cmwgPSBjdHJsO1xyXG4gICAgdGhpcy5lbGVtID0gZWxlbTtcclxuICB9XHJcbiAgZ2V0T3B0aW9uT3ZlcnJpZGUocHJvcGVydHlOYW1lOiBTdHJpbmcpIHtcclxuICAgIGxldCBvcHRpb24gPSBfLmZpbmQodGhpcy5wYW5lbC5jdXJyZW50T3B0aW9uT3ZlcnJpZGVzLCBvID0+IG8ucHJvcGVydHlOYW1lID09PSBwcm9wZXJ0eU5hbWUpO1xyXG4gICAgbGV0IGRlZmF1bHRfb3B0aW9uID0gXy5maW5kKGNvbmZpZy5vcHRpb25PdmVycmlkZXMsIG8gPT4gby5wcm9wZXJ0eU5hbWUgPT09IHByb3BlcnR5TmFtZSk7XHJcbiAgICBpZiAob3B0aW9uKSB7XHJcbiAgICAgIHJldHVybiBvcHRpb24udmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZGVmYXVsdF9vcHRpb24uZGVmYXVsdFZhbHVlO1xyXG4gICAgfVxyXG4gIH1cclxuICBzZXRPcHRpb25PdmVycmlkZShwcm9wZXJ0eU5hbWU6IFN0cmluZywgdmFsdWU6IFN0cmluZywgdGV4dDogU3RyaW5nKSB7XHJcbiAgICBsZXQgbmV3T3ZlcnJpZGVzID0gW107XHJcbiAgICBpZiAoXy5maWx0ZXIodGhpcy5wYW5lbC5jdXJyZW50T3B0aW9uT3ZlcnJpZGVzLCBvID0+IG8ucHJvcGVydHlOYW1lID09PSBwcm9wZXJ0eU5hbWUpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBuZXdPdmVycmlkZXMucHVzaCh7XHJcbiAgICAgICAgcHJvcGVydHlOYW1lLFxyXG4gICAgICAgIHZhbHVlLFxyXG4gICAgICAgIHRleHRcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5wYW5lbC5jdXJyZW50T3B0aW9uT3ZlcnJpZGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgXy5lYWNoKHRoaXMucGFuZWwuY3VycmVudE9wdGlvbk92ZXJyaWRlcywgbyA9PiB7XHJcbiAgICAgICAgaWYgKG8ucHJvcGVydHlOYW1lID09PSBwcm9wZXJ0eU5hbWUpIHtcclxuICAgICAgICAgIG5ld092ZXJyaWRlcy5wdXNoKHtcclxuICAgICAgICAgICAgcHJvcGVydHlOYW1lLFxyXG4gICAgICAgICAgICB2YWx1ZSxcclxuICAgICAgICAgICAgdGV4dFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5ld092ZXJyaWRlcy5wdXNoKG8pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnBhbmVsLmN1cnJlbnRPcHRpb25PdmVycmlkZXMgPSBuZXdPdmVycmlkZXM7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICByZW1vdmVPcHRpb25PdmVycmlkZShvcHRpb246IFN0cmluZykge1xyXG4gICAgbGV0IG5ld092ZXJyaWRlcyA9IFtdO1xyXG4gICAgaWYgKHRoaXMucGFuZWwuY3VycmVudE9wdGlvbk92ZXJyaWRlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIF8uZWFjaCh0aGlzLnBhbmVsLmN1cnJlbnRPcHRpb25PdmVycmlkZXMsIG8gPT4ge1xyXG4gICAgICAgIGlmIChvLnByb3BlcnR5TmFtZSAhPT0gb3B0aW9uKSB7XHJcbiAgICAgICAgICBuZXdPdmVycmlkZXMucHVzaChvKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wYW5lbC5jdXJyZW50T3B0aW9uT3ZlcnJpZGVzID0gbmV3T3ZlcnJpZGVzO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgYWRqdXN0UGFuZWxIZWlnaHQocGFuZWxIZWlnaHQ6IG51bWJlcikge1xyXG4gICAgbGV0IHJvb3RFbGVtID0gdGhpcy5lbGVtLmZpbmQoXCIudGFibGUtcGFuZWwtc2Nyb2xsXCIpO1xyXG4gICAgbGV0IG1heGhlaWdodG9mcGFuZWwgPSB0aGlzLnBhbmVsLmRlYnVnX21vZGUgPyBwYW5lbEhlaWdodCAtIDcxIDogcGFuZWxIZWlnaHQgLSAzMTtcclxuICAgIHJvb3RFbGVtLmNzcyh7IFwibWF4LWhlaWdodFwiOiBtYXhoZWlnaHRvZnBhbmVsICsgXCJweFwiIH0pO1xyXG4gIH1cclxufVxyXG5cclxuR3JhZmFuYUJvb21UYWJsZUN0cmwucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICBpZiAodGhpcy5kYXRhUmVjZWl2ZWQpIHtcclxuICAgIHRoaXMucGFuZWwuZGVmYXVsdF90aXRsZV9mb3Jfcm93cyA9IHRoaXMucGFuZWwuZGVmYXVsdF90aXRsZV9mb3Jfcm93cztcclxuICAgIGxldCBtZXRyaWNzUmVjZWl2ZWQgPSB1dGlscy5nZXRGaWVsZHModGhpcy5kYXRhUmVjZWl2ZWQsIFwidGFyZ2V0XCIpO1xyXG4gICAgaWYgKG1ldHJpY3NSZWNlaXZlZC5sZW5ndGggIT09IF8udW5pcShtZXRyaWNzUmVjZWl2ZWQpLmxlbmd0aCkge1xyXG4gICAgICBsZXQgZHVwbGljYXRlS2V5cyA9IF8udW5pcShtZXRyaWNzUmVjZWl2ZWQuZmlsdGVyKHYgPT4ge1xyXG4gICAgICAgIHJldHVybiBtZXRyaWNzUmVjZWl2ZWQuZmlsdGVyKHQgPT4gdCA9PT0gdikubGVuZ3RoID4gMTtcclxuICAgICAgfSkpO1xyXG4gICAgICB0aGlzLnBhbmVsLmVycm9yID0gdXRpbHMuYnVpbGRFcnJvcihgRHVwbGljYXRlIGtleXMgZm91bmRgLCBgRHVwbGljYXRlIGtleSB2YWx1ZXMgOiA8YnIvPiAke2R1cGxpY2F0ZUtleXMuam9pbihcIjxici8+IFwiKX1gKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFuZWwuZXJyb3IgPSB1bmRlZmluZWQ7XHJcbiAgICAgIGxldCBkYXRhQ29tcHV0ZWQgPSBjb21wdXRlKHRoaXMuZGF0YVJlY2VpdmVkLm1hcChkZWZhdWx0SGFuZGxlci5iaW5kKHRoaXMpKSwgdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybiB8fCBjb25maWcucGFuZWxEZWZhdWx0cy5kZWZhdWx0UGF0dGVybiwgdGhpcy5wYW5lbC5wYXR0ZXJucywgdGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIpO1xyXG4gICAgICBsZXQgcm93c19mb3VuZCA9IHV0aWxzLmdldEZpZWxkcyhkYXRhQ29tcHV0ZWQsIFwicm93X25hbWVcIik7XHJcbiAgICAgIGxldCBjb2xzX2ZvdW5kID0gdXRpbHMuZ2V0RmllbGRzKGRhdGFDb21wdXRlZCwgXCJjb2xfbmFtZVwiKTtcclxuICAgICAgbGV0IGtleXNfZm91bmQgPSB1dGlscy5nZXRGaWVsZHMoZGF0YUNvbXB1dGVkLCBcImtleV9uYW1lXCIpO1xyXG4gICAgICBsZXQgaXNfdW5pcXVlX2tleXMgPSAoa2V5c19mb3VuZC5sZW5ndGggPT09IF8udW5pcShrZXlzX2ZvdW5kKS5sZW5ndGgpO1xyXG4gICAgICBpZiAoaXNfdW5pcXVlX2tleXMpIHtcclxuICAgICAgICB0aGlzLnBhbmVsLmVycm9yID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIGxldCBvdXRwdXQgPSBbXTtcclxuICAgICAgICBfLmVhY2goXy51bmlxKHJvd3NfZm91bmQpLCAocm93X25hbWUpID0+IHtcclxuICAgICAgICAgIGxldCBvOiBhbnkgPSB7fTtcclxuICAgICAgICAgIG8ucm93ID0gcm93X25hbWU7XHJcbiAgICAgICAgICBvLmNvbHMgPSBbXTtcclxuICAgICAgICAgIF8uZWFjaChfLnVuaXEoY29sc19mb3VuZCksIChjb2xfbmFtZSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2hlZF92YWx1ZSA9IChfLmZpbmQoZGF0YUNvbXB1dGVkLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgIHJldHVybiBlLnJvd19uYW1lID09PSByb3dfbmFtZSAmJiBlLmNvbF9uYW1lID09PSBjb2xfbmFtZTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBpZiAoIW1hdGNoZWRfdmFsdWUpIHtcclxuICAgICAgICAgICAgICBtYXRjaGVkX3ZhbHVlID0ge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IE5hTixcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlWYWx1ZTogdGhpcy5wYW5lbC5ub19tYXRjaF90ZXh0IHx8IFwiTi9BXCIsXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwIDogXCJObyBWYWx1ZXMgZm91bmRcIlxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG8uY29scy5wdXNoKHtcclxuICAgICAgICAgICAgICBcIm5hbWVcIjogY29sX25hbWUsXHJcbiAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBtYXRjaGVkX3ZhbHVlLnZhbHVlLFxyXG4gICAgICAgICAgICAgIFwiZGlzcGxheVZhbHVlXCI6IG1hdGNoZWRfdmFsdWUuZGlzcGxheVZhbHVlIHx8IG1hdGNoZWRfdmFsdWUudmFsdWUsXHJcbiAgICAgICAgICAgICAgXCJ0b29sdGlwXCIgOiByZW5kZXJlci5nZXRUb29sdGlwTWVzc2FnZSggdXRpbHMuZ2V0QWN0dWFsTmFtZVdpdGhvdXRUcmFuc2Zvcm1TaWduKG1hdGNoZWRfdmFsdWUuYWN0dWFsX3Jvd19uYW1lKSwgdXRpbHMuZ2V0QWN0dWFsTmFtZVdpdGhvdXRUcmFuc2Zvcm1TaWduKG1hdGNoZWRfdmFsdWUuYWN0dWFsX2NvbF9uYW1lKSwgbWF0Y2hlZF92YWx1ZS52YWx1ZUZvcm1hdHRlZCksXHJcbiAgICAgICAgICAgICAgXCJiZ0NvbG9yXCI6IG1hdGNoZWRfdmFsdWUuYmdDb2xvciB8fCBcInRyYW5zcGFyZW50XCIsXHJcbiAgICAgICAgICAgICAgXCJ0ZXh0Q29sb3JcIjogbWF0Y2hlZF92YWx1ZS50ZXh0Q29sb3IgfHwgXCJ3aGl0ZVwiXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBvdXRwdXQucHVzaChvKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZW5kZXJlci5idWlsZEhUTUwoXHJcbiAgICAgICAgICB0aGlzLmVsZW0sXHJcbiAgICAgICAgICB0aGlzLmdldE9wdGlvbk92ZXJyaWRlKFwiSElERV9IRUFERVJTXCIpID09PSBcInRydWVcIixcclxuICAgICAgICAgIHRoaXMuZ2V0T3B0aW9uT3ZlcnJpZGUoXCJISURFX0ZJUlNUX0NPTFVNTlwiKSA9PT0gXCJ0cnVlXCIsXHJcbiAgICAgICAgICB0aGlzLmdldE9wdGlvbk92ZXJyaWRlKFwiVEVYVF9BTElHTl9UQUJMRV9IRUFERVJcIiksXHJcbiAgICAgICAgICBjb2xzX2ZvdW5kLFxyXG4gICAgICAgICAgb3V0cHV0LFxyXG4gICAgICAgICAgdGhpcy5nZXRPcHRpb25PdmVycmlkZShcIlRFWFRfQUxJR05fRklSU1RfQ09MVU1OXCIpLFxyXG4gICAgICAgICAgdGhpcy5nZXRPcHRpb25PdmVycmlkZShcIlRFWFRfQUxJR05fVEFCTEVfQ0VMTFNcIiksXHJcbiAgICAgICAgICB0aGlzLnBhbmVsLmRlZmF1bHRfdGl0bGVfZm9yX3Jvd3NcclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBkdXBsaWNhdGVLZXlzID0gXy51bmlxKGtleXNfZm91bmQuZmlsdGVyKHYgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGtleXNfZm91bmQuZmlsdGVyKHQgPT4gdCA9PT0gdikubGVuZ3RoID4gMTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgdGhpcy5wYW5lbC5lcnJvciA9IHV0aWxzLmJ1aWxkRXJyb3IoYER1cGxpY2F0ZSBrZXlzIGZvdW5kYCwgYER1cGxpY2F0ZSBrZXkgdmFsdWVzIDogPGJyLz4gJHtkdXBsaWNhdGVLZXlzLmpvaW4oXCI8YnIvPiBcIil9YCk7XHJcbiAgICAgIH1cclxuICAgICAgcmVuZGVyZXIuYnVpbGREZWJ1Z0hUTUwodGhpcy5lbGVtLCBkYXRhQ29tcHV0ZWQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hZGp1c3RQYW5lbEhlaWdodCh0aGlzLmN0cmwuaGVpZ2h0KTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQge1xyXG4gIEdyYWZhbmFCb29tVGFibGVDdHJsIGFzIFBhbmVsQ3RybFxyXG59O1xyXG4iXX0=