///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import kbn from 'app/core/utils/kbn';
import {
    loadPluginCss,
    MetricsPanelCtrl
} from "app/plugins/sdk";
import TimeSeries from "app/core/time_series2";
import * as utils from "./utils";

const plugin_id = "yesoreyeram-boomtable-panel";
const config: any = {
    plugin_id: plugin_id,
    debug_mode: false,
    hide_first_column : false,
    hide_headers : false,
    error: undefined,
    groupedData: undefined,
    panelDefaults: {
        plugin_title: "Boom Table",
        nullPointMode: "connected",
        patterns: [],
        defaultPattern: {
            delimiter: ".",
            valueName: "avg",
            row_name: "_series_",
            col_name: "Value",
            thresholds: "70,90",
            time_based_thresholds:[],
            enable_time_based_thresholds: false,
            enable_bgColor: false,
            bgColors: "green|orange|red",
            enable_transform: false,
            transform_values: "_value_|_value_|_value_",
            decimals: 2,
            format: "none",
            null_color: "darkred",
            null_value: "No data",
            filter : {
                value_below : "",
                value_above : ""
            }
        },
        activePatternIndex: -1,
        row_col_wrapper:"_",
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
    }, {
        name: "Options",
        template: "/partials/options.html",
        position: 5
    }, {
        name: "Filters",
        template: "/partials/filters.html",
        position: 4
    }, {
        name: "Time based thresholds",
        template: "/partials/thresholds.html",
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

export {
    kbn,
    loadPluginCss,
    MetricsPanelCtrl,
    TimeSeries,
    utils,
    config
}