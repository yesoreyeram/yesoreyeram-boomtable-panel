///<reference path="../../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import kbn from 'app/core/utils/kbn';
import TimeSeries from "app/core/time_series2";
import _ from "lodash";
import * as utils from "./utils";

interface IBoomSeries {
    hidden: Boolean;
    col_name: string;
    row_name: string;
    display_value: string;
    color_bg: string;
    tooltip: string;
    value_formatted: string;
    link: string;
}

class BoomSeries implements IBoomSeries {
    private pattern: any;
    private seriesName: string;
    private currentTimeStamp: Date;
    private template_row_name: string;
    private template_col_name: string;
    private template_value: string;
    private decimals: Number;
    public col_name: string;
    public row_name: string;
    public color_bg: string;
    public display_value = "-";
    public tooltip = "-";
    public value = NaN;
    public value_formatted = "-";
    public link = "-";
    public thresholds: Number[];
    public hidden: Boolean;
    constructor(seriesData: any, panelDefaultPattern: any, panelPatterns: any[], options: any) {
        let nullPointMode = options && options.nullPointMode ? options.nullPointMode : "connected";
        let row_col_wrapper = options && options.row_col_wrapper ? options.row_col_wrapper : "_";
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
            this.value = series.stats[this.pattern.valueName];
            if (_.isNaN(this.value) || this.value === null) {
                this.display_value = this.pattern.null_value;
            } else {
                this.display_value = String(this.value);
            }
            if (!isNaN(this.value)) {
                let decimalInfo: any = utils.getDecimalsForValue(this.value, this.decimals);
                let formatFunc = kbn.valueFormats[this.pattern.format];
                this.value_formatted = formatFunc(this.value, decimalInfo.decimals, decimalInfo.scaledDecimals);
                this.display_value = String(this.value_formatted);
            }
            this.template_value = this.display_value;
        }
        if (this.value && this.pattern && this.pattern.filter && (this.pattern.filter.value_below !== "" || this.pattern.filter.value_above !== "")) {
            if (this.pattern.filter.value_below !== "" && this.value < +(this.pattern.filter.value_below)) {
                this.hidden = true;
            }
            if (this.pattern.filter.value_above !== "" && this.value > +(this.pattern.filter.value_above)) {
                this.hidden = true;
            }
        }
        this.row_name = this.getRowName(this.pattern, row_col_wrapper, this.seriesName.toString());
        this.col_name = this.getColName(this.pattern, row_col_wrapper, this.seriesName.toString(), this.row_name);
        this.thresholds = this.getThresholds();
        this.color_bg = this.getBGColor();
        this.template_value = this.getDisplayValueTemplate();
        this.link = this.pattern.enable_clickable_cells ? this.pattern.clickable_cells_link || "#" : "#";
        this.replaceTokens();
        this.cleanup();
    }
    private getThresholds() {
        let thresholds = this.pattern.thresholds.split(",").map(d => +d);
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
    private getBGColor(): string {
        let bgColor = "transparent";
        if (_.isNaN(this.value) || this.value === null) {
            bgColor = this.pattern.null_color || "darkred";
        } else {
            if (this.pattern.enable_bgColor) {
                let list_of_bgColors_based_on_thresholds = this.pattern.bgColors.split("|");
                bgColor = utils.getItemBasedOnThreshold(this.thresholds, list_of_bgColors_based_on_thresholds, this.value, bgColor);

            }
            if (this.pattern.enable_bgColor_overrides && this.pattern.bgColors_overrides !== "") {
                let _bgColors_overrides = this.pattern.bgColors_overrides.split("|").filter(con => con.indexOf("->")).map(con => con.split("->")).filter(con => +(con[0]) === this.value).map(con => con[1]);
                if (_bgColors_overrides.length > 0 && _bgColors_overrides[0] !== "") {
                    bgColor = ("" + _bgColors_overrides[0]).trim();
                }
            }
        }
        return utils.normalizeColor(bgColor);
    }
    private getDisplayValueTemplate(): string {
        let template = this.template_value;
        if (_.isNaN(this.value) || this.value === null) {
            template = this.pattern.null_value || "No data";
        } else {
            if (this.pattern.enable_transform) {
                let transform_values = this.pattern.transform_values.split("|");
                template = utils.getItemBasedOnThreshold(this.thresholds, transform_values, this.value, template);
            }
            if (this.pattern.enable_transform_overrides && this.pattern.transform_values_overrides !== "") {
                let _transform_values_overrides = this.pattern.transform_values_overrides.split("|").filter(con => con.indexOf("->")).map(con => con.split("->")).filter(con => +(con[0]) === this.value).map(con => con[1]);
                if (_transform_values_overrides.length > 0 && _transform_values_overrides[0] !== "") {
                    template = ("" + _transform_values_overrides[0]).trim();
                }
            }
        }
        return template;
    }
    private cleanup() {
        delete this.decimals;
        delete this.template_col_name;
        delete this.template_row_name;
        delete this.template_value;
        delete this.pattern;
        delete this.seriesName;
        delete this.value;
        delete this.value_formatted;
        delete this.currentTimeStamp;
        delete this.thresholds;
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
    private replaceTokens() {
        // _series_ can be specified in Row, Col, Display Value & Link
        this.row_name = this.template_row_name.replace(new RegExp("_series_", "g"), this.seriesName.toString());
        this.col_name = this.template_col_name.replace(new RegExp("_series_", "g"), this.seriesName.toString());
        this.link = this.link.replace(new RegExp("_series_", "g"), this.seriesName.toString().trim());
        this.display_value = this.template_value.replace(new RegExp("_series_", "g"), this.seriesName.toString());
        // _row_name_ can be specified in Col, Display Value & Link
        this.col_name = this.col_name.replace(new RegExp("_row_name_", "g"), this.row_name.toString());
        this.link = this.link.replace(new RegExp("_row_name_", "g"), utils.getActualNameWithoutTokens(this.row_name.toString()).trim());
        this.display_value = this.display_value.replace(new RegExp("_row_name_", "g"), this.row_name.toString());
        // _col_name_ can be specified in Row, Display Value & Link
        this.row_name = this.row_name.replace(new RegExp("_col_name_", "g"), this.col_name.toString());
        this.link = this.link.replace(new RegExp("_col_name_", "g"), utils.getActualNameWithoutTokens(this.col_name.toString()).trim());
        this.display_value = this.display_value.replace(new RegExp("_col_name_", "g"), this.col_name.toString());
        // _value_raw_ can be specified in Display Value & Link
        let value_raw = _.isNaN(this.value) || this.value === null ? "null" : this.value.toString().trim();
        this.link = this.link.replace(new RegExp("_value_raw_", "g"), value_raw);
        this.display_value = this.display_value.replace(new RegExp("_value_raw_", "g"), value_raw);
        // _value_ can be specified in Display Value & Link
        let value_formatted = _.isNaN(this.value) || this.value === null ? "null" : this.value_formatted.toString().trim();
        this.link = this.link.replace(new RegExp("_value_", "g"), value_formatted);
        this.display_value = this.display_value.replace(new RegExp("_value_", "g"), value_formatted);
        // FA & Img transforms can be specified in Row, Col & Display Value
        this.row_name = utils.replaceTokens(this.row_name);
        this.col_name = utils.replaceTokens(this.col_name);
        this.display_value = utils.replaceTokens(this.display_value);
    }
}

class BoomTimeBasedThreshold {
    public enabledDays: string;
    public from: string;
    public name: string;
    public threshold: string;
    public to: string;
    constructor() {
        this.enabledDays = "Sun,Mon,Tue,Wed,Thu,Fri,Sat";
        this.from = "0000";
        this.name = "Early morning of everyday";
        this.threshold = "70,90";
        this.to = "0530";
    }
}

class BoomPattern {
    private row_col_wrapper = "_";
    public bgColors: string;
    public bgColors_overrides: string;
    public clickable_cells_link: string;
    public col_name: string;
    public decimals: Number;
    public delimiter: string;
    public enable_bgColor: Boolean;
    public enable_bgColor_overrides: Boolean;
    public enable_clickable_cells: Boolean;
    public enable_time_based_thresholds: Boolean;
    public enable_transform: Boolean;
    public enable_transform_overrides: Boolean;
    public filter: {
        value_above: string;
        value_below: string;
    };
    public format: string;
    public name: string;
    public null_color: string;
    public null_value: string;
    public pattern: string;
    public row_name: string;
    public thresholds: string;
    public time_based_thresholds: BoomTimeBasedThreshold[];
    public transform_values: string;
    public transform_values_overrides: string;
    public valueName: string;
    public inverseBGColors;
    public inverseTransformValues;
    public add_time_based_thresholds;
    public remove_time_based_thresholds;
    public setUnitFormat;
    constructor(options: any) {
        if (options && options.row_col_wrapper) {
            this.row_col_wrapper = options.row_col_wrapper;
        }
        this.bgColors = options && options.bgColors ? options.bgColors : "green|orange|red";
        this.bgColors_overrides = options && options.bgColors_overrides ? options.bgColors_overrides : "0->green|2->red|1->yellow";
        this.clickable_cells_link = options && options.clickable_cells_link ? options.clickable_cells_link : "";
        this.col_name = options && options.col_name ? options.col_name : this.row_col_wrapper + "1" + this.row_col_wrapper;
        this.decimals = options && options.decimals ? options.decimals : 2;
        this.delimiter = options && options.delimiter ? options.delimiter : ".";
        this.enable_bgColor = false;
        this.enable_bgColor_overrides = false;
        this.enable_clickable_cells = false;
        this.enable_time_based_thresholds = false;
        this.enable_transform = false;
        this.enable_transform_overrides = false;
        this.filter = {
            value_above: "",
            value_below: "",
        };
        this.format = options && options.format ? options.format : "none";
        this.name = options && options.name ? options.name : "New Pattern";
        this.null_color = options && options.null_color ? options.null_color : "darkred";
        this.null_value = options && options.null_value ? options.null_value : "No data";
        this.pattern = options && options.pattern ? options.pattern : "^server.*cpu$";
        this.row_name = options && options.row_name ? options.row_name : this.row_col_wrapper + "0" + this.row_col_wrapper;
        this.thresholds = options && options.thresholds ? options.thresholds : "70,90";
        this.time_based_thresholds = [];
        this.transform_values = options && options.transform_values ? options.transform_values : "_value_|_value_|_value_";
        this.transform_values_overrides = options && options.transform_values_overrides ? options.transform_values_overrides : "0->down|1->up";
        this.valueName = options && options.valueName ? options.valueName : "avg";
    }
}

BoomPattern.prototype.inverseBGColors = function () {
    this.bgColors = this.bgColors ? this.bgColors.split("|").reverse().join("|") : "";
};

BoomPattern.prototype.inverseTransformValues = function () {
    this.transform_values = this.transform_values ? this.transform_values.split("|").reverse().join("|") : "";
};

BoomPattern.prototype.add_time_based_thresholds = function () {
    let new_time_based_threshold = new BoomTimeBasedThreshold();
    this.time_based_thresholds = this.time_based_thresholds || [];
    this.time_based_thresholds.push(new_time_based_threshold);
};

BoomPattern.prototype.remove_time_based_thresholds = function (index) {
    if (this.time_based_thresholds.length > 0) {
        this.time_based_thresholds.splice(index, 1);
    }
};

BoomPattern.prototype.setUnitFormat = function (format) {
    this.format = format && format.value ? format.value : "none";
};

export {
    IBoomSeries,
    BoomSeries,
    BoomPattern,
    BoomTimeBasedThreshold
};
