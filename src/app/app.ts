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
    debug_mode: false,
    editorTabs: [{
        name: "Patterns",
        position: 2,
        template: "/partials/patterns.html"
    },
    {
        name: "Time based thresholds & Filters",
        position: 3,
        template: "/partials/patterns-advanced-options.html"
    }, {
        name: "Options",
        position: 4,
        template: "/partials/options.html"
    }],
    error: undefined,
    groupedData: undefined,
    hide_first_column: false,
    hide_headers: false,
    list_of_stylesheets: {
        dark: "plugins/" + plugin_id + "/css/default.dark.css",
        light: "plugins/" + plugin_id + "/css/default.light.css"
    },
    panelDefaults: {
        activePatternIndex: -1,
        defaultPattern: {
            bgColors: "green|orange|red",
            bgColors_overrides: "0->green|2->red|1->yellow",
            clickable_cells_link: "",
            col_name: "Value",
            decimals: 2,
            delimiter: ".",
            enable_bgColor: false,
            enable_bgColor_overrides: false,
            enable_clickable_cells: false,
            enable_time_based_thresholds: false,
            enable_transform: false,
            enable_transform_overrides: false,
            filter: {
                value_above: "",
                value_below: ""
            },
            format: "none",
            null_color: "darkred",
            null_value: "No data",
            row_name: "_series_",
            thresholds: "70,90",
            time_based_thresholds: [],
            transform_values: "_value_|_value_|_value_",
            transform_values_overrides: "0->down|1->up",
            valueName: "avg"
        },
        default_title_for_rows: "Metric",
        nullPointMode: "connected",
        patterns: [],
        plugin_title: "Boom Table",
        row_col_wrapper: "_",
    },
    plugin_id: plugin_id,
    valueNameOptions: [{
        text: "Min",
        value: "min",
    },
    {
        text: "Max",
        value: "max"
    },
    {
        text: "Average",
        value: "avg"
    },
    {
        text: "Current",
        value: "current"
    },
    {
        text: "Total",
        value: "total"
    }
    ]
};

export {
    config,
    kbn,
    loadPluginCss,
    MetricsPanelCtrl,
    TimeSeries,
    utils,
}
