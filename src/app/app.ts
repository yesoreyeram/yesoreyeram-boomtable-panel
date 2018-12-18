///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from "lodash";
import * as utils from "./utils";
import { config } from "./config";
import { Pattern } from "../interfaces/interfaces";
import { compute, defaultHandler } from "./seriesHandler";
import * as renderer from "./renderer";


const computeRenderingData = function (data: any, patterns: Pattern[], defaultPattern: Pattern, panelOptions, rendering_options, debug_mode: boolean) {
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
            if (utils.hasDuplicates(keys_found)) {
                let duplicateKeys = _.uniq(keys_found.filter(v => {
                    return keys_found.filter(t => t === v).length > 1;
                }));
                returnData.error = utils.buildError(`Duplicate keys found`, `Duplicate key values : <br/> ${duplicateKeys.join("<br/> ")}`);
            } else if (utils.isUniqueArray(keys_found)) {
                returnData.error = undefined;
                let output = renderer.buildOutputData(dataComputed, rows_found, cols_found, {
                    no_match_text: panelOptions.no_match_text
                });
                let { header, body, footer } = renderer.buildOutput(output, cols_found, rendering_options);
                returnData.output_html.header = String(header);
                returnData.output_html.body = String(body);
                returnData.output_html.footer = String(footer);
            }
            if (debug_mode) {
                returnData.output_html.debug = String(renderer.buildDebugOutput(dataComputed));
            }
        }
    }
    return returnData;
};
const getOptionOverride = function (currentOptionOverrides, propertyName: String) {
    let option = _.find(currentOptionOverrides, o => o.propertyName === propertyName);
    let default_option = _.find(config.optionOverrides, o => o.propertyName === propertyName);
    if (option) {
        return option.value;
    } else {
        return default_option.defaultValue;
    }
};
export {
    computeRenderingData,
    getOptionOverride
};
