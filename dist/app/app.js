///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(['app/core/utils/kbn', "app/plugins/sdk", "app/core/time_series2", "./utils"], function(exports_1) {
    var kbn_1, sdk_1, time_series2_1, utils;
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
                panelDefaults: {
                    plugin_title: "Boom Table",
                    nullPointMode: "connected",
                    patterns: [],
                    defaultPattern: {
                        delimiter: ".",
                        valueName: "avg",
                        row_name: "_0_",
                        col_name: "_1_",
                        thresholds: "70,90",
                        enable_bgColor: false,
                        bgColors: "green|orange|red",
                        enable_transform: false,
                        transform_values: "_value_|_value_|_value_",
                        decimals: 2,
                        format: "none",
                        null_color: "darkred",
                        null_value: "No data"
                    },
                    activePatternIndex: -1,
                    default_title_for_rows: "Metric",
                    default_title_for_cols: "Value"
                },
                list_of_stylesheets: {
                    dark: "plugins/" + plugin_id + "/css/default.dark.css",
                    light: "plugins/" + plugin_id + "/css/default.light.css"
                },
                editorTabs: [{
                        name: "Patterns",
                        template: "/partials/patterns.html",
                        position: 2
                    }, {
                        name: "Options",
                        template: "/partials/options.html",
                        position: 3
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