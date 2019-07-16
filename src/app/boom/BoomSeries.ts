///<reference path="../../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import kbn from 'app/core/utils/kbn';
import TimeSeries from "app/core/time_series2";
import _ from "lodash";
import { IBoomSeries, replaceTokens, getActualNameWithoutTokens, getDecimalsForValue, getItemBasedOnThreshold, normalizeColor } from "./index";

const get_formatted_value = function (value, decimals, format): string {
    let decimalInfo: any = getDecimalsForValue(value, decimals);
    let formatFunc = kbn.valueFormats[format];
    return formatFunc(value, decimalInfo.decimals, decimalInfo.scaledDecimals);
};

class BoomSeries implements IBoomSeries {
    private debug_mode: Boolean;
    private pattern: any;
    private seriesName: string;
    private currentTimeStamp: Date;
    private template_row_name: string;
    private template_col_name: string;
    private template_value: string;
    private row_col_wrapper: string;
    private decimals: Number;
    public col_name: string;
    public row_name: string;
    public row_name_raw: string;
    public color_bg: string;
    public color_text: string;
    public display_value = "-";
    public tooltip = "-";
    public value = NaN;
    public value_formatted = "-";
    public link = "-";
    public thresholds: Number[];
    public hidden: Boolean;
    constructor(seriesData: any, panelDefaultPattern: any, panelPatterns: any[], options: any, scopedVars: any, templateSrv: any, timeSrv: any) {
        this.debug_mode = options && options.debug_mode === true ? true : false;
        let nullPointMode = options && options.nullPointMode ? options.nullPointMode : "connected";
        this.row_col_wrapper = options && options.row_col_wrapper ? options.row_col_wrapper : "_";
        this.seriesName = "";
        this.template_row_name = "";
        this.template_col_name = "";
        this.template_value = "";
        this.hidden = false;
        this.pattern = undefined;
        let series = new TimeSeries({
            alias: seriesData.target,
            datapoints: seriesData.datapoints || []
        });
        series.flotpairs = series.getFlotPairs(nullPointMode);
        this.seriesName = series.alias || series.aliasEscaped || series.label || series.id;
        this.currentTimeStamp = new Date();
        if (series.dataPoints && series.dataPoints.length > 0 && _.last(series.dataPoints).length === 2) {
            this.currentTimeStamp = new Date(_.last(series.dataPoints)[1]);
        }
        this.pattern = _.find(panelPatterns.filter(p => { return p.disabled !== true; }), p => this.seriesName.match(p.pattern)) || panelDefaultPattern;
        this.decimals = this.pattern.decimals || panelDefaultPattern.decimals || 2;
        if (series.stats) {
            if (this.pattern.valueName === "last_time") {
                if (_.last(series.datapoints)) {
                    this.value = _.last(series.datapoints)[1];
                }
            } else if (this.pattern.valueName === "last_time_nonnull") {
                let non_null_data = series.datapoints.filter(s => s[0]);
                if (_.last(non_null_data) && _.last(non_null_data)[1]) {
                    this.value = _.last(non_null_data)[1];
                }
            } else {
                this.value = series.stats[this.pattern.valueName];
            }
            if (_.isNaN(this.value) || this.value === null) {
                this.display_value = this.pattern.null_value;
            } else {
                this.display_value = String(this.value);
            }
            if (!isNaN(this.value)) {
                this.value_formatted = get_formatted_value(this.value, this.decimals, this.pattern.format);
                this.display_value = String(this.value_formatted);
            }
        }
        if (this.value && this.pattern && this.pattern.filter && (this.pattern.filter.value_below !== "" || this.pattern.filter.value_above !== "")) {
            if (this.pattern.filter.value_below !== "" && this.value < +(this.pattern.filter.value_below)) {
                this.hidden = true;
            }
            if (this.pattern.filter.value_above !== "" && this.value > +(this.pattern.filter.value_above)) {
                this.hidden = true;
            }
        }
        this.row_name = this.getRowName(this.pattern, this.row_col_wrapper, (this.seriesName || "").toString());
        this.row_name_raw = this.getRowName(this.pattern, this.row_col_wrapper, (this.seriesName || "").toString());
        this.col_name = this.getColName(this.pattern, this.row_col_wrapper, (this.seriesName || "").toString(), this.row_name);
        this.thresholds = this.getThresholds(templateSrv, scopedVars);
        this.color_bg = this.getBGColor(templateSrv, scopedVars);
        this.color_text = this.getTextColor(templateSrv, scopedVars);
        this.template_value = this.getDisplayValueTemplate();
        this.tooltip = this.pattern.tooltipTemplate || "Series : _series_ <br/>Row Name : _row_name_ <br/>Col Name : _col_name_ <br/>Value : _value_";
        this.link = this.pattern.enable_clickable_cells ? this.pattern.clickable_cells_link || "#" : "#";
        if (this.link !== "#") {
            const range = timeSrv.timeRangeForUrl();
            this.link += (this.link.indexOf("?") > -1 ? `&from=${range.from}` : `?from=${range.from}`);
            this.link += `&to=${range.to}`;
        }
        this.replaceTokens(templateSrv, scopedVars, series);
        this.cleanup();
    }
    private getThresholds(templateSrv: any, scopedVars: any) {
        let thresholds = templateSrv.replace(this.pattern.thresholds, scopedVars).split(",").map(d => +d);
        if (this.pattern.enable_time_based_thresholds) {
            let metricrecivedTimeStamp = this.currentTimeStamp || new Date();
            let metricrecivedTimeStamp_innumber = metricrecivedTimeStamp.getHours() * 100 + metricrecivedTimeStamp.getMinutes();
            let weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
            _.each(this.pattern.time_based_thresholds, (tbtx) => {
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
    }
    private getBGColor(templateSrv: any, scopedVars: any): string {
        let bgColor = "transparent";
        if (_.isNaN(this.value) || this.value === null) {
            bgColor = this.pattern.null_color || "darkred";
            if (this.pattern.null_color === "") {
                bgColor = "transparent";
            }
        } else {
            bgColor = this.pattern.defaultBGColor || bgColor;
            if (this.pattern.enable_bgColor && this.pattern.bgColors) {
                let list_of_bgColors_based_on_thresholds = templateSrv.replace(this.pattern.bgColors, scopedVars).split("|");
                bgColor = getItemBasedOnThreshold(this.thresholds, list_of_bgColors_based_on_thresholds, this.value, bgColor);

            }
            if (this.pattern.enable_bgColor_overrides && this.pattern.bgColors_overrides !== "") {
                let _bgColors_overrides = templateSrv.replace(this.pattern.bgColors_overrides, scopedVars).split("|").filter(con => con.indexOf("->")).map(con => con.split("->")).filter(con => +(con[0]) === this.value).map(con => con[1]);
                if (_bgColors_overrides.length > 0 && _bgColors_overrides[0] !== "") {
                    bgColor = ("" + _bgColors_overrides[0]).trim();
                }
            }
        }
        return normalizeColor(bgColor);
    }
    private getTextColor(templateSrv: any, scopedVars: any): string {
        let textColor = document.body.classList.contains("theme-light") ? "black" : "white";
        if (_.isNaN(this.value) || this.value === null) {
            textColor = this.pattern.null_textcolor || textColor;
        } else {
            textColor = this.pattern.defaultTextColor || textColor;
            if (this.pattern.enable_textColor && this.pattern.textColors) {
                let list_of_textColors_based_on_thresholds = templateSrv.replace(this.pattern.textColors, scopedVars).split("|");
                textColor = getItemBasedOnThreshold(this.thresholds, list_of_textColors_based_on_thresholds, this.value, textColor);
            }
            if (this.pattern.enable_textColor_overrides && this.pattern.textColors_overrides !== "") {
                let _textColors_overrides = templateSrv.replace(this.pattern.textColors_overrides, scopedVars).split("|").filter(con => con.indexOf("->")).map(con => con.split("->")).filter(con => +(con[0]) === this.value).map(con => con[1]);
                if (_textColors_overrides.length > 0 && _textColors_overrides[0] !== "") {
                    textColor = ("" + _textColors_overrides[0]).trim();
                }
            }
        }
        return normalizeColor(textColor);
    }
    private getDisplayValueTemplate(): string {
        let template = "_value_";
        if (_.isNaN(this.value) || this.value === null) {
            template = this.pattern.null_value || "No data";
            if (this.pattern.null_value === "") {
                template = "";
            }
        } else {
            template = this.pattern.displayTemplate || template;
            if (this.pattern.enable_transform) {
                let transform_values = this.pattern.transform_values.split("|");
                template = getItemBasedOnThreshold(this.thresholds, transform_values, this.value, template);
            }
            if (this.pattern.enable_transform_overrides && this.pattern.transform_values_overrides !== "") {
                let _transform_values_overrides = this.pattern.transform_values_overrides.split("|").filter(con => con.indexOf("->")).map(con => con.split("->")).filter(con => +(con[0]) === this.value).map(con => con[1]);
                if (_transform_values_overrides.length > 0 && _transform_values_overrides[0] !== "") {
                    template = ("" + _transform_values_overrides[0]).trim();
                }
            }
            if (this.pattern.enable_transform || this.pattern.enable_transform_overrides) {
                template = this.seriesName.split(this.pattern.delimiter || ".").reduce((r, it, i) => {
                    return r.replace(new RegExp(this.row_col_wrapper + i + this.row_col_wrapper, "g"), it);
                }, template);
            }
        }
        return template;
    }
    private cleanup() {
        if (this.debug_mode !== true) {
            delete this.seriesName;
            delete this.pattern;
            delete this.thresholds;
            delete this.decimals;
            delete this.template_col_name;
            delete this.template_row_name;
            delete this.template_value;
            delete this.value_formatted;
            delete this.currentTimeStamp;
        }
    }
    private getRowName(pattern, row_col_wrapper: string, seriesName: string): string {
        let row_name = pattern.row_name;
        row_name = seriesName.split(pattern.delimiter || ".").reduce((r, it, i) => {
            return r.replace(new RegExp(row_col_wrapper + i + row_col_wrapper, "g"), it);
        }, row_name);
        if (seriesName.split(pattern.delimiter || ".").length === 1) {
            row_name = seriesName;
        }
        this.template_row_name = row_name;
        return row_name;
    }
    private getColName(pattern, row_col_wrapper: string, seriesName: string, row_name: string): string {
        let col_name = pattern.col_name;
        col_name = seriesName.split(pattern.delimiter || ".").reduce((r, it, i) => {
            return r.replace(new RegExp(row_col_wrapper + i + row_col_wrapper, "g"), it);
        }, col_name);
        if (seriesName.split(pattern.delimiter || ".").length === 1 || row_name === seriesName) {
            col_name = pattern.col_name || "Value";
        }
        this.template_col_name = col_name;
        return col_name;
    }
    private replaceTokens(templateSrv: any, scopedVars: any, series: any) {
        // colnames can be specified in the link
        this.link = this.seriesName.split(this.pattern.delimiter || ".").reduce((r, it, i) => {
            return r.replace(new RegExp(this.row_col_wrapper + i + this.row_col_wrapper, "g"), it);
        }, this.link);
        // _series_ can be specified in Row, Col, Display Value, Tooltip & Link
        this.row_name = this.template_row_name.replace(new RegExp("_series_", "g"), this.seriesName.toString());
        this.col_name = this.template_col_name.replace(new RegExp("_series_", "g"), this.seriesName.toString());
        this.link = this.link.replace(new RegExp("_series_", "g"), this.seriesName.toString().trim());
        this.tooltip = this.tooltip.replace(new RegExp("_series_", "g"), this.seriesName.toString().trim());
        this.display_value = this.template_value.replace(new RegExp("_series_", "g"), this.seriesName.toString());
        // _row_name_ can be specified in Col, Display Value, Tooltip & Link
        this.col_name = this.col_name.replace(new RegExp("_row_name_", "g"), this.row_name.toString());
        this.link = this.link.replace(new RegExp("_row_name_", "g"), getActualNameWithoutTokens(this.row_name.toString()).trim());
        this.tooltip = this.tooltip.replace(new RegExp("_row_name_", "g"), getActualNameWithoutTokens(this.row_name.toString()).trim());
        this.display_value = this.display_value.replace(new RegExp("_row_name_", "g"), this.row_name.toString());
        // _col_name_ can be specified in Row, Display Value, Tooltip & Link
        this.row_name = this.row_name.replace(new RegExp("_col_name_", "g"), this.col_name.toString());
        this.link = this.link.replace(new RegExp("_col_name_", "g"), getActualNameWithoutTokens(this.col_name.toString()).trim());
        this.tooltip = this.tooltip.replace(new RegExp("_col_name_", "g"), getActualNameWithoutTokens(this.col_name.toString()).trim());
        this.display_value = this.display_value.replace(new RegExp("_col_name_", "g"), this.col_name.toString());
        // _value_raw_ can be specified in Display Value, Tooltip & Link
        let value_raw = _.isNaN(this.value) || this.value === null ? "null" : this.value.toString().trim();
        this.link = this.link.replace(new RegExp("_value_raw_", "g"), value_raw);
        this.tooltip = this.tooltip.replace(new RegExp("_value_raw_", "g"), value_raw);
        this.display_value = this.display_value.replace(new RegExp("_value_raw_", "g"), value_raw);
        this.display_value = this.display_value.replace(new RegExp("_value_min_raw_", "g"), series.stats.min);
        this.display_value = this.display_value.replace(new RegExp("_value_min_", "g"), get_formatted_value(series.stats.min, this.decimals, this.pattern.format));
        this.display_value = this.display_value.replace(new RegExp("_value_max_raw_", "g"), series.stats.max);
        this.display_value = this.display_value.replace(new RegExp("_value_max_", "g"), get_formatted_value(series.stats.max, this.decimals, this.pattern.format));
        this.display_value = this.display_value.replace(new RegExp("_value_avg_raw_", "g"), series.stats.avg);
        this.display_value = this.display_value.replace(new RegExp("_value_avg_", "g"), get_formatted_value(series.stats.avg, this.decimals, this.pattern.format));
        this.display_value = this.display_value.replace(new RegExp("_value_current_raw_", "g"), series.stats.current);
        this.display_value = this.display_value.replace(new RegExp("_value_current_", "g"), get_formatted_value(series.stats.current, this.decimals, this.pattern.format));
        this.display_value = this.display_value.replace(new RegExp("_value_total_raw_", "g"), series.stats.total);
        this.display_value = this.display_value.replace(new RegExp("_value_total_", "g"), get_formatted_value(series.stats.total, this.decimals, this.pattern.format));
        // _value_ can be specified in Display Value, Tooltip & Link
        let value_formatted = _.isNaN(this.value) || this.value === null ? "null" : this.value_formatted.toString().trim();
        this.link = this.link.replace(new RegExp("_value_", "g"), value_formatted);
        this.tooltip = this.tooltip.replace(new RegExp("_value_", "g"), value_formatted);
        this.display_value = this.display_value.replace(new RegExp("_value_", "g"), value_formatted);
        // FA & Img transforms can be specified in Row, Col & Display Value
        this.row_name = replaceTokens(this.row_name);
        this.col_name = replaceTokens(this.col_name);
        this.display_value = replaceTokens(this.display_value);

        // Replace Grafana Variables
        this.row_name = templateSrv.replace(this.row_name, scopedVars);
        this.col_name = templateSrv.replace(this.col_name, scopedVars);
        this.display_value = templateSrv.replace(this.display_value, scopedVars);
        this.tooltip = templateSrv.replace(this.tooltip, scopedVars);
        this.link = templateSrv.replace(this.link, scopedVars);
    }
}

export {
    BoomSeries
};
