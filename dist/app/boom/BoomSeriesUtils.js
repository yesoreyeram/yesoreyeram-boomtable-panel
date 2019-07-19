System.register(["lodash", "./index"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, index_1, getDisplayValueTemplate, getThresholds, getBGColor, getTextColor, getSeriesValue, getLink, getCurrentTimeStamp, doesValueNeedsToHide, replaceDelimitedColumns, getRowName, getColName;
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
            exports_1("getDisplayValueTemplate", getDisplayValueTemplate = function (value, pattern, seriesName, row_col_wrapper, thresholds) {
                var template = "_value_";
                if (lodash_1.default.isNaN(value) || value === null) {
                    template = pattern.null_value || "No data";
                    if (pattern.null_value === "") {
                        template = "";
                    }
                }
                else {
                    template = pattern.displayTemplate || template;
                    if (pattern.enable_transform) {
                        var transform_values = pattern.transform_values.split("|");
                        template = index_1.getItemBasedOnThreshold(thresholds, transform_values, value, template);
                    }
                    if (pattern.enable_transform_overrides && pattern.transform_values_overrides !== "") {
                        var _transform_values_overrides = pattern.transform_values_overrides
                            .split("|")
                            .filter(function (con) { return con.indexOf("->"); })
                            .map(function (con) { return con.split("->"); })
                            .filter(function (con) { return +(con[0]) === value; })
                            .map(function (con) { return con[1]; });
                        if (_transform_values_overrides.length > 0 && _transform_values_overrides[0] !== "") {
                            template = ("" + _transform_values_overrides[0]).trim();
                        }
                    }
                    if (pattern.enable_transform || pattern.enable_transform_overrides) {
                        template = replaceDelimitedColumns(template, seriesName, pattern.delimiter, row_col_wrapper);
                    }
                }
                return template;
            });
            exports_1("getThresholds", getThresholds = function (thresholdsArray, pattern, currentTimeStamp) {
                if (pattern.enable_time_based_thresholds) {
                    var metricrecivedTimeStamp_1 = currentTimeStamp || new Date();
                    var metricrecivedTimeStamp_innumber_1 = metricrecivedTimeStamp_1.getHours() * 100 + metricrecivedTimeStamp_1.getMinutes();
                    var weekdays_1 = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
                    lodash_1.default.each(pattern.time_based_thresholds, function (tbtx) {
                        if (tbtx && tbtx.from && tbtx.to && tbtx.enabledDays &&
                            (metricrecivedTimeStamp_innumber_1 >= +(tbtx.from)) &&
                            (metricrecivedTimeStamp_innumber_1 <= +(tbtx.to)) &&
                            (tbtx.enabledDays.toLowerCase().indexOf(weekdays_1[metricrecivedTimeStamp_1.getDay()]) > -1) &&
                            tbtx.threshold) {
                            thresholdsArray = (tbtx.threshold + "").split(",").map(function (d) { return +d; });
                        }
                    });
                }
                return thresholdsArray;
            });
            exports_1("getBGColor", getBGColor = function (value, pattern, thresholds, list_of_bgColors_based_on_thresholds, bgColorOverRides) {
                var bgColor = "transparent";
                if (lodash_1.default.isNaN(value) || value === null) {
                    bgColor = pattern.null_color || "darkred";
                    if (pattern.null_color === "") {
                        bgColor = "transparent";
                    }
                }
                else {
                    bgColor = pattern.defaultBGColor || bgColor;
                    if (pattern.enable_bgColor && pattern.bgColors) {
                        bgColor = index_1.getItemBasedOnThreshold(thresholds, list_of_bgColors_based_on_thresholds, value, bgColor);
                    }
                    if (pattern.enable_bgColor_overrides && pattern.bgColors_overrides !== "") {
                        var _bgColors_overrides = bgColorOverRides.filter(function (con) { return con.indexOf("->"); }).map(function (con) { return con.split("->"); }).filter(function (con) { return +(con[0]) === value; }).map(function (con) { return con[1]; });
                        if (_bgColors_overrides.length > 0 && _bgColors_overrides[0] !== "") {
                            bgColor = ("" + _bgColors_overrides[0]).trim();
                        }
                    }
                }
                return index_1.normalizeColor(bgColor);
            });
            exports_1("getTextColor", getTextColor = function (value, pattern, thresholds, list_of_textColors_based_on_thresholds, txtColorOverrides) {
                var textColor = document.body.classList.contains("theme-light") ? "black" : "white";
                if (lodash_1.default.isNaN(value) || value === null) {
                    textColor = pattern.null_textcolor || textColor;
                }
                else {
                    textColor = pattern.defaultTextColor || textColor;
                    if (pattern.enable_textColor && pattern.textColors) {
                        textColor = index_1.getItemBasedOnThreshold(thresholds, list_of_textColors_based_on_thresholds, value, textColor);
                    }
                    if (pattern.enable_textColor_overrides && pattern.textColors_overrides !== "") {
                        var _textColors_overrides = txtColorOverrides.filter(function (con) { return con.indexOf("->"); }).map(function (con) { return con.split("->"); }).filter(function (con) { return +(con[0]) === value; }).map(function (con) { return con[1]; });
                        if (_textColors_overrides.length > 0 && _textColors_overrides[0] !== "") {
                            textColor = ("" + _textColors_overrides[0]).trim();
                        }
                    }
                }
                return index_1.normalizeColor(textColor);
            });
            exports_1("getSeriesValue", getSeriesValue = function (series, statType) {
                var value = NaN;
                if (statType === "last_time") {
                    if (lodash_1.default.last(series.datapoints)) {
                        value = lodash_1.default.last(series.datapoints)[1];
                    }
                }
                else if (statType === "last_time_nonnull") {
                    var non_null_data = series.datapoints.filter(function (s) { return s[0]; });
                    if (lodash_1.default.last(non_null_data) && lodash_1.default.last(non_null_data)[1]) {
                        value = lodash_1.default.last(non_null_data)[1];
                    }
                }
                else if (series.stats) {
                    value = series.stats[statType] || null;
                }
                return value;
            });
            exports_1("getLink", getLink = function (enable_clickable_cells, clickable_cells_link, range) {
                var link = enable_clickable_cells ? clickable_cells_link || "#" : "#";
                if (link !== "#") {
                    link += (link.indexOf("?") > -1 ? "&from=" + range.from : "?from=" + range.from);
                    link += "&to=" + range.to;
                }
                return link;
            });
            exports_1("getCurrentTimeStamp", getCurrentTimeStamp = function (dataPoints) {
                var currentTimeStamp = new Date();
                if (dataPoints && dataPoints.length > 0 && lodash_1.default.last(dataPoints).length === 2) {
                    currentTimeStamp = new Date(lodash_1.default.last(dataPoints)[1]);
                }
                return currentTimeStamp;
            });
            exports_1("doesValueNeedsToHide", doesValueNeedsToHide = function (value, pattern) {
                var hidden = false;
                if (value && pattern && pattern.filter && (pattern.filter.value_below !== "" || pattern.filter.value_above !== "")) {
                    if (pattern.filter.value_below !== "" && value < +(pattern.filter.value_below)) {
                        hidden = true;
                    }
                    if (pattern.filter.value_above !== "" && value > +(pattern.filter.value_above)) {
                        hidden = true;
                    }
                }
                return hidden;
            });
            exports_1("replaceDelimitedColumns", replaceDelimitedColumns = function (inputstring, seriesName, delimiter, row_col_wrapper) {
                var outputString = seriesName
                    .split(delimiter || ".")
                    .reduce(function (r, it, i) {
                    return r.replace(new RegExp(row_col_wrapper + i + row_col_wrapper, "g"), it);
                }, inputstring);
                return outputString;
            });
            exports_1("getRowName", getRowName = function (pattern, row_col_wrapper, seriesName, _metricname, _tags) {
                var row_name = pattern.row_name;
                if (pattern.delimiter.toLowerCase() === "tag") {
                    row_name = row_name.replace(new RegExp("{{metric_name}}", "g"), _metricname);
                    row_name = index_1.replace_tags_from_field(row_name, _tags);
                }
                else {
                    row_name = replaceDelimitedColumns(row_name, seriesName, pattern.delimiter, row_col_wrapper);
                    if (seriesName.split(pattern.delimiter || ".").length === 1) {
                        row_name = seriesName;
                    }
                }
                return row_name.replace(new RegExp("_series_", "g"), seriesName.toString());
            });
            exports_1("getColName", getColName = function (pattern, row_col_wrapper, seriesName, row_name, _metricname, _tags) {
                var col_name = pattern.col_name;
                if (pattern.delimiter.toLowerCase() === "tag") {
                    col_name = col_name.replace(new RegExp("{{metric_name}}", "g"), _metricname);
                    row_name = index_1.replace_tags_from_field(col_name, _tags);
                }
                else {
                    col_name = replaceDelimitedColumns(col_name, seriesName, pattern.delimiter, row_col_wrapper);
                    if (seriesName.split(pattern.delimiter || ".").length === 1 || row_name === seriesName) {
                        col_name = pattern.col_name || "Value";
                    }
                }
                return col_name.replace(new RegExp("_series_", "g"), seriesName.toString());
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbVNlcmllc1V0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9ib29tL0Jvb21TZXJpZXNVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztZQUtBLHFDQUFXLHVCQUF1QixHQUFHLFVBQVUsS0FBYSxFQUFFLE9BQXFCLEVBQUUsVUFBa0IsRUFBRSxlQUF1QixFQUFFLFVBQWlCO2dCQUMvSSxJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUM7Z0JBQ3pCLElBQUksZ0JBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtvQkFDbEMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxVQUFVLElBQUksU0FBUyxDQUFDO29CQUMzQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEtBQUssRUFBRSxFQUFFO3dCQUMzQixRQUFRLEdBQUcsRUFBRSxDQUFDO3FCQUNqQjtpQkFDSjtxQkFBTTtvQkFDSCxRQUFRLEdBQUcsT0FBTyxDQUFDLGVBQWUsSUFBSSxRQUFRLENBQUM7b0JBQy9DLElBQUksT0FBTyxDQUFDLGdCQUFnQixFQUFFO3dCQUMxQixJQUFJLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQzNELFFBQVEsR0FBRywrQkFBdUIsQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO3FCQUNyRjtvQkFDRCxJQUFJLE9BQU8sQ0FBQywwQkFBMEIsSUFBSSxPQUFPLENBQUMsMEJBQTBCLEtBQUssRUFBRSxFQUFFO3dCQUNqRixJQUFJLDJCQUEyQixHQUFHLE9BQU8sQ0FBQywwQkFBMEI7NkJBQy9ELEtBQUssQ0FBQyxHQUFHLENBQUM7NkJBQ1YsTUFBTSxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBakIs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LCtCQUF1QixDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDdkQ7cUJBQU07b0JBQ0gsUUFBUSxHQUFHLHVCQUF1QixDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLFNBQVMsRUFBRSxlQUFlLENBQUMsQ0FBQztvQkFDN0YsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxRQUFRLEtBQUssVUFBVSxFQUFFO3dCQUNwRixRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUM7cUJBQzFDO2lCQUNKO2dCQUNELE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLEVBQUUsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDaEYsQ0FBQyxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5cclxuaW1wb3J0IHsgZ2V0SXRlbUJhc2VkT25UaHJlc2hvbGQsIG5vcm1hbGl6ZUNvbG9yLCByZXBsYWNlX3RhZ3NfZnJvbV9maWVsZCB9IGZyb20gXCIuL2luZGV4XCI7XHJcbmltcG9ydCB7IElCb29tUGF0dGVybiB9IGZyb20gXCIuL0Jvb20uaW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgbGV0IGdldERpc3BsYXlWYWx1ZVRlbXBsYXRlID0gZnVuY3Rpb24gKHZhbHVlOiBudW1iZXIsIHBhdHRlcm46IElCb29tUGF0dGVybiwgc2VyaWVzTmFtZTogc3RyaW5nLCByb3dfY29sX3dyYXBwZXI6IHN0cmluZywgdGhyZXNob2xkczogYW55W10pOiBzdHJpbmcge1xyXG4gICAgbGV0IHRlbXBsYXRlID0gXCJfdmFsdWVfXCI7XHJcbiAgICBpZiAoXy5pc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgICB0ZW1wbGF0ZSA9IHBhdHRlcm4ubnVsbF92YWx1ZSB8fCBcIk5vIGRhdGFcIjtcclxuICAgICAgICBpZiAocGF0dGVybi5udWxsX3ZhbHVlID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRlbXBsYXRlID0gcGF0dGVybi5kaXNwbGF5VGVtcGxhdGUgfHwgdGVtcGxhdGU7XHJcbiAgICAgICAgaWYgKHBhdHRlcm4uZW5hYmxlX3RyYW5zZm9ybSkge1xyXG4gICAgICAgICAgICBsZXQgdHJhbnNmb3JtX3ZhbHVlcyA9IHBhdHRlcm4udHJhbnNmb3JtX3ZhbHVlcy5zcGxpdChcInxcIik7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlID0gZ2V0SXRlbUJhc2VkT25UaHJlc2hvbGQodGhyZXNob2xkcywgdHJhbnNmb3JtX3ZhbHVlcywgdmFsdWUsIHRlbXBsYXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhdHRlcm4uZW5hYmxlX3RyYW5zZm9ybV9vdmVycmlkZXMgJiYgcGF0dGVybi50cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlcyAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICBsZXQgX3RyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzID0gcGF0dGVybi50cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlc1xyXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwifFwiKVxyXG4gICAgICAgICAgICAgICAgLmZpbHRlcihjb24gPT4gY29uLmluZGV4T2YoXCItPlwiKSlcclxuICAgICAgICAgICAgICAgIC5tYXAoY29uID0+IGNvbi5zcGxpdChcIi0+XCIpKVxyXG4gICAgICAgICAgICAgICAgLmZpbHRlcihjb24gPT4gKyhjb25bMF0pID09PSB2YWx1ZSlcclxuICAgICAgICAgICAgICAgIC5tYXAoY29uID0+IGNvblsxXSk7XHJcbiAgICAgICAgICAgIGlmIChfdHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXMubGVuZ3RoID4gMCAmJiBfdHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXNbMF0gIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlID0gKFwiXCIgKyBfdHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXNbMF0pLnRyaW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGF0dGVybi5lbmFibGVfdHJhbnNmb3JtIHx8IHBhdHRlcm4uZW5hYmxlX3RyYW5zZm9ybV9vdmVycmlkZXMpIHtcclxuICAgICAgICAgICAgdGVtcGxhdGUgPSByZXBsYWNlRGVsaW1pdGVkQ29sdW1ucyh0ZW1wbGF0ZSwgc2VyaWVzTmFtZSwgcGF0dGVybi5kZWxpbWl0ZXIsIHJvd19jb2xfd3JhcHBlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRlbXBsYXRlO1xyXG59O1xyXG5leHBvcnQgbGV0IGdldFRocmVzaG9sZHMgPSBmdW5jdGlvbiAodGhyZXNob2xkc0FycmF5OiBhbnlbXSwgcGF0dGVybjogSUJvb21QYXR0ZXJuLCBjdXJyZW50VGltZVN0YW1wOiBEYXRlKSB7XHJcbiAgICBpZiAocGF0dGVybi5lbmFibGVfdGltZV9iYXNlZF90aHJlc2hvbGRzKSB7XHJcbiAgICAgICAgbGV0IG1ldHJpY3JlY2l2ZWRUaW1lU3RhbXAgPSBjdXJyZW50VGltZVN0YW1wIHx8IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgbGV0IG1ldHJpY3JlY2l2ZWRUaW1lU3RhbXBfaW5udW1iZXIgPSBtZXRyaWNyZWNpdmVkVGltZVN0YW1wLmdldEhvdXJzKCkgKiAxMDAgKyBtZXRyaWNyZWNpdmVkVGltZVN0YW1wLmdldE1pbnV0ZXMoKTtcclxuICAgICAgICBsZXQgd2Vla2RheXMgPSBbXCJzdW5cIiwgXCJtb25cIiwgXCJ0dWVcIiwgXCJ3ZWRcIiwgXCJ0aHVcIiwgXCJmcmlcIiwgXCJzYXRcIl07XHJcbiAgICAgICAgXy5lYWNoKHBhdHRlcm4udGltZV9iYXNlZF90aHJlc2hvbGRzLCAodGJ0eCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGJ0eCAmJiB0YnR4LmZyb20gJiYgdGJ0eC50byAmJiB0YnR4LmVuYWJsZWREYXlzICYmXHJcbiAgICAgICAgICAgICAgICAobWV0cmljcmVjaXZlZFRpbWVTdGFtcF9pbm51bWJlciA+PSArKHRidHguZnJvbSkpICYmXHJcbiAgICAgICAgICAgICAgICAobWV0cmljcmVjaXZlZFRpbWVTdGFtcF9pbm51bWJlciA8PSArKHRidHgudG8pKSAmJlxyXG4gICAgICAgICAgICAgICAgKHRidHguZW5hYmxlZERheXMudG9Mb3dlckNhc2UoKS5pbmRleE9mKHdlZWtkYXlzW21ldHJpY3JlY2l2ZWRUaW1lU3RhbXAuZ2V0RGF5KCldKSA+IC0xKSAmJlxyXG4gICAgICAgICAgICAgICAgdGJ0eC50aHJlc2hvbGRcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJlc2hvbGRzQXJyYXkgPSAodGJ0eC50aHJlc2hvbGQgKyBcIlwiKS5zcGxpdChcIixcIikubWFwKGQgPT4gK2QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhyZXNob2xkc0FycmF5O1xyXG59O1xyXG5leHBvcnQgbGV0IGdldEJHQ29sb3IgPSBmdW5jdGlvbiAodmFsdWU6IG51bWJlciwgcGF0dGVybjogSUJvb21QYXR0ZXJuLCB0aHJlc2hvbGRzOiBhbnlbXSwgbGlzdF9vZl9iZ0NvbG9yc19iYXNlZF9vbl90aHJlc2hvbGRzOiBzdHJpbmdbXSwgYmdDb2xvck92ZXJSaWRlczogc3RyaW5nW10pOiBzdHJpbmcge1xyXG4gICAgbGV0IGJnQ29sb3IgPSBcInRyYW5zcGFyZW50XCI7XHJcbiAgICBpZiAoXy5pc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgICBiZ0NvbG9yID0gcGF0dGVybi5udWxsX2NvbG9yIHx8IFwiZGFya3JlZFwiO1xyXG4gICAgICAgIGlmIChwYXR0ZXJuLm51bGxfY29sb3IgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgYmdDb2xvciA9IFwidHJhbnNwYXJlbnRcIjtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGJnQ29sb3IgPSBwYXR0ZXJuLmRlZmF1bHRCR0NvbG9yIHx8IGJnQ29sb3I7XHJcbiAgICAgICAgaWYgKHBhdHRlcm4uZW5hYmxlX2JnQ29sb3IgJiYgcGF0dGVybi5iZ0NvbG9ycykge1xyXG4gICAgICAgICAgICBiZ0NvbG9yID0gZ2V0SXRlbUJhc2VkT25UaHJlc2hvbGQodGhyZXNob2xkcywgbGlzdF9vZl9iZ0NvbG9yc19iYXNlZF9vbl90aHJlc2hvbGRzLCB2YWx1ZSwgYmdDb2xvcik7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGF0dGVybi5lbmFibGVfYmdDb2xvcl9vdmVycmlkZXMgJiYgcGF0dGVybi5iZ0NvbG9yc19vdmVycmlkZXMgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgbGV0IF9iZ0NvbG9yc19vdmVycmlkZXMgPSBiZ0NvbG9yT3ZlclJpZGVzLmZpbHRlcihjb24gPT4gY29uLmluZGV4T2YoXCItPlwiKSkubWFwKGNvbiA9PiBjb24uc3BsaXQoXCItPlwiKSkuZmlsdGVyKGNvbiA9PiArKGNvblswXSkgPT09IHZhbHVlKS5tYXAoY29uID0+IGNvblsxXSk7XHJcbiAgICAgICAgICAgIGlmIChfYmdDb2xvcnNfb3ZlcnJpZGVzLmxlbmd0aCA+IDAgJiYgX2JnQ29sb3JzX292ZXJyaWRlc1swXSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgYmdDb2xvciA9IChcIlwiICsgX2JnQ29sb3JzX292ZXJyaWRlc1swXSkudHJpbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5vcm1hbGl6ZUNvbG9yKGJnQ29sb3IpO1xyXG59O1xyXG5leHBvcnQgbGV0IGdldFRleHRDb2xvciA9IGZ1bmN0aW9uICh2YWx1ZTogbnVtYmVyLCBwYXR0ZXJuOiBJQm9vbVBhdHRlcm4sIHRocmVzaG9sZHMsIGxpc3Rfb2ZfdGV4dENvbG9yc19iYXNlZF9vbl90aHJlc2hvbGRzOiBzdHJpbmcsIHR4dENvbG9yT3ZlcnJpZGVzOiBzdHJpbmdbXSk6IHN0cmluZyB7XHJcbiAgICBsZXQgdGV4dENvbG9yID0gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoXCJ0aGVtZS1saWdodFwiKSA/IFwiYmxhY2tcIiA6IFwid2hpdGVcIjtcclxuICAgIGlmIChfLmlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICAgIHRleHRDb2xvciA9IHBhdHRlcm4ubnVsbF90ZXh0Y29sb3IgfHwgdGV4dENvbG9yO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0ZXh0Q29sb3IgPSBwYXR0ZXJuLmRlZmF1bHRUZXh0Q29sb3IgfHwgdGV4dENvbG9yO1xyXG4gICAgICAgIGlmIChwYXR0ZXJuLmVuYWJsZV90ZXh0Q29sb3IgJiYgcGF0dGVybi50ZXh0Q29sb3JzKSB7XHJcbiAgICAgICAgICAgIHRleHRDb2xvciA9IGdldEl0ZW1CYXNlZE9uVGhyZXNob2xkKHRocmVzaG9sZHMsIGxpc3Rfb2ZfdGV4dENvbG9yc19iYXNlZF9vbl90aHJlc2hvbGRzLCB2YWx1ZSwgdGV4dENvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhdHRlcm4uZW5hYmxlX3RleHRDb2xvcl9vdmVycmlkZXMgJiYgcGF0dGVybi50ZXh0Q29sb3JzX292ZXJyaWRlcyAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICBsZXQgX3RleHRDb2xvcnNfb3ZlcnJpZGVzID0gdHh0Q29sb3JPdmVycmlkZXMuZmlsdGVyKGNvbiA9PiBjb24uaW5kZXhPZihcIi0+XCIpKS5tYXAoY29uID0+IGNvbi5zcGxpdChcIi0+XCIpKS5maWx0ZXIoY29uID0+ICsoY29uWzBdKSA9PT0gdmFsdWUpLm1hcChjb24gPT4gY29uWzFdKTtcclxuICAgICAgICAgICAgaWYgKF90ZXh0Q29sb3JzX292ZXJyaWRlcy5sZW5ndGggPiAwICYmIF90ZXh0Q29sb3JzX292ZXJyaWRlc1swXSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgdGV4dENvbG9yID0gKFwiXCIgKyBfdGV4dENvbG9yc19vdmVycmlkZXNbMF0pLnRyaW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBub3JtYWxpemVDb2xvcih0ZXh0Q29sb3IpO1xyXG59O1xyXG5leHBvcnQgbGV0IGdldFNlcmllc1ZhbHVlID0gZnVuY3Rpb24gKHNlcmllczogYW55LCBzdGF0VHlwZTogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgIGxldCB2YWx1ZSA9IE5hTjtcclxuICAgIGlmIChzdGF0VHlwZSA9PT0gXCJsYXN0X3RpbWVcIikge1xyXG4gICAgICAgIGlmIChfLmxhc3Qoc2VyaWVzLmRhdGFwb2ludHMpKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gXy5sYXN0KHNlcmllcy5kYXRhcG9pbnRzKVsxXTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHN0YXRUeXBlID09PSBcImxhc3RfdGltZV9ub25udWxsXCIpIHtcclxuICAgICAgICBsZXQgbm9uX251bGxfZGF0YSA9IHNlcmllcy5kYXRhcG9pbnRzLmZpbHRlcihzID0+IHNbMF0pO1xyXG4gICAgICAgIGlmIChfLmxhc3Qobm9uX251bGxfZGF0YSkgJiYgXy5sYXN0KG5vbl9udWxsX2RhdGEpWzFdKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gXy5sYXN0KG5vbl9udWxsX2RhdGEpWzFdO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoc2VyaWVzLnN0YXRzKSB7XHJcbiAgICAgICAgdmFsdWUgPSBzZXJpZXMuc3RhdHNbc3RhdFR5cGVdIHx8IG51bGw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn07XHJcbmV4cG9ydCBsZXQgZ2V0TGluayA9IGZ1bmN0aW9uIChlbmFibGVfY2xpY2thYmxlX2NlbGxzOiBib29sZWFuLCBjbGlja2FibGVfY2VsbHNfbGluazogc3RyaW5nLCByYW5nZTogYW55KTogc3RyaW5nIHtcclxuICAgIGxldCBsaW5rID0gZW5hYmxlX2NsaWNrYWJsZV9jZWxscyA/IGNsaWNrYWJsZV9jZWxsc19saW5rIHx8IFwiI1wiIDogXCIjXCI7XHJcbiAgICBpZiAobGluayAhPT0gXCIjXCIpIHtcclxuICAgICAgICBsaW5rICs9IChsaW5rLmluZGV4T2YoXCI/XCIpID4gLTEgPyBgJmZyb209JHtyYW5nZS5mcm9tfWAgOiBgP2Zyb209JHtyYW5nZS5mcm9tfWApO1xyXG4gICAgICAgIGxpbmsgKz0gYCZ0bz0ke3JhbmdlLnRvfWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGluaztcclxufTtcclxuZXhwb3J0IGxldCBnZXRDdXJyZW50VGltZVN0YW1wID0gZnVuY3Rpb24gKGRhdGFQb2ludHM6IGFueVtdKTogRGF0ZSB7XHJcbiAgICBsZXQgY3VycmVudFRpbWVTdGFtcCA9IG5ldyBEYXRlKCk7XHJcbiAgICBpZiAoZGF0YVBvaW50cyAmJiBkYXRhUG9pbnRzLmxlbmd0aCA+IDAgJiYgXy5sYXN0KGRhdGFQb2ludHMpLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgIGN1cnJlbnRUaW1lU3RhbXAgPSBuZXcgRGF0ZShfLmxhc3QoZGF0YVBvaW50cylbMV0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGN1cnJlbnRUaW1lU3RhbXA7XHJcbn07XHJcbmV4cG9ydCBsZXQgZG9lc1ZhbHVlTmVlZHNUb0hpZGUgPSBmdW5jdGlvbiAodmFsdWU6IG51bWJlciwgcGF0dGVybjogSUJvb21QYXR0ZXJuKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgaGlkZGVuID0gZmFsc2U7XHJcbiAgICBpZiAodmFsdWUgJiYgcGF0dGVybiAmJiBwYXR0ZXJuLmZpbHRlciAmJiAocGF0dGVybi5maWx0ZXIudmFsdWVfYmVsb3cgIT09IFwiXCIgfHwgcGF0dGVybi5maWx0ZXIudmFsdWVfYWJvdmUgIT09IFwiXCIpKSB7XHJcbiAgICAgICAgaWYgKHBhdHRlcm4uZmlsdGVyLnZhbHVlX2JlbG93ICE9PSBcIlwiICYmIHZhbHVlIDwgKyhwYXR0ZXJuLmZpbHRlci52YWx1ZV9iZWxvdykpIHtcclxuICAgICAgICAgICAgaGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhdHRlcm4uZmlsdGVyLnZhbHVlX2Fib3ZlICE9PSBcIlwiICYmIHZhbHVlID4gKyhwYXR0ZXJuLmZpbHRlci52YWx1ZV9hYm92ZSkpIHtcclxuICAgICAgICAgICAgaGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaGlkZGVuO1xyXG59O1xyXG5leHBvcnQgbGV0IHJlcGxhY2VEZWxpbWl0ZWRDb2x1bW5zID0gZnVuY3Rpb24gKGlucHV0c3RyaW5nOiBzdHJpbmcsIHNlcmllc05hbWU6IHN0cmluZywgZGVsaW1pdGVyOiBzdHJpbmcsIHJvd19jb2xfd3JhcHBlcjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGxldCBvdXRwdXRTdHJpbmcgPSBzZXJpZXNOYW1lXHJcbiAgICAgICAgLnNwbGl0KGRlbGltaXRlciB8fCBcIi5cIilcclxuICAgICAgICAucmVkdWNlKChyLCBpdCwgaSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gci5yZXBsYWNlKG5ldyBSZWdFeHAocm93X2NvbF93cmFwcGVyICsgaSArIHJvd19jb2xfd3JhcHBlciwgXCJnXCIpLCBpdCk7XHJcbiAgICAgICAgfSwgaW5wdXRzdHJpbmcpO1xyXG4gICAgcmV0dXJuIG91dHB1dFN0cmluZztcclxufTtcclxuZXhwb3J0IGxldCBnZXRSb3dOYW1lID0gZnVuY3Rpb24gKHBhdHRlcm46IElCb29tUGF0dGVybiwgcm93X2NvbF93cmFwcGVyOiBzdHJpbmcsIHNlcmllc05hbWU6IHN0cmluZywgX21ldHJpY25hbWU6IHN0cmluZywgX3RhZ3M6IGFueVtdKTogc3RyaW5nIHtcclxuICAgIGxldCByb3dfbmFtZSA9IHBhdHRlcm4ucm93X25hbWU7XHJcbiAgICBpZiAocGF0dGVybi5kZWxpbWl0ZXIudG9Mb3dlckNhc2UoKSA9PT0gXCJ0YWdcIikge1xyXG4gICAgICAgIHJvd19uYW1lID0gcm93X25hbWUucmVwbGFjZShuZXcgUmVnRXhwKFwie3ttZXRyaWNfbmFtZX19XCIsIFwiZ1wiKSwgX21ldHJpY25hbWUpO1xyXG4gICAgICAgIHJvd19uYW1lID0gcmVwbGFjZV90YWdzX2Zyb21fZmllbGQocm93X25hbWUsIF90YWdzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcm93X25hbWUgPSByZXBsYWNlRGVsaW1pdGVkQ29sdW1ucyhyb3dfbmFtZSwgc2VyaWVzTmFtZSwgcGF0dGVybi5kZWxpbWl0ZXIsIHJvd19jb2xfd3JhcHBlcik7XHJcbiAgICAgICAgaWYgKHNlcmllc05hbWUuc3BsaXQocGF0dGVybi5kZWxpbWl0ZXIgfHwgXCIuXCIpLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICByb3dfbmFtZSA9IHNlcmllc05hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJvd19uYW1lLnJlcGxhY2UobmV3IFJlZ0V4cChcIl9zZXJpZXNfXCIsIFwiZ1wiKSwgc2VyaWVzTmFtZS50b1N0cmluZygpKTtcclxufTtcclxuZXhwb3J0IGxldCBnZXRDb2xOYW1lID0gZnVuY3Rpb24gKHBhdHRlcm46IElCb29tUGF0dGVybiwgcm93X2NvbF93cmFwcGVyOiBzdHJpbmcsIHNlcmllc05hbWU6IHN0cmluZywgcm93X25hbWU6IHN0cmluZywgX21ldHJpY25hbWU6IHN0cmluZywgX3RhZ3M6IGFueVtdKTogc3RyaW5nIHtcclxuICAgIGxldCBjb2xfbmFtZSA9IHBhdHRlcm4uY29sX25hbWU7XHJcbiAgICBpZiAocGF0dGVybi5kZWxpbWl0ZXIudG9Mb3dlckNhc2UoKSA9PT0gXCJ0YWdcIikge1xyXG4gICAgICAgIGNvbF9uYW1lID0gY29sX25hbWUucmVwbGFjZShuZXcgUmVnRXhwKFwie3ttZXRyaWNfbmFtZX19XCIsIFwiZ1wiKSwgX21ldHJpY25hbWUpO1xyXG4gICAgICAgIHJvd19uYW1lID0gcmVwbGFjZV90YWdzX2Zyb21fZmllbGQoY29sX25hbWUsIF90YWdzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29sX25hbWUgPSByZXBsYWNlRGVsaW1pdGVkQ29sdW1ucyhjb2xfbmFtZSwgc2VyaWVzTmFtZSwgcGF0dGVybi5kZWxpbWl0ZXIsIHJvd19jb2xfd3JhcHBlcik7XHJcbiAgICAgICAgaWYgKHNlcmllc05hbWUuc3BsaXQocGF0dGVybi5kZWxpbWl0ZXIgfHwgXCIuXCIpLmxlbmd0aCA9PT0gMSB8fCByb3dfbmFtZSA9PT0gc2VyaWVzTmFtZSkge1xyXG4gICAgICAgICAgICBjb2xfbmFtZSA9IHBhdHRlcm4uY29sX25hbWUgfHwgXCJWYWx1ZVwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjb2xfbmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfc2VyaWVzX1wiLCBcImdcIiksIHNlcmllc05hbWUudG9TdHJpbmcoKSk7XHJcbn07XHJcbiJdfQ==