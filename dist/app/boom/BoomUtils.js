System.register(["lodash"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, normalizeColor, parseMath, parseMathExpression, getColor, replaceTokens, getActualNameWithoutTokens, getItemBasedOnThreshold, getMetricNameFromTaggedAlias, getLablesFromTaggedAlias, replace_tags_from_field, getSeriesValue;
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
                return value;
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbVV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9ib29tL0Jvb21VdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztZQUVBLDRCQUFhLGNBQWMsR0FBRyxVQUFVLEtBQUs7Z0JBQ3pDLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLE9BQU8sRUFBRTtvQkFDakMsT0FBTyx5QkFBeUIsQ0FBQztpQkFDcEM7cUJBQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssUUFBUSxFQUFFO29CQUN6QyxPQUFPLDBCQUEwQixDQUFDO2lCQUNyQztxQkFBTSxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxLQUFLLEVBQUU7b0JBQ3RDLE9BQU8sd0JBQXdCLENBQUM7aUJBQ25DO3FCQUFNO29CQUFFLE9BQU8sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUFFO1lBQ25DLENBQUMsRUFBQztZQUNGLHVCQUFhLFNBQVMsR0FBRyxVQUFVLFdBQW1CO2dCQUNsRCxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtvQkFDL0IsV0FBVyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDN0U7cUJBQU0sSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO29CQUN0QyxXQUFXLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxD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QUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUMxQyxJQUFJLFFBQVEsS0FBSyxXQUFXLElBQUksTUFBTSxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQy9FLElBQUksZ0JBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFO3dCQUMzQixLQUFLLEdBQUcsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUN4QztpQkFDSjtxQkFBTSxJQUFJLFFBQVEsS0FBSyxtQkFBbUIsRUFBRTtvQkFDekMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUosQ0FBSSxDQUFDLENBQUM7b0JBQ3hELElBQUksZ0JBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksZ0JBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQ25ELEtBQUssR0FBRyxnQkFBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDcEM7aUJBQ0o7cUJBQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO29CQUNyQixLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUM7aUJBQzFDO2dCQUNELE9BQU8sS0FBSyxDQUFDO1lBQ2pCLENBQUMsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVDb2xvciA9IGZ1bmN0aW9uIChjb2xvcikge1xyXG4gICAgaWYgKGNvbG9yLnRvTG93ZXJDYXNlKCkgPT09IFwiZ3JlZW5cIikge1xyXG4gICAgICAgIHJldHVybiBcInJnYmEoNTAsIDE3MiwgNDUsIDAuOTcpXCI7XHJcbiAgICB9IGVsc2UgaWYgKGNvbG9yLnRvTG93ZXJDYXNlKCkgPT09IFwib3JhbmdlXCIpIHtcclxuICAgICAgICByZXR1cm4gXCJyZ2JhKDIzNywgMTI5LCA0MCwgMC44OSlcIjtcclxuICAgIH0gZWxzZSBpZiAoY29sb3IudG9Mb3dlckNhc2UoKSA9PT0gXCJyZWRcIikge1xyXG4gICAgICAgIHJldHVybiBcInJnYmEoMjQ1LCA1NCwgNTQsIDAuOSlcIjtcclxuICAgIH0gZWxzZSB7IHJldHVybiBjb2xvci50cmltKCk7IH1cclxufTtcclxuZXhwb3J0IGNvbnN0IHBhcnNlTWF0aCA9IGZ1bmN0aW9uICh2YWx1ZXN0cmluZzogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgIGxldCByZXR1cm52YWx1ZSA9IDA7XHJcbiAgICBpZiAodmFsdWVzdHJpbmcuaW5kZXhPZihcIitcIikgPiAtMSkge1xyXG4gICAgICAgIHJldHVybnZhbHVlID0gKyh2YWx1ZXN0cmluZy5zcGxpdChcIitcIilbMF0pICsgKyh2YWx1ZXN0cmluZy5zcGxpdChcIitcIilbMV0pO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZXN0cmluZy5pbmRleE9mKFwiLVwiKSA+IC0xKSB7XHJcbiAgICAgICAgcmV0dXJudmFsdWUgPSArKHZhbHVlc3RyaW5nLnNwbGl0KFwiLVwiKVswXSkgLSArKHZhbHVlc3RyaW5nLnNwbGl0KFwiLVwiKVsxXSk7XHJcbiAgICB9IGVsc2UgaWYgKHZhbHVlc3RyaW5nLmluZGV4T2YoXCIqXCIpID4gLTEpIHtcclxuICAgICAgICByZXR1cm52YWx1ZSA9ICsodmFsdWVzdHJpbmcuc3BsaXQoXCIqXCIpWzBdKSAqICsodmFsdWVzdHJpbmcuc3BsaXQoXCIqXCIpWzFdKTtcclxuICAgIH0gZWxzZSBpZiAodmFsdWVzdHJpbmcuaW5kZXhPZihcIi9cIikgPiAtMSkge1xyXG4gICAgICAgIHJldHVybnZhbHVlID0gKyh2YWx1ZXN0cmluZy5zcGxpdChcIi9cIilbMF0pIC8gKyh2YWx1ZXN0cmluZy5zcGxpdChcIi9cIilbMV0pO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZXN0cmluZy5pbmRleE9mKFwibWluXCIpID4gLTEpIHtcclxuICAgICAgICByZXR1cm52YWx1ZSA9IF8ubWluKFsrKHZhbHVlc3RyaW5nLnNwbGl0KFwibWluXCIpWzBdKSwgKyh2YWx1ZXN0cmluZy5zcGxpdChcIm1pblwiKVsxXSldKSB8fCAwO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZXN0cmluZy5pbmRleE9mKFwibWF4XCIpID4gLTEpIHtcclxuICAgICAgICByZXR1cm52YWx1ZSA9IF8ubWF4KFsrKHZhbHVlc3RyaW5nLnNwbGl0KFwibWF4XCIpWzBdKSwgKyh2YWx1ZXN0cmluZy5zcGxpdChcIm1heFwiKVsxXSldKSB8fCAwO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZXN0cmluZy5pbmRleE9mKFwibWVhblwiKSA+IC0xKSB7XHJcbiAgICAgICAgcmV0dXJudmFsdWUgPSBfLm1lYW4oWysodmFsdWVzdHJpbmcuc3BsaXQoXCJhdmdcIilbMF0pLCArKHZhbHVlc3RyaW5nLnNwbGl0KFwiYXZnXCIpWzFdKV0pIHx8IDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybnZhbHVlID0gKyh2YWx1ZXN0cmluZyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZCgrcmV0dXJudmFsdWUpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgcGFyc2VNYXRoRXhwcmVzc2lvbiA9IGZ1bmN0aW9uIChleHByZXNzaW9uLCBpbmRleCk6IG51bWJlciB7XHJcbiAgICBsZXQgdmFsdWVzdHJpbmcgPSBleHByZXNzaW9uLnJlcGxhY2UoL1xcXy9nLCBcIlwiKS5zcGxpdChcIixcIilbaW5kZXhdO1xyXG4gICAgcmV0dXJuICsocGFyc2VNYXRoKHZhbHVlc3RyaW5nKSk7XHJcblxyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0Q29sb3IgPSBmdW5jdGlvbiAoZXhwcmVzc2lvbiwgaW5kZXgpIHtcclxuICAgIGxldCByZXR1cm5WYWx1ZSA9IChleHByZXNzaW9uIHx8IFwiXCIpLnNwbGl0KFwiLFwiKS5sZW5ndGggPiBpbmRleCA/IGAgc3R5bGU9XCJjb2xvcjoke25vcm1hbGl6ZUNvbG9yKGV4cHJlc3Npb24ucmVwbGFjZSgvXFxfL2csIFwiXCIpLnNwbGl0KFwiLFwiKVtpbmRleF0pfVwiIGAgOiBcIlwiO1xyXG4gICAgcmV0dXJuIHJldHVyblZhbHVlO1xyXG59O1xyXG5leHBvcnQgY29uc3QgcmVwbGFjZVRva2VucyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgaWYgKCF2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH1cclxuICAgIHZhbHVlID0gdmFsdWUgKyBcIlwiO1xyXG4gICAgdmFsdWUgPSB2YWx1ZS5zcGxpdChcIiBcIikubWFwKGEgPT4ge1xyXG4gICAgICAgIGlmIChhLnN0YXJ0c1dpdGgoXCJfZmEtXCIpICYmIGEuZW5kc1dpdGgoXCJfXCIpKSB7XHJcbiAgICAgICAgICAgIGxldCByZXR1cm52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGxldCBpY29uID0gYS5yZXBsYWNlKC9cXF8vZywgXCJcIikuc3BsaXQoXCIsXCIpWzBdO1xyXG4gICAgICAgICAgICBsZXQgY29sb3IgPSBnZXRDb2xvcihhLCAxKTtcclxuICAgICAgICAgICAgbGV0IHJlcGVhdENvdW50ID0gYS5zcGxpdChcIixcIikubGVuZ3RoID49IDMgPyBwYXJzZU1hdGhFeHByZXNzaW9uKGEsIDIpIDogMTtcclxuICAgICAgICAgICAgcmV0dXJudmFsdWUgPSBgPGkgY2xhc3M9XCJmYSAke2ljb259XCIgJHtjb2xvcn0+PC9pPiBgLnJlcGVhdChyZXBlYXRDb3VudCk7XHJcbiAgICAgICAgICAgIGlmIChhLnNwbGl0KFwiLFwiKS5sZW5ndGggPj0gNCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1heENvbG9yID0gZ2V0Q29sb3IoYSwgMyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWF4TGVuZ3RoID0gYS5zcGxpdChcIixcIikubGVuZ3RoID49IDUgPyBwYXJzZU1hdGhFeHByZXNzaW9uKGEsIDQpIDogMDtcclxuICAgICAgICAgICAgICAgIHJldHVybnZhbHVlICs9IGA8aSBjbGFzcz1cImZhICR7aWNvbn1cIiAke21heENvbG9yfT48L2k+IGAucmVwZWF0KF8ubWF4KFttYXhMZW5ndGggLSByZXBlYXRDb3VudCwgMF0pIHx8IDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXR1cm52YWx1ZTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChhLnN0YXJ0c1dpdGgoXCJfaW1nLVwiKSAmJiBhLmVuZHNXaXRoKFwiX1wiKSkge1xyXG4gICAgICAgICAgICBhID0gYS5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgICAgIGxldCBpbWdVcmwgPSBhLnJlcGxhY2UoXCJfaW1nLVwiLCBcIlwiKS5zcGxpdChcIixcIilbMF07XHJcbiAgICAgICAgICAgIGxldCBpbWdXaWR0aCA9IGEuc3BsaXQoXCIsXCIpLmxlbmd0aCA+IDEgPyBhLnJlcGxhY2UoXCJfaW1nLVwiLCBcIlwiKS5zcGxpdChcIixcIilbMV0gOiBcIjIwcHhcIjtcclxuICAgICAgICAgICAgbGV0IGltZ0hlaWdodCA9IGEuc3BsaXQoXCIsXCIpLmxlbmd0aCA+IDIgPyBhLnJlcGxhY2UoXCJfaW1nLVwiLCBcIlwiKS5zcGxpdChcIixcIilbMl0gOiBcIjIwcHhcIjtcclxuICAgICAgICAgICAgbGV0IHJlcGVhdENvdW50ID0gYS5zcGxpdChcIixcIikubGVuZ3RoID4gMyA/ICsoYS5yZXBsYWNlKFwiX2ltZy1cIiwgXCJcIikuc3BsaXQoXCIsXCIpWzNdKSA6IDE7XHJcbiAgICAgICAgICAgIGEgPSBgPGltZyB3aWR0aD1cIiR7aW1nV2lkdGh9XCIgaGVpZ2h0PVwiJHtpbWdIZWlnaHR9XCIgc3JjPVwiJHtpbWdVcmx9XCIvPmAucmVwZWF0KHJlcGVhdENvdW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9KS5qb2luKFwiIFwiKTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldEFjdHVhbE5hbWVXaXRob3V0VG9rZW5zID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICBpZiAoIXZhbHVlKSB7IHJldHVybiB2YWx1ZSArIFwiXCI7IH1cclxuICAgIHZhbHVlID0gdmFsdWUgKyBcIlwiO1xyXG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KFwiIFwiKS5tYXAoYSA9PiB7XHJcbiAgICAgICAgaWYgKGEuc3RhcnRzV2l0aChcIl9mYS1cIikgJiYgYS5lbmRzV2l0aChcIl9cIikpIHtcclxuICAgICAgICAgICAgYSA9IGBgO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYS5zdGFydHNXaXRoKFwiX2ltZy1cIikgJiYgYS5lbmRzV2l0aChcIl9cIikpIHtcclxuICAgICAgICAgICAgYSA9IGBgO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYTtcclxuICAgIH0pLmpvaW4oXCIgXCIpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0SXRlbUJhc2VkT25UaHJlc2hvbGQgPSBmdW5jdGlvbiAodGhyZXNob2xkcywgcmFuZ2VzLCB2YWx1ZSwgZGVmYXVsdFZhbHVlKTogc3RyaW5nIHtcclxuICAgIGxldCBjID0gZGVmYXVsdFZhbHVlO1xyXG4gICAgaWYgKHRocmVzaG9sZHMgJiYgcmFuZ2VzICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiB0aHJlc2hvbGRzLmxlbmd0aCArIDEgPD0gcmFuZ2VzLmxlbmd0aCkge1xyXG4gICAgICAgIHJhbmdlcyA9IF8uZHJvcFJpZ2h0KHJhbmdlcywgcmFuZ2VzLmxlbmd0aCAtIHRocmVzaG9sZHMubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgaWYgKHJhbmdlc1tyYW5nZXMubGVuZ3RoIC0gMV0gPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmFuZ2VzW3Jhbmdlcy5sZW5ndGggLSAxXSA9IGRlZmF1bHRWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRocmVzaG9sZHMubGVuZ3RoOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA+PSB0aHJlc2hvbGRzW2kgLSAxXSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJhbmdlc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXy5maXJzdChyYW5nZXMpIHx8IFwiXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYztcclxuXHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRNZXRyaWNOYW1lRnJvbVRhZ2dlZEFsaWFzID0gZnVuY3Rpb24gKHRhcmdldCk6IHN0cmluZyB7XHJcbiAgICB0YXJnZXQgPSB0YXJnZXQudHJpbSgpO1xyXG4gICAgbGV0IF9tZXRyaWNuYW1lID0gdGFyZ2V0O1xyXG4gICAgaWYgKHRhcmdldC5pbmRleE9mKFwie1wiKSA+IC0xICYmIHRhcmdldC5pbmRleE9mKFwifVwiKSA+IC0xICYmIHRhcmdldFt0YXJnZXQubGVuZ3RoIC0gMV0gPT09IFwifVwiKSB7XHJcbiAgICAgICAgX21ldHJpY25hbWUgPSB0YXJnZXQuc3BsaXQoXCJ7XCIpWzBdLnRyaW0oKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX21ldHJpY25hbWUgPSB0YXJnZXQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX21ldHJpY25hbWU7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRMYWJsZXNGcm9tVGFnZ2VkQWxpYXMgPSBmdW5jdGlvbiAodGFyZ2V0LCBsYWJlbCk6IGFueVtdIHtcclxuICAgIGxldCBfdGFnczogYW55W10gPSBbXTtcclxuICAgIHRhcmdldCA9IHRhcmdldC50cmltKCk7XHJcbiAgICBsZXQgdGFnc3N0cmluZyA9IHRhcmdldC5yZXBsYWNlKGxhYmVsLCBcIlwiKS50cmltKCk7XHJcbiAgICBpZiAodGFnc3N0cmluZy5zdGFydHNXaXRoKFwie1wiKSAmJiB0YWdzc3RyaW5nLmVuZHNXaXRoKFwifVwiKSkge1xyXG4gICAgICAgIC8vIFNuaXBwZXQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZ3JhZmFuYS9ncmFmYW5hL2Jsb2IvM2YxNTE3MDkxNGMzMTg5ZWU3ODM1ZjBiMTlmZjUwMGRiMTEzYWY3My9wYWNrYWdlcy9ncmFmYW5hLWRhdGEvc3JjL3V0aWxzL2xhYmVscy50c1xyXG4gICAgICAgIGNvbnN0IHBhcnNlUHJvbWV0aGV1c0xhYmVscyA9IGZ1bmN0aW9uIChsYWJlbHM6IHN0cmluZykge1xyXG4gICAgICAgICAgICBjb25zdCBsYWJlbHNCeUtleTogYW55ID0ge307XHJcbiAgICAgICAgICAgIGxhYmVscy5yZXBsYWNlKC9cXGIoXFx3KykoIT89fj8pXCIoW15cIlxcbl0qPylcIi9nLCAoX18sIGtleSwgb3BlcmF0b3IsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW9wZXJhdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cob3BlcmF0b3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGFiZWxzQnlLZXlba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGxhYmVsc0J5S2V5O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXy5lYWNoKHBhcnNlUHJvbWV0aGV1c0xhYmVscyh0YWdzc3RyaW5nKSwgKGs6IHN0cmluZywgdjogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIF90YWdzLnB1c2goeyB0YWc6IHYsIHZhbHVlOiBrIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0YWdzc3RyaW5nLmluZGV4T2YoXCI6XCIpID4gLTEgJiYgX3RhZ3MubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBsYWJlbF92YWx1ZXMgPSB0YWdzc3RyaW5nLnNsaWNlKDEpLnRyaW0oKS5zbGljZSgwLCAtMSkudHJpbSgpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgIF90YWdzID0gbGFiZWxfdmFsdWVzXHJcbiAgICAgICAgICAgICAgICAuc3BsaXQoXCIsXCIpXHJcbiAgICAgICAgICAgICAgICAubWFwKGl0ZW0gPT4gKGl0ZW0gfHwgXCJcIikudHJpbSgpKVxyXG4gICAgICAgICAgICAgICAgLmZpbHRlcihpdGVtID0+IGl0ZW0gJiYgaXRlbS5pbmRleE9mKFwiOlwiKSA+IC0xKVxyXG4gICAgICAgICAgICAgICAgLm1hcChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5zcGxpdChcIjpcIikubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXQ6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQudGFnID0gaXRlbS5zcGxpdChcIjpcIilbMF0udHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQudmFsdWUgPSBpdGVtLnNwbGl0KFwiOlwiKVsxXS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoaXRlbSA9PiBpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX3RhZ3M7XHJcbn07XHJcbmV4cG9ydCBjb25zdCByZXBsYWNlX3RhZ3NfZnJvbV9maWVsZCA9IGZ1bmN0aW9uIChmaWVsZDogc3RyaW5nLCB0YWdzOiBhbnlbXSk6IHN0cmluZyB7XHJcbiAgICBpZiAodGFncyAmJiB0YWdzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBmaWVsZCA9IHRhZ3MucmVkdWNlKChyLCBpdCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gci5yZXBsYWNlKG5ldyBSZWdFeHAoXCJ7e1wiICsgaXQudGFnLnRyaW0oKSArIFwifX1cIiwgXCJnXCIpLCBpdC52YWx1ZSkucmVwbGFjZSgvXFxcIi9nLCBcIlwiKTtcclxuICAgICAgICB9LCBmaWVsZCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmllbGQ7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRTZXJpZXNWYWx1ZSA9IGZ1bmN0aW9uIChzZXJpZXM6IGFueSwgc3RhdFR5cGU6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICBsZXQgdmFsdWUgPSBOYU47XHJcbiAgICBzdGF0VHlwZSA9IChzdGF0VHlwZSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKHN0YXRUeXBlID09PSBcImxhc3RfdGltZVwiICYmIHNlcmllcy5kYXRhcG9pbnRzICYmIHNlcmllcy5kYXRhcG9pbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBpZiAoXy5sYXN0KHNlcmllcy5kYXRhcG9pbnRzKSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IF8ubGFzdChzZXJpZXMuZGF0YXBvaW50cylbMV07XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChzdGF0VHlwZSA9PT0gXCJsYXN0X3RpbWVfbm9ubnVsbFwiKSB7XHJcbiAgICAgICAgbGV0IG5vbl9udWxsX2RhdGEgPSBzZXJpZXMuZGF0YXBvaW50cy5maWx0ZXIocyA9PiBzWzBdKTtcclxuICAgICAgICBpZiAoXy5sYXN0KG5vbl9udWxsX2RhdGEpICYmIF8ubGFzdChub25fbnVsbF9kYXRhKVsxXSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IF8ubGFzdChub25fbnVsbF9kYXRhKVsxXTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHNlcmllcy5zdGF0cykge1xyXG4gICAgICAgIHZhbHVlID0gc2VyaWVzLnN0YXRzW3N0YXRUeXBlXSB8fCBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59OyJdfQ==