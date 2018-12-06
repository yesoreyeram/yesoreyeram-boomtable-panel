///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(['app/core/utils/kbn', "app/plugins/sdk", "app/core/time_series2", "lodash", "./utils"], function(exports_1) {
    var kbn_1, sdk_1, time_series2_1, lodash_1, utils;
    var plugin_id, config;
    return {
        setters:[
            function (kbn_1_1) {
                kbn_1 = kbn_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (time_series2_1_1) {
                time_series2_1 = time_series2_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (utils_1) {
                utils = utils_1;
            }],
        execute: function() {
            plugin_id = "yesoreyeram-boomtable-panel";
            config = {
                plugin_id: plugin_id,
                debug_mode: false,
                error: undefined,
                groupedData: undefined,
                optionOverrides: [],
                panelDefaults: {
                    plugin_title: "Boom Table",
                    currentOptionOverrides: [],
                    nullPointMode: "connected",
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
                list_of_stylesheets: {
                    dark: "plugins/" + plugin_id + "/css/default.dark.css",
                    light: "plugins/" + plugin_id + "/css/default.light.css"
                },
                editorTabs: [{
                        name: "Patterns",
                        template: "/partials/patterns.html",
                        position: 2
                    },
                    {
                        name: "Time based thresholds & Filters",
                        template: "/partials/patterns-advanced-options.html",
                        position: 3
                    }, {
                        name: "Options",
                        template: "/partials/options.html",
                        position: 4
                    }],
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
            config.optionOverrides.push({
                text: "text alignment header",
                propertyName: "TEXT_ALIGN_TABLE_HEADER",
                index: 0,
                defaultValue: "left",
                values: ["left", "right", "center"],
                submenu: lodash_1.default.map(["left", "right", "center"], function (value) {
                    return { text: String(value), value: value };
                })
            });
            config.optionOverrides.push({
                text: "text alignment first column",
                propertyName: "TEXT_ALIGN_FIRST_COLUMN",
                index: 1,
                defaultValue: "left",
                values: ["left", "right", "center"],
                submenu: lodash_1.default.map(["left", "right", "center"], function (value) {
                    return { text: String(value), value: value };
                })
            });
            config.optionOverrides.push({
                text: "text alignment table cells",
                propertyName: "TEXT_ALIGN_TABLE_CELLS",
                index: 2,
                defaultValue: "left",
                values: ["left", "right", "center"],
                submenu: lodash_1.default.map(["left", "right", "center"], function (value) {
                    return { text: String(value), value: value };
                })
            });
            config.optionOverrides.push({
                text: "hide headers",
                propertyName: "HIDE_HEADERS",
                index: 3,
                defaultValue: "false",
                values: ["true", "false"],
                submenu: lodash_1.default.map(["true", "false"], function (value) {
                    return { text: String(value), value: value };
                })
            });
            config.optionOverrides.push({
                text: "hide first column",
                propertyName: "HIDE_FIRST_COLUMN",
                index: 3,
                defaultValue: "false",
                values: ["true", "false"],
                submenu: lodash_1.default.map(["true", "false"], function (value) {
                    return { text: String(value), value: value };
                })
            });
            exports_1("kbn", kbn_1.default);
            exports_1("loadPluginCss", sdk_1.loadPluginCss);
            exports_1("MetricsPanelCtrl", sdk_1.MetricsPanelCtrl);
            exports_1("TimeSeries", time_series2_1.default);
            exports_1("utils", utils);
            exports_1("config", config);
        }
    }
});
//# sourceMappingURL=app.js.map