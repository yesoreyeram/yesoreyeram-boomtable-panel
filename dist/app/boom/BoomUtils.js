System.register(["lodash", "app/core/utils/kbn"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, kbn_1, normalizeColor, parseMathExpression, getColor, replaceTokens, getActualNameWithoutTokens, getDecimalsForValue, getItemBasedOnThreshold, get_formatted_value, getMetricNameFromTaggedAlias, getLablesFromTaggedAlias, replace_tags_from_field;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (kbn_1_1) {
                kbn_1 = kbn_1_1;
            }
        ],
        execute: function () {
            normalizeColor = function (color) {
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
                    return color.toLowerCase();
                }
            };
            exports_1("normalizeColor", normalizeColor);
            parseMathExpression = function (expression, index) {
                var valuestring = expression.replace(/\_/g, "").split(",")[index];
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
                return Math.round(+(returnvalue));
            };
            getColor = function (expression, index) {
                var returnValue = (expression || "").split(",").length > index ? " style=\"color:" + normalizeColor(expression.replace(/\_/g, "").split(",")[index]) + "\" " : "";
                return returnValue;
            };
            replaceTokens = function (value) {
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
            };
            exports_1("replaceTokens", replaceTokens);
            getActualNameWithoutTokens = function (value) {
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
            };
            exports_1("getActualNameWithoutTokens", getActualNameWithoutTokens);
            getDecimalsForValue = function (value, _decimals) {
                if (lodash_1.default.isNumber(+_decimals)) {
                    var o = {
                        decimals: _decimals,
                        scaledDecimals: null
                    };
                    return o;
                }
                var delta = value / 2;
                var dec = -Math.floor(Math.log(delta) / Math.LN10);
                var magn = Math.pow(10, -dec), norm = delta / magn, size;
                if (norm < 1.5) {
                    size = 1;
                }
                else if (norm < 3) {
                    size = 2;
                    if (norm > 2.25) {
                        size = 2.5;
                        ++dec;
                    }
                }
                else if (norm < 7.5) {
                    size = 5;
                }
                else {
                    size = 10;
                }
                size *= magn;
                if (Math.floor(value) === value) {
                    dec = 0;
                }
                var result = {
                    decimals: Math.max(0, dec),
                    scaledDecimals: Math.max(0, dec) - Math.floor(Math.log(size) / Math.LN10) + 2
                };
                return result;
            };
            exports_1("getDecimalsForValue", getDecimalsForValue);
            getItemBasedOnThreshold = function (thresholds, ranges, value, defaultValue) {
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
            };
            exports_1("getItemBasedOnThreshold", getItemBasedOnThreshold);
            get_formatted_value = function (value, decimals, format) {
                var decimalInfo = getDecimalsForValue(value, decimals);
                var formatFunc = kbn_1.default.valueFormats[format];
                return formatFunc(value, decimalInfo.decimals, decimalInfo.scaledDecimals);
            };
            exports_1("get_formatted_value", get_formatted_value);
            getMetricNameFromTaggedAlias = function (target) {
                target = target.trim();
                var _metricname = target;
                if (target.indexOf("{") > -1 && target.indexOf("}") > -1 && target[target.length - 1] === "}") {
                    _metricname = target.split("{")[0].trim();
                }
                else {
                    _metricname = target;
                }
                return _metricname;
            };
            exports_1("getMetricNameFromTaggedAlias", getMetricNameFromTaggedAlias);
            getLablesFromTaggedAlias = function (target, label) {
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
            };
            exports_1("getLablesFromTaggedAlias", getLablesFromTaggedAlias);
            replace_tags_from_field = function (field, tags) {
                if (tags && tags.length > 0) {
                    field = tags.reduce(function (r, it) {
                        return r.replace(new RegExp("{{" + it.tag.trim() + "}}", "g"), it.value).replace(/\"/g, "");
                    }, field);
                }
                return field;
            };
            exports_1("replace_tags_from_field", replace_tags_from_field);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbVV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9ib29tL0Jvb21VdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztZQUtNLGNBQWMsR0FBRyxVQUFVLEtBQUs7Z0JBQ2xDLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLE9BQU8sRUFBRTtvQkFDakMsT0FBTyx5QkFBeUIsQ0FBQztpQkFDcEM7cUJBQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssUUFBUSxFQUFFO29CQUN6QyxPQUFPLDBCQUEwQixDQUFDO2lCQUNyQztxQkFBTSxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxLQUFLLEVBQUU7b0JBQ3RDLE9BQU8sd0JBQXdCLENBQUM7aUJBQ25DO3FCQUFNO29CQUFFLE9BQU8sS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUFFO1lBQzFDLENBQUMsQ0FBQzs7WUFDSSxtQkFBbUIsR0FBRyxVQUFVLFVBQVUsRUFBRSxLQUFLO2dCQUNuRCxJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xFLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO29CQUMvQixXQUFXLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM3RTtxQkFBTSxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQ3RDLFdBQVcsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzdFO3FCQUFNLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtvQkFDdEMsV0FBVyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDN0U7cUJBQU0sSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO29CQUN0QyxXQUFXLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM3RTtxQkFBTSxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQ3hDLFdBQVcsR0FBRyxnQkFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM5RjtxQkFBTSxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQ3hDLFdBQVcsR0FBRyxnQkFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM5RjtxQkFBTSxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQ3pDLFdBQVcsR0FBRyxnQkFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUMvRjtxQkFBTTtvQkFDSCxXQUFXLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUNoQztnQkFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDdEMsQ0FBQyxDQUFDO1lBQ0ksUUFBUSxHQUFHLFVBQVUsVUFBVSxFQUFFLEtBQUs7Z0JBQ3hDLElBQUksV0FBVyxHQUFHLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxvQkFBaUIsY0FBYyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDM0osT0FBTyxXQUFXLENBQUM7WUFDdkIsQ0FBQyxDQUFDO1lBQ0ksYUFBYSxHQUFHLFVBQVUsS0FBSztnQkFDakMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFBRSxPQUFPLEtBQUssQ0FBQztpQkFBRTtnQkFDN0IsS0FBSyxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ25CLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUM7b0JBQzFCLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUN6QyxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7d0JBQ3JCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDOUMsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDM0IsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDM0UsV0FBVyxHQUFHLENBQUEsbUJBQWdCLElBQUksV0FBSyxLQUFLLFdBQVEsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDekUsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7NEJBQzFCLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQzlCLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3pFLFdBQVcsSUFBSSxDQUFBLG1CQUFnQixJQUFJLFdBQUssUUFBUSxXQUFRLENBQUEsQ0FBQyxNQUFNLENBQUMsZ0JBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEdBQUcsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7eUJBQzdHO3dCQUNELE9BQU8sV0FBVyxDQUFDO3FCQUV0Qjt5QkFBTSxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDakQsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ25CLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbEQsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQzt3QkFDdkYsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQzt3QkFDeEYsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDeEYsQ0FBQyxHQUFHLENBQUEsa0JBQWUsUUFBUSxvQkFBYSxTQUFTLGlCQUFVLE1BQU0sU0FBSyxDQUFBLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3FCQUM5RjtvQkFDRCxPQUFPLENBQUMsQ0FBQztnQkFDYixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2IsT0FBTyxLQUFLLENBQUM7WUFDakIsQ0FBQyxDQUFDOztZQUNJLDBCQUEwQixHQUFHLFVBQVUsS0FBSztnQkFDOUMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFBRSxPQUFPLEtBQUssR0FBRyxFQUFFLENBQUM7aUJBQUU7Z0JBQ2xDLEtBQUssR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUNuQixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQztvQkFDekIsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ3pDLENBQUMsR0FBRyxFQUFFLENBQUM7cUJBQ1Y7eUJBQU0sSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ2pELENBQUMsR0FBRyxFQUFFLENBQUM7cUJBQ1Y7b0JBQ0QsT0FBTyxDQUFDLENBQUM7Z0JBQ2IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLENBQUMsQ0FBQzs7WUFDSSxtQkFBbUIsR0FBRyxVQUFVLEtBQUssRUFBRSxTQUFTO2dCQUNsRCxJQUFJLGdCQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQ3hCLElBQUksQ0FBQyxHQUFXO3dCQUNaLFFBQVEsRUFBRSxTQUFTO3dCQUNuQixjQUFjLEVBQUUsSUFBSTtxQkFDdkIsQ0FBQztvQkFDRixPQUFPLENBQUMsQ0FBQztpQkFDWjtnQkFFRCxJQUFJLEtBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRW5ELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQ3pCLElBQUksR0FBRyxLQUFLLEdBQUcsSUFBSSxFQUNuQixJQUFJLENBQUM7Z0JBRVQsSUFBSSxJQUFJLEdBQUcsR0FBRyxFQUFFO29CQUNaLElBQUksR0FBRyxDQUFDLENBQUM7aUJBQ1o7cUJBQU0sSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFO29CQUNqQixJQUFJLEdBQUcsQ0FBQyxDQUFDO29CQUVULElBQUksSUFBSSxHQUFHLElBQUksRUFBRTt3QkFDYixJQUFJLEdBQUcsR0FBRyxDQUFDO3dCQUNYLEVBQUUsR0FBRyxDQUFDO3FCQUNUO2lCQUNKO3FCQUFNLElBQUksSUFBSSxHQUFHLEdBQUcsRUFBRTtvQkFDbkIsSUFBSSxHQUFHLENBQUMsQ0FBQztpQkFDWjtxQkFBTTtvQkFDSCxJQUFJLEdBQUcsRUFBRSxDQUFDO2lCQUNiO2dCQUVELElBQUksSUFBSSxJQUFJLENBQUM7Z0JBR2IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssRUFBRTtvQkFDN0IsR0FBRyxHQUFHLENBQUMsQ0FBQztpQkFDWDtnQkFFRCxJQUFJLE1BQU0sR0FBVztvQkFDakIsUUFBUSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztvQkFDMUIsY0FBYyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztpQkFDaEYsQ0FBQztnQkFFRixPQUFPLE1BQU0sQ0FBQztZQUNsQixDQUFDLENBQUM7O1lBQ0ksdUJBQXVCLEdBQUcsVUFBVSxVQUFVLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxZQUFZO2dCQUM3RSxJQUFJLENBQUMsR0FBRyxZQUFZLENBQUM7Z0JBQ3JCLElBQUksVUFBVSxJQUFJLE1BQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtvQkFDN0YsTUFBTSxHQUFHLGdCQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ3BFLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO3dCQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUM7cUJBQzVDO29CQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUN4QyxJQUFJLEtBQUssSUFBSSxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFOzRCQUM1QixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDcEI7cUJBQ0o7b0JBQ0QsT0FBTyxnQkFBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQ2hDO2dCQUNELE9BQU8sQ0FBQyxDQUFDO1lBRWIsQ0FBQyxDQUFDOztZQUNJLG1CQUFtQixHQUFHLFVBQVUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNO2dCQUN6RCxJQUFJLFdBQVcsR0FBUSxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQzVELElBQUksVUFBVSxHQUFHLGFBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzFDLE9BQU8sVUFBVSxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUMvRSxDQUFDLENBQUM7O1lBQ0ksNEJBQTRCLEdBQUcsVUFBVSxNQUFNO2dCQUNqRCxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN2QixJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUM7Z0JBQ3pCLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtvQkFDM0YsV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQzdDO3FCQUFNO29CQUNILFdBQVcsR0FBRyxNQUFNLENBQUM7aUJBQ3hCO2dCQUNELE9BQU8sV0FBVyxDQUFDO1lBQ3ZCLENBQUMsQ0FBQzs7WUFDSSx3QkFBd0IsR0FBRyxVQUFVLE1BQU0sRUFBRSxLQUFLO2dCQUNwRCxJQUFJLEtBQUssR0FBVSxFQUFFLENBQUM7Z0JBQ3RCLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNsRCxJQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFFeEQsSUFBTSxxQkFBcUIsR0FBRyxVQUFVLE1BQWM7d0JBQ2xELElBQU0sV0FBVyxHQUFRLEVBQUUsQ0FBQzt3QkFDNUIsTUFBTSxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsRUFBRSxVQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUs7NEJBQ25FLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0NBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzs2QkFDekI7NEJBQ0QsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQzs0QkFDekIsT0FBTyxFQUFFLENBQUM7d0JBQ2QsQ0FBQyxDQUFDLENBQUM7d0JBQ0gsT0FBTyxXQUFXLENBQUM7b0JBQ3ZCLENBQUMsQ0FBQztvQkFDRixnQkFBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFDLENBQVMsRUFBRSxDQUFTO3dCQUMzRCxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDckMsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO3dCQUNwRCxJQUFJLFlBQVksR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7d0JBQ3hFLEtBQUssR0FBRyxZQUFZOzZCQUNmLEtBQUssQ0FBQyxHQUFHLENBQUM7NkJBQ1YsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQW5CLENBQW1CLENBQUM7NkJBQ2hDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUE5QixDQUE4QixDQUFDOzZCQUM5QyxHQUFHLENBQUMsVUFBQSxJQUFJOzRCQUNMLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dDQUM5QixJQUFJLEdBQUcsR0FBUSxFQUFFLENBQUM7Z0NBQ2xCLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQ0FDcEMsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2dDQUN0QyxPQUFPLEdBQUcsQ0FBQzs2QkFDZDtpQ0FBTTtnQ0FDSCxPQUFPLElBQUksQ0FBQzs2QkFDZjt3QkFDTCxDQUFDLENBQUM7NkJBQ0QsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQyxDQUFDO3FCQUM3QjtpQkFDSjtnQkFDRCxPQUFPLEtBQUssQ0FBQztZQUNqQixDQUFDLENBQUM7O1lBRUksdUJBQXVCLEdBQUcsVUFBVSxLQUFhLEVBQUUsSUFBVztnQkFDaEUsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3pCLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxFQUFFLEVBQUU7d0JBQ3RCLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ2hHLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDYjtnQkFDRCxPQUFPLEtBQUssQ0FBQztZQUNqQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZ3JhZmFuYS1zZGstbW9ja3MvYXBwL2hlYWRlcnMvY29tbW9uLmQudHNcIiAvPlxyXG5cclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQga2JuIGZyb20gJ2FwcC9jb3JlL3V0aWxzL2tibic7XHJcblxyXG5jb25zdCBub3JtYWxpemVDb2xvciA9IGZ1bmN0aW9uIChjb2xvcikge1xyXG4gICAgaWYgKGNvbG9yLnRvTG93ZXJDYXNlKCkgPT09IFwiZ3JlZW5cIikge1xyXG4gICAgICAgIHJldHVybiBcInJnYmEoNTAsIDE3MiwgNDUsIDAuOTcpXCI7XHJcbiAgICB9IGVsc2UgaWYgKGNvbG9yLnRvTG93ZXJDYXNlKCkgPT09IFwib3JhbmdlXCIpIHtcclxuICAgICAgICByZXR1cm4gXCJyZ2JhKDIzNywgMTI5LCA0MCwgMC44OSlcIjtcclxuICAgIH0gZWxzZSBpZiAoY29sb3IudG9Mb3dlckNhc2UoKSA9PT0gXCJyZWRcIikge1xyXG4gICAgICAgIHJldHVybiBcInJnYmEoMjQ1LCA1NCwgNTQsIDAuOSlcIjtcclxuICAgIH0gZWxzZSB7IHJldHVybiBjb2xvci50b0xvd2VyQ2FzZSgpOyB9XHJcbn07XHJcbmNvbnN0IHBhcnNlTWF0aEV4cHJlc3Npb24gPSBmdW5jdGlvbiAoZXhwcmVzc2lvbiwgaW5kZXgpOiBudW1iZXIge1xyXG4gICAgbGV0IHZhbHVlc3RyaW5nID0gZXhwcmVzc2lvbi5yZXBsYWNlKC9cXF8vZywgXCJcIikuc3BsaXQoXCIsXCIpW2luZGV4XTtcclxuICAgIGxldCByZXR1cm52YWx1ZSA9IDA7XHJcbiAgICBpZiAodmFsdWVzdHJpbmcuaW5kZXhPZihcIitcIikgPiAtMSkge1xyXG4gICAgICAgIHJldHVybnZhbHVlID0gKyh2YWx1ZXN0cmluZy5zcGxpdChcIitcIilbMF0pICsgKyh2YWx1ZXN0cmluZy5zcGxpdChcIitcIilbMV0pO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZXN0cmluZy5pbmRleE9mKFwiLVwiKSA+IC0xKSB7XHJcbiAgICAgICAgcmV0dXJudmFsdWUgPSArKHZhbHVlc3RyaW5nLnNwbGl0KFwiLVwiKVswXSkgLSArKHZhbHVlc3RyaW5nLnNwbGl0KFwiLVwiKVsxXSk7XHJcbiAgICB9IGVsc2UgaWYgKHZhbHVlc3RyaW5nLmluZGV4T2YoXCIqXCIpID4gLTEpIHtcclxuICAgICAgICByZXR1cm52YWx1ZSA9ICsodmFsdWVzdHJpbmcuc3BsaXQoXCIqXCIpWzBdKSAqICsodmFsdWVzdHJpbmcuc3BsaXQoXCIqXCIpWzFdKTtcclxuICAgIH0gZWxzZSBpZiAodmFsdWVzdHJpbmcuaW5kZXhPZihcIi9cIikgPiAtMSkge1xyXG4gICAgICAgIHJldHVybnZhbHVlID0gKyh2YWx1ZXN0cmluZy5zcGxpdChcIi9cIilbMF0pIC8gKyh2YWx1ZXN0cmluZy5zcGxpdChcIi9cIilbMV0pO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZXN0cmluZy5pbmRleE9mKFwibWluXCIpID4gLTEpIHtcclxuICAgICAgICByZXR1cm52YWx1ZSA9IF8ubWluKFsrKHZhbHVlc3RyaW5nLnNwbGl0KFwibWluXCIpWzBdKSwgKyh2YWx1ZXN0cmluZy5zcGxpdChcIm1pblwiKVsxXSldKSB8fCAwO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZXN0cmluZy5pbmRleE9mKFwibWF4XCIpID4gLTEpIHtcclxuICAgICAgICByZXR1cm52YWx1ZSA9IF8ubWF4KFsrKHZhbHVlc3RyaW5nLnNwbGl0KFwibWF4XCIpWzBdKSwgKyh2YWx1ZXN0cmluZy5zcGxpdChcIm1heFwiKVsxXSldKSB8fCAwO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZXN0cmluZy5pbmRleE9mKFwibWVhblwiKSA+IC0xKSB7XHJcbiAgICAgICAgcmV0dXJudmFsdWUgPSBfLm1lYW4oWysodmFsdWVzdHJpbmcuc3BsaXQoXCJhdmdcIilbMF0pLCArKHZhbHVlc3RyaW5nLnNwbGl0KFwiYXZnXCIpWzFdKV0pIHx8IDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybnZhbHVlID0gKyh2YWx1ZXN0cmluZyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZCgrKHJldHVybnZhbHVlKSk7XHJcbn07XHJcbmNvbnN0IGdldENvbG9yID0gZnVuY3Rpb24gKGV4cHJlc3Npb24sIGluZGV4KSB7XHJcbiAgICBsZXQgcmV0dXJuVmFsdWUgPSAoZXhwcmVzc2lvbiB8fCBcIlwiKS5zcGxpdChcIixcIikubGVuZ3RoID4gaW5kZXggPyBgIHN0eWxlPVwiY29sb3I6JHtub3JtYWxpemVDb2xvcihleHByZXNzaW9uLnJlcGxhY2UoL1xcXy9nLCBcIlwiKS5zcGxpdChcIixcIilbaW5kZXhdKX1cIiBgIDogXCJcIjtcclxuICAgIHJldHVybiByZXR1cm5WYWx1ZTtcclxufTtcclxuY29uc3QgcmVwbGFjZVRva2VucyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgaWYgKCF2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH1cclxuICAgIHZhbHVlID0gdmFsdWUgKyBcIlwiO1xyXG4gICAgdmFsdWUgPSB2YWx1ZS5zcGxpdChcIiBcIikubWFwKGEgPT4ge1xyXG4gICAgICAgIGlmIChhLnN0YXJ0c1dpdGgoXCJfZmEtXCIpICYmIGEuZW5kc1dpdGgoXCJfXCIpKSB7XHJcbiAgICAgICAgICAgIGxldCByZXR1cm52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGxldCBpY29uID0gYS5yZXBsYWNlKC9cXF8vZywgXCJcIikuc3BsaXQoXCIsXCIpWzBdO1xyXG4gICAgICAgICAgICBsZXQgY29sb3IgPSBnZXRDb2xvcihhLCAxKTtcclxuICAgICAgICAgICAgbGV0IHJlcGVhdENvdW50ID0gYS5zcGxpdChcIixcIikubGVuZ3RoID49IDMgPyBwYXJzZU1hdGhFeHByZXNzaW9uKGEsIDIpIDogMTtcclxuICAgICAgICAgICAgcmV0dXJudmFsdWUgPSBgPGkgY2xhc3M9XCJmYSAke2ljb259XCIgJHtjb2xvcn0+PC9pPiBgLnJlcGVhdChyZXBlYXRDb3VudCk7XHJcbiAgICAgICAgICAgIGlmIChhLnNwbGl0KFwiLFwiKS5sZW5ndGggPj0gNCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1heENvbG9yID0gZ2V0Q29sb3IoYSwgMyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWF4TGVuZ3RoID0gYS5zcGxpdChcIixcIikubGVuZ3RoID49IDUgPyBwYXJzZU1hdGhFeHByZXNzaW9uKGEsIDQpIDogMDtcclxuICAgICAgICAgICAgICAgIHJldHVybnZhbHVlICs9IGA8aSBjbGFzcz1cImZhICR7aWNvbn1cIiAke21heENvbG9yfT48L2k+IGAucmVwZWF0KF8ubWF4KFttYXhMZW5ndGggLSByZXBlYXRDb3VudCwgMF0pIHx8IDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXR1cm52YWx1ZTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChhLnN0YXJ0c1dpdGgoXCJfaW1nLVwiKSAmJiBhLmVuZHNXaXRoKFwiX1wiKSkge1xyXG4gICAgICAgICAgICBhID0gYS5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgICAgIGxldCBpbWdVcmwgPSBhLnJlcGxhY2UoXCJfaW1nLVwiLCBcIlwiKS5zcGxpdChcIixcIilbMF07XHJcbiAgICAgICAgICAgIGxldCBpbWdXaWR0aCA9IGEuc3BsaXQoXCIsXCIpLmxlbmd0aCA+IDEgPyBhLnJlcGxhY2UoXCJfaW1nLVwiLCBcIlwiKS5zcGxpdChcIixcIilbMV0gOiBcIjIwcHhcIjtcclxuICAgICAgICAgICAgbGV0IGltZ0hlaWdodCA9IGEuc3BsaXQoXCIsXCIpLmxlbmd0aCA+IDIgPyBhLnJlcGxhY2UoXCJfaW1nLVwiLCBcIlwiKS5zcGxpdChcIixcIilbMl0gOiBcIjIwcHhcIjtcclxuICAgICAgICAgICAgbGV0IHJlcGVhdENvdW50ID0gYS5zcGxpdChcIixcIikubGVuZ3RoID4gMyA/ICsoYS5yZXBsYWNlKFwiX2ltZy1cIiwgXCJcIikuc3BsaXQoXCIsXCIpWzNdKSA6IDE7XHJcbiAgICAgICAgICAgIGEgPSBgPGltZyB3aWR0aD1cIiR7aW1nV2lkdGh9XCIgaGVpZ2h0PVwiJHtpbWdIZWlnaHR9XCIgc3JjPVwiJHtpbWdVcmx9XCIvPmAucmVwZWF0KHJlcGVhdENvdW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9KS5qb2luKFwiIFwiKTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufTtcclxuY29uc3QgZ2V0QWN0dWFsTmFtZVdpdGhvdXRUb2tlbnMgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgIGlmICghdmFsdWUpIHsgcmV0dXJuIHZhbHVlICsgXCJcIjsgfVxyXG4gICAgdmFsdWUgPSB2YWx1ZSArIFwiXCI7XHJcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoXCIgXCIpLm1hcChhID0+IHtcclxuICAgICAgICBpZiAoYS5zdGFydHNXaXRoKFwiX2ZhLVwiKSAmJiBhLmVuZHNXaXRoKFwiX1wiKSkge1xyXG4gICAgICAgICAgICBhID0gYGA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhLnN0YXJ0c1dpdGgoXCJfaW1nLVwiKSAmJiBhLmVuZHNXaXRoKFwiX1wiKSkge1xyXG4gICAgICAgICAgICBhID0gYGA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgfSkuam9pbihcIiBcIik7XHJcbn07XHJcbmNvbnN0IGdldERlY2ltYWxzRm9yVmFsdWUgPSBmdW5jdGlvbiAodmFsdWUsIF9kZWNpbWFscykge1xyXG4gICAgaWYgKF8uaXNOdW1iZXIoK19kZWNpbWFscykpIHtcclxuICAgICAgICBsZXQgbzogT2JqZWN0ID0ge1xyXG4gICAgICAgICAgICBkZWNpbWFsczogX2RlY2ltYWxzLFxyXG4gICAgICAgICAgICBzY2FsZWREZWNpbWFsczogbnVsbFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIG87XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGRlbHRhID0gdmFsdWUgLyAyO1xyXG4gICAgbGV0IGRlYyA9IC1NYXRoLmZsb29yKE1hdGgubG9nKGRlbHRhKSAvIE1hdGguTE4xMCk7XHJcblxyXG4gICAgbGV0IG1hZ24gPSBNYXRoLnBvdygxMCwgLWRlYyksXHJcbiAgICAgICAgbm9ybSA9IGRlbHRhIC8gbWFnbiwgLy8gbm9ybSBpcyBiZXR3ZWVuIDEuMCBhbmQgMTAuMFxyXG4gICAgICAgIHNpemU7XHJcblxyXG4gICAgaWYgKG5vcm0gPCAxLjUpIHtcclxuICAgICAgICBzaXplID0gMTtcclxuICAgIH0gZWxzZSBpZiAobm9ybSA8IDMpIHtcclxuICAgICAgICBzaXplID0gMjtcclxuICAgICAgICAvLyBzcGVjaWFsIGNhc2UgZm9yIDIuNSwgcmVxdWlyZXMgYW4gZXh0cmEgZGVjaW1hbFxyXG4gICAgICAgIGlmIChub3JtID4gMi4yNSkge1xyXG4gICAgICAgICAgICBzaXplID0gMi41O1xyXG4gICAgICAgICAgICArK2RlYztcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKG5vcm0gPCA3LjUpIHtcclxuICAgICAgICBzaXplID0gNTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2l6ZSA9IDEwO1xyXG4gICAgfVxyXG5cclxuICAgIHNpemUgKj0gbWFnbjtcclxuXHJcbiAgICAvLyByZWR1Y2Ugc3RhcnRpbmcgZGVjaW1hbHMgaWYgbm90IG5lZWRlZFxyXG4gICAgaWYgKE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZSkge1xyXG4gICAgICAgIGRlYyA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJlc3VsdDogT2JqZWN0ID0ge1xyXG4gICAgICAgIGRlY2ltYWxzOiBNYXRoLm1heCgwLCBkZWMpLFxyXG4gICAgICAgIHNjYWxlZERlY2ltYWxzOiBNYXRoLm1heCgwLCBkZWMpIC0gTWF0aC5mbG9vcihNYXRoLmxvZyhzaXplKSAvIE1hdGguTE4xMCkgKyAyXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcbmNvbnN0IGdldEl0ZW1CYXNlZE9uVGhyZXNob2xkID0gZnVuY3Rpb24gKHRocmVzaG9sZHMsIHJhbmdlcywgdmFsdWUsIGRlZmF1bHRWYWx1ZSk6IHN0cmluZyB7XHJcbiAgICBsZXQgYyA9IGRlZmF1bHRWYWx1ZTtcclxuICAgIGlmICh0aHJlc2hvbGRzICYmIHJhbmdlcyAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgJiYgdGhyZXNob2xkcy5sZW5ndGggKyAxIDw9IHJhbmdlcy5sZW5ndGgpIHtcclxuICAgICAgICByYW5nZXMgPSBfLmRyb3BSaWdodChyYW5nZXMsIHJhbmdlcy5sZW5ndGggLSB0aHJlc2hvbGRzLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgIGlmIChyYW5nZXNbcmFuZ2VzLmxlbmd0aCAtIDFdID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHJhbmdlc1tyYW5nZXMubGVuZ3RoIC0gMV0gPSBkZWZhdWx0VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aHJlc2hvbGRzLmxlbmd0aDsgaSA+IDA7IGktLSkge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPj0gdGhyZXNob2xkc1tpIC0gMV0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByYW5nZXNbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIF8uZmlyc3QocmFuZ2VzKSB8fCBcIlwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGM7XHJcblxyXG59O1xyXG5jb25zdCBnZXRfZm9ybWF0dGVkX3ZhbHVlID0gZnVuY3Rpb24gKHZhbHVlLCBkZWNpbWFscywgZm9ybWF0KTogc3RyaW5nIHtcclxuICAgIGxldCBkZWNpbWFsSW5mbzogYW55ID0gZ2V0RGVjaW1hbHNGb3JWYWx1ZSh2YWx1ZSwgZGVjaW1hbHMpO1xyXG4gICAgbGV0IGZvcm1hdEZ1bmMgPSBrYm4udmFsdWVGb3JtYXRzW2Zvcm1hdF07XHJcbiAgICByZXR1cm4gZm9ybWF0RnVuYyh2YWx1ZSwgZGVjaW1hbEluZm8uZGVjaW1hbHMsIGRlY2ltYWxJbmZvLnNjYWxlZERlY2ltYWxzKTtcclxufTtcclxuY29uc3QgZ2V0TWV0cmljTmFtZUZyb21UYWdnZWRBbGlhcyA9IGZ1bmN0aW9uICh0YXJnZXQpOiBzdHJpbmcge1xyXG4gICAgdGFyZ2V0ID0gdGFyZ2V0LnRyaW0oKTtcclxuICAgIGxldCBfbWV0cmljbmFtZSA9IHRhcmdldDtcclxuICAgIGlmICh0YXJnZXQuaW5kZXhPZihcIntcIikgPiAtMSAmJiB0YXJnZXQuaW5kZXhPZihcIn1cIikgPiAtMSAmJiB0YXJnZXRbdGFyZ2V0Lmxlbmd0aCAtIDFdID09PSBcIn1cIikge1xyXG4gICAgICAgIF9tZXRyaWNuYW1lID0gdGFyZ2V0LnNwbGl0KFwie1wiKVswXS50cmltKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIF9tZXRyaWNuYW1lID0gdGFyZ2V0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9tZXRyaWNuYW1lO1xyXG59O1xyXG5jb25zdCBnZXRMYWJsZXNGcm9tVGFnZ2VkQWxpYXMgPSBmdW5jdGlvbiAodGFyZ2V0LCBsYWJlbCk6IGFueVtdIHtcclxuICAgIGxldCBfdGFnczogYW55W10gPSBbXTtcclxuICAgIHRhcmdldCA9IHRhcmdldC50cmltKCk7XHJcbiAgICBsZXQgdGFnc3N0cmluZyA9IHRhcmdldC5yZXBsYWNlKGxhYmVsLCBcIlwiKS50cmltKCk7XHJcbiAgICBpZiAodGFnc3N0cmluZy5zdGFydHNXaXRoKFwie1wiKSAmJiB0YWdzc3RyaW5nLmVuZHNXaXRoKFwifVwiKSkge1xyXG4gICAgICAgIC8vIFNuaXBwZXQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZ3JhZmFuYS9ncmFmYW5hL2Jsb2IvM2YxNTE3MDkxNGMzMTg5ZWU3ODM1ZjBiMTlmZjUwMGRiMTEzYWY3My9wYWNrYWdlcy9ncmFmYW5hLWRhdGEvc3JjL3V0aWxzL2xhYmVscy50c1xyXG4gICAgICAgIGNvbnN0IHBhcnNlUHJvbWV0aGV1c0xhYmVscyA9IGZ1bmN0aW9uIChsYWJlbHM6IHN0cmluZykge1xyXG4gICAgICAgICAgICBjb25zdCBsYWJlbHNCeUtleTogYW55ID0ge307XHJcbiAgICAgICAgICAgIGxhYmVscy5yZXBsYWNlKC9cXGIoXFx3KykoIT89fj8pXCIoW15cIlxcbl0qPylcIi9nLCAoX18sIGtleSwgb3BlcmF0b3IsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW9wZXJhdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cob3BlcmF0b3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGFiZWxzQnlLZXlba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGxhYmVsc0J5S2V5O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXy5lYWNoKHBhcnNlUHJvbWV0aGV1c0xhYmVscyh0YWdzc3RyaW5nKSwgKGs6IHN0cmluZywgdjogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIF90YWdzLnB1c2goeyB0YWc6IHYsIHZhbHVlOiBrIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0YWdzc3RyaW5nLmluZGV4T2YoXCI6XCIpID4gLTEgJiYgX3RhZ3MubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBsYWJlbF92YWx1ZXMgPSB0YWdzc3RyaW5nLnNsaWNlKDEpLnRyaW0oKS5zbGljZSgwLCAtMSkudHJpbSgpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgIF90YWdzID0gbGFiZWxfdmFsdWVzXHJcbiAgICAgICAgICAgICAgICAuc3BsaXQoXCIsXCIpXHJcbiAgICAgICAgICAgICAgICAubWFwKGl0ZW0gPT4gKGl0ZW0gfHwgXCJcIikudHJpbSgpKVxyXG4gICAgICAgICAgICAgICAgLmZpbHRlcihpdGVtID0+IGl0ZW0gJiYgaXRlbS5pbmRleE9mKFwiOlwiKSA+IC0xKVxyXG4gICAgICAgICAgICAgICAgLm1hcChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5zcGxpdChcIjpcIikubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXQ6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQudGFnID0gaXRlbS5zcGxpdChcIjpcIilbMF0udHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQudmFsdWUgPSBpdGVtLnNwbGl0KFwiOlwiKVsxXS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoaXRlbSA9PiBpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX3RhZ3M7XHJcbn07XHJcblxyXG5jb25zdCByZXBsYWNlX3RhZ3NfZnJvbV9maWVsZCA9IGZ1bmN0aW9uIChmaWVsZDogc3RyaW5nLCB0YWdzOiBhbnlbXSk6IHN0cmluZyB7XHJcbiAgICBpZiAodGFncyAmJiB0YWdzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBmaWVsZCA9IHRhZ3MucmVkdWNlKChyLCBpdCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gci5yZXBsYWNlKG5ldyBSZWdFeHAoXCJ7e1wiICsgaXQudGFnLnRyaW0oKSArIFwifX1cIiwgXCJnXCIpLCBpdC52YWx1ZSkucmVwbGFjZSgvXFxcIi9nLCBcIlwiKTtcclxuICAgICAgICB9LCBmaWVsZCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmllbGQ7XHJcbn07XHJcbmV4cG9ydCB7XHJcbiAgICBub3JtYWxpemVDb2xvcixcclxuICAgIHJlcGxhY2VUb2tlbnMsXHJcbiAgICBnZXRBY3R1YWxOYW1lV2l0aG91dFRva2VucyxcclxuICAgIGdldERlY2ltYWxzRm9yVmFsdWUsXHJcbiAgICBnZXRJdGVtQmFzZWRPblRocmVzaG9sZCxcclxuICAgIGdldF9mb3JtYXR0ZWRfdmFsdWUsXHJcbiAgICBnZXRNZXRyaWNOYW1lRnJvbVRhZ2dlZEFsaWFzLFxyXG4gICAgZ2V0TGFibGVzRnJvbVRhZ2dlZEFsaWFzLFxyXG4gICAgcmVwbGFjZV90YWdzX2Zyb21fZmllbGRcclxufTtcclxuIl19