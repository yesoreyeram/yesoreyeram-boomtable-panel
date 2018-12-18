///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from "lodash";
import * as utils from "./utils";
import { Config, Pattern } from "../interfaces/interfaces";
import { compute, defaultHandler } from "./seriesHandler";
import * as renderer from "./renderer";

const plugin_id: String = "yesoreyeram-boomtable-panel";
const defaultPattern: Pattern = {
    name: undefined,
    pattern: undefined,
    disabled: false,
    row_name: "_series_",
    col_name: "Value",
    delimiter: ".",
    valueName: "avg",
    format: "none",
    decimals: 2,
    tooltipTemplate: "Row Name : _row_name_ <br/>Col Name : _col_name_ <br/>Value : _value_",
    thresholds: "70,90",
    enable_bgColor: false,
    bgColors: "green|orange|red",
    enable_bgColor_overrides: false,
    bgColors_overrides: "0->green|2->red|1->yellow",
    enable_TextColors: false,
    textColors: "white|white|white",
    enable_TextColor_overrides: false,
    textColors_overrides: "0->white|2->white|1->white",
    enable_transform: false,
    transform_values: "_value_|_value_|_value_",
    enable_transform_overrides: false,
    transform_values_overrides: "0->down|1->up",
    enable_time_based_thresholds: false,
    time_based_thresholds: [],
    null_color: "darkred",
    null_text_color: "white",
    null_value: "No data",
    enable_clickable_cells: false,
    clickable_cells_link: "",
    filter: {
        value_below: "",
        value_above: ""
    }
};
const config: Config = {
    plugin_id: plugin_id,
    debug_mode: false,
    error: undefined,
    optionOverrides: [],
    panelDefaults: {
        currentOptionOverrides: [],
        patterns: [],
        defaultPattern: defaultPattern,
        activePatternIndex: -1,
        row_col_wrapper: "_",
        no_match_text: "N/A",
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
const computeRenderingData = function (data: any, patterns: Pattern[], defaultPattern: Pattern, panelOptions, rendering_options) {
    let returnData = {
        error: undefined,
        output_html: {
            header: "",
            body: "",
            footer: "",
            debug: "",
        }
    };
    if (data && data.length > 0 && _.filter(data, d => { return d.type && d.type === "table"; }).length > 0) {
        returnData.error = utils.buildError(`Only timeseries data supported`, `Only timeseries data supported`);
    } else if (data) {
        let metricsReceived = utils.getFields(data, "target");
        if (utils.hasDuplicates(metricsReceived)) {
            let duplicateKeys = _.uniq(metricsReceived.filter(v => {
                return metricsReceived.filter(t => t === v).length > 1;
            }));
            returnData.error = utils.buildError(`Duplicate series found`, `Duplicate series : <br/> ${duplicateKeys.join("<br/> ")}`);
        } else {
            returnData.error = undefined;
            let mydata = data.map(defaultHandler.bind(data));
            let dataComputed = compute(mydata, defaultPattern, patterns, panelOptions.row_col_wrapper);
            let rows_found = utils.getFields(dataComputed, "row_name");
            let cols_found = utils.getFields(dataComputed, "col_name");
            let keys_found = utils.getFields(dataComputed, "key_name");
            if (utils.isUniqueArray(keys_found)) {
                returnData.error = undefined;
                let output = renderer.buildOutputData(dataComputed, rows_found, cols_found, defaultPattern, {
                    no_match_text: panelOptions.no_match_text
                });
                let { header, body, footer } = renderer.buildOutput(output, cols_found, rendering_options);
                returnData.output_html.header = String(header);
                returnData.output_html.body = String(body);
                returnData.output_html.footer = String(footer);
            } else {
                let duplicateKeys = _.uniq(keys_found.filter(v => {
                    return keys_found.filter(t => t === v).length > 1;
                }));
                returnData.error = utils.buildError(`Duplicate keys found`, `Duplicate key values : <br/> ${duplicateKeys.join("<br/> ")}`);
            }
            returnData.output_html.debug = String(renderer.buildDebugOutput(dataComputed));
        }
    }
    return returnData;
};

config.optionOverrides.push(utils.buildOptionOverride(["Text alignment header & footer ", "TEXT_ALIGN_TABLE_HEADER", ["left", "right", "center"], "left"], 0));
config.optionOverrides.push(utils.buildOptionOverride(["Text alignment first column", "TEXT_ALIGN_FIRST_COLUMN", ["left", "right", "center"], "left"], 1));
config.optionOverrides.push(utils.buildOptionOverride(["Text alignment cells / Metrics", "TEXT_ALIGN_TABLE_CELLS", ["left", "right", "center"], "left"], 2));
config.optionOverrides.push(utils.buildOptionOverride(["Hide Headers", "HIDE_HEADERS", ["false", "true"], "false"], 3));
config.optionOverrides.push(utils.buildOptionOverride(["Hide first column", "HIDE_FIRST_COLUMN", ["false", "true"], "false"], 4));
config.optionOverrides.push(utils.buildOptionOverride(["Show Footers", "SHOW_FOOTERS", ["false", "true"], "false"], 5));

export {
    plugin_id,
    config,
    computeRenderingData
};
