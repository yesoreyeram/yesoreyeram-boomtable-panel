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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBRU8sYUFBRzt1Q0FFTixtQkFBYTswQ0FDYixzQkFBZ0I7b0NBRWIsc0JBQVU7O1lBR1gsU0FBUyxHQUFHLDZCQUE2QixDQUFDO1lBQzFDLE1BQU0sR0FBUTtnQkFDaEIsU0FBUyxFQUFFLFNBQVM7Z0JBQ3BCLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixpQkFBaUIsRUFBRSxLQUFLO2dCQUN4QixZQUFZLEVBQUUsS0FBSztnQkFDbkIsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLFdBQVcsRUFBRSxTQUFTO2dCQUN0QixhQUFhLEVBQUU7b0JBQ1gsWUFBWSxFQUFFLFlBQVk7b0JBQzFCLGFBQWEsRUFBRSxXQUFXO29CQUMxQixRQUFRLEVBQUUsRUFBRTtvQkFDWixjQUFjLEVBQUU7d0JBQ1osU0FBUyxFQUFFLEdBQUc7d0JBQ2QsU0FBUyxFQUFFLEtBQUs7d0JBQ2hCLFFBQVEsRUFBRSxVQUFVO3dCQUNwQixRQUFRLEVBQUUsT0FBTzt3QkFDakIsVUFBVSxFQUFFLE9BQU87d0JBQ25CLHFCQUFxQixFQUFFLEVBQUU7d0JBQ3pCLDRCQUE0QixFQUFFLEtBQUs7d0JBQ25DLGNBQWMsRUFBRSxLQUFLO3dCQUNyQixRQUFRLEVBQUUsa0JBQWtCO3dCQUM1Qix3QkFBd0IsRUFBRSxLQUFLO3dCQUMvQixrQkFBa0IsRUFBRSwyQkFBMkI7d0JBQy9DLGdCQUFnQixFQUFFLEtBQUs7d0JBQ3ZCLGdCQUFnQixFQUFFLHlCQUF5Qjt3QkFDM0MsMEJBQTBCLEVBQUUsS0FBSzt3QkFDakMsMEJBQTBCLEVBQUUsZUFBZTt3QkFDM0MsUUFBUSxFQUFFLENBQUM7d0JBQ1gsTUFBTSxFQUFFLE1BQU07d0JBQ2QsVUFBVSxFQUFFLFNBQVM7d0JBQ3JCLFVBQVUsRUFBRSxTQUFTO3dCQUNyQixzQkFBc0IsRUFBRSxLQUFLO3dCQUM3QixvQkFBb0IsRUFBRSxFQUFFO3dCQUN4QixNQUFNLEVBQUU7NEJBQ0osV0FBVyxFQUFFLEVBQUU7NEJBQ2YsV0FBVyxFQUFFLEVBQUU7eUJBQ2xCO3FCQUNKO29CQUNELGtCQUFrQixFQUFFLENBQUMsQ0FBQztvQkFDdEIsZUFBZSxFQUFFLEdBQUc7b0JBQ3BCLHNCQUFzQixFQUFFLFFBQVE7aUJBQ25DO2dCQUNELG1CQUFtQixFQUFFO29CQUNqQixJQUFJLEVBQUUsVUFBVSxHQUFHLFNBQVMsR0FBRyx1QkFBdUI7b0JBQ3RELEtBQUssRUFBRSxVQUFVLEdBQUcsU0FBUyxHQUFHLHdCQUF3QjtpQkFDM0Q7Z0JBQ0QsVUFBVSxFQUFFLENBQUM7d0JBQ1QsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLFFBQVEsRUFBRSx5QkFBeUI7d0JBQ25DLFFBQVEsRUFBRSxDQUFDO3FCQUNkO29CQUNEO3dCQUNJLElBQUksRUFBRSxpQ0FBaUM7d0JBQ3ZDLFFBQVEsRUFBRSwwQ0FBMEM7d0JBQ3BELFFBQVEsRUFBRSxDQUFDO3FCQUNkLEVBQUU7d0JBQ0MsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsUUFBUSxFQUFFLHdCQUF3Qjt3QkFDbEMsUUFBUSxFQUFFLENBQUM7cUJBQ2QsQ0FBQztnQkFDRixnQkFBZ0IsRUFBRSxDQUFDO3dCQUNmLEtBQUssRUFBRSxLQUFLO3dCQUNaLElBQUksRUFBRSxLQUFLO3FCQUNkO29CQUNEO3dCQUNJLEtBQUssRUFBRSxLQUFLO3dCQUNaLElBQUksRUFBRSxLQUFLO3FCQUNkO29CQUNEO3dCQUNJLEtBQUssRUFBRSxLQUFLO3dCQUNaLElBQUksRUFBRSxTQUFTO3FCQUNsQjtvQkFDRDt3QkFDSSxLQUFLLEVBQUUsU0FBUzt3QkFDaEIsSUFBSSxFQUFFLFNBQVM7cUJBQ2xCO29CQUNEO3dCQUNJLEtBQUssRUFBRSxPQUFPO3dCQUNkLElBQUksRUFBRSxPQUFPO3FCQUNoQjtpQkFDQTthQUNKLENBQUM7O1FBVUYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL25vZGVfbW9kdWxlcy9ncmFmYW5hLXNkay1tb2Nrcy9hcHAvaGVhZGVycy9jb21tb24uZC50c1wiIC8+XG5cbmltcG9ydCBrYm4gZnJvbSAnYXBwL2NvcmUvdXRpbHMva2JuJztcbmltcG9ydCB7XG4gICAgbG9hZFBsdWdpbkNzcyxcbiAgICBNZXRyaWNzUGFuZWxDdHJsXG59IGZyb20gXCJhcHAvcGx1Z2lucy9zZGtcIjtcbmltcG9ydCBUaW1lU2VyaWVzIGZyb20gXCJhcHAvY29yZS90aW1lX3NlcmllczJcIjtcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5cbmNvbnN0IHBsdWdpbl9pZCA9IFwieWVzb3JleWVyYW0tYm9vbXRhYmxlLXBhbmVsXCI7XG5jb25zdCBjb25maWc6IGFueSA9IHtcbiAgICBwbHVnaW5faWQ6IHBsdWdpbl9pZCxcbiAgICBkZWJ1Z19tb2RlOiBmYWxzZSxcbiAgICBoaWRlX2ZpcnN0X2NvbHVtbjogZmFsc2UsXG4gICAgaGlkZV9oZWFkZXJzOiBmYWxzZSxcbiAgICBlcnJvcjogdW5kZWZpbmVkLFxuICAgIGdyb3VwZWREYXRhOiB1bmRlZmluZWQsXG4gICAgcGFuZWxEZWZhdWx0czoge1xuICAgICAgICBwbHVnaW5fdGl0bGU6IFwiQm9vbSBUYWJsZVwiLFxuICAgICAgICBudWxsUG9pbnRNb2RlOiBcImNvbm5lY3RlZFwiLFxuICAgICAgICBwYXR0ZXJuczogW10sXG4gICAgICAgIGRlZmF1bHRQYXR0ZXJuOiB7XG4gICAgICAgICAgICBkZWxpbWl0ZXI6IFwiLlwiLFxuICAgICAgICAgICAgdmFsdWVOYW1lOiBcImF2Z1wiLFxuICAgICAgICAgICAgcm93X25hbWU6IFwiX3Nlcmllc19cIixcbiAgICAgICAgICAgIGNvbF9uYW1lOiBcIlZhbHVlXCIsXG4gICAgICAgICAgICB0aHJlc2hvbGRzOiBcIjcwLDkwXCIsXG4gICAgICAgICAgICB0aW1lX2Jhc2VkX3RocmVzaG9sZHM6IFtdLFxuICAgICAgICAgICAgZW5hYmxlX3RpbWVfYmFzZWRfdGhyZXNob2xkczogZmFsc2UsXG4gICAgICAgICAgICBlbmFibGVfYmdDb2xvcjogZmFsc2UsXG4gICAgICAgICAgICBiZ0NvbG9yczogXCJncmVlbnxvcmFuZ2V8cmVkXCIsXG4gICAgICAgICAgICBlbmFibGVfYmdDb2xvcl9vdmVycmlkZXM6IGZhbHNlLFxuICAgICAgICAgICAgYmdDb2xvcnNfb3ZlcnJpZGVzOiBcIjAtPmdyZWVufDItPnJlZHwxLT55ZWxsb3dcIixcbiAgICAgICAgICAgIGVuYWJsZV90cmFuc2Zvcm06IGZhbHNlLFxuICAgICAgICAgICAgdHJhbnNmb3JtX3ZhbHVlczogXCJfdmFsdWVffF92YWx1ZV98X3ZhbHVlX1wiLFxuICAgICAgICAgICAgZW5hYmxlX3RyYW5zZm9ybV9vdmVycmlkZXM6IGZhbHNlLFxuICAgICAgICAgICAgdHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXM6IFwiMC0+ZG93bnwxLT51cFwiLFxuICAgICAgICAgICAgZGVjaW1hbHM6IDIsXG4gICAgICAgICAgICBmb3JtYXQ6IFwibm9uZVwiLFxuICAgICAgICAgICAgbnVsbF9jb2xvcjogXCJkYXJrcmVkXCIsXG4gICAgICAgICAgICBudWxsX3ZhbHVlOiBcIk5vIGRhdGFcIixcbiAgICAgICAgICAgIGVuYWJsZV9jbGlja2FibGVfY2VsbHM6IGZhbHNlLFxuICAgICAgICAgICAgY2xpY2thYmxlX2NlbGxzX2xpbms6IFwiXCIsXG4gICAgICAgICAgICBmaWx0ZXI6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZV9iZWxvdzogXCJcIixcbiAgICAgICAgICAgICAgICB2YWx1ZV9hYm92ZTogXCJcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBhY3RpdmVQYXR0ZXJuSW5kZXg6IC0xLFxuICAgICAgICByb3dfY29sX3dyYXBwZXI6IFwiX1wiLFxuICAgICAgICBkZWZhdWx0X3RpdGxlX2Zvcl9yb3dzOiBcIk1ldHJpY1wiXG4gICAgfSxcbiAgICBsaXN0X29mX3N0eWxlc2hlZXRzOiB7XG4gICAgICAgIGRhcms6IFwicGx1Z2lucy9cIiArIHBsdWdpbl9pZCArIFwiL2Nzcy9kZWZhdWx0LmRhcmsuY3NzXCIsXG4gICAgICAgIGxpZ2h0OiBcInBsdWdpbnMvXCIgKyBwbHVnaW5faWQgKyBcIi9jc3MvZGVmYXVsdC5saWdodC5jc3NcIlxuICAgIH0sXG4gICAgZWRpdG9yVGFiczogW3tcbiAgICAgICAgbmFtZTogXCJQYXR0ZXJuc1wiLFxuICAgICAgICB0ZW1wbGF0ZTogXCIvcGFydGlhbHMvcGF0dGVybnMuaHRtbFwiLFxuICAgICAgICBwb3NpdGlvbjogMlxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcIlRpbWUgYmFzZWQgdGhyZXNob2xkcyAmIEZpbHRlcnNcIixcbiAgICAgICAgdGVtcGxhdGU6IFwiL3BhcnRpYWxzL3BhdHRlcm5zLWFkdmFuY2VkLW9wdGlvbnMuaHRtbFwiLFxuICAgICAgICBwb3NpdGlvbjogM1xuICAgIH0sIHtcbiAgICAgICAgbmFtZTogXCJPcHRpb25zXCIsXG4gICAgICAgIHRlbXBsYXRlOiBcIi9wYXJ0aWFscy9vcHRpb25zLmh0bWxcIixcbiAgICAgICAgcG9zaXRpb246IDRcbiAgICB9XSxcbiAgICB2YWx1ZU5hbWVPcHRpb25zOiBbe1xuICAgICAgICB2YWx1ZTogXCJtaW5cIixcbiAgICAgICAgdGV4dDogXCJNaW5cIlxuICAgIH0sXG4gICAge1xuICAgICAgICB2YWx1ZTogXCJtYXhcIixcbiAgICAgICAgdGV4dDogXCJNYXhcIlxuICAgIH0sXG4gICAge1xuICAgICAgICB2YWx1ZTogXCJhdmdcIixcbiAgICAgICAgdGV4dDogXCJBdmVyYWdlXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgdmFsdWU6IFwiY3VycmVudFwiLFxuICAgICAgICB0ZXh0OiBcIkN1cnJlbnRcIlxuICAgIH0sXG4gICAge1xuICAgICAgICB2YWx1ZTogXCJ0b3RhbFwiLFxuICAgICAgICB0ZXh0OiBcIlRvdGFsXCJcbiAgICB9XG4gICAgXSxcbn07XG5cbmV4cG9ydCB7XG4gICAga2JuLFxuICAgIGxvYWRQbHVnaW5Dc3MsXG4gICAgTWV0cmljc1BhbmVsQ3RybCxcbiAgICBUaW1lU2VyaWVzLFxuICAgIHV0aWxzLFxuICAgIGNvbmZpZ1xufVxuIl19