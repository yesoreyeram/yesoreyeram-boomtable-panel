import _ from "lodash";
import * as utils from "./utils";
import { Config, Pattern } from "../interfaces/interfaces";

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
    tooltipTemplate: "Series : _series_ | Value : _value_",
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
    debug_mode: false,
    error: undefined,
    panelDefaults: {
        currentOptionOverrides: [],
        patterns: [],
        defaultPattern: defaultPattern,
        activePatternIndex: -1,
        row_col_wrapper: "_",
        no_match_text: "N/A",
        default_title_for_rows: "Metric"
    },
    optionOverrides: [],
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
config.optionOverrides = [
    utils.buildOptionOverride(["Text alignment header & footer ", "TEXT_ALIGN_TABLE_HEADER", ["left", "right", "center"], "left"], 0),
    utils.buildOptionOverride(["Text alignment first column", "TEXT_ALIGN_FIRST_COLUMN", ["left", "right", "center"], "left"], 1),
    utils.buildOptionOverride(["Text alignment cells / Metrics", "TEXT_ALIGN_TABLE_CELLS", ["left", "right", "center"], "left"], 2),
    utils.buildOptionOverride(["Hide Headers", "HIDE_HEADERS", ["false", "true"], "false"], 3),
    utils.buildOptionOverride(["Hide first column", "HIDE_FIRST_COLUMN", ["false", "true"], "false"], 4),
    utils.buildOptionOverride(["Show Footers", "SHOW_FOOTERS", ["false", "true"], "false"], 5)
];
export {
    plugin_id,
    config
};
