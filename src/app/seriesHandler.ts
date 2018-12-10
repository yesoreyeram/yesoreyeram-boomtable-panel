///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from "lodash";
import kbn from 'app/core/utils/kbn';
import TimeSeries from "app/core/time_series2";
import * as utils from "./utils";

let ___transformValue = function (thresholds, transform_values, value, displayValue, row_name, col_name): String {
    let t = value;
    if (thresholds && transform_values && typeof value === "number" && thresholds.length + 1 <= transform_values.length) {
        transform_values = _.dropRight(transform_values, transform_values.length - thresholds.length - 1);
        if (transform_values[transform_values.length - 1] === "") {
            transform_values[transform_values.length - 1] = "_value_";
        }
        for (let i = thresholds.length; i > 0; i--) {
            if (value >= thresholds[i - 1]) {
                return transform_values[i].replace(new RegExp("_value_", "g"), displayValue).replace(new RegExp("_row_name_", "g"), row_name).replace(new RegExp("_col_name_", "g"), col_name);
            }
        }
        return _.first(transform_values).replace(new RegExp("_value_", "g"), displayValue).replace(new RegExp("_row_name_", "g"), row_name).replace(new RegExp("_col_name_", "g"), col_name);
    }
    return t;
}
let ___computeBgColor = function (thresholds, bgColors, value): String {
    let c = "transparent";
    if (thresholds && bgColors && typeof value === "number" && thresholds.length + 1 <= bgColors.length) {
        bgColors = _.dropRight(bgColors, bgColors.length - thresholds.length - 1);
        if (bgColors[bgColors.length - 1] === "") {
            bgColors[bgColors.length - 1] = "transparent";
        }
        for (let i = thresholds.length; i > 0; i--) {
            if (value >= thresholds[i - 1]) {
                return utils.normalizeColor(bgColors[i]);
            }
        }
        return utils.normalizeColor(_.first(bgColors));
    }
    return c;
}
let ___computetextColor = function (thresholds, bgColors, value): String {
    let c = "white";
    if (thresholds && bgColors && typeof value === "number" && thresholds.length + 1 <= bgColors.length) {
        bgColors = _.dropRight(bgColors, bgColors.length - thresholds.length - 1);
        if (bgColors[bgColors.length - 1] === "") {
            bgColors[bgColors.length - 1] = "white";
        }
        for (let i = thresholds.length; i > 0; i--) {
            if (value >= thresholds[i - 1]) {
                return utils.normalizeColor(bgColors[i]);
            }
        }
        return utils.normalizeColor(_.first(bgColors));
    }
    return c;
}
let defaultHandler = function (seriesData): any {
    let series = new TimeSeries({
        datapoints: seriesData.datapoints || [],
        alias: seriesData.target
    });
    series.flotpairs = series.getFlotPairs("connected");
    return series;
}
let computeServerTimestamp = function (series): any {
    series.current_servertimestamp = new Date();
    if (series && series.datapoints && series.datapoints.length > 0) {
        if (_.last(series.datapoints).length === 2) {
            series.current_servertimestamp = new Date(_.last(series.datapoints)[1]);
        }
    }
    return series;
}
let assignPattern = function (series, patterns, defaultPattern): any {
    series.pattern = _.find(patterns.filter(p => { return p.disabled !== true }), function (p) {
        return series.alias.match(p.pattern);
    });
    if (series.pattern === undefined) {
        series.pattern = defaultPattern;
    }
    return series;
}
let assignRowName = function (series, defaultPattern, row_col_wrapper): any {
    series.row_name = series.alias.split(series.pattern.delimiter || ".").reduce((r, it, i) => {
        return r.replace(new RegExp(row_col_wrapper + i + row_col_wrapper, "g"), it)
    }, series.pattern.row_name.replace(new RegExp(row_col_wrapper + "series" + row_col_wrapper, "g"), series.alias) || defaultPattern.row_name.replace(new RegExp(row_col_wrapper + "series" + row_col_wrapper, "g"), series.alias));
    if (series.alias.split(series.pattern.delimiter || ".").length === 1) {
        series.row_name = series.alias;
    }
    return series;
}
let assignColName = function (series, defaultPattern, row_col_wrapper): any {
    series.col_name = series.alias.split(series.pattern.delimiter || ".").reduce((r, it, i) => {
        return r.replace(new RegExp(row_col_wrapper + i + row_col_wrapper, "g"), it)
    }, series.pattern.col_name || defaultPattern.col_name);
    if (series.alias.split(series.pattern.delimiter || ".").length === 1 || series.row_name === series.alias) {
        series.col_name = series.pattern.col_name || "Value";
    }
    return series;
}
let assignDecimals = function (series, defaultPattern): any {
    series.decimals = (series.pattern.decimals) || defaultPattern.decimals;
    return series;
}
let transformValue = function (series, defaultPattern): any {
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
}
let transformValueOverrides = function (series): any {
    series.enable_transform_overrides = series.pattern.enable_transform_overrides;
    series.transform_values_overrides = series.pattern.transform_values_overrides || "";
    if (series.enable_transform_overrides && series.transform_values_overrides !== "") {
        let _transform_values_overrides = series.transform_values_overrides.split("|").filter(con => con.indexOf("->")).map(con => con.split("->")).filter(con => +(con[0]) === series.value).map(con => con[1])
        if (_transform_values_overrides.length > 0 && _transform_values_overrides[0] !== "") {
            series.displayValue = ("" + _transform_values_overrides[0]).trim().replace(new RegExp("_value_", "g"), series.displayValue).replace(new RegExp("_row_name_", "g"), series.row_name).replace(new RegExp("_col_name_", "g"), series.col_name);
        }
    }
    return series;
}
let filterValues = function (series): any {
    if (!series.pattern.filter) {
        series.pattern.filter = {};
        series.pattern.filter.value_below = "";
        series.pattern.filter.value_above = "";
    }
    if (series.pattern && series.pattern.filter && (series.pattern.filter.value_below !== "" || series.pattern.filter.value_above !== "")) {
        if (series.pattern.filter.value_below !== "" && series.value < +(series.pattern.filter.value_below)) {
            return false
        }
        if (series.pattern.filter.value_above !== "" && series.value > +(series.pattern.filter.value_above)) {
            return false
        }
        return true
    }
    else {
        return true
    };
}
let assignBGColors = function (series, defaultPattern): any {
    series.enable_bgColor = series.pattern.enable_bgColor;
    series.bgColors = (series.pattern.bgColors || defaultPattern.bgColors || "" ).split("|");
    series.bgColor = series.enable_bgColor === true ? ___computeBgColor(series.thresholds, series.bgColors, series.value) : "transparent";
    if (series.displayValue === (series.pattern.null_value || defaultPattern.null_value || "Null")) {
        series.bgColor = series.pattern.null_color || defaultPattern.null_color;
    }
    series.enable_TextColors = series.pattern.enable_TextColors;
    series.textColors = (series.pattern.textColors || defaultPattern.textColors || "").split("|");
    series.textColor = series.enable_TextColors === true ? ___computetextColor(series.thresholds, series.textColors, series.value) : "white";
    return series;
}
let applyBGColorOverrides = function (series): any {
    series.enable_bgColor_overrides = series.pattern.enable_bgColor_overrides;
    series.bgColors_overrides = series.pattern.bgColors_overrides || "";
    if (series.enable_bgColor_overrides && series.bgColors_overrides !== "") {
        let _bgColors_overrides = series.bgColors_overrides.split("|").filter(con => con.indexOf("->")).map(con => con.split("->")).filter(con => +(con[0]) === series.value).map(con => con[1])
        if (_bgColors_overrides.length > 0 && _bgColors_overrides[0] !== "") {
            series.bgColor = utils.normalizeColor(("" + _bgColors_overrides[0]).trim());
        }
    }
    series.enable_TextColor_overrides = series.pattern.enable_TextColor_overrides;
    series.textColors_overrides = series.pattern.textColors_overrides || "";
    if (series.enable_TextColor_overrides && series.textColors_overrides !== "") {
        let _textColors_overrides = series.textColors_overrides.split("|").filter(con => con.indexOf("->")).map(con => con.split("->")).filter(con => +(con[0]) === series.value).map(con => con[1])
        if (_textColors_overrides.length > 0 && _textColors_overrides[0] !== "") {
            series.textColor = utils.normalizeColor(("" + _textColors_overrides[0]).trim());
        }
    }
    return series;
}
let applyFontAwesomeIcons = function (series): any {
    series.actual_displayvalue = series.displayValue
    series.actual_row_name = series.row_name
    series.actual_col_name = series.col_name
    if (series.displayValue && series.displayValue.indexOf("_fa-") > -1) series.displayValue = utils.replaceFontAwesomeIcons(series.displayValue)
    if (series.row_name && series.row_name.indexOf("_fa-") > -1) series.row_name = utils.replaceFontAwesomeIcons(series.row_name)
    if (series.col_name && series.col_name.indexOf("_fa-") > -1) series.col_name = utils.replaceFontAwesomeIcons(series.col_name)
    return series;
}
let applyImageTransform = function (series): any {
    if (series.displayValue && series.displayValue.indexOf("_img-") > -1) series.displayValue = utils.replaceWithImages(series.displayValue)
    if (series.row_name && series.row_name.indexOf("_img-") > -1) series.row_name = utils.replaceWithImages(series.row_name)
    if (series.col_name && series.col_name.indexOf("_img-") > -1) series.col_name = utils.replaceWithImages(series.col_name)
    return series;
}
let assignClickableLinks = function (series): any {
    if (series.pattern.enable_clickable_cells) {
        let targetLink = series.pattern.clickable_cells_link || "#";
        targetLink = targetLink.replace(new RegExp("_row_name_", "g"), utils.getActualNameWithoutTransformSign(series.actual_row_name).trim());
        targetLink = targetLink.replace(new RegExp("_col_name_", "g"), utils.getActualNameWithoutTransformSign(series.actual_col_name).trim());
        targetLink = targetLink.replace(new RegExp("_value_", "g"), utils.getActualNameWithoutTransformSign(series.value).trim());
        series.displayValue = `<a href="${targetLink}" target="_blank">${series.displayValue}</a>`
    }
    return series;
}
let assignRowColKey = function (series): any {
    series.key_name = series.row_name + "#" + series.col_name;
    return series;
}
let assignThresholds = function (series, defaultPattern): any {
    series.thresholds = (series.pattern.thresholds || defaultPattern.thresholds).split(",").map(d => +d);
    if (series.pattern.enable_time_based_thresholds) {
        let metricrecivedTimeStamp = series.current_servertimestamp || new Date();
        let metricrecivedTimeStamp_innumber = metricrecivedTimeStamp.getHours() * 100 + metricrecivedTimeStamp.getMinutes();
        let weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
        _.each(series.pattern.time_based_thresholds, (tbtx) => {
            if (tbtx && tbtx.from && tbtx.to && tbtx.enabledDays &&
                (metricrecivedTimeStamp_innumber >= +(tbtx.from)) &&
                (metricrecivedTimeStamp_innumber <= +(tbtx.to)) &&
                (tbtx.enabledDays.toLowerCase().indexOf(weekdays[metricrecivedTimeStamp.getDay()]) > -1) &&
                tbtx.threshold
            ) {
                series.thresholds = (tbtx.threshold + "").split(",").map(d => +d);
            }
        })
    }
    return series;
}
let assignValue = function (series, defaultPattern): any {
    if (series.stats) {
        series.value = series.stats[series.pattern.valueName || defaultPattern.valueName];
        let decimalInfo: any = utils.getDecimalsForValue(series.value, series.decimals);
        let formatFunc = kbn.valueFormats[series.pattern.format || defaultPattern.format];
        if (series.value === null) {
            series.displayValue = series.pattern.null_value || defaultPattern.null_value || "Null";
        }
        else if (!isNaN(series.value)) {
            series.valueFormatted = formatFunc(series.value, decimalInfo.decimals, decimalInfo.scaledDecimals);
            series.valueRounded = kbn.roundValue(series.value, decimalInfo.decimals);
            series.displayValue = series.valueFormatted;
        } else {
            series.displayValue = series.pattern.null_value || defaultPattern.null_value || "Null";
        }
    }
    return series;
}
let compute = function (dataComputed, defaultPattern, patterns, row_col_wrapper): any {
    dataComputed = dataComputed.map(series => computeServerTimestamp(series))
        .map(series => assignPattern(series, patterns, defaultPattern))
        .map(series => assignDecimals(series, defaultPattern))
        .map(series => assignValue(series, defaultPattern))
        .filter(series => filterValues(series))
        .map(series => assignRowName(series, defaultPattern, row_col_wrapper))
        .map(series => assignColName(series, defaultPattern, row_col_wrapper))
        .map(series => assignRowColKey(series))
        .map(series => assignThresholds(series, defaultPattern))
        .map(series => assignBGColors(series, defaultPattern))
        .map(series => applyBGColorOverrides(series))
        .map(series => transformValue(series, defaultPattern))
        .map(series => transformValueOverrides(series))
        .map(series => applyFontAwesomeIcons(series))
        .map(series => applyImageTransform(series))
        .map(series => assignClickableLinks(series));
    return dataComputed;
}
export {
    compute,
    defaultHandler,
    assignPattern,
    assignRowName,
    assignColName,
    assignRowColKey,
    assignThresholds,
    assignValue,
    filterValues,
    computeServerTimestamp,
    assignDecimals,
    assignBGColors,
    applyBGColorOverrides,
    transformValue,
    transformValueOverrides,
    applyFontAwesomeIcons,
    applyImageTransform,
    assignClickableLinks
}