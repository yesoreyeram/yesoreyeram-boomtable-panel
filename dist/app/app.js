///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register([], function(exports_1) {
    var buildOptionOverride, plugin_id, defaultPattern, config;
    return {
        setters:[],
        execute: function() {
            buildOptionOverride = function (o, i) {
                return {
                    text: String(o[0]),
                    propertyName: String(o[1]),
                    index: i,
                    defaultValue: String(o[3]),
                    values: [].concat(o[2]).map(function (value) { return String[value]; }),
                    submenu: [].concat(o[2]).map(function (value) { return { text: String(value), value: value }; })
                };
            };
            plugin_id = "yesoreyeram-boomtable-panel";
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
                plugin_id: plugin_id,
                debug_mode: false,
                error: undefined,
                optionOverrides: [],
                panelDefaults: {
                    currentOptionOverrides: [],
                    patterns: [],
                    defaultPattern: defaultPattern,
                    activePatternIndex: -1,
                    row_col_wrapper: "_",
                    no_match_text: "N/A",
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
            config.optionOverrides.push(buildOptionOverride(["Text alignment header", "TEXT_ALIGN_TABLE_HEADER", ["left", "right", "center"], "left"], 0));
            config.optionOverrides.push(buildOptionOverride(["Text alignment first column", "TEXT_ALIGN_FIRST_COLUMN", ["left", "right", "center"], "left"], 1));
            config.optionOverrides.push(buildOptionOverride(["Text alignment table cells", "TEXT_ALIGN_TABLE_CELLS", ["left", "right", "center"], "left"], 2));
            config.optionOverrides.push(buildOptionOverride(["Hide Headers", "HIDE_HEADERS", ["false", "true"], "false"], 3));
            config.optionOverrides.push(buildOptionOverride(["Hide first column", "HIDE_FIRST_COLUMN", ["false", "true"], "false"], 4));
            exports_1("plugin_id", plugin_id);
            exports_1("config", config);
        }
    }
});
//# sourceMappingURL=app.js.map