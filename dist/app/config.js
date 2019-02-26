System.register([], function (exports_1, context_1) {
    "use strict";
    var plugin_id, value_name_options, config;
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
                { text: "Total", value: "total" }
            ];
            exports_1("value_name_options", value_name_options);
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
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUFNLFNBQVMsR0FBRyw2QkFBNkIsQ0FBQzs7WUFDMUMsa0JBQWtCLEdBQUc7Z0JBQ3ZCLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO2dCQUM3QixFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtnQkFDN0IsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7Z0JBQ2pDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO2dCQUNyQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTthQUNwQyxDQUFDOztZQUNJLE1BQU0sR0FBUTtnQkFDaEIsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLEtBQUssRUFBRSxTQUFTO2dCQUNoQixXQUFXLEVBQUUsU0FBUztnQkFDdEIsaUJBQWlCLEVBQUUsS0FBSztnQkFDeEIsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLGFBQWEsRUFBRTtvQkFDWCxrQkFBa0IsRUFBRSxDQUFDLENBQUM7b0JBQ3RCLHNCQUFzQixFQUFFLFFBQVE7b0JBQ2hDLFFBQVEsRUFBRSxFQUFFO29CQUNaLGVBQWUsRUFBRSxHQUFHO2lCQUN2QjthQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBwbHVnaW5faWQgPSBcInllc29yZXllcmFtLWJvb210YWJsZS1wYW5lbFwiO1xyXG5jb25zdCB2YWx1ZV9uYW1lX29wdGlvbnMgPSBbXHJcbiAgICB7IHRleHQ6IFwiTWluXCIsIHZhbHVlOiBcIm1pblwiIH0sXHJcbiAgICB7IHRleHQ6IFwiTWF4XCIsIHZhbHVlOiBcIm1heFwiIH0sXHJcbiAgICB7IHRleHQ6IFwiQXZlcmFnZVwiLCB2YWx1ZTogXCJhdmdcIiB9LFxyXG4gICAgeyB0ZXh0OiBcIkN1cnJlbnRcIiwgdmFsdWU6IFwiY3VycmVudFwiIH0sXHJcbiAgICB7IHRleHQ6IFwiVG90YWxcIiwgdmFsdWU6IFwidG90YWxcIiB9XHJcbl07XHJcbmNvbnN0IGNvbmZpZzogYW55ID0ge1xyXG4gICAgZGVidWdfbW9kZTogZmFsc2UsXHJcbiAgICBlcnJvcjogdW5kZWZpbmVkLFxyXG4gICAgZ3JvdXBlZERhdGE6IHVuZGVmaW5lZCxcclxuICAgIGhpZGVfZmlyc3RfY29sdW1uOiBmYWxzZSxcclxuICAgIGhpZGVfaGVhZGVyczogZmFsc2UsXHJcbiAgICBwYW5lbERlZmF1bHRzOiB7XHJcbiAgICAgICAgYWN0aXZlUGF0dGVybkluZGV4OiAtMSxcclxuICAgICAgICBkZWZhdWx0X3RpdGxlX2Zvcl9yb3dzOiBcIk1ldHJpY1wiLFxyXG4gICAgICAgIHBhdHRlcm5zOiBbXSxcclxuICAgICAgICByb3dfY29sX3dyYXBwZXI6IFwiX1wiLFxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICAgIHBsdWdpbl9pZCxcclxuICAgIHZhbHVlX25hbWVfb3B0aW9ucyxcclxuICAgIGNvbmZpZ1xyXG59O1xyXG4iXX0=