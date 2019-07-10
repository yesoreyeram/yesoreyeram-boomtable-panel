const plugin_id = "yesoreyeram-boomtable-panel";
const value_name_options = [
    { text: "Min", value: "min" },
    { text: "Max", value: "max" },
    { text: "Average", value: "avg" },
    { text: "Current", value: "current" },
    { value: 'last_time', text: 'Time of last data point' },
    { value: 'last_time_nonnull', text: 'Time of last non null data point' },
    { text: "Total", value: "total" }
];
const textAlignmentOptions = ["left", "right", "center"];
const config: any = {
    debug_mode: false,
    error: undefined,
    groupedData: undefined,
    hide_first_column: false,
    hide_headers: false,
    panelDefaults: {
        activePatternIndex: -1,
        default_title_for_rows: "Metric",
        patterns: [],
        row_col_wrapper: "_",
    }
};

export {
    plugin_id,
    value_name_options,
    textAlignmentOptions,
    config
};
