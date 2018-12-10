export interface TimeBaseThreshold {
    name: String,
    from: String,
    to: String,
    enabledDays: String,
    threshold: String
}
export interface Pattern {
    name: String,
    pattern: String,
    delimiter: String,
    valueName: String,
    row_name: String,
    col_name: String,
    thresholds: String,
    time_based_thresholds: TimeBaseThreshold[],
    enable_time_based_thresholds: Boolean,
    enable_bgColor: Boolean,
    bgColors: String,
    enable_bgColor_overrides: Boolean,
    bgColors_overrides: String,
    enable_TextColors: Boolean,
    textColors: String,
    enable_TextColor_overrides:Boolean,
    textColors_overrides: String,
    enable_transform: Boolean,
    transform_values: String,
    enable_transform_overrides: Boolean,
    transform_values_overrides: String,
    decimals: Number,
    format: String,
    null_color: String,
    null_value: String,
    enable_clickable_cells: Boolean,
    clickable_cells_link: String,
    filter: {
        value_below: String,
        value_above: String,
    }
}
export interface OptionOverride {
    text: String,
    propertyName: String,
    index: Number,
    defaultValue: String,
    values: String[],
    submenu: {
        text: String,
        value: String
    }[]
}
export interface PanelDefault {
    currentOptionOverrides: {
        propertyName: String,
        value: String,
        text: String
    }[],
    patterns: Pattern[],
    defaultPattern: Pattern,
    activePatternIndex: Number,
    row_col_wrapper: String,
    no_match_text : String,
    default_title_for_rows: String
}
export interface ValueNameOption {
    value: String,
    text: String
}
export interface Config {
    plugin_id: String,
    debug_mode: Boolean,
    error: Error,
    optionOverrides: OptionOverride[],
    panelDefaults: PanelDefault,
    valueNameOptions: ValueNameOption[]
}