System.register(["app/core/utils/kbn", "app/plugins/sdk", "app/core/time_series2", "./BoomTablePattern", "./utils"], function (exports_1, context_1) {
    "use strict";
    var kbn_1, sdk_1, time_series2_1, BoomTablePattern_1, utils, plugin_id, defaultPattern, config;
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
            function (BoomTablePattern_1_1) {
                BoomTablePattern_1 = BoomTablePattern_1_1;
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
            defaultPattern = new BoomTablePattern_1.BoomTablePattern({
                bgColors: "green|orange|red",
                bgColors_overrides: "0->green|2->red|1->yellow",
                clickable_cells_link: "",
                col_name: "Value",
                decimals: 2,
                delimiter: ".",
                format: "none",
                name: "Default Pattern",
                null_color: "darkred",
                null_value: "No data",
                pattern: "*",
                row_name: "_series_",
                thresholds: "70,90",
                time_based_thresholds: [],
                transform_values: "_value_|_value_|_value_",
                transform_values_overrides: "0->down|1->up",
                valueName: "avg"
            });
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
                    defaultPattern: defaultPattern,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBRU8sYUFBRzt1Q0FFTixtQkFBYTswQ0FDYixzQkFBZ0I7b0NBRWIsc0JBQVU7O1lBSVgsU0FBUyxHQUFHLDZCQUE2QixDQUFDO1lBQzFDLGNBQWMsR0FBRyxJQUFJLG1DQUFnQixDQUFDO2dCQUN4QyxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixrQkFBa0IsRUFBRSwyQkFBMkI7Z0JBQy9DLG9CQUFvQixFQUFFLEVBQUU7Z0JBQ3hCLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUsQ0FBQztnQkFDWCxTQUFTLEVBQUUsR0FBRztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsaUJBQWlCO2dCQUN2QixVQUFVLEVBQUUsU0FBUztnQkFDckIsVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLE9BQU8sRUFBRyxHQUFHO2dCQUNiLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixVQUFVLEVBQUUsT0FBTztnQkFDbkIscUJBQXFCLEVBQUUsRUFBRTtnQkFDekIsZ0JBQWdCLEVBQUUseUJBQXlCO2dCQUMzQywwQkFBMEIsRUFBRSxlQUFlO2dCQUMzQyxTQUFTLEVBQUUsS0FBSzthQUNuQixDQUFDLENBQUM7WUFDRyxNQUFNLEdBQVE7Z0JBQ2hCLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixVQUFVLEVBQUUsQ0FBQzt3QkFDVCxJQUFJLEVBQUUsVUFBVTt3QkFDaEIsUUFBUSxFQUFFLENBQUM7d0JBQ1gsUUFBUSxFQUFFLHlCQUF5QjtxQkFDdEM7b0JBQ0Q7d0JBQ0ksSUFBSSxFQUFFLGlDQUFpQzt3QkFDdkMsUUFBUSxFQUFFLENBQUM7d0JBQ1gsUUFBUSxFQUFFLDBDQUEwQztxQkFDdkQsRUFBRTt3QkFDQyxJQUFJLEVBQUUsU0FBUzt3QkFDZixRQUFRLEVBQUUsQ0FBQzt3QkFDWCxRQUFRLEVBQUUsd0JBQXdCO3FCQUNyQyxDQUFDO2dCQUNGLEtBQUssRUFBRSxTQUFTO2dCQUNoQixXQUFXLEVBQUUsU0FBUztnQkFDdEIsaUJBQWlCLEVBQUUsS0FBSztnQkFDeEIsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLG1CQUFtQixFQUFFO29CQUNqQixJQUFJLEVBQUUsVUFBVSxHQUFHLFNBQVMsR0FBRyx1QkFBdUI7b0JBQ3RELEtBQUssRUFBRSxVQUFVLEdBQUcsU0FBUyxHQUFHLHdCQUF3QjtpQkFDM0Q7Z0JBQ0QsYUFBYSxFQUFFO29CQUNYLGtCQUFrQixFQUFFLENBQUMsQ0FBQztvQkFDdEIsY0FBYyxFQUFFLGNBQWM7b0JBQzlCLHNCQUFzQixFQUFFLFFBQVE7b0JBQ2hDLGFBQWEsRUFBRSxXQUFXO29CQUMxQixRQUFRLEVBQUUsRUFBRTtvQkFDWixZQUFZLEVBQUUsWUFBWTtvQkFDMUIsZUFBZSxFQUFFLEdBQUc7aUJBQ3ZCO2dCQUNELFNBQVMsRUFBRSxTQUFTO2dCQUNwQixnQkFBZ0IsRUFBRSxDQUFDO3dCQUNmLElBQUksRUFBRSxLQUFLO3dCQUNYLEtBQUssRUFBRSxLQUFLO3FCQUNmO29CQUNEO3dCQUNJLElBQUksRUFBRSxLQUFLO3dCQUNYLEtBQUssRUFBRSxLQUFLO3FCQUNmO29CQUNEO3dCQUNJLElBQUksRUFBRSxTQUFTO3dCQUNmLEtBQUssRUFBRSxLQUFLO3FCQUNmO29CQUNEO3dCQUNJLElBQUksRUFBRSxTQUFTO3dCQUNmLEtBQUssRUFBRSxTQUFTO3FCQUNuQjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsT0FBTzt3QkFDYixLQUFLLEVBQUUsT0FBTztxQkFDakI7aUJBQ0E7YUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbm9kZV9tb2R1bGVzL2dyYWZhbmEtc2RrLW1vY2tzL2FwcC9oZWFkZXJzL2NvbW1vbi5kLnRzXCIgLz5cblxuaW1wb3J0IGtibiBmcm9tICdhcHAvY29yZS91dGlscy9rYm4nO1xuaW1wb3J0IHtcbiAgICBsb2FkUGx1Z2luQ3NzLFxuICAgIE1ldHJpY3NQYW5lbEN0cmxcbn0gZnJvbSBcImFwcC9wbHVnaW5zL3Nka1wiO1xuaW1wb3J0IFRpbWVTZXJpZXMgZnJvbSBcImFwcC9jb3JlL3RpbWVfc2VyaWVzMlwiO1xuaW1wb3J0IHsgQm9vbVRhYmxlUGF0dGVybiB9IGZyb20gJy4vQm9vbVRhYmxlUGF0dGVybic7XG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiLi91dGlsc1wiO1xuXG5jb25zdCBwbHVnaW5faWQgPSBcInllc29yZXllcmFtLWJvb210YWJsZS1wYW5lbFwiO1xuY29uc3QgZGVmYXVsdFBhdHRlcm4gPSBuZXcgQm9vbVRhYmxlUGF0dGVybih7XG4gICAgYmdDb2xvcnM6IFwiZ3JlZW58b3JhbmdlfHJlZFwiLFxuICAgIGJnQ29sb3JzX292ZXJyaWRlczogXCIwLT5ncmVlbnwyLT5yZWR8MS0+eWVsbG93XCIsXG4gICAgY2xpY2thYmxlX2NlbGxzX2xpbms6IFwiXCIsXG4gICAgY29sX25hbWU6IFwiVmFsdWVcIixcbiAgICBkZWNpbWFsczogMixcbiAgICBkZWxpbWl0ZXI6IFwiLlwiLFxuICAgIGZvcm1hdDogXCJub25lXCIsXG4gICAgbmFtZTogXCJEZWZhdWx0IFBhdHRlcm5cIixcbiAgICBudWxsX2NvbG9yOiBcImRhcmtyZWRcIixcbiAgICBudWxsX3ZhbHVlOiBcIk5vIGRhdGFcIixcbiAgICBwYXR0ZXJuIDogXCIqXCIsXG4gICAgcm93X25hbWU6IFwiX3Nlcmllc19cIixcbiAgICB0aHJlc2hvbGRzOiBcIjcwLDkwXCIsXG4gICAgdGltZV9iYXNlZF90aHJlc2hvbGRzOiBbXSxcbiAgICB0cmFuc2Zvcm1fdmFsdWVzOiBcIl92YWx1ZV98X3ZhbHVlX3xfdmFsdWVfXCIsXG4gICAgdHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXM6IFwiMC0+ZG93bnwxLT51cFwiLFxuICAgIHZhbHVlTmFtZTogXCJhdmdcIlxufSk7XG5jb25zdCBjb25maWc6IGFueSA9IHtcbiAgICBkZWJ1Z19tb2RlOiBmYWxzZSxcbiAgICBlZGl0b3JUYWJzOiBbe1xuICAgICAgICBuYW1lOiBcIlBhdHRlcm5zXCIsXG4gICAgICAgIHBvc2l0aW9uOiAyLFxuICAgICAgICB0ZW1wbGF0ZTogXCIvcGFydGlhbHMvcGF0dGVybnMuaHRtbFwiXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6IFwiVGltZSBiYXNlZCB0aHJlc2hvbGRzICYgRmlsdGVyc1wiLFxuICAgICAgICBwb3NpdGlvbjogMyxcbiAgICAgICAgdGVtcGxhdGU6IFwiL3BhcnRpYWxzL3BhdHRlcm5zLWFkdmFuY2VkLW9wdGlvbnMuaHRtbFwiXG4gICAgfSwge1xuICAgICAgICBuYW1lOiBcIk9wdGlvbnNcIixcbiAgICAgICAgcG9zaXRpb246IDQsXG4gICAgICAgIHRlbXBsYXRlOiBcIi9wYXJ0aWFscy9vcHRpb25zLmh0bWxcIlxuICAgIH1dLFxuICAgIGVycm9yOiB1bmRlZmluZWQsXG4gICAgZ3JvdXBlZERhdGE6IHVuZGVmaW5lZCxcbiAgICBoaWRlX2ZpcnN0X2NvbHVtbjogZmFsc2UsXG4gICAgaGlkZV9oZWFkZXJzOiBmYWxzZSxcbiAgICBsaXN0X29mX3N0eWxlc2hlZXRzOiB7XG4gICAgICAgIGRhcms6IFwicGx1Z2lucy9cIiArIHBsdWdpbl9pZCArIFwiL2Nzcy9kZWZhdWx0LmRhcmsuY3NzXCIsXG4gICAgICAgIGxpZ2h0OiBcInBsdWdpbnMvXCIgKyBwbHVnaW5faWQgKyBcIi9jc3MvZGVmYXVsdC5saWdodC5jc3NcIlxuICAgIH0sXG4gICAgcGFuZWxEZWZhdWx0czoge1xuICAgICAgICBhY3RpdmVQYXR0ZXJuSW5kZXg6IC0xLFxuICAgICAgICBkZWZhdWx0UGF0dGVybjogZGVmYXVsdFBhdHRlcm4sXG4gICAgICAgIGRlZmF1bHRfdGl0bGVfZm9yX3Jvd3M6IFwiTWV0cmljXCIsXG4gICAgICAgIG51bGxQb2ludE1vZGU6IFwiY29ubmVjdGVkXCIsXG4gICAgICAgIHBhdHRlcm5zOiBbXSxcbiAgICAgICAgcGx1Z2luX3RpdGxlOiBcIkJvb20gVGFibGVcIixcbiAgICAgICAgcm93X2NvbF93cmFwcGVyOiBcIl9cIixcbiAgICB9LFxuICAgIHBsdWdpbl9pZDogcGx1Z2luX2lkLFxuICAgIHZhbHVlTmFtZU9wdGlvbnM6IFt7XG4gICAgICAgIHRleHQ6IFwiTWluXCIsXG4gICAgICAgIHZhbHVlOiBcIm1pblwiLFxuICAgIH0sXG4gICAge1xuICAgICAgICB0ZXh0OiBcIk1heFwiLFxuICAgICAgICB2YWx1ZTogXCJtYXhcIlxuICAgIH0sXG4gICAge1xuICAgICAgICB0ZXh0OiBcIkF2ZXJhZ2VcIixcbiAgICAgICAgdmFsdWU6IFwiYXZnXCJcbiAgICB9LFxuICAgIHtcbiAgICAgICAgdGV4dDogXCJDdXJyZW50XCIsXG4gICAgICAgIHZhbHVlOiBcImN1cnJlbnRcIlxuICAgIH0sXG4gICAge1xuICAgICAgICB0ZXh0OiBcIlRvdGFsXCIsXG4gICAgICAgIHZhbHVlOiBcInRvdGFsXCJcbiAgICB9XG4gICAgXVxufTtcblxuZXhwb3J0IHtcbiAgICBjb25maWcsXG4gICAga2JuLFxuICAgIGxvYWRQbHVnaW5Dc3MsXG4gICAgTWV0cmljc1BhbmVsQ3RybCxcbiAgICBUaW1lU2VyaWVzLFxuICAgIHV0aWxzLFxufTtcbiJdfQ==