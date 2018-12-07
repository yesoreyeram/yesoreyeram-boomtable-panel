///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register([], function(exports_1) {
    var plugin_id, config;
    return {
        setters:[],
        execute: function() {
            plugin_id = "yesoreyeram-boomtable-panel";
            config = {
                plugin_id: plugin_id,
                debug_mode: false,
                error: undefined,
                groupedData: undefined,
                optionOverrides: [],
                panelDefaults: {
                    currentOptionOverrides: [],
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
            [
                ["Text alignment header", "TEXT_ALIGN_TABLE_HEADER", ["left", "right", "center"], "left"],
                ["Text alignment first column", "TEXT_ALIGN_FIRST_COLUMN", ["left", "right", "center"], "left"],
                ["Text alignment table cells", "TEXT_ALIGN_TABLE_CELLS", ["left", "right", "center"], "left"],
                ["Hide Headers", "HIDE_HEADERS", ["false", "true"], "false"],
                ["Hide first column", "HIDE_FIRST_COLUMN", ["false", "true"], "false"],
            ].forEach(function (o, i) {
                config.optionOverrides.push({
                    text: o[0],
                    propertyName: o[1],
                    index: i,
                    defaultValue: o[3],
                    values: o[2],
                    submenu: [].concat(o[2]).map(function (value) { return { text: String(value), value: value }; })
                });
            });
            exports_1("plugin_id", plugin_id);
            exports_1("config", config);
        }
    }
});
//# sourceMappingURL=app.js.map