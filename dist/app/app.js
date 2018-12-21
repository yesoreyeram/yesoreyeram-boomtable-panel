System.register(["./utils", "lodash", "./Boom"], function (exports_1, context_1) {
    "use strict";
    var utils, lodash_1, Boom_1, defaultPattern, seriesToTable, getRenderingData, getDebugData;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFJTSxjQUFjLEdBQUcsSUFBSSxrQkFBVyxDQUFDO2dCQUNuQyxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixrQkFBa0IsRUFBRSwyQkFBMkI7Z0JBQy9DLG9CQUFvQixFQUFFLEVBQUU7Z0JBQ3hCLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUsQ0FBQztnQkFDWCxTQUFTLEVBQUUsR0FBRztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsaUJBQWlCO2dCQUN2QixVQUFVLEVBQUUsU0FBUztnQkFDckIsY0FBYyxFQUFFLE9BQU87Z0JBQ3ZCLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixPQUFPLEVBQUUsR0FBRztnQkFDWixRQUFRLEVBQUUsVUFBVTtnQkFDcEIsU0FBUyxFQUFFLGtCQUFrQjtnQkFDN0Isb0JBQW9CLEVBQUUsMkJBQTJCO2dCQUNqRCxVQUFVLEVBQUUsT0FBTztnQkFDbkIscUJBQXFCLEVBQUUsRUFBRTtnQkFDekIsZ0JBQWdCLEVBQUUseUJBQXlCO2dCQUMzQywwQkFBMEIsRUFBRSxlQUFlO2dCQUMzQyxTQUFTLEVBQUUsS0FBSzthQUNuQixDQUFDLENBQUM7O1lBQ0csYUFBYSxHQUFHLFVBQVUsU0FBd0I7Z0JBQ3BELElBQUksVUFBVSxHQUFHLGdCQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hFLElBQUksVUFBVSxHQUFHLGdCQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hFLElBQUksTUFBTSxHQUFVLEVBQUUsQ0FBQztnQkFDdkIsZ0JBQUMsQ0FBQyxJQUFJLENBQUMs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QyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLFNBQVMsbUdBQ2pDLE1BQU0sQ0FBQyxDQUFDLENBQUMsZUFBZSxJQUFJLE1BQU0sQ0FBQyxpQkFBWSxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsa0JBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLFdBQUssQ0FBQyxDQUFDLGFBQWEsa0ZBQzNJLENBQUMsQ0FBQyxRQUFRLGtGQUNWLENBQUMsQ0FBQyxRQUFRLGtGQUNWLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrRkFDdEIsQ0FBQyxDQUFDLFFBQVEsa0ZBQ1YsQ0FBQyxDQUFDLFVBQVUsbUNBRXRFLENBQUM7Z0JBQ04sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNaLE9BQU8sU0FBUyxDQUFDO1lBQ3JCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XG5pbXBvcnQgeyBCb29tUGF0dGVybiwgSUJvb21TZXJpZXMgfSBmcm9tICcuL0Jvb20nO1xuXG5jb25zdCBkZWZhdWx0UGF0dGVybiA9IG5ldyBCb29tUGF0dGVybih7XG4gICAgYmdDb2xvcnM6IFwiZ3JlZW58b3JhbmdlfHJlZFwiLFxuICAgIGJnQ29sb3JzX292ZXJyaWRlczogXCIwLT5ncmVlbnwyLT5yZWR8MS0+eWVsbG93XCIsXG4gICAgY2xpY2thYmxlX2NlbGxzX2xpbms6IFwiXCIsXG4gICAgY29sX25hbWU6IFwiVmFsdWVcIixcbiAgICBkZWNpbWFsczogMixcbiAgICBkZWxpbWl0ZXI6IFwiLlwiLFxuICAgIGZvcm1hdDogXCJub25lXCIsXG4gICAgbmFtZTogXCJEZWZhdWx0IFBhdHRlcm5cIixcbiAgICBudWxsX2NvbG9yOiBcImRhcmtyZWRcIixcbiAgICBudWxsX3RleHRjb2xvcjogXCJ3aGl0ZVwiLFxuICAgIG51bGxfdmFsdWU6IFwiTm8gZGF0YVwiLFxuICAgIHBhdHRlcm46IFwiKlwiLFxuICAgIHJvd19uYW1lOiBcIl9zZXJpZXNfXCIsXG4gICAgdGV4dENvbG9yOiBcInJlZHxvcmFuZ2V8Z3JlZW5cIixcbiAgICB0ZXh0Q29sb3JzX292ZXJyaWRlczogXCIwLT5yZWR8Mi0+Z3JlZW58MS0+eWVsbG93XCIsXG4gICAgdGhyZXNob2xkczogXCI3MCw5MFwiLFxuICAgIHRpbWVfYmFzZWRfdGhyZXNob2xkczogW10sXG4gICAgdHJhbnNmb3JtX3ZhbHVlczogXCJfdmFsdWVffF92YWx1ZV98X3ZhbHVlX1wiLFxuICAgIHRyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzOiBcIjAtPmRvd258MS0+dXBcIixcbiAgICB2YWx1ZU5hbWU6IFwiYXZnXCJcbn0pO1xuY29uc3Qgc2VyaWVzVG9UYWJsZSA9IGZ1bmN0aW9uIChpbnB1dGRhdGE6IElCb29tU2VyaWVzW10pOiBhbnkge1xuICAgIGxldCByb3dzX2ZvdW5kID0gXy51bmlxKHV0aWxzLmdldEZpZWxkcyhpbnB1dGRhdGEsIFwicm93X25hbWVcIikpO1xuICAgIGxldCBjb2xzX2ZvdW5kID0gXy51bmlxKHV0aWxzLmdldEZpZWxkcyhpbnB1dGRhdGEsIFwiY29sX25hbWVcIikpO1xuICAgIGxldCBvdXRwdXQ6IGFueVtdID0gW107XG4gICAgXy5lYWNoKHJvd3NfZm91bmQsIHJvd19uYW1lID0+IHtcbiAgICAgICAgbGV0IGNvbHM6IGFueSA9IFtdO1xuICAgICAgICBfLmVhY2goY29sc19mb3VuZCwgY29sX25hbWUgPT4ge1xuICAgICAgICAgICAgbGV0IG1hdGNoZWRfaXRlbXMgPSBfLmZpbHRlcihpbnB1dGRhdGEsIG8gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBvLnJvd19uYW1lID09PSByb3dfbmFtZSAmJiBvLmNvbF9uYW1lID09PSBjb2xfbmFtZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFtYXRjaGVkX2l0ZW1zIHx8IG1hdGNoZWRfaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY29scy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xfbmFtZVwiOiBjb2xfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvcl9iZ1wiOiBcImRhcmtyZWRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvcl90ZXh0XCI6IFwid2hpdGVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJkaXNwbGF5X3ZhbHVlXCI6IFwiTm8gbWF0Y2ggZm91bmRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJoaWRkZW5cIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIFwibGlua1wiOiBcIi1cIixcbiAgICAgICAgICAgICAgICAgICAgXCJyb3dfY29sX2tleVwiOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBcInJvd19uYW1lXCI6IHJvd19uYW1lLFxuICAgICAgICAgICAgICAgICAgICBcInRvb2x0aXBcIjogXCItXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hlZF9pdGVtcyAmJiBtYXRjaGVkX2l0ZW1zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGNvbHMucHVzaChtYXRjaGVkX2l0ZW1zWzBdKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hlZF9pdGVtcyAmJiBtYXRjaGVkX2l0ZW1zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBjb2xzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBcImNvbF9uYW1lXCI6IGNvbF9uYW1lLFxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yX2JnXCI6IFwiZGFya3JlZFwiLFxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yX3RleHRcIjogXCJ3aGl0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBcImRpc3BsYXlfdmFsdWVcIjogXCJEdXBsaWNhdGUgbWF0Y2hlc1wiLFxuICAgICAgICAgICAgICAgICAgICBcImhpZGRlblwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgXCJsaW5rXCI6IFwiLVwiLFxuICAgICAgICAgICAgICAgICAgICBcInJvd19jb2xfa2V5XCI6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicm93X25hbWVcIjogcm93X25hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwidG9vbHRpcFwiOiBcIi1cIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgb3V0cHV0LnB1c2goY29scyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY29sc19mb3VuZCxcbiAgICAgICAgb3V0cHV0LFxuICAgICAgICByb3dzX2ZvdW5kLFxuICAgIH07XG59O1xuY29uc3QgZ2V0UmVuZGVyaW5nRGF0YSA9IGZ1bmN0aW9uIChkYXRhLCBvcHRpb25zKTogYW55IHtcbiAgICBsZXQgb3V0cHV0OiBhbnkgPSB7XG4gICAgICAgIGJvZHk6IFwiXCIsXG4gICAgICAgIGZvb3RlcjogXCJcIixcbiAgICAgICAgaGVhZGVyczogXCJcIixcbiAgICB9O1xuICAgIGxldCB7IGRlZmF1bHRfdGl0bGVfZm9yX3Jvd3MsIGhpZGVfaGVhZGVycywgaGlkZV9maXJzdF9jb2x1bW4gfSA9IG9wdGlvbnM7XG4gICAgaWYgKGhpZGVfaGVhZGVycyAhPT0gdHJ1ZSkge1xuICAgICAgICBvdXRwdXQuaGVhZGVycyArPSBcIjx0cj5cIjtcbiAgICAgICAgaWYgKGhpZGVfZmlyc3RfY29sdW1uICE9PSB0cnVlKSB7XG4gICAgICAgICAgICBvdXRwdXQuaGVhZGVycyArPSBgPHRoIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjpjZW50ZXJcIj4ke2RlZmF1bHRfdGl0bGVfZm9yX3Jvd3N9PC90aD5gO1xuICAgICAgICB9XG4gICAgICAgIF8uZWFjaChkYXRhLmNvbHNfZm91bmQsIGMgPT4ge1xuICAgICAgICAgICAgb3V0cHV0LmhlYWRlcnMgKz0gYDx0aCBzdHlsZT1cInBhZGRpbmc6NHB4O3RleHQtYWxpZ246Y2VudGVyXCI+JHtjfTwvdGg+YDtcbiAgICAgICAgfSk7XG4gICAgICAgIG91dHB1dC5ib2R5ICs9IFwiPC90cj5cIjtcbiAgICB9XG4gICAgXy5lYWNoKGRhdGEub3V0cHV0LCBvID0+IHtcbiAgICAgICAgaWYgKG8ubWFwKGl0ZW0gPT4gaXRlbS5oaWRkZW4udG9TdHJpbmcoKSkuaW5kZXhPZihcImZhbHNlXCIpID4gLTEpIHtcbiAgICAgICAgICAgIG91dHB1dC5ib2R5ICs9IFwiPHRyPlwiO1xuICAgICAgICAgICAgaWYgKGhpZGVfZmlyc3RfY29sdW1uICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0LmJvZHkgKz0gYFxuICAgICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICR7Xy5maXJzdChvLm1hcChpdGVtID0+IGl0ZW0ucm93X25hbWUpKX1cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5gO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXy5lYWNoKG8sIGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtX3N0eWxlID0gYHBhZGRpbmc6NHB4O2JhY2tncm91bmQtY29sb3I6JHtpdGVtLmNvbG9yX2JnfTtjb2xvcjoke2l0ZW0uY29sb3JfdGV4dH1gO1xuICAgICAgICAgICAgICAgIGxldCBpdGVtX2Rpc3BsYXkgPSBpdGVtLmxpbmsgPT09IFwiI1wiID8gaXRlbS5kaXNwbGF5X3ZhbHVlIDogYDxhIGhyZWY9XCIke2l0ZW0ubGlua31cIiB0YXJnZXQ9XCJfYmxhbmtcIiBzdHlsZT1cImNvbG9yOiR7aXRlbS5jb2xvcl90ZXh0fVwiPiR7aXRlbS5kaXNwbGF5X3ZhbHVlfTwvYT5gO1xuICAgICAgICAgICAgICAgIG91dHB1dC5ib2R5ICs9IGBcbiAgICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPVwiJHtpdGVtX3N0eWxlfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgJHtpdGVtX2Rpc3BsYXl9XG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgYDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgb3V0cHV0LmJvZHkgKz0gXCI8L3RyPlwiO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG91dHB1dDtcbn07XG5jb25zdCBnZXREZWJ1Z0RhdGEgPSBmdW5jdGlvbiAoZGF0YSk6IGFueSB7XG4gICAgbGV0IGRlYnVnZGF0YSA9IGBgO1xuICAgIGRlYnVnZGF0YSA9IF8ubWFwKGRhdGEsIGQgPT4ge1xuICAgICAgICByZXR1cm4gYFxuICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDt0ZXh0LWFsaWduOmNlbnRlcjt3aWR0aDozMCU7XCI+JHtkLnNlcmllc05hbWV9PC90ZD5cbiAgICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O3RleHQtYWxpZ246Y2VudGVyO3dpZHRoOjEwJTtcIj4ke2QucGF0dGVybi5uYW1lIHx8IGQucGF0dGVybi5wYXR0ZXJuIHx8IFwiRGVmYXVsdFwiIH08L3RkPlxuICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjpjZW50ZXI7d2lkdGg6MTAlO1wiIHRpdGxlPVwiVmFsdWUgOiAke1N0cmluZyhkLnZhbHVlX2Zvcm1hdHRlZCB8fCBcIm51bGxcIil9IC8gUmF3IDogJHtTdHJpbmcoZC52YWx1ZSB8fCBcIm51bGxcIil9IC8gU3RhdCA6ICR7ZC5wYXR0ZXJuLnZhbHVlTmFtZX1cIj4ke2QuZGlzcGxheV92YWx1ZX08L3RkPlxuICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjpjZW50ZXI7d2lkdGg6MTAlO1wiPiR7ZC5yb3dfbmFtZX08L3RkPlxuICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjpjZW50ZXI7d2lkdGg6MTAlO1wiPiR7ZC5jb2xfbmFtZX08L3RkPlxuICAgICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjpjZW50ZXI7d2lkdGg6MTAlO1wiPiR7ZC50aHJlc2hvbGRzLmpvaW4oXCIsXCIpfTwvdGQ+XG4gICAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDt0ZXh0LWFsaWduOmNlbnRlcjt3aWR0aDoxMCU7XCI+JHtkLmNvbG9yX2JnfTwvdGQ+XG4gICAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDt0ZXh0LWFsaWduOmNlbnRlcjt3aWR0aDoxMCU7XCI+JHtkLmNvbG9yX3RleHR9PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAgYDtcbiAgICB9KS5qb2luKGBgKTtcbiAgICByZXR1cm4gZGVidWdkYXRhO1xufTtcblxuZXhwb3J0IHtcbiAgICBkZWZhdWx0UGF0dGVybixcbiAgICBnZXRSZW5kZXJpbmdEYXRhLFxuICAgIGdldERlYnVnRGF0YSxcbiAgICBzZXJpZXNUb1RhYmxlXG59O1xuIl19