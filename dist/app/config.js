System.register([], function (exports_1, context_1) {
    "use strict";
    var plugin_id, value_name_options, textAlignmentOptions, config, default_pattern_options;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            plugin_id = "yesoreyeram-boomtable-panel";
            exports_1("plugin_id", plugin_id);
            value_name_options = [
                { text: "Min", value: "min" },
                { text: "Max", value: "max" },
                { text: "Average", value: "avg" },
                { text: "Current", value: "current" },
                { text: 'Time of last data point', value: 'last_time', },
                { text: 'Time of last non null data point', value: 'last_time_nonnull' },
                { text: "Total", value: "total" }
            ];
            exports_1("value_name_options", value_name_options);
            textAlignmentOptions = ["left", "right", "center"];
            exports_1("textAlignmentOptions", textAlignmentOptions);
            config = {
                debug_mode: false,
                error: undefined,
                groupedData: undefined,
                hide_first_column: false,
                hide_headers: false,
                panelDefaults: {
                    activePatternIndex: -1,
                    default_title_for_rows: "Metric",
                    patterns: [],
                    row_col_wrapper: "_",
                }
            };
            exports_1("config", config);
            default_pattern_options = {
                bgColors: "green|orange|red",
                bgColors_overrides: "0->green|2->red|1->yellow",
                clickable_cells_link: "",
                col_name: "Value",
                decimals: 2,
                defaultBGColor: "transparent",
                defaultTextColor: "",
                delimiter: ".",
                displayTemplate: "_value_",
                enable_bgColor: false,
                enable_bgColor_overrides: false,
                enable_clickable_cells: false,
                enable_textColor: false,
                enable_textColor_overrides: false,
                enable_time_based_thresholds: false,
                enable_transform: false,
                enable_transform_overrides: false,
                filter: {
                    value_above: "",
                    value_below: ""
                },
                format: "none",
                name: "Default Pattern",
                null_color: "darkred",
                null_textcolor: "white",
                null_value: "No data",
                pattern: "*",
                row_name: "_series_",
                textColors: "red|orange|green",
                textColors_overrides: "0->red|2->green|1->yellow",
                thresholds: "70,90",
                time_based_thresholds: [],
                tooltipTemplate: "",
                transform_values: "_value_|_value_|_value_",
                transform_values_overrides: "0->down|1->up",
                valueName: "avg"
            };
            exports_1("default_pattern_options", default_pattern_options);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUFNLFNBQVMsR0FBRyw2QkFBNkIsQ0FBQzs7WUFDMUMsa0JBQWtCLEdBQUc7Z0JBQ3ZCLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO2dCQUM3QixFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtnQkFDN0IsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7Z0JBQ2pDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO2dCQUNyQyxFQUFFLElBQUksRUFBRSx5QkFBeUIsRUFBRSxLQUFLLEVBQUUsV0FBVyxHQUFHO2dCQUN4RCxFQUFFLElBQUksRUFBRSxrQ0FBa0MsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLEVBQUU7Z0JBQ3hFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFO2FBQ3BDLENBQUM7O1lBQ0ksb0JBQW9CLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDOztZQUNuRCxNQUFNLEdBQVE7Z0JBQ2hCLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixLQUFLLEVBQUUsU0FBUztnQkFDaEIsV0FBVyxFQUFFLFNBQVM7Z0JBQ3RCLGlCQUFpQixFQUFFLEtBQUs7Z0JBQ3hCLFlBQVksRUFBRSxLQUFLO2dCQUNuQixhQUFhLEVBQUU7b0JBQ1gsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO29CQUN0QixzQkFBc0IsRUFBRSxRQUFRO29CQUNoQyxRQUFRLEVBQUUsRUFBRTtvQkFDWixlQUFlLEVBQUUsR0FBRztpQkFDdkI7YUFDSixDQUFDOztZQUNJLHVCQUF1QixHQUFRO2dCQUNqQyxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixrQkFBa0IsRUFBRSwyQkFBMkI7Z0JBQy9DLG9CQUFvQixFQUFFLEVBQUU7Z0JBQ3hCLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUsQ0FBQztnQkFDWCxjQUFjLEVBQUUsYUFBYTtnQkFDN0IsZ0JBQWdCLEVBQUUsRUFBRTtnQkFDcEIsU0FBUyxFQUFFLEdBQUc7Z0JBQ2QsZUFBZSxFQUFFLFNBQVM7Z0JBQzFCLGNBQWMsRUFBRSxLQUFLO2dCQUNyQix3QkFBd0IsRUFBRSxLQUFLO2dCQUMvQixzQkFBc0IsRUFBRSxLQUFLO2dCQUM3QixnQkFBZ0IsRUFBRSxLQUFLO2dCQUN2QiwwQkFBMEIsRUFBRSxLQUFLO2dCQUNqQyw0QkFBNEIsRUFBRSxLQUFLO2dCQUNuQyxnQkFBZ0IsRUFBRSxLQUFLO2dCQUN2QiwwQkFBMEIsRUFBRSxLQUFLO2dCQUNqQyxNQUFNLEVBQUU7b0JBQ0osV0FBVyxFQUFFLEVBQUU7b0JBQ2YsV0FBVyxFQUFFLEVBQUU7aUJBQ2xCO2dCQUNELE1BQU0sRUFBRSxNQUFNO2dCQUNkLElBQUksRUFBRSxpQkFBaUI7Z0JBQ3ZCLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixjQUFjLEVBQUUsT0FBTztnQkFDdkIsVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLE9BQU8sRUFBRSxHQUFHO2dCQUNaLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixVQUFVLEVBQUUsa0JBQWtCO2dCQUM5QixvQkFBb0IsRUFBRSwyQkFBMkI7Z0JBQ2pELFVBQVUsRUFBRSxPQUFPO2dCQUNuQixxQkFBcUIsRUFBRSxFQUFFO2dCQUN6QixlQUFlLEVBQUUsRUFBRTtnQkFDbkIsZ0JBQWdCLEVBQUUseUJBQXlCO2dCQUMzQywwQkFBMEIsRUFBRSxlQUFlO2dCQUMzQyxTQUFTLEVBQUUsS0FBSzthQUNuQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcGx1Z2luX2lkID0gXCJ5ZXNvcmV5ZXJhbS1ib29tdGFibGUtcGFuZWxcIjtcclxuY29uc3QgdmFsdWVfbmFtZV9vcHRpb25zID0gW1xyXG4gICAgeyB0ZXh0OiBcIk1pblwiLCB2YWx1ZTogXCJtaW5cIiB9LFxyXG4gICAgeyB0ZXh0OiBcIk1heFwiLCB2YWx1ZTogXCJtYXhcIiB9LFxyXG4gICAgeyB0ZXh0OiBcIkF2ZXJhZ2VcIiwgdmFsdWU6IFwiYXZnXCIgfSxcclxuICAgIHsgdGV4dDogXCJDdXJyZW50XCIsIHZhbHVlOiBcImN1cnJlbnRcIiB9LFxyXG4gICAgeyB0ZXh0OiAnVGltZSBvZiBsYXN0IGRhdGEgcG9pbnQnLCB2YWx1ZTogJ2xhc3RfdGltZScsIH0sXHJcbiAgICB7IHRleHQ6ICdUaW1lIG9mIGxhc3Qgbm9uIG51bGwgZGF0YSBwb2ludCcsIHZhbHVlOiAnbGFzdF90aW1lX25vbm51bGwnIH0sXHJcbiAgICB7IHRleHQ6IFwiVG90YWxcIiwgdmFsdWU6IFwidG90YWxcIiB9XHJcbl07XHJcbmNvbnN0IHRleHRBbGlnbm1lbnRPcHRpb25zID0gW1wibGVmdFwiLCBcInJpZ2h0XCIsIFwiY2VudGVyXCJdO1xyXG5jb25zdCBjb25maWc6IGFueSA9IHtcclxuICAgIGRlYnVnX21vZGU6IGZhbHNlLFxyXG4gICAgZXJyb3I6IHVuZGVmaW5lZCxcclxuICAgIGdyb3VwZWREYXRhOiB1bmRlZmluZWQsXHJcbiAgICBoaWRlX2ZpcnN0X2NvbHVtbjogZmFsc2UsXHJcbiAgICBoaWRlX2hlYWRlcnM6IGZhbHNlLFxyXG4gICAgcGFuZWxEZWZhdWx0czoge1xyXG4gICAgICAgIGFjdGl2ZVBhdHRlcm5JbmRleDogLTEsXHJcbiAgICAgICAgZGVmYXVsdF90aXRsZV9mb3Jfcm93czogXCJNZXRyaWNcIixcclxuICAgICAgICBwYXR0ZXJuczogW10sXHJcbiAgICAgICAgcm93X2NvbF93cmFwcGVyOiBcIl9cIixcclxuICAgIH1cclxufTtcclxuY29uc3QgZGVmYXVsdF9wYXR0ZXJuX29wdGlvbnM6IGFueSA9IHtcclxuICAgIGJnQ29sb3JzOiBcImdyZWVufG9yYW5nZXxyZWRcIixcclxuICAgIGJnQ29sb3JzX292ZXJyaWRlczogXCIwLT5ncmVlbnwyLT5yZWR8MS0+eWVsbG93XCIsXHJcbiAgICBjbGlja2FibGVfY2VsbHNfbGluazogXCJcIixcclxuICAgIGNvbF9uYW1lOiBcIlZhbHVlXCIsXHJcbiAgICBkZWNpbWFsczogMixcclxuICAgIGRlZmF1bHRCR0NvbG9yOiBcInRyYW5zcGFyZW50XCIsXHJcbiAgICBkZWZhdWx0VGV4dENvbG9yOiBcIlwiLFxyXG4gICAgZGVsaW1pdGVyOiBcIi5cIixcclxuICAgIGRpc3BsYXlUZW1wbGF0ZTogXCJfdmFsdWVfXCIsXHJcbiAgICBlbmFibGVfYmdDb2xvcjogZmFsc2UsXHJcbiAgICBlbmFibGVfYmdDb2xvcl9vdmVycmlkZXM6IGZhbHNlLFxyXG4gICAgZW5hYmxlX2NsaWNrYWJsZV9jZWxsczogZmFsc2UsXHJcbiAgICBlbmFibGVfdGV4dENvbG9yOiBmYWxzZSxcclxuICAgIGVuYWJsZV90ZXh0Q29sb3Jfb3ZlcnJpZGVzOiBmYWxzZSxcclxuICAgIGVuYWJsZV90aW1lX2Jhc2VkX3RocmVzaG9sZHM6IGZhbHNlLFxyXG4gICAgZW5hYmxlX3RyYW5zZm9ybTogZmFsc2UsXHJcbiAgICBlbmFibGVfdHJhbnNmb3JtX292ZXJyaWRlczogZmFsc2UsXHJcbiAgICBmaWx0ZXI6IHtcclxuICAgICAgICB2YWx1ZV9hYm92ZTogXCJcIixcclxuICAgICAgICB2YWx1ZV9iZWxvdzogXCJcIlxyXG4gICAgfSxcclxuICAgIGZvcm1hdDogXCJub25lXCIsXHJcbiAgICBuYW1lOiBcIkRlZmF1bHQgUGF0dGVyblwiLFxyXG4gICAgbnVsbF9jb2xvcjogXCJkYXJrcmVkXCIsXHJcbiAgICBudWxsX3RleHRjb2xvcjogXCJ3aGl0ZVwiLFxyXG4gICAgbnVsbF92YWx1ZTogXCJObyBkYXRhXCIsXHJcbiAgICBwYXR0ZXJuOiBcIipcIixcclxuICAgIHJvd19uYW1lOiBcIl9zZXJpZXNfXCIsXHJcbiAgICB0ZXh0Q29sb3JzOiBcInJlZHxvcmFuZ2V8Z3JlZW5cIixcclxuICAgIHRleHRDb2xvcnNfb3ZlcnJpZGVzOiBcIjAtPnJlZHwyLT5ncmVlbnwxLT55ZWxsb3dcIixcclxuICAgIHRocmVzaG9sZHM6IFwiNzAsOTBcIixcclxuICAgIHRpbWVfYmFzZWRfdGhyZXNob2xkczogW10sXHJcbiAgICB0b29sdGlwVGVtcGxhdGU6IFwiXCIsXHJcbiAgICB0cmFuc2Zvcm1fdmFsdWVzOiBcIl92YWx1ZV98X3ZhbHVlX3xfdmFsdWVfXCIsXHJcbiAgICB0cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlczogXCIwLT5kb3dufDEtPnVwXCIsXHJcbiAgICB2YWx1ZU5hbWU6IFwiYXZnXCJcclxufTtcclxuZXhwb3J0IHtcclxuICAgIHBsdWdpbl9pZCxcclxuICAgIGRlZmF1bHRfcGF0dGVybl9vcHRpb25zLFxyXG4gICAgdmFsdWVfbmFtZV9vcHRpb25zLFxyXG4gICAgdGV4dEFsaWdubWVudE9wdGlvbnMsXHJcbiAgICBjb25maWdcclxufTtcclxuIl19