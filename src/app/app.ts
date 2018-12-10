///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from "lodash";
import { Config } from "../interfaces/interfaces"

const plugin_id: String = "yesoreyeram-boomtable-panel";
const config: Config = {
    plugin_id: plugin_id,
    debug_mode: false,
    error: undefined,
    optionOverrides: [],
    panelDefaults: {
        currentOptionOverrides: [],
        patterns: [],
        defaultPattern: {
            name: undefined,
            pattern: undefined,
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
    ["Text alignment header", "TEXT_ALIGN_TABLE_HEADER", ["left", "right", "center"], "left"],
    ["Text alignment first column", "TEXT_ALIGN_FIRST_COLUMN", ["left", "right", "center"], "left"],
    ["Text alignment table cells", "TEXT_ALIGN_TABLE_CELLS", ["left", "right", "center"], "left"],
    ["Hide Headers", "HIDE_HEADERS", ["false", "true"], "false"],
    ["Hide first column", "HIDE_FIRST_COLUMN", ["false", "true"], "false"],
].forEach((o, i) => {
    config.optionOverrides.push({
        text: String(o[0]),
        propertyName: String(o[1]),
        index: i,
        defaultValue: String(o[3]),
        values: [].concat(o[2]).map(value => { return String[value] }),
        submenu: [].concat(o[2]).map(value => { return { text: String(value), value: value }; })
    });
})

export {
    plugin_id,
    config
}