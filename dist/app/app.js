"use strict";

System.register(["app/plugins/sdk", "app/core/time_series2"], function (_export, _context) {
    "use strict";

    var loadPluginCss, MetricsPanelCtrl, TimeSeries, plugin_id, config;
    return {
        setters: [function (_appPluginsSdk) {
            loadPluginCss = _appPluginsSdk.loadPluginCss;
            MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
        }, function (_appCoreTime_series) {
            TimeSeries = _appCoreTime_series.default;
        }],
        execute: function () {
            plugin_id = "yesoreyeram-boomtable-panel";

            _export("config", config = {
                plugin_id: plugin_id,
                debug_mode: false,
                panelDefaults: {
                    plugin_title: "Boom Table",
                    nullPointMode: "connected",
                    patterns: [],
                    defaultPattern: {
                        delimiter: ".",
                        valueName: "avg"
                    },
                    activePatternIndex: -1
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
                }, {
                    value: "max",
                    text: "Max"
                }, {
                    value: "avg",
                    text: "Average"
                }, {
                    value: "current",
                    text: "Current"
                }, {
                    value: "total",
                    text: "Total"
                }, {
                    value: "name",
                    text: "Name"
                }, {
                    value: "first",
                    text: "First"
                }, {
                    value: "delta",
                    text: "Delta"
                }, {
                    value: "diff",
                    text: "Difference"
                }, {
                    value: "range",
                    text: "Range"
                }, {
                    value: "last_time",
                    text: "Time of last point"
                }]
            });

            _export("loadPluginCss", loadPluginCss);

            _export("MetricsPanelCtrl", MetricsPanelCtrl);

            _export("TimeSeries", TimeSeries);

            _export("config", config);
        }
    };
});
//# sourceMappingURL=app.js.map
