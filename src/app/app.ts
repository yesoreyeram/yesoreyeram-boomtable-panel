///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import kbn from 'app/core/utils/kbn';
import {
    loadPluginCss,
    MetricsPanelCtrl
} from "app/plugins/sdk";
import TimeSeries from "app/core/time_series2";
import _ from "lodash";
import * as utils from "./utils";

const plugin_id = "yesoreyeram-boomtable-panel";
const config: any = {
    plugin_id: plugin_id,
    debug_mode: false,
    error: undefined,
    groupedData: undefined,
    optionOverrides:[],
    panelDefaults: {
        plugin_title: "Boom Table",
        currentOptionOverrides:[],
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
            enable_bgColor_overrides : false,
            bgColors_overrides: "0->green|2->red|1->yellow",
            enable_transform: false,
            transform_values: "_value_|_value_|_value_",
            enable_transform_overrides : false,
            transform_values_overrides: "0->down|1->up",
            decimals: 2,
            format: "none",
            null_color: "darkred",
            null_value: "No data",
            enable_clickable_cells : false,
            clickable_cells_link : "",
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
    defaultValue : "left",
    values: ["left", "right", "center"],
    submenu: _.map(["left", "right", "center"], value => {
        return { text: String(value), value: value };
    })
});
config.optionOverrides.push({
    text: "text alignment first column",
    propertyName: "TEXT_ALIGN_FIRST_COLUMN",
    index: 1,
    defaultValue : "left",
    values: ["left", "right", "center"],
    submenu: _.map(["left", "right", "center"], value => {
        return { text: String(value), value: value };
    })
});
config.optionOverrides.push({
    text: "text alignment table cells",
    propertyName: "TEXT_ALIGN_TABLE_CELLS",
    index: 2,
    defaultValue : "left",
    values: ["left", "right", "center"],
    submenu: _.map(["left", "right", "center"], value => {
        return { text: String(value), value: value };
    })
});
config.optionOverrides.push({
    text: "hide headers",
    propertyName: "HIDE_HEADERS",
    index: 3,
    defaultValue : "false",
    values: ["true", "false"],
    submenu: _.map(["true", "false"], value => {
        return { text: String(value), value: value };
    })
});
config.optionOverrides.push({
    text: "hide first column",
    propertyName: "HIDE_FIRST_COLUMN",
    index: 3,
    defaultValue : "false",
    values: ["true", "false"],
    submenu: _.map(["true", "false"], value => {
        return { text: String(value), value: value };
    })
});
export {
    kbn,
    loadPluginCss,
    MetricsPanelCtrl,
    TimeSeries,
    utils,
    config
}