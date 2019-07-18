System.register(["lodash", "./boom/index"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, index_1, default_pattern_options, defaultPattern, seriesToTable;
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
            default_pattern_options = {
                bgColors: "green|orange|red",
                bgColors_overrides: "0->green|2->red|1->yellow",
                clickable_cells_link: "",
                col_name: "Value",
                decimals: 2,
                defaultBGColor: "transparent",
                defaultTextColor: "",
                delimiter: ".",
                displayTemplate: "_value_",
                enable_bgColor: false,
                enable_bgColor_overrides: false,
                enable_clickable_cells: false,
                enable_textColor: false,
                enable_textColor_overrides: false,
                enable_time_based_thresholds: false,
                enable_transform: false,
                enable_transform_overrides: false,
                filter: {
                    value_above: "",
                    value_below: ""
                },
                format: "none",
                name: "Default Pattern",
                null_color: "darkred",
                null_textcolor: "white",
                null_value: "No data",
                pattern: "*",
                row_name: "_series_",
                textColors: "red|orange|green",
                textColors_overrides: "0->red|2->green|1->yellow",
                thresholds: "70,90",
                time_based_thresholds: [],
                tooltipTemplate: "",
                transform_values: "_value_|_value_|_value_",
                transform_values_overrides: "0->down|1->up",
                valueName: "avg"
            };
            defaultPattern = new index_1.BoomPattern(default_pattern_options);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7WUFJSSx1QkFBdUIsR0FBaUI7Z0JBQ3hDLFFBQVEsRUFBRSxrQkFBa0I7Z0JBQzVCLGtCQUFrQixFQUFFLDJCQUEyQjtnQkFDL0Msb0JBQW9CLEVBQUUsRUFBRTtnQkFDeEIsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLFFBQVEsRUFBRSxDQUFDO2dCQUNYLGNBQWMsRUFBRSxhQUFhO2dCQUM3QixnQkFBZ0IsRUFBRSxFQUFFO2dCQUNwQixTQUFTLEVBQUUsR0FBRztnQkFDZCxlQUFlLEVBQUUsU0FBUztnQkFDMUIsY0FBYyxFQUFFLEtBQUs7Z0JBQ3JCLHdCQUF3QixFQUFFLEtBQUs7Z0JBQy9CLHNCQUFzQixFQUFFLEtBQUs7Z0JBQzdCLGdCQUFnQixFQUFFLEtBQUs7Z0JBQ3ZCLDBCQUEwQixFQUFFLEtBQUs7Z0JBQ2pDLDRCQUE0QixFQUFFLEtBQUs7Z0JBQ25DLGdCQUFnQixFQUFFLEtBQUs7Z0JBQ3ZCLDBCQUEwQixFQUFFLEtBQUs7Z0JBQ2pDLE1BQU0sRUFBRTtvQkFDSixXQUFXLEVBQUUsRUFBRTtvQkFDZixXQUFXLEVBQUUsRUFBRTtpQkFDbEI7Z0JBQ0QsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsSUFBSSxFQUFFLGlCQUFpQjtnQkFDdkIsVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLGNBQWMsRUFBRSxPQUFPO2dCQUN2QixVQUFVLEVBQUUsU0FBUztnQkFDckIsT0FBTyxFQUFFLEdBQUc7Z0JBQ1osUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLFVBQVUsRUFBRSxrQkFBa0I7Z0JBQzlCLG9CQUFvQixFQUFFLDJCQUEyQjtnQkFDakQsVUFBVSxFQUFFLE9BQU87Z0JBQ25CLHFCQUFxQixFQUFFLEVBQUU7Z0JBQ3pCLGVBQWUsRUFBRSxFQUFFO2dCQUNuQixnQkFBZ0IsRUFBRSx5QkFBeUI7Z0JBQzND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TixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XG5pbXBvcnQgeyBJQm9vbVNlcmllcywgSUJvb21DZWxsRGV0YWlscywgSUJvb21UYWJsZSwgSUJvb21UYWJsZVRyYW5zZm9ybWF0aW9uT3B0aW9ucywgSUJvb21QYXR0ZXJuIH0gZnJvbSBcIi4vYm9vbS9pbmRleFwiO1xuaW1wb3J0IHsgQm9vbVBhdHRlcm4sIHJlcGxhY2VUb2tlbnMgfSBmcm9tICcuL2Jvb20vaW5kZXgnO1xuXG5sZXQgZGVmYXVsdF9wYXR0ZXJuX29wdGlvbnM6IElCb29tUGF0dGVybiA9IHtcbiAgICBiZ0NvbG9yczogXCJncmVlbnxvcmFuZ2V8cmVkXCIsXG4gICAgYmdDb2xvcnNfb3ZlcnJpZGVzOiBcIjAtPmdyZWVufDItPnJlZHwxLT55ZWxsb3dcIixcbiAgICBjbGlja2FibGVfY2VsbHNfbGluazogXCJcIixcbiAgICBjb2xfbmFtZTogXCJWYWx1ZVwiLFxuICAgIGRlY2ltYWxzOiAyLFxuICAgIGRlZmF1bHRCR0NvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gICAgZGVmYXVsdFRleHRDb2xvcjogXCJcIixcbiAgICBkZWxpbWl0ZXI6IFwiLlwiLFxuICAgIGRpc3BsYXlUZW1wbGF0ZTogXCJfdmFsdWVfXCIsXG4gICAgZW5hYmxlX2JnQ29sb3I6IGZhbHNlLFxuICAgIGVuYWJsZV9iZ0NvbG9yX292ZXJyaWRlczogZmFsc2UsXG4gICAgZW5hYmxlX2NsaWNrYWJsZV9jZWxsczogZmFsc2UsXG4gICAgZW5hYmxlX3RleHRDb2xvcjogZmFsc2UsXG4gICAgZW5hYmxlX3RleHRDb2xvcl9vdmVycmlkZXM6IGZhbHNlLFxuICAgIGVuYWJsZV90aW1lX2Jhc2VkX3RocmVzaG9sZHM6IGZhbHNlLFxuICAgIGVuYWJsZV90cmFuc2Zvcm06IGZhbHNlLFxuICAgIGVuYWJsZV90cmFuc2Zvcm1fb3ZlcnJpZGVzOiBmYWxzZSxcbiAgICBmaWx0ZXI6IHtcbiAgICAgICAgdmFsdWVfYWJvdmU6IFwiXCIsXG4gICAgICAgIHZhbHVlX2JlbG93OiBcIlwiXG4gICAgfSxcbiAgICBmb3JtYXQ6IFwibm9uZVwiLFxuICAgIG5hbWU6IFwiRGVmYXVsdCBQYXR0ZXJuXCIsXG4gICAgbnVsbF9jb2xvcjogXCJkYXJrcmVkXCIsXG4gICAgbnVsbF90ZXh0Y29sb3I6IFwid2hpdGVcIixcbiAgICBudWxsX3ZhbHVlOiBcIk5vIGRhdGFcIixcbiAgICBwYXR0ZXJuOiBcIipcIixcbiAgICByb3dfbmFtZTogXCJfc2VyaWVzX1wiLFxuICAgIHRleHRDb2xvcnM6IFwicmVkfG9yYW5nZXxncmVlblwiLFxuICAgIHRleHRDb2xvcnNfb3ZlcnJpZGVzOiBcIjAtPnJlZHwyLT5ncmVlbnwxLT55ZWxsb3dcIixcbiAgICB0aHJlc2hvbGRzOiBcIjcwLDkwXCIsXG4gICAgdGltZV9iYXNlZF90aHJlc2hvbGRzOiBbXSxcbiAgICB0b29sdGlwVGVtcGxhdGU6IFwiXCIsXG4gICAgdHJhbnNmb3JtX3ZhbHVlczogXCJfdmFsdWVffF92YWx1ZV98X3ZhbHVlX1wiLFxuICAgIHRyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzOiBcIjAtPmRvd258MS0+dXBcIixcbiAgICB2YWx1ZU5hbWU6IFwiYXZnXCJcbn07XG5jb25zdCBkZWZhdWx0UGF0dGVybiA9IG5ldyBCb29tUGF0dGVybihkZWZhdWx0X3BhdHRlcm5fb3B0aW9ucyk7XG5cbmNvbnN0IHNlcmllc1RvVGFibGUgPSBmdW5jdGlvbiAoaW5wdXRkYXRhOiBJQm9vbVNlcmllc1tdLCBvcHRpb25zOiBJQm9vbVRhYmxlVHJhbnNmb3JtYXRpb25PcHRpb25zKTogSUJvb21UYWJsZSB7XG4gICAgbGV0IHJvd3NfZm91bmQgPSBfLnVuaXEoXy5tYXAoaW5wdXRkYXRhLCBkID0+IGQucm93X25hbWUpKTtcbiAgICBsZXQgcm93c193aXRob3V0X3Rva2VuID0gXy51bmlxKF8ubWFwKGlucHV0ZGF0YSwgZCA9PiBkLnJvd19uYW1lX3JhdykpO1xuICAgIGxldCBjb2xzX2ZvdW5kID0gXy51bmlxKF8ubWFwKGlucHV0ZGF0YSwgZCA9PiBkLmNvbF9uYW1lKSk7XG4gICAgbGV0IG91dHB1dDogSUJvb21DZWxsRGV0YWlsc1tdW10gPSBbXTtcbiAgICBfLmVhY2gocm93c19mb3VuZCwgcm93X25hbWUgPT4ge1xuICAgICAgICBsZXQgY29sczogSUJvb21DZWxsRGV0YWlsc1tdID0gW107XG4gICAgICAgIF8uZWFjaChjb2xzX2ZvdW5kLCBjb2xfbmFtZSA9PiB7XG4gICAgICAgICAgICBsZXQgbWF0Y2hlZF9pdGVtcyA9IF8uZmlsdGVyKGlucHV0ZGF0YSwgbyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG8ucm93X25hbWUgPT09IHJvd19uYW1lICYmIG8uY29sX25hbWUgPT09IGNvbF9uYW1lO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIW1hdGNoZWRfaXRlbXMgfHwgbWF0Y2hlZF9pdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb2xzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBcImNvbF9uYW1lXCI6IGNvbF9uYW1lLFxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yX2JnXCI6IG9wdGlvbnMubm9uX21hdGNoaW5nX2NlbGxzX2NvbG9yX2JnLFxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yX3RleHRcIjogb3B0aW9ucy5ub25fbWF0Y2hpbmdfY2VsbHNfY29sb3JfdGV4dCxcbiAgICAgICAgICAgICAgICAgICAgXCJkaXNwbGF5X3ZhbHVlXCI6IHJlcGxhY2VUb2tlbnMob3B0aW9ucy5ub25fbWF0Y2hpbmdfY2VsbHNfdGV4dCksXG4gICAgICAgICAgICAgICAgICAgIFwiaGlkZGVuXCI6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBcImxpbmtcIjogXCItXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicm93X25hbWVcIjogcm93X25hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwidG9vbHRpcFwiOiBcIi1cIixcbiAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBOYU5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hlZF9pdGVtcyAmJiBtYXRjaGVkX2l0ZW1zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGNvbHMucHVzaChtYXRjaGVkX2l0ZW1zWzBdKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hlZF9pdGVtcyAmJiBtYXRjaGVkX2l0ZW1zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBjb2xzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBcImNvbF9uYW1lXCI6IGNvbF9uYW1lLFxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yX2JnXCI6IFwiZGFya3JlZFwiLFxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yX3RleHRcIjogXCJ3aGl0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBcImRpc3BsYXlfdmFsdWVcIjogXCJEdXBsaWNhdGUgbWF0Y2hlc1wiLFxuICAgICAgICAgICAgICAgICAgICBcImhpZGRlblwiOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgXCJsaW5rXCI6IFwiLVwiLFxuICAgICAgICAgICAgICAgICAgICBcInJvd19uYW1lXCI6IHJvd19uYW1lLFxuICAgICAgICAgICAgICAgICAgICBcInRvb2x0aXBcIjogXCItXCIsXG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogTmFOXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBvdXRwdXQucHVzaChjb2xzKTtcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgICBjb2xzX2ZvdW5kLFxuICAgICAgICBvdXRwdXQsXG4gICAgICAgIHJvd3NfZm91bmQsXG4gICAgICAgIHJvd3Nfd2l0aG91dF90b2tlblxuICAgIH07XG59O1xuXG5leHBvcnQge1xuICAgIGRlZmF1bHRQYXR0ZXJuLFxuICAgIHNlcmllc1RvVGFibGVcbn07XG4iXX0=