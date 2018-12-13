System.register(["lodash", "./utils", "./seriesHandler", "./renderer"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, utils, seriesHandler_1, renderer, plugin_id, defaultPattern, config, computeRenderingData;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (utils_1) {
                utils = utils_1;
            },
            function (seriesHandler_1_1) {
                seriesHandler_1 = seriesHandler_1_1;
            },
            function (renderer_1) {
                renderer = renderer_1;
            }
        ],
        execute: function () {
            plugin_id = "yesoreyeram-boomtable-panel";
            exports_1("plugin_id", plugin_id);
            defaultPattern = {
                name: undefined,
                pattern: undefined,
                disabled: false,
                row_name: "_series_",
                col_name: "Value",
                delimiter: ".",
                valueName: "avg",
                format: "none",
                decimals: 2,
                tooltipTemplate: "Row Name : _row_name_ <br/>Col Name : _col_name_ <br/>Value : _value_",
                thresholds: "70,90",
                enable_bgColor: false,
                bgColors: "green|orange|red",
                enable_bgColor_overrides: false,
                bgColors_overrides: "0->green|2->red|1->yellow",
                enable_TextColors: false,
                textColors: "white|white|white",
                enable_TextColor_overrides: false,
                textColors_overrides: "0->white|2->white|1->white",
                enable_transform: false,
                transform_values: "_value_|_value_|_value_",
                enable_transform_overrides: false,
                transform_values_overrides: "0->down|1->up",
                enable_time_based_thresholds: false,
                time_based_thresholds: [],
                null_color: "darkred",
                null_text_color: "white",
                null_value: "No data",
                enable_clickable_cells: false,
                clickable_cells_link: "",
                filter: {
                    value_below: "",
                    value_above: ""
                }
            };
            config = {
                plugin_id: plugin_id,
                debug_mode: false,
                error: undefined,
                optionOverrides: [],
                panelDefaults: {
                    currentOptionOverrides: [],
                    patterns: [],
                    defaultPattern: defaultPattern,
                    activePatternIndex: -1,
                    row_col_wrapper: "_",
                    no_match_text: "N/A",
                    default_title_for_rows: "Metric"
                },
                valueNameOptions: [{
                        value: "min",
                        text: "Min"
                    },
                    {
                        value: "max",
                        text: "Max"
                    },
                    {
                        value: "avg",
                        text: "Average"
                    },
                    {
                        value: "current",
                        text: "Current"
                    },
                    {
                        value: "total",
                        text: "Total"
                    }
                ],
            };
            exports_1("config", config);
            computeRenderingData = function (data, patterns, defaultPattern, panelOptions, rendering_options) {
                var returnData = {
                    error: undefined,
                    output_html: {
                        header: "",
                        body: "",
                        footer: "",
                        debug: "",
                    }
                };
                if (data && data.length > 0 && lodash_1.default.filter(data, function (d) { return d.type && d.type === "table"; }).length > 0) {
                    returnData.error = utils.buildError("Only timeseries data supported", "Only timeseries data supported");
                }
                else if (data) {
                    var metricsReceived_1 = utils.getFields(data, "target");
                    if (utils.hasDuplicates(metricsReceived_1)) {
                        var duplicateKeys = lodash_1.default.uniq(metricsReceived_1.filter(function (v) {
                            return metricsReceived_1.filter(function (t) { return t === v; }).length > 1;
                        }));
                        returnData.error = utils.buildError("Duplicate series found", "Duplicate series : <br/> " + duplicateKeys.join("<br/> "));
                    }
                    else {
                        returnData.error = undefined;
                        var mydata = data.map(seriesHandler_1.defaultHandler.bind(data));
                        var dataComputed = seriesHandler_1.compute(mydata, defaultPattern, patterns, panelOptions.row_col_wrapper);
                        var rows_found = utils.getFields(dataComputed, "row_name");
                        var cols_found = utils.getFields(dataComputed, "col_name");
                        var keys_found_1 = utils.getFields(dataComputed, "key_name");
                        if (utils.isUniqueArray(keys_found_1)) {
                            returnData.error = undefined;
                            var output = renderer.buildOutputData(dataComputed, rows_found, cols_found, defaultPattern, {
                                no_match_text: panelOptions.no_match_text
                            });
                            var _a = renderer.buildOutput(output, cols_found, rendering_options), header = _a.header, body = _a.body, footer = _a.footer;
                            returnData.output_html.header = String(header);
                            returnData.output_html.body = String(body);
                            returnData.output_html.footer = String(footer);
                        }
                        else {
                            var duplicateKeys = lodash_1.default.uniq(keys_found_1.filter(function (v) {
                                return keys_found_1.filter(function (t) { return t === v; }).length > 1;
                            }));
                            returnData.error = utils.buildError("Duplicate keys found", "Duplicate key values : <br/> " + duplicateKeys.join("<br/> "));
                        }
                        returnData.output_html.debug = String(renderer.buildDebugOutput(dataComputed));
                    }
                }
                return returnData;
            };
            exports_1("computeRenderingData", computeRenderingData);
            config.optionOverrides.push(utils.buildOptionOverride(["Text alignment header & footer ", "TEXT_ALIGN_TABLE_HEADER", ["left", "right", "center"], "left"], 0));
            config.optionOverrides.push(utils.buildOptionOverride(["Text alignment first column", "TEXT_ALIGN_FIRST_COLUMN", ["left", "right", "center"], "left"], 1));
            config.optionOverrides.push(utils.buildOptionOverride(["Text alignment cells / Metrics", "TEXT_ALIGN_TABLE_CELLS", ["left", "right", "center"], "left"], 2));
            config.optionOverrides.push(utils.buildOptionOverride(["Hide Headers", "HIDE_HEADERS", ["false", "true"], "false"], 3));
            config.optionOverrides.push(utils.buildOptionOverride(["Hide first column", "HIDE_FIRST_COLUMN", ["false", "true"], "false"], 4));
            config.optionOverrides.push(utils.buildOptionOverride(["Show Footers", "SHOW_FOOTERS", ["false", "true"], "false"], 5));
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFRTSxTQUFTLEdBQVcsNkJBQTZCLENBQUM7O1lBQ2xELGNBQWMsR0FBWTtnQkFDNUIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixRQUFRLEVBQUUsT0FBTztnQkFDakIsU0FBUyxFQUFFLEdBQUc7Z0JBQ2QsU0FBUyxFQUFFLEtBQUs7Z0JBQ2hCLE1BQU0sRUFBRSxNQUFNO2dCQUNkLFFBQVEsRUFBRSxDQUFDO2dCQUNYLGVBQWUsRUFBRSx1RUFBdUU7Z0JBQ3hGLFVBQVUsRUFBRSxPQUFPO2dCQUNuQixjQUFjLEVBQUUsS0FBSztnQkFDckIsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsd0JBQXdCLEVBQUUsS0FBSztnQkFDL0Isa0JBQWtCLEVBQUUsMkJBQTJCO2dCQUMvQyxpQkFBaUIsRUFBRSxLQUFLO2dCQUN4QixVQUFVLEVBQUUsbUJBQW1CO2dCQUMvQiwwQkFBMEIsRUFBRSxLQUFLO2dCQUNqQyxvQkFBb0IsRUFBRSw0QkFBNEI7Z0JBQ2xELGdCQUFnQixFQUFFLEtBQUs7Z0JBQ3ZCLGdCQUFnQixFQUFFLHlCQUF5QjtnQkFDM0MsMEJBQTBCLEVBQUUsS0FBSztnQkFDakMsMEJBQTBCLEVBQUUsZUFBZTtnQkFDM0MsNEJBQTRCLEVBQUUsS0FBSztnQkFDbkMscUJBQXFCLEVBQUUsRUFBRTtnQkFDekIsVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLGVBQWUsRUFBRSxPQUFPO2dCQUN4QixVQUFVLEVBQUUsU0FBUztnQkFDckIsc0JBQXNCLEVBQUUsS0FBSztnQkFDN0Isb0JBQW9CLEVBQUUsRUFBRTtnQkFDeEIsTUFBTSxFQUFFO29CQUNKLFdBQVcsRUFBRSxFQUFFO29C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QUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUMsbUJBQW1CLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsSSxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxjQUFjLEVBQUUsY0FBYyxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9ub2RlX21vZHVsZXMvZ3JhZmFuYS1zZGstbW9ja3MvYXBwL2hlYWRlcnMvY29tbW9uLmQudHNcIiAvPlxyXG5cclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBDb25maWcsIFBhdHRlcm4gfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9pbnRlcmZhY2VzXCI7XHJcbmltcG9ydCB7IGNvbXB1dGUsIGRlZmF1bHRIYW5kbGVyIH0gZnJvbSBcIi4vc2VyaWVzSGFuZGxlclwiO1xyXG5pbXBvcnQgKiBhcyByZW5kZXJlciBmcm9tIFwiLi9yZW5kZXJlclwiO1xyXG5cclxuY29uc3QgcGx1Z2luX2lkOiBTdHJpbmcgPSBcInllc29yZXllcmFtLWJvb210YWJsZS1wYW5lbFwiO1xyXG5jb25zdCBkZWZhdWx0UGF0dGVybjogUGF0dGVybiA9IHtcclxuICAgIG5hbWU6IHVuZGVmaW5lZCxcclxuICAgIHBhdHRlcm46IHVuZGVmaW5lZCxcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIHJvd19uYW1lOiBcIl9zZXJpZXNfXCIsXHJcbiAgICBjb2xfbmFtZTogXCJWYWx1ZVwiLFxyXG4gICAgZGVsaW1pdGVyOiBcIi5cIixcclxuICAgIHZhbHVlTmFtZTogXCJhdmdcIixcclxuICAgIGZvcm1hdDogXCJub25lXCIsXHJcbiAgICBkZWNpbWFsczogMixcclxuICAgIHRvb2x0aXBUZW1wbGF0ZTogXCJSb3cgTmFtZSA6IF9yb3dfbmFtZV8gPGJyLz5Db2wgTmFtZSA6IF9jb2xfbmFtZV8gPGJyLz5WYWx1ZSA6IF92YWx1ZV9cIixcclxuICAgIHRocmVzaG9sZHM6IFwiNzAsOTBcIixcclxuICAgIGVuYWJsZV9iZ0NvbG9yOiBmYWxzZSxcclxuICAgIGJnQ29sb3JzOiBcImdyZWVufG9yYW5nZXxyZWRcIixcclxuICAgIGVuYWJsZV9iZ0NvbG9yX292ZXJyaWRlczogZmFsc2UsXHJcbiAgICBiZ0NvbG9yc19vdmVycmlkZXM6IFwiMC0+Z3JlZW58Mi0+cmVkfDEtPnllbGxvd1wiLFxyXG4gICAgZW5hYmxlX1RleHRDb2xvcnM6IGZhbHNlLFxyXG4gICAgdGV4dENvbG9yczogXCJ3aGl0ZXx3aGl0ZXx3aGl0ZVwiLFxyXG4gICAgZW5hYmxlX1RleHRDb2xvcl9vdmVycmlkZXM6IGZhbHNlLFxyXG4gICAgdGV4dENvbG9yc19vdmVycmlkZXM6IFwiMC0+d2hpdGV8Mi0+d2hpdGV8MS0+d2hpdGVcIixcclxuICAgIGVuYWJsZV90cmFuc2Zvcm06IGZhbHNlLFxyXG4gICAgdHJhbnNmb3JtX3ZhbHVlczogXCJfdmFsdWVffF92YWx1ZV98X3ZhbHVlX1wiLFxyXG4gICAgZW5hYmxlX3RyYW5zZm9ybV9vdmVycmlkZXM6IGZhbHNlLFxyXG4gICAgdHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXM6IFwiMC0+ZG93bnwxLT51cFwiLFxyXG4gICAgZW5hYmxlX3RpbWVfYmFzZWRfdGhyZXNob2xkczogZmFsc2UsXHJcbiAgICB0aW1lX2Jhc2VkX3RocmVzaG9sZHM6IFtdLFxyXG4gICAgbnVsbF9jb2xvcjogXCJkYXJrcmVkXCIsXHJcbiAgICBudWxsX3RleHRfY29sb3I6IFwid2hpdGVcIixcclxuICAgIG51bGxfdmFsdWU6IFwiTm8gZGF0YVwiLFxyXG4gICAgZW5hYmxlX2NsaWNrYWJsZV9jZWxsczogZmFsc2UsXHJcbiAgICBjbGlja2FibGVfY2VsbHNfbGluazogXCJcIixcclxuICAgIGZpbHRlcjoge1xyXG4gICAgICAgIHZhbHVlX2JlbG93OiBcIlwiLFxyXG4gICAgICAgIHZhbHVlX2Fib3ZlOiBcIlwiXHJcbiAgICB9XHJcbn07XHJcbmNvbnN0IGNvbmZpZzogQ29uZmlnID0ge1xyXG4gICAgcGx1Z2luX2lkOiBwbHVnaW5faWQsXHJcbiAgICBkZWJ1Z19tb2RlOiBmYWxzZSxcclxuICAgIGVycm9yOiB1bmRlZmluZWQsXHJcbiAgICBvcHRpb25PdmVycmlkZXM6IFtdLFxyXG4gICAgcGFuZWxEZWZhdWx0czoge1xyXG4gICAgICAgIGN1cnJlbnRPcHRpb25PdmVycmlkZXM6IFtdLFxyXG4gICAgICAgIHBhdHRlcm5zOiBbXSxcclxuICAgICAgICBkZWZhdWx0UGF0dGVybjogZGVmYXVsdFBhdHRlcm4sXHJcbiAgICAgICAgYWN0aXZlUGF0dGVybkluZGV4OiAtMSxcclxuICAgICAgICByb3dfY29sX3dyYXBwZXI6IFwiX1wiLFxyXG4gICAgICAgIG5vX21hdGNoX3RleHQ6IFwiTi9BXCIsXHJcbiAgICAgICAgZGVmYXVsdF90aXRsZV9mb3Jfcm93czogXCJNZXRyaWNcIlxyXG4gICAgfSxcclxuICAgIHZhbHVlTmFtZU9wdGlvbnM6IFt7XHJcbiAgICAgICAgdmFsdWU6IFwibWluXCIsXHJcbiAgICAgICAgdGV4dDogXCJNaW5cIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB2YWx1ZTogXCJtYXhcIixcclxuICAgICAgICB0ZXh0OiBcIk1heFwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHZhbHVlOiBcImF2Z1wiLFxyXG4gICAgICAgIHRleHQ6IFwiQXZlcmFnZVwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHZhbHVlOiBcImN1cnJlbnRcIixcclxuICAgICAgICB0ZXh0OiBcIkN1cnJlbnRcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB2YWx1ZTogXCJ0b3RhbFwiLFxyXG4gICAgICAgIHRleHQ6IFwiVG90YWxcIlxyXG4gICAgfVxyXG4gICAgXSxcclxufTtcclxuY29uc3QgY29tcHV0ZVJlbmRlcmluZ0RhdGEgPSBmdW5jdGlvbiAoZGF0YTogYW55LCBwYXR0ZXJuczogUGF0dGVybltdLCBkZWZhdWx0UGF0dGVybjogUGF0dGVybiwgcGFuZWxPcHRpb25zLCByZW5kZXJpbmdfb3B0aW9ucykge1xyXG4gICAgbGV0IHJldHVybkRhdGEgPSB7XHJcbiAgICAgICAgZXJyb3I6IHVuZGVmaW5lZCxcclxuICAgICAgICBvdXRwdXRfaHRtbDoge1xyXG4gICAgICAgICAgICBoZWFkZXI6IFwiXCIsXHJcbiAgICAgICAgICAgIGJvZHk6IFwiXCIsXHJcbiAgICAgICAgICAgIGZvb3RlcjogXCJcIixcclxuICAgICAgICAgICAgZGVidWc6IFwiXCIsXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoID4gMCAmJiBfLmZpbHRlcihkYXRhLCBkID0+IHsgcmV0dXJuIGQudHlwZSAmJiBkLnR5cGUgPT09IFwidGFibGVcIjsgfSkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHJldHVybkRhdGEuZXJyb3IgPSB1dGlscy5idWlsZEVycm9yKGBPbmx5IHRpbWVzZXJpZXMgZGF0YSBzdXBwb3J0ZWRgLCBgT25seSB0aW1lc2VyaWVzIGRhdGEgc3VwcG9ydGVkYCk7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEpIHtcclxuICAgICAgICBsZXQgbWV0cmljc1JlY2VpdmVkID0gdXRpbHMuZ2V0RmllbGRzKGRhdGEsIFwidGFyZ2V0XCIpO1xyXG4gICAgICAgIGlmICh1dGlscy5oYXNEdXBsaWNhdGVzKG1ldHJpY3NSZWNlaXZlZCkpIHtcclxuICAgICAgICAgICAgbGV0IGR1cGxpY2F0ZUtleXMgPSBfLnVuaXEobWV0cmljc1JlY2VpdmVkLmZpbHRlcih2ID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtZXRyaWNzUmVjZWl2ZWQuZmlsdGVyKHQgPT4gdCA9PT0gdikubGVuZ3RoID4gMTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm5EYXRhLmVycm9yID0gdXRpbHMuYnVpbGRFcnJvcihgRHVwbGljYXRlIHNlcmllcyBmb3VuZGAsIGBEdXBsaWNhdGUgc2VyaWVzIDogPGJyLz4gJHtkdXBsaWNhdGVLZXlzLmpvaW4oXCI8YnIvPiBcIil9YCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuRGF0YS5lcnJvciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgbGV0IG15ZGF0YSA9IGRhdGEubWFwKGRlZmF1bHRIYW5kbGVyLmJpbmQoZGF0YSkpO1xyXG4gICAgICAgICAgICBsZXQgZGF0YUNvbXB1dGVkID0gY29tcHV0ZShteWRhdGEsIGRlZmF1bHRQYXR0ZXJuLCBwYXR0ZXJucywgcGFuZWxPcHRpb25zLnJvd19jb2xfd3JhcHBlcik7XHJcbiAgICAgICAgICAgIGxldCByb3dzX2ZvdW5kID0gdXRpbHMuZ2V0RmllbGRzKGRhdGFDb21wdXRlZCwgXCJyb3dfbmFtZVwiKTtcclxuICAgICAgICAgICAgbGV0IGNvbHNfZm91bmQgPSB1dGlscy5nZXRGaWVsZHMoZGF0YUNvbXB1dGVkLCBcImNvbF9uYW1lXCIpO1xyXG4gICAgICAgICAgICBsZXQga2V5c19mb3VuZCA9IHV0aWxzLmdldEZpZWxkcyhkYXRhQ29tcHV0ZWQsIFwia2V5X25hbWVcIik7XHJcbiAgICAgICAgICAgIGlmICh1dGlscy5pc1VuaXF1ZUFycmF5KGtleXNfZm91bmQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5EYXRhLmVycm9yID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgbGV0IG91dHB1dCA9IHJlbmRlcmVyLmJ1aWxkT3V0cHV0RGF0YShkYXRhQ29tcHV0ZWQsIHJvd3NfZm91bmQsIGNvbHNfZm91bmQsIGRlZmF1bHRQYXR0ZXJuLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9fbWF0Y2hfdGV4dDogcGFuZWxPcHRpb25zLm5vX21hdGNoX3RleHRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHsgaGVhZGVyLCBib2R5LCBmb290ZXIgfSA9IHJlbmRlcmVyLmJ1aWxkT3V0cHV0KG91dHB1dCwgY29sc19mb3VuZCwgcmVuZGVyaW5nX29wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuRGF0YS5vdXRwdXRfaHRtbC5oZWFkZXIgPSBTdHJpbmcoaGVhZGVyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybkRhdGEub3V0cHV0X2h0bWwuYm9keSA9IFN0cmluZyhib2R5KTtcclxuICAgICAgICAgICAgICAgIHJldHVybkRhdGEub3V0cHV0X2h0bWwuZm9vdGVyID0gU3RyaW5nKGZvb3Rlcik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZHVwbGljYXRlS2V5cyA9IF8udW5pcShrZXlzX2ZvdW5kLmZpbHRlcih2ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5c19mb3VuZC5maWx0ZXIodCA9PiB0ID09PSB2KS5sZW5ndGggPiAxO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuRGF0YS5lcnJvciA9IHV0aWxzLmJ1aWxkRXJyb3IoYER1cGxpY2F0ZSBrZXlzIGZvdW5kYCwgYER1cGxpY2F0ZSBrZXkgdmFsdWVzIDogPGJyLz4gJHtkdXBsaWNhdGVLZXlzLmpvaW4oXCI8YnIvPiBcIil9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuRGF0YS5vdXRwdXRfaHRtbC5kZWJ1ZyA9IFN0cmluZyhyZW5kZXJlci5idWlsZERlYnVnT3V0cHV0KGRhdGFDb21wdXRlZCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXR1cm5EYXRhO1xyXG59O1xyXG5cclxuY29uZmlnLm9wdGlvbk92ZXJyaWRlcy5wdXNoKHV0aWxzLmJ1aWxkT3B0aW9uT3ZlcnJpZGUoW1wiVGV4dCBhbGlnbm1lbnQgaGVhZGVyICYgZm9vdGVyIFwiLCBcIlRFWFRfQUxJR05fVEFCTEVfSEVBREVSXCIsIFtcImxlZnRcIiwgXCJyaWdodFwiLCBcImNlbnRlclwiXSwgXCJsZWZ0XCJdLCAwKSk7XHJcbmNvbmZpZy5vcHRpb25PdmVycmlkZXMucHVzaCh1dGlscy5idWlsZE9wdGlvbk92ZXJyaWRlKFtcIlRleHQgYWxpZ25tZW50IGZpcnN0IGNvbHVtblwiLCBcIlRFWFRfQUxJR05fRklSU1RfQ09MVU1OXCIsIFtcImxlZnRcIiwgXCJyaWdodFwiLCBcImNlbnRlclwiXSwgXCJsZWZ0XCJdLCAxKSk7XHJcbmNvbmZpZy5vcHRpb25PdmVycmlkZXMucHVzaCh1dGlscy5idWlsZE9wdGlvbk92ZXJyaWRlKFtcIlRleHQgYWxpZ25tZW50IGNlbGxzIC8gTWV0cmljc1wiLCBcIlRFWFRfQUxJR05fVEFCTEVfQ0VMTFNcIiwgW1wibGVmdFwiLCBcInJpZ2h0XCIsIFwiY2VudGVyXCJdLCBcImxlZnRcIl0sIDIpKTtcclxuY29uZmlnLm9wdGlvbk92ZXJyaWRlcy5wdXNoKHV0aWxzLmJ1aWxkT3B0aW9uT3ZlcnJpZGUoW1wiSGlkZSBIZWFkZXJzXCIsIFwiSElERV9IRUFERVJTXCIsIFtcImZhbHNlXCIsIFwidHJ1ZVwiXSwgXCJmYWxzZVwiXSwgMykpO1xyXG5jb25maWcub3B0aW9uT3ZlcnJpZGVzLnB1c2godXRpbHMuYnVpbGRPcHRpb25PdmVycmlkZShbXCJIaWRlIGZpcnN0IGNvbHVtblwiLCBcIkhJREVfRklSU1RfQ09MVU1OXCIsIFtcImZhbHNlXCIsIFwidHJ1ZVwiXSwgXCJmYWxzZVwiXSwgNCkpO1xyXG5jb25maWcub3B0aW9uT3ZlcnJpZGVzLnB1c2godXRpbHMuYnVpbGRPcHRpb25PdmVycmlkZShbXCJTaG93IEZvb3RlcnNcIiwgXCJTSE9XX0ZPT1RFUlNcIiwgW1wiZmFsc2VcIiwgXCJ0cnVlXCJdLCBcImZhbHNlXCJdLCA1KSk7XHJcblxyXG5leHBvcnQge1xyXG4gICAgcGx1Z2luX2lkLFxyXG4gICAgY29uZmlnLFxyXG4gICAgY29tcHV0ZVJlbmRlcmluZ0RhdGFcclxufTtcclxuIl19