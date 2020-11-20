export interface IBoomPattern {
  disabled: boolean;
  bgColors: string;
  bgColors_overrides: string;
  clickable_cells_link: string;
  col_name: string;
  decimals: number;
  delimiter: string;
  enable_bgColor: boolean;
  enable_bgColor_overrides: boolean;
  enable_clickable_cells: boolean;
  enable_textColor: boolean;
  enable_textColor_overrides: boolean;
  enable_time_based_thresholds: boolean;
  enable_transform: boolean;
  enable_transform_overrides: boolean;
  displayTemplate: string;
  defaultBGColor: string;
  defaultTextColor: string;
  filter: {
    value_above: string;
    value_below: string;
  };
  format: string;
  name: string;
  null_color: string;
  null_value: string;
  null_textcolor: string;
  pattern: string;
  row_name: string;
  textColors: string;
  textColors_overrides: string;
  thresholds: string;
  time_based_thresholds: IBoomTimeBasedThreshold[];
  transform_values: string;
  transform_values_overrides: string;
  tooltipTemplate: string;
  valueName: string;
}
export interface IBoomSeries {
  hidden: boolean;
  col_name: string;
  row_name: string;
  row_name_raw: string;
  display_value: string;
  color_bg: string;
  color_text: string;
  tooltip: string;
  value_formatted: string;
  link: string;
  _tags: any[];
  _metricname: string;
}
export interface IBoomTimeBasedThreshold {
  enabledDays: string;
  from: string;
  name: string;
  threshold: string;
  to: string;
}
export interface IBoomTableTransformationOptions {
  non_matching_cells_color_bg: string;
  non_matching_cells_color_text: string;
  non_matching_cells_text: string;
}
export interface IBoomRenderingOptions {
  default_title_for_rows: String;
  hide_first_column: boolean;
  hide_headers: boolean;
  text_alignment_firstcolumn: String;
  text_alignment_values: String;
  first_column_link: String;
}
export interface IBoomCellDetails {
  hidden: boolean;
  col_name: string;
  row_name: string;
  color_bg: string;
  color_text: string;
  display_value: string;
  link: string;
  tooltip: string;
  value: number;
}
export interface IBoomTable {
  rows_without_token: string[];
  rows_found: string[];
  cols_found: string[];
  output: IBoomCellDetails[][];
}
export interface IBoomHTML {
  body: string;
}
export interface IBoomSortingOptions {
  col_index : number;
  direction: 'asc'|'desc';
}

type HORIZONTAL_ALIGNMENT_OPTIONS = 'LEFT' | 'RIGHT' | 'CENTER';

export interface PanelOptions {

    debug_mode: boolean;

    default_title_for_rows: string;
    activePatternIndex: number;
    row_col_wrapper: string;
    hide_first_column: boolean;
    hide_headers: boolean;
    text_alignment_firstcolumn: HORIZONTAL_ALIGNMENT_OPTIONS;
    text_alignment_values: HORIZONTAL_ALIGNMENT_OPTIONS;
    text_alignment_header: HORIZONTAL_ALIGNMENT_OPTIONS;

    sorting_props: IBoomSortingOptions;

    non_matching_cells_text: string;
    non_matching_cells_color_bg: string;
    non_matching_cells_color_text: string;

    first_column_link: string;
    font_size: string;

    defaultPattern: IBoomPattern;
    patterns: IBoomPattern[];

}