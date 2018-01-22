import {
    loadPluginCss,
    MetricsPanelCtrl
} from "app/plugins/sdk";
import TimeSeries from "app/core/time_series2";
import utils from "./utils";

const plugin_id = "yesoreyeram-boomtable-panel";
const config = {
    plugin_id: plugin_id,
    debug_mode: false,
    panelDefaults: {
        plugin_title: "Boom Table",
        nullPointMode: "connected",
        patterns: [],
        defaultPattern: {
            delimiter: ".",
            valueName: "avg",
            row_name:"_0_",
            col_name:"_1_",
            thresholds: "70,90",
            enable_bgColor : false,
            bgColors: "green|orange|red",
            enable_transform: false,
            transform_values:"_value_|_value_|_value_"
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
        },
        {
            value: "name",
            text: "Name"
        },
        {
            value: "first",
            text: "First"
        },
        {
            value: "delta",
            text: "Delta"
        },
        {
            value: "diff",
            text: "Difference"
        },
        {
            value: "range",
            text: "Range"
        },
        {
            value: "last_time",
            text: "Time of last point"
        }
    ],
};

export {
    loadPluginCss,
    MetricsPanelCtrl,
    TimeSeries,
    utils,
    config
}