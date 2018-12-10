System.register(["lodash", "./utils"], function(exports_1) {
    var lodash_1, utils;
    function buildHTML(elem, hide_headers, hide_first_column, text_align_table_header, cols_found, output, text_align_first_column, text_align_table_cells, default_title_for_rows) {
        var boomtable_output_body_headers = elem.find("#boomtable_output_body_headers");
        var boomtable_output_body_headers_output = "<br/>";
        if (hide_headers !== true) {
            boomtable_output_body_headers_output += "<tr>";
            if (hide_first_column !== true) {
                boomtable_output_body_headers_output += "<th style=\"padding:4px;text-align:" + text_align_table_header + "\">" + default_title_for_rows + "</th>";
            }
            lodash_1.default.each(lodash_1.default.uniq(cols_found), function (c) {
                boomtable_output_body_headers_output += "<th style=\"padding:4px;text-align:" + text_align_table_header + "\">" + c + "</th>";
            });
            boomtable_output_body_headers_output += "</tr>";
        }
        boomtable_output_body_headers.html(boomtable_output_body_headers_output);
        var boomtable_output_body = elem.find('#boomtable_output_body');
        var boomtable_output_body_output = "";
        lodash_1.default.each(output, function (o) {
            boomtable_output_body_output += "<tr>";
            if (hide_first_column !== true) {
                boomtable_output_body_output += "<td style=\"padding:4px;text-align:" + text_align_first_column + "\">" + o.row + "</td>";
            }
            lodash_1.default.each(o.cols, function (c) {
                boomtable_output_body_output += "<td \n                style=\"padding:4px;background-color:" + c.bgColor + ";text-align:" + text_align_table_cells + ";color:" + c.textColor + "\" \n                title=\"" + ("Row Name : " + utils.getActualNameWithoutTransformSign(c.actual_row_name) + "\nCol Name : " + utils.getActualNameWithoutTransformSign(c.actual_col_name) + "\nValue : " + c.value) + "\"\n              >" + c.displayValue + "</td>";
            });
            boomtable_output_body_output += "</tr>";
        });
        boomtable_output_body.html(boomtable_output_body_output);
    }
    function buildDebugHTML(elem, dataComputed) {
        var debug_table_holder = elem.find("#boomtable_debug_table_holder");
        var debug_output = "\n        <table class=\"table-panel-table\">\n            <thead>\n                <tr>\n                    <th style=\"padding:4px;text-align:center\">Metric</th>\n                    <th style=\"padding:4px;text-align:center\">Pattern</th>\n                    <th style=\"padding:4px;text-align:center\">Value</th>\n                    <th style=\"padding:4px;text-align:center\">Row Name</th>\n                    <th style=\"padding:4px;text-align:center\">Col Name</th>\n                    <th style=\"padding:4px;text-align:center\">Thresholds</th>\n                </tr>\n            </thead>\n            <tbody id=\"boomtable_output_body_debug\">\n    ";
        lodash_1.default.each(dataComputed, function (d) {
            debug_output += "\n          <tr>\n            <td style=\"padding:4px;\" width=\"40%\">" + d.alias + "</td>\n            <td style=\"padding:4px;\">" + (d.pattern.pattern || "Default") + "</td>\n            <td style=\"padding:4px;background-color:" + d.bgColor + "\">" + d.displayValue + "</td>\n            <td style=\"padding:4px;\">" + d.row_name + "</td>\n            <td style=\"padding:4px;\">" + d.col_name + "</td>\n            <td style=\"padding:4px;\">" + d.thresholds + "</td>\n          </tr>\n          ";
        });
        debug_output += "\n        </tbody>\n        </table>\n    ";
        debug_table_holder.html(debug_output);
    }
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (utils_1) {
                utils = utils_1;
            }],
        execute: function() {
            exports_1("buildHTML", buildHTML);
            exports_1("buildDebugHTML", buildDebugHTML);
        }
    }
});
//# sourceMappingURL=renderer.js.map