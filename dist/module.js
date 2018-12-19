System.register(["./app/app", "lodash"], function (exports_1, context_1) {
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
    var app_1, lodash_1, GrafanaBoomTableCtrl;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (app_1_1) {
                app_1 = app_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }
        ],
        execute: function () {
            app_1.loadPluginCss(app_1.config.list_of_stylesheets);
            GrafanaBoomTableCtrl = (function (_super) {
                __extends(GrafanaBoomTableCtrl, _super);
                function GrafanaBoomTableCtrl($scope, $injector, $sce) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.unitFormats = app_1.kbn.getUnitFormats();
                    _this.valueNameOptions = app_1.config.valueNameOptions;
                    lodash_1.default.defaults(_this.panel, app_1.config.panelDefaults);
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
                        datapoints: seriesData.datapoints || [],
                        alias: seriesData.target
                    });
                    series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
                    return series;
                };
                GrafanaBoomTableCtrl.prototype.addPattern = function () {
                    var newPattern = {
                        name: "New Pattern",
                        pattern: "^server.*cpu$",
                        delimiter: ".",
                        valueName: "avg",
                        row_name: this.panel.row_col_wrapper + "0" + this.panel.row_col_wrapper,
                        col_name: this.panel.row_col_wrapper + "1" + this.panel.row_col_wrapper,
                        thresholds: "70,90",
                        time_based_thresholds: [],
                        enable_time_based_thresholds: false,
                        enable_bgColor: false,
                        bgColors: "green|orange|red",
                        enable_bgColor_overrides: false,
                        bgColors_overrides: "0->green|2->red|1->yellow",
                        enable_transform: false,
                        transform_values: "_value_|_value_|_value_",
                        enable_transform_overrides: false,
                        transform_values_overrides: "0->down|1->up",
                        decimals: 2,
                        format: "none",
                        null_color: "darkred",
                        null_value: "No data",
                        enable_clickable_cells: false,
                        clickable_cells_link: "",
                        filter: {
                            value_below: "",
                            value_above: "",
                        }
                    };
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
                    this.panel.patterns.push(copiedPattern);
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.add_time_based_thresholds = function (index) {
                    var new_time_based_threshold = {
                        name: "Early morning of everyday",
                        from: "0000",
                        to: "0530",
                        enabledDays: "Sun,Mon,Tue,Wed,Thu,Fri,Sat",
                        threshold: "70,90"
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
                GrafanaBoomTableCtrl.prototype.inverseBGColors = function (index) {
                    if (index === -1) {
                        this.panel.defaultPattern.bgColors = this.panel.defaultPattern.bgColors.split("|").reverse().join("|");
                    }
                    else {
                        this.panel.patterns[index].bgColors = this.panel.patterns[index].bgColors.split("|").reverse().join("|");
                    }
                    this.render();
                };
                GrafanaBoomTableCtrl.prototype.inverseTransformValues = function (index) {
                    if (index === -1) {
                        this.panel.defaultPattern.transform_values = this.panel.defaultPattern.transform_values.split("|").reverse().join("|");
                    }
                    else {
                        this.panel.patterns[index].transform_values = this.panel.patterns[index].transform_values.split("|").reverse().join("|");
                    }
                    this.render();
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
                    this.ctrl = ctrl;
                    this.elem = elem;
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
                            ;
                        });
                        this.dataComputed = this.dataComputed.map(function (series) {
                            series.row_name = series.alias.split(series.pattern.delimiter || ".").reduce(function (r, it, i) {
                                return r.replace(new RegExp(_this.panel.row_col_wrapper + i + _this.panel.row_col_wrapper, "g"), it);
                            }, series.pattern.row_name.replace(new RegExp(_this.panel.row_col_wrapper + "series" + _this.panel.row_col_wrapper, "g"), series.alias) || app_1.config.panelDefaults.defaultPattern.row_name.replace(new RegExp(_this.panel.row_col_wrapper + "series" + _this.panel.row_col_wrapper, "g"), series.alias));
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
                                            value: NaN,
                                            displayValue: "N/A"
                                        };
                                    }
                                    o.cols.push({
                                        "name": col_name,
                                        "value": matched_value.value,
                                        "actual_col_name": matched_value.actual_col_name,
                                        "actual_row_name": matched_value.actual_row_name,
                                        "displayValue": matched_value.displayValue || matched_value.value,
                                        "bgColor": matched_value.bgColor || "transparent"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFTQSxtQkFBYSxDQUFDLFlBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOztnQkFFUCx3Q0FBZ0I7Z0JBT2pELDhCQUFZLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSTtvQkFBbkMsWUFDRSxrQkFBTSxNQUFNLEVBQUUsU0FBUyxDQUFDLFNBSXpCO29CQVZELGlCQUFXLEdBQVEsU0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN4QyxzQkFBZ0IsR0FBVyxZQUFNLENBQUMsZ0JBQWdCLENBQUM7b0JBTWpELGdCQUFDLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsWUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUM3QyxLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztvQkFDaEUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQzs7Z0JBQ25FLENBQUM7Z0JBQ0QsNkNBQWMsR0FBZDtvQkFBQSxpQkFJQztvQkFIQyxnQkFBQyxDQUFDLElBQUksQ0FBQyxZQUFNLENBQUMsVUFBVSxFQUFFLFVBQUEsTUFBTTt3QkFDOUIsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGlCQUFpQixHQUFHLFlBQU0sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQzFHLENBQUMsQ0FBQyxDQUFBO2dCQUNKLENBQUM7Z0JBQ0QsNkNBQWMsR0FBZCxVQUFlLElB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QVksb0RBQzNDLENBQUMsQ0FBQyxRQUFRLG9EQUNWLENBQUMsQ0FBQyxRQUFRLG9EQUNWLENBQUMsQ0FBQyxVQUFVLG1DQUV4QyxDQUFBO3dCQUNILENBQUMsQ0FBQyxDQUFBO3dCQUNGLDJCQUEyQixDQUFDLElBQUksQ0FBQyxvQ0FBa0MsQ0FBQyxDQUFDO3FCQUV0RTtvQkFDRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO29CQUNyRCxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztvQkFDN0YsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2lCQUN6RDtZQUNILENBQUMsQ0FBQztRQUtGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIGtibixcclxuICBsb2FkUGx1Z2luQ3NzLFxyXG4gIE1ldHJpY3NQYW5lbEN0cmwsXHJcbiAgVGltZVNlcmllcyxcclxuICB1dGlscyxcclxuICBjb25maWdcclxufSBmcm9tIFwiLi9hcHAvYXBwXCJcclxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xyXG5sb2FkUGx1Z2luQ3NzKGNvbmZpZy5saXN0X29mX3N0eWxlc2hlZXRzKTtcclxuXHJcbmNsYXNzIEdyYWZhbmFCb29tVGFibGVDdHJsIGV4dGVuZHMgTWV0cmljc1BhbmVsQ3RybCB7XHJcbiAgc3RhdGljIHRlbXBsYXRlVXJsID0gXCJwYXJ0aWFscy9tb2R1bGUuaHRtbFwiO1xyXG4gIHVuaXRGb3JtYXRzOiBhbnkgPSBrYm4uZ2V0VW5pdEZvcm1hdHMoKTtcclxuICB2YWx1ZU5hbWVPcHRpb25zOiBPYmplY3QgPSBjb25maWcudmFsdWVOYW1lT3B0aW9ucztcclxuICBkYXRhUmVjZWl2ZWQ6IGFueTtcclxuICBjdHJsOiBhbnk7XHJcbiAgZWxlbTogYW55O1xyXG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJGluamVjdG9yLCAkc2NlKSB7XHJcbiAgICBzdXBlcigkc2NvcGUsICRpbmplY3Rvcik7XHJcbiAgICBfLmRlZmF1bHRzKHRoaXMucGFuZWwsIGNvbmZpZy5wYW5lbERlZmF1bHRzKTtcclxuICAgIHRoaXMuZXZlbnRzLm9uKFwiZGF0YS1yZWNlaXZlZFwiLCB0aGlzLm9uRGF0YVJlY2VpdmVkLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5ldmVudHMub24oXCJpbml0LWVkaXQtbW9kZVwiLCB0aGlzLm9uSW5pdEVkaXRNb2RlLmJpbmQodGhpcykpO1xyXG4gIH1cclxuICBvbkluaXRFZGl0TW9kZSgpIHtcclxuICAgIF8uZWFjaChjb25maWcuZWRpdG9yVGFicywgZWRpdG9yID0+IHtcclxuICAgICAgdGhpcy5hZGRFZGl0b3JUYWIoZWRpdG9yLm5hbWUsIFwicHVibGljL3BsdWdpbnMvXCIgKyBjb25maWcucGx1Z2luX2lkICsgZWRpdG9yLnRlbXBsYXRlLCBlZGl0b3IucG9zaXRpb24pO1xyXG4gICAgfSlcclxuICB9XHJcbiAgb25EYXRhUmVjZWl2ZWQoZGF0YSkge1xyXG4gICAgdGhpcy5kYXRhUmVjZWl2ZWQgPSBkYXRhO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgc2VyaWVzSGFuZGxlcihzZXJpZXNEYXRhKSB7XHJcbiAgICBsZXQgc2VyaWVzID0gbmV3IFRpbWVTZXJpZXMoe1xyXG4gICAgICBkYXRhcG9pbnRzOiBzZXJpZXNEYXRhLmRhdGFwb2ludHMgfHwgW10sXHJcbiAgICAgIGFsaWFzOiBzZXJpZXNEYXRhLnRhcmdldFxyXG4gICAgfSk7XHJcbiAgICBzZXJpZXMuZmxvdHBhaXJzID0gc2VyaWVzLmdldEZsb3RQYWlycyh0aGlzLnBhbmVsLm51bGxQb2ludE1vZGUpO1xyXG4gICAgcmV0dXJuIHNlcmllcztcclxuICB9XHJcbiAgYWRkUGF0dGVybigpIHtcclxuICAgIGxldCBuZXdQYXR0ZXJuID0ge1xyXG4gICAgICBuYW1lOiBcIk5ldyBQYXR0ZXJuXCIsXHJcbiAgICAgIHBhdHRlcm46IFwiXnNlcnZlci4qY3B1JFwiLFxyXG4gICAgICBkZWxpbWl0ZXI6IFwiLlwiLFxyXG4gICAgICB2YWx1ZU5hbWU6IFwiYXZnXCIsXHJcbiAgICAgIHJvd19uYW1lOiB0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlciArIFwiMFwiICsgdGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIsXHJcbiAgICAgIGNvbF9uYW1lOiB0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlciArIFwiMVwiICsgdGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIsXHJcbiAgICAgIHRocmVzaG9sZHM6IFwiNzAsOTBcIixcclxuICAgICAgdGltZV9iYXNlZF90aHJlc2hvbGRzOiBbXSxcclxuICAgICAgZW5hYmxlX3RpbWVfYmFzZWRfdGhyZXNob2xkczogZmFsc2UsXHJcbiAgICAgIGVuYWJsZV9iZ0NvbG9yOiBmYWxzZSxcclxuICAgICAgYmdDb2xvcnM6IFwiZ3JlZW58b3JhbmdlfHJlZFwiLFxyXG4gICAgICBlbmFibGVfYmdDb2xvcl9vdmVycmlkZXM6IGZhbHNlLFxyXG4gICAgICBiZ0NvbG9yc19vdmVycmlkZXM6IFwiMC0+Z3JlZW58Mi0+cmVkfDEtPnllbGxvd1wiLFxyXG4gICAgICBlbmFibGVfdHJhbnNmb3JtOiBmYWxzZSxcclxuICAgICAgdHJhbnNmb3JtX3ZhbHVlczogXCJfdmFsdWVffF92YWx1ZV98X3ZhbHVlX1wiLFxyXG4gICAgICBlbmFibGVfdHJhbnNmb3JtX292ZXJyaWRlczogZmFsc2UsXHJcbiAgICAgIHRyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzOiBcIjAtPmRvd258MS0+dXBcIixcclxuICAgICAgZGVjaW1hbHM6IDIsXHJcbiAgICAgIGZvcm1hdDogXCJub25lXCIsXHJcbiAgICAgIG51bGxfY29sb3I6IFwiZGFya3JlZFwiLFxyXG4gICAgICBudWxsX3ZhbHVlOiBcIk5vIGRhdGFcIixcclxuICAgICAgZW5hYmxlX2NsaWNrYWJsZV9jZWxsczogZmFsc2UsXHJcbiAgICAgIGNsaWNrYWJsZV9jZWxsc19saW5rOiBcIlwiLFxyXG4gICAgICBmaWx0ZXI6IHtcclxuICAgICAgICB2YWx1ZV9iZWxvdzogXCJcIixcclxuICAgICAgICB2YWx1ZV9hYm92ZTogXCJcIixcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMucHVzaChuZXdQYXR0ZXJuKTtcclxuICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID0gdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggLSAxO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgbW92ZVBhdHRlcm4oZGlyZWN0aW9uLCBpbmRleCkge1xyXG4gICAgbGV0IHRlbXBFbGVtZW50ID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF07XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcIlVQXCIpIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0gPSB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4IC0gMV07XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXggLSAxXSA9IHRlbXBFbGVtZW50O1xyXG4gICAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9IGluZGV4IC0gMTtcclxuICAgIH1cclxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiRE9XTlwiKSB7XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleCArIDFdO1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4ICsgMV0gPSB0ZW1wRWxlbWVudDtcclxuICAgICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSBpbmRleCArIDE7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICByZW1vdmVQYXR0ZXJuKGluZGV4KSB7XHJcbiAgICB0aGlzLnBhbmVsLnBhdHRlcm5zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9ICh0aGlzLnBhbmVsLnBhdHRlcm5zICYmIHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoID4gMCkgPyAodGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggLSAxKSA6IC0xO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgY2xvbmVQYXR0ZXJuKGluZGV4KSB7XHJcbiAgICBsZXQgY29waWVkUGF0dGVybiA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdKTtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMucHVzaChjb3BpZWRQYXR0ZXJuKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIGFkZF90aW1lX2Jhc2VkX3RocmVzaG9sZHMoaW5kZXgpIHtcclxuICAgIGxldCBuZXdfdGltZV9iYXNlZF90aHJlc2hvbGQgPSB7XHJcbiAgICAgIG5hbWU6IFwiRWFybHkgbW9ybmluZyBvZiBldmVyeWRheVwiLFxyXG4gICAgICBmcm9tOiBcIjAwMDBcIixcclxuICAgICAgdG86IFwiMDUzMFwiLFxyXG4gICAgICBlbmFibGVkRGF5czogXCJTdW4sTW9uLFR1ZSxXZWQsVGh1LEZyaSxTYXRcIixcclxuICAgICAgdGhyZXNob2xkOiBcIjcwLDkwXCJcclxuICAgIH1cclxuICAgIGlmIChpbmRleCA9PT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4udGltZV9iYXNlZF90aHJlc2hvbGRzID0gdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybi50aW1lX2Jhc2VkX3RocmVzaG9sZHMgfHwgW107XHJcbiAgICAgIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4udGltZV9iYXNlZF90aHJlc2hvbGRzLnB1c2gobmV3X3RpbWVfYmFzZWRfdGhyZXNob2xkKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS50aW1lX2Jhc2VkX3RocmVzaG9sZHMgPSB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS50aW1lX2Jhc2VkX3RocmVzaG9sZHMgfHwgW107XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdLnRpbWVfYmFzZWRfdGhyZXNob2xkcy5wdXNoKG5ld190aW1lX2Jhc2VkX3RocmVzaG9sZCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICByZW1vdmVfdGltZV9iYXNlZF90aHJlc2hvbGRzKHBhdHRlcm5JbmRleCwgaW5kZXgpIHtcclxuICAgIGlmIChwYXR0ZXJuSW5kZXggPT09ICdkZWZhdWx0Jykge1xyXG4gICAgICB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLnRpbWVfYmFzZWRfdGhyZXNob2xkcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbcGF0dGVybkluZGV4XS50aW1lX2Jhc2VkX3RocmVzaG9sZHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuICB9XHJcbiAgaW52ZXJzZUJHQ29sb3JzKGluZGV4KSB7XHJcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XHJcbiAgICAgIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4uYmdDb2xvcnMgPSB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLmJnQ29sb3JzLnNwbGl0KFwifFwiKS5yZXZlcnNlKCkuam9pbihcInxcIik7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0uYmdDb2xvcnMgPSB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS5iZ0NvbG9ycy5zcGxpdChcInxcIikucmV2ZXJzZSgpLmpvaW4oXCJ8XCIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgaW52ZXJzZVRyYW5zZm9ybVZhbHVlcyhpbmRleCkge1xyXG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xyXG4gICAgICB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLnRyYW5zZm9ybV92YWx1ZXMgPSB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLnRyYW5zZm9ybV92YWx1ZXMuc3BsaXQoXCJ8XCIpLnJldmVyc2UoKS5qb2luKFwifFwiKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS50cmFuc2Zvcm1fdmFsdWVzID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0udHJhbnNmb3JtX3ZhbHVlcy5zcGxpdChcInxcIikucmV2ZXJzZSgpLmpvaW4oXCJ8XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIGNvbXB1dGVCZ0NvbG9yKHRocmVzaG9sZHMsIGJnQ29sb3JzLCB2YWx1ZSkge1xyXG4gICAgbGV0IGMgPSBcInRyYW5zcGFyZW50XCI7XHJcbiAgICBpZiAodGhyZXNob2xkcyAmJiBiZ0NvbG9ycyAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgJiYgdGhyZXNob2xkcy5sZW5ndGggKyAxIDw9IGJnQ29sb3JzLmxlbmd0aCkge1xyXG4gICAgICBiZ0NvbG9ycyA9IF8uZHJvcFJpZ2h0KGJnQ29sb3JzLCBiZ0NvbG9ycy5sZW5ndGggLSB0aHJlc2hvbGRzLmxlbmd0aCAtIDEpO1xyXG4gICAgICBpZiAoYmdDb2xvcnNbYmdDb2xvcnMubGVuZ3RoIC0gMV0gPT09IFwiXCIpIHtcclxuICAgICAgICBiZ0NvbG9yc1tiZ0NvbG9ycy5sZW5ndGggLSAxXSA9IFwidHJhbnNwYXJlbnRcIjtcclxuICAgICAgfVxyXG4gICAgICBmb3IgKGxldCBpID0gdGhyZXNob2xkcy5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcclxuICAgICAgICBpZiAodmFsdWUgPj0gdGhyZXNob2xkc1tpIC0gMV0pIHtcclxuICAgICAgICAgIHJldHVybiB1dGlscy5ub3JtYWxpemVDb2xvcihiZ0NvbG9yc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB1dGlscy5ub3JtYWxpemVDb2xvcihfLmZpcnN0KGJnQ29sb3JzKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYztcclxuICB9XHJcbiAgdHJhbnNmb3JtVmFsdWUodGhyZXNob2xkcywgdHJhbnNmb3JtX3ZhbHVlcywgdmFsdWUsIGRpc3BsYXlWYWx1ZSwgcm93X25hbWUsIGNvbF9uYW1lKSB7XHJcbiAgICBsZXQgdCA9IHZhbHVlO1xyXG4gICAgaWYgKHRocmVzaG9sZHMgJiYgdHJhbnNmb3JtX3ZhbHVlcyAmJiB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgJiYgdGhyZXNob2xkcy5sZW5ndGggKyAxIDw9IHRyYW5zZm9ybV92YWx1ZXMubGVuZ3RoKSB7XHJcbiAgICAgIHRyYW5zZm9ybV92YWx1ZXMgPSBfLmRyb3BSaWdodCh0cmFuc2Zvcm1fdmFsdWVzLCB0cmFuc2Zvcm1fdmFsdWVzLmxlbmd0aCAtIHRocmVzaG9sZHMubGVuZ3RoIC0gMSk7XHJcbiAgICAgIGlmICh0cmFuc2Zvcm1fdmFsdWVzW3RyYW5zZm9ybV92YWx1ZXMubGVuZ3RoIC0gMV0gPT09IFwiXCIpIHtcclxuICAgICAgICB0cmFuc2Zvcm1fdmFsdWVzW3RyYW5zZm9ybV92YWx1ZXMubGVuZ3RoIC0gMV0gPSBcIl92YWx1ZV9cIjtcclxuICAgICAgfVxyXG4gICAgICBmb3IgKGxldCBpID0gdGhyZXNob2xkcy5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcclxuICAgICAgICBpZiAodmFsdWUgPj0gdGhyZXNob2xkc1tpIC0gMV0pIHtcclxuICAgICAgICAgIHJldHVybiB0cmFuc2Zvcm1fdmFsdWVzW2ldLnJlcGxhY2UobmV3IFJlZ0V4cChcIl92YWx1ZV9cIiwgXCJnXCIpLCBkaXNwbGF5VmFsdWUpLnJlcGxhY2UobmV3IFJlZ0V4cChcIl9yb3dfbmFtZV9cIiwgXCJnXCIpLCByb3dfbmFtZSkucmVwbGFjZShuZXcgUmVnRXhwKFwiX2NvbF9uYW1lX1wiLCBcImdcIiksIGNvbF9uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIF8uZmlyc3QodHJhbnNmb3JtX3ZhbHVlcykucmVwbGFjZShuZXcgUmVnRXhwKFwiX3ZhbHVlX1wiLCBcImdcIiksIGRpc3BsYXlWYWx1ZSkucmVwbGFjZShuZXcgUmVnRXhwKFwiX3Jvd19uYW1lX1wiLCBcImdcIiksIHJvd19uYW1lKS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfY29sX25hbWVfXCIsIFwiZ1wiKSwgY29sX25hbWUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbiAgfVxyXG4gIHJlcGxhY2VGb250QXdlc29tZUljb25zKHZhbHVlKSB7XHJcbiAgICBpZiAoIXZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfVxyXG4gICAgcmV0dXJuICh2YWx1ZSArIFwiXCIpXHJcbiAgICAgIC5zcGxpdChcIiBcIilcclxuICAgICAgLm1hcChhID0+IHtcclxuICAgICAgICBpZiAoYS5zdGFydHNXaXRoKFwiX2ZhLVwiKSAmJiBhLmVuZHNXaXRoKFwiX1wiKSkge1xyXG4gICAgICAgICAgbGV0IGljb24gPSBhLnJlcGxhY2UoL1xcXy9nLCBcIlwiKS5zcGxpdChcIixcIilbMF07XHJcbiAgICAgICAgICBsZXQgY29sb3IgPSBhLmluZGV4T2YoXCIsXCIpID4gLTEgPyBgIHN0eWxlPVwiY29sb3I6JHt1dGlscy5ub3JtYWxpemVDb2xvcihhLnJlcGxhY2UoL1xcXy9nLCBcIlwiKS5zcGxpdChcIixcIilbMV0pfVwiIGAgOiBcIlwiO1xyXG4gICAgICAgICAgbGV0IHJlcGVhdENvdW50ID0gYS5zcGxpdChcIixcIikubGVuZ3RoID4gMiA/ICsoYS5yZXBsYWNlKC9cXF8vZywgXCJcIikuc3BsaXQoXCIsXCIpWzJdKSA6IDE7XHJcbiAgICAgICAgICBhID0gYDxpIGNsYXNzPVwiZmEgJHtpY29ufVwiICR7Y29sb3J9PjwvaT4gYC5yZXBlYXQocmVwZWF0Q291bnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYTtcclxuICAgICAgfSlcclxuICAgICAgLmpvaW4oXCIgXCIpO1xyXG4gIH1cclxuICByZXBsYWNlV2l0aEltYWdlcyh2YWx1ZSkge1xyXG4gICAgaWYgKCF2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH1cclxuICAgIHJldHVybiAodmFsdWUgKyBcIlwiKVxyXG4gICAgICAuc3BsaXQoXCIgXCIpXHJcbiAgICAgIC5tYXAoYSA9PiB7XHJcbiAgICAgICAgaWYgKGEuc3RhcnRzV2l0aChcIl9pbWctXCIpICYmIGEuZW5kc1dpdGgoXCJfXCIpKSB7XHJcbiAgICAgICAgICBhID0gYS5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgICBsZXQgaW1nVXJsID0gYS5yZXBsYWNlKFwiX2ltZy1cIiwgXCJcIikuc3BsaXQoXCIsXCIpWzBdO1xyXG4gICAgICAgICAgbGV0IGltZ1dpZHRoID0gYS5zcGxpdChcIixcIikubGVuZ3RoID4gMSA/IGEucmVwbGFjZShcIl9pbWctXCIsIFwiXCIpLnNwbGl0KFwiLFwiKVsxXSA6IFwiMjBweFwiO1xyXG4gICAgICAgICAgbGV0IGltZ0hlaWdodCA9IGEuc3BsaXQoXCIsXCIpLmxlbmd0aCA+IDIgPyBhLnJlcGxhY2UoXCJfaW1nLVwiLCBcIlwiKS5zcGxpdChcIixcIilbMl0gOiBcIjIwcHhcIjtcclxuICAgICAgICAgIGxldCByZXBlYXRDb3VudCA9IGEuc3BsaXQoXCIsXCIpLmxlbmd0aCA+IDMgPyArKGEucmVwbGFjZShcIl9pbWctXCIsIFwiXCIpLnNwbGl0KFwiLFwiKVszXSkgOiAxO1xyXG4gICAgICAgICAgYSA9IGA8aW1nIHdpZHRoPVwiJHtpbWdXaWR0aH1cIiBoZWlnaHQ9XCIke2ltZ0hlaWdodH1cIiBzcmM9XCIke2ltZ1VybH1cIi8+YC5yZXBlYXQocmVwZWF0Q291bnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYTtcclxuICAgICAgfSlcclxuICAgICAgLmpvaW4oXCIgXCIpO1xyXG4gIH1cclxuICBnZXRBY3R1YWxOYW1lV2l0aG91dFRyYW5zZm9ybVNpZ24odmFsdWUpIHtcclxuICAgIHJldHVybiAodmFsdWUgKyBcIlwiKVxyXG4gICAgICAuc3BsaXQoXCIgXCIpXHJcbiAgICAgIC5tYXAoYSA9PiB7XHJcbiAgICAgICAgaWYgKGEuc3RhcnRzV2l0aChcIl9mYS1cIikgJiYgYS5lbmRzV2l0aChcIl9cIikpIHtcclxuICAgICAgICAgIGEgPSBgYDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGEuc3RhcnRzV2l0aChcIl9pbWctXCIpICYmIGEuZW5kc1dpdGgoXCJfXCIpKSB7XHJcbiAgICAgICAgICBhID0gYGA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgICB9KVxyXG4gICAgICAuam9pbihcIiBcIik7XHJcbiAgfVxyXG4gIGdldERlY2ltYWxzRm9yVmFsdWUodmFsdWUsIF9kZWNpbWFscykge1xyXG4gICAgaWYgKF8uaXNOdW1iZXIoK19kZWNpbWFscykpIHtcclxuICAgICAgbGV0IG86IE9iamVjdCA9IHtcclxuICAgICAgICBkZWNpbWFsczogX2RlY2ltYWxzLFxyXG4gICAgICAgIHNjYWxlZERlY2ltYWxzOiBudWxsXHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiBvO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBkZWx0YSA9IHZhbHVlIC8gMjtcclxuICAgIGxldCBkZWMgPSAtTWF0aC5mbG9vcihNYXRoLmxvZyhkZWx0YSkgLyBNYXRoLkxOMTApO1xyXG5cclxuICAgIGxldCBtYWduID0gTWF0aC5wb3coMTAsIC1kZWMpLFxyXG4gICAgICBub3JtID0gZGVsdGEgLyBtYWduLCAvLyBub3JtIGlzIGJldHdlZW4gMS4wIGFuZCAxMC4wXHJcbiAgICAgIHNpemU7XHJcblxyXG4gICAgaWYgKG5vcm0gPCAxLjUpIHtcclxuICAgICAgc2l6ZSA9IDE7XHJcbiAgICB9IGVsc2UgaWYgKG5vcm0gPCAzKSB7XHJcbiAgICAgIHNpemUgPSAyO1xyXG4gICAgICAvLyBzcGVjaWFsIGNhc2UgZm9yIDIuNSwgcmVxdWlyZXMgYW4gZXh0cmEgZGVjaW1hbFxyXG4gICAgICBpZiAobm9ybSA+IDIuMjUpIHtcclxuICAgICAgICBzaXplID0gMi41O1xyXG4gICAgICAgICsrZGVjO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKG5vcm0gPCA3LjUpIHtcclxuICAgICAgc2l6ZSA9IDU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzaXplID0gMTA7XHJcbiAgICB9XHJcblxyXG4gICAgc2l6ZSAqPSBtYWduO1xyXG5cclxuICAgIC8vIHJlZHVjZSBzdGFydGluZyBkZWNpbWFscyBpZiBub3QgbmVlZGVkXHJcbiAgICBpZiAoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlKSB7XHJcbiAgICAgIGRlYyA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJlc3VsdDogT2JqZWN0ID0ge1xyXG4gICAgICBkZWNpbWFsczogTWF0aC5tYXgoMCwgZGVjKSxcclxuICAgICAgc2NhbGVkRGVjaW1hbHM6IE1hdGgubWF4KDAsIGRlYykgLSBNYXRoLmZsb29yKE1hdGgubG9nKHNpemUpIC8gTWF0aC5MTjEwKSArIDJcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgc2V0VW5pdEZvcm1hdChzdWJJdGVtLCBpbmRleCkge1xyXG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xyXG4gICAgICB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLmZvcm1hdCA9IHN1Ykl0ZW0udmFsdWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS5mb3JtYXQgPSBzdWJJdGVtLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgbGltaXRUZXh0KHRleHQsIG1heGxlbmd0aCkge1xyXG4gICAgaWYgKHRleHQuc3BsaXQoJycpLmxlbmd0aCA+IG1heGxlbmd0aCkge1xyXG4gICAgICB0ZXh0ID0gdGV4dC5zdWJzdHJpbmcoMCwgbWF4bGVuZ3RoIC0gMykgKyBcIi4uLlwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRleHQ7XHJcbiAgfVxyXG4gIGxpbmsoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsKSB7XHJcbiAgICB0aGlzLmN0cmwgPSBjdHJsO1xyXG4gICAgdGhpcy5lbGVtID0gZWxlbTtcclxuICB9XHJcbn1cclxuXHJcbkdyYWZhbmFCb29tVGFibGVDdHJsLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKHRoaXMuZGF0YVJlY2VpdmVkKSB7XHJcbiAgICAvLyBDb3B5aW5nIHRoZSBkYXRhIHJlY2VpdmVkXHJcbiAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YVJlY2VpdmVkO1xyXG4gICAgdGhpcy5wYW5lbC5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzID0gdGhpcy5wYW5lbC5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzIHx8IGNvbmZpZy5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzO1xyXG4gICAgY29uc3QgbWV0cmljc1JlY2VpdmVkID0gdXRpbHMuZ2V0RmllbGRzKHRoaXMuZGF0YUNvbXB1dGVkLCBcInRhcmdldFwiKTtcclxuICAgIGlmIChtZXRyaWNzUmVjZWl2ZWQubGVuZ3RoICE9PSBfLnVuaXEobWV0cmljc1JlY2VpdmVkKS5sZW5ndGgpIHtcclxuICAgICAgbGV0IGR1cGxpY2F0ZUtleXMgPSBfLnVuaXEobWV0cmljc1JlY2VpdmVkLmZpbHRlcih2ID0+IHtcclxuICAgICAgICByZXR1cm4gbWV0cmljc1JlY2VpdmVkLmZpbHRlcih0ID0+IHQgPT09IHYpLmxlbmd0aCA+IDFcclxuICAgICAgfSkpO1xyXG4gICAgICBsZXQgZXJyID0gbmV3IEVycm9yKCk7XHJcbiAgICAgIGVyci5uYW1lID0gXCJEdXBsaWNhdGUgZGF0YSByZWNlaXZlZFwiO1xyXG4gICAgICBlcnIubWVzc2FnZSA9IFwiRHVwbGljYXRlIGtleXMgOiA8YnIvPlwiICsgZHVwbGljYXRlS2V5cy5qb2luKFwiPGJyLz4gXCIpO1xyXG4gICAgICB0aGlzLnBhbmVsLmVycm9yID0gZXJyO1xyXG4gICAgICB0aGlzLnBhbmVsLmRhdGEgPSB1bmRlZmluZWQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbmVsLmVycm9yID0gdW5kZWZpbmVkO1xyXG4gICAgICAvLyBCaW5kaW5nIHRoZSBncmFmYW5hIGNvbXB1dGF0aW9ucyB0byB0aGUgbWV0cmljcyByZWNlaXZlZFxyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YVJlY2VpdmVkLm1hcCh0aGlzLnNlcmllc0hhbmRsZXIuYmluZCh0aGlzKSk7XHJcbiAgICAgIC8vIEdldCBTZXJ2ZXIgVGltZSBTdGFtcCBvZiB0aGUgU2VyaWVzIGZvciB0aW1lIGJhc2VkIHRocmVzaG9sZHMuXHJcbiAgICAgIHRoaXMuZGF0YUNvbXB1dGVkID0gdGhpcy5kYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgc2VyaWVzLmN1cnJlbnRfc2VydmVydGltZXN0YW1wID0gbmV3IERhdGUoKTtcclxuICAgICAgICBpZiAoc2VyaWVzICYmIHNlcmllcy5kYXRhcG9pbnRzICYmIHNlcmllcy5kYXRhcG9pbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIGlmIChfLmxhc3Qoc2VyaWVzLmRhdGFwb2ludHMpLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICBzZXJpZXMuY3VycmVudF9zZXJ2ZXJ0aW1lc3RhbXAgPSBuZXcgRGF0ZShfLmxhc3Qoc2VyaWVzLmRhdGFwb2ludHMpWzFdKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIEFzc2lnbiBwYXR0ZXJuXHJcbiAgICAgIHRoaXMuZGF0YUNvbXB1dGVkID0gdGhpcy5kYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgc2VyaWVzLnBhdHRlcm4gPSBfLmZpbmQodGhpcy5wYW5lbC5wYXR0ZXJucy5maWx0ZXIocCA9PiB7IHJldHVybiBwLmRpc2FibGVkICE9PSB0cnVlIH0pLCBmdW5jdGlvbiAocCkge1xyXG4gICAgICAgICAgcmV0dXJuIHNlcmllcy5hbGlhcy5tYXRjaChwLnBhdHRlcm4pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChzZXJpZXMucGF0dGVybiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBzZXJpZXMucGF0dGVybiA9IHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4gfHwgY29uZmlnLnBhbmVsRGVmYXVsdHMuZGVmYXVsdFBhdHRlcm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBBc3NpZ24gRGVjaW1hbCBWYWx1ZXNcclxuICAgICAgdGhpcy5kYXRhQ29tcHV0ZWQgPSB0aGlzLmRhdGFDb21wdXRlZC5tYXAoc2VyaWVzID0+IHtcclxuICAgICAgICBzZXJpZXMuZGVjaW1hbHMgPSAoc2VyaWVzLnBhdHRlcm4uZGVjaW1hbHMpIHx8IGNvbmZpZy5wYW5lbERlZmF1bHRzLmRlZmF1bHRQYXR0ZXJuLmRlY2ltYWxzO1xyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBBc3NpZ24gdmFsdWVcclxuICAgICAgdGhpcy5kYXRhQ29tcHV0ZWQgPSB0aGlzLmRhdGFDb21wdXRlZC5tYXAoc2VyaWVzID0+IHtcclxuICAgICAgICBpZiAoc2VyaWVzLnN0YXRzKSB7XHJcbiAgICAgICAgICBzZXJpZXMudmFsdWUgPSBzZXJpZXMuc3RhdHNbc2VyaWVzLnBhdHRlcm4udmFsdWVOYW1lIHx8IGNvbmZpZy5wYW5lbERlZmF1bHRzLmRlZmF1bHRQYXR0ZXJuLnZhbHVlTmFtZV07XHJcbiAgICAgICAgICBsZXQgZGVjaW1hbEluZm8gPSB0aGlzLmdldERlY2ltYWxzRm9yVmFsdWUoc2VyaWVzLnZhbHVlLCBzZXJpZXMuZGVjaW1hbHMpO1xyXG4gICAgICAgICAgbGV0IGZvcm1hdEZ1bmMgPSBrYm4udmFsdWVGb3JtYXRzW3Nlcmllcy5wYXR0ZXJuLmZvcm1hdCB8fCBjb25maWcucGFuZWxEZWZhdWx0cy5kZWZhdWx0UGF0dGVybi5mb3JtYXRdO1xyXG4gICAgICAgICAgaWYgKHNlcmllcy52YWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzZXJpZXMuZGlzcGxheVZhbHVlID0gc2VyaWVzLnBhdHRlcm4ubnVsbF92YWx1ZSB8fCBjb25maWcucGFuZWxEZWZhdWx0cy5kZWZhdWx0UGF0dGVybi5udWxsX3ZhbHVlIHx8IFwiTnVsbFwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSBpZiAoIWlzTmFOKHNlcmllcy52YWx1ZSkpIHtcclxuICAgICAgICAgICAgc2VyaWVzLnZhbHVlRm9ybWF0dGVkID0gZm9ybWF0RnVuYyhzZXJpZXMudmFsdWUsIGRlY2ltYWxJbmZvLmRlY2ltYWxzLCBkZWNpbWFsSW5mby5zY2FsZWREZWNpbWFscyk7XHJcbiAgICAgICAgICAgIHNlcmllcy52YWx1ZVJvdW5kZWQgPSBrYm4ucm91bmRWYWx1ZShzZXJpZXMudmFsdWUsIGRlY2ltYWxJbmZvLmRlY2ltYWxzKTtcclxuICAgICAgICAgICAgc2VyaWVzLmRpc3BsYXlWYWx1ZSA9IHNlcmllcy52YWx1ZUZvcm1hdHRlZDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlcmllcy5kaXNwbGF5VmFsdWUgPSBzZXJpZXMucGF0dGVybi5udWxsX3ZhbHVlIHx8IGNvbmZpZy5wYW5lbERlZmF1bHRzLmRlZmF1bHRQYXR0ZXJuLm51bGxfdmFsdWUgfHwgXCJOdWxsXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBGaWx0ZXIgVmFsdWVzXHJcbiAgICAgIHRoaXMuZGF0YUNvbXB1dGVkID0gdGhpcy5kYXRhQ29tcHV0ZWQuZmlsdGVyKHNlcmllcyA9PiB7XHJcbiAgICAgICAgaWYgKCFzZXJpZXMucGF0dGVybi5maWx0ZXIpIHtcclxuICAgICAgICAgIHNlcmllcy5wYXR0ZXJuLmZpbHRlciA9IHt9O1xyXG4gICAgICAgICAgc2VyaWVzLnBhdHRlcm4uZmlsdGVyLnZhbHVlX2JlbG93ID0gXCJcIjtcclxuICAgICAgICAgIHNlcmllcy5wYXR0ZXJuLmZpbHRlci52YWx1ZV9hYm92ZSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzZXJpZXMucGF0dGVybiAmJiBzZXJpZXMucGF0dGVybi5maWx0ZXIgJiYgKHNlcmllcy5wYXR0ZXJuLmZpbHRlci52YWx1ZV9iZWxvdyAhPT0gXCJcIiB8fCBzZXJpZXMucGF0dGVybi5maWx0ZXIudmFsdWVfYWJvdmUgIT09IFwiXCIpKSB7XHJcbiAgICAgICAgICBpZiAoc2VyaWVzLnBhdHRlcm4uZmlsdGVyLnZhbHVlX2JlbG93ICE9PSBcIlwiICYmIHNlcmllcy52YWx1ZSA8ICsoc2VyaWVzLnBhdHRlcm4uZmlsdGVyLnZhbHVlX2JlbG93KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChzZXJpZXMucGF0dGVybi5maWx0ZXIudmFsdWVfYWJvdmUgIT09IFwiXCIgJiYgc2VyaWVzLnZhbHVlID4gKyhzZXJpZXMucGF0dGVybi5maWx0ZXIudmFsdWVfYWJvdmUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgIH0pXHJcbiAgICAgIC8vIEFzc2lnbiBSb3cgTmFtZVxyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy5yb3dfbmFtZSA9IHNlcmllcy5hbGlhcy5zcGxpdChzZXJpZXMucGF0dGVybi5kZWxpbWl0ZXIgfHwgXCIuXCIpLnJlZHVjZSgociwgaXQsIGkpID0+IHtcclxuICAgICAgICAgIHJldHVybiByLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlciArIGkgKyB0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlciwgXCJnXCIpLCBpdClcclxuICAgICAgICB9LCBzZXJpZXMucGF0dGVybi5yb3dfbmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIgKyBcInNlcmllc1wiICsgdGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIsIFwiZ1wiKSwgc2VyaWVzLmFsaWFzKSB8fCBjb25maWcucGFuZWxEZWZhdWx0cy5kZWZhdWx0UGF0dGVybi5yb3dfbmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIgKyBcInNlcmllc1wiICsgdGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIsIFwiZ1wiKSwgc2VyaWVzLmFsaWFzKSk7XHJcbiAgICAgICAgaWYgKHNlcmllcy5hbGlhcy5zcGxpdChzZXJpZXMucGF0dGVybi5kZWxpbWl0ZXIgfHwgXCIuXCIpLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgc2VyaWVzLnJvd19uYW1lID0gc2VyaWVzLmFsaWFzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gQXNzaWduIENvbCBOYW1lXHJcbiAgICAgIHRoaXMuZGF0YUNvbXB1dGVkID0gdGhpcy5kYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgc2VyaWVzLmNvbF9uYW1lID0gc2VyaWVzLmFsaWFzLnNwbGl0KHNlcmllcy5wYXR0ZXJuLmRlbGltaXRlciB8fCBcIi5cIikucmVkdWNlKChyLCBpdCwgaSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHIucmVwbGFjZShuZXcgUmVnRXhwKHRoaXMucGFuZWwucm93X2NvbF93cmFwcGVyICsgaSArIHRoaXMucGFuZWwucm93X2NvbF93cmFwcGVyLCBcImdcIiksIGl0KVxyXG4gICAgICAgIH0sIHNlcmllcy5wYXR0ZXJuLmNvbF9uYW1lIHx8IGNvbmZpZy5wYW5lbERlZmF1bHRzLmRlZmF1bHRQYXR0ZXJuLmNvbF9uYW1lKTtcclxuICAgICAgICBpZiAoc2VyaWVzLmFsaWFzLnNwbGl0KHNlcmllcy5wYXR0ZXJuLmRlbGltaXRlciB8fCBcIi5cIikubGVuZ3RoID09PSAxIHx8IHNlcmllcy5yb3dfbmFtZSA9PT0gc2VyaWVzLmFsaWFzKSB7XHJcbiAgICAgICAgICBzZXJpZXMuY29sX25hbWUgPSBzZXJpZXMucGF0dGVybi5jb2xfbmFtZSB8fCBcIlZhbHVlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBBc3NpZ24gUm93Q29sIEtleVxyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy5rZXlfbmFtZSA9IHNlcmllcy5yb3dfbmFtZSArIFwiI1wiICsgc2VyaWVzLmNvbF9uYW1lO1xyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBBc3NpZ24gVGhyZXNob2xkc1xyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy50aHJlc2hvbGRzID0gKHNlcmllcy5wYXR0ZXJuLnRocmVzaG9sZHMgfHwgY29uZmlnLnBhbmVsRGVmYXVsdHMuZGVmYXVsdFBhdHRlcm4udGhyZXNob2xkcykuc3BsaXQoXCIsXCIpLm1hcChkID0+ICtkKTtcclxuICAgICAgICBpZiAoc2VyaWVzLnBhdHRlcm4uZW5hYmxlX3RpbWVfYmFzZWRfdGhyZXNob2xkcykge1xyXG4gICAgICAgICAgbGV0IG1ldHJpY3JlY2l2ZWRUaW1lU3RhbXAgPSBzZXJpZXMuY3VycmVudF9zZXJ2ZXJ0aW1lc3RhbXAgfHwgbmV3IERhdGUoKTtcclxuICAgICAgICAgIGxldCBtZXRyaWNyZWNpdmVkVGltZVN0YW1wX2lubnVtYmVyID0gbWV0cmljcmVjaXZlZFRpbWVTdGFtcC5nZXRIb3VycygpICogMTAwICsgbWV0cmljcmVjaXZlZFRpbWVTdGFtcC5nZXRNaW51dGVzKCk7XHJcbiAgICAgICAgICBsZXQgd2Vla2RheXMgPSBbXCJzdW5cIiwgXCJtb25cIiwgXCJ0dWVcIiwgXCJ3ZWRcIiwgXCJ0aHVcIiwgXCJmcmlcIiwgXCJzYXRcIl07XHJcbiAgICAgICAgICBfLmVhY2goc2VyaWVzLnBhdHRlcm4udGltZV9iYXNlZF90aHJlc2hvbGRzLCAodGJ0eCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGJ0eCAmJiB0YnR4LmZyb20gJiYgdGJ0eC50byAmJiB0YnR4LmVuYWJsZWREYXlzICYmXHJcbiAgICAgICAgICAgICAgKG1ldHJpY3JlY2l2ZWRUaW1lU3RhbXBfaW5udW1iZXIgPj0gKyh0YnR4LmZyb20pKSAmJlxyXG4gICAgICAgICAgICAgIChtZXRyaWNyZWNpdmVkVGltZVN0YW1wX2lubnVtYmVyIDw9ICsodGJ0eC50bykpICYmXHJcbiAgICAgICAgICAgICAgKHRidHguZW5hYmxlZERheXMudG9Mb3dlckNhc2UoKS5pbmRleE9mKHdlZWtkYXlzW21ldHJpY3JlY2l2ZWRUaW1lU3RhbXAuZ2V0RGF5KCldKSA+IC0xKSAmJlxyXG4gICAgICAgICAgICAgIHRidHgudGhyZXNob2xkXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgIHNlcmllcy50aHJlc2hvbGRzID0gKHRidHgudGhyZXNob2xkICsgXCJcIikuc3BsaXQoXCIsXCIpLm1hcChkID0+ICtkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIEFzc2lnbiBCRyBDb2xvcnNcclxuICAgICAgdGhpcy5kYXRhQ29tcHV0ZWQgPSB0aGlzLmRhdGFDb21wdXRlZC5tYXAoc2VyaWVzID0+IHtcclxuICAgICAgICBzZXJpZXMuZW5hYmxlX2JnQ29sb3IgPSBzZXJpZXMucGF0dGVybi5lbmFibGVfYmdDb2xvcjtcclxuICAgICAgICBzZXJpZXMuYmdDb2xvcnMgPSAoc2VyaWVzLnBhdHRlcm4uYmdDb2xvcnMgfHwgY29uZmlnLnBhbmVsRGVmYXVsdHMuZGVmYXVsdFBhdHRlcm4uYmdDb2xvcnMpLnNwbGl0KFwifFwiKTtcclxuICAgICAgICBzZXJpZXMuYmdDb2xvciA9IHNlcmllcy5lbmFibGVfYmdDb2xvciA9PT0gdHJ1ZSA/IHRoaXMuY29tcHV0ZUJnQ29sb3Ioc2VyaWVzLnRocmVzaG9sZHMsIHNlcmllcy5iZ0NvbG9ycywgc2VyaWVzLnZhbHVlKSA6IFwidHJhbnNwYXJlbnRcIjtcclxuICAgICAgICBpZiAoc2VyaWVzLmRpc3BsYXlWYWx1ZSA9PT0gKHNlcmllcy5wYXR0ZXJuLm51bGxfdmFsdWUgfHwgY29uZmlnLnBhbmVsRGVmYXVsdHMuZGVmYXVsdFBhdHRlcm4ubnVsbF92YWx1ZSB8fCBcIk51bGxcIikpIHtcclxuICAgICAgICAgIHNlcmllcy5iZ0NvbG9yID0gc2VyaWVzLnBhdHRlcm4ubnVsbF9jb2xvciB8fCBjb25maWcucGFuZWxEZWZhdWx0cy5kZWZhdWx0UGF0dGVybi5udWxsX2NvbG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gQkcgQ29sb3JzIG92ZXJyaWRlc1xyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy5lbmFibGVfYmdDb2xvcl9vdmVycmlkZXMgPSBzZXJpZXMucGF0dGVybi5lbmFibGVfYmdDb2xvcl9vdmVycmlkZXM7XHJcbiAgICAgICAgc2VyaWVzLmJnQ29sb3JzX292ZXJyaWRlcyA9IHNlcmllcy5wYXR0ZXJuLmJnQ29sb3JzX292ZXJyaWRlcyB8fCBcIlwiO1xyXG4gICAgICAgIGlmIChzZXJpZXMuZW5hYmxlX2JnQ29sb3Jfb3ZlcnJpZGVzICYmIHNlcmllcy5iZ0NvbG9yc19vdmVycmlkZXMgIT09IFwiXCIpIHtcclxuICAgICAgICAgIGxldCBfYmdDb2xvcnNfb3ZlcnJpZGVzID0gc2VyaWVzLmJnQ29sb3JzX292ZXJyaWRlcy5zcGxpdChcInxcIikuZmlsdGVyKGNvbiA9PiBjb24uaW5kZXhPZihcIi0+XCIpKS5tYXAoY29uID0+IGNvbi5zcGxpdChcIi0+XCIpKS5maWx0ZXIoY29uID0+ICsoY29uWzBdKSA9PT0gc2VyaWVzLnZhbHVlKS5tYXAoY29uID0+IGNvblsxXSlcclxuICAgICAgICAgIGlmIChfYmdDb2xvcnNfb3ZlcnJpZGVzLmxlbmd0aCA+IDAgJiYgX2JnQ29sb3JzX292ZXJyaWRlc1swXSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICBzZXJpZXMuYmdDb2xvciA9IHV0aWxzLm5vcm1hbGl6ZUNvbG9yKChcIlwiICsgX2JnQ29sb3JzX292ZXJyaWRlc1swXSkudHJpbSgpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSlcclxuICAgICAgLy8gVmFsdWUgVHJhbnNmb3JtXHJcbiAgICAgIHRoaXMuZGF0YUNvbXB1dGVkID0gdGhpcy5kYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgc2VyaWVzLmVuYWJsZV90cmFuc2Zvcm0gPSBzZXJpZXMucGF0dGVybi5lbmFibGVfdHJhbnNmb3JtO1xyXG4gICAgICAgIHNlcmllcy50cmFuc2Zvcm1fdmFsdWVzID0gKHNlcmllcy5wYXR0ZXJuLnRyYW5zZm9ybV92YWx1ZXMgfHwgY29uZmlnLnBhbmVsRGVmYXVsdHMuZGVmYXVsdFBhdHRlcm4udHJhbnNmb3JtX3ZhbHVlcykuc3BsaXQoXCJ8XCIpO1xyXG4gICAgICAgIHNlcmllcy5kaXNwbGF5VmFsdWUgPSBzZXJpZXMuZW5hYmxlX3RyYW5zZm9ybSA9PT0gdHJ1ZSA/IHRoaXMudHJhbnNmb3JtVmFsdWUoc2VyaWVzLnRocmVzaG9sZHMsIHNlcmllcy50cmFuc2Zvcm1fdmFsdWVzLCBzZXJpZXMudmFsdWUsIHNlcmllcy5kaXNwbGF5VmFsdWUsIHNlcmllcy5yb3dfbmFtZSwgc2VyaWVzLmNvbF9uYW1lKSA6IHNlcmllcy5kaXNwbGF5VmFsdWU7XHJcbiAgICAgICAgaWYgKHNlcmllcy5kaXNwbGF5VmFsdWUgPT09IChzZXJpZXMucGF0dGVybi5udWxsX3ZhbHVlIHx8IGNvbmZpZy5wYW5lbERlZmF1bHRzLmRlZmF1bHRQYXR0ZXJuLm51bGxfdmFsdWUgfHwgXCJOdWxsXCIpKSB7XHJcbiAgICAgICAgICBzZXJpZXMuZGlzcGxheVZhbHVlID0gc2VyaWVzLnBhdHRlcm4ubnVsbF92YWx1ZSB8fCBjb25maWcucGFuZWxEZWZhdWx0cy5kZWZhdWx0UGF0dGVybi5udWxsX3ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChpc05hTihzZXJpZXMudmFsdWUpKSB7XHJcbiAgICAgICAgICBzZXJpZXMuZGlzcGxheVZhbHVlID0gc2VyaWVzLnBhdHRlcm4ubnVsbF92YWx1ZSB8fCBjb25maWcucGFuZWxEZWZhdWx0cy5kZWZhdWx0UGF0dGVybi5udWxsX3ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gVmFsdWUgVHJhbnNmb3JtIE92ZXJyaWRlc1xyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy5lbmFibGVfdHJhbnNmb3JtX292ZXJyaWRlcyA9IHNlcmllcy5wYXR0ZXJuLmVuYWJsZV90cmFuc2Zvcm1fb3ZlcnJpZGVzO1xyXG4gICAgICAgIHNlcmllcy50cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlcyA9IHNlcmllcy5wYXR0ZXJuLnRyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzIHx8IFwiXCI7XHJcbiAgICAgICAgaWYgKHNlcmllcy5lbmFibGVfdHJhbnNmb3JtX292ZXJyaWRlcyAmJiBzZXJpZXMudHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXMgIT09IFwiXCIpIHtcclxuICAgICAgICAgIGxldCBfdHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXMgPSBzZXJpZXMudHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXMuc3BsaXQoXCJ8XCIpLmZpbHRlcihjb24gPT4gY29uLmluZGV4T2YoXCItPlwiKSkubWFwKGNvbiA9PiBjb24uc3BsaXQoXCItPlwiKSkuZmlsdGVyKGNvbiA9PiArKGNvblswXSkgPT09IHNlcmllcy52YWx1ZSkubWFwKGNvbiA9PiBjb25bMV0pXHJcbiAgICAgICAgICBpZiAoX3RyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzLmxlbmd0aCA+IDAgJiYgX3RyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzWzBdICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHNlcmllcy5kaXNwbGF5VmFsdWUgPSAoXCJcIiArIF90cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlc1swXSkudHJpbSgpLnJlcGxhY2UobmV3IFJlZ0V4cChcIl92YWx1ZV9cIiwgXCJnXCIpLCBzZXJpZXMuZGlzcGxheVZhbHVlKS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfcm93X25hbWVfXCIsIFwiZ1wiKSwgc2VyaWVzLnJvd19uYW1lKS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfY29sX25hbWVfXCIsIFwiZ1wiKSwgc2VyaWVzLmNvbF9uYW1lKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSlcclxuICAgICAgLy8gRm9udCBhd2Vzb21lIGljb25zXHJcbiAgICAgIHRoaXMuZGF0YUNvbXB1dGVkID0gdGhpcy5kYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgc2VyaWVzLmFjdHVhbF9kaXNwbGF5dmFsdWUgPSBzZXJpZXMuZGlzcGxheVZhbHVlXHJcbiAgICAgICAgc2VyaWVzLmFjdHVhbF9yb3dfbmFtZSA9IHNlcmllcy5yb3dfbmFtZVxyXG4gICAgICAgIHNlcmllcy5hY3R1YWxfY29sX25hbWUgPSBzZXJpZXMuY29sX25hbWVcclxuICAgICAgICBpZiAoc2VyaWVzLmRpc3BsYXlWYWx1ZSAmJiBzZXJpZXMuZGlzcGxheVZhbHVlLmluZGV4T2YoXCJfZmEtXCIpID4gLTEpIHsgc2VyaWVzLmRpc3BsYXlWYWx1ZSA9IHRoaXMucmVwbGFjZUZvbnRBd2Vzb21lSWNvbnMoc2VyaWVzLmRpc3BsYXlWYWx1ZSkgfVxyXG4gICAgICAgIGlmIChzZXJpZXMucm93X25hbWUgJiYgc2VyaWVzLnJvd19uYW1lLmluZGV4T2YoXCJfZmEtXCIpID4gLTEpIHsgc2VyaWVzLnJvd19uYW1lID0gdGhpcy5yZXBsYWNlRm9udEF3ZXNvbWVJY29ucyhzZXJpZXMucm93X25hbWUpIH1cclxuICAgICAgICBpZiAoc2VyaWVzLmNvbF9uYW1lICYmIHNlcmllcy5jb2xfbmFtZS5pbmRleE9mKFwiX2ZhLVwiKSA+IC0xKSB7IHNlcmllcy5jb2xfbmFtZSA9IHRoaXMucmVwbGFjZUZvbnRBd2Vzb21lSWNvbnMoc2VyaWVzLmNvbF9uYW1lKSB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIEltYWdlIHRyYW5zZm9ybXNcclxuICAgICAgdGhpcy5kYXRhQ29tcHV0ZWQgPSB0aGlzLmRhdGFDb21wdXRlZC5tYXAoc2VyaWVzID0+IHtcclxuICAgICAgICBpZiAoc2VyaWVzLmRpc3BsYXlWYWx1ZSAmJiBzZXJpZXMuZGlzcGxheVZhbHVlLmluZGV4T2YoXCJfaW1nLVwiKSA+IC0xKSB7IHNlcmllcy5kaXNwbGF5VmFsdWUgPSB0aGlzLnJlcGxhY2VXaXRoSW1hZ2VzKHNlcmllcy5kaXNwbGF5VmFsdWUpIH1cclxuICAgICAgICBpZiAoc2VyaWVzLnJvd19uYW1lICYmIHNlcmllcy5yb3dfbmFtZS5pbmRleE9mKFwiX2ltZy1cIikgPiAtMSkgeyBzZXJpZXMucm93X25hbWUgPSB0aGlzLnJlcGxhY2VXaXRoSW1hZ2VzKHNlcmllcy5yb3dfbmFtZSkgfVxyXG4gICAgICAgIGlmIChzZXJpZXMuY29sX25hbWUgJiYgc2VyaWVzLmNvbF9uYW1lLmluZGV4T2YoXCJfaW1nLVwiKSA+IC0xKSB7IHNlcmllcy5jb2xfbmFtZSA9IHRoaXMucmVwbGFjZVdpdGhJbWFnZXMoc2VyaWVzLmNvbF9uYW1lKSB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIENlbGwgTGlua3NcclxuICAgICAgdGhpcy5kYXRhQ29tcHV0ZWQgPSB0aGlzLmRhdGFDb21wdXRlZC5tYXAoc2VyaWVzID0+IHtcclxuICAgICAgICBpZiAoc2VyaWVzLnBhdHRlcm4uZW5hYmxlX2NsaWNrYWJsZV9jZWxscykge1xyXG4gICAgICAgICAgbGV0IHRhcmdldExpbmsgPSBzZXJpZXMucGF0dGVybi5jbGlja2FibGVfY2VsbHNfbGluayB8fCBcIiNcIjtcclxuICAgICAgICAgIHRhcmdldExpbmsgPSB0YXJnZXRMaW5rLnJlcGxhY2UobmV3IFJlZ0V4cChcIl9yb3dfbmFtZV9cIiwgXCJnXCIpLCB0aGlzLmdldEFjdHVhbE5hbWVXaXRob3V0VHJhbnNmb3JtU2lnbihzZXJpZXMuYWN0dWFsX3Jvd19uYW1lKS50cmltKCkpO1xyXG4gICAgICAgICAgdGFyZ2V0TGluayA9IHRhcmdldExpbmsucmVwbGFjZShuZXcgUmVnRXhwKFwiX2NvbF9uYW1lX1wiLCBcImdcIiksIHRoaXMuZ2V0QWN0dWFsTmFtZVdpdGhvdXRUcmFuc2Zvcm1TaWduKHNlcmllcy5hY3R1YWxfY29sX25hbWUpLnRyaW0oKSk7XHJcbiAgICAgICAgICB0YXJnZXRMaW5rID0gdGFyZ2V0TGluay5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfdmFsdWVfXCIsIFwiZ1wiKSwgdGhpcy5nZXRBY3R1YWxOYW1lV2l0aG91dFRyYW5zZm9ybVNpZ24oc2VyaWVzLnZhbHVlKS50cmltKCkpO1xyXG4gICAgICAgICAgc2VyaWVzLmRpc3BsYXlWYWx1ZSA9IGA8YSBocmVmPVwiJHt0YXJnZXRMaW5rfVwiIHRhcmdldD1cIl9ibGFua1wiPiR7c2VyaWVzLmRpc3BsYXlWYWx1ZX08L2E+YFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gR3JvdXBpbmdcclxuICAgICAgY29uc3Qgcm93c19mb3VuZCA9IHV0aWxzLmdldEZpZWxkcyh0aGlzLmRhdGFDb21wdXRlZCwgXCJyb3dfbmFtZVwiKTtcclxuICAgICAgY29uc3QgY29sc19mb3VuZCA9IHV0aWxzLmdldEZpZWxkcyh0aGlzLmRhdGFDb21wdXRlZCwgXCJjb2xfbmFtZVwiKTtcclxuICAgICAgY29uc3Qga2V5c19mb3VuZCA9IHV0aWxzLmdldEZpZWxkcyh0aGlzLmRhdGFDb21wdXRlZCwgXCJrZXlfbmFtZVwiKTtcclxuICAgICAgY29uc3QgaXNfdW5pcXVlX2tleXMgPSAoa2V5c19mb3VuZC5sZW5ndGggPT09IF8udW5pcShrZXlzX2ZvdW5kKS5sZW5ndGgpO1xyXG4gICAgICBpZiAoaXNfdW5pcXVlX2tleXMpIHtcclxuICAgICAgICB0aGlzLnBhbmVsLmVycm9yID0gdW5kZWZpbmVkOyAvLy8vXHJcbiAgICAgICAgbGV0IG91dHB1dCA9IFtdO1xyXG4gICAgICAgIF8uZWFjaChfLnVuaXEocm93c19mb3VuZCksIChyb3dfbmFtZSkgPT4ge1xyXG4gICAgICAgICAgbGV0IG86IGFueSA9IHt9O1xyXG4gICAgICAgICAgby5yb3cgPSByb3dfbmFtZTtcclxuICAgICAgICAgIG8uY29scyA9IFtdO1xyXG4gICAgICAgICAgXy5lYWNoKF8udW5pcShjb2xzX2ZvdW5kKSwgKGNvbF9uYW1lKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaGVkX3ZhbHVlID0gKF8uZmluZCh0aGlzLmRhdGFDb21wdXRlZCwgKGUpID0+IHtcclxuICAgICAgICAgICAgICByZXR1cm4gZS5yb3dfbmFtZSA9PT0gcm93X25hbWUgJiYgZS5jb2xfbmFtZSA9PT0gY29sX25hbWVcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBpZiAoIW1hdGNoZWRfdmFsdWUpIHtcclxuICAgICAgICAgICAgICBtYXRjaGVkX3ZhbHVlID0ge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IE5hTixcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlWYWx1ZTogXCJOL0FcIlxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgby5jb2xzLnB1c2goe1xyXG4gICAgICAgICAgICAgIFwibmFtZVwiOiBjb2xfbmFtZSxcclxuICAgICAgICAgICAgICBcInZhbHVlXCI6IG1hdGNoZWRfdmFsdWUudmFsdWUsXHJcbiAgICAgICAgICAgICAgXCJhY3R1YWxfY29sX25hbWVcIjogbWF0Y2hlZF92YWx1ZS5hY3R1YWxfY29sX25hbWUsXHJcbiAgICAgICAgICAgICAgXCJhY3R1YWxfcm93X25hbWVcIjogbWF0Y2hlZF92YWx1ZS5hY3R1YWxfcm93X25hbWUsXHJcbiAgICAgICAgICAgICAgXCJkaXNwbGF5VmFsdWVcIjogbWF0Y2hlZF92YWx1ZS5kaXNwbGF5VmFsdWUgfHwgbWF0Y2hlZF92YWx1ZS52YWx1ZSxcclxuICAgICAgICAgICAgICBcImJnQ29sb3JcIjogbWF0Y2hlZF92YWx1ZS5iZ0NvbG9yIHx8IFwidHJhbnNwYXJlbnRcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgb3V0cHV0LnB1c2gobyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL3JlZ2lvbiBPdXRwdXQgdGFibGUgY29uc3RydWN0aW9uXHJcbiAgICAgICAgbGV0IGJvb210YWJsZV9vdXRwdXRfYm9keV9oZWFkZXJzID0gdGhpcy5lbGVtLmZpbmQoXCIjYm9vbXRhYmxlX291dHB1dF9ib2R5X2hlYWRlcnNcIik7XHJcbiAgICAgICAgbGV0IGJvb210YWJsZV9vdXRwdXRfYm9keV9oZWFkZXJzX291dHB1dCA9IGA8YnIvPmA7XHJcbiAgICAgICAgaWYgKHRoaXMucGFuZWwuaGlkZV9oZWFkZXJzICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICBib29tdGFibGVfb3V0cHV0X2JvZHlfaGVhZGVyc19vdXRwdXQgKz0gXCI8dHI+XCI7XHJcbiAgICAgICAgICBpZiAodGhpcy5wYW5lbC5oaWRlX2ZpcnN0X2NvbHVtbiAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBib29tdGFibGVfb3V0cHV0X2JvZHlfaGVhZGVyc19vdXRwdXQgKz0gYDx0aCBzdHlsZT1cInBhZGRpbmc6NHB4O3RleHQtYWxpZ246Y2VudGVyXCI+JHt0aGlzLnBhbmVsLmRlZmF1bHRfdGl0bGVfZm9yX3Jvd3N9PC90aD5gO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXy5lYWNoKF8udW5pcShjb2xzX2ZvdW5kKSwgYyA9PiB7XHJcbiAgICAgICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9oZWFkZXJzX291dHB1dCArPSBgPHRoIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjpjZW50ZXJcIj4ke2N9PC90aD5gO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9oZWFkZXJzX291dHB1dCArPSBcIjwvdHI+XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9oZWFkZXJzLmh0bWwoYm9vbXRhYmxlX291dHB1dF9ib2R5X2hlYWRlcnNfb3V0cHV0KTtcclxuICAgICAgICBsZXQgYm9vbXRhYmxlX291dHB1dF9ib2R5ID0gdGhpcy5lbGVtLmZpbmQoJyNib29tdGFibGVfb3V0cHV0X2JvZHknKTtcclxuICAgICAgICBsZXQgYm9vbXRhYmxlX291dHB1dF9ib2R5X291dHB1dCA9IGBgO1xyXG4gICAgICAgIF8uZWFjaChvdXRwdXQsIG8gPT4ge1xyXG4gICAgICAgICAgYm9vbXRhYmxlX291dHB1dF9ib2R5X291dHB1dCArPSBcIjx0cj5cIlxyXG4gICAgICAgICAgaWYgKHRoaXMucGFuZWwuaGlkZV9maXJzdF9jb2x1bW4gIT09IHRydWUpIHtcclxuICAgICAgICAgICAgYm9vbXRhYmxlX291dHB1dF9ib2R5X291dHB1dCArPSBgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7XCI+JHtvLnJvd308L3RkPmA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBfLmVhY2goby5jb2xzLCBjID0+IHtcclxuICAgICAgICAgICAgYm9vbXRhYmxlX291dHB1dF9ib2R5X291dHB1dCArPSBgPHRkXHJcbiAgICAgICAgICAgICAgc3R5bGU9XCJwYWRkaW5nOjRweDtiYWNrZ3JvdW5kLWNvbG9yOiR7Yy5iZ0NvbG9yfVwiXHJcbiAgICAgICAgICAgICAgdGl0bGU9XCIkeyBcIlJvdyBOYW1lIDogXCIgKyB0aGlzLmdldEFjdHVhbE5hbWVXaXRob3V0VHJhbnNmb3JtU2lnbihjLmFjdHVhbF9yb3dfbmFtZSkgKyBcIlxcbkNvbCBOYW1lIDogXCIgKyB0aGlzLmdldEFjdHVhbE5hbWVXaXRob3V0VHJhbnNmb3JtU2lnbihjLmFjdHVhbF9jb2xfbmFtZSkgKyBcIlxcblZhbHVlIDogXCIgKyBjLnZhbHVlfVwiXHJcbiAgICAgICAgICAgID4ke2MuZGlzcGxheVZhbHVlfTwvdGQ+YDtcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICBib29tdGFibGVfb3V0cHV0X2JvZHlfb3V0cHV0ICs9IFwiPC90cj5cIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgYm9vbXRhYmxlX291dHB1dF9ib2R5Lmh0bWwoYm9vbXRhYmxlX291dHB1dF9ib2R5X291dHB1dCk7XHJcbiAgICAgICAgLy9lbmRyZWdpb25cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgZHVwbGljYXRlS2V5VmFsdWVzID0gXy51bmlxKGtleXNfZm91bmQuZmlsdGVyKHYgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGtleXNfZm91bmQuZmlsdGVyKHQgPT4gdCA9PT0gdikubGVuZ3RoID4gMVxyXG4gICAgICAgIH0pKTtcclxuICAgICAgICBsZXQgZXJyX2R1cGxpY2F0ZUtleXMgPSBuZXcgRXJyb3IoKTtcclxuICAgICAgICBlcnJfZHVwbGljYXRlS2V5cy5uYW1lID0gXCJEdXBsaWNhdGUga2V5cyBmb3VuZFwiO1xyXG4gICAgICAgIGVycl9kdXBsaWNhdGVLZXlzLm1lc3NhZ2UgPSBcIkR1cGxpY2F0ZSBrZXkgdmFsdWVzIDogPGJyLz5cIiArIGR1cGxpY2F0ZUtleVZhbHVlcy5qb2luKFwiPGJyLz4gXCIpO1xyXG4gICAgICAgIHRoaXMucGFuZWwuZXJyb3IgPSBlcnJfZHVwbGljYXRlS2V5cztcclxuICAgICAgfVxyXG5cclxuICAgICAgLy9yZWdpb24gRGVidWcgdGFibGUgYm9keSBjb25zdHJ1Y3Rpb25cclxuICAgICAgbGV0IGJvb210YWJsZV9vdXRwdXRfYm9keV9kZWJ1ZyA9IHRoaXMuZWxlbS5maW5kKCcjYm9vbXRhYmxlX291dHB1dF9ib2R5X2RlYnVnJyk7XHJcbiAgICAgIGxldCBib29tdGFibGVfb3V0cHV0X2JvZHlfZGVidWdfb3V0cHV0ID0gYGA7XHJcbiAgICAgIF8uZWFjaCh0aGlzLmRhdGFDb21wdXRlZCwgZCA9PiB7XHJcbiAgICAgICAgYm9vbXRhYmxlX291dHB1dF9ib2R5X2RlYnVnX291dHB1dCArPSBgXHJcbiAgICAgICAgPHRyPlxyXG4gICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7XCIgd2lkdGg9XCI0MCVcIj4ke2QuYWxpYXN9PC90ZD5cclxuICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O1wiPiR7ZC5wYXR0ZXJuLnBhdHRlcm4gfHwgXCJEZWZhdWx0XCJ9PC90ZD5cclxuICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O2JhY2tncm91bmQtY29sb3I6JHtkLmJnQ29sb3J9XCI+JHtkLmRpc3BsYXlWYWx1ZX08L3RkPlxyXG4gICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7XCI+JHtkLnJvd19uYW1lfTwvdGQ+XHJcbiAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDtcIj4ke2QuY29sX25hbWV9PC90ZD5cclxuICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O1wiPiR7ZC50aHJlc2hvbGRzfTwvdGQ+XHJcbiAgICAgICAgPC90cj5cclxuICAgICAgICBgXHJcbiAgICAgIH0pXHJcbiAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9kZWJ1Zy5odG1sKGJvb210YWJsZV9vdXRwdXRfYm9keV9kZWJ1Z19vdXRwdXQpO1xyXG4gICAgICAvL2VuZHJlZ2lvblxyXG4gICAgfVxyXG4gICAgbGV0IHJvb3RFbGVtID0gdGhpcy5lbGVtLmZpbmQoJy50YWJsZS1wYW5lbC1zY3JvbGwnKTtcclxuICAgIGxldCBtYXhoZWlnaHRvZnBhbmVsID0gdGhpcy5wYW5lbC5kZWJ1Z19tb2RlID8gdGhpcy5jdHJsLmhlaWdodCAtIDcxIDogdGhpcy5jdHJsLmhlaWdodCAtIDMxO1xyXG4gICAgcm9vdEVsZW0uY3NzKHsgJ21heC1oZWlnaHQnOiBtYXhoZWlnaHRvZnBhbmVsICsgXCJweFwiIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCB7XHJcbiAgR3JhZmFuYUJvb21UYWJsZUN0cmwgYXMgUGFuZWxDdHJsXHJcbn07XHJcbiJdfQ==