"use strict";

System.register(["./app/app", "lodash"], function (_export, _context) {
  "use strict";

  var kbn, loadPluginCss, MetricsPanelCtrl, TimeSeries, utils, config, _, _createClass, GrafanaBoomTableCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appApp) {
      kbn = _appApp.kbn;
      loadPluginCss = _appApp.loadPluginCss;
      MetricsPanelCtrl = _appApp.MetricsPanelCtrl;
      TimeSeries = _appApp.TimeSeries;
      utils = _appApp.utils;
      config = _appApp.config;
    }, function (_lodash) {
      _ = _lodash.default;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      loadPluginCss(config.list_of_stylesheets);

      _export("PanelCtrl", GrafanaBoomTableCtrl = function (_MetricsPanelCtrl) {
        _inherits(GrafanaBoomTableCtrl, _MetricsPanelCtrl);

        function GrafanaBoomTableCtrl($scope, $injector, $sce) {
          _classCallCheck(this, GrafanaBoomTableCtrl);

          var _this = _possibleConstructorReturn(this, (GrafanaBoomTableCtrl.__proto__ || Object.getPrototypeOf(GrafanaBoomTableCtrl)).call(this, $scope, $injector));

          _.defaults(_this.panel, config.panelDefaults);
          _this.events.on("data-received", _this.onDataReceived.bind(_this));
          _this.events.on("init-edit-mode", _this.onInitEditMode.bind(_this));
          return _this;
        }

        _createClass(GrafanaBoomTableCtrl, [{
          key: "onInitEditMode",
          value: function onInitEditMode() {
            var _this2 = this;

            this.unitFormats = kbn.getUnitFormats();
            this.valueNameOptions = config.valueNameOptions;
            _.each(config.editorTabs, function (editor) {
              _this2.addEditorTab(editor.name, "public/plugins/" + config.plugin_id + editor.template, editor.position);
            });
          }
        }, {
          key: "onDataReceived",
          value: function onDataReceived(data) {
            this.dataReceived = data;
            this.render();
          }
        }, {
          key: "seriesHandler",
          value: function seriesHandler(seriesData) {
            var series = new TimeSeries({
              datapoints: seriesData.datapoints || [],
              alias: seriesData.target
            });
            series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
            return series;
          }
        }, {
          key: "addPattern",
          value: function addPattern() {
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
        }, {
          key: "removePattern",
          value: function removePattern(index) {
            this.panel.patterns.splice(index, 1);
            this.panel.activePatternIndex = -1;
            this.render();
          }
        }, {
          key: "computeBgColor",
          value: function computeBgColor(thresholds, bgColors, value) {
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
        }, {
          key: "transformValue",
          value: function transformValue(thresholds, transform_values, value) {
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
        }, {
          key: "getDecimalsForValue",
          value: function getDecimalsForValue(value, _decimals) {
            if (_.isNumber(+_decimals)) {
              return {
                decimals: _decimals,
                scaledDecimals: null
              };
            }

            var delta = value / 2;
            var dec = -Math.floor(Math.log(delta) / Math.LN10);

            var magn = Math.pow(10, -dec),
                norm = delta / magn,
                // norm is between 1.0 and 10.0
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
        }, {
          key: "setUnitFormat",
          value: function setUnitFormat(subItem, index) {
            if (index === -1) {
              this.panel.defaultPattern.format = subItem.value;
            } else {
              this.panel.patterns[index].format = subItem.value;
            }
            this.render();
          }
        }]);

        return GrafanaBoomTableCtrl;
      }(MetricsPanelCtrl));

      GrafanaBoomTableCtrl.prototype.render = function () {
        var _this3 = this;

        if (this.dataReceived) {
          // Copying the data received
          this.dataComputed = this.dataReceived;
          var metricsReceived = utils.getFields(this.dataComputed, "target");
          if (metricsReceived.length !== _.uniq(metricsReceived).length) {
            var duplicateKeys = _.uniq(metricsReceived.filter(function (v) {
              return metricsReceived.filter(function (t) {
                return t === v;
              }).length > 1;
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
            this.dataComputed = this.dataComputed.map(function (series) {
              series.pattern = _.find(_this3.panel.patterns.concat(_this3.panel.defaultPattern), function (p) {
                return series.alias.match(p.pattern || "");
              });
              return series;
            });
            // Assign Decimal Values
            this.dataComputed = this.dataComputed.map(function (series) {
              series.decimals = series.pattern.decimals || config.panelDefaults.defaultPattern.decimals;
              return series;
            });
            // Assign value
            this.dataComputed = this.dataComputed.map(function (series) {
              if (series.stats) {
                series.value = series.stats[series.pattern.valueName || config.panelDefaults.defaultPattern.valueName] || NaN;
                var decimalInfo = _this3.getDecimalsForValue(series.value, series.decimals);
                var formatFunc = kbn.valueFormats[series.pattern.format || config.panelDefaults.defaultPattern.format];
                if (!isNaN(series.value)) {
                  series.valueFormatted = formatFunc(series.value, decimalInfo.decimals, decimalInfo.scaledDecimals);
                  series.valueRounded = kbn.roundValue(series.value, decimalInfo.decimals);
                  series.displayValue = series.valueFormatted;
                } else {
                  series.valueFormatted = formatFunc(0, decimalInfo.decimals, decimalInfo.scaledDecimals);
                  series.valueRounded = kbn.roundValue(0, decimalInfo.decimals);
                  series.displayValue = series.pattern.null_value || "Null";
                }
              }
              return series;
            });
            // Assign Row Name
            this.dataComputed = this.dataComputed.map(function (series) {
              series.row_name = series.alias.split(series.pattern.delimiter || ".").reduce(function (r, it, i) {
                return r.replace(new RegExp("_" + i + "_", "g"), it);
              }, series.pattern.row_name || config.panelDefaults.defaultPattern.row_name);
              if (series.alias.split(series.pattern.delimiter || ".").length === 1) {
                series.row_name = series.alias;
              }
              return series;
            });
            // Assign Col Name
            this.dataComputed = this.dataComputed.map(function (series) {
              series.col_name = series.alias.split(series.pattern.delimiter || ".").reduce(function (r, it, i) {
                return r.replace(new RegExp("_" + i + "_", "g"), it);
              }, series.pattern.col_name || config.panelDefaults.defaultPattern.col_name);
              if (series.alias.split(series.pattern.delimiter || ".").length === 1) {
                series.col_name = "value";
              }
              return series;
            });
            // Assign RowCol Key
            this.dataComputed = this.dataComputed.map(function (series) {
              series.key_name = series.row_name + "#" + series.col_name;
              return series;
            });
            // Assign Thresholds
            this.dataComputed = this.dataComputed.map(function (series) {
              series.thresholds = (series.pattern.thresholds || config.panelDefaults.defaultPattern.thresholds).split(",").map(function (d) {
                return +d;
              });
              return series;
            });
            // Assign BG Colors
            this.dataComputed = this.dataComputed.map(function (series) {
              series.enable_bgColor = series.pattern.enable_bgColor;
              series.bgColors = (series.pattern.bgColors || config.panelDefaults.defaultPattern.bgColors).split("|");
              series.bgColor = series.enable_bgColor === true ? _this3.computeBgColor(series.thresholds, series.bgColors, series.value) : "transparent";
              if (series.displayValue === (series.pattern.null_value || "Null")) {
                series.bgColor = series.pattern.null_color || config.panelDefaults.defaultPattern.null_color;
              }
              return series;
            });
            // Value Transform
            this.dataComputed = this.dataComputed.map(function (series) {
              series.enable_transform = series.pattern.enable_transform;
              series.transform_values = (series.pattern.transform_values || config.panelDefaults.defaultPattern.transform_values).split("|");
              series.displayValue = series.enable_transform === true ? _this3.transformValue(series.thresholds, series.transform_values, series.displayValue) : series.displayValue;
              return series;
            });
            // Grouping
            var rows_found = utils.getFields(this.dataComputed, "row_name");
            var cols_found = utils.getFields(this.dataComputed, "col_name");
            var keys_found = utils.getFields(this.dataComputed, "key_name");
            var is_unique_keys = keys_found.length === _.uniq(keys_found).length;
            if (is_unique_keys) {
              this.panel.error = undefined;
              var output = [];
              _.each(_.uniq(rows_found), function (row_name) {
                var o = {};
                o.row = row_name;
                o.cols = [];
                _.each(_.uniq(cols_found), function (col_name) {
                  var matched_value = _.find(_this3.dataComputed, function (e) {
                    return e.row_name === row_name && e.col_name === col_name;
                  });
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
              });
              this.panel.cols = _.uniq(cols_found);
              this.panel.groupedData = output;
              // Group Data
            } else {
              var duplicateKeys = _.uniq(keys_found.filter(function (v) {
                return keys_found.filter(function (t) {
                  return t === v;
                }).length > 1;
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

      _export("PanelCtrl", GrafanaBoomTableCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map
