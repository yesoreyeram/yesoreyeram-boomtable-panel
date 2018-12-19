System.register(["./app/app", "lodash", "./app/BoomTablePattern"], function (exports_1, context_1) {
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
    var app_1, lodash_1, BoomTablePattern_1, GrafanaBoomTableCtrl;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (app_1_1) {
                app_1 = app_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (BoomTablePattern_1_1) {
                BoomTablePattern_1 = BoomTablePattern_1_1;
            }
        ],
        execute: function () {
            app_1.loadPluginCss(app_1.config.list_of_stylesheets);
            GrafanaBoomTableCtrl = (function (_super) {
                __extends(GrafanaBoomTableCtrl, _super);
                function GrafanaBoomTableCtrl($scope, $injector) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.unitFormats = app_1.kbn.getUnitFormats();
                    _this.valueNameOptions = app_1.config.valueNameOptions;
                    lodash_1.default.defaults(_this.panel, app_1.config.panelDefaults);
                    Object.setPrototypeOf(_this.panel.defaultPattern, BoomTablePattern_1.BoomTablePattern.prototype);
                    _this.panel.patterns.map(function (pattern) {
                        Object.setPrototypeOf(pattern, BoomTablePattern_1.BoomTablePattern.prototype);
                        return pattern;
                    });
                    _this.events.on("data-received", _this.onDataReceived.bind(_this));
                    _this.events.on("init-edit-mode", _this.onInitEditMode.bind(_this));
                    return _this;
                }
                GrafanaBoomTableCtrl.prototype.onInitEditMode = function () {
                    var _this = this;
                    lodash_1.default.each(app_1.config.editorTabs, function (editor) {
                        _this.addEditorTab(editor.name, "public/plugins/" + app_1.config.plugin_id + editor.template, editor.position);
                    });
                };
                GrafanaBoomTableCtrl.prototype.onDataReceived = function (data) {
                    this.dataReceived = data;
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.seriesHandler = function (seriesData) {
                    var series = new app_1.TimeSeries({
                        alias: seriesData.target,
                        datapoints: seriesData.datapoints || []
                    });
                    series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
                    return series;
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
                GrafanaBoomTableCtrl.prototype.add_time_based_thresholds = function (index) {
                    var new_time_based_threshold = {
                        enabledDays: "Sun,Mon,Tue,Wed,Thu,Fri,Sat",
                        from: "0000",
                        name: "Early morning of everyday",
                        threshold: "70,90",
                        to: "0530"
                    };
                    if (index === 'default') {
                        this.panel.defaultPattern.time_based_thresholds = this.panel.defaultPattern.time_based_thresholds || [];
                        this.panel.defaultPattern.time_based_thresholds.push(new_time_based_threshold);
                    }
                    else {
                        this.panel.patterns[index].time_based_thresholds = this.panel.patterns[index].time_based_thresholds || [];
                        this.panel.patterns[index].time_based_thresholds.push(new_time_based_threshold);
                    }
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.remove_time_based_thresholds = function (patternIndex, index) {
                    if (patternIndex === 'default') {
                        this.panel.defaultPattern.time_based_thresholds.splice(index, 1);
                    }
                    else {
                        this.panel.patterns[patternIndex].time_based_thresholds.splice(index, 1);
                    }
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
                                return app_1.utils.normalizeColor(bgColors[i]);
                            }
                        }
                        return app_1.utils.normalizeColor(lodash_1.default.first(bgColors));
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
                GrafanaBoomTableCtrl.prototype.replaceFontAwesomeIcons = function (value) {
                    if (!value) {
                        return value;
                    }
                    return (value + "")
                        .split(" ")
                        .map(function (a) {
                        if (a.startsWith("_fa-") && a.endsWith("_")) {
                            var icon = a.replace(/\_/g, "").split(",")[0];
                            var color = a.indexOf(",") > -1 ? " style=\"color:" + app_1.utils.normalizeColor(a.replace(/\_/g, "").split(",")[1]) + "\" " : "";
                            var repeatCount = a.split(",").length > 2 ? +(a.replace(/\_/g, "").split(",")[2]) : 1;
                            a = ("<i class=\"fa " + icon + "\" " + color + "></i> ").repeat(repeatCount);
                        }
                        return a;
                    })
                        .join(" ");
                };
                GrafanaBoomTableCtrl.prototype.replaceWithImages = function (value) {
                    if (!value) {
                        return value;
                    }
                    return (value + "")
                        .split(" ")
                        .map(function (a) {
                        if (a.startsWith("_img-") && a.endsWith("_")) {
                            a = a.slice(0, -1);
                            var imgUrl = a.replace("_img-", "").split(",")[0];
                            var imgWidth = a.split(",").length > 1 ? a.replace("_img-", "").split(",")[1] : "20px";
                            var imgHeight = a.split(",").length > 2 ? a.replace("_img-", "").split(",")[2] : "20px";
                            var repeatCount = a.split(",").length > 3 ? +(a.replace("_img-", "").split(",")[3]) : 1;
                            a = ("<img width=\"" + imgWidth + "\" height=\"" + imgHeight + "\" src=\"" + imgUrl + "\"/>").repeat(repeatCount);
                        }
                        return a;
                    })
                        .join(" ");
                };
                GrafanaBoomTableCtrl.prototype.getActualNameWithoutTransformSign = function (value) {
                    return (value + "")
                        .split(" ")
                        .map(function (a) {
                        if (a.startsWith("_fa-") && a.endsWith("_")) {
                            a = "";
                        }
                        if (a.startsWith("_img-") && a.endsWith("_")) {
                            a = "";
                        }
                        return a;
                    })
                        .join(" ");
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
                GrafanaBoomTableCtrl.prototype.setUnitFormat = function (subItem, index) {
                    if (index === -1) {
                        this.panel.defaultPattern.format = subItem.value;
                    }
                    else {
                        this.panel.patterns[index].format = subItem.value;
                    }
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
                GrafanaBoomTableCtrl.templateUrl = "partials/module.html";
                return GrafanaBoomTableCtrl;
            }(app_1.MetricsPanelCtrl));
            exports_1("PanelCtrl", GrafanaBoomTableCtrl);
            GrafanaBoomTableCtrl.prototype.render = function () {
                var _this = this;
                if (this.dataReceived) {
                    this.dataComputed = this.dataReceived;
                    this.panel.default_title_for_rows = this.panel.default_title_for_rows || app_1.config.default_title_for_rows;
                    var metricsReceived_1 = app_1.utils.getFields(this.dataComputed, "target");
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
                                series.pattern = _this.panel.defaultPattern || app_1.config.panelDefaults.defaultPattern;
                            }
                            return series;
                        });
                        this.dataComputed = this.dataComputed.map(function (series) {
                            series.decimals = (series.pattern.decimals) || app_1.config.panelDefaults.defaultPattern.decimals;
                            return series;
                        });
                        this.dataComputed = this.dataComputed.map(function (series) {
                            if (series.stats) {
                                series.value = series.stats[series.pattern.valueName || app_1.config.panelDefaults.defaultPattern.valueName];
                                var decimalInfo = _this.getDecimalsForValue(series.value, series.decimals);
                                var formatFunc = app_1.kbn.valueFormats[series.pattern.format || app_1.config.panelDefaults.defaultPattern.format];
                                if (series.value === null) {
                                    series.displayValue = series.pattern.null_value || app_1.config.panelDefaults.defaultPattern.null_value || "Null";
                                }
                                else if (!isNaN(series.value)) {
                                    series.valueFormatted = formatFunc(series.value, decimalInfo.decimals, decimalInfo.scaledDecimals);
                                    series.valueRounded = app_1.kbn.roundValue(series.value, decimalInfo.decimals);
                                    series.displayValue = series.valueFormatted;
                                }
                                else {
                                    series.displayValue = series.pattern.null_value || app_1.config.panelDefaults.defaultPattern.null_value || "Null";
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
                            series.row_name = series.alias.split(series.pattern.delimiter || ".").reduce(function (r, it, i) {
                                return r.replace(new RegExp(_this.panel.row_col_wrapper + i + _this.panel.row_col_wrapper, "g"), it);
                            }, series.pattern.row_name.replace(new RegExp(_this.panel.row_col_wrapper + "series" + _this.panel.row_col_wrapper, "g"), series.alias) ||
                                app_1.config.panelDefaults.defaultPattern.row_name.replace(new RegExp(_this.panel.row_col_wrapper + "series" + _this.panel.row_col_wrapper, "g"), series.alias));
                            if (series.alias.split(series.pattern.delimiter || ".").length === 1) {
                                series.row_name = series.alias;
                            }
                            return series;
                        });
                        this.dataComputed = this.dataComputed.map(function (series) {
                            series.col_name = series.alias.split(series.pattern.delimiter || ".").reduce(function (r, it, i) {
                                return r.replace(new RegExp(_this.panel.row_col_wrapper + i + _this.panel.row_col_wrapper, "g"), it);
                            }, series.pattern.col_name || app_1.config.panelDefaults.defaultPattern.col_name);
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
                            series.thresholds = (series.pattern.thresholds || app_1.config.panelDefaults.defaultPattern.thresholds).split(",").map(function (d) { return +d; });
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
                            series.bgColors = (series.pattern.bgColors || app_1.config.panelDefaults.defaultPattern.bgColors).split("|");
                            series.bgColor = series.enable_bgColor === true ? _this.computeBgColor(series.thresholds, series.bgColors, series.value) : "transparent";
                            if (series.displayValue === (series.pattern.null_value || app_1.config.panelDefaults.defaultPattern.null_value || "Null")) {
                                series.bgColor = series.pattern.null_color || app_1.config.panelDefaults.defaultPattern.null_color;
                            }
                            return series;
                        });
                        this.dataComputed = this.dataComputed.map(function (series) {
                            series.enable_bgColor_overrides = series.pattern.enable_bgColor_overrides;
                            series.bgColors_overrides = series.pattern.bgColors_overrides || "";
                            if (series.enable_bgColor_overrides && series.bgColors_overrides !== "") {
                                var _bgColors_overrides = series.bgColors_overrides.split("|").filter(function (con) { return con.indexOf("->"); }).map(function (con) { return con.split("->"); }).filter(function (con) { return +(con[0]) === series.value; }).map(function (con) { return con[1]; });
                                if (_bgColors_overrides.length > 0 && _bgColors_overrides[0] !== "") {
                                    series.bgColor = app_1.utils.normalizeColor(("" + _bgColors_overrides[0]).trim());
                                }
                            }
                            return series;
                        });
                        this.dataComputed = this.dataComputed.map(function (series) {
                            series.enable_transform = series.pattern.enable_transform;
                            series.transform_values = (series.pattern.transform_values || app_1.config.panelDefaults.defaultPattern.transform_values).split("|");
                            series.displayValue = series.enable_transform === true ? _this.transformValue(series.thresholds, series.transform_values, series.value, series.displayValue, series.row_name, series.col_name) : series.displayValue;
                            if (series.displayValue === (series.pattern.null_value || app_1.config.panelDefaults.defaultPattern.null_value || "Null")) {
                                series.displayValue = series.pattern.null_value || app_1.config.panelDefaults.defaultPattern.null_value;
                            }
                            else if (isNaN(series.value)) {
                                series.displayValue = series.pattern.null_value || app_1.config.panelDefaults.defaultPattern.null_value;
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
                            if (series.displayValue && series.displayValue.indexOf("_fa-") > -1) {
                                series.displayValue = _this.replaceFontAwesomeIcons(series.displayValue);
                            }
                            if (series.row_name && series.row_name.indexOf("_fa-") > -1) {
                                series.row_name = _this.replaceFontAwesomeIcons(series.row_name);
                            }
                            if (series.col_name && series.col_name.indexOf("_fa-") > -1) {
                                series.col_name = _this.replaceFontAwesomeIcons(series.col_name);
                            }
                            return series;
                        });
                        this.dataComputed = this.dataComputed.map(function (series) {
                            if (series.displayValue && series.displayValue.indexOf("_img-") > -1) {
                                series.displayValue = _this.replaceWithImages(series.displayValue);
                            }
                            if (series.row_name && series.row_name.indexOf("_img-") > -1) {
                                series.row_name = _this.replaceWithImages(series.row_name);
                            }
                            if (series.col_name && series.col_name.indexOf("_img-") > -1) {
                                series.col_name = _this.replaceWithImages(series.col_name);
                            }
                            return series;
                        });
                        this.dataComputed = this.dataComputed.map(function (series) {
                            if (series.pattern.enable_clickable_cells) {
                                var targetLink = series.pattern.clickable_cells_link || "#";
                                targetLink = targetLink.replace(new RegExp("_row_name_", "g"), _this.getActualNameWithoutTransformSign(series.actual_row_name).trim());
                                targetLink = targetLink.replace(new RegExp("_col_name_", "g"), _this.getActualNameWithoutTransformSign(series.actual_col_name).trim());
                                targetLink = targetLink.replace(new RegExp("_value_", "g"), _this.getActualNameWithoutTransformSign(series.value).trim());
                                series.displayValue = "<a href=\"" + targetLink + "\" target=\"_blank\">" + series.displayValue + "</a>";
                            }
                            return series;
                        });
                        var rows_found = app_1.utils.getFields(this.dataComputed, "row_name");
                        var cols_found_1 = app_1.utils.getFields(this.dataComputed, "col_name");
                        var keys_found_1 = app_1.utils.getFields(this.dataComputed, "key_name");
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
                                    boomtable_output_body_output_1 += "<td\n              style=\"padding:4px;background-color:" + c.bgColor + "\"\n              title=\"" + ("Row Name : " + _this.getActualNameWithoutTransformSign(c.actual_row_name) + "\nCol Name : " + _this.getActualNameWithoutTransformSign(c.actual_col_name) + "\nValue : " + c.value) + "\"\n            >" + c.displayValue + "</td>";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFVQSxtQkFBYSxDQUFDLFlBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOztnQkFFUCx3Q0FBZ0I7Z0JBU2pELDhCQUFZLE1BQU0sRUFBRSxTQUFTO29CQUE3QixZQUNFLGtCQUFNLE1BQU0sRUFBRSxTQUFTLENBQUMsU0FTekI7b0JBakJNLGlCQUFXLEdBQVEsU0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN4QyxzQkFBZ0IsR0FBVyxZQUFNLENBQUMsZ0JBQWdCLENBQUM7b0JBUXhELGdCQUFDLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsWUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUM3QyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLG1DQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUM3RSxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQSxPQUFPO3dCQUM3QixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxtQ0FBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFDM0QsT0FBTyxPQUFPLENBQUM7b0JBQ2pCLENBQUMsQ0FBQyxDQUFDO29CQUNILEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNoRSxLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDOztnQkFDbkUsQ0FBQztnQkFDTSw2Q0FBYyxHQUFyQjtvQkFBQSxp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QUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7b0JBQzdGLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDekQ7WUFDSCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIGtibixcclxuICBsb2FkUGx1Z2luQ3NzLFxyXG4gIE1ldHJpY3NQYW5lbEN0cmwsXHJcbiAgVGltZVNlcmllcyxcclxuICB1dGlscyxcclxuICBjb25maWdcclxufSBmcm9tIFwiLi9hcHAvYXBwXCI7XHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IHsgQm9vbVRhYmxlUGF0dGVybiB9IGZyb20gXCIuL2FwcC9Cb29tVGFibGVQYXR0ZXJuXCI7XHJcbmxvYWRQbHVnaW5Dc3MoY29uZmlnLmxpc3Rfb2Zfc3R5bGVzaGVldHMpO1xyXG5cclxuY2xhc3MgR3JhZmFuYUJvb21UYWJsZUN0cmwgZXh0ZW5kcyBNZXRyaWNzUGFuZWxDdHJsIHtcclxuICBwdWJsaWMgc3RhdGljIHRlbXBsYXRlVXJsID0gXCJwYXJ0aWFscy9tb2R1bGUuaHRtbFwiO1xyXG4gIHB1YmxpYyB1bml0Rm9ybWF0czogYW55ID0ga2JuLmdldFVuaXRGb3JtYXRzKCk7XHJcbiAgcHVibGljIHZhbHVlTmFtZU9wdGlvbnM6IE9iamVjdCA9IGNvbmZpZy52YWx1ZU5hbWVPcHRpb25zO1xyXG4gIHB1YmxpYyBkYXRhUmVjZWl2ZWQ6IGFueTtcclxuICBwdWJsaWMgZGF0YUNvbXB1dGVkOiBhbnk7XHJcbiAgcHVibGljIGN0cmw6IGFueTtcclxuICBwdWJsaWMgZWxlbTogYW55O1xyXG4gIHB1YmxpYyBhdHRyczogYW55O1xyXG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJGluamVjdG9yKSB7XHJcbiAgICBzdXBlcigkc2NvcGUsICRpbmplY3Rvcik7XHJcbiAgICBfLmRlZmF1bHRzKHRoaXMucGFuZWwsIGNvbmZpZy5wYW5lbERlZmF1bHRzKTtcclxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLCBCb29tVGFibGVQYXR0ZXJuLnByb3RvdHlwZSk7XHJcbiAgICB0aGlzLnBhbmVsLnBhdHRlcm5zLm1hcChwYXR0ZXJuID0+IHtcclxuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHBhdHRlcm4sIEJvb21UYWJsZVBhdHRlcm4ucHJvdG90eXBlKTtcclxuICAgICAgcmV0dXJuIHBhdHRlcm47XHJcbiAgICB9KTtcclxuICAgIHRoaXMuZXZlbnRzLm9uKFwiZGF0YS1yZWNlaXZlZFwiLCB0aGlzLm9uRGF0YVJlY2VpdmVkLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5ldmVudHMub24oXCJpbml0LWVkaXQtbW9kZVwiLCB0aGlzLm9uSW5pdEVkaXRNb2RlLmJpbmQodGhpcykpO1xyXG4gIH1cclxuICBwdWJsaWMgb25Jbml0RWRpdE1vZGUoKSB7XHJcbiAgICBfLmVhY2goY29uZmlnLmVkaXRvclRhYnMsIGVkaXRvciA9PiB7XHJcbiAgICAgIHRoaXMuYWRkRWRpdG9yVGFiKGVkaXRvci5uYW1lLCBcInB1YmxpYy9wbHVnaW5zL1wiICsgY29uZmlnLnBsdWdpbl9pZCArIGVkaXRvci50ZW1wbGF0ZSwgZWRpdG9yLnBvc2l0aW9uKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICBwdWJsaWMgb25EYXRhUmVjZWl2ZWQoZGF0YSkge1xyXG4gICAgdGhpcy5kYXRhUmVjZWl2ZWQgPSBkYXRhO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgcHVibGljIHNlcmllc0hhbmRsZXIoc2VyaWVzRGF0YSkge1xyXG4gICAgbGV0IHNlcmllcyA9IG5ldyBUaW1lU2VyaWVzKHtcclxuICAgICAgYWxpYXM6IHNlcmllc0RhdGEudGFyZ2V0LFxyXG4gICAgICBkYXRhcG9pbnRzOiBzZXJpZXNEYXRhLmRhdGFwb2ludHMgfHwgW11cclxuICAgIH0pO1xyXG4gICAgc2VyaWVzLmZsb3RwYWlycyA9IHNlcmllcy5nZXRGbG90UGFpcnModGhpcy5wYW5lbC5udWxsUG9pbnRNb2RlKTtcclxuICAgIHJldHVybiBzZXJpZXM7XHJcbiAgfVxyXG4gIHB1YmxpYyBhZGRQYXR0ZXJuKCkge1xyXG4gICAgbGV0IG5ld1BhdHRlcm4gPSBuZXcgQm9vbVRhYmxlUGF0dGVybih7XHJcbiAgICAgIHJvd19jb2xfd3JhcHBlcjogdGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXJcclxuICAgIH0pO1xyXG4gICAgdGhpcy5wYW5lbC5wYXR0ZXJucy5wdXNoKG5ld1BhdHRlcm4pO1xyXG4gICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCAtIDE7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwdWJsaWMgbW92ZVBhdHRlcm4oZGlyZWN0aW9uLCBpbmRleCkge1xyXG4gICAgbGV0IHRlbXBFbGVtZW50ID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF07XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcIlVQXCIpIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0gPSB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4IC0gMV07XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXggLSAxXSA9IHRlbXBFbGVtZW50O1xyXG4gICAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9IGluZGV4IC0gMTtcclxuICAgIH1cclxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiRE9XTlwiKSB7XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleCArIDFdO1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4ICsgMV0gPSB0ZW1wRWxlbWVudDtcclxuICAgICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSBpbmRleCArIDE7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwdWJsaWMgcmVtb3ZlUGF0dGVybihpbmRleCkge1xyXG4gICAgdGhpcy5wYW5lbC5wYXR0ZXJucy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSAodGhpcy5wYW5lbC5wYXR0ZXJucyAmJiB0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCA+IDApID8gKHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoIC0gMSkgOiAtMTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyBjbG9uZVBhdHRlcm4oaW5kZXgpIHtcclxuICAgIGxldCBjb3BpZWRQYXR0ZXJuID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0pO1xyXG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGNvcGllZFBhdHRlcm4sIEJvb21UYWJsZVBhdHRlcm4ucHJvdG90eXBlKTtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMucHVzaChjb3BpZWRQYXR0ZXJuKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyBhZGRfdGltZV9iYXNlZF90aHJlc2hvbGRzKGluZGV4KSB7XHJcbiAgICBsZXQgbmV3X3RpbWVfYmFzZWRfdGhyZXNob2xkID0ge1xyXG4gICAgICBlbmFibGVkRGF5czogXCJTdW4sTW9uLFR1ZSxXZWQsVGh1LEZyaSxTYXRcIixcclxuICAgICAgZnJvbTogXCIwMDAwXCIsXHJcbiAgICAgIG5hbWU6IFwiRWFybHkgbW9ybmluZyBvZiBldmVyeWRheVwiLFxyXG4gICAgICB0aHJlc2hvbGQ6IFwiNzAsOTBcIixcclxuICAgICAgdG86IFwiMDUzMFwiXHJcbiAgICB9O1xyXG4gICAgaWYgKGluZGV4ID09PSAnZGVmYXVsdCcpIHtcclxuICAgICAgdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybi50aW1lX2Jhc2VkX3RocmVzaG9sZHMgPSB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLnRpbWVfYmFzZWRfdGhyZXNob2xkcyB8fCBbXTtcclxuICAgICAgdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybi50aW1lX2Jhc2VkX3RocmVzaG9sZHMucHVzaChuZXdfdGltZV9iYXNlZF90aHJlc2hvbGQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0udGltZV9iYXNlZF90aHJlc2hvbGRzID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0udGltZV9iYXNlZF90aHJlc2hvbGRzIHx8IFtdO1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS50aW1lX2Jhc2VkX3RocmVzaG9sZHMucHVzaChuZXdfdGltZV9iYXNlZF90aHJlc2hvbGQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgcHVibGljIHJlbW92ZV90aW1lX2Jhc2VkX3RocmVzaG9sZHMocGF0dGVybkluZGV4LCBpbmRleCkge1xyXG4gICAgaWYgKHBhdHRlcm5JbmRleCA9PT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4udGltZV9iYXNlZF90aHJlc2hvbGRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW3BhdHRlcm5JbmRleF0udGltZV9iYXNlZF90aHJlc2hvbGRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHB1YmxpYyBjb21wdXRlQmdDb2xvcih0aHJlc2hvbGRzLCBiZ0NvbG9ycywgdmFsdWUpIHtcclxuICAgIGxldCBjID0gXCJ0cmFuc3BhcmVudFwiO1xyXG4gICAgaWYgKHRocmVzaG9sZHMgJiYgYmdDb2xvcnMgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmIHRocmVzaG9sZHMubGVuZ3RoICsgMSA8PSBiZ0NvbG9ycy5sZW5ndGgpIHtcclxuICAgICAgYmdDb2xvcnMgPSBfLmRyb3BSaWdodChiZ0NvbG9ycywgYmdDb2xvcnMubGVuZ3RoIC0gdGhyZXNob2xkcy5sZW5ndGggLSAxKTtcclxuICAgICAgaWYgKGJnQ29sb3JzW2JnQ29sb3JzLmxlbmd0aCAtIDFdID09PSBcIlwiKSB7XHJcbiAgICAgICAgYmdDb2xvcnNbYmdDb2xvcnMubGVuZ3RoIC0gMV0gPSBcInRyYW5zcGFyZW50XCI7XHJcbiAgICAgIH1cclxuICAgICAgZm9yIChsZXQgaSA9IHRocmVzaG9sZHMubGVuZ3RoOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlID49IHRocmVzaG9sZHNbaSAtIDFdKSB7XHJcbiAgICAgICAgICByZXR1cm4gdXRpbHMubm9ybWFsaXplQ29sb3IoYmdDb2xvcnNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdXRpbHMubm9ybWFsaXplQ29sb3IoXy5maXJzdChiZ0NvbG9ycykpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGM7XHJcbiAgfVxyXG4gIHB1YmxpYyB0cmFuc2Zvcm1WYWx1ZSh0aHJlc2hvbGRzLCB0cmFuc2Zvcm1fdmFsdWVzLCB2YWx1ZSwgZGlzcGxheVZhbHVlLCByb3dfbmFtZSwgY29sX25hbWUpIHtcclxuICAgIGxldCB0ID0gdmFsdWU7XHJcbiAgICBpZiAodGhyZXNob2xkcyAmJiB0cmFuc2Zvcm1fdmFsdWVzICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiB0aHJlc2hvbGRzLmxlbmd0aCArIDEgPD0gdHJhbnNmb3JtX3ZhbHVlcy5sZW5ndGgpIHtcclxuICAgICAgdHJhbnNmb3JtX3ZhbHVlcyA9IF8uZHJvcFJpZ2h0KHRyYW5zZm9ybV92YWx1ZXMsIHRyYW5zZm9ybV92YWx1ZXMubGVuZ3RoIC0gdGhyZXNob2xkcy5sZW5ndGggLSAxKTtcclxuICAgICAgaWYgKHRyYW5zZm9ybV92YWx1ZXNbdHJhbnNmb3JtX3ZhbHVlcy5sZW5ndGggLSAxXSA9PT0gXCJcIikge1xyXG4gICAgICAgIHRyYW5zZm9ybV92YWx1ZXNbdHJhbnNmb3JtX3ZhbHVlcy5sZW5ndGggLSAxXSA9IFwiX3ZhbHVlX1wiO1xyXG4gICAgICB9XHJcbiAgICAgIGZvciAobGV0IGkgPSB0aHJlc2hvbGRzLmxlbmd0aDsgaSA+IDA7IGktLSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA+PSB0aHJlc2hvbGRzW2kgLSAxXSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRyYW5zZm9ybV92YWx1ZXNbaV0ucmVwbGFjZShuZXcgUmVnRXhwKFwiX3ZhbHVlX1wiLCBcImdcIiksIGRpc3BsYXlWYWx1ZSkucmVwbGFjZShuZXcgUmVnRXhwKFwiX3Jvd19uYW1lX1wiLCBcImdcIiksIHJvd19uYW1lKS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfY29sX25hbWVfXCIsIFwiZ1wiKSwgY29sX25hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gXy5maXJzdCh0cmFuc2Zvcm1fdmFsdWVzKS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfdmFsdWVfXCIsIFwiZ1wiKSwgZGlzcGxheVZhbHVlKS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfcm93X25hbWVfXCIsIFwiZ1wiKSwgcm93X25hbWUpLnJlcGxhY2UobmV3IFJlZ0V4cChcIl9jb2xfbmFtZV9cIiwgXCJnXCIpLCBjb2xfbmFtZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxuICB9XHJcbiAgcHVibGljIHJlcGxhY2VGb250QXdlc29tZUljb25zKHZhbHVlKSB7XHJcbiAgICBpZiAoIXZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfVxyXG4gICAgcmV0dXJuICh2YWx1ZSArIFwiXCIpXHJcbiAgICAgIC5zcGxpdChcIiBcIilcclxuICAgICAgLm1hcChhID0+IHtcclxuICAgICAgICBpZiAoYS5zdGFydHNXaXRoKFwiX2ZhLVwiKSAmJiBhLmVuZHNXaXRoKFwiX1wiKSkge1xyXG4gICAgICAgICAgbGV0IGljb24gPSBhLnJlcGxhY2UoL1xcXy9nLCBcIlwiKS5zcGxpdChcIixcIilbMF07XHJcbiAgICAgICAgICBsZXQgY29sb3IgPSBhLmluZGV4T2YoXCIsXCIpID4gLTEgPyBgIHN0eWxlPVwiY29sb3I6JHt1dGlscy5ub3JtYWxpemVDb2xvcihhLnJlcGxhY2UoL1xcXy9nLCBcIlwiKS5zcGxpdChcIixcIilbMV0pfVwiIGAgOiBcIlwiO1xyXG4gICAgICAgICAgbGV0IHJlcGVhdENvdW50ID0gYS5zcGxpdChcIixcIikubGVuZ3RoID4gMiA/ICsoYS5yZXBsYWNlKC9cXF8vZywgXCJcIikuc3BsaXQoXCIsXCIpWzJdKSA6IDE7XHJcbiAgICAgICAgICBhID0gYDxpIGNsYXNzPVwiZmEgJHtpY29ufVwiICR7Y29sb3J9PjwvaT4gYC5yZXBlYXQocmVwZWF0Q291bnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYTtcclxuICAgICAgfSlcclxuICAgICAgLmpvaW4oXCIgXCIpO1xyXG4gIH1cclxuICBwdWJsaWMgcmVwbGFjZVdpdGhJbWFnZXModmFsdWUpIHtcclxuICAgIGlmICghdmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9XHJcbiAgICByZXR1cm4gKHZhbHVlICsgXCJcIilcclxuICAgICAgLnNwbGl0KFwiIFwiKVxyXG4gICAgICAubWFwKGEgPT4ge1xyXG4gICAgICAgIGlmIChhLnN0YXJ0c1dpdGgoXCJfaW1nLVwiKSAmJiBhLmVuZHNXaXRoKFwiX1wiKSkge1xyXG4gICAgICAgICAgYSA9IGEuc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgICAgbGV0IGltZ1VybCA9IGEucmVwbGFjZShcIl9pbWctXCIsIFwiXCIpLnNwbGl0KFwiLFwiKVswXTtcclxuICAgICAgICAgIGxldCBpbWdXaWR0aCA9IGEuc3BsaXQoXCIsXCIpLmxlbmd0aCA+IDEgPyBhLnJlcGxhY2UoXCJfaW1nLVwiLCBcIlwiKS5zcGxpdChcIixcIilbMV0gOiBcIjIwcHhcIjtcclxuICAgICAgICAgIGxldCBpbWdIZWlnaHQgPSBhLnNwbGl0KFwiLFwiKS5sZW5ndGggPiAyID8gYS5yZXBsYWNlKFwiX2ltZy1cIiwgXCJcIikuc3BsaXQoXCIsXCIpWzJdIDogXCIyMHB4XCI7XHJcbiAgICAgICAgICBsZXQgcmVwZWF0Q291bnQgPSBhLnNwbGl0KFwiLFwiKS5sZW5ndGggPiAzID8gKyhhLnJlcGxhY2UoXCJfaW1nLVwiLCBcIlwiKS5zcGxpdChcIixcIilbM10pIDogMTtcclxuICAgICAgICAgIGEgPSBgPGltZyB3aWR0aD1cIiR7aW1nV2lkdGh9XCIgaGVpZ2h0PVwiJHtpbWdIZWlnaHR9XCIgc3JjPVwiJHtpbWdVcmx9XCIvPmAucmVwZWF0KHJlcGVhdENvdW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5qb2luKFwiIFwiKTtcclxuICB9XHJcbiAgcHVibGljIGdldEFjdHVhbE5hbWVXaXRob3V0VHJhbnNmb3JtU2lnbih2YWx1ZSkge1xyXG4gICAgcmV0dXJuICh2YWx1ZSArIFwiXCIpXHJcbiAgICAgIC5zcGxpdChcIiBcIilcclxuICAgICAgLm1hcChhID0+IHtcclxuICAgICAgICBpZiAoYS5zdGFydHNXaXRoKFwiX2ZhLVwiKSAmJiBhLmVuZHNXaXRoKFwiX1wiKSkge1xyXG4gICAgICAgICAgYSA9IGBgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYS5zdGFydHNXaXRoKFwiX2ltZy1cIikgJiYgYS5lbmRzV2l0aChcIl9cIikpIHtcclxuICAgICAgICAgIGEgPSBgYDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5qb2luKFwiIFwiKTtcclxuICB9XHJcbiAgcHVibGljIGdldERlY2ltYWxzRm9yVmFsdWUodmFsdWUsIF9kZWNpbWFscykge1xyXG4gICAgaWYgKF8uaXNOdW1iZXIoK19kZWNpbWFscykpIHtcclxuICAgICAgbGV0IG86IE9iamVjdCA9IHtcclxuICAgICAgICBkZWNpbWFsczogX2RlY2ltYWxzLFxyXG4gICAgICAgIHNjYWxlZERlY2ltYWxzOiBudWxsXHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiBvO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBkZWx0YSA9IHZhbHVlIC8gMjtcclxuICAgIGxldCBkZWMgPSAtTWF0aC5mbG9vcihNYXRoLmxvZyhkZWx0YSkgLyBNYXRoLkxOMTApO1xyXG5cclxuICAgIGxldCBtYWduID0gTWF0aC5wb3coMTAsIC1kZWMpLFxyXG4gICAgICBub3JtID0gZGVsdGEgLyBtYWduLCAvLyBub3JtIGlzIGJldHdlZW4gMS4wIGFuZCAxMC4wXHJcbiAgICAgIHNpemU7XHJcblxyXG4gICAgaWYgKG5vcm0gPCAxLjUpIHtcclxuICAgICAgc2l6ZSA9IDE7XHJcbiAgICB9IGVsc2UgaWYgKG5vcm0gPCAzKSB7XHJcbiAgICAgIHNpemUgPSAyO1xyXG4gICAgICAvLyBzcGVjaWFsIGNhc2UgZm9yIDIuNSwgcmVxdWlyZXMgYW4gZXh0cmEgZGVjaW1hbFxyXG4gICAgICBpZiAobm9ybSA+IDIuMjUpIHtcclxuICAgICAgICBzaXplID0gMi41O1xyXG4gICAgICAgICsrZGVjO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKG5vcm0gPCA3LjUpIHtcclxuICAgICAgc2l6ZSA9IDU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzaXplID0gMTA7XHJcbiAgICB9XHJcblxyXG4gICAgc2l6ZSAqPSBtYWduO1xyXG5cclxuICAgIC8vIHJlZHVjZSBzdGFydGluZyBkZWNpbWFscyBpZiBub3QgbmVlZGVkXHJcbiAgICBpZiAoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlKSB7XHJcbiAgICAgIGRlYyA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJlc3VsdDogT2JqZWN0ID0ge1xyXG4gICAgICBkZWNpbWFsczogTWF0aC5tYXgoMCwgZGVjKSxcclxuICAgICAgc2NhbGVkRGVjaW1hbHM6IE1hdGgubWF4KDAsIGRlYykgLSBNYXRoLmZsb29yKE1hdGgubG9nKHNpemUpIC8gTWF0aC5MTjEwKSArIDJcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgcHVibGljIHNldFVuaXRGb3JtYXQoc3ViSXRlbSwgaW5kZXgpIHtcclxuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybi5mb3JtYXQgPSBzdWJJdGVtLnZhbHVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0uZm9ybWF0ID0gc3ViSXRlbS52YWx1ZTtcclxuICAgIH1cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyBsaW1pdFRleHQodGV4dCwgbWF4bGVuZ3RoKSB7XHJcbiAgICBpZiAodGV4dC5zcGxpdCgnJykubGVuZ3RoID4gbWF4bGVuZ3RoKSB7XHJcbiAgICAgIHRleHQgPSB0ZXh0LnN1YnN0cmluZygwLCBtYXhsZW5ndGggLSAzKSArIFwiLi4uXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGV4dDtcclxuICB9XHJcbiAgcHVibGljIGxpbmsoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsKSB7XHJcbiAgICB0aGlzLnNjb3BlID0gc2NvcGU7XHJcbiAgICB0aGlzLmVsZW0gPSBlbGVtO1xyXG4gICAgdGhpcy5hdHRycyA9IGF0dHJzO1xyXG4gICAgdGhpcy5jdHJsID0gY3RybDtcclxuICB9XHJcbn1cclxuXHJcbkdyYWZhbmFCb29tVGFibGVDdHJsLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKHRoaXMuZGF0YVJlY2VpdmVkKSB7XHJcbiAgICAvLyBDb3B5aW5nIHRoZSBkYXRhIHJlY2VpdmVkXHJcbiAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YVJlY2VpdmVkO1xyXG4gICAgdGhpcy5wYW5lbC5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzID0gdGhpcy5wYW5lbC5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzIHx8IGNvbmZpZy5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzO1xyXG4gICAgY29uc3QgbWV0cmljc1JlY2VpdmVkID0gdXRpbHMuZ2V0RmllbGRzKHRoaXMuZGF0YUNvbXB1dGVkLCBcInRhcmdldFwiKTtcclxuICAgIGlmIChtZXRyaWNzUmVjZWl2ZWQubGVuZ3RoICE9PSBfLnVuaXEobWV0cmljc1JlY2VpdmVkKS5sZW5ndGgpIHtcclxuICAgICAgbGV0IGR1cGxpY2F0ZUtleXMgPSBfLnVuaXEobWV0cmljc1JlY2VpdmVkLmZpbHRlcih2ID0+IHtcclxuICAgICAgICByZXR1cm4gbWV0cmljc1JlY2VpdmVkLmZpbHRlcih0ID0+IHQgPT09IHYpLmxlbmd0aCA+IDE7XHJcbiAgICAgIH0pKTtcclxuICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcigpO1xyXG4gICAgICBlcnIubmFtZSA9IFwiRHVwbGljYXRlIGRhdGEgcmVjZWl2ZWRcIjtcclxuICAgICAgZXJyLm1lc3NhZ2UgPSBcIkR1cGxpY2F0ZSBrZXlzIDogPGJyLz5cIiArIGR1cGxpY2F0ZUtleXMuam9pbihcIjxici8+IFwiKTtcclxuICAgICAgdGhpcy5wYW5lbC5lcnJvciA9IGVycjtcclxuICAgICAgdGhpcy5wYW5lbC5kYXRhID0gdW5kZWZpbmVkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5lbC5lcnJvciA9IHVuZGVmaW5lZDtcclxuICAgICAgLy8gQmluZGluZyB0aGUgZ3JhZmFuYSBjb21wdXRhdGlvbnMgdG8gdGhlIG1ldHJpY3MgcmVjZWl2ZWRcclxuICAgICAgdGhpcy5kYXRhQ29tcHV0ZWQgPSB0aGlzLmRhdGFSZWNlaXZlZC5tYXAodGhpcy5zZXJpZXNIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4gICAgICAvLyBHZXQgU2VydmVyIFRpbWUgU3RhbXAgb2YgdGhlIFNlcmllcyBmb3IgdGltZSBiYXNlZCB0aHJlc2hvbGRzLlxyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy5jdXJyZW50X3NlcnZlcnRpbWVzdGFtcCA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgaWYgKHNlcmllcyAmJiBzZXJpZXMuZGF0YXBvaW50cyAmJiBzZXJpZXMuZGF0YXBvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBpZiAoXy5sYXN0KHNlcmllcy5kYXRhcG9pbnRzKS5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgc2VyaWVzLmN1cnJlbnRfc2VydmVydGltZXN0YW1wID0gbmV3IERhdGUoXy5sYXN0KHNlcmllcy5kYXRhcG9pbnRzKVsxXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBBc3NpZ24gcGF0dGVyblxyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy5wYXR0ZXJuID0gXy5maW5kKHRoaXMucGFuZWwucGF0dGVybnMuZmlsdGVyKHAgPT4geyByZXR1cm4gcC5kaXNhYmxlZCAhPT0gdHJ1ZTsgfSksIGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgICByZXR1cm4gc2VyaWVzLmFsaWFzLm1hdGNoKHAucGF0dGVybik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHNlcmllcy5wYXR0ZXJuID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHNlcmllcy5wYXR0ZXJuID0gdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybiB8fCBjb25maWcucGFuZWxEZWZhdWx0cy5kZWZhdWx0UGF0dGVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIEFzc2lnbiBEZWNpbWFsIFZhbHVlc1xyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy5kZWNpbWFscyA9IChzZXJpZXMucGF0dGVybi5kZWNpbWFscykgfHwgY29uZmlnLnBhbmVsRGVmYXVsdHMuZGVmYXVsdFBhdHRlcm4uZGVjaW1hbHM7XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIEFzc2lnbiB2YWx1ZVxyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIGlmIChzZXJpZXMuc3RhdHMpIHtcclxuICAgICAgICAgIHNlcmllcy52YWx1ZSA9IHNlcmllcy5zdGF0c1tzZXJpZXMucGF0dGVybi52YWx1ZU5hbWUgfHwgY29uZmlnLnBhbmVsRGVmYXVsdHMuZGVmYXVsdFBhdHRlcm4udmFsdWVOYW1lXTtcclxuICAgICAgICAgIGxldCBkZWNpbWFsSW5mbzogYW55ID0gdGhpcy5nZXREZWNpbWFsc0ZvclZhbHVlKHNlcmllcy52YWx1ZSwgc2VyaWVzLmRlY2ltYWxzKTtcclxuICAgICAgICAgIGxldCBmb3JtYXRGdW5jID0ga2JuLnZhbHVlRm9ybWF0c1tzZXJpZXMucGF0dGVybi5mb3JtYXQgfHwgY29uZmlnLnBhbmVsRGVmYXVsdHMuZGVmYXVsdFBhdHRlcm4uZm9ybWF0XTtcclxuICAgICAgICAgIGlmIChzZXJpZXMudmFsdWUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgc2VyaWVzLmRpc3BsYXlWYWx1ZSA9IHNlcmllcy5wYXR0ZXJuLm51bGxfdmFsdWUgfHwgY29uZmlnLnBhbmVsRGVmYXVsdHMuZGVmYXVsdFBhdHRlcm4ubnVsbF92YWx1ZSB8fCBcIk51bGxcIjtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoIWlzTmFOKHNlcmllcy52YWx1ZSkpIHtcclxuICAgICAgICAgICAgc2VyaWVzLnZhbHVlRm9ybWF0dGVkID0gZm9ybWF0RnVuYyhzZXJpZXMudmFsdWUsIGRlY2ltYWxJbmZvLmRlY2ltYWxzLCBkZWNpbWFsSW5mby5zY2FsZWREZWNpbWFscyk7XHJcbiAgICAgICAgICAgIHNlcmllcy52YWx1ZVJvdW5kZWQgPSBrYm4ucm91bmRWYWx1ZShzZXJpZXMudmFsdWUsIGRlY2ltYWxJbmZvLmRlY2ltYWxzKTtcclxuICAgICAgICAgICAgc2VyaWVzLmRpc3BsYXlWYWx1ZSA9IHNlcmllcy52YWx1ZUZvcm1hdHRlZDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlcmllcy5kaXNwbGF5VmFsdWUgPSBzZXJpZXMucGF0dGVybi5udWxsX3ZhbHVlIHx8IGNvbmZpZy5wYW5lbERlZmF1bHRzLmRlZmF1bHRQYXR0ZXJuLm51bGxfdmFsdWUgfHwgXCJOdWxsXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBGaWx0ZXIgVmFsdWVzXHJcbiAgICAgIHRoaXMuZGF0YUNvbXB1dGVkID0gdGhpcy5kYXRhQ29tcHV0ZWQuZmlsdGVyKHNlcmllcyA9PiB7XHJcbiAgICAgICAgaWYgKCFzZXJpZXMucGF0dGVybi5maWx0ZXIpIHtcclxuICAgICAgICAgIHNlcmllcy5wYXR0ZXJuLmZpbHRlciA9IHt9O1xyXG4gICAgICAgICAgc2VyaWVzLnBhdHRlcm4uZmlsdGVyLnZhbHVlX2JlbG93ID0gXCJcIjtcclxuICAgICAgICAgIHNlcmllcy5wYXR0ZXJuLmZpbHRlci52YWx1ZV9hYm92ZSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzZXJpZXMucGF0dGVybiAmJiBzZXJpZXMucGF0dGVybi5maWx0ZXIgJiYgKHNlcmllcy5wYXR0ZXJuLmZpbHRlci52YWx1ZV9iZWxvdyAhPT0gXCJcIiB8fCBzZXJpZXMucGF0dGVybi5maWx0ZXIudmFsdWVfYWJvdmUgIT09IFwiXCIpKSB7XHJcbiAgICAgICAgICBpZiAoc2VyaWVzLnBhdHRlcm4uZmlsdGVyLnZhbHVlX2JlbG93ICE9PSBcIlwiICYmIHNlcmllcy52YWx1ZSA8ICsoc2VyaWVzLnBhdHRlcm4uZmlsdGVyLnZhbHVlX2JlbG93KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoc2VyaWVzLnBhdHRlcm4uZmlsdGVyLnZhbHVlX2Fib3ZlICE9PSBcIlwiICYmIHNlcmllcy52YWx1ZSA+ICsoc2VyaWVzLnBhdHRlcm4uZmlsdGVyLnZhbHVlX2Fib3ZlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgLy8gQXNzaWduIFJvdyBOYW1lXHJcbiAgICAgIHRoaXMuZGF0YUNvbXB1dGVkID0gdGhpcy5kYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgc2VyaWVzLnJvd19uYW1lID0gc2VyaWVzLmFsaWFzLnNwbGl0KHNlcmllcy5wYXR0ZXJuLmRlbGltaXRlciB8fCBcIi5cIikucmVkdWNlKChyLCBpdCwgaSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHIucmVwbGFjZShuZXcgUmVnRXhwKHRoaXMucGFuZWwucm93X2NvbF93cmFwcGVyICsgaSArIHRoaXMucGFuZWwucm93X2NvbF93cmFwcGVyLCBcImdcIiksIGl0KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgICAgc2VyaWVzLnBhdHRlcm4ucm93X25hbWUucmVwbGFjZShuZXcgUmVnRXhwKHRoaXMucGFuZWwucm93X2NvbF93cmFwcGVyICsgXCJzZXJpZXNcIiArIHRoaXMucGFuZWwucm93X2NvbF93cmFwcGVyLCBcImdcIiksIHNlcmllcy5hbGlhcykgfHxcclxuICAgICAgICAgIGNvbmZpZy5wYW5lbERlZmF1bHRzLmRlZmF1bHRQYXR0ZXJuLnJvd19uYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlciArIFwic2VyaWVzXCIgKyB0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlciwgXCJnXCIpLCBzZXJpZXMuYWxpYXMpKTtcclxuICAgICAgICBpZiAoc2VyaWVzLmFsaWFzLnNwbGl0KHNlcmllcy5wYXR0ZXJuLmRlbGltaXRlciB8fCBcIi5cIikubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICBzZXJpZXMucm93X25hbWUgPSBzZXJpZXMuYWxpYXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBBc3NpZ24gQ29sIE5hbWVcclxuICAgICAgdGhpcy5kYXRhQ29tcHV0ZWQgPSB0aGlzLmRhdGFDb21wdXRlZC5tYXAoc2VyaWVzID0+IHtcclxuICAgICAgICBzZXJpZXMuY29sX25hbWUgPSBzZXJpZXMuYWxpYXMuc3BsaXQoc2VyaWVzLnBhdHRlcm4uZGVsaW1pdGVyIHx8IFwiLlwiKS5yZWR1Y2UoKHIsIGl0LCBpKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gci5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIgKyBpICsgdGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIsIFwiZ1wiKSwgaXQpO1xyXG4gICAgICAgIH0sIHNlcmllcy5wYXR0ZXJuLmNvbF9uYW1lIHx8IGNvbmZpZy5wYW5lbERlZmF1bHRzLmRlZmF1bHRQYXR0ZXJuLmNvbF9uYW1lKTtcclxuICAgICAgICBpZiAoc2VyaWVzLmFsaWFzLnNwbGl0KHNlcmllcy5wYXR0ZXJuLmRlbGltaXRlciB8fCBcIi5cIikubGVuZ3RoID09PSAxIHx8IHNlcmllcy5yb3dfbmFtZSA9PT0gc2VyaWVzLmFsaWFzKSB7XHJcbiAgICAgICAgICBzZXJpZXMuY29sX25hbWUgPSBzZXJpZXMucGF0dGVybi5jb2xfbmFtZSB8fCBcIlZhbHVlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBBc3NpZ24gUm93Q29sIEtleVxyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy5rZXlfbmFtZSA9IHNlcmllcy5yb3dfbmFtZSArIFwiI1wiICsgc2VyaWVzLmNvbF9uYW1lO1xyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBBc3NpZ24gVGhyZXNob2xkc1xyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy50aHJlc2hvbGRzID0gKHNlcmllcy5wYXR0ZXJuLnRocmVzaG9sZHMgfHwgY29uZmlnLnBhbmVsRGVmYXVsdHMuZGVmYXVsdFBhdHRlcm4udGhyZXNob2xkcykuc3BsaXQoXCIsXCIpLm1hcChkID0+ICtkKTtcclxuICAgICAgICBpZiAoc2VyaWVzLnBhdHRlcm4uZW5hYmxlX3RpbWVfYmFzZWRfdGhyZXNob2xkcykge1xyXG4gICAgICAgICAgbGV0IG1ldHJpY3JlY2l2ZWRUaW1lU3RhbXAgPSBzZXJpZXMuY3VycmVudF9zZXJ2ZXJ0aW1lc3RhbXAgfHwgbmV3IERhdGUoKTtcclxuICAgICAgICAgIGxldCBtZXRyaWNyZWNpdmVkVGltZVN0YW1wX2lubnVtYmVyID0gbWV0cmljcmVjaXZlZFRpbWVTdGFtcC5nZXRIb3VycygpICogMTAwICsgbWV0cmljcmVjaXZlZFRpbWVTdGFtcC5nZXRNaW51dGVzKCk7XHJcbiAgICAgICAgICBsZXQgd2Vla2RheXMgPSBbXCJzdW5cIiwgXCJtb25cIiwgXCJ0dWVcIiwgXCJ3ZWRcIiwgXCJ0aHVcIiwgXCJmcmlcIiwgXCJzYXRcIl07XHJcbiAgICAgICAgICBfLmVhY2goc2VyaWVzLnBhdHRlcm4udGltZV9iYXNlZF90aHJlc2hvbGRzLCAodGJ0eCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGJ0eCAmJiB0YnR4LmZyb20gJiYgdGJ0eC50byAmJiB0YnR4LmVuYWJsZWREYXlzICYmXHJcbiAgICAgICAgICAgICAgKG1ldHJpY3JlY2l2ZWRUaW1lU3RhbXBfaW5udW1iZXIgPj0gKyh0YnR4LmZyb20pKSAmJlxyXG4gICAgICAgICAgICAgIChtZXRyaWNyZWNpdmVkVGltZVN0YW1wX2lubnVtYmVyIDw9ICsodGJ0eC50bykpICYmXHJcbiAgICAgICAgICAgICAgKHRidHguZW5hYmxlZERheXMudG9Mb3dlckNhc2UoKS5pbmRleE9mKHdlZWtkYXlzW21ldHJpY3JlY2l2ZWRUaW1lU3RhbXAuZ2V0RGF5KCldKSA+IC0xKSAmJlxyXG4gICAgICAgICAgICAgIHRidHgudGhyZXNob2xkXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgIHNlcmllcy50aHJlc2hvbGRzID0gKHRidHgudGhyZXNob2xkICsgXCJcIikuc3BsaXQoXCIsXCIpLm1hcChkID0+ICtkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBBc3NpZ24gQkcgQ29sb3JzXHJcbiAgICAgIHRoaXMuZGF0YUNvbXB1dGVkID0gdGhpcy5kYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgc2VyaWVzLmVuYWJsZV9iZ0NvbG9yID0gc2VyaWVzLnBhdHRlcm4uZW5hYmxlX2JnQ29sb3I7XHJcbiAgICAgICAgc2VyaWVzLmJnQ29sb3JzID0gKHNlcmllcy5wYXR0ZXJuLmJnQ29sb3JzIHx8IGNvbmZpZy5wYW5lbERlZmF1bHRzLmRlZmF1bHRQYXR0ZXJuLmJnQ29sb3JzKS5zcGxpdChcInxcIik7XHJcbiAgICAgICAgc2VyaWVzLmJnQ29sb3IgPSBzZXJpZXMuZW5hYmxlX2JnQ29sb3IgPT09IHRydWUgPyB0aGlzLmNvbXB1dGVCZ0NvbG9yKHNlcmllcy50aHJlc2hvbGRzLCBzZXJpZXMuYmdDb2xvcnMsIHNlcmllcy52YWx1ZSkgOiBcInRyYW5zcGFyZW50XCI7XHJcbiAgICAgICAgaWYgKHNlcmllcy5kaXNwbGF5VmFsdWUgPT09IChzZXJpZXMucGF0dGVybi5udWxsX3ZhbHVlIHx8IGNvbmZpZy5wYW5lbERlZmF1bHRzLmRlZmF1bHRQYXR0ZXJuLm51bGxfdmFsdWUgfHwgXCJOdWxsXCIpKSB7XHJcbiAgICAgICAgICBzZXJpZXMuYmdDb2xvciA9IHNlcmllcy5wYXR0ZXJuLm51bGxfY29sb3IgfHwgY29uZmlnLnBhbmVsRGVmYXVsdHMuZGVmYXVsdFBhdHRlcm4ubnVsbF9jb2xvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIEJHIENvbG9ycyBvdmVycmlkZXNcclxuICAgICAgdGhpcy5kYXRhQ29tcHV0ZWQgPSB0aGlzLmRhdGFDb21wdXRlZC5tYXAoc2VyaWVzID0+IHtcclxuICAgICAgICBzZXJpZXMuZW5hYmxlX2JnQ29sb3Jfb3ZlcnJpZGVzID0gc2VyaWVzLnBhdHRlcm4uZW5hYmxlX2JnQ29sb3Jfb3ZlcnJpZGVzO1xyXG4gICAgICAgIHNlcmllcy5iZ0NvbG9yc19vdmVycmlkZXMgPSBzZXJpZXMucGF0dGVybi5iZ0NvbG9yc19vdmVycmlkZXMgfHwgXCJcIjtcclxuICAgICAgICBpZiAoc2VyaWVzLmVuYWJsZV9iZ0NvbG9yX292ZXJyaWRlcyAmJiBzZXJpZXMuYmdDb2xvcnNfb3ZlcnJpZGVzICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICBsZXQgX2JnQ29sb3JzX292ZXJyaWRlcyA9IHNlcmllcy5iZ0NvbG9yc19vdmVycmlkZXMuc3BsaXQoXCJ8XCIpLmZpbHRlcihjb24gPT4gY29uLmluZGV4T2YoXCItPlwiKSkubWFwKGNvbiA9PiBjb24uc3BsaXQoXCItPlwiKSkuZmlsdGVyKGNvbiA9PiArKGNvblswXSkgPT09IHNlcmllcy52YWx1ZSkubWFwKGNvbiA9PiBjb25bMV0pO1xyXG4gICAgICAgICAgaWYgKF9iZ0NvbG9yc19vdmVycmlkZXMubGVuZ3RoID4gMCAmJiBfYmdDb2xvcnNfb3ZlcnJpZGVzWzBdICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHNlcmllcy5iZ0NvbG9yID0gdXRpbHMubm9ybWFsaXplQ29sb3IoKFwiXCIgKyBfYmdDb2xvcnNfb3ZlcnJpZGVzWzBdKS50cmltKCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gVmFsdWUgVHJhbnNmb3JtXHJcbiAgICAgIHRoaXMuZGF0YUNvbXB1dGVkID0gdGhpcy5kYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgc2VyaWVzLmVuYWJsZV90cmFuc2Zvcm0gPSBzZXJpZXMucGF0dGVybi5lbmFibGVfdHJhbnNmb3JtO1xyXG4gICAgICAgIHNlcmllcy50cmFuc2Zvcm1fdmFsdWVzID0gKHNlcmllcy5wYXR0ZXJuLnRyYW5zZm9ybV92YWx1ZXMgfHwgY29uZmlnLnBhbmVsRGVmYXVsdHMuZGVmYXVsdFBhdHRlcm4udHJhbnNmb3JtX3ZhbHVlcykuc3BsaXQoXCJ8XCIpO1xyXG4gICAgICAgIHNlcmllcy5kaXNwbGF5VmFsdWUgPSBzZXJpZXMuZW5hYmxlX3RyYW5zZm9ybSA9PT0gdHJ1ZSA/IHRoaXMudHJhbnNmb3JtVmFsdWUoc2VyaWVzLnRocmVzaG9sZHMsIHNlcmllcy50cmFuc2Zvcm1fdmFsdWVzLCBzZXJpZXMudmFsdWUsIHNlcmllcy5kaXNwbGF5VmFsdWUsIHNlcmllcy5yb3dfbmFtZSwgc2VyaWVzLmNvbF9uYW1lKSA6IHNlcmllcy5kaXNwbGF5VmFsdWU7XHJcbiAgICAgICAgaWYgKHNlcmllcy5kaXNwbGF5VmFsdWUgPT09IChzZXJpZXMucGF0dGVybi5udWxsX3ZhbHVlIHx8IGNvbmZpZy5wYW5lbERlZmF1bHRzLmRlZmF1bHRQYXR0ZXJuLm51bGxfdmFsdWUgfHwgXCJOdWxsXCIpKSB7XHJcbiAgICAgICAgICBzZXJpZXMuZGlzcGxheVZhbHVlID0gc2VyaWVzLnBhdHRlcm4ubnVsbF92YWx1ZSB8fCBjb25maWcucGFuZWxEZWZhdWx0cy5kZWZhdWx0UGF0dGVybi5udWxsX3ZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNOYU4oc2VyaWVzLnZhbHVlKSkge1xyXG4gICAgICAgICAgc2VyaWVzLmRpc3BsYXlWYWx1ZSA9IHNlcmllcy5wYXR0ZXJuLm51bGxfdmFsdWUgfHwgY29uZmlnLnBhbmVsRGVmYXVsdHMuZGVmYXVsdFBhdHRlcm4ubnVsbF92YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIFZhbHVlIFRyYW5zZm9ybSBPdmVycmlkZXNcclxuICAgICAgdGhpcy5kYXRhQ29tcHV0ZWQgPSB0aGlzLmRhdGFDb21wdXRlZC5tYXAoc2VyaWVzID0+IHtcclxuICAgICAgICBzZXJpZXMuZW5hYmxlX3RyYW5zZm9ybV9vdmVycmlkZXMgPSBzZXJpZXMucGF0dGVybi5lbmFibGVfdHJhbnNmb3JtX292ZXJyaWRlcztcclxuICAgICAgICBzZXJpZXMudHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXMgPSBzZXJpZXMucGF0dGVybi50cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlcyB8fCBcIlwiO1xyXG4gICAgICAgIGlmIChzZXJpZXMuZW5hYmxlX3RyYW5zZm9ybV9vdmVycmlkZXMgJiYgc2VyaWVzLnRyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICBsZXQgX3RyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzID0gc2VyaWVzLnRyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzLnNwbGl0KFwifFwiKS5maWx0ZXIoY29uID0+IGNvbi5pbmRleE9mKFwiLT5cIikpLm1hcChjb24gPT4gY29uLnNwbGl0KFwiLT5cIikpLmZpbHRlcihjb24gPT4gKyhjb25bMF0pID09PSBzZXJpZXMudmFsdWUpLm1hcChjb24gPT4gY29uWzFdKTtcclxuICAgICAgICAgIGlmIChfdHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXMubGVuZ3RoID4gMCAmJiBfdHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXNbMF0gIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgc2VyaWVzLmRpc3BsYXlWYWx1ZSA9IChcIlwiICsgX3RyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzWzBdKS50cmltKCkucmVwbGFjZShuZXcgUmVnRXhwKFwiX3ZhbHVlX1wiLCBcImdcIiksIHNlcmllcy5kaXNwbGF5VmFsdWUpLnJlcGxhY2UobmV3IFJlZ0V4cChcIl9yb3dfbmFtZV9cIiwgXCJnXCIpLCBzZXJpZXMucm93X25hbWUpLnJlcGxhY2UobmV3IFJlZ0V4cChcIl9jb2xfbmFtZV9cIiwgXCJnXCIpLCBzZXJpZXMuY29sX25hbWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gRm9udCBhd2Vzb21lIGljb25zXHJcbiAgICAgIHRoaXMuZGF0YUNvbXB1dGVkID0gdGhpcy5kYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgc2VyaWVzLmFjdHVhbF9kaXNwbGF5dmFsdWUgPSBzZXJpZXMuZGlzcGxheVZhbHVlO1xyXG4gICAgICAgIHNlcmllcy5hY3R1YWxfcm93X25hbWUgPSBzZXJpZXMucm93X25hbWU7XHJcbiAgICAgICAgc2VyaWVzLmFjdHVhbF9jb2xfbmFtZSA9IHNlcmllcy5jb2xfbmFtZTtcclxuICAgICAgICBpZiAoc2VyaWVzLmRpc3BsYXlWYWx1ZSAmJiBzZXJpZXMuZGlzcGxheVZhbHVlLmluZGV4T2YoXCJfZmEtXCIpID4gLTEpIHsgc2VyaWVzLmRpc3BsYXlWYWx1ZSA9IHRoaXMucmVwbGFjZUZvbnRBd2Vzb21lSWNvbnMoc2VyaWVzLmRpc3BsYXlWYWx1ZSk7IH1cclxuICAgICAgICBpZiAoc2VyaWVzLnJvd19uYW1lICYmIHNlcmllcy5yb3dfbmFtZS5pbmRleE9mKFwiX2ZhLVwiKSA+IC0xKSB7IHNlcmllcy5yb3dfbmFtZSA9IHRoaXMucmVwbGFjZUZvbnRBd2Vzb21lSWNvbnMoc2VyaWVzLnJvd19uYW1lKTsgfVxyXG4gICAgICAgIGlmIChzZXJpZXMuY29sX25hbWUgJiYgc2VyaWVzLmNvbF9uYW1lLmluZGV4T2YoXCJfZmEtXCIpID4gLTEpIHsgc2VyaWVzLmNvbF9uYW1lID0gdGhpcy5yZXBsYWNlRm9udEF3ZXNvbWVJY29ucyhzZXJpZXMuY29sX25hbWUpOyB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIEltYWdlIHRyYW5zZm9ybXNcclxuICAgICAgdGhpcy5kYXRhQ29tcHV0ZWQgPSB0aGlzLmRhdGFDb21wdXRlZC5tYXAoc2VyaWVzID0+IHtcclxuICAgICAgICBpZiAoc2VyaWVzLmRpc3BsYXlWYWx1ZSAmJiBzZXJpZXMuZGlzcGxheVZhbHVlLmluZGV4T2YoXCJfaW1nLVwiKSA+IC0xKSB7IHNlcmllcy5kaXNwbGF5VmFsdWUgPSB0aGlzLnJlcGxhY2VXaXRoSW1hZ2VzKHNlcmllcy5kaXNwbGF5VmFsdWUpOyB9XHJcbiAgICAgICAgaWYgKHNlcmllcy5yb3dfbmFtZSAmJiBzZXJpZXMucm93X25hbWUuaW5kZXhPZihcIl9pbWctXCIpID4gLTEpIHsgc2VyaWVzLnJvd19uYW1lID0gdGhpcy5yZXBsYWNlV2l0aEltYWdlcyhzZXJpZXMucm93X25hbWUpOyB9XHJcbiAgICAgICAgaWYgKHNlcmllcy5jb2xfbmFtZSAmJiBzZXJpZXMuY29sX25hbWUuaW5kZXhPZihcIl9pbWctXCIpID4gLTEpIHsgc2VyaWVzLmNvbF9uYW1lID0gdGhpcy5yZXBsYWNlV2l0aEltYWdlcyhzZXJpZXMuY29sX25hbWUpOyB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIENlbGwgTGlua3NcclxuICAgICAgdGhpcy5kYXRhQ29tcHV0ZWQgPSB0aGlzLmRhdGFDb21wdXRlZC5tYXAoc2VyaWVzID0+IHtcclxuICAgICAgICBpZiAoc2VyaWVzLnBhdHRlcm4uZW5hYmxlX2NsaWNrYWJsZV9jZWxscykge1xyXG4gICAgICAgICAgbGV0IHRhcmdldExpbmsgPSBzZXJpZXMucGF0dGVybi5jbGlja2FibGVfY2VsbHNfbGluayB8fCBcIiNcIjtcclxuICAgICAgICAgIHRhcmdldExpbmsgPSB0YXJnZXRMaW5rLnJlcGxhY2UobmV3IFJlZ0V4cChcIl9yb3dfbmFtZV9cIiwgXCJnXCIpLCB0aGlzLmdldEFjdHVhbE5hbWVXaXRob3V0VHJhbnNmb3JtU2lnbihzZXJpZXMuYWN0dWFsX3Jvd19uYW1lKS50cmltKCkpO1xyXG4gICAgICAgICAgdGFyZ2V0TGluayA9IHRhcmdldExpbmsucmVwbGFjZShuZXcgUmVnRXhwKFwiX2NvbF9uYW1lX1wiLCBcImdcIiksIHRoaXMuZ2V0QWN0dWFsTmFtZVdpdGhvdXRUcmFuc2Zvcm1TaWduKHNlcmllcy5hY3R1YWxfY29sX25hbWUpLnRyaW0oKSk7XHJcbiAgICAgICAgICB0YXJnZXRMaW5rID0gdGFyZ2V0TGluay5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfdmFsdWVfXCIsIFwiZ1wiKSwgdGhpcy5nZXRBY3R1YWxOYW1lV2l0aG91dFRyYW5zZm9ybVNpZ24oc2VyaWVzLnZhbHVlKS50cmltKCkpO1xyXG4gICAgICAgICAgc2VyaWVzLmRpc3BsYXlWYWx1ZSA9IGA8YSBocmVmPVwiJHt0YXJnZXRMaW5rfVwiIHRhcmdldD1cIl9ibGFua1wiPiR7c2VyaWVzLmRpc3BsYXlWYWx1ZX08L2E+YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIEdyb3VwaW5nXHJcbiAgICAgIGNvbnN0IHJvd3NfZm91bmQgPSB1dGlscy5nZXRGaWVsZHModGhpcy5kYXRhQ29tcHV0ZWQsIFwicm93X25hbWVcIik7XHJcbiAgICAgIGNvbnN0IGNvbHNfZm91bmQgPSB1dGlscy5nZXRGaWVsZHModGhpcy5kYXRhQ29tcHV0ZWQsIFwiY29sX25hbWVcIik7XHJcbiAgICAgIGNvbnN0IGtleXNfZm91bmQgPSB1dGlscy5nZXRGaWVsZHModGhpcy5kYXRhQ29tcHV0ZWQsIFwia2V5X25hbWVcIik7XHJcbiAgICAgIGNvbnN0IGlzX3VuaXF1ZV9rZXlzID0gKGtleXNfZm91bmQubGVuZ3RoID09PSBfLnVuaXEoa2V5c19mb3VuZCkubGVuZ3RoKTtcclxuICAgICAgaWYgKGlzX3VuaXF1ZV9rZXlzKSB7XHJcbiAgICAgICAgdGhpcy5wYW5lbC5lcnJvciA9IHVuZGVmaW5lZDsgLy8vL1xyXG4gICAgICAgIGxldCBvdXRwdXQ6IGFueVtdID0gW107XHJcbiAgICAgICAgXy5lYWNoKF8udW5pcShyb3dzX2ZvdW5kKSwgKHJvd19uYW1lKSA9PiB7XHJcbiAgICAgICAgICBsZXQgbzogYW55ID0ge307XHJcbiAgICAgICAgICBvLnJvdyA9IHJvd19uYW1lO1xyXG4gICAgICAgICAgby5jb2xzID0gW107XHJcbiAgICAgICAgICBfLmVhY2goXy51bmlxKGNvbHNfZm91bmQpLCAoY29sX25hbWUpID0+IHtcclxuICAgICAgICAgICAgbGV0IG1hdGNoZWRfdmFsdWUgPSAoXy5maW5kKHRoaXMuZGF0YUNvbXB1dGVkLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgIHJldHVybiBlLnJvd19uYW1lID09PSByb3dfbmFtZSAmJiBlLmNvbF9uYW1lID09PSBjb2xfbmFtZTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBpZiAoIW1hdGNoZWRfdmFsdWUpIHtcclxuICAgICAgICAgICAgICBtYXRjaGVkX3ZhbHVlID0ge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheVZhbHVlOiBcIk4vQVwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IE5hTlxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgby5jb2xzLnB1c2goe1xyXG4gICAgICAgICAgICAgIFwiYWN0dWFsX2NvbF9uYW1lXCI6IG1hdGNoZWRfdmFsdWUuYWN0dWFsX2NvbF9uYW1lLFxyXG4gICAgICAgICAgICAgIFwiYWN0dWFsX3Jvd19uYW1lXCI6IG1hdGNoZWRfdmFsdWUuYWN0dWFsX3Jvd19uYW1lLFxyXG4gICAgICAgICAgICAgIFwiYmdDb2xvclwiOiBtYXRjaGVkX3ZhbHVlLmJnQ29sb3IgfHwgXCJ0cmFuc3BhcmVudFwiLFxyXG4gICAgICAgICAgICAgIFwiZGlzcGxheVZhbHVlXCI6IG1hdGNoZWRfdmFsdWUuZGlzcGxheVZhbHVlIHx8IG1hdGNoZWRfdmFsdWUudmFsdWUsXHJcbiAgICAgICAgICAgICAgXCJuYW1lXCI6IGNvbF9uYW1lLFxyXG4gICAgICAgICAgICAgIFwidmFsdWVcIjogbWF0Y2hlZF92YWx1ZS52YWx1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgb3V0cHV0LnB1c2gobyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gcmVnaW9uIE91dHB1dCB0YWJsZSBjb25zdHJ1Y3Rpb25cclxuICAgICAgICBsZXQgYm9vbXRhYmxlX291dHB1dF9ib2R5X2hlYWRlcnMgPSB0aGlzLmVsZW0uZmluZChcIiNib29tdGFibGVfb3V0cHV0X2JvZHlfaGVhZGVyc1wiKTtcclxuICAgICAgICBsZXQgYm9vbXRhYmxlX291dHB1dF9ib2R5X2hlYWRlcnNfb3V0cHV0ID0gYDxici8+YDtcclxuICAgICAgICBpZiAodGhpcy5wYW5lbC5oaWRlX2hlYWRlcnMgIT09IHRydWUpIHtcclxuICAgICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9oZWFkZXJzX291dHB1dCArPSBcIjx0cj5cIjtcclxuICAgICAgICAgIGlmICh0aGlzLnBhbmVsLmhpZGVfZmlyc3RfY29sdW1uICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9oZWFkZXJzX291dHB1dCArPSBgPHRoIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjpjZW50ZXJcIj4ke3RoaXMucGFuZWwuZGVmYXVsdF90aXRsZV9mb3Jfcm93c308L3RoPmA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBfLmVhY2goXy51bmlxKGNvbHNfZm91bmQpLCBjID0+IHtcclxuICAgICAgICAgICAgYm9vbXRhYmxlX291dHB1dF9ib2R5X2hlYWRlcnNfb3V0cHV0ICs9IGA8dGggc3R5bGU9XCJwYWRkaW5nOjRweDt0ZXh0LWFsaWduOmNlbnRlclwiPiR7Y308L3RoPmA7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9oZWFkZXJzX291dHB1dCArPSBcIjwvdHI+XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9oZWFkZXJzLmh0bWwoYm9vbXRhYmxlX291dHB1dF9ib2R5X2hlYWRlcnNfb3V0cHV0KTtcclxuICAgICAgICBsZXQgYm9vbXRhYmxlX291dHB1dF9ib2R5ID0gdGhpcy5lbGVtLmZpbmQoJyNib29tdGFibGVfb3V0cHV0X2JvZHknKTtcclxuICAgICAgICBsZXQgYm9vbXRhYmxlX291dHB1dF9ib2R5X291dHB1dCA9IGBgO1xyXG4gICAgICAgIF8uZWFjaChvdXRwdXQsIG8gPT4ge1xyXG4gICAgICAgICAgYm9vbXRhYmxlX291dHB1dF9ib2R5X291dHB1dCArPSBcIjx0cj5cIjtcclxuICAgICAgICAgIGlmICh0aGlzLnBhbmVsLmhpZGVfZmlyc3RfY29sdW1uICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9vdXRwdXQgKz0gYDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O1wiPiR7by5yb3d9PC90ZD5gO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXy5lYWNoKG8uY29scywgYyA9PiB7XHJcbiAgICAgICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9vdXRwdXQgKz0gYDx0ZFxyXG4gICAgICAgICAgICAgIHN0eWxlPVwicGFkZGluZzo0cHg7YmFja2dyb3VuZC1jb2xvcjoke2MuYmdDb2xvcn1cIlxyXG4gICAgICAgICAgICAgIHRpdGxlPVwiJHsgXCJSb3cgTmFtZSA6IFwiICsgdGhpcy5nZXRBY3R1YWxOYW1lV2l0aG91dFRyYW5zZm9ybVNpZ24oYy5hY3R1YWxfcm93X25hbWUpICsgXCJcXG5Db2wgTmFtZSA6IFwiICsgdGhpcy5nZXRBY3R1YWxOYW1lV2l0aG91dFRyYW5zZm9ybVNpZ24oYy5hY3R1YWxfY29sX25hbWUpICsgXCJcXG5WYWx1ZSA6IFwiICsgYy52YWx1ZX1cIlxyXG4gICAgICAgICAgICA+JHtjLmRpc3BsYXlWYWx1ZX08L3RkPmA7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9vdXRwdXQgKz0gXCI8L3RyPlwiO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keS5odG1sKGJvb210YWJsZV9vdXRwdXRfYm9keV9vdXRwdXQpO1xyXG4gICAgICAgIC8vIGVuZHJlZ2lvblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBkdXBsaWNhdGVLZXlWYWx1ZXMgPSBfLnVuaXEoa2V5c19mb3VuZC5maWx0ZXIodiA9PiB7XHJcbiAgICAgICAgICByZXR1cm4ga2V5c19mb3VuZC5maWx0ZXIodCA9PiB0ID09PSB2KS5sZW5ndGggPiAxO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICBsZXQgZXJyX2R1cGxpY2F0ZUtleXMgPSBuZXcgRXJyb3IoKTtcclxuICAgICAgICBlcnJfZHVwbGljYXRlS2V5cy5uYW1lID0gXCJEdXBsaWNhdGUga2V5cyBmb3VuZFwiO1xyXG4gICAgICAgIGVycl9kdXBsaWNhdGVLZXlzLm1lc3NhZ2UgPSBcIkR1cGxpY2F0ZSBrZXkgdmFsdWVzIDogPGJyLz5cIiArIGR1cGxpY2F0ZUtleVZhbHVlcy5qb2luKFwiPGJyLz4gXCIpO1xyXG4gICAgICAgIHRoaXMucGFuZWwuZXJyb3IgPSBlcnJfZHVwbGljYXRlS2V5cztcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gcmVnaW9uIERlYnVnIHRhYmxlIGJvZHkgY29uc3RydWN0aW9uXHJcbiAgICAgIGxldCBib29tdGFibGVfb3V0cHV0X2JvZHlfZGVidWcgPSB0aGlzLmVsZW0uZmluZCgnI2Jvb210YWJsZV9vdXRwdXRfYm9keV9kZWJ1ZycpO1xyXG4gICAgICBsZXQgYm9vbXRhYmxlX291dHB1dF9ib2R5X2RlYnVnX291dHB1dCA9IGBgO1xyXG4gICAgICBfLmVhY2godGhpcy5kYXRhQ29tcHV0ZWQsIGQgPT4ge1xyXG4gICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9kZWJ1Z19vdXRwdXQgKz0gYFxyXG4gICAgICAgIDx0cj5cclxuICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O1wiIHdpZHRoPVwiNDAlXCI+JHtkLmFsaWFzfTwvdGQ+XHJcbiAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDtcIj4ke2QucGF0dGVybi5wYXR0ZXJuIHx8IFwiRGVmYXVsdFwifTwvdGQ+XHJcbiAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDtiYWNrZ3JvdW5kLWNvbG9yOiR7ZC5iZ0NvbG9yfVwiPiR7ZC5kaXNwbGF5VmFsdWV9PC90ZD5cclxuICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O1wiPiR7ZC5yb3dfbmFtZX08L3RkPlxyXG4gICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7XCI+JHtkLmNvbF9uYW1lfTwvdGQ+XHJcbiAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDtcIj4ke2QudGhyZXNob2xkc308L3RkPlxyXG4gICAgICAgIDwvdHI+XHJcbiAgICAgICAgYDtcclxuICAgICAgfSk7XHJcbiAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9kZWJ1Zy5odG1sKGJvb210YWJsZV9vdXRwdXRfYm9keV9kZWJ1Z19vdXRwdXQpO1xyXG4gICAgICAvLyBlbmRyZWdpb25cclxuICAgIH1cclxuICAgIGxldCByb290RWxlbSA9IHRoaXMuZWxlbS5maW5kKCcudGFibGUtcGFuZWwtc2Nyb2xsJyk7XHJcbiAgICBsZXQgbWF4aGVpZ2h0b2ZwYW5lbCA9IHRoaXMucGFuZWwuZGVidWdfbW9kZSA/IHRoaXMuY3RybC5oZWlnaHQgLSA3MSA6IHRoaXMuY3RybC5oZWlnaHQgLSAzMTtcclxuICAgIHJvb3RFbGVtLmNzcyh7ICdtYXgtaGVpZ2h0JzogbWF4aGVpZ2h0b2ZwYW5lbCArIFwicHhcIiB9KTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQge1xyXG4gIEdyYWZhbmFCb29tVGFibGVDdHJsIGFzIFBhbmVsQ3RybFxyXG59O1xyXG4iXX0=