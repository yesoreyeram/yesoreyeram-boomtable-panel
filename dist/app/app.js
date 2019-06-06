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
                };
            };
            exports_1("seriesToTable", seriesToTable);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7WUFJTSxjQUFjLEdBQUcsSUFBSSxtQkFBVyxDQUFDO2dCQUNuQyxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixrQkFBa0IsRUFBRSwyQkFBMkI7Z0JBQy9DLG9CQUFvQixFQUFFLEVBQUU7Z0JBQ3hCLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUsQ0FBQztnQkFDWCxTQUFTLEVBQUUsR0FBRztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsaUJBQWlCO2dCQUN2QixVQUFVLEVBQUUsU0FBUztnQkFDckIsY0FBYyxFQUFFLE9BQU87Z0JBQ3ZCLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixPQUFPLEVBQUUsR0FBRztnQkFDWixRQUFRLEVBQUUsVUFBVTtnQkFDcEIsU0FBUyxFQUFFLGtCQUFrQjtnQkFDN0Isb0JBQW9CLEVBQUUsMkJBQTJCO2dCQUNqRCxVQUFVLEVBQUUsT0FBTztnQkFDbkIscUJBQXFCLEVBQUUsRUFBRTtnQkFDekIsZ0JBQWdCLEVBQUUseUJBQXlCO2dCQUMzQywwQkFBMEIsRUFBRSxlQUFlO2dCQUMzQyxTQUFTLEVBQUUsS0FBSzthQUNuQixDQUFDLENBQUM7O1lBQ0csYUFBYSxHQUFHLFVBQVUsU0FBd0IsRUFBRSxPQUF3QztnQkFDOUYsSUFBSSxVQUFVLEdBQUcsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFFBQVEsRUFBVixDQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLFVBQVUsR0FBRyxnQkFBQyxDQUFDLElBQUksQ0FBQyxnQkFBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsUUFBUSxFQUFWLENBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNELElBQUksTUFBTSxHQUF5QixFQUFFLENBQUM7Z0JBQ3RDLGdCQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFBLFFBQVE7b0JBQ3ZCLElBQUksSUFBSSxHQUF1QixFQUFFLENBQUM7b0JBQ2xDLGdCQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFBLFFBQVE7d0JBQ3ZCLElBQUksYUFBYSxHQUFHLGdCQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxVQUFBLENBQUM7NEJBQ3JDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsS0FBSyxRQUFRLElBQUksQ0FBQyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUM7d0JBQzlELENBQUMsQ0FBQyxDQUFDO3dCQUNILElBQUksQ0FBQyxhQUFhLElBQUksYUFBYSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7NEJBQzlDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0NBQ04sVUFBVSxFQUFFLFFBQVE7Z0NBQ3BCLFVBQVUsRUFBRSxPQUFPLENBQUMsMkJBQTJCO2dDQUMvQyxZQUFZLEVBQUUsT0FBTyxDQUFDLDZCQUE2QjtnQ0FDbkQsZUFBZSxFQUFFLHFCQUFhLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDO2dDQUMvRCxRQUFRLEVBQUUsS0FBSztnQ0FDZixNQUFNLEVBQUUsR0FBRztnQ0FDWCxVQUFVLEVBQUUsUUFBUTtnQ0FDcEIsU0FBUyxFQUFFLEdBQUc7Z0NBQ2QsT0FBTyxFQUFFLEdBQUc7NkJBQ2YsQ0FBQyxDQUFDO3lCQUNOOzZCQUFNLElBQUksYUFBYSxJQUFJLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOzRCQUNwRCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUMvQjs2QkFBTSxJQUFJLGFBQWEsSUFBSSxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs0QkFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQztnQ0FDTixVQUFVLEVBQUUsUUFBUTtnQ0FDcEIsVUFBVSxFQUFFLFNBQVM7Z0NBQ3JCLFlBQVksRUFBRSxPQUFPO2dDQUNyQixlQUFlLEVBQUUsbUJBQW1CO2dDQUNwQyxRQUFRLEVBQUUsS0FBSztnQ0FDZixNQUFNLEVBQUUsR0FBRztnQ0FDWCxVQUFVLEVBQUUsUUFBUTtnQ0FDcEIsU0FBUyxFQUFFLEdBQUc7Z0NBQ2QsT0FBTyxFQUFFLEdBQUc7NkJBQ2YsQ0FBQyxDQUFDO3lCQUNOO29CQUNMLENBQUMsQ0FBQyxDQUFDO29CQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU87b0JBQ0gsVUFBVSxZQUFBO29CQUNWLE1BQU0sUUFBQTtvQkFDTixVQUFVLFlBQUE7aUJBQ2IsQ0FBQztZQUNOLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgSUJvb21TZXJpZXMsIElCb29tQ2VsbERldGFpbHMsIElCb29tVGFibGUsIElCb29tVGFibGVUcmFuc2Zvcm1hdGlvbk9wdGlvbnMgfSBmcm9tIFwiLi9ib29tL2luZGV4XCI7XHJcbmltcG9ydCB7IEJvb21QYXR0ZXJuLCByZXBsYWNlVG9rZW5zIH0gZnJvbSAnLi9ib29tL2luZGV4JztcclxuXHJcbmNvbnN0IGRlZmF1bHRQYXR0ZXJuID0gbmV3IEJvb21QYXR0ZXJuKHtcclxuICAgIGJnQ29sb3JzOiBcImdyZWVufG9yYW5nZXxyZWRcIixcclxuICAgIGJnQ29sb3JzX292ZXJyaWRlczogXCIwLT5ncmVlbnwyLT5yZWR8MS0+eWVsbG93XCIsXHJcbiAgICBjbGlja2FibGVfY2VsbHNfbGluazogXCJcIixcclxuICAgIGNvbF9uYW1lOiBcIlZhbHVlXCIsXHJcbiAgICBkZWNpbWFsczogMixcclxuICAgIGRlbGltaXRlcjogXCIuXCIsXHJcbiAgICBmb3JtYXQ6IFwibm9uZVwiLFxyXG4gICAgbmFtZTogXCJEZWZhdWx0IFBhdHRlcm5cIixcclxuICAgIG51bGxfY29sb3I6IFwiZGFya3JlZFwiLFxyXG4gICAgbnVsbF90ZXh0Y29sb3I6IFwid2hpdGVcIixcclxuICAgIG51bGxfdmFsdWU6IFwiTm8gZGF0YVwiLFxyXG4gICAgcGF0dGVybjogXCIqXCIsXHJcbiAgICByb3dfbmFtZTogXCJfc2VyaWVzX1wiLFxyXG4gICAgdGV4dENvbG9yOiBcInJlZHxvcmFuZ2V8Z3JlZW5cIixcclxuICAgIHRleHRDb2xvcnNfb3ZlcnJpZGVzOiBcIjAtPnJlZHwyLT5ncmVlbnwxLT55ZWxsb3dcIixcclxuICAgIHRocmVzaG9sZHM6IFwiNzAsOTBcIixcclxuICAgIHRpbWVfYmFzZWRfdGhyZXNob2xkczogW10sXHJcbiAgICB0cmFuc2Zvcm1fdmFsdWVzOiBcIl92YWx1ZV98X3ZhbHVlX3xfdmFsdWVfXCIsXHJcbiAgICB0cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlczogXCIwLT5kb3dufDEtPnVwXCIsXHJcbiAgICB2YWx1ZU5hbWU6IFwiYXZnXCJcclxufSk7XHJcbmNvbnN0IHNlcmllc1RvVGFibGUgPSBmdW5jdGlvbiAoaW5wdXRkYXRhOiBJQm9vbVNlcmllc1tdLCBvcHRpb25zOiBJQm9vbVRhYmxlVHJhbnNmb3JtYXRpb25PcHRpb25zKTogSUJvb21UYWJsZSB7XHJcbiAgICBsZXQgcm93c19mb3VuZCA9IF8udW5pcShfLm1hcChpbnB1dGRhdGEsIGQgPT4gZC5yb3dfbmFtZSkpO1xyXG4gICAgbGV0IGNvbHNfZm91bmQgPSBfLnVuaXEoXy5tYXAoaW5wdXRkYXRhLCBkID0+IGQuY29sX25hbWUpKTtcclxuICAgIGxldCBvdXRwdXQ6IElCb29tQ2VsbERldGFpbHNbXVtdID0gW107XHJcbiAgICBfLmVhY2gocm93c19mb3VuZCwgcm93X25hbWUgPT4ge1xyXG4gICAgICAgIGxldCBjb2xzOiBJQm9vbUNlbGxEZXRhaWxzW10gPSBbXTtcclxuICAgICAgICBfLmVhY2goY29sc19mb3VuZCwgY29sX25hbWUgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2hlZF9pdGVtcyA9IF8uZmlsdGVyKGlucHV0ZGF0YSwgbyA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gby5yb3dfbmFtZSA9PT0gcm93X25hbWUgJiYgby5jb2xfbmFtZSA9PT0gY29sX25hbWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoIW1hdGNoZWRfaXRlbXMgfHwgbWF0Y2hlZF9pdGVtcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xfbmFtZVwiOiBjb2xfbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yX2JnXCI6IG9wdGlvbnMubm9uX21hdGNoaW5nX2NlbGxzX2NvbG9yX2JnLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JfdGV4dFwiOiBvcHRpb25zLm5vbl9tYXRjaGluZ19jZWxsc19jb2xvcl90ZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGlzcGxheV92YWx1ZVwiOiByZXBsYWNlVG9rZW5zKG9wdGlvbnMubm9uX21hdGNoaW5nX2NlbGxzX3RleHQpLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGlkZGVuXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGlua1wiOiBcIi1cIixcclxuICAgICAgICAgICAgICAgICAgICBcInJvd19uYW1lXCI6IHJvd19uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidG9vbHRpcFwiOiBcIi1cIixcclxuICAgICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IE5hTlxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hlZF9pdGVtcyAmJiBtYXRjaGVkX2l0ZW1zLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgY29scy5wdXNoKG1hdGNoZWRfaXRlbXNbMF0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoZWRfaXRlbXMgJiYgbWF0Y2hlZF9pdGVtcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBjb2xzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY29sX25hbWVcIjogY29sX25hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvcl9iZ1wiOiBcImRhcmtyZWRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yX3RleHRcIjogXCJ3aGl0ZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGlzcGxheV92YWx1ZVwiOiBcIkR1cGxpY2F0ZSBtYXRjaGVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJoaWRkZW5cIjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsaW5rXCI6IFwiLVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicm93X25hbWVcIjogcm93X25hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0b29sdGlwXCI6IFwiLVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogTmFOXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG91dHB1dC5wdXNoKGNvbHMpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvbHNfZm91bmQsXHJcbiAgICAgICAgb3V0cHV0LFxyXG4gICAgICAgIHJvd3NfZm91bmQsXHJcbiAgICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICAgIGRlZmF1bHRQYXR0ZXJuLFxyXG4gICAgc2VyaWVzVG9UYWJsZVxyXG59O1xyXG4iXX0=