///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from "lodash";
import kbn from "app/core/utils/kbn";
import TimeSeries from "app/core/time_series2";
import * as utils from "./utils";
import { Series, Pattern } from "./../interfaces/interfaces";

let ___transformValue = function (thresholds: Number[], transform_values: String[], value: Number, displayValue: String, row_name: String, col_name: String): String {
    let t = value;
    if (thresholds && transform_values && typeof value === "number" && thresholds.length + 1 <= transform_values.length) {
        transform_values = _.dropRight(transform_values, transform_values.length - thresholds.length - 1);
        if (transform_values[transform_values.length - 1] === "") {
            transform_values[transform_values.length - 1] = "_value_";
        }
        for (let i = thresholds.length; i > 0; i--) {
            if (value >= thresholds[i - 1]) {
                let o = transform_values[i];
                o = o.replace(new RegExp("_value_", "g"), String(displayValue));
                o = o.replace(new RegExp("_row_name_", "g"), String(row_name));
                o = o.replace(new RegExp("_col_name_", "g"), String(col_name));
                return o;
            }
        }
        let o = _.first(transform_values) || "";
        o = o.replace(new RegExp("_value_", "g"), String(displayValue));
        o = o.replace(new RegExp("_row_name_", "g"), String(row_name));
        o = o.replace(new RegExp("_col_name_", "g"), String(col_name));
        return o;
    }
    return String(t);
};
let ___computeColorFromThresholds = function (thresholds: Number[], bgColors: String[], value: Number, defaultColor: String): String {
    let c = defaultColor;
    if (thresholds && bgColors && typeof value === "number" && thresholds.length + 1 <= bgColors.length) {
        bgColors = _.dropRight(bgColors, bgColors.length - thresholds.length - 1);
        if (bgColors[bgColors.length - 1] === "") {
            bgColors[bgColors.length - 1] = defaultColor;
        }
        for (let i = thresholds.length; i > 0; i--) {
            if (value >= thresholds[i - 1]) {
                return utils.normalizeColor(bgColors[i]);
            }
        }
        return utils.normalizeColor(_.first(bgColors));
    }
    return c;
};
let ___getServerTimestamp = function (series: Series): Date {
    let current_servertimestamp = new Date();
    if (series && series.datapoints && series.datapoints.length > 0) {
        if (_.last(series.datapoints).length === 2) {
            current_servertimestamp = new Date(_.last(series.datapoints)[1]);
        }
    }
    return current_servertimestamp;
};
let defaultHandler = function (seriesData: Series): Series {
    let series: Series = new TimeSeries({
        datapoints: seriesData.datapoints || [],
        alias: seriesData.target
    });
    series.flotpairs = series.getFlotPairs("connected");
    return series;
};
let getPattern = function (patterns: Pattern[], defaultPattern: Pattern, alias: String) {
    let activePatterns = patterns.filter(p => { return p.disabled !== true; });
    let matchingPattern = _.find(activePatterns, function (p) {
        return alias.match(p.pattern);
    });
    return matchingPattern || defaultPattern;
};
let getRowName = function (alias: String, pattern: Pattern, defaultPattern: Pattern, row_col_wrapper: String): String {
    let row_name: String = alias.split(String(pattern.delimiter) || ".").reduce((r, it, i) => {
        return r.replace(new RegExp(String(row_col_wrapper) + i + String(row_col_wrapper), "g"), it);
    }, pattern.row_name.replace(new RegExp(row_col_wrapper + "series" + row_col_wrapper, "g"), String(alias)) || defaultPattern.row_name.replace(new RegExp(row_col_wrapper + "series" + row_col_wrapper, "g"), String(alias)));
    if (alias.split(String(pattern.delimiter) || ".").length === 1) {
        row_name = String(alias);
    }
    return row_name;
};
let getColName = function (alias: String, row_name: String, pattern: Pattern, defaultPattern: Pattern, row_col_wrapper: String): String {
    let col_name = alias.split(String(pattern.delimiter) || ".").reduce((r, it, i) => {
        return r.replace(new RegExp(String(row_col_wrapper) + i + String(row_col_wrapper), "g"), it);
    }, pattern.col_name || defaultPattern.col_name);
    if (alias.split(String(pattern.delimiter) || ".").length === 1 || row_name === alias) {
        col_name = pattern.col_name || "Value";
    }
    return col_name;
};
let getThresholds = function (pattern: Pattern, defaultPattern: Pattern, current_servertimestamp: Date): Number[] {
    let thresholds: Number[] = (pattern.thresholds || defaultPattern.thresholds).split(",").map(d => +d);
    if (pattern.enable_time_based_thresholds) {
        let metricrecivedTimeStamp = current_servertimestamp || new Date();
        let metricrecivedTimeStamp_innumber = metricrecivedTimeStamp.getHours() * 100 + metricrecivedTimeStamp.getMinutes();
        let weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
        _.each(pattern.time_based_thresholds, (tbtx) => {
            if (tbtx && tbtx.from && tbtx.to && tbtx.enabledDays &&
                (metricrecivedTimeStamp_innumber >= +(tbtx.from)) &&
                (metricrecivedTimeStamp_innumber <= +(tbtx.to)) &&
                (tbtx.enabledDays.toLowerCase().indexOf(weekdays[metricrecivedTimeStamp.getDay()]) > -1) &&
                tbtx.threshold
            ) {
                thresholds = (tbtx.threshold + "").split(",").map(d => +d);
            }
        });
    }
    return thresholds;
};
let assignValue = function (series: Series, defaultPattern: Pattern): Series {
    if (series.stats) {
        series.value = series.stats[String(series.pattern.valueName) || String(defaultPattern.valueName)];
        let decimalInfo: any = utils.getDecimalsForValue(series.value, +(series.decimals));
        let formatFunc = kbn.valueFormats[String(series.pattern.format) || String(defaultPattern.format)];
        if (series.value === null) {
            series.displayValue = series.pattern.null_value || defaultPattern.null_value || "Null";
        } else if (!isNaN(series.value)) {
            series.valueFormatted = formatFunc(series.value, decimalInfo.decimals, decimalInfo.scaledDecimals);
            series.valueRounded = kbn.roundValue(series.value, decimalInfo.decimals);
            series.displayValue = series.valueFormatted;
        } else {
            series.displayValue = series.pattern.null_value || defaultPattern.null_value || "Null";
        }
    }
    return series;
};
let filterValues = function (series: Series): Boolean {
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
    } else {
        return true;
    }
};
let getFilteredSeries = function (seriesArray: Series[]): Series[] {
    let newSeries: Series[] = [];
    _.each(seriesArray, series => {
        if (filterValues(series)) {
            newSeries.push(series);
        }
    });
    return newSeries;
};
let getDisplayValueOverride = function (transform_values_overrides: String, value: Number, row_name: String, col_name: String, displayValue: String): String {
    let _transform_values_overrides = transform_values_overrides.split("|").filter(con => con.indexOf("->") > -1).map(con => con.split("->")).filter(con => +(con[0]) === value).map(con => con[1]);
    if (_transform_values_overrides.length > 0 && _transform_values_overrides[0] !== "") {
        displayValue = ("" + _transform_values_overrides[0]).trim().replace(new RegExp("_value_", "g"), String(displayValue)).replace(new RegExp("_row_name_", "g"), String(row_name)).replace(new RegExp("_col_name_", "g"), String(col_name));
    }
    return displayValue;
};
let getBgColor = function (pattern: Pattern, defaultPattern: Pattern, enable_bgColor: Boolean, thresholds: Number[], bgColors: String[], value: Number, displayValue: any): String {
    let bgColor = enable_bgColor === true ? ___computeColorFromThresholds(thresholds, bgColors, value, "transparent") : "transparent";
    if (displayValue === (pattern.null_value || defaultPattern.null_value || "Null")) {
        bgColor = pattern.null_color || defaultPattern.null_color || "transparent";
    }
    return bgColor;
};
let getOverridedBGColor = function (bgColors_overrides: String, value: Number, defaultBGColor: String): String {
    let bgColor = defaultBGColor;
    let _bgColors_overrides = bgColors_overrides.split("|").filter(con => con.indexOf("->") > -1).map(con => con.split("->")).filter(con => +(con[0]) === value).map(con => con[1]);
    if (_bgColors_overrides.length > 0 && _bgColors_overrides[0] !== "") {
        bgColor = utils.normalizeColor(("" + _bgColors_overrides[0]).trim());
    }
    return bgColor;
};
let getTextColor = function (pattern: Pattern, defaultPattern: Pattern, enable_TextColors: Boolean, thresholds: Number[], textColors: String[], value: Number, displayValue: any): String {
    let textColor = enable_TextColors === true ? ___computeColorFromThresholds(thresholds, textColors, value, "white") : "white";
    if (displayValue === (pattern.null_value || defaultPattern.null_value || "Null")) {
        textColor = pattern.null_text_color || defaultPattern.null_text_color || "white";
    }
    return textColor;
};
let getOverridedTextColor = function (textColors_overrides: String, value: Number, defaulttextColor: String): String {
    let textColor = defaulttextColor;
    let _textColors_overrides = textColors_overrides.split("|").filter(con => con.indexOf("->") > -1).map(con => con.split("->")).filter(con => +(con[0]) === value).map(con => con[1]);
    if (_textColors_overrides.length > 0 && _textColors_overrides[0] !== "") {
        textColor = utils.normalizeColor(("" + _textColors_overrides[0]).trim());
    }
    return textColor;
};
let applyFontAwesomeIcons = function (series: Series): Series {
    series.actual_displayvalue = series.displayValue;
    series.actual_row_name = series.row_name;
    series.actual_col_name = series.col_name;
    if (series.displayValue && series.displayValue.indexOf("_fa-") > -1) {
        series.displayValue = utils.replaceFontAwesomeIcons(series.displayValue);
    }
    if (series.row_name && series.row_name.indexOf("_fa-") > -1) {
        series.row_name = utils.replaceFontAwesomeIcons(series.row_name);
    }
    if (series.col_name && series.col_name.indexOf("_fa-") > -1) {
        series.col_name = utils.replaceFontAwesomeIcons(series.col_name);
    }
    return series;
};
let applyImageTransform = function (series: Series): Series {
    if (series.displayValue && series.displayValue.indexOf("_img-") > -1) {
        series.displayValue = utils.replaceWithImages(series.displayValue);
    }
    if (series.row_name && series.row_name.indexOf("_img-") > -1) {
        series.row_name = utils.replaceWithImages(series.row_name);
    }
    if (series.col_name && series.col_name.indexOf("_img-") > -1) {
        series.col_name = utils.replaceWithImages(series.col_name);
    }
    return series;
};
let assignClickableLinks = function (series: Series): Series {
    if (series.pattern.enable_clickable_cells) {
        let targetLink = series.pattern.clickable_cells_link || "#";
        targetLink = targetLink.replace(new RegExp("_row_name_", "g"), utils.getActualNameWithoutTransformSign(series.actual_row_name).trim());
        targetLink = targetLink.replace(new RegExp("_col_name_", "g"), utils.getActualNameWithoutTransformSign(series.actual_col_name).trim());
        targetLink = targetLink.replace(new RegExp("_value_", "g"), utils.getActualNameWithoutTransformSign(series.value).trim());
        series.displayValue = `<a href="${targetLink}" target="_blank">${series.displayValue}</a>`;
    }
    return series;
};
let compute = function (dataComputed: Series[], defaultPattern: Pattern, patterns: Pattern[], row_col_wrapper: String): Series[] {
    dataComputed = dataComputed.map(series => {
        series.pattern = getPattern(patterns, defaultPattern, series.alias);
        series.decimals = series.pattern.decimals || defaultPattern.decimals;
        return series;
    });
    dataComputed = dataComputed.map(series => assignValue(series, defaultPattern));
    dataComputed = getFilteredSeries(dataComputed);
    dataComputed = dataComputed.map(series => {
        series.row_name = getRowName(series.alias, series.pattern, defaultPattern, row_col_wrapper);
        series.col_name = getColName(series.alias, series.row_name, series.pattern, defaultPattern, row_col_wrapper);
        series.key_name = series.row_name + "#" + series.col_name;
        series.thresholds = getThresholds(series.pattern, defaultPattern, ___getServerTimestamp(series));
        series.enable_bgColor = series.pattern.enable_bgColor;
        series.bgColors = (series.pattern.bgColors || defaultPattern.bgColors || "").split("|");
        series.bgColor = getBgColor(series.pattern, defaultPattern, series.enable_bgColor, series.thresholds, series.bgColors, series.value, series.displayValue);
        series.enable_bgColor_overrides = series.pattern.enable_bgColor_overrides;
        series.bgColors_overrides = series.pattern.bgColors_overrides || "";
        if (series.enable_bgColor_overrides && series.bgColors_overrides !== "") {
            series.bgColor = getOverridedBGColor(series.bgColors_overrides, series.value, series.bgColor);
        }
        series.enable_TextColors = series.pattern.enable_TextColors;
        series.textColors = (series.pattern.textColors || defaultPattern.textColors || "").split("|");
        series.textColor = getTextColor(series.pattern, defaultPattern, series.enable_TextColors, series.thresholds, series.textColors, series.value, series.displayValue);
        series.enable_TextColor_overrides = series.pattern.enable_TextColor_overrides;
        series.textColors_overrides = series.pattern.textColors_overrides || "";
        if (series.enable_TextColor_overrides && series.textColors_overrides !== "") {
            series.textColor = getOverridedTextColor(series.textColors_overrides, series.value, series.textColor);
        }
        series.enable_transform = series.pattern.enable_transform;
        series.transform_values = (series.pattern.transform_values || defaultPattern.transform_values).split("|");
        series.displayValue = series.enable_transform === true ? ___transformValue(series.thresholds, series.transform_values, series.value, series.displayValue, series.row_name, series.col_name) : series.displayValue;
        if (series.displayValue === (series.pattern.null_value || defaultPattern.null_value || "Null")) {
            series.displayValue = series.pattern.null_value || defaultPattern.null_value;
        } else if (isNaN(series.value)) {
            series.displayValue = series.pattern.null_value || defaultPattern.null_value;
        }
        series.enable_transform_overrides = series.pattern.enable_transform_overrides;
        series.transform_values_overrides = series.pattern.transform_values_overrides || "";
        if (series.enable_transform_overrides && series.transform_values_overrides !== "") {
            series.displayValue = getDisplayValueOverride(series.transform_values_overrides, series.value, series.row_name, series.col_name, series.displayValue);
        }
        series.tooltipTemplate = series.pattern.tooltipTemplate || defaultPattern.tooltipTemplate || "Row Name : _row_name_ <br/>Col Name : _col_name_ <br/>Value : _value_";
        return series;
    });
    dataComputed = dataComputed.map(series => applyFontAwesomeIcons(series));
    dataComputed = dataComputed.map(series => applyImageTransform(series));
    dataComputed = dataComputed.map(series => assignClickableLinks(series));
    return dataComputed;
};
export {
    compute,
    defaultHandler
};
