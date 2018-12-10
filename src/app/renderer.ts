import _ from "lodash";
import * as utils from "./utils";

function buildHTML(elem: any, hide_headers: boolean, hide_first_column: boolean, text_align_table_header: any, cols_found: any, output: any[], text_align_first_column: any, text_align_table_cells: any, default_title_for_rows: any): void {
    let boomtable_output_body_headers = elem.find("#boomtable_output_body_headers");
    let boomtable_output_body_headers_output = `<br/>`;
    if (hide_headers !== true) {
        boomtable_output_body_headers_output += "<tr>";
        if (hide_first_column !== true) {
            boomtable_output_body_headers_output += `<th style="padding:4px;text-align:${text_align_table_header}">${default_title_for_rows}</th>`;
        }
        _.each(_.uniq(cols_found), c => {
            boomtable_output_body_headers_output += `<th style="padding:4px;text-align:${text_align_table_header}">${c}</th>`;
        });
        boomtable_output_body_headers_output += "</tr>";
    }
    boomtable_output_body_headers.html(boomtable_output_body_headers_output);
    let boomtable_output_body = elem.find('#boomtable_output_body');
    let boomtable_output_body_output = ``;
    _.each(output, o => {
        boomtable_output_body_output += "<tr>";
        if (hide_first_column !== true) {
            boomtable_output_body_output += `<td style="padding:4px;text-align:${text_align_first_column}">${o.row}</td>`;
        }
        _.each(o.cols, c => {
            boomtable_output_body_output += `<td 
                style="padding:4px;background-color:${c.bgColor};text-align:${text_align_table_cells}" 
                title="${"Row Name : " + utils.getActualNameWithoutTransformSign(c.actual_row_name) + "\nCol Name : " + utils.getActualNameWithoutTransformSign(c.actual_col_name) + "\nValue : " + c.value}"
              >${c.displayValue}</td>`;
        });
        boomtable_output_body_output += "</tr>";
    });
    boomtable_output_body.html(boomtable_output_body_output);
}
function buildDebugHTML(elem: any, dataComputed: any): void {
    let debug_table_holder = elem.find("#boomtable_debug_table_holder");
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
    debug_table_holder.html(debug_output);
}
export {
    buildHTML,
    buildDebugHTML
}