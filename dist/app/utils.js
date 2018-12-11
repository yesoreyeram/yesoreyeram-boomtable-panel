System.register(["lodash"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, COLORS, getFields, getUniqueFields, normalizeColor, getActualNameWithoutTransformSign, buildError, replaceFontAwesomeIcons, replaceWithImages, getDecimalsForValue;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }
        ],
        execute: function () {
            COLORS = {
                GREEN: "rgba(50, 172, 45, 0.97)",
                ORANGE: "rgba(237, 129, 40, 0.89)",
                RED: "rgba(245, 54, 54, 0.9)"
            };
            exports_1("COLORS", COLORS);
            getFields = function (collection, field) {
                return lodash_1.default.map(collection, function (d) { return d[String(field)]; });
            };
            exports_1("getFields", getFields);
            getUniqueFields = function (collection, field) {
                return lodash_1.default.uniq(lodash_1.default.map(collection, function (d) { return d[String(field)]; }));
            };
            exports_1("getUniqueFields", getUniqueFields);
            normalizeColor = function (color) {
                color = (color || "").toLowerCase().trim();
                switch (color) {
                    case "green":
                        return COLORS.GREEN;
                    case "orange":
                        return COLORS.ORANGE;
                    case "red":
                        return COLORS.RED;
                    default:
                        return color;
                }
            };
            exports_1("normalizeColor", normalizeColor);
            getActualNameWithoutTransformSign = function (value) {
                return (value + "")
                    .split(" ")
                    .map(function (a) {
                    if (a.startsWith("_fa-") && a.endsWith("_")) {
                        a = "";
                    }
                    if (a.startsWith("_img-") && a.endsWith("_")) {
                        a = "";
                    }
                    return a;
                })
                    .join(" ");
            };
            exports_1("getActualNameWithoutTransformSign", getActualNameWithoutTransformSign);
            buildError = function (errorTitle, errorMessage) {
                var err = new Error();
                err.name = String(errorTitle);
                err.message = String(errorMessage);
                return err;
            };
            exports_1("buildError", buildError);
            replaceFontAwesomeIcons = function (value) {
                if (!value) {
                    return value;
                }
                return (value + "")
                    .split(" ")
                    .map(function (a) {
                    if (a.startsWith("_fa-") && a.endsWith("_")) {
                        var icon = a.replace(/\_/g, "").split(",")[0];
                        var color = a.indexOf(",") > -1 ? " style=\"color:" + normalizeColor(a.replace(/\_/g, "").split(",")[1]) + "\" " : "";
                        var repeatCount = a.split(",").length > 2 ? +(a.replace(/\_/g, "").split(",")[2]) : 1;
                        a = ("<i class=\"fa " + icon + "\" " + color + "></i> ").repeat(repeatCount);
                    }
                    return a;
                })
                    .join(" ");
            };
            exports_1("replaceFontAwesomeIcons", replaceFontAwesomeIcons);
            replaceWithImages = function (value) {
                if (!value) {
                    return value;
                }
                return (value + "")
                    .split(" ")
                    .map(function (a) {
                    if (a.startsWith("_img-") && a.endsWith("_")) {
                        a = a.slice(0, -1);
                        var imgUrl = a.replace("_img-", "").split(",")[0];
                        var imgWidth = a.split(",").length > 1 ? a.replace("_img-", "").split(",")[1] : "20px";
                        var imgHeight = a.split(",").length > 2 ? a.replace("_img-", "").split(",")[2] : "20px";
                        var repeatCount = a.split(",").length > 3 ? +(a.replace("_img-", "").split(",")[3]) : 1;
                        a = ("<img width=\"" + imgWidth + "\" height=\"" + imgHeight + "\" src=\"" + imgUrl + "\"/>").repeat(repeatCount);
                    }
                    return a;
                })
                    .join(" ");
            };
            exports_1("replaceWithImages", replaceWithImages);
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
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O1lBRU0sTUFBTSxHQUFHO2dCQUNYLEtBQUssRUFBRyx5QkFBeUI7Z0JBQ2pDLE1BQU0sRUFBRywwQkFBMEI7Z0JBQ25DLEdBQUcsRUFBRyx3QkFBd0I7YUFDakMsQ0FBQzs7WUFFSSxTQUFTLEdBQUcsVUFBVSxVQUFpQixFQUFFLEtBQWE7Z0JBQ3hELE9BQU8sZ0JBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFoQixDQUFnQixDQUFDLENBQUM7WUFDcEQsQ0FBQyxDQUFDOztZQUNJLGVBQWUsR0FBRyxVQUFVLFVBQWlCLEVBQUUsS0FBYTtnQkFDOUQsT0FBTyxnQkFBQyxDQUFDLElBQUksQ0FBQyxnQkFBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQWhCLENBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQzVELENBQUMsQ0FBQzs7WUFDSSxjQUFjLEdBQUcsVUFBVSxLQUFhO2dCQUMxQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzNDLFFBQVEsS0FBSyxFQUFFO29CQUNYLEtBQUssT0FBTzt3QkFDUixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUM7b0JBQ3hCLEtBQUssUUFBUTt3QkFDVCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUM7b0JBQ3pCLEtBQUssS0FBSzt3QkFDTixPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUM7b0JBQ3RCO3dCQUNJLE9BQU8sS0FBSyxDQUFDO2lCQUNwQjtZQUNMLENBQUMs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SUFBSSxDQUFDO2dCQUdiLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLEVBQUU7b0JBQzdCLEdBQUcsR0FBRyxDQUFDLENBQUM7aUJBQ1g7Z0JBRUQsSUFBSSxNQUFNLEdBQVc7b0JBQ2pCLFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7b0JBQzFCLGNBQWMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7aUJBQ2hGLENBQUM7Z0JBRUYsT0FBTyxNQUFNLENBQUM7WUFDbEIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5cclxuY29uc3QgQ09MT1JTID0ge1xyXG4gICAgR1JFRU4gOiBcInJnYmEoNTAsIDE3MiwgNDUsIDAuOTcpXCIsXHJcbiAgICBPUkFOR0UgOiBcInJnYmEoMjM3LCAxMjksIDQwLCAwLjg5KVwiLFxyXG4gICAgUkVEIDogXCJyZ2JhKDI0NSwgNTQsIDU0LCAwLjkpXCJcclxufTtcclxuXHJcbmNvbnN0IGdldEZpZWxkcyA9IGZ1bmN0aW9uIChjb2xsZWN0aW9uOiBhbnlbXSwgZmllbGQ6IFN0cmluZyk6IGFueVtdIHtcclxuICAgIHJldHVybiBfLm1hcChjb2xsZWN0aW9uLCBkID0+IGRbU3RyaW5nKGZpZWxkKV0pO1xyXG59O1xyXG5jb25zdCBnZXRVbmlxdWVGaWVsZHMgPSBmdW5jdGlvbiAoY29sbGVjdGlvbjogYW55W10sIGZpZWxkOiBTdHJpbmcpOiBhbnlbXSB7XHJcbiAgICByZXR1cm4gXy51bmlxKF8ubWFwKGNvbGxlY3Rpb24sIGQgPT4gZFtTdHJpbmcoZmllbGQpXSkpO1xyXG59O1xyXG5jb25zdCBub3JtYWxpemVDb2xvciA9IGZ1bmN0aW9uIChjb2xvcjogU3RyaW5nKTogU3RyaW5nIHtcclxuICAgIGNvbG9yID0gKGNvbG9yIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xyXG4gICAgc3dpdGNoIChjb2xvcikge1xyXG4gICAgICAgIGNhc2UgXCJncmVlblwiOlxyXG4gICAgICAgICAgICByZXR1cm4gQ09MT1JTLkdSRUVOO1xyXG4gICAgICAgIGNhc2UgXCJvcmFuZ2VcIjpcclxuICAgICAgICAgICAgcmV0dXJuIENPTE9SUy5PUkFOR0U7XHJcbiAgICAgICAgY2FzZSBcInJlZFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gQ09MT1JTLlJFRDtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gY29sb3I7XHJcbiAgICB9XHJcbn07XHJcbmNvbnN0IGdldEFjdHVhbE5hbWVXaXRob3V0VHJhbnNmb3JtU2lnbiA9IGZ1bmN0aW9uICh2YWx1ZTogU3RyaW5nKTogU3RyaW5nIHtcclxuICAgIHJldHVybiAodmFsdWUgKyBcIlwiKVxyXG4gICAgICAgIC5zcGxpdChcIiBcIilcclxuICAgICAgICAubWFwKGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYS5zdGFydHNXaXRoKFwiX2ZhLVwiKSAmJiBhLmVuZHNXaXRoKFwiX1wiKSkge1xyXG4gICAgICAgICAgICAgICAgYSA9IGBgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhLnN0YXJ0c1dpdGgoXCJfaW1nLVwiKSAmJiBhLmVuZHNXaXRoKFwiX1wiKSkge1xyXG4gICAgICAgICAgICAgICAgYSA9IGBgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmpvaW4oXCIgXCIpO1xyXG59O1xyXG5jb25zdCBidWlsZEVycm9yID0gZnVuY3Rpb24gKGVycm9yVGl0bGU6IFN0cmluZywgZXJyb3JNZXNzYWdlOiBTdHJpbmcpOiBFcnJvciB7XHJcbiAgICBsZXQgZXJyID0gbmV3IEVycm9yKCk7XHJcbiAgICBlcnIubmFtZSA9IFN0cmluZyhlcnJvclRpdGxlKTtcclxuICAgIGVyci5tZXNzYWdlID0gU3RyaW5nKGVycm9yTWVzc2FnZSk7XHJcbiAgICByZXR1cm4gZXJyO1xyXG59O1xyXG5jb25zdCByZXBsYWNlRm9udEF3ZXNvbWVJY29ucyA9IGZ1bmN0aW9uICh2YWx1ZTogU3RyaW5nKTogU3RyaW5nIHtcclxuICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKHZhbHVlICsgXCJcIilcclxuICAgICAgICAuc3BsaXQoXCIgXCIpXHJcbiAgICAgICAgLm1hcChhID0+IHtcclxuICAgICAgICAgICAgaWYgKGEuc3RhcnRzV2l0aChcIl9mYS1cIikgJiYgYS5lbmRzV2l0aChcIl9cIikpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpY29uID0gYS5yZXBsYWNlKC9cXF8vZywgXCJcIikuc3BsaXQoXCIsXCIpWzBdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbG9yID0gYS5pbmRleE9mKFwiLFwiKSA+IC0xID8gYCBzdHlsZT1cImNvbG9yOiR7bm9ybWFsaXplQ29sb3IoYS5yZXBsYWNlKC9cXF8vZywgXCJcIikuc3BsaXQoXCIsXCIpWzFdKX1cIiBgIDogXCJcIjtcclxuICAgICAgICAgICAgICAgIGxldCByZXBlYXRDb3VudCA9IGEuc3BsaXQoXCIsXCIpLmxlbmd0aCA+IDIgPyArKGEucmVwbGFjZSgvXFxfL2csIFwiXCIpLnNwbGl0KFwiLFwiKVsyXSkgOiAxO1xyXG4gICAgICAgICAgICAgICAgYSA9IGA8aSBjbGFzcz1cImZhICR7aWNvbn1cIiAke2NvbG9yfT48L2k+IGAucmVwZWF0KHJlcGVhdENvdW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5qb2luKFwiIFwiKTtcclxufTtcclxuY29uc3QgcmVwbGFjZVdpdGhJbWFnZXMgPSBmdW5jdGlvbiAodmFsdWU6IFN0cmluZyk6IFN0cmluZyB7XHJcbiAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICh2YWx1ZSArIFwiXCIpXHJcbiAgICAgICAgLnNwbGl0KFwiIFwiKVxyXG4gICAgICAgIC5tYXAoYSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChhLnN0YXJ0c1dpdGgoXCJfaW1nLVwiKSAmJiBhLmVuZHNXaXRoKFwiX1wiKSkge1xyXG4gICAgICAgICAgICAgICAgYSA9IGEuc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGltZ1VybCA9IGEucmVwbGFjZShcIl9pbWctXCIsIFwiXCIpLnNwbGl0KFwiLFwiKVswXTtcclxuICAgICAgICAgICAgICAgIGxldCBpbWdXaWR0aCA9IGEuc3BsaXQoXCIsXCIpLmxlbmd0aCA+IDEgPyBhLnJlcGxhY2UoXCJfaW1nLVwiLCBcIlwiKS5zcGxpdChcIixcIilbMV0gOiBcIjIwcHhcIjtcclxuICAgICAgICAgICAgICAgIGxldCBpbWdIZWlnaHQgPSBhLnNwbGl0KFwiLFwiKS5sZW5ndGggPiAyID8gYS5yZXBsYWNlKFwiX2ltZy1cIiwgXCJcIikuc3BsaXQoXCIsXCIpWzJdIDogXCIyMHB4XCI7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVwZWF0Q291bnQgPSBhLnNwbGl0KFwiLFwiKS5sZW5ndGggPiAzID8gKyhhLnJlcGxhY2UoXCJfaW1nLVwiLCBcIlwiKS5zcGxpdChcIixcIilbM10pIDogMTtcclxuICAgICAgICAgICAgICAgIGEgPSBgPGltZyB3aWR0aD1cIiR7aW1nV2lkdGh9XCIgaGVpZ2h0PVwiJHtpbWdIZWlnaHR9XCIgc3JjPVwiJHtpbWdVcmx9XCIvPmAucmVwZWF0KHJlcGVhdENvdW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5qb2luKFwiIFwiKTtcclxufTtcclxuY29uc3QgZ2V0RGVjaW1hbHNGb3JWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZTogbnVtYmVyLCBfZGVjaW1hbHM6IG51bWJlcik6IE9iamVjdCB7XHJcbiAgICBpZiAoXy5pc051bWJlcigrX2RlY2ltYWxzKSkge1xyXG4gICAgICAgIGxldCBvOiBPYmplY3QgPSB7XHJcbiAgICAgICAgICAgIGRlY2ltYWxzOiBfZGVjaW1hbHMsXHJcbiAgICAgICAgICAgIHNjYWxlZERlY2ltYWxzOiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gbztcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZGVsdGEgPSB2YWx1ZSAvIDI7XHJcbiAgICBsZXQgZGVjID0gLU1hdGguZmxvb3IoTWF0aC5sb2coZGVsdGEpIC8gTWF0aC5MTjEwKTtcclxuXHJcbiAgICBsZXQgbWFnbiA9IE1hdGgucG93KDEwLCAtZGVjKSxcclxuICAgICAgICBub3JtID0gZGVsdGEgLyBtYWduLCAvLyBub3JtIGlzIGJldHdlZW4gMS4wIGFuZCAxMC4wXHJcbiAgICAgICAgc2l6ZTtcclxuXHJcbiAgICBpZiAobm9ybSA8IDEuNSkge1xyXG4gICAgICAgIHNpemUgPSAxO1xyXG4gICAgfSBlbHNlIGlmIChub3JtIDwgMykge1xyXG4gICAgICAgIHNpemUgPSAyO1xyXG4gICAgICAgIC8vIHNwZWNpYWwgY2FzZSBmb3IgMi41LCByZXF1aXJlcyBhbiBleHRyYSBkZWNpbWFsXHJcbiAgICAgICAgaWYgKG5vcm0gPiAyLjI1KSB7XHJcbiAgICAgICAgICAgIHNpemUgPSAyLjU7XHJcbiAgICAgICAgICAgICsrZGVjO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAobm9ybSA8IDcuNSkge1xyXG4gICAgICAgIHNpemUgPSA1O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBzaXplID0gMTA7XHJcbiAgICB9XHJcblxyXG4gICAgc2l6ZSAqPSBtYWduO1xyXG5cclxuICAgIC8vIHJlZHVjZSBzdGFydGluZyBkZWNpbWFscyBpZiBub3QgbmVlZGVkXHJcbiAgICBpZiAoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgZGVjID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmVzdWx0OiBPYmplY3QgPSB7XHJcbiAgICAgICAgZGVjaW1hbHM6IE1hdGgubWF4KDAsIGRlYyksXHJcbiAgICAgICAgc2NhbGVkRGVjaW1hbHM6IE1hdGgubWF4KDAsIGRlYykgLSBNYXRoLmZsb29yKE1hdGgubG9nKHNpemUpIC8gTWF0aC5MTjEwKSArIDJcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuZXhwb3J0IHtcclxuICAgIENPTE9SUyxcclxuICAgIGdldEZpZWxkcyxcclxuICAgIGdldFVuaXF1ZUZpZWxkcyxcclxuICAgIGdldERlY2ltYWxzRm9yVmFsdWUsXHJcbiAgICBnZXRBY3R1YWxOYW1lV2l0aG91dFRyYW5zZm9ybVNpZ24sXHJcbiAgICBub3JtYWxpemVDb2xvcixcclxuICAgIHJlcGxhY2VGb250QXdlc29tZUljb25zLFxyXG4gICAgcmVwbGFjZVdpdGhJbWFnZXMsXHJcbiAgICBidWlsZEVycm9yXHJcbn07XHJcbiJdfQ==