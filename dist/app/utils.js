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
                switch ((color || "").toLowerCase()) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O1lBRU0sTUFBTSxHQUFHO2dCQUNYLEtBQUssRUFBRyx5QkFBeUI7Z0JBQ2pDLE1BQU0sRUFBRywwQkFBMEI7Z0JBQ25DLEdBQUcsRUFBRyx3QkFBd0I7YUFDakMsQ0FBQzs7WUFFSSxTQUFTLEdBQUcsVUFBVSxVQUFpQixFQUFFLEtBQWE7Z0JBQ3hELE9BQU8sZ0JBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFoQixDQUFnQixDQUFDLENBQUM7WUFDcEQsQ0FBQyxDQUFDOztZQUNJLGVBQWUsR0FBRyxVQUFVLFVBQWlCLEVBQUUsS0FBYTtnQkFDOUQsT0FBTyxnQkFBQyxDQUFDLElBQUksQ0FBQyxnQkFBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQWhCLENBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQzVELENBQUMsQ0FBQzs7WUFDSSxjQUFjLEdBQUcsVUFBVSxLQUFhO2dCQUMxQyxRQUFRLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO29CQUNqQyxLQUFLLE9BQU87d0JBQ1IsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDO29CQUN4QixLQUFLLFFBQVE7d0JBQ1QsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDO29CQUN6QixLQUFLLEtBQUs7d0JBQ04sT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDO29CQUN0Qjt3QkFDSSxPQUFPLEtBQUssQ0FBQztpQkFDcEI7WUFDTCxDQUFDLENBQUM7O1lBQ0ksaUNBQWlDLEdBQUcsVUFBVSxLQUFhO2dCQUM3RCxP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S0FBSyxDQUFDLEtBQUssS0FBSyxFQUFFO29CQUM3QixHQUFHLEdBQUcsQ0FBQyxDQUFDO2lCQUNYO2dCQUVELElBQUksTUFBTSxHQUFXO29CQUNqQixRQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO29CQUMxQixjQUFjLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUNoRixDQUFDO2dCQUVGLE9BQU8sTUFBTSxDQUFDO1lBQ2xCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuXHJcbmNvbnN0IENPTE9SUyA9IHtcclxuICAgIEdSRUVOIDogXCJyZ2JhKDUwLCAxNzIsIDQ1LCAwLjk3KVwiLFxyXG4gICAgT1JBTkdFIDogXCJyZ2JhKDIzNywgMTI5LCA0MCwgMC44OSlcIixcclxuICAgIFJFRCA6IFwicmdiYSgyNDUsIDU0LCA1NCwgMC45KVwiXHJcbn07XHJcblxyXG5jb25zdCBnZXRGaWVsZHMgPSBmdW5jdGlvbiAoY29sbGVjdGlvbjogYW55W10sIGZpZWxkOiBTdHJpbmcpOiBhbnlbXSB7XHJcbiAgICByZXR1cm4gXy5tYXAoY29sbGVjdGlvbiwgZCA9PiBkW1N0cmluZyhmaWVsZCldKTtcclxufTtcclxuY29uc3QgZ2V0VW5pcXVlRmllbGRzID0gZnVuY3Rpb24gKGNvbGxlY3Rpb246IGFueVtdLCBmaWVsZDogU3RyaW5nKTogYW55W10ge1xyXG4gICAgcmV0dXJuIF8udW5pcShfLm1hcChjb2xsZWN0aW9uLCBkID0+IGRbU3RyaW5nKGZpZWxkKV0pKTtcclxufTtcclxuY29uc3Qgbm9ybWFsaXplQ29sb3IgPSBmdW5jdGlvbiAoY29sb3I6IFN0cmluZyk6IFN0cmluZyB7XHJcbiAgICBzd2l0Y2ggKChjb2xvciB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgICAgY2FzZSBcImdyZWVuXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBDT0xPUlMuR1JFRU47XHJcbiAgICAgICAgY2FzZSBcIm9yYW5nZVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gQ09MT1JTLk9SQU5HRTtcclxuICAgICAgICBjYXNlIFwicmVkXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBDT0xPUlMuUkVEO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBjb2xvcjtcclxuICAgIH1cclxufTtcclxuY29uc3QgZ2V0QWN0dWFsTmFtZVdpdGhvdXRUcmFuc2Zvcm1TaWduID0gZnVuY3Rpb24gKHZhbHVlOiBTdHJpbmcpOiBTdHJpbmcge1xyXG4gICAgcmV0dXJuICh2YWx1ZSArIFwiXCIpXHJcbiAgICAgICAgLnNwbGl0KFwiIFwiKVxyXG4gICAgICAgIC5tYXAoYSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChhLnN0YXJ0c1dpdGgoXCJfZmEtXCIpICYmIGEuZW5kc1dpdGgoXCJfXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBhID0gYGA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGEuc3RhcnRzV2l0aChcIl9pbWctXCIpICYmIGEuZW5kc1dpdGgoXCJfXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBhID0gYGA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGE7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuam9pbihcIiBcIik7XHJcbn07XHJcbmNvbnN0IGJ1aWxkRXJyb3IgPSBmdW5jdGlvbiAoZXJyb3JUaXRsZTogU3RyaW5nLCBlcnJvck1lc3NhZ2U6IFN0cmluZyk6IEVycm9yIHtcclxuICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoKTtcclxuICAgIGVyci5uYW1lID0gU3RyaW5nKGVycm9yVGl0bGUpO1xyXG4gICAgZXJyLm1lc3NhZ2UgPSBTdHJpbmcoZXJyb3JNZXNzYWdlKTtcclxuICAgIHJldHVybiBlcnI7XHJcbn07XHJcbmNvbnN0IHJlcGxhY2VGb250QXdlc29tZUljb25zID0gZnVuY3Rpb24gKHZhbHVlOiBTdHJpbmcpOiBTdHJpbmcge1xyXG4gICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiAodmFsdWUgKyBcIlwiKVxyXG4gICAgICAgIC5zcGxpdChcIiBcIilcclxuICAgICAgICAubWFwKGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYS5zdGFydHNXaXRoKFwiX2ZhLVwiKSAmJiBhLmVuZHNXaXRoKFwiX1wiKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGljb24gPSBhLnJlcGxhY2UoL1xcXy9nLCBcIlwiKS5zcGxpdChcIixcIilbMF07XHJcbiAgICAgICAgICAgICAgICBsZXQgY29sb3IgPSBhLmluZGV4T2YoXCIsXCIpID4gLTEgPyBgIHN0eWxlPVwiY29sb3I6JHtub3JtYWxpemVDb2xvcihhLnJlcGxhY2UoL1xcXy9nLCBcIlwiKS5zcGxpdChcIixcIilbMV0pfVwiIGAgOiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlcGVhdENvdW50ID0gYS5zcGxpdChcIixcIikubGVuZ3RoID4gMiA/ICsoYS5yZXBsYWNlKC9cXF8vZywgXCJcIikuc3BsaXQoXCIsXCIpWzJdKSA6IDE7XHJcbiAgICAgICAgICAgICAgICBhID0gYDxpIGNsYXNzPVwiZmEgJHtpY29ufVwiICR7Y29sb3J9PjwvaT4gYC5yZXBlYXQocmVwZWF0Q291bnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmpvaW4oXCIgXCIpO1xyXG59O1xyXG5jb25zdCByZXBsYWNlV2l0aEltYWdlcyA9IGZ1bmN0aW9uICh2YWx1ZTogU3RyaW5nKTogU3RyaW5nIHtcclxuICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKHZhbHVlICsgXCJcIilcclxuICAgICAgICAuc3BsaXQoXCIgXCIpXHJcbiAgICAgICAgLm1hcChhID0+IHtcclxuICAgICAgICAgICAgaWYgKGEuc3RhcnRzV2l0aChcIl9pbWctXCIpICYmIGEuZW5kc1dpdGgoXCJfXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBhID0gYS5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW1nVXJsID0gYS5yZXBsYWNlKFwiX2ltZy1cIiwgXCJcIikuc3BsaXQoXCIsXCIpWzBdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGltZ1dpZHRoID0gYS5zcGxpdChcIixcIikubGVuZ3RoID4gMSA/IGEucmVwbGFjZShcIl9pbWctXCIsIFwiXCIpLnNwbGl0KFwiLFwiKVsxXSA6IFwiMjBweFwiO1xyXG4gICAgICAgICAgICAgICAgbGV0IGltZ0hlaWdodCA9IGEuc3BsaXQoXCIsXCIpLmxlbmd0aCA+IDIgPyBhLnJlcGxhY2UoXCJfaW1nLVwiLCBcIlwiKS5zcGxpdChcIixcIilbMl0gOiBcIjIwcHhcIjtcclxuICAgICAgICAgICAgICAgIGxldCByZXBlYXRDb3VudCA9IGEuc3BsaXQoXCIsXCIpLmxlbmd0aCA+IDMgPyArKGEucmVwbGFjZShcIl9pbWctXCIsIFwiXCIpLnNwbGl0KFwiLFwiKVszXSkgOiAxO1xyXG4gICAgICAgICAgICAgICAgYSA9IGA8aW1nIHdpZHRoPVwiJHtpbWdXaWR0aH1cIiBoZWlnaHQ9XCIke2ltZ0hlaWdodH1cIiBzcmM9XCIke2ltZ1VybH1cIi8+YC5yZXBlYXQocmVwZWF0Q291bnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmpvaW4oXCIgXCIpO1xyXG59O1xyXG5jb25zdCBnZXREZWNpbWFsc0ZvclZhbHVlID0gZnVuY3Rpb24gKHZhbHVlOiBudW1iZXIsIF9kZWNpbWFsczogbnVtYmVyKTogT2JqZWN0IHtcclxuICAgIGlmIChfLmlzTnVtYmVyKCtfZGVjaW1hbHMpKSB7XHJcbiAgICAgICAgbGV0IG86IE9iamVjdCA9IHtcclxuICAgICAgICAgICAgZGVjaW1hbHM6IF9kZWNpbWFscyxcclxuICAgICAgICAgICAgc2NhbGVkRGVjaW1hbHM6IG51bGxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBvO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBkZWx0YSA9IHZhbHVlIC8gMjtcclxuICAgIGxldCBkZWMgPSAtTWF0aC5mbG9vcihNYXRoLmxvZyhkZWx0YSkgLyBNYXRoLkxOMTApO1xyXG5cclxuICAgIGxldCBtYWduID0gTWF0aC5wb3coMTAsIC1kZWMpLFxyXG4gICAgICAgIG5vcm0gPSBkZWx0YSAvIG1hZ24sIC8vIG5vcm0gaXMgYmV0d2VlbiAxLjAgYW5kIDEwLjBcclxuICAgICAgICBzaXplO1xyXG5cclxuICAgIGlmIChub3JtIDwgMS41KSB7XHJcbiAgICAgICAgc2l6ZSA9IDE7XHJcbiAgICB9IGVsc2UgaWYgKG5vcm0gPCAzKSB7XHJcbiAgICAgICAgc2l6ZSA9IDI7XHJcbiAgICAgICAgLy8gc3BlY2lhbCBjYXNlIGZvciAyLjUsIHJlcXVpcmVzIGFuIGV4dHJhIGRlY2ltYWxcclxuICAgICAgICBpZiAobm9ybSA+IDIuMjUpIHtcclxuICAgICAgICAgICAgc2l6ZSA9IDIuNTtcclxuICAgICAgICAgICAgKytkZWM7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChub3JtIDwgNy41KSB7XHJcbiAgICAgICAgc2l6ZSA9IDU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNpemUgPSAxMDtcclxuICAgIH1cclxuXHJcbiAgICBzaXplICo9IG1hZ247XHJcblxyXG4gICAgLy8gcmVkdWNlIHN0YXJ0aW5nIGRlY2ltYWxzIGlmIG5vdCBuZWVkZWRcclxuICAgIGlmIChNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWUpIHtcclxuICAgICAgICBkZWMgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXN1bHQ6IE9iamVjdCA9IHtcclxuICAgICAgICBkZWNpbWFsczogTWF0aC5tYXgoMCwgZGVjKSxcclxuICAgICAgICBzY2FsZWREZWNpbWFsczogTWF0aC5tYXgoMCwgZGVjKSAtIE1hdGguZmxvb3IoTWF0aC5sb2coc2l6ZSkgLyBNYXRoLkxOMTApICsgMlxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5leHBvcnQge1xyXG4gICAgQ09MT1JTLFxyXG4gICAgZ2V0RmllbGRzLFxyXG4gICAgZ2V0VW5pcXVlRmllbGRzLFxyXG4gICAgZ2V0RGVjaW1hbHNGb3JWYWx1ZSxcclxuICAgIGdldEFjdHVhbE5hbWVXaXRob3V0VHJhbnNmb3JtU2lnbixcclxuICAgIG5vcm1hbGl6ZUNvbG9yLFxyXG4gICAgcmVwbGFjZUZvbnRBd2Vzb21lSWNvbnMsXHJcbiAgICByZXBsYWNlV2l0aEltYWdlcyxcclxuICAgIGJ1aWxkRXJyb3JcclxufTtcclxuIl19