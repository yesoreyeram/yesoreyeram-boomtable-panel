import { BoomTablePattern } from './BoomTablePattern';

const defaultPattern = new BoomTablePattern({
    bgColors: "green|orange|red",
    bgColors_overrides: "0->green|2->red|1->yellow",
    clickable_cells_link: "",
    col_name: "Value",
    decimals: 2,
    delimiter: ".",
    format: "none",
    name: "Default Pattern",
    null_color: "darkred",
    null_value: "No data",
    pattern: "*",
    row_name: "_series_",
    thresholds: "70,90",
    time_based_thresholds: [],
    transform_values: "_value_|_value_|_value_",
    transform_values_overrides: "0->down|1->up",
    valueName: "avg"
});

export {
    defaultPattern
};
