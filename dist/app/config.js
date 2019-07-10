System.register([], function (exports_1, context_1) {
    "use strict";
    var plugin_id, value_name_options, textAlignmentOptions, config;
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
                { value: 'last_time', text: 'Time of last data point' },
                { value: 'last_time_nonnull', text: 'Time of last non null data point' },
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
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUFNLFNBQVMsR0FBRyw2QkFBNkIsQ0FBQzs7WUFDMUMsa0JBQWtCLEdBQUc7Z0JBQ3ZCLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO2dCQUM3QixFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtnQkFDN0IsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7Z0JBQ2pDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO2dCQUNyQyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLHlCQUF5QixFQUFFO2dCQUN2RCxFQUFFLEtBQUssRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsa0NBQWtDLEVBQUU7Z0JBQ3hFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFO2FBQ3BDLENBQUM7O1lBQ0ksb0JBQW9CLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDOztZQUNuRCxNQUFNLEdBQVE7Z0JBQ2hCLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixLQUFLLEVBQUUsU0FBUztnQkFDaEIsV0FBVyxFQUFFLFNBQVM7Z0JBQ3RCLGlCQUFpQixFQUFFLEtBQUs7Z0JBQ3hCLFlBQVksRUFBRSxLQUFLO2dCQUNuQixhQUFhLEVBQUU7b0JBQ1gsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO29CQUN0QixzQkFBc0IsRUFBRSxRQUFRO29CQUNoQyxRQUFRLEVBQUUsRUFBRTtvQkFDWixlQUFlLEVBQUUsR0FBRztpQkFDdkI7YUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcGx1Z2luX2lkID0gXCJ5ZXNvcmV5ZXJhbS1ib29tdGFibGUtcGFuZWxcIjtcclxuY29uc3QgdmFsdWVfbmFtZV9vcHRpb25zID0gW1xyXG4gICAgeyB0ZXh0OiBcIk1pblwiLCB2YWx1ZTogXCJtaW5cIiB9LFxyXG4gICAgeyB0ZXh0OiBcIk1heFwiLCB2YWx1ZTogXCJtYXhcIiB9LFxyXG4gICAgeyB0ZXh0OiBcIkF2ZXJhZ2VcIiwgdmFsdWU6IFwiYXZnXCIgfSxcclxuICAgIHsgdGV4dDogXCJDdXJyZW50XCIsIHZhbHVlOiBcImN1cnJlbnRcIiB9LFxyXG4gICAgeyB2YWx1ZTogJ2xhc3RfdGltZScsIHRleHQ6ICdUaW1lIG9mIGxhc3QgZGF0YSBwb2ludCcgfSxcclxuICAgIHsgdmFsdWU6ICdsYXN0X3RpbWVfbm9ubnVsbCcsIHRleHQ6ICdUaW1lIG9mIGxhc3Qgbm9uIG51bGwgZGF0YSBwb2ludCcgfSxcclxuICAgIHsgdGV4dDogXCJUb3RhbFwiLCB2YWx1ZTogXCJ0b3RhbFwiIH1cclxuXTtcclxuY29uc3QgdGV4dEFsaWdubWVudE9wdGlvbnMgPSBbXCJsZWZ0XCIsIFwicmlnaHRcIiwgXCJjZW50ZXJcIl07XHJcbmNvbnN0IGNvbmZpZzogYW55ID0ge1xyXG4gICAgZGVidWdfbW9kZTogZmFsc2UsXHJcbiAgICBlcnJvcjogdW5kZWZpbmVkLFxyXG4gICAgZ3JvdXBlZERhdGE6IHVuZGVmaW5lZCxcclxuICAgIGhpZGVfZmlyc3RfY29sdW1uOiBmYWxzZSxcclxuICAgIGhpZGVfaGVhZGVyczogZmFsc2UsXHJcbiAgICBwYW5lbERlZmF1bHRzOiB7XHJcbiAgICAgICAgYWN0aXZlUGF0dGVybkluZGV4OiAtMSxcclxuICAgICAgICBkZWZhdWx0X3RpdGxlX2Zvcl9yb3dzOiBcIk1ldHJpY1wiLFxyXG4gICAgICAgIHBhdHRlcm5zOiBbXSxcclxuICAgICAgICByb3dfY29sX3dyYXBwZXI6IFwiX1wiLFxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICAgIHBsdWdpbl9pZCxcclxuICAgIHZhbHVlX25hbWVfb3B0aW9ucyxcclxuICAgIHRleHRBbGlnbm1lbnRPcHRpb25zLFxyXG4gICAgY29uZmlnXHJcbn07XHJcbiJdfQ==