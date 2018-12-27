System.register(["lodash", "./boom/index"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, index_1, defaultPattern, seriesToTable, getRenderingData, getDebugData;
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
                                "row_col_key": "",
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
                                "row_col_key": "",
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
            getRenderingData = function (data, options) {
                var output = {
                    body: "",
                    footer: "",
                    headers: "",
                };
                var default_title_for_rows = options.default_title_for_rows, hide_headers = options.hide_headers, hide_first_column = options.hide_first_column;
                if (hide_headers !== true) {
                    output.headers += "<tr>";
                    if (hide_first_column !== true) {
                        output.headers += "<th style=\"padding:4px;text-align:center\">" + default_title_for_rows + "</th>";
                    }
                    lodash_1.default.each(data.cols_found, function (c) {
                        output.headers += "<th style=\"padding:4px;text-align:center\">" + c + "</th>";
                    });
                    output.body += "</tr>";
                }
                lodash_1.default.each(data.output, function (o) {
                    if (o.map(function (item) { return item.hidden.toString(); }).indexOf("false") > -1) {
                        output.body += "<tr>";
                        if (hide_first_column !== true) {
                            output.body += "\n                    <td style=\"padding:4px;\">\n                        " + lodash_1.default.first(o.map(function (item) { return item.row_name; })) + "\n                    </td>";
                        }
                        lodash_1.default.each(o, function (item) {
                            var item_style = "padding:4px;background-color:" + item.color_bg + ";color:" + item.color_text;
                            var item_display = item.link === "#" ? item.display_value : "<a href=\"" + item.link + "\" target=\"_blank\" style=\"color:" + item.color_text + "\">" + item.display_value + "</a>";
                            var tooltip = !item.tooltip || item.tooltip === "-" ? undefined : " data-toggle=\"tooltip\" data-html=\"true\" data-placement=\"auto\" title=\"" + item.tooltip + "\" ";
                            output.body += "\n                    <td style=\"" + item_style + "\">\n                        " + (tooltip ? "<span " + tooltip + ">" : "") + "\n                            " + item_display + "\n                        " + (tooltip ? "</span>" : "") + "\n                    </td>\n                ";
                        });
                        output.body += "</tr>";
                    }
                });
                return output;
            };
            exports_1("getRenderingData", getRenderingData);
            getDebugData = function (data) {
                var debugdata = "";
                debugdata = lodash_1.default.map(data, function (d) {
                    return "\n        <tr>\n            <td style=\"padding:4px;text-align:center;width:30%;\">" + d.seriesName + "</td>\n            <td style=\"padding:4px;text-align:center;width:10%;\">" + (d.pattern.name || d.pattern.pattern || "Default") + "</td>\n            <td style=\"padding:4px;text-align:center;width:10%;\" title=\"Value : " + String(d.value_formatted || "null") + " / Raw : " + String(d.value || "null") + " / Stat : " + d.pattern.valueName + "\">" + d.display_value + "</td>\n            <td style=\"padding:4px;text-align:center;width:10%;\">" + d.row_name + "</td>\n            <td style=\"padding:4px;text-align:center;width:10%;\">" + d.col_name + "</td>\n            <td style=\"padding:4px;text-align:center;width:10%;\">" + d.thresholds.join(",") + "</td>\n            <td style=\"padding:4px;text-align:center;width:10%;\">" + d.color_bg + "</td>\n            <td style=\"padding:4px;text-align:center;width:10%;\">" + d.color_text + "</td>\n        </tr>\n        ";
                }).join("");
                return debugdata;
            };
            exports_1("getDebugData", getDebugData);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7WUFHTSxjQUFjLEdBQUcsSUFBSSxtQkFBVyxDQUFDO2dCQUNuQyxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixrQkFBa0IsRUFBRSwyQkFBMkI7Z0JBQy9DLG9CQUFvQixFQUFFLEVBQUU7Z0JBQ3hCLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUsQ0FBQztnQkFDWCxTQUFTLEVBQUUsR0FBRztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsaUJBQWlCO2dCQUN2QixVQUFVLEVBQUUsU0FBUztnQkFDckIsY0FBYyxFQUFFLE9BQU87Z0JBQ3ZCLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixPQUFPLEVBQUUsR0FBRztnQkFDWixRQUFRLEVBQUUsVUFBVTtnQkFDcEIsU0FBUyxFQUFFLGtCQUFrQjtnQkFDN0Isb0JBQW9CLEVBQUUsMkJBQTJCO2dCQUNqRCxVQUFVLEVBQUUsT0FBTztnQkFDbkIscUJBQXFCLEVBQUUsRUFBRTtnQkFDekIsZ0JBQWdCLEVBQUUseUJBQXlCO2dCQUMzQywwQkFBMEIsRUFBRSxlQUFlO2dCQUMzQyxTQUFTLEVBQUUsS0FBSzthQUNuQixDQUFDLENBQUM7O1lBQ0csYUFBYSxHQUFHLFVBQVUsU0FBd0I7Z0JBQ3BELElBQUksVUFBVSxHQUFHLGdCQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxRQUFRLEVBQVYsQ0FBVSxDQUFDLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxVQUFVLEdBQUcsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFFBQVEsRUFBVixD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QUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLG1EQUVqQyxDQUFDO3dCQUNOLENBQUMsQ0FBQyxDQUFDO3dCQUNILE1BQU0sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDO3FCQUMxQjtnQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDSCxPQUFPLE1BQU0sQ0FBQztZQUNsQixDQUFDLENBQUM7O1lBQ0ksWUFBWSxHQUFHLFVBQVUsSUFBSTtnQkFDL0IsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO2dCQUNuQixTQUFTLEdBQUcsZ0JBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFVBQUEsQ0FBQztvQkFDckIsT0FBTyx3RkFFb0QsQ0FBQyxDQUFDLFVBQVUsbUZBQ1osQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksU0FBUyxtR0FDakMsTUFBTSxDQUFDLENBQUMsQ0FBQyxlQUFlLElBQUksTUFBTSxDQUFDLGlCQUFZLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxrQkFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsV0FBSyxDQUFDLENBQUMsYUFBYSxrRkFDM0ksQ0FBQyxDQUFDLFFBQVEsa0ZBQ1YsQ0FBQyxDQUFDLFFBQVEsa0ZBQ1YsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGtGQUN0QixDQUFDLENBQUMsUUFBUSxrRkFDVixDQUFDLENBQUMsVUFBVSxtQ0FFdEUsQ0FBQztnQkFDTixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ1osT0FBTyxTQUFTLENBQUM7WUFDckIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgeyBCb29tUGF0dGVybiwgSUJvb21TZXJpZXMgfSBmcm9tICcuL2Jvb20vaW5kZXgnO1xyXG5cclxuY29uc3QgZGVmYXVsdFBhdHRlcm4gPSBuZXcgQm9vbVBhdHRlcm4oe1xyXG4gICAgYmdDb2xvcnM6IFwiZ3JlZW58b3JhbmdlfHJlZFwiLFxyXG4gICAgYmdDb2xvcnNfb3ZlcnJpZGVzOiBcIjAtPmdyZWVufDItPnJlZHwxLT55ZWxsb3dcIixcclxuICAgIGNsaWNrYWJsZV9jZWxsc19saW5rOiBcIlwiLFxyXG4gICAgY29sX25hbWU6IFwiVmFsdWVcIixcclxuICAgIGRlY2ltYWxzOiAyLFxyXG4gICAgZGVsaW1pdGVyOiBcIi5cIixcclxuICAgIGZvcm1hdDogXCJub25lXCIsXHJcbiAgICBuYW1lOiBcIkRlZmF1bHQgUGF0dGVyblwiLFxyXG4gICAgbnVsbF9jb2xvcjogXCJkYXJrcmVkXCIsXHJcbiAgICBudWxsX3RleHRjb2xvcjogXCJ3aGl0ZVwiLFxyXG4gICAgbnVsbF92YWx1ZTogXCJObyBkYXRhXCIsXHJcbiAgICBwYXR0ZXJuOiBcIipcIixcclxuICAgIHJvd19uYW1lOiBcIl9zZXJpZXNfXCIsXHJcbiAgICB0ZXh0Q29sb3I6IFwicmVkfG9yYW5nZXxncmVlblwiLFxyXG4gICAgdGV4dENvbG9yc19vdmVycmlkZXM6IFwiMC0+cmVkfDItPmdyZWVufDEtPnllbGxvd1wiLFxyXG4gICAgdGhyZXNob2xkczogXCI3MCw5MFwiLFxyXG4gICAgdGltZV9iYXNlZF90aHJlc2hvbGRzOiBbXSxcclxuICAgIHRyYW5zZm9ybV92YWx1ZXM6IFwiX3ZhbHVlX3xfdmFsdWVffF92YWx1ZV9cIixcclxuICAgIHRyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzOiBcIjAtPmRvd258MS0+dXBcIixcclxuICAgIHZhbHVlTmFtZTogXCJhdmdcIlxyXG59KTtcclxuY29uc3Qgc2VyaWVzVG9UYWJsZSA9IGZ1bmN0aW9uIChpbnB1dGRhdGE6IElCb29tU2VyaWVzW10pOiBhbnkge1xyXG4gICAgbGV0IHJvd3NfZm91bmQgPSBfLnVuaXEoXy5tYXAoaW5wdXRkYXRhLCBkID0+IGQucm93X25hbWUpKTtcclxuICAgIGxldCBjb2xzX2ZvdW5kID0gXy51bmlxKF8ubWFwKGlucHV0ZGF0YSwgZCA9PiBkLmNvbF9uYW1lKSk7XHJcbiAgICBsZXQgb3V0cHV0OiBhbnlbXSA9IFtdO1xyXG4gICAgXy5lYWNoKHJvd3NfZm91bmQsIHJvd19uYW1lID0+IHtcclxuICAgICAgICBsZXQgY29sczogYW55ID0gW107XHJcbiAgICAgICAgXy5lYWNoKGNvbHNfZm91bmQsIGNvbF9uYW1lID0+IHtcclxuICAgICAgICAgICAgbGV0IG1hdGNoZWRfaXRlbXMgPSBfLmZpbHRlcihpbnB1dGRhdGEsIG8gPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG8ucm93X25hbWUgPT09IHJvd19uYW1lICYmIG8uY29sX25hbWUgPT09IGNvbF9uYW1lO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKCFtYXRjaGVkX2l0ZW1zIHx8IG1hdGNoZWRfaXRlbXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb2xzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29sX25hbWVcIjogY29sX25hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvcl9iZ1wiOiBcImRhcmtyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yX3RleHRcIjogXCJ3aGl0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGlzcGxheV92YWx1ZVwiOiBcIk5vIG1hdGNoIGZvdW5kXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJoaWRkZW5cIjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsaW5rXCI6IFwiLVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicm93X2NvbF9rZXlcIjogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBcInJvd19uYW1lXCI6IHJvd19uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidG9vbHRpcFwiOiBcIi1cIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hlZF9pdGVtcyAmJiBtYXRjaGVkX2l0ZW1zLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgY29scy5wdXNoKG1hdGNoZWRfaXRlbXNbMF0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoZWRfaXRlbXMgJiYgbWF0Y2hlZF9pdGVtcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBjb2xzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29sX25hbWVcIjogY29sX25hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvcl9iZ1wiOiBcImRhcmtyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yX3RleHRcIjogXCJ3aGl0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGlzcGxheV92YWx1ZVwiOiBcIkR1cGxpY2F0ZSBtYXRjaGVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJoaWRkZW5cIjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsaW5rXCI6IFwiLVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicm93X2NvbF9rZXlcIjogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBcInJvd19uYW1lXCI6IHJvd19uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidG9vbHRpcFwiOiBcIi1cIlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBvdXRwdXQucHVzaChjb2xzKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjb2xzX2ZvdW5kLFxyXG4gICAgICAgIG91dHB1dCxcclxuICAgICAgICByb3dzX2ZvdW5kLFxyXG4gICAgfTtcclxufTtcclxuY29uc3QgZ2V0UmVuZGVyaW5nRGF0YSA9IGZ1bmN0aW9uIChkYXRhLCBvcHRpb25zKTogYW55IHtcclxuICAgIGxldCBvdXRwdXQ6IGFueSA9IHtcclxuICAgICAgICBib2R5OiBcIlwiLFxyXG4gICAgICAgIGZvb3RlcjogXCJcIixcclxuICAgICAgICBoZWFkZXJzOiBcIlwiLFxyXG4gICAgfTtcclxuICAgIGxldCB7IGRlZmF1bHRfdGl0bGVfZm9yX3Jvd3MsIGhpZGVfaGVhZGVycywgaGlkZV9maXJzdF9jb2x1bW4gfSA9IG9wdGlvbnM7XHJcbiAgICBpZiAoaGlkZV9oZWFkZXJzICE9PSB0cnVlKSB7XHJcbiAgICAgICAgb3V0cHV0LmhlYWRlcnMgKz0gXCI8dHI+XCI7XHJcbiAgICAgICAgaWYgKGhpZGVfZmlyc3RfY29sdW1uICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIG91dHB1dC5oZWFkZXJzICs9IGA8dGggc3R5bGU9XCJwYWRkaW5nOjRweDt0ZXh0LWFsaWduOmNlbnRlclwiPiR7ZGVmYXVsdF90aXRsZV9mb3Jfcm93c308L3RoPmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF8uZWFjaChkYXRhLmNvbHNfZm91bmQsIGMgPT4ge1xyXG4gICAgICAgICAgICBvdXRwdXQuaGVhZGVycyArPSBgPHRoIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjpjZW50ZXJcIj4ke2N9PC90aD5gO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG91dHB1dC5ib2R5ICs9IFwiPC90cj5cIjtcclxuICAgIH1cclxuICAgIF8uZWFjaChkYXRhLm91dHB1dCwgbyA9PiB7XHJcbiAgICAgICAgaWYgKG8ubWFwKGl0ZW0gPT4gaXRlbS5oaWRkZW4udG9TdHJpbmcoKSkuaW5kZXhPZihcImZhbHNlXCIpID4gLTEpIHtcclxuICAgICAgICAgICAgb3V0cHV0LmJvZHkgKz0gXCI8dHI+XCI7XHJcbiAgICAgICAgICAgIGlmIChoaWRlX2ZpcnN0X2NvbHVtbiAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgb3V0cHV0LmJvZHkgKz0gYFxyXG4gICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke18uZmlyc3Qoby5tYXAoaXRlbSA9PiBpdGVtLnJvd19uYW1lKSl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF8uZWFjaChvLCBpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtX3N0eWxlID0gYHBhZGRpbmc6NHB4O2JhY2tncm91bmQtY29sb3I6JHtpdGVtLmNvbG9yX2JnfTtjb2xvcjoke2l0ZW0uY29sb3JfdGV4dH1gO1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1fZGlzcGxheSA9IGl0ZW0ubGluayA9PT0gXCIjXCIgPyBpdGVtLmRpc3BsYXlfdmFsdWUgOiBgPGEgaHJlZj1cIiR7aXRlbS5saW5rfVwiIHRhcmdldD1cIl9ibGFua1wiIHN0eWxlPVwiY29sb3I6JHtpdGVtLmNvbG9yX3RleHR9XCI+JHtpdGVtLmRpc3BsYXlfdmFsdWV9PC9hPmA7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG9vbHRpcCA9ICFpdGVtLnRvb2x0aXAgfHwgaXRlbS50b29sdGlwID09PSBcIi1cIiA/IHVuZGVmaW5lZCA6IGAgZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgZGF0YS1odG1sPVwidHJ1ZVwiIGRhdGEtcGxhY2VtZW50PVwiYXV0b1wiIHRpdGxlPVwiJHtpdGVtLnRvb2x0aXB9XCIgYDtcclxuICAgICAgICAgICAgICAgIG91dHB1dC5ib2R5ICs9IGBcclxuICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9XCIke2l0ZW1fc3R5bGV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7dG9vbHRpcCA/IGA8c3BhbiAke3Rvb2x0aXB9PmAgOiBcIlwifVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtpdGVtX2Rpc3BsYXl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7dG9vbHRpcCA/IGA8L3NwYW4+YCA6IFwiXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBvdXRwdXQuYm9keSArPSBcIjwvdHI+XCI7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gb3V0cHV0O1xyXG59O1xyXG5jb25zdCBnZXREZWJ1Z0RhdGEgPSBmdW5jdGlvbiAoZGF0YSk6IGFueSB7XHJcbiAgICBsZXQgZGVidWdkYXRhID0gYGA7XHJcbiAgICBkZWJ1Z2RhdGEgPSBfLm1hcChkYXRhLCBkID0+IHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDx0cj5cclxuICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjpjZW50ZXI7d2lkdGg6MzAlO1wiPiR7ZC5zZXJpZXNOYW1lfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O3RleHQtYWxpZ246Y2VudGVyO3dpZHRoOjEwJTtcIj4ke2QucGF0dGVybi5uYW1lIHx8IGQucGF0dGVybi5wYXR0ZXJuIHx8IFwiRGVmYXVsdFwifTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O3RleHQtYWxpZ246Y2VudGVyO3dpZHRoOjEwJTtcIiB0aXRsZT1cIlZhbHVlIDogJHtTdHJpbmcoZC52YWx1ZV9mb3JtYXR0ZWQgfHwgXCJudWxsXCIpfSAvIFJhdyA6ICR7U3RyaW5nKGQudmFsdWUgfHwgXCJudWxsXCIpfSAvIFN0YXQgOiAke2QucGF0dGVybi52YWx1ZU5hbWV9XCI+JHtkLmRpc3BsYXlfdmFsdWV9PC90ZD5cclxuICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjpjZW50ZXI7d2lkdGg6MTAlO1wiPiR7ZC5yb3dfbmFtZX08L3RkPlxyXG4gICAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDt0ZXh0LWFsaWduOmNlbnRlcjt3aWR0aDoxMCU7XCI+JHtkLmNvbF9uYW1lfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O3RleHQtYWxpZ246Y2VudGVyO3dpZHRoOjEwJTtcIj4ke2QudGhyZXNob2xkcy5qb2luKFwiLFwiKX08L3RkPlxyXG4gICAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDt0ZXh0LWFsaWduOmNlbnRlcjt3aWR0aDoxMCU7XCI+JHtkLmNvbG9yX2JnfTwvdGQ+XHJcbiAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O3RleHQtYWxpZ246Y2VudGVyO3dpZHRoOjEwJTtcIj4ke2QuY29sb3JfdGV4dH08L3RkPlxyXG4gICAgICAgIDwvdHI+XHJcbiAgICAgICAgYDtcclxuICAgIH0pLmpvaW4oYGApO1xyXG4gICAgcmV0dXJuIGRlYnVnZGF0YTtcclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgICBkZWZhdWx0UGF0dGVybixcclxuICAgIGdldFJlbmRlcmluZ0RhdGEsXHJcbiAgICBnZXREZWJ1Z0RhdGEsXHJcbiAgICBzZXJpZXNUb1RhYmxlXHJcbn07XHJcbiJdfQ==