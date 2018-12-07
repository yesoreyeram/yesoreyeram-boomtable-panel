export interface PanelDefault {
    currentOptionOverrides: any,
    patterns:any,
    defaultPattern:any,
    activePatternIndex : Number,
    row_col_wrapper: String,
    default_title_for_rows:String
}
export interface  Config {
    plugin_id : String,
    debug_mode : Boolean,
    error : Error,
    groupedData: any,
    optionOverrides: any,
    panelDefaults: PanelDefault,
    valueNameOptions: any
}