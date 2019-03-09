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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUFNLFNBQVMsR0FBRyw2QkFBNkIsQ0FBQzs7WUFDMUMsa0JBQWtCLEdBQUc7Z0JBQ3ZCLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO2dCQUM3QixFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtnQkFDN0IsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7Z0JBQ2pDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO2dCQUNyQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTthQUNwQyxDQUFDOztZQUNJLG9CQUFvQixHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQzs7WUFDbkQsTUFBTSxHQUFRO2dCQUNoQixVQUFVLEVBQUUsS0FBSztnQkFDakIsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLFdBQVcsRUFBRSxTQUFTO2dCQUN0QixpQkFBaUIsRUFBRSxLQUFLO2dCQUN4QixZQUFZLEVBQUUsS0FBSztnQkFDbkIsYUFBYSxFQUFFO29CQUNYLGtCQUFrQixFQUFFLENBQUMsQ0FBQztvQkFDdEIsc0JBQXNCLEVBQUUsUUFBUTtvQkFDaEMsUUFBUSxFQUFFLEVBQUU7b0JBQ1osZUFBZSxFQUFFLEdBQUc7aUJBQ3ZCO2FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHBsdWdpbl9pZCA9IFwieWVzb3JleWVyYW0tYm9vbXRhYmxlLXBhbmVsXCI7XHJcbmNvbnN0IHZhbHVlX25hbWVfb3B0aW9ucyA9IFtcclxuICAgIHsgdGV4dDogXCJNaW5cIiwgdmFsdWU6IFwibWluXCIgfSxcclxuICAgIHsgdGV4dDogXCJNYXhcIiwgdmFsdWU6IFwibWF4XCIgfSxcclxuICAgIHsgdGV4dDogXCJBdmVyYWdlXCIsIHZhbHVlOiBcImF2Z1wiIH0sXHJcbiAgICB7IHRleHQ6IFwiQ3VycmVudFwiLCB2YWx1ZTogXCJjdXJyZW50XCIgfSxcclxuICAgIHsgdGV4dDogXCJUb3RhbFwiLCB2YWx1ZTogXCJ0b3RhbFwiIH1cclxuXTtcclxuY29uc3QgdGV4dEFsaWdubWVudE9wdGlvbnMgPSBbXCJsZWZ0XCIsIFwicmlnaHRcIiwgXCJjZW50ZXJcIl07XHJcbmNvbnN0IGNvbmZpZzogYW55ID0ge1xyXG4gICAgZGVidWdfbW9kZTogZmFsc2UsXHJcbiAgICBlcnJvcjogdW5kZWZpbmVkLFxyXG4gICAgZ3JvdXBlZERhdGE6IHVuZGVmaW5lZCxcclxuICAgIGhpZGVfZmlyc3RfY29sdW1uOiBmYWxzZSxcclxuICAgIGhpZGVfaGVhZGVyczogZmFsc2UsXHJcbiAgICBwYW5lbERlZmF1bHRzOiB7XHJcbiAgICAgICAgYWN0aXZlUGF0dGVybkluZGV4OiAtMSxcclxuICAgICAgICBkZWZhdWx0X3RpdGxlX2Zvcl9yb3dzOiBcIk1ldHJpY1wiLFxyXG4gICAgICAgIHBhdHRlcm5zOiBbXSxcclxuICAgICAgICByb3dfY29sX3dyYXBwZXI6IFwiX1wiLFxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICAgIHBsdWdpbl9pZCxcclxuICAgIHZhbHVlX25hbWVfb3B0aW9ucyxcclxuICAgIHRleHRBbGlnbm1lbnRPcHRpb25zLFxyXG4gICAgY29uZmlnXHJcbn07XHJcbiJdfQ==