///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from "lodash";
import kbn from "app/core/utils/kbn";
import TimeSeries from "app/core/time_series2";
import * as utils from "./utils";
import { Series, Pattern } from "./../interfaces/interfaces";

let ___transformValue = function (thresholds : Number[], transform_values : String[], value : Number, displayValue : String, row_name : String, col_name: String): String {
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
let ___computeColorFromThresholds = function (thresholds : Number[], bgColors : String[], value : Number, defaultColor : String): String {
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
let defaultHandler = function (seriesData : Series): Series {
    let series : Series = new TimeSeries({
        datapoints: seriesData.datapoints || [],
        alias: seriesData.target
    });
    series.flotpairs = series.getFlotPairs("connected");
    return series;
};
let computeServerTimestamp = function (series : Series): Series {
    series.current_servertimestamp = new Date();
    if (series && series.datapoints && series.datapoints.length > 0) {
        if (_.last(series.datapoints).length === 2) {
            series.current_servertimestamp = new Date(_.last(series.datapoints)[1]);
        }
    }
    return series;
};
let assignPattern = function (series : Series, patterns : Pattern[], defaultPattern : Pattern): Series {
    series.pattern = _.find(patterns.filter(p => { return p.disabled !== true; }), function (p) {
        return series.alias.match(p.pattern);
    });
    if (series.pattern === undefined) {
        series.pattern = defaultPattern;
    }
    return series;
};
let assignRowName = function (series : Series, defaultPattern : Pattern , row_col_wrapper : String): Series {
    series.row_name = series.alias.split(String(series.pattern.delimiter) || ".").reduce((r, it, i) => {
        return r.replace(new RegExp( String(row_col_wrapper) + i + String(row_col_wrapper), "g"), it);
    }, series.pattern.row_name.replace(new RegExp(row_col_wrapper + "series" + row_col_wrapper, "g"), String(series.alias)) || defaultPattern.row_name.replace(new RegExp(row_col_wrapper + "series" + row_col_wrapper, "g"), String(series.alias)));
    if (series.alias.split(String(series.pattern.delimiter) || ".").length === 1) {
        series.row_name = series.alias;
    }
    return series;
};
let assignColName = function (series : Series, defaultPattern : Pattern, row_col_wrapper : String ): Series {
    series.col_name = series.alias.split(String(series.pattern.delimiter) || ".").reduce((r, it, i) => {
        return r.replace(new RegExp(String(row_col_wrapper) + i + String(row_col_wrapper), "g"), it);
    }, series.pattern.col_name || defaultPattern.col_name);
    if (series.alias.split(String(series.pattern.delimiter) || ".").length === 1 || series.row_name === series.alias) {
        series.col_name = series.pattern.col_name || "Value";
    }
    return series;
};
let assignDecimals = function (series : Series, defaultPattern : Pattern ): Series {
    series.decimals = (series.pattern.decimals) || defaultPattern.decimals;
    return series;
};
let transformValue = function (series : Series, defaultPattern: Pattern): Series {
    series.enable_transform = series.pattern.enable_transform;
    series.transform_values = (series.pattern.transform_values || defaultPattern.transform_values).split("|");
    series.displayValue = series.enable_transform === true ? ___transformValue(series.thresholds, series.transform_values, series.value, series.displayValue, series.row_name, series.col_name) : series.displayValue;
    if (series.displayValue === (series.pattern.null_value || defaultPattern.null_value || "Null")) {
        series.displayValue = series.pattern.null_value || defaultPattern.null_value;
    } else if (isNaN(series.value)) {
        series.displayValue = series.pattern.null_value || defaultPattern.null_value;
    }
    return series;
};
let transformValueOverrides = function (series : Series): Series {
    series.enable_transform_overrides = series.pattern.enable_transform_overrides;
    series.transform_values_overrides = series.pattern.transform_values_overrides || "";
    if (series.enable_transform_overrides && series.transform_values_overrides !== "") {
        let _transform_values_overrides = series.transform_values_overrides.split("|").filter(con => con.indexOf("->") > -1).map(con => con.split("->")).filter(con => +(con[0]) === series.value).map(con => con[1]);
        if (_transform_values_overrides.length > 0 && _transform_values_overrides[0] !== "") {
            series.displayValue = ("" + _transform_values_overrides[0]).trim().replace(new RegExp("_value_", "g"), String(series.displayValue)).replace(new RegExp("_row_name_", "g"), String(series.row_name)).replace(new RegExp("_col_name_", "g"), String(series.col_name));
        }
    }
    return series;
};
let assignBGColors = function (series : Series, defaultPattern : Pattern): Series {
    series.enable_bgColor = series.pattern.enable_bgColor;
    series.bgColors = (series.pattern.bgColors || defaultPattern.bgColors || "").split("|");
    series.bgColor = series.enable_bgColor === true ? ___computeColorFromThresholds(series.thresholds, series.bgColors, series.value, "transparent") : "transparent";
    if (series.displayValue === (series.pattern.null_value || defaultPattern.null_value || "Null")) {
        series.bgColor = series.pattern.null_color || defaultPattern.null_color || "transparent";
    }
    return series;
};
let assignTextColors = function (series : Series, defaultPattern : Pattern): Series {
    series.enable_TextColors = series.pattern.enable_TextColors;
    series.textColors = (series.pattern.textColors || defaultPattern.textColors || "").split("|");
    series.textColor = series.enable_TextColors === true ? ___computeColorFromThresholds(series.thresholds, series.textColors, series.value, "white") : "white";
    if (series.displayValue === (series.pattern.null_value || defaultPattern.null_value || "Null")) {
        series.textColor = series.pattern.null_text_color || defaultPattern.null_text_color || "white";
    }
    return series;
};
let applyBGColorOverrides = function (series : Series): Series {
    series.enable_bgColor_overrides = series.pattern.enable_bgColor_overrides;
    series.bgColors_overrides = series.pattern.bgColors_overrides || "";
    if (series.enable_bgColor_overrides && series.bgColors_overrides !== "") {
        let _bgColors_overrides = series.bgColors_overrides.split("|").filter(con => con.indexOf("->") > -1).map(con => con.split("->")).filter(con => +(con[0]) === series.value).map(con => con[1]);
        if (_bgColors_overrides.length > 0 && _bgColors_overrides[0] !== "") {
            series.bgColor = utils.normalizeColor(("" + _bgColors_overrides[0]).trim());
        }
    }
    return series;
};
let applyTextColorOverrides = function (series : Series): Series {
    series.enable_TextColor_overrides = series.pattern.enable_TextColor_overrides;
    series.textColors_overrides = series.pattern.textColors_overrides || "";
    if (series.enable_TextColor_overrides && series.textColors_overrides !== "") {
        let _textColors_overrides = series.textColors_overrides.split("|").filter(con => con.indexOf("->") > -1).map(con => con.split("->")).filter(con => +(con[0]) === series.value).map(con => con[1]);
        if (_textColors_overrides.length > 0 && _textColors_overrides[0] !== "") {
            series.textColor = utils.normalizeColor(("" + _textColors_overrides[0]).trim());
        }
    }
    return series;
};
let applyFontAwesomeIcons = function (series : Series): Series {
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
let applyImageTransform = function (series : Series): Series {
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
let assignRowColKey = function (series : Series): Series {
    series.key_name = series.row_name + "#" + series.col_name;
    return series;
};
let assignThresholds = function (series : Series, defaultPattern : Pattern): Series {
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
        });
    }
    return series;
};
let assignValue = function (series : Series, defaultPattern : Pattern): Series {
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
let assignTooltipTemplate = function (series : Series, defaultPattern : Pattern) : Series {
    series.tooltipTemplate = series.pattern.tooltipTemplate || defaultPattern.tooltipTemplate || "Row Name : _row_name_ <br/>Col Name : _col_name_ <br/>Value : _value_";
    return series;
};
let filterValues = function (series : Series): Boolean {
    if (!series.pattern.filter) {
        series.pattern.filter = {
            value_below : "",
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
let getFilteredSeries = function(seriesArray: Series[]) : Series[] {
    let newSeries : Series[] = [];
    _.each(seriesArray , series => {
        if (filterValues(series)) {
            newSeries.push(series);
        }
    });
    return newSeries;
};
let compute = function (dataComputed : Series[] , defaultPattern : Pattern, patterns : Pattern[], row_col_wrapper : String ): Series[] {
    //console.log(dataComputed);
    dataComputed = dataComputed.map(series => computeServerTimestamp(series));
    dataComputed = dataComputed.map(series => assignPattern(series, patterns, defaultPattern));
    dataComputed = dataComputed.map(series => assignDecimals(series, defaultPattern));
    dataComputed = dataComputed.map(series => assignValue(series, defaultPattern));
    dataComputed = getFilteredSeries(dataComputed);
    dataComputed = dataComputed.map(series => assignRowName(series, defaultPattern, row_col_wrapper));
    dataComputed = dataComputed.map(series => assignColName(series, defaultPattern, row_col_wrapper));
    dataComputed = dataComputed.map(series => assignRowColKey(series));
    dataComputed = dataComputed.map(series => assignThresholds(series, defaultPattern));
    dataComputed = dataComputed.map(series => assignBGColors(series, defaultPattern));
    dataComputed = dataComputed.map(series => applyBGColorOverrides(series));
    dataComputed = dataComputed.map(series => assignTextColors(series, defaultPattern));
    dataComputed = dataComputed.map(series => applyTextColorOverrides(series));
    dataComputed = dataComputed.map(series => transformValue(series, defaultPattern));
    dataComputed = dataComputed.map(series => transformValueOverrides(series));
    dataComputed = dataComputed.map(series => applyFontAwesomeIcons(series));
    dataComputed = dataComputed.map(series => applyImageTransform(series));
    dataComputed = dataComputed.map(series => assignClickableLinks(series));
    dataComputed = dataComputed.map(series => assignTooltipTemplate(series, defaultPattern));
    return dataComputed;
};
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
};
