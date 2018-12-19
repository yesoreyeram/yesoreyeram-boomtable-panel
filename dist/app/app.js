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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBRU8sYUFBRzt1Q0FFTixtQkFBYTswQ0FDYixzQkFBZ0I7b0NBRWIsc0JBQVU7O1lBR1gsU0FBUyxHQUFHLDZCQUE2QixDQUFDO1lBQzFDLE1BQU0sR0FBUTtnQkFDaEIsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLFVBQVUsRUFBRSxDQUFDO3dCQUNULElBQUksRUFBRSxVQUFVO3dCQUNoQixRQUFRLEVBQUUsQ0FBQzt3QkFDWCxRQUFRLEVBQUUseUJBQXlCO3FCQUN0QztvQkFDRDt3QkFDSSxJQUFJLEVBQUUsaUNBQWlDO3dCQUN2QyxRQUFRLEVBQUUsQ0FBQzt3QkFDWCxRQUFRLEVBQUUsMENBQTBDO3FCQUN2RCxFQUFFO3dCQUNDLElBQUksRUFBRSxTQUFTO3dCQUNmLFFBQVEsRUFBRSxDQUFDO3dCQUNYLFFBQVEsRUFBRSx3QkFBd0I7cUJBQ3JDLENBQUM7Z0JBQ0YsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLFdBQVcsRUFBRSxTQUFTO2dCQUN0QixpQkFBaUIsRUFBRSxLQUFLO2dCQUN4QixZQUFZLEVBQUUsS0FBSztnQkFDbkIsbUJBQW1CLEVBQUU7b0JBQ2pCLElBQUksRUFBRSxVQUFVLEdBQUcsU0FBUyxHQUFHLHVCQUF1QjtvQkFDdEQsS0FBSyxFQUFFLFVBQVUsR0FBRyxTQUFTLEdBQUcsd0JBQXdCO2lCQUMzRDtnQkFDRCxhQUFhLEVBQUU7b0JBQ1gsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO29CQUN0QixjQUFjLEVBQUU7d0JBQ1osUUFBUSxFQUFFLGtCQUFrQjt3QkFDNUIsa0JBQWtCLEVBQUUsMkJBQTJCO3dCQUMvQyxvQkFBb0IsRUFBRSxFQUFFO3dCQUN4QixRQUFRLEVBQUUsT0FBTzt3QkFDakIsUUFBUSxFQUFFLENBQUM7d0JBQ1gsU0FBUyxFQUFFLEdBQUc7d0JBQ2QsY0FBYyxFQUFFLEtBQUs7d0JBQ3JCLHdCQUF3QixFQUFFLEtBQUs7d0JBQy9CLHNCQUFzQixFQUFFLEtBQUs7d0JBQzdCLDRCQUE0QixFQUFFLEtBQUs7d0JBQ25DLGdCQUFnQixFQUFFLEtBQUs7d0JBQ3ZCLDBCQUEwQixFQUFFLEtBQUs7d0JBQ2pDLE1BQU0sRUFBRTs0QkFDSixXQUFXLEVBQUUsRUFBRTs0QkFDZixXQUFXLEVBQUUsRUFBRTt5QkFDbEI7d0JBQ0QsTUFBTSxFQUFFLE1BQU07d0JBQ2QsVUFBVSxFQUFFLFNBQVM7d0JBQ3JCLFVBQVUsRUFBRSxTQUFTO3dCQUNyQixRQUFRLEVBQUUsVUFBVTt3QkFDcEIsVUFBVSxFQUFFLE9BQU87d0JBQ25CLHFCQUFxQixFQUFFLEVBQUU7d0JBQ3pCLGdCQUFnQixFQUFFLHlCQUF5Qjt3QkFDM0MsMEJBQTBCLEVBQUUsZUFBZTt3QkFDM0MsU0FBUyxFQUFFLEtBQUs7cUJBQ25CO29CQUNELHNCQUFzQixFQUFFLFFBQVE7b0JBQ2hDLGFBQWEsRUFBRSxXQUFXO29CQUMxQixRQUFRLEVBQUUsRUFBRTtvQkFDWixZQUFZLEVBQUUsWUFBWTtvQkFDMUIsZUFBZSxFQUFFLEdBQUc7aUJBQ3ZCO2dCQUNELFNBQVMsRUFBRSxTQUFTO2dCQUNwQixnQkFBZ0IsRUFBRSxDQUFDO3dCQUNmLElBQUksRUFBRSxLQUFLO3dCQUNYLEtBQUssRUFBRSxLQUFLO3FCQUNmO29CQUNEO3dCQUNJLElBQUksRUFBRSxLQUFLO3dCQUNYLEtBQUssRUFBRSxLQUFLO3FCQUNmO29CQUNEO3dCQUNJLElBQUksRUFBRSxTQUFTO3dCQUNmLEtBQUssRUFBRSxLQUFLO3FCQUNmO29CQUNEO3dCQUNJLElBQUksRUFBRSxTQUFTO3dCQUNmLEtBQUssRUFBRSxTQUFTO3FCQUNuQjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsT0FBTzt3QkFDYixLQUFLLEVBQUUsT0FBTztxQkFDakI7aUJBQ0E7YUFDSixDQUFDOztRQVVGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9ub2RlX21vZHVsZXMvZ3JhZmFuYS1zZGstbW9ja3MvYXBwL2hlYWRlcnMvY29tbW9uLmQudHNcIiAvPlxuXG5pbXBvcnQga2JuIGZyb20gJ2FwcC9jb3JlL3V0aWxzL2tibic7XG5pbXBvcnQge1xuICAgIGxvYWRQbHVnaW5Dc3MsXG4gICAgTWV0cmljc1BhbmVsQ3RybFxufSBmcm9tIFwiYXBwL3BsdWdpbnMvc2RrXCI7XG5pbXBvcnQgVGltZVNlcmllcyBmcm9tIFwiYXBwL2NvcmUvdGltZV9zZXJpZXMyXCI7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiLi91dGlsc1wiO1xuXG5jb25zdCBwbHVnaW5faWQgPSBcInllc29yZXllcmFtLWJvb210YWJsZS1wYW5lbFwiO1xuY29uc3QgY29uZmlnOiBhbnkgPSB7XG4gICAgZGVidWdfbW9kZTogZmFsc2UsXG4gICAgZWRpdG9yVGFiczogW3tcbiAgICAgICAgbmFtZTogXCJQYXR0ZXJuc1wiLFxuICAgICAgICBwb3NpdGlvbjogMixcbiAgICAgICAgdGVtcGxhdGU6IFwiL3BhcnRpYWxzL3BhdHRlcm5zLmh0bWxcIlxuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiBcIlRpbWUgYmFzZWQgdGhyZXNob2xkcyAmIEZpbHRlcnNcIixcbiAgICAgICAgcG9zaXRpb246IDMsXG4gICAgICAgIHRlbXBsYXRlOiBcIi9wYXJ0aWFscy9wYXR0ZXJucy1hZHZhbmNlZC1vcHRpb25zLmh0bWxcIlxuICAgIH0sIHtcbiAgICAgICAgbmFtZTogXCJPcHRpb25zXCIsXG4gICAgICAgIHBvc2l0aW9uOiA0LFxuICAgICAgICB0ZW1wbGF0ZTogXCIvcGFydGlhbHMvb3B0aW9ucy5odG1sXCJcbiAgICB9XSxcbiAgICBlcnJvcjogdW5kZWZpbmVkLFxuICAgIGdyb3VwZWREYXRhOiB1bmRlZmluZWQsXG4gICAgaGlkZV9maXJzdF9jb2x1bW46IGZhbHNlLFxuICAgIGhpZGVfaGVhZGVyczogZmFsc2UsXG4gICAgbGlzdF9vZl9zdHlsZXNoZWV0czoge1xuICAgICAgICBkYXJrOiBcInBsdWdpbnMvXCIgKyBwbHVnaW5faWQgKyBcIi9jc3MvZGVmYXVsdC5kYXJrLmNzc1wiLFxuICAgICAgICBsaWdodDogXCJwbHVnaW5zL1wiICsgcGx1Z2luX2lkICsgXCIvY3NzL2RlZmF1bHQubGlnaHQuY3NzXCJcbiAgICB9LFxuICAgIHBhbmVsRGVmYXVsdHM6IHtcbiAgICAgICAgYWN0aXZlUGF0dGVybkluZGV4OiAtMSxcbiAgICAgICAgZGVmYXVsdFBhdHRlcm46IHtcbiAgICAgICAgICAgIGJnQ29sb3JzOiBcImdyZWVufG9yYW5nZXxyZWRcIixcbiAgICAgICAgICAgIGJnQ29sb3JzX292ZXJyaWRlczogXCIwLT5ncmVlbnwyLT5yZWR8MS0+eWVsbG93XCIsXG4gICAgICAgICAgICBjbGlja2FibGVfY2VsbHNfbGluazogXCJcIixcbiAgICAgICAgICAgIGNvbF9uYW1lOiBcIlZhbHVlXCIsXG4gICAgICAgICAgICBkZWNpbWFsczogMixcbiAgICAgICAgICAgIGRlbGltaXRlcjogXCIuXCIsXG4gICAgICAgICAgICBlbmFibGVfYmdDb2xvcjogZmFsc2UsXG4gICAgICAgICAgICBlbmFibGVfYmdDb2xvcl9vdmVycmlkZXM6IGZhbHNlLFxuICAgICAgICAgICAgZW5hYmxlX2NsaWNrYWJsZV9jZWxsczogZmFsc2UsXG4gICAgICAgICAgICBlbmFibGVfdGltZV9iYXNlZF90aHJlc2hvbGRzOiBmYWxzZSxcbiAgICAgICAgICAgIGVuYWJsZV90cmFuc2Zvcm06IGZhbHNlLFxuICAgICAgICAgICAgZW5hYmxlX3RyYW5zZm9ybV9vdmVycmlkZXM6IGZhbHNlLFxuICAgICAgICAgICAgZmlsdGVyOiB7XG4gICAgICAgICAgICAgICAgdmFsdWVfYWJvdmU6IFwiXCIsXG4gICAgICAgICAgICAgICAgdmFsdWVfYmVsb3c6IFwiXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb3JtYXQ6IFwibm9uZVwiLFxuICAgICAgICAgICAgbnVsbF9jb2xvcjogXCJkYXJrcmVkXCIsXG4gICAgICAgICAgICBudWxsX3ZhbHVlOiBcIk5vIGRhdGFcIixcbiAgICAgICAgICAgIHJvd19uYW1lOiBcIl9zZXJpZXNfXCIsXG4gICAgICAgICAgICB0aHJlc2hvbGRzOiBcIjcwLDkwXCIsXG4gICAgICAgICAgICB0aW1lX2Jhc2VkX3RocmVzaG9sZHM6IFtdLFxuICAgICAgICAgICAgdHJhbnNmb3JtX3ZhbHVlczogXCJfdmFsdWVffF92YWx1ZV98X3ZhbHVlX1wiLFxuICAgICAgICAgICAgdHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXM6IFwiMC0+ZG93bnwxLT51cFwiLFxuICAgICAgICAgICAgdmFsdWVOYW1lOiBcImF2Z1wiXG4gICAgICAgIH0sXG4gICAgICAgIGRlZmF1bHRfdGl0bGVfZm9yX3Jvd3M6IFwiTWV0cmljXCIsXG4gICAgICAgIG51bGxQb2ludE1vZGU6IFwiY29ubmVjdGVkXCIsXG4gICAgICAgIHBhdHRlcm5zOiBbXSxcbiAgICAgICAgcGx1Z2luX3RpdGxlOiBcIkJvb20gVGFibGVcIixcbiAgICAgICAgcm93X2NvbF93cmFwcGVyOiBcIl9cIixcbiAgICB9LFxuICAgIHBsdWdpbl9pZDogcGx1Z2luX2lkLFxuICAgIHZhbHVlTmFtZU9wdGlvbnM6IFt7XG4gICAgICAgIHRleHQ6IFwiTWluXCIsXG4gICAgICAgIHZhbHVlOiBcIm1pblwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICB0ZXh0OiBcIk1heFwiLFxuICAgICAgICB2YWx1ZTogXCJtYXhcIlxuICAgIH0sXG4gICAge1xuICAgICAgICB0ZXh0OiBcIkF2ZXJhZ2VcIixcbiAgICAgICAgdmFsdWU6IFwiYXZnXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgdGV4dDogXCJDdXJyZW50XCIsXG4gICAgICAgIHZhbHVlOiBcImN1cnJlbnRcIlxuICAgIH0sXG4gICAge1xuICAgICAgICB0ZXh0OiBcIlRvdGFsXCIsXG4gICAgICAgIHZhbHVlOiBcInRvdGFsXCJcbiAgICB9XG4gICAgXVxufTtcblxuZXhwb3J0IHtcbiAgICBjb25maWcsXG4gICAga2JuLFxuICAgIGxvYWRQbHVnaW5Dc3MsXG4gICAgTWV0cmljc1BhbmVsQ3RybCxcbiAgICBUaW1lU2VyaWVzLFxuICAgIHV0aWxzLFxufTtcbiJdfQ==