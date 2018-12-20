System.register(["lodash"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, getFields, getUniqueFields, normalizeColor, replaceTokens, getActualNameWithoutTokens, limitText, getDecimalsForValue, getItemBasedOnThreshold;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }
        ],
        execute: function () {
            getFields = function (collection, field) {
                return lodash_1.default.map(collection, function (d) { return d[field]; });
            };
            exports_1("getFields", getFields);
            getUniqueFields = function (collection, field) {
                return lodash_1.default.uniq(lodash_1.default.map(collection, function (d) { return d[field]; }));
            };
            exports_1("getUniqueFields", getUniqueFields);
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
            limitText = function (text, maxlength) {
                if (text.split('').length > maxlength) {
                    text = text.substring(0, maxlength - 3) + "...";
                }
                return text;
            };
            exports_1("limitText", limitText);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O1lBRU0sU0FBUyxHQUFHLFVBQVUsVUFBVSxFQUFFLEtBQUs7Z0JBQ3pDLE9BQU8sZ0JBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFSLENBQVEsQ0FBQyxDQUFDO1lBQzVDLENBQUMsQ0FBQzs7WUFDSSxlQUFlLEdBQUcsVUFBVSxVQUFVLEVBQUUsS0FBSztnQkFDL0MsT0FBTyxnQkFBQyxDQUFDLElBQUksQ0FBQyxnQkFBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQVIsQ0FBUSxDQUFDLENBQUMsQ0FBQztZQUNwRCxDQUFDLENBQUM7O1lBQ0ksY0FBYyxHQUFHLFVBQVUsS0FBSztnQkFDbEMsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssT0FBTyxFQUFFO29CQUNqQyxPQUFPLHlCQUF5QixDQUFDO2lCQUNwQztxQkFBTSxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxRQUFRLEVBQUU7b0JBQ3pDLE9BQU8sMEJBQTBCLENBQUM7aUJBQ3JDO3FCQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLEtBQUssRUFBRTtvQkFDdEMsT0FBTyx3QkFBd0IsQ0FBQztpQkFDbkM7cUJBQU07b0JBQUUsT0FBTyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQUU7WUFDMUMsQ0FBQyxDQUFDOztZQUNJLGFBQWEsR0FBRyxVQUFVLEtBQUs7Z0JBQ2pDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQUUsT0FBTyxLQUFLLENBQUM7aUJBQUU7Z0JBQzdCLEtBQUssR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUNuQixLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDO29CQUMxQixJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDekMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM5QyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxvQkFBaUIsY0FBYyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQzt3QkFDL0csSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdEYsQ0FBQyxHQUFHLENBQUEsbUJBQWdCLElBQUksV0FBSyxLQUFLLFdBQVEsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztxQkFDbEU7eUJBQU0sSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ2pELENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuQixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2xELElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7d0JBQ3ZGLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7d0JBQ3hGLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3hGLENBQUMsR0FBRyxDQUFBLGtCQUFlLFFBQVEsb0JBQWEsU0FBUyxpQkFBVSxNQUFNLFNBQUssQ0FBQSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztxQkFDOUY7b0JBQ0QsT0FBTyxDQUFDLENBQUM7Z0JBQ2IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNiLE9BQU8sS0FBSyxDQUFDO1lBQ2pCLENBQUMsQ0FBQzs7WUFDSSwwQkFBMEIsR0FBRyxVQUFVLEtBQUs7Z0JBQzlDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQUUsT0FBTyxLQUFLLEdBQUcsRUFBRSxDQUFDO2lCQUFFO2dCQUNsQyxLQUFLLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDbkIsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUN6QyxDQUFDLEdBQUcsRUFBRSxDQUFDO3FCQUNWO3lCQUFNLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUNqRCxDQUFDLEdBQUcsRUFBRSxDQUFDO3FCQUNWO29CQUNELE9BQU8sQ0FBQyxDQUFDO2dCQUNiLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixDQUFDLENBQUM7O1lBQ0ksU0FBUyxHQUFHLFVBQVUsSUFBSSxFQUFFLFNBQVM7Z0JBQ3ZDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxFQUFFO29CQUNuQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztpQkFDbkQ7Z0JBQ0QsT0FBTyxJQUFJLENBQUM7WUFDaEIsQ0FBQyxDQUFDOztZQUNJLG1CQUFtQixHQUFHLFVBQVUsS0FBSyxFQUFFLFNBQVM7Z0JBQ2xELElBQUksZ0JBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDeEIsSUFBSSxDQUFDLEdBQVc7d0JBQ1osUUFBUSxFQUFFLFNBQVM7d0JBQ25CLGNBQWMsRUFBRSxJQUFJO3FCQUN2QixDQUFDO29CQUNGLE9BQU8sQ0FBQyxDQUFDO2lCQUNaO2dCQUVELElBQUksS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFbkQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFDekIsSUFBSSxHQUFHLEtBQUssR0FBRyxJQUFJLEVBQ25CLElBQUksQ0FBQztnQkFFVCxJQUFJLElBQUksR0FBRyxHQUFHLEVBQUU7b0JBQ1osSUFBSSxHQUFHLENBQUMsQ0FBQztpQkFDWjtxQkFBTSxJQUFJLElBQUksR0FBRyxDQUFDLEVBQUU7b0JBQ2pCLElBQUksR0FBRyxDQUFDLENBQUM7b0JBRVQsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO3dCQUNiLElBQUksR0FBRyxHQUFHLENBQUM7d0JBQ1gsRUFBRSxHQUFHLENBQUM7cUJBQ1Q7aUJBQ0o7cUJBQU0sSUFBSSxJQUFJLEdBQUcsR0FBRyxFQUFFO29CQUNuQixJQUFJLEdBQUcsQ0FBQyxDQUFDO2lCQUNaO3FCQUFNO29CQUNILElBQUksR0FBRyxFQUFFLENBQUM7aUJBQ2I7Z0JBRUQsSUFBSSxJQUFJLElBQUksQ0FBQztnQkFHYixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxFQUFFO29CQUM3QixHQUFHLEdBQUcsQ0FBQyxDQUFDO2lCQUNYO2dCQUVELElBQUksTUFBTSxHQUFXO29CQUNqQixRQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO29CQUMxQixjQUFjLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUNoRixDQUFDO2dCQUVGLE9BQU8sTUFBTSxDQUFDO1lBQ2xCLENBQUMsQ0FBQzs7WUFDSSx1QkFBdUIsR0FBRyxVQUFVLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFlBQVk7Z0JBQzdFLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQztnQkFDckIsSUFBSSxVQUFVLElBQUksTUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO29CQUM3RixNQUFNLEdBQUcsZ0JBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDcEUsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7d0JBQ2xDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLFlBQVksQ0FBQztxQkFDNUM7b0JBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQ3hDLElBQUksS0FBSyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7NEJBQzVCLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUNwQjtxQkFDSjtvQkFDRCxPQUFPLGdCQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUMxQjtnQkFDRCxPQUFPLENBQUMsQ0FBQztZQUViLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcblxuY29uc3QgZ2V0RmllbGRzID0gZnVuY3Rpb24gKGNvbGxlY3Rpb24sIGZpZWxkKSB7XG4gICAgcmV0dXJuIF8ubWFwKGNvbGxlY3Rpb24sIGQgPT4gZFtmaWVsZF0pO1xufTtcbmNvbnN0IGdldFVuaXF1ZUZpZWxkcyA9IGZ1bmN0aW9uIChjb2xsZWN0aW9uLCBmaWVsZCkge1xuICAgIHJldHVybiBfLnVuaXEoXy5tYXAoY29sbGVjdGlvbiwgZCA9PiBkW2ZpZWxkXSkpO1xufTtcbmNvbnN0IG5vcm1hbGl6ZUNvbG9yID0gZnVuY3Rpb24gKGNvbG9yKSB7XG4gICAgaWYgKGNvbG9yLnRvTG93ZXJDYXNlKCkgPT09IFwiZ3JlZW5cIikge1xuICAgICAgICByZXR1cm4gXCJyZ2JhKDUwLCAxNzIsIDQ1LCAwLjk3KVwiO1xuICAgIH0gZWxzZSBpZiAoY29sb3IudG9Mb3dlckNhc2UoKSA9PT0gXCJvcmFuZ2VcIikge1xuICAgICAgICByZXR1cm4gXCJyZ2JhKDIzNywgMTI5LCA0MCwgMC44OSlcIjtcbiAgICB9IGVsc2UgaWYgKGNvbG9yLnRvTG93ZXJDYXNlKCkgPT09IFwicmVkXCIpIHtcbiAgICAgICAgcmV0dXJuIFwicmdiYSgyNDUsIDU0LCA1NCwgMC45KVwiO1xuICAgIH0gZWxzZSB7IHJldHVybiBjb2xvci50b0xvd2VyQ2FzZSgpOyB9XG59O1xuY29uc3QgcmVwbGFjZVRva2VucyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICghdmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9XG4gICAgdmFsdWUgPSB2YWx1ZSArIFwiXCI7XG4gICAgdmFsdWUgPSB2YWx1ZS5zcGxpdChcIiBcIikubWFwKGEgPT4ge1xuICAgICAgICBpZiAoYS5zdGFydHNXaXRoKFwiX2ZhLVwiKSAmJiBhLmVuZHNXaXRoKFwiX1wiKSkge1xuICAgICAgICAgICAgbGV0IGljb24gPSBhLnJlcGxhY2UoL1xcXy9nLCBcIlwiKS5zcGxpdChcIixcIilbMF07XG4gICAgICAgICAgICBsZXQgY29sb3IgPSBhLmluZGV4T2YoXCIsXCIpID4gLTEgPyBgIHN0eWxlPVwiY29sb3I6JHtub3JtYWxpemVDb2xvcihhLnJlcGxhY2UoL1xcXy9nLCBcIlwiKS5zcGxpdChcIixcIilbMV0pfVwiIGAgOiBcIlwiO1xuICAgICAgICAgICAgbGV0IHJlcGVhdENvdW50ID0gYS5zcGxpdChcIixcIikubGVuZ3RoID4gMiA/ICsoYS5yZXBsYWNlKC9cXF8vZywgXCJcIikuc3BsaXQoXCIsXCIpWzJdKSA6IDE7XG4gICAgICAgICAgICBhID0gYDxpIGNsYXNzPVwiZmEgJHtpY29ufVwiICR7Y29sb3J9PjwvaT4gYC5yZXBlYXQocmVwZWF0Q291bnQpO1xuICAgICAgICB9IGVsc2UgaWYgKGEuc3RhcnRzV2l0aChcIl9pbWctXCIpICYmIGEuZW5kc1dpdGgoXCJfXCIpKSB7XG4gICAgICAgICAgICBhID0gYS5zbGljZSgwLCAtMSk7XG4gICAgICAgICAgICBsZXQgaW1nVXJsID0gYS5yZXBsYWNlKFwiX2ltZy1cIiwgXCJcIikuc3BsaXQoXCIsXCIpWzBdO1xuICAgICAgICAgICAgbGV0IGltZ1dpZHRoID0gYS5zcGxpdChcIixcIikubGVuZ3RoID4gMSA/IGEucmVwbGFjZShcIl9pbWctXCIsIFwiXCIpLnNwbGl0KFwiLFwiKVsxXSA6IFwiMjBweFwiO1xuICAgICAgICAgICAgbGV0IGltZ0hlaWdodCA9IGEuc3BsaXQoXCIsXCIpLmxlbmd0aCA+IDIgPyBhLnJlcGxhY2UoXCJfaW1nLVwiLCBcIlwiKS5zcGxpdChcIixcIilbMl0gOiBcIjIwcHhcIjtcbiAgICAgICAgICAgIGxldCByZXBlYXRDb3VudCA9IGEuc3BsaXQoXCIsXCIpLmxlbmd0aCA+IDMgPyArKGEucmVwbGFjZShcIl9pbWctXCIsIFwiXCIpLnNwbGl0KFwiLFwiKVszXSkgOiAxO1xuICAgICAgICAgICAgYSA9IGA8aW1nIHdpZHRoPVwiJHtpbWdXaWR0aH1cIiBoZWlnaHQ9XCIke2ltZ0hlaWdodH1cIiBzcmM9XCIke2ltZ1VybH1cIi8+YC5yZXBlYXQocmVwZWF0Q291bnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhO1xuICAgIH0pLmpvaW4oXCIgXCIpO1xuICAgIHJldHVybiB2YWx1ZTtcbn07XG5jb25zdCBnZXRBY3R1YWxOYW1lV2l0aG91dFRva2VucyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICghdmFsdWUpIHsgcmV0dXJuIHZhbHVlICsgXCJcIjsgfVxuICAgIHZhbHVlID0gdmFsdWUgKyBcIlwiO1xuICAgIHJldHVybiB2YWx1ZS5zcGxpdChcIiBcIikubWFwKGEgPT4ge1xuICAgICAgICBpZiAoYS5zdGFydHNXaXRoKFwiX2ZhLVwiKSAmJiBhLmVuZHNXaXRoKFwiX1wiKSkge1xuICAgICAgICAgICAgYSA9IGBgO1xuICAgICAgICB9IGVsc2UgaWYgKGEuc3RhcnRzV2l0aChcIl9pbWctXCIpICYmIGEuZW5kc1dpdGgoXCJfXCIpKSB7XG4gICAgICAgICAgICBhID0gYGA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfSkuam9pbihcIiBcIik7XG59O1xuY29uc3QgbGltaXRUZXh0ID0gZnVuY3Rpb24gKHRleHQsIG1heGxlbmd0aCkge1xuICAgIGlmICh0ZXh0LnNwbGl0KCcnKS5sZW5ndGggPiBtYXhsZW5ndGgpIHtcbiAgICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDAsIG1heGxlbmd0aCAtIDMpICsgXCIuLi5cIjtcbiAgICB9XG4gICAgcmV0dXJuIHRleHQ7XG59O1xuY29uc3QgZ2V0RGVjaW1hbHNGb3JWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgX2RlY2ltYWxzKSB7XG4gICAgaWYgKF8uaXNOdW1iZXIoK19kZWNpbWFscykpIHtcbiAgICAgICAgbGV0IG86IE9iamVjdCA9IHtcbiAgICAgICAgICAgIGRlY2ltYWxzOiBfZGVjaW1hbHMsXG4gICAgICAgICAgICBzY2FsZWREZWNpbWFsczogbnVsbFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbztcbiAgICB9XG5cbiAgICBsZXQgZGVsdGEgPSB2YWx1ZSAvIDI7XG4gICAgbGV0IGRlYyA9IC1NYXRoLmZsb29yKE1hdGgubG9nKGRlbHRhKSAvIE1hdGguTE4xMCk7XG5cbiAgICBsZXQgbWFnbiA9IE1hdGgucG93KDEwLCAtZGVjKSxcbiAgICAgICAgbm9ybSA9IGRlbHRhIC8gbWFnbiwgLy8gbm9ybSBpcyBiZXR3ZWVuIDEuMCBhbmQgMTAuMFxuICAgICAgICBzaXplO1xuXG4gICAgaWYgKG5vcm0gPCAxLjUpIHtcbiAgICAgICAgc2l6ZSA9IDE7XG4gICAgfSBlbHNlIGlmIChub3JtIDwgMykge1xuICAgICAgICBzaXplID0gMjtcbiAgICAgICAgLy8gc3BlY2lhbCBjYXNlIGZvciAyLjUsIHJlcXVpcmVzIGFuIGV4dHJhIGRlY2ltYWxcbiAgICAgICAgaWYgKG5vcm0gPiAyLjI1KSB7XG4gICAgICAgICAgICBzaXplID0gMi41O1xuICAgICAgICAgICAgKytkZWM7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5vcm0gPCA3LjUpIHtcbiAgICAgICAgc2l6ZSA9IDU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2l6ZSA9IDEwO1xuICAgIH1cblxuICAgIHNpemUgKj0gbWFnbjtcblxuICAgIC8vIHJlZHVjZSBzdGFydGluZyBkZWNpbWFscyBpZiBub3QgbmVlZGVkXG4gICAgaWYgKE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZSkge1xuICAgICAgICBkZWMgPSAwO1xuICAgIH1cblxuICAgIGxldCByZXN1bHQ6IE9iamVjdCA9IHtcbiAgICAgICAgZGVjaW1hbHM6IE1hdGgubWF4KDAsIGRlYyksXG4gICAgICAgIHNjYWxlZERlY2ltYWxzOiBNYXRoLm1heCgwLCBkZWMpIC0gTWF0aC5mbG9vcihNYXRoLmxvZyhzaXplKSAvIE1hdGguTE4xMCkgKyAyXG4gICAgfTtcblxuICAgIHJldHVybiByZXN1bHQ7XG59O1xuY29uc3QgZ2V0SXRlbUJhc2VkT25UaHJlc2hvbGQgPSBmdW5jdGlvbiAodGhyZXNob2xkcywgcmFuZ2VzLCB2YWx1ZSwgZGVmYXVsdFZhbHVlKTogc3RyaW5nIHtcbiAgICBsZXQgYyA9IGRlZmF1bHRWYWx1ZTtcbiAgICBpZiAodGhyZXNob2xkcyAmJiByYW5nZXMgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmIHRocmVzaG9sZHMubGVuZ3RoICsgMSA8PSByYW5nZXMubGVuZ3RoKSB7XG4gICAgICAgIHJhbmdlcyA9IF8uZHJvcFJpZ2h0KHJhbmdlcywgcmFuZ2VzLmxlbmd0aCAtIHRocmVzaG9sZHMubGVuZ3RoIC0gMSk7XG4gICAgICAgIGlmIChyYW5nZXNbcmFuZ2VzLmxlbmd0aCAtIDFdID09PSBcIlwiKSB7XG4gICAgICAgICAgICByYW5nZXNbcmFuZ2VzLmxlbmd0aCAtIDFdID0gZGVmYXVsdFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSB0aHJlc2hvbGRzLmxlbmd0aDsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlID49IHRocmVzaG9sZHNbaSAtIDFdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJhbmdlc1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXy5maXJzdChyYW5nZXMpO1xuICAgIH1cbiAgICByZXR1cm4gYztcblxufTtcbmV4cG9ydCB7XG4gICAgZ2V0RmllbGRzLFxuICAgIGdldFVuaXF1ZUZpZWxkcyxcbiAgICBub3JtYWxpemVDb2xvcixcbiAgICBnZXREZWNpbWFsc0ZvclZhbHVlLFxuICAgIGdldEl0ZW1CYXNlZE9uVGhyZXNob2xkLFxuICAgIHJlcGxhY2VUb2tlbnMsXG4gICAgZ2V0QWN0dWFsTmFtZVdpdGhvdXRUb2tlbnMsXG4gICAgbGltaXRUZXh0XG59O1xuIl19