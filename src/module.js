import {
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
      transform_values: "_value_|_value_|_value_"
    };
    this.panel.patterns.push(newPattern);
    this.panel.activePatternIndex = this.panel.patterns.length - 1;
    this.render();
  }
  removePattern(index) {
    this.panel.patterns.splice(index, 1);
    this.panel.activePatternIndex = -1;
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
  transformValue(thresholds, transform_values, value) {
    var t = value;
    if (thresholds && transform_values && value && thresholds.length + 1 <= transform_values.length) {
      transform_values = _.dropRight(transform_values, transform_values.length - thresholds.length - 1);
      if (transform_values[transform_values.length - 1] === "") {
        transform_values[transform_values.length - 1] = "_value_";
      }
      for (var i = thresholds.length; i > 0; i--) {
        if (value >= thresholds[i - 1]) {
          return transform_values[i].replace(new RegExp("_value_", "g"), value);
        }
      }
      return _.first(transform_values).replace(new RegExp("_value_", "g"), value);
    }
    return t;
  }
}

GrafanaBoomTableCtrl.prototype.render = function () {
  if (this.dataReceived) {
    console.log("Rendering");
    // Copying the data received
    this.dataComputed = this.dataReceived;
    const metricsReceived = utils.getFields(this.dataComputed, "target");
    if (metricsReceived.length !== _.uniq(metricsReceived).length) {
      var duplicateKeys = _.uniq(metricsReceived.filter(v => {
        return metricsReceived.filter(t => t === v).length > 1
      }));
      var err = new Error();
      err.name = "Duplicate data received";
      err.message = "Check console for more details. <br/> Duplicate keys : <br/>" + duplicateKeys.join("<br/> ");
      console.log(err, duplicateKeys);
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
      // Assign value
      this.dataComputed = this.dataComputed.map(series => {
        series.value = series.stats[series.pattern.valueName || "avg"] || "N/A";
        series.displayValue = series.value;
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
          series.col_name = "value";
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
        return series;
      });
      // Value Transform
      this.dataComputed = this.dataComputed.map(series => {
        series.enable_transform = series.pattern.enable_transform;
        series.transform_values = (series.pattern.transform_values || config.panelDefaults.defaultPattern.transform_values).split("|");
        series.displayValue = series.enable_transform === true ? this.transformValue(series.thresholds, series.transform_values, series.value) : series.displayValue;
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
        err.message = "Check console for more details";
        err.message = "Check console for more details. <br/> Duplicate key values : <br/>" + duplicateKeys.join("<br/> ");
        console.log(err, duplicateKeys);
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