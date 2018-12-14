System.register(["lodash", "./utils", "./config", "./seriesHandler", "./renderer"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, utils, config_1, seriesHandler_1, renderer, computeRenderingData, getOptionOverride;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (utils_1) {
                utils = utils_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (seriesHandler_1_1) {
                seriesHandler_1 = seriesHandler_1_1;
            },
            function (renderer_1) {
                renderer = renderer_1;
            }
        ],
        execute: function () {
            computeRenderingData = function (data, patterns, defaultPattern, panelOptions, rendering_options, debug_mode) {
                var returnData = {
                    error: undefined,
                    output_html: {
                        header: "",
                        body: "",
                        footer: "",
                        debug: "",
                    }
                };
                if (data && data.length > 0 && lodash_1.default.filter(data, function (d) { return d.type && d.type === "table"; }).length > 0) {
                    returnData.error = utils.buildError("Only timeseries data supported", "Only timeseries data supported");
                }
                else if (data) {
                    var metricsReceived_1 = utils.getFields(data, "target");
                    if (utils.hasDuplicates(metricsReceived_1)) {
                        var duplicateKeys = lodash_1.default.uniq(metricsReceived_1.filter(function (v) {
                            return metricsReceived_1.filter(function (t) { return t === v; }).length > 1;
                        }));
                        returnData.error = utils.buildError("Duplicate series found", "Duplicate series : <br/> " + duplicateKeys.join("<br/> "));
                    }
                    else {
                        returnData.error = undefined;
                        var mydata = data.map(seriesHandler_1.defaultHandler.bind(data));
                        var dataComputed = seriesHandler_1.compute(mydata, defaultPattern, patterns, panelOptions.row_col_wrapper);
                        var rows_found = utils.getFields(dataComputed, "row_name");
                        var cols_found = utils.getFields(dataComputed, "col_name");
                        var keys_found_1 = utils.getFields(dataComputed, "key_name");
                        if (utils.hasDuplicates(keys_found_1)) {
                            var duplicateKeys = lodash_1.default.uniq(keys_found_1.filter(function (v) {
                                return keys_found_1.filter(function (t) { return t === v; }).length > 1;
                            }));
                            returnData.error = utils.buildError("Duplicate keys found", "Duplicate key values : <br/> " + duplicateKeys.join("<br/> "));
                        }
                        else if (utils.isUniqueArray(keys_found_1)) {
                            returnData.error = undefined;
                            var output = renderer.buildOutputData(dataComputed, rows_found, cols_found, defaultPattern, {
                                no_match_text: panelOptions.no_match_text
                            });
                            var _a = renderer.buildOutput(output, cols_found, rendering_options), header = _a.header, body = _a.body, footer = _a.footer;
                            returnData.output_html.header = String(header);
                            returnData.output_html.body = String(body);
                            returnData.output_html.footer = String(footer);
                        }
                        if (debug_mode) {
                            returnData.output_html.debug = String(renderer.buildDebugOutput(dataComputed));
                        }
                    }
                }
                return returnData;
            };
            exports_1("computeRenderingData", computeRenderingData);
            getOptionOverride = function (currentOptionOverrides, propertyName) {
                var option = lodash_1.default.find(currentOptionOverrides, function (o) { return o.propertyName === propertyName; });
                var default_option = lodash_1.default.find(config_1.config.optionOverrides, function (o) { return o.propertyName === propertyName; });
                if (option) {
                    return option.value;
                }
                else {
                    return default_option.defaultValue;
                }
            };
            exports_1("getOptionOverride", getOptionOverride);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFVTSxvQkFBb0IsR0FBRyxVQUFVLElBQVMsRUFBRSxRQUFtQixFQUFFLGNBQXVCLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLFVBQW1CO2dCQUNoSixJQUFJLFVBQVUsR0FBRztvQkFDYixLQUFLLEVBQUUsU0FBUztvQkFDaEIsV0FBVyxFQUFFO3dCQUNULE1BQU0sRUFBRSxFQUFFO3dCQUNWLElBQUksRUFBRSxFQUFFO3dCQUNSLE1BQU0sRUFBRSxFQUFFO3dCQUNWLEtBQUssRUFBRSxFQUFFO3FCQUNaO2lCQUNKLENBQUM7Z0JBQ0YsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksZ0JBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFVBQUEsQ0FBQyxJQUFNLE9BQU8sQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3JHLFVBQVUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxnQ0FBZ0MsRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDO2lCQUMzRztxQkFBTSxJQUFJLElBQUksRUFBRTtvQkFDYixJQUFJLGlCQUFlLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ3RELElBQUksS0FBSyxDQUFDLGFBQWEsQ0FBQyxpQkFBZSxDQUFDLEVBQUU7d0JBQ3RDLElBQUksYUFBYSxHQUFHLGdCQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFlLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQzs0QkFDL0MsT0FBTyxpQkFBZSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFB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LENBQUMsSUFBSSxDQUFDLGVBQU0sQ0FBQyxlQUFlLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsWUFBWSxLQUFLLFlBQVksRUFBL0IsQ0FBK0IsQ0FBQyxDQUFDO2dCQUMxRixJQUFJLE1BQU0sRUFBRTtvQkFDUixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUM7aUJBQ3ZCO3FCQUFNO29CQUNILE9BQU8sY0FBYyxDQUFDLFlBQVksQ0FBQztpQkFDdEM7WUFDTCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9ub2RlX21vZHVsZXMvZ3JhZmFuYS1zZGstbW9ja3MvYXBwL2hlYWRlcnMvY29tbW9uLmQudHNcIiAvPlxyXG5cclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiLi91dGlsc1wiO1xyXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHsgUGF0dGVybiB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2ludGVyZmFjZXNcIjtcclxuaW1wb3J0IHsgY29tcHV0ZSwgZGVmYXVsdEhhbmRsZXIgfSBmcm9tIFwiLi9zZXJpZXNIYW5kbGVyXCI7XHJcbmltcG9ydCAqIGFzIHJlbmRlcmVyIGZyb20gXCIuL3JlbmRlcmVyXCI7XHJcblxyXG5cclxuY29uc3QgY29tcHV0ZVJlbmRlcmluZ0RhdGEgPSBmdW5jdGlvbiAoZGF0YTogYW55LCBwYXR0ZXJuczogUGF0dGVybltdLCBkZWZhdWx0UGF0dGVybjogUGF0dGVybiwgcGFuZWxPcHRpb25zLCByZW5kZXJpbmdfb3B0aW9ucywgZGVidWdfbW9kZTogYm9vbGVhbikge1xyXG4gICAgbGV0IHJldHVybkRhdGEgPSB7XHJcbiAgICAgICAgZXJyb3I6IHVuZGVmaW5lZCxcclxuICAgICAgICBvdXRwdXRfaHRtbDoge1xyXG4gICAgICAgICAgICBoZWFkZXI6IFwiXCIsXHJcbiAgICAgICAgICAgIGJvZHk6IFwiXCIsXHJcbiAgICAgICAgICAgIGZvb3RlcjogXCJcIixcclxuICAgICAgICAgICAgZGVidWc6IFwiXCIsXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGlmIChkYXRhICYmIGRhdGEubGVuZ3RoID4gMCAmJiBfLmZpbHRlcihkYXRhLCBkID0+IHsgcmV0dXJuIGQudHlwZSAmJiBkLnR5cGUgPT09IFwidGFibGVcIjsgfSkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHJldHVybkRhdGEuZXJyb3IgPSB1dGlscy5idWlsZEVycm9yKGBPbmx5IHRpbWVzZXJpZXMgZGF0YSBzdXBwb3J0ZWRgLCBgT25seSB0aW1lc2VyaWVzIGRhdGEgc3VwcG9ydGVkYCk7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGEpIHtcclxuICAgICAgICBsZXQgbWV0cmljc1JlY2VpdmVkID0gdXRpbHMuZ2V0RmllbGRzKGRhdGEsIFwidGFyZ2V0XCIpO1xyXG4gICAgICAgIGlmICh1dGlscy5oYXNEdXBsaWNhdGVzKG1ldHJpY3NSZWNlaXZlZCkpIHtcclxuICAgICAgICAgICAgbGV0IGR1cGxpY2F0ZUtleXMgPSBfLnVuaXEobWV0cmljc1JlY2VpdmVkLmZpbHRlcih2ID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtZXRyaWNzUmVjZWl2ZWQuZmlsdGVyKHQgPT4gdCA9PT0gdikubGVuZ3RoID4gMTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICByZXR1cm5EYXRhLmVycm9yID0gdXRpbHMuYnVpbGRFcnJvcihgRHVwbGljYXRlIHNlcmllcyBmb3VuZGAsIGBEdXBsaWNhdGUgc2VyaWVzIDogPGJyLz4gJHtkdXBsaWNhdGVLZXlzLmpvaW4oXCI8YnIvPiBcIil9YCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuRGF0YS5lcnJvciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgbGV0IG15ZGF0YSA9IGRhdGEubWFwKGRlZmF1bHRIYW5kbGVyLmJpbmQoZGF0YSkpO1xyXG4gICAgICAgICAgICBsZXQgZGF0YUNvbXB1dGVkID0gY29tcHV0ZShteWRhdGEsIGRlZmF1bHRQYXR0ZXJuLCBwYXR0ZXJucywgcGFuZWxPcHRpb25zLnJvd19jb2xfd3JhcHBlcik7XHJcbiAgICAgICAgICAgIGxldCByb3dzX2ZvdW5kID0gdXRpbHMuZ2V0RmllbGRzKGRhdGFDb21wdXRlZCwgXCJyb3dfbmFtZVwiKTtcclxuICAgICAgICAgICAgbGV0IGNvbHNfZm91bmQgPSB1dGlscy5nZXRGaWVsZHMoZGF0YUNvbXB1dGVkLCBcImNvbF9uYW1lXCIpO1xyXG4gICAgICAgICAgICBsZXQga2V5c19mb3VuZCA9IHV0aWxzLmdldEZpZWxkcyhkYXRhQ29tcHV0ZWQsIFwia2V5X25hbWVcIik7XHJcbiAgICAgICAgICAgIGlmICh1dGlscy5oYXNEdXBsaWNhdGVzKGtleXNfZm91bmQpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZHVwbGljYXRlS2V5cyA9IF8udW5pcShrZXlzX2ZvdW5kLmZpbHRlcih2ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5c19mb3VuZC5maWx0ZXIodCA9PiB0ID09PSB2KS5sZW5ndGggPiAxO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuRGF0YS5lcnJvciA9IHV0aWxzLmJ1aWxkRXJyb3IoYER1cGxpY2F0ZSBrZXlzIGZvdW5kYCwgYER1cGxpY2F0ZSBrZXkgdmFsdWVzIDogPGJyLz4gJHtkdXBsaWNhdGVLZXlzLmpvaW4oXCI8YnIvPiBcIil9YCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNVbmlxdWVBcnJheShrZXlzX2ZvdW5kKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuRGF0YS5lcnJvciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIGxldCBvdXRwdXQgPSByZW5kZXJlci5idWlsZE91dHB1dERhdGEoZGF0YUNvbXB1dGVkLCByb3dzX2ZvdW5kLCBjb2xzX2ZvdW5kLCBkZWZhdWx0UGF0dGVybiwge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vX21hdGNoX3RleHQ6IHBhbmVsT3B0aW9ucy5ub19tYXRjaF90ZXh0XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGxldCB7IGhlYWRlciwgYm9keSwgZm9vdGVyIH0gPSByZW5kZXJlci5idWlsZE91dHB1dChvdXRwdXQsIGNvbHNfZm91bmQsIHJlbmRlcmluZ19vcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIHJldHVybkRhdGEub3V0cHV0X2h0bWwuaGVhZGVyID0gU3RyaW5nKGhlYWRlcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5EYXRhLm91dHB1dF9odG1sLmJvZHkgPSBTdHJpbmcoYm9keSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5EYXRhLm91dHB1dF9odG1sLmZvb3RlciA9IFN0cmluZyhmb290ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChkZWJ1Z19tb2RlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5EYXRhLm91dHB1dF9odG1sLmRlYnVnID0gU3RyaW5nKHJlbmRlcmVyLmJ1aWxkRGVidWdPdXRwdXQoZGF0YUNvbXB1dGVkKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0dXJuRGF0YTtcclxufTtcclxuY29uc3QgZ2V0T3B0aW9uT3ZlcnJpZGUgPSBmdW5jdGlvbiAoY3VycmVudE9wdGlvbk92ZXJyaWRlcywgcHJvcGVydHlOYW1lOiBTdHJpbmcpIHtcclxuICAgIGxldCBvcHRpb24gPSBfLmZpbmQoY3VycmVudE9wdGlvbk92ZXJyaWRlcywgbyA9PiBvLnByb3BlcnR5TmFtZSA9PT0gcHJvcGVydHlOYW1lKTtcclxuICAgIGxldCBkZWZhdWx0X29wdGlvbiA9IF8uZmluZChjb25maWcub3B0aW9uT3ZlcnJpZGVzLCBvID0+IG8ucHJvcGVydHlOYW1lID09PSBwcm9wZXJ0eU5hbWUpO1xyXG4gICAgaWYgKG9wdGlvbikge1xyXG4gICAgICAgIHJldHVybiBvcHRpb24udmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBkZWZhdWx0X29wdGlvbi5kZWZhdWx0VmFsdWU7XHJcbiAgICB9XHJcbn07XHJcbmV4cG9ydCB7XHJcbiAgICBjb21wdXRlUmVuZGVyaW5nRGF0YSxcclxuICAgIGdldE9wdGlvbk92ZXJyaWRlXHJcbn07XHJcbiJdfQ==