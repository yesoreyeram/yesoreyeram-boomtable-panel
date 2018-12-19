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
                    nullPointMode: "connected",
                    patterns: [],
                    plugin_title: "Boom Table",
                    row_col_wrapper: "_",
                }
            };
            exports_1("config", config);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUFNLFNBQVMsR0FBRyw2QkFBNkIsQ0FBQzs7WUFDMUMsa0JBQWtCLEdBQUc7Z0JBQ3ZCLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO2dCQUM3QixFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRTtnQkFDN0IsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7Z0JBQ2pDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO2dCQUNyQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTthQUNwQyxDQUFDOztZQUNJLE1BQU0sR0FBUTtnQkFDaEIsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLEtBQUssRUFBRSxTQUFTO2dCQUNoQixXQUFXLEVBQUUsU0FBUztnQkFDdEIsaUJBQWlCLEVBQUUsS0FBSztnQkFDeEIsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLGFBQWEsRUFBRTtvQkFDWCxrQkFBa0IsRUFBRSxDQUFDLENBQUM7b0JBQ3RCLHNCQUFzQixFQUFFLFFBQVE7b0JBQ2hDLGFBQWEsRUFBRSxXQUFXO29CQUMxQixRQUFRLEVBQUUsRUFBRTtvQkFDWixZQUFZLEVBQUUsWUFBWTtvQkFDMUIsZUFBZSxFQUFFLEdBQUc7aUJBQ3ZCO2FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHBsdWdpbl9pZCA9IFwieWVzb3JleWVyYW0tYm9vbXRhYmxlLXBhbmVsXCI7XHJcbmNvbnN0IHZhbHVlX25hbWVfb3B0aW9ucyA9IFtcclxuICAgIHsgdGV4dDogXCJNaW5cIiwgdmFsdWU6IFwibWluXCIgfSxcclxuICAgIHsgdGV4dDogXCJNYXhcIiwgdmFsdWU6IFwibWF4XCIgfSxcclxuICAgIHsgdGV4dDogXCJBdmVyYWdlXCIsIHZhbHVlOiBcImF2Z1wiIH0sXHJcbiAgICB7IHRleHQ6IFwiQ3VycmVudFwiLCB2YWx1ZTogXCJjdXJyZW50XCIgfSxcclxuICAgIHsgdGV4dDogXCJUb3RhbFwiLCB2YWx1ZTogXCJ0b3RhbFwiIH1cclxuXTtcclxuY29uc3QgY29uZmlnOiBhbnkgPSB7XHJcbiAgICBkZWJ1Z19tb2RlOiBmYWxzZSxcclxuICAgIGVycm9yOiB1bmRlZmluZWQsXHJcbiAgICBncm91cGVkRGF0YTogdW5kZWZpbmVkLFxyXG4gICAgaGlkZV9maXJzdF9jb2x1bW46IGZhbHNlLFxyXG4gICAgaGlkZV9oZWFkZXJzOiBmYWxzZSxcclxuICAgIHBhbmVsRGVmYXVsdHM6IHtcclxuICAgICAgICBhY3RpdmVQYXR0ZXJuSW5kZXg6IC0xLFxyXG4gICAgICAgIGRlZmF1bHRfdGl0bGVfZm9yX3Jvd3M6IFwiTWV0cmljXCIsXHJcbiAgICAgICAgbnVsbFBvaW50TW9kZTogXCJjb25uZWN0ZWRcIixcclxuICAgICAgICBwYXR0ZXJuczogW10sXHJcbiAgICAgICAgcGx1Z2luX3RpdGxlOiBcIkJvb20gVGFibGVcIixcclxuICAgICAgICByb3dfY29sX3dyYXBwZXI6IFwiX1wiLFxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICAgIHBsdWdpbl9pZCxcclxuICAgIHZhbHVlX25hbWVfb3B0aW9ucyxcclxuICAgIGNvbmZpZ1xyXG59O1xyXG4iXX0=