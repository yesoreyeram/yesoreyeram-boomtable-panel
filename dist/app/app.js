System.register(["lodash", "./boom/index"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, index_1, defaultPattern, seriesToTable;
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
                var rows_without_token = lodash_1.default.uniq(lodash_1.default.map(inputdata, function (d) { return d.row_name_raw; }));
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
                                "tooltip": "-",
                                "value": NaN
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
                                "tooltip": "-",
                                "value": NaN
                            });
                        }
                    });
                    output.push(cols);
                });
                return {
                    cols_found: cols_found,
                    output: output,
                    rows_found: rows_found,
                    rows_without_token: rows_without_token
                };
            };
            exports_1("seriesToTable", seriesToTable);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7WUFJTSxjQUFjLEdBQUcsSUFBSSxtQkFBVyxDQUFDO2dCQUNuQyxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixrQkFBa0IsRUFBRSwyQkFBMkI7Z0JBQy9DLG9CQUFvQixFQUFFLEVBQUU7Z0JBQ3hCLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUsQ0FBQztnQkFDWCxTQUFTLEVBQUUsR0FBRztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsaUJBQWlCO2dCQUN2QixVQUFVLEVBQUUsU0FBUztnQkFDckIsY0FBYyxFQUFFLE9BQU87Z0JBQ3ZCLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixPQUFPLEVBQUUsR0FBRztnQkFDWixRQUFRLEVBQUUsVUFBVTtnQkFDcEIsU0FBUyxFQUFFLGtCQUFrQjtnQkFDN0Isb0JBQW9CLEVBQUUsMkJBQTJCO2dCQUNqRCxVQUFVLEVBQUUsT0FBTztnQkFDbkIscUJBQXFCLEVBQUUsRUFBRTtnQkFDekIsZ0JBQWdCLEVBQUUseUJBQXlCO2dCQUMzQywwQkFBMEIsRUFBRSxlQUFlO2dCQUMzQyxTQUFTLEVBQUUsS0FBSzthQUNuQixDQUFDLENBQUM7O1lBQ0csYUFBYSxHQUFHLFVBQVUsU0FBd0IsRUFBRSxPQUF3QztnQkFDOUYsSUFBSSxVQUFVLEdBQUcsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFFBQVEsRUFBVixDQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLGtCQUFrQixHQUFHLGdCQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxZQUFZLEVBQWQsQ0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDdkUsSUFBSSxVQUFVLEdBQUcsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFFBQVEsRUFBVixDQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLE1BQU0sR0FBeUIsRUFBRSxDQUFDO2dCQUN0QyxnQkFBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsVUFBQSxRQUFRO29CQUN2QixJQUFJLElBQUksR0FBdUIsRUFBRSxDQUFDO29CQUNsQyxnQkFBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsVUFBQSxRQUFRO3dCQUN2QixJQUFJLGFBQWEsR0FBRyxnQkFBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsVUFBQSxDQUFDOzRCQUNyQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEtBQUssUUFBUSxJQUFJLENBQUMsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDO3dCQUM5RCxDQUFDLENBQUMsQ0FBQzt3QkFDSCxJQUFJLENBQUMsYUFBYSxJQUFJLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOzRCQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDO2dDQUNOLFVBQVUsRUFBRSxRQUFRO2dDQUNwQixVQUFVLEVBQUUsT0FBTyxDQUFDLDJCQUEyQjtnQ0FDL0MsWUFBWSxFQUFFLE9BQU8sQ0FBQyw2QkFBNkI7Z0NBQ25ELGVBQWUsRUFBRSxxQkFBYSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQztnQ0FDL0QsUUFBUSxFQUFFLEtBQUs7Z0NBQ2YsTUFBTSxFQUFFLEdBQUc7Z0NBQ1gsVUFBVSxFQUFFLFFBQVE7Z0NBQ3BCLFNBQVMsRUFBRSxHQUFHO2dDQUNkLE9BQU8sRUFBRSxHQUFHOzZCQUNmLENBQUMsQ0FBQzt5QkFDTjs2QkFBTSxJQUFJLGFBQWEsSUFBSSxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTs0QkFDcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDL0I7NkJBQU0sSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7NEJBQ2xELElBQUksQ0FBQyxJQUFJLENBQUM7Z0NBQ04sVUFBVSxFQUFFLFFBQVE7Z0NBQ3BCLFVBQVUsRUFBRSxTQUFTO2dDQUNyQixZQUFZLEVBQUUsT0FBTztnQ0FDckIsZUFBZSxFQUFFLG1CQUFtQjtnQ0FDcEMsUUFBUSxFQUFFLEtBQUs7Z0NBQ2YsTUFBTSxFQUFFLEdBQUc7Z0NBQ1gsVUFBVSxFQUFFLFFBQVE7Z0NBQ3BCLFNBQVMsRUFBRSxHQUFHO2dDQUNkLE9BQU8sRUFBRSxHQUFHOzZCQUNmLENBQUMsQ0FBQzt5QkFDTjtvQkFDTCxDQUFDLENBQUMsQ0FBQztvQkFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUMsQ0FBQztnQkFDSCxPQUFPO29CQUNILFVBQVUsWUFBQTtvQkFDVixNQUFNLFFBQUE7b0JBQ04sVUFBVSxZQUFBO29CQUNWLGtCQUFrQixvQkFBQTtpQkFDckIsQ0FBQztZQUNOLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCB7IElCb29tU2VyaWVzLCBJQm9vbUNlbGxEZXRhaWxzLCBJQm9vbVRhYmxlLCBJQm9vbVRhYmxlVHJhbnNmb3JtYXRpb25PcHRpb25zIH0gZnJvbSBcIi4vYm9vbS9pbmRleFwiO1xuaW1wb3J0IHsgQm9vbVBhdHRlcm4sIHJlcGxhY2VUb2tlbnMgfSBmcm9tICcuL2Jvb20vaW5kZXgnO1xuXG5jb25zdCBkZWZhdWx0UGF0dGVybiA9IG5ldyBCb29tUGF0dGVybih7XG4gICAgYmdDb2xvcnM6IFwiZ3JlZW58b3JhbmdlfHJlZFwiLFxuICAgIGJnQ29sb3JzX292ZXJyaWRlczogXCIwLT5ncmVlbnwyLT5yZWR8MS0+eWVsbG93XCIsXG4gICAgY2xpY2thYmxlX2NlbGxzX2xpbms6IFwiXCIsXG4gICAgY29sX25hbWU6IFwiVmFsdWVcIixcbiAgICBkZWNpbWFsczogMixcbiAgICBkZWxpbWl0ZXI6IFwiLlwiLFxuICAgIGZvcm1hdDogXCJub25lXCIsXG4gICAgbmFtZTogXCJEZWZhdWx0IFBhdHRlcm5cIixcbiAgICBudWxsX2NvbG9yOiBcImRhcmtyZWRcIixcbiAgICBudWxsX3RleHRjb2xvcjogXCJ3aGl0ZVwiLFxuICAgIG51bGxfdmFsdWU6IFwiTm8gZGF0YVwiLFxuICAgIHBhdHRlcm46IFwiKlwiLFxuICAgIHJvd19uYW1lOiBcIl9zZXJpZXNfXCIsXG4gICAgdGV4dENvbG9yOiBcInJlZHxvcmFuZ2V8Z3JlZW5cIixcbiAgICB0ZXh0Q29sb3JzX292ZXJyaWRlczogXCIwLT5yZWR8Mi0+Z3JlZW58MS0+eWVsbG93XCIsXG4gICAgdGhyZXNob2xkczogXCI3MCw5MFwiLFxuICAgIHRpbWVfYmFzZWRfdGhyZXNob2xkczogW10sXG4gICAgdHJhbnNmb3JtX3ZhbHVlczogXCJfdmFsdWVffF92YWx1ZV98X3ZhbHVlX1wiLFxuICAgIHRyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzOiBcIjAtPmRvd258MS0+dXBcIixcbiAgICB2YWx1ZU5hbWU6IFwiYXZnXCJcbn0pO1xuY29uc3Qgc2VyaWVzVG9UYWJsZSA9IGZ1bmN0aW9uIChpbnB1dGRhdGE6IElCb29tU2VyaWVzW10sIG9wdGlvbnM6IElCb29tVGFibGVUcmFuc2Zvcm1hdGlvbk9wdGlvbnMpOiBJQm9vbVRhYmxlIHtcbiAgICBsZXQgcm93c19mb3VuZCA9IF8udW5pcShfLm1hcChpbnB1dGRhdGEsIGQgPT4gZC5yb3dfbmFtZSkpO1xuICAgIGxldCByb3dzX3dpdGhvdXRfdG9rZW4gPSBfLnVuaXEoXy5tYXAoaW5wdXRkYXRhLCBkID0+IGQucm93X25hbWVfcmF3KSk7XG4gICAgbGV0IGNvbHNfZm91bmQgPSBfLnVuaXEoXy5tYXAoaW5wdXRkYXRhLCBkID0+IGQuY29sX25hbWUpKTtcbiAgICBsZXQgb3V0cHV0OiBJQm9vbUNlbGxEZXRhaWxzW11bXSA9IFtdO1xuICAgIF8uZWFjaChyb3dzX2ZvdW5kLCByb3dfbmFtZSA9PiB7XG4gICAgICAgIGxldCBjb2xzOiBJQm9vbUNlbGxEZXRhaWxzW10gPSBbXTtcbiAgICAgICAgXy5lYWNoKGNvbHNfZm91bmQsIGNvbF9uYW1lID0+IHtcbiAgICAgICAgICAgIGxldCBtYXRjaGVkX2l0ZW1zID0gXy5maWx0ZXIoaW5wdXRkYXRhLCBvID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gby5yb3dfbmFtZSA9PT0gcm93X25hbWUgJiYgby5jb2xfbmFtZSA9PT0gY29sX25hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghbWF0Y2hlZF9pdGVtcyB8fCBtYXRjaGVkX2l0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sX25hbWVcIjogY29sX25hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JfYmdcIjogb3B0aW9ucy5ub25fbWF0Y2hpbmdfY2VsbHNfY29sb3JfYmcsXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JfdGV4dFwiOiBvcHRpb25zLm5vbl9tYXRjaGluZ19jZWxsc19jb2xvcl90ZXh0LFxuICAgICAgICAgICAgICAgICAgICBcImRpc3BsYXlfdmFsdWVcIjogcmVwbGFjZVRva2VucyhvcHRpb25zLm5vbl9tYXRjaGluZ19jZWxsc190ZXh0KSxcbiAgICAgICAgICAgICAgICAgICAgXCJoaWRkZW5cIjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIFwibGlua1wiOiBcIi1cIixcbiAgICAgICAgICAgICAgICAgICAgXCJyb3dfbmFtZVwiOiByb3dfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgXCJ0b29sdGlwXCI6IFwiLVwiLFxuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IE5hTlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaGVkX2l0ZW1zICYmIG1hdGNoZWRfaXRlbXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgY29scy5wdXNoKG1hdGNoZWRfaXRlbXNbMF0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaGVkX2l0ZW1zICYmIG1hdGNoZWRfaXRlbXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIGNvbHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIFwiY29sX25hbWVcIjogY29sX25hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JfYmdcIjogXCJkYXJrcmVkXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JfdGV4dFwiOiBcIndoaXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZGlzcGxheV92YWx1ZVwiOiBcIkR1cGxpY2F0ZSBtYXRjaGVzXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaGlkZGVuXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBcImxpbmtcIjogXCItXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicm93X25hbWVcIjogcm93X25hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwidG9vbHRpcFwiOiBcIi1cIixcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBOYU5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIG91dHB1dC5wdXNoKGNvbHMpO1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICAgIGNvbHNfZm91bmQsXG4gICAgICAgIG91dHB1dCxcbiAgICAgICAgcm93c19mb3VuZCxcbiAgICAgICAgcm93c193aXRob3V0X3Rva2VuXG4gICAgfTtcbn07XG5cbmV4cG9ydCB7XG4gICAgZGVmYXVsdFBhdHRlcm4sXG4gICAgc2VyaWVzVG9UYWJsZVxufTtcbiJdfQ==