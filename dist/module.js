System.register(["lodash", "app/core/utils/kbn", "app/plugins/sdk", "app/core/time_series2", "./app/utils", "./app/app", "./app/config", "./app/BoomTablePattern"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var lodash_1, kbn_1, sdk_1, time_series2_1, utils, app_1, config_1, BoomTablePattern_1, GrafanaBoomTableCtrl;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (kbn_1_1) {
                kbn_1 = kbn_1_1;
            },
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            },
            function (time_series2_1_1) {
                time_series2_1 = time_series2_1_1;
            },
            function (utils_1) {
                utils = utils_1;
            },
            function (app_1_1) {
                app_1 = app_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (BoomTablePattern_1_1) {
                BoomTablePattern_1 = BoomTablePattern_1_1;
            }
        ],
        execute: function () {
            sdk_1.loadPluginCss({
                dark: "plugins/" + config_1.plugin_id + "/css/default.dark.css",
                light: "plugins/" + config_1.plugin_id + "/css/default.light.css"
            });
            GrafanaBoomTableCtrl = (function (_super) {
                __extends(GrafanaBoomTableCtrl, _super);
                function GrafanaBoomTableCtrl($scope, $injector) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.limitText = utils.limitText;
                    _this.unitFormats = kbn_1.default.getUnitFormats();
                    _this.valueNameOptions = config_1.value_name_options;
                    lodash_1.default.defaults(_this.panel, config_1.config.panelDefaults);
                    _this.panel.defaultPattern = _this.panel.defaultPattern || app_1.defaultPattern;
                    _this.updatePrototypes();
                    _this.events.on("data-received", _this.onDataReceived.bind(_this));
                    _this.events.on("init-edit-mode", _this.onInitEditMode.bind(_this));
                    return _this;
                }
                GrafanaBoomTableCtrl.prototype.onInitEditMode = function () {
                    this.addEditorTab("Patterns", "public/plugins/" + config_1.plugin_id + "/partials/patterns.html", 2);
                    this.addEditorTab("Time based thresholds & Filters", "public/plugins/" + config_1.plugin_id + "/partials/patterns-advanced-options.html", 3);
                    this.addEditorTab("Options", "public/plugins/" + config_1.plugin_id + "/partials/options.html", 4);
                };
                GrafanaBoomTableCtrl.prototype.onDataReceived = function (data) {
                    this.dataReceived = data;
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.addPattern = function () {
                    var newPattern = new BoomTablePattern_1.BoomTablePattern({
                        row_col_wrapper: this.panel.row_col_wrapper
                    });
                    this.panel.patterns.push(newPattern);
                    this.panel.activePatternIndex = this.panel.patterns.length - 1;
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.movePattern = function (direction, index) {
                    var tempElement = this.panel.patterns[index];
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
                };
                GrafanaBoomTableCtrl.prototype.removePattern = function (index) {
                    this.panel.patterns.splice(index, 1);
                    this.panel.activePatternIndex = (this.panel.patterns && this.panel.patterns.length > 0) ? (this.panel.patterns.length - 1) : -1;
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.clonePattern = function (index) {
                    var copiedPattern = Object.assign({}, this.panel.patterns[index]);
                    Object.setPrototypeOf(copiedPattern, BoomTablePattern_1.BoomTablePattern.prototype);
                    this.panel.patterns.push(copiedPattern);
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.link = function (scope, elem, attrs, ctrl) {
                    this.scope = scope;
                    this.elem = elem;
                    this.attrs = attrs;
                    this.ctrl = ctrl;
                };
                GrafanaBoomTableCtrl.prototype.updatePrototypes = function () {
                    Object.setPrototypeOf(this.panel.defaultPattern, BoomTablePattern_1.BoomTablePattern.prototype);
                    this.panel.patterns.map(function (pattern) {
                        Object.setPrototypeOf(pattern, BoomTablePattern_1.BoomTablePattern.prototype);
                        return pattern;
                    });
                };
                GrafanaBoomTableCtrl.prototype.seriesHandler = function (seriesData) {
                    var series = new time_series2_1.default({
                        alias: seriesData.target,
                        datapoints: seriesData.datapoints || []
                    });
                    series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
                    return series;
                };
                GrafanaBoomTableCtrl.prototype.computeBgColor = function (thresholds, bgColors, value) {
                    var c = "transparent";
                    if (thresholds && bgColors && typeof value === "number" && thresholds.length + 1 <= bgColors.length) {
                        bgColors = lodash_1.default.dropRight(bgColors, bgColors.length - thresholds.length - 1);
                        if (bgColors[bgColors.length - 1] === "") {
                            bgColors[bgColors.length - 1] = "transparent";
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
                GrafanaBoomTableCtrl.prototype.transformValue = function (thresholds, transform_values, value, displayValue, row_name, col_name) {
                    var t = value;
                    if (thresholds && transform_values && typeof value === "number" && thresholds.length + 1 <= transform_values.length) {
                        transform_values = lodash_1.default.dropRight(transform_values, transform_values.length - thresholds.length - 1);
                        if (transform_values[transform_values.length - 1] === "") {
                            transform_values[transform_values.length - 1] = "_value_";
                        }
                        for (var i = thresholds.length; i > 0; i--) {
                            if (value >= thresholds[i - 1]) {
                                return transform_values[i].replace(new RegExp("_value_", "g"), displayValue).replace(new RegExp("_row_name_", "g"), row_name).replace(new RegExp("_col_name_", "g"), col_name);
                            }
                        }
                        return lodash_1.default.first(transform_values).replace(new RegExp("_value_", "g"), displayValue).replace(new RegExp("_row_name_", "g"), row_name).replace(new RegExp("_col_name_", "g"), col_name);
                    }
                    return t;
                };
                GrafanaBoomTableCtrl.prototype.getDecimalsForValue = function (value, _decimals) {
                    if (lodash_1.default.isNumber(+_decimals)) {
                        var o = {
                            decimals: _decimals,
                            scaledDecimals: null
                        };
                        return o;
                    }
                    var delta = value / 2;
                    var dec = -Math.floor(Math.log(delta) / Math.LN10);
                    var magn = Math.pow(10, -dec), norm = delta / magn, size;
                    if (norm < 1.5) {
                        size = 1;
                    }
                    else if (norm < 3) {
                        size = 2;
                        if (norm > 2.25) {
                            size = 2.5;
                            ++dec;
                        }
                    }
                    else if (norm < 7.5) {
                        size = 5;
                    }
                    else {
                        size = 10;
                    }
                    size *= magn;
                    if (Math.floor(value) === value) {
                        dec = 0;
                    }
                    var result = {
                        decimals: Math.max(0, dec),
                        scaledDecimals: Math.max(0, dec) - Math.floor(Math.log(size) / Math.LN10) + 2
                    };
                    return result;
                };
                GrafanaBoomTableCtrl.prototype.throwError = function (title, message) {
                    var err = new Error();
                    err.name = title;
                    err.message = message;
                    this.panel.error = err;
                };
                GrafanaBoomTableCtrl.prototype.clearError = function () {
                    this.panel.error = undefined;
                };
                GrafanaBoomTableCtrl.templateUrl = "partials/module.html";
                return GrafanaBoomTableCtrl;
            }(sdk_1.MetricsPanelCtrl));
            exports_1("PanelCtrl", GrafanaBoomTableCtrl);
            GrafanaBoomTableCtrl.prototype.render = function () {
                var _this = this;
                this.clearError();
                if (this.dataReceived) {
                    var dataComputed_1 = this.dataReceived;
                    this.panel.default_title_for_rows = this.panel.default_title_for_rows || config_1.config.default_title_for_rows;
                    var metricsReceived_1 = utils.getFields(dataComputed_1, "target");
                    if (metricsReceived_1.length !== lodash_1.default.uniq(metricsReceived_1).length) {
                        var duplicateKeys = lodash_1.default.uniq(metricsReceived_1.filter(function (v) {
                            return metricsReceived_1.filter(function (t) { return t === v; }).length > 1;
                        }));
                        this.throwError("Duplicate data received", "Duplicate keys : <br/>" + duplicateKeys.join("<br/> "));
                    }
                    else {
                        this.clearError();
                        dataComputed_1 = dataComputed_1.map(this.seriesHandler.bind(this));
                        dataComputed_1 = dataComputed_1.map(function (series) {
                            series.current_servertimestamp = new Date();
                            if (series && series.datapoints && series.datapoints.length > 0) {
                                if (lodash_1.default.last(series.datapoints).length === 2) {
                                    series.current_servertimestamp = new Date(lodash_1.default.last(series.datapoints)[1]);
                                }
                            }
                            return series;
                        });
                        dataComputed_1 = dataComputed_1.map(function (series) {
                            series.pattern = lodash_1.default.find(_this.panel.patterns.filter(function (p) { return p.disabled !== true; }), function (p) {
                                return series.alias.match(p.pattern);
                            });
                            if (series.pattern === undefined) {
                                series.pattern = _this.panel.defaultPattern || app_1.defaultPattern;
                            }
                            return series;
                        });
                        dataComputed_1 = dataComputed_1.map(function (series) {
                            series.decimals = (series.pattern.decimals) || app_1.defaultPattern.decimals;
                            return series;
                        });
                        dataComputed_1 = dataComputed_1.map(function (series) {
                            if (series.stats) {
                                series.value = series.stats[series.pattern.valueName];
                                var decimalInfo = _this.getDecimalsForValue(series.value, series.decimals);
                                var formatFunc = kbn_1.default.valueFormats[series.pattern.format];
                                if (series.value === null) {
                                    series.displayValue = series.pattern.null_value || "Null";
                                }
                                else if (!isNaN(series.value)) {
                                    series.valueFormatted = formatFunc(series.value, decimalInfo.decimals, decimalInfo.scaledDecimals);
                                    series.valueRounded = kbn_1.default.roundValue(series.value, decimalInfo.decimals);
                                    series.displayValue = series.valueFormatted;
                                }
                                else {
                                    series.displayValue = series.pattern.null_value || "Null";
                                }
                            }
                            return series;
                        });
                        dataComputed_1 = dataComputed_1.filter(function (series) {
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
                            }
                            else {
                                return true;
                            }
                        });
                        dataComputed_1 = dataComputed_1.map(function (series) {
                            series.row_name = series.pattern.row_name || app_1.defaultPattern.row_name;
                            series.row_name = series.row_name.replace(new RegExp(_this.panel.row_col_wrapper + "series" + _this.panel.row_col_wrapper, "g"), series.alias);
                            series.row_name = series.alias.split(series.pattern.delimiter || ".").reduce(function (r, it, i) {
                                return r.replace(new RegExp(_this.panel.row_col_wrapper + i + _this.panel.row_col_wrapper, "g"), it);
                            }, series.row_name);
                            if (series.alias.split(series.pattern.delimiter || ".").length === 1) {
                                series.row_name = series.alias;
                            }
                            return series;
                        });
                        dataComputed_1 = dataComputed_1.map(function (series) {
                            series.col_name = series.pattern.col_name || app_1.defaultPattern.col_name;
                            series.col_name = series.alias.split(series.pattern.delimiter || ".").reduce(function (r, it, i) {
                                return r.replace(new RegExp(_this.panel.row_col_wrapper + i + _this.panel.row_col_wrapper, "g"), it);
                            }, series.col_name);
                            if (series.alias.split(series.pattern.delimiter || ".").length === 1 || series.row_name === series.alias) {
                                series.col_name = series.pattern.col_name || "Value";
                            }
                            return series;
                        });
                        dataComputed_1 = dataComputed_1.map(function (series) {
                            series.key_name = series.row_name + "#" + series.col_name;
                            return series;
                        });
                        dataComputed_1 = dataComputed_1.map(function (series) {
                            series.thresholds = (series.pattern.thresholds || app_1.defaultPattern.thresholds).split(",").map(function (d) { return +d; });
                            if (series.pattern.enable_time_based_thresholds) {
                                var metricrecivedTimeStamp_1 = series.current_servertimestamp || new Date();
                                var metricrecivedTimeStamp_innumber_1 = metricrecivedTimeStamp_1.getHours() * 100 + metricrecivedTimeStamp_1.getMinutes();
                                var weekdays_1 = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
                                lodash_1.default.each(series.pattern.time_based_thresholds, function (tbtx) {
                                    if (tbtx && tbtx.from && tbtx.to && tbtx.enabledDays &&
                                        (metricrecivedTimeStamp_innumber_1 >= +(tbtx.from)) &&
                                        (metricrecivedTimeStamp_innumber_1 <= +(tbtx.to)) &&
                                        (tbtx.enabledDays.toLowerCase().indexOf(weekdays_1[metricrecivedTimeStamp_1.getDay()]) > -1) &&
                                        tbtx.threshold) {
                                        series.thresholds = (tbtx.threshold + "").split(",").map(function (d) { return +d; });
                                    }
                                });
                            }
                            return series;
                        });
                        dataComputed_1 = dataComputed_1.map(function (series) {
                            var bgColors = (series.pattern.bgColors || app_1.defaultPattern.bgColors).split("|");
                            series.bgColor = series.pattern.enable_bgColor === true ? _this.computeBgColor(series.thresholds, bgColors, series.value) : "transparent";
                            if (series.displayValue === (series.pattern.null_value || app_1.defaultPattern.null_value || "Null")) {
                                series.bgColor = series.pattern.null_color || app_1.defaultPattern.null_color;
                            }
                            return series;
                        });
                        dataComputed_1 = dataComputed_1.map(function (series) {
                            if (series.pattern.enable_bgColor_overrides && series.pattern.bgColors_overrides !== "") {
                                var _bgColors_overrides = series.pattern.bgColors_overrides.split("|").filter(function (con) { return con.indexOf("->"); }).map(function (con) { return con.split("->"); }).filter(function (con) { return +(con[0]) === series.value; }).map(function (con) { return con[1]; });
                                if (_bgColors_overrides.length > 0 && _bgColors_overrides[0] !== "") {
                                    series.bgColor = utils.normalizeColor(("" + _bgColors_overrides[0]).trim());
                                }
                            }
                            return series;
                        });
                        dataComputed_1 = dataComputed_1.map(function (series) {
                            var transform_values = (series.pattern.transform_values || app_1.defaultPattern.transform_values).split("|");
                            series.displayValue = series.pattern.enable_transform === true ? _this.transformValue(series.thresholds, transform_values, series.value, series.displayValue, series.row_name, series.col_name) : series.displayValue;
                            return series;
                        });
                        dataComputed_1 = dataComputed_1.map(function (series) {
                            if (series.pattern.enable_transform_overrides && series.pattern.transform_values_overrides) {
                                var _transform_values_overrides = series.pattern.transform_values_overrides.split("|").filter(function (con) { return con.indexOf("->"); }).map(function (con) { return con.split("->"); }).filter(function (con) { return +(con[0]) === series.value; }).map(function (con) { return con[1]; });
                                if (_transform_values_overrides.length > 0 && _transform_values_overrides[0] !== "") {
                                    series.displayValue = ("" + _transform_values_overrides[0]).trim().replace(new RegExp("_value_", "g"), series.displayValue).replace(new RegExp("_row_name_", "g"), series.row_name).replace(new RegExp("_col_name_", "g"), series.col_name);
                                }
                            }
                            return series;
                        });
                        dataComputed_1 = dataComputed_1.map(function (series) {
                            series.actual_displayvalue = series.displayValue;
                            series.actual_row_name = series.row_name;
                            series.actual_col_name = series.col_name;
                            series.displayValue = utils.replaceTokens(series.displayValue);
                            series.row_name = utils.replaceTokens(series.row_name);
                            series.col_name = utils.replaceTokens(series.col_name);
                            return series;
                        });
                        dataComputed_1 = dataComputed_1.map(function (series) {
                            if (series.pattern.enable_clickable_cells) {
                                var targetLink = series.pattern.clickable_cells_link || "#";
                                targetLink = targetLink.replace(new RegExp("_row_name_", "g"), utils.getActualNameWithoutTokens(series.actual_row_name).trim());
                                targetLink = targetLink.replace(new RegExp("_col_name_", "g"), utils.getActualNameWithoutTokens(series.actual_col_name).trim());
                                targetLink = targetLink.replace(new RegExp("_value_", "g"), utils.getActualNameWithoutTokens(series.value).trim());
                                series.displayValue = "<a href=\"" + targetLink + "\" target=\"_blank\">" + series.displayValue + "</a>";
                            }
                            return series;
                        });
                        dataComputed_1 = dataComputed_1.map(function (series) {
                            if (lodash_1.default.isNaN(series.value) || series.value === null) {
                                series.bgColor = series.pattern.null_color || app_1.defaultPattern.null_color || "darkred";
                                series.displayValue = series.pattern.null_value || app_1.defaultPattern.null_value || "No data";
                                series.displayValue = series.displayValue.replace(new RegExp("_series_", "g"), series.alias);
                                series.displayValue = series.displayValue.replace(new RegExp("_row_name_", "g"), series.row_name);
                                series.displayValue = series.displayValue.replace(new RegExp("_col_name_", "g"), series.col_name);
                                series.displayValue = utils.replaceTokens(series.displayValue);
                            }
                            return series;
                        });
                        var rows_found = utils.getFields(dataComputed_1, "row_name");
                        var cols_found_1 = utils.getFields(dataComputed_1, "col_name");
                        var keys_found_1 = utils.getFields(dataComputed_1, "key_name");
                        var is_unique_keys = (keys_found_1.length === lodash_1.default.uniq(keys_found_1).length);
                        if (is_unique_keys) {
                            this.clearError();
                            var output_1 = [];
                            lodash_1.default.each(lodash_1.default.uniq(rows_found), function (row_name) {
                                var o = {};
                                o.row = row_name;
                                o.cols = [];
                                lodash_1.default.each(lodash_1.default.uniq(cols_found_1), function (col_name) {
                                    var matched_value = (lodash_1.default.find(dataComputed_1, function (e) {
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
                                output_1.push(o);
                            });
                            var boomtable_output_body_headers = this.elem.find("#boomtable_output_body_headers");
                            var boomtable_output_body_headers_output_1 = "<br/>";
                            if (this.panel.hide_headers !== true) {
                                boomtable_output_body_headers_output_1 += "<tr>";
                                if (this.panel.hide_first_column !== true) {
                                    boomtable_output_body_headers_output_1 += "<th style=\"padding:4px;text-align:center\">" + this.panel.default_title_for_rows + "</th>";
                                }
                                lodash_1.default.each(lodash_1.default.uniq(cols_found_1), function (c) {
                                    boomtable_output_body_headers_output_1 += "<th style=\"padding:4px;text-align:center\">" + c + "</th>";
                                });
                                boomtable_output_body_headers_output_1 += "</tr>";
                            }
                            boomtable_output_body_headers.html(boomtable_output_body_headers_output_1);
                            var boomtable_output_body = this.elem.find('#boomtable_output_body');
                            var boomtable_output_body_output_1 = "";
                            lodash_1.default.each(output_1, function (o) {
                                boomtable_output_body_output_1 += "<tr>";
                                if (_this.panel.hide_first_column !== true) {
                                    boomtable_output_body_output_1 += "<td style=\"padding:4px;\">" + o.row + "</td>";
                                }
                                lodash_1.default.each(o.cols, function (c) {
                                    boomtable_output_body_output_1 += "<td\n              style=\"padding:4px;background-color:" + c.bgColor + "\"\n              title=\"" + ("Row Name : " + utils.getActualNameWithoutTokens(c.actual_row_name) + "\nCol Name : " + utils.getActualNameWithoutTokens(c.actual_col_name) + "\nValue : " + c.value) + "\"\n            >" + c.displayValue + "</td>";
                                });
                                boomtable_output_body_output_1 += "</tr>";
                            });
                            boomtable_output_body.html(boomtable_output_body_output_1);
                        }
                        else {
                            var duplicateKeyValues = lodash_1.default.uniq(keys_found_1.filter(function (v) {
                                return keys_found_1.filter(function (t) { return t === v; }).length > 1;
                            }));
                            this.throwError("Duplicate Keys found", "Duplicate keys : <br/>" + "Duplicate key values : <br/>" + duplicateKeyValues.join("<br/> "));
                        }
                        var boomtable_output_body_debug = this.elem.find('#boomtable_output_body_debug');
                        var boomtable_output_body_debug_output_1 = "";
                        lodash_1.default.each(dataComputed_1, function (d) {
                            boomtable_output_body_debug_output_1 += "\n        <tr>\n          <td style=\"padding:4px;\" width=\"40%\">" + d.alias + "</td>\n          <td style=\"padding:4px;\">" + (d.pattern.pattern || "Default") + "</td>\n          <td style=\"padding:4px;background-color:" + d.bgColor + "\">" + d.displayValue + "</td>\n          <td style=\"padding:4px;\">" + d.row_name + "</td>\n          <td style=\"padding:4px;\">" + d.col_name + "</td>\n          <td style=\"padding:4px;\">" + d.thresholds + "</td>\n        </tr>\n        ";
                        });
                        boomtable_output_body_debug.html(boomtable_output_body_debug_output_1);
                    }
                    var rootElem = this.elem.find('.table-panel-scroll');
                    var maxheightofpanel = this.panel.debug_mode ? this.ctrl.height - 71 : this.ctrl.height - 31;
                    rootElem.css({ 'max-height': maxheightofpanel + "px" });
                }
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFXQSxtQkFBYSxDQUFDO2dCQUNaLElBQUksRUFBRSxhQUFXLGtCQUFTLDBCQUF1QjtnQkFDakQsS0FBSyxFQUFFLGFBQVcsa0JBQVMsMkJBQXdCO2FBQ3BELENBQUMsQ0FBQzs7Z0JBRWdDLHdDQUFnQjtnQkFTakQsOEJBQVksTUFBTSxFQUFFLFNBQVM7b0JBQTdCLFlBQ0Usa0JBQU0sTUFBTSxFQUFFLFNBQVMsQ0FBQyxTQU16QjtvQkFkTSxlQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztvQkFDNUIsaUJBQVcsR0FBRyxhQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ25DLHNCQUFnQixHQUFHLDJCQUFrQixDQUFDO29CQU8zQyxnQkFBQyxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLGVBQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDN0MsS0FBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLElBQUksb0JBQWMsQ0FBQztvQkFDeEUsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3hCLEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNoRSxLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDOztnQkFDbkUsQ0FBQztnQkFDTSw2Q0FBYyxHQUFyQjtvQkFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxvQkFBa0Is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LENBQUM7b0JBQ3JELElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO29CQUM3RixRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixHQUFHLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQ3pEO1lBQ0gsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vbm9kZV9tb2R1bGVzL2dyYWZhbmEtc2RrLW1vY2tzL2FwcC9oZWFkZXJzL2NvbW1vbi5kLnRzXCIgLz5cclxuXHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IGtibiBmcm9tICdhcHAvY29yZS91dGlscy9rYm4nO1xyXG5pbXBvcnQgeyBsb2FkUGx1Z2luQ3NzLCBNZXRyaWNzUGFuZWxDdHJsIH0gZnJvbSBcImFwcC9wbHVnaW5zL3Nka1wiO1xyXG5pbXBvcnQgVGltZVNlcmllcyBmcm9tIFwiYXBwL2NvcmUvdGltZV9zZXJpZXMyXCI7XHJcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gXCIuL2FwcC91dGlsc1wiO1xyXG5pbXBvcnQgeyBkZWZhdWx0UGF0dGVybiB9IGZyb20gXCIuL2FwcC9hcHBcIjtcclxuaW1wb3J0IHsgcGx1Z2luX2lkLCB2YWx1ZV9uYW1lX29wdGlvbnMsIGNvbmZpZyB9IGZyb20gXCIuL2FwcC9jb25maWdcIjtcclxuaW1wb3J0IHsgQm9vbVRhYmxlUGF0dGVybiB9IGZyb20gXCIuL2FwcC9Cb29tVGFibGVQYXR0ZXJuXCI7XHJcblxyXG5sb2FkUGx1Z2luQ3NzKHtcclxuICBkYXJrOiBgcGx1Z2lucy8ke3BsdWdpbl9pZH0vY3NzL2RlZmF1bHQuZGFyay5jc3NgLFxyXG4gIGxpZ2h0OiBgcGx1Z2lucy8ke3BsdWdpbl9pZH0vY3NzL2RlZmF1bHQubGlnaHQuY3NzYFxyXG59KTtcclxuXHJcbmNsYXNzIEdyYWZhbmFCb29tVGFibGVDdHJsIGV4dGVuZHMgTWV0cmljc1BhbmVsQ3RybCB7XHJcbiAgcHVibGljIHN0YXRpYyB0ZW1wbGF0ZVVybCA9IFwicGFydGlhbHMvbW9kdWxlLmh0bWxcIjtcclxuICBwdWJsaWMgbGltaXRUZXh0ID0gdXRpbHMubGltaXRUZXh0O1xyXG4gIHB1YmxpYyB1bml0Rm9ybWF0cyA9IGtibi5nZXRVbml0Rm9ybWF0cygpO1xyXG4gIHB1YmxpYyB2YWx1ZU5hbWVPcHRpb25zID0gdmFsdWVfbmFtZV9vcHRpb25zO1xyXG4gIHB1YmxpYyBkYXRhUmVjZWl2ZWQ6IGFueTtcclxuICBwdWJsaWMgY3RybDogYW55O1xyXG4gIHB1YmxpYyBlbGVtOiBhbnk7XHJcbiAgcHVibGljIGF0dHJzOiBhbnk7XHJcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkaW5qZWN0b3IpIHtcclxuICAgIHN1cGVyKCRzY29wZSwgJGluamVjdG9yKTtcclxuICAgIF8uZGVmYXVsdHModGhpcy5wYW5lbCwgY29uZmlnLnBhbmVsRGVmYXVsdHMpO1xyXG4gICAgdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybiA9IHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4gfHwgZGVmYXVsdFBhdHRlcm47XHJcbiAgICB0aGlzLnVwZGF0ZVByb3RvdHlwZXMoKTtcclxuICAgIHRoaXMuZXZlbnRzLm9uKFwiZGF0YS1yZWNlaXZlZFwiLCB0aGlzLm9uRGF0YVJlY2VpdmVkLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5ldmVudHMub24oXCJpbml0LWVkaXQtbW9kZVwiLCB0aGlzLm9uSW5pdEVkaXRNb2RlLmJpbmQodGhpcykpO1xyXG4gIH1cclxuICBwdWJsaWMgb25Jbml0RWRpdE1vZGUoKSB7XHJcbiAgICB0aGlzLmFkZEVkaXRvclRhYihcIlBhdHRlcm5zXCIsIGBwdWJsaWMvcGx1Z2lucy8ke3BsdWdpbl9pZH0vcGFydGlhbHMvcGF0dGVybnMuaHRtbGAsIDIpO1xyXG4gICAgdGhpcy5hZGRFZGl0b3JUYWIoXCJUaW1lIGJhc2VkIHRocmVzaG9sZHMgJiBGaWx0ZXJzXCIsIGBwdWJsaWMvcGx1Z2lucy8ke3BsdWdpbl9pZH0vcGFydGlhbHMvcGF0dGVybnMtYWR2YW5jZWQtb3B0aW9ucy5odG1sYCwgMyk7XHJcbiAgICB0aGlzLmFkZEVkaXRvclRhYihcIk9wdGlvbnNcIiwgYHB1YmxpYy9wbHVnaW5zLyR7cGx1Z2luX2lkfS9wYXJ0aWFscy9vcHRpb25zLmh0bWxgLCA0KTtcclxuICB9XHJcbiAgcHVibGljIG9uRGF0YVJlY2VpdmVkKGRhdGEpIHtcclxuICAgIHRoaXMuZGF0YVJlY2VpdmVkID0gZGF0YTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyBhZGRQYXR0ZXJuKCkge1xyXG4gICAgbGV0IG5ld1BhdHRlcm4gPSBuZXcgQm9vbVRhYmxlUGF0dGVybih7XHJcbiAgICAgIHJvd19jb2xfd3JhcHBlcjogdGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXJcclxuICAgIH0pO1xyXG4gICAgdGhpcy5wYW5lbC5wYXR0ZXJucy5wdXNoKG5ld1BhdHRlcm4pO1xyXG4gICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCAtIDE7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwdWJsaWMgbW92ZVBhdHRlcm4oZGlyZWN0aW9uLCBpbmRleCkge1xyXG4gICAgbGV0IHRlbXBFbGVtZW50ID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF07XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcIlVQXCIpIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0gPSB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4IC0gMV07XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXggLSAxXSA9IHRlbXBFbGVtZW50O1xyXG4gICAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9IGluZGV4IC0gMTtcclxuICAgIH1cclxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiRE9XTlwiKSB7XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleCArIDFdO1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4ICsgMV0gPSB0ZW1wRWxlbWVudDtcclxuICAgICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSBpbmRleCArIDE7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwdWJsaWMgcmVtb3ZlUGF0dGVybihpbmRleCkge1xyXG4gICAgdGhpcy5wYW5lbC5wYXR0ZXJucy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSAodGhpcy5wYW5lbC5wYXR0ZXJucyAmJiB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCA+IDApID8gKHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoIC0gMSkgOiAtMTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyBjbG9uZVBhdHRlcm4oaW5kZXgpIHtcclxuICAgIGxldCBjb3BpZWRQYXR0ZXJuID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0pO1xyXG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGNvcGllZFBhdHRlcm4sIEJvb21UYWJsZVBhdHRlcm4ucHJvdG90eXBlKTtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMucHVzaChjb3BpZWRQYXR0ZXJuKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyBsaW5rKHNjb3BlLCBlbGVtLCBhdHRycywgY3RybCkge1xyXG4gICAgdGhpcy5zY29wZSA9IHNjb3BlO1xyXG4gICAgdGhpcy5lbGVtID0gZWxlbTtcclxuICAgIHRoaXMuYXR0cnMgPSBhdHRycztcclxuICAgIHRoaXMuY3RybCA9IGN0cmw7XHJcbiAgfVxyXG4gIHByaXZhdGUgdXBkYXRlUHJvdG90eXBlcygpIHtcclxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLCBCb29tVGFibGVQYXR0ZXJuLnByb3RvdHlwZSk7XHJcbiAgICB0aGlzLnBhbmVsLnBhdHRlcm5zLm1hcChwYXR0ZXJuID0+IHtcclxuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHBhdHRlcm4sIEJvb21UYWJsZVBhdHRlcm4ucHJvdG90eXBlKTtcclxuICAgICAgcmV0dXJuIHBhdHRlcm47XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcHVibGljIHNlcmllc0hhbmRsZXIoc2VyaWVzRGF0YSkge1xyXG4gICAgbGV0IHNlcmllcyA9IG5ldyBUaW1lU2VyaWVzKHtcclxuICAgICAgYWxpYXM6IHNlcmllc0RhdGEudGFyZ2V0LFxyXG4gICAgICBkYXRhcG9pbnRzOiBzZXJpZXNEYXRhLmRhdGFwb2ludHMgfHwgW11cclxuICAgIH0pO1xyXG4gICAgc2VyaWVzLmZsb3RwYWlycyA9IHNlcmllcy5nZXRGbG90UGFpcnModGhpcy5wYW5lbC5udWxsUG9pbnRNb2RlKTtcclxuICAgIHJldHVybiBzZXJpZXM7XHJcbiAgfVxyXG4gIHB1YmxpYyBjb21wdXRlQmdDb2xvcih0aHJlc2hvbGRzLCBiZ0NvbG9ycywgdmFsdWUpIHtcclxuICAgIGxldCBjID0gXCJ0cmFuc3BhcmVudFwiO1xyXG4gICAgaWYgKHRocmVzaG9sZHMgJiYgYmdDb2xvcnMgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmIHRocmVzaG9sZHMubGVuZ3RoICsgMSA8PSBiZ0NvbG9ycy5sZW5ndGgpIHtcclxuICAgICAgYmdDb2xvcnMgPSBfLmRyb3BSaWdodChiZ0NvbG9ycywgYmdDb2xvcnMubGVuZ3RoIC0gdGhyZXNob2xkcy5sZW5ndGggLSAxKTtcclxuICAgICAgaWYgKGJnQ29sb3JzW2JnQ29sb3JzLmxlbmd0aCAtIDFdID09PSBcIlwiKSB7XHJcbiAgICAgICAgYmdDb2xvcnNbYmdDb2xvcnMubGVuZ3RoIC0gMV0gPSBcInRyYW5zcGFyZW50XCI7XHJcbiAgICAgIH1cclxuICAgICAgZm9yIChsZXQgaSA9IHRocmVzaG9sZHMubGVuZ3RoOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlID49IHRocmVzaG9sZHNbaSAtIDFdKSB7XHJcbiAgICAgICAgICByZXR1cm4gdXRpbHMubm9ybWFsaXplQ29sb3IoYmdDb2xvcnNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdXRpbHMubm9ybWFsaXplQ29sb3IoXy5maXJzdChiZ0NvbG9ycykpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGM7XHJcbiAgfVxyXG4gIHB1YmxpYyB0cmFuc2Zvcm1WYWx1ZSh0aHJlc2hvbGRzLCB0cmFuc2Zvcm1fdmFsdWVzLCB2YWx1ZSwgZGlzcGxheVZhbHVlLCByb3dfbmFtZSwgY29sX25hbWUpIHtcclxuICAgIGxldCB0ID0gdmFsdWU7XHJcbiAgICBpZiAodGhyZXNob2xkcyAmJiB0cmFuc2Zvcm1fdmFsdWVzICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiB0aHJlc2hvbGRzLmxlbmd0aCArIDEgPD0gdHJhbnNmb3JtX3ZhbHVlcy5sZW5ndGgpIHtcclxuICAgICAgdHJhbnNmb3JtX3ZhbHVlcyA9IF8uZHJvcFJpZ2h0KHRyYW5zZm9ybV92YWx1ZXMsIHRyYW5zZm9ybV92YWx1ZXMubGVuZ3RoIC0gdGhyZXNob2xkcy5sZW5ndGggLSAxKTtcclxuICAgICAgaWYgKHRyYW5zZm9ybV92YWx1ZXNbdHJhbnNmb3JtX3ZhbHVlcy5sZW5ndGggLSAxXSA9PT0gXCJcIikge1xyXG4gICAgICAgIHRyYW5zZm9ybV92YWx1ZXNbdHJhbnNmb3JtX3ZhbHVlcy5sZW5ndGggLSAxXSA9IFwiX3ZhbHVlX1wiO1xyXG4gICAgICB9XHJcbiAgICAgIGZvciAobGV0IGkgPSB0aHJlc2hvbGRzLmxlbmd0aDsgaSA+IDA7IGktLSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA+PSB0aHJlc2hvbGRzW2kgLSAxXSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRyYW5zZm9ybV92YWx1ZXNbaV0ucmVwbGFjZShuZXcgUmVnRXhwKFwiX3ZhbHVlX1wiLCBcImdcIiksIGRpc3BsYXlWYWx1ZSkucmVwbGFjZShuZXcgUmVnRXhwKFwiX3Jvd19uYW1lX1wiLCBcImdcIiksIHJvd19uYW1lKS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfY29sX25hbWVfXCIsIFwiZ1wiKSwgY29sX25hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gXy5maXJzdCh0cmFuc2Zvcm1fdmFsdWVzKS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfdmFsdWVfXCIsIFwiZ1wiKSwgZGlzcGxheVZhbHVlKS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfcm93X25hbWVfXCIsIFwiZ1wiKSwgcm93X25hbWUpLnJlcGxhY2UobmV3IFJlZ0V4cChcIl9jb2xfbmFtZV9cIiwgXCJnXCIpLCBjb2xfbmFtZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxuICB9XHJcbiAgcHVibGljIGdldERlY2ltYWxzRm9yVmFsdWUodmFsdWUsIF9kZWNpbWFscykge1xyXG4gICAgaWYgKF8uaXNOdW1iZXIoK19kZWNpbWFscykpIHtcclxuICAgICAgbGV0IG86IE9iamVjdCA9IHtcclxuICAgICAgICBkZWNpbWFsczogX2RlY2ltYWxzLFxyXG4gICAgICAgIHNjYWxlZERlY2ltYWxzOiBudWxsXHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiBvO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBkZWx0YSA9IHZhbHVlIC8gMjtcclxuICAgIGxldCBkZWMgPSAtTWF0aC5mbG9vcihNYXRoLmxvZyhkZWx0YSkgLyBNYXRoLkxOMTApO1xyXG5cclxuICAgIGxldCBtYWduID0gTWF0aC5wb3coMTAsIC1kZWMpLFxyXG4gICAgICBub3JtID0gZGVsdGEgLyBtYWduLCAvLyBub3JtIGlzIGJldHdlZW4gMS4wIGFuZCAxMC4wXHJcbiAgICAgIHNpemU7XHJcblxyXG4gICAgaWYgKG5vcm0gPCAxLjUpIHtcclxuICAgICAgc2l6ZSA9IDE7XHJcbiAgICB9IGVsc2UgaWYgKG5vcm0gPCAzKSB7XHJcbiAgICAgIHNpemUgPSAyO1xyXG4gICAgICAvLyBzcGVjaWFsIGNhc2UgZm9yIDIuNSwgcmVxdWlyZXMgYW4gZXh0cmEgZGVjaW1hbFxyXG4gICAgICBpZiAobm9ybSA+IDIuMjUpIHtcclxuICAgICAgICBzaXplID0gMi41O1xyXG4gICAgICAgICsrZGVjO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKG5vcm0gPCA3LjUpIHtcclxuICAgICAgc2l6ZSA9IDU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzaXplID0gMTA7XHJcbiAgICB9XHJcblxyXG4gICAgc2l6ZSAqPSBtYWduO1xyXG5cclxuICAgIC8vIHJlZHVjZSBzdGFydGluZyBkZWNpbWFscyBpZiBub3QgbmVlZGVkXHJcbiAgICBpZiAoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlKSB7XHJcbiAgICAgIGRlYyA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJlc3VsdDogT2JqZWN0ID0ge1xyXG4gICAgICBkZWNpbWFsczogTWF0aC5tYXgoMCwgZGVjKSxcclxuICAgICAgc2NhbGVkRGVjaW1hbHM6IE1hdGgubWF4KDAsIGRlYykgLSBNYXRoLmZsb29yKE1hdGgubG9nKHNpemUpIC8gTWF0aC5MTjEwKSArIDJcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgcHVibGljIHRocm93RXJyb3IodGl0bGUsIG1lc3NhZ2UpIHtcclxuICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoKTtcclxuICAgIGVyci5uYW1lID0gdGl0bGU7XHJcbiAgICBlcnIubWVzc2FnZSA9IG1lc3NhZ2U7XHJcbiAgICB0aGlzLnBhbmVsLmVycm9yID0gZXJyO1xyXG4gIH1cclxuICBwdWJsaWMgY2xlYXJFcnJvcigpIHtcclxuICAgIHRoaXMucGFuZWwuZXJyb3IgPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG59XHJcblxyXG5HcmFmYW5hQm9vbVRhYmxlQ3RybC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gIHRoaXMuY2xlYXJFcnJvcigpO1xyXG4gIGlmICh0aGlzLmRhdGFSZWNlaXZlZCkge1xyXG4gICAgbGV0IGRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YVJlY2VpdmVkO1xyXG4gICAgdGhpcy5wYW5lbC5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzID0gdGhpcy5wYW5lbC5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzIHx8IGNvbmZpZy5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzO1xyXG4gICAgY29uc3QgbWV0cmljc1JlY2VpdmVkID0gdXRpbHMuZ2V0RmllbGRzKGRhdGFDb21wdXRlZCwgXCJ0YXJnZXRcIik7XHJcbiAgICBpZiAobWV0cmljc1JlY2VpdmVkLmxlbmd0aCAhPT0gXy51bmlxKG1ldHJpY3NSZWNlaXZlZCkubGVuZ3RoKSB7XHJcbiAgICAgIGxldCBkdXBsaWNhdGVLZXlzID0gXy51bmlxKG1ldHJpY3NSZWNlaXZlZC5maWx0ZXIodiA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG1ldHJpY3NSZWNlaXZlZC5maWx0ZXIodCA9PiB0ID09PSB2KS5sZW5ndGggPiAxO1xyXG4gICAgICB9KSk7XHJcbiAgICAgIHRoaXMudGhyb3dFcnJvcihcIkR1cGxpY2F0ZSBkYXRhIHJlY2VpdmVkXCIsIFwiRHVwbGljYXRlIGtleXMgOiA8YnIvPlwiICsgZHVwbGljYXRlS2V5cy5qb2luKFwiPGJyLz4gXCIpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY2xlYXJFcnJvcigpO1xyXG4gICAgICAvLyBCaW5kaW5nIHRoZSBncmFmYW5hIGNvbXB1dGF0aW9ucyB0byB0aGUgbWV0cmljcyByZWNlaXZlZFxyXG4gICAgICBkYXRhQ29tcHV0ZWQgPSBkYXRhQ29tcHV0ZWQubWFwKHRoaXMuc2VyaWVzSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuICAgICAgLy8gR2V0IFNlcnZlciBUaW1lIFN0YW1wIG9mIHRoZSBTZXJpZXMgZm9yIHRpbWUgYmFzZWQgdGhyZXNob2xkcy5cclxuICAgICAgZGF0YUNvbXB1dGVkID0gZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy5jdXJyZW50X3NlcnZlcnRpbWVzdGFtcCA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgaWYgKHNlcmllcyAmJiBzZXJpZXMuZGF0YXBvaW50cyAmJiBzZXJpZXMuZGF0YXBvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBpZiAoXy5sYXN0KHNlcmllcy5kYXRhcG9pbnRzKS5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgc2VyaWVzLmN1cnJlbnRfc2VydmVydGltZXN0YW1wID0gbmV3IERhdGUoXy5sYXN0KHNlcmllcy5kYXRhcG9pbnRzKVsxXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBBc3NpZ24gcGF0dGVyblxyXG4gICAgICBkYXRhQ29tcHV0ZWQgPSBkYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgc2VyaWVzLnBhdHRlcm4gPSBfLmZpbmQodGhpcy5wYW5lbC5wYXR0ZXJucy5maWx0ZXIocCA9PiB7IHJldHVybiBwLmRpc2FibGVkICE9PSB0cnVlOyB9KSwgZnVuY3Rpb24gKHApIHtcclxuICAgICAgICAgIHJldHVybiBzZXJpZXMuYWxpYXMubWF0Y2gocC5wYXR0ZXJuKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoc2VyaWVzLnBhdHRlcm4gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgc2VyaWVzLnBhdHRlcm4gPSB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuIHx8IGRlZmF1bHRQYXR0ZXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gQXNzaWduIERlY2ltYWwgVmFsdWVzXHJcbiAgICAgIGRhdGFDb21wdXRlZCA9IGRhdGFDb21wdXRlZC5tYXAoc2VyaWVzID0+IHtcclxuICAgICAgICBzZXJpZXMuZGVjaW1hbHMgPSAoc2VyaWVzLnBhdHRlcm4uZGVjaW1hbHMpIHx8IGRlZmF1bHRQYXR0ZXJuLmRlY2ltYWxzO1xyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBBc3NpZ24gdmFsdWVcclxuICAgICAgZGF0YUNvbXB1dGVkID0gZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIGlmIChzZXJpZXMuc3RhdHMpIHtcclxuICAgICAgICAgIHNlcmllcy52YWx1ZSA9IHNlcmllcy5zdGF0c1tzZXJpZXMucGF0dGVybi52YWx1ZU5hbWVdO1xyXG4gICAgICAgICAgbGV0IGRlY2ltYWxJbmZvOiBhbnkgPSB0aGlzLmdldERlY2ltYWxzRm9yVmFsdWUoc2VyaWVzLnZhbHVlLCBzZXJpZXMuZGVjaW1hbHMpO1xyXG4gICAgICAgICAgbGV0IGZvcm1hdEZ1bmMgPSBrYm4udmFsdWVGb3JtYXRzW3Nlcmllcy5wYXR0ZXJuLmZvcm1hdF07XHJcbiAgICAgICAgICBpZiAoc2VyaWVzLnZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHNlcmllcy5kaXNwbGF5VmFsdWUgPSBzZXJpZXMucGF0dGVybi5udWxsX3ZhbHVlIHx8IFwiTnVsbFwiO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICghaXNOYU4oc2VyaWVzLnZhbHVlKSkge1xyXG4gICAgICAgICAgICBzZXJpZXMudmFsdWVGb3JtYXR0ZWQgPSBmb3JtYXRGdW5jKHNlcmllcy52YWx1ZSwgZGVjaW1hbEluZm8uZGVjaW1hbHMsIGRlY2ltYWxJbmZvLnNjYWxlZERlY2ltYWxzKTtcclxuICAgICAgICAgICAgc2VyaWVzLnZhbHVlUm91bmRlZCA9IGtibi5yb3VuZFZhbHVlKHNlcmllcy52YWx1ZSwgZGVjaW1hbEluZm8uZGVjaW1hbHMpO1xyXG4gICAgICAgICAgICBzZXJpZXMuZGlzcGxheVZhbHVlID0gc2VyaWVzLnZhbHVlRm9ybWF0dGVkO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VyaWVzLmRpc3BsYXlWYWx1ZSA9IHNlcmllcy5wYXR0ZXJuLm51bGxfdmFsdWUgfHwgXCJOdWxsXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBGaWx0ZXIgVmFsdWVzXHJcbiAgICAgIGRhdGFDb21wdXRlZCA9IGRhdGFDb21wdXRlZC5maWx0ZXIoc2VyaWVzID0+IHtcclxuICAgICAgICBpZiAoIXNlcmllcy5wYXR0ZXJuLmZpbHRlcikge1xyXG4gICAgICAgICAgc2VyaWVzLnBhdHRlcm4uZmlsdGVyID0ge307XHJcbiAgICAgICAgICBzZXJpZXMucGF0dGVybi5maWx0ZXIudmFsdWVfYmVsb3cgPSBcIlwiO1xyXG4gICAgICAgICAgc2VyaWVzLnBhdHRlcm4uZmlsdGVyLnZhbHVlX2Fib3ZlID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNlcmllcy5wYXR0ZXJuICYmIHNlcmllcy5wYXR0ZXJuLmZpbHRlciAmJiAoc2VyaWVzLnBhdHRlcm4uZmlsdGVyLnZhbHVlX2JlbG93ICE9PSBcIlwiIHx8IHNlcmllcy5wYXR0ZXJuLmZpbHRlci52YWx1ZV9hYm92ZSAhPT0gXCJcIikpIHtcclxuICAgICAgICAgIGlmIChzZXJpZXMucGF0dGVybi5maWx0ZXIudmFsdWVfYmVsb3cgIT09IFwiXCIgJiYgc2VyaWVzLnZhbHVlIDwgKyhzZXJpZXMucGF0dGVybi5maWx0ZXIudmFsdWVfYmVsb3cpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChzZXJpZXMucGF0dGVybi5maWx0ZXIudmFsdWVfYWJvdmUgIT09IFwiXCIgJiYgc2VyaWVzLnZhbHVlID4gKyhzZXJpZXMucGF0dGVybi5maWx0ZXIudmFsdWVfYWJvdmUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBBc3NpZ24gUm93IE5hbWVcclxuICAgICAgZGF0YUNvbXB1dGVkID0gZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy5yb3dfbmFtZSA9IHNlcmllcy5wYXR0ZXJuLnJvd19uYW1lIHx8IGRlZmF1bHRQYXR0ZXJuLnJvd19uYW1lO1xyXG4gICAgICAgIHNlcmllcy5yb3dfbmFtZSA9IHNlcmllcy5yb3dfbmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIgKyBcInNlcmllc1wiICsgdGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIsIFwiZ1wiKSwgc2VyaWVzLmFsaWFzKTtcclxuICAgICAgICBzZXJpZXMucm93X25hbWUgPSBzZXJpZXMuYWxpYXMuc3BsaXQoc2VyaWVzLnBhdHRlcm4uZGVsaW1pdGVyIHx8IFwiLlwiKS5yZWR1Y2UoKHIsIGl0LCBpKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gci5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIgKyBpICsgdGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIsIFwiZ1wiKSwgaXQpO1xyXG4gICAgICAgIH0sIHNlcmllcy5yb3dfbmFtZSk7XHJcbiAgICAgICAgaWYgKHNlcmllcy5hbGlhcy5zcGxpdChzZXJpZXMucGF0dGVybi5kZWxpbWl0ZXIgfHwgXCIuXCIpLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgc2VyaWVzLnJvd19uYW1lID0gc2VyaWVzLmFsaWFzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gQXNzaWduIENvbCBOYW1lXHJcbiAgICAgIGRhdGFDb21wdXRlZCA9IGRhdGFDb21wdXRlZC5tYXAoc2VyaWVzID0+IHtcclxuICAgICAgICBzZXJpZXMuY29sX25hbWUgPSBzZXJpZXMucGF0dGVybi5jb2xfbmFtZSB8fCBkZWZhdWx0UGF0dGVybi5jb2xfbmFtZTtcclxuICAgICAgICBzZXJpZXMuY29sX25hbWUgPSBzZXJpZXMuYWxpYXMuc3BsaXQoc2VyaWVzLnBhdHRlcm4uZGVsaW1pdGVyIHx8IFwiLlwiKS5yZWR1Y2UoKHIsIGl0LCBpKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gci5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIgKyBpICsgdGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIsIFwiZ1wiKSwgaXQpO1xyXG4gICAgICAgIH0sIHNlcmllcy5jb2xfbmFtZSk7XHJcbiAgICAgICAgaWYgKHNlcmllcy5hbGlhcy5zcGxpdChzZXJpZXMucGF0dGVybi5kZWxpbWl0ZXIgfHwgXCIuXCIpLmxlbmd0aCA9PT0gMSB8fCBzZXJpZXMucm93X25hbWUgPT09IHNlcmllcy5hbGlhcykge1xyXG4gICAgICAgICAgc2VyaWVzLmNvbF9uYW1lID0gc2VyaWVzLnBhdHRlcm4uY29sX25hbWUgfHwgXCJWYWx1ZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gQXNzaWduIFJvd0NvbCBLZXlcclxuICAgICAgZGF0YUNvbXB1dGVkID0gZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy5rZXlfbmFtZSA9IHNlcmllcy5yb3dfbmFtZSArIFwiI1wiICsgc2VyaWVzLmNvbF9uYW1lO1xyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBBc3NpZ24gVGhyZXNob2xkc1xyXG4gICAgICBkYXRhQ29tcHV0ZWQgPSBkYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgc2VyaWVzLnRocmVzaG9sZHMgPSAoc2VyaWVzLnBhdHRlcm4udGhyZXNob2xkcyB8fCBkZWZhdWx0UGF0dGVybi50aHJlc2hvbGRzKS5zcGxpdChcIixcIikubWFwKGQgPT4gK2QpO1xyXG4gICAgICAgIGlmIChzZXJpZXMucGF0dGVybi5lbmFibGVfdGltZV9iYXNlZF90aHJlc2hvbGRzKSB7XHJcbiAgICAgICAgICBsZXQgbWV0cmljcmVjaXZlZFRpbWVTdGFtcCA9IHNlcmllcy5jdXJyZW50X3NlcnZlcnRpbWVzdGFtcCB8fCBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgbGV0IG1ldHJpY3JlY2l2ZWRUaW1lU3RhbXBfaW5udW1iZXIgPSBtZXRyaWNyZWNpdmVkVGltZVN0YW1wLmdldEhvdXJzKCkgKiAxMDAgKyBtZXRyaWNyZWNpdmVkVGltZVN0YW1wLmdldE1pbnV0ZXMoKTtcclxuICAgICAgICAgIGxldCB3ZWVrZGF5cyA9IFtcInN1blwiLCBcIm1vblwiLCBcInR1ZVwiLCBcIndlZFwiLCBcInRodVwiLCBcImZyaVwiLCBcInNhdFwiXTtcclxuICAgICAgICAgIF8uZWFjaChzZXJpZXMucGF0dGVybi50aW1lX2Jhc2VkX3RocmVzaG9sZHMsICh0YnR4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0YnR4ICYmIHRidHguZnJvbSAmJiB0YnR4LnRvICYmIHRidHguZW5hYmxlZERheXMgJiZcclxuICAgICAgICAgICAgICAobWV0cmljcmVjaXZlZFRpbWVTdGFtcF9pbm51bWJlciA+PSArKHRidHguZnJvbSkpICYmXHJcbiAgICAgICAgICAgICAgKG1ldHJpY3JlY2l2ZWRUaW1lU3RhbXBfaW5udW1iZXIgPD0gKyh0YnR4LnRvKSkgJiZcclxuICAgICAgICAgICAgICAodGJ0eC5lbmFibGVkRGF5cy50b0xvd2VyQ2FzZSgpLmluZGV4T2Yod2Vla2RheXNbbWV0cmljcmVjaXZlZFRpbWVTdGFtcC5nZXREYXkoKV0pID4gLTEpICYmXHJcbiAgICAgICAgICAgICAgdGJ0eC50aHJlc2hvbGRcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgc2VyaWVzLnRocmVzaG9sZHMgPSAodGJ0eC50aHJlc2hvbGQgKyBcIlwiKS5zcGxpdChcIixcIikubWFwKGQgPT4gK2QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIEFzc2lnbiBCRyBDb2xvcnNcclxuICAgICAgZGF0YUNvbXB1dGVkID0gZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIGxldCBiZ0NvbG9ycyA9IChzZXJpZXMucGF0dGVybi5iZ0NvbG9ycyB8fCBkZWZhdWx0UGF0dGVybi5iZ0NvbG9ycykuc3BsaXQoXCJ8XCIpO1xyXG4gICAgICAgIHNlcmllcy5iZ0NvbG9yID0gc2VyaWVzLnBhdHRlcm4uZW5hYmxlX2JnQ29sb3IgPT09IHRydWUgPyB0aGlzLmNvbXB1dGVCZ0NvbG9yKHNlcmllcy50aHJlc2hvbGRzLCBiZ0NvbG9ycywgc2VyaWVzLnZhbHVlKSA6IFwidHJhbnNwYXJlbnRcIjtcclxuICAgICAgICBpZiAoc2VyaWVzLmRpc3BsYXlWYWx1ZSA9PT0gKHNlcmllcy5wYXR0ZXJuLm51bGxfdmFsdWUgfHwgZGVmYXVsdFBhdHRlcm4ubnVsbF92YWx1ZSB8fCBcIk51bGxcIikpIHtcclxuICAgICAgICAgIHNlcmllcy5iZ0NvbG9yID0gc2VyaWVzLnBhdHRlcm4ubnVsbF9jb2xvciB8fCBkZWZhdWx0UGF0dGVybi5udWxsX2NvbG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gQkcgQ29sb3JzIG92ZXJyaWRlc1xyXG4gICAgICBkYXRhQ29tcHV0ZWQgPSBkYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgaWYgKHNlcmllcy5wYXR0ZXJuLmVuYWJsZV9iZ0NvbG9yX292ZXJyaWRlcyAmJiBzZXJpZXMucGF0dGVybi5iZ0NvbG9yc19vdmVycmlkZXMgIT09IFwiXCIpIHtcclxuICAgICAgICAgIGxldCBfYmdDb2xvcnNfb3ZlcnJpZGVzID0gc2VyaWVzLnBhdHRlcm4uYmdDb2xvcnNfb3ZlcnJpZGVzLnNwbGl0KFwifFwiKS5maWx0ZXIoY29uID0+IGNvbi5pbmRleE9mKFwiLT5cIikpLm1hcChjb24gPT4gY29uLnNwbGl0KFwiLT5cIikpLmZpbHRlcihjb24gPT4gKyhjb25bMF0pID09PSBzZXJpZXMudmFsdWUpLm1hcChjb24gPT4gY29uWzFdKTtcclxuICAgICAgICAgIGlmIChfYmdDb2xvcnNfb3ZlcnJpZGVzLmxlbmd0aCA+IDAgJiYgX2JnQ29sb3JzX292ZXJyaWRlc1swXSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICBzZXJpZXMuYmdDb2xvciA9IHV0aWxzLm5vcm1hbGl6ZUNvbG9yKChcIlwiICsgX2JnQ29sb3JzX292ZXJyaWRlc1swXSkudHJpbSgpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIFZhbHVlIFRyYW5zZm9ybVxyXG4gICAgICBkYXRhQ29tcHV0ZWQgPSBkYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgbGV0IHRyYW5zZm9ybV92YWx1ZXMgPSAoc2VyaWVzLnBhdHRlcm4udHJhbnNmb3JtX3ZhbHVlcyB8fCBkZWZhdWx0UGF0dGVybi50cmFuc2Zvcm1fdmFsdWVzKS5zcGxpdChcInxcIik7XHJcbiAgICAgICAgc2VyaWVzLmRpc3BsYXlWYWx1ZSA9IHNlcmllcy5wYXR0ZXJuLmVuYWJsZV90cmFuc2Zvcm0gPT09IHRydWUgPyB0aGlzLnRyYW5zZm9ybVZhbHVlKHNlcmllcy50aHJlc2hvbGRzLCB0cmFuc2Zvcm1fdmFsdWVzLCBzZXJpZXMudmFsdWUsIHNlcmllcy5kaXNwbGF5VmFsdWUsIHNlcmllcy5yb3dfbmFtZSwgc2VyaWVzLmNvbF9uYW1lKSA6IHNlcmllcy5kaXNwbGF5VmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIFZhbHVlIFRyYW5zZm9ybSBPdmVycmlkZXNcclxuICAgICAgZGF0YUNvbXB1dGVkID0gZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIGlmIChzZXJpZXMucGF0dGVybi5lbmFibGVfdHJhbnNmb3JtX292ZXJyaWRlcyAmJiBzZXJpZXMucGF0dGVybi50cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlcykge1xyXG4gICAgICAgICAgbGV0IF90cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlcyA9IHNlcmllcy5wYXR0ZXJuLnRyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzLnNwbGl0KFwifFwiKS5maWx0ZXIoY29uID0+IGNvbi5pbmRleE9mKFwiLT5cIikpLm1hcChjb24gPT4gY29uLnNwbGl0KFwiLT5cIikpLmZpbHRlcihjb24gPT4gKyhjb25bMF0pID09PSBzZXJpZXMudmFsdWUpLm1hcChjb24gPT4gY29uWzFdKTtcclxuICAgICAgICAgIGlmIChfdHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXMubGVuZ3RoID4gMCAmJiBfdHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXNbMF0gIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgc2VyaWVzLmRpc3BsYXlWYWx1ZSA9IChcIlwiICsgX3RyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzWzBdKS50cmltKCkucmVwbGFjZShuZXcgUmVnRXhwKFwiX3ZhbHVlX1wiLCBcImdcIiksIHNlcmllcy5kaXNwbGF5VmFsdWUpLnJlcGxhY2UobmV3IFJlZ0V4cChcIl9yb3dfbmFtZV9cIiwgXCJnXCIpLCBzZXJpZXMucm93X25hbWUpLnJlcGxhY2UobmV3IFJlZ0V4cChcIl9jb2xfbmFtZV9cIiwgXCJnXCIpLCBzZXJpZXMuY29sX25hbWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gRm9udCBhd2Vzb21lIGljb25zICYgSW1hZ2VzIGluIHZhbHVlXHJcbiAgICAgIGRhdGFDb21wdXRlZCA9IGRhdGFDb21wdXRlZC5tYXAoc2VyaWVzID0+IHtcclxuICAgICAgICBzZXJpZXMuYWN0dWFsX2Rpc3BsYXl2YWx1ZSA9IHNlcmllcy5kaXNwbGF5VmFsdWU7XHJcbiAgICAgICAgc2VyaWVzLmFjdHVhbF9yb3dfbmFtZSA9IHNlcmllcy5yb3dfbmFtZTtcclxuICAgICAgICBzZXJpZXMuYWN0dWFsX2NvbF9uYW1lID0gc2VyaWVzLmNvbF9uYW1lO1xyXG4gICAgICAgIHNlcmllcy5kaXNwbGF5VmFsdWUgPSB1dGlscy5yZXBsYWNlVG9rZW5zKHNlcmllcy5kaXNwbGF5VmFsdWUpO1xyXG4gICAgICAgIHNlcmllcy5yb3dfbmFtZSA9IHV0aWxzLnJlcGxhY2VUb2tlbnMoc2VyaWVzLnJvd19uYW1lKTtcclxuICAgICAgICBzZXJpZXMuY29sX25hbWUgPSB1dGlscy5yZXBsYWNlVG9rZW5zKHNlcmllcy5jb2xfbmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIENlbGwgTGlua3NcclxuICAgICAgZGF0YUNvbXB1dGVkID0gZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIGlmIChzZXJpZXMucGF0dGVybi5lbmFibGVfY2xpY2thYmxlX2NlbGxzKSB7XHJcbiAgICAgICAgICBsZXQgdGFyZ2V0TGluayA9IHNlcmllcy5wYXR0ZXJuLmNsaWNrYWJsZV9jZWxsc19saW5rIHx8IFwiI1wiO1xyXG4gICAgICAgICAgdGFyZ2V0TGluayA9IHRhcmdldExpbmsucmVwbGFjZShuZXcgUmVnRXhwKFwiX3Jvd19uYW1lX1wiLCBcImdcIiksIHV0aWxzLmdldEFjdHVhbE5hbWVXaXRob3V0VG9rZW5zKHNlcmllcy5hY3R1YWxfcm93X25hbWUpLnRyaW0oKSk7XHJcbiAgICAgICAgICB0YXJnZXRMaW5rID0gdGFyZ2V0TGluay5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfY29sX25hbWVfXCIsIFwiZ1wiKSwgdXRpbHMuZ2V0QWN0dWFsTmFtZVdpdGhvdXRUb2tlbnMoc2VyaWVzLmFjdHVhbF9jb2xfbmFtZSkudHJpbSgpKTtcclxuICAgICAgICAgIHRhcmdldExpbmsgPSB0YXJnZXRMaW5rLnJlcGxhY2UobmV3IFJlZ0V4cChcIl92YWx1ZV9cIiwgXCJnXCIpLCB1dGlscy5nZXRBY3R1YWxOYW1lV2l0aG91dFRva2VucyhzZXJpZXMudmFsdWUpLnRyaW0oKSk7XHJcbiAgICAgICAgICBzZXJpZXMuZGlzcGxheVZhbHVlID0gYDxhIGhyZWY9XCIke3RhcmdldExpbmt9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+JHtzZXJpZXMuZGlzcGxheVZhbHVlfTwvYT5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gSGFuZGxlIE51bGwgVmFsdWVcclxuICAgICAgZGF0YUNvbXB1dGVkID0gZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIGlmIChfLmlzTmFOKHNlcmllcy52YWx1ZSkgfHwgc2VyaWVzLnZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgICBzZXJpZXMuYmdDb2xvciA9IHNlcmllcy5wYXR0ZXJuLm51bGxfY29sb3IgfHwgZGVmYXVsdFBhdHRlcm4ubnVsbF9jb2xvciB8fCBcImRhcmtyZWRcIjtcclxuICAgICAgICAgIHNlcmllcy5kaXNwbGF5VmFsdWUgPSBzZXJpZXMucGF0dGVybi5udWxsX3ZhbHVlIHx8IGRlZmF1bHRQYXR0ZXJuLm51bGxfdmFsdWUgfHwgXCJObyBkYXRhXCI7XHJcbiAgICAgICAgICBzZXJpZXMuZGlzcGxheVZhbHVlID0gc2VyaWVzLmRpc3BsYXlWYWx1ZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfc2VyaWVzX1wiLCBcImdcIiksIHNlcmllcy5hbGlhcyk7XHJcbiAgICAgICAgICBzZXJpZXMuZGlzcGxheVZhbHVlID0gc2VyaWVzLmRpc3BsYXlWYWx1ZS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfcm93X25hbWVfXCIsIFwiZ1wiKSwgc2VyaWVzLnJvd19uYW1lKTtcclxuICAgICAgICAgIHNlcmllcy5kaXNwbGF5VmFsdWUgPSBzZXJpZXMuZGlzcGxheVZhbHVlLnJlcGxhY2UobmV3IFJlZ0V4cChcIl9jb2xfbmFtZV9cIiwgXCJnXCIpLCBzZXJpZXMuY29sX25hbWUpO1xyXG4gICAgICAgICAgc2VyaWVzLmRpc3BsYXlWYWx1ZSA9IHV0aWxzLnJlcGxhY2VUb2tlbnMoc2VyaWVzLmRpc3BsYXlWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBHcm91cGluZ1xyXG4gICAgICBjb25zdCByb3dzX2ZvdW5kID0gdXRpbHMuZ2V0RmllbGRzKGRhdGFDb21wdXRlZCwgXCJyb3dfbmFtZVwiKTtcclxuICAgICAgY29uc3QgY29sc19mb3VuZCA9IHV0aWxzLmdldEZpZWxkcyhkYXRhQ29tcHV0ZWQsIFwiY29sX25hbWVcIik7XHJcbiAgICAgIGNvbnN0IGtleXNfZm91bmQgPSB1dGlscy5nZXRGaWVsZHMoZGF0YUNvbXB1dGVkLCBcImtleV9uYW1lXCIpO1xyXG4gICAgICBjb25zdCBpc191bmlxdWVfa2V5cyA9IChrZXlzX2ZvdW5kLmxlbmd0aCA9PT0gXy51bmlxKGtleXNfZm91bmQpLmxlbmd0aCk7XHJcbiAgICAgIGlmIChpc191bmlxdWVfa2V5cykge1xyXG4gICAgICAgIHRoaXMuY2xlYXJFcnJvcigpO1xyXG4gICAgICAgIGxldCBvdXRwdXQ6IGFueVtdID0gW107XHJcbiAgICAgICAgXy5lYWNoKF8udW5pcShyb3dzX2ZvdW5kKSwgKHJvd19uYW1lKSA9PiB7XHJcbiAgICAgICAgICBsZXQgbzogYW55ID0ge307XHJcbiAgICAgICAgICBvLnJvdyA9IHJvd19uYW1lO1xyXG4gICAgICAgICAgby5jb2xzID0gW107XHJcbiAgICAgICAgICBfLmVhY2goXy51bmlxKGNvbHNfZm91bmQpLCAoY29sX25hbWUpID0+IHtcclxuICAgICAgICAgICAgbGV0IG1hdGNoZWRfdmFsdWUgPSAoXy5maW5kKGRhdGFDb21wdXRlZCwgKGUpID0+IHtcclxuICAgICAgICAgICAgICByZXR1cm4gZS5yb3dfbmFtZSA9PT0gcm93X25hbWUgJiYgZS5jb2xfbmFtZSA9PT0gY29sX25hbWU7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgaWYgKCFtYXRjaGVkX3ZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgbWF0Y2hlZF92YWx1ZSA9IHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlWYWx1ZTogXCJOL0FcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBOYU5cclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG8uY29scy5wdXNoKHtcclxuICAgICAgICAgICAgICBcImFjdHVhbF9jb2xfbmFtZVwiOiBtYXRjaGVkX3ZhbHVlLmFjdHVhbF9jb2xfbmFtZSxcclxuICAgICAgICAgICAgICBcImFjdHVhbF9yb3dfbmFtZVwiOiBtYXRjaGVkX3ZhbHVlLmFjdHVhbF9yb3dfbmFtZSxcclxuICAgICAgICAgICAgICBcImJnQ29sb3JcIjogbWF0Y2hlZF92YWx1ZS5iZ0NvbG9yIHx8IFwidHJhbnNwYXJlbnRcIixcclxuICAgICAgICAgICAgICBcImRpc3BsYXlWYWx1ZVwiOiBtYXRjaGVkX3ZhbHVlLmRpc3BsYXlWYWx1ZSB8fCBtYXRjaGVkX3ZhbHVlLnZhbHVlLFxyXG4gICAgICAgICAgICAgIFwibmFtZVwiOiBjb2xfbmFtZSxcclxuICAgICAgICAgICAgICBcInZhbHVlXCI6IG1hdGNoZWRfdmFsdWUudmFsdWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIG91dHB1dC5wdXNoKG8pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIHJlZ2lvbiBPdXRwdXQgdGFibGUgY29uc3RydWN0aW9uXHJcbiAgICAgICAgbGV0IGJvb210YWJsZV9vdXRwdXRfYm9keV9oZWFkZXJzID0gdGhpcy5lbGVtLmZpbmQoXCIjYm9vbXRhYmxlX291dHB1dF9ib2R5X2hlYWRlcnNcIik7XHJcbiAgICAgICAgbGV0IGJvb210YWJsZV9vdXRwdXRfYm9keV9oZWFkZXJzX291dHB1dCA9IGA8YnIvPmA7XHJcbiAgICAgICAgaWYgKHRoaXMucGFuZWwuaGlkZV9oZWFkZXJzICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICBib29tdGFibGVfb3V0cHV0X2JvZHlfaGVhZGVyc19vdXRwdXQgKz0gXCI8dHI+XCI7XHJcbiAgICAgICAgICBpZiAodGhpcy5wYW5lbC5oaWRlX2ZpcnN0X2NvbHVtbiAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBib29tdGFibGVfb3V0cHV0X2JvZHlfaGVhZGVyc19vdXRwdXQgKz0gYDx0aCBzdHlsZT1cInBhZGRpbmc6NHB4O3RleHQtYWxpZ246Y2VudGVyXCI+JHt0aGlzLnBhbmVsLmRlZmF1bHRfdGl0bGVfZm9yX3Jvd3N9PC90aD5gO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXy5lYWNoKF8udW5pcShjb2xzX2ZvdW5kKSwgYyA9PiB7XHJcbiAgICAgICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9oZWFkZXJzX291dHB1dCArPSBgPHRoIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjpjZW50ZXJcIj4ke2N9PC90aD5gO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBib29tdGFibGVfb3V0cHV0X2JvZHlfaGVhZGVyc19vdXRwdXQgKz0gXCI8L3RyPlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBib29tdGFibGVfb3V0cHV0X2JvZHlfaGVhZGVycy5odG1sKGJvb210YWJsZV9vdXRwdXRfYm9keV9oZWFkZXJzX291dHB1dCk7XHJcbiAgICAgICAgbGV0IGJvb210YWJsZV9vdXRwdXRfYm9keSA9IHRoaXMuZWxlbS5maW5kKCcjYm9vbXRhYmxlX291dHB1dF9ib2R5Jyk7XHJcbiAgICAgICAgbGV0IGJvb210YWJsZV9vdXRwdXRfYm9keV9vdXRwdXQgPSBgYDtcclxuICAgICAgICBfLmVhY2gob3V0cHV0LCBvID0+IHtcclxuICAgICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9vdXRwdXQgKz0gXCI8dHI+XCI7XHJcbiAgICAgICAgICBpZiAodGhpcy5wYW5lbC5oaWRlX2ZpcnN0X2NvbHVtbiAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBib29tdGFibGVfb3V0cHV0X2JvZHlfb3V0cHV0ICs9IGA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDtcIj4ke28ucm93fTwvdGQ+YDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIF8uZWFjaChvLmNvbHMsIGMgPT4ge1xyXG4gICAgICAgICAgICBib29tdGFibGVfb3V0cHV0X2JvZHlfb3V0cHV0ICs9IGA8dGRcclxuICAgICAgICAgICAgICBzdHlsZT1cInBhZGRpbmc6NHB4O2JhY2tncm91bmQtY29sb3I6JHtjLmJnQ29sb3J9XCJcclxuICAgICAgICAgICAgICB0aXRsZT1cIiR7IFwiUm93IE5hbWUgOiBcIiArIHV0aWxzLmdldEFjdHVhbE5hbWVXaXRob3V0VG9rZW5zKGMuYWN0dWFsX3Jvd19uYW1lKSArIFwiXFxuQ29sIE5hbWUgOiBcIiArIHV0aWxzLmdldEFjdHVhbE5hbWVXaXRob3V0VG9rZW5zKGMuYWN0dWFsX2NvbF9uYW1lKSArIFwiXFxuVmFsdWUgOiBcIiArIGMudmFsdWV9XCJcclxuICAgICAgICAgICAgPiR7Yy5kaXNwbGF5VmFsdWV9PC90ZD5gO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBib29tdGFibGVfb3V0cHV0X2JvZHlfb3V0cHV0ICs9IFwiPC90cj5cIjtcclxuICAgICAgICB9KTtcclxuICAgICAgICBib29tdGFibGVfb3V0cHV0X2JvZHkuaHRtbChib29tdGFibGVfb3V0cHV0X2JvZHlfb3V0cHV0KTtcclxuICAgICAgICAvLyBlbmRyZWdpb25cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgZHVwbGljYXRlS2V5VmFsdWVzID0gXy51bmlxKGtleXNfZm91bmQuZmlsdGVyKHYgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGtleXNfZm91bmQuZmlsdGVyKHQgPT4gdCA9PT0gdikubGVuZ3RoID4gMTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgdGhpcy50aHJvd0Vycm9yKFwiRHVwbGljYXRlIEtleXMgZm91bmRcIiwgXCJEdXBsaWNhdGUga2V5cyA6IDxici8+XCIgKyBcIkR1cGxpY2F0ZSBrZXkgdmFsdWVzIDogPGJyLz5cIiArIGR1cGxpY2F0ZUtleVZhbHVlcy5qb2luKFwiPGJyLz4gXCIpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gcmVnaW9uIERlYnVnIHRhYmxlIGJvZHkgY29uc3RydWN0aW9uXHJcbiAgICAgIGxldCBib29tdGFibGVfb3V0cHV0X2JvZHlfZGVidWcgPSB0aGlzLmVsZW0uZmluZCgnI2Jvb210YWJsZV9vdXRwdXRfYm9keV9kZWJ1ZycpO1xyXG4gICAgICBsZXQgYm9vbXRhYmxlX291dHB1dF9ib2R5X2RlYnVnX291dHB1dCA9IGBgO1xyXG4gICAgICBfLmVhY2goZGF0YUNvbXB1dGVkLCBkID0+IHtcclxuICAgICAgICBib29tdGFibGVfb3V0cHV0X2JvZHlfZGVidWdfb3V0cHV0ICs9IGBcclxuICAgICAgICA8dHI+XHJcbiAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDtcIiB3aWR0aD1cIjQwJVwiPiR7ZC5hbGlhc308L3RkPlxyXG4gICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7XCI+JHtkLnBhdHRlcm4ucGF0dGVybiB8fCBcIkRlZmF1bHRcIn08L3RkPlxyXG4gICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7YmFja2dyb3VuZC1jb2xvcjoke2QuYmdDb2xvcn1cIj4ke2QuZGlzcGxheVZhbHVlfTwvdGQ+XHJcbiAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDtcIj4ke2Qucm93X25hbWV9PC90ZD5cclxuICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O1wiPiR7ZC5jb2xfbmFtZX08L3RkPlxyXG4gICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7XCI+JHtkLnRocmVzaG9sZHN9PC90ZD5cclxuICAgICAgICA8L3RyPlxyXG4gICAgICAgIGA7XHJcbiAgICAgIH0pO1xyXG4gICAgICBib29tdGFibGVfb3V0cHV0X2JvZHlfZGVidWcuaHRtbChib29tdGFibGVfb3V0cHV0X2JvZHlfZGVidWdfb3V0cHV0KTtcclxuICAgICAgLy8gZW5kcmVnaW9uXHJcbiAgICB9XHJcbiAgICBsZXQgcm9vdEVsZW0gPSB0aGlzLmVsZW0uZmluZCgnLnRhYmxlLXBhbmVsLXNjcm9sbCcpO1xyXG4gICAgbGV0IG1heGhlaWdodG9mcGFuZWwgPSB0aGlzLnBhbmVsLmRlYnVnX21vZGUgPyB0aGlzLmN0cmwuaGVpZ2h0IC0gNzEgOiB0aGlzLmN0cmwuaGVpZ2h0IC0gMzE7XHJcbiAgICByb290RWxlbS5jc3MoeyAnbWF4LWhlaWdodCc6IG1heGhlaWdodG9mcGFuZWwgKyBcInB4XCIgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IHtcclxuICBHcmFmYW5hQm9vbVRhYmxlQ3RybCBhcyBQYW5lbEN0cmxcclxufTtcclxuIl19