System.register(["./utils", "lodash", "./boom/index"], function (exports_1, context_1) {
    "use strict";
    var utils, lodash_1, index_1, defaultPattern, seriesToTable, getRenderingData, getDebugData;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (utils_1) {
                utils = utils_1;
            },
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
                var rows_found = lodash_1.default.uniq(utils.getFields(inputdata, "row_name"));
                var cols_found = lodash_1.default.uniq(utils.getFields(inputdata, "col_name"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFJTSxjQUFjLEdBQUcsSUFBSSxtQkFBVyxDQUFDO2dCQUNuQyxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixrQkFBa0IsRUFBRSwyQkFBMkI7Z0JBQy9DLG9CQUFvQixFQUFFLEVBQUU7Z0JBQ3hCLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUsQ0FBQztnQkFDWCxTQUFTLEVBQUUsR0FBRztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsaUJBQWlCO2dCQUN2QixVQUFVLEVBQUUsU0FBUztnQkFDckIsY0FBYyxFQUFFLE9BQU87Z0JBQ3ZCLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixPQUFPLEVBQUUsR0FBRztnQkFDWixRQUFRLEVBQUUsVUFBVTtnQkFDcEIsU0FBUyxFQUFFLGtCQUFrQjtnQkFDN0Isb0JBQW9CLEVBQUUsMkJBQTJCO2dCQUNqRCxVQUFVLEVBQUUsT0FBTztnQkFDbkIscUJBQXFCLEVBQUUsRUFBRTtnQkFDekIsZ0JBQWdCLEVBQUUseUJBQXlCO2dCQUMzQywwQkFBMEIsRUFBRSxlQUFlO2dCQUMzQyxTQUFTLEVBQUUsS0FBSzthQUNuQixDQUFDLENBQUM7O1lBQ0csYUFBYSxHQUFHLFVBQVUsU0FBd0I7Z0JBQ3BELElBQUksVUFBVSxHQUFHLGdCQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hFLElBQUksVUFBVSxHQUFHLGdCQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hFLElBQUksTUFBTSxHQUFVLEVBQUUsQ0FBQztnQkFDdkIsZ0JBQUMsQ0FBQyxJQUFJLENBQUMs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QUFDLElBQUksSUFBSSxPQUFPLENBQUM7cUJBQzFCO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU8sTUFBTSxDQUFDO1lBQ2xCLENBQUMsQ0FBQzs7WUFDSSxZQUFZLEdBQUcsVUFBVSxJQUFJO2dCQUMvQixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7Z0JBQ25CLFNBQVMsR0FBRyxnQkFBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsVUFBQSxDQUFDO29CQUNyQixPQUFPLHdGQUVvRCxDQUFDLENBQUMsVUFBVSxtRkFDWixDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxTQUFTLG1HQUNqQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGVBQWUsSUFBSSxNQUFNLENBQUMsaUJBQVksTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLGtCQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxXQUFLLENBQUMsQ0FBQyxhQUFhLGtGQUMzSSxDQUFDLENBQUMsUUFBUSxrRkFDVixDQUFDLENBQUMsUUFBUSxrRkFDVixDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsa0ZBQ3RCLENBQUMsQ0FBQyxRQUFRLGtGQUNWLENBQUMsQ0FBQyxVQUFVLG1DQUV0RSxDQUFDO2dCQUNOLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDWixPQUFPLFNBQVMsQ0FBQztZQUNyQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiLi91dGlsc1wiO1xuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xuaW1wb3J0IHsgQm9vbVBhdHRlcm4sIElCb29tU2VyaWVzIH0gZnJvbSAnLi9ib29tL2luZGV4JztcblxuY29uc3QgZGVmYXVsdFBhdHRlcm4gPSBuZXcgQm9vbVBhdHRlcm4oe1xuICAgIGJnQ29sb3JzOiBcImdyZWVufG9yYW5nZXxyZWRcIixcbiAgICBiZ0NvbG9yc19vdmVycmlkZXM6IFwiMC0+Z3JlZW58Mi0+cmVkfDEtPnllbGxvd1wiLFxuICAgIGNsaWNrYWJsZV9jZWxsc19saW5rOiBcIlwiLFxuICAgIGNvbF9uYW1lOiBcIlZhbHVlXCIsXG4gICAgZGVjaW1hbHM6IDIsXG4gICAgZGVsaW1pdGVyOiBcIi5cIixcbiAgICBmb3JtYXQ6IFwibm9uZVwiLFxuICAgIG5hbWU6IFwiRGVmYXVsdCBQYXR0ZXJuXCIsXG4gICAgbnVsbF9jb2xvcjogXCJkYXJrcmVkXCIsXG4gICAgbnVsbF90ZXh0Y29sb3I6IFwid2hpdGVcIixcbiAgICBudWxsX3ZhbHVlOiBcIk5vIGRhdGFcIixcbiAgICBwYXR0ZXJuOiBcIipcIixcbiAgICByb3dfbmFtZTogXCJfc2VyaWVzX1wiLFxuICAgIHRleHRDb2xvcjogXCJyZWR8b3JhbmdlfGdyZWVuXCIsXG4gICAgdGV4dENvbG9yc19vdmVycmlkZXM6IFwiMC0+cmVkfDItPmdyZWVufDEtPnllbGxvd1wiLFxuICAgIHRocmVzaG9sZHM6IFwiNzAsOTBcIixcbiAgICB0aW1lX2Jhc2VkX3RocmVzaG9sZHM6IFtdLFxuICAgIHRyYW5zZm9ybV92YWx1ZXM6IFwiX3ZhbHVlX3xfdmFsdWVffF92YWx1ZV9cIixcbiAgICB0cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlczogXCIwLT5kb3dufDEtPnVwXCIsXG4gICAgdmFsdWVOYW1lOiBcImF2Z1wiXG59KTtcbmNvbnN0IHNlcmllc1RvVGFibGUgPSBmdW5jdGlvbiAoaW5wdXRkYXRhOiBJQm9vbVNlcmllc1tdKTogYW55IHtcbiAgICBsZXQgcm93c19mb3VuZCA9IF8udW5pcSh1dGlscy5nZXRGaWVsZHMoaW5wdXRkYXRhLCBcInJvd19uYW1lXCIpKTtcbiAgICBsZXQgY29sc19mb3VuZCA9IF8udW5pcSh1dGlscy5nZXRGaWVsZHMoaW5wdXRkYXRhLCBcImNvbF9uYW1lXCIpKTtcbiAgICBsZXQgb3V0cHV0OiBhbnlbXSA9IFtdO1xuICAgIF8uZWFjaChyb3dzX2ZvdW5kLCByb3dfbmFtZSA9PiB7XG4gICAgICAgIGxldCBjb2xzOiBhbnkgPSBbXTtcbiAgICAgICAgXy5lYWNoKGNvbHNfZm91bmQsIGNvbF9uYW1lID0+IHtcbiAgICAgICAgICAgIGxldCBtYXRjaGVkX2l0ZW1zID0gXy5maWx0ZXIoaW5wdXRkYXRhLCBvID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gby5yb3dfbmFtZSA9PT0gcm93X25hbWUgJiYgby5jb2xfbmFtZSA9PT0gY29sX25hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghbWF0Y2hlZF9pdGVtcyB8fCBtYXRjaGVkX2l0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sX25hbWVcIjogY29sX25hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JfYmdcIjogXCJkYXJrcmVkXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JfdGV4dFwiOiBcIndoaXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZGlzcGxheV92YWx1ZVwiOiBcIk5vIG1hdGNoIGZvdW5kXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaGlkZGVuXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBcImxpbmtcIjogXCItXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicm93X2NvbF9rZXlcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJyb3dfbmFtZVwiOiByb3dfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgXCJ0b29sdGlwXCI6IFwiLVwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoZWRfaXRlbXMgJiYgbWF0Y2hlZF9pdGVtcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICBjb2xzLnB1c2gobWF0Y2hlZF9pdGVtc1swXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoZWRfaXRlbXMgJiYgbWF0Y2hlZF9pdGVtcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgY29scy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xfbmFtZVwiOiBjb2xfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvcl9iZ1wiOiBcImRhcmtyZWRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvcl90ZXh0XCI6IFwid2hpdGVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkaXNwbGF5X3ZhbHVlXCI6IFwiRHVwbGljYXRlIG1hdGNoZXNcIixcbiAgICAgICAgICAgICAgICAgICAgXCJoaWRkZW5cIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIFwibGlua1wiOiBcIi1cIixcbiAgICAgICAgICAgICAgICAgICAgXCJyb3dfY29sX2tleVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBcInJvd19uYW1lXCI6IHJvd19uYW1lLFxuICAgICAgICAgICAgICAgICAgICBcInRvb2x0aXBcIjogXCItXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIG91dHB1dC5wdXNoKGNvbHMpO1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICAgIGNvbHNfZm91bmQsXG4gICAgICAgIG91dHB1dCxcbiAgICAgICAgcm93c19mb3VuZCxcbiAgICB9O1xufTtcbmNvbnN0IGdldFJlbmRlcmluZ0RhdGEgPSBmdW5jdGlvbiAoZGF0YSwgb3B0aW9ucyk6IGFueSB7XG4gICAgbGV0IG91dHB1dDogYW55ID0ge1xuICAgICAgICBib2R5OiBcIlwiLFxuICAgICAgICBmb290ZXI6IFwiXCIsXG4gICAgICAgIGhlYWRlcnM6IFwiXCIsXG4gICAgfTtcbiAgICBsZXQgeyBkZWZhdWx0X3RpdGxlX2Zvcl9yb3dzLCBoaWRlX2hlYWRlcnMsIGhpZGVfZmlyc3RfY29sdW1uIH0gPSBvcHRpb25zO1xuICAgIGlmIChoaWRlX2hlYWRlcnMgIT09IHRydWUpIHtcbiAgICAgICAgb3V0cHV0LmhlYWRlcnMgKz0gXCI8dHI+XCI7XG4gICAgICAgIGlmIChoaWRlX2ZpcnN0X2NvbHVtbiAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgb3V0cHV0LmhlYWRlcnMgKz0gYDx0aCBzdHlsZT1cInBhZGRpbmc6NHB4O3RleHQtYWxpZ246Y2VudGVyXCI+JHtkZWZhdWx0X3RpdGxlX2Zvcl9yb3dzfTwvdGg+YDtcbiAgICAgICAgfVxuICAgICAgICBfLmVhY2goZGF0YS5jb2xzX2ZvdW5kLCBjID0+IHtcbiAgICAgICAgICAgIG91dHB1dC5oZWFkZXJzICs9IGA8dGggc3R5bGU9XCJwYWRkaW5nOjRweDt0ZXh0LWFsaWduOmNlbnRlclwiPiR7Y308L3RoPmA7XG4gICAgICAgIH0pO1xuICAgICAgICBvdXRwdXQuYm9keSArPSBcIjwvdHI+XCI7XG4gICAgfVxuICAgIF8uZWFjaChkYXRhLm91dHB1dCwgbyA9PiB7XG4gICAgICAgIGlmIChvLm1hcChpdGVtID0+IGl0ZW0uaGlkZGVuLnRvU3RyaW5nKCkpLmluZGV4T2YoXCJmYWxzZVwiKSA+IC0xKSB7XG4gICAgICAgICAgICBvdXRwdXQuYm9keSArPSBcIjx0cj5cIjtcbiAgICAgICAgICAgIGlmIChoaWRlX2ZpcnN0X2NvbHVtbiAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIG91dHB1dC5ib2R5ICs9IGBcbiAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAke18uZmlyc3Qoby5tYXAoaXRlbSA9PiBpdGVtLnJvd19uYW1lKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF8uZWFjaChvLCBpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbV9zdHlsZSA9IGBwYWRkaW5nOjRweDtiYWNrZ3JvdW5kLWNvbG9yOiR7aXRlbS5jb2xvcl9iZ307Y29sb3I6JHtpdGVtLmNvbG9yX3RleHR9YDtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbV9kaXNwbGF5ID0gaXRlbS5saW5rID09PSBcIiNcIiA/IGl0ZW0uZGlzcGxheV92YWx1ZSA6IGA8YSBocmVmPVwiJHtpdGVtLmxpbmt9XCIgdGFyZ2V0PVwiX2JsYW5rXCIgc3R5bGU9XCJjb2xvcjoke2l0ZW0uY29sb3JfdGV4dH1cIj4ke2l0ZW0uZGlzcGxheV92YWx1ZX08L2E+YDtcbiAgICAgICAgICAgICAgICBsZXQgdG9vbHRpcCA9ICFpdGVtLnRvb2x0aXAgfHwgaXRlbS50b29sdGlwID09PSBcIi1cIiA/IHVuZGVmaW5lZCA6IGAgZGF0YS10b2dnbGU9XCJ0b29sdGlwXCIgZGF0YS1odG1sPVwidHJ1ZVwiIGRhdGEtcGxhY2VtZW50PVwiYXV0b1wiIHRpdGxlPVwiJHtpdGVtLnRvb2x0aXB9XCIgYDtcbiAgICAgICAgICAgICAgICBvdXRwdXQuYm9keSArPSBgXG4gICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT1cIiR7aXRlbV9zdHlsZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICR7dG9vbHRpcCA/IGA8c3BhbiAke3Rvb2x0aXB9PmAgOiBcIlwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7aXRlbV9kaXNwbGF5fVxuICAgICAgICAgICAgICAgICAgICAgICAgJHt0b29sdGlwID8gYDwvc3Bhbj5gIDogXCJcIn1cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICBgO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBvdXRwdXQuYm9keSArPSBcIjwvdHI+XCI7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb3V0cHV0O1xufTtcbmNvbnN0IGdldERlYnVnRGF0YSA9IGZ1bmN0aW9uIChkYXRhKTogYW55IHtcbiAgICBsZXQgZGVidWdkYXRhID0gYGA7XG4gICAgZGVidWdkYXRhID0gXy5tYXAoZGF0YSwgZCA9PiB7XG4gICAgICAgIHJldHVybiBgXG4gICAgICAgIDx0cj5cbiAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O3RleHQtYWxpZ246Y2VudGVyO3dpZHRoOjMwJTtcIj4ke2Quc2VyaWVzTmFtZX08L3RkPlxuICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjpjZW50ZXI7d2lkdGg6MTAlO1wiPiR7ZC5wYXR0ZXJuLm5hbWUgfHwgZC5wYXR0ZXJuLnBhdHRlcm4gfHwgXCJEZWZhdWx0XCJ9PC90ZD5cbiAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O3RleHQtYWxpZ246Y2VudGVyO3dpZHRoOjEwJTtcIiB0aXRsZT1cIlZhbHVlIDogJHtTdHJpbmcoZC52YWx1ZV9mb3JtYXR0ZWQgfHwgXCJudWxsXCIpfSAvIFJhdyA6ICR7U3RyaW5nKGQudmFsdWUgfHwgXCJudWxsXCIpfSAvIFN0YXQgOiAke2QucGF0dGVybi52YWx1ZU5hbWV9XCI+JHtkLmRpc3BsYXlfdmFsdWV9PC90ZD5cbiAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O3RleHQtYWxpZ246Y2VudGVyO3dpZHRoOjEwJTtcIj4ke2Qucm93X25hbWV9PC90ZD5cbiAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O3RleHQtYWxpZ246Y2VudGVyO3dpZHRoOjEwJTtcIj4ke2QuY29sX25hbWV9PC90ZD5cbiAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O3RleHQtYWxpZ246Y2VudGVyO3dpZHRoOjEwJTtcIj4ke2QudGhyZXNob2xkcy5qb2luKFwiLFwiKX08L3RkPlxuICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjpjZW50ZXI7d2lkdGg6MTAlO1wiPiR7ZC5jb2xvcl9iZ308L3RkPlxuICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjpjZW50ZXI7d2lkdGg6MTAlO1wiPiR7ZC5jb2xvcl90ZXh0fTwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICAgIGA7XG4gICAgfSkuam9pbihgYCk7XG4gICAgcmV0dXJuIGRlYnVnZGF0YTtcbn07XG5cbmV4cG9ydCB7XG4gICAgZGVmYXVsdFBhdHRlcm4sXG4gICAgZ2V0UmVuZGVyaW5nRGF0YSxcbiAgICBnZXREZWJ1Z0RhdGEsXG4gICAgc2VyaWVzVG9UYWJsZVxufTtcbiJdfQ==