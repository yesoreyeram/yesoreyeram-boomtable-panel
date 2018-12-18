System.register(["app/core/utils/kbn", "app/plugins/sdk", "app/core/time_series2", "./utils"], function (exports_1, context_1) {
    "use strict";
    var kbn_1, sdk_1, time_series2_1, utils, plugin_id, config;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (kbn_1_1) {
                kbn_1 = kbn_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (time_series2_1_1) {
                time_series2_1 = time_series2_1_1;
            },
            function (utils_1) {
                utils = utils_1;
            }
        ],
        execute: function () {
            exports_1("kbn", kbn_1.default);
            exports_1("loadPluginCss", sdk_1.loadPluginCss);
            exports_1("MetricsPanelCtrl", sdk_1.MetricsPanelCtrl);
            exports_1("TimeSeries", time_series2_1.default);
            exports_1("utils", utils);
            plugin_id = "yesoreyeram-boomtable-panel";
            config = {
                plugin_id: plugin_id,
                debug_mode: false,
                hide_first_column: false,
                hide_headers: false,
                error: undefined,
                groupedData: undefined,
                panelDefaults: {
                    plugin_title: "Boom Table",
                    nullPointMode: "connected",
                    patterns: [],
                    defaultPattern: {
                        delimiter: ".",
                        valueName: "avg",
                        row_name: "_series_",
                        col_name: "Value",
                        thresholds: "70,90",
                        time_based_thresholds: [],
                        enable_time_based_thresholds: false,
                        enable_bgColor: false,
                        bgColors: "green|orange|red",
                        enable_bgColor_overrides: false,
                        bgColors_overrides: "0->green|2->red|1->yellow",
                        enable_transform: false,
                        transform_values: "_value_|_value_|_value_",
                        enable_transform_overrides: false,
                        transform_values_overrides: "0->down|1->up",
                        decimals: 2,
                        format: "none",
                        null_color: "darkred",
                        null_value: "No data",
                        enable_clickable_cells: false,
                        clickable_cells_link: "",
                        filter: {
                            value_below: "",
                            value_above: ""
                        }
                    },
                    activePatternIndex: -1,
                    row_col_wrapper: "_",
                    default_title_for_rows: "Metric"
                },
                list_of_stylesheets: {
                    dark: "plugins/" + plugin_id + "/css/default.dark.css",
                    light: "plugins/" + plugin_id + "/css/default.light.css"
                },
                editorTabs: [{
                        name: "Patterns",
                        template: "/partials/patterns.html",
                        position: 2
                    },
                    {
                        name: "Time based thresholds & Filters",
                        template: "/partials/patterns-advanced-options.html",
                        position: 3
                    }, {
                        name: "Options",
                        template: "/partials/options.html",
                        position: 4
                    }],
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
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBRU8sYUFBRzt1Q0FFTixtQkFBYTswQ0FDYixzQkFBZ0I7b0NBRWIsc0JBQVU7O1lBR1gsU0FBUyxHQUFHLDZCQUE2QixDQUFDO1lBQzFDLE1BQU0sR0FBUTtnQkFDaEIsU0FBUyxFQUFFLFNBQVM7Z0JBQ3BCLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixpQkFBaUIsRUFBRyxLQUFLO2dCQUN6QixZQUFZLEVBQUcsS0FBSztnQkFDcEIsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLFdBQVcsRUFBRSxTQUFTO2dCQUN0QixhQUFhLEVBQUU7b0JBQ1gsWUFBWSxFQUFFLFlBQVk7b0JBQzFCLGFBQWEsRUFBRSxXQUFXO29CQUMxQixRQUFRLEVBQUUsRUFBRTtvQkFDWixjQUFjLEVBQUU7d0JBQ1osU0FBUyxFQUFFLEdBQUc7d0JBQ2QsU0FBUyxFQUFFLEtBQUs7d0JBQ2hCLFFBQVEsRUFBRSxVQUFVO3dCQUNwQixRQUFRLEVBQUUsT0FBTzt3QkFDakIsVUFBVSxFQUFFLE9BQU87d0JBQ25CLHFCQUFxQixFQUFDLEVBQUU7d0JBQ3hCLDRCQUE0QixFQUFFLEtBQUs7d0JBQ25DLGNBQWMsRUFBRSxLQUFLO3dCQUNyQixRQUFRLEVBQUUsa0JBQWtCO3dCQUM1Qix3QkFBd0IsRUFBRyxLQUFLO3dCQUNoQyxrQkFBa0IsRUFBRSwyQkFBMkI7d0JBQy9DLGdCQUFnQixFQUFFLEtBQUs7d0JBQ3ZCLGdCQUFnQixFQUFFLHlCQUF5Qjt3QkFDM0MsMEJBQTBCLEVBQUcsS0FBSzt3QkFDbEMsMEJBQTBCLEVBQUUsZUFBZTt3QkFDM0MsUUFBUSxFQUFFLENBQUM7d0JBQ1gsTUFBTSxFQUFFLE1BQU07d0JBQ2QsVUFBVSxFQUFFLFNBQVM7d0JBQ3JCLFVBQVUsRUFBRSxTQUFTO3dCQUNyQixzQkFBc0IsRUFBRyxLQUFLO3dCQUM5QixvQkFBb0IsRUFBRyxFQUFFO3dCQUN6QixNQUFNLEVBQUc7NEJBQ0wsV0FBVyxFQUFHLEVBQUU7NEJBQ2hCLFdBQVcsRUFBRyxFQUFFO3lCQUNuQjtxQkFDSjtvQkFDRCxrQkFBa0IsRUFBRSxDQUFDLENBQUM7b0JBQ3RCLGVBQWUsRUFBQyxHQUFHO29CQUNuQixzQkFBc0IsRUFBRSxRQUFRO2lCQUNuQztnQkFDRCxtQkFBbUIsRUFBRTtvQkFDakIsSUFBSSxFQUFFLFVBQVUsR0FBRyxTQUFTLEdBQUcsdUJBQXVCO29CQUN0RCxLQUFLLEVBQUUsVUFBVSxHQUFHLFNBQVMsR0FBRyx3QkFBd0I7aUJBQzNEO2dCQUNELFVBQVUsRUFBRSxDQUFDO3dCQUNULElBQUksRUFBRSxVQUFVO3dCQUNoQixRQUFRLEVBQUUseUJBQXlCO3dCQUNuQyxRQUFRLEVBQUUsQ0FBQztxQkFDZDtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsaUNBQWlDO3dCQUN2QyxRQUFRLEVBQUUsMENBQTBDO3dCQUNwRCxRQUFRLEVBQUUsQ0FBQztxQkFDZCxFQUFFO3dCQUNDLElBQUksRUFBRSxTQUFTO3dCQUNmLFFBQVEsRUFBRSx3QkFBd0I7d0JBQ2xDLFFBQVEsRUFBRSxDQUFDO3FCQUNkLENBQUM7Z0JBQ0YsZ0JBQWdCLEVBQUUsQ0FBQzt3QkFDZixLQUFLLEVBQUUsS0FBSzt3QkFDWixJQUFJLEVBQUUsS0FBSztxQkFDZDtvQkFDRDt3QkFDSSxLQUFLLEVBQUUsS0FBSzt3QkFDWixJQUFJLEVBQUUsS0FBSztxQkFDZDtvQkFDRDt3QkFDSSxLQUFLLEVBQUUsS0FBSzt3QkFDWixJQUFJLEVBQUUsU0FBUztxQkFDbEI7b0JBQ0Q7d0JBQ0ksS0FBSyxFQUFFLFNBQVM7d0JBQ2hCLElBQUksRUFBRSxTQUFTO3FCQUNsQjtvQkFDRDt3QkFDSSxLQUFLLEVBQUUsT0FBTzt3QkFDZCxJQUFJLEVBQUUsT0FBTztxQkFDaEI7aUJBQ0E7YUFDSixDQUFDOztRQVNELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9ub2RlX21vZHVsZXMvZ3JhZmFuYS1zZGstbW9ja3MvYXBwL2hlYWRlcnMvY29tbW9uLmQudHNcIiAvPlxuXG5pbXBvcnQga2JuIGZyb20gJ2FwcC9jb3JlL3V0aWxzL2tibic7XG5pbXBvcnQge1xuICAgIGxvYWRQbHVnaW5Dc3MsXG4gICAgTWV0cmljc1BhbmVsQ3RybFxufSBmcm9tIFwiYXBwL3BsdWdpbnMvc2RrXCI7XG5pbXBvcnQgVGltZVNlcmllcyBmcm9tIFwiYXBwL2NvcmUvdGltZV9zZXJpZXMyXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiLi91dGlsc1wiO1xuXG5jb25zdCBwbHVnaW5faWQgPSBcInllc29yZXllcmFtLWJvb210YWJsZS1wYW5lbFwiO1xuY29uc3QgY29uZmlnOiBhbnkgPSB7XG4gICAgcGx1Z2luX2lkOiBwbHVnaW5faWQsXG4gICAgZGVidWdfbW9kZTogZmFsc2UsXG4gICAgaGlkZV9maXJzdF9jb2x1bW4gOiBmYWxzZSxcbiAgICBoaWRlX2hlYWRlcnMgOiBmYWxzZSxcbiAgICBlcnJvcjogdW5kZWZpbmVkLFxuICAgIGdyb3VwZWREYXRhOiB1bmRlZmluZWQsXG4gICAgcGFuZWxEZWZhdWx0czoge1xuICAgICAgICBwbHVnaW5fdGl0bGU6IFwiQm9vbSBUYWJsZVwiLFxuICAgICAgICBudWxsUG9pbnRNb2RlOiBcImNvbm5lY3RlZFwiLFxuICAgICAgICBwYXR0ZXJuczogW10sXG4gICAgICAgIGRlZmF1bHRQYXR0ZXJuOiB7XG4gICAgICAgICAgICBkZWxpbWl0ZXI6IFwiLlwiLFxuICAgICAgICAgICAgdmFsdWVOYW1lOiBcImF2Z1wiLFxuICAgICAgICAgICAgcm93X25hbWU6IFwiX3Nlcmllc19cIixcbiAgICAgICAgICAgIGNvbF9uYW1lOiBcIlZhbHVlXCIsXG4gICAgICAgICAgICB0aHJlc2hvbGRzOiBcIjcwLDkwXCIsXG4gICAgICAgICAgICB0aW1lX2Jhc2VkX3RocmVzaG9sZHM6W10sXG4gICAgICAgICAgICBlbmFibGVfdGltZV9iYXNlZF90aHJlc2hvbGRzOiBmYWxzZSxcbiAgICAgICAgICAgIGVuYWJsZV9iZ0NvbG9yOiBmYWxzZSxcbiAgICAgICAgICAgIGJnQ29sb3JzOiBcImdyZWVufG9yYW5nZXxyZWRcIixcbiAgICAgICAgICAgIGVuYWJsZV9iZ0NvbG9yX292ZXJyaWRlcyA6IGZhbHNlLFxuICAgICAgICAgICAgYmdDb2xvcnNfb3ZlcnJpZGVzOiBcIjAtPmdyZWVufDItPnJlZHwxLT55ZWxsb3dcIixcbiAgICAgICAgICAgIGVuYWJsZV90cmFuc2Zvcm06IGZhbHNlLFxuICAgICAgICAgICAgdHJhbnNmb3JtX3ZhbHVlczogXCJfdmFsdWVffF92YWx1ZV98X3ZhbHVlX1wiLFxuICAgICAgICAgICAgZW5hYmxlX3RyYW5zZm9ybV9vdmVycmlkZXMgOiBmYWxzZSxcbiAgICAgICAgICAgIHRyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzOiBcIjAtPmRvd258MS0+dXBcIixcbiAgICAgICAgICAgIGRlY2ltYWxzOiAyLFxuICAgICAgICAgICAgZm9ybWF0OiBcIm5vbmVcIixcbiAgICAgICAgICAgIG51bGxfY29sb3I6IFwiZGFya3JlZFwiLFxuICAgICAgICAgICAgbnVsbF92YWx1ZTogXCJObyBkYXRhXCIsXG4gICAgICAgICAgICBlbmFibGVfY2xpY2thYmxlX2NlbGxzIDogZmFsc2UsXG4gICAgICAgICAgICBjbGlja2FibGVfY2VsbHNfbGluayA6IFwiXCIsXG4gICAgICAgICAgICBmaWx0ZXIgOiB7XG4gICAgICAgICAgICAgICAgdmFsdWVfYmVsb3cgOiBcIlwiLFxuICAgICAgICAgICAgICAgIHZhbHVlX2Fib3ZlIDogXCJcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBhY3RpdmVQYXR0ZXJuSW5kZXg6IC0xLFxuICAgICAgICByb3dfY29sX3dyYXBwZXI6XCJfXCIsXG4gICAgICAgIGRlZmF1bHRfdGl0bGVfZm9yX3Jvd3M6IFwiTWV0cmljXCJcbiAgICB9LFxuICAgIGxpc3Rfb2Zfc3R5bGVzaGVldHM6IHtcbiAgICAgICAgZGFyazogXCJwbHVnaW5zL1wiICsgcGx1Z2luX2lkICsgXCIvY3NzL2RlZmF1bHQuZGFyay5jc3NcIixcbiAgICAgICAgbGlnaHQ6IFwicGx1Z2lucy9cIiArIHBsdWdpbl9pZCArIFwiL2Nzcy9kZWZhdWx0LmxpZ2h0LmNzc1wiXG4gICAgfSxcbiAgICBlZGl0b3JUYWJzOiBbe1xuICAgICAgICBuYW1lOiBcIlBhdHRlcm5zXCIsXG4gICAgICAgIHRlbXBsYXRlOiBcIi9wYXJ0aWFscy9wYXR0ZXJucy5odG1sXCIsXG4gICAgICAgIHBvc2l0aW9uOiAyXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiVGltZSBiYXNlZCB0aHJlc2hvbGRzICYgRmlsdGVyc1wiLFxuICAgICAgICB0ZW1wbGF0ZTogXCIvcGFydGlhbHMvcGF0dGVybnMtYWR2YW5jZWQtb3B0aW9ucy5odG1sXCIsXG4gICAgICAgIHBvc2l0aW9uOiAzXG4gICAgfSwge1xuICAgICAgICBuYW1lOiBcIk9wdGlvbnNcIixcbiAgICAgICAgdGVtcGxhdGU6IFwiL3BhcnRpYWxzL29wdGlvbnMuaHRtbFwiLFxuICAgICAgICBwb3NpdGlvbjogNFxuICAgIH1dLFxuICAgIHZhbHVlTmFtZU9wdGlvbnM6IFt7XG4gICAgICAgIHZhbHVlOiBcIm1pblwiLFxuICAgICAgICB0ZXh0OiBcIk1pblwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHZhbHVlOiBcIm1heFwiLFxuICAgICAgICB0ZXh0OiBcIk1heFwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHZhbHVlOiBcImF2Z1wiLFxuICAgICAgICB0ZXh0OiBcIkF2ZXJhZ2VcIlxuICAgIH0sXG4gICAge1xuICAgICAgICB2YWx1ZTogXCJjdXJyZW50XCIsXG4gICAgICAgIHRleHQ6IFwiQ3VycmVudFwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHZhbHVlOiBcInRvdGFsXCIsXG4gICAgICAgIHRleHQ6IFwiVG90YWxcIlxuICAgIH1cbiAgICBdLFxufTtcblxuZXhwb3J0IHtcbiAgICBrYm4sXG4gICAgbG9hZFBsdWdpbkNzcyxcbiAgICBNZXRyaWNzUGFuZWxDdHJsLFxuICAgIFRpbWVTZXJpZXMsXG4gICAgdXRpbHMsXG4gICAgY29uZmlnXG59Il19