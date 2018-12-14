import _ from "lodash";
import { getActualNameWithoutTransformSign } from "./utils";
import { Series, Pattern } from "./../interfaces/interfaces";

let buildOutputData = function (dataComputed: Series[], rows_found: String[], cols_found: String[], defaultPattern: Pattern, options: any): any[] {
    let no_match_text = options && options.no_match_text ? options.no_match_text : "N/A";
    let output = [];
    _.each(_.uniq(rows_found), (row_name) => {
        let o: any = {};
        o.row = row_name;
        o.cols = [];
        _.each(_.uniq(cols_found), (col_name) => {
            let matched_value = (_.find(dataComputed, (e) => {
                return e.row_name === row_name && e.col_name === col_name;
            }));
            let mycol: any = {};
            mycol.name = col_name;
            mycol.value = matched_value ? matched_value.value || NaN : NaN;
            mycol.displayValue = matched_value ? matched_value.displayValue || matched_value.value || "N/A" : no_match_text || "N/A";
            mycol.bgColor = matched_value && matched_value.bgColor ? matched_value.bgColor : "transparent";
            mycol.textColor = matched_value && matched_value.textColor ? matched_value.textColor : "white";
            let tooltipTemplate = matched_value && matched_value.tooltipTemplate ? matched_value.tooltipTemplate : defaultPattern.tooltipTemplate || "No matching series found for _row_name_ & _col_name_";
            if (matched_value) {
                mycol.tooltip = getTooltipMessage(
                    matched_value.alias || matched_value.aliasEscaped || matched_value.label || matched_value.id || "-" ,
                    tooltipTemplate,
                    getActualNameWithoutTransformSign(matched_value.actual_row_name || row_name),
                    getActualNameWithoutTransformSign(matched_value.actual_col_name || col_name),
                    matched_value.valueFormatted || no_match_text
                );
            } else {
                mycol.tooltip = getTooltipMessage(
                    "-",
                    tooltipTemplate,
                    getActualNameWithoutTransformSign(row_name),
                    getActualNameWithoutTransformSign(col_name),
                    "NaN" || no_match_text
                );
            }
            mycol.tooltip = mycol.tooltip;
            o.cols.push(mycol);
        });
        output.push(o);
    });
    return output;
};
let output = function (output: any[], cols_found: any, options: any): { header: String, body: String, footer: String } {
    let hide_headers = options.hide_headers;
    let hide_first_column = options.hide_first_column;
    let text_align_table_header = options.text_align_table_header;
    let default_title_for_rows = options.default_title_for_rows;
    let text_align_first_column = options.text_align_first_column;
    let text_align_table_cells = options.text_align_table_cells;
    let show_footers = options.show_footers;
    let header_and_footer = "<tr>";
    if (hide_first_column !== true) {
        header_and_footer += `<th style="padding:4px;text-align:${text_align_table_header}">${default_title_for_rows}</th>`;
    } _.each(_.uniq(cols_found), c => {
        header_and_footer += `<th style="padding:4px;text-align:${text_align_table_header}">${c}</th>`;
    });
    header_and_footer += "</tr>";
    let header = `<br/>` + (hide_headers !== true ? header_and_footer : "");
    let footer = show_footers === true ? header_and_footer : "";
    let body = ``;
    _.each(output, o => {
        body += "<tr>";
        if (hide_first_column !== true) {
            body += `<td style="padding:4px;text-align:${text_align_first_column}">${o.row}</td>`;
        }
        _.each(o.cols, c => {
            body += `<td
            style="padding:4px;background-color:${c.bgColor};text-align:${text_align_table_cells};color:${c.textColor}"
          >
            <div
            data-toggle="tooltip"
            data-html="true"
            data-placement="auto"
            title="${c.tooltip}"
            style="padding-left:10px">
                ${c.displayValue}
            </div>
          </td>`;
        });
        body += "</tr>";
    });
    return { header, body, footer };
};
let output_debug = function (dataComputed: Series[]): String {
    let debug_output = `
        <table class="table-panel-table">
            <thead>
                <tr>
                    <th style="padding:4px;text-align:center">Metric</th>
                    <th style="padding:4px;text-align:center">Pattern</th>
                    <th style="padding:4px;text-align:center">Value</th>
                    <th style="padding:4px;text-align:center">Row Name</th>
                    <th style="padding:4px;text-align:center">Col Name</th>
                    <th style="padding:4px;text-align:center">Thresholds</th>
                </tr>
            </thead>
            <tbody id="boomtable_output_body_debug">
    `;
    _.each(dataComputed, d => {
        debug_output += `
          <tr>
            <td style="padding:4px;" width="40%">${d.alias}</td>
            <td style="padding:4px;">${d.pattern.pattern || "Default"}</td>
            <td style="padding:4px;background-color:${d.bgColor}">${d.displayValue}</td>
            <td style="padding:4px;">${d.row_name}</td>
            <td style="padding:4px;">${d.col_name}</td>
            <td style="padding:4px;">${d.thresholds}</td>
          </tr>
          `;
    });
    debug_output += `
        </tbody>
        </table>
    `;
    return debug_output;
};
let getTooltipMessage = function (seriesIdentifier: String, template: String, row_name: String, col_name: String, value: Number): String {
    if (template === "_") {
        return "";
    }
    let tooltip = template;
    tooltip = tooltip.replace(new RegExp("_series_", "g"), String(seriesIdentifier));
    tooltip = tooltip.replace(new RegExp("_row_name_", "g"), String(row_name));
    tooltip = tooltip.replace(new RegExp("_col_name_", "g"), String(col_name));
    tooltip = tooltip.replace(new RegExp("_value_", "g"), String(value));
    return tooltip;
};
export {
    getTooltipMessage,
    buildOutputData,
    output as buildOutput,
    output_debug as buildDebugOutput
};
