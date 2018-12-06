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
[
    ["Text alignment header","TEXT_ALIGN_TABLE_HEADER",["left", "right", "center"],"left"],
    ["Text alignment first column","TEXT_ALIGN_FIRST_COLUMN",["left", "right", "center"],"left"],
    ["Text alignment table cells","TEXT_ALIGN_TABLE_CELLS",["left", "right", "center"],"left"],
    ["Hide Headers","HIDE_HEADERS",["false", "true"],"false"],
    ["Hide first column","HIDE_FIRST_COLUMN",["false", "true"],"false"],
].forEach((o,i)=>{
    config.optionOverrides.push({
        text: o[0],
        propertyName: o[1],
        index: i,
        defaultValue : o[3],
        values: o[2],
        submenu: _.map(o[2], value => {
            return { text: String(value), value: value };
        })
    });
})
export {
    kbn,
    loadPluginCss,
    MetricsPanelCtrl,
    TimeSeries,
    utils,
    config
}