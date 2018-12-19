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
                GrafanaBoomTableCtrl.templateUrl = "partials/module.html";
                return GrafanaBoomTableCtrl;
            }(sdk_1.MetricsPanelCtrl));
            exports_1("PanelCtrl", GrafanaBoomTableCtrl);
            GrafanaBoomTableCtrl.prototype.render = function () {
                var _this = this;
                if (this.dataReceived) {
                    this.dataComputed = this.dataReceived;
                    this.panel.default_title_for_rows = this.panel.default_title_for_rows || config_1.config.default_title_for_rows;
                    var metricsReceived_1 = utils.getFields(this.dataComputed, "target");
                    if (metricsReceived_1.length !== lodash_1.default.uniq(metricsReceived_1).length) {
                        var duplicateKeys = lodash_1.default.uniq(metricsReceived_1.filter(function (v) {
                            return metricsReceived_1.filter(function (t) { return t === v; }).length > 1;
                        }));
                        var err = new Error();
                        err.name = "Duplicate data received";
                        err.message = "Duplicate keys : <br/>" + duplicateKeys.join("<br/> ");
                        this.panel.error = err;
                        this.panel.data = undefined;
                    }
                    else {
                        this.panel.error = undefined;
                        this.dataComputed = this.dataReceived.map(this.seriesHandler.bind(this));
                        this.dataComputed = this.dataComputed.map(function (series) {
                            series.current_servertimestamp = new Date();
                            if (series && series.datapoints && series.datapoints.length > 0) {
                                if (lodash_1.default.last(series.datapoints).length === 2) {
                                    series.current_servertimestamp = new Date(lodash_1.default.last(series.datapoints)[1]);
                                }
                            }
                            return series;
                        });
                        this.dataComputed = this.dataComputed.map(function (series) {
                            series.pattern = lodash_1.default.find(_this.panel.patterns.filter(function (p) { return p.disabled !== true; }), function (p) {
                                return series.alias.match(p.pattern);
                            });
                            if (series.pattern === undefined) {
                                series.pattern = _this.panel.defaultPattern || app_1.defaultPattern;
                            }
                            return series;
                        });
                        this.dataComputed = this.dataComputed.map(function (series) {
                            series.decimals = (series.pattern.decimals) || app_1.defaultPattern.decimals;
                            return series;
                        });
                        this.dataComputed = this.dataComputed.map(function (series) {
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
                        this.dataComputed = this.dataComputed.filter(function (series) {
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
                        this.dataComputed = this.dataComputed.map(function (series) {
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
                        this.dataComputed = this.dataComputed.map(function (series) {
                            series.col_name = series.pattern.col_name || app_1.defaultPattern.col_name;
                            series.col_name = series.alias.split(series.pattern.delimiter || ".").reduce(function (r, it, i) {
                                return r.replace(new RegExp(_this.panel.row_col_wrapper + i + _this.panel.row_col_wrapper, "g"), it);
                            }, series.col_name);
                            if (series.alias.split(series.pattern.delimiter || ".").length === 1 || series.row_name === series.alias) {
                                series.col_name = series.pattern.col_name || "Value";
                            }
                            return series;
                        });
                        this.dataComputed = this.dataComputed.map(function (series) {
                            series.key_name = series.row_name + "#" + series.col_name;
                            return series;
                        });
                        this.dataComputed = this.dataComputed.map(function (series) {
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
                        this.dataComputed = this.dataComputed.map(function (series) {
                            series.enable_bgColor = series.pattern.enable_bgColor;
                            series.bgColors = (series.pattern.bgColors || app_1.defaultPattern.bgColors).split("|");
                            series.bgColor = series.enable_bgColor === true ? _this.computeBgColor(series.thresholds, series.bgColors, series.value) : "transparent";
                            if (series.displayValue === (series.pattern.null_value || app_1.defaultPattern.null_value || "Null")) {
                                series.bgColor = series.pattern.null_color || app_1.defaultPattern.null_color;
                            }
                            return series;
                        });
                        this.dataComputed = this.dataComputed.map(function (series) {
                            series.enable_bgColor_overrides = series.pattern.enable_bgColor_overrides;
                            series.bgColors_overrides = series.pattern.bgColors_overrides || "";
                            if (series.enable_bgColor_overrides && series.bgColors_overrides !== "") {
                                var _bgColors_overrides = series.bgColors_overrides.split("|").filter(function (con) { return con.indexOf("->"); }).map(function (con) { return con.split("->"); }).filter(function (con) { return +(con[0]) === series.value; }).map(function (con) { return con[1]; });
                                if (_bgColors_overrides.length > 0 && _bgColors_overrides[0] !== "") {
                                    series.bgColor = utils.normalizeColor(("" + _bgColors_overrides[0]).trim());
                                }
                            }
                            return series;
                        });
                        this.dataComputed = this.dataComputed.map(function (series) {
                            series.enable_transform = series.pattern.enable_transform;
                            series.transform_values = (series.pattern.transform_values || app_1.defaultPattern.transform_values).split("|");
                            series.displayValue = series.enable_transform === true ? _this.transformValue(series.thresholds, series.transform_values, series.value, series.displayValue, series.row_name, series.col_name) : series.displayValue;
                            if (series.displayValue === (series.pattern.null_value || app_1.defaultPattern.null_value || "Null")) {
                                series.displayValue = series.pattern.null_value || app_1.defaultPattern.null_value;
                            }
                            else if (isNaN(series.value)) {
                                series.displayValue = series.pattern.null_value || app_1.defaultPattern.null_value;
                            }
                            return series;
                        });
                        this.dataComputed = this.dataComputed.map(function (series) {
                            series.enable_transform_overrides = series.pattern.enable_transform_overrides;
                            series.transform_values_overrides = series.pattern.transform_values_overrides || "";
                            if (series.enable_transform_overrides && series.transform_values_overrides !== "") {
                                var _transform_values_overrides = series.transform_values_overrides.split("|").filter(function (con) { return con.indexOf("->"); }).map(function (con) { return con.split("->"); }).filter(function (con) { return +(con[0]) === series.value; }).map(function (con) { return con[1]; });
                                if (_transform_values_overrides.length > 0 && _transform_values_overrides[0] !== "") {
                                    series.displayValue = ("" + _transform_values_overrides[0]).trim().replace(new RegExp("_value_", "g"), series.displayValue).replace(new RegExp("_row_name_", "g"), series.row_name).replace(new RegExp("_col_name_", "g"), series.col_name);
                                }
                            }
                            return series;
                        });
                        this.dataComputed = this.dataComputed.map(function (series) {
                            series.actual_displayvalue = series.displayValue;
                            series.actual_row_name = series.row_name;
                            series.actual_col_name = series.col_name;
                            series.displayValue = utils.replaceTokens(series.displayValue);
                            series.row_name = utils.replaceTokens(series.row_name);
                            series.col_name = utils.replaceTokens(series.col_name);
                            return series;
                        });
                        this.dataComputed = this.dataComputed.map(function (series) {
                            if (series.pattern.enable_clickable_cells) {
                                var targetLink = series.pattern.clickable_cells_link || "#";
                                targetLink = targetLink.replace(new RegExp("_row_name_", "g"), utils.getActualNameWithoutTokens(series.actual_row_name).trim());
                                targetLink = targetLink.replace(new RegExp("_col_name_", "g"), utils.getActualNameWithoutTokens(series.actual_col_name).trim());
                                targetLink = targetLink.replace(new RegExp("_value_", "g"), utils.getActualNameWithoutTokens(series.value).trim());
                                series.displayValue = "<a href=\"" + targetLink + "\" target=\"_blank\">" + series.displayValue + "</a>";
                            }
                            return series;
                        });
                        this.dataComputed = this.dataComputed.map(function (series) {
                            if (lodash_1.default.isNaN(series.value) || series.value === null) {
                                series.bgColor = series.pattern.null_color || app_1.defaultPattern.null_color || "darkred";
                                series.displayValue = series.pattern.null_value || app_1.defaultPattern.null_value || "No data";
                            }
                            return series;
                        });
                        var rows_found = utils.getFields(this.dataComputed, "row_name");
                        var cols_found_1 = utils.getFields(this.dataComputed, "col_name");
                        var keys_found_1 = utils.getFields(this.dataComputed, "key_name");
                        var is_unique_keys = (keys_found_1.length === lodash_1.default.uniq(keys_found_1).length);
                        if (is_unique_keys) {
                            this.panel.error = undefined;
                            var output_1 = [];
                            lodash_1.default.each(lodash_1.default.uniq(rows_found), function (row_name) {
                                var o = {};
                                o.row = row_name;
                                o.cols = [];
                                lodash_1.default.each(lodash_1.default.uniq(cols_found_1), function (col_name) {
                                    var matched_value = (lodash_1.default.find(_this.dataComputed, function (e) {
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
                            var err_duplicateKeys = new Error();
                            err_duplicateKeys.name = "Duplicate keys found";
                            err_duplicateKeys.message = "Duplicate key values : <br/>" + duplicateKeyValues.join("<br/> ");
                            this.panel.error = err_duplicateKeys;
                        }
                        var boomtable_output_body_debug = this.elem.find('#boomtable_output_body_debug');
                        var boomtable_output_body_debug_output_1 = "";
                        lodash_1.default.each(this.dataComputed, function (d) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFXQSxtQkFBYSxDQUFDO2dCQUNaLElBQUksRUFBRSxhQUFXLGtCQUFTLDBCQUF1QjtnQkFDakQsS0FBSyxFQUFFLGFBQVcsa0JBQVMsMkJBQXdCO2FBQ3BELENBQUMsQ0FBQzs7Z0JBRWdDLHdDQUFnQjtnQkFTakQsOEJBQVksTUFBTSxFQUFFLFNBQVM7b0JBQTdCLFlBQ0Usa0JBQU0sTUFBTSxFQUFFLFNBQVMsQ0FBQyxTQU16QjtvQkFkTSxpQkFBVyxHQUFRLGFBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDeEMsc0JBQWdCLEdBQVcsMkJBQWtCLENBQUM7b0JBUW5ELGdCQUFDLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsZUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUM3QyxLQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsSUFBSSxvQkFBYyxDQUFDO29CQUN4RSxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFDeEIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ2hFLEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLEtBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUM7O2dCQUNuRSxDQUFDO2dCQUNNLDZDQUFjLEdBQXJCO29CQUNFLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLG9CQUFrQixrQkFBUyw0QkFBeUIsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFD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Q0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztvQkFDN0YsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2lCQUN6RDtZQUNILENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uL25vZGVfbW9kdWxlcy9ncmFmYW5hLXNkay1tb2Nrcy9hcHAvaGVhZGVycy9jb21tb24uZC50c1wiIC8+XHJcblxyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCBrYm4gZnJvbSAnYXBwL2NvcmUvdXRpbHMva2JuJztcclxuaW1wb3J0IHsgbG9hZFBsdWdpbkNzcywgTWV0cmljc1BhbmVsQ3RybCB9IGZyb20gXCJhcHAvcGx1Z2lucy9zZGtcIjtcclxuaW1wb3J0IFRpbWVTZXJpZXMgZnJvbSBcImFwcC9jb3JlL3RpbWVfc2VyaWVzMlwiO1xyXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwiLi9hcHAvdXRpbHNcIjtcclxuaW1wb3J0IHsgZGVmYXVsdFBhdHRlcm4gfSBmcm9tIFwiLi9hcHAvYXBwXCI7XHJcbmltcG9ydCB7IHBsdWdpbl9pZCwgdmFsdWVfbmFtZV9vcHRpb25zLCBjb25maWcgfSBmcm9tIFwiLi9hcHAvY29uZmlnXCI7XHJcbmltcG9ydCB7IEJvb21UYWJsZVBhdHRlcm4gfSBmcm9tIFwiLi9hcHAvQm9vbVRhYmxlUGF0dGVyblwiO1xyXG5cclxubG9hZFBsdWdpbkNzcyh7XHJcbiAgZGFyazogYHBsdWdpbnMvJHtwbHVnaW5faWR9L2Nzcy9kZWZhdWx0LmRhcmsuY3NzYCxcclxuICBsaWdodDogYHBsdWdpbnMvJHtwbHVnaW5faWR9L2Nzcy9kZWZhdWx0LmxpZ2h0LmNzc2BcclxufSk7XHJcblxyXG5jbGFzcyBHcmFmYW5hQm9vbVRhYmxlQ3RybCBleHRlbmRzIE1ldHJpY3NQYW5lbEN0cmwge1xyXG4gIHB1YmxpYyBzdGF0aWMgdGVtcGxhdGVVcmwgPSBcInBhcnRpYWxzL21vZHVsZS5odG1sXCI7XHJcbiAgcHVibGljIHVuaXRGb3JtYXRzOiBhbnkgPSBrYm4uZ2V0VW5pdEZvcm1hdHMoKTtcclxuICBwdWJsaWMgdmFsdWVOYW1lT3B0aW9uczogT2JqZWN0ID0gdmFsdWVfbmFtZV9vcHRpb25zO1xyXG4gIHB1YmxpYyBkYXRhUmVjZWl2ZWQ6IGFueTtcclxuICBwdWJsaWMgZGF0YUNvbXB1dGVkOiBhbnk7XHJcbiAgcHVibGljIGN0cmw6IGFueTtcclxuICBwdWJsaWMgZWxlbTogYW55O1xyXG4gIHB1YmxpYyBhdHRyczogYW55O1xyXG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJGluamVjdG9yKSB7XHJcbiAgICBzdXBlcigkc2NvcGUsICRpbmplY3Rvcik7XHJcbiAgICBfLmRlZmF1bHRzKHRoaXMucGFuZWwsIGNvbmZpZy5wYW5lbERlZmF1bHRzKTtcclxuICAgIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4gPSB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuIHx8IGRlZmF1bHRQYXR0ZXJuO1xyXG4gICAgdGhpcy51cGRhdGVQcm90b3R5cGVzKCk7XHJcbiAgICB0aGlzLmV2ZW50cy5vbihcImRhdGEtcmVjZWl2ZWRcIiwgdGhpcy5vbkRhdGFSZWNlaXZlZC5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuZXZlbnRzLm9uKFwiaW5pdC1lZGl0LW1vZGVcIiwgdGhpcy5vbkluaXRFZGl0TW9kZS5iaW5kKHRoaXMpKTtcclxuICB9XHJcbiAgcHVibGljIG9uSW5pdEVkaXRNb2RlKCkge1xyXG4gICAgdGhpcy5hZGRFZGl0b3JUYWIoXCJQYXR0ZXJuc1wiLCBgcHVibGljL3BsdWdpbnMvJHtwbHVnaW5faWR9L3BhcnRpYWxzL3BhdHRlcm5zLmh0bWxgLCAyKTtcclxuICAgIHRoaXMuYWRkRWRpdG9yVGFiKFwiVGltZSBiYXNlZCB0aHJlc2hvbGRzICYgRmlsdGVyc1wiLCBgcHVibGljL3BsdWdpbnMvJHtwbHVnaW5faWR9L3BhcnRpYWxzL3BhdHRlcm5zLWFkdmFuY2VkLW9wdGlvbnMuaHRtbGAsIDMpO1xyXG4gICAgdGhpcy5hZGRFZGl0b3JUYWIoXCJPcHRpb25zXCIsIGBwdWJsaWMvcGx1Z2lucy8ke3BsdWdpbl9pZH0vcGFydGlhbHMvb3B0aW9ucy5odG1sYCwgNCk7XHJcbiAgfVxyXG4gIHB1YmxpYyBvbkRhdGFSZWNlaXZlZChkYXRhKSB7XHJcbiAgICB0aGlzLmRhdGFSZWNlaXZlZCA9IGRhdGE7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwdWJsaWMgYWRkUGF0dGVybigpIHtcclxuICAgIGxldCBuZXdQYXR0ZXJuID0gbmV3IEJvb21UYWJsZVBhdHRlcm4oe1xyXG4gICAgICByb3dfY29sX3dyYXBwZXI6IHRoaXMucGFuZWwucm93X2NvbF93cmFwcGVyXHJcbiAgICB9KTtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMucHVzaChuZXdQYXR0ZXJuKTtcclxuICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID0gdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggLSAxO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgcHVibGljIG1vdmVQYXR0ZXJuKGRpcmVjdGlvbiwgaW5kZXgpIHtcclxuICAgIGxldCB0ZW1wRWxlbWVudCA9IHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdO1xyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJVUFwiKSB7XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleCAtIDFdO1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4IC0gMV0gPSB0ZW1wRWxlbWVudDtcclxuICAgICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSBpbmRleCAtIDE7XHJcbiAgICB9XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcIkRPV05cIikge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XSA9IHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXggKyAxXTtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleCArIDFdID0gdGVtcEVsZW1lbnQ7XHJcbiAgICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID0gaW5kZXggKyAxO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgcHVibGljIHJlbW92ZVBhdHRlcm4oaW5kZXgpIHtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID0gKHRoaXMucGFuZWwucGF0dGVybnMgJiYgdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggPiAwKSA/ICh0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCAtIDEpIDogLTE7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwdWJsaWMgY2xvbmVQYXR0ZXJuKGluZGV4KSB7XHJcbiAgICBsZXQgY29waWVkUGF0dGVybiA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdKTtcclxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihjb3BpZWRQYXR0ZXJuLCBCb29tVGFibGVQYXR0ZXJuLnByb3RvdHlwZSk7XHJcbiAgICB0aGlzLnBhbmVsLnBhdHRlcm5zLnB1c2goY29waWVkUGF0dGVybik7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwdWJsaWMgbGltaXRUZXh0KHRleHQsIG1heGxlbmd0aCkge1xyXG4gICAgaWYgKHRleHQuc3BsaXQoJycpLmxlbmd0aCA+IG1heGxlbmd0aCkge1xyXG4gICAgICB0ZXh0ID0gdGV4dC5zdWJzdHJpbmcoMCwgbWF4bGVuZ3RoIC0gMykgKyBcIi4uLlwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRleHQ7XHJcbiAgfVxyXG4gIHB1YmxpYyBsaW5rKHNjb3BlLCBlbGVtLCBhdHRycywgY3RybCkge1xyXG4gICAgdGhpcy5zY29wZSA9IHNjb3BlO1xyXG4gICAgdGhpcy5lbGVtID0gZWxlbTtcclxuICAgIHRoaXMuYXR0cnMgPSBhdHRycztcclxuICAgIHRoaXMuY3RybCA9IGN0cmw7XHJcbiAgfVxyXG4gIHByaXZhdGUgdXBkYXRlUHJvdG90eXBlcygpIHtcclxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLCBCb29tVGFibGVQYXR0ZXJuLnByb3RvdHlwZSk7XHJcbiAgICB0aGlzLnBhbmVsLnBhdHRlcm5zLm1hcChwYXR0ZXJuID0+IHtcclxuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHBhdHRlcm4sIEJvb21UYWJsZVBhdHRlcm4ucHJvdG90eXBlKTtcclxuICAgICAgcmV0dXJuIHBhdHRlcm47XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcHVibGljIHNlcmllc0hhbmRsZXIoc2VyaWVzRGF0YSkge1xyXG4gICAgbGV0IHNlcmllcyA9IG5ldyBUaW1lU2VyaWVzKHtcclxuICAgICAgYWxpYXM6IHNlcmllc0RhdGEudGFyZ2V0LFxyXG4gICAgICBkYXRhcG9pbnRzOiBzZXJpZXNEYXRhLmRhdGFwb2ludHMgfHwgW11cclxuICAgIH0pO1xyXG4gICAgc2VyaWVzLmZsb3RwYWlycyA9IHNlcmllcy5nZXRGbG90UGFpcnModGhpcy5wYW5lbC5udWxsUG9pbnRNb2RlKTtcclxuICAgIHJldHVybiBzZXJpZXM7XHJcbiAgfVxyXG4gIHB1YmxpYyBjb21wdXRlQmdDb2xvcih0aHJlc2hvbGRzLCBiZ0NvbG9ycywgdmFsdWUpIHtcclxuICAgIGxldCBjID0gXCJ0cmFuc3BhcmVudFwiO1xyXG4gICAgaWYgKHRocmVzaG9sZHMgJiYgYmdDb2xvcnMgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmIHRocmVzaG9sZHMubGVuZ3RoICsgMSA8PSBiZ0NvbG9ycy5sZW5ndGgpIHtcclxuICAgICAgYmdDb2xvcnMgPSBfLmRyb3BSaWdodChiZ0NvbG9ycywgYmdDb2xvcnMubGVuZ3RoIC0gdGhyZXNob2xkcy5sZW5ndGggLSAxKTtcclxuICAgICAgaWYgKGJnQ29sb3JzW2JnQ29sb3JzLmxlbmd0aCAtIDFdID09PSBcIlwiKSB7XHJcbiAgICAgICAgYmdDb2xvcnNbYmdDb2xvcnMubGVuZ3RoIC0gMV0gPSBcInRyYW5zcGFyZW50XCI7XHJcbiAgICAgIH1cclxuICAgICAgZm9yIChsZXQgaSA9IHRocmVzaG9sZHMubGVuZ3RoOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlID49IHRocmVzaG9sZHNbaSAtIDFdKSB7XHJcbiAgICAgICAgICByZXR1cm4gdXRpbHMubm9ybWFsaXplQ29sb3IoYmdDb2xvcnNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdXRpbHMubm9ybWFsaXplQ29sb3IoXy5maXJzdChiZ0NvbG9ycykpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGM7XHJcbiAgfVxyXG4gIHB1YmxpYyB0cmFuc2Zvcm1WYWx1ZSh0aHJlc2hvbGRzLCB0cmFuc2Zvcm1fdmFsdWVzLCB2YWx1ZSwgZGlzcGxheVZhbHVlLCByb3dfbmFtZSwgY29sX25hbWUpIHtcclxuICAgIGxldCB0ID0gdmFsdWU7XHJcbiAgICBpZiAodGhyZXNob2xkcyAmJiB0cmFuc2Zvcm1fdmFsdWVzICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiB0aHJlc2hvbGRzLmxlbmd0aCArIDEgPD0gdHJhbnNmb3JtX3ZhbHVlcy5sZW5ndGgpIHtcclxuICAgICAgdHJhbnNmb3JtX3ZhbHVlcyA9IF8uZHJvcFJpZ2h0KHRyYW5zZm9ybV92YWx1ZXMsIHRyYW5zZm9ybV92YWx1ZXMubGVuZ3RoIC0gdGhyZXNob2xkcy5sZW5ndGggLSAxKTtcclxuICAgICAgaWYgKHRyYW5zZm9ybV92YWx1ZXNbdHJhbnNmb3JtX3ZhbHVlcy5sZW5ndGggLSAxXSA9PT0gXCJcIikge1xyXG4gICAgICAgIHRyYW5zZm9ybV92YWx1ZXNbdHJhbnNmb3JtX3ZhbHVlcy5sZW5ndGggLSAxXSA9IFwiX3ZhbHVlX1wiO1xyXG4gICAgICB9XHJcbiAgICAgIGZvciAobGV0IGkgPSB0aHJlc2hvbGRzLmxlbmd0aDsgaSA+IDA7IGktLSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA+PSB0aHJlc2hvbGRzW2kgLSAxXSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRyYW5zZm9ybV92YWx1ZXNbaV0ucmVwbGFjZShuZXcgUmVnRXhwKFwiX3ZhbHVlX1wiLCBcImdcIiksIGRpc3BsYXlWYWx1ZSkucmVwbGFjZShuZXcgUmVnRXhwKFwiX3Jvd19uYW1lX1wiLCBcImdcIiksIHJvd19uYW1lKS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfY29sX25hbWVfXCIsIFwiZ1wiKSwgY29sX25hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gXy5maXJzdCh0cmFuc2Zvcm1fdmFsdWVzKS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfdmFsdWVfXCIsIFwiZ1wiKSwgZGlzcGxheVZhbHVlKS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfcm93X25hbWVfXCIsIFwiZ1wiKSwgcm93X25hbWUpLnJlcGxhY2UobmV3IFJlZ0V4cChcIl9jb2xfbmFtZV9cIiwgXCJnXCIpLCBjb2xfbmFtZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxuICB9XHJcbiAgcHVibGljIGdldERlY2ltYWxzRm9yVmFsdWUodmFsdWUsIF9kZWNpbWFscykge1xyXG4gICAgaWYgKF8uaXNOdW1iZXIoK19kZWNpbWFscykpIHtcclxuICAgICAgbGV0IG86IE9iamVjdCA9IHtcclxuICAgICAgICBkZWNpbWFsczogX2RlY2ltYWxzLFxyXG4gICAgICAgIHNjYWxlZERlY2ltYWxzOiBudWxsXHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiBvO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBkZWx0YSA9IHZhbHVlIC8gMjtcclxuICAgIGxldCBkZWMgPSAtTWF0aC5mbG9vcihNYXRoLmxvZyhkZWx0YSkgLyBNYXRoLkxOMTApO1xyXG5cclxuICAgIGxldCBtYWduID0gTWF0aC5wb3coMTAsIC1kZWMpLFxyXG4gICAgICBub3JtID0gZGVsdGEgLyBtYWduLCAvLyBub3JtIGlzIGJldHdlZW4gMS4wIGFuZCAxMC4wXHJcbiAgICAgIHNpemU7XHJcblxyXG4gICAgaWYgKG5vcm0gPCAxLjUpIHtcclxuICAgICAgc2l6ZSA9IDE7XHJcbiAgICB9IGVsc2UgaWYgKG5vcm0gPCAzKSB7XHJcbiAgICAgIHNpemUgPSAyO1xyXG4gICAgICAvLyBzcGVjaWFsIGNhc2UgZm9yIDIuNSwgcmVxdWlyZXMgYW4gZXh0cmEgZGVjaW1hbFxyXG4gICAgICBpZiAobm9ybSA+IDIuMjUpIHtcclxuICAgICAgICBzaXplID0gMi41O1xyXG4gICAgICAgICsrZGVjO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKG5vcm0gPCA3LjUpIHtcclxuICAgICAgc2l6ZSA9IDU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzaXplID0gMTA7XHJcbiAgICB9XHJcblxyXG4gICAgc2l6ZSAqPSBtYWduO1xyXG5cclxuICAgIC8vIHJlZHVjZSBzdGFydGluZyBkZWNpbWFscyBpZiBub3QgbmVlZGVkXHJcbiAgICBpZiAoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlKSB7XHJcbiAgICAgIGRlYyA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJlc3VsdDogT2JqZWN0ID0ge1xyXG4gICAgICBkZWNpbWFsczogTWF0aC5tYXgoMCwgZGVjKSxcclxuICAgICAgc2NhbGVkRGVjaW1hbHM6IE1hdGgubWF4KDAsIGRlYykgLSBNYXRoLmZsb29yKE1hdGgubG9nKHNpemUpIC8gTWF0aC5MTjEwKSArIDJcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn1cclxuXHJcbkdyYWZhbmFCb29tVGFibGVDdHJsLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKHRoaXMuZGF0YVJlY2VpdmVkKSB7XHJcbiAgICAvLyBDb3B5aW5nIHRoZSBkYXRhIHJlY2VpdmVkXHJcbiAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YVJlY2VpdmVkO1xyXG4gICAgdGhpcy5wYW5lbC5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzID0gdGhpcy5wYW5lbC5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzIHx8IGNvbmZpZy5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzO1xyXG4gICAgY29uc3QgbWV0cmljc1JlY2VpdmVkID0gdXRpbHMuZ2V0RmllbGRzKHRoaXMuZGF0YUNvbXB1dGVkLCBcInRhcmdldFwiKTtcclxuICAgIGlmIChtZXRyaWNzUmVjZWl2ZWQubGVuZ3RoICE9PSBfLnVuaXEobWV0cmljc1JlY2VpdmVkKS5sZW5ndGgpIHtcclxuICAgICAgbGV0IGR1cGxpY2F0ZUtleXMgPSBfLnVuaXEobWV0cmljc1JlY2VpdmVkLmZpbHRlcih2ID0+IHtcclxuICAgICAgICByZXR1cm4gbWV0cmljc1JlY2VpdmVkLmZpbHRlcih0ID0+IHQgPT09IHYpLmxlbmd0aCA+IDE7XHJcbiAgICAgIH0pKTtcclxuICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcigpO1xyXG4gICAgICBlcnIubmFtZSA9IFwiRHVwbGljYXRlIGRhdGEgcmVjZWl2ZWRcIjtcclxuICAgICAgZXJyLm1lc3NhZ2UgPSBcIkR1cGxpY2F0ZSBrZXlzIDogPGJyLz5cIiArIGR1cGxpY2F0ZUtleXMuam9pbihcIjxici8+IFwiKTtcclxuICAgICAgdGhpcy5wYW5lbC5lcnJvciA9IGVycjtcclxuICAgICAgdGhpcy5wYW5lbC5kYXRhID0gdW5kZWZpbmVkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5lbC5lcnJvciA9IHVuZGVmaW5lZDtcclxuICAgICAgLy8gQmluZGluZyB0aGUgZ3JhZmFuYSBjb21wdXRhdGlvbnMgdG8gdGhlIG1ldHJpY3MgcmVjZWl2ZWRcclxuICAgICAgdGhpcy5kYXRhQ29tcHV0ZWQgPSB0aGlzLmRhdGFSZWNlaXZlZC5tYXAodGhpcy5zZXJpZXNIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4gICAgICAvLyBHZXQgU2VydmVyIFRpbWUgU3RhbXAgb2YgdGhlIFNlcmllcyBmb3IgdGltZSBiYXNlZCB0aHJlc2hvbGRzLlxyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy5jdXJyZW50X3NlcnZlcnRpbWVzdGFtcCA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgaWYgKHNlcmllcyAmJiBzZXJpZXMuZGF0YXBvaW50cyAmJiBzZXJpZXMuZGF0YXBvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBpZiAoXy5sYXN0KHNlcmllcy5kYXRhcG9pbnRzKS5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgc2VyaWVzLmN1cnJlbnRfc2VydmVydGltZXN0YW1wID0gbmV3IERhdGUoXy5sYXN0KHNlcmllcy5kYXRhcG9pbnRzKVsxXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBBc3NpZ24gcGF0dGVyblxyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy5wYXR0ZXJuID0gXy5maW5kKHRoaXMucGFuZWwucGF0dGVybnMuZmlsdGVyKHAgPT4geyByZXR1cm4gcC5kaXNhYmxlZCAhPT0gdHJ1ZTsgfSksIGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgICByZXR1cm4gc2VyaWVzLmFsaWFzLm1hdGNoKHAucGF0dGVybik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHNlcmllcy5wYXR0ZXJuID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHNlcmllcy5wYXR0ZXJuID0gdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybiB8fCBkZWZhdWx0UGF0dGVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIEFzc2lnbiBEZWNpbWFsIFZhbHVlc1xyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy5kZWNpbWFscyA9IChzZXJpZXMucGF0dGVybi5kZWNpbWFscykgfHwgZGVmYXVsdFBhdHRlcm4uZGVjaW1hbHM7XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIEFzc2lnbiB2YWx1ZVxyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIGlmIChzZXJpZXMuc3RhdHMpIHtcclxuICAgICAgICAgIHNlcmllcy52YWx1ZSA9IHNlcmllcy5zdGF0c1tzZXJpZXMucGF0dGVybi52YWx1ZU5hbWVdO1xyXG4gICAgICAgICAgbGV0IGRlY2ltYWxJbmZvOiBhbnkgPSB0aGlzLmdldERlY2ltYWxzRm9yVmFsdWUoc2VyaWVzLnZhbHVlLCBzZXJpZXMuZGVjaW1hbHMpO1xyXG4gICAgICAgICAgbGV0IGZvcm1hdEZ1bmMgPSBrYm4udmFsdWVGb3JtYXRzW3Nlcmllcy5wYXR0ZXJuLmZvcm1hdF07XHJcbiAgICAgICAgICBpZiAoc2VyaWVzLnZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHNlcmllcy5kaXNwbGF5VmFsdWUgPSBzZXJpZXMucGF0dGVybi5udWxsX3ZhbHVlIHx8IFwiTnVsbFwiO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICghaXNOYU4oc2VyaWVzLnZhbHVlKSkge1xyXG4gICAgICAgICAgICBzZXJpZXMudmFsdWVGb3JtYXR0ZWQgPSBmb3JtYXRGdW5jKHNlcmllcy52YWx1ZSwgZGVjaW1hbEluZm8uZGVjaW1hbHMsIGRlY2ltYWxJbmZvLnNjYWxlZERlY2ltYWxzKTtcclxuICAgICAgICAgICAgc2VyaWVzLnZhbHVlUm91bmRlZCA9IGtibi5yb3VuZFZhbHVlKHNlcmllcy52YWx1ZSwgZGVjaW1hbEluZm8uZGVjaW1hbHMpO1xyXG4gICAgICAgICAgICBzZXJpZXMuZGlzcGxheVZhbHVlID0gc2VyaWVzLnZhbHVlRm9ybWF0dGVkO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VyaWVzLmRpc3BsYXlWYWx1ZSA9IHNlcmllcy5wYXR0ZXJuLm51bGxfdmFsdWUgfHwgXCJOdWxsXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBGaWx0ZXIgVmFsdWVzXHJcbiAgICAgIHRoaXMuZGF0YUNvbXB1dGVkID0gdGhpcy5kYXRhQ29tcHV0ZWQuZmlsdGVyKHNlcmllcyA9PiB7XHJcbiAgICAgICAgaWYgKCFzZXJpZXMucGF0dGVybi5maWx0ZXIpIHtcclxuICAgICAgICAgIHNlcmllcy5wYXR0ZXJuLmZpbHRlciA9IHt9O1xyXG4gICAgICAgICAgc2VyaWVzLnBhdHRlcm4uZmlsdGVyLnZhbHVlX2JlbG93ID0gXCJcIjtcclxuICAgICAgICAgIHNlcmllcy5wYXR0ZXJuLmZpbHRlci52YWx1ZV9hYm92ZSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzZXJpZXMucGF0dGVybiAmJiBzZXJpZXMucGF0dGVybi5maWx0ZXIgJiYgKHNlcmllcy5wYXR0ZXJuLmZpbHRlci52YWx1ZV9iZWxvdyAhPT0gXCJcIiB8fCBzZXJpZXMucGF0dGVybi5maWx0ZXIudmFsdWVfYWJvdmUgIT09IFwiXCIpKSB7XHJcbiAgICAgICAgICBpZiAoc2VyaWVzLnBhdHRlcm4uZmlsdGVyLnZhbHVlX2JlbG93ICE9PSBcIlwiICYmIHNlcmllcy52YWx1ZSA8ICsoc2VyaWVzLnBhdHRlcm4uZmlsdGVyLnZhbHVlX2JlbG93KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoc2VyaWVzLnBhdHRlcm4uZmlsdGVyLnZhbHVlX2Fib3ZlICE9PSBcIlwiICYmIHNlcmllcy52YWx1ZSA+ICsoc2VyaWVzLnBhdHRlcm4uZmlsdGVyLnZhbHVlX2Fib3ZlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgLy8gQXNzaWduIFJvdyBOYW1lXHJcbiAgICAgIHRoaXMuZGF0YUNvbXB1dGVkID0gdGhpcy5kYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgc2VyaWVzLnJvd19uYW1lID0gc2VyaWVzLnBhdHRlcm4ucm93X25hbWUgfHwgZGVmYXVsdFBhdHRlcm4ucm93X25hbWU7XHJcbiAgICAgICAgc2VyaWVzLnJvd19uYW1lID0gc2VyaWVzLnJvd19uYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlciArIFwic2VyaWVzXCIgKyB0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlciwgXCJnXCIpLCBzZXJpZXMuYWxpYXMpO1xyXG4gICAgICAgIHNlcmllcy5yb3dfbmFtZSA9IHNlcmllcy5hbGlhcy5zcGxpdChzZXJpZXMucGF0dGVybi5kZWxpbWl0ZXIgfHwgXCIuXCIpLnJlZHVjZSgociwgaXQsIGkpID0+IHtcclxuICAgICAgICAgIHJldHVybiByLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlciArIGkgKyB0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlciwgXCJnXCIpLCBpdCk7XHJcbiAgICAgICAgfSwgc2VyaWVzLnJvd19uYW1lKTtcclxuICAgICAgICBpZiAoc2VyaWVzLmFsaWFzLnNwbGl0KHNlcmllcy5wYXR0ZXJuLmRlbGltaXRlciB8fCBcIi5cIikubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICBzZXJpZXMucm93X25hbWUgPSBzZXJpZXMuYWxpYXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBBc3NpZ24gQ29sIE5hbWVcclxuICAgICAgdGhpcy5kYXRhQ29tcHV0ZWQgPSB0aGlzLmRhdGFDb21wdXRlZC5tYXAoc2VyaWVzID0+IHtcclxuICAgICAgICBzZXJpZXMuY29sX25hbWUgPSBzZXJpZXMucGF0dGVybi5jb2xfbmFtZSB8fCBkZWZhdWx0UGF0dGVybi5jb2xfbmFtZTtcclxuICAgICAgICBzZXJpZXMuY29sX25hbWUgPSBzZXJpZXMuYWxpYXMuc3BsaXQoc2VyaWVzLnBhdHRlcm4uZGVsaW1pdGVyIHx8IFwiLlwiKS5yZWR1Y2UoKHIsIGl0LCBpKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gci5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIgKyBpICsgdGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIsIFwiZ1wiKSwgaXQpO1xyXG4gICAgICAgIH0sIHNlcmllcy5jb2xfbmFtZSk7XHJcbiAgICAgICAgaWYgKHNlcmllcy5hbGlhcy5zcGxpdChzZXJpZXMucGF0dGVybi5kZWxpbWl0ZXIgfHwgXCIuXCIpLmxlbmd0aCA9PT0gMSB8fCBzZXJpZXMucm93X25hbWUgPT09IHNlcmllcy5hbGlhcykge1xyXG4gICAgICAgICAgc2VyaWVzLmNvbF9uYW1lID0gc2VyaWVzLnBhdHRlcm4uY29sX25hbWUgfHwgXCJWYWx1ZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gQXNzaWduIFJvd0NvbCBLZXlcclxuICAgICAgdGhpcy5kYXRhQ29tcHV0ZWQgPSB0aGlzLmRhdGFDb21wdXRlZC5tYXAoc2VyaWVzID0+IHtcclxuICAgICAgICBzZXJpZXMua2V5X25hbWUgPSBzZXJpZXMucm93X25hbWUgKyBcIiNcIiArIHNlcmllcy5jb2xfbmFtZTtcclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gQXNzaWduIFRocmVzaG9sZHNcclxuICAgICAgdGhpcy5kYXRhQ29tcHV0ZWQgPSB0aGlzLmRhdGFDb21wdXRlZC5tYXAoc2VyaWVzID0+IHtcclxuICAgICAgICBzZXJpZXMudGhyZXNob2xkcyA9IChzZXJpZXMucGF0dGVybi50aHJlc2hvbGRzIHx8IGRlZmF1bHRQYXR0ZXJuLnRocmVzaG9sZHMpLnNwbGl0KFwiLFwiKS5tYXAoZCA9PiArZCk7XHJcbiAgICAgICAgaWYgKHNlcmllcy5wYXR0ZXJuLmVuYWJsZV90aW1lX2Jhc2VkX3RocmVzaG9sZHMpIHtcclxuICAgICAgICAgIGxldCBtZXRyaWNyZWNpdmVkVGltZVN0YW1wID0gc2VyaWVzLmN1cnJlbnRfc2VydmVydGltZXN0YW1wIHx8IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICBsZXQgbWV0cmljcmVjaXZlZFRpbWVTdGFtcF9pbm51bWJlciA9IG1ldHJpY3JlY2l2ZWRUaW1lU3RhbXAuZ2V0SG91cnMoKSAqIDEwMCArIG1ldHJpY3JlY2l2ZWRUaW1lU3RhbXAuZ2V0TWludXRlcygpO1xyXG4gICAgICAgICAgbGV0IHdlZWtkYXlzID0gW1wic3VuXCIsIFwibW9uXCIsIFwidHVlXCIsIFwid2VkXCIsIFwidGh1XCIsIFwiZnJpXCIsIFwic2F0XCJdO1xyXG4gICAgICAgICAgXy5lYWNoKHNlcmllcy5wYXR0ZXJuLnRpbWVfYmFzZWRfdGhyZXNob2xkcywgKHRidHgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRidHggJiYgdGJ0eC5mcm9tICYmIHRidHgudG8gJiYgdGJ0eC5lbmFibGVkRGF5cyAmJlxyXG4gICAgICAgICAgICAgIChtZXRyaWNyZWNpdmVkVGltZVN0YW1wX2lubnVtYmVyID49ICsodGJ0eC5mcm9tKSkgJiZcclxuICAgICAgICAgICAgICAobWV0cmljcmVjaXZlZFRpbWVTdGFtcF9pbm51bWJlciA8PSArKHRidHgudG8pKSAmJlxyXG4gICAgICAgICAgICAgICh0YnR4LmVuYWJsZWREYXlzLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih3ZWVrZGF5c1ttZXRyaWNyZWNpdmVkVGltZVN0YW1wLmdldERheSgpXSkgPiAtMSkgJiZcclxuICAgICAgICAgICAgICB0YnR4LnRocmVzaG9sZFxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICBzZXJpZXMudGhyZXNob2xkcyA9ICh0YnR4LnRocmVzaG9sZCArIFwiXCIpLnNwbGl0KFwiLFwiKS5tYXAoZCA9PiArZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gQXNzaWduIEJHIENvbG9yc1xyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy5lbmFibGVfYmdDb2xvciA9IHNlcmllcy5wYXR0ZXJuLmVuYWJsZV9iZ0NvbG9yO1xyXG4gICAgICAgIHNlcmllcy5iZ0NvbG9ycyA9IChzZXJpZXMucGF0dGVybi5iZ0NvbG9ycyB8fCBkZWZhdWx0UGF0dGVybi5iZ0NvbG9ycykuc3BsaXQoXCJ8XCIpO1xyXG4gICAgICAgIHNlcmllcy5iZ0NvbG9yID0gc2VyaWVzLmVuYWJsZV9iZ0NvbG9yID09PSB0cnVlID8gdGhpcy5jb21wdXRlQmdDb2xvcihzZXJpZXMudGhyZXNob2xkcywgc2VyaWVzLmJnQ29sb3JzLCBzZXJpZXMudmFsdWUpIDogXCJ0cmFuc3BhcmVudFwiO1xyXG4gICAgICAgIGlmIChzZXJpZXMuZGlzcGxheVZhbHVlID09PSAoc2VyaWVzLnBhdHRlcm4ubnVsbF92YWx1ZSB8fCBkZWZhdWx0UGF0dGVybi5udWxsX3ZhbHVlIHx8IFwiTnVsbFwiKSkge1xyXG4gICAgICAgICAgc2VyaWVzLmJnQ29sb3IgPSBzZXJpZXMucGF0dGVybi5udWxsX2NvbG9yIHx8IGRlZmF1bHRQYXR0ZXJuLm51bGxfY29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBCRyBDb2xvcnMgb3ZlcnJpZGVzXHJcbiAgICAgIHRoaXMuZGF0YUNvbXB1dGVkID0gdGhpcy5kYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgc2VyaWVzLmVuYWJsZV9iZ0NvbG9yX292ZXJyaWRlcyA9IHNlcmllcy5wYXR0ZXJuLmVuYWJsZV9iZ0NvbG9yX292ZXJyaWRlcztcclxuICAgICAgICBzZXJpZXMuYmdDb2xvcnNfb3ZlcnJpZGVzID0gc2VyaWVzLnBhdHRlcm4uYmdDb2xvcnNfb3ZlcnJpZGVzIHx8IFwiXCI7XHJcbiAgICAgICAgaWYgKHNlcmllcy5lbmFibGVfYmdDb2xvcl9vdmVycmlkZXMgJiYgc2VyaWVzLmJnQ29sb3JzX292ZXJyaWRlcyAhPT0gXCJcIikge1xyXG4gICAgICAgICAgbGV0IF9iZ0NvbG9yc19vdmVycmlkZXMgPSBzZXJpZXMuYmdDb2xvcnNfb3ZlcnJpZGVzLnNwbGl0KFwifFwiKS5maWx0ZXIoY29uID0+IGNvbi5pbmRleE9mKFwiLT5cIikpLm1hcChjb24gPT4gY29uLnNwbGl0KFwiLT5cIikpLmZpbHRlcihjb24gPT4gKyhjb25bMF0pID09PSBzZXJpZXMudmFsdWUpLm1hcChjb24gPT4gY29uWzFdKTtcclxuICAgICAgICAgIGlmIChfYmdDb2xvcnNfb3ZlcnJpZGVzLmxlbmd0aCA+IDAgJiYgX2JnQ29sb3JzX292ZXJyaWRlc1swXSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICBzZXJpZXMuYmdDb2xvciA9IHV0aWxzLm5vcm1hbGl6ZUNvbG9yKChcIlwiICsgX2JnQ29sb3JzX292ZXJyaWRlc1swXSkudHJpbSgpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIFZhbHVlIFRyYW5zZm9ybVxyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy5lbmFibGVfdHJhbnNmb3JtID0gc2VyaWVzLnBhdHRlcm4uZW5hYmxlX3RyYW5zZm9ybTtcclxuICAgICAgICBzZXJpZXMudHJhbnNmb3JtX3ZhbHVlcyA9IChzZXJpZXMucGF0dGVybi50cmFuc2Zvcm1fdmFsdWVzIHx8IGRlZmF1bHRQYXR0ZXJuLnRyYW5zZm9ybV92YWx1ZXMpLnNwbGl0KFwifFwiKTtcclxuICAgICAgICBzZXJpZXMuZGlzcGxheVZhbHVlID0gc2VyaWVzLmVuYWJsZV90cmFuc2Zvcm0gPT09IHRydWUgPyB0aGlzLnRyYW5zZm9ybVZhbHVlKHNlcmllcy50aHJlc2hvbGRzLCBzZXJpZXMudHJhbnNmb3JtX3ZhbHVlcywgc2VyaWVzLnZhbHVlLCBzZXJpZXMuZGlzcGxheVZhbHVlLCBzZXJpZXMucm93X25hbWUsIHNlcmllcy5jb2xfbmFtZSkgOiBzZXJpZXMuZGlzcGxheVZhbHVlO1xyXG4gICAgICAgIGlmIChzZXJpZXMuZGlzcGxheVZhbHVlID09PSAoc2VyaWVzLnBhdHRlcm4ubnVsbF92YWx1ZSB8fCBkZWZhdWx0UGF0dGVybi5udWxsX3ZhbHVlIHx8IFwiTnVsbFwiKSkge1xyXG4gICAgICAgICAgc2VyaWVzLmRpc3BsYXlWYWx1ZSA9IHNlcmllcy5wYXR0ZXJuLm51bGxfdmFsdWUgfHwgZGVmYXVsdFBhdHRlcm4ubnVsbF92YWx1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzTmFOKHNlcmllcy52YWx1ZSkpIHtcclxuICAgICAgICAgIHNlcmllcy5kaXNwbGF5VmFsdWUgPSBzZXJpZXMucGF0dGVybi5udWxsX3ZhbHVlIHx8IGRlZmF1bHRQYXR0ZXJuLm51bGxfdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBWYWx1ZSBUcmFuc2Zvcm0gT3ZlcnJpZGVzXHJcbiAgICAgIHRoaXMuZGF0YUNvbXB1dGVkID0gdGhpcy5kYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgc2VyaWVzLmVuYWJsZV90cmFuc2Zvcm1fb3ZlcnJpZGVzID0gc2VyaWVzLnBhdHRlcm4uZW5hYmxlX3RyYW5zZm9ybV9vdmVycmlkZXM7XHJcbiAgICAgICAgc2VyaWVzLnRyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzID0gc2VyaWVzLnBhdHRlcm4udHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXMgfHwgXCJcIjtcclxuICAgICAgICBpZiAoc2VyaWVzLmVuYWJsZV90cmFuc2Zvcm1fb3ZlcnJpZGVzICYmIHNlcmllcy50cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlcyAhPT0gXCJcIikge1xyXG4gICAgICAgICAgbGV0IF90cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlcyA9IHNlcmllcy50cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlcy5zcGxpdChcInxcIikuZmlsdGVyKGNvbiA9PiBjb24uaW5kZXhPZihcIi0+XCIpKS5tYXAoY29uID0+IGNvbi5zcGxpdChcIi0+XCIpKS5maWx0ZXIoY29uID0+ICsoY29uWzBdKSA9PT0gc2VyaWVzLnZhbHVlKS5tYXAoY29uID0+IGNvblsxXSk7XHJcbiAgICAgICAgICBpZiAoX3RyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzLmxlbmd0aCA+IDAgJiYgX3RyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzWzBdICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHNlcmllcy5kaXNwbGF5VmFsdWUgPSAoXCJcIiArIF90cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlc1swXSkudHJpbSgpLnJlcGxhY2UobmV3IFJlZ0V4cChcIl92YWx1ZV9cIiwgXCJnXCIpLCBzZXJpZXMuZGlzcGxheVZhbHVlKS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfcm93X25hbWVfXCIsIFwiZ1wiKSwgc2VyaWVzLnJvd19uYW1lKS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfY29sX25hbWVfXCIsIFwiZ1wiKSwgc2VyaWVzLmNvbF9uYW1lKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIEZvbnQgYXdlc29tZSBpY29ucyAmIEltYWdlcyBpbiB2YWx1ZVxyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy5hY3R1YWxfZGlzcGxheXZhbHVlID0gc2VyaWVzLmRpc3BsYXlWYWx1ZTtcclxuICAgICAgICBzZXJpZXMuYWN0dWFsX3Jvd19uYW1lID0gc2VyaWVzLnJvd19uYW1lO1xyXG4gICAgICAgIHNlcmllcy5hY3R1YWxfY29sX25hbWUgPSBzZXJpZXMuY29sX25hbWU7XHJcbiAgICAgICAgc2VyaWVzLmRpc3BsYXlWYWx1ZSA9IHV0aWxzLnJlcGxhY2VUb2tlbnMoc2VyaWVzLmRpc3BsYXlWYWx1ZSk7XHJcbiAgICAgICAgc2VyaWVzLnJvd19uYW1lID0gdXRpbHMucmVwbGFjZVRva2VucyhzZXJpZXMucm93X25hbWUpO1xyXG4gICAgICAgIHNlcmllcy5jb2xfbmFtZSA9IHV0aWxzLnJlcGxhY2VUb2tlbnMoc2VyaWVzLmNvbF9uYW1lKTtcclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gQ2VsbCBMaW5rc1xyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIGlmIChzZXJpZXMucGF0dGVybi5lbmFibGVfY2xpY2thYmxlX2NlbGxzKSB7XHJcbiAgICAgICAgICBsZXQgdGFyZ2V0TGluayA9IHNlcmllcy5wYXR0ZXJuLmNsaWNrYWJsZV9jZWxsc19saW5rIHx8IFwiI1wiO1xyXG4gICAgICAgICAgdGFyZ2V0TGluayA9IHRhcmdldExpbmsucmVwbGFjZShuZXcgUmVnRXhwKFwiX3Jvd19uYW1lX1wiLCBcImdcIiksIHV0aWxzLmdldEFjdHVhbE5hbWVXaXRob3V0VG9rZW5zKHNlcmllcy5hY3R1YWxfcm93X25hbWUpLnRyaW0oKSk7XHJcbiAgICAgICAgICB0YXJnZXRMaW5rID0gdGFyZ2V0TGluay5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfY29sX25hbWVfXCIsIFwiZ1wiKSwgdXRpbHMuZ2V0QWN0dWFsTmFtZVdpdGhvdXRUb2tlbnMoc2VyaWVzLmFjdHVhbF9jb2xfbmFtZSkudHJpbSgpKTtcclxuICAgICAgICAgIHRhcmdldExpbmsgPSB0YXJnZXRMaW5rLnJlcGxhY2UobmV3IFJlZ0V4cChcIl92YWx1ZV9cIiwgXCJnXCIpLCB1dGlscy5nZXRBY3R1YWxOYW1lV2l0aG91dFRva2VucyhzZXJpZXMudmFsdWUpLnRyaW0oKSk7XHJcbiAgICAgICAgICBzZXJpZXMuZGlzcGxheVZhbHVlID0gYDxhIGhyZWY9XCIke3RhcmdldExpbmt9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+JHtzZXJpZXMuZGlzcGxheVZhbHVlfTwvYT5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gSGFuZGxlIE51bGwgVmFsdWVcclxuICAgICAgdGhpcy5kYXRhQ29tcHV0ZWQgPSB0aGlzLmRhdGFDb21wdXRlZC5tYXAoc2VyaWVzID0+IHtcclxuICAgICAgICBpZiAoXy5pc05hTihzZXJpZXMudmFsdWUpIHx8IHNlcmllcy52YWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgc2VyaWVzLmJnQ29sb3IgPSBzZXJpZXMucGF0dGVybi5udWxsX2NvbG9yIHx8IGRlZmF1bHRQYXR0ZXJuLm51bGxfY29sb3IgfHwgXCJkYXJrcmVkXCI7XHJcbiAgICAgICAgICBzZXJpZXMuZGlzcGxheVZhbHVlID0gc2VyaWVzLnBhdHRlcm4ubnVsbF92YWx1ZSB8fCBkZWZhdWx0UGF0dGVybi5udWxsX3ZhbHVlIHx8IFwiTm8gZGF0YVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gR3JvdXBpbmdcclxuICAgICAgY29uc3Qgcm93c19mb3VuZCA9IHV0aWxzLmdldEZpZWxkcyh0aGlzLmRhdGFDb21wdXRlZCwgXCJyb3dfbmFtZVwiKTtcclxuICAgICAgY29uc3QgY29sc19mb3VuZCA9IHV0aWxzLmdldEZpZWxkcyh0aGlzLmRhdGFDb21wdXRlZCwgXCJjb2xfbmFtZVwiKTtcclxuICAgICAgY29uc3Qga2V5c19mb3VuZCA9IHV0aWxzLmdldEZpZWxkcyh0aGlzLmRhdGFDb21wdXRlZCwgXCJrZXlfbmFtZVwiKTtcclxuICAgICAgY29uc3QgaXNfdW5pcXVlX2tleXMgPSAoa2V5c19mb3VuZC5sZW5ndGggPT09IF8udW5pcShrZXlzX2ZvdW5kKS5sZW5ndGgpO1xyXG4gICAgICBpZiAoaXNfdW5pcXVlX2tleXMpIHtcclxuICAgICAgICB0aGlzLnBhbmVsLmVycm9yID0gdW5kZWZpbmVkOyAvLy8vXHJcbiAgICAgICAgbGV0IG91dHB1dDogYW55W10gPSBbXTtcclxuICAgICAgICBfLmVhY2goXy51bmlxKHJvd3NfZm91bmQpLCAocm93X25hbWUpID0+IHtcclxuICAgICAgICAgIGxldCBvOiBhbnkgPSB7fTtcclxuICAgICAgICAgIG8ucm93ID0gcm93X25hbWU7XHJcbiAgICAgICAgICBvLmNvbHMgPSBbXTtcclxuICAgICAgICAgIF8uZWFjaChfLnVuaXEoY29sc19mb3VuZCksIChjb2xfbmFtZSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2hlZF92YWx1ZSA9IChfLmZpbmQodGhpcy5kYXRhQ29tcHV0ZWQsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGUucm93X25hbWUgPT09IHJvd19uYW1lICYmIGUuY29sX25hbWUgPT09IGNvbF9uYW1lO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIGlmICghbWF0Y2hlZF92YWx1ZSkge1xyXG4gICAgICAgICAgICAgIG1hdGNoZWRfdmFsdWUgPSB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5VmFsdWU6IFwiTi9BXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogTmFOXHJcbiAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvLmNvbHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgXCJhY3R1YWxfY29sX25hbWVcIjogbWF0Y2hlZF92YWx1ZS5hY3R1YWxfY29sX25hbWUsXHJcbiAgICAgICAgICAgICAgXCJhY3R1YWxfcm93X25hbWVcIjogbWF0Y2hlZF92YWx1ZS5hY3R1YWxfcm93X25hbWUsXHJcbiAgICAgICAgICAgICAgXCJiZ0NvbG9yXCI6IG1hdGNoZWRfdmFsdWUuYmdDb2xvciB8fCBcInRyYW5zcGFyZW50XCIsXHJcbiAgICAgICAgICAgICAgXCJkaXNwbGF5VmFsdWVcIjogbWF0Y2hlZF92YWx1ZS5kaXNwbGF5VmFsdWUgfHwgbWF0Y2hlZF92YWx1ZS52YWx1ZSxcclxuICAgICAgICAgICAgICBcIm5hbWVcIjogY29sX25hbWUsXHJcbiAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBtYXRjaGVkX3ZhbHVlLnZhbHVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBvdXRwdXQucHVzaChvKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyByZWdpb24gT3V0cHV0IHRhYmxlIGNvbnN0cnVjdGlvblxyXG4gICAgICAgIGxldCBib29tdGFibGVfb3V0cHV0X2JvZHlfaGVhZGVycyA9IHRoaXMuZWxlbS5maW5kKFwiI2Jvb210YWJsZV9vdXRwdXRfYm9keV9oZWFkZXJzXCIpO1xyXG4gICAgICAgIGxldCBib29tdGFibGVfb3V0cHV0X2JvZHlfaGVhZGVyc19vdXRwdXQgPSBgPGJyLz5gO1xyXG4gICAgICAgIGlmICh0aGlzLnBhbmVsLmhpZGVfaGVhZGVycyAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgYm9vbXRhYmxlX291dHB1dF9ib2R5X2hlYWRlcnNfb3V0cHV0ICs9IFwiPHRyPlwiO1xyXG4gICAgICAgICAgaWYgKHRoaXMucGFuZWwuaGlkZV9maXJzdF9jb2x1bW4gIT09IHRydWUpIHtcclxuICAgICAgICAgICAgYm9vbXRhYmxlX291dHB1dF9ib2R5X2hlYWRlcnNfb3V0cHV0ICs9IGA8dGggc3R5bGU9XCJwYWRkaW5nOjRweDt0ZXh0LWFsaWduOmNlbnRlclwiPiR7dGhpcy5wYW5lbC5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzfTwvdGg+YDtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIF8uZWFjaChfLnVuaXEoY29sc19mb3VuZCksIGMgPT4ge1xyXG4gICAgICAgICAgICBib29tdGFibGVfb3V0cHV0X2JvZHlfaGVhZGVyc19vdXRwdXQgKz0gYDx0aCBzdHlsZT1cInBhZGRpbmc6NHB4O3RleHQtYWxpZ246Y2VudGVyXCI+JHtjfTwvdGg+YDtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgYm9vbXRhYmxlX291dHB1dF9ib2R5X2hlYWRlcnNfb3V0cHV0ICs9IFwiPC90cj5cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYm9vbXRhYmxlX291dHB1dF9ib2R5X2hlYWRlcnMuaHRtbChib29tdGFibGVfb3V0cHV0X2JvZHlfaGVhZGVyc19vdXRwdXQpO1xyXG4gICAgICAgIGxldCBib29tdGFibGVfb3V0cHV0X2JvZHkgPSB0aGlzLmVsZW0uZmluZCgnI2Jvb210YWJsZV9vdXRwdXRfYm9keScpO1xyXG4gICAgICAgIGxldCBib29tdGFibGVfb3V0cHV0X2JvZHlfb3V0cHV0ID0gYGA7XHJcbiAgICAgICAgXy5lYWNoKG91dHB1dCwgbyA9PiB7XHJcbiAgICAgICAgICBib29tdGFibGVfb3V0cHV0X2JvZHlfb3V0cHV0ICs9IFwiPHRyPlwiO1xyXG4gICAgICAgICAgaWYgKHRoaXMucGFuZWwuaGlkZV9maXJzdF9jb2x1bW4gIT09IHRydWUpIHtcclxuICAgICAgICAgICAgYm9vbXRhYmxlX291dHB1dF9ib2R5X291dHB1dCArPSBgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7XCI+JHtvLnJvd308L3RkPmA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBfLmVhY2goby5jb2xzLCBjID0+IHtcclxuICAgICAgICAgICAgYm9vbXRhYmxlX291dHB1dF9ib2R5X291dHB1dCArPSBgPHRkXHJcbiAgICAgICAgICAgICAgc3R5bGU9XCJwYWRkaW5nOjRweDtiYWNrZ3JvdW5kLWNvbG9yOiR7Yy5iZ0NvbG9yfVwiXHJcbiAgICAgICAgICAgICAgdGl0bGU9XCIkeyBcIlJvdyBOYW1lIDogXCIgKyB1dGlscy5nZXRBY3R1YWxOYW1lV2l0aG91dFRva2VucyhjLmFjdHVhbF9yb3dfbmFtZSkgKyBcIlxcbkNvbCBOYW1lIDogXCIgKyB1dGlscy5nZXRBY3R1YWxOYW1lV2l0aG91dFRva2VucyhjLmFjdHVhbF9jb2xfbmFtZSkgKyBcIlxcblZhbHVlIDogXCIgKyBjLnZhbHVlfVwiXHJcbiAgICAgICAgICAgID4ke2MuZGlzcGxheVZhbHVlfTwvdGQ+YDtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgYm9vbXRhYmxlX291dHB1dF9ib2R5X291dHB1dCArPSBcIjwvdHI+XCI7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYm9vbXRhYmxlX291dHB1dF9ib2R5Lmh0bWwoYm9vbXRhYmxlX291dHB1dF9ib2R5X291dHB1dCk7XHJcbiAgICAgICAgLy8gZW5kcmVnaW9uXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IGR1cGxpY2F0ZUtleVZhbHVlcyA9IF8udW5pcShrZXlzX2ZvdW5kLmZpbHRlcih2ID0+IHtcclxuICAgICAgICAgIHJldHVybiBrZXlzX2ZvdW5kLmZpbHRlcih0ID0+IHQgPT09IHYpLmxlbmd0aCA+IDE7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIGxldCBlcnJfZHVwbGljYXRlS2V5cyA9IG5ldyBFcnJvcigpO1xyXG4gICAgICAgIGVycl9kdXBsaWNhdGVLZXlzLm5hbWUgPSBcIkR1cGxpY2F0ZSBrZXlzIGZvdW5kXCI7XHJcbiAgICAgICAgZXJyX2R1cGxpY2F0ZUtleXMubWVzc2FnZSA9IFwiRHVwbGljYXRlIGtleSB2YWx1ZXMgOiA8YnIvPlwiICsgZHVwbGljYXRlS2V5VmFsdWVzLmpvaW4oXCI8YnIvPiBcIik7XHJcbiAgICAgICAgdGhpcy5wYW5lbC5lcnJvciA9IGVycl9kdXBsaWNhdGVLZXlzO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyByZWdpb24gRGVidWcgdGFibGUgYm9keSBjb25zdHJ1Y3Rpb25cclxuICAgICAgbGV0IGJvb210YWJsZV9vdXRwdXRfYm9keV9kZWJ1ZyA9IHRoaXMuZWxlbS5maW5kKCcjYm9vbXRhYmxlX291dHB1dF9ib2R5X2RlYnVnJyk7XHJcbiAgICAgIGxldCBib29tdGFibGVfb3V0cHV0X2JvZHlfZGVidWdfb3V0cHV0ID0gYGA7XHJcbiAgICAgIF8uZWFjaCh0aGlzLmRhdGFDb21wdXRlZCwgZCA9PiB7XHJcbiAgICAgICAgYm9vbXRhYmxlX291dHB1dF9ib2R5X2RlYnVnX291dHB1dCArPSBgXHJcbiAgICAgICAgPHRyPlxyXG4gICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7XCIgd2lkdGg9XCI0MCVcIj4ke2QuYWxpYXN9PC90ZD5cclxuICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O1wiPiR7ZC5wYXR0ZXJuLnBhdHRlcm4gfHwgXCJEZWZhdWx0XCJ9PC90ZD5cclxuICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O2JhY2tncm91bmQtY29sb3I6JHtkLmJnQ29sb3J9XCI+JHtkLmRpc3BsYXlWYWx1ZX08L3RkPlxyXG4gICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7XCI+JHtkLnJvd19uYW1lfTwvdGQ+XHJcbiAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDtcIj4ke2QuY29sX25hbWV9PC90ZD5cclxuICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O1wiPiR7ZC50aHJlc2hvbGRzfTwvdGQ+XHJcbiAgICAgICAgPC90cj5cclxuICAgICAgICBgO1xyXG4gICAgICB9KTtcclxuICAgICAgYm9vbXRhYmxlX291dHB1dF9ib2R5X2RlYnVnLmh0bWwoYm9vbXRhYmxlX291dHB1dF9ib2R5X2RlYnVnX291dHB1dCk7XHJcbiAgICAgIC8vIGVuZHJlZ2lvblxyXG4gICAgfVxyXG4gICAgbGV0IHJvb3RFbGVtID0gdGhpcy5lbGVtLmZpbmQoJy50YWJsZS1wYW5lbC1zY3JvbGwnKTtcclxuICAgIGxldCBtYXhoZWlnaHRvZnBhbmVsID0gdGhpcy5wYW5lbC5kZWJ1Z19tb2RlID8gdGhpcy5jdHJsLmhlaWdodCAtIDcxIDogdGhpcy5jdHJsLmhlaWdodCAtIDMxO1xyXG4gICAgcm9vdEVsZW0uY3NzKHsgJ21heC1oZWlnaHQnOiBtYXhoZWlnaHRvZnBhbmVsICsgXCJweFwiIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgR3JhZmFuYUJvb21UYWJsZUN0cmwgYXMgUGFuZWxDdHJsXHJcbn07XHJcbiJdfQ==