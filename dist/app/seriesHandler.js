///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />
System.register(["lodash", 'app/core/utils/kbn', "app/core/time_series2", "./utils"], function(exports_1) {
    var lodash_1, kbn_1, time_series2_1, utils;
    var ___transformValue, ___computeColorFromThresholds, defaultHandler, computeServerTimestamp, assignPattern, assignRowName, assignColName, assignDecimals, transformValue, transformValueOverrides, assignBGColors, assignTextColors, applyBGColorOverrides, applyTextColorOverrides, applyFontAwesomeIcons, applyImageTransform, assignClickableLinks, assignRowColKey, assignThresholds, assignValue, filterValues, getFilteredSeries, compute;
    return {
        setters:[
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (kbn_1_1) {
                kbn_1 = kbn_1_1;
            },
            function (time_series2_1_1) {
                time_series2_1 = time_series2_1_1;
            },
            function (utils_1) {
                utils = utils_1;
            }],
        execute: function() {
            ___transformValue = function (thresholds, transform_values, value, displayValue, row_name, col_name) {
                var t = value;
                if (thresholds && transform_values && typeof value === "number" && thresholds.length + 1 <= transform_values.length) {
                    transform_values = lodash_1.default.dropRight(transform_values, transform_values.length - thresholds.length - 1);
                    if (transform_values[transform_values.length - 1] === "") {
                        transform_values[transform_values.length - 1] = "_value_";
                    }
                    for (var i = thresholds.length; i > 0; i--) {
                        if (value >= thresholds[i - 1]) {
                            return transform_values[i].replace(new RegExp("_value_", "g"), String(displayValue)).replace(new RegExp("_row_name_", "g"), String(row_name)).replace(new RegExp("_col_name_", "g"), String(col_name));
                        }
                    }
                    return lodash_1.default.first(transform_values).replace(new RegExp("_value_", "g"), String(displayValue)).replace(new RegExp("_row_name_", "g"), String(row_name)).replace(new RegExp("_col_name_", "g"), String(col_name));
                }
                return String(t);
            };
            ___computeColorFromThresholds = function (thresholds, bgColors, value, defaultColor) {
                var c = defaultColor;
                if (thresholds && bgColors && typeof value === "number" && thresholds.length + 1 <= bgColors.length) {
                    bgColors = lodash_1.default.dropRight(bgColors, bgColors.length - thresholds.length - 1);
                    if (bgColors[bgColors.length - 1] === "") {
                        bgColors[bgColors.length - 1] = defaultColor;
                    }
                    for (var i = thresholds.length; i > 0; i--) {
                        if (value >= thresholds[i - 1]) {
                            return utils.normalizeColor(bgColors[i]);
                        }
                    }
                    return utils.normalizeColor(lodash_1.default.first(bgColors));
                }
                return c;
            };
            defaultHandler = function (seriesData) {
                var series = new time_series2_1.default({
                    datapoints: seriesData.datapoints || [],
                    alias: seriesData.target
                });
                series.flotpairs = series.getFlotPairs("connected");
                return series;
            };
            computeServerTimestamp = function (series) {
                series.current_servertimestamp = new Date();
                if (series && series.datapoints && series.datapoints.length > 0) {
                    if (lodash_1.default.last(series.datapoints).length === 2) {
                        series.current_servertimestamp = new Date(lodash_1.default.last(series.datapoints)[1]);
                    }
                }
                return series;
            };
            assignPattern = function (series, patterns, defaultPattern) {
                series.pattern = lodash_1.default.find(patterns.filter(function (p) { return p.disabled !== true; }), function (p) {
                    return series.alias.match(p.pattern);
                });
                if (series.pattern === undefined) {
                    series.pattern = defaultPattern;
                }
                return series;
            };
            assignRowName = function (series, defaultPattern, row_col_wrapper) {
                series.row_name = series.alias.split(String(series.pattern.delimiter) || ".").reduce(function (r, it, i) {
                    return r.replace(new RegExp(String(row_col_wrapper) + i + String(row_col_wrapper), "g"), it);
                }, series.pattern.row_name.replace(new RegExp(row_col_wrapper + "series" + row_col_wrapper, "g"), String(series.alias)) || defaultPattern.row_name.replace(new RegExp(row_col_wrapper + "series" + row_col_wrapper, "g"), String(series.alias)));
                if (series.alias.split(String(series.pattern.delimiter) || ".").length === 1) {
                    series.row_name = series.alias;
                }
                return series;
            };
            assignColName = function (series, defaultPattern, row_col_wrapper) {
                series.col_name = series.alias.split(String(series.pattern.delimiter) || ".").reduce(function (r, it, i) {
                    return r.replace(new RegExp(String(row_col_wrapper) + i + String(row_col_wrapper), "g"), it);
                }, series.pattern.col_name || defaultPattern.col_name);
                if (series.alias.split(String(series.pattern.delimiter) || ".").length === 1 || series.row_name === series.alias) {
                    series.col_name = series.pattern.col_name || "Value";
                }
                return series;
            };
            assignDecimals = function (series, defaultPattern) {
                series.decimals = (series.pattern.decimals) || defaultPattern.decimals;
                return series;
            };
            transformValue = function (series, defaultPattern) {
                series.enable_transform = series.pattern.enable_transform;
                series.transform_values = (series.pattern.transform_values || defaultPattern.transform_values).split("|");
                series.displayValue = series.enable_transform === true ? ___transformValue(series.thresholds, series.transform_values, series.value, series.displayValue, series.row_name, series.col_name) : series.displayValue;
                if (series.displayValue === (series.pattern.null_value || defaultPattern.null_value || "Null")) {
                    series.displayValue = series.pattern.null_value || defaultPattern.null_value;
                }
                else if (isNaN(series.value)) {
                    series.displayValue = series.pattern.null_value || defaultPattern.null_value;
                }
                return series;
            };
            transformValueOverrides = function (series) {
                series.enable_transform_overrides = series.pattern.enable_transform_overrides;
                series.transform_values_overrides = series.pattern.transform_values_overrides || "";
                if (series.enable_transform_overrides && series.transform_values_overrides !== "") {
                    var _transform_values_overrides = series.transform_values_overrides.split("|").filter(function (con) { return con.indexOf("->") > -1; }).map(function (con) { return con.split("->"); }).filter(function (con) { return +(con[0]) === series.value; }).map(function (con) { return con[1]; });
                    if (_transform_values_overrides.length > 0 && _transform_values_overrides[0] !== "") {
                        series.displayValue = ("" + _transform_values_overrides[0]).trim().replace(new RegExp("_value_", "g"), String(series.displayValue)).replace(new RegExp("_row_name_", "g"), String(series.row_name)).replace(new RegExp("_col_name_", "g"), String(series.col_name));
                    }
                }
                return series;
            };
            assignBGColors = function (series, defaultPattern) {
                series.enable_bgColor = series.pattern.enable_bgColor;
                series.bgColors = (series.pattern.bgColors || defaultPattern.bgColors || "").split("|");
                series.bgColor = series.enable_bgColor === true ? ___computeColorFromThresholds(series.thresholds, series.bgColors, series.value, "transparent") : "transparent";
                if (series.displayValue === (series.pattern.null_value || defaultPattern.null_value || "Null")) {
                    series.bgColor = series.pattern.null_color || defaultPattern.null_color || "transparent";
                }
                return series;
            };
            assignTextColors = function (series, defaultPattern) {
                series.enable_TextColors = series.pattern.enable_TextColors;
                series.textColors = (series.pattern.textColors || defaultPattern.textColors || "").split("|");
                series.textColor = series.enable_TextColors === true ? ___computeColorFromThresholds(series.thresholds, series.textColors, series.value, "white") : "white";
                if (series.displayValue === (series.pattern.null_value || defaultPattern.null_value || "Null")) {
                    series.textColor = series.pattern.null_text_color || defaultPattern.null_text_color || "white";
                }
                return series;
            };
            applyBGColorOverrides = function (series) {
                series.enable_bgColor_overrides = series.pattern.enable_bgColor_overrides;
                series.bgColors_overrides = series.pattern.bgColors_overrides || "";
                if (series.enable_bgColor_overrides && series.bgColors_overrides !== "") {
                    var _bgColors_overrides = series.bgColors_overrides.split("|").filter(function (con) { return con.indexOf("->") > -1; }).map(function (con) { return con.split("->"); }).filter(function (con) { return +(con[0]) === series.value; }).map(function (con) { return con[1]; });
                    if (_bgColors_overrides.length > 0 && _bgColors_overrides[0] !== "") {
                        series.bgColor = utils.normalizeColor(("" + _bgColors_overrides[0]).trim());
                    }
                }
                return series;
            };
            applyTextColorOverrides = function (series) {
                series.enable_TextColor_overrides = series.pattern.enable_TextColor_overrides;
                series.textColors_overrides = series.pattern.textColors_overrides || "";
                if (series.enable_TextColor_overrides && series.textColors_overrides !== "") {
                    var _textColors_overrides = series.textColors_overrides.split("|").filter(function (con) { return con.indexOf("->") > -1; }).map(function (con) { return con.split("->"); }).filter(function (con) { return +(con[0]) === series.value; }).map(function (con) { return con[1]; });
                    if (_textColors_overrides.length > 0 && _textColors_overrides[0] !== "") {
                        series.textColor = utils.normalizeColor(("" + _textColors_overrides[0]).trim());
                    }
                }
                return series;
            };
            applyFontAwesomeIcons = function (series) {
                series.actual_displayvalue = series.displayValue;
                series.actual_row_name = series.row_name;
                series.actual_col_name = series.col_name;
                if (series.displayValue && series.displayValue.indexOf("_fa-") > -1)
                    series.displayValue = utils.replaceFontAwesomeIcons(series.displayValue);
                if (series.row_name && series.row_name.indexOf("_fa-") > -1)
                    series.row_name = utils.replaceFontAwesomeIcons(series.row_name);
                if (series.col_name && series.col_name.indexOf("_fa-") > -1)
                    series.col_name = utils.replaceFontAwesomeIcons(series.col_name);
                return series;
            };
            applyImageTransform = function (series) {
                if (series.displayValue && series.displayValue.indexOf("_img-") > -1)
                    series.displayValue = utils.replaceWithImages(series.displayValue);
                if (series.row_name && series.row_name.indexOf("_img-") > -1)
                    series.row_name = utils.replaceWithImages(series.row_name);
                if (series.col_name && series.col_name.indexOf("_img-") > -1)
                    series.col_name = utils.replaceWithImages(series.col_name);
                return series;
            };
            assignClickableLinks = function (series) {
                if (series.pattern.enable_clickable_cells) {
                    var targetLink = series.pattern.clickable_cells_link || "#";
                    targetLink = targetLink.replace(new RegExp("_row_name_", "g"), utils.getActualNameWithoutTransformSign(series.actual_row_name).trim());
                    targetLink = targetLink.replace(new RegExp("_col_name_", "g"), utils.getActualNameWithoutTransformSign(series.actual_col_name).trim());
                    targetLink = targetLink.replace(new RegExp("_value_", "g"), utils.getActualNameWithoutTransformSign(series.value).trim());
                    series.displayValue = "<a href=\"" + targetLink + "\" target=\"_blank\">" + series.displayValue + "</a>";
                }
                return series;
            };
            assignRowColKey = function (series) {
                series.key_name = series.row_name + "#" + series.col_name;
                return series;
            };
            assignThresholds = function (series, defaultPattern) {
                series.thresholds = (series.pattern.thresholds || defaultPattern.thresholds).split(",").map(function (d) { return +d; });
                if (series.pattern.enable_time_based_thresholds) {
                    var metricrecivedTimeStamp = series.current_servertimestamp || new Date();
                    var metricrecivedTimeStamp_innumber = metricrecivedTimeStamp.getHours() * 100 + metricrecivedTimeStamp.getMinutes();
                    var weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
                    lodash_1.default.each(series.pattern.time_based_thresholds, function (tbtx) {
                        if (tbtx && tbtx.from && tbtx.to && tbtx.enabledDays &&
                            (metricrecivedTimeStamp_innumber >= +(tbtx.from)) &&
                            (metricrecivedTimeStamp_innumber <= +(tbtx.to)) &&
                            (tbtx.enabledDays.toLowerCase().indexOf(weekdays[metricrecivedTimeStamp.getDay()]) > -1) &&
                            tbtx.threshold) {
                            series.thresholds = (tbtx.threshold + "").split(",").map(function (d) { return +d; });
                        }
                    });
                }
                return series;
            };
            assignValue = function (series, defaultPattern) {
                if (series.stats) {
                    series.value = series.stats[String(series.pattern.valueName) || String(defaultPattern.valueName)];
                    var decimalInfo = utils.getDecimalsForValue(series.value, +(series.decimals));
                    var formatFunc = kbn_1.default.valueFormats[String(series.pattern.format) || String(defaultPattern.format)];
                    if (series.value === null) {
                        series.displayValue = series.pattern.null_value || defaultPattern.null_value || "Null";
                    }
                    else if (!isNaN(series.value)) {
                        series.valueFormatted = formatFunc(series.value, decimalInfo.decimals, decimalInfo.scaledDecimals);
                        series.valueRounded = kbn_1.default.roundValue(series.value, decimalInfo.decimals);
                        series.displayValue = series.valueFormatted;
                    }
                    else {
                        series.displayValue = series.pattern.null_value || defaultPattern.null_value || "Null";
                    }
                }
                return series;
            };
            filterValues = function (series) {
                if (!series.pattern.filter) {
                    series.pattern.filter = {
                        value_below: "",
                        value_above: ""
                    };
                }
                if (series.pattern && series.pattern.filter && (series.pattern.filter.value_below !== "" || series.pattern.filter.value_above !== "")) {
                    if (series.pattern.filter.value_below !== "" && series.value < +(series.pattern.filter.value_below)) {
                        return false;
                    }
                    if (series.pattern.filter.value_above !== "" && series.value > +(series.pattern.filter.value_above)) {
                        return false;
                    }
                    return true;
                }
                else {
                    return true;
                }
                ;
            };
            getFilteredSeries = function (seriesArray) {
                var newSeries = [];
                lodash_1.default.each(seriesArray, function (series) {
                    if (filterValues(series)) {
                        newSeries.push(series);
                    }
                });
                return newSeries;
            };
            compute = function (dataComputed, defaultPattern, patterns, row_col_wrapper) {
                dataComputed = dataComputed.map(function (series) { return computeServerTimestamp(series); });
                dataComputed = dataComputed.map(function (series) { return assignPattern(series, patterns, defaultPattern); });
                dataComputed = dataComputed.map(function (series) { return assignDecimals(series, defaultPattern); });
                dataComputed = dataComputed.map(function (series) { return assignValue(series, defaultPattern); });
                dataComputed = getFilteredSeries(dataComputed);
                dataComputed = dataComputed.map(function (series) { return assignRowName(series, defaultPattern, row_col_wrapper); });
                dataComputed = dataComputed.map(function (series) { return assignColName(series, defaultPattern, row_col_wrapper); });
                dataComputed = dataComputed.map(function (series) { return assignRowColKey(series); });
                dataComputed = dataComputed.map(function (series) { return assignThresholds(series, defaultPattern); });
                dataComputed = dataComputed.map(function (series) { return assignBGColors(series, defaultPattern); });
                dataComputed = dataComputed.map(function (series) { return applyBGColorOverrides(series); });
                dataComputed = dataComputed.map(function (series) { return assignTextColors(series, defaultPattern); });
                dataComputed = dataComputed.map(function (series) { return applyTextColorOverrides(series); });
                dataComputed = dataComputed.map(function (series) { return transformValue(series, defaultPattern); });
                dataComputed = dataComputed.map(function (series) { return transformValueOverrides(series); });
                dataComputed = dataComputed.map(function (series) { return applyFontAwesomeIcons(series); });
                dataComputed = dataComputed.map(function (series) { return applyImageTransform(series); });
                dataComputed = dataComputed.map(function (series) { return assignClickableLinks(series); });
                return dataComputed;
            };
            exports_1("compute", compute);
            exports_1("defaultHandler", defaultHandler);
            exports_1("assignPattern", assignPattern);
            exports_1("assignRowName", assignRowName);
            exports_1("assignColName", assignColName);
            exports_1("assignRowColKey", assignRowColKey);
            exports_1("assignThresholds", assignThresholds);
            exports_1("assignValue", assignValue);
            exports_1("filterValues", filterValues);
            exports_1("computeServerTimestamp", computeServerTimestamp);
            exports_1("assignDecimals", assignDecimals);
            exports_1("assignBGColors", assignBGColors);
            exports_1("applyBGColorOverrides", applyBGColorOverrides);
            exports_1("transformValue", transformValue);
            exports_1("transformValueOverrides", transformValueOverrides);
            exports_1("applyFontAwesomeIcons", applyFontAwesomeIcons);
            exports_1("applyImageTransform", applyImageTransform);
            exports_1("assignClickableLinks", assignClickableLinks);
        }
    }
});
//# sourceMappingURL=seriesHandler.js.map