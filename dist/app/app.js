System.register(["./BoomTablePattern"], function (exports_1, context_1) {
    "use strict";
    var BoomTablePattern_1, defaultPattern;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (BoomTablePattern_1_1) {
                BoomTablePattern_1 = BoomTablePattern_1_1;
            }
        ],
        execute: function () {
            defaultPattern = new BoomTablePattern_1.BoomTablePattern({
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
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7WUFFTSxjQUFjLEdBQUcsSUFBSSxtQ0FBZ0IsQ0FBQztnQkFDeEMsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsa0JBQWtCLEVBQUUsMkJBQTJCO2dCQUMvQyxvQkFBb0IsRUFBRSxFQUFFO2dCQUN4QixRQUFRLEVBQUUsT0FBTztnQkFDakIsUUFBUSxFQUFFLENBQUM7Z0JBQ1gsU0FBUyxFQUFFLEdBQUc7Z0JBQ2QsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsSUFBSSxFQUFFLGlCQUFpQjtnQkFDdkIsVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixPQUFPLEVBQUUsR0FBRztnQkFDWixRQUFRLEVBQUUsVUFBVTtnQkFDcEIsVUFBVSxFQUFFLE9BQU87Z0JBQ25CLHFCQUFxQixFQUFFLEVBQUU7Z0JBQ3pCLGdCQUFnQixFQUFFLHlCQUF5QjtnQkFDM0MsMEJBQTBCLEVBQUUsZUFBZTtnQkFDM0MsU0FBUyxFQUFFLEtBQUs7YUFDbkIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm9vbVRhYmxlUGF0dGVybiB9IGZyb20gJy4vQm9vbVRhYmxlUGF0dGVybic7XG5cbmNvbnN0IGRlZmF1bHRQYXR0ZXJuID0gbmV3IEJvb21UYWJsZVBhdHRlcm4oe1xuICAgIGJnQ29sb3JzOiBcImdyZWVufG9yYW5nZXxyZWRcIixcbiAgICBiZ0NvbG9yc19vdmVycmlkZXM6IFwiMC0+Z3JlZW58Mi0+cmVkfDEtPnllbGxvd1wiLFxuICAgIGNsaWNrYWJsZV9jZWxsc19saW5rOiBcIlwiLFxuICAgIGNvbF9uYW1lOiBcIlZhbHVlXCIsXG4gICAgZGVjaW1hbHM6IDIsXG4gICAgZGVsaW1pdGVyOiBcIi5cIixcbiAgICBmb3JtYXQ6IFwibm9uZVwiLFxuICAgIG5hbWU6IFwiRGVmYXVsdCBQYXR0ZXJuXCIsXG4gICAgbnVsbF9jb2xvcjogXCJkYXJrcmVkXCIsXG4gICAgbnVsbF92YWx1ZTogXCJObyBkYXRhXCIsXG4gICAgcGF0dGVybjogXCIqXCIsXG4gICAgcm93X25hbWU6IFwiX3Nlcmllc19cIixcbiAgICB0aHJlc2hvbGRzOiBcIjcwLDkwXCIsXG4gICAgdGltZV9iYXNlZF90aHJlc2hvbGRzOiBbXSxcbiAgICB0cmFuc2Zvcm1fdmFsdWVzOiBcIl92YWx1ZV98X3ZhbHVlX3xfdmFsdWVfXCIsXG4gICAgdHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXM6IFwiMC0+ZG93bnwxLT51cFwiLFxuICAgIHZhbHVlTmFtZTogXCJhdmdcIlxufSk7XG5cbmV4cG9ydCB7XG4gICAgZGVmYXVsdFBhdHRlcm5cbn07XG4iXX0=