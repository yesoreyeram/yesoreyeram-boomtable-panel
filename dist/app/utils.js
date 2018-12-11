System.register(["lodash"], function(exports_1) {
    var lodash_1;
    var getFields, getUniqueFields, normalizeColor, getActualNameWithoutTransformSign, buildError, replaceFontAwesomeIcons, replaceWithImages, getDecimalsForValue;
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }],
        execute: function() {
            getFields = function (collection, field) {
                return lodash_1.default.map(collection, function (d) { return d[String(field)]; });
            };
            getUniqueFields = function (collection, field) {
                return lodash_1.default.uniq(lodash_1.default.map(collection, function (d) { return d[String(field)]; }));
            };
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
            buildError = function (errorTitle, errorMessage) {
                var err = new Error();
                err.name = String(errorTitle);
                err.message = String(errorMessage);
                return err;
            };
            replaceFontAwesomeIcons = function (value) {
                if (!value)
                    return value;
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
            replaceWithImages = function (value) {
                if (!value)
                    return value;
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
                var magn = Math.pow(10, -dec), norm = delta / magn, // norm is between 1.0 and 10.0
                size;
                if (norm < 1.5) {
                    size = 1;
                }
                else if (norm < 3) {
                    size = 2;
                    // special case for 2.5, requires an extra decimal
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
                // reduce starting decimals if not needed
                if (Math.floor(value) === value) {
                    dec = 0;
                }
                var result = {
                    decimals: Math.max(0, dec),
                    scaledDecimals: Math.max(0, dec) - Math.floor(Math.log(size) / Math.LN10) + 2
                };
                return result;
            };
            exports_1("getFields", getFields);
            exports_1("getUniqueFields", getUniqueFields);
            exports_1("getDecimalsForValue", getDecimalsForValue);
            exports_1("getActualNameWithoutTransformSign", getActualNameWithoutTransformSign);
            exports_1("normalizeColor", normalizeColor);
            exports_1("replaceFontAwesomeIcons", replaceFontAwesomeIcons);
            exports_1("replaceWithImages", replaceWithImages);
            exports_1("buildError", buildError);
        }
    }
});
//# sourceMappingURL=utils.js.map