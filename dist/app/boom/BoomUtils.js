System.register(["lodash"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, normalizeColor, parseMath, parseMathExpression, getColor, replaceTokens, getActualNameWithoutTokens, getItemBasedOnThreshold, getMetricNameFromTaggedAlias, getLablesFromTaggedAlias, replace_tags_from_field;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
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
                    return color.trim();
                }
            };
            exports_1("normalizeColor", normalizeColor);
            parseMath = function (valuestring) {
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
            };
            exports_1("parseMath", parseMath);
            parseMathExpression = function (expression, index) {
                var valuestring = expression.replace(/\_/g, "").split(",")[index];
                return +(parseMath(valuestring));
            };
            exports_1("parseMathExpression", parseMathExpression);
            getColor = function (expression, index) {
                var returnValue = (expression || "").split(",").length > index ? " style=\"color:" + normalizeColor(expression.replace(/\_/g, "").split(",")[index]) + "\" " : "";
                return returnValue;
            };
            exports_1("getColor", getColor);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbVV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9ib29tL0Jvb21VdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztZQUlNLGNBQWMsR0FBRyxVQUFVLEtBQUs7Z0JBQ2xDLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLE9BQU8sRUFBRTtvQkFDakMsT0FBTyx5QkFBeUIsQ0FBQztpQkFDcEM7cUJBQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssUUFBUSxFQUFFO29CQUN6QyxPQUFPLDBCQUEwQixDQUFDO2lCQUNyQztxQkFBTSxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxLQUFLLEVBQUU7b0JBQ3RDLE9BQU8sd0JBQXdCLENBQUM7aUJBQ25DO3FCQUFNO29CQUFFLE9BQU8sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUFFO1lBQ25DLENBQUMsQ0FBQzs7WUFDSSxTQUFTLEdBQUcsVUFBVSxXQUFtQjtnQkFDM0MsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQy9CLFdBQVcsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzdFO3FCQUFNLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtvQkFDdEMsV0FBVyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENB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SSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQ0FDcEMsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2dDQUN0QyxPQUFPLEdBQUcsQ0FBQzs2QkFDZDtpQ0FBTTtnQ0FDSCxPQUFPLElBQUksQ0FBQzs2QkFDZjt3QkFDTCxDQUFDLENBQUM7NkJBQ0QsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQyxDQUFDO3FCQUM3QjtpQkFDSjtnQkFDRCxPQUFPLEtBQUssQ0FBQztZQUNqQixDQUFDLENBQUM7O1lBQ0ksdUJBQXVCLEdBQUcsVUFBVSxLQUFhLEVBQUUsSUFBVztnQkFDaEUsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3pCLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxFQUFFLEVBQUU7d0JBQ3RCLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ2hHLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDYjtnQkFDRCxPQUFPLEtBQUssQ0FBQztZQUNqQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUNvbG9yID0gZnVuY3Rpb24gKGNvbG9yKSB7XHJcbiAgICBpZiAoY29sb3IudG9Mb3dlckNhc2UoKSA9PT0gXCJncmVlblwiKSB7XHJcbiAgICAgICAgcmV0dXJuIFwicmdiYSg1MCwgMTcyLCA0NSwgMC45NylcIjtcclxuICAgIH0gZWxzZSBpZiAoY29sb3IudG9Mb3dlckNhc2UoKSA9PT0gXCJvcmFuZ2VcIikge1xyXG4gICAgICAgIHJldHVybiBcInJnYmEoMjM3LCAxMjksIDQwLCAwLjg5KVwiO1xyXG4gICAgfSBlbHNlIGlmIChjb2xvci50b0xvd2VyQ2FzZSgpID09PSBcInJlZFwiKSB7XHJcbiAgICAgICAgcmV0dXJuIFwicmdiYSgyNDUsIDU0LCA1NCwgMC45KVwiO1xyXG4gICAgfSBlbHNlIHsgcmV0dXJuIGNvbG9yLnRyaW0oKTsgfVxyXG59O1xyXG5jb25zdCBwYXJzZU1hdGggPSBmdW5jdGlvbiAodmFsdWVzdHJpbmc6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICBsZXQgcmV0dXJudmFsdWUgPSAwO1xyXG4gICAgaWYgKHZhbHVlc3RyaW5nLmluZGV4T2YoXCIrXCIpID4gLTEpIHtcclxuICAgICAgICByZXR1cm52YWx1ZSA9ICsodmFsdWVzdHJpbmcuc3BsaXQoXCIrXCIpWzBdKSArICsodmFsdWVzdHJpbmcuc3BsaXQoXCIrXCIpWzFdKTtcclxuICAgIH0gZWxzZSBpZiAodmFsdWVzdHJpbmcuaW5kZXhPZihcIi1cIikgPiAtMSkge1xyXG4gICAgICAgIHJldHVybnZhbHVlID0gKyh2YWx1ZXN0cmluZy5zcGxpdChcIi1cIilbMF0pIC0gKyh2YWx1ZXN0cmluZy5zcGxpdChcIi1cIilbMV0pO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZXN0cmluZy5pbmRleE9mKFwiKlwiKSA+IC0xKSB7XHJcbiAgICAgICAgcmV0dXJudmFsdWUgPSArKHZhbHVlc3RyaW5nLnNwbGl0KFwiKlwiKVswXSkgKiArKHZhbHVlc3RyaW5nLnNwbGl0KFwiKlwiKVsxXSk7XHJcbiAgICB9IGVsc2UgaWYgKHZhbHVlc3RyaW5nLmluZGV4T2YoXCIvXCIpID4gLTEpIHtcclxuICAgICAgICByZXR1cm52YWx1ZSA9ICsodmFsdWVzdHJpbmcuc3BsaXQoXCIvXCIpWzBdKSAvICsodmFsdWVzdHJpbmcuc3BsaXQoXCIvXCIpWzFdKTtcclxuICAgIH0gZWxzZSBpZiAodmFsdWVzdHJpbmcuaW5kZXhPZihcIm1pblwiKSA+IC0xKSB7XHJcbiAgICAgICAgcmV0dXJudmFsdWUgPSBfLm1pbihbKyh2YWx1ZXN0cmluZy5zcGxpdChcIm1pblwiKVswXSksICsodmFsdWVzdHJpbmcuc3BsaXQoXCJtaW5cIilbMV0pXSkgfHwgMDtcclxuICAgIH0gZWxzZSBpZiAodmFsdWVzdHJpbmcuaW5kZXhPZihcIm1heFwiKSA+IC0xKSB7XHJcbiAgICAgICAgcmV0dXJudmFsdWUgPSBfLm1heChbKyh2YWx1ZXN0cmluZy5zcGxpdChcIm1heFwiKVswXSksICsodmFsdWVzdHJpbmcuc3BsaXQoXCJtYXhcIilbMV0pXSkgfHwgMDtcclxuICAgIH0gZWxzZSBpZiAodmFsdWVzdHJpbmcuaW5kZXhPZihcIm1lYW5cIikgPiAtMSkge1xyXG4gICAgICAgIHJldHVybnZhbHVlID0gXy5tZWFuKFsrKHZhbHVlc3RyaW5nLnNwbGl0KFwiYXZnXCIpWzBdKSwgKyh2YWx1ZXN0cmluZy5zcGxpdChcImF2Z1wiKVsxXSldKSB8fCAwO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm52YWx1ZSA9ICsodmFsdWVzdHJpbmcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIE1hdGgucm91bmQoK3JldHVybnZhbHVlKTtcclxufTtcclxuY29uc3QgcGFyc2VNYXRoRXhwcmVzc2lvbiA9IGZ1bmN0aW9uIChleHByZXNzaW9uLCBpbmRleCk6IG51bWJlciB7XHJcbiAgICBsZXQgdmFsdWVzdHJpbmcgPSBleHByZXNzaW9uLnJlcGxhY2UoL1xcXy9nLCBcIlwiKS5zcGxpdChcIixcIilbaW5kZXhdO1xyXG4gICAgcmV0dXJuICsocGFyc2VNYXRoKHZhbHVlc3RyaW5nKSk7XHJcblxyXG59O1xyXG5jb25zdCBnZXRDb2xvciA9IGZ1bmN0aW9uIChleHByZXNzaW9uLCBpbmRleCkge1xyXG4gICAgbGV0IHJldHVyblZhbHVlID0gKGV4cHJlc3Npb24gfHwgXCJcIikuc3BsaXQoXCIsXCIpLmxlbmd0aCA+IGluZGV4ID8gYCBzdHlsZT1cImNvbG9yOiR7bm9ybWFsaXplQ29sb3IoZXhwcmVzc2lvbi5yZXBsYWNlKC9cXF8vZywgXCJcIikuc3BsaXQoXCIsXCIpW2luZGV4XSl9XCIgYCA6IFwiXCI7XHJcbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbn07XHJcbmNvbnN0IHJlcGxhY2VUb2tlbnMgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgIGlmICghdmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9XHJcbiAgICB2YWx1ZSA9IHZhbHVlICsgXCJcIjtcclxuICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoXCIgXCIpLm1hcChhID0+IHtcclxuICAgICAgICBpZiAoYS5zdGFydHNXaXRoKFwiX2ZhLVwiKSAmJiBhLmVuZHNXaXRoKFwiX1wiKSkge1xyXG4gICAgICAgICAgICBsZXQgcmV0dXJudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICBsZXQgaWNvbiA9IGEucmVwbGFjZSgvXFxfL2csIFwiXCIpLnNwbGl0KFwiLFwiKVswXTtcclxuICAgICAgICAgICAgbGV0IGNvbG9yID0gZ2V0Q29sb3IoYSwgMSk7XHJcbiAgICAgICAgICAgIGxldCByZXBlYXRDb3VudCA9IGEuc3BsaXQoXCIsXCIpLmxlbmd0aCA+PSAzID8gcGFyc2VNYXRoRXhwcmVzc2lvbihhLCAyKSA6IDE7XHJcbiAgICAgICAgICAgIHJldHVybnZhbHVlID0gYDxpIGNsYXNzPVwiZmEgJHtpY29ufVwiICR7Y29sb3J9PjwvaT4gYC5yZXBlYXQocmVwZWF0Q291bnQpO1xyXG4gICAgICAgICAgICBpZiAoYS5zcGxpdChcIixcIikubGVuZ3RoID49IDQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtYXhDb2xvciA9IGdldENvbG9yKGEsIDMpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1heExlbmd0aCA9IGEuc3BsaXQoXCIsXCIpLmxlbmd0aCA+PSA1ID8gcGFyc2VNYXRoRXhwcmVzc2lvbihhLCA0KSA6IDA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm52YWx1ZSArPSBgPGkgY2xhc3M9XCJmYSAke2ljb259XCIgJHttYXhDb2xvcn0+PC9pPiBgLnJlcGVhdChfLm1heChbbWF4TGVuZ3RoIC0gcmVwZWF0Q291bnQsIDBdKSB8fCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmV0dXJudmFsdWU7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoYS5zdGFydHNXaXRoKFwiX2ltZy1cIikgJiYgYS5lbmRzV2l0aChcIl9cIikpIHtcclxuICAgICAgICAgICAgYSA9IGEuc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgICAgICBsZXQgaW1nVXJsID0gYS5yZXBsYWNlKFwiX2ltZy1cIiwgXCJcIikuc3BsaXQoXCIsXCIpWzBdO1xyXG4gICAgICAgICAgICBsZXQgaW1nV2lkdGggPSBhLnNwbGl0KFwiLFwiKS5sZW5ndGggPiAxID8gYS5yZXBsYWNlKFwiX2ltZy1cIiwgXCJcIikuc3BsaXQoXCIsXCIpWzFdIDogXCIyMHB4XCI7XHJcbiAgICAgICAgICAgIGxldCBpbWdIZWlnaHQgPSBhLnNwbGl0KFwiLFwiKS5sZW5ndGggPiAyID8gYS5yZXBsYWNlKFwiX2ltZy1cIiwgXCJcIikuc3BsaXQoXCIsXCIpWzJdIDogXCIyMHB4XCI7XHJcbiAgICAgICAgICAgIGxldCByZXBlYXRDb3VudCA9IGEuc3BsaXQoXCIsXCIpLmxlbmd0aCA+IDMgPyArKGEucmVwbGFjZShcIl9pbWctXCIsIFwiXCIpLnNwbGl0KFwiLFwiKVszXSkgOiAxO1xyXG4gICAgICAgICAgICBhID0gYDxpbWcgd2lkdGg9XCIke2ltZ1dpZHRofVwiIGhlaWdodD1cIiR7aW1nSGVpZ2h0fVwiIHNyYz1cIiR7aW1nVXJsfVwiLz5gLnJlcGVhdChyZXBlYXRDb3VudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgfSkuam9pbihcIiBcIik7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn07XHJcbmNvbnN0IGdldEFjdHVhbE5hbWVXaXRob3V0VG9rZW5zID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICBpZiAoIXZhbHVlKSB7IHJldHVybiB2YWx1ZSArIFwiXCI7IH1cclxuICAgIHZhbHVlID0gdmFsdWUgKyBcIlwiO1xyXG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KFwiIFwiKS5tYXAoYSA9PiB7XHJcbiAgICAgICAgaWYgKGEuc3RhcnRzV2l0aChcIl9mYS1cIikgJiYgYS5lbmRzV2l0aChcIl9cIikpIHtcclxuICAgICAgICAgICAgYSA9IGBgO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYS5zdGFydHNXaXRoKFwiX2ltZy1cIikgJiYgYS5lbmRzV2l0aChcIl9cIikpIHtcclxuICAgICAgICAgICAgYSA9IGBgO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYTtcclxuICAgIH0pLmpvaW4oXCIgXCIpO1xyXG59O1xyXG5jb25zdCBnZXRJdGVtQmFzZWRPblRocmVzaG9sZCA9IGZ1bmN0aW9uICh0aHJlc2hvbGRzLCByYW5nZXMsIHZhbHVlLCBkZWZhdWx0VmFsdWUpOiBzdHJpbmcge1xyXG4gICAgbGV0IGMgPSBkZWZhdWx0VmFsdWU7XHJcbiAgICBpZiAodGhyZXNob2xkcyAmJiByYW5nZXMgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmIHRocmVzaG9sZHMubGVuZ3RoICsgMSA8PSByYW5nZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgcmFuZ2VzID0gXy5kcm9wUmlnaHQocmFuZ2VzLCByYW5nZXMubGVuZ3RoIC0gdGhyZXNob2xkcy5sZW5ndGggLSAxKTtcclxuICAgICAgICBpZiAocmFuZ2VzW3Jhbmdlcy5sZW5ndGggLSAxXSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICByYW5nZXNbcmFuZ2VzLmxlbmd0aCAtIDFdID0gZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gdGhyZXNob2xkcy5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID49IHRocmVzaG9sZHNbaSAtIDFdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmFuZ2VzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBfLmZpcnN0KHJhbmdlcykgfHwgXCJcIjtcclxuICAgIH1cclxuICAgIHJldHVybiBjO1xyXG5cclxufTtcclxuY29uc3QgZ2V0TWV0cmljTmFtZUZyb21UYWdnZWRBbGlhcyA9IGZ1bmN0aW9uICh0YXJnZXQpOiBzdHJpbmcge1xyXG4gICAgdGFyZ2V0ID0gdGFyZ2V0LnRyaW0oKTtcclxuICAgIGxldCBfbWV0cmljbmFtZSA9IHRhcmdldDtcclxuICAgIGlmICh0YXJnZXQuaW5kZXhPZihcIntcIikgPiAtMSAmJiB0YXJnZXQuaW5kZXhPZihcIn1cIikgPiAtMSAmJiB0YXJnZXRbdGFyZ2V0Lmxlbmd0aCAtIDFdID09PSBcIn1cIikge1xyXG4gICAgICAgIF9tZXRyaWNuYW1lID0gdGFyZ2V0LnNwbGl0KFwie1wiKVswXS50cmltKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIF9tZXRyaWNuYW1lID0gdGFyZ2V0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9tZXRyaWNuYW1lO1xyXG59O1xyXG5jb25zdCBnZXRMYWJsZXNGcm9tVGFnZ2VkQWxpYXMgPSBmdW5jdGlvbiAodGFyZ2V0LCBsYWJlbCk6IGFueVtdIHtcclxuICAgIGxldCBfdGFnczogYW55W10gPSBbXTtcclxuICAgIHRhcmdldCA9IHRhcmdldC50cmltKCk7XHJcbiAgICBsZXQgdGFnc3N0cmluZyA9IHRhcmdldC5yZXBsYWNlKGxhYmVsLCBcIlwiKS50cmltKCk7XHJcbiAgICBpZiAodGFnc3N0cmluZy5zdGFydHNXaXRoKFwie1wiKSAmJiB0YWdzc3RyaW5nLmVuZHNXaXRoKFwifVwiKSkge1xyXG4gICAgICAgIC8vIFNuaXBwZXQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZ3JhZmFuYS9ncmFmYW5hL2Jsb2IvM2YxNTE3MDkxNGMzMTg5ZWU3ODM1ZjBiMTlmZjUwMGRiMTEzYWY3My9wYWNrYWdlcy9ncmFmYW5hLWRhdGEvc3JjL3V0aWxzL2xhYmVscy50c1xyXG4gICAgICAgIGNvbnN0IHBhcnNlUHJvbWV0aGV1c0xhYmVscyA9IGZ1bmN0aW9uIChsYWJlbHM6IHN0cmluZykge1xyXG4gICAgICAgICAgICBjb25zdCBsYWJlbHNCeUtleTogYW55ID0ge307XHJcbiAgICAgICAgICAgIGxhYmVscy5yZXBsYWNlKC9cXGIoXFx3KykoIT89fj8pXCIoW15cIlxcbl0qPylcIi9nLCAoX18sIGtleSwgb3BlcmF0b3IsIHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW9wZXJhdG9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cob3BlcmF0b3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGFiZWxzQnlLZXlba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIGxhYmVsc0J5S2V5O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXy5lYWNoKHBhcnNlUHJvbWV0aGV1c0xhYmVscyh0YWdzc3RyaW5nKSwgKGs6IHN0cmluZywgdjogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIF90YWdzLnB1c2goeyB0YWc6IHYsIHZhbHVlOiBrIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0YWdzc3RyaW5nLmluZGV4T2YoXCI6XCIpID4gLTEgJiYgX3RhZ3MubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBsYWJlbF92YWx1ZXMgPSB0YWdzc3RyaW5nLnNsaWNlKDEpLnRyaW0oKS5zbGljZSgwLCAtMSkudHJpbSgpIHx8IFwiXCI7XHJcbiAgICAgICAgICAgIF90YWdzID0gbGFiZWxfdmFsdWVzXHJcbiAgICAgICAgICAgICAgICAuc3BsaXQoXCIsXCIpXHJcbiAgICAgICAgICAgICAgICAubWFwKGl0ZW0gPT4gKGl0ZW0gfHwgXCJcIikudHJpbSgpKVxyXG4gICAgICAgICAgICAgICAgLmZpbHRlcihpdGVtID0+IGl0ZW0gJiYgaXRlbS5pbmRleE9mKFwiOlwiKSA+IC0xKVxyXG4gICAgICAgICAgICAgICAgLm1hcChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5zcGxpdChcIjpcIikubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZXQ6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQudGFnID0gaXRlbS5zcGxpdChcIjpcIilbMF0udHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQudmFsdWUgPSBpdGVtLnNwbGl0KFwiOlwiKVsxXS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoaXRlbSA9PiBpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX3RhZ3M7XHJcbn07XHJcbmNvbnN0IHJlcGxhY2VfdGFnc19mcm9tX2ZpZWxkID0gZnVuY3Rpb24gKGZpZWxkOiBzdHJpbmcsIHRhZ3M6IGFueVtdKTogc3RyaW5nIHtcclxuICAgIGlmICh0YWdzICYmIHRhZ3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGZpZWxkID0gdGFncy5yZWR1Y2UoKHIsIGl0KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiByLnJlcGxhY2UobmV3IFJlZ0V4cChcInt7XCIgKyBpdC50YWcudHJpbSgpICsgXCJ9fVwiLCBcImdcIiksIGl0LnZhbHVlKS5yZXBsYWNlKC9cXFwiL2csIFwiXCIpO1xyXG4gICAgICAgIH0sIGZpZWxkKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmaWVsZDtcclxufTtcclxuZXhwb3J0IHtcclxuICAgIG5vcm1hbGl6ZUNvbG9yLFxyXG4gICAgcmVwbGFjZVRva2VucyxcclxuICAgIGdldENvbG9yLFxyXG4gICAgZ2V0QWN0dWFsTmFtZVdpdGhvdXRUb2tlbnMsXHJcbiAgICBnZXRJdGVtQmFzZWRPblRocmVzaG9sZCxcclxuICAgIGdldE1ldHJpY05hbWVGcm9tVGFnZ2VkQWxpYXMsXHJcbiAgICBnZXRMYWJsZXNGcm9tVGFnZ2VkQWxpYXMsXHJcbiAgICBwYXJzZU1hdGgsXHJcbiAgICBwYXJzZU1hdGhFeHByZXNzaW9uLFxyXG4gICAgcmVwbGFjZV90YWdzX2Zyb21fZmllbGRcclxufTtcclxuIl19