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
                GrafanaBoomTableCtrl.prototype.limitText = function (text, maxlength) {
                    if (text.split('').length > maxlength) {
                        text = text.substring(0, maxlength - 3) + "...";
                    }
                    return text;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFXQSxtQkFBYSxDQUFDO2dCQUNaLElBQUksRUFBRSxhQUFXLGtCQUFTLDBCQUF1QjtnQkFDakQsS0FBSyxFQUFFLGFBQVcsa0JBQVMsMkJBQXdCO2FBQ3BELENBQUMsQ0FBQzs7Z0JBRWdDLHdDQUFnQjtnQkFRakQsOEJBQVksTUFBTSxFQUFFLFNBQVM7b0JBQTdCLFlBQ0Usa0JBQU0sTUFBTSxFQUFFLFNBQVMsQ0FBQyxTQU16QjtvQkFiTSxpQkFBVyxHQUFRLGFBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDeEMsc0JBQWdCLEdBQVcsMkJBQWtCLENBQUM7b0JBT25ELGdCQUFDLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsZUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUM3QyxLQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsSUFBSSxvQkFBYyxDQUFDO29CQUN4RSxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDeEIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ2hFLEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUM7O2dCQUNuRSxDQUFDO2dCQUNNLDZDQUFjLEdBQXJCO29CQUNFLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLG9CQUFrQixrQkFBUyw0QkFBeUIsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFD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LG9EQUNWLENBQUMsQ0FBQyxRQUFRLG9EQUNWLENBQUMsQ0FBQyxVQUFVLG1DQUV4QyxDQUFDO3dCQUNKLENBQUMsQ0FBQyxDQUFDO3dCQUNILDJCQUEyQixDQUFDLElBQUksQ0FBQyxvQ0FBa0MsQ0FBQyxDQUFDO3FCQUV0RTtvQkFDRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO29CQUNyRCxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztvQkFDN0YsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2lCQUN6RDtZQUNILENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uL25vZGVfbW9kdWxlcy9ncmFmYW5hLXNkay1tb2Nrcy9hcHAvaGVhZGVycy9jb21tb24uZC50c1wiIC8+XHJcblxyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBrYm4gZnJvbSAnYXBwL2NvcmUvdXRpbHMva2JuJztcclxuaW1wb3J0IHsgbG9hZFBsdWdpbkNzcywgTWV0cmljc1BhbmVsQ3RybCB9IGZyb20gXCJhcHAvcGx1Z2lucy9zZGtcIjtcclxuaW1wb3J0IFRpbWVTZXJpZXMgZnJvbSBcImFwcC9jb3JlL3RpbWVfc2VyaWVzMlwiO1xyXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiLi9hcHAvdXRpbHNcIjtcclxuaW1wb3J0IHsgZGVmYXVsdFBhdHRlcm4gfSBmcm9tIFwiLi9hcHAvYXBwXCI7XHJcbmltcG9ydCB7IHBsdWdpbl9pZCwgdmFsdWVfbmFtZV9vcHRpb25zLCBjb25maWcgfSBmcm9tIFwiLi9hcHAvY29uZmlnXCI7XHJcbmltcG9ydCB7IEJvb21UYWJsZVBhdHRlcm4gfSBmcm9tIFwiLi9hcHAvQm9vbVRhYmxlUGF0dGVyblwiO1xyXG5cclxubG9hZFBsdWdpbkNzcyh7XHJcbiAgZGFyazogYHBsdWdpbnMvJHtwbHVnaW5faWR9L2Nzcy9kZWZhdWx0LmRhcmsuY3NzYCxcclxuICBsaWdodDogYHBsdWdpbnMvJHtwbHVnaW5faWR9L2Nzcy9kZWZhdWx0LmxpZ2h0LmNzc2BcclxufSk7XHJcblxyXG5jbGFzcyBHcmFmYW5hQm9vbVRhYmxlQ3RybCBleHRlbmRzIE1ldHJpY3NQYW5lbEN0cmwge1xyXG4gIHB1YmxpYyBzdGF0aWMgdGVtcGxhdGVVcmwgPSBcInBhcnRpYWxzL21vZHVsZS5odG1sXCI7XHJcbiAgcHVibGljIHVuaXRGb3JtYXRzOiBhbnkgPSBrYm4uZ2V0VW5pdEZvcm1hdHMoKTtcclxuICBwdWJsaWMgdmFsdWVOYW1lT3B0aW9uczogT2JqZWN0ID0gdmFsdWVfbmFtZV9vcHRpb25zO1xyXG4gIHB1YmxpYyBkYXRhUmVjZWl2ZWQ6IGFueTtcclxuICBwdWJsaWMgY3RybDogYW55O1xyXG4gIHB1YmxpYyBlbGVtOiBhbnk7XHJcbiAgcHVibGljIGF0dHJzOiBhbnk7XHJcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkaW5qZWN0b3IpIHtcclxuICAgIHN1cGVyKCRzY29wZSwgJGluamVjdG9yKTtcclxuICAgIF8uZGVmYXVsdHModGhpcy5wYW5lbCwgY29uZmlnLnBhbmVsRGVmYXVsdHMpO1xyXG4gICAgdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybiA9IHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4gfHwgZGVmYXVsdFBhdHRlcm47XHJcbiAgICB0aGlzLnVwZGF0ZVByb3RvdHlwZXMoKTtcclxuICAgIHRoaXMuZXZlbnRzLm9uKFwiZGF0YS1yZWNlaXZlZFwiLCB0aGlzLm9uRGF0YVJlY2VpdmVkLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5ldmVudHMub24oXCJpbml0LWVkaXQtbW9kZVwiLCB0aGlzLm9uSW5pdEVkaXRNb2RlLmJpbmQodGhpcykpO1xyXG4gIH1cclxuICBwdWJsaWMgb25Jbml0RWRpdE1vZGUoKSB7XHJcbiAgICB0aGlzLmFkZEVkaXRvclRhYihcIlBhdHRlcm5zXCIsIGBwdWJsaWMvcGx1Z2lucy8ke3BsdWdpbl9pZH0vcGFydGlhbHMvcGF0dGVybnMuaHRtbGAsIDIpO1xyXG4gICAgdGhpcy5hZGRFZGl0b3JUYWIoXCJUaW1lIGJhc2VkIHRocmVzaG9sZHMgJiBGaWx0ZXJzXCIsIGBwdWJsaWMvcGx1Z2lucy8ke3BsdWdpbl9pZH0vcGFydGlhbHMvcGF0dGVybnMtYWR2YW5jZWQtb3B0aW9ucy5odG1sYCwgMyk7XHJcbiAgICB0aGlzLmFkZEVkaXRvclRhYihcIk9wdGlvbnNcIiwgYHB1YmxpYy9wbHVnaW5zLyR7cGx1Z2luX2lkfS9wYXJ0aWFscy9vcHRpb25zLmh0bWxgLCA0KTtcclxuICB9XHJcbiAgcHVibGljIG9uRGF0YVJlY2VpdmVkKGRhdGEpIHtcclxuICAgIHRoaXMuZGF0YVJlY2VpdmVkID0gZGF0YTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyBhZGRQYXR0ZXJuKCkge1xyXG4gICAgbGV0IG5ld1BhdHRlcm4gPSBuZXcgQm9vbVRhYmxlUGF0dGVybih7XHJcbiAgICAgIHJvd19jb2xfd3JhcHBlcjogdGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXJcclxuICAgIH0pO1xyXG4gICAgdGhpcy5wYW5lbC5wYXR0ZXJucy5wdXNoKG5ld1BhdHRlcm4pO1xyXG4gICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCAtIDE7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwdWJsaWMgbW92ZVBhdHRlcm4oZGlyZWN0aW9uLCBpbmRleCkge1xyXG4gICAgbGV0IHRlbXBFbGVtZW50ID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF07XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcIlVQXCIpIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0gPSB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4IC0gMV07XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXggLSAxXSA9IHRlbXBFbGVtZW50O1xyXG4gICAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9IGluZGV4IC0gMTtcclxuICAgIH1cclxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiRE9XTlwiKSB7XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleCArIDFdO1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4ICsgMV0gPSB0ZW1wRWxlbWVudDtcclxuICAgICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSBpbmRleCArIDE7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwdWJsaWMgcmVtb3ZlUGF0dGVybihpbmRleCkge1xyXG4gICAgdGhpcy5wYW5lbC5wYXR0ZXJucy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSAodGhpcy5wYW5lbC5wYXR0ZXJucyAmJiB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCA+IDApID8gKHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoIC0gMSkgOiAtMTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyBjbG9uZVBhdHRlcm4oaW5kZXgpIHtcclxuICAgIGxldCBjb3BpZWRQYXR0ZXJuID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0pO1xyXG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGNvcGllZFBhdHRlcm4sIEJvb21UYWJsZVBhdHRlcm4ucHJvdG90eXBlKTtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMucHVzaChjb3BpZWRQYXR0ZXJuKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyBsaW1pdFRleHQodGV4dCwgbWF4bGVuZ3RoKSB7XHJcbiAgICBpZiAodGV4dC5zcGxpdCgnJykubGVuZ3RoID4gbWF4bGVuZ3RoKSB7XHJcbiAgICAgIHRleHQgPSB0ZXh0LnN1YnN0cmluZygwLCBtYXhsZW5ndGggLSAzKSArIFwiLi4uXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGV4dDtcclxuICB9XHJcbiAgcHVibGljIGxpbmsoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsKSB7XHJcbiAgICB0aGlzLnNjb3BlID0gc2NvcGU7XHJcbiAgICB0aGlzLmVsZW0gPSBlbGVtO1xyXG4gICAgdGhpcy5hdHRycyA9IGF0dHJzO1xyXG4gICAgdGhpcy5jdHJsID0gY3RybDtcclxuICB9XHJcbiAgcHJpdmF0ZSB1cGRhdGVQcm90b3R5cGVzKCkge1xyXG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4sIEJvb21UYWJsZVBhdHRlcm4ucHJvdG90eXBlKTtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMubWFwKHBhdHRlcm4gPT4ge1xyXG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YocGF0dGVybiwgQm9vbVRhYmxlUGF0dGVybi5wcm90b3R5cGUpO1xyXG4gICAgICByZXR1cm4gcGF0dGVybjtcclxuICAgIH0pO1xyXG4gIH1cclxuICBwdWJsaWMgc2VyaWVzSGFuZGxlcihzZXJpZXNEYXRhKSB7XHJcbiAgICBsZXQgc2VyaWVzID0gbmV3IFRpbWVTZXJpZXMoe1xyXG4gICAgICBhbGlhczogc2VyaWVzRGF0YS50YXJnZXQsXHJcbiAgICAgIGRhdGFwb2ludHM6IHNlcmllc0RhdGEuZGF0YXBvaW50cyB8fCBbXVxyXG4gICAgfSk7XHJcbiAgICBzZXJpZXMuZmxvdHBhaXJzID0gc2VyaWVzLmdldEZsb3RQYWlycyh0aGlzLnBhbmVsLm51bGxQb2ludE1vZGUpO1xyXG4gICAgcmV0dXJuIHNlcmllcztcclxuICB9XHJcbiAgcHVibGljIGNvbXB1dGVCZ0NvbG9yKHRocmVzaG9sZHMsIGJnQ29sb3JzLCB2YWx1ZSkge1xyXG4gICAgbGV0IGMgPSBcInRyYW5zcGFyZW50XCI7XHJcbiAgICBpZiAodGhyZXNob2xkcyAmJiBiZ0NvbG9ycyAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgJiYgdGhyZXNob2xkcy5sZW5ndGggKyAxIDw9IGJnQ29sb3JzLmxlbmd0aCkge1xyXG4gICAgICBiZ0NvbG9ycyA9IF8uZHJvcFJpZ2h0KGJnQ29sb3JzLCBiZ0NvbG9ycy5sZW5ndGggLSB0aHJlc2hvbGRzLmxlbmd0aCAtIDEpO1xyXG4gICAgICBpZiAoYmdDb2xvcnNbYmdDb2xvcnMubGVuZ3RoIC0gMV0gPT09IFwiXCIpIHtcclxuICAgICAgICBiZ0NvbG9yc1tiZ0NvbG9ycy5sZW5ndGggLSAxXSA9IFwidHJhbnNwYXJlbnRcIjtcclxuICAgICAgfVxyXG4gICAgICBmb3IgKGxldCBpID0gdGhyZXNob2xkcy5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcclxuICAgICAgICBpZiAodmFsdWUgPj0gdGhyZXNob2xkc1tpIC0gMV0pIHtcclxuICAgICAgICAgIHJldHVybiB1dGlscy5ub3JtYWxpemVDb2xvcihiZ0NvbG9yc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB1dGlscy5ub3JtYWxpemVDb2xvcihfLmZpcnN0KGJnQ29sb3JzKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYztcclxuICB9XHJcbiAgcHVibGljIHRyYW5zZm9ybVZhbHVlKHRocmVzaG9sZHMsIHRyYW5zZm9ybV92YWx1ZXMsIHZhbHVlLCBkaXNwbGF5VmFsdWUsIHJvd19uYW1lLCBjb2xfbmFtZSkge1xyXG4gICAgbGV0IHQgPSB2YWx1ZTtcclxuICAgIGlmICh0aHJlc2hvbGRzICYmIHRyYW5zZm9ybV92YWx1ZXMgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmIHRocmVzaG9sZHMubGVuZ3RoICsgMSA8PSB0cmFuc2Zvcm1fdmFsdWVzLmxlbmd0aCkge1xyXG4gICAgICB0cmFuc2Zvcm1fdmFsdWVzID0gXy5kcm9wUmlnaHQodHJhbnNmb3JtX3ZhbHVlcywgdHJhbnNmb3JtX3ZhbHVlcy5sZW5ndGggLSB0aHJlc2hvbGRzLmxlbmd0aCAtIDEpO1xyXG4gICAgICBpZiAodHJhbnNmb3JtX3ZhbHVlc1t0cmFuc2Zvcm1fdmFsdWVzLmxlbmd0aCAtIDFdID09PSBcIlwiKSB7XHJcbiAgICAgICAgdHJhbnNmb3JtX3ZhbHVlc1t0cmFuc2Zvcm1fdmFsdWVzLmxlbmd0aCAtIDFdID0gXCJfdmFsdWVfXCI7XHJcbiAgICAgIH1cclxuICAgICAgZm9yIChsZXQgaSA9IHRocmVzaG9sZHMubGVuZ3RoOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlID49IHRocmVzaG9sZHNbaSAtIDFdKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJhbnNmb3JtX3ZhbHVlc1tpXS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfdmFsdWVfXCIsIFwiZ1wiKSwgZGlzcGxheVZhbHVlKS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfcm93X25hbWVfXCIsIFwiZ1wiKSwgcm93X25hbWUpLnJlcGxhY2UobmV3IFJlZ0V4cChcIl9jb2xfbmFtZV9cIiwgXCJnXCIpLCBjb2xfbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBfLmZpcnN0KHRyYW5zZm9ybV92YWx1ZXMpLnJlcGxhY2UobmV3IFJlZ0V4cChcIl92YWx1ZV9cIiwgXCJnXCIpLCBkaXNwbGF5VmFsdWUpLnJlcGxhY2UobmV3IFJlZ0V4cChcIl9yb3dfbmFtZV9cIiwgXCJnXCIpLCByb3dfbmFtZSkucmVwbGFjZShuZXcgUmVnRXhwKFwiX2NvbF9uYW1lX1wiLCBcImdcIiksIGNvbF9uYW1lKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0O1xyXG4gIH1cclxuICBwdWJsaWMgZ2V0RGVjaW1hbHNGb3JWYWx1ZSh2YWx1ZSwgX2RlY2ltYWxzKSB7XHJcbiAgICBpZiAoXy5pc051bWJlcigrX2RlY2ltYWxzKSkge1xyXG4gICAgICBsZXQgbzogT2JqZWN0ID0ge1xyXG4gICAgICAgIGRlY2ltYWxzOiBfZGVjaW1hbHMsXHJcbiAgICAgICAgc2NhbGVkRGVjaW1hbHM6IG51bGxcclxuICAgICAgfTtcclxuICAgICAgcmV0dXJuIG87XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGRlbHRhID0gdmFsdWUgLyAyO1xyXG4gICAgbGV0IGRlYyA9IC1NYXRoLmZsb29yKE1hdGgubG9nKGRlbHRhKSAvIE1hdGguTE4xMCk7XHJcblxyXG4gICAgbGV0IG1hZ24gPSBNYXRoLnBvdygxMCwgLWRlYyksXHJcbiAgICAgIG5vcm0gPSBkZWx0YSAvIG1hZ24sIC8vIG5vcm0gaXMgYmV0d2VlbiAxLjAgYW5kIDEwLjBcclxuICAgICAgc2l6ZTtcclxuXHJcbiAgICBpZiAobm9ybSA8IDEuNSkge1xyXG4gICAgICBzaXplID0gMTtcclxuICAgIH0gZWxzZSBpZiAobm9ybSA8IDMpIHtcclxuICAgICAgc2l6ZSA9IDI7XHJcbiAgICAgIC8vIHNwZWNpYWwgY2FzZSBmb3IgMi41LCByZXF1aXJlcyBhbiBleHRyYSBkZWNpbWFsXHJcbiAgICAgIGlmIChub3JtID4gMi4yNSkge1xyXG4gICAgICAgIHNpemUgPSAyLjU7XHJcbiAgICAgICAgKytkZWM7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAobm9ybSA8IDcuNSkge1xyXG4gICAgICBzaXplID0gNTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNpemUgPSAxMDtcclxuICAgIH1cclxuXHJcbiAgICBzaXplICo9IG1hZ247XHJcblxyXG4gICAgLy8gcmVkdWNlIHN0YXJ0aW5nIGRlY2ltYWxzIGlmIG5vdCBuZWVkZWRcclxuICAgIGlmIChNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWUpIHtcclxuICAgICAgZGVjID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmVzdWx0OiBPYmplY3QgPSB7XHJcbiAgICAgIGRlY2ltYWxzOiBNYXRoLm1heCgwLCBkZWMpLFxyXG4gICAgICBzY2FsZWREZWNpbWFsczogTWF0aC5tYXgoMCwgZGVjKSAtIE1hdGguZmxvb3IoTWF0aC5sb2coc2l6ZSkgLyBNYXRoLkxOMTApICsgMlxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuICBwdWJsaWMgdGhyb3dFcnJvcih0aXRsZSwgbWVzc2FnZSkge1xyXG4gICAgbGV0IGVyciA9IG5ldyBFcnJvcigpO1xyXG4gICAgZXJyLm5hbWUgPSB0aXRsZTtcclxuICAgIGVyci5tZXNzYWdlID0gbWVzc2FnZTtcclxuICAgIHRoaXMucGFuZWwuZXJyb3IgPSBlcnI7XHJcbiAgfVxyXG4gIHB1YmxpYyBjbGVhckVycm9yKCkge1xyXG4gICAgdGhpcy5wYW5lbC5lcnJvciA9IHVuZGVmaW5lZDtcclxuICB9XHJcbn1cclxuXHJcbkdyYWZhbmFCb29tVGFibGVDdHJsLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgdGhpcy5jbGVhckVycm9yKCk7XHJcbiAgaWYgKHRoaXMuZGF0YVJlY2VpdmVkKSB7XHJcbiAgICBsZXQgZGF0YUNvbXB1dGVkID0gdGhpcy5kYXRhUmVjZWl2ZWQ7XHJcbiAgICB0aGlzLnBhbmVsLmRlZmF1bHRfdGl0bGVfZm9yX3Jvd3MgPSB0aGlzLnBhbmVsLmRlZmF1bHRfdGl0bGVfZm9yX3Jvd3MgfHwgY29uZmlnLmRlZmF1bHRfdGl0bGVfZm9yX3Jvd3M7XHJcbiAgICBjb25zdCBtZXRyaWNzUmVjZWl2ZWQgPSB1dGlscy5nZXRGaWVsZHMoZGF0YUNvbXB1dGVkLCBcInRhcmdldFwiKTtcclxuICAgIGlmIChtZXRyaWNzUmVjZWl2ZWQubGVuZ3RoICE9PSBfLnVuaXEobWV0cmljc1JlY2VpdmVkKS5sZW5ndGgpIHtcclxuICAgICAgbGV0IGR1cGxpY2F0ZUtleXMgPSBfLnVuaXEobWV0cmljc1JlY2VpdmVkLmZpbHRlcih2ID0+IHtcclxuICAgICAgICByZXR1cm4gbWV0cmljc1JlY2VpdmVkLmZpbHRlcih0ID0+IHQgPT09IHYpLmxlbmd0aCA+IDE7XHJcbiAgICAgIH0pKTtcclxuICAgICAgdGhpcy50aHJvd0Vycm9yKFwiRHVwbGljYXRlIGRhdGEgcmVjZWl2ZWRcIiwgXCJEdXBsaWNhdGUga2V5cyA6IDxici8+XCIgKyBkdXBsaWNhdGVLZXlzLmpvaW4oXCI8YnIvPiBcIikpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jbGVhckVycm9yKCk7XHJcbiAgICAgIC8vIEJpbmRpbmcgdGhlIGdyYWZhbmEgY29tcHV0YXRpb25zIHRvIHRoZSBtZXRyaWNzIHJlY2VpdmVkXHJcbiAgICAgIGRhdGFDb21wdXRlZCA9IGRhdGFDb21wdXRlZC5tYXAodGhpcy5zZXJpZXNIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4gICAgICAvLyBHZXQgU2VydmVyIFRpbWUgU3RhbXAgb2YgdGhlIFNlcmllcyBmb3IgdGltZSBiYXNlZCB0aHJlc2hvbGRzLlxyXG4gICAgICBkYXRhQ29tcHV0ZWQgPSBkYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgc2VyaWVzLmN1cnJlbnRfc2VydmVydGltZXN0YW1wID0gbmV3IERhdGUoKTtcclxuICAgICAgICBpZiAoc2VyaWVzICYmIHNlcmllcy5kYXRhcG9pbnRzICYmIHNlcmllcy5kYXRhcG9pbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGlmIChfLmxhc3Qoc2VyaWVzLmRhdGFwb2ludHMpLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICBzZXJpZXMuY3VycmVudF9zZXJ2ZXJ0aW1lc3RhbXAgPSBuZXcgRGF0ZShfLmxhc3Qoc2VyaWVzLmRhdGFwb2ludHMpWzFdKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIEFzc2lnbiBwYXR0ZXJuXHJcbiAgICAgIGRhdGFDb21wdXRlZCA9IGRhdGFDb21wdXRlZC5tYXAoc2VyaWVzID0+IHtcclxuICAgICAgICBzZXJpZXMucGF0dGVybiA9IF8uZmluZCh0aGlzLnBhbmVsLnBhdHRlcm5zLmZpbHRlcihwID0+IHsgcmV0dXJuIHAuZGlzYWJsZWQgIT09IHRydWU7IH0pLCBmdW5jdGlvbiAocCkge1xyXG4gICAgICAgICAgcmV0dXJuIHNlcmllcy5hbGlhcy5tYXRjaChwLnBhdHRlcm4pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChzZXJpZXMucGF0dGVybiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBzZXJpZXMucGF0dGVybiA9IHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4gfHwgZGVmYXVsdFBhdHRlcm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBBc3NpZ24gRGVjaW1hbCBWYWx1ZXNcclxuICAgICAgZGF0YUNvbXB1dGVkID0gZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy5kZWNpbWFscyA9IChzZXJpZXMucGF0dGVybi5kZWNpbWFscykgfHwgZGVmYXVsdFBhdHRlcm4uZGVjaW1hbHM7XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIEFzc2lnbiB2YWx1ZVxyXG4gICAgICBkYXRhQ29tcHV0ZWQgPSBkYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgaWYgKHNlcmllcy5zdGF0cykge1xyXG4gICAgICAgICAgc2VyaWVzLnZhbHVlID0gc2VyaWVzLnN0YXRzW3Nlcmllcy5wYXR0ZXJuLnZhbHVlTmFtZV07XHJcbiAgICAgICAgICBsZXQgZGVjaW1hbEluZm86IGFueSA9IHRoaXMuZ2V0RGVjaW1hbHNGb3JWYWx1ZShzZXJpZXMudmFsdWUsIHNlcmllcy5kZWNpbWFscyk7XHJcbiAgICAgICAgICBsZXQgZm9ybWF0RnVuYyA9IGtibi52YWx1ZUZvcm1hdHNbc2VyaWVzLnBhdHRlcm4uZm9ybWF0XTtcclxuICAgICAgICAgIGlmIChzZXJpZXMudmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgc2VyaWVzLmRpc3BsYXlWYWx1ZSA9IHNlcmllcy5wYXR0ZXJuLm51bGxfdmFsdWUgfHwgXCJOdWxsXCI7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKCFpc05hTihzZXJpZXMudmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHNlcmllcy52YWx1ZUZvcm1hdHRlZCA9IGZvcm1hdEZ1bmMoc2VyaWVzLnZhbHVlLCBkZWNpbWFsSW5mby5kZWNpbWFscywgZGVjaW1hbEluZm8uc2NhbGVkRGVjaW1hbHMpO1xyXG4gICAgICAgICAgICBzZXJpZXMudmFsdWVSb3VuZGVkID0ga2JuLnJvdW5kVmFsdWUoc2VyaWVzLnZhbHVlLCBkZWNpbWFsSW5mby5kZWNpbWFscyk7XHJcbiAgICAgICAgICAgIHNlcmllcy5kaXNwbGF5VmFsdWUgPSBzZXJpZXMudmFsdWVGb3JtYXR0ZWQ7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZXJpZXMuZGlzcGxheVZhbHVlID0gc2VyaWVzLnBhdHRlcm4ubnVsbF92YWx1ZSB8fCBcIk51bGxcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIEZpbHRlciBWYWx1ZXNcclxuICAgICAgZGF0YUNvbXB1dGVkID0gZGF0YUNvbXB1dGVkLmZpbHRlcihzZXJpZXMgPT4ge1xyXG4gICAgICAgIGlmICghc2VyaWVzLnBhdHRlcm4uZmlsdGVyKSB7XHJcbiAgICAgICAgICBzZXJpZXMucGF0dGVybi5maWx0ZXIgPSB7fTtcclxuICAgICAgICAgIHNlcmllcy5wYXR0ZXJuLmZpbHRlci52YWx1ZV9iZWxvdyA9IFwiXCI7XHJcbiAgICAgICAgICBzZXJpZXMucGF0dGVybi5maWx0ZXIudmFsdWVfYWJvdmUgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2VyaWVzLnBhdHRlcm4gJiYgc2VyaWVzLnBhdHRlcm4uZmlsdGVyICYmIChzZXJpZXMucGF0dGVybi5maWx0ZXIudmFsdWVfYmVsb3cgIT09IFwiXCIgfHwgc2VyaWVzLnBhdHRlcm4uZmlsdGVyLnZhbHVlX2Fib3ZlICE9PSBcIlwiKSkge1xyXG4gICAgICAgICAgaWYgKHNlcmllcy5wYXR0ZXJuLmZpbHRlci52YWx1ZV9iZWxvdyAhPT0gXCJcIiAmJiBzZXJpZXMudmFsdWUgPCArKHNlcmllcy5wYXR0ZXJuLmZpbHRlci52YWx1ZV9iZWxvdykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHNlcmllcy5wYXR0ZXJuLmZpbHRlci52YWx1ZV9hYm92ZSAhPT0gXCJcIiAmJiBzZXJpZXMudmFsdWUgPiArKHNlcmllcy5wYXR0ZXJuLmZpbHRlci52YWx1ZV9hYm92ZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIC8vIEFzc2lnbiBSb3cgTmFtZVxyXG4gICAgICBkYXRhQ29tcHV0ZWQgPSBkYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgc2VyaWVzLnJvd19uYW1lID0gc2VyaWVzLnBhdHRlcm4ucm93X25hbWUgfHwgZGVmYXVsdFBhdHRlcm4ucm93X25hbWU7XHJcbiAgICAgICAgc2VyaWVzLnJvd19uYW1lID0gc2VyaWVzLnJvd19uYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlciArIFwic2VyaWVzXCIgKyB0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlciwgXCJnXCIpLCBzZXJpZXMuYWxpYXMpO1xyXG4gICAgICAgIHNlcmllcy5yb3dfbmFtZSA9IHNlcmllcy5hbGlhcy5zcGxpdChzZXJpZXMucGF0dGVybi5kZWxpbWl0ZXIgfHwgXCIuXCIpLnJlZHVjZSgociwgaXQsIGkpID0+IHtcclxuICAgICAgICAgIHJldHVybiByLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlciArIGkgKyB0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlciwgXCJnXCIpLCBpdCk7XHJcbiAgICAgICAgfSwgc2VyaWVzLnJvd19uYW1lKTtcclxuICAgICAgICBpZiAoc2VyaWVzLmFsaWFzLnNwbGl0KHNlcmllcy5wYXR0ZXJuLmRlbGltaXRlciB8fCBcIi5cIikubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICBzZXJpZXMucm93X25hbWUgPSBzZXJpZXMuYWxpYXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBBc3NpZ24gQ29sIE5hbWVcclxuICAgICAgZGF0YUNvbXB1dGVkID0gZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy5jb2xfbmFtZSA9IHNlcmllcy5wYXR0ZXJuLmNvbF9uYW1lIHx8IGRlZmF1bHRQYXR0ZXJuLmNvbF9uYW1lO1xyXG4gICAgICAgIHNlcmllcy5jb2xfbmFtZSA9IHNlcmllcy5hbGlhcy5zcGxpdChzZXJpZXMucGF0dGVybi5kZWxpbWl0ZXIgfHwgXCIuXCIpLnJlZHVjZSgociwgaXQsIGkpID0+IHtcclxuICAgICAgICAgIHJldHVybiByLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlciArIGkgKyB0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlciwgXCJnXCIpLCBpdCk7XHJcbiAgICAgICAgfSwgc2VyaWVzLmNvbF9uYW1lKTtcclxuICAgICAgICBpZiAoc2VyaWVzLmFsaWFzLnNwbGl0KHNlcmllcy5wYXR0ZXJuLmRlbGltaXRlciB8fCBcIi5cIikubGVuZ3RoID09PSAxIHx8IHNlcmllcy5yb3dfbmFtZSA9PT0gc2VyaWVzLmFsaWFzKSB7XHJcbiAgICAgICAgICBzZXJpZXMuY29sX25hbWUgPSBzZXJpZXMucGF0dGVybi5jb2xfbmFtZSB8fCBcIlZhbHVlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBBc3NpZ24gUm93Q29sIEtleVxyXG4gICAgICBkYXRhQ29tcHV0ZWQgPSBkYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgc2VyaWVzLmtleV9uYW1lID0gc2VyaWVzLnJvd19uYW1lICsgXCIjXCIgKyBzZXJpZXMuY29sX25hbWU7XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIEFzc2lnbiBUaHJlc2hvbGRzXHJcbiAgICAgIGRhdGFDb21wdXRlZCA9IGRhdGFDb21wdXRlZC5tYXAoc2VyaWVzID0+IHtcclxuICAgICAgICBzZXJpZXMudGhyZXNob2xkcyA9IChzZXJpZXMucGF0dGVybi50aHJlc2hvbGRzIHx8IGRlZmF1bHRQYXR0ZXJuLnRocmVzaG9sZHMpLnNwbGl0KFwiLFwiKS5tYXAoZCA9PiArZCk7XHJcbiAgICAgICAgaWYgKHNlcmllcy5wYXR0ZXJuLmVuYWJsZV90aW1lX2Jhc2VkX3RocmVzaG9sZHMpIHtcclxuICAgICAgICAgIGxldCBtZXRyaWNyZWNpdmVkVGltZVN0YW1wID0gc2VyaWVzLmN1cnJlbnRfc2VydmVydGltZXN0YW1wIHx8IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICBsZXQgbWV0cmljcmVjaXZlZFRpbWVTdGFtcF9pbm51bWJlciA9IG1ldHJpY3JlY2l2ZWRUaW1lU3RhbXAuZ2V0SG91cnMoKSAqIDEwMCArIG1ldHJpY3JlY2l2ZWRUaW1lU3RhbXAuZ2V0TWludXRlcygpO1xyXG4gICAgICAgICAgbGV0IHdlZWtkYXlzID0gW1wic3VuXCIsIFwibW9uXCIsIFwidHVlXCIsIFwid2VkXCIsIFwidGh1XCIsIFwiZnJpXCIsIFwic2F0XCJdO1xyXG4gICAgICAgICAgXy5lYWNoKHNlcmllcy5wYXR0ZXJuLnRpbWVfYmFzZWRfdGhyZXNob2xkcywgKHRidHgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRidHggJiYgdGJ0eC5mcm9tICYmIHRidHgudG8gJiYgdGJ0eC5lbmFibGVkRGF5cyAmJlxyXG4gICAgICAgICAgICAgIChtZXRyaWNyZWNpdmVkVGltZVN0YW1wX2lubnVtYmVyID49ICsodGJ0eC5mcm9tKSkgJiZcclxuICAgICAgICAgICAgICAobWV0cmljcmVjaXZlZFRpbWVTdGFtcF9pbm51bWJlciA8PSArKHRidHgudG8pKSAmJlxyXG4gICAgICAgICAgICAgICh0YnR4LmVuYWJsZWREYXlzLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih3ZWVrZGF5c1ttZXRyaWNyZWNpdmVkVGltZVN0YW1wLmdldERheSgpXSkgPiAtMSkgJiZcclxuICAgICAgICAgICAgICB0YnR4LnRocmVzaG9sZFxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICBzZXJpZXMudGhyZXNob2xkcyA9ICh0YnR4LnRocmVzaG9sZCArIFwiXCIpLnNwbGl0KFwiLFwiKS5tYXAoZCA9PiArZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gQXNzaWduIEJHIENvbG9yc1xyXG4gICAgICBkYXRhQ29tcHV0ZWQgPSBkYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgbGV0IGJnQ29sb3JzID0gKHNlcmllcy5wYXR0ZXJuLmJnQ29sb3JzIHx8IGRlZmF1bHRQYXR0ZXJuLmJnQ29sb3JzKS5zcGxpdChcInxcIik7XHJcbiAgICAgICAgc2VyaWVzLmJnQ29sb3IgPSBzZXJpZXMucGF0dGVybi5lbmFibGVfYmdDb2xvciA9PT0gdHJ1ZSA/IHRoaXMuY29tcHV0ZUJnQ29sb3Ioc2VyaWVzLnRocmVzaG9sZHMsIGJnQ29sb3JzLCBzZXJpZXMudmFsdWUpIDogXCJ0cmFuc3BhcmVudFwiO1xyXG4gICAgICAgIGlmIChzZXJpZXMuZGlzcGxheVZhbHVlID09PSAoc2VyaWVzLnBhdHRlcm4ubnVsbF92YWx1ZSB8fCBkZWZhdWx0UGF0dGVybi5udWxsX3ZhbHVlIHx8IFwiTnVsbFwiKSkge1xyXG4gICAgICAgICAgc2VyaWVzLmJnQ29sb3IgPSBzZXJpZXMucGF0dGVybi5udWxsX2NvbG9yIHx8IGRlZmF1bHRQYXR0ZXJuLm51bGxfY29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBCRyBDb2xvcnMgb3ZlcnJpZGVzXHJcbiAgICAgIGRhdGFDb21wdXRlZCA9IGRhdGFDb21wdXRlZC5tYXAoc2VyaWVzID0+IHtcclxuICAgICAgICBpZiAoc2VyaWVzLnBhdHRlcm4uZW5hYmxlX2JnQ29sb3Jfb3ZlcnJpZGVzICYmIHNlcmllcy5wYXR0ZXJuLmJnQ29sb3JzX292ZXJyaWRlcyAhPT0gXCJcIikge1xyXG4gICAgICAgICAgbGV0IF9iZ0NvbG9yc19vdmVycmlkZXMgPSBzZXJpZXMucGF0dGVybi5iZ0NvbG9yc19vdmVycmlkZXMuc3BsaXQoXCJ8XCIpLmZpbHRlcihjb24gPT4gY29uLmluZGV4T2YoXCItPlwiKSkubWFwKGNvbiA9PiBjb24uc3BsaXQoXCItPlwiKSkuZmlsdGVyKGNvbiA9PiArKGNvblswXSkgPT09IHNlcmllcy52YWx1ZSkubWFwKGNvbiA9PiBjb25bMV0pO1xyXG4gICAgICAgICAgaWYgKF9iZ0NvbG9yc19vdmVycmlkZXMubGVuZ3RoID4gMCAmJiBfYmdDb2xvcnNfb3ZlcnJpZGVzWzBdICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHNlcmllcy5iZ0NvbG9yID0gdXRpbHMubm9ybWFsaXplQ29sb3IoKFwiXCIgKyBfYmdDb2xvcnNfb3ZlcnJpZGVzWzBdKS50cmltKCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gVmFsdWUgVHJhbnNmb3JtXHJcbiAgICAgIGRhdGFDb21wdXRlZCA9IGRhdGFDb21wdXRlZC5tYXAoc2VyaWVzID0+IHtcclxuICAgICAgICBsZXQgdHJhbnNmb3JtX3ZhbHVlcyA9IChzZXJpZXMucGF0dGVybi50cmFuc2Zvcm1fdmFsdWVzIHx8IGRlZmF1bHRQYXR0ZXJuLnRyYW5zZm9ybV92YWx1ZXMpLnNwbGl0KFwifFwiKTtcclxuICAgICAgICBzZXJpZXMuZGlzcGxheVZhbHVlID0gc2VyaWVzLnBhdHRlcm4uZW5hYmxlX3RyYW5zZm9ybSA9PT0gdHJ1ZSA/IHRoaXMudHJhbnNmb3JtVmFsdWUoc2VyaWVzLnRocmVzaG9sZHMsIHRyYW5zZm9ybV92YWx1ZXMsIHNlcmllcy52YWx1ZSwgc2VyaWVzLmRpc3BsYXlWYWx1ZSwgc2VyaWVzLnJvd19uYW1lLCBzZXJpZXMuY29sX25hbWUpIDogc2VyaWVzLmRpc3BsYXlWYWx1ZTtcclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gVmFsdWUgVHJhbnNmb3JtIE92ZXJyaWRlc1xyXG4gICAgICBkYXRhQ29tcHV0ZWQgPSBkYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgaWYgKHNlcmllcy5wYXR0ZXJuLmVuYWJsZV90cmFuc2Zvcm1fb3ZlcnJpZGVzICYmIHNlcmllcy5wYXR0ZXJuLnRyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzKSB7XHJcbiAgICAgICAgICBsZXQgX3RyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzID0gc2VyaWVzLnBhdHRlcm4udHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXMuc3BsaXQoXCJ8XCIpLmZpbHRlcihjb24gPT4gY29uLmluZGV4T2YoXCItPlwiKSkubWFwKGNvbiA9PiBjb24uc3BsaXQoXCItPlwiKSkuZmlsdGVyKGNvbiA9PiArKGNvblswXSkgPT09IHNlcmllcy52YWx1ZSkubWFwKGNvbiA9PiBjb25bMV0pO1xyXG4gICAgICAgICAgaWYgKF90cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlcy5sZW5ndGggPiAwICYmIF90cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlc1swXSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICBzZXJpZXMuZGlzcGxheVZhbHVlID0gKFwiXCIgKyBfdHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXNbMF0pLnRyaW0oKS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfdmFsdWVfXCIsIFwiZ1wiKSwgc2VyaWVzLmRpc3BsYXlWYWx1ZSkucmVwbGFjZShuZXcgUmVnRXhwKFwiX3Jvd19uYW1lX1wiLCBcImdcIiksIHNlcmllcy5yb3dfbmFtZSkucmVwbGFjZShuZXcgUmVnRXhwKFwiX2NvbF9uYW1lX1wiLCBcImdcIiksIHNlcmllcy5jb2xfbmFtZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBGb250IGF3ZXNvbWUgaWNvbnMgJiBJbWFnZXMgaW4gdmFsdWVcclxuICAgICAgZGF0YUNvbXB1dGVkID0gZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy5hY3R1YWxfZGlzcGxheXZhbHVlID0gc2VyaWVzLmRpc3BsYXlWYWx1ZTtcclxuICAgICAgICBzZXJpZXMuYWN0dWFsX3Jvd19uYW1lID0gc2VyaWVzLnJvd19uYW1lO1xyXG4gICAgICAgIHNlcmllcy5hY3R1YWxfY29sX25hbWUgPSBzZXJpZXMuY29sX25hbWU7XHJcbiAgICAgICAgc2VyaWVzLmRpc3BsYXlWYWx1ZSA9IHV0aWxzLnJlcGxhY2VUb2tlbnMoc2VyaWVzLmRpc3BsYXlWYWx1ZSk7XHJcbiAgICAgICAgc2VyaWVzLnJvd19uYW1lID0gdXRpbHMucmVwbGFjZVRva2VucyhzZXJpZXMucm93X25hbWUpO1xyXG4gICAgICAgIHNlcmllcy5jb2xfbmFtZSA9IHV0aWxzLnJlcGxhY2VUb2tlbnMoc2VyaWVzLmNvbF9uYW1lKTtcclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gQ2VsbCBMaW5rc1xyXG4gICAgICBkYXRhQ29tcHV0ZWQgPSBkYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgaWYgKHNlcmllcy5wYXR0ZXJuLmVuYWJsZV9jbGlja2FibGVfY2VsbHMpIHtcclxuICAgICAgICAgIGxldCB0YXJnZXRMaW5rID0gc2VyaWVzLnBhdHRlcm4uY2xpY2thYmxlX2NlbGxzX2xpbmsgfHwgXCIjXCI7XHJcbiAgICAgICAgICB0YXJnZXRMaW5rID0gdGFyZ2V0TGluay5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfcm93X25hbWVfXCIsIFwiZ1wiKSwgdXRpbHMuZ2V0QWN0dWFsTmFtZVdpdGhvdXRUb2tlbnMoc2VyaWVzLmFjdHVhbF9yb3dfbmFtZSkudHJpbSgpKTtcclxuICAgICAgICAgIHRhcmdldExpbmsgPSB0YXJnZXRMaW5rLnJlcGxhY2UobmV3IFJlZ0V4cChcIl9jb2xfbmFtZV9cIiwgXCJnXCIpLCB1dGlscy5nZXRBY3R1YWxOYW1lV2l0aG91dFRva2VucyhzZXJpZXMuYWN0dWFsX2NvbF9uYW1lKS50cmltKCkpO1xyXG4gICAgICAgICAgdGFyZ2V0TGluayA9IHRhcmdldExpbmsucmVwbGFjZShuZXcgUmVnRXhwKFwiX3ZhbHVlX1wiLCBcImdcIiksIHV0aWxzLmdldEFjdHVhbE5hbWVXaXRob3V0VG9rZW5zKHNlcmllcy52YWx1ZSkudHJpbSgpKTtcclxuICAgICAgICAgIHNlcmllcy5kaXNwbGF5VmFsdWUgPSBgPGEgaHJlZj1cIiR7dGFyZ2V0TGlua31cIiB0YXJnZXQ9XCJfYmxhbmtcIj4ke3Nlcmllcy5kaXNwbGF5VmFsdWV9PC9hPmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBIYW5kbGUgTnVsbCBWYWx1ZVxyXG4gICAgICBkYXRhQ29tcHV0ZWQgPSBkYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgaWYgKF8uaXNOYU4oc2VyaWVzLnZhbHVlKSB8fCBzZXJpZXMudmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgICAgIHNlcmllcy5iZ0NvbG9yID0gc2VyaWVzLnBhdHRlcm4ubnVsbF9jb2xvciB8fCBkZWZhdWx0UGF0dGVybi5udWxsX2NvbG9yIHx8IFwiZGFya3JlZFwiO1xyXG4gICAgICAgICAgc2VyaWVzLmRpc3BsYXlWYWx1ZSA9IHNlcmllcy5wYXR0ZXJuLm51bGxfdmFsdWUgfHwgZGVmYXVsdFBhdHRlcm4ubnVsbF92YWx1ZSB8fCBcIk5vIGRhdGFcIjtcclxuICAgICAgICAgIHNlcmllcy5kaXNwbGF5VmFsdWUgPSBzZXJpZXMuZGlzcGxheVZhbHVlLnJlcGxhY2UobmV3IFJlZ0V4cChcIl9zZXJpZXNfXCIsIFwiZ1wiKSwgc2VyaWVzLmFsaWFzKTtcclxuICAgICAgICAgIHNlcmllcy5kaXNwbGF5VmFsdWUgPSBzZXJpZXMuZGlzcGxheVZhbHVlLnJlcGxhY2UobmV3IFJlZ0V4cChcIl9yb3dfbmFtZV9cIiwgXCJnXCIpLCBzZXJpZXMucm93X25hbWUpO1xyXG4gICAgICAgICAgc2VyaWVzLmRpc3BsYXlWYWx1ZSA9IHNlcmllcy5kaXNwbGF5VmFsdWUucmVwbGFjZShuZXcgUmVnRXhwKFwiX2NvbF9uYW1lX1wiLCBcImdcIiksIHNlcmllcy5jb2xfbmFtZSk7XHJcbiAgICAgICAgICBzZXJpZXMuZGlzcGxheVZhbHVlID0gdXRpbHMucmVwbGFjZVRva2VucyhzZXJpZXMuZGlzcGxheVZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIEdyb3VwaW5nXHJcbiAgICAgIGNvbnN0IHJvd3NfZm91bmQgPSB1dGlscy5nZXRGaWVsZHMoZGF0YUNvbXB1dGVkLCBcInJvd19uYW1lXCIpO1xyXG4gICAgICBjb25zdCBjb2xzX2ZvdW5kID0gdXRpbHMuZ2V0RmllbGRzKGRhdGFDb21wdXRlZCwgXCJjb2xfbmFtZVwiKTtcclxuICAgICAgY29uc3Qga2V5c19mb3VuZCA9IHV0aWxzLmdldEZpZWxkcyhkYXRhQ29tcHV0ZWQsIFwia2V5X25hbWVcIik7XHJcbiAgICAgIGNvbnN0IGlzX3VuaXF1ZV9rZXlzID0gKGtleXNfZm91bmQubGVuZ3RoID09PSBfLnVuaXEoa2V5c19mb3VuZCkubGVuZ3RoKTtcclxuICAgICAgaWYgKGlzX3VuaXF1ZV9rZXlzKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhckVycm9yKCk7XHJcbiAgICAgICAgbGV0IG91dHB1dDogYW55W10gPSBbXTtcclxuICAgICAgICBfLmVhY2goXy51bmlxKHJvd3NfZm91bmQpLCAocm93X25hbWUpID0+IHtcclxuICAgICAgICAgIGxldCBvOiBhbnkgPSB7fTtcclxuICAgICAgICAgIG8ucm93ID0gcm93X25hbWU7XHJcbiAgICAgICAgICBvLmNvbHMgPSBbXTtcclxuICAgICAgICAgIF8uZWFjaChfLnVuaXEoY29sc19mb3VuZCksIChjb2xfbmFtZSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2hlZF92YWx1ZSA9IChfLmZpbmQoZGF0YUNvbXB1dGVkLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgIHJldHVybiBlLnJvd19uYW1lID09PSByb3dfbmFtZSAmJiBlLmNvbF9uYW1lID09PSBjb2xfbmFtZTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBpZiAoIW1hdGNoZWRfdmFsdWUpIHtcclxuICAgICAgICAgICAgICBtYXRjaGVkX3ZhbHVlID0ge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheVZhbHVlOiBcIk4vQVwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IE5hTlxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgby5jb2xzLnB1c2goe1xyXG4gICAgICAgICAgICAgIFwiYWN0dWFsX2NvbF9uYW1lXCI6IG1hdGNoZWRfdmFsdWUuYWN0dWFsX2NvbF9uYW1lLFxyXG4gICAgICAgICAgICAgIFwiYWN0dWFsX3Jvd19uYW1lXCI6IG1hdGNoZWRfdmFsdWUuYWN0dWFsX3Jvd19uYW1lLFxyXG4gICAgICAgICAgICAgIFwiYmdDb2xvclwiOiBtYXRjaGVkX3ZhbHVlLmJnQ29sb3IgfHwgXCJ0cmFuc3BhcmVudFwiLFxyXG4gICAgICAgICAgICAgIFwiZGlzcGxheVZhbHVlXCI6IG1hdGNoZWRfdmFsdWUuZGlzcGxheVZhbHVlIHx8IG1hdGNoZWRfdmFsdWUudmFsdWUsXHJcbiAgICAgICAgICAgICAgXCJuYW1lXCI6IGNvbF9uYW1lLFxyXG4gICAgICAgICAgICAgIFwidmFsdWVcIjogbWF0Y2hlZF92YWx1ZS52YWx1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgb3V0cHV0LnB1c2gobyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gcmVnaW9uIE91dHB1dCB0YWJsZSBjb25zdHJ1Y3Rpb25cclxuICAgICAgICBsZXQgYm9vbXRhYmxlX291dHB1dF9ib2R5X2hlYWRlcnMgPSB0aGlzLmVsZW0uZmluZChcIiNib29tdGFibGVfb3V0cHV0X2JvZHlfaGVhZGVyc1wiKTtcclxuICAgICAgICBsZXQgYm9vbXRhYmxlX291dHB1dF9ib2R5X2hlYWRlcnNfb3V0cHV0ID0gYDxici8+YDtcclxuICAgICAgICBpZiAodGhpcy5wYW5lbC5oaWRlX2hlYWRlcnMgIT09IHRydWUpIHtcclxuICAgICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9oZWFkZXJzX291dHB1dCArPSBcIjx0cj5cIjtcclxuICAgICAgICAgIGlmICh0aGlzLnBhbmVsLmhpZGVfZmlyc3RfY29sdW1uICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9oZWFkZXJzX291dHB1dCArPSBgPHRoIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjpjZW50ZXJcIj4ke3RoaXMucGFuZWwuZGVmYXVsdF90aXRsZV9mb3Jfcm93c308L3RoPmA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBfLmVhY2goXy51bmlxKGNvbHNfZm91bmQpLCBjID0+IHtcclxuICAgICAgICAgICAgYm9vbXRhYmxlX291dHB1dF9ib2R5X2hlYWRlcnNfb3V0cHV0ICs9IGA8dGggc3R5bGU9XCJwYWRkaW5nOjRweDt0ZXh0LWFsaWduOmNlbnRlclwiPiR7Y308L3RoPmA7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9oZWFkZXJzX291dHB1dCArPSBcIjwvdHI+XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9oZWFkZXJzLmh0bWwoYm9vbXRhYmxlX291dHB1dF9ib2R5X2hlYWRlcnNfb3V0cHV0KTtcclxuICAgICAgICBsZXQgYm9vbXRhYmxlX291dHB1dF9ib2R5ID0gdGhpcy5lbGVtLmZpbmQoJyNib29tdGFibGVfb3V0cHV0X2JvZHknKTtcclxuICAgICAgICBsZXQgYm9vbXRhYmxlX291dHB1dF9ib2R5X291dHB1dCA9IGBgO1xyXG4gICAgICAgIF8uZWFjaChvdXRwdXQsIG8gPT4ge1xyXG4gICAgICAgICAgYm9vbXRhYmxlX291dHB1dF9ib2R5X291dHB1dCArPSBcIjx0cj5cIjtcclxuICAgICAgICAgIGlmICh0aGlzLnBhbmVsLmhpZGVfZmlyc3RfY29sdW1uICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9vdXRwdXQgKz0gYDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O1wiPiR7by5yb3d9PC90ZD5gO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXy5lYWNoKG8uY29scywgYyA9PiB7XHJcbiAgICAgICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9vdXRwdXQgKz0gYDx0ZFxyXG4gICAgICAgICAgICAgIHN0eWxlPVwicGFkZGluZzo0cHg7YmFja2dyb3VuZC1jb2xvcjoke2MuYmdDb2xvcn1cIlxyXG4gICAgICAgICAgICAgIHRpdGxlPVwiJHsgXCJSb3cgTmFtZSA6IFwiICsgdXRpbHMuZ2V0QWN0dWFsTmFtZVdpdGhvdXRUb2tlbnMoYy5hY3R1YWxfcm93X25hbWUpICsgXCJcXG5Db2wgTmFtZSA6IFwiICsgdXRpbHMuZ2V0QWN0dWFsTmFtZVdpdGhvdXRUb2tlbnMoYy5hY3R1YWxfY29sX25hbWUpICsgXCJcXG5WYWx1ZSA6IFwiICsgYy52YWx1ZX1cIlxyXG4gICAgICAgICAgICA+JHtjLmRpc3BsYXlWYWx1ZX08L3RkPmA7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9vdXRwdXQgKz0gXCI8L3RyPlwiO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keS5odG1sKGJvb210YWJsZV9vdXRwdXRfYm9keV9vdXRwdXQpO1xyXG4gICAgICAgIC8vIGVuZHJlZ2lvblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBkdXBsaWNhdGVLZXlWYWx1ZXMgPSBfLnVuaXEoa2V5c19mb3VuZC5maWx0ZXIodiA9PiB7XHJcbiAgICAgICAgICByZXR1cm4ga2V5c19mb3VuZC5maWx0ZXIodCA9PiB0ID09PSB2KS5sZW5ndGggPiAxO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICB0aGlzLnRocm93RXJyb3IoXCJEdXBsaWNhdGUgS2V5cyBmb3VuZFwiLCBcIkR1cGxpY2F0ZSBrZXlzIDogPGJyLz5cIiArIFwiRHVwbGljYXRlIGtleSB2YWx1ZXMgOiA8YnIvPlwiICsgZHVwbGljYXRlS2V5VmFsdWVzLmpvaW4oXCI8YnIvPiBcIikpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyByZWdpb24gRGVidWcgdGFibGUgYm9keSBjb25zdHJ1Y3Rpb25cclxuICAgICAgbGV0IGJvb210YWJsZV9vdXRwdXRfYm9keV9kZWJ1ZyA9IHRoaXMuZWxlbS5maW5kKCcjYm9vbXRhYmxlX291dHB1dF9ib2R5X2RlYnVnJyk7XHJcbiAgICAgIGxldCBib29tdGFibGVfb3V0cHV0X2JvZHlfZGVidWdfb3V0cHV0ID0gYGA7XHJcbiAgICAgIF8uZWFjaChkYXRhQ29tcHV0ZWQsIGQgPT4ge1xyXG4gICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9kZWJ1Z19vdXRwdXQgKz0gYFxyXG4gICAgICAgIDx0cj5cclxuICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O1wiIHdpZHRoPVwiNDAlXCI+JHtkLmFsaWFzfTwvdGQ+XHJcbiAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDtcIj4ke2QucGF0dGVybi5wYXR0ZXJuIHx8IFwiRGVmYXVsdFwifTwvdGQ+XHJcbiAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDtiYWNrZ3JvdW5kLWNvbG9yOiR7ZC5iZ0NvbG9yfVwiPiR7ZC5kaXNwbGF5VmFsdWV9PC90ZD5cclxuICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O1wiPiR7ZC5yb3dfbmFtZX08L3RkPlxyXG4gICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7XCI+JHtkLmNvbF9uYW1lfTwvdGQ+XHJcbiAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDtcIj4ke2QudGhyZXNob2xkc308L3RkPlxyXG4gICAgICAgIDwvdHI+XHJcbiAgICAgICAgYDtcclxuICAgICAgfSk7XHJcbiAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9kZWJ1Zy5odG1sKGJvb210YWJsZV9vdXRwdXRfYm9keV9kZWJ1Z19vdXRwdXQpO1xyXG4gICAgICAvLyBlbmRyZWdpb25cclxuICAgIH1cclxuICAgIGxldCByb290RWxlbSA9IHRoaXMuZWxlbS5maW5kKCcudGFibGUtcGFuZWwtc2Nyb2xsJyk7XHJcbiAgICBsZXQgbWF4aGVpZ2h0b2ZwYW5lbCA9IHRoaXMucGFuZWwuZGVidWdfbW9kZSA/IHRoaXMuY3RybC5oZWlnaHQgLSA3MSA6IHRoaXMuY3RybC5oZWlnaHQgLSAzMTtcclxuICAgIHJvb3RFbGVtLmNzcyh7ICdtYXgtaGVpZ2h0JzogbWF4aGVpZ2h0b2ZwYW5lbCArIFwicHhcIiB9KTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQge1xyXG4gIEdyYWZhbmFCb29tVGFibGVDdHJsIGFzIFBhbmVsQ3RybFxyXG59O1xyXG4iXX0=