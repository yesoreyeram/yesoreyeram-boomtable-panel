System.register(["lodash"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, getFields, getUniqueFields, normalizeColor, getActualNameWithoutTransformSign, buildError, replaceFontAwesomeIcons, replaceWithImages, getDecimalsForValue;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }
        ],
        execute: function () {
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
                        return "rgba(50, 172, 45, 0.97)";
                    case "orange":
                        return "rgba(237, 129, 40, 0.89)";
                    case "red":
                        return "rgba(245, 54, 54, 0.9)";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O1lBRU0sU0FBUyxHQUFHLFVBQVUsVUFBaUIsRUFBRSxLQUFhO2dCQUN4RCxPQUFPLGdCQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO1lBQ3BELENBQUMsQ0FBQzs7WUFDSSxlQUFlLEdBQUcsVUFBVSxVQUFpQixFQUFFLEtBQWE7Z0JBQzlELE9BQU8sZ0JBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFoQixDQUFnQixDQUFDLENBQUMsQ0FBQztZQUM1RCxDQUFDLENBQUM7O1lBQ0ksY0FBYyxHQUFHLFVBQVUsS0FBYTtnQkFDMUMsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtvQkFDakMsS0FBSyxPQUFPO3dCQUNSLE9BQU8seUJBQXlCLENBQUM7b0JBQ3JDLEtBQUssUUFBUTt3QkFDVCxPQUFPLDBCQUEwQixDQUFDO29CQUN0QyxLQUFLLEtBQUs7d0JBQ04sT0FBTyx3QkFBd0IsQ0FBQztvQkFDcEM7d0JBQ0ksT0FBTyxLQUFLLENBQUM7aUJBQ3BCO1lBQ0wsQ0FBQyxDQUFDOztZQUNJLGlDQUFpQyxHQUFHLFVBQVUsS0FBYTtnQkFDN0QsT0FBTyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7cUJBQ2QsS0FBSyxDQUFDLEdBQUcsQ0FBQztxQkFDVixHQUFHLENBQUMsVUFBQSxDQUFDO29CQUNGLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUN6QyxDQUFDLEdBQUcsRUFBRSxDQUFDO3FCQUNWO29CQUNELElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUMxQyxDQUFDLEdBQUcsRUFBRSxDQUFDO3FCQUNWO29CQUNELE9BQU8sQ0FBQyxDQUFDO2dCQUNiLENBQUMsQ0FBQztxQkFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxDQUFDOztZQUNJLFVBQVUsR0FBRyxVQUFVLFVBQWtCLEVBQUUsWUFBb0I7Z0JBQ2pFLElBQUksR0FBRyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7Z0JBQ3RCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUM5QixHQUFHLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDbkMsT0FBTyxHQUFHLENBQUM7WUFDZixDQUFDLENBQUM7O1lBQ0ksdUJBQXVCLEdBQUcsVUFBVSxLQUFhO2dCQUNuRCxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjtnQkFDRCxPQUFPLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztxQkFDZCxLQUFLLENBQUMsR0FBRyxDQUFDO3FCQUNWLEdBQUcsQ0FBQyxVQUFBLENBQUM7b0JBQ0YsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ3pDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDOUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsb0JBQWlCLGNBQWMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7d0JBQy9HLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3RGLENBQUMsR0FBRyxDQUFBLG1CQUFnQixJQUFJLFdBQUssS0FBSyxXQUFRLENBQUEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7cUJBQ2xFO29CQUNELE9BQU8sQ0FBQyxDQUFDO2dCQUNiLENBQUMsQ0FBQztxQkFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxDQUFDOztZQUNJLGlCQUFpQixHQUFHLFVBQVUsS0FBYTtnQkFDN0MsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixPQUFPLEtBQUssQ0FBQztpQkFDaEI7Z0JBQ0QsT0FBTyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7cUJBQ2QsS0FBSyxDQUFDLEdBQUcsQ0FBQztxQkFDVixHQUFHLENBQUMsVUFBQSxDQUFDO29CQUNGLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUMxQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbkIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNsRCxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO3dCQUN2RixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO3dCQUN4RixJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN4RixDQUFDLEdBQUcsQ0FBQSxrQkFBZSxRQUFRLG9CQUFhLFNBQVMsaUJBQVUsTUFBTSxTQUFLLENBQUEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7cUJBQzlGO29CQUNELE9BQU8sQ0FBQyxDQUFDO2dCQUNiLENBQUMsQ0FBQztxQkFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxDQUFDOztZQUNJLG1CQUFtQixHQUFHLFVBQVUsS0FBYSxFQUFFLFNBQWlCO2dCQUNsRSxJQUFJLGdCQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQ3hCLElBQUksQ0FBQyxHQUFXO3dCQUNaLFFBQVEsRUFBRSxTQUFTO3dCQUNuQixjQUFjLEVBQUUsSUFBSTtxQkFDdkIsQ0FBQztvQkFDRixPQUFPLENBQUMsQ0FBQztpQkFDWjtnQkFFRCxJQUFJLEtBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRW5ELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQ3pCLElBQUksR0FBRyxLQUFLLEdBQUcsSUFBSSxFQUNuQixJQUFJLENBQUM7Z0JBRVQsSUFBSSxJQUFJLEdBQUcsR0FBRyxFQUFFO29CQUNaLElBQUksR0FBRyxDQUFDLENBQUM7aUJBQ1o7cUJBQU0sSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFO29CQUNqQixJQUFJLEdBQUcsQ0FBQyxDQUFDO29CQUVULElBQUksSUFBSSxHQUFHLElBQUksRUFBRTt3QkFDYixJQUFJLEdBQUcsR0FBRyxDQUFDO3dCQUNYLEVBQUUsR0FBRyxDQUFDO3FCQUNUO2lCQUNKO3FCQUFNLElBQUksSUFBSSxHQUFHLEdBQUcsRUFBRTtvQkFDbkIsSUFBSSxHQUFHLENBQUMsQ0FBQztpQkFDWjtxQkFBTTtvQkFDSCxJQUFJLEdBQUcsRUFBRSxDQUFDO2lCQUNiO2dCQUVELElBQUksSUFBSSxJQUFJLENBQUM7Z0JBR2IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssRUFBRTtvQkFDN0IsR0FBRyxHQUFHLENBQUMsQ0FBQztpQkFDWDtnQkFFRCxJQUFJLE1BQU0sR0FBVztvQkFDakIsUUFBUSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztvQkFDMUIsY0FBYyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztpQkFDaEYsQ0FBQztnQkFFRixPQUFPLE1BQU0sQ0FBQztZQUNsQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcblxyXG5jb25zdCBnZXRGaWVsZHMgPSBmdW5jdGlvbiAoY29sbGVjdGlvbjogYW55W10sIGZpZWxkOiBTdHJpbmcpOiBhbnlbXSB7XHJcbiAgICByZXR1cm4gXy5tYXAoY29sbGVjdGlvbiwgZCA9PiBkW1N0cmluZyhmaWVsZCldKTtcclxufTtcclxuY29uc3QgZ2V0VW5pcXVlRmllbGRzID0gZnVuY3Rpb24gKGNvbGxlY3Rpb246IGFueVtdLCBmaWVsZDogU3RyaW5nKTogYW55W10ge1xyXG4gICAgcmV0dXJuIF8udW5pcShfLm1hcChjb2xsZWN0aW9uLCBkID0+IGRbU3RyaW5nKGZpZWxkKV0pKTtcclxufTtcclxuY29uc3Qgbm9ybWFsaXplQ29sb3IgPSBmdW5jdGlvbiAoY29sb3I6IFN0cmluZyk6IFN0cmluZyB7XHJcbiAgICBzd2l0Y2ggKChjb2xvciB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpKSB7XHJcbiAgICAgICAgY2FzZSBcImdyZWVuXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBcInJnYmEoNTAsIDE3MiwgNDUsIDAuOTcpXCI7XHJcbiAgICAgICAgY2FzZSBcIm9yYW5nZVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJyZ2JhKDIzNywgMTI5LCA0MCwgMC44OSlcIjtcclxuICAgICAgICBjYXNlIFwicmVkXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBcInJnYmEoMjQ1LCA1NCwgNTQsIDAuOSlcIjtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gY29sb3I7XHJcbiAgICB9XHJcbn07XHJcbmNvbnN0IGdldEFjdHVhbE5hbWVXaXRob3V0VHJhbnNmb3JtU2lnbiA9IGZ1bmN0aW9uICh2YWx1ZTogU3RyaW5nKTogU3RyaW5nIHtcclxuICAgIHJldHVybiAodmFsdWUgKyBcIlwiKVxyXG4gICAgICAgIC5zcGxpdChcIiBcIilcclxuICAgICAgICAubWFwKGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYS5zdGFydHNXaXRoKFwiX2ZhLVwiKSAmJiBhLmVuZHNXaXRoKFwiX1wiKSkge1xyXG4gICAgICAgICAgICAgICAgYSA9IGBgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhLnN0YXJ0c1dpdGgoXCJfaW1nLVwiKSAmJiBhLmVuZHNXaXRoKFwiX1wiKSkge1xyXG4gICAgICAgICAgICAgICAgYSA9IGBgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmpvaW4oXCIgXCIpO1xyXG59O1xyXG5jb25zdCBidWlsZEVycm9yID0gZnVuY3Rpb24gKGVycm9yVGl0bGU6IFN0cmluZywgZXJyb3JNZXNzYWdlOiBTdHJpbmcpOiBFcnJvciB7XHJcbiAgICBsZXQgZXJyID0gbmV3IEVycm9yKCk7XHJcbiAgICBlcnIubmFtZSA9IFN0cmluZyhlcnJvclRpdGxlKTtcclxuICAgIGVyci5tZXNzYWdlID0gU3RyaW5nKGVycm9yTWVzc2FnZSk7XHJcbiAgICByZXR1cm4gZXJyO1xyXG59O1xyXG5jb25zdCByZXBsYWNlRm9udEF3ZXNvbWVJY29ucyA9IGZ1bmN0aW9uICh2YWx1ZTogU3RyaW5nKTogU3RyaW5nIHtcclxuICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKHZhbHVlICsgXCJcIilcclxuICAgICAgICAuc3BsaXQoXCIgXCIpXHJcbiAgICAgICAgLm1hcChhID0+IHtcclxuICAgICAgICAgICAgaWYgKGEuc3RhcnRzV2l0aChcIl9mYS1cIikgJiYgYS5lbmRzV2l0aChcIl9cIikpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpY29uID0gYS5yZXBsYWNlKC9cXF8vZywgXCJcIikuc3BsaXQoXCIsXCIpWzBdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvbG9yID0gYS5pbmRleE9mKFwiLFwiKSA+IC0xID8gYCBzdHlsZT1cImNvbG9yOiR7bm9ybWFsaXplQ29sb3IoYS5yZXBsYWNlKC9cXF8vZywgXCJcIikuc3BsaXQoXCIsXCIpWzFdKX1cIiBgIDogXCJcIjtcclxuICAgICAgICAgICAgICAgIGxldCByZXBlYXRDb3VudCA9IGEuc3BsaXQoXCIsXCIpLmxlbmd0aCA+IDIgPyArKGEucmVwbGFjZSgvXFxfL2csIFwiXCIpLnNwbGl0KFwiLFwiKVsyXSkgOiAxO1xyXG4gICAgICAgICAgICAgICAgYSA9IGA8aSBjbGFzcz1cImZhICR7aWNvbn1cIiAke2NvbG9yfT48L2k+IGAucmVwZWF0KHJlcGVhdENvdW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5qb2luKFwiIFwiKTtcclxufTtcclxuY29uc3QgcmVwbGFjZVdpdGhJbWFnZXMgPSBmdW5jdGlvbiAodmFsdWU6IFN0cmluZyk6IFN0cmluZyB7XHJcbiAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICh2YWx1ZSArIFwiXCIpXHJcbiAgICAgICAgLnNwbGl0KFwiIFwiKVxyXG4gICAgICAgIC5tYXAoYSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChhLnN0YXJ0c1dpdGgoXCJfaW1nLVwiKSAmJiBhLmVuZHNXaXRoKFwiX1wiKSkge1xyXG4gICAgICAgICAgICAgICAgYSA9IGEuc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGltZ1VybCA9IGEucmVwbGFjZShcIl9pbWctXCIsIFwiXCIpLnNwbGl0KFwiLFwiKVswXTtcclxuICAgICAgICAgICAgICAgIGxldCBpbWdXaWR0aCA9IGEuc3BsaXQoXCIsXCIpLmxlbmd0aCA+IDEgPyBhLnJlcGxhY2UoXCJfaW1nLVwiLCBcIlwiKS5zcGxpdChcIixcIilbMV0gOiBcIjIwcHhcIjtcclxuICAgICAgICAgICAgICAgIGxldCBpbWdIZWlnaHQgPSBhLnNwbGl0KFwiLFwiKS5sZW5ndGggPiAyID8gYS5yZXBsYWNlKFwiX2ltZy1cIiwgXCJcIikuc3BsaXQoXCIsXCIpWzJdIDogXCIyMHB4XCI7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVwZWF0Q291bnQgPSBhLnNwbGl0KFwiLFwiKS5sZW5ndGggPiAzID8gKyhhLnJlcGxhY2UoXCJfaW1nLVwiLCBcIlwiKS5zcGxpdChcIixcIilbM10pIDogMTtcclxuICAgICAgICAgICAgICAgIGEgPSBgPGltZyB3aWR0aD1cIiR7aW1nV2lkdGh9XCIgaGVpZ2h0PVwiJHtpbWdIZWlnaHR9XCIgc3JjPVwiJHtpbWdVcmx9XCIvPmAucmVwZWF0KHJlcGVhdENvdW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5qb2luKFwiIFwiKTtcclxufTtcclxuY29uc3QgZ2V0RGVjaW1hbHNGb3JWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZTogbnVtYmVyLCBfZGVjaW1hbHM6IG51bWJlcik6IE9iamVjdCB7XHJcbiAgICBpZiAoXy5pc051bWJlcigrX2RlY2ltYWxzKSkge1xyXG4gICAgICAgIGxldCBvOiBPYmplY3QgPSB7XHJcbiAgICAgICAgICAgIGRlY2ltYWxzOiBfZGVjaW1hbHMsXHJcbiAgICAgICAgICAgIHNjYWxlZERlY2ltYWxzOiBudWxsXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gbztcclxuICAgIH1cclxuXHJcbiAgICBsZXQgZGVsdGEgPSB2YWx1ZSAvIDI7XHJcbiAgICBsZXQgZGVjID0gLU1hdGguZmxvb3IoTWF0aC5sb2coZGVsdGEpIC8gTWF0aC5MTjEwKTtcclxuXHJcbiAgICBsZXQgbWFnbiA9IE1hdGgucG93KDEwLCAtZGVjKSxcclxuICAgICAgICBub3JtID0gZGVsdGEgLyBtYWduLCAvLyBub3JtIGlzIGJldHdlZW4gMS4wIGFuZCAxMC4wXHJcbiAgICAgICAgc2l6ZTtcclxuXHJcbiAgICBpZiAobm9ybSA8IDEuNSkge1xyXG4gICAgICAgIHNpemUgPSAxO1xyXG4gICAgfSBlbHNlIGlmIChub3JtIDwgMykge1xyXG4gICAgICAgIHNpemUgPSAyO1xyXG4gICAgICAgIC8vIHNwZWNpYWwgY2FzZSBmb3IgMi41LCByZXF1aXJlcyBhbiBleHRyYSBkZWNpbWFsXHJcbiAgICAgICAgaWYgKG5vcm0gPiAyLjI1KSB7XHJcbiAgICAgICAgICAgIHNpemUgPSAyLjU7XHJcbiAgICAgICAgICAgICsrZGVjO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAobm9ybSA8IDcuNSkge1xyXG4gICAgICAgIHNpemUgPSA1O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBzaXplID0gMTA7XHJcbiAgICB9XHJcblxyXG4gICAgc2l6ZSAqPSBtYWduO1xyXG5cclxuICAgIC8vIHJlZHVjZSBzdGFydGluZyBkZWNpbWFscyBpZiBub3QgbmVlZGVkXHJcbiAgICBpZiAoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlKSB7XHJcbiAgICAgICAgZGVjID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmVzdWx0OiBPYmplY3QgPSB7XHJcbiAgICAgICAgZGVjaW1hbHM6IE1hdGgubWF4KDAsIGRlYyksXHJcbiAgICAgICAgc2NhbGVkRGVjaW1hbHM6IE1hdGgubWF4KDAsIGRlYykgLSBNYXRoLmZsb29yKE1hdGgubG9nKHNpemUpIC8gTWF0aC5MTjEwKSArIDJcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuZXhwb3J0IHtcclxuICAgIGdldEZpZWxkcyxcclxuICAgIGdldFVuaXF1ZUZpZWxkcyxcclxuICAgIGdldERlY2ltYWxzRm9yVmFsdWUsXHJcbiAgICBnZXRBY3R1YWxOYW1lV2l0aG91dFRyYW5zZm9ybVNpZ24sXHJcbiAgICBub3JtYWxpemVDb2xvcixcclxuICAgIHJlcGxhY2VGb250QXdlc29tZUljb25zLFxyXG4gICAgcmVwbGFjZVdpdGhJbWFnZXMsXHJcbiAgICBidWlsZEVycm9yXHJcbn07XHJcbiJdfQ==