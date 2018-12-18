System.register(["lodash", "app/core/utils/kbn", "app/plugins/sdk", "./app/config", "./app/app"], function (exports_1, context_1) {
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
    var lodash_1, kbn_1, sdk_1, config_1, app_1, GrafanaBoomTableCtrl;
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
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            }
        ],
        execute: function () {
            sdk_1.loadPluginCss({
                dark: "plugins/" + config_1.plugin_id + "/css/default.dark.css",
                light: "plugins/" + config_1.plugin_id + "/css/default.light.css"
            });
            GrafanaBoomTableCtrl = (function (_super) {
                __extends(GrafanaBoomTableCtrl, _super);
                function GrafanaBoomTableCtrl($scope, $injector, $sce) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.unitFormats = kbn_1.default.getUnitFormats();
                    _this.valueNameOptions = config_1.config.valueNameOptions;
                    _this.optionOverrides = config_1.config.optionOverrides;
                    lodash_1.default.defaults(_this.panel, config_1.config.panelDefaults);
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
                    this.addEditorTab("Patterns", "public/plugins/" + config_1.plugin_id + "/partials/patterns.html", 2);
                    this.addEditorTab("Options", "public/plugins/" + config_1.plugin_id + "/partials/options.html", 3);
                };
                GrafanaBoomTableCtrl.prototype.onDataReceived = function (data) {
                    this.dataReceived = data;
                    this.render();
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
                        tooltipTemplate: "Series : _series_ | Value : _value_",
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
                var panelOptions = {
                    row_col_wrapper: this.panel.row_col_wrapper,
                    no_match_text: this.panel.no_match_text
                };
                var rendering_options = {
                    default_title_for_rows: this.panel.default_title_for_rows,
                    show_footers: app_1.getOptionOverride(this.panel.currentOptionOverrides, "SHOW_FOOTERS") === "true",
                    hide_headers: app_1.getOptionOverride(this.panel.currentOptionOverrides, "HIDE_HEADERS") === "true",
                    hide_first_column: app_1.getOptionOverride(this.panel.currentOptionOverrides, "HIDE_FIRST_COLUMN") === "true",
                    text_align_table_header: app_1.getOptionOverride(this.panel.currentOptionOverrides, "TEXT_ALIGN_TABLE_HEADER"),
                    text_align_first_column: app_1.getOptionOverride(this.panel.currentOptionOverrides, "TEXT_ALIGN_FIRST_COLUMN"),
                    text_align_table_cells: app_1.getOptionOverride(this.panel.currentOptionOverrides, "TEXT_ALIGN_TABLE_CELLS"),
                };
                var output = app_1.computeRenderingData(this.dataReceived, this.panel.patterns, this.panel.defaultPattern || config_1.config.panelDefaults.defaultPattern, panelOptions, rendering_options, this.panel.debug_mode);
                if (output.error) {
                    this.panel.error = output.error;
                }
                else {
                    this.elem.find("#boomtable_output_body_headers").html(output.output_html.header);
                    this.elem.find("#boomtable_output_body").html(output.output_html.body);
                    this.elem.find("#boomtable_output_body_footers").html(output.output_html.footer);
                    this.elem.find("[data-toggle='tooltip']").tooltip({
                        boundary: "scrollParent"
                    });
                    if (this.panel.debug_mode === true) {
                        this.elem.find("#boomtable_debug_table_holder").html(output.output_html.debug);
                    }
                }
                this.adjustPanelHeight(this.ctrl.height);
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFTQSxtQkFBYSxDQUFDO2dCQUNaLElBQUksRUFBRSxhQUFXLGtCQUFTLDBCQUF1QjtnQkFDakQsS0FBSyxFQUFFLGFBQVcsa0JBQVMsMkJBQXdCO2FBQ3BELENBQUMsQ0FBQzs7Z0JBRWdDLHdDQUFnQjtnQkFTakQsOEJBQVksTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJO29CQUFuQyxZQUNFLGtCQUFNLE1BQU0sRUFBRSxTQUFTLENBQUMsU0FTekI7b0JBYkQsaUJBQVcsR0FBUSxhQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3hDLHNCQUFnQixHQUFzQixlQUFNLENBQUMsZ0JBQWdCLENBQUM7b0JBQzlELHFCQUFlLEdBQVEsZUFBTSxDQUFDLGVBQWUsQ0FBQztvQkFHNUMsZ0JBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxlQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQzdDLEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNoRSxLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNyRSxLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNqRSxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEtBQUssQ0FBQyxDQUFDLEVBQUU7d0JBQ3hDLEtBQUksQ0FB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QUksQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDdkUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDakYsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQyxPQUFPLENBQUM7d0JBQ2hELFFBQVEsRUFBRSxjQUFjO3FCQUN6QixDQUFDLENBQUM7b0JBQ0gsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7d0JBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLCtCQUErQixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ2hGO2lCQUNGO2dCQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uL25vZGVfbW9kdWxlcy9ncmFmYW5hLXNkay1tb2Nrcy9hcHAvaGVhZGVycy9jb21tb24uZC50c1wiIC8+XHJcblxyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBrYm4gZnJvbSBcImFwcC9jb3JlL3V0aWxzL2tiblwiO1xyXG5pbXBvcnQgeyBsb2FkUGx1Z2luQ3NzLCBNZXRyaWNzUGFuZWxDdHJsIH0gZnJvbSBcImFwcC9wbHVnaW5zL3Nka1wiO1xyXG5pbXBvcnQgeyBQYXR0ZXJuLCBUaW1lQmFzZVRocmVzaG9sZCwgVmFsdWVOYW1lT3B0aW9uIH0gZnJvbSBcIi4vaW50ZXJmYWNlcy9pbnRlcmZhY2VzXCI7XHJcbmltcG9ydCB7IHBsdWdpbl9pZCwgY29uZmlnIH0gZnJvbSBcIi4vYXBwL2NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBjb21wdXRlUmVuZGVyaW5nRGF0YSwgZ2V0T3B0aW9uT3ZlcnJpZGUgfSBmcm9tIFwiLi9hcHAvYXBwXCI7XHJcblxyXG5sb2FkUGx1Z2luQ3NzKHtcclxuICBkYXJrOiBgcGx1Z2lucy8ke3BsdWdpbl9pZH0vY3NzL2RlZmF1bHQuZGFyay5jc3NgLFxyXG4gIGxpZ2h0OiBgcGx1Z2lucy8ke3BsdWdpbl9pZH0vY3NzL2RlZmF1bHQubGlnaHQuY3NzYFxyXG59KTtcclxuXHJcbmNsYXNzIEdyYWZhbmFCb29tVGFibGVDdHJsIGV4dGVuZHMgTWV0cmljc1BhbmVsQ3RybCB7XHJcbiAgc3RhdGljIHRlbXBsYXRlVXJsOiBzdHJpbmcgPSBcInBhcnRpYWxzL21vZHVsZS5odG1sXCI7XHJcbiAgY3RybDogYW55O1xyXG4gIGVsZW06IGFueTtcclxuICAkc2NlOiBhbnk7XHJcbiAgZGF0YVJlY2VpdmVkOiBhbnk7XHJcbiAgdW5pdEZvcm1hdHM6IGFueSA9IGtibi5nZXRVbml0Rm9ybWF0cygpO1xyXG4gIHZhbHVlTmFtZU9wdGlvbnM6IFZhbHVlTmFtZU9wdGlvbltdID0gY29uZmlnLnZhbHVlTmFtZU9wdGlvbnM7XHJcbiAgb3B0aW9uT3ZlcnJpZGVzOiBhbnkgPSBjb25maWcub3B0aW9uT3ZlcnJpZGVzO1xyXG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJGluamVjdG9yLCAkc2NlKSB7XHJcbiAgICBzdXBlcigkc2NvcGUsICRpbmplY3Rvcik7XHJcbiAgICBfLmRlZmF1bHRzKHRoaXMucGFuZWwsIGNvbmZpZy5wYW5lbERlZmF1bHRzKTtcclxuICAgIHRoaXMuZXZlbnRzLm9uKFwiZGF0YS1yZWNlaXZlZFwiLCB0aGlzLm9uRGF0YVJlY2VpdmVkLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5ldmVudHMub24oXCJkYXRhLXNuYXBzaG90LWxvYWRcIiwgdGhpcy5vbkRhdGFSZWNlaXZlZC5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuZXZlbnRzLm9uKFwiaW5pdC1lZGl0LW1vZGVcIiwgdGhpcy5vbkluaXRFZGl0TW9kZS5iaW5kKHRoaXMpKTtcclxuICAgIGlmICh0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9PT0gLTEpIHtcclxuICAgICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aDtcclxuICAgIH1cclxuICAgIHRoaXMuJHNjZSA9ICRzY2U7XHJcbiAgfVxyXG4gIG9uSW5pdEVkaXRNb2RlKCkge1xyXG4gICAgdGhpcy5hZGRFZGl0b3JUYWIoXCJQYXR0ZXJuc1wiLCBgcHVibGljL3BsdWdpbnMvJHtwbHVnaW5faWR9L3BhcnRpYWxzL3BhdHRlcm5zLmh0bWxgLCAyKTtcclxuICAgIHRoaXMuYWRkRWRpdG9yVGFiKFwiT3B0aW9uc1wiLCBgcHVibGljL3BsdWdpbnMvJHtwbHVnaW5faWR9L3BhcnRpYWxzL29wdGlvbnMuaHRtbGAsIDMpO1xyXG4gIH1cclxuICBvbkRhdGFSZWNlaXZlZChkYXRhOiBhbnkpIHtcclxuICAgIHRoaXMuZGF0YVJlY2VpdmVkID0gZGF0YTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIGxpbmsoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsKSB7XHJcbiAgICBpZiAoc2NvcGUpIHsgc2NvcGUgPSBzY29wZTsgfVxyXG4gICAgaWYgKGF0dHJzKSB7IGF0dHJzID0gYXR0cnM7IH1cclxuICAgIHRoaXMuY3RybCA9IGN0cmw7XHJcbiAgICB0aGlzLmVsZW0gPSBlbGVtO1xyXG4gIH1cclxuICBhZGRQYXR0ZXJuKCkge1xyXG4gICAgbGV0IG5ld1BhdHRlcm46IFBhdHRlcm4gPSB7XHJcbiAgICAgIG5hbWU6IFwiTmV3IFBhdHRlcm5cIixcclxuICAgICAgcGF0dGVybjogXCJec2VydmVyLipjcHUkXCIsXHJcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgZGVsaW1pdGVyOiBcIi5cIixcclxuICAgICAgdmFsdWVOYW1lOiBcImF2Z1wiLFxyXG4gICAgICByb3dfbmFtZTogdGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIgKyBcIjBcIiArIHRoaXMucGFuZWwucm93X2NvbF93cmFwcGVyLFxyXG4gICAgICBjb2xfbmFtZTogdGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIgKyBcIjFcIiArIHRoaXMucGFuZWwucm93X2NvbF93cmFwcGVyLFxyXG4gICAgICB0aHJlc2hvbGRzOiBcIjcwLDkwXCIsXHJcbiAgICAgIHRpbWVfYmFzZWRfdGhyZXNob2xkczogW10sXHJcbiAgICAgIGVuYWJsZV90aW1lX2Jhc2VkX3RocmVzaG9sZHM6IGZhbHNlLFxyXG4gICAgICBlbmFibGVfYmdDb2xvcjogZmFsc2UsXHJcbiAgICAgIGJnQ29sb3JzOiBcImdyZWVufG9yYW5nZXxyZWRcIixcclxuICAgICAgZW5hYmxlX2JnQ29sb3Jfb3ZlcnJpZGVzOiBmYWxzZSxcclxuICAgICAgYmdDb2xvcnNfb3ZlcnJpZGVzOiBcIjAtPmdyZWVufDItPnJlZHwxLT55ZWxsb3dcIixcclxuICAgICAgZW5hYmxlX1RleHRDb2xvcnM6IGZhbHNlLFxyXG4gICAgICB0ZXh0Q29sb3JzOiBcImdyZWVufG9yYW5nZXxyZWRcIixcclxuICAgICAgZW5hYmxlX1RleHRDb2xvcl9vdmVycmlkZXM6IGZhbHNlLFxyXG4gICAgICB0ZXh0Q29sb3JzX292ZXJyaWRlczogXCIwLT5ncmVlbnwyLT5yZWR8MS0+eWVsbG93XCIsXHJcbiAgICAgIGVuYWJsZV90cmFuc2Zvcm06IGZhbHNlLFxyXG4gICAgICB0cmFuc2Zvcm1fdmFsdWVzOiBcIl92YWx1ZV98X3ZhbHVlX3xfdmFsdWVfXCIsXHJcbiAgICAgIGVuYWJsZV90cmFuc2Zvcm1fb3ZlcnJpZGVzOiBmYWxzZSxcclxuICAgICAgdHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXM6IFwiMC0+ZG93bnwxLT51cFwiLFxyXG4gICAgICBkZWNpbWFsczogMixcclxuICAgICAgdG9vbHRpcFRlbXBsYXRlOiBcIlNlcmllcyA6IF9zZXJpZXNfIHwgVmFsdWUgOiBfdmFsdWVfXCIsXHJcbiAgICAgIGZvcm1hdDogXCJub25lXCIsXHJcbiAgICAgIG51bGxfY29sb3I6IFwiZGFya3JlZFwiLFxyXG4gICAgICBudWxsX3RleHRfY29sb3I6IFwid2hpdGVcIixcclxuICAgICAgbnVsbF92YWx1ZTogXCJObyBkYXRhXCIsXHJcbiAgICAgIGVuYWJsZV9jbGlja2FibGVfY2VsbHM6IGZhbHNlLFxyXG4gICAgICBjbGlja2FibGVfY2VsbHNfbGluazogXCJcIixcclxuICAgICAgZmlsdGVyOiB7XHJcbiAgICAgICAgdmFsdWVfYmVsb3c6IFwiXCIsXHJcbiAgICAgICAgdmFsdWVfYWJvdmU6IFwiXCIsXHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aGlzLnBhbmVsLnBhdHRlcm5zLnB1c2gobmV3UGF0dGVybik7XHJcbiAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9IHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoIC0gMTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIG1vdmVQYXR0ZXJuKGRpcmVjdGlvbjogU3RyaW5nLCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICBsZXQgdGVtcEVsZW1lbnQ6IFBhdHRlcm4gPSB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XTtcclxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiVVBcIikge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XSA9IHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXggLSAxXTtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleCAtIDFdID0gdGVtcEVsZW1lbnQ7XHJcbiAgICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID0gaW5kZXggLSAxO1xyXG4gICAgfVxyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJET1dOXCIpIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0gPSB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4ICsgMV07XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXggKyAxXSA9IHRlbXBFbGVtZW50O1xyXG4gICAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9IGluZGV4ICsgMTtcclxuICAgIH1cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHJlbW92ZVBhdHRlcm4oaW5kZXg6IG51bWJlcikge1xyXG4gICAgdGhpcy5wYW5lbC5wYXR0ZXJucy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSAodGhpcy5wYW5lbC5wYXR0ZXJucyAmJiB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCA+IDApID8gKHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoIC0gMSkgOiAtMTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIGNsb25lUGF0dGVybihpbmRleDogbnVtYmVyKSB7XHJcbiAgICBsZXQgY29waWVkUGF0dGVybjogUGF0dGVybiA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdKTtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMucHVzaChjb3BpZWRQYXR0ZXJuKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIGFkZF90aW1lX2Jhc2VkX3RocmVzaG9sZHMoaW5kZXg6IG51bWJlcikge1xyXG4gICAgbGV0IG5ld190aW1lX2Jhc2VkX3RocmVzaG9sZDogVGltZUJhc2VUaHJlc2hvbGQgPSB7XHJcbiAgICAgIG5hbWU6IFwiRWFybHkgbW9ybmluZyBvZiBldmVyeWRheVwiLFxyXG4gICAgICBmcm9tOiBcIjAwMDBcIixcclxuICAgICAgdG86IFwiMDUzMFwiLFxyXG4gICAgICBlbmFibGVkRGF5czogXCJTdW4sTW9uLFR1ZSxXZWQsVGh1LEZyaSxTYXRcIixcclxuICAgICAgdGhyZXNob2xkOiBcIjcwLDkwXCJcclxuICAgIH07XHJcbiAgICBpZiAoaW5kZXggPT09IHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoIHx8IGluZGV4ID09PSAtMSkge1xyXG4gICAgICB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLnRpbWVfYmFzZWRfdGhyZXNob2xkcyA9IHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4udGltZV9iYXNlZF90aHJlc2hvbGRzIHx8IFtdO1xyXG4gICAgICB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLnRpbWVfYmFzZWRfdGhyZXNob2xkcy5wdXNoKG5ld190aW1lX2Jhc2VkX3RocmVzaG9sZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS50aW1lX2Jhc2VkX3RocmVzaG9sZHMgPSB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS50aW1lX2Jhc2VkX3RocmVzaG9sZHMgfHwgW107XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdLnRpbWVfYmFzZWRfdGhyZXNob2xkcy5wdXNoKG5ld190aW1lX2Jhc2VkX3RocmVzaG9sZCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICByZW1vdmVfdGltZV9iYXNlZF90aHJlc2hvbGRzKHBhdHRlcm5JbmRleDogbnVtYmVyLCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICBpZiAocGF0dGVybkluZGV4ID09PSB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCB8fCBwYXR0ZXJuSW5kZXggPT09IC0xKSB7XHJcbiAgICAgIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4udGltZV9iYXNlZF90aHJlc2hvbGRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW3BhdHRlcm5JbmRleF0udGltZV9iYXNlZF90aHJlc2hvbGRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBpbnZlcnNlQkdDb2xvcnMoaW5kZXg6IG51bWJlcikge1xyXG4gICAgaWYgKGluZGV4ID09PSB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCB8fCBpbmRleCA9PT0gLTEpIHtcclxuICAgICAgdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybi5iZ0NvbG9ycyA9IHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4uYmdDb2xvcnMuc3BsaXQoXCJ8XCIpLnJldmVyc2UoKS5qb2luKFwifFwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdLmJnQ29sb3JzID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0uYmdDb2xvcnMuc3BsaXQoXCJ8XCIpLnJldmVyc2UoKS5qb2luKFwifFwiKTtcclxuICAgIH1cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIGludmVyc2VUZXh0Q29sb3JzKGluZGV4OiBudW1iZXIpIHtcclxuICAgIGlmIChpbmRleCA9PT0gdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggfHwgaW5kZXggPT09IC0xKSB7XHJcbiAgICAgIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4udGV4dENvbG9ycyA9IHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4udGV4dENvbG9ycy5zcGxpdChcInxcIikucmV2ZXJzZSgpLmpvaW4oXCJ8XCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0udGV4dENvbG9ycyA9IHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdLnRleHRDb2xvcnMuc3BsaXQoXCJ8XCIpLnJldmVyc2UoKS5qb2luKFwifFwiKTtcclxuICAgIH1cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIGludmVyc2VUcmFuc2Zvcm1WYWx1ZXMoaW5kZXg6IG51bWJlcikge1xyXG4gICAgaWYgKGluZGV4ID09PSB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCB8fCBpbmRleCA9PT0gLTEpIHtcclxuICAgICAgdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybi50cmFuc2Zvcm1fdmFsdWVzID0gdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybi50cmFuc2Zvcm1fdmFsdWVzLnNwbGl0KFwifFwiKS5yZXZlcnNlKCkuam9pbihcInxcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS50cmFuc2Zvcm1fdmFsdWVzID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0udHJhbnNmb3JtX3ZhbHVlcy5zcGxpdChcInxcIikucmV2ZXJzZSgpLmpvaW4oXCJ8XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHNldFVuaXRGb3JtYXQoc3ViSXRlbSwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgaWYgKGluZGV4ID09PSB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCB8fCBpbmRleCA9PT0gdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybi5mb3JtYXQgPSBzdWJJdGVtLnZhbHVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0uZm9ybWF0ID0gc3ViSXRlbS52YWx1ZTtcclxuICAgIH1cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIGxpbWl0VGV4dCh0ZXh0OiBTdHJpbmcsIG1heGxlbmd0aDogbnVtYmVyKSB7XHJcbiAgICBpZiAodGV4dC5zcGxpdChcIlwiKS5sZW5ndGggPiBtYXhsZW5ndGgpIHtcclxuICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDAsIG1heGxlbmd0aCAtIDMpICsgXCIuLi5cIjtcclxuICAgIH1cclxuICAgIHJldHVybiB0ZXh0O1xyXG4gIH1cclxuICBzZXRPcHRpb25PdmVycmlkZShwcm9wZXJ0eU5hbWU6IFN0cmluZywgdmFsdWU6IFN0cmluZywgdGV4dDogU3RyaW5nKSB7XHJcbiAgICBsZXQgbmV3T3ZlcnJpZGVzID0gW107XHJcbiAgICBpZiAoXy5maWx0ZXIodGhpcy5wYW5lbC5jdXJyZW50T3B0aW9uT3ZlcnJpZGVzLCBvID0+IG8ucHJvcGVydHlOYW1lID09PSBwcm9wZXJ0eU5hbWUpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBuZXdPdmVycmlkZXMucHVzaCh7XHJcbiAgICAgICAgcHJvcGVydHlOYW1lLFxyXG4gICAgICAgIHZhbHVlLFxyXG4gICAgICAgIHRleHRcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5wYW5lbC5jdXJyZW50T3B0aW9uT3ZlcnJpZGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgXy5lYWNoKHRoaXMucGFuZWwuY3VycmVudE9wdGlvbk92ZXJyaWRlcywgbyA9PiB7XHJcbiAgICAgICAgaWYgKG8ucHJvcGVydHlOYW1lID09PSBwcm9wZXJ0eU5hbWUpIHtcclxuICAgICAgICAgIG5ld092ZXJyaWRlcy5wdXNoKHtcclxuICAgICAgICAgICAgcHJvcGVydHlOYW1lLFxyXG4gICAgICAgICAgICB2YWx1ZSxcclxuICAgICAgICAgICAgdGV4dFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5ld092ZXJyaWRlcy5wdXNoKG8pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnBhbmVsLmN1cnJlbnRPcHRpb25PdmVycmlkZXMgPSBuZXdPdmVycmlkZXM7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICByZW1vdmVPcHRpb25PdmVycmlkZShvcHRpb246IFN0cmluZykge1xyXG4gICAgbGV0IG5ld092ZXJyaWRlcyA9IFtdO1xyXG4gICAgaWYgKHRoaXMucGFuZWwuY3VycmVudE9wdGlvbk92ZXJyaWRlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIF8uZWFjaCh0aGlzLnBhbmVsLmN1cnJlbnRPcHRpb25PdmVycmlkZXMsIG8gPT4ge1xyXG4gICAgICAgIGlmIChvLnByb3BlcnR5TmFtZSAhPT0gb3B0aW9uKSB7XHJcbiAgICAgICAgICBuZXdPdmVycmlkZXMucHVzaChvKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wYW5lbC5jdXJyZW50T3B0aW9uT3ZlcnJpZGVzID0gbmV3T3ZlcnJpZGVzO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgYWRqdXN0UGFuZWxIZWlnaHQocGFuZWxIZWlnaHQ6IG51bWJlcikge1xyXG4gICAgbGV0IHJvb3RFbGVtID0gdGhpcy5lbGVtLmZpbmQoXCIudGFibGUtcGFuZWwtc2Nyb2xsXCIpO1xyXG4gICAgbGV0IG1heGhlaWdodG9mcGFuZWwgPSB0aGlzLnBhbmVsLmRlYnVnX21vZGUgPyBwYW5lbEhlaWdodCAtIDcxIDogcGFuZWxIZWlnaHQgLSAzMTtcclxuICAgIHJvb3RFbGVtLmNzcyh7IFwibWF4LWhlaWdodFwiOiBtYXhoZWlnaHRvZnBhbmVsICsgXCJweFwiIH0pO1xyXG4gIH1cclxufVxyXG5cclxuR3JhZmFuYUJvb21UYWJsZUN0cmwucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICBsZXQgcGFuZWxPcHRpb25zID0ge1xyXG4gICAgcm93X2NvbF93cmFwcGVyOiB0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlcixcclxuICAgIG5vX21hdGNoX3RleHQ6IHRoaXMucGFuZWwubm9fbWF0Y2hfdGV4dFxyXG4gIH07XHJcbiAgbGV0IHJlbmRlcmluZ19vcHRpb25zID0ge1xyXG4gICAgZGVmYXVsdF90aXRsZV9mb3Jfcm93czogdGhpcy5wYW5lbC5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzLFxyXG4gICAgc2hvd19mb290ZXJzOiBnZXRPcHRpb25PdmVycmlkZSh0aGlzLnBhbmVsLmN1cnJlbnRPcHRpb25PdmVycmlkZXMsIFwiU0hPV19GT09URVJTXCIpID09PSBcInRydWVcIixcclxuICAgIGhpZGVfaGVhZGVyczogZ2V0T3B0aW9uT3ZlcnJpZGUodGhpcy5wYW5lbC5jdXJyZW50T3B0aW9uT3ZlcnJpZGVzLCBcIkhJREVfSEVBREVSU1wiKSA9PT0gXCJ0cnVlXCIsXHJcbiAgICBoaWRlX2ZpcnN0X2NvbHVtbjogZ2V0T3B0aW9uT3ZlcnJpZGUodGhpcy5wYW5lbC5jdXJyZW50T3B0aW9uT3ZlcnJpZGVzLCBcIkhJREVfRklSU1RfQ09MVU1OXCIpID09PSBcInRydWVcIixcclxuICAgIHRleHRfYWxpZ25fdGFibGVfaGVhZGVyOiBnZXRPcHRpb25PdmVycmlkZSh0aGlzLnBhbmVsLmN1cnJlbnRPcHRpb25PdmVycmlkZXMsIFwiVEVYVF9BTElHTl9UQUJMRV9IRUFERVJcIiksXHJcbiAgICB0ZXh0X2FsaWduX2ZpcnN0X2NvbHVtbjogZ2V0T3B0aW9uT3ZlcnJpZGUodGhpcy5wYW5lbC5jdXJyZW50T3B0aW9uT3ZlcnJpZGVzLCBcIlRFWFRfQUxJR05fRklSU1RfQ09MVU1OXCIpLFxyXG4gICAgdGV4dF9hbGlnbl90YWJsZV9jZWxsczogZ2V0T3B0aW9uT3ZlcnJpZGUodGhpcy5wYW5lbC5jdXJyZW50T3B0aW9uT3ZlcnJpZGVzLCBcIlRFWFRfQUxJR05fVEFCTEVfQ0VMTFNcIiksXHJcbiAgfTtcclxuICBsZXQgb3V0cHV0ID0gY29tcHV0ZVJlbmRlcmluZ0RhdGEodGhpcy5kYXRhUmVjZWl2ZWQsIHRoaXMucGFuZWwucGF0dGVybnMsIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4gfHwgY29uZmlnLnBhbmVsRGVmYXVsdHMuZGVmYXVsdFBhdHRlcm4sIHBhbmVsT3B0aW9ucywgcmVuZGVyaW5nX29wdGlvbnMsIHRoaXMucGFuZWwuZGVidWdfbW9kZSk7XHJcbiAgaWYgKG91dHB1dC5lcnJvcikge1xyXG4gICAgdGhpcy5wYW5lbC5lcnJvciA9IG91dHB1dC5lcnJvcjtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhpcy5lbGVtLmZpbmQoXCIjYm9vbXRhYmxlX291dHB1dF9ib2R5X2hlYWRlcnNcIikuaHRtbChvdXRwdXQub3V0cHV0X2h0bWwuaGVhZGVyKTtcclxuICAgIHRoaXMuZWxlbS5maW5kKFwiI2Jvb210YWJsZV9vdXRwdXRfYm9keVwiKS5odG1sKG91dHB1dC5vdXRwdXRfaHRtbC5ib2R5KTtcclxuICAgIHRoaXMuZWxlbS5maW5kKFwiI2Jvb210YWJsZV9vdXRwdXRfYm9keV9mb290ZXJzXCIpLmh0bWwob3V0cHV0Lm91dHB1dF9odG1sLmZvb3Rlcik7XHJcbiAgICB0aGlzLmVsZW0uZmluZChcIltkYXRhLXRvZ2dsZT0ndG9vbHRpcCddXCIpLnRvb2x0aXAoe1xyXG4gICAgICBib3VuZGFyeTogXCJzY3JvbGxQYXJlbnRcIlxyXG4gICAgfSk7XHJcbiAgICBpZiAodGhpcy5wYW5lbC5kZWJ1Z19tb2RlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuZWxlbS5maW5kKFwiI2Jvb210YWJsZV9kZWJ1Z190YWJsZV9ob2xkZXJcIikuaHRtbChvdXRwdXQub3V0cHV0X2h0bWwuZGVidWcpO1xyXG4gICAgfVxyXG4gIH1cclxuICB0aGlzLmFkanVzdFBhbmVsSGVpZ2h0KHRoaXMuY3RybC5oZWlnaHQpO1xyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICBHcmFmYW5hQm9vbVRhYmxlQ3RybCBhcyBQYW5lbEN0cmxcclxufTtcclxuIl19