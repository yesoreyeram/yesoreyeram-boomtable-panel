///<reference path="../node_modules/grafana-sdk-mocks/app/headers/common.d.ts" />

import _ from "lodash";
import kbn from 'app/core/utils/kbn';
import { loadPluginCss, MetricsPanelCtrl } from "app/plugins/sdk";
import TimeSeries from "app/core/time_series2";
import * as utils from "./app/utils";
import { defaultPattern } from "./app/app";
import { plugin_id, value_name_options, config } from "./app/config";
import { BoomTablePattern } from "./app/BoomTablePattern";

loadPluginCss({
  dark: `plugins/${plugin_id}/css/default.dark.css`,
  light: `plugins/${plugin_id}/css/default.light.css`
});

class GrafanaBoomTableCtrl extends MetricsPanelCtrl {
  public static templateUrl = "partials/module.html";
  public unitFormats: any = kbn.getUnitFormats();
  public valueNameOptions: Object = value_name_options;
  public dataReceived: any;
  public ctrl: any;
  public elem: any;
  public attrs: any;
  constructor($scope, $injector) {
    super($scope, $injector);
    _.defaults(this.panel, config.panelDefaults);
    this.panel.defaultPattern = this.panel.defaultPattern || defaultPattern;
    this.updatePrototypes();
    this.events.on("data-received", this.onDataReceived.bind(this));
    this.events.on("init-edit-mode", this.onInitEditMode.bind(this));
  }
  public onInitEditMode() {
    this.addEditorTab("Patterns", `public/plugins/${plugin_id}/partials/patterns.html`, 2);
    this.addEditorTab("Time based thresholds & Filters", `public/plugins/${plugin_id}/partials/patterns-advanced-options.html`, 3);
    this.addEditorTab("Options", `public/plugins/${plugin_id}/partials/options.html`, 4);
  }
  public onDataReceived(data) {
    this.dataReceived = data;
    this.render();
  }
  public addPattern() {
    let newPattern = new BoomTablePattern({
      row_col_wrapper: this.panel.row_col_wrapper
    });
    this.panel.patterns.push(newPattern);
    this.panel.activePatternIndex = this.panel.patterns.length - 1;
    this.render();
  }
  public movePattern(direction, index) {
    let tempElement = this.panel.patterns[index];
    if (direction === "UP") {
      this.panel.patterns[index] = this.panel.patterns[index - 1];
      this.panel.patterns[index - 1] = tempElement;
      this.panel.activePatternIndex = index - 1;
    }
    if (direction === "DOWN") {
      this.panel.patterns[index] = this.panel.patterns[index + 1];
      this.panel.patterns[index + 1] = tempElement;
      this.panel.activePatternIndex = index + 1;
    }
    this.render();
  }
  public removePattern(index) {
    this.panel.patterns.splice(index, 1);
    this.panel.activePatternIndex = (this.panel.patterns && this.panel.patterns.length > 0) ? (this.panel.patterns.length - 1) : -1;
    this.render();
  }
  public clonePattern(index) {
    let copiedPattern = Object.assign({}, this.panel.patterns[index]);
    Object.setPrototypeOf(copiedPattern, BoomTablePattern.prototype);
    this.panel.patterns.push(copiedPattern);
    this.render();
  }
  public limitText(text, maxlength) {
    if (text.split('').length > maxlength) {
      text = text.substring(0, maxlength - 3) + "...";
    }
    return text;
  }
  public link(scope, elem, attrs, ctrl) {
    this.scope = scope;
    this.elem = elem;
    this.attrs = attrs;
    this.ctrl = ctrl;
  }
  private updatePrototypes() {
    Object.setPrototypeOf(this.panel.defaultPattern, BoomTablePattern.prototype);
    this.panel.patterns.map(pattern => {
      Object.setPrototypeOf(pattern, BoomTablePattern.prototype);
      return pattern;
    });
  }
  public seriesHandler(seriesData) {
    let series = new TimeSeries({
      alias: seriesData.target,
      datapoints: seriesData.datapoints || []
    });
    series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
    return series;
  }
  public computeBgColor(thresholds, bgColors, value) {
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
  public transformValue(thresholds, transform_values, value, displayValue, row_name, col_name) {
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
  public getDecimalsForValue(value, _decimals) {
    if (_.isNumber(+_decimals)) {
      let o: Object = {
        decimals: _decimals,
        scaledDecimals: null
      };
      return o;
    }

    let delta = value / 2;
    let dec = -Math.floor(Math.log(delta) / Math.LN10);

    let magn = Math.pow(10, -dec),
      norm = delta / magn, // norm is between 1.0 and 10.0
      size;

    if (norm < 1.5) {
      size = 1;
    } else if (norm < 3) {
      size = 2;
      // special case for 2.5, requires an extra decimal
      if (norm > 2.25) {
        size = 2.5;
        ++dec;
      }
    } else if (norm < 7.5) {
      size = 5;
    } else {
      size = 10;
    }

    size *= magn;

    // reduce starting decimals if not needed
    if (Math.floor(value) === value) {
      dec = 0;
    }

    let result: Object = {
      decimals: Math.max(0, dec),
      scaledDecimals: Math.max(0, dec) - Math.floor(Math.log(size) / Math.LN10) + 2
    };

    return result;
  }
}

GrafanaBoomTableCtrl.prototype.render = function () {
  if (this.dataReceived) {
    // Copying the data received
    let dataComputed = this.dataReceived;
    this.panel.default_title_for_rows = this.panel.default_title_for_rows || config.default_title_for_rows;
    const metricsReceived = utils.getFields(dataComputed, "target");
    if (metricsReceived.length !== _.uniq(metricsReceived).length) {
      let duplicateKeys = _.uniq(metricsReceived.filter(v => {
        return metricsReceived.filter(t => t === v).length > 1;
      }));
      let err = new Error();
      err.name = "Duplicate data received";
      err.message = "Duplicate keys : <br/>" + duplicateKeys.join("<br/> ");
      this.panel.error = err;
      this.panel.data = undefined;
    } else {
      this.panel.error = undefined;
      // Binding the grafana computations to the metrics received
      dataComputed = dataComputed.map(this.seriesHandler.bind(this));
      // Get Server Time Stamp of the Series for time based thresholds.
      dataComputed = dataComputed.map(series => {
        series.current_servertimestamp = new Date();
        if (series && series.datapoints && series.datapoints.length > 0) {
          if (_.last(series.datapoints).length === 2) {
            series.current_servertimestamp = new Date(_.last(series.datapoints)[1]);
          }
        }
        return series;
      });
      // Assign pattern
      dataComputed = dataComputed.map(series => {
        series.pattern = _.find(this.panel.patterns.filter(p => { return p.disabled !== true; }), function (p) {
          return series.alias.match(p.pattern);
        });
        if (series.pattern === undefined) {
          series.pattern = this.panel.defaultPattern || defaultPattern;
        }
        return series;
      });
      // Assign Decimal Values
      dataComputed = dataComputed.map(series => {
        series.decimals = (series.pattern.decimals) || defaultPattern.decimals;
        return series;
      });
      // Assign value
      dataComputed = dataComputed.map(series => {
        if (series.stats) {
          series.value = series.stats[series.pattern.valueName];
          let decimalInfo: any = this.getDecimalsForValue(series.value, series.decimals);
          let formatFunc = kbn.valueFormats[series.pattern.format];
          if (series.value === null) {
            series.displayValue = series.pattern.null_value || "Null";
          } else if (!isNaN(series.value)) {
            series.valueFormatted = formatFunc(series.value, decimalInfo.decimals, decimalInfo.scaledDecimals);
            series.valueRounded = kbn.roundValue(series.value, decimalInfo.decimals);
            series.displayValue = series.valueFormatted;
          } else {
            series.displayValue = series.pattern.null_value || "Null";
          }
        }
        return series;
      });
      // Filter Values
      dataComputed = dataComputed.filter(series => {
        if (!series.pattern.filter) {
          series.pattern.filter = {};
          series.pattern.filter.value_below = "";
          series.pattern.filter.value_above = "";
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
      });
      // Assign Row Name
      dataComputed = dataComputed.map(series => {
        series.row_name = series.pattern.row_name || defaultPattern.row_name;
        series.row_name = series.row_name.replace(new RegExp(this.panel.row_col_wrapper + "series" + this.panel.row_col_wrapper, "g"), series.alias);
        series.row_name = series.alias.split(series.pattern.delimiter || ".").reduce((r, it, i) => {
          return r.replace(new RegExp(this.panel.row_col_wrapper + i + this.panel.row_col_wrapper, "g"), it);
        }, series.row_name);
        if (series.alias.split(series.pattern.delimiter || ".").length === 1) {
          series.row_name = series.alias;
        }
        return series;
      });
      // Assign Col Name
      dataComputed = dataComputed.map(series => {
        series.col_name = series.pattern.col_name || defaultPattern.col_name;
        series.col_name = series.alias.split(series.pattern.delimiter || ".").reduce((r, it, i) => {
          return r.replace(new RegExp(this.panel.row_col_wrapper + i + this.panel.row_col_wrapper, "g"), it);
        }, series.col_name);
        if (series.alias.split(series.pattern.delimiter || ".").length === 1 || series.row_name === series.alias) {
          series.col_name = series.pattern.col_name || "Value";
        }
        return series;
      });
      // Assign RowCol Key
      dataComputed = dataComputed.map(series => {
        series.key_name = series.row_name + "#" + series.col_name;
        return series;
      });
      // Assign Thresholds
      dataComputed = dataComputed.map(series => {
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
      });
      // Assign BG Colors
      dataComputed = dataComputed.map(series => {
        let bgColors = (series.pattern.bgColors || defaultPattern.bgColors).split("|");
        series.bgColor = series.pattern.enable_bgColor === true ? this.computeBgColor(series.thresholds, bgColors, series.value) : "transparent";
        if (series.displayValue === (series.pattern.null_value || defaultPattern.null_value || "Null")) {
          series.bgColor = series.pattern.null_color || defaultPattern.null_color;
        }
        return series;
      });
      // BG Colors overrides
      dataComputed = dataComputed.map(series => {
        if (series.pattern.enable_bgColor_overrides && series.pattern.bgColors_overrides  !== "") {
          let _bgColors_overrides = series.pattern.bgColors_overrides .split("|").filter(con => con.indexOf("->")).map(con => con.split("->")).filter(con => +(con[0]) === series.value).map(con => con[1]);
          if (_bgColors_overrides.length > 0 && _bgColors_overrides[0] !== "") {
            series.bgColor = utils.normalizeColor(("" + _bgColors_overrides[0]).trim());
          }
        }
        return series;
      });
      // Value Transform
      dataComputed = dataComputed.map(series => {
        let transform_values = (series.pattern.transform_values || defaultPattern.transform_values).split("|");
        series.displayValue = series.pattern.enable_transform === true ? this.transformValue(series.thresholds, transform_values , series.value, series.displayValue, series.row_name, series.col_name) : series.displayValue;
        return series;
      });
      // Value Transform Overrides
      dataComputed = dataComputed.map(series => {
        if (series.pattern.enable_transform_overrides && series.pattern.transform_values_overrides ) {
          let _transform_values_overrides = series.pattern.transform_values_overrides.split("|").filter(con => con.indexOf("->")).map(con => con.split("->")).filter(con => +(con[0]) === series.value).map(con => con[1]);
          if (_transform_values_overrides.length > 0 && _transform_values_overrides[0] !== "") {
            series.displayValue = ("" + _transform_values_overrides[0]).trim().replace(new RegExp("_value_", "g"), series.displayValue).replace(new RegExp("_row_name_", "g"), series.row_name).replace(new RegExp("_col_name_", "g"), series.col_name);
          }
        }
        return series;
      });
      // Font awesome icons & Images in value
      dataComputed = dataComputed.map(series => {
        series.actual_displayvalue = series.displayValue;
        series.actual_row_name = series.row_name;
        series.actual_col_name = series.col_name;
        series.displayValue = utils.replaceTokens(series.displayValue);
        series.row_name = utils.replaceTokens(series.row_name);
        series.col_name = utils.replaceTokens(series.col_name);
        return series;
      });
      // Cell Links
      dataComputed = dataComputed.map(series => {
        if (series.pattern.enable_clickable_cells) {
          let targetLink = series.pattern.clickable_cells_link || "#";
          targetLink = targetLink.replace(new RegExp("_row_name_", "g"), utils.getActualNameWithoutTokens(series.actual_row_name).trim());
          targetLink = targetLink.replace(new RegExp("_col_name_", "g"), utils.getActualNameWithoutTokens(series.actual_col_name).trim());
          targetLink = targetLink.replace(new RegExp("_value_", "g"), utils.getActualNameWithoutTokens(series.value).trim());
          series.displayValue = `<a href="${targetLink}" target="_blank">${series.displayValue}</a>`;
        }
        return series;
      });
      // Handle Null Value
      dataComputed = dataComputed.map(series => {
        if (_.isNaN(series.value) || series.value === null) {
          series.bgColor = series.pattern.null_color || defaultPattern.null_color || "darkred";
          series.displayValue = series.pattern.null_value || defaultPattern.null_value || "No data";
        }
        return series;
      });
      // Grouping
      const rows_found = utils.getFields(dataComputed, "row_name");
      const cols_found = utils.getFields(dataComputed, "col_name");
      const keys_found = utils.getFields(dataComputed, "key_name");
      const is_unique_keys = (keys_found.length === _.uniq(keys_found).length);
      if (is_unique_keys) {
        this.panel.error = undefined; ////
        let output: any[] = [];
        _.each(_.uniq(rows_found), (row_name) => {
          let o: any = {};
          o.row = row_name;
          o.cols = [];
          _.each(_.uniq(cols_found), (col_name) => {
            let matched_value = (_.find(dataComputed, (e) => {
              return e.row_name === row_name && e.col_name === col_name;
            }));
            if (!matched_value) {
              matched_value = {
                displayValue: "N/A",
                value: NaN
              };
            }
            o.cols.push({
              "actual_col_name": matched_value.actual_col_name,
              "actual_row_name": matched_value.actual_row_name,
              "bgColor": matched_value.bgColor || "transparent",
              "displayValue": matched_value.displayValue || matched_value.value,
              "name": col_name,
              "value": matched_value.value
            });
          });
          output.push(o);
        });
        // region Output table construction
        let boomtable_output_body_headers = this.elem.find("#boomtable_output_body_headers");
        let boomtable_output_body_headers_output = `<br/>`;
        if (this.panel.hide_headers !== true) {
          boomtable_output_body_headers_output += "<tr>";
          if (this.panel.hide_first_column !== true) {
            boomtable_output_body_headers_output += `<th style="padding:4px;text-align:center">${this.panel.default_title_for_rows}</th>`;
          }
          _.each(_.uniq(cols_found), c => {
            boomtable_output_body_headers_output += `<th style="padding:4px;text-align:center">${c}</th>`;
          });
          boomtable_output_body_headers_output += "</tr>";
        }
        boomtable_output_body_headers.html(boomtable_output_body_headers_output);
        let boomtable_output_body = this.elem.find('#boomtable_output_body');
        let boomtable_output_body_output = ``;
        _.each(output, o => {
          boomtable_output_body_output += "<tr>";
          if (this.panel.hide_first_column !== true) {
            boomtable_output_body_output += `<td style="padding:4px;">${o.row}</td>`;
          }
          _.each(o.cols, c => {
            boomtable_output_body_output += `<td
              style="padding:4px;background-color:${c.bgColor}"
              title="${ "Row Name : " + utils.getActualNameWithoutTokens(c.actual_row_name) + "\nCol Name : " + utils.getActualNameWithoutTokens(c.actual_col_name) + "\nValue : " + c.value}"
            >${c.displayValue}</td>`;
          });
          boomtable_output_body_output += "</tr>";
        });
        boomtable_output_body.html(boomtable_output_body_output);
        // endregion
      } else {
        let duplicateKeyValues = _.uniq(keys_found.filter(v => {
          return keys_found.filter(t => t === v).length > 1;
        }));
        let err_duplicateKeys = new Error();
        err_duplicateKeys.name = "Duplicate keys found";
        err_duplicateKeys.message = "Duplicate key values : <br/>" + duplicateKeyValues.join("<br/> ");
        this.panel.error = err_duplicateKeys;
      }

      // region Debug table body construction
      let boomtable_output_body_debug = this.elem.find('#boomtable_output_body_debug');
      let boomtable_output_body_debug_output = ``;
      _.each(dataComputed, d => {
        boomtable_output_body_debug_output += `
        <tr>
          <td style="padding:4px;" width="40%">${d.alias}</td>
          <td style="padding:4px;">${d.pattern.pattern || "Default"}</td>
          <td style="padding:4px;background-color:${d.bgColor}">${d.displayValue}</td>
          <td style="padding:4px;">${d.row_name}</td>
          <td style="padding:4px;">${d.col_name}</td>
          <td style="padding:4px;">${d.thresholds}</td>
        </tr>
        `;
      });
      boomtable_output_body_debug.html(boomtable_output_body_debug_output);
      // endregion
    }
    let rootElem = this.elem.find('.table-panel-scroll');
    let maxheightofpanel = this.panel.debug_mode ? this.ctrl.height - 71 : this.ctrl.height - 31;
    rootElem.css({ 'max-height': maxheightofpanel + "px" });
  }
};

export {
  GrafanaBoomTableCtrl as PanelCtrl
};
