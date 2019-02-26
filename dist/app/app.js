System.register(["lodash", "./boom/index"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, index_1, defaultPattern, seriesToTable, getRenderingHTML, getDebugData;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            defaultPattern = new index_1.BoomPattern({
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
            exports_1("defaultPattern", defaultPattern);
            seriesToTable = function (inputdata) {
                var rows_found = lodash_1.default.uniq(lodash_1.default.map(inputdata, function (d) { return d.row_name; }));
                var cols_found = lodash_1.default.uniq(lodash_1.default.map(inputdata, function (d) { return d.col_name; }));
                var output = [];
                lodash_1.default.each(rows_found, function (row_name) {
                    var cols = [];
                    lodash_1.default.each(cols_found, function (col_name) {
                        var matched_items = lodash_1.default.filter(inputdata, function (o) {
                            return o.row_name === row_name && o.col_name === col_name;
                        });
                        if (!matched_items || matched_items.length === 0) {
                            cols.push({
                                "col_name": col_name,
                                "color_bg": "darkred",
                                "color_text": "white",
                                "display_value": "No match found",
                                "hidden": false,
                                "link": "-",
                                "row_name": row_name,
                                "tooltip": "-"
                            });
                        }
                        else if (matched_items && matched_items.length === 1) {
                            cols.push(matched_items[0]);
                        }
                        else if (matched_items && matched_items.length > 1) {
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
                    cols_found: cols_found,
                    output: output,
                    rows_found: rows_found,
                };
            };
            exports_1("seriesToTable", seriesToTable);
            getRenderingHTML = function (data, options) {
                var output = {
                    body: "",
                    footer: "",
                    headers: "",
                };
                var default_title_for_rows = options.default_title_for_rows, hide_headers = options.hide_headers, hide_first_column = options.hide_first_column;
                if (hide_headers !== true) {
                    output.headers += "<tr>";
                    if (hide_first_column !== true) {
                        output.headers += "<th style=\"padding:4px;text-align:" + options.text_alignment_firstcolumn + "\">" + default_title_for_rows + "</th>";
                    }
                    lodash_1.default.each(data.cols_found, function (c) {
                        output.headers += "<th style=\"padding:4px;text-align:" + options.text_alignment_header + "\">" + c + "</th>";
                    });
                    output.body += "</tr>";
                }
                lodash_1.default.each(data.output, function (o) {
                    if (o.map(function (item) { return item.hidden.toString(); }).indexOf("false") > -1) {
                        output.body += "<tr>";
                        if (hide_first_column !== true) {
                            output.body += "\n                    <td style=\"padding:4px;text-align:" + options.text_alignment_firstcolumn + "\">\n                        " + lodash_1.default.first(o.map(function (item) { return item.row_name; })) + "\n                    </td>";
                        }
                        lodash_1.default.each(o, function (item) {
                            var item_style = "padding:4px;background-color:" + item.color_bg + ";color:" + item.color_text + ";text-align:" + options.text_alignment_values;
                            var item_display = item.link === "#" ? item.display_value : "<a href=\"" + item.link + "\" target=\"_blank\" style=\"color:" + item.color_text + "\">" + item.display_value + "</a>";
                            var tooltip = !item.tooltip || item.tooltip === "-" ? undefined : " data-toggle=\"tooltip\" data-html=\"true\" data-placement=\"auto\" title=\"" + item.tooltip + "\" ";
                            output.body += "\n                    <td style=\"" + item_style + "\">\n                        " + (tooltip ? "<span " + tooltip + ">" : "") + "\n                            " + item_display + "\n                        " + (tooltip ? "</span>" : "") + "\n                    </td>\n                ";
                        });
                        output.body += "</tr>";
                    }
                });
                return output;
            };
            exports_1("getRenderingHTML", getRenderingHTML);
            getDebugData = function (data) {
                var debugdata = "";
                debugdata = lodash_1.default.map(data, function (d) {
                    return "\n        <tr>\n            <td style=\"padding:4px;text-align:center;width:30%; title=\"Series Name\" >" + d.seriesName + "</td>\n            <td style=\"padding:4px;text-align:center;width:10%; title=\"Matching Pattern Name\" >" + (d.pattern.name || d.pattern.pattern || "Default") + "</td>\n            <td style=\"padding:4px;text-align:center;width:10%; title=\"Value : " + String(d.value_formatted || "null") + " / Raw : " + String(d.value || "null") + " / Stat : " + d.pattern.valueName + "\">" + d.display_value + "</td>\n            <td style=\"padding:4px;text-align:center;width:10%; title=\"Row name\" >" + d.row_name + "</td>\n            <td style=\"padding:4px;text-align:center;width:10%; title=\"Col name\" >" + d.col_name + "</td>\n            <td style=\"padding:4px;text-align:center;width:10%; title=\"Thresholds\" >" + d.thresholds.join(",") + "</td>\n            <td style=\"padding:4px;text-align:center;width:10%; title=\"BG Color\" >" + d.color_bg + "</td>\n            <td style=\"padding:4px;text-align:center;width:10%; title=\"Text Color\" >" + d.color_text + "</td>\n        </tr>\n        ";
                }).join("");
                return debugdata;
            };
            exports_1("getDebugData", getDebugData);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7WUFJTSxjQUFjLEdBQUcsSUFBSSxtQkFBVyxDQUFDO2dCQUNuQyxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixrQkFBa0IsRUFBRSwyQkFBMkI7Z0JBQy9DLG9CQUFvQixFQUFFLEVBQUU7Z0JBQ3hCLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUsQ0FBQztnQkFDWCxTQUFTLEVBQUUsR0FBRztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsaUJBQWlCO2dCQUN2QixVQUFVLEVBQUUsU0FBUztnQkFDckIsY0FBYyxFQUFFLE9BQU87Z0JBQ3ZCLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixPQUFPLEVBQUUsR0FBRztnQkFDWixRQUFRLEVBQUUsVUFBVTtnQkFDcEIsU0FBUyxFQUFFLGtCQUFrQjtnQkFDN0Isb0JBQW9CLEVBQUUsMkJBQTJCO2dCQUNqRCxVQUFVLEVBQUUsT0FBTztnQkFDbkIscUJBQXFCLEVBQUUsRUFBRTtnQkFDekIsZ0JBQWdCLEVBQUUseUJBQXlCO2dCQUMzQywwQkFBMEIsRUFBRSxlQUFlO2dCQUMzQyxTQUFTLEVBQUUsS0FBSzthQUNuQixDQUFDLENBQUM7O1lBQ0csYUFBYSxHQUFHLFVBQVUsU0FBd0I7Z0JBQ3BELElBQUksVUFBVSxHQUFHLGdCQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxRQUFRLEVBQVYsQ0FBVSxDQUFDLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxVQUFVLEdBQUcsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFFBQVEsRUFBVixD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QUcsQ0FBQyxDQUFDLENBQUMsRUFBRSx1Q0FDOUIsWUFBWSxtQ0FDaEIsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsbURBRWpDLENBQUM7d0JBQ04sQ0FBQyxDQUFDLENBQUM7d0JBQ0gsTUFBTSxDQUFDLElBQUksSUFBSSxPQUFPLENBQUM7cUJBQzFCO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU8sTUFBTSxDQUFDO1lBQ2xCLENBQUMsQ0FBQzs7WUFDSSxZQUFZLEdBQUcsVUFBVSxJQUFtQjtnQkFDOUMsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO2dCQUNuQixTQUFTLEdBQUcsZ0JBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFVBQUEsQ0FBQztvQkFDckIsT0FBTyw2R0FFd0UsQ0FBQyxDQUFDLFVBQVUsa0hBQ0YsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksU0FBUyxpR0FDaEUsTUFBTSxDQUFDLENBQUMsQ0FBQyxlQUFlLElBQUksTUFBTSxDQUFDLGlCQUFZLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxrQkFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsV0FBSyxDQUFDLENBQUMsYUFBYSxvR0FDekgsQ0FBQyxDQUFDLFFBQVEsb0dBQ1YsQ0FBQyxDQUFDLFFBQVEsc0dBQ1IsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLG9HQUN4QixDQUFDLENBQUMsUUFBUSxzR0FDUixDQUFDLENBQUMsVUFBVSxtQ0FFekYsQ0FBQztnQkFDTixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ1osT0FBTyxTQUFTLENBQUM7WUFDckIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgeyBJQm9vbVNlcmllcywgSUJvb21SZW5kZXJpbmdPcHRpb25zLCBJQm9vbUhUTUwsIElCb29tQ2VsbERldGFpbHMsIElCb29tVGFibGUgfSBmcm9tIFwiLi9ib29tL2luZGV4XCI7XHJcbmltcG9ydCB7IEJvb21QYXR0ZXJuIH0gZnJvbSAnLi9ib29tL2luZGV4JztcclxuXHJcbmNvbnN0IGRlZmF1bHRQYXR0ZXJuID0gbmV3IEJvb21QYXR0ZXJuKHtcclxuICAgIGJnQ29sb3JzOiBcImdyZWVufG9yYW5nZXxyZWRcIixcclxuICAgIGJnQ29sb3JzX292ZXJyaWRlczogXCIwLT5ncmVlbnwyLT5yZWR8MS0+eWVsbG93XCIsXHJcbiAgICBjbGlja2FibGVfY2VsbHNfbGluazogXCJcIixcclxuICAgIGNvbF9uYW1lOiBcIlZhbHVlXCIsXHJcbiAgICBkZWNpbWFsczogMixcclxuICAgIGRlbGltaXRlcjogXCIuXCIsXHJcbiAgICBmb3JtYXQ6IFwibm9uZVwiLFxyXG4gICAgbmFtZTogXCJEZWZhdWx0IFBhdHRlcm5cIixcclxuICAgIG51bGxfY29sb3I6IFwiZGFya3JlZFwiLFxyXG4gICAgbnVsbF90ZXh0Y29sb3I6IFwid2hpdGVcIixcclxuICAgIG51bGxfdmFsdWU6IFwiTm8gZGF0YVwiLFxyXG4gICAgcGF0dGVybjogXCIqXCIsXHJcbiAgICByb3dfbmFtZTogXCJfc2VyaWVzX1wiLFxyXG4gICAgdGV4dENvbG9yOiBcInJlZHxvcmFuZ2V8Z3JlZW5cIixcclxuICAgIHRleHRDb2xvcnNfb3ZlcnJpZGVzOiBcIjAtPnJlZHwyLT5ncmVlbnwxLT55ZWxsb3dcIixcclxuICAgIHRocmVzaG9sZHM6IFwiNzAsOTBcIixcclxuICAgIHRpbWVfYmFzZWRfdGhyZXNob2xkczogW10sXHJcbiAgICB0cmFuc2Zvcm1fdmFsdWVzOiBcIl92YWx1ZV98X3ZhbHVlX3xfdmFsdWVfXCIsXHJcbiAgICB0cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlczogXCIwLT5kb3dufDEtPnVwXCIsXHJcbiAgICB2YWx1ZU5hbWU6IFwiYXZnXCJcclxufSk7XHJcbmNvbnN0IHNlcmllc1RvVGFibGUgPSBmdW5jdGlvbiAoaW5wdXRkYXRhOiBJQm9vbVNlcmllc1tdKTogSUJvb21UYWJsZSB7XHJcbiAgICBsZXQgcm93c19mb3VuZCA9IF8udW5pcShfLm1hcChpbnB1dGRhdGEsIGQgPT4gZC5yb3dfbmFtZSkpO1xyXG4gICAgbGV0IGNvbHNfZm91bmQgPSBfLnVuaXEoXy5tYXAoaW5wdXRkYXRhLCBkID0+IGQuY29sX25hbWUpKTtcclxuICAgIGxldCBvdXRwdXQ6IElCb29tQ2VsbERldGFpbHNbXVtdID0gW107XHJcbiAgICBfLmVhY2gocm93c19mb3VuZCwgcm93X25hbWUgPT4ge1xyXG4gICAgICAgIGxldCBjb2xzOiBJQm9vbUNlbGxEZXRhaWxzW10gPSBbXTtcclxuICAgICAgICBfLmVhY2goY29sc19mb3VuZCwgY29sX25hbWUgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2hlZF9pdGVtcyA9IF8uZmlsdGVyKGlucHV0ZGF0YSwgbyA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gby5yb3dfbmFtZSA9PT0gcm93X25hbWUgJiYgby5jb2xfbmFtZSA9PT0gY29sX25hbWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoIW1hdGNoZWRfaXRlbXMgfHwgbWF0Y2hlZF9pdGVtcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xfbmFtZVwiOiBjb2xfbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yX2JnXCI6IFwiZGFya3JlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JfdGV4dFwiOiBcIndoaXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkaXNwbGF5X3ZhbHVlXCI6IFwiTm8gbWF0Y2ggZm91bmRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImhpZGRlblwiOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBcImxpbmtcIjogXCItXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyb3dfbmFtZVwiOiByb3dfbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBcInRvb2x0aXBcIjogXCItXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoZWRfaXRlbXMgJiYgbWF0Y2hlZF9pdGVtcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGNvbHMucHVzaChtYXRjaGVkX2l0ZW1zWzBdKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaGVkX2l0ZW1zICYmIG1hdGNoZWRfaXRlbXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgY29scy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvbF9uYW1lXCI6IGNvbF9uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JfYmdcIjogXCJkYXJrcmVkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvcl90ZXh0XCI6IFwid2hpdGVcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRpc3BsYXlfdmFsdWVcIjogXCJEdXBsaWNhdGUgbWF0Y2hlc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGlkZGVuXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGlua1wiOiBcIi1cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJvd19uYW1lXCI6IHJvd19uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidG9vbHRpcFwiOiBcIi1cIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBvdXRwdXQucHVzaChjb2xzKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjb2xzX2ZvdW5kLFxyXG4gICAgICAgIG91dHB1dCxcclxuICAgICAgICByb3dzX2ZvdW5kLFxyXG4gICAgfTtcclxufTtcclxuY29uc3QgZ2V0UmVuZGVyaW5nSFRNTCA9IGZ1bmN0aW9uIChkYXRhOiBJQm9vbVRhYmxlLCBvcHRpb25zOiBJQm9vbVJlbmRlcmluZ09wdGlvbnMpOiBJQm9vbUhUTUwge1xyXG4gICAgbGV0IG91dHB1dDogSUJvb21IVE1MID0ge1xyXG4gICAgICAgIGJvZHk6IFwiXCIsXHJcbiAgICAgICAgZm9vdGVyOiBcIlwiLFxyXG4gICAgICAgIGhlYWRlcnM6IFwiXCIsXHJcbiAgICB9O1xyXG4gICAgbGV0IHsgZGVmYXVsdF90aXRsZV9mb3Jfcm93cywgaGlkZV9oZWFkZXJzLCBoaWRlX2ZpcnN0X2NvbHVtbiB9ID0gb3B0aW9ucztcclxuICAgIGlmIChoaWRlX2hlYWRlcnMgIT09IHRydWUpIHtcclxuICAgICAgICBvdXRwdXQuaGVhZGVycyArPSBcIjx0cj5cIjtcclxuICAgICAgICBpZiAoaGlkZV9maXJzdF9jb2x1bW4gIT09IHRydWUpIHtcclxuICAgICAgICAgICAgb3V0cHV0LmhlYWRlcnMgKz0gYDx0aCBzdHlsZT1cInBhZGRpbmc6NHB4O3RleHQtYWxpZ246JHtvcHRpb25zLnRleHRfYWxpZ25tZW50X2ZpcnN0Y29sdW1ufVwiPiR7ZGVmYXVsdF90aXRsZV9mb3Jfcm93c308L3RoPmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF8uZWFjaChkYXRhLmNvbHNfZm91bmQsIGMgPT4ge1xyXG4gICAgICAgICAgICBvdXRwdXQuaGVhZGVycyArPSBgPHRoIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjoke29wdGlvbnMudGV4dF9hbGlnbm1lbnRfaGVhZGVyfVwiPiR7Y308L3RoPmA7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgb3V0cHV0LmJvZHkgKz0gXCI8L3RyPlwiO1xyXG4gICAgfVxyXG4gICAgXy5lYWNoKGRhdGEub3V0cHV0LCBvID0+IHtcclxuICAgICAgICBpZiAoby5tYXAoaXRlbSA9PiBpdGVtLmhpZGRlbi50b1N0cmluZygpKS5pbmRleE9mKFwiZmFsc2VcIikgPiAtMSkge1xyXG4gICAgICAgICAgICBvdXRwdXQuYm9keSArPSBcIjx0cj5cIjtcclxuICAgICAgICAgICAgaWYgKGhpZGVfZmlyc3RfY29sdW1uICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQuYm9keSArPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjoke29wdGlvbnMudGV4dF9hbGlnbm1lbnRfZmlyc3Rjb2x1bW59XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7Xy5maXJzdChvLm1hcChpdGVtID0+IGl0ZW0ucm93X25hbWUpKX1cclxuICAgICAgICAgICAgICAgICAgICA8L3RkPmA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXy5lYWNoKG8sIGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1fc3R5bGUgPSBgcGFkZGluZzo0cHg7YmFja2dyb3VuZC1jb2xvcjoke2l0ZW0uY29sb3JfYmd9O2NvbG9yOiR7aXRlbS5jb2xvcl90ZXh0fTt0ZXh0LWFsaWduOiR7b3B0aW9ucy50ZXh0X2FsaWdubWVudF92YWx1ZXN9YDtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtX2Rpc3BsYXkgPSBpdGVtLmxpbmsgPT09IFwiI1wiID8gaXRlbS5kaXNwbGF5X3ZhbHVlIDogYDxhIGhyZWY9XCIke2l0ZW0ubGlua31cIiB0YXJnZXQ9XCJfYmxhbmtcIiBzdHlsZT1cImNvbG9yOiR7aXRlbS5jb2xvcl90ZXh0fVwiPiR7aXRlbS5kaXNwbGF5X3ZhbHVlfTwvYT5gO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRvb2x0aXAgPSAhaXRlbS50b29sdGlwIHx8IGl0ZW0udG9vbHRpcCA9PT0gXCItXCIgPyB1bmRlZmluZWQgOiBgIGRhdGEtdG9nZ2xlPVwidG9vbHRpcFwiIGRhdGEtaHRtbD1cInRydWVcIiBkYXRhLXBsYWNlbWVudD1cImF1dG9cIiB0aXRsZT1cIiR7aXRlbS50b29sdGlwfVwiIGA7XHJcbiAgICAgICAgICAgICAgICBvdXRwdXQuYm9keSArPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPVwiJHtpdGVtX3N0eWxlfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke3Rvb2x0aXAgPyBgPHNwYW4gJHt0b29sdGlwfT5gIDogXCJcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7aXRlbV9kaXNwbGF5fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke3Rvb2x0aXAgPyBgPC9zcGFuPmAgOiBcIlwifVxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgb3V0cHV0LmJvZHkgKz0gXCI8L3RyPlwiO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG91dHB1dDtcclxufTtcclxuY29uc3QgZ2V0RGVidWdEYXRhID0gZnVuY3Rpb24gKGRhdGE6IElCb29tU2VyaWVzW10pOiBzdHJpbmcge1xyXG4gICAgbGV0IGRlYnVnZGF0YSA9IGBgO1xyXG4gICAgZGVidWdkYXRhID0gXy5tYXAoZGF0YSwgZCA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O3RleHQtYWxpZ246Y2VudGVyO3dpZHRoOjMwJTsgdGl0bGU9XCJTZXJpZXMgTmFtZVwiID4ke2Quc2VyaWVzTmFtZX08L3RkPlxyXG4gICAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDt0ZXh0LWFsaWduOmNlbnRlcjt3aWR0aDoxMCU7IHRpdGxlPVwiTWF0Y2hpbmcgUGF0dGVybiBOYW1lXCIgPiR7ZC5wYXR0ZXJuLm5hbWUgfHwgZC5wYXR0ZXJuLnBhdHRlcm4gfHwgXCJEZWZhdWx0XCJ9PC90ZD5cclxuICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjpjZW50ZXI7d2lkdGg6MTAlOyB0aXRsZT1cIlZhbHVlIDogJHtTdHJpbmcoZC52YWx1ZV9mb3JtYXR0ZWQgfHwgXCJudWxsXCIpfSAvIFJhdyA6ICR7U3RyaW5nKGQudmFsdWUgfHwgXCJudWxsXCIpfSAvIFN0YXQgOiAke2QucGF0dGVybi52YWx1ZU5hbWV9XCI+JHtkLmRpc3BsYXlfdmFsdWV9PC90ZD5cclxuICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjpjZW50ZXI7d2lkdGg6MTAlOyB0aXRsZT1cIlJvdyBuYW1lXCIgPiR7ZC5yb3dfbmFtZX08L3RkPlxyXG4gICAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDt0ZXh0LWFsaWduOmNlbnRlcjt3aWR0aDoxMCU7IHRpdGxlPVwiQ29sIG5hbWVcIiA+JHtkLmNvbF9uYW1lfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O3RleHQtYWxpZ246Y2VudGVyO3dpZHRoOjEwJTsgdGl0bGU9XCJUaHJlc2hvbGRzXCIgPiR7ZC50aHJlc2hvbGRzLmpvaW4oXCIsXCIpfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O3RleHQtYWxpZ246Y2VudGVyO3dpZHRoOjEwJTsgdGl0bGU9XCJCRyBDb2xvclwiID4ke2QuY29sb3JfYmd9PC90ZD5cclxuICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjpjZW50ZXI7d2lkdGg6MTAlOyB0aXRsZT1cIlRleHQgQ29sb3JcIiA+JHtkLmNvbG9yX3RleHR9PC90ZD5cclxuICAgICAgICA8L3RyPlxyXG4gICAgICAgIGA7XHJcbiAgICB9KS5qb2luKGBgKTtcclxuICAgIHJldHVybiBkZWJ1Z2RhdGE7XHJcbn07XHJcblxyXG5leHBvcnQge1xyXG4gICAgZGVmYXVsdFBhdHRlcm4sXHJcbiAgICBnZXRSZW5kZXJpbmdIVE1MLFxyXG4gICAgZ2V0RGVidWdEYXRhLFxyXG4gICAgc2VyaWVzVG9UYWJsZVxyXG59O1xyXG4iXX0=