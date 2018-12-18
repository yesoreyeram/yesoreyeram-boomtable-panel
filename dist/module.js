System.register(["lodash", "app/core/utils/kbn", "app/plugins/sdk", "./app/app"], function (exports_1, context_1) {
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
    var lodash_1, kbn_1, sdk_1, app_1, GrafanaBoomTableCtrl;
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
                GrafanaBoomTableCtrl.prototype.getOptionOverride = function (currentOptionOverrides, optionOverrides, propertyName) {
                    var option = lodash_1.default.find(currentOptionOverrides, function (o) { return o.propertyName === propertyName; });
                    var default_option = lodash_1.default.find(optionOverrides, function (o) { return o.propertyName === propertyName; });
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
                var panelOptions = {
                    row_col_wrapper: this.panel.row_col_wrapper,
                    no_match_text: this.panel.no_match_text
                };
                var rendering_options = {
                    default_title_for_rows: this.panel.default_title_for_rows,
                    show_footers: this.getOptionOverride(this.panel.currentOptionOverrides, app_1.config.optionOverrides, "SHOW_FOOTERS") === "true",
                    hide_headers: this.getOptionOverride(this.panel.currentOptionOverrides, app_1.config.optionOverrides, "HIDE_HEADERS") === "true",
                    hide_first_column: this.getOptionOverride(this.panel.currentOptionOverrides, app_1.config.optionOverrides, "HIDE_FIRST_COLUMN") === "true",
                    text_align_table_header: this.getOptionOverride(this.panel.currentOptionOverrides, app_1.config.optionOverrides, "TEXT_ALIGN_TABLE_HEADER"),
                    text_align_first_column: this.getOptionOverride(this.panel.currentOptionOverrides, app_1.config.optionOverrides, "TEXT_ALIGN_FIRST_COLUMN"),
                    text_align_table_cells: this.getOptionOverride(this.panel.currentOptionOverrides, app_1.config.optionOverrides, "TEXT_ALIGN_TABLE_CELLS"),
                };
                var output = app_1.computeRenderingData(this.dataReceived, this.panel.patterns, this.panel.defaultPattern || app_1.config.panelDefaults.defaultPattern, panelOptions, rendering_options);
                if (output.error) {
                    this.panel.error = output.error;
                }
                else {
                    this.elem.find("#boomtable_output_body_headers").html(output.output_html.header);
                    this.elem.find("#boomtable_output_body").html(output.output_html.body);
                    this.elem.find("#boomtable_output_body_footers").html(output.output_html.footer);
                    this.elem.find("[data-toggle='tooltip']").tooltip();
                    if (this.panel.debug_mode === true) {
                        this.elem.find("#boomtable_debug_table_holder").html(output.output_html.debug);
                    }
                }
                this.adjustPanelHeight(this.ctrl.height);
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFRQSxtQkFBYSxDQUFDO2dCQUNaLElBQUksRUFBRSxhQUFXLGVBQVMsMEJBQXVCO2dCQUNqRCxLQUFLLEVBQUUsYUFBVyxlQUFTLDJCQUF3QjthQUNwRCxDQUFDLENBQUM7O2dCQUVnQyx3Q0FBZ0I7Z0JBU2pELDhCQUFZLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSTtvQkFBbkMsWUFDRSxrQkFBTSxNQUFNLEVBQUUsU0FBUyxDQUFDLFNBU3pCO29CQWJELHNCQUFnQixHQUFzQixZQUFNLENBQUMsZ0JBQWdCLENBQUM7b0JBQzlELGlCQUFXLEdBQVEsYUFBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN4QyxxQkFBZSxHQUFRLFlBQU0sQ0FBQyxlQUFlLENBQUM7b0JBRzVDLGdCQUFDLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsWUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUM3QyxLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztvQkFDaEUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztvQkFDckUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztvQkFDakUsSUFBSSxLQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixLQUFLLENBQUMsQ0FBQyxFQUFFO3dCQUN4QyxLQUFJLENBQUMsS0FB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QyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNoRjtpQkFDRjtnQkFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi9ub2RlX21vZHVsZXMvZ3JhZmFuYS1zZGstbW9ja3MvYXBwL2hlYWRlcnMvY29tbW9uLmQudHNcIiAvPlxyXG5cclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQga2JuIGZyb20gXCJhcHAvY29yZS91dGlscy9rYm5cIjtcclxuaW1wb3J0IHsgbG9hZFBsdWdpbkNzcywgTWV0cmljc1BhbmVsQ3RybCB9IGZyb20gXCJhcHAvcGx1Z2lucy9zZGtcIjtcclxuaW1wb3J0IHsgUGF0dGVybiwgVGltZUJhc2VUaHJlc2hvbGQsIFZhbHVlTmFtZU9wdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZXMvaW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgeyBwbHVnaW5faWQsIGNvbmZpZywgY29tcHV0ZVJlbmRlcmluZ0RhdGEgfSBmcm9tIFwiLi9hcHAvYXBwXCI7XHJcblxyXG5sb2FkUGx1Z2luQ3NzKHtcclxuICBkYXJrOiBgcGx1Z2lucy8ke3BsdWdpbl9pZH0vY3NzL2RlZmF1bHQuZGFyay5jc3NgLFxyXG4gIGxpZ2h0OiBgcGx1Z2lucy8ke3BsdWdpbl9pZH0vY3NzL2RlZmF1bHQubGlnaHQuY3NzYFxyXG59KTtcclxuXHJcbmNsYXNzIEdyYWZhbmFCb29tVGFibGVDdHJsIGV4dGVuZHMgTWV0cmljc1BhbmVsQ3RybCB7XHJcbiAgc3RhdGljIHRlbXBsYXRlVXJsOiBzdHJpbmcgPSBcInBhcnRpYWxzL21vZHVsZS5odG1sXCI7XHJcbiAgY3RybDogYW55O1xyXG4gIGVsZW06IGFueTtcclxuICAkc2NlOiBhbnk7XHJcbiAgZGF0YVJlY2VpdmVkOiBhbnk7XHJcbiAgdmFsdWVOYW1lT3B0aW9uczogVmFsdWVOYW1lT3B0aW9uW10gPSBjb25maWcudmFsdWVOYW1lT3B0aW9ucztcclxuICB1bml0Rm9ybWF0czogYW55ID0ga2JuLmdldFVuaXRGb3JtYXRzKCk7XHJcbiAgb3B0aW9uT3ZlcnJpZGVzOiBhbnkgPSBjb25maWcub3B0aW9uT3ZlcnJpZGVzO1xyXG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJGluamVjdG9yLCAkc2NlKSB7XHJcbiAgICBzdXBlcigkc2NvcGUsICRpbmplY3Rvcik7XHJcbiAgICBfLmRlZmF1bHRzKHRoaXMucGFuZWwsIGNvbmZpZy5wYW5lbERlZmF1bHRzKTtcclxuICAgIHRoaXMuZXZlbnRzLm9uKFwiZGF0YS1yZWNlaXZlZFwiLCB0aGlzLm9uRGF0YVJlY2VpdmVkLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5ldmVudHMub24oXCJkYXRhLXNuYXBzaG90LWxvYWRcIiwgdGhpcy5vbkRhdGFSZWNlaXZlZC5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuZXZlbnRzLm9uKFwiaW5pdC1lZGl0LW1vZGVcIiwgdGhpcy5vbkluaXRFZGl0TW9kZS5iaW5kKHRoaXMpKTtcclxuICAgIGlmICh0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9PT0gLTEpIHtcclxuICAgICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aDtcclxuICAgIH1cclxuICAgIHRoaXMuJHNjZSA9ICRzY2U7XHJcbiAgfVxyXG4gIG9uSW5pdEVkaXRNb2RlKCkge1xyXG4gICAgdGhpcy5hZGRFZGl0b3JUYWIoXCJQYXR0ZXJuc1wiLCBgcHVibGljL3BsdWdpbnMvJHtwbHVnaW5faWR9L3BhcnRpYWxzL3BhdHRlcm5zLmh0bWxgLCAyKTtcclxuICAgIHRoaXMuYWRkRWRpdG9yVGFiKFwiT3B0aW9uc1wiLCBgcHVibGljL3BsdWdpbnMvJHtwbHVnaW5faWR9L3BhcnRpYWxzL29wdGlvbnMuaHRtbGAsIDMpO1xyXG4gIH1cclxuICBvbkRhdGFSZWNlaXZlZChkYXRhOiBhbnkpIHtcclxuICAgIHRoaXMuZGF0YVJlY2VpdmVkID0gZGF0YTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIGxpbmsoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsKSB7XHJcbiAgICBpZiAoc2NvcGUpIHsgc2NvcGUgPSBzY29wZTsgfVxyXG4gICAgaWYgKGF0dHJzKSB7IGF0dHJzID0gYXR0cnM7IH1cclxuICAgIHRoaXMuY3RybCA9IGN0cmw7XHJcbiAgICB0aGlzLmVsZW0gPSBlbGVtO1xyXG4gIH1cclxuICBhZGRQYXR0ZXJuKCkge1xyXG4gICAgbGV0IG5ld1BhdHRlcm46IFBhdHRlcm4gPSB7XHJcbiAgICAgIG5hbWU6IFwiTmV3IFBhdHRlcm5cIixcclxuICAgICAgcGF0dGVybjogXCJec2VydmVyLipjcHUkXCIsXHJcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgZGVsaW1pdGVyOiBcIi5cIixcclxuICAgICAgdmFsdWVOYW1lOiBcImF2Z1wiLFxyXG4gICAgICByb3dfbmFtZTogdGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIgKyBcIjBcIiArIHRoaXMucGFuZWwucm93X2NvbF93cmFwcGVyLFxyXG4gICAgICBjb2xfbmFtZTogdGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIgKyBcIjFcIiArIHRoaXMucGFuZWwucm93X2NvbF93cmFwcGVyLFxyXG4gICAgICB0aHJlc2hvbGRzOiBcIjcwLDkwXCIsXHJcbiAgICAgIHRpbWVfYmFzZWRfdGhyZXNob2xkczogW10sXHJcbiAgICAgIGVuYWJsZV90aW1lX2Jhc2VkX3RocmVzaG9sZHM6IGZhbHNlLFxyXG4gICAgICBlbmFibGVfYmdDb2xvcjogZmFsc2UsXHJcbiAgICAgIGJnQ29sb3JzOiBcImdyZWVufG9yYW5nZXxyZWRcIixcclxuICAgICAgZW5hYmxlX2JnQ29sb3Jfb3ZlcnJpZGVzOiBmYWxzZSxcclxuICAgICAgYmdDb2xvcnNfb3ZlcnJpZGVzOiBcIjAtPmdyZWVufDItPnJlZHwxLT55ZWxsb3dcIixcclxuICAgICAgZW5hYmxlX1RleHRDb2xvcnM6IGZhbHNlLFxyXG4gICAgICB0ZXh0Q29sb3JzOiBcImdyZWVufG9yYW5nZXxyZWRcIixcclxuICAgICAgZW5hYmxlX1RleHRDb2xvcl9vdmVycmlkZXM6IGZhbHNlLFxyXG4gICAgICB0ZXh0Q29sb3JzX292ZXJyaWRlczogXCIwLT5ncmVlbnwyLT5yZWR8MS0+eWVsbG93XCIsXHJcbiAgICAgIGVuYWJsZV90cmFuc2Zvcm06IGZhbHNlLFxyXG4gICAgICB0cmFuc2Zvcm1fdmFsdWVzOiBcIl92YWx1ZV98X3ZhbHVlX3xfdmFsdWVfXCIsXHJcbiAgICAgIGVuYWJsZV90cmFuc2Zvcm1fb3ZlcnJpZGVzOiBmYWxzZSxcclxuICAgICAgdHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXM6IFwiMC0+ZG93bnwxLT51cFwiLFxyXG4gICAgICBkZWNpbWFsczogMixcclxuICAgICAgdG9vbHRpcFRlbXBsYXRlOiBcIlJvdyBOYW1lIDogX3Jvd19uYW1lXyA8YnIvPkNvbCBOYW1lIDogX2NvbF9uYW1lXyA8YnIvPlZhbHVlIDogX3ZhbHVlX1wiLFxyXG4gICAgICBmb3JtYXQ6IFwibm9uZVwiLFxyXG4gICAgICBudWxsX2NvbG9yOiBcImRhcmtyZWRcIixcclxuICAgICAgbnVsbF90ZXh0X2NvbG9yOiBcIndoaXRlXCIsXHJcbiAgICAgIG51bGxfdmFsdWU6IFwiTm8gZGF0YVwiLFxyXG4gICAgICBlbmFibGVfY2xpY2thYmxlX2NlbGxzOiBmYWxzZSxcclxuICAgICAgY2xpY2thYmxlX2NlbGxzX2xpbms6IFwiXCIsXHJcbiAgICAgIGZpbHRlcjoge1xyXG4gICAgICAgIHZhbHVlX2JlbG93OiBcIlwiLFxyXG4gICAgICAgIHZhbHVlX2Fib3ZlOiBcIlwiLFxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhpcy5wYW5lbC5wYXR0ZXJucy5wdXNoKG5ld1BhdHRlcm4pO1xyXG4gICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCAtIDE7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBtb3ZlUGF0dGVybihkaXJlY3Rpb246IFN0cmluZywgaW5kZXg6IG51bWJlcikge1xyXG4gICAgbGV0IHRlbXBFbGVtZW50OiBQYXR0ZXJuID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF07XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcIlVQXCIpIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0gPSB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4IC0gMV07XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXggLSAxXSA9IHRlbXBFbGVtZW50O1xyXG4gICAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9IGluZGV4IC0gMTtcclxuICAgIH1cclxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiRE9XTlwiKSB7XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleCArIDFdO1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4ICsgMV0gPSB0ZW1wRWxlbWVudDtcclxuICAgICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSBpbmRleCArIDE7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICByZW1vdmVQYXR0ZXJuKGluZGV4OiBudW1iZXIpIHtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID0gKHRoaXMucGFuZWwucGF0dGVybnMgJiYgdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggPiAwKSA/ICh0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCAtIDEpIDogLTE7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBjbG9uZVBhdHRlcm4oaW5kZXg6IG51bWJlcikge1xyXG4gICAgbGV0IGNvcGllZFBhdHRlcm46IFBhdHRlcm4gPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XSk7XHJcbiAgICB0aGlzLnBhbmVsLnBhdHRlcm5zLnB1c2goY29waWVkUGF0dGVybik7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBhZGRfdGltZV9iYXNlZF90aHJlc2hvbGRzKGluZGV4OiBudW1iZXIpIHtcclxuICAgIGxldCBuZXdfdGltZV9iYXNlZF90aHJlc2hvbGQ6IFRpbWVCYXNlVGhyZXNob2xkID0ge1xyXG4gICAgICBuYW1lOiBcIkVhcmx5IG1vcm5pbmcgb2YgZXZlcnlkYXlcIixcclxuICAgICAgZnJvbTogXCIwMDAwXCIsXHJcbiAgICAgIHRvOiBcIjA1MzBcIixcclxuICAgICAgZW5hYmxlZERheXM6IFwiU3VuLE1vbixUdWUsV2VkLFRodSxGcmksU2F0XCIsXHJcbiAgICAgIHRocmVzaG9sZDogXCI3MCw5MFwiXHJcbiAgICB9O1xyXG4gICAgaWYgKGluZGV4ID09PSB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCB8fCBpbmRleCA9PT0gLTEpIHtcclxuICAgICAgdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybi50aW1lX2Jhc2VkX3RocmVzaG9sZHMgPSB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLnRpbWVfYmFzZWRfdGhyZXNob2xkcyB8fCBbXTtcclxuICAgICAgdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybi50aW1lX2Jhc2VkX3RocmVzaG9sZHMucHVzaChuZXdfdGltZV9iYXNlZF90aHJlc2hvbGQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0udGltZV9iYXNlZF90aHJlc2hvbGRzID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0udGltZV9iYXNlZF90aHJlc2hvbGRzIHx8IFtdO1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS50aW1lX2Jhc2VkX3RocmVzaG9sZHMucHVzaChuZXdfdGltZV9iYXNlZF90aHJlc2hvbGQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgcmVtb3ZlX3RpbWVfYmFzZWRfdGhyZXNob2xkcyhwYXR0ZXJuSW5kZXg6IG51bWJlciwgaW5kZXg6IG51bWJlcikge1xyXG4gICAgaWYgKHBhdHRlcm5JbmRleCA9PT0gdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggfHwgcGF0dGVybkluZGV4ID09PSAtMSkge1xyXG4gICAgICB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLnRpbWVfYmFzZWRfdGhyZXNob2xkcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1twYXR0ZXJuSW5kZXhdLnRpbWVfYmFzZWRfdGhyZXNob2xkcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgaW52ZXJzZUJHQ29sb3JzKGluZGV4OiBudW1iZXIpIHtcclxuICAgIGlmIChpbmRleCA9PT0gdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggfHwgaW5kZXggPT09IC0xKSB7XHJcbiAgICAgIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4uYmdDb2xvcnMgPSB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLmJnQ29sb3JzLnNwbGl0KFwifFwiKS5yZXZlcnNlKCkuam9pbihcInxcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS5iZ0NvbG9ycyA9IHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdLmJnQ29sb3JzLnNwbGl0KFwifFwiKS5yZXZlcnNlKCkuam9pbihcInxcIik7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBpbnZlcnNlVGV4dENvbG9ycyhpbmRleDogbnVtYmVyKSB7XHJcbiAgICBpZiAoaW5kZXggPT09IHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoIHx8IGluZGV4ID09PSAtMSkge1xyXG4gICAgICB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLnRleHRDb2xvcnMgPSB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLnRleHRDb2xvcnMuc3BsaXQoXCJ8XCIpLnJldmVyc2UoKS5qb2luKFwifFwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdLnRleHRDb2xvcnMgPSB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS50ZXh0Q29sb3JzLnNwbGl0KFwifFwiKS5yZXZlcnNlKCkuam9pbihcInxcIik7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBpbnZlcnNlVHJhbnNmb3JtVmFsdWVzKGluZGV4OiBudW1iZXIpIHtcclxuICAgIGlmIChpbmRleCA9PT0gdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggfHwgaW5kZXggPT09IC0xKSB7XHJcbiAgICAgIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4udHJhbnNmb3JtX3ZhbHVlcyA9IHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4udHJhbnNmb3JtX3ZhbHVlcy5zcGxpdChcInxcIikucmV2ZXJzZSgpLmpvaW4oXCJ8XCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0udHJhbnNmb3JtX3ZhbHVlcyA9IHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdLnRyYW5zZm9ybV92YWx1ZXMuc3BsaXQoXCJ8XCIpLnJldmVyc2UoKS5qb2luKFwifFwiKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBzZXRVbml0Rm9ybWF0KHN1Ykl0ZW0sIGluZGV4OiBudW1iZXIpIHtcclxuICAgIGlmIChpbmRleCA9PT0gdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggfHwgaW5kZXggPT09IHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4uZm9ybWF0ID0gc3ViSXRlbS52YWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdLmZvcm1hdCA9IHN1Ykl0ZW0udmFsdWU7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBsaW1pdFRleHQodGV4dDogU3RyaW5nLCBtYXhsZW5ndGg6IG51bWJlcikge1xyXG4gICAgaWYgKHRleHQuc3BsaXQoXCJcIikubGVuZ3RoID4gbWF4bGVuZ3RoKSB7XHJcbiAgICAgIHRleHQgPSB0ZXh0LnN1YnN0cmluZygwLCBtYXhsZW5ndGggLSAzKSArIFwiLi4uXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGV4dDtcclxuICB9XHJcbiAgZ2V0T3B0aW9uT3ZlcnJpZGUoY3VycmVudE9wdGlvbk92ZXJyaWRlcywgb3B0aW9uT3ZlcnJpZGVzLCBwcm9wZXJ0eU5hbWU6IFN0cmluZykge1xyXG4gICAgbGV0IG9wdGlvbiA9IF8uZmluZChjdXJyZW50T3B0aW9uT3ZlcnJpZGVzLCBvID0+IG8ucHJvcGVydHlOYW1lID09PSBwcm9wZXJ0eU5hbWUpO1xyXG4gICAgbGV0IGRlZmF1bHRfb3B0aW9uID0gXy5maW5kKG9wdGlvbk92ZXJyaWRlcywgbyA9PiBvLnByb3BlcnR5TmFtZSA9PT0gcHJvcGVydHlOYW1lKTtcclxuICAgIGlmIChvcHRpb24pIHtcclxuICAgICAgcmV0dXJuIG9wdGlvbi52YWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBkZWZhdWx0X29wdGlvbi5kZWZhdWx0VmFsdWU7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHNldE9wdGlvbk92ZXJyaWRlKHByb3BlcnR5TmFtZTogU3RyaW5nLCB2YWx1ZTogU3RyaW5nLCB0ZXh0OiBTdHJpbmcpIHtcclxuICAgIGxldCBuZXdPdmVycmlkZXMgPSBbXTtcclxuICAgIGlmIChfLmZpbHRlcih0aGlzLnBhbmVsLmN1cnJlbnRPcHRpb25PdmVycmlkZXMsIG8gPT4gby5wcm9wZXJ0eU5hbWUgPT09IHByb3BlcnR5TmFtZSkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIG5ld092ZXJyaWRlcy5wdXNoKHtcclxuICAgICAgICBwcm9wZXJ0eU5hbWUsXHJcbiAgICAgICAgdmFsdWUsXHJcbiAgICAgICAgdGV4dFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnBhbmVsLmN1cnJlbnRPcHRpb25PdmVycmlkZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICBfLmVhY2godGhpcy5wYW5lbC5jdXJyZW50T3B0aW9uT3ZlcnJpZGVzLCBvID0+IHtcclxuICAgICAgICBpZiAoby5wcm9wZXJ0eU5hbWUgPT09IHByb3BlcnR5TmFtZSkge1xyXG4gICAgICAgICAgbmV3T3ZlcnJpZGVzLnB1c2goe1xyXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWUsXHJcbiAgICAgICAgICAgIHZhbHVlLFxyXG4gICAgICAgICAgICB0ZXh0XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmV3T3ZlcnJpZGVzLnB1c2gobyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoaXMucGFuZWwuY3VycmVudE9wdGlvbk92ZXJyaWRlcyA9IG5ld092ZXJyaWRlcztcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHJlbW92ZU9wdGlvbk92ZXJyaWRlKG9wdGlvbjogU3RyaW5nKSB7XHJcbiAgICBsZXQgbmV3T3ZlcnJpZGVzID0gW107XHJcbiAgICBpZiAodGhpcy5wYW5lbC5jdXJyZW50T3B0aW9uT3ZlcnJpZGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgXy5lYWNoKHRoaXMucGFuZWwuY3VycmVudE9wdGlvbk92ZXJyaWRlcywgbyA9PiB7XHJcbiAgICAgICAgaWYgKG8ucHJvcGVydHlOYW1lICE9PSBvcHRpb24pIHtcclxuICAgICAgICAgIG5ld092ZXJyaWRlcy5wdXNoKG8pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnBhbmVsLmN1cnJlbnRPcHRpb25PdmVycmlkZXMgPSBuZXdPdmVycmlkZXM7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBhZGp1c3RQYW5lbEhlaWdodChwYW5lbEhlaWdodDogbnVtYmVyKSB7XHJcbiAgICBsZXQgcm9vdEVsZW0gPSB0aGlzLmVsZW0uZmluZChcIi50YWJsZS1wYW5lbC1zY3JvbGxcIik7XHJcbiAgICBsZXQgbWF4aGVpZ2h0b2ZwYW5lbCA9IHRoaXMucGFuZWwuZGVidWdfbW9kZSA/IHBhbmVsSGVpZ2h0IC0gNzEgOiBwYW5lbEhlaWdodCAtIDMxO1xyXG4gICAgcm9vdEVsZW0uY3NzKHsgXCJtYXgtaGVpZ2h0XCI6IG1heGhlaWdodG9mcGFuZWwgKyBcInB4XCIgfSk7XHJcbiAgfVxyXG59XHJcblxyXG5HcmFmYW5hQm9vbVRhYmxlQ3RybC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gIGxldCBwYW5lbE9wdGlvbnMgPSB7XHJcbiAgICByb3dfY29sX3dyYXBwZXI6IHRoaXMucGFuZWwucm93X2NvbF93cmFwcGVyLFxyXG4gICAgbm9fbWF0Y2hfdGV4dDogdGhpcy5wYW5lbC5ub19tYXRjaF90ZXh0XHJcbiAgfTtcclxuICBsZXQgcmVuZGVyaW5nX29wdGlvbnMgPSB7XHJcbiAgICBkZWZhdWx0X3RpdGxlX2Zvcl9yb3dzOiB0aGlzLnBhbmVsLmRlZmF1bHRfdGl0bGVfZm9yX3Jvd3MsXHJcbiAgICBzaG93X2Zvb3RlcnM6IHRoaXMuZ2V0T3B0aW9uT3ZlcnJpZGUodGhpcy5wYW5lbC5jdXJyZW50T3B0aW9uT3ZlcnJpZGVzLCBjb25maWcub3B0aW9uT3ZlcnJpZGVzLCBcIlNIT1dfRk9PVEVSU1wiKSA9PT0gXCJ0cnVlXCIsXHJcbiAgICBoaWRlX2hlYWRlcnM6IHRoaXMuZ2V0T3B0aW9uT3ZlcnJpZGUodGhpcy5wYW5lbC5jdXJyZW50T3B0aW9uT3ZlcnJpZGVzLCBjb25maWcub3B0aW9uT3ZlcnJpZGVzLCBcIkhJREVfSEVBREVSU1wiKSA9PT0gXCJ0cnVlXCIsXHJcbiAgICBoaWRlX2ZpcnN0X2NvbHVtbjogdGhpcy5nZXRPcHRpb25PdmVycmlkZSh0aGlzLnBhbmVsLmN1cnJlbnRPcHRpb25PdmVycmlkZXMsIGNvbmZpZy5vcHRpb25PdmVycmlkZXMsIFwiSElERV9GSVJTVF9DT0xVTU5cIikgPT09IFwidHJ1ZVwiLFxyXG4gICAgdGV4dF9hbGlnbl90YWJsZV9oZWFkZXI6IHRoaXMuZ2V0T3B0aW9uT3ZlcnJpZGUodGhpcy5wYW5lbC5jdXJyZW50T3B0aW9uT3ZlcnJpZGVzLCBjb25maWcub3B0aW9uT3ZlcnJpZGVzLCBcIlRFWFRfQUxJR05fVEFCTEVfSEVBREVSXCIpLFxyXG4gICAgdGV4dF9hbGlnbl9maXJzdF9jb2x1bW46IHRoaXMuZ2V0T3B0aW9uT3ZlcnJpZGUodGhpcy5wYW5lbC5jdXJyZW50T3B0aW9uT3ZlcnJpZGVzLCBjb25maWcub3B0aW9uT3ZlcnJpZGVzLCBcIlRFWFRfQUxJR05fRklSU1RfQ09MVU1OXCIpLFxyXG4gICAgdGV4dF9hbGlnbl90YWJsZV9jZWxsczogdGhpcy5nZXRPcHRpb25PdmVycmlkZSh0aGlzLnBhbmVsLmN1cnJlbnRPcHRpb25PdmVycmlkZXMsIGNvbmZpZy5vcHRpb25PdmVycmlkZXMsIFwiVEVYVF9BTElHTl9UQUJMRV9DRUxMU1wiKSxcclxuICB9O1xyXG4gIGxldCBvdXRwdXQgPSBjb21wdXRlUmVuZGVyaW5nRGF0YSh0aGlzLmRhdGFSZWNlaXZlZCwgdGhpcy5wYW5lbC5wYXR0ZXJucywgdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybiB8fCBjb25maWcucGFuZWxEZWZhdWx0cy5kZWZhdWx0UGF0dGVybiwgcGFuZWxPcHRpb25zLCByZW5kZXJpbmdfb3B0aW9ucyk7XHJcbiAgaWYgKG91dHB1dC5lcnJvcikge1xyXG4gICAgdGhpcy5wYW5lbC5lcnJvciA9IG91dHB1dC5lcnJvcjtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhpcy5lbGVtLmZpbmQoXCIjYm9vbXRhYmxlX291dHB1dF9ib2R5X2hlYWRlcnNcIikuaHRtbChvdXRwdXQub3V0cHV0X2h0bWwuaGVhZGVyKTtcclxuICAgIHRoaXMuZWxlbS5maW5kKFwiI2Jvb210YWJsZV9vdXRwdXRfYm9keVwiKS5odG1sKG91dHB1dC5vdXRwdXRfaHRtbC5ib2R5KTtcclxuICAgIHRoaXMuZWxlbS5maW5kKFwiI2Jvb210YWJsZV9vdXRwdXRfYm9keV9mb290ZXJzXCIpLmh0bWwob3V0cHV0Lm91dHB1dF9odG1sLmZvb3Rlcik7XHJcbiAgICB0aGlzLmVsZW0uZmluZChcIltkYXRhLXRvZ2dsZT0ndG9vbHRpcCddXCIpLnRvb2x0aXAoKTtcclxuICAgIGlmICh0aGlzLnBhbmVsLmRlYnVnX21vZGUgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5lbGVtLmZpbmQoXCIjYm9vbXRhYmxlX2RlYnVnX3RhYmxlX2hvbGRlclwiKS5odG1sKG91dHB1dC5vdXRwdXRfaHRtbC5kZWJ1Zyk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHRoaXMuYWRqdXN0UGFuZWxIZWlnaHQodGhpcy5jdHJsLmhlaWdodCk7XHJcbn07XHJcblxyXG5leHBvcnQge1xyXG4gIEdyYWZhbmFCb29tVGFibGVDdHJsIGFzIFBhbmVsQ3RybFxyXG59O1xyXG4iXX0=