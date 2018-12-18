System.register(["lodash"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, COLORS, hasDuplicates, isUniqueArray, getFields, getUniqueFields, normalizeColor, getActualNameWithoutTransformSign, buildError, replaceFontAwesomeIcons, replaceWithImages, getDecimalsForValue, buildOptionOverride;
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
            hasDuplicates = function (array) {
                return array.length !== lodash_1.default.uniq(array).length;
            };
            exports_1("hasDuplicates", hasDuplicates);
            exports_1("isDuplicateArray", hasDuplicates);
            isUniqueArray = function (array) {
                return (!hasDuplicates(array));
            };
            exports_1("isUniqueArray", isUniqueArray);
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
            buildOptionOverride = function (o, i) {
                return {
                    text: String(o[0]),
                    propertyName: String(o[1]),
                    index: i,
                    defaultValue: String(o[3]),
                    values: [].concat(o[2]).map(function (value) { return String[value]; }),
                    submenu: [].concat(o[2]).map(function (value) { return { text: String(value), value: value }; })
                };
            };
            exports_1("buildOptionOverride", buildOptionOverride);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O1lBR00sTUFBTSxHQUFHO2dCQUNYLEtBQUssRUFBRSx5QkFBeUI7Z0JBQ2hDLE1BQU0sRUFBRSwwQkFBMEI7Z0JBQ2xDLEdBQUcsRUFBRSx3QkFBd0I7YUFDaEMsQ0FBQzs7WUFDSSxhQUFhLEdBQUcsVUFBVSxLQUFLO2dCQUNqQyxPQUFPLEtBQUssQ0FBQyxNQUFNLEtBQUssZ0JBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ2pELENBQUMsQ0FBQzs7O1lBQ0ksYUFBYSxHQUFHLFVBQVUsS0FBSztnQkFDakMsT0FBTyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbkMsQ0FBQyxDQUFDOztZQUNJLFNBQVMsR0FBRyxVQUFVLFVBQWlCLEVBQUUsS0FBYTtnQkFDeEQsT0FBTyxnQkFBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQWhCLENBQWdCLENBQUMsQ0FBQztZQUNwRCxDQUFDLENBQUM7O1lBQ0ksZUFBZSxHQUFHLFVBQVUsVUFBaUIsRUFBRSxLQUFhO2dCQUM5RCxPQUFPLGdCQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDNUQsQ0FBQyxDQUFDOztZQUNJLGNBQWMsR0FBRyxVQUFVLEtBQWE7Z0JBQzFDLEtBQUssR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDM0MsUUFBUSxLQUFLLEVBQUU7b0JBQ1gsS0FBSyxPQUFPO3dCQUNSLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQztvQkFDeEIsS0FBSyxRQUFRO3dCQUNULE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQztvQkFDekIsS0FBSyxLQUFLO3dCQUNOLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQztvQkFDdEI7d0JBQ0ksT0FBTyxLQUFLLENBQUM7aUJBQ3BCO1lBQ0wsQ0FBQyxDQUFDOztZQUNJLGlDQUFpQyxHQUFHLFVBQVUsS0FBYTtnQkFDN0QsT0FBTyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7cUJBQ2QsS0FBSyxDQUFDLEdBQUcsQ0FBQztxQkFDVixHQUFHLENBQUMsVUFBQSxDQUFDO29CQUNGLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUN6QyxDQUFDLEdBQUcsRUFBRSxDQUFDO3FCQUNWO29CQUNELElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUMxQyxDQUFDLEdBQUcsRUFBRSxDQUFDO3FCQUNWO29CQUNELE9BQU8sQ0FBQyxDQUFDO2dCQUNiLENBQUMsQ0FBQztxQkFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxDQUFDOztZQUNJLFVBQVUsR0FBRyxVQUFVLFVBQWtCLEVBQUUsWUFBb0I7Z0JBQ2pFLElBQUksR0FBRyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7Z0JBQ3RCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUM5QixHQUFHLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDbkMsT0FBTyxHQUFHLENBQUM7WUFDZixDQUFDLENBQUM7O1lBQ0ksdUJBQXVCLEdBQUcsVUFBVSxLQUFhO2dCQUNuRCxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjtnQkFDRCxPQUFPLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztxQkFDZCxLQUFLLENBQUMsR0FBRyxDQUFDO3FCQUNWLEdBQUcsQ0FBQyxVQUFBLENBQUM7b0JBQ0YsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ3pDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDOUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsb0JBQWlCLGNBQWMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7d0JBQy9HLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3RGLENBQUMsR0FBRyxDQUFBLG1CQUFnQixJQUFJLFdBQUssS0FBSyxXQUFRLENBQUEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7cUJBQ2xFO29CQUNELE9BQU8sQ0FBQyxDQUFDO2dCQUNiLENBQUMsQ0FBQztxQkFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxDQUFDOztZQUNJLGlCQUFpQixHQUFHLFVBQVUsS0FBYTtnQkFDN0MsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixPQUFPLEtBQUssQ0FBQztpQkFDaEI7Z0JBQ0QsT0FBTyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7cUJBQ2QsS0FBSyxDQUFDLEdBQUcsQ0FBQztxQkFDVixHQUFHLENBQUMsVUFBQSxDQUFDO29CQUNGLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUMxQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbkIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNsRCxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO3dCQUN2RixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO3dCQUN4RixJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN4RixDQUFDLEdBQUcsQ0FBQSxrQkFBZSxRQUFRLG9CQUFhLFNBQVMsaUJBQVUsTUFBTSxTQUFLLENBQUEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7cUJBQzlGO29CQUNELE9BQU8sQ0FBQyxDQUFDO2dCQUNiLENBQUMsQ0FBQztxQkFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxDQUFDOztZQUNJLG1CQUFtQixHQUFHLFVBQVUsS0FBYSxFQUFFLFNBQWlCO2dCQUNsRSxJQUFJLGdCQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQ3hCLElBQUksQ0FBQyxHQUFXO3dCQUNaLFFBQVEsRUFBRSxTQUFTO3dCQUNuQixjQUFjLEVBQUUsSUFBSTtxQkFDdkIsQ0FBQztvQkFDRixPQUFPLENBQUMsQ0FBQztpQkFDWjtnQkFFRCxJQUFJLEtBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRW5ELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQ3pCLElBQUksR0FBRyxLQUFLLEdBQUcsSUFBSSxFQUNuQixJQUFJLENBQUM7Z0JBRVQsSUFBSSxJQUFJLEdBQUcsR0FBRyxFQUFFO29CQUNaLElBQUksR0FBRyxDQUFDLENBQUM7aUJBQ1o7cUJBQU0sSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFO29CQUNqQixJQUFJLEdBQUcsQ0FBQyxDQUFDO29CQUVULElBQUksSUFBSSxHQUFHLElBQUksRUFBRTt3QkFDYixJQUFJLEdBQUcsR0FBRyxDQUFDO3dCQUNYLEVBQUUsR0FBRyxDQUFDO3FCQUNUO2lCQUNKO3FCQUFNLElBQUksSUFBSSxHQUFHLEdBQUcsRUFBRTtvQkFDbkIsSUFBSSxHQUFHLENBQUMsQ0FBQztpQkFDWjtxQkFBTTtvQkFDSCxJQUFJLEdBQUcsRUFBRSxDQUFDO2lCQUNiO2dCQUVELElBQUksSUFBSSxJQUFJLENBQUM7Z0JBR2IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssRUFBRTtvQkFDN0IsR0FBRyxHQUFHLENBQUMsQ0FBQztpQkFDWDtnQkFFRCxJQUFJLE1BQU0sR0FBVztvQkFDakIsUUFBUSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztvQkFDMUIsY0FBYyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztpQkFDaEYsQ0FBQztnQkFFRixPQUFPLE1BQU0sQ0FBQztZQUNsQixDQUFDLENBQUM7O1lBQ0ksbUJBQW1CLEdBQUcsVUFBVSxDQUFRLEVBQUUsQ0FBUztnQkFDckQsT0FBTztvQkFDSCxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbEIsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLEtBQUssRUFBRSxDQUFDO29CQUNSLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQixNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLLElBQU0sT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQy9ELE9BQU8sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUssSUFBTSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzNGLENBQUM7WUFDTixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7IE9wdGlvbk92ZXJyaWRlIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvaW50ZXJmYWNlc1wiO1xyXG5cclxuY29uc3QgQ09MT1JTID0ge1xyXG4gICAgR1JFRU46IFwicmdiYSg1MCwgMTcyLCA0NSwgMC45NylcIixcclxuICAgIE9SQU5HRTogXCJyZ2JhKDIzNywgMTI5LCA0MCwgMC44OSlcIixcclxuICAgIFJFRDogXCJyZ2JhKDI0NSwgNTQsIDU0LCAwLjkpXCJcclxufTtcclxuY29uc3QgaGFzRHVwbGljYXRlcyA9IGZ1bmN0aW9uIChhcnJheSkge1xyXG4gICAgcmV0dXJuIGFycmF5Lmxlbmd0aCAhPT0gXy51bmlxKGFycmF5KS5sZW5ndGg7XHJcbn07XHJcbmNvbnN0IGlzVW5pcXVlQXJyYXkgPSBmdW5jdGlvbiAoYXJyYXkpIHtcclxuICAgIHJldHVybiAoIWhhc0R1cGxpY2F0ZXMoYXJyYXkpKTtcclxufTtcclxuY29uc3QgZ2V0RmllbGRzID0gZnVuY3Rpb24gKGNvbGxlY3Rpb246IGFueVtdLCBmaWVsZDogU3RyaW5nKTogYW55W10ge1xyXG4gICAgcmV0dXJuIF8ubWFwKGNvbGxlY3Rpb24sIGQgPT4gZFtTdHJpbmcoZmllbGQpXSk7XHJcbn07XHJcbmNvbnN0IGdldFVuaXF1ZUZpZWxkcyA9IGZ1bmN0aW9uIChjb2xsZWN0aW9uOiBhbnlbXSwgZmllbGQ6IFN0cmluZyk6IGFueVtdIHtcclxuICAgIHJldHVybiBfLnVuaXEoXy5tYXAoY29sbGVjdGlvbiwgZCA9PiBkW1N0cmluZyhmaWVsZCldKSk7XHJcbn07XHJcbmNvbnN0IG5vcm1hbGl6ZUNvbG9yID0gZnVuY3Rpb24gKGNvbG9yOiBTdHJpbmcpOiBTdHJpbmcge1xyXG4gICAgY29sb3IgPSAoY29sb3IgfHwgXCJcIikudG9Mb3dlckNhc2UoKS50cmltKCk7XHJcbiAgICBzd2l0Y2ggKGNvbG9yKSB7XHJcbiAgICAgICAgY2FzZSBcImdyZWVuXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBDT0xPUlMuR1JFRU47XHJcbiAgICAgICAgY2FzZSBcIm9yYW5nZVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gQ09MT1JTLk9SQU5HRTtcclxuICAgICAgICBjYXNlIFwicmVkXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBDT0xPUlMuUkVEO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBjb2xvcjtcclxuICAgIH1cclxufTtcclxuY29uc3QgZ2V0QWN0dWFsTmFtZVdpdGhvdXRUcmFuc2Zvcm1TaWduID0gZnVuY3Rpb24gKHZhbHVlOiBTdHJpbmcpOiBTdHJpbmcge1xyXG4gICAgcmV0dXJuICh2YWx1ZSArIFwiXCIpXHJcbiAgICAgICAgLnNwbGl0KFwiIFwiKVxyXG4gICAgICAgIC5tYXAoYSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChhLnN0YXJ0c1dpdGgoXCJfZmEtXCIpICYmIGEuZW5kc1dpdGgoXCJfXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBhID0gYGA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGEuc3RhcnRzV2l0aChcIl9pbWctXCIpICYmIGEuZW5kc1dpdGgoXCJfXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBhID0gYGA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGE7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuam9pbihcIiBcIik7XHJcbn07XHJcbmNvbnN0IGJ1aWxkRXJyb3IgPSBmdW5jdGlvbiAoZXJyb3JUaXRsZTogU3RyaW5nLCBlcnJvck1lc3NhZ2U6IFN0cmluZyk6IEVycm9yIHtcclxuICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoKTtcclxuICAgIGVyci5uYW1lID0gU3RyaW5nKGVycm9yVGl0bGUpO1xyXG4gICAgZXJyLm1lc3NhZ2UgPSBTdHJpbmcoZXJyb3JNZXNzYWdlKTtcclxuICAgIHJldHVybiBlcnI7XHJcbn07XHJcbmNvbnN0IHJlcGxhY2VGb250QXdlc29tZUljb25zID0gZnVuY3Rpb24gKHZhbHVlOiBTdHJpbmcpOiBTdHJpbmcge1xyXG4gICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiAodmFsdWUgKyBcIlwiKVxyXG4gICAgICAgIC5zcGxpdChcIiBcIilcclxuICAgICAgICAubWFwKGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYS5zdGFydHNXaXRoKFwiX2ZhLVwiKSAmJiBhLmVuZHNXaXRoKFwiX1wiKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGljb24gPSBhLnJlcGxhY2UoL1xcXy9nLCBcIlwiKS5zcGxpdChcIixcIilbMF07XHJcbiAgICAgICAgICAgICAgICBsZXQgY29sb3IgPSBhLmluZGV4T2YoXCIsXCIpID4gLTEgPyBgIHN0eWxlPVwiY29sb3I6JHtub3JtYWxpemVDb2xvcihhLnJlcGxhY2UoL1xcXy9nLCBcIlwiKS5zcGxpdChcIixcIilbMV0pfVwiIGAgOiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlcGVhdENvdW50ID0gYS5zcGxpdChcIixcIikubGVuZ3RoID4gMiA/ICsoYS5yZXBsYWNlKC9cXF8vZywgXCJcIikuc3BsaXQoXCIsXCIpWzJdKSA6IDE7XHJcbiAgICAgICAgICAgICAgICBhID0gYDxpIGNsYXNzPVwiZmEgJHtpY29ufVwiICR7Y29sb3J9PjwvaT4gYC5yZXBlYXQocmVwZWF0Q291bnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmpvaW4oXCIgXCIpO1xyXG59O1xyXG5jb25zdCByZXBsYWNlV2l0aEltYWdlcyA9IGZ1bmN0aW9uICh2YWx1ZTogU3RyaW5nKTogU3RyaW5nIHtcclxuICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKHZhbHVlICsgXCJcIilcclxuICAgICAgICAuc3BsaXQoXCIgXCIpXHJcbiAgICAgICAgLm1hcChhID0+IHtcclxuICAgICAgICAgICAgaWYgKGEuc3RhcnRzV2l0aChcIl9pbWctXCIpICYmIGEuZW5kc1dpdGgoXCJfXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBhID0gYS5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW1nVXJsID0gYS5yZXBsYWNlKFwiX2ltZy1cIiwgXCJcIikuc3BsaXQoXCIsXCIpWzBdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGltZ1dpZHRoID0gYS5zcGxpdChcIixcIikubGVuZ3RoID4gMSA/IGEucmVwbGFjZShcIl9pbWctXCIsIFwiXCIpLnNwbGl0KFwiLFwiKVsxXSA6IFwiMjBweFwiO1xyXG4gICAgICAgICAgICAgICAgbGV0IGltZ0hlaWdodCA9IGEuc3BsaXQoXCIsXCIpLmxlbmd0aCA+IDIgPyBhLnJlcGxhY2UoXCJfaW1nLVwiLCBcIlwiKS5zcGxpdChcIixcIilbMl0gOiBcIjIwcHhcIjtcclxuICAgICAgICAgICAgICAgIGxldCByZXBlYXRDb3VudCA9IGEuc3BsaXQoXCIsXCIpLmxlbmd0aCA+IDMgPyArKGEucmVwbGFjZShcIl9pbWctXCIsIFwiXCIpLnNwbGl0KFwiLFwiKVszXSkgOiAxO1xyXG4gICAgICAgICAgICAgICAgYSA9IGA8aW1nIHdpZHRoPVwiJHtpbWdXaWR0aH1cIiBoZWlnaHQ9XCIke2ltZ0hlaWdodH1cIiBzcmM9XCIke2ltZ1VybH1cIi8+YC5yZXBlYXQocmVwZWF0Q291bnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmpvaW4oXCIgXCIpO1xyXG59O1xyXG5jb25zdCBnZXREZWNpbWFsc0ZvclZhbHVlID0gZnVuY3Rpb24gKHZhbHVlOiBudW1iZXIsIF9kZWNpbWFsczogbnVtYmVyKTogT2JqZWN0IHtcclxuICAgIGlmIChfLmlzTnVtYmVyKCtfZGVjaW1hbHMpKSB7XHJcbiAgICAgICAgbGV0IG86IE9iamVjdCA9IHtcclxuICAgICAgICAgICAgZGVjaW1hbHM6IF9kZWNpbWFscyxcclxuICAgICAgICAgICAgc2NhbGVkRGVjaW1hbHM6IG51bGxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBvO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBkZWx0YSA9IHZhbHVlIC8gMjtcclxuICAgIGxldCBkZWMgPSAtTWF0aC5mbG9vcihNYXRoLmxvZyhkZWx0YSkgLyBNYXRoLkxOMTApO1xyXG5cclxuICAgIGxldCBtYWduID0gTWF0aC5wb3coMTAsIC1kZWMpLFxyXG4gICAgICAgIG5vcm0gPSBkZWx0YSAvIG1hZ24sIC8vIG5vcm0gaXMgYmV0d2VlbiAxLjAgYW5kIDEwLjBcclxuICAgICAgICBzaXplO1xyXG5cclxuICAgIGlmIChub3JtIDwgMS41KSB7XHJcbiAgICAgICAgc2l6ZSA9IDE7XHJcbiAgICB9IGVsc2UgaWYgKG5vcm0gPCAzKSB7XHJcbiAgICAgICAgc2l6ZSA9IDI7XHJcbiAgICAgICAgLy8gc3BlY2lhbCBjYXNlIGZvciAyLjUsIHJlcXVpcmVzIGFuIGV4dHJhIGRlY2ltYWxcclxuICAgICAgICBpZiAobm9ybSA+IDIuMjUpIHtcclxuICAgICAgICAgICAgc2l6ZSA9IDIuNTtcclxuICAgICAgICAgICAgKytkZWM7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChub3JtIDwgNy41KSB7XHJcbiAgICAgICAgc2l6ZSA9IDU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNpemUgPSAxMDtcclxuICAgIH1cclxuXHJcbiAgICBzaXplICo9IG1hZ247XHJcblxyXG4gICAgLy8gcmVkdWNlIHN0YXJ0aW5nIGRlY2ltYWxzIGlmIG5vdCBuZWVkZWRcclxuICAgIGlmIChNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWUpIHtcclxuICAgICAgICBkZWMgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXN1bHQ6IE9iamVjdCA9IHtcclxuICAgICAgICBkZWNpbWFsczogTWF0aC5tYXgoMCwgZGVjKSxcclxuICAgICAgICBzY2FsZWREZWNpbWFsczogTWF0aC5tYXgoMCwgZGVjKSAtIE1hdGguZmxvb3IoTWF0aC5sb2coc2l6ZSkgLyBNYXRoLkxOMTApICsgMlxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59O1xyXG5jb25zdCBidWlsZE9wdGlvbk92ZXJyaWRlID0gZnVuY3Rpb24gKG86IGFueVtdLCBpOiBOdW1iZXIpOiBPcHRpb25PdmVycmlkZSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHRleHQ6IFN0cmluZyhvWzBdKSxcclxuICAgICAgICBwcm9wZXJ0eU5hbWU6IFN0cmluZyhvWzFdKSxcclxuICAgICAgICBpbmRleDogaSxcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IFN0cmluZyhvWzNdKSxcclxuICAgICAgICB2YWx1ZXM6IFtdLmNvbmNhdChvWzJdKS5tYXAodmFsdWUgPT4geyByZXR1cm4gU3RyaW5nW3ZhbHVlXTsgfSksXHJcbiAgICAgICAgc3VibWVudTogW10uY29uY2F0KG9bMl0pLm1hcCh2YWx1ZSA9PiB7IHJldHVybiB7IHRleHQ6IFN0cmluZyh2YWx1ZSksIHZhbHVlOiB2YWx1ZSB9OyB9KVxyXG4gICAgfTtcclxufTtcclxuZXhwb3J0IHtcclxuICAgIENPTE9SUyxcclxuICAgIGhhc0R1cGxpY2F0ZXMsXHJcbiAgICBoYXNEdXBsaWNhdGVzIGFzIGlzRHVwbGljYXRlQXJyYXksXHJcbiAgICBpc1VuaXF1ZUFycmF5LFxyXG4gICAgZ2V0RmllbGRzLFxyXG4gICAgZ2V0VW5pcXVlRmllbGRzLFxyXG4gICAgZ2V0RGVjaW1hbHNGb3JWYWx1ZSxcclxuICAgIGdldEFjdHVhbE5hbWVXaXRob3V0VHJhbnNmb3JtU2lnbixcclxuICAgIGJ1aWxkT3B0aW9uT3ZlcnJpZGUsXHJcbiAgICBub3JtYWxpemVDb2xvcixcclxuICAgIHJlcGxhY2VGb250QXdlc29tZUljb25zLFxyXG4gICAgcmVwbGFjZVdpdGhJbWFnZXMsXHJcbiAgICBidWlsZEVycm9yXHJcbn07XHJcbiJdfQ==