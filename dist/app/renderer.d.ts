declare let getTooltipMessage: (template: String, row_name: String, col_name: String, value: Number) => String;
declare let buildHTML: (elem: any, hide_headers: boolean, hide_first_column: boolean, show_footers: boolean, text_align_table_header: any, cols_found: any, output: any[], text_align_first_column: any, text_align_table_cells: any, default_title_for_rows: any) => void;
declare let buildDebugHTML: (elem: any, dataComputed: any) => void;
export { getTooltipMessage, buildHTML, buildDebugHTML };
