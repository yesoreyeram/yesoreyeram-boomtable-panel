import {
  kbn,
  loadPluginCss,
  MetricsPanelCtrl,
  TimeSeries,
  utils,
  config
} from "./app/app"
import _ from "lodash";
loadPluginCss(config.list_of_stylesheets);

class GrafanaBoomTableCtrl extends MetricsPanelCtrl {
  constructor($scope, $injector, $sce) {
    super($scope, $injector);
    _.defaults(this.panel, config.panelDefaults);
    this.events.on("data-received", this.onDataReceived.bind(this));
    this.events.on("init-edit-mode", this.onInitEditMode.bind(this));
  }
  onInitEditMode() {
    this.unitFormats = kbn.getUnitFormats();
    this.valueNameOptions = config.valueNameOptions;
    _.each(config.editorTabs, editor => {
      this.addEditorTab(editor.name, "public/plugins/" + config.plugin_id + editor.template, editor.position);
    })
  }
  onDataReceived(data) {
    this.dataReceived = data;
    this.render();
  }
  seriesHandler(seriesData) {
    var series = new TimeSeries({
      datapoints: seriesData.datapoints || [],
      alias: seriesData.target
    });
    series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
    return series;
  }
  addPattern() {
    var newPattern = {
      pattern: "^server.*cpu$",
      delimiter: ".",
      valueName: "avg",
      row_name: "_0_",
      col_name: "_1_",
      thresholds: "70,90",
      enable_bgColor: false,
      bgColors: "green|orange|red",
      enable_transform: false,
      transform_values: "_value_|_value_|_value_",
      decimals: 2,
      format: "none",
      null_color: "darkred",
      null_value: "No data"
    };
    this.panel.patterns.push(newPattern);
    this.panel.activePatternIndex = this.panel.patterns.length - 1;
    this.render();
  }
  removePattern(index) {
    this.panel.patterns.splice(index, 1);
    this.panel.activePatternIndex = (this.panel.patterns && this.panel.patterns.length > 0) ? (this.panel.patterns.length - 1) : -1;
    this.render();
  }
  computeBgColor(thresholds, bgColors, value) {
    var c = "transparent";
    if (thresholds && bgColors && value && thresholds.length + 1 <= bgColors.length) {
      bgColors = _.dropRight(bgColors, bgColors.length - thresholds.length - 1);
      if (bgColors[bgColors.length - 1] === "") {
        bgColors[bgColors.length - 1] = "transparent";
      }
      for (var i = thresholds.length; i > 0; i--) {
        if (value >= thresholds[i - 1]) {
          return utils.normalizeColor(bgColors[i]);
        }
      }
      return utils.normalizeColor(_.first(bgColors));
    }
    return c;
  }
  transformValue(thresholds, transform_values, value, displayValue) {
    var t = value;
    if (thresholds && transform_values && value && thresholds.length + 1 <= transform_values.length) {
      transform_values = _.dropRight(transform_values, transform_values.length - thresholds.length - 1);
      if (transform_values[transform_values.length - 1] === "") {
        transform_values[transform_values.length - 1] = "_value_";
      }
      for (var i = thresholds.length; i > 0; i--) {
        if (value >= thresholds[i - 1]) {
          return transform_values[i].replace(new RegExp("_value_", "g"), displayValue);
        }
      }
      return _.first(transform_values).replace(new RegExp("_value_", "g"), displayValue);
    }
    return t;
  }
  getDecimalsForValue(value, _decimals) {
    if (_.isNumber(+_decimals)) {
      return {
        decimals: _decimals,
        scaledDecimals: null
      };
    }

    var delta = value / 2;
    var dec = -Math.floor(Math.log(delta) / Math.LN10);

    var magn = Math.pow(10, -dec),
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

    var result = {};
    result.decimals = Math.max(0, dec);
    result.scaledDecimals = result.decimals - Math.floor(Math.log(size) / Math.LN10) + 2;

    return result;
  }
  setUnitFormat(subItem, index) {
    if (index === -1) {
      this.panel.defaultPattern.format = subItem.value;
    } else {
      this.panel.patterns[index].format = subItem.value;
    }
    this.render();
  }
  limitText(text, maxlength) {
    if (text.split('').length > maxlength) {
      text = text.substring(0, maxlength - 3) + "...";
    }
    return text.toUpperCase();
  }
}

GrafanaBoomTableCtrl.prototype.render = function () {
  if (this.dataReceived) {
    // Copying the data received
    this.dataComputed = this.dataReceived;    
    this.panel.default_title_for_rows = this.panel.default_title_for_rows || config.default_title_for_rows;
    this.panel.default_title_for_cols = this.panel.default_title_for_cols || config.default_title_for_cols;
    const metricsReceived = utils.getFields(this.dataComputed, "target");
    if (metricsReceived.length !== _.uniq(metricsReceived).length) {
      var duplicateKeys = _.uniq(metricsReceived.filter(v => {
        return metricsReceived.filter(t => t === v).length > 1
      }));
      var err = new Error();
      err.name = "Duplicate data received";
      err.message = "Duplicate keys : <br/>" + duplicateKeys.join("<br/> ");
      this.panel.error = err;
      this.panel.data = undefined;
    } else {
      this.panel.error = undefined;
      // Binding the grafana computations to the metrics received
      this.dataComputed = this.dataReceived.map(this.seriesHandler.bind(this));
      // Assign pattern
      this.dataComputed = this.dataComputed.map(series => {
        series.pattern = _.find(this.panel.patterns.concat(this.panel.defaultPattern), function (p) {
          return series.alias.match(p.pattern || "");
        });
        return series;
      });
      // Assign Decimal Values
      this.dataComputed = this.dataComputed.map(series => {
        series.decimals = (series.pattern.decimals) || config.panelDefaults.defaultPattern.decimals;
        return series;
      });
      // Assign value
      this.dataComputed = this.dataComputed.map(series => {
        if (series.stats) {
          series.value = series.stats[series.pattern.valueName || config.panelDefaults.defaultPattern.valueName] || NaN;
          let decimalInfo = this.getDecimalsForValue(series.value, series.decimals);
          let formatFunc = kbn.valueFormats[series.pattern.format || config.panelDefaults.defaultPattern.format];
          if (!isNaN(series.value)) {
            series.valueFormatted = formatFunc(series.value, decimalInfo.decimals, decimalInfo.scaledDecimals);
            series.valueRounded = kbn.roundValue(series.value, decimalInfo.decimals);
            series.displayValue = series.valueFormatted;
          } else {
            series.displayValue = series.pattern.null_value || config.panelDefaults.defaultPattern.null_value || "Null";
          }
        }
        return series;
      });
      // Assign Row Name
      this.dataComputed = this.dataComputed.map(series => {
        series.row_name = series.alias.split(series.pattern.delimiter || ".").reduce((r, it, i) => {
          return r.replace(new RegExp("_" + i + "_", "g"), it)
        }, series.pattern.row_name || config.panelDefaults.defaultPattern.row_name);
        if (series.alias.split(series.pattern.delimiter || ".").length === 1) {
          series.row_name = series.alias;
        }
        return series;
      });
      // Assign Col Name
      this.dataComputed = this.dataComputed.map(series => {
        series.col_name = series.alias.split(series.pattern.delimiter || ".").reduce((r, it, i) => {
          return r.replace(new RegExp("_" + i + "_", "g"), it)
        }, series.pattern.col_name || config.panelDefaults.defaultPattern.col_name);
        if (series.alias.split(series.pattern.delimiter || ".").length === 1) {
          series.col_name = this.panel.default_title_for_cols || config.default_title_for_cols || "Value";
        }
        return series;
      });
      // Assign RowCol Key
      this.dataComputed = this.dataComputed.map(series => {
        series.key_name = series.row_name + "#" + series.col_name;
        return series;
      });
      // Assign Thresholds
      this.dataComputed = this.dataComputed.map(series => {
        series.thresholds = (series.pattern.thresholds || config.panelDefaults.defaultPattern.thresholds).split(",").map(d => +d);
        return series;
      });
      // Assign BG Colors
      this.dataComputed = this.dataComputed.map(series => {
        series.enable_bgColor = series.pattern.enable_bgColor;
        series.bgColors = (series.pattern.bgColors || config.panelDefaults.defaultPattern.bgColors).split("|");
        series.bgColor = series.enable_bgColor === true ? this.computeBgColor(series.thresholds, series.bgColors, series.value) : "transparent";
        if (series.displayValue === (series.pattern.null_value || config.panelDefaults.defaultPattern.null_value || "Null")) {
          series.bgColor = series.pattern.null_color || config.panelDefaults.defaultPattern.null_color;
        }
        return series;
      });
      // Value Transform
      this.dataComputed = this.dataComputed.map(series => {
        series.enable_transform = series.pattern.enable_transform;
        series.transform_values = (series.pattern.transform_values || config.panelDefaults.defaultPattern.transform_values).split("|");
        series.displayValue = series.enable_transform === true ? this.transformValue(series.thresholds, series.transform_values, series.value, series.displayValue) : series.displayValue;
        if (series.displayValue === (series.pattern.null_value || config.panelDefaults.defaultPattern.null_value || "Null")) {
          series.displayValue = series.pattern.null_value || config.panelDefaults.defaultPattern.null_value;
        }
        else if(isNaN(series.value)){
         series.displayValue = series.pattern.null_value || config.panelDefaults.defaultPattern.null_value;
        }
        return series;
      });
      // Grouping
      const rows_found = utils.getFields(this.dataComputed, "row_name");
      const cols_found = utils.getFields(this.dataComputed, "col_name");
      const keys_found = utils.getFields(this.dataComputed, "key_name");
      const is_unique_keys = (keys_found.length === _.uniq(keys_found).length);
      if (is_unique_keys) {
        this.panel.error = undefined;
        var output = [];
        _.each(_.uniq(rows_found), (row_name) => {
          var o = {};
          o.row = row_name;
          o.cols = [];
          _.each(_.uniq(cols_found), (col_name) => {
            var matched_value = (_.find(this.dataComputed, (e) => {
              return e.row_name === row_name && e.col_name === col_name
            }));
            if (!matched_value) matched_value = {
              value: NaN,
              displayValue: "N/A"
            };
            o.cols.push({
              "name": col_name,
              "value": matched_value.value,
              "displayValue": matched_value.displayValue || matched_value.value,
              "bgColor": matched_value.bgColor || "transparent"
            });
          });
          output.push(o);
        })
        this.panel.cols = _.uniq(cols_found);
        this.panel.groupedData = output;
        // Group Data
      } else {
        var duplicateKeys = _.uniq(keys_found.filter(v => {
          return keys_found.filter(t => t === v).length > 1
        }));
        var err = new Error();
        err.name = "Duplicate keys found";
        err.message = "Duplicate key values : <br/>" + duplicateKeys.join("<br/> ");
        this.panel.error = err;
      }

      // Assigning computed data to output panel
      this.panel.data = this.dataComputed;
    }
  }
};

GrafanaBoomTableCtrl.templateUrl = "partials/module.html";

export {
  GrafanaBoomTableCtrl as PanelCtrl
};