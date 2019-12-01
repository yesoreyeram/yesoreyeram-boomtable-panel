System.register(["lodash"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, normalizeColor, parseMath, parseMathExpression, getColor, replaceTokens, getActualNameWithoutTokens, getItemBasedOnThreshold, getMetricNameFromTaggedAlias, getLablesFromTaggedAlias, replace_tags_from_field, getSeriesValue, getCurrentTimeStamp, replaceDelimitedColumns, getRowName, getColName, getDisplayValueTemplate;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }
        ],
        execute: function () {
            exports_1("normalizeColor", normalizeColor = function (color) {
                if (color.toLowerCase() === "green") {
                    return "rgba(50, 172, 45, 0.97)";
                }
                else if (color.toLowerCase() === "orange") {
                    return "rgba(237, 129, 40, 0.89)";
                }
                else if (color.toLowerCase() === "red") {
                    return "rgba(245, 54, 54, 0.9)";
                }
                else {
                    return color.trim();
                }
            });
            exports_1("parseMath", parseMath = function (valuestring) {
                var returnvalue = 0;
                if (valuestring.indexOf("+") > -1) {
                    returnvalue = +(valuestring.split("+")[0]) + +(valuestring.split("+")[1]);
                }
                else if (valuestring.indexOf("-") > -1) {
                    returnvalue = +(valuestring.split("-")[0]) - +(valuestring.split("-")[1]);
                }
                else if (valuestring.indexOf("*") > -1) {
                    returnvalue = +(valuestring.split("*")[0]) * +(valuestring.split("*")[1]);
                }
                else if (valuestring.indexOf("/") > -1) {
                    returnvalue = +(valuestring.split("/")[0]) / +(valuestring.split("/")[1]);
                }
                else if (valuestring.indexOf("min") > -1) {
                    returnvalue = lodash_1.default.min([+(valuestring.split("min")[0]), +(valuestring.split("min")[1])]) || 0;
                }
                else if (valuestring.indexOf("max") > -1) {
                    returnvalue = lodash_1.default.max([+(valuestring.split("max")[0]), +(valuestring.split("max")[1])]) || 0;
                }
                else if (valuestring.indexOf("mean") > -1) {
                    returnvalue = lodash_1.default.mean([+(valuestring.split("avg")[0]), +(valuestring.split("avg")[1])]) || 0;
                }
                else {
                    returnvalue = +(valuestring);
                }
                return Math.round(+returnvalue);
            });
            exports_1("parseMathExpression", parseMathExpression = function (expression, index) {
                var valuestring = expression.replace(/\_/g, "").split(",")[index];
                return +(parseMath(valuestring));
            });
            exports_1("getColor", getColor = function (expression, index) {
                var returnValue = (expression || "").split(",").length > index ? " style=\"color:" + normalizeColor(expression.replace(/\_/g, "").split(",")[index]) + "\" " : "";
                return returnValue;
            });
            exports_1("replaceTokens", replaceTokens = function (value) {
                if (!value) {
                    return value;
                }
                value = value + "";
                value = value.split(" ").map(function (a) {
                    if (a.startsWith("_fa-") && a.endsWith("_")) {
                        var returnvalue = "";
                        var icon = a.replace(/\_/g, "").split(",")[0];
                        var color = getColor(a, 1);
                        var repeatCount = a.split(",").length >= 3 ? parseMathExpression(a, 2) : 1;
                        returnvalue = ("<i class=\"fa " + icon + "\" " + color + "></i> ").repeat(repeatCount);
                        if (a.split(",").length >= 4) {
                            var maxColor = getColor(a, 3);
                            var maxLength = a.split(",").length >= 5 ? parseMathExpression(a, 4) : 0;
                            returnvalue += ("<i class=\"fa " + icon + "\" " + maxColor + "></i> ").repeat(lodash_1.default.max([maxLength - repeatCount, 0]) || 0);
                        }
                        return returnvalue;
                    }
                    else if (a.startsWith("_img-") && a.endsWith("_")) {
                        a = a.slice(0, -1);
                        var imgUrl = a.replace("_img-", "").split(",")[0];
                        var imgWidth = a.split(",").length > 1 ? a.replace("_img-", "").split(",")[1] : "20px";
                        var imgHeight = a.split(",").length > 2 ? a.replace("_img-", "").split(",")[2] : "20px";
                        var repeatCount = a.split(",").length > 3 ? +(a.replace("_img-", "").split(",")[3]) : 1;
                        a = ("<img width=\"" + imgWidth + "\" height=\"" + imgHeight + "\" src=\"" + imgUrl + "\"/>").repeat(repeatCount);
                    }
                    return a;
                }).join(" ");
                return value;
            });
            exports_1("getActualNameWithoutTokens", getActualNameWithoutTokens = function (value) {
                if (!value) {
                    return value + "";
                }
                value = value + "";
                return value.split(" ").map(function (a) {
                    if (a.startsWith("_fa-") && a.endsWith("_")) {
                        a = "";
                    }
                    else if (a.startsWith("_img-") && a.endsWith("_")) {
                        a = "";
                    }
                    return a;
                }).join(" ");
            });
            exports_1("getItemBasedOnThreshold", getItemBasedOnThreshold = function (thresholds, ranges, value, defaultValue) {
                var c = defaultValue;
                if (thresholds && ranges && typeof value === "number" && thresholds.length + 1 <= ranges.length) {
                    ranges = lodash_1.default.dropRight(ranges, ranges.length - thresholds.length - 1);
                    if (ranges[ranges.length - 1] === "") {
                        ranges[ranges.length - 1] = defaultValue;
                    }
                    for (var i = thresholds.length; i > 0; i--) {
                        if (value >= thresholds[i - 1]) {
                            return ranges[i];
                        }
                    }
                    return lodash_1.default.first(ranges) || "";
                }
                return c;
            });
            exports_1("getMetricNameFromTaggedAlias", getMetricNameFromTaggedAlias = function (target) {
                target = target.trim();
                var _metricname = target;
                if (target.indexOf("{") > -1 && target.indexOf("}") > -1 && target[target.length - 1] === "}") {
                    _metricname = target.split("{")[0].trim();
                }
                else {
                    _metricname = target;
                }
                return _metricname;
            });
            exports_1("getLablesFromTaggedAlias", getLablesFromTaggedAlias = function (target, label) {
                var _tags = [];
                target = target.trim();
                var tagsstring = target.replace(label, "").trim();
                if (tagsstring.startsWith("{") && tagsstring.endsWith("}")) {
                    var parsePrometheusLabels = function (labels) {
                        var labelsByKey = {};
                        labels.replace(/\b(\w+)(!?=~?)"([^"\n]*?)"/g, function (__, key, operator, value) {
                            if (!operator) {
                                console.log(operator);
                            }
                            labelsByKey[key] = value;
                            return '';
                        });
                        return labelsByKey;
                    };
                    lodash_1.default.each(parsePrometheusLabels(tagsstring), function (k, v) {
                        _tags.push({ tag: v, value: k });
                    });
                    if (tagsstring.indexOf(":") > -1 && _tags.length === 0) {
                        var label_values = tagsstring.slice(1).trim().slice(0, -1).trim() || "";
                        _tags = label_values
                            .split(",")
                            .map(function (item) { return (item || "").trim(); })
                            .filter(function (item) { return item && item.indexOf(":") > -1; })
                            .map(function (item) {
                            if (item.split(":").length === 2) {
                                var ret = {};
                                ret.tag = item.split(":")[0].trim();
                                ret.value = item.split(":")[1].trim();
                                return ret;
                            }
                            else {
                                return null;
                            }
                        })
                            .filter(function (item) { return item; });
                    }
                }
                return _tags;
            });
            exports_1("replace_tags_from_field", replace_tags_from_field = function (field, tags) {
                if (tags && tags.length > 0) {
                    field = tags.reduce(function (r, it) {
                        return r.replace(new RegExp("{{" + it.tag.trim() + "}}", "g"), it.value).replace(/\"/g, "");
                    }, field);
                }
                return field;
            });
            exports_1("getSeriesValue", getSeriesValue = function (series, statType) {
                var value = NaN;
                statType = (statType || "").toLowerCase();
                if (series) {
                    if (statType === "last_time" && series.datapoints && series.datapoints.length > 0) {
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
                }
                return value;
            });
            exports_1("getCurrentTimeStamp", getCurrentTimeStamp = function (dataPoints) {
                var currentTimeStamp = new Date();
                if (dataPoints && dataPoints.length > 0 && lodash_1.default.last(dataPoints).length === 2) {
                    currentTimeStamp = new Date(lodash_1.default.last(dataPoints)[1]);
                }
                return currentTimeStamp;
            });
            exports_1("replaceDelimitedColumns", replaceDelimitedColumns = function (inputstring, seriesName, delimiter, row_col_wrapper) {
                var outputString = seriesName
                    .split(delimiter || ".")
                    .reduce(function (r, it, i) {
                    return r.replace(new RegExp(row_col_wrapper + i + row_col_wrapper, "g"), it);
                }, inputstring);
                return outputString;
            });
            exports_1("getRowName", getRowName = function (row_name, delimiter, row_col_wrapper, seriesName, _metricname, _tags) {
                if (delimiter.toLowerCase() === "tag") {
                    row_name = row_name.replace(new RegExp("{{metric_name}}", "g"), _metricname);
                    row_name = replace_tags_from_field(row_name, _tags);
                }
                else {
                    row_name = replaceDelimitedColumns(row_name, seriesName, delimiter, row_col_wrapper);
                    if (seriesName.split(delimiter || ".").length === 1) {
                        row_name = seriesName;
                    }
                }
                return row_name.replace(new RegExp("_series_", "g"), seriesName.toString());
            });
            exports_1("getColName", getColName = function (col_name, delimiter, row_col_wrapper, seriesName, row_name, _metricname, _tags) {
                if (delimiter.toLowerCase() === "tag") {
                    col_name = col_name.replace(new RegExp("{{metric_name}}", "g"), _metricname);
                    row_name = replace_tags_from_field(col_name, _tags);
                }
                else {
                    col_name = replaceDelimitedColumns(col_name, seriesName, delimiter, row_col_wrapper);
                    console.log(col_name, row_name, seriesName);
                    if (seriesName.split(delimiter || ".").length === 1 || row_name === seriesName) {
                        col_name = col_name || "Value";
                    }
                }
                return col_name.replace(new RegExp("_series_", "g"), seriesName.toString());
            });
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
                        template = getItemBasedOnThreshold(thresholds, transform_values, value, template);
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
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbVV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9ib29tL0Jvb21VdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztZQUdBLDRCQUFhLGNBQWMsR0FBRyxVQUFVLEtBQWE7Z0JBQ2pELElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLE9BQU8sRUFBRTtvQkFDakMsT0FBTyx5QkFBeUIsQ0FBQztpQkFDcEM7cUJBQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssUUFBUSxFQUFFO29CQUN6QyxPQUFPLDBCQUEwQixDQUFDO2lCQUNyQztxQkFBTSxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxLQUFLLEVBQUU7b0JBQ3RDLE9BQU8sd0JBQXdCLENBQUM7aUJBQ25DO3FCQUFNO29CQUFFLE9BQU8sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUFFO1lBQ25DLENBQUMsRUFBQztZQUNGLHVCQUFhLFNBQVMsR0FBRyxVQUFVLFdBQW1CO2dCQUNsRCxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtvQkFDL0IsV0FBVyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDN0U7cUJBQU0sSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO29CQUN0QyxXQUFXLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxD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QUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBbkIsQ0FBbUIsQ0FBQzs2QkFDbEMsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFOLENBQU0sQ0FBQyxDQUFDO3dCQUN4QixJQUFJLDJCQUEyQixDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksMkJBQTJCLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFOzRCQUNqRixRQUFRLEdBQUcsQ0FBQyxFQUFFLEdBQUcsMkJBQTJCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt5QkFDM0Q7cUJBQ0o7b0JBQ0QsSUFBSSxPQUFPLENBQUMsZ0JBQWdCLElBQUksT0FBTyxDQUFDLDBCQUEwQixFQUFFO3dCQUNoRSxRQUFRLEdBQUcsdUJBQXVCLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFDO3FCQUNoRztpQkFDSjtnQkFDRCxPQUFPLFFBQVEsQ0FBQztZQUNwQixDQUFDLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7IElCb29tUGF0dGVybiB9IGZyb20gXCIuL0Jvb20uaW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplQ29sb3IgPSBmdW5jdGlvbiAoY29sb3I6IHN0cmluZykge1xyXG4gICAgaWYgKGNvbG9yLnRvTG93ZXJDYXNlKCkgPT09IFwiZ3JlZW5cIikge1xyXG4gICAgICAgIHJldHVybiBcInJnYmEoNTAsIDE3MiwgNDUsIDAuOTcpXCI7XHJcbiAgICB9IGVsc2UgaWYgKGNvbG9yLnRvTG93ZXJDYXNlKCkgPT09IFwib3JhbmdlXCIpIHtcclxuICAgICAgICByZXR1cm4gXCJyZ2JhKDIzNywgMTI5LCA0MCwgMC44OSlcIjtcclxuICAgIH0gZWxzZSBpZiAoY29sb3IudG9Mb3dlckNhc2UoKSA9PT0gXCJyZWRcIikge1xyXG4gICAgICAgIHJldHVybiBcInJnYmEoMjQ1LCA1NCwgNTQsIDAuOSlcIjtcclxuICAgIH0gZWxzZSB7IHJldHVybiBjb2xvci50cmltKCk7IH1cclxufTtcclxuZXhwb3J0IGNvbnN0IHBhcnNlTWF0aCA9IGZ1bmN0aW9uICh2YWx1ZXN0cmluZzogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgIGxldCByZXR1cm52YWx1ZSA9IDA7XHJcbiAgICBpZiAodmFsdWVzdHJpbmcuaW5kZXhPZihcIitcIikgPiAtMSkge1xyXG4gICAgICAgIHJldHVybnZhbHVlID0gKyh2YWx1ZXN0cmluZy5zcGxpdChcIitcIilbMF0pICsgKyh2YWx1ZXN0cmluZy5zcGxpdChcIitcIilbMV0pO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZXN0cmluZy5pbmRleE9mKFwiLVwiKSA+IC0xKSB7XHJcbiAgICAgICAgcmV0dXJudmFsdWUgPSArKHZhbHVlc3RyaW5nLnNwbGl0KFwiLVwiKVswXSkgLSArKHZhbHVlc3RyaW5nLnNwbGl0KFwiLVwiKVsxXSk7XHJcbiAgICB9IGVsc2UgaWYgKHZhbHVlc3RyaW5nLmluZGV4T2YoXCIqXCIpID4gLTEpIHtcclxuICAgICAgICByZXR1cm52YWx1ZSA9ICsodmFsdWVzdHJpbmcuc3BsaXQoXCIqXCIpWzBdKSAqICsodmFsdWVzdHJpbmcuc3BsaXQoXCIqXCIpWzFdKTtcclxuICAgIH0gZWxzZSBpZiAodmFsdWVzdHJpbmcuaW5kZXhPZihcIi9cIikgPiAtMSkge1xyXG4gICAgICAgIHJldHVybnZhbHVlID0gKyh2YWx1ZXN0cmluZy5zcGxpdChcIi9cIilbMF0pIC8gKyh2YWx1ZXN0cmluZy5zcGxpdChcIi9cIilbMV0pO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZXN0cmluZy5pbmRleE9mKFwibWluXCIpID4gLTEpIHtcclxuICAgICAgICByZXR1cm52YWx1ZSA9IF8ubWluKFsrKHZhbHVlc3RyaW5nLnNwbGl0KFwibWluXCIpWzBdKSwgKyh2YWx1ZXN0cmluZy5zcGxpdChcIm1pblwiKVsxXSldKSB8fCAwO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZXN0cmluZy5pbmRleE9mKFwibWF4XCIpID4gLTEpIHtcclxuICAgICAgICByZXR1cm52YWx1ZSA9IF8ubWF4KFsrKHZhbHVlc3RyaW5nLnNwbGl0KFwibWF4XCIpWzBdKSwgKyh2YWx1ZXN0cmluZy5zcGxpdChcIm1heFwiKVsxXSldKSB8fCAwO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZXN0cmluZy5pbmRleE9mKFwibWVhblwiKSA+IC0xKSB7XHJcbiAgICAgICAgcmV0dXJudmFsdWUgPSBfLm1lYW4oWysodmFsdWVzdHJpbmcuc3BsaXQoXCJhdmdcIilbMF0pLCArKHZhbHVlc3RyaW5nLnNwbGl0KFwiYXZnXCIpWzFdKV0pIHx8IDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybnZhbHVlID0gKyh2YWx1ZXN0cmluZyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZCgrcmV0dXJudmFsdWUpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgcGFyc2VNYXRoRXhwcmVzc2lvbiA9IGZ1bmN0aW9uIChleHByZXNzaW9uOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgbGV0IHZhbHVlc3RyaW5nID0gZXhwcmVzc2lvbi5yZXBsYWNlKC9cXF8vZywgXCJcIikuc3BsaXQoXCIsXCIpW2luZGV4XTtcclxuICAgIHJldHVybiArKHBhcnNlTWF0aCh2YWx1ZXN0cmluZykpO1xyXG5cclxufTtcclxuZXhwb3J0IGNvbnN0IGdldENvbG9yID0gZnVuY3Rpb24gKGV4cHJlc3Npb246IHN0cmluZywgaW5kZXg6IG51bWJlcikge1xyXG4gICAgbGV0IHJldHVyblZhbHVlID0gKGV4cHJlc3Npb24gfHwgXCJcIikuc3BsaXQoXCIsXCIpLmxlbmd0aCA+IGluZGV4ID8gYCBzdHlsZT1cImNvbG9yOiR7bm9ybWFsaXplQ29sb3IoZXhwcmVzc2lvbi5yZXBsYWNlKC9cXF8vZywgXCJcIikuc3BsaXQoXCIsXCIpW2luZGV4XSl9XCIgYCA6IFwiXCI7XHJcbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbn07XHJcbmV4cG9ydCBjb25zdCByZXBsYWNlVG9rZW5zID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIGlmICghdmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9XHJcbiAgICB2YWx1ZSA9IHZhbHVlICsgXCJcIjtcclxuICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoXCIgXCIpLm1hcChhID0+IHtcclxuICAgICAgICBpZiAoYS5zdGFydHNXaXRoKFwiX2ZhLVwiKSAmJiBhLmVuZHNXaXRoKFwiX1wiKSkge1xyXG4gICAgICAgICAgICBsZXQgcmV0dXJudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICBsZXQgaWNvbiA9IGEucmVwbGFjZSgvXFxfL2csIFwiXCIpLnNwbGl0KFwiLFwiKVswXTtcclxuICAgICAgICAgICAgbGV0IGNvbG9yID0gZ2V0Q29sb3IoYSwgMSk7XHJcbiAgICAgICAgICAgIGxldCByZXBlYXRDb3VudCA9IGEuc3BsaXQoXCIsXCIpLmxlbmd0aCA+PSAzID8gcGFyc2VNYXRoRXhwcmVzc2lvbihhLCAyKSA6IDE7XHJcbiAgICAgICAgICAgIHJldHVybnZhbHVlID0gYDxpIGNsYXNzPVwiZmEgJHtpY29ufVwiICR7Y29sb3J9PjwvaT4gYC5yZXBlYXQocmVwZWF0Q291bnQpO1xyXG4gICAgICAgICAgICBpZiAoYS5zcGxpdChcIixcIikubGVuZ3RoID49IDQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtYXhDb2xvciA9IGdldENvbG9yKGEsIDMpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1heExlbmd0aCA9IGEuc3BsaXQoXCIsXCIpLmxlbmd0aCA+PSA1ID8gcGFyc2VNYXRoRXhwcmVzc2lvbihhLCA0KSA6IDA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm52YWx1ZSArPSBgPGkgY2xhc3M9XCJmYSAke2ljb259XCIgJHttYXhDb2xvcn0+PC9pPiBgLnJlcGVhdChfLm1heChbbWF4TGVuZ3RoIC0gcmVwZWF0Q291bnQsIDBdKSB8fCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmV0dXJudmFsdWU7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoYS5zdGFydHNXaXRoKFwiX2ltZy1cIikgJiYgYS5lbmRzV2l0aChcIl9cIikpIHtcclxuICAgICAgICAgICAgYSA9IGEuc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgICAgICBsZXQgaW1nVXJsID0gYS5yZXBsYWNlKFwiX2ltZy1cIiwgXCJcIikuc3BsaXQoXCIsXCIpWzBdO1xyXG4gICAgICAgICAgICBsZXQgaW1nV2lkdGggPSBhLnNwbGl0KFwiLFwiKS5sZW5ndGggPiAxID8gYS5yZXBsYWNlKFwiX2ltZy1cIiwgXCJcIikuc3BsaXQoXCIsXCIpWzFdIDogXCIyMHB4XCI7XHJcbiAgICAgICAgICAgIGxldCBpbWdIZWlnaHQgPSBhLnNwbGl0KFwiLFwiKS5sZW5ndGggPiAyID8gYS5yZXBsYWNlKFwiX2ltZy1cIiwgXCJcIikuc3BsaXQoXCIsXCIpWzJdIDogXCIyMHB4XCI7XHJcbiAgICAgICAgICAgIGxldCByZXBlYXRDb3VudCA9IGEuc3BsaXQoXCIsXCIpLmxlbmd0aCA+IDMgPyArKGEucmVwbGFjZShcIl9pbWctXCIsIFwiXCIpLnNwbGl0KFwiLFwiKVszXSkgOiAxO1xyXG4gICAgICAgICAgICBhID0gYDxpbWcgd2lkdGg9XCIke2ltZ1dpZHRofVwiIGhlaWdodD1cIiR7aW1nSGVpZ2h0fVwiIHNyYz1cIiR7aW1nVXJsfVwiLz5gLnJlcGVhdChyZXBlYXRDb3VudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgfSkuam9pbihcIiBcIik7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRBY3R1YWxOYW1lV2l0aG91dFRva2VucyA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICBpZiAoIXZhbHVlKSB7IHJldHVybiB2YWx1ZSArIFwiXCI7IH1cclxuICAgIHZhbHVlID0gdmFsdWUgKyBcIlwiO1xyXG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KFwiIFwiKS5tYXAoYSA9PiB7XHJcbiAgICAgICAgaWYgKGEuc3RhcnRzV2l0aChcIl9mYS1cIikgJiYgYS5lbmRzV2l0aChcIl9cIikpIHtcclxuICAgICAgICAgICAgYSA9IGBgO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYS5zdGFydHNXaXRoKFwiX2ltZy1cIikgJiYgYS5lbmRzV2l0aChcIl9cIikpIHtcclxuICAgICAgICAgICAgYSA9IGBgO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYTtcclxuICAgIH0pLmpvaW4oXCIgXCIpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0SXRlbUJhc2VkT25UaHJlc2hvbGQgPSBmdW5jdGlvbiAodGhyZXNob2xkczogYW55W10sIHJhbmdlczogYW55LCB2YWx1ZTogbnVtYmVyLCBkZWZhdWx0VmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBsZXQgYyA9IGRlZmF1bHRWYWx1ZTtcclxuICAgIGlmICh0aHJlc2hvbGRzICYmIHJhbmdlcyAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgJiYgdGhyZXNob2xkcy5sZW5ndGggKyAxIDw9IHJhbmdlcy5sZW5ndGgpIHtcclxuICAgICAgICByYW5nZXMgPSBfLmRyb3BSaWdodChyYW5nZXMsIHJhbmdlcy5sZW5ndGggLSB0aHJlc2hvbGRzLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgIGlmIChyYW5nZXNbcmFuZ2VzLmxlbmd0aCAtIDFdID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHJhbmdlc1tyYW5nZXMubGVuZ3RoIC0gMV0gPSBkZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aHJlc2hvbGRzLmxlbmd0aDsgaSA+IDA7IGktLSkge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPj0gdGhyZXNob2xkc1tpIC0gMV0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByYW5nZXNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIF8uZmlyc3QocmFuZ2VzKSB8fCBcIlwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGM7XHJcblxyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0TWV0cmljTmFtZUZyb21UYWdnZWRBbGlhcyA9IGZ1bmN0aW9uICh0YXJnZXQpOiBzdHJpbmcge1xyXG4gICAgdGFyZ2V0ID0gdGFyZ2V0LnRyaW0oKTtcclxuICAgIGxldCBfbWV0cmljbmFtZSA9IHRhcmdldDtcclxuICAgIGlmICh0YXJnZXQuaW5kZXhPZihcIntcIikgPiAtMSAmJiB0YXJnZXQuaW5kZXhPZihcIn1cIikgPiAtMSAmJiB0YXJnZXRbdGFyZ2V0Lmxlbmd0aCAtIDFdID09PSBcIn1cIikge1xyXG4gICAgICAgIF9tZXRyaWNuYW1lID0gdGFyZ2V0LnNwbGl0KFwie1wiKVswXS50cmltKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIF9tZXRyaWNuYW1lID0gdGFyZ2V0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9tZXRyaWNuYW1lO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0TGFibGVzRnJvbVRhZ2dlZEFsaWFzID0gZnVuY3Rpb24gKHRhcmdldCwgbGFiZWwpOiBhbnlbXSB7XHJcbiAgICBsZXQgX3RhZ3M6IGFueVtdID0gW107XHJcbiAgICB0YXJnZXQgPSB0YXJnZXQudHJpbSgpO1xyXG4gICAgbGV0IHRhZ3NzdHJpbmcgPSB0YXJnZXQucmVwbGFjZShsYWJlbCwgXCJcIikudHJpbSgpO1xyXG4gICAgaWYgKHRhZ3NzdHJpbmcuc3RhcnRzV2l0aChcIntcIikgJiYgdGFnc3N0cmluZy5lbmRzV2l0aChcIn1cIikpIHtcclxuICAgICAgICAvLyBTbmlwcGV0IGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2dyYWZhbmEvZ3JhZmFuYS9ibG9iLzNmMTUxNzA5MTRjMzE4OWVlNzgzNWYwYjE5ZmY1MDBkYjExM2FmNzMvcGFja2FnZXMvZ3JhZmFuYS1kYXRhL3NyYy91dGlscy9sYWJlbHMudHNcclxuICAgICAgICBjb25zdCBwYXJzZVByb21ldGhldXNMYWJlbHMgPSBmdW5jdGlvbiAobGFiZWxzOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgY29uc3QgbGFiZWxzQnlLZXk6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICBsYWJlbHMucmVwbGFjZSgvXFxiKFxcdyspKCE/PX4/KVwiKFteXCJcXG5dKj8pXCIvZywgKF9fLCBrZXksIG9wZXJhdG9yLCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFvcGVyYXRvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG9wZXJhdG9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxhYmVsc0J5S2V5W2tleV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBsYWJlbHNCeUtleTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIF8uZWFjaChwYXJzZVByb21ldGhldXNMYWJlbHModGFnc3N0cmluZyksIChrOiBzdHJpbmcsIHY6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBfdGFncy5wdXNoKHsgdGFnOiB2LCB2YWx1ZTogayB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGFnc3N0cmluZy5pbmRleE9mKFwiOlwiKSA+IC0xICYmIF90YWdzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBsZXQgbGFiZWxfdmFsdWVzID0gdGFnc3N0cmluZy5zbGljZSgxKS50cmltKCkuc2xpY2UoMCwgLTEpLnRyaW0oKSB8fCBcIlwiO1xyXG4gICAgICAgICAgICBfdGFncyA9IGxhYmVsX3ZhbHVlc1xyXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiLFwiKVxyXG4gICAgICAgICAgICAgICAgLm1hcChpdGVtID0+IChpdGVtIHx8IFwiXCIpLnRyaW0oKSlcclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoaXRlbSA9PiBpdGVtICYmIGl0ZW0uaW5kZXhPZihcIjpcIikgPiAtMSlcclxuICAgICAgICAgICAgICAgIC5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uc3BsaXQoXCI6XCIpLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmV0OiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0LnRhZyA9IGl0ZW0uc3BsaXQoXCI6XCIpWzBdLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0LnZhbHVlID0gaXRlbS5zcGxpdChcIjpcIilbMV0udHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGl0ZW0gPT4gaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIF90YWdzO1xyXG59O1xyXG5leHBvcnQgY29uc3QgcmVwbGFjZV90YWdzX2Zyb21fZmllbGQgPSBmdW5jdGlvbiAoZmllbGQ6IHN0cmluZywgdGFnczogYW55W10pOiBzdHJpbmcge1xyXG4gICAgaWYgKHRhZ3MgJiYgdGFncy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgZmllbGQgPSB0YWdzLnJlZHVjZSgociwgaXQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHIucmVwbGFjZShuZXcgUmVnRXhwKFwie3tcIiArIGl0LnRhZy50cmltKCkgKyBcIn19XCIsIFwiZ1wiKSwgaXQudmFsdWUpLnJlcGxhY2UoL1xcXCIvZywgXCJcIik7XHJcbiAgICAgICAgfSwgZmllbGQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZpZWxkO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0U2VyaWVzVmFsdWUgPSBmdW5jdGlvbiAoc2VyaWVzOiBhbnksIHN0YXRUeXBlOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgbGV0IHZhbHVlID0gTmFOO1xyXG4gICAgc3RhdFR5cGUgPSAoc3RhdFR5cGUgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcclxuICAgIGlmIChzZXJpZXMpIHtcclxuICAgICAgICBpZiAoc3RhdFR5cGUgPT09IFwibGFzdF90aW1lXCIgJiYgc2VyaWVzLmRhdGFwb2ludHMgJiYgc2VyaWVzLmRhdGFwb2ludHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBpZiAoXy5sYXN0KHNlcmllcy5kYXRhcG9pbnRzKSkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBfLmxhc3Qoc2VyaWVzLmRhdGFwb2ludHMpWzFdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0VHlwZSA9PT0gXCJsYXN0X3RpbWVfbm9ubnVsbFwiKSB7XHJcbiAgICAgICAgICAgIGxldCBub25fbnVsbF9kYXRhID0gc2VyaWVzLmRhdGFwb2ludHMuZmlsdGVyKHMgPT4gc1swXSk7XHJcbiAgICAgICAgICAgIGlmIChfLmxhc3Qobm9uX251bGxfZGF0YSkgJiYgXy5sYXN0KG5vbl9udWxsX2RhdGEpWzFdKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IF8ubGFzdChub25fbnVsbF9kYXRhKVsxXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoc2VyaWVzLnN0YXRzKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gc2VyaWVzLnN0YXRzW3N0YXRUeXBlXSB8fCBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB2YWx1ZTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldEN1cnJlbnRUaW1lU3RhbXAgPSBmdW5jdGlvbiAoZGF0YVBvaW50czogYW55W10pOiBEYXRlIHtcclxuICAgIGxldCBjdXJyZW50VGltZVN0YW1wID0gbmV3IERhdGUoKTtcclxuICAgIGlmIChkYXRhUG9pbnRzICYmIGRhdGFQb2ludHMubGVuZ3RoID4gMCAmJiBfLmxhc3QoZGF0YVBvaW50cykubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgY3VycmVudFRpbWVTdGFtcCA9IG5ldyBEYXRlKF8ubGFzdChkYXRhUG9pbnRzKVsxXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3VycmVudFRpbWVTdGFtcDtcclxufTtcclxuZXhwb3J0IGNvbnN0IHJlcGxhY2VEZWxpbWl0ZWRDb2x1bW5zID0gZnVuY3Rpb24gKGlucHV0c3RyaW5nOiBzdHJpbmcsIHNlcmllc05hbWU6IHN0cmluZywgZGVsaW1pdGVyOiBzdHJpbmcsIHJvd19jb2xfd3JhcHBlcjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGxldCBvdXRwdXRTdHJpbmcgPSBzZXJpZXNOYW1lXHJcbiAgICAgICAgLnNwbGl0KGRlbGltaXRlciB8fCBcIi5cIilcclxuICAgICAgICAucmVkdWNlKChyLCBpdCwgaSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gci5yZXBsYWNlKG5ldyBSZWdFeHAocm93X2NvbF93cmFwcGVyICsgaSArIHJvd19jb2xfd3JhcHBlciwgXCJnXCIpLCBpdCk7XHJcbiAgICAgICAgfSwgaW5wdXRzdHJpbmcpO1xyXG4gICAgcmV0dXJuIG91dHB1dFN0cmluZztcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldFJvd05hbWUgPSBmdW5jdGlvbiAocm93X25hbWU6IHN0cmluZywgZGVsaW1pdGVyOiBzdHJpbmcsIHJvd19jb2xfd3JhcHBlcjogc3RyaW5nLCBzZXJpZXNOYW1lOiBzdHJpbmcsIF9tZXRyaWNuYW1lOiBzdHJpbmcsIF90YWdzOiBhbnlbXSk6IHN0cmluZyB7XHJcbiAgICBpZiAoZGVsaW1pdGVyLnRvTG93ZXJDYXNlKCkgPT09IFwidGFnXCIpIHtcclxuICAgICAgICByb3dfbmFtZSA9IHJvd19uYW1lLnJlcGxhY2UobmV3IFJlZ0V4cChcInt7bWV0cmljX25hbWV9fVwiLCBcImdcIiksIF9tZXRyaWNuYW1lKTtcclxuICAgICAgICByb3dfbmFtZSA9IHJlcGxhY2VfdGFnc19mcm9tX2ZpZWxkKHJvd19uYW1lLCBfdGFncyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJvd19uYW1lID0gcmVwbGFjZURlbGltaXRlZENvbHVtbnMocm93X25hbWUsIHNlcmllc05hbWUsIGRlbGltaXRlciwgcm93X2NvbF93cmFwcGVyKTtcclxuICAgICAgICBpZiAoc2VyaWVzTmFtZS5zcGxpdChkZWxpbWl0ZXIgfHwgXCIuXCIpLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICByb3dfbmFtZSA9IHNlcmllc05hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJvd19uYW1lLnJlcGxhY2UobmV3IFJlZ0V4cChcIl9zZXJpZXNfXCIsIFwiZ1wiKSwgc2VyaWVzTmFtZS50b1N0cmluZygpKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldENvbE5hbWUgPSBmdW5jdGlvbiAoY29sX25hbWU6IHN0cmluZywgZGVsaW1pdGVyOiBzdHJpbmcsIHJvd19jb2xfd3JhcHBlcjogc3RyaW5nLCBzZXJpZXNOYW1lOiBzdHJpbmcsIHJvd19uYW1lOiBzdHJpbmcsIF9tZXRyaWNuYW1lOiBzdHJpbmcsIF90YWdzOiBhbnlbXSk6IHN0cmluZyB7XHJcbiAgICBpZiAoZGVsaW1pdGVyLnRvTG93ZXJDYXNlKCkgPT09IFwidGFnXCIpIHtcclxuICAgICAgICBjb2xfbmFtZSA9IGNvbF9uYW1lLnJlcGxhY2UobmV3IFJlZ0V4cChcInt7bWV0cmljX25hbWV9fVwiLCBcImdcIiksIF9tZXRyaWNuYW1lKTtcclxuICAgICAgICByb3dfbmFtZSA9IHJlcGxhY2VfdGFnc19mcm9tX2ZpZWxkKGNvbF9uYW1lLCBfdGFncyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbF9uYW1lID0gcmVwbGFjZURlbGltaXRlZENvbHVtbnMoY29sX25hbWUsIHNlcmllc05hbWUsIGRlbGltaXRlciwgcm93X2NvbF93cmFwcGVyKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhjb2xfbmFtZSwgcm93X25hbWUsIHNlcmllc05hbWUpO1xyXG4gICAgICAgIGlmIChzZXJpZXNOYW1lLnNwbGl0KGRlbGltaXRlciB8fCBcIi5cIikubGVuZ3RoID09PSAxIHx8IHJvd19uYW1lID09PSBzZXJpZXNOYW1lKSB7XHJcbiAgICAgICAgICAgIGNvbF9uYW1lID0gY29sX25hbWUgfHwgXCJWYWx1ZVwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjb2xfbmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfc2VyaWVzX1wiLCBcImdcIiksIHNlcmllc05hbWUudG9TdHJpbmcoKSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXREaXNwbGF5VmFsdWVUZW1wbGF0ZSA9IGZ1bmN0aW9uICh2YWx1ZTogbnVtYmVyLCBwYXR0ZXJuOiBJQm9vbVBhdHRlcm4sIHNlcmllc05hbWU6IHN0cmluZywgcm93X2NvbF93cmFwcGVyOiBzdHJpbmcsIHRocmVzaG9sZHM6IGFueVtdKTogc3RyaW5nIHtcclxuICAgIGxldCB0ZW1wbGF0ZSA9IFwiX3ZhbHVlX1wiO1xyXG4gICAgaWYgKF8uaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgdGVtcGxhdGUgPSBwYXR0ZXJuLm51bGxfdmFsdWUgfHwgXCJObyBkYXRhXCI7XHJcbiAgICAgICAgaWYgKHBhdHRlcm4ubnVsbF92YWx1ZSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0ZW1wbGF0ZSA9IHBhdHRlcm4uZGlzcGxheVRlbXBsYXRlIHx8IHRlbXBsYXRlO1xyXG4gICAgICAgIGlmIChwYXR0ZXJuLmVuYWJsZV90cmFuc2Zvcm0pIHtcclxuICAgICAgICAgICAgbGV0IHRyYW5zZm9ybV92YWx1ZXMgPSBwYXR0ZXJuLnRyYW5zZm9ybV92YWx1ZXMuc3BsaXQoXCJ8XCIpO1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZSA9IGdldEl0ZW1CYXNlZE9uVGhyZXNob2xkKHRocmVzaG9sZHMsIHRyYW5zZm9ybV92YWx1ZXMsIHZhbHVlLCB0ZW1wbGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXR0ZXJuLmVuYWJsZV90cmFuc2Zvcm1fb3ZlcnJpZGVzICYmIHBhdHRlcm4udHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXMgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgbGV0IF90cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlcyA9IHBhdHRlcm4udHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXNcclxuICAgICAgICAgICAgICAgIC5zcGxpdChcInxcIilcclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoY29uID0+IGNvbi5pbmRleE9mKFwiLT5cIikpXHJcbiAgICAgICAgICAgICAgICAubWFwKGNvbiA9PiBjb24uc3BsaXQoXCItPlwiKSlcclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoY29uID0+ICsoY29uWzBdKSA9PT0gdmFsdWUpXHJcbiAgICAgICAgICAgICAgICAubWFwKGNvbiA9PiBjb25bMV0pO1xyXG4gICAgICAgICAgICBpZiAoX3RyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzLmxlbmd0aCA+IDAgJiYgX3RyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzWzBdICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZSA9IChcIlwiICsgX3RyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzWzBdKS50cmltKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhdHRlcm4uZW5hYmxlX3RyYW5zZm9ybSB8fCBwYXR0ZXJuLmVuYWJsZV90cmFuc2Zvcm1fb3ZlcnJpZGVzKSB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlID0gcmVwbGFjZURlbGltaXRlZENvbHVtbnModGVtcGxhdGUsIHNlcmllc05hbWUsIHBhdHRlcm4uZGVsaW1pdGVyLCByb3dfY29sX3dyYXBwZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0ZW1wbGF0ZTtcclxufTtcclxuIl19