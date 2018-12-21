System.register(["./utils", "lodash", "./Boom"], function (exports_1, context_1) {
    "use strict";
    var utils, lodash_1, Boom_1, defaultPattern, seriesToTable, getRenderingData;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (utils_1) {
                utils = utils_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (Boom_1_1) {
                Boom_1 = Boom_1_1;
            }
        ],
        execute: function () {
            defaultPattern = new Boom_1.BoomPattern({
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
                    debug: "",
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
                            output.body += "\n                    <td style=\"" + item_style + "\">\n                        " + item_display + "\n                    </td>\n                ";
                        });
                        output.body += "</tr>";
                    }
                });
                return output;
            };
            exports_1("getRenderingData", getRenderingData);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFJTSxjQUFjLEdBQUcsSUFBSSxrQkFBVyxDQUFDO2dCQUNuQyxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixrQkFBa0IsRUFBRSwyQkFBMkI7Z0JBQy9DLG9CQUFvQixFQUFFLEVBQUU7Z0JBQ3hCLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUsQ0FBQztnQkFDWCxTQUFTLEVBQUUsR0FBRztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsaUJBQWlCO2dCQUN2QixVQUFVLEVBQUUsU0FBUztnQkFDckIsY0FBYyxFQUFFLE9BQU87Z0JBQ3ZCLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixPQUFPLEVBQUUsR0FBRztnQkFDWixRQUFRLEVBQUUsVUFBVTtnQkFDcEIsU0FBUyxFQUFHLGtCQUFrQjtnQkFDOUIsb0JBQW9CLEVBQUcsMkJBQTJCO2dCQUNsRCxVQUFVLEVBQUUsT0FBTztnQkFDbkIscUJBQXFCLEVBQUUsRUFBRTtnQkFDekIsZ0JBQWdCLEVBQUUseUJBQXlCO2dCQUMzQywwQkFBMEIsRUFBRSxlQUFlO2dCQUMzQyxTQUFTLEVBQUUsS0FBSzthQUNuQixDQUFDLENBQUM7O1lBQ0csYUFBYSxHQUFHLFVBQVUsU0FBd0I7Z0JBQ3BELElBQUksVUFBVSxHQUFHLGdCQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hFLElBQUksVUFBVSxHQUFHLGdCQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hFLElBQUksTUFBTSxHQUFVLEVBQUUsQ0FBQztnQkFDdkIsZ0JBQUMsQ0FBQyxJQUFJLENBQUMs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QUFDLFFBQVEsRUFBRSxFQUF0QixDQUFzQixDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO3dCQUM3RCxNQUFNLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQzt3QkFDdEIsSUFBSSxpQkFBaUIsS0FBSyxJQUFJLEVBQUU7NEJBQzVCLE1BQU0sQ0FBQyxJQUFJLElBQUksZ0ZBRUwsZ0JBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxRQUFRLEVBQWIsQ0FBYSxDQUFDLENBQUMsZ0NBQ3JDLENBQUM7eUJBQ2Q7d0JBQ0QsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLFVBQUEsSUFBSTs0QkFDVixJQUFJLFVBQVUsR0FBRyxrQ0FBZ0MsSUFBSSxDQUFDLFFBQVEsZUFBVSxJQUFJLENBQUMsVUFBWSxDQUFDOzRCQUMxRixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsZUFBWSxJQUFJLENBQUMsSUFBSSwyQ0FBa0MsSUFBSSxDQUFDLFVBQVUsV0FBSyxJQUFJLENBQUMsYUFBYSxTQUFNLENBQUM7NEJBQ2hLLE1BQU0sQ0FBQyxJQUFJLElBQUksdUNBQ0UsVUFBVSxxQ0FDakIsWUFBWSxrREFFckIsQ0FBQzt3QkFDTixDQUFDLENBQUMsQ0FBQzt3QkFDSCxNQUFNLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQztxQkFDMUI7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxNQUFNLENBQUM7WUFDbEIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCB7IEJvb21QYXR0ZXJuLCBJQm9vbVNlcmllcyB9IGZyb20gJy4vQm9vbSc7XG5cbmNvbnN0IGRlZmF1bHRQYXR0ZXJuID0gbmV3IEJvb21QYXR0ZXJuKHtcbiAgICBiZ0NvbG9yczogXCJncmVlbnxvcmFuZ2V8cmVkXCIsXG4gICAgYmdDb2xvcnNfb3ZlcnJpZGVzOiBcIjAtPmdyZWVufDItPnJlZHwxLT55ZWxsb3dcIixcbiAgICBjbGlja2FibGVfY2VsbHNfbGluazogXCJcIixcbiAgICBjb2xfbmFtZTogXCJWYWx1ZVwiLFxuICAgIGRlY2ltYWxzOiAyLFxuICAgIGRlbGltaXRlcjogXCIuXCIsXG4gICAgZm9ybWF0OiBcIm5vbmVcIixcbiAgICBuYW1lOiBcIkRlZmF1bHQgUGF0dGVyblwiLFxuICAgIG51bGxfY29sb3I6IFwiZGFya3JlZFwiLFxuICAgIG51bGxfdGV4dGNvbG9yOiBcIndoaXRlXCIsXG4gICAgbnVsbF92YWx1ZTogXCJObyBkYXRhXCIsXG4gICAgcGF0dGVybjogXCIqXCIsXG4gICAgcm93X25hbWU6IFwiX3Nlcmllc19cIixcbiAgICB0ZXh0Q29sb3I6ICBcInJlZHxvcmFuZ2V8Z3JlZW5cIixcbiAgICB0ZXh0Q29sb3JzX292ZXJyaWRlcyA6IFwiMC0+cmVkfDItPmdyZWVufDEtPnllbGxvd1wiLFxuICAgIHRocmVzaG9sZHM6IFwiNzAsOTBcIixcbiAgICB0aW1lX2Jhc2VkX3RocmVzaG9sZHM6IFtdLFxuICAgIHRyYW5zZm9ybV92YWx1ZXM6IFwiX3ZhbHVlX3xfdmFsdWVffF92YWx1ZV9cIixcbiAgICB0cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlczogXCIwLT5kb3dufDEtPnVwXCIsXG4gICAgdmFsdWVOYW1lOiBcImF2Z1wiXG59KTtcbmNvbnN0IHNlcmllc1RvVGFibGUgPSBmdW5jdGlvbiAoaW5wdXRkYXRhOiBJQm9vbVNlcmllc1tdKTogYW55IHtcbiAgICBsZXQgcm93c19mb3VuZCA9IF8udW5pcSh1dGlscy5nZXRGaWVsZHMoaW5wdXRkYXRhLCBcInJvd19uYW1lXCIpKTtcbiAgICBsZXQgY29sc19mb3VuZCA9IF8udW5pcSh1dGlscy5nZXRGaWVsZHMoaW5wdXRkYXRhLCBcImNvbF9uYW1lXCIpKTtcbiAgICBsZXQgb3V0cHV0OiBhbnlbXSA9IFtdO1xuICAgIF8uZWFjaChyb3dzX2ZvdW5kLCByb3dfbmFtZSA9PiB7XG4gICAgICAgIGxldCBjb2xzOiBhbnkgPSBbXTtcbiAgICAgICAgXy5lYWNoKGNvbHNfZm91bmQsIGNvbF9uYW1lID0+IHtcbiAgICAgICAgICAgIGxldCBtYXRjaGVkX2l0ZW1zID0gXy5maWx0ZXIoaW5wdXRkYXRhLCBvID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gby5yb3dfbmFtZSA9PT0gcm93X25hbWUgJiYgby5jb2xfbmFtZSA9PT0gY29sX25hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghbWF0Y2hlZF9pdGVtcyB8fCBtYXRjaGVkX2l0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sX25hbWVcIjogY29sX25hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JfYmdcIjogXCJkYXJrcmVkXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JfdGV4dFwiOiBcIndoaXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZGlzcGxheV92YWx1ZVwiOiBcIk5vIG1hdGNoIGZvdW5kXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaGlkZGVuXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBcImxpbmtcIjogXCItXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicm93X2NvbF9rZXlcIjogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJyb3dfbmFtZVwiOiByb3dfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgXCJ0b29sdGlwXCI6IFwiLVwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoZWRfaXRlbXMgJiYgbWF0Y2hlZF9pdGVtcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICBjb2xzLnB1c2gobWF0Y2hlZF9pdGVtc1swXSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoZWRfaXRlbXMgJiYgbWF0Y2hlZF9pdGVtcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgY29scy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xfbmFtZVwiOiBjb2xfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvcl9iZ1wiOiBcImRhcmtyZWRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvcl90ZXh0XCI6IFwid2hpdGVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkaXNwbGF5X3ZhbHVlXCI6IFwiRHVwbGljYXRlIG1hdGNoZXNcIixcbiAgICAgICAgICAgICAgICAgICAgXCJoaWRkZW5cIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIFwibGlua1wiOiBcIi1cIixcbiAgICAgICAgICAgICAgICAgICAgXCJyb3dfY29sX2tleVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBcInJvd19uYW1lXCI6IHJvd19uYW1lLFxuICAgICAgICAgICAgICAgICAgICBcInRvb2x0aXBcIjogXCItXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIG91dHB1dC5wdXNoKGNvbHMpO1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICAgIGNvbHNfZm91bmQsXG4gICAgICAgIG91dHB1dCxcbiAgICAgICAgcm93c19mb3VuZCxcbiAgICB9O1xufTtcbmNvbnN0IGdldFJlbmRlcmluZ0RhdGEgPSBmdW5jdGlvbiAoZGF0YSwgb3B0aW9ucyk6IGFueSB7XG4gICAgbGV0IG91dHB1dDogYW55ID0ge1xuICAgICAgICBib2R5OiBcIlwiLFxuICAgICAgICBkZWJ1ZzogXCJcIixcbiAgICAgICAgZm9vdGVyOiBcIlwiLFxuICAgICAgICBoZWFkZXJzOiBcIlwiLFxuICAgIH07XG4gICAgbGV0IHsgZGVmYXVsdF90aXRsZV9mb3Jfcm93cywgaGlkZV9oZWFkZXJzLCBoaWRlX2ZpcnN0X2NvbHVtbiB9ID0gb3B0aW9ucztcbiAgICBpZiAoaGlkZV9oZWFkZXJzICE9PSB0cnVlKSB7XG4gICAgICAgIG91dHB1dC5oZWFkZXJzICs9IFwiPHRyPlwiO1xuICAgICAgICBpZiAoaGlkZV9maXJzdF9jb2x1bW4gIT09IHRydWUpIHtcbiAgICAgICAgICAgIG91dHB1dC5oZWFkZXJzICs9IGA8dGggc3R5bGU9XCJwYWRkaW5nOjRweDt0ZXh0LWFsaWduOmNlbnRlclwiPiR7ZGVmYXVsdF90aXRsZV9mb3Jfcm93c308L3RoPmA7XG4gICAgICAgIH1cbiAgICAgICAgXy5lYWNoKGRhdGEuY29sc19mb3VuZCwgYyA9PiB7XG4gICAgICAgICAgICBvdXRwdXQuaGVhZGVycyArPSBgPHRoIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjpjZW50ZXJcIj4ke2N9PC90aD5gO1xuICAgICAgICB9KTtcbiAgICAgICAgb3V0cHV0LmJvZHkgKz0gXCI8L3RyPlwiO1xuICAgIH1cbiAgICBfLmVhY2goZGF0YS5vdXRwdXQsIG8gPT4ge1xuICAgICAgICBpZiAoby5tYXAoaXRlbSA9PiBpdGVtLmhpZGRlbi50b1N0cmluZygpKS5pbmRleE9mKFwiZmFsc2VcIikgPiAtMSkge1xuICAgICAgICAgICAgb3V0cHV0LmJvZHkgKz0gXCI8dHI+XCI7XG4gICAgICAgICAgICBpZiAoaGlkZV9maXJzdF9jb2x1bW4gIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBvdXRwdXQuYm9keSArPSBgXG4gICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgJHtfLmZpcnN0KG8ubWFwKGl0ZW0gPT4gaXRlbS5yb3dfbmFtZSkpfVxuICAgICAgICAgICAgICAgICAgICA8L3RkPmA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfLmVhY2gobywgaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1fc3R5bGUgPSBgcGFkZGluZzo0cHg7YmFja2dyb3VuZC1jb2xvcjoke2l0ZW0uY29sb3JfYmd9O2NvbG9yOiR7aXRlbS5jb2xvcl90ZXh0fWA7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1fZGlzcGxheSA9IGl0ZW0ubGluayA9PT0gXCIjXCIgPyBpdGVtLmRpc3BsYXlfdmFsdWUgOiBgPGEgaHJlZj1cIiR7aXRlbS5saW5rfVwiIHRhcmdldD1cIl9ibGFua1wiIHN0eWxlPVwiY29sb3I6JHtpdGVtLmNvbG9yX3RleHR9XCI+JHtpdGVtLmRpc3BsYXlfdmFsdWV9PC9hPmA7XG4gICAgICAgICAgICAgICAgb3V0cHV0LmJvZHkgKz0gYFxuICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9XCIke2l0ZW1fc3R5bGV9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAke2l0ZW1fZGlzcGxheX1cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICBgO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBvdXRwdXQuYm9keSArPSBcIjwvdHI+XCI7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb3V0cHV0O1xufTtcblxuZXhwb3J0IHtcbiAgICBkZWZhdWx0UGF0dGVybixcbiAgICBnZXRSZW5kZXJpbmdEYXRhLFxuICAgIHNlcmllc1RvVGFibGVcbn07XG4iXX0=