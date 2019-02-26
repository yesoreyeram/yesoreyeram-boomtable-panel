System.register(["lodash"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, normalizeColor, replaceTokens, getActualNameWithoutTokens, getDecimalsForValue, getItemBasedOnThreshold;
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
            replaceTokens = function (value) {
                if (!value) {
                    return value;
                }
                value = value + "";
                value = value.split(" ").map(function (a) {
                    if (a.startsWith("_fa-") && a.endsWith("_")) {
                        var icon = a.replace(/\_/g, "").split(",")[0];
                        var color = a.indexOf(",") > -1 ? " style=\"color:" + normalizeColor(a.replace(/\_/g, "").split(",")[1]) + "\" " : "";
                        var repeatCount = a.split(",").length > 2 ? +(a.replace(/\_/g, "").split(",")[2]) : 1;
                        a = ("<i class=\"fa " + icon + "\" " + color + "></i> ").repeat(repeatCount);
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
                    return lodash_1.default.first(ranges);
                }
                return c;
            };
            exports_1("getItemBasedOnThreshold", getItemBasedOnThreshold);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbVV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9ib29tL0Jvb21VdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztZQUVNLGNBQWMsR0FBRyxVQUFVLEtBQUs7Z0JBQ2xDLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLE9BQU8sRUFBRTtvQkFDakMsT0FBTyx5QkFBeUIsQ0FBQztpQkFDcEM7cUJBQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssUUFBUSxFQUFFO29CQUN6QyxPQUFPLDBCQUEwQixDQUFDO2lCQUNyQztxQkFBTSxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxLQUFLLEVBQUU7b0JBQ3RDLE9BQU8sd0JBQXdCLENBQUM7aUJBQ25DO3FCQUFNO29CQUFFLE9BQU8sS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUFFO1lBQzFDLENBQUMsQ0FBQzs7WUFDSSxhQUFhLEdBQUcsVUFBVSxLQUFLO2dCQUNqQyxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUFFLE9BQU8sS0FBSyxDQUFDO2lCQUFFO2dCQUM3QixLQUFLLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDbkIsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQztvQkFDMUIsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ3pDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDOUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMs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b0JBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQ3hDLElBQUksS0FBSyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7NEJBQzVCLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUNwQjtxQkFDSjtvQkFDRCxPQUFPLGdCQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUMxQjtnQkFDRCxPQUFPLENBQUMsQ0FBQztZQUViLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUNvbG9yID0gZnVuY3Rpb24gKGNvbG9yKSB7XHJcbiAgICBpZiAoY29sb3IudG9Mb3dlckNhc2UoKSA9PT0gXCJncmVlblwiKSB7XHJcbiAgICAgICAgcmV0dXJuIFwicmdiYSg1MCwgMTcyLCA0NSwgMC45NylcIjtcclxuICAgIH0gZWxzZSBpZiAoY29sb3IudG9Mb3dlckNhc2UoKSA9PT0gXCJvcmFuZ2VcIikge1xyXG4gICAgICAgIHJldHVybiBcInJnYmEoMjM3LCAxMjksIDQwLCAwLjg5KVwiO1xyXG4gICAgfSBlbHNlIGlmIChjb2xvci50b0xvd2VyQ2FzZSgpID09PSBcInJlZFwiKSB7XHJcbiAgICAgICAgcmV0dXJuIFwicmdiYSgyNDUsIDU0LCA1NCwgMC45KVwiO1xyXG4gICAgfSBlbHNlIHsgcmV0dXJuIGNvbG9yLnRvTG93ZXJDYXNlKCk7IH1cclxufTtcclxuY29uc3QgcmVwbGFjZVRva2VucyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgaWYgKCF2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH1cclxuICAgIHZhbHVlID0gdmFsdWUgKyBcIlwiO1xyXG4gICAgdmFsdWUgPSB2YWx1ZS5zcGxpdChcIiBcIikubWFwKGEgPT4ge1xyXG4gICAgICAgIGlmIChhLnN0YXJ0c1dpdGgoXCJfZmEtXCIpICYmIGEuZW5kc1dpdGgoXCJfXCIpKSB7XHJcbiAgICAgICAgICAgIGxldCBpY29uID0gYS5yZXBsYWNlKC9cXF8vZywgXCJcIikuc3BsaXQoXCIsXCIpWzBdO1xyXG4gICAgICAgICAgICBsZXQgY29sb3IgPSBhLmluZGV4T2YoXCIsXCIpID4gLTEgPyBgIHN0eWxlPVwiY29sb3I6JHtub3JtYWxpemVDb2xvcihhLnJlcGxhY2UoL1xcXy9nLCBcIlwiKS5zcGxpdChcIixcIilbMV0pfVwiIGAgOiBcIlwiO1xyXG4gICAgICAgICAgICBsZXQgcmVwZWF0Q291bnQgPSBhLnNwbGl0KFwiLFwiKS5sZW5ndGggPiAyID8gKyhhLnJlcGxhY2UoL1xcXy9nLCBcIlwiKS5zcGxpdChcIixcIilbMl0pIDogMTtcclxuICAgICAgICAgICAgYSA9IGA8aSBjbGFzcz1cImZhICR7aWNvbn1cIiAke2NvbG9yfT48L2k+IGAucmVwZWF0KHJlcGVhdENvdW50KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGEuc3RhcnRzV2l0aChcIl9pbWctXCIpICYmIGEuZW5kc1dpdGgoXCJfXCIpKSB7XHJcbiAgICAgICAgICAgIGEgPSBhLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICAgICAgbGV0IGltZ1VybCA9IGEucmVwbGFjZShcIl9pbWctXCIsIFwiXCIpLnNwbGl0KFwiLFwiKVswXTtcclxuICAgICAgICAgICAgbGV0IGltZ1dpZHRoID0gYS5zcGxpdChcIixcIikubGVuZ3RoID4gMSA/IGEucmVwbGFjZShcIl9pbWctXCIsIFwiXCIpLnNwbGl0KFwiLFwiKVsxXSA6IFwiMjBweFwiO1xyXG4gICAgICAgICAgICBsZXQgaW1nSGVpZ2h0ID0gYS5zcGxpdChcIixcIikubGVuZ3RoID4gMiA/IGEucmVwbGFjZShcIl9pbWctXCIsIFwiXCIpLnNwbGl0KFwiLFwiKVsyXSA6IFwiMjBweFwiO1xyXG4gICAgICAgICAgICBsZXQgcmVwZWF0Q291bnQgPSBhLnNwbGl0KFwiLFwiKS5sZW5ndGggPiAzID8gKyhhLnJlcGxhY2UoXCJfaW1nLVwiLCBcIlwiKS5zcGxpdChcIixcIilbM10pIDogMTtcclxuICAgICAgICAgICAgYSA9IGA8aW1nIHdpZHRoPVwiJHtpbWdXaWR0aH1cIiBoZWlnaHQ9XCIke2ltZ0hlaWdodH1cIiBzcmM9XCIke2ltZ1VybH1cIi8+YC5yZXBlYXQocmVwZWF0Q291bnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYTtcclxuICAgIH0pLmpvaW4oXCIgXCIpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59O1xyXG5jb25zdCBnZXRBY3R1YWxOYW1lV2l0aG91dFRva2VucyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgaWYgKCF2YWx1ZSkgeyByZXR1cm4gdmFsdWUgKyBcIlwiOyB9XHJcbiAgICB2YWx1ZSA9IHZhbHVlICsgXCJcIjtcclxuICAgIHJldHVybiB2YWx1ZS5zcGxpdChcIiBcIikubWFwKGEgPT4ge1xyXG4gICAgICAgIGlmIChhLnN0YXJ0c1dpdGgoXCJfZmEtXCIpICYmIGEuZW5kc1dpdGgoXCJfXCIpKSB7XHJcbiAgICAgICAgICAgIGEgPSBgYDtcclxuICAgICAgICB9IGVsc2UgaWYgKGEuc3RhcnRzV2l0aChcIl9pbWctXCIpICYmIGEuZW5kc1dpdGgoXCJfXCIpKSB7XHJcbiAgICAgICAgICAgIGEgPSBgYDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9KS5qb2luKFwiIFwiKTtcclxufTtcclxuY29uc3QgZ2V0RGVjaW1hbHNGb3JWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgX2RlY2ltYWxzKSB7XHJcbiAgICBpZiAoXy5pc051bWJlcigrX2RlY2ltYWxzKSkge1xyXG4gICAgICAgIGxldCBvOiBPYmplY3QgPSB7XHJcbiAgICAgICAgICAgIGRlY2ltYWxzOiBfZGVjaW1hbHMsXHJcbiAgICAgICAgICAgIHNjYWxlZERlY2ltYWxzOiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gbztcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZGVsdGEgPSB2YWx1ZSAvIDI7XHJcbiAgICBsZXQgZGVjID0gLU1hdGguZmxvb3IoTWF0aC5sb2coZGVsdGEpIC8gTWF0aC5MTjEwKTtcclxuXHJcbiAgICBsZXQgbWFnbiA9IE1hdGgucG93KDEwLCAtZGVjKSxcclxuICAgICAgICBub3JtID0gZGVsdGEgLyBtYWduLCAvLyBub3JtIGlzIGJldHdlZW4gMS4wIGFuZCAxMC4wXHJcbiAgICAgICAgc2l6ZTtcclxuXHJcbiAgICBpZiAobm9ybSA8IDEuNSkge1xyXG4gICAgICAgIHNpemUgPSAxO1xyXG4gICAgfSBlbHNlIGlmIChub3JtIDwgMykge1xyXG4gICAgICAgIHNpemUgPSAyO1xyXG4gICAgICAgIC8vIHNwZWNpYWwgY2FzZSBmb3IgMi41LCByZXF1aXJlcyBhbiBleHRyYSBkZWNpbWFsXHJcbiAgICAgICAgaWYgKG5vcm0gPiAyLjI1KSB7XHJcbiAgICAgICAgICAgIHNpemUgPSAyLjU7XHJcbiAgICAgICAgICAgICsrZGVjO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAobm9ybSA8IDcuNSkge1xyXG4gICAgICAgIHNpemUgPSA1O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBzaXplID0gMTA7XHJcbiAgICB9XHJcblxyXG4gICAgc2l6ZSAqPSBtYWduO1xyXG5cclxuICAgIC8vIHJlZHVjZSBzdGFydGluZyBkZWNpbWFscyBpZiBub3QgbmVlZGVkXHJcbiAgICBpZiAoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgZGVjID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmVzdWx0OiBPYmplY3QgPSB7XHJcbiAgICAgICAgZGVjaW1hbHM6IE1hdGgubWF4KDAsIGRlYyksXHJcbiAgICAgICAgc2NhbGVkRGVjaW1hbHM6IE1hdGgubWF4KDAsIGRlYykgLSBNYXRoLmZsb29yKE1hdGgubG9nKHNpemUpIC8gTWF0aC5MTjEwKSArIDJcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuY29uc3QgZ2V0SXRlbUJhc2VkT25UaHJlc2hvbGQgPSBmdW5jdGlvbiAodGhyZXNob2xkcywgcmFuZ2VzLCB2YWx1ZSwgZGVmYXVsdFZhbHVlKTogc3RyaW5nIHtcclxuICAgIGxldCBjID0gZGVmYXVsdFZhbHVlO1xyXG4gICAgaWYgKHRocmVzaG9sZHMgJiYgcmFuZ2VzICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiB0aHJlc2hvbGRzLmxlbmd0aCArIDEgPD0gcmFuZ2VzLmxlbmd0aCkge1xyXG4gICAgICAgIHJhbmdlcyA9IF8uZHJvcFJpZ2h0KHJhbmdlcywgcmFuZ2VzLmxlbmd0aCAtIHRocmVzaG9sZHMubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgaWYgKHJhbmdlc1tyYW5nZXMubGVuZ3RoIC0gMV0gPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmFuZ2VzW3Jhbmdlcy5sZW5ndGggLSAxXSA9IGRlZmF1bHRWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IHRocmVzaG9sZHMubGVuZ3RoOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA+PSB0aHJlc2hvbGRzW2kgLSAxXSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJhbmdlc1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXy5maXJzdChyYW5nZXMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGM7XHJcblxyXG59O1xyXG5leHBvcnQge1xyXG4gICAgbm9ybWFsaXplQ29sb3IsXHJcbiAgICByZXBsYWNlVG9rZW5zLFxyXG4gICAgZ2V0QWN0dWFsTmFtZVdpdGhvdXRUb2tlbnMsXHJcbiAgICBnZXREZWNpbWFsc0ZvclZhbHVlLFxyXG4gICAgZ2V0SXRlbUJhc2VkT25UaHJlc2hvbGRcclxufTtcclxuIl19