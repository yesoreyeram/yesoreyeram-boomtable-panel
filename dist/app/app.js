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
                null_value: "No data",
                pattern: "*",
                row_name: "_series_",
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
                            var item_style = "padding:4px;background-color:" + item.color_bg;
                            var item_display = item.link === "#" ? item.display_value : "<a href=\"" + item.link + "\" target=\"_blank\">" + item.display_value + "</a>";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFJTSxjQUFjLEdBQUcsSUFBSSxrQkFBVyxDQUFDO2dCQUNuQyxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixrQkFBa0IsRUFBRSwyQkFBMkI7Z0JBQy9DLG9CQUFvQixFQUFFLEVBQUU7Z0JBQ3hCLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUsQ0FBQztnQkFDWCxTQUFTLEVBQUUsR0FBRztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsaUJBQWlCO2dCQUN2QixVQUFVLEVBQUUsU0FBUztnQkFDckIsVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLE9BQU8sRUFBRSxHQUFHO2dCQUNaLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixVQUFVLEVBQUUsT0FBTztnQkFDbkIscUJBQXFCLEVBQUUsRUFBRTtnQkFDekIsZ0JBQWdCLEVBQUUseUJBQXlCO2dCQUMzQywwQkFBMEIsRUFBRSxlQUFlO2dCQUMzQyxTQUFTLEVBQUUsS0FBSzthQUNuQixDQUFDLENBQUM7O1lBQ0csYUFBYSxHQUFHLFVBQVUsU0FBd0I7Z0JBQ3BELElBQUksVUFBVSxHQUFHLGdCQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hFLElBQUksVUFBVSxHQUFHLGdCQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hFLElBQUksTUFBTSxHQUFVLEVBQUUsQ0FBQztnQkFDdkIsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFVBQUEsUUFBUTtvQkFDdkIsSUFBSSxJQUFJLEdBQVEsRUFBRSxDQUFDO29CQUNuQixnQkFBQyxDQUFDLElB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Q3RCLElBQUksaUJBQWlCLEtBQUssSUFBSSxFQUFFOzRCQUM1QixNQUFNLENBQUMsSUFBSSxJQUFJLGdGQUVMLGdCQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsUUFBUSxFQUFiLENBQWEsQ0FBQyxDQUFDLGdDQUNyQyxDQUFDO3lCQUNkO3dCQUNELGdCQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxVQUFBLElBQUk7NEJBQ1YsSUFBSSxVQUFVLEdBQUcsa0NBQWdDLElBQUksQ0FBQyxRQUFVLENBQUM7NEJBQ2pFLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxlQUFZLElBQUksQ0FBQyxJQUFJLDZCQUFxQixJQUFJLENBQUMsYUFBYSxTQUFNLENBQUM7NEJBQy9ILE1BQU0sQ0FBQyxJQUFJLElBQUksdUNBQ0UsVUFBVSxxQ0FDakIsWUFBWSxrREFFckIsQ0FBQzt3QkFDTixDQUFDLENBQUMsQ0FBQzt3QkFDSCxNQUFNLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQztxQkFDMUI7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxNQUFNLENBQUM7WUFDbEIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCB7IEJvb21QYXR0ZXJuLCBJQm9vbVNlcmllcyB9IGZyb20gJy4vQm9vbSc7XG5cbmNvbnN0IGRlZmF1bHRQYXR0ZXJuID0gbmV3IEJvb21QYXR0ZXJuKHtcbiAgICBiZ0NvbG9yczogXCJncmVlbnxvcmFuZ2V8cmVkXCIsXG4gICAgYmdDb2xvcnNfb3ZlcnJpZGVzOiBcIjAtPmdyZWVufDItPnJlZHwxLT55ZWxsb3dcIixcbiAgICBjbGlja2FibGVfY2VsbHNfbGluazogXCJcIixcbiAgICBjb2xfbmFtZTogXCJWYWx1ZVwiLFxuICAgIGRlY2ltYWxzOiAyLFxuICAgIGRlbGltaXRlcjogXCIuXCIsXG4gICAgZm9ybWF0OiBcIm5vbmVcIixcbiAgICBuYW1lOiBcIkRlZmF1bHQgUGF0dGVyblwiLFxuICAgIG51bGxfY29sb3I6IFwiZGFya3JlZFwiLFxuICAgIG51bGxfdmFsdWU6IFwiTm8gZGF0YVwiLFxuICAgIHBhdHRlcm46IFwiKlwiLFxuICAgIHJvd19uYW1lOiBcIl9zZXJpZXNfXCIsXG4gICAgdGhyZXNob2xkczogXCI3MCw5MFwiLFxuICAgIHRpbWVfYmFzZWRfdGhyZXNob2xkczogW10sXG4gICAgdHJhbnNmb3JtX3ZhbHVlczogXCJfdmFsdWVffF92YWx1ZV98X3ZhbHVlX1wiLFxuICAgIHRyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzOiBcIjAtPmRvd258MS0+dXBcIixcbiAgICB2YWx1ZU5hbWU6IFwiYXZnXCJcbn0pO1xuY29uc3Qgc2VyaWVzVG9UYWJsZSA9IGZ1bmN0aW9uIChpbnB1dGRhdGE6IElCb29tU2VyaWVzW10pOiBhbnkge1xuICAgIGxldCByb3dzX2ZvdW5kID0gXy51bmlxKHV0aWxzLmdldEZpZWxkcyhpbnB1dGRhdGEsIFwicm93X25hbWVcIikpO1xuICAgIGxldCBjb2xzX2ZvdW5kID0gXy51bmlxKHV0aWxzLmdldEZpZWxkcyhpbnB1dGRhdGEsIFwiY29sX25hbWVcIikpO1xuICAgIGxldCBvdXRwdXQ6IGFueVtdID0gW107XG4gICAgXy5lYWNoKHJvd3NfZm91bmQsIHJvd19uYW1lID0+IHtcbiAgICAgICAgbGV0IGNvbHM6IGFueSA9IFtdO1xuICAgICAgICBfLmVhY2goY29sc19mb3VuZCwgY29sX25hbWUgPT4ge1xuICAgICAgICAgICAgbGV0IG1hdGNoZWRfaXRlbXMgPSBfLmZpbHRlcihpbnB1dGRhdGEsIG8gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBvLnJvd19uYW1lID09PSByb3dfbmFtZSAmJiBvLmNvbF9uYW1lID09PSBjb2xfbmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFtYXRjaGVkX2l0ZW1zIHx8IG1hdGNoZWRfaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY29scy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xfbmFtZVwiOiBjb2xfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvcl9iZ1wiOiBcImRhcmtyZWRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkaXNwbGF5X3ZhbHVlXCI6IFwiTm8gbWF0Y2ggZm91bmRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJoaWRkZW5cIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIFwibGlua1wiOiBcIi1cIixcbiAgICAgICAgICAgICAgICAgICAgXCJyb3dfY29sX2tleVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBcInJvd19uYW1lXCI6IHJvd19uYW1lLFxuICAgICAgICAgICAgICAgICAgICBcInRvb2x0aXBcIjogXCItXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hlZF9pdGVtcyAmJiBtYXRjaGVkX2l0ZW1zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGNvbHMucHVzaChtYXRjaGVkX2l0ZW1zWzBdKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hlZF9pdGVtcyAmJiBtYXRjaGVkX2l0ZW1zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBjb2xzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBcImNvbF9uYW1lXCI6IGNvbF9uYW1lLFxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yX2JnXCI6IFwiZGFya3JlZFwiLFxuICAgICAgICAgICAgICAgICAgICBcImRpc3BsYXlfdmFsdWVcIjogXCJEdXBsaWNhdGUgbWF0Y2hlc1wiLFxuICAgICAgICAgICAgICAgICAgICBcImhpZGRlblwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgXCJsaW5rXCI6IFwiLVwiLFxuICAgICAgICAgICAgICAgICAgICBcInJvd19jb2xfa2V5XCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicm93X25hbWVcIjogcm93X25hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwidG9vbHRpcFwiOiBcIi1cIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgb3V0cHV0LnB1c2goY29scyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29sc19mb3VuZCxcbiAgICAgICAgb3V0cHV0LFxuICAgICAgICByb3dzX2ZvdW5kLFxuICAgIH07XG59O1xuY29uc3QgZ2V0UmVuZGVyaW5nRGF0YSA9IGZ1bmN0aW9uIChkYXRhLCBvcHRpb25zKTogYW55IHtcbiAgICBsZXQgb3V0cHV0OiBhbnkgPSB7XG4gICAgICAgIGJvZHk6IFwiXCIsXG4gICAgICAgIGRlYnVnOiBcIlwiLFxuICAgICAgICBmb290ZXI6IFwiXCIsXG4gICAgICAgIGhlYWRlcnM6IFwiXCIsXG4gICAgfTtcbiAgICBsZXQgeyBkZWZhdWx0X3RpdGxlX2Zvcl9yb3dzLCBoaWRlX2hlYWRlcnMsIGhpZGVfZmlyc3RfY29sdW1uIH0gPSBvcHRpb25zO1xuICAgIGlmIChoaWRlX2hlYWRlcnMgIT09IHRydWUpIHtcbiAgICAgICAgb3V0cHV0LmhlYWRlcnMgKz0gXCI8dHI+XCI7XG4gICAgICAgIGlmIChoaWRlX2ZpcnN0X2NvbHVtbiAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgb3V0cHV0LmhlYWRlcnMgKz0gYDx0aCBzdHlsZT1cInBhZGRpbmc6NHB4O3RleHQtYWxpZ246Y2VudGVyXCI+JHtkZWZhdWx0X3RpdGxlX2Zvcl9yb3dzfTwvdGg+YDtcbiAgICAgICAgfVxuICAgICAgICBfLmVhY2goZGF0YS5jb2xzX2ZvdW5kLCBjID0+IHtcbiAgICAgICAgICAgIG91dHB1dC5oZWFkZXJzICs9IGA8dGggc3R5bGU9XCJwYWRkaW5nOjRweDt0ZXh0LWFsaWduOmNlbnRlclwiPiR7Y308L3RoPmA7XG4gICAgICAgIH0pO1xuICAgICAgICBvdXRwdXQuYm9keSArPSBcIjwvdHI+XCI7XG4gICAgfVxuICAgIF8uZWFjaChkYXRhLm91dHB1dCwgbyA9PiB7XG4gICAgICAgIGlmIChvLm1hcChpdGVtID0+IGl0ZW0uaGlkZGVuLnRvU3RyaW5nKCkpLmluZGV4T2YoXCJmYWxzZVwiKSA+IC0xKSB7XG4gICAgICAgICAgICBvdXRwdXQuYm9keSArPSBcIjx0cj5cIjtcbiAgICAgICAgICAgIGlmIChoaWRlX2ZpcnN0X2NvbHVtbiAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIG91dHB1dC5ib2R5ICs9IGBcbiAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAke18uZmlyc3Qoby5tYXAoaXRlbSA9PiBpdGVtLnJvd19uYW1lKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF8uZWFjaChvLCBpdGVtID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbV9zdHlsZSA9IGBwYWRkaW5nOjRweDtiYWNrZ3JvdW5kLWNvbG9yOiR7aXRlbS5jb2xvcl9iZ31gO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtX2Rpc3BsYXkgPSBpdGVtLmxpbmsgPT09IFwiI1wiID8gaXRlbS5kaXNwbGF5X3ZhbHVlIDogYDxhIGhyZWY9XCIke2l0ZW0ubGlua31cIiB0YXJnZXQ9XCJfYmxhbmtcIj4ke2l0ZW0uZGlzcGxheV92YWx1ZX08L2E+YDtcbiAgICAgICAgICAgICAgICBvdXRwdXQuYm9keSArPSBgXG4gICAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT1cIiR7aXRlbV9zdHlsZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICR7aXRlbV9kaXNwbGF5fVxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIGA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG91dHB1dC5ib2R5ICs9IFwiPC90cj5cIjtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnQge1xuICAgIGRlZmF1bHRQYXR0ZXJuLFxuICAgIGdldFJlbmRlcmluZ0RhdGEsXG4gICAgc2VyaWVzVG9UYWJsZVxufTtcbiJdfQ==