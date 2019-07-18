import _ from "lodash";
import { IBoomSeries, IBoomCellDetails, IBoomTable, IBoomTableTransformationOptions, IBoomPattern } from "./boom/index";
import { BoomPattern, replaceTokens } from './boom/index';

let default_pattern_options: IBoomPattern = {
    bgColors: "green|orange|red",
    bgColors_overrides: "0->green|2->red|1->yellow",
    clickable_cells_link: "",
    col_name: "Value",
    decimals: 2,
    defaultBGColor: "transparent",
    defaultTextColor: "",
    delimiter: ".",
    displayTemplate: "_value_",
    enable_bgColor: false,
    enable_bgColor_overrides: false,
    enable_clickable_cells: false,
    enable_textColor: false,
    enable_textColor_overrides: false,
    enable_time_based_thresholds: false,
    enable_transform: false,
    enable_transform_overrides: false,
    filter: {
        value_above: "",
        value_below: ""
    },
    format: "none",
    name: "Default Pattern",
    null_color: "darkred",
    null_textcolor: "white",
    null_value: "No data",
    pattern: "*",
    row_name: "_series_",
    textColors: "red|orange|green",
    textColors_overrides: "0->red|2->green|1->yellow",
    thresholds: "70,90",
    time_based_thresholds: [],
    tooltipTemplate: "",
    transform_values: "_value_|_value_|_value_",
    transform_values_overrides: "0->down|1->up",
    valueName: "avg"
};
const defaultPattern = new BoomPattern(default_pattern_options);

const seriesToTable = function (inputdata: IBoomSeries[], options: IBoomTableTransformationOptions): IBoomTable {
    let rows_found = _.uniq(_.map(inputdata, d => d.row_name));
    let rows_without_token = _.uniq(_.map(inputdata, d => d.row_name_raw));
    let cols_found = _.uniq(_.map(inputdata, d => d.col_name));
    let output: IBoomCellDetails[][] = [];
    _.each(rows_found, row_name => {
        let cols: IBoomCellDetails[] = [];
        _.each(cols_found, col_name => {
            let matched_items = _.filter(inputdata, o => {
                return o.row_name === row_name && o.col_name === col_name;
            });
            if (!matched_items || matched_items.length === 0) {
                cols.push({
                    "col_name": col_name,
                    "color_bg": options.non_matching_cells_color_bg,
                    "color_text": options.non_matching_cells_color_text,
                    "display_value": replaceTokens(options.non_matching_cells_text),
                    "hidden": false,
                    "link": "-",
                    "row_name": row_name,
                    "tooltip": "-",
                    "value": NaN
                });
            } else if (matched_items && matched_items.length === 1) {
                cols.push(matched_items[0]);
            } else if (matched_items && matched_items.length > 1) {
                cols.push({
                    "col_name": col_name,
                    "color_bg": "darkred",
                    "color_text": "white",
                    "display_value": "Duplicate matches",
                    "hidden": false,
                    "link": "-",
                    "row_name": row_name,
                    "tooltip": "-",
                    "value": NaN
                });
            }
        });
        output.push(cols);
    });
    return {
        cols_found,
        output,
        rows_found,
        rows_without_token
    };
};

export {
    defaultPattern,
    seriesToTable
};
