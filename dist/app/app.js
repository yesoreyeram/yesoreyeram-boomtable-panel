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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7WUFJTSxjQUFjLEdBQUcsSUFBSSxtQkFBVyxDQUFDO2dCQUNuQyxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixrQkFBa0IsRUFBRSwyQkFBMkI7Z0JBQy9DLG9CQUFvQixFQUFFLEVBQUU7Z0JBQ3hCLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUsQ0FBQztnQkFDWCxTQUFTLEVBQUUsR0FBRztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsaUJBQWlCO2dCQUN2QixVQUFVLEVBQUUsU0FBUztnQkFDckIsY0FBYyxFQUFFLE9BQU87Z0JBQ3ZCLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixPQUFPLEVBQUUsR0FBRztnQkFDWixRQUFRLEVBQUUsVUFBVTtnQkFDcEIsU0FBUyxFQUFFLGtCQUFrQjtnQkFDN0Isb0JBQW9CLEVBQUUsMkJBQTJCO2dCQUNqRCxVQUFVLEVBQUUsT0FBTztnQkFDbkIscUJBQXFCLEVBQUUsRUFBRTtnQkFDekIsZ0JBQWdCLEVBQUUseUJBQXlCO2dCQUMzQywwQkFBMEIsRUFBRSxlQUFlO2dCQUMzQyxTQUFTLEVBQUUsS0FBSzthQUNuQixDQUFDLENBQUM7O1lBQ0csYUFBYSxHQUFHLFVBQVUsU0FBd0IsRUFBRSxPQUF3QztnQkFDOUYsSUFBSSxVQUFVLEdBQUcsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFFBQVEsRUFBVixDQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLFVBQVUsR0FBRyxnQkFBQyxDQUFDLElBQUksQ0FBQyxnQkFBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsUUFBUSxFQUFWLENBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNELElBQUksTUFBTSxHQUF5QixFQUFFLENBQUM7Z0JBQ3RDLGdCQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFBLFFBQVE7b0JBQ3ZCLElBQUksSUFBSSxHQUF1QixFQUFFLENBQUM7b0JBQ2xDLGdCQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFBLFFBQVE7d0JBQ3ZCLElBQUksYUFBYSxHQUFHLGdCQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxVQUFBLENBQUM7NEJBQ3JDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsS0FBSyxRQUFRLElBQUksQ0FBQyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUM7d0JBQzlELENBQUMsQ0FBQyxDQUFDO3dCQUNILElBQUksQ0FBQyxhQUFhLElBQUksYUFBYSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7NEJBQzlDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0NBQ04sVUFBVSxFQUFFLFFBQVE7Z0NBQ3BCLFVBQVUsRUFBRSxPQUFPLENBQUMsMkJBQTJCO2dDQUMvQyxZQUFZLEVBQUUsT0FBTyxDQUFDLDZCQUE2QjtnQ0FDbkQsZUFBZSxFQUFFLHFCQUFhLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDO2dDQUMvRCxRQUFRLEVBQUUsS0FBSztnQ0FDZixNQUFNLEVBQUUsR0FBRztnQ0FDWCxVQUFVLEVBQUUsUUFBUTtnQ0FDcEIsU0FBUyxFQUFFLEdBQUc7Z0NBQ2QsT0FBTyxFQUFFLEdBQUc7NkJBQ2YsQ0FBQyxDQUFDO3lCQUNOOzZCQUFNLElBQUksYUFBYSxJQUFJLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOzRCQUNwRCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUMvQjs2QkFBTSxJQUFJLGFBQWEsSUFBSSxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs0QkFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQztnQ0FDTixVQUFVLEVBQUUsUUFBUTtnQ0FDcEIsVUFBVSxFQUFFLFNBQVM7Z0NBQ3JCLFlBQVksRUFBRSxPQUFPO2dDQUNyQixlQUFlLEVBQUUsbUJBQW1CO2dDQUNwQyxRQUFRLEVBQUUsS0FBSztnQ0FDZixNQUFNLEVBQUUsR0FBRztnQ0FDWCxVQUFVLEVBQUUsUUFBUTtnQ0FDcEIsU0FBUyxFQUFFLEdBQUc7Z0NBQ2QsT0FBTyxFQUFFLEdBQUc7NkJBQ2YsQ0FBQyxDQUFDO3lCQUNOO29CQUNMLENBQUMsQ0FBQyxDQUFDO29CQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU87b0JBQ0gsVUFBVSxZQUFBO29CQUNWLE1BQU0sUUFBQTtvQkFDTixVQUFVLFlBQUE7aUJBQ2IsQ0FBQztZQUNOLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCB7IElCb29tU2VyaWVzLCBJQm9vbUNlbGxEZXRhaWxzLCBJQm9vbVRhYmxlLCBJQm9vbVRhYmxlVHJhbnNmb3JtYXRpb25PcHRpb25zIH0gZnJvbSBcIi4vYm9vbS9pbmRleFwiO1xuaW1wb3J0IHsgQm9vbVBhdHRlcm4sIHJlcGxhY2VUb2tlbnMgfSBmcm9tICcuL2Jvb20vaW5kZXgnO1xuXG5jb25zdCBkZWZhdWx0UGF0dGVybiA9IG5ldyBCb29tUGF0dGVybih7XG4gICAgYmdDb2xvcnM6IFwiZ3JlZW58b3JhbmdlfHJlZFwiLFxuICAgIGJnQ29sb3JzX292ZXJyaWRlczogXCIwLT5ncmVlbnwyLT5yZWR8MS0+eWVsbG93XCIsXG4gICAgY2xpY2thYmxlX2NlbGxzX2xpbms6IFwiXCIsXG4gICAgY29sX25hbWU6IFwiVmFsdWVcIixcbiAgICBkZWNpbWFsczogMixcbiAgICBkZWxpbWl0ZXI6IFwiLlwiLFxuICAgIGZvcm1hdDogXCJub25lXCIsXG4gICAgbmFtZTogXCJEZWZhdWx0IFBhdHRlcm5cIixcbiAgICBudWxsX2NvbG9yOiBcImRhcmtyZWRcIixcbiAgICBudWxsX3RleHRjb2xvcjogXCJ3aGl0ZVwiLFxuICAgIG51bGxfdmFsdWU6IFwiTm8gZGF0YVwiLFxuICAgIHBhdHRlcm46IFwiKlwiLFxuICAgIHJvd19uYW1lOiBcIl9zZXJpZXNfXCIsXG4gICAgdGV4dENvbG9yOiBcInJlZHxvcmFuZ2V8Z3JlZW5cIixcbiAgICB0ZXh0Q29sb3JzX292ZXJyaWRlczogXCIwLT5yZWR8Mi0+Z3JlZW58MS0+eWVsbG93XCIsXG4gICAgdGhyZXNob2xkczogXCI3MCw5MFwiLFxuICAgIHRpbWVfYmFzZWRfdGhyZXNob2xkczogW10sXG4gICAgdHJhbnNmb3JtX3ZhbHVlczogXCJfdmFsdWVffF92YWx1ZV98X3ZhbHVlX1wiLFxuICAgIHRyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzOiBcIjAtPmRvd258MS0+dXBcIixcbiAgICB2YWx1ZU5hbWU6IFwiYXZnXCJcbn0pO1xuY29uc3Qgc2VyaWVzVG9UYWJsZSA9IGZ1bmN0aW9uIChpbnB1dGRhdGE6IElCb29tU2VyaWVzW10sIG9wdGlvbnM6IElCb29tVGFibGVUcmFuc2Zvcm1hdGlvbk9wdGlvbnMpOiBJQm9vbVRhYmxlIHtcbiAgICBsZXQgcm93c19mb3VuZCA9IF8udW5pcShfLm1hcChpbnB1dGRhdGEsIGQgPT4gZC5yb3dfbmFtZSkpO1xuICAgIGxldCBjb2xzX2ZvdW5kID0gXy51bmlxKF8ubWFwKGlucHV0ZGF0YSwgZCA9PiBkLmNvbF9uYW1lKSk7XG4gICAgbGV0IG91dHB1dDogSUJvb21DZWxsRGV0YWlsc1tdW10gPSBbXTtcbiAgICBfLmVhY2gocm93c19mb3VuZCwgcm93X25hbWUgPT4ge1xuICAgICAgICBsZXQgY29sczogSUJvb21DZWxsRGV0YWlsc1tdID0gW107XG4gICAgICAgIF8uZWFjaChjb2xzX2ZvdW5kLCBjb2xfbmFtZSA9PiB7XG4gICAgICAgICAgICBsZXQgbWF0Y2hlZF9pdGVtcyA9IF8uZmlsdGVyKGlucHV0ZGF0YSwgbyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG8ucm93X25hbWUgPT09IHJvd19uYW1lICYmIG8uY29sX25hbWUgPT09IGNvbF9uYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIW1hdGNoZWRfaXRlbXMgfHwgbWF0Y2hlZF9pdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb2xzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBcImNvbF9uYW1lXCI6IGNvbF9uYW1lLFxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yX2JnXCI6IG9wdGlvbnMubm9uX21hdGNoaW5nX2NlbGxzX2NvbG9yX2JnLFxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yX3RleHRcIjogb3B0aW9ucy5ub25fbWF0Y2hpbmdfY2VsbHNfY29sb3JfdGV4dCxcbiAgICAgICAgICAgICAgICAgICAgXCJkaXNwbGF5X3ZhbHVlXCI6IHJlcGxhY2VUb2tlbnMob3B0aW9ucy5ub25fbWF0Y2hpbmdfY2VsbHNfdGV4dCksXG4gICAgICAgICAgICAgICAgICAgIFwiaGlkZGVuXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBcImxpbmtcIjogXCItXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicm93X25hbWVcIjogcm93X25hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwidG9vbHRpcFwiOiBcIi1cIixcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBOYU5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hlZF9pdGVtcyAmJiBtYXRjaGVkX2l0ZW1zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGNvbHMucHVzaChtYXRjaGVkX2l0ZW1zWzBdKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hlZF9pdGVtcyAmJiBtYXRjaGVkX2l0ZW1zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBjb2xzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBcImNvbF9uYW1lXCI6IGNvbF9uYW1lLFxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yX2JnXCI6IFwiZGFya3JlZFwiLFxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yX3RleHRcIjogXCJ3aGl0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBcImRpc3BsYXlfdmFsdWVcIjogXCJEdXBsaWNhdGUgbWF0Y2hlc1wiLFxuICAgICAgICAgICAgICAgICAgICBcImhpZGRlblwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgXCJsaW5rXCI6IFwiLVwiLFxuICAgICAgICAgICAgICAgICAgICBcInJvd19uYW1lXCI6IHJvd19uYW1lLFxuICAgICAgICAgICAgICAgICAgICBcInRvb2x0aXBcIjogXCItXCIsXG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogTmFOXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBvdXRwdXQucHVzaChjb2xzKTtcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgICBjb2xzX2ZvdW5kLFxuICAgICAgICBvdXRwdXQsXG4gICAgICAgIHJvd3NfZm91bmQsXG4gICAgfTtcbn07XG5cbmV4cG9ydCB7XG4gICAgZGVmYXVsdFBhdHRlcm4sXG4gICAgc2VyaWVzVG9UYWJsZVxufTtcbiJdfQ==