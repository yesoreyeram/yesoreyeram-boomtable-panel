import {
    loadPluginCss,
    MetricsPanelCtrl
} from "app/plugins/sdk";
import TimeSeries from "app/core/time_series2";

const plugin_id = "yesoreyeram-boomtable-panel";
const config = {
    plugin_id: plugin_id,
    panelDefaults: {
        plugin_title: "Boom Table",
        nullPointMode: "connected"
    },
    list_of_stylesheets: {
        dark: "plugins/" + plugin_id + "/css/default.dark.css",
        light: "plugins/" + plugin_id + "/css/default.light.css"
    }
};

export {
    loadPluginCss,
    MetricsPanelCtrl,
    TimeSeries,
    config
}