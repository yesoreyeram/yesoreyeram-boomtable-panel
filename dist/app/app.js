System.register([], function (exports_1, context_1) {
    "use strict";
    var buildOptionOverride, plugin_id, defaultPattern, config;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            buildOptionOverride = function (o, i) {
                return {
                    text: String(o[0]),
                    propertyName: String(o[1]),
                    index: i,
                    defaultValue: String(o[3]),
                    values: [].concat(o[2]).map(function (value) { return String[value]; }),
                    submenu: [].concat(o[2]).map(function (value) { return { text: String(value), value: value }; })
                };
            };
            plugin_id = "yesoreyeram-boomtable-panel";
            exports_1("plugin_id", plugin_id);
            defaultPattern = {
                name: undefined,
                pattern: undefined,
                disabled: false,
                row_name: "_series_",
                col_name: "Value",
                delimiter: ".",
                valueName: "avg",
                format: "none",
                decimals: 2,
                thresholds: "70,90",
                enable_bgColor: false,
                bgColors: "green|orange|red",
                enable_bgColor_overrides: false,
                bgColors_overrides: "0->green|2->red|1->yellow",
                enable_TextColors: false,
                textColors: "white|white|white",
                enable_TextColor_overrides: false,
                textColors_overrides: "0->white|2->white|1->white",
                enable_transform: false,
                transform_values: "_value_|_value_|_value_",
                enable_transform_overrides: false,
                transform_values_overrides: "0->down|1->up",
                enable_time_based_thresholds: false,
                time_based_thresholds: [],
                null_color: "darkred",
                null_text_color: "white",
                null_value: "No data",
                enable_clickable_cells: false,
                clickable_cells_link: "",
                filter: {
                    value_below: "",
                    value_above: ""
                }
            };
            config = {
                plugin_id: plugin_id,
                debug_mode: false,
                error: undefined,
                optionOverrides: [],
                panelDefaults: {
                    currentOptionOverrides: [],
                    patterns: [],
                    defaultPattern: defaultPattern,
                    activePatternIndex: -1,
                    row_col_wrapper: "_",
                    no_match_text: "N/A",
                    default_title_for_rows: "Metric"
                },
                valueNameOptions: [{
                        value: "min",
                        text: "Min"
                    },
                    {
                        value: "max",
                        text: "Max"
                    },
                    {
                        value: "avg",
                        text: "Average"
                    },
                    {
                        value: "current",
                        text: "Current"
                    },
                    {
                        value: "total",
                        text: "Total"
                    }
                ],
            };
            exports_1("config", config);
            config.optionOverrides.push(buildOptionOverride(["Text alignment header", "TEXT_ALIGN_TABLE_HEADER", ["left", "right", "center"], "left"], 0));
            config.optionOverrides.push(buildOptionOverride(["Text alignment first column", "TEXT_ALIGN_FIRST_COLUMN", ["left", "right", "center"], "left"], 1));
            config.optionOverrides.push(buildOptionOverride(["Text alignment table cells", "TEXT_ALIGN_TABLE_CELLS", ["left", "right", "center"], "left"], 2));
            config.optionOverrides.push(buildOptionOverride(["Hide Headers", "HIDE_HEADERS", ["false", "true"], "false"], 3));
            config.optionOverrides.push(buildOptionOverride(["Hide first column", "HIDE_FIRST_COLUMN", ["false", "true"], "false"], 4));
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztZQUtJLG1CQUFtQixHQUFHLFVBQVUsQ0FBUSxFQUFFLENBQVM7Z0JBQ25ELE9BQU87b0JBQ0gsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xCLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQixLQUFLLEVBQUUsQ0FBQztvQkFDUixZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUIsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSyxJQUFNLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMvRCxPQUFPLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLLElBQU0sT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMzRixDQUFDO1lBQ04sQ0FBQyxDQUFDO1lBRUksU0FBUyxHQUFXLDZCQUE2QixDQUFDOztZQUNsRCxjQUFjLEdBQVk7Z0JBQzVCLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxTQUFTO2dCQUNsQixRQUFRLEVBQUUsS0FBSztnQkFDZixRQUFRLEVBQUUsVUFBVTtnQkFDcEIsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLFNBQVMsRUFBRSxHQUFHO2dCQUNkLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixNQUFNLEVBQUUsTUFBTTtnQkFDZCxR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QUFDLENBQUMsbUJBQW1CLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL25vZGVfbW9kdWxlcy9ncmFmYW5hLXNkay1tb2Nrcy9hcHAvaGVhZGVycy9jb21tb24uZC50c1wiIC8+XHJcblxyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7IENvbmZpZywgUGF0dGVybiB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2ludGVyZmFjZXNcIjtcclxuXHJcbmxldCBidWlsZE9wdGlvbk92ZXJyaWRlID0gZnVuY3Rpb24gKG86IGFueVtdLCBpOiBOdW1iZXIpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdGV4dDogU3RyaW5nKG9bMF0pLFxyXG4gICAgICAgIHByb3BlcnR5TmFtZTogU3RyaW5nKG9bMV0pLFxyXG4gICAgICAgIGluZGV4OiBpLFxyXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogU3RyaW5nKG9bM10pLFxyXG4gICAgICAgIHZhbHVlczogW10uY29uY2F0KG9bMl0pLm1hcCh2YWx1ZSA9PiB7IHJldHVybiBTdHJpbmdbdmFsdWVdOyB9KSxcclxuICAgICAgICBzdWJtZW51OiBbXS5jb25jYXQob1syXSkubWFwKHZhbHVlID0+IHsgcmV0dXJuIHsgdGV4dDogU3RyaW5nKHZhbHVlKSwgdmFsdWU6IHZhbHVlIH07IH0pXHJcbiAgICB9O1xyXG59O1xyXG5cclxuY29uc3QgcGx1Z2luX2lkOiBTdHJpbmcgPSBcInllc29yZXllcmFtLWJvb210YWJsZS1wYW5lbFwiO1xyXG5jb25zdCBkZWZhdWx0UGF0dGVybjogUGF0dGVybiA9IHtcclxuICAgIG5hbWU6IHVuZGVmaW5lZCxcclxuICAgIHBhdHRlcm46IHVuZGVmaW5lZCxcclxuICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgIHJvd19uYW1lOiBcIl9zZXJpZXNfXCIsXHJcbiAgICBjb2xfbmFtZTogXCJWYWx1ZVwiLFxyXG4gICAgZGVsaW1pdGVyOiBcIi5cIixcclxuICAgIHZhbHVlTmFtZTogXCJhdmdcIixcclxuICAgIGZvcm1hdDogXCJub25lXCIsXHJcbiAgICBkZWNpbWFsczogMixcclxuICAgIHRocmVzaG9sZHM6IFwiNzAsOTBcIixcclxuICAgIGVuYWJsZV9iZ0NvbG9yOiBmYWxzZSxcclxuICAgIGJnQ29sb3JzOiBcImdyZWVufG9yYW5nZXxyZWRcIixcclxuICAgIGVuYWJsZV9iZ0NvbG9yX292ZXJyaWRlczogZmFsc2UsXHJcbiAgICBiZ0NvbG9yc19vdmVycmlkZXM6IFwiMC0+Z3JlZW58Mi0+cmVkfDEtPnllbGxvd1wiLFxyXG4gICAgZW5hYmxlX1RleHRDb2xvcnM6IGZhbHNlLFxyXG4gICAgdGV4dENvbG9yczogXCJ3aGl0ZXx3aGl0ZXx3aGl0ZVwiLFxyXG4gICAgZW5hYmxlX1RleHRDb2xvcl9vdmVycmlkZXM6IGZhbHNlLFxyXG4gICAgdGV4dENvbG9yc19vdmVycmlkZXM6IFwiMC0+d2hpdGV8Mi0+d2hpdGV8MS0+d2hpdGVcIixcclxuICAgIGVuYWJsZV90cmFuc2Zvcm06IGZhbHNlLFxyXG4gICAgdHJhbnNmb3JtX3ZhbHVlczogXCJfdmFsdWVffF92YWx1ZV98X3ZhbHVlX1wiLFxyXG4gICAgZW5hYmxlX3RyYW5zZm9ybV9vdmVycmlkZXM6IGZhbHNlLFxyXG4gICAgdHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXM6IFwiMC0+ZG93bnwxLT51cFwiLFxyXG4gICAgZW5hYmxlX3RpbWVfYmFzZWRfdGhyZXNob2xkczogZmFsc2UsXHJcbiAgICB0aW1lX2Jhc2VkX3RocmVzaG9sZHM6IFtdLFxyXG4gICAgbnVsbF9jb2xvcjogXCJkYXJrcmVkXCIsXHJcbiAgICBudWxsX3RleHRfY29sb3I6IFwid2hpdGVcIixcclxuICAgIG51bGxfdmFsdWU6IFwiTm8gZGF0YVwiLFxyXG4gICAgZW5hYmxlX2NsaWNrYWJsZV9jZWxsczogZmFsc2UsXHJcbiAgICBjbGlja2FibGVfY2VsbHNfbGluazogXCJcIixcclxuICAgIGZpbHRlcjoge1xyXG4gICAgICAgIHZhbHVlX2JlbG93OiBcIlwiLFxyXG4gICAgICAgIHZhbHVlX2Fib3ZlOiBcIlwiXHJcbiAgICB9XHJcbn07XHJcbmNvbnN0IGNvbmZpZzogQ29uZmlnID0ge1xyXG4gICAgcGx1Z2luX2lkOiBwbHVnaW5faWQsXHJcbiAgICBkZWJ1Z19tb2RlOiBmYWxzZSxcclxuICAgIGVycm9yOiB1bmRlZmluZWQsXHJcbiAgICBvcHRpb25PdmVycmlkZXM6IFtdLFxyXG4gICAgcGFuZWxEZWZhdWx0czoge1xyXG4gICAgICAgIGN1cnJlbnRPcHRpb25PdmVycmlkZXM6IFtdLFxyXG4gICAgICAgIHBhdHRlcm5zOiBbXSxcclxuICAgICAgICBkZWZhdWx0UGF0dGVybjogZGVmYXVsdFBhdHRlcm4sXHJcbiAgICAgICAgYWN0aXZlUGF0dGVybkluZGV4OiAtMSxcclxuICAgICAgICByb3dfY29sX3dyYXBwZXI6IFwiX1wiLFxyXG4gICAgICAgIG5vX21hdGNoX3RleHQ6IFwiTi9BXCIsXHJcbiAgICAgICAgZGVmYXVsdF90aXRsZV9mb3Jfcm93czogXCJNZXRyaWNcIlxyXG4gICAgfSxcclxuICAgIHZhbHVlTmFtZU9wdGlvbnM6IFt7XHJcbiAgICAgICAgdmFsdWU6IFwibWluXCIsXHJcbiAgICAgICAgdGV4dDogXCJNaW5cIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB2YWx1ZTogXCJtYXhcIixcclxuICAgICAgICB0ZXh0OiBcIk1heFwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHZhbHVlOiBcImF2Z1wiLFxyXG4gICAgICAgIHRleHQ6IFwiQXZlcmFnZVwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHZhbHVlOiBcImN1cnJlbnRcIixcclxuICAgICAgICB0ZXh0OiBcIkN1cnJlbnRcIlxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICB2YWx1ZTogXCJ0b3RhbFwiLFxyXG4gICAgICAgIHRleHQ6IFwiVG90YWxcIlxyXG4gICAgfVxyXG4gICAgXSxcclxufTtcclxuXHJcbmNvbmZpZy5vcHRpb25PdmVycmlkZXMucHVzaChidWlsZE9wdGlvbk92ZXJyaWRlKFtcIlRleHQgYWxpZ25tZW50IGhlYWRlclwiLCBcIlRFWFRfQUxJR05fVEFCTEVfSEVBREVSXCIsIFtcImxlZnRcIiwgXCJyaWdodFwiLCBcImNlbnRlclwiXSwgXCJsZWZ0XCJdLCAwKSk7XHJcbmNvbmZpZy5vcHRpb25PdmVycmlkZXMucHVzaChidWlsZE9wdGlvbk92ZXJyaWRlKFtcIlRleHQgYWxpZ25tZW50IGZpcnN0IGNvbHVtblwiLCBcIlRFWFRfQUxJR05fRklSU1RfQ09MVU1OXCIsIFtcImxlZnRcIiwgXCJyaWdodFwiLCBcImNlbnRlclwiXSwgXCJsZWZ0XCJdLCAxKSk7XHJcbmNvbmZpZy5vcHRpb25PdmVycmlkZXMucHVzaChidWlsZE9wdGlvbk92ZXJyaWRlKFtcIlRleHQgYWxpZ25tZW50IHRhYmxlIGNlbGxzXCIsIFwiVEVYVF9BTElHTl9UQUJMRV9DRUxMU1wiLCBbXCJsZWZ0XCIsIFwicmlnaHRcIiwgXCJjZW50ZXJcIl0sIFwibGVmdFwiXSwgMikpO1xyXG5jb25maWcub3B0aW9uT3ZlcnJpZGVzLnB1c2goYnVpbGRPcHRpb25PdmVycmlkZShbXCJIaWRlIEhlYWRlcnNcIiwgXCJISURFX0hFQURFUlNcIiwgW1wiZmFsc2VcIiwgXCJ0cnVlXCJdLCBcImZhbHNlXCJdLCAzKSk7XHJcbmNvbmZpZy5vcHRpb25PdmVycmlkZXMucHVzaChidWlsZE9wdGlvbk92ZXJyaWRlKFtcIkhpZGUgZmlyc3QgY29sdW1uXCIsIFwiSElERV9GSVJTVF9DT0xVTU5cIiwgW1wiZmFsc2VcIiwgXCJ0cnVlXCJdLCBcImZhbHNlXCJdLCA0KSk7XHJcblxyXG5leHBvcnQge1xyXG4gICAgcGx1Z2luX2lkLFxyXG4gICAgY29uZmlnXHJcbn07XHJcbiJdfQ==