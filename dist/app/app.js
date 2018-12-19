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
                debug_mode: false,
                editorTabs: [{
                        name: "Patterns",
                        position: 2,
                        template: "/partials/patterns.html"
                    },
                    {
                        name: "Time based thresholds & Filters",
                        position: 3,
                        template: "/partials/patterns-advanced-options.html"
                    }, {
                        name: "Options",
                        position: 4,
                        template: "/partials/options.html"
                    }],
                error: undefined,
                groupedData: undefined,
                hide_first_column: false,
                hide_headers: false,
                list_of_stylesheets: {
                    dark: "plugins/" + plugin_id + "/css/default.dark.css",
                    light: "plugins/" + plugin_id + "/css/default.light.css"
                },
                panelDefaults: {
                    activePatternIndex: -1,
                    defaultPattern: {
                        bgColors: "green|orange|red",
                        bgColors_overrides: "0->green|2->red|1->yellow",
                        clickable_cells_link: "",
                        col_name: "Value",
                        decimals: 2,
                        delimiter: ".",
                        enable_bgColor: false,
                        enable_bgColor_overrides: false,
                        enable_clickable_cells: false,
                        enable_time_based_thresholds: false,
                        enable_transform: false,
                        enable_transform_overrides: false,
                        filter: {
                            value_above: "",
                            value_below: ""
                        },
                        format: "none",
                        null_color: "darkred",
                        null_value: "No data",
                        row_name: "_series_",
                        thresholds: "70,90",
                        time_based_thresholds: [],
                        transform_values: "_value_|_value_|_value_",
                        transform_values_overrides: "0->down|1->up",
                        valueName: "avg"
                    },
                    default_title_for_rows: "Metric",
                    nullPointMode: "connected",
                    patterns: [],
                    plugin_title: "Boom Table",
                    row_col_wrapper: "_",
                },
                plugin_id: plugin_id,
                valueNameOptions: [{
                        text: "Min",
                        value: "min",
                    },
                    {
                        text: "Max",
                        value: "max"
                    },
                    {
                        text: "Average",
                        value: "avg"
                    },
                    {
                        text: "Current",
                        value: "current"
                    },
                    {
                        text: "Total",
                        value: "total"
                    }
                ]
            };
            exports_1("config", config);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBRU8sYUFBRzt1Q0FFTixtQkFBYTswQ0FDYixzQkFBZ0I7b0NBRWIsc0JBQVU7O1lBR1gsU0FBUyxHQUFHLDZCQUE2QixDQUFDO1lBQzFDLE1BQU0sR0FBUTtnQkFDaEIsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLFVBQVUsRUFBRSxDQUFDO3dCQUNULElBQUksRUFBRSxVQUFVO3dCQUNoQixRQUFRLEVBQUUsQ0FBQzt3QkFDWCxRQUFRLEVBQUUseUJBQXlCO3FCQUN0QztvQkFDRDt3QkFDSSxJQUFJLEVBQUUsaUNBQWlDO3dCQUN2QyxRQUFRLEVBQUUsQ0FBQzt3QkFDWCxRQUFRLEVBQUUsMENBQTBDO3FCQUN2RCxFQUFFO3dCQUNDLElBQUksRUFBRSxTQUFTO3dCQUNmLFFBQVEsRUFBRSxDQUFDO3dCQUNYLFFBQVEsRUFBRSx3QkFBd0I7cUJBQ3JDLENBQUM7Z0JBQ0YsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLFdBQVcsRUFBRSxTQUFTO2dCQUN0QixpQkFBaUIsRUFBRSxLQUFLO2dCQUN4QixZQUFZLEVBQUUsS0FBSztnQkFDbkIsbUJBQW1CLEVBQUU7b0JBQ2pCLElBQUksRUFBRSxVQUFVLEdBQUcsU0FBUyxHQUFHLHVCQUF1QjtvQkFDdEQsS0FBSyxFQUFFLFVBQVUsR0FBRyxTQUFTLEdBQUcsd0JBQXdCO2lCQUMzRDtnQkFDRCxhQUFhLEVBQUU7b0JBQ1gsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO29CQUN0QixjQUFjLEVBQUU7d0JBQ1osUUFBUSxFQUFFLGtCQUFrQjt3QkFDNUIsa0JBQWtCLEVBQUUsMkJBQTJCO3dCQUMvQyxvQkFBb0IsRUFBRSxFQUFFO3dCQUN4QixRQUFRLEVBQUUsT0FBTzt3QkFDakIsUUFBUSxFQUFFLENBQUM7d0JBQ1gsU0FBUyxFQUFFLEdBQUc7d0JBQ2QsY0FBYyxFQUFFLEtBQUs7d0JBQ3JCLHdCQUF3QixFQUFFLEtBQUs7d0JBQy9CLHNCQUFzQixFQUFFLEtBQUs7d0JBQzdCLDRCQUE0QixFQUFFLEtBQUs7d0JBQ25DLGdCQUFnQixFQUFFLEtBQUs7d0JBQ3ZCLDBCQUEwQixFQUFFLEtBQUs7d0JBQ2pDLE1BQU0sRUFBRTs0QkFDSixXQUFXLEVBQUUsRUFBRTs0QkFDZixXQUFXLEVBQUUsRUFBRTt5QkFDbEI7d0JBQ0QsTUFBTSxFQUFFLE1BQU07d0JBQ2QsVUFBVSxFQUFFLFNBQVM7d0JBQ3JCLFVBQVUsRUFBRSxTQUFTO3dCQUNyQixRQUFRLEVBQUUsVUFBVTt3QkFDcEIsVUFBVSxFQUFFLE9BQU87d0JBQ25CLHFCQUFxQixFQUFFLEVBQUU7d0JBQ3pCLGdCQUFnQixFQUFFLHlCQUF5Qjt3QkFDM0MsMEJBQTBCLEVBQUUsZUFBZTt3QkFDM0MsU0FBUyxFQUFFLEtBQUs7cUJBQ25CO29CQUNELHNCQUFzQixFQUFFLFFBQVE7b0JBQ2hDLGFBQWEsRUFBRSxXQUFXO29CQUMxQixRQUFRLEVBQUUsRUFBRTtvQkFDWixZQUFZLEVBQUUsWUFBWTtvQkFDMUIsZUFBZSxFQUFFLEdBQUc7aUJBQ3ZCO2dCQUNELFNBQVMsRUFBRSxTQUFTO2dCQUNwQixnQkFBZ0IsRUFBRSxDQUFDO3dCQUNmLElBQUksRUFBRSxLQUFLO3dCQUNYLEtBQUssRUFBRSxLQUFLO3FCQUNmO29CQUNEO3dCQUNJLElBQUksRUFBRSxLQUFLO3dCQUNYLEtBQUssRUFBRSxLQUFLO3FCQUNmO29CQUNEO3dCQUNJLElBQUksRUFBRSxTQUFTO3dCQUNmLEtBQUssRUFBRSxLQUFLO3FCQUNmO29CQUNEO3dCQUNJLElBQUksRUFBRSxTQUFTO3dCQUNmLEtBQUssRUFBRSxTQUFTO3FCQUNuQjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsT0FBTzt3QkFDYixLQUFLLEVBQUUsT0FBTztxQkFDakI7aUJBQ0E7YUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbm9kZV9tb2R1bGVzL2dyYWZhbmEtc2RrLW1vY2tzL2FwcC9oZWFkZXJzL2NvbW1vbi5kLnRzXCIgLz5cblxuaW1wb3J0IGtibiBmcm9tICdhcHAvY29yZS91dGlscy9rYm4nO1xuaW1wb3J0IHtcbiAgICBsb2FkUGx1Z2luQ3NzLFxuICAgIE1ldHJpY3NQYW5lbEN0cmxcbn0gZnJvbSBcImFwcC9wbHVnaW5zL3Nka1wiO1xuaW1wb3J0IFRpbWVTZXJpZXMgZnJvbSBcImFwcC9jb3JlL3RpbWVfc2VyaWVzMlwiO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcblxuY29uc3QgcGx1Z2luX2lkID0gXCJ5ZXNvcmV5ZXJhbS1ib29tdGFibGUtcGFuZWxcIjtcbmNvbnN0IGNvbmZpZzogYW55ID0ge1xuICAgIGRlYnVnX21vZGU6IGZhbHNlLFxuICAgIGVkaXRvclRhYnM6IFt7XG4gICAgICAgIG5hbWU6IFwiUGF0dGVybnNcIixcbiAgICAgICAgcG9zaXRpb246IDIsXG4gICAgICAgIHRlbXBsYXRlOiBcIi9wYXJ0aWFscy9wYXR0ZXJucy5odG1sXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogXCJUaW1lIGJhc2VkIHRocmVzaG9sZHMgJiBGaWx0ZXJzXCIsXG4gICAgICAgIHBvc2l0aW9uOiAzLFxuICAgICAgICB0ZW1wbGF0ZTogXCIvcGFydGlhbHMvcGF0dGVybnMtYWR2YW5jZWQtb3B0aW9ucy5odG1sXCJcbiAgICB9LCB7XG4gICAgICAgIG5hbWU6IFwiT3B0aW9uc1wiLFxuICAgICAgICBwb3NpdGlvbjogNCxcbiAgICAgICAgdGVtcGxhdGU6IFwiL3BhcnRpYWxzL29wdGlvbnMuaHRtbFwiXG4gICAgfV0sXG4gICAgZXJyb3I6IHVuZGVmaW5lZCxcbiAgICBncm91cGVkRGF0YTogdW5kZWZpbmVkLFxuICAgIGhpZGVfZmlyc3RfY29sdW1uOiBmYWxzZSxcbiAgICBoaWRlX2hlYWRlcnM6IGZhbHNlLFxuICAgIGxpc3Rfb2Zfc3R5bGVzaGVldHM6IHtcbiAgICAgICAgZGFyazogXCJwbHVnaW5zL1wiICsgcGx1Z2luX2lkICsgXCIvY3NzL2RlZmF1bHQuZGFyay5jc3NcIixcbiAgICAgICAgbGlnaHQ6IFwicGx1Z2lucy9cIiArIHBsdWdpbl9pZCArIFwiL2Nzcy9kZWZhdWx0LmxpZ2h0LmNzc1wiXG4gICAgfSxcbiAgICBwYW5lbERlZmF1bHRzOiB7XG4gICAgICAgIGFjdGl2ZVBhdHRlcm5JbmRleDogLTEsXG4gICAgICAgIGRlZmF1bHRQYXR0ZXJuOiB7XG4gICAgICAgICAgICBiZ0NvbG9yczogXCJncmVlbnxvcmFuZ2V8cmVkXCIsXG4gICAgICAgICAgICBiZ0NvbG9yc19vdmVycmlkZXM6IFwiMC0+Z3JlZW58Mi0+cmVkfDEtPnllbGxvd1wiLFxuICAgICAgICAgICAgY2xpY2thYmxlX2NlbGxzX2xpbms6IFwiXCIsXG4gICAgICAgICAgICBjb2xfbmFtZTogXCJWYWx1ZVwiLFxuICAgICAgICAgICAgZGVjaW1hbHM6IDIsXG4gICAgICAgICAgICBkZWxpbWl0ZXI6IFwiLlwiLFxuICAgICAgICAgICAgZW5hYmxlX2JnQ29sb3I6IGZhbHNlLFxuICAgICAgICAgICAgZW5hYmxlX2JnQ29sb3Jfb3ZlcnJpZGVzOiBmYWxzZSxcbiAgICAgICAgICAgIGVuYWJsZV9jbGlja2FibGVfY2VsbHM6IGZhbHNlLFxuICAgICAgICAgICAgZW5hYmxlX3RpbWVfYmFzZWRfdGhyZXNob2xkczogZmFsc2UsXG4gICAgICAgICAgICBlbmFibGVfdHJhbnNmb3JtOiBmYWxzZSxcbiAgICAgICAgICAgIGVuYWJsZV90cmFuc2Zvcm1fb3ZlcnJpZGVzOiBmYWxzZSxcbiAgICAgICAgICAgIGZpbHRlcjoge1xuICAgICAgICAgICAgICAgIHZhbHVlX2Fib3ZlOiBcIlwiLFxuICAgICAgICAgICAgICAgIHZhbHVlX2JlbG93OiBcIlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZm9ybWF0OiBcIm5vbmVcIixcbiAgICAgICAgICAgIG51bGxfY29sb3I6IFwiZGFya3JlZFwiLFxuICAgICAgICAgICAgbnVsbF92YWx1ZTogXCJObyBkYXRhXCIsXG4gICAgICAgICAgICByb3dfbmFtZTogXCJfc2VyaWVzX1wiLFxuICAgICAgICAgICAgdGhyZXNob2xkczogXCI3MCw5MFwiLFxuICAgICAgICAgICAgdGltZV9iYXNlZF90aHJlc2hvbGRzOiBbXSxcbiAgICAgICAgICAgIHRyYW5zZm9ybV92YWx1ZXM6IFwiX3ZhbHVlX3xfdmFsdWVffF92YWx1ZV9cIixcbiAgICAgICAgICAgIHRyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzOiBcIjAtPmRvd258MS0+dXBcIixcbiAgICAgICAgICAgIHZhbHVlTmFtZTogXCJhdmdcIlxuICAgICAgICB9LFxuICAgICAgICBkZWZhdWx0X3RpdGxlX2Zvcl9yb3dzOiBcIk1ldHJpY1wiLFxuICAgICAgICBudWxsUG9pbnRNb2RlOiBcImNvbm5lY3RlZFwiLFxuICAgICAgICBwYXR0ZXJuczogW10sXG4gICAgICAgIHBsdWdpbl90aXRsZTogXCJCb29tIFRhYmxlXCIsXG4gICAgICAgIHJvd19jb2xfd3JhcHBlcjogXCJfXCIsXG4gICAgfSxcbiAgICBwbHVnaW5faWQ6IHBsdWdpbl9pZCxcbiAgICB2YWx1ZU5hbWVPcHRpb25zOiBbe1xuICAgICAgICB0ZXh0OiBcIk1pblwiLFxuICAgICAgICB2YWx1ZTogXCJtaW5cIixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgdGV4dDogXCJNYXhcIixcbiAgICAgICAgdmFsdWU6IFwibWF4XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgdGV4dDogXCJBdmVyYWdlXCIsXG4gICAgICAgIHZhbHVlOiBcImF2Z1wiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHRleHQ6IFwiQ3VycmVudFwiLFxuICAgICAgICB2YWx1ZTogXCJjdXJyZW50XCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgdGV4dDogXCJUb3RhbFwiLFxuICAgICAgICB2YWx1ZTogXCJ0b3RhbFwiXG4gICAgfVxuICAgIF1cbn07XG5cbmV4cG9ydCB7XG4gICAgY29uZmlnLFxuICAgIGtibixcbiAgICBsb2FkUGx1Z2luQ3NzLFxuICAgIE1ldHJpY3NQYW5lbEN0cmwsXG4gICAgVGltZVNlcmllcyxcbiAgICB1dGlscyxcbn07XG4iXX0=