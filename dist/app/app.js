"use strict";

System.register(["app/plugins/sdk", "app/core/time_series2"], function (_export, _context) {
    "use strict";

    var MetricsPanelCtrl, TimeSeries, plugin_id, config;
    return {
        setters: [function (_appPluginsSdk) {
            MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
        }, function (_appCoreTime_series) {
            TimeSeries = _appCoreTime_series.default;
        }],
        execute: function () {
            plugin_id = "yesoreyeram-boomtable-panel";

            _export("config", config = {
                plugin_id: plugin_id,
                panelDefaults: {
                    plugin_title: "Boom Table",
                    nullPointMode: "connected"
                }
            });

            _export("MetricsPanelCtrl", MetricsPanelCtrl);

            _export("TimeSeries", TimeSeries);

            _export("config", config);
        }
    };
});
//# sourceMappingURL=app.js.map
