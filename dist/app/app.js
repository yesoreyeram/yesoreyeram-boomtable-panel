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
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7WUFJTSxjQUFjLEdBQUcsSUFBSSxtQkFBVyxDQUFDO2dCQUNuQyxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixrQkFBa0IsRUFBRSwyQkFBMkI7Z0JBQy9DLG9CQUFvQixFQUFFLEVBQUU7Z0JBQ3hCLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUsQ0FBQztnQkFDWCxTQUFTLEVBQUUsR0FBRztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsaUJBQWlCO2dCQUN2QixVQUFVLEVBQUUsU0FBUztnQkFDckIsY0FBYyxFQUFFLE9BQU87Z0JBQ3ZCLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixPQUFPLEVBQUUsR0FBRztnQkFDWixRQUFRLEVBQUUsVUFBVTtnQkFDcEIsU0FBUyxFQUFFLGtCQUFrQjtnQkFDN0Isb0JBQW9CLEVBQUUsMkJBQTJCO2dCQUNqRCxVQUFVLEVBQUUsT0FBTztnQkFDbkIscUJBQXFCLEVBQUUsRUFBRTtnQkFDekIsZ0JBQWdCLEVBQUUseUJBQXlCO2dCQUMzQywwQkFBMEIsRUFBRSxlQUFlO2dCQUMzQyxTQUFTLEVBQUUsS0FBSzthQUNuQixDQUFDLENBQUM7O1lBQ0csYUFBYSxHQUFHLFVBQVUsU0FBd0IsRUFBRSxPQUF3QztnQkFDOUYsSUFBSSxVQUFVLEdBQUcsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFFBQVEsRUFBVixDQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLFVBQVUsR0FBRyxnQkFBQyxDQUFDLElBQUksQ0FBQyxnQkFBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsUUFBUSxFQUFWLENBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQzNELElBQUksTUFBTSxHQUF5QixFQUFFLENBQUM7Z0JBQ3RDLGdCQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFBLFFBQVE7b0JBQ3ZCLElBQUksSUFBSSxHQUF1QixFQUFFLENBQUM7b0JBQ2xDLGdCQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFBLFFBQVE7d0JBQ3ZCLElBQUksYUFBYSxHQUFHLGdCQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxVQUFBLENBQUM7NEJBQ3JDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsS0FBSyxRQUFRLElBQUksQ0FBQyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUM7d0JBQzlELENBQUMsQ0FBQyxDQUFDO3dCQUNILElBQUksQ0FBQyxhQUFhLElBQUksYUFBYSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7NEJBQzlDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0NBQ04sVUFBVSxFQUFFLFFBQVE7Z0NBQ3BCLFVBQVUsRUFBRSxPQUFPLENBQUMsMkJBQTJCO2dDQUMvQyxZQUFZLEVBQUUsT0FBTyxDQUFDLDZCQUE2QjtnQ0FDbkQsZUFBZSxFQUFFLHFCQUFhLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDO2dDQUMvRCxRQUFRLEVBQUUsS0FBSztnQ0FDZixNQUFNLEVBQUUsR0FBRztnQ0FDWCxVQUFVLEVBQUUsUUFBUTtnQ0FDcEIsU0FBUyxFQUFFLEdBQUc7NkJBQ2pCLENBQUMsQ0FBQzt5QkFDTjs2QkFBTSxJQUFJLGFBQWEsSUFBSSxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTs0QkFDcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDL0I7NkJBQU0sSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7NEJBQ2xELElBQUksQ0FBQyxJQUFJLENBQUM7Z0NBQ04sVUFBVSxFQUFFLFFBQVE7Z0NBQ3BCLFVBQVUsRUFBRSxTQUFTO2dDQUNyQixZQUFZLEVBQUUsT0FBTztnQ0FDckIsZUFBZSxFQUFFLG1CQUFtQjtnQ0FDcEMsUUFBUSxFQUFFLEtBQUs7Z0NBQ2YsTUFBTSxFQUFFLEdBQUc7Z0NBQ1gsVUFBVSxFQUFFLFFBQVE7Z0NBQ3BCLFNBQVMsRUFBRSxHQUFHOzZCQUNqQixDQUFDLENBQUM7eUJBQ047b0JBQ0wsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTztvQkFDSCxVQUFVLFlBQUE7b0JBQ1YsTUFBTSxRQUFBO29CQUNOLFVBQVUsWUFBQTtpQkFDYixDQUFDO1lBQ04sQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgeyBJQm9vbVNlcmllcywgSUJvb21DZWxsRGV0YWlscywgSUJvb21UYWJsZSwgSUJvb21UYWJsZVRyYW5zZm9ybWF0aW9uT3B0aW9ucyB9IGZyb20gXCIuL2Jvb20vaW5kZXhcIjtcclxuaW1wb3J0IHsgQm9vbVBhdHRlcm4sIHJlcGxhY2VUb2tlbnMgfSBmcm9tICcuL2Jvb20vaW5kZXgnO1xyXG5cclxuY29uc3QgZGVmYXVsdFBhdHRlcm4gPSBuZXcgQm9vbVBhdHRlcm4oe1xyXG4gICAgYmdDb2xvcnM6IFwiZ3JlZW58b3JhbmdlfHJlZFwiLFxyXG4gICAgYmdDb2xvcnNfb3ZlcnJpZGVzOiBcIjAtPmdyZWVufDItPnJlZHwxLT55ZWxsb3dcIixcclxuICAgIGNsaWNrYWJsZV9jZWxsc19saW5rOiBcIlwiLFxyXG4gICAgY29sX25hbWU6IFwiVmFsdWVcIixcclxuICAgIGRlY2ltYWxzOiAyLFxyXG4gICAgZGVsaW1pdGVyOiBcIi5cIixcclxuICAgIGZvcm1hdDogXCJub25lXCIsXHJcbiAgICBuYW1lOiBcIkRlZmF1bHQgUGF0dGVyblwiLFxyXG4gICAgbnVsbF9jb2xvcjogXCJkYXJrcmVkXCIsXHJcbiAgICBudWxsX3RleHRjb2xvcjogXCJ3aGl0ZVwiLFxyXG4gICAgbnVsbF92YWx1ZTogXCJObyBkYXRhXCIsXHJcbiAgICBwYXR0ZXJuOiBcIipcIixcclxuICAgIHJvd19uYW1lOiBcIl9zZXJpZXNfXCIsXHJcbiAgICB0ZXh0Q29sb3I6IFwicmVkfG9yYW5nZXxncmVlblwiLFxyXG4gICAgdGV4dENvbG9yc19vdmVycmlkZXM6IFwiMC0+cmVkfDItPmdyZWVufDEtPnllbGxvd1wiLFxyXG4gICAgdGhyZXNob2xkczogXCI3MCw5MFwiLFxyXG4gICAgdGltZV9iYXNlZF90aHJlc2hvbGRzOiBbXSxcclxuICAgIHRyYW5zZm9ybV92YWx1ZXM6IFwiX3ZhbHVlX3xfdmFsdWVffF92YWx1ZV9cIixcclxuICAgIHRyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzOiBcIjAtPmRvd258MS0+dXBcIixcclxuICAgIHZhbHVlTmFtZTogXCJhdmdcIlxyXG59KTtcclxuY29uc3Qgc2VyaWVzVG9UYWJsZSA9IGZ1bmN0aW9uIChpbnB1dGRhdGE6IElCb29tU2VyaWVzW10sIG9wdGlvbnM6IElCb29tVGFibGVUcmFuc2Zvcm1hdGlvbk9wdGlvbnMpOiBJQm9vbVRhYmxlIHtcclxuICAgIGxldCByb3dzX2ZvdW5kID0gXy51bmlxKF8ubWFwKGlucHV0ZGF0YSwgZCA9PiBkLnJvd19uYW1lKSk7XHJcbiAgICBsZXQgY29sc19mb3VuZCA9IF8udW5pcShfLm1hcChpbnB1dGRhdGEsIGQgPT4gZC5jb2xfbmFtZSkpO1xyXG4gICAgbGV0IG91dHB1dDogSUJvb21DZWxsRGV0YWlsc1tdW10gPSBbXTtcclxuICAgIF8uZWFjaChyb3dzX2ZvdW5kLCByb3dfbmFtZSA9PiB7XHJcbiAgICAgICAgbGV0IGNvbHM6IElCb29tQ2VsbERldGFpbHNbXSA9IFtdO1xyXG4gICAgICAgIF8uZWFjaChjb2xzX2ZvdW5kLCBjb2xfbmFtZSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaGVkX2l0ZW1zID0gXy5maWx0ZXIoaW5wdXRkYXRhLCBvID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvLnJvd19uYW1lID09PSByb3dfbmFtZSAmJiBvLmNvbF9uYW1lID09PSBjb2xfbmFtZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICghbWF0Y2hlZF9pdGVtcyB8fCBtYXRjaGVkX2l0ZW1zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29scy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBcImNvbF9uYW1lXCI6IGNvbF9uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JfYmdcIjogb3B0aW9ucy5ub25fbWF0Y2hpbmdfY2VsbHNfY29sb3JfYmcsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvcl90ZXh0XCI6IG9wdGlvbnMubm9uX21hdGNoaW5nX2NlbGxzX2NvbG9yX3RleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkaXNwbGF5X3ZhbHVlXCI6IHJlcGxhY2VUb2tlbnMob3B0aW9ucy5ub25fbWF0Y2hpbmdfY2VsbHNfdGV4dCksXHJcbiAgICAgICAgICAgICAgICAgICAgXCJoaWRkZW5cIjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsaW5rXCI6IFwiLVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicm93X25hbWVcIjogcm93X25hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0b29sdGlwXCI6IFwiLVwiXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaGVkX2l0ZW1zICYmIG1hdGNoZWRfaXRlbXMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjb2xzLnB1c2gobWF0Y2hlZF9pdGVtc1swXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hlZF9pdGVtcyAmJiBtYXRjaGVkX2l0ZW1zLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgIGNvbHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xfbmFtZVwiOiBjb2xfbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yX2JnXCI6IFwiZGFya3JlZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiY29sb3JfdGV4dFwiOiBcIndoaXRlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkaXNwbGF5X3ZhbHVlXCI6IFwiRHVwbGljYXRlIG1hdGNoZXNcIixcclxuICAgICAgICAgICAgICAgICAgICBcImhpZGRlblwiOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBcImxpbmtcIjogXCItXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJyb3dfbmFtZVwiOiByb3dfbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBcInRvb2x0aXBcIjogXCItXCJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgb3V0cHV0LnB1c2goY29scyk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY29sc19mb3VuZCxcclxuICAgICAgICBvdXRwdXQsXHJcbiAgICAgICAgcm93c19mb3VuZCxcclxuICAgIH07XHJcbn07XHJcblxyXG5leHBvcnQge1xyXG4gICAgZGVmYXVsdFBhdHRlcm4sXHJcbiAgICBzZXJpZXNUb1RhYmxlXHJcbn07XHJcbiJdfQ==