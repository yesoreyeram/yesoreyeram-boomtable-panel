System.register(["lodash"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, normalizeColor, parseMathExpression, getColor, replaceTokens, getActualNameWithoutTokens, getDecimalsForValue, getItemBasedOnThreshold;
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
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbVV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9ib29tL0Jvb21VdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztZQUVNLGNBQWMsR0FBRyxVQUFVLEtBQUs7Z0JBQ2xDLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLE9BQU8sRUFBRTtvQkFDakMsT0FBTyx5QkFBeUIsQ0FBQztpQkFDcEM7cUJBQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssUUFBUSxFQUFFO29CQUN6QyxPQUFPLDBCQUEwQixDQUFDO2lCQUNyQztxQkFBTSxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxLQUFLLEVBQUU7b0JBQ3RDLE9BQU8sd0JBQXdCLENBQUM7aUJBQ25DO3FCQUFNO29CQUFFLE9BQU8sS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUFFO1lBQzFDLENBQUMsQ0FBQzs7WUFDSSxtQkFBbUIsR0FBRyxVQUFVLFVBQVUsRUFBRSxLQUFLO2dCQUNuRCxJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xFLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO29CQUMvQixXQUFXLEdBQUcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM3RTtxQkFBTSxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxD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cEI7cUJBQ0o7b0JBQ0QsT0FBTyxnQkFBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQ2hDO2dCQUNELE9BQU8sQ0FBQyxDQUFDO1lBRWIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5cclxuY29uc3Qgbm9ybWFsaXplQ29sb3IgPSBmdW5jdGlvbiAoY29sb3IpIHtcclxuICAgIGlmIChjb2xvci50b0xvd2VyQ2FzZSgpID09PSBcImdyZWVuXCIpIHtcclxuICAgICAgICByZXR1cm4gXCJyZ2JhKDUwLCAxNzIsIDQ1LCAwLjk3KVwiO1xyXG4gICAgfSBlbHNlIGlmIChjb2xvci50b0xvd2VyQ2FzZSgpID09PSBcIm9yYW5nZVwiKSB7XHJcbiAgICAgICAgcmV0dXJuIFwicmdiYSgyMzcsIDEyOSwgNDAsIDAuODkpXCI7XHJcbiAgICB9IGVsc2UgaWYgKGNvbG9yLnRvTG93ZXJDYXNlKCkgPT09IFwicmVkXCIpIHtcclxuICAgICAgICByZXR1cm4gXCJyZ2JhKDI0NSwgNTQsIDU0LCAwLjkpXCI7XHJcbiAgICB9IGVsc2UgeyByZXR1cm4gY29sb3IudG9Mb3dlckNhc2UoKTsgfVxyXG59O1xyXG5jb25zdCBwYXJzZU1hdGhFeHByZXNzaW9uID0gZnVuY3Rpb24gKGV4cHJlc3Npb24sIGluZGV4KTogbnVtYmVyIHtcclxuICAgIGxldCB2YWx1ZXN0cmluZyA9IGV4cHJlc3Npb24ucmVwbGFjZSgvXFxfL2csIFwiXCIpLnNwbGl0KFwiLFwiKVtpbmRleF07XHJcbiAgICBsZXQgcmV0dXJudmFsdWUgPSAwO1xyXG4gICAgaWYgKHZhbHVlc3RyaW5nLmluZGV4T2YoXCIrXCIpID4gLTEpIHtcclxuICAgICAgICByZXR1cm52YWx1ZSA9ICsodmFsdWVzdHJpbmcuc3BsaXQoXCIrXCIpWzBdKSArICsodmFsdWVzdHJpbmcuc3BsaXQoXCIrXCIpWzFdKTtcclxuICAgIH0gZWxzZSBpZiAodmFsdWVzdHJpbmcuaW5kZXhPZihcIi1cIikgPiAtMSkge1xyXG4gICAgICAgIHJldHVybnZhbHVlID0gKyh2YWx1ZXN0cmluZy5zcGxpdChcIi1cIilbMF0pIC0gKyh2YWx1ZXN0cmluZy5zcGxpdChcIi1cIilbMV0pO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZXN0cmluZy5pbmRleE9mKFwiKlwiKSA+IC0xKSB7XHJcbiAgICAgICAgcmV0dXJudmFsdWUgPSArKHZhbHVlc3RyaW5nLnNwbGl0KFwiKlwiKVswXSkgKiArKHZhbHVlc3RyaW5nLnNwbGl0KFwiKlwiKVsxXSk7XHJcbiAgICB9IGVsc2UgaWYgKHZhbHVlc3RyaW5nLmluZGV4T2YoXCIvXCIpID4gLTEpIHtcclxuICAgICAgICByZXR1cm52YWx1ZSA9ICsodmFsdWVzdHJpbmcuc3BsaXQoXCIvXCIpWzBdKSAvICsodmFsdWVzdHJpbmcuc3BsaXQoXCIvXCIpWzFdKTtcclxuICAgIH0gZWxzZSBpZiAodmFsdWVzdHJpbmcuaW5kZXhPZihcIm1pblwiKSA+IC0xKSB7XHJcbiAgICAgICAgcmV0dXJudmFsdWUgPSBfLm1pbihbKyh2YWx1ZXN0cmluZy5zcGxpdChcIm1pblwiKVswXSksICsodmFsdWVzdHJpbmcuc3BsaXQoXCJtaW5cIilbMV0pXSkgfHwgMDtcclxuICAgIH0gZWxzZSBpZiAodmFsdWVzdHJpbmcuaW5kZXhPZihcIm1heFwiKSA+IC0xKSB7XHJcbiAgICAgICAgcmV0dXJudmFsdWUgPSBfLm1heChbKyh2YWx1ZXN0cmluZy5zcGxpdChcIm1heFwiKVswXSksICsodmFsdWVzdHJpbmcuc3BsaXQoXCJtYXhcIilbMV0pXSkgfHwgMDtcclxuICAgIH0gZWxzZSBpZiAodmFsdWVzdHJpbmcuaW5kZXhPZihcIm1lYW5cIikgPiAtMSkge1xyXG4gICAgICAgIHJldHVybnZhbHVlID0gXy5tZWFuKFsrKHZhbHVlc3RyaW5nLnNwbGl0KFwiYXZnXCIpWzBdKSwgKyh2YWx1ZXN0cmluZy5zcGxpdChcImF2Z1wiKVsxXSldKSB8fCAwO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm52YWx1ZSA9ICsodmFsdWVzdHJpbmcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIE1hdGgucm91bmQoKyhyZXR1cm52YWx1ZSkpO1xyXG59O1xyXG5jb25zdCBnZXRDb2xvciA9IGZ1bmN0aW9uIChleHByZXNzaW9uLCBpbmRleCkge1xyXG4gICAgbGV0IHJldHVyblZhbHVlID0gKGV4cHJlc3Npb24gfHwgXCJcIikuc3BsaXQoXCIsXCIpLmxlbmd0aCA+IGluZGV4ID8gYCBzdHlsZT1cImNvbG9yOiR7bm9ybWFsaXplQ29sb3IoZXhwcmVzc2lvbi5yZXBsYWNlKC9cXF8vZywgXCJcIikuc3BsaXQoXCIsXCIpW2luZGV4XSl9XCIgYCA6IFwiXCI7XHJcbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbn07XHJcbmNvbnN0IHJlcGxhY2VUb2tlbnMgPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgIGlmICghdmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9XHJcbiAgICB2YWx1ZSA9IHZhbHVlICsgXCJcIjtcclxuICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoXCIgXCIpLm1hcChhID0+IHtcclxuICAgICAgICBpZiAoYS5zdGFydHNXaXRoKFwiX2ZhLVwiKSAmJiBhLmVuZHNXaXRoKFwiX1wiKSkge1xyXG4gICAgICAgICAgICBsZXQgcmV0dXJudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICBsZXQgaWNvbiA9IGEucmVwbGFjZSgvXFxfL2csIFwiXCIpLnNwbGl0KFwiLFwiKVswXTtcclxuICAgICAgICAgICAgbGV0IGNvbG9yID0gZ2V0Q29sb3IoYSwgMSk7XHJcbiAgICAgICAgICAgIGxldCByZXBlYXRDb3VudCA9IGEuc3BsaXQoXCIsXCIpLmxlbmd0aCA+PSAzID8gcGFyc2VNYXRoRXhwcmVzc2lvbihhLCAyKSA6IDE7XHJcbiAgICAgICAgICAgIHJldHVybnZhbHVlID0gYDxpIGNsYXNzPVwiZmEgJHtpY29ufVwiICR7Y29sb3J9PjwvaT4gYC5yZXBlYXQocmVwZWF0Q291bnQpO1xyXG4gICAgICAgICAgICBpZiAoYS5zcGxpdChcIixcIikubGVuZ3RoID49IDQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtYXhDb2xvciA9IGdldENvbG9yKGEsIDMpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG1heExlbmd0aCA9IGEuc3BsaXQoXCIsXCIpLmxlbmd0aCA+PSA1ID8gcGFyc2VNYXRoRXhwcmVzc2lvbihhLCA0KSA6IDA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm52YWx1ZSArPSBgPGkgY2xhc3M9XCJmYSAke2ljb259XCIgJHttYXhDb2xvcn0+PC9pPiBgLnJlcGVhdChfLm1heChbbWF4TGVuZ3RoIC0gcmVwZWF0Q291bnQsIDBdKSB8fCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmV0dXJudmFsdWU7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoYS5zdGFydHNXaXRoKFwiX2ltZy1cIikgJiYgYS5lbmRzV2l0aChcIl9cIikpIHtcclxuICAgICAgICAgICAgYSA9IGEuc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgICAgICBsZXQgaW1nVXJsID0gYS5yZXBsYWNlKFwiX2ltZy1cIiwgXCJcIikuc3BsaXQoXCIsXCIpWzBdO1xyXG4gICAgICAgICAgICBsZXQgaW1nV2lkdGggPSBhLnNwbGl0KFwiLFwiKS5sZW5ndGggPiAxID8gYS5yZXBsYWNlKFwiX2ltZy1cIiwgXCJcIikuc3BsaXQoXCIsXCIpWzFdIDogXCIyMHB4XCI7XHJcbiAgICAgICAgICAgIGxldCBpbWdIZWlnaHQgPSBhLnNwbGl0KFwiLFwiKS5sZW5ndGggPiAyID8gYS5yZXBsYWNlKFwiX2ltZy1cIiwgXCJcIikuc3BsaXQoXCIsXCIpWzJdIDogXCIyMHB4XCI7XHJcbiAgICAgICAgICAgIGxldCByZXBlYXRDb3VudCA9IGEuc3BsaXQoXCIsXCIpLmxlbmd0aCA+IDMgPyArKGEucmVwbGFjZShcIl9pbWctXCIsIFwiXCIpLnNwbGl0KFwiLFwiKVszXSkgOiAxO1xyXG4gICAgICAgICAgICBhID0gYDxpbWcgd2lkdGg9XCIke2ltZ1dpZHRofVwiIGhlaWdodD1cIiR7aW1nSGVpZ2h0fVwiIHNyYz1cIiR7aW1nVXJsfVwiLz5gLnJlcGVhdChyZXBlYXRDb3VudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgfSkuam9pbihcIiBcIik7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn07XHJcbmNvbnN0IGdldEFjdHVhbE5hbWVXaXRob3V0VG9rZW5zID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICBpZiAoIXZhbHVlKSB7IHJldHVybiB2YWx1ZSArIFwiXCI7IH1cclxuICAgIHZhbHVlID0gdmFsdWUgKyBcIlwiO1xyXG4gICAgcmV0dXJuIHZhbHVlLnNwbGl0KFwiIFwiKS5tYXAoYSA9PiB7XHJcbiAgICAgICAgaWYgKGEuc3RhcnRzV2l0aChcIl9mYS1cIikgJiYgYS5lbmRzV2l0aChcIl9cIikpIHtcclxuICAgICAgICAgICAgYSA9IGBgO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoYS5zdGFydHNXaXRoKFwiX2ltZy1cIikgJiYgYS5lbmRzV2l0aChcIl9cIikpIHtcclxuICAgICAgICAgICAgYSA9IGBgO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYTtcclxuICAgIH0pLmpvaW4oXCIgXCIpO1xyXG59O1xyXG5jb25zdCBnZXREZWNpbWFsc0ZvclZhbHVlID0gZnVuY3Rpb24gKHZhbHVlLCBfZGVjaW1hbHMpIHtcclxuICAgIGlmIChfLmlzTnVtYmVyKCtfZGVjaW1hbHMpKSB7XHJcbiAgICAgICAgbGV0IG86IE9iamVjdCA9IHtcclxuICAgICAgICAgICAgZGVjaW1hbHM6IF9kZWNpbWFscyxcclxuICAgICAgICAgICAgc2NhbGVkRGVjaW1hbHM6IG51bGxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBvO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBkZWx0YSA9IHZhbHVlIC8gMjtcclxuICAgIGxldCBkZWMgPSAtTWF0aC5mbG9vcihNYXRoLmxvZyhkZWx0YSkgLyBNYXRoLkxOMTApO1xyXG5cclxuICAgIGxldCBtYWduID0gTWF0aC5wb3coMTAsIC1kZWMpLFxyXG4gICAgICAgIG5vcm0gPSBkZWx0YSAvIG1hZ24sIC8vIG5vcm0gaXMgYmV0d2VlbiAxLjAgYW5kIDEwLjBcclxuICAgICAgICBzaXplO1xyXG5cclxuICAgIGlmIChub3JtIDwgMS41KSB7XHJcbiAgICAgICAgc2l6ZSA9IDE7XHJcbiAgICB9IGVsc2UgaWYgKG5vcm0gPCAzKSB7XHJcbiAgICAgICAgc2l6ZSA9IDI7XHJcbiAgICAgICAgLy8gc3BlY2lhbCBjYXNlIGZvciAyLjUsIHJlcXVpcmVzIGFuIGV4dHJhIGRlY2ltYWxcclxuICAgICAgICBpZiAobm9ybSA+IDIuMjUpIHtcclxuICAgICAgICAgICAgc2l6ZSA9IDIuNTtcclxuICAgICAgICAgICAgKytkZWM7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChub3JtIDwgNy41KSB7XHJcbiAgICAgICAgc2l6ZSA9IDU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNpemUgPSAxMDtcclxuICAgIH1cclxuXHJcbiAgICBzaXplICo9IG1hZ247XHJcblxyXG4gICAgLy8gcmVkdWNlIHN0YXJ0aW5nIGRlY2ltYWxzIGlmIG5vdCBuZWVkZWRcclxuICAgIGlmIChNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWUpIHtcclxuICAgICAgICBkZWMgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXN1bHQ6IE9iamVjdCA9IHtcclxuICAgICAgICBkZWNpbWFsczogTWF0aC5tYXgoMCwgZGVjKSxcclxuICAgICAgICBzY2FsZWREZWNpbWFsczogTWF0aC5tYXgoMCwgZGVjKSAtIE1hdGguZmxvb3IoTWF0aC5sb2coc2l6ZSkgLyBNYXRoLkxOMTApICsgMlxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5jb25zdCBnZXRJdGVtQmFzZWRPblRocmVzaG9sZCA9IGZ1bmN0aW9uICh0aHJlc2hvbGRzLCByYW5nZXMsIHZhbHVlLCBkZWZhdWx0VmFsdWUpOiBzdHJpbmcge1xyXG4gICAgbGV0IGMgPSBkZWZhdWx0VmFsdWU7XHJcbiAgICBpZiAodGhyZXNob2xkcyAmJiByYW5nZXMgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmIHRocmVzaG9sZHMubGVuZ3RoICsgMSA8PSByYW5nZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgcmFuZ2VzID0gXy5kcm9wUmlnaHQocmFuZ2VzLCByYW5nZXMubGVuZ3RoIC0gdGhyZXNob2xkcy5sZW5ndGggLSAxKTtcclxuICAgICAgICBpZiAocmFuZ2VzW3Jhbmdlcy5sZW5ndGggLSAxXSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICByYW5nZXNbcmFuZ2VzLmxlbmd0aCAtIDFdID0gZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gdGhyZXNob2xkcy5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID49IHRocmVzaG9sZHNbaSAtIDFdKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmFuZ2VzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBfLmZpcnN0KHJhbmdlcykgfHwgXCJcIjtcclxuICAgIH1cclxuICAgIHJldHVybiBjO1xyXG5cclxufTtcclxuZXhwb3J0IHtcclxuICAgIG5vcm1hbGl6ZUNvbG9yLFxyXG4gICAgcmVwbGFjZVRva2VucyxcclxuICAgIGdldEFjdHVhbE5hbWVXaXRob3V0VG9rZW5zLFxyXG4gICAgZ2V0RGVjaW1hbHNGb3JWYWx1ZSxcclxuICAgIGdldEl0ZW1CYXNlZE9uVGhyZXNob2xkXHJcbn07XHJcbiJdfQ==