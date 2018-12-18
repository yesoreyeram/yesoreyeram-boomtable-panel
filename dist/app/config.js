System.register(["./utils"], function (exports_1, context_1) {
    "use strict";
    var utils, plugin_id, defaultPattern, config;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (utils_1) {
                utils = utils_1;
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
                tooltipTemplate: "Series : _series_ | Value : _value_",
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
                debug_mode: false,
                error: undefined,
                panelDefaults: {
                    currentOptionOverrides: [],
                    patterns: [],
                    defaultPattern: defaultPattern,
                    activePatternIndex: -1,
                    row_col_wrapper: "_",
                    no_match_text: "N/A",
                    default_title_for_rows: "Metric"
                },
                optionOverrides: [],
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
            config.optionOverrides = [
                utils.buildOptionOverride(["Text alignment header & footer ", "TEXT_ALIGN_TABLE_HEADER", ["left", "right", "center"], "left"], 0),
                utils.buildOptionOverride(["Text alignment first column", "TEXT_ALIGN_FIRST_COLUMN", ["left", "right", "center"], "left"], 1),
                utils.buildOptionOverride(["Text alignment cells / Metrics", "TEXT_ALIGN_TABLE_CELLS", ["left", "right", "center"], "left"], 2),
                utils.buildOptionOverride(["Hide Headers", "HIDE_HEADERS", ["false", "true"], "false"], 3),
                utils.buildOptionOverride(["Hide first column", "HIDE_FIRST_COLUMN", ["false", "true"], "false"], 4),
                utils.buildOptionOverride(["Show Footers", "SHOW_FOOTERS", ["false", "true"], "false"], 5)
            ];
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7WUFJTSxTQUFTLEdBQVcsNkJBQTZCLENBQUM7O1lBRWxELGNBQWMsR0FBWTtnQkFDNUIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixRQUFRLEVBQUUsT0FBTztnQkFDakIsU0FBUyxFQUFFLEdBQUc7Z0JBQ2QsU0FBUyxFQUFFLEtBQUs7Z0JBQ2hCLE1BQU0sRUFBRSxNQUFNO2dCQUNkLFFBQVEsRUFBRSxDQUFDO2dCQUNYLGVBQWUsRUFBRSxxQ0FBcUM7Z0JBQ3RELFVBQVUsRUFBRSxPQUFPO2dCQUNuQixjQUFjLEVBQUUsS0FBSztnQkFDckIsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsd0JBQXdCLEVBQUUsS0FBSztnQkFDL0Isa0JBQWtCLEVBQUUsMkJBQTJCO2dCQUMvQyxpQkFBaUIsRUFBRSxLQUFLO2dCQUN4QixVQUFVLEVBQUUsbUJBQW1CO2dCQUMvQiwwQkFBMEIsRUFBRSxLQUFLO2dCQUNqQyxvQkFBb0IsRUFBRSw0QkFBNEI7Z0JBQ2xELGdCQUFnQixFQUFFLEtBQUs7Z0JBQ3ZCLGdCQUFnQixFQUFFLHlCQUF5QjtnQkFDM0MsMEJBQTBCLEVBQUUsS0FBSztnQkFDakMsMEJBQTBCLEVBQUUsZUFBZTtnQkFDM0MsNEJBQTRCLEVBQUUsS0FBSztnQkFDbkMscUJBQXFCLEVBQUUsRUFBRTtnQkFDekIsVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLGVBQWUsRUFBRSxPQUFPO2dCQUN4QixVQUFVLEVBQUUsU0FBUztnQkFDckIsc0JBQXNCLEVBQUUsS0FBSztnQkFDN0Isb0JBQW9CLEVBQUUsRUFBRTtnQkFDeEIsTUFBTSxFQUFFO29CQUNKLFdBQVcsRUFBRSxFQUFFO29CQUNmLFdBQVcsRUFBRSxFQUFFO2lCQUNsQjthQUNKLENBQUM7WUFDSSxNQUFNLEdBQVc7Z0JBQ25CLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixLQUFLLEVBQUUsU0FBUztnQkFDaEIsYUFBYSxFQUFFO29CQUNYLHNCQUFzQixFQUFFLEVBQUU7b0JBQzFCLFFBQVEsRUFBRSxFQUFFO29CQUNaLGNBQWMsRUFBRSxjQUFjO29CQUM5QixrQkFBa0IsRUFBRSxDQUFDLENBQUM7b0JBQ3RCLGVBQWUsRUFBRSxHQUFHO29CQUNwQixhQUFhLEVBQUUsS0FBSztvQkFDcEIsc0JBQXNCLEVBQUUsUUFBUTtpQkFDbkM7Z0JBQ0QsZUFBZSxFQUFFLEVBQUU7Z0JBQ25CLGdCQUFnQixFQUFFLENBQUM7d0JBQ2YsS0FBSyxFQUFFLEtBQUs7d0JBQ1osSUFBSSxFQUFFLEtBQUs7cUJBQ2Q7b0JBQ0Q7d0JBQ0ksS0FBSyxFQUFFLEtBQUs7d0JBQ1osSUFBSSxFQUFFLEtBQUs7cUJBQ2Q7b0JBQ0Q7d0JBQ0ksS0FBSyxFQUFFLEtBQUs7d0JBQ1osSUFBSSxFQUFFLFNBQVM7cUJBQ2xCO29CQUNEO3dCQUNJLEtBQUssRUFBRSxTQUFTO3dCQUNoQixJQUFJLEVBQUUsU0FBUztxQkFDbEI7b0JBQ0Q7d0JBQ0ksS0FBSyxFQUFFLE9BQU87d0JBQ2QsSUFBSSxFQUFFLE9BQU87cUJBQ2hCO2lCQUNBO2FBQ0osQ0FBQzs7WUFDRixNQUFNLENBQUMsZUFBZSxHQUFHO2dCQUNyQixLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxpQ0FBaUMsRUFBRSx5QkFBeUIsRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNqSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyw2QkFBNkIsRUFBRSx5QkFBeUIsRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM3SCxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxnQ0FBZ0MsRUFBRSx3QkFBd0IsRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMvSCxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxjQUFjLEVBQUUsY0FBYyxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDMUYsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUMsbUJBQW1CLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNwRyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxjQUFjLEVBQUUsY0FBYyxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUM3RixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBDb25maWcsIFBhdHRlcm4gfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9pbnRlcmZhY2VzXCI7XHJcblxyXG5jb25zdCBwbHVnaW5faWQ6IFN0cmluZyA9IFwieWVzb3JleWVyYW0tYm9vbXRhYmxlLXBhbmVsXCI7XHJcblxyXG5jb25zdCBkZWZhdWx0UGF0dGVybjogUGF0dGVybiA9IHtcclxuICAgIG5hbWU6IHVuZGVmaW5lZCxcclxuICAgIHBhdHRlcm46IHVuZGVmaW5lZCxcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIHJvd19uYW1lOiBcIl9zZXJpZXNfXCIsXHJcbiAgICBjb2xfbmFtZTogXCJWYWx1ZVwiLFxyXG4gICAgZGVsaW1pdGVyOiBcIi5cIixcclxuICAgIHZhbHVlTmFtZTogXCJhdmdcIixcclxuICAgIGZvcm1hdDogXCJub25lXCIsXHJcbiAgICBkZWNpbWFsczogMixcclxuICAgIHRvb2x0aXBUZW1wbGF0ZTogXCJTZXJpZXMgOiBfc2VyaWVzXyB8IFZhbHVlIDogX3ZhbHVlX1wiLFxyXG4gICAgdGhyZXNob2xkczogXCI3MCw5MFwiLFxyXG4gICAgZW5hYmxlX2JnQ29sb3I6IGZhbHNlLFxyXG4gICAgYmdDb2xvcnM6IFwiZ3JlZW58b3JhbmdlfHJlZFwiLFxyXG4gICAgZW5hYmxlX2JnQ29sb3Jfb3ZlcnJpZGVzOiBmYWxzZSxcclxuICAgIGJnQ29sb3JzX292ZXJyaWRlczogXCIwLT5ncmVlbnwyLT5yZWR8MS0+eWVsbG93XCIsXHJcbiAgICBlbmFibGVfVGV4dENvbG9yczogZmFsc2UsXHJcbiAgICB0ZXh0Q29sb3JzOiBcIndoaXRlfHdoaXRlfHdoaXRlXCIsXHJcbiAgICBlbmFibGVfVGV4dENvbG9yX292ZXJyaWRlczogZmFsc2UsXHJcbiAgICB0ZXh0Q29sb3JzX292ZXJyaWRlczogXCIwLT53aGl0ZXwyLT53aGl0ZXwxLT53aGl0ZVwiLFxyXG4gICAgZW5hYmxlX3RyYW5zZm9ybTogZmFsc2UsXHJcbiAgICB0cmFuc2Zvcm1fdmFsdWVzOiBcIl92YWx1ZV98X3ZhbHVlX3xfdmFsdWVfXCIsXHJcbiAgICBlbmFibGVfdHJhbnNmb3JtX292ZXJyaWRlczogZmFsc2UsXHJcbiAgICB0cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlczogXCIwLT5kb3dufDEtPnVwXCIsXHJcbiAgICBlbmFibGVfdGltZV9iYXNlZF90aHJlc2hvbGRzOiBmYWxzZSxcclxuICAgIHRpbWVfYmFzZWRfdGhyZXNob2xkczogW10sXHJcbiAgICBudWxsX2NvbG9yOiBcImRhcmtyZWRcIixcclxuICAgIG51bGxfdGV4dF9jb2xvcjogXCJ3aGl0ZVwiLFxyXG4gICAgbnVsbF92YWx1ZTogXCJObyBkYXRhXCIsXHJcbiAgICBlbmFibGVfY2xpY2thYmxlX2NlbGxzOiBmYWxzZSxcclxuICAgIGNsaWNrYWJsZV9jZWxsc19saW5rOiBcIlwiLFxyXG4gICAgZmlsdGVyOiB7XHJcbiAgICAgICAgdmFsdWVfYmVsb3c6IFwiXCIsXHJcbiAgICAgICAgdmFsdWVfYWJvdmU6IFwiXCJcclxuICAgIH1cclxufTtcclxuY29uc3QgY29uZmlnOiBDb25maWcgPSB7XHJcbiAgICBkZWJ1Z19tb2RlOiBmYWxzZSxcclxuICAgIGVycm9yOiB1bmRlZmluZWQsXHJcbiAgICBwYW5lbERlZmF1bHRzOiB7XHJcbiAgICAgICAgY3VycmVudE9wdGlvbk92ZXJyaWRlczogW10sXHJcbiAgICAgICAgcGF0dGVybnM6IFtdLFxyXG4gICAgICAgIGRlZmF1bHRQYXR0ZXJuOiBkZWZhdWx0UGF0dGVybixcclxuICAgICAgICBhY3RpdmVQYXR0ZXJuSW5kZXg6IC0xLFxyXG4gICAgICAgIHJvd19jb2xfd3JhcHBlcjogXCJfXCIsXHJcbiAgICAgICAgbm9fbWF0Y2hfdGV4dDogXCJOL0FcIixcclxuICAgICAgICBkZWZhdWx0X3RpdGxlX2Zvcl9yb3dzOiBcIk1ldHJpY1wiXHJcbiAgICB9LFxyXG4gICAgb3B0aW9uT3ZlcnJpZGVzOiBbXSxcclxuICAgIHZhbHVlTmFtZU9wdGlvbnM6IFt7XHJcbiAgICAgICAgdmFsdWU6IFwibWluXCIsXHJcbiAgICAgICAgdGV4dDogXCJNaW5cIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB2YWx1ZTogXCJtYXhcIixcclxuICAgICAgICB0ZXh0OiBcIk1heFwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHZhbHVlOiBcImF2Z1wiLFxyXG4gICAgICAgIHRleHQ6IFwiQXZlcmFnZVwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHZhbHVlOiBcImN1cnJlbnRcIixcclxuICAgICAgICB0ZXh0OiBcIkN1cnJlbnRcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB2YWx1ZTogXCJ0b3RhbFwiLFxyXG4gICAgICAgIHRleHQ6IFwiVG90YWxcIlxyXG4gICAgfVxyXG4gICAgXSxcclxufTtcclxuY29uZmlnLm9wdGlvbk92ZXJyaWRlcyA9IFtcclxuICAgIHV0aWxzLmJ1aWxkT3B0aW9uT3ZlcnJpZGUoW1wiVGV4dCBhbGlnbm1lbnQgaGVhZGVyICYgZm9vdGVyIFwiLCBcIlRFWFRfQUxJR05fVEFCTEVfSEVBREVSXCIsIFtcImxlZnRcIiwgXCJyaWdodFwiLCBcImNlbnRlclwiXSwgXCJsZWZ0XCJdLCAwKSxcclxuICAgIHV0aWxzLmJ1aWxkT3B0aW9uT3ZlcnJpZGUoW1wiVGV4dCBhbGlnbm1lbnQgZmlyc3QgY29sdW1uXCIsIFwiVEVYVF9BTElHTl9GSVJTVF9DT0xVTU5cIiwgW1wibGVmdFwiLCBcInJpZ2h0XCIsIFwiY2VudGVyXCJdLCBcImxlZnRcIl0sIDEpLFxyXG4gICAgdXRpbHMuYnVpbGRPcHRpb25PdmVycmlkZShbXCJUZXh0IGFsaWdubWVudCBjZWxscyAvIE1ldHJpY3NcIiwgXCJURVhUX0FMSUdOX1RBQkxFX0NFTExTXCIsIFtcImxlZnRcIiwgXCJyaWdodFwiLCBcImNlbnRlclwiXSwgXCJsZWZ0XCJdLCAyKSxcclxuICAgIHV0aWxzLmJ1aWxkT3B0aW9uT3ZlcnJpZGUoW1wiSGlkZSBIZWFkZXJzXCIsIFwiSElERV9IRUFERVJTXCIsIFtcImZhbHNlXCIsIFwidHJ1ZVwiXSwgXCJmYWxzZVwiXSwgMyksXHJcbiAgICB1dGlscy5idWlsZE9wdGlvbk92ZXJyaWRlKFtcIkhpZGUgZmlyc3QgY29sdW1uXCIsIFwiSElERV9GSVJTVF9DT0xVTU5cIiwgW1wiZmFsc2VcIiwgXCJ0cnVlXCJdLCBcImZhbHNlXCJdLCA0KSxcclxuICAgIHV0aWxzLmJ1aWxkT3B0aW9uT3ZlcnJpZGUoW1wiU2hvdyBGb290ZXJzXCIsIFwiU0hPV19GT09URVJTXCIsIFtcImZhbHNlXCIsIFwidHJ1ZVwiXSwgXCJmYWxzZVwiXSwgNSlcclxuXTtcclxuZXhwb3J0IHtcclxuICAgIHBsdWdpbl9pZCxcclxuICAgIGNvbmZpZ1xyXG59O1xyXG4iXX0=