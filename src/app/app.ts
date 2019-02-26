import _ from "lodash";
import { IBoomSeries, IBoomRenderingOptions, IBoomHTML, IBoomCellDetails, IBoomTable } from "./boom/index";
import { BoomPattern, replaceTokens } from './boom/index';

const defaultPattern = new BoomPattern({
    bgColors: "green|orange|red",
    bgColors_overrides: "0->green|2->red|1->yellow",
    clickable_cells_link: "",
    col_name: "Value",
    decimals: 2,
    delimiter: ".",
    format: "none",
    name: "Default Pattern",
    null_color: "darkred",
    null_textcolor: "white",
    null_value: "No data",
    pattern: "*",
    row_name: "_series_",
    textColor: "red|orange|green",
    textColors_overrides: "0->red|2->green|1->yellow",
    thresholds: "70,90",
    time_based_thresholds: [],
    transform_values: "_value_|_value_|_value_",
    transform_values_overrides: "0->down|1->up",
    valueName: "avg"
});
const seriesToTable = function (inputdata: IBoomSeries[], options: IBoomRenderingOptions): IBoomTable {
    let rows_found = _.uniq(_.map(inputdata, d => d.row_name));
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
                    "tooltip": "-"
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
                    "tooltip": "-"
                });
            }
        });
        output.push(cols);
    });
    return {
        cols_found,
        output,
        rows_found,
    };
};
const getRenderingHTML = function (data: IBoomTable, options: IBoomRenderingOptions): IBoomHTML {
    let output: IBoomHTML = {
        body: "",
        footer: "",
        headers: "",
    };
    let { default_title_for_rows, hide_headers, hide_first_column } = options;
    if (hide_headers !== true) {
        output.headers += "<tr>";
        if (hide_first_column !== true) {
            output.headers += `<th style="padding:4px;text-align:${options.text_alignment_firstcolumn}">${default_title_for_rows}</th>`;
        }
        _.each(data.cols_found, c => {
            output.headers += `<th style="padding:4px;text-align:${options.text_alignment_header}">${c}</th>`;
        });
        output.body += "</tr>";
    }
    _.each(data.output, o => {
        if (o.map(item => item.hidden.toString()).indexOf("false") > -1) {
            output.body += "<tr>";
            if (hide_first_column !== true) {
                output.body += `
                    <td style="padding:4px;text-align:${options.text_alignment_firstcolumn}">
                        ${_.first(o.map(item => item.row_name))}
                    </td>`;
            }
            _.each(o, item => {
                let item_style = `padding:4px;background-color:${item.color_bg};color:${item.color_text};text-align:${options.text_alignment_values}`;
                let item_display = item.link === "#" ? item.display_value : `<a href="${item.link}" target="_blank" style="color:${item.color_text}">${item.display_value}</a>`;
                let tooltip = !item.tooltip || item.tooltip === "-" ? undefined : ` data-toggle="tooltip" data-html="true" data-placement="auto" title="${item.tooltip}" `;
                output.body += `
                    <td style="${item_style}">
                        ${tooltip ? `<span ${tooltip}>` : ""}
                            ${item_display}
                        ${tooltip ? `</span>` : ""}
                    </td>
                `;
            });
            output.body += "</tr>";
        }
    });
    return output;
};
const getDebugData = function (data: IBoomSeries[]): string {
    let debugdata = ``;
    debugdata = _.map(data, d => {
        return `
        <tr>
            <td style="padding:4px;text-align:center;width:30%; title="Series Name" >${d.seriesName}</td>
            <td style="padding:4px;text-align:center;width:10%; title="Matching Pattern Name" >${d.pattern.name || d.pattern.pattern || "Default"}</td>
            <td style="padding:4px;text-align:center;width:10%; title="Value : ${String(d.value_formatted || "null")} / Raw : ${String(d.value || "null")} / Stat : ${d.pattern.valueName}">${d.display_value}</td>
            <td style="padding:4px;text-align:center;width:10%; title="Row name" >${d.row_name}</td>
            <td style="padding:4px;text-align:center;width:10%; title="Col name" >${d.col_name}</td>
            <td style="padding:4px;text-align:center;width:10%; title="Thresholds" >${d.thresholds.join(",")}</td>
            <td style="padding:4px;text-align:center;width:10%; title="BG Color" >${d.color_bg}</td>
            <td style="padding:4px;text-align:center;width:10%; title="Text Color" >${d.color_text}</td>
        </tr>
        `;
    }).join(``);
    return debugdata;
};

export {
    defaultPattern,
    getRenderingHTML,
    getDebugData,
    seriesToTable
};
