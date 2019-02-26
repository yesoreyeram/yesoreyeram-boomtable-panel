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
            seriesToTable = function (inputdata, options) {
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
                                "color_bg": options.non_matching_cells_color_bg,
                                "color_text": options.non_matching_cells_color_text,
                                "display_value": index_1.replaceTokens(options.non_matching_cells_text),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7WUFJTSxjQUFjLEdBQUcsSUFBSSxtQkFBVyxDQUFDO2dCQUNuQyxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixrQkFBa0IsRUFBRSwyQkFBMkI7Z0JBQy9DLG9CQUFvQixFQUFFLEVBQUU7Z0JBQ3hCLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUsQ0FBQztnQkFDWCxTQUFTLEVBQUUsR0FBRztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsaUJBQWlCO2dCQUN2QixVQUFVLEVBQUUsU0FBUztnQkFDckIsY0FBYyxFQUFFLE9BQU87Z0JBQ3ZCLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixPQUFPLEVBQUUsR0FBRztnQkFDWixRQUFRLEVBQUUsVUFBVTtnQkFDcEIsU0FBUyxFQUFFLGtCQUFrQjtnQkFDN0Isb0JBQW9CLEVBQUUsMkJBQTJCO2dCQUNqRCxVQUFVLEVBQUUsT0FBTztnQkFDbkIscUJBQXFCLEVBQUUsRUFBRTtnQkFDekIsZ0JBQWdCLEVBQUUseUJBQXlCO2dCQUMzQywwQkFBMEIsRUFBRSxlQUFlO2dCQUMzQyxTQUFTLEVBQUUsS0FBSzthQUNuQixDQUFDLENBQUM7O1lBQ0csYUFBYSxHQUFHLFVBQVUsU0FBd0IsRUFBRSxPQUE4QjtnQkFDcEYsSUFBSSxVQUFVLEdBQUcsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFFBQVEsRUFBVixDQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLFVBQVUsR0FBRyxnQkFBQyxDQUFDLElBQUksQ0FBQyxnQkFBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMs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dCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgSUJvb21TZXJpZXMsIElCb29tUmVuZGVyaW5nT3B0aW9ucywgSUJvb21IVE1MLCBJQm9vbUNlbGxEZXRhaWxzLCBJQm9vbVRhYmxlIH0gZnJvbSBcIi4vYm9vbS9pbmRleFwiO1xyXG5pbXBvcnQgeyBCb29tUGF0dGVybiwgcmVwbGFjZVRva2VucyB9IGZyb20gJy4vYm9vbS9pbmRleCc7XHJcblxyXG5jb25zdCBkZWZhdWx0UGF0dGVybiA9IG5ldyBCb29tUGF0dGVybih7XHJcbiAgICBiZ0NvbG9yczogXCJncmVlbnxvcmFuZ2V8cmVkXCIsXHJcbiAgICBiZ0NvbG9yc19vdmVycmlkZXM6IFwiMC0+Z3JlZW58Mi0+cmVkfDEtPnllbGxvd1wiLFxyXG4gICAgY2xpY2thYmxlX2NlbGxzX2xpbms6IFwiXCIsXHJcbiAgICBjb2xfbmFtZTogXCJWYWx1ZVwiLFxyXG4gICAgZGVjaW1hbHM6IDIsXHJcbiAgICBkZWxpbWl0ZXI6IFwiLlwiLFxyXG4gICAgZm9ybWF0OiBcIm5vbmVcIixcclxuICAgIG5hbWU6IFwiRGVmYXVsdCBQYXR0ZXJuXCIsXHJcbiAgICBudWxsX2NvbG9yOiBcImRhcmtyZWRcIixcclxuICAgIG51bGxfdGV4dGNvbG9yOiBcIndoaXRlXCIsXHJcbiAgICBudWxsX3ZhbHVlOiBcIk5vIGRhdGFcIixcclxuICAgIHBhdHRlcm46IFwiKlwiLFxyXG4gICAgcm93X25hbWU6IFwiX3Nlcmllc19cIixcclxuICAgIHRleHRDb2xvcjogXCJyZWR8b3JhbmdlfGdyZWVuXCIsXHJcbiAgICB0ZXh0Q29sb3JzX292ZXJyaWRlczogXCIwLT5yZWR8Mi0+Z3JlZW58MS0+eWVsbG93XCIsXHJcbiAgICB0aHJlc2hvbGRzOiBcIjcwLDkwXCIsXHJcbiAgICB0aW1lX2Jhc2VkX3RocmVzaG9sZHM6IFtdLFxyXG4gICAgdHJhbnNmb3JtX3ZhbHVlczogXCJfdmFsdWVffF92YWx1ZV98X3ZhbHVlX1wiLFxyXG4gICAgdHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXM6IFwiMC0+ZG93bnwxLT51cFwiLFxyXG4gICAgdmFsdWVOYW1lOiBcImF2Z1wiXHJcbn0pO1xyXG5jb25zdCBzZXJpZXNUb1RhYmxlID0gZnVuY3Rpb24gKGlucHV0ZGF0YTogSUJvb21TZXJpZXNbXSwgb3B0aW9uczogSUJvb21SZW5kZXJpbmdPcHRpb25zKTogSUJvb21UYWJsZSB7XHJcbiAgICBsZXQgcm93c19mb3VuZCA9IF8udW5pcShfLm1hcChpbnB1dGRhdGEsIGQgPT4gZC5yb3dfbmFtZSkpO1xyXG4gICAgbGV0IGNvbHNfZm91bmQgPSBfLnVuaXEoXy5tYXAoaW5wdXRkYXRhLCBkID0+IGQuY29sX25hbWUpKTtcclxuICAgIGxldCBvdXRwdXQ6IElCb29tQ2VsbERldGFpbHNbXVtdID0gW107XHJcbiAgICBfLmVhY2gocm93c19mb3VuZCwgcm93X25hbWUgPT4ge1xyXG4gICAgICAgIGxldCBjb2xzOiBJQm9vbUNlbGxEZXRhaWxzW10gPSBbXTtcclxuICAgICAgICBfLmVhY2goY29sc19mb3VuZCwgY29sX25hbWUgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2hlZF9pdGVtcyA9IF8uZmlsdGVyKGlucHV0ZGF0YSwgbyA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gby5yb3dfbmFtZSA9PT0gcm93X25hbWUgJiYgby5jb2xfbmFtZSA9PT0gY29sX25hbWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoIW1hdGNoZWRfaXRlbXMgfHwgbWF0Y2hlZF9pdGVtcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xfbmFtZVwiOiBjb2xfbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yX2JnXCI6IG9wdGlvbnMubm9uX21hdGNoaW5nX2NlbGxzX2NvbG9yX2JnLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JfdGV4dFwiOiBvcHRpb25zLm5vbl9tYXRjaGluZ19jZWxsc19jb2xvcl90ZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGlzcGxheV92YWx1ZVwiOiByZXBsYWNlVG9rZW5zKG9wdGlvbnMubm9uX21hdGNoaW5nX2NlbGxzX3RleHQpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGlkZGVuXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGlua1wiOiBcIi1cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJvd19uYW1lXCI6IHJvd19uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidG9vbHRpcFwiOiBcIi1cIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hlZF9pdGVtcyAmJiBtYXRjaGVkX2l0ZW1zLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgY29scy5wdXNoKG1hdGNoZWRfaXRlbXNbMF0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoZWRfaXRlbXMgJiYgbWF0Y2hlZF9pdGVtcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBjb2xzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29sX25hbWVcIjogY29sX25hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvcl9iZ1wiOiBcImRhcmtyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yX3RleHRcIjogXCJ3aGl0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGlzcGxheV92YWx1ZVwiOiBcIkR1cGxpY2F0ZSBtYXRjaGVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJoaWRkZW5cIjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsaW5rXCI6IFwiLVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicm93X25hbWVcIjogcm93X25hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0b29sdGlwXCI6IFwiLVwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG91dHB1dC5wdXNoKGNvbHMpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvbHNfZm91bmQsXHJcbiAgICAgICAgb3V0cHV0LFxyXG4gICAgICAgIHJvd3NfZm91bmQsXHJcbiAgICB9O1xyXG59O1xyXG5jb25zdCBnZXRSZW5kZXJpbmdIVE1MID0gZnVuY3Rpb24gKGRhdGE6IElCb29tVGFibGUsIG9wdGlvbnM6IElCb29tUmVuZGVyaW5nT3B0aW9ucyk6IElCb29tSFRNTCB7XHJcbiAgICBsZXQgb3V0cHV0OiBJQm9vbUhUTUwgPSB7XHJcbiAgICAgICAgYm9keTogXCJcIixcclxuICAgICAgICBmb290ZXI6IFwiXCIsXHJcbiAgICAgICAgaGVhZGVyczogXCJcIixcclxuICAgIH07XHJcbiAgICBsZXQgeyBkZWZhdWx0X3RpdGxlX2Zvcl9yb3dzLCBoaWRlX2hlYWRlcnMsIGhpZGVfZmlyc3RfY29sdW1uIH0gPSBvcHRpb25zO1xyXG4gICAgaWYgKGhpZGVfaGVhZGVycyAhPT0gdHJ1ZSkge1xyXG4gICAgICAgIG91dHB1dC5oZWFkZXJzICs9IFwiPHRyPlwiO1xyXG4gICAgICAgIGlmIChoaWRlX2ZpcnN0X2NvbHVtbiAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBvdXRwdXQuaGVhZGVycyArPSBgPHRoIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjoke29wdGlvbnMudGV4dF9hbGlnbm1lbnRfZmlyc3Rjb2x1bW59XCI+JHtkZWZhdWx0X3RpdGxlX2Zvcl9yb3dzfTwvdGg+YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXy5lYWNoKGRhdGEuY29sc19mb3VuZCwgYyA9PiB7XHJcbiAgICAgICAgICAgIG91dHB1dC5oZWFkZXJzICs9IGA8dGggc3R5bGU9XCJwYWRkaW5nOjRweDt0ZXh0LWFsaWduOiR7b3B0aW9ucy50ZXh0X2FsaWdubWVudF9oZWFkZXJ9XCI+JHtjfTwvdGg+YDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBvdXRwdXQuYm9keSArPSBcIjwvdHI+XCI7XHJcbiAgICB9XHJcbiAgICBfLmVhY2goZGF0YS5vdXRwdXQsIG8gPT4ge1xyXG4gICAgICAgIGlmIChvLm1hcChpdGVtID0+IGl0ZW0uaGlkZGVuLnRvU3RyaW5nKCkpLmluZGV4T2YoXCJmYWxzZVwiKSA+IC0xKSB7XHJcbiAgICAgICAgICAgIG91dHB1dC5ib2R5ICs9IFwiPHRyPlwiO1xyXG4gICAgICAgICAgICBpZiAoaGlkZV9maXJzdF9jb2x1bW4gIT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5ib2R5ICs9IGBcclxuICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDt0ZXh0LWFsaWduOiR7b3B0aW9ucy50ZXh0X2FsaWdubWVudF9maXJzdGNvbHVtbn1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtfLmZpcnN0KG8ubWFwKGl0ZW0gPT4gaXRlbS5yb3dfbmFtZSkpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+YDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfLmVhY2gobywgaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbV9zdHlsZSA9IGBwYWRkaW5nOjRweDtiYWNrZ3JvdW5kLWNvbG9yOiR7aXRlbS5jb2xvcl9iZ307Y29sb3I6JHtpdGVtLmNvbG9yX3RleHR9O3RleHQtYWxpZ246JHtvcHRpb25zLnRleHRfYWxpZ25tZW50X3ZhbHVlc31gO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1fZGlzcGxheSA9IGl0ZW0ubGluayA9PT0gXCIjXCIgPyBpdGVtLmRpc3BsYXlfdmFsdWUgOiBgPGEgaHJlZj1cIiR7aXRlbS5saW5rfVwiIHRhcmdldD1cIl9ibGFua1wiIHN0eWxlPVwiY29sb3I6JHtpdGVtLmNvbG9yX3RleHR9XCI+JHtpdGVtLmRpc3BsYXlfdmFsdWV9PC9hPmA7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG9vbHRpcCA9ICFpdGVtLnRvb2x0aXAgfHwgaXRlbS50b29sdGlwID09PSBcIi1cIiA/IHVuZGVmaW5lZCA6IGAgZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgZGF0YS1odG1sPVwidHJ1ZVwiIGRhdGEtcGxhY2VtZW50PVwiYXV0b1wiIHRpdGxlPVwiJHtpdGVtLnRvb2x0aXB9XCIgYDtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5ib2R5ICs9IGBcclxuICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9XCIke2l0ZW1fc3R5bGV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7dG9vbHRpcCA/IGA8c3BhbiAke3Rvb2x0aXB9PmAgOiBcIlwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtpdGVtX2Rpc3BsYXl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7dG9vbHRpcCA/IGA8L3NwYW4+YCA6IFwiXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBvdXRwdXQuYm9keSArPSBcIjwvdHI+XCI7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gb3V0cHV0O1xyXG59O1xyXG5jb25zdCBnZXREZWJ1Z0RhdGEgPSBmdW5jdGlvbiAoZGF0YTogSUJvb21TZXJpZXNbXSk6IHN0cmluZyB7XHJcbiAgICBsZXQgZGVidWdkYXRhID0gYGA7XHJcbiAgICBkZWJ1Z2RhdGEgPSBfLm1hcChkYXRhLCBkID0+IHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDx0cj5cclxuICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjpjZW50ZXI7d2lkdGg6MzAlOyB0aXRsZT1cIlNlcmllcyBOYW1lXCIgPiR7ZC5zZXJpZXNOYW1lfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O3RleHQtYWxpZ246Y2VudGVyO3dpZHRoOjEwJTsgdGl0bGU9XCJNYXRjaGluZyBQYXR0ZXJuIE5hbWVcIiA+JHtkLnBhdHRlcm4ubmFtZSB8fCBkLnBhdHRlcm4ucGF0dGVybiB8fCBcIkRlZmF1bHRcIn08L3RkPlxyXG4gICAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDt0ZXh0LWFsaWduOmNlbnRlcjt3aWR0aDoxMCU7IHRpdGxlPVwiVmFsdWUgOiAke1N0cmluZyhkLnZhbHVlX2Zvcm1hdHRlZCB8fCBcIm51bGxcIil9IC8gUmF3IDogJHtTdHJpbmcoZC52YWx1ZSB8fCBcIm51bGxcIil9IC8gU3RhdCA6ICR7ZC5wYXR0ZXJuLnZhbHVlTmFtZX1cIj4ke2QuZGlzcGxheV92YWx1ZX08L3RkPlxyXG4gICAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDt0ZXh0LWFsaWduOmNlbnRlcjt3aWR0aDoxMCU7IHRpdGxlPVwiUm93IG5hbWVcIiA+JHtkLnJvd19uYW1lfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O3RleHQtYWxpZ246Y2VudGVyO3dpZHRoOjEwJTsgdGl0bGU9XCJDb2wgbmFtZVwiID4ke2QuY29sX25hbWV9PC90ZD5cclxuICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjpjZW50ZXI7d2lkdGg6MTAlOyB0aXRsZT1cIlRocmVzaG9sZHNcIiA+JHtkLnRocmVzaG9sZHMuam9pbihcIixcIil9PC90ZD5cclxuICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjpjZW50ZXI7d2lkdGg6MTAlOyB0aXRsZT1cIkJHIENvbG9yXCIgPiR7ZC5jb2xvcl9iZ308L3RkPlxyXG4gICAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDt0ZXh0LWFsaWduOmNlbnRlcjt3aWR0aDoxMCU7IHRpdGxlPVwiVGV4dCBDb2xvclwiID4ke2QuY29sb3JfdGV4dH08L3RkPlxyXG4gICAgICAgIDwvdHI+XHJcbiAgICAgICAgYDtcclxuICAgIH0pLmpvaW4oYGApO1xyXG4gICAgcmV0dXJuIGRlYnVnZGF0YTtcclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgICBkZWZhdWx0UGF0dGVybixcclxuICAgIGdldFJlbmRlcmluZ0hUTUwsXHJcbiAgICBnZXREZWJ1Z0RhdGEsXHJcbiAgICBzZXJpZXNUb1RhYmxlXHJcbn07XHJcbiJdfQ==