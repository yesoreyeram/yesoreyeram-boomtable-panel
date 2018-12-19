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
                        alias: seriesData.target,
                        datapoints: seriesData.datapoints || []
                    });
                    series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
                    return series;
                };
                GrafanaBoomTableCtrl.prototype.addPattern = function () {
                    var newPattern = {
                        bgColors: "green|orange|red",
                        bgColors_overrides: "0->green|2->red|1->yellow",
                        clickable_cells_link: "",
                        col_name: this.panel.row_col_wrapper + "1" + this.panel.row_col_wrapper,
                        decimals: 2,
                        delimiter: ".",
                        enable_bgColor: false,
                        enable_bgColor_overrides: false,
                        enable_clickable_cells: false,
                        enable_time_based_thresholds: false,
                        enable_transform: false,
                        enable_transform_overrides: false,
                        filter: {
                            value_above: "",
                            value_below: "",
                        },
                        format: "none",
                        name: "New Pattern",
                        null_color: "darkred",
                        null_value: "No data",
                        pattern: "^server.*cpu$",
                        row_name: this.panel.row_col_wrapper + "0" + this.panel.row_col_wrapper,
                        thresholds: "70,90",
                        time_based_thresholds: [],
                        transform_values: "_value_|_value_|_value_",
                        transform_values_overrides: "0->down|1->up",
                        valueName: "avg"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFTQSxtQkFBYSxDQUFDLFlBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOztnQkFFUCx3Q0FBZ0I7Z0JBT2pELDhCQUFZLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSTtvQkFBbkMsWUFDRSxrQkFBTSxNQUFNLEVBQUUsU0FBUyxDQUFDLFNBSXpCO29CQVZPLGlCQUFXLEdBQVEsU0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN4QyxzQkFBZ0IsR0FBVyxZQUFNLENBQUMsZ0JBQWdCLENBQUM7b0JBTXpELGdCQUFDLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsWUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUM3QyxLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQztvQkFDaEUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsS0FBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQzs7Z0JBQ25FLENBQUM7Z0JBQ08sNkNBQWMsR0FBdEI7b0JBQUEsaUJBSUM7b0JBSEMsZ0JBQUMsQ0FBQyxJQUFJLENBQUMsWUFBTSxDQUFDLFVBQVUsRUFBRSxVQUFBLE1BQU07d0JBQzlCLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxpQkFBaUIsR0FBRyxZQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUMxRyxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQUNPLDZDQUFjLEdBQXRCLFVBQXVC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Q0FBQyxDQUFDLFlBQVksb0RBQzNDLENBQUMsQ0FBQyxRQUFRLG9EQUNWLENBQUMsQ0FBQyxRQUFRLG9EQUNWLENBQUMsQ0FBQyxVQUFVLG1DQUV4QyxDQUFDO3dCQUNKLENBQUMsQ0FBQyxDQUFDO3dCQUNILDJCQUEyQixDQUFDLElBQUksQ0FBQyxvQ0FBa0MsQ0FBQyxDQUFDO3FCQUV0RTtvQkFDRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO29CQUNyRCxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztvQkFDN0YsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2lCQUN6RDtZQUNILENBQUMsQ0FBQztRQUtGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIGtibixcclxuICBsb2FkUGx1Z2luQ3NzLFxyXG4gIE1ldHJpY3NQYW5lbEN0cmwsXHJcbiAgVGltZVNlcmllcyxcclxuICB1dGlscyxcclxuICBjb25maWdcclxufSBmcm9tIFwiLi9hcHAvYXBwXCI7XHJcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcclxubG9hZFBsdWdpbkNzcyhjb25maWcubGlzdF9vZl9zdHlsZXNoZWV0cyk7XHJcblxyXG5jbGFzcyBHcmFmYW5hQm9vbVRhYmxlQ3RybCBleHRlbmRzIE1ldHJpY3NQYW5lbEN0cmwge1xyXG4gIHByaXZhdGUgc3RhdGljIHRlbXBsYXRlVXJsID0gXCJwYXJ0aWFscy9tb2R1bGUuaHRtbFwiO1xyXG4gIHByaXZhdGUgdW5pdEZvcm1hdHM6IGFueSA9IGtibi5nZXRVbml0Rm9ybWF0cygpO1xyXG4gIHByaXZhdGUgdmFsdWVOYW1lT3B0aW9uczogT2JqZWN0ID0gY29uZmlnLnZhbHVlTmFtZU9wdGlvbnM7XHJcbiAgcHJpdmF0ZSBkYXRhUmVjZWl2ZWQ6IGFueTtcclxuICBwcml2YXRlIGN0cmw6IGFueTtcclxuICBwcml2YXRlIGVsZW06IGFueTtcclxuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRpbmplY3RvciwgJHNjZSkge1xyXG4gICAgc3VwZXIoJHNjb3BlLCAkaW5qZWN0b3IpO1xyXG4gICAgXy5kZWZhdWx0cyh0aGlzLnBhbmVsLCBjb25maWcucGFuZWxEZWZhdWx0cyk7XHJcbiAgICB0aGlzLmV2ZW50cy5vbihcImRhdGEtcmVjZWl2ZWRcIiwgdGhpcy5vbkRhdGFSZWNlaXZlZC5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuZXZlbnRzLm9uKFwiaW5pdC1lZGl0LW1vZGVcIiwgdGhpcy5vbkluaXRFZGl0TW9kZS5iaW5kKHRoaXMpKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBvbkluaXRFZGl0TW9kZSgpIHtcclxuICAgIF8uZWFjaChjb25maWcuZWRpdG9yVGFicywgZWRpdG9yID0+IHtcclxuICAgICAgdGhpcy5hZGRFZGl0b3JUYWIoZWRpdG9yLm5hbWUsIFwicHVibGljL3BsdWdpbnMvXCIgKyBjb25maWcucGx1Z2luX2lkICsgZWRpdG9yLnRlbXBsYXRlLCBlZGl0b3IucG9zaXRpb24pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHByaXZhdGUgb25EYXRhUmVjZWl2ZWQoZGF0YSkge1xyXG4gICAgdGhpcy5kYXRhUmVjZWl2ZWQgPSBkYXRhO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuICB9XHJcbiAgcHJpdmF0ZSBzZXJpZXNIYW5kbGVyKHNlcmllc0RhdGEpIHtcclxuICAgIGxldCBzZXJpZXMgPSBuZXcgVGltZVNlcmllcyh7XHJcbiAgICAgIGFsaWFzOiBzZXJpZXNEYXRhLnRhcmdldCxcclxuICAgICAgZGF0YXBvaW50czogc2VyaWVzRGF0YS5kYXRhcG9pbnRzIHx8IFtdXHJcbiAgICB9KTtcclxuICAgIHNlcmllcy5mbG90cGFpcnMgPSBzZXJpZXMuZ2V0RmxvdFBhaXJzKHRoaXMucGFuZWwubnVsbFBvaW50TW9kZSk7XHJcbiAgICByZXR1cm4gc2VyaWVzO1xyXG4gIH1cclxuICBwcml2YXRlIGFkZFBhdHRlcm4oKSB7XHJcbiAgICBsZXQgbmV3UGF0dGVybiA9IHtcclxuICAgICAgYmdDb2xvcnM6IFwiZ3JlZW58b3JhbmdlfHJlZFwiLFxyXG4gICAgICBiZ0NvbG9yc19vdmVycmlkZXM6IFwiMC0+Z3JlZW58Mi0+cmVkfDEtPnllbGxvd1wiLFxyXG4gICAgICBjbGlja2FibGVfY2VsbHNfbGluazogXCJcIixcclxuICAgICAgY29sX25hbWU6IHRoaXMucGFuZWwucm93X2NvbF93cmFwcGVyICsgXCIxXCIgKyB0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlcixcclxuICAgICAgZGVjaW1hbHM6IDIsXHJcbiAgICAgIGRlbGltaXRlcjogXCIuXCIsXHJcbiAgICAgIGVuYWJsZV9iZ0NvbG9yOiBmYWxzZSxcclxuICAgICAgZW5hYmxlX2JnQ29sb3Jfb3ZlcnJpZGVzOiBmYWxzZSxcclxuICAgICAgZW5hYmxlX2NsaWNrYWJsZV9jZWxsczogZmFsc2UsXHJcbiAgICAgIGVuYWJsZV90aW1lX2Jhc2VkX3RocmVzaG9sZHM6IGZhbHNlLFxyXG4gICAgICBlbmFibGVfdHJhbnNmb3JtOiBmYWxzZSxcclxuICAgICAgZW5hYmxlX3RyYW5zZm9ybV9vdmVycmlkZXM6IGZhbHNlLFxyXG4gICAgICBmaWx0ZXI6IHtcclxuICAgICAgICB2YWx1ZV9hYm92ZTogXCJcIixcclxuICAgICAgICB2YWx1ZV9iZWxvdzogXCJcIixcclxuICAgICAgfSxcclxuICAgICAgZm9ybWF0OiBcIm5vbmVcIixcclxuICAgICAgbmFtZTogXCJOZXcgUGF0dGVyblwiLFxyXG4gICAgICBudWxsX2NvbG9yOiBcImRhcmtyZWRcIixcclxuICAgICAgbnVsbF92YWx1ZTogXCJObyBkYXRhXCIsXHJcbiAgICAgIHBhdHRlcm46IFwiXnNlcnZlci4qY3B1JFwiLFxyXG4gICAgICByb3dfbmFtZTogdGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIgKyBcIjBcIiArIHRoaXMucGFuZWwucm93X2NvbF93cmFwcGVyLFxyXG4gICAgICB0aHJlc2hvbGRzOiBcIjcwLDkwXCIsXHJcbiAgICAgIHRpbWVfYmFzZWRfdGhyZXNob2xkczogW10sXHJcbiAgICAgIHRyYW5zZm9ybV92YWx1ZXM6IFwiX3ZhbHVlX3xfdmFsdWVffF92YWx1ZV9cIixcclxuICAgICAgdHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXM6IFwiMC0+ZG93bnwxLT51cFwiLFxyXG4gICAgICB2YWx1ZU5hbWU6IFwiYXZnXCJcclxuICAgIH07XHJcbiAgICB0aGlzLnBhbmVsLnBhdHRlcm5zLnB1c2gobmV3UGF0dGVybik7XHJcbiAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9IHRoaXMucGFuZWwucGF0dGVybnMubGVuZ3RoIC0gMTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgbW92ZVBhdHRlcm4oZGlyZWN0aW9uLCBpbmRleCkge1xyXG4gICAgbGV0IHRlbXBFbGVtZW50ID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF07XHJcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcIlVQXCIpIHtcclxuICAgICAgdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0gPSB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4IC0gMV07XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXggLSAxXSA9IHRlbXBFbGVtZW50O1xyXG4gICAgICB0aGlzLnBhbmVsLmFjdGl2ZVBhdHRlcm5JbmRleCA9IGluZGV4IC0gMTtcclxuICAgIH1cclxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiRE9XTlwiKSB7XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleCArIDFdO1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4ICsgMV0gPSB0ZW1wRWxlbWVudDtcclxuICAgICAgdGhpcy5wYW5lbC5hY3RpdmVQYXR0ZXJuSW5kZXggPSBpbmRleCArIDE7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwcml2YXRlIHJlbW92ZVBhdHRlcm4oaW5kZXgpIHtcclxuICAgIHRoaXMucGFuZWwucGF0dGVybnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIHRoaXMucGFuZWwuYWN0aXZlUGF0dGVybkluZGV4ID0gKHRoaXMucGFuZWwucGF0dGVybnMgJiYgdGhpcy5wYW5lbC5wYXR0ZXJucy5sZW5ndGggPiAwKSA/ICh0aGlzLnBhbmVsLnBhdHRlcm5zLmxlbmd0aCAtIDEpIDogLTE7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwcml2YXRlIGNsb25lUGF0dGVybihpbmRleCkge1xyXG4gICAgbGV0IGNvcGllZFBhdHRlcm4gPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XSk7XHJcbiAgICB0aGlzLnBhbmVsLnBhdHRlcm5zLnB1c2goY29waWVkUGF0dGVybik7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwcml2YXRlIGFkZF90aW1lX2Jhc2VkX3RocmVzaG9sZHMoaW5kZXgpIHtcclxuICAgIGxldCBuZXdfdGltZV9iYXNlZF90aHJlc2hvbGQgPSB7XHJcbiAgICAgIGVuYWJsZWREYXlzOiBcIlN1bixNb24sVHVlLFdlZCxUaHUsRnJpLFNhdFwiLFxyXG4gICAgICBmcm9tOiBcIjAwMDBcIixcclxuICAgICAgbmFtZTogXCJFYXJseSBtb3JuaW5nIG9mIGV2ZXJ5ZGF5XCIsXHJcbiAgICAgIHRocmVzaG9sZDogXCI3MCw5MFwiLFxyXG4gICAgICB0bzogXCIwNTMwXCJcclxuICAgIH07XHJcbiAgICBpZiAoaW5kZXggPT09ICdkZWZhdWx0Jykge1xyXG4gICAgICB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLnRpbWVfYmFzZWRfdGhyZXNob2xkcyA9IHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4udGltZV9iYXNlZF90aHJlc2hvbGRzIHx8IFtdO1xyXG4gICAgICB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLnRpbWVfYmFzZWRfdGhyZXNob2xkcy5wdXNoKG5ld190aW1lX2Jhc2VkX3RocmVzaG9sZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS50aW1lX2Jhc2VkX3RocmVzaG9sZHMgPSB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS50aW1lX2Jhc2VkX3RocmVzaG9sZHMgfHwgW107XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdLnRpbWVfYmFzZWRfdGhyZXNob2xkcy5wdXNoKG5ld190aW1lX2Jhc2VkX3RocmVzaG9sZCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwcml2YXRlIHJlbW92ZV90aW1lX2Jhc2VkX3RocmVzaG9sZHMocGF0dGVybkluZGV4LCBpbmRleCkge1xyXG4gICAgaWYgKHBhdHRlcm5JbmRleCA9PT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4udGltZV9iYXNlZF90aHJlc2hvbGRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW3BhdHRlcm5JbmRleF0udGltZV9iYXNlZF90aHJlc2hvbGRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHByaXZhdGUgaW52ZXJzZUJHQ29sb3JzKGluZGV4KSB7XHJcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XHJcbiAgICAgIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4uYmdDb2xvcnMgPSB0aGlzLnBhbmVsLmRlZmF1bHRQYXR0ZXJuLmJnQ29sb3JzLnNwbGl0KFwifFwiKS5yZXZlcnNlKCkuam9pbihcInxcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS5iZ0NvbG9ycyA9IHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdLmJnQ29sb3JzLnNwbGl0KFwifFwiKS5yZXZlcnNlKCkuam9pbihcInxcIik7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwcml2YXRlIGludmVyc2VUcmFuc2Zvcm1WYWx1ZXMoaW5kZXgpIHtcclxuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcclxuICAgICAgdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybi50cmFuc2Zvcm1fdmFsdWVzID0gdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybi50cmFuc2Zvcm1fdmFsdWVzLnNwbGl0KFwifFwiKS5yZXZlcnNlKCkuam9pbihcInxcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhbmVsLnBhdHRlcm5zW2luZGV4XS50cmFuc2Zvcm1fdmFsdWVzID0gdGhpcy5wYW5lbC5wYXR0ZXJuc1tpbmRleF0udHJhbnNmb3JtX3ZhbHVlcy5zcGxpdChcInxcIikucmV2ZXJzZSgpLmpvaW4oXCJ8XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIHByaXZhdGUgY29tcHV0ZUJnQ29sb3IodGhyZXNob2xkcywgYmdDb2xvcnMsIHZhbHVlKSB7XHJcbiAgICBsZXQgYyA9IFwidHJhbnNwYXJlbnRcIjtcclxuICAgIGlmICh0aHJlc2hvbGRzICYmIGJnQ29sb3JzICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIiAmJiB0aHJlc2hvbGRzLmxlbmd0aCArIDEgPD0gYmdDb2xvcnMubGVuZ3RoKSB7XHJcbiAgICAgIGJnQ29sb3JzID0gXy5kcm9wUmlnaHQoYmdDb2xvcnMsIGJnQ29sb3JzLmxlbmd0aCAtIHRocmVzaG9sZHMubGVuZ3RoIC0gMSk7XHJcbiAgICAgIGlmIChiZ0NvbG9yc1tiZ0NvbG9ycy5sZW5ndGggLSAxXSA9PT0gXCJcIikge1xyXG4gICAgICAgIGJnQ29sb3JzW2JnQ29sb3JzLmxlbmd0aCAtIDFdID0gXCJ0cmFuc3BhcmVudFwiO1xyXG4gICAgICB9XHJcbiAgICAgIGZvciAobGV0IGkgPSB0aHJlc2hvbGRzLmxlbmd0aDsgaSA+IDA7IGktLSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSA+PSB0aHJlc2hvbGRzW2kgLSAxXSkge1xyXG4gICAgICAgICAgcmV0dXJuIHV0aWxzLm5vcm1hbGl6ZUNvbG9yKGJnQ29sb3JzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHV0aWxzLm5vcm1hbGl6ZUNvbG9yKF8uZmlyc3QoYmdDb2xvcnMpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjO1xyXG4gIH1cclxuICBwcml2YXRlIHRyYW5zZm9ybVZhbHVlKHRocmVzaG9sZHMsIHRyYW5zZm9ybV92YWx1ZXMsIHZhbHVlLCBkaXNwbGF5VmFsdWUsIHJvd19uYW1lLCBjb2xfbmFtZSkge1xyXG4gICAgbGV0IHQgPSB2YWx1ZTtcclxuICAgIGlmICh0aHJlc2hvbGRzICYmIHRyYW5zZm9ybV92YWx1ZXMgJiYgdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICYmIHRocmVzaG9sZHMubGVuZ3RoICsgMSA8PSB0cmFuc2Zvcm1fdmFsdWVzLmxlbmd0aCkge1xyXG4gICAgICB0cmFuc2Zvcm1fdmFsdWVzID0gXy5kcm9wUmlnaHQodHJhbnNmb3JtX3ZhbHVlcywgdHJhbnNmb3JtX3ZhbHVlcy5sZW5ndGggLSB0aHJlc2hvbGRzLmxlbmd0aCAtIDEpO1xyXG4gICAgICBpZiAodHJhbnNmb3JtX3ZhbHVlc1t0cmFuc2Zvcm1fdmFsdWVzLmxlbmd0aCAtIDFdID09PSBcIlwiKSB7XHJcbiAgICAgICAgdHJhbnNmb3JtX3ZhbHVlc1t0cmFuc2Zvcm1fdmFsdWVzLmxlbmd0aCAtIDFdID0gXCJfdmFsdWVfXCI7XHJcbiAgICAgIH1cclxuICAgICAgZm9yIChsZXQgaSA9IHRocmVzaG9sZHMubGVuZ3RoOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlID49IHRocmVzaG9sZHNbaSAtIDFdKSB7XHJcbiAgICAgICAgICByZXR1cm4gdHJhbnNmb3JtX3ZhbHVlc1tpXS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfdmFsdWVfXCIsIFwiZ1wiKSwgZGlzcGxheVZhbHVlKS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfcm93X25hbWVfXCIsIFwiZ1wiKSwgcm93X25hbWUpLnJlcGxhY2UobmV3IFJlZ0V4cChcIl9jb2xfbmFtZV9cIiwgXCJnXCIpLCBjb2xfbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBfLmZpcnN0KHRyYW5zZm9ybV92YWx1ZXMpLnJlcGxhY2UobmV3IFJlZ0V4cChcIl92YWx1ZV9cIiwgXCJnXCIpLCBkaXNwbGF5VmFsdWUpLnJlcGxhY2UobmV3IFJlZ0V4cChcIl9yb3dfbmFtZV9cIiwgXCJnXCIpLCByb3dfbmFtZSkucmVwbGFjZShuZXcgUmVnRXhwKFwiX2NvbF9uYW1lX1wiLCBcImdcIiksIGNvbF9uYW1lKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0O1xyXG4gIH1cclxuICBwcml2YXRlIHJlcGxhY2VGb250QXdlc29tZUljb25zKHZhbHVlKSB7XHJcbiAgICBpZiAoIXZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfVxyXG4gICAgcmV0dXJuICh2YWx1ZSArIFwiXCIpXHJcbiAgICAgIC5zcGxpdChcIiBcIilcclxuICAgICAgLm1hcChhID0+IHtcclxuICAgICAgICBpZiAoYS5zdGFydHNXaXRoKFwiX2ZhLVwiKSAmJiBhLmVuZHNXaXRoKFwiX1wiKSkge1xyXG4gICAgICAgICAgbGV0IGljb24gPSBhLnJlcGxhY2UoL1xcXy9nLCBcIlwiKS5zcGxpdChcIixcIilbMF07XHJcbiAgICAgICAgICBsZXQgY29sb3IgPSBhLmluZGV4T2YoXCIsXCIpID4gLTEgPyBgIHN0eWxlPVwiY29sb3I6JHt1dGlscy5ub3JtYWxpemVDb2xvcihhLnJlcGxhY2UoL1xcXy9nLCBcIlwiKS5zcGxpdChcIixcIilbMV0pfVwiIGAgOiBcIlwiO1xyXG4gICAgICAgICAgbGV0IHJlcGVhdENvdW50ID0gYS5zcGxpdChcIixcIikubGVuZ3RoID4gMiA/ICsoYS5yZXBsYWNlKC9cXF8vZywgXCJcIikuc3BsaXQoXCIsXCIpWzJdKSA6IDE7XHJcbiAgICAgICAgICBhID0gYDxpIGNsYXNzPVwiZmEgJHtpY29ufVwiICR7Y29sb3J9PjwvaT4gYC5yZXBlYXQocmVwZWF0Q291bnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYTtcclxuICAgICAgfSlcclxuICAgICAgLmpvaW4oXCIgXCIpO1xyXG4gIH1cclxuICBwcml2YXRlIHJlcGxhY2VXaXRoSW1hZ2VzKHZhbHVlKSB7XHJcbiAgICBpZiAoIXZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfVxyXG4gICAgcmV0dXJuICh2YWx1ZSArIFwiXCIpXHJcbiAgICAgIC5zcGxpdChcIiBcIilcclxuICAgICAgLm1hcChhID0+IHtcclxuICAgICAgICBpZiAoYS5zdGFydHNXaXRoKFwiX2ltZy1cIikgJiYgYS5lbmRzV2l0aChcIl9cIikpIHtcclxuICAgICAgICAgIGEgPSBhLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICAgIGxldCBpbWdVcmwgPSBhLnJlcGxhY2UoXCJfaW1nLVwiLCBcIlwiKS5zcGxpdChcIixcIilbMF07XHJcbiAgICAgICAgICBsZXQgaW1nV2lkdGggPSBhLnNwbGl0KFwiLFwiKS5sZW5ndGggPiAxID8gYS5yZXBsYWNlKFwiX2ltZy1cIiwgXCJcIikuc3BsaXQoXCIsXCIpWzFdIDogXCIyMHB4XCI7XHJcbiAgICAgICAgICBsZXQgaW1nSGVpZ2h0ID0gYS5zcGxpdChcIixcIikubGVuZ3RoID4gMiA/IGEucmVwbGFjZShcIl9pbWctXCIsIFwiXCIpLnNwbGl0KFwiLFwiKVsyXSA6IFwiMjBweFwiO1xyXG4gICAgICAgICAgbGV0IHJlcGVhdENvdW50ID0gYS5zcGxpdChcIixcIikubGVuZ3RoID4gMyA/ICsoYS5yZXBsYWNlKFwiX2ltZy1cIiwgXCJcIikuc3BsaXQoXCIsXCIpWzNdKSA6IDE7XHJcbiAgICAgICAgICBhID0gYDxpbWcgd2lkdGg9XCIke2ltZ1dpZHRofVwiIGhlaWdodD1cIiR7aW1nSGVpZ2h0fVwiIHNyYz1cIiR7aW1nVXJsfVwiLz5gLnJlcGVhdChyZXBlYXRDb3VudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhO1xyXG4gICAgICB9KVxyXG4gICAgICAuam9pbihcIiBcIik7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0QWN0dWFsTmFtZVdpdGhvdXRUcmFuc2Zvcm1TaWduKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gKHZhbHVlICsgXCJcIilcclxuICAgICAgLnNwbGl0KFwiIFwiKVxyXG4gICAgICAubWFwKGEgPT4ge1xyXG4gICAgICAgIGlmIChhLnN0YXJ0c1dpdGgoXCJfZmEtXCIpICYmIGEuZW5kc1dpdGgoXCJfXCIpKSB7XHJcbiAgICAgICAgICBhID0gYGA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhLnN0YXJ0c1dpdGgoXCJfaW1nLVwiKSAmJiBhLmVuZHNXaXRoKFwiX1wiKSkge1xyXG4gICAgICAgICAgYSA9IGBgO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYTtcclxuICAgICAgfSlcclxuICAgICAgLmpvaW4oXCIgXCIpO1xyXG4gIH1cclxuICBwcml2YXRlIGdldERlY2ltYWxzRm9yVmFsdWUodmFsdWUsIF9kZWNpbWFscykge1xyXG4gICAgaWYgKF8uaXNOdW1iZXIoK19kZWNpbWFscykpIHtcclxuICAgICAgbGV0IG86IE9iamVjdCA9IHtcclxuICAgICAgICBkZWNpbWFsczogX2RlY2ltYWxzLFxyXG4gICAgICAgIHNjYWxlZERlY2ltYWxzOiBudWxsXHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiBvO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBkZWx0YSA9IHZhbHVlIC8gMjtcclxuICAgIGxldCBkZWMgPSAtTWF0aC5mbG9vcihNYXRoLmxvZyhkZWx0YSkgLyBNYXRoLkxOMTApO1xyXG5cclxuICAgIGxldCBtYWduID0gTWF0aC5wb3coMTAsIC1kZWMpLFxyXG4gICAgICBub3JtID0gZGVsdGEgLyBtYWduLCAvLyBub3JtIGlzIGJldHdlZW4gMS4wIGFuZCAxMC4wXHJcbiAgICAgIHNpemU7XHJcblxyXG4gICAgaWYgKG5vcm0gPCAxLjUpIHtcclxuICAgICAgc2l6ZSA9IDE7XHJcbiAgICB9IGVsc2UgaWYgKG5vcm0gPCAzKSB7XHJcbiAgICAgIHNpemUgPSAyO1xyXG4gICAgICAvLyBzcGVjaWFsIGNhc2UgZm9yIDIuNSwgcmVxdWlyZXMgYW4gZXh0cmEgZGVjaW1hbFxyXG4gICAgICBpZiAobm9ybSA+IDIuMjUpIHtcclxuICAgICAgICBzaXplID0gMi41O1xyXG4gICAgICAgICsrZGVjO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKG5vcm0gPCA3LjUpIHtcclxuICAgICAgc2l6ZSA9IDU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzaXplID0gMTA7XHJcbiAgICB9XHJcblxyXG4gICAgc2l6ZSAqPSBtYWduO1xyXG5cclxuICAgIC8vIHJlZHVjZSBzdGFydGluZyBkZWNpbWFscyBpZiBub3QgbmVlZGVkXHJcbiAgICBpZiAoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlKSB7XHJcbiAgICAgIGRlYyA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJlc3VsdDogT2JqZWN0ID0ge1xyXG4gICAgICBkZWNpbWFsczogTWF0aC5tYXgoMCwgZGVjKSxcclxuICAgICAgc2NhbGVkRGVjaW1hbHM6IE1hdGgubWF4KDAsIGRlYykgLSBNYXRoLmZsb29yKE1hdGgubG9nKHNpemUpIC8gTWF0aC5MTjEwKSArIDJcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgcHJpdmF0ZSBzZXRVbml0Rm9ybWF0KHN1Ykl0ZW0sIGluZGV4KSB7XHJcbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XHJcbiAgICAgIHRoaXMucGFuZWwuZGVmYXVsdFBhdHRlcm4uZm9ybWF0ID0gc3ViSXRlbS52YWx1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGFuZWwucGF0dGVybnNbaW5kZXhdLmZvcm1hdCA9IHN1Ykl0ZW0udmFsdWU7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwcml2YXRlIGxpbWl0VGV4dCh0ZXh0LCBtYXhsZW5ndGgpIHtcclxuICAgIGlmICh0ZXh0LnNwbGl0KCcnKS5sZW5ndGggPiBtYXhsZW5ndGgpIHtcclxuICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDAsIG1heGxlbmd0aCAtIDMpICsgXCIuLi5cIjtcclxuICAgIH1cclxuICAgIHJldHVybiB0ZXh0O1xyXG4gIH1cclxuICBwcml2YXRlIGxpbmsoc2NvcGUsIGVsZW0sIGF0dHJzLCBjdHJsKSB7XHJcbiAgICB0aGlzLmN0cmwgPSBjdHJsO1xyXG4gICAgdGhpcy5lbGVtID0gZWxlbTtcclxuICB9XHJcbn1cclxuXHJcbkdyYWZhbmFCb29tVGFibGVDdHJsLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKHRoaXMuZGF0YVJlY2VpdmVkKSB7XHJcbiAgICAvLyBDb3B5aW5nIHRoZSBkYXRhIHJlY2VpdmVkXHJcbiAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YVJlY2VpdmVkO1xyXG4gICAgdGhpcy5wYW5lbC5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzID0gdGhpcy5wYW5lbC5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzIHx8IGNvbmZpZy5kZWZhdWx0X3RpdGxlX2Zvcl9yb3dzO1xyXG4gICAgY29uc3QgbWV0cmljc1JlY2VpdmVkID0gdXRpbHMuZ2V0RmllbGRzKHRoaXMuZGF0YUNvbXB1dGVkLCBcInRhcmdldFwiKTtcclxuICAgIGlmIChtZXRyaWNzUmVjZWl2ZWQubGVuZ3RoICE9PSBfLnVuaXEobWV0cmljc1JlY2VpdmVkKS5sZW5ndGgpIHtcclxuICAgICAgbGV0IGR1cGxpY2F0ZUtleXMgPSBfLnVuaXEobWV0cmljc1JlY2VpdmVkLmZpbHRlcih2ID0+IHtcclxuICAgICAgICByZXR1cm4gbWV0cmljc1JlY2VpdmVkLmZpbHRlcih0ID0+IHQgPT09IHYpLmxlbmd0aCA+IDE7XHJcbiAgICAgIH0pKTtcclxuICAgICAgbGV0IGVyciA9IG5ldyBFcnJvcigpO1xyXG4gICAgICBlcnIubmFtZSA9IFwiRHVwbGljYXRlIGRhdGEgcmVjZWl2ZWRcIjtcclxuICAgICAgZXJyLm1lc3NhZ2UgPSBcIkR1cGxpY2F0ZSBrZXlzIDogPGJyLz5cIiArIGR1cGxpY2F0ZUtleXMuam9pbihcIjxici8+IFwiKTtcclxuICAgICAgdGhpcy5wYW5lbC5lcnJvciA9IGVycjtcclxuICAgICAgdGhpcy5wYW5lbC5kYXRhID0gdW5kZWZpbmVkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wYW5lbC5lcnJvciA9IHVuZGVmaW5lZDtcclxuICAgICAgLy8gQmluZGluZyB0aGUgZ3JhZmFuYSBjb21wdXRhdGlvbnMgdG8gdGhlIG1ldHJpY3MgcmVjZWl2ZWRcclxuICAgICAgdGhpcy5kYXRhQ29tcHV0ZWQgPSB0aGlzLmRhdGFSZWNlaXZlZC5tYXAodGhpcy5zZXJpZXNIYW5kbGVyLmJpbmQodGhpcykpO1xyXG4gICAgICAvLyBHZXQgU2VydmVyIFRpbWUgU3RhbXAgb2YgdGhlIFNlcmllcyBmb3IgdGltZSBiYXNlZCB0aHJlc2hvbGRzLlxyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy5jdXJyZW50X3NlcnZlcnRpbWVzdGFtcCA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgaWYgKHNlcmllcyAmJiBzZXJpZXMuZGF0YXBvaW50cyAmJiBzZXJpZXMuZGF0YXBvaW50cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBpZiAoXy5sYXN0KHNlcmllcy5kYXRhcG9pbnRzKS5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgc2VyaWVzLmN1cnJlbnRfc2VydmVydGltZXN0YW1wID0gbmV3IERhdGUoXy5sYXN0KHNlcmllcy5kYXRhcG9pbnRzKVsxXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBBc3NpZ24gcGF0dGVyblxyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy5wYXR0ZXJuID0gXy5maW5kKHRoaXMucGFuZWwucGF0dGVybnMuZmlsdGVyKHAgPT4geyByZXR1cm4gcC5kaXNhYmxlZCAhPT0gdHJ1ZTsgfSksIGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgICByZXR1cm4gc2VyaWVzLmFsaWFzLm1hdGNoKHAucGF0dGVybik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHNlcmllcy5wYXR0ZXJuID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHNlcmllcy5wYXR0ZXJuID0gdGhpcy5wYW5lbC5kZWZhdWx0UGF0dGVybiB8fCBjb25maWcucGFuZWxEZWZhdWx0cy5kZWZhdWx0UGF0dGVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIEFzc2lnbiBEZWNpbWFsIFZhbHVlc1xyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy5kZWNpbWFscyA9IChzZXJpZXMucGF0dGVybi5kZWNpbWFscykgfHwgY29uZmlnLnBhbmVsRGVmYXVsdHMuZGVmYXVsdFBhdHRlcm4uZGVjaW1hbHM7XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIEFzc2lnbiB2YWx1ZVxyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIGlmIChzZXJpZXMuc3RhdHMpIHtcclxuICAgICAgICAgIHNlcmllcy52YWx1ZSA9IHNlcmllcy5zdGF0c1tzZXJpZXMucGF0dGVybi52YWx1ZU5hbWUgfHwgY29uZmlnLnBhbmVsRGVmYXVsdHMuZGVmYXVsdFBhdHRlcm4udmFsdWVOYW1lXTtcclxuICAgICAgICAgIGxldCBkZWNpbWFsSW5mbyA9IHRoaXMuZ2V0RGVjaW1hbHNGb3JWYWx1ZShzZXJpZXMudmFsdWUsIHNlcmllcy5kZWNpbWFscyk7XHJcbiAgICAgICAgICBsZXQgZm9ybWF0RnVuYyA9IGtibi52YWx1ZUZvcm1hdHNbc2VyaWVzLnBhdHRlcm4uZm9ybWF0IHx8IGNvbmZpZy5wYW5lbERlZmF1bHRzLmRlZmF1bHRQYXR0ZXJuLmZvcm1hdF07XHJcbiAgICAgICAgICBpZiAoc2VyaWVzLnZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHNlcmllcy5kaXNwbGF5VmFsdWUgPSBzZXJpZXMucGF0dGVybi5udWxsX3ZhbHVlIHx8IGNvbmZpZy5wYW5lbERlZmF1bHRzLmRlZmF1bHRQYXR0ZXJuLm51bGxfdmFsdWUgfHwgXCJOdWxsXCI7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKCFpc05hTihzZXJpZXMudmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHNlcmllcy52YWx1ZUZvcm1hdHRlZCA9IGZvcm1hdEZ1bmMoc2VyaWVzLnZhbHVlLCBkZWNpbWFsSW5mby5kZWNpbWFscywgZGVjaW1hbEluZm8uc2NhbGVkRGVjaW1hbHMpO1xyXG4gICAgICAgICAgICBzZXJpZXMudmFsdWVSb3VuZGVkID0ga2JuLnJvdW5kVmFsdWUoc2VyaWVzLnZhbHVlLCBkZWNpbWFsSW5mby5kZWNpbWFscyk7XHJcbiAgICAgICAgICAgIHNlcmllcy5kaXNwbGF5VmFsdWUgPSBzZXJpZXMudmFsdWVGb3JtYXR0ZWQ7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZXJpZXMuZGlzcGxheVZhbHVlID0gc2VyaWVzLnBhdHRlcm4ubnVsbF92YWx1ZSB8fCBjb25maWcucGFuZWxEZWZhdWx0cy5kZWZhdWx0UGF0dGVybi5udWxsX3ZhbHVlIHx8IFwiTnVsbFwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gRmlsdGVyIFZhbHVlc1xyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YUNvbXB1dGVkLmZpbHRlcihzZXJpZXMgPT4ge1xyXG4gICAgICAgIGlmICghc2VyaWVzLnBhdHRlcm4uZmlsdGVyKSB7XHJcbiAgICAgICAgICBzZXJpZXMucGF0dGVybi5maWx0ZXIgPSB7fTtcclxuICAgICAgICAgIHNlcmllcy5wYXR0ZXJuLmZpbHRlci52YWx1ZV9iZWxvdyA9IFwiXCI7XHJcbiAgICAgICAgICBzZXJpZXMucGF0dGVybi5maWx0ZXIudmFsdWVfYWJvdmUgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2VyaWVzLnBhdHRlcm4gJiYgc2VyaWVzLnBhdHRlcm4uZmlsdGVyICYmIChzZXJpZXMucGF0dGVybi5maWx0ZXIudmFsdWVfYmVsb3cgIT09IFwiXCIgfHwgc2VyaWVzLnBhdHRlcm4uZmlsdGVyLnZhbHVlX2Fib3ZlICE9PSBcIlwiKSkge1xyXG4gICAgICAgICAgaWYgKHNlcmllcy5wYXR0ZXJuLmZpbHRlci52YWx1ZV9iZWxvdyAhPT0gXCJcIiAmJiBzZXJpZXMudmFsdWUgPCArKHNlcmllcy5wYXR0ZXJuLmZpbHRlci52YWx1ZV9iZWxvdykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHNlcmllcy5wYXR0ZXJuLmZpbHRlci52YWx1ZV9hYm92ZSAhPT0gXCJcIiAmJiBzZXJpZXMudmFsdWUgPiArKHNlcmllcy5wYXR0ZXJuLmZpbHRlci52YWx1ZV9hYm92ZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIC8vIEFzc2lnbiBSb3cgTmFtZVxyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy5yb3dfbmFtZSA9IHNlcmllcy5hbGlhcy5zcGxpdChzZXJpZXMucGF0dGVybi5kZWxpbWl0ZXIgfHwgXCIuXCIpLnJlZHVjZSgociwgaXQsIGkpID0+IHtcclxuICAgICAgICAgIHJldHVybiByLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlciArIGkgKyB0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlciwgXCJnXCIpLCBpdCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAgIHNlcmllcy5wYXR0ZXJuLnJvd19uYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlciArIFwic2VyaWVzXCIgKyB0aGlzLnBhbmVsLnJvd19jb2xfd3JhcHBlciwgXCJnXCIpLCBzZXJpZXMuYWxpYXMpIHx8XHJcbiAgICAgICAgICBjb25maWcucGFuZWxEZWZhdWx0cy5kZWZhdWx0UGF0dGVybi5yb3dfbmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIgKyBcInNlcmllc1wiICsgdGhpcy5wYW5lbC5yb3dfY29sX3dyYXBwZXIsIFwiZ1wiKSwgc2VyaWVzLmFsaWFzKSk7XHJcbiAgICAgICAgaWYgKHNlcmllcy5hbGlhcy5zcGxpdChzZXJpZXMucGF0dGVybi5kZWxpbWl0ZXIgfHwgXCIuXCIpLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgc2VyaWVzLnJvd19uYW1lID0gc2VyaWVzLmFsaWFzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gQXNzaWduIENvbCBOYW1lXHJcbiAgICAgIHRoaXMuZGF0YUNvbXB1dGVkID0gdGhpcy5kYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgc2VyaWVzLmNvbF9uYW1lID0gc2VyaWVzLmFsaWFzLnNwbGl0KHNlcmllcy5wYXR0ZXJuLmRlbGltaXRlciB8fCBcIi5cIikucmVkdWNlKChyLCBpdCwgaSkgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIHIucmVwbGFjZShuZXcgUmVnRXhwKHRoaXMucGFuZWwucm93X2NvbF93cmFwcGVyICsgaSArIHRoaXMucGFuZWwucm93X2NvbF93cmFwcGVyLCBcImdcIiksIGl0KTtcclxuICAgICAgICB9LCBzZXJpZXMucGF0dGVybi5jb2xfbmFtZSB8fCBjb25maWcucGFuZWxEZWZhdWx0cy5kZWZhdWx0UGF0dGVybi5jb2xfbmFtZSk7XHJcbiAgICAgICAgaWYgKHNlcmllcy5hbGlhcy5zcGxpdChzZXJpZXMucGF0dGVybi5kZWxpbWl0ZXIgfHwgXCIuXCIpLmxlbmd0aCA9PT0gMSB8fCBzZXJpZXMucm93X25hbWUgPT09IHNlcmllcy5hbGlhcykge1xyXG4gICAgICAgICAgc2VyaWVzLmNvbF9uYW1lID0gc2VyaWVzLnBhdHRlcm4uY29sX25hbWUgfHwgXCJWYWx1ZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gQXNzaWduIFJvd0NvbCBLZXlcclxuICAgICAgdGhpcy5kYXRhQ29tcHV0ZWQgPSB0aGlzLmRhdGFDb21wdXRlZC5tYXAoc2VyaWVzID0+IHtcclxuICAgICAgICBzZXJpZXMua2V5X25hbWUgPSBzZXJpZXMucm93X25hbWUgKyBcIiNcIiArIHNlcmllcy5jb2xfbmFtZTtcclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gQXNzaWduIFRocmVzaG9sZHNcclxuICAgICAgdGhpcy5kYXRhQ29tcHV0ZWQgPSB0aGlzLmRhdGFDb21wdXRlZC5tYXAoc2VyaWVzID0+IHtcclxuICAgICAgICBzZXJpZXMudGhyZXNob2xkcyA9IChzZXJpZXMucGF0dGVybi50aHJlc2hvbGRzIHx8IGNvbmZpZy5wYW5lbERlZmF1bHRzLmRlZmF1bHRQYXR0ZXJuLnRocmVzaG9sZHMpLnNwbGl0KFwiLFwiKS5tYXAoZCA9PiArZCk7XHJcbiAgICAgICAgaWYgKHNlcmllcy5wYXR0ZXJuLmVuYWJsZV90aW1lX2Jhc2VkX3RocmVzaG9sZHMpIHtcclxuICAgICAgICAgIGxldCBtZXRyaWNyZWNpdmVkVGltZVN0YW1wID0gc2VyaWVzLmN1cnJlbnRfc2VydmVydGltZXN0YW1wIHx8IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICBsZXQgbWV0cmljcmVjaXZlZFRpbWVTdGFtcF9pbm51bWJlciA9IG1ldHJpY3JlY2l2ZWRUaW1lU3RhbXAuZ2V0SG91cnMoKSAqIDEwMCArIG1ldHJpY3JlY2l2ZWRUaW1lU3RhbXAuZ2V0TWludXRlcygpO1xyXG4gICAgICAgICAgbGV0IHdlZWtkYXlzID0gW1wic3VuXCIsIFwibW9uXCIsIFwidHVlXCIsIFwid2VkXCIsIFwidGh1XCIsIFwiZnJpXCIsIFwic2F0XCJdO1xyXG4gICAgICAgICAgXy5lYWNoKHNlcmllcy5wYXR0ZXJuLnRpbWVfYmFzZWRfdGhyZXNob2xkcywgKHRidHgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRidHggJiYgdGJ0eC5mcm9tICYmIHRidHgudG8gJiYgdGJ0eC5lbmFibGVkRGF5cyAmJlxyXG4gICAgICAgICAgICAgIChtZXRyaWNyZWNpdmVkVGltZVN0YW1wX2lubnVtYmVyID49ICsodGJ0eC5mcm9tKSkgJiZcclxuICAgICAgICAgICAgICAobWV0cmljcmVjaXZlZFRpbWVTdGFtcF9pbm51bWJlciA8PSArKHRidHgudG8pKSAmJlxyXG4gICAgICAgICAgICAgICh0YnR4LmVuYWJsZWREYXlzLnRvTG93ZXJDYXNlKCkuaW5kZXhPZih3ZWVrZGF5c1ttZXRyaWNyZWNpdmVkVGltZVN0YW1wLmdldERheSgpXSkgPiAtMSkgJiZcclxuICAgICAgICAgICAgICB0YnR4LnRocmVzaG9sZFxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICBzZXJpZXMudGhyZXNob2xkcyA9ICh0YnR4LnRocmVzaG9sZCArIFwiXCIpLnNwbGl0KFwiLFwiKS5tYXAoZCA9PiArZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VyaWVzO1xyXG4gICAgICB9KTtcclxuICAgICAgLy8gQXNzaWduIEJHIENvbG9yc1xyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy5lbmFibGVfYmdDb2xvciA9IHNlcmllcy5wYXR0ZXJuLmVuYWJsZV9iZ0NvbG9yO1xyXG4gICAgICAgIHNlcmllcy5iZ0NvbG9ycyA9IChzZXJpZXMucGF0dGVybi5iZ0NvbG9ycyB8fCBjb25maWcucGFuZWxEZWZhdWx0cy5kZWZhdWx0UGF0dGVybi5iZ0NvbG9ycykuc3BsaXQoXCJ8XCIpO1xyXG4gICAgICAgIHNlcmllcy5iZ0NvbG9yID0gc2VyaWVzLmVuYWJsZV9iZ0NvbG9yID09PSB0cnVlID8gdGhpcy5jb21wdXRlQmdDb2xvcihzZXJpZXMudGhyZXNob2xkcywgc2VyaWVzLmJnQ29sb3JzLCBzZXJpZXMudmFsdWUpIDogXCJ0cmFuc3BhcmVudFwiO1xyXG4gICAgICAgIGlmIChzZXJpZXMuZGlzcGxheVZhbHVlID09PSAoc2VyaWVzLnBhdHRlcm4ubnVsbF92YWx1ZSB8fCBjb25maWcucGFuZWxEZWZhdWx0cy5kZWZhdWx0UGF0dGVybi5udWxsX3ZhbHVlIHx8IFwiTnVsbFwiKSkge1xyXG4gICAgICAgICAgc2VyaWVzLmJnQ29sb3IgPSBzZXJpZXMucGF0dGVybi5udWxsX2NvbG9yIHx8IGNvbmZpZy5wYW5lbERlZmF1bHRzLmRlZmF1bHRQYXR0ZXJuLm51bGxfY29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBCRyBDb2xvcnMgb3ZlcnJpZGVzXHJcbiAgICAgIHRoaXMuZGF0YUNvbXB1dGVkID0gdGhpcy5kYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgc2VyaWVzLmVuYWJsZV9iZ0NvbG9yX292ZXJyaWRlcyA9IHNlcmllcy5wYXR0ZXJuLmVuYWJsZV9iZ0NvbG9yX292ZXJyaWRlcztcclxuICAgICAgICBzZXJpZXMuYmdDb2xvcnNfb3ZlcnJpZGVzID0gc2VyaWVzLnBhdHRlcm4uYmdDb2xvcnNfb3ZlcnJpZGVzIHx8IFwiXCI7XHJcbiAgICAgICAgaWYgKHNlcmllcy5lbmFibGVfYmdDb2xvcl9vdmVycmlkZXMgJiYgc2VyaWVzLmJnQ29sb3JzX292ZXJyaWRlcyAhPT0gXCJcIikge1xyXG4gICAgICAgICAgbGV0IF9iZ0NvbG9yc19vdmVycmlkZXMgPSBzZXJpZXMuYmdDb2xvcnNfb3ZlcnJpZGVzLnNwbGl0KFwifFwiKS5maWx0ZXIoY29uID0+IGNvbi5pbmRleE9mKFwiLT5cIikpLm1hcChjb24gPT4gY29uLnNwbGl0KFwiLT5cIikpLmZpbHRlcihjb24gPT4gKyhjb25bMF0pID09PSBzZXJpZXMudmFsdWUpLm1hcChjb24gPT4gY29uWzFdKTtcclxuICAgICAgICAgIGlmIChfYmdDb2xvcnNfb3ZlcnJpZGVzLmxlbmd0aCA+IDAgJiYgX2JnQ29sb3JzX292ZXJyaWRlc1swXSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICBzZXJpZXMuYmdDb2xvciA9IHV0aWxzLm5vcm1hbGl6ZUNvbG9yKChcIlwiICsgX2JnQ29sb3JzX292ZXJyaWRlc1swXSkudHJpbSgpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIFZhbHVlIFRyYW5zZm9ybVxyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy5lbmFibGVfdHJhbnNmb3JtID0gc2VyaWVzLnBhdHRlcm4uZW5hYmxlX3RyYW5zZm9ybTtcclxuICAgICAgICBzZXJpZXMudHJhbnNmb3JtX3ZhbHVlcyA9IChzZXJpZXMucGF0dGVybi50cmFuc2Zvcm1fdmFsdWVzIHx8IGNvbmZpZy5wYW5lbERlZmF1bHRzLmRlZmF1bHRQYXR0ZXJuLnRyYW5zZm9ybV92YWx1ZXMpLnNwbGl0KFwifFwiKTtcclxuICAgICAgICBzZXJpZXMuZGlzcGxheVZhbHVlID0gc2VyaWVzLmVuYWJsZV90cmFuc2Zvcm0gPT09IHRydWUgPyB0aGlzLnRyYW5zZm9ybVZhbHVlKHNlcmllcy50aHJlc2hvbGRzLCBzZXJpZXMudHJhbnNmb3JtX3ZhbHVlcywgc2VyaWVzLnZhbHVlLCBzZXJpZXMuZGlzcGxheVZhbHVlLCBzZXJpZXMucm93X25hbWUsIHNlcmllcy5jb2xfbmFtZSkgOiBzZXJpZXMuZGlzcGxheVZhbHVlO1xyXG4gICAgICAgIGlmIChzZXJpZXMuZGlzcGxheVZhbHVlID09PSAoc2VyaWVzLnBhdHRlcm4ubnVsbF92YWx1ZSB8fCBjb25maWcucGFuZWxEZWZhdWx0cy5kZWZhdWx0UGF0dGVybi5udWxsX3ZhbHVlIHx8IFwiTnVsbFwiKSkge1xyXG4gICAgICAgICAgc2VyaWVzLmRpc3BsYXlWYWx1ZSA9IHNlcmllcy5wYXR0ZXJuLm51bGxfdmFsdWUgfHwgY29uZmlnLnBhbmVsRGVmYXVsdHMuZGVmYXVsdFBhdHRlcm4ubnVsbF92YWx1ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzTmFOKHNlcmllcy52YWx1ZSkpIHtcclxuICAgICAgICAgIHNlcmllcy5kaXNwbGF5VmFsdWUgPSBzZXJpZXMucGF0dGVybi5udWxsX3ZhbHVlIHx8IGNvbmZpZy5wYW5lbERlZmF1bHRzLmRlZmF1bHRQYXR0ZXJuLm51bGxfdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBWYWx1ZSBUcmFuc2Zvcm0gT3ZlcnJpZGVzXHJcbiAgICAgIHRoaXMuZGF0YUNvbXB1dGVkID0gdGhpcy5kYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgc2VyaWVzLmVuYWJsZV90cmFuc2Zvcm1fb3ZlcnJpZGVzID0gc2VyaWVzLnBhdHRlcm4uZW5hYmxlX3RyYW5zZm9ybV9vdmVycmlkZXM7XHJcbiAgICAgICAgc2VyaWVzLnRyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzID0gc2VyaWVzLnBhdHRlcm4udHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXMgfHwgXCJcIjtcclxuICAgICAgICBpZiAoc2VyaWVzLmVuYWJsZV90cmFuc2Zvcm1fb3ZlcnJpZGVzICYmIHNlcmllcy50cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlcyAhPT0gXCJcIikge1xyXG4gICAgICAgICAgbGV0IF90cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlcyA9IHNlcmllcy50cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlcy5zcGxpdChcInxcIikuZmlsdGVyKGNvbiA9PiBjb24uaW5kZXhPZihcIi0+XCIpKS5tYXAoY29uID0+IGNvbi5zcGxpdChcIi0+XCIpKS5maWx0ZXIoY29uID0+ICsoY29uWzBdKSA9PT0gc2VyaWVzLnZhbHVlKS5tYXAoY29uID0+IGNvblsxXSk7XHJcbiAgICAgICAgICBpZiAoX3RyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzLmxlbmd0aCA+IDAgJiYgX3RyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzWzBdICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHNlcmllcy5kaXNwbGF5VmFsdWUgPSAoXCJcIiArIF90cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlc1swXSkudHJpbSgpLnJlcGxhY2UobmV3IFJlZ0V4cChcIl92YWx1ZV9cIiwgXCJnXCIpLCBzZXJpZXMuZGlzcGxheVZhbHVlKS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfcm93X25hbWVfXCIsIFwiZ1wiKSwgc2VyaWVzLnJvd19uYW1lKS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfY29sX25hbWVfXCIsIFwiZ1wiKSwgc2VyaWVzLmNvbF9uYW1lKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlcmllcztcclxuICAgICAgfSk7XHJcbiAgICAgIC8vIEZvbnQgYXdlc29tZSBpY29uc1xyXG4gICAgICB0aGlzLmRhdGFDb21wdXRlZCA9IHRoaXMuZGF0YUNvbXB1dGVkLm1hcChzZXJpZXMgPT4ge1xyXG4gICAgICAgIHNlcmllcy5hY3R1YWxfZGlzcGxheXZhbHVlID0gc2VyaWVzLmRpc3BsYXlWYWx1ZTtcclxuICAgICAgICBzZXJpZXMuYWN0dWFsX3Jvd19uYW1lID0gc2VyaWVzLnJvd19uYW1lO1xyXG4gICAgICAgIHNlcmllcy5hY3R1YWxfY29sX25hbWUgPSBzZXJpZXMuY29sX25hbWU7XHJcbiAgICAgICAgaWYgKHNlcmllcy5kaXNwbGF5VmFsdWUgJiYgc2VyaWVzLmRpc3BsYXlWYWx1ZS5pbmRleE9mKFwiX2ZhLVwiKSA+IC0xKSB7IHNlcmllcy5kaXNwbGF5VmFsdWUgPSB0aGlzLnJlcGxhY2VGb250QXdlc29tZUljb25zKHNlcmllcy5kaXNwbGF5VmFsdWUpOyB9XHJcbiAgICAgICAgaWYgKHNlcmllcy5yb3dfbmFtZSAmJiBzZXJpZXMucm93X25hbWUuaW5kZXhPZihcIl9mYS1cIikgPiAtMSkgeyBzZXJpZXMucm93X25hbWUgPSB0aGlzLnJlcGxhY2VGb250QXdlc29tZUljb25zKHNlcmllcy5yb3dfbmFtZSk7IH1cclxuICAgICAgICBpZiAoc2VyaWVzLmNvbF9uYW1lICYmIHNlcmllcy5jb2xfbmFtZS5pbmRleE9mKFwiX2ZhLVwiKSA+IC0xKSB7IHNlcmllcy5jb2xfbmFtZSA9IHRoaXMucmVwbGFjZUZvbnRBd2Vzb21lSWNvbnMoc2VyaWVzLmNvbF9uYW1lKTsgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBJbWFnZSB0cmFuc2Zvcm1zXHJcbiAgICAgIHRoaXMuZGF0YUNvbXB1dGVkID0gdGhpcy5kYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgaWYgKHNlcmllcy5kaXNwbGF5VmFsdWUgJiYgc2VyaWVzLmRpc3BsYXlWYWx1ZS5pbmRleE9mKFwiX2ltZy1cIikgPiAtMSkgeyBzZXJpZXMuZGlzcGxheVZhbHVlID0gdGhpcy5yZXBsYWNlV2l0aEltYWdlcyhzZXJpZXMuZGlzcGxheVZhbHVlKTsgfVxyXG4gICAgICAgIGlmIChzZXJpZXMucm93X25hbWUgJiYgc2VyaWVzLnJvd19uYW1lLmluZGV4T2YoXCJfaW1nLVwiKSA+IC0xKSB7IHNlcmllcy5yb3dfbmFtZSA9IHRoaXMucmVwbGFjZVdpdGhJbWFnZXMoc2VyaWVzLnJvd19uYW1lKTsgfVxyXG4gICAgICAgIGlmIChzZXJpZXMuY29sX25hbWUgJiYgc2VyaWVzLmNvbF9uYW1lLmluZGV4T2YoXCJfaW1nLVwiKSA+IC0xKSB7IHNlcmllcy5jb2xfbmFtZSA9IHRoaXMucmVwbGFjZVdpdGhJbWFnZXMoc2VyaWVzLmNvbF9uYW1lKTsgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBDZWxsIExpbmtzXHJcbiAgICAgIHRoaXMuZGF0YUNvbXB1dGVkID0gdGhpcy5kYXRhQ29tcHV0ZWQubWFwKHNlcmllcyA9PiB7XHJcbiAgICAgICAgaWYgKHNlcmllcy5wYXR0ZXJuLmVuYWJsZV9jbGlja2FibGVfY2VsbHMpIHtcclxuICAgICAgICAgIGxldCB0YXJnZXRMaW5rID0gc2VyaWVzLnBhdHRlcm4uY2xpY2thYmxlX2NlbGxzX2xpbmsgfHwgXCIjXCI7XHJcbiAgICAgICAgICB0YXJnZXRMaW5rID0gdGFyZ2V0TGluay5yZXBsYWNlKG5ldyBSZWdFeHAoXCJfcm93X25hbWVfXCIsIFwiZ1wiKSwgdGhpcy5nZXRBY3R1YWxOYW1lV2l0aG91dFRyYW5zZm9ybVNpZ24oc2VyaWVzLmFjdHVhbF9yb3dfbmFtZSkudHJpbSgpKTtcclxuICAgICAgICAgIHRhcmdldExpbmsgPSB0YXJnZXRMaW5rLnJlcGxhY2UobmV3IFJlZ0V4cChcIl9jb2xfbmFtZV9cIiwgXCJnXCIpLCB0aGlzLmdldEFjdHVhbE5hbWVXaXRob3V0VHJhbnNmb3JtU2lnbihzZXJpZXMuYWN0dWFsX2NvbF9uYW1lKS50cmltKCkpO1xyXG4gICAgICAgICAgdGFyZ2V0TGluayA9IHRhcmdldExpbmsucmVwbGFjZShuZXcgUmVnRXhwKFwiX3ZhbHVlX1wiLCBcImdcIiksIHRoaXMuZ2V0QWN0dWFsTmFtZVdpdGhvdXRUcmFuc2Zvcm1TaWduKHNlcmllcy52YWx1ZSkudHJpbSgpKTtcclxuICAgICAgICAgIHNlcmllcy5kaXNwbGF5VmFsdWUgPSBgPGEgaHJlZj1cIiR7dGFyZ2V0TGlua31cIiB0YXJnZXQ9XCJfYmxhbmtcIj4ke3Nlcmllcy5kaXNwbGF5VmFsdWV9PC9hPmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXJpZXM7XHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBHcm91cGluZ1xyXG4gICAgICBjb25zdCByb3dzX2ZvdW5kID0gdXRpbHMuZ2V0RmllbGRzKHRoaXMuZGF0YUNvbXB1dGVkLCBcInJvd19uYW1lXCIpO1xyXG4gICAgICBjb25zdCBjb2xzX2ZvdW5kID0gdXRpbHMuZ2V0RmllbGRzKHRoaXMuZGF0YUNvbXB1dGVkLCBcImNvbF9uYW1lXCIpO1xyXG4gICAgICBjb25zdCBrZXlzX2ZvdW5kID0gdXRpbHMuZ2V0RmllbGRzKHRoaXMuZGF0YUNvbXB1dGVkLCBcImtleV9uYW1lXCIpO1xyXG4gICAgICBjb25zdCBpc191bmlxdWVfa2V5cyA9IChrZXlzX2ZvdW5kLmxlbmd0aCA9PT0gXy51bmlxKGtleXNfZm91bmQpLmxlbmd0aCk7XHJcbiAgICAgIGlmIChpc191bmlxdWVfa2V5cykge1xyXG4gICAgICAgIHRoaXMucGFuZWwuZXJyb3IgPSB1bmRlZmluZWQ7IC8vLy9cclxuICAgICAgICBsZXQgb3V0cHV0ID0gW107XHJcbiAgICAgICAgXy5lYWNoKF8udW5pcShyb3dzX2ZvdW5kKSwgKHJvd19uYW1lKSA9PiB7XHJcbiAgICAgICAgICBsZXQgbzogYW55ID0ge307XHJcbiAgICAgICAgICBvLnJvdyA9IHJvd19uYW1lO1xyXG4gICAgICAgICAgby5jb2xzID0gW107XHJcbiAgICAgICAgICBfLmVhY2goXy51bmlxKGNvbHNfZm91bmQpLCAoY29sX25hbWUpID0+IHtcclxuICAgICAgICAgICAgbGV0IG1hdGNoZWRfdmFsdWUgPSAoXy5maW5kKHRoaXMuZGF0YUNvbXB1dGVkLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgIHJldHVybiBlLnJvd19uYW1lID09PSByb3dfbmFtZSAmJiBlLmNvbF9uYW1lID09PSBjb2xfbmFtZTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBpZiAoIW1hdGNoZWRfdmFsdWUpIHtcclxuICAgICAgICAgICAgICBtYXRjaGVkX3ZhbHVlID0ge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheVZhbHVlOiBcIk4vQVwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IE5hTlxyXG4gICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgby5jb2xzLnB1c2goe1xyXG4gICAgICAgICAgICAgIFwiYWN0dWFsX2NvbF9uYW1lXCI6IG1hdGNoZWRfdmFsdWUuYWN0dWFsX2NvbF9uYW1lLFxyXG4gICAgICAgICAgICAgIFwiYWN0dWFsX3Jvd19uYW1lXCI6IG1hdGNoZWRfdmFsdWUuYWN0dWFsX3Jvd19uYW1lLFxyXG4gICAgICAgICAgICAgIFwiYmdDb2xvclwiOiBtYXRjaGVkX3ZhbHVlLmJnQ29sb3IgfHwgXCJ0cmFuc3BhcmVudFwiLFxyXG4gICAgICAgICAgICAgIFwiZGlzcGxheVZhbHVlXCI6IG1hdGNoZWRfdmFsdWUuZGlzcGxheVZhbHVlIHx8IG1hdGNoZWRfdmFsdWUudmFsdWUsXHJcbiAgICAgICAgICAgICAgXCJuYW1lXCI6IGNvbF9uYW1lLFxyXG4gICAgICAgICAgICAgIFwidmFsdWVcIjogbWF0Y2hlZF92YWx1ZS52YWx1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgb3V0cHV0LnB1c2gobyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gcmVnaW9uIE91dHB1dCB0YWJsZSBjb25zdHJ1Y3Rpb25cclxuICAgICAgICBsZXQgYm9vbXRhYmxlX291dHB1dF9ib2R5X2hlYWRlcnMgPSB0aGlzLmVsZW0uZmluZChcIiNib29tdGFibGVfb3V0cHV0X2JvZHlfaGVhZGVyc1wiKTtcclxuICAgICAgICBsZXQgYm9vbXRhYmxlX291dHB1dF9ib2R5X2hlYWRlcnNfb3V0cHV0ID0gYDxici8+YDtcclxuICAgICAgICBpZiAodGhpcy5wYW5lbC5oaWRlX2hlYWRlcnMgIT09IHRydWUpIHtcclxuICAgICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9oZWFkZXJzX291dHB1dCArPSBcIjx0cj5cIjtcclxuICAgICAgICAgIGlmICh0aGlzLnBhbmVsLmhpZGVfZmlyc3RfY29sdW1uICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9oZWFkZXJzX291dHB1dCArPSBgPHRoIHN0eWxlPVwicGFkZGluZzo0cHg7dGV4dC1hbGlnbjpjZW50ZXJcIj4ke3RoaXMucGFuZWwuZGVmYXVsdF90aXRsZV9mb3Jfcm93c308L3RoPmA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBfLmVhY2goXy51bmlxKGNvbHNfZm91bmQpLCBjID0+IHtcclxuICAgICAgICAgICAgYm9vbXRhYmxlX291dHB1dF9ib2R5X2hlYWRlcnNfb3V0cHV0ICs9IGA8dGggc3R5bGU9XCJwYWRkaW5nOjRweDt0ZXh0LWFsaWduOmNlbnRlclwiPiR7Y308L3RoPmA7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9oZWFkZXJzX291dHB1dCArPSBcIjwvdHI+XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9oZWFkZXJzLmh0bWwoYm9vbXRhYmxlX291dHB1dF9ib2R5X2hlYWRlcnNfb3V0cHV0KTtcclxuICAgICAgICBsZXQgYm9vbXRhYmxlX291dHB1dF9ib2R5ID0gdGhpcy5lbGVtLmZpbmQoJyNib29tdGFibGVfb3V0cHV0X2JvZHknKTtcclxuICAgICAgICBsZXQgYm9vbXRhYmxlX291dHB1dF9ib2R5X291dHB1dCA9IGBgO1xyXG4gICAgICAgIF8uZWFjaChvdXRwdXQsIG8gPT4ge1xyXG4gICAgICAgICAgYm9vbXRhYmxlX291dHB1dF9ib2R5X291dHB1dCArPSBcIjx0cj5cIjtcclxuICAgICAgICAgIGlmICh0aGlzLnBhbmVsLmhpZGVfZmlyc3RfY29sdW1uICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9vdXRwdXQgKz0gYDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O1wiPiR7by5yb3d9PC90ZD5gO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXy5lYWNoKG8uY29scywgYyA9PiB7XHJcbiAgICAgICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9vdXRwdXQgKz0gYDx0ZFxyXG4gICAgICAgICAgICAgIHN0eWxlPVwicGFkZGluZzo0cHg7YmFja2dyb3VuZC1jb2xvcjoke2MuYmdDb2xvcn1cIlxyXG4gICAgICAgICAgICAgIHRpdGxlPVwiJHsgXCJSb3cgTmFtZSA6IFwiICsgdGhpcy5nZXRBY3R1YWxOYW1lV2l0aG91dFRyYW5zZm9ybVNpZ24oYy5hY3R1YWxfcm93X25hbWUpICsgXCJcXG5Db2wgTmFtZSA6IFwiICsgdGhpcy5nZXRBY3R1YWxOYW1lV2l0aG91dFRyYW5zZm9ybVNpZ24oYy5hY3R1YWxfY29sX25hbWUpICsgXCJcXG5WYWx1ZSA6IFwiICsgYy52YWx1ZX1cIlxyXG4gICAgICAgICAgICA+JHtjLmRpc3BsYXlWYWx1ZX08L3RkPmA7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9vdXRwdXQgKz0gXCI8L3RyPlwiO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keS5odG1sKGJvb210YWJsZV9vdXRwdXRfYm9keV9vdXRwdXQpO1xyXG4gICAgICAgIC8vIGVuZHJlZ2lvblxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBkdXBsaWNhdGVLZXlWYWx1ZXMgPSBfLnVuaXEoa2V5c19mb3VuZC5maWx0ZXIodiA9PiB7XHJcbiAgICAgICAgICByZXR1cm4ga2V5c19mb3VuZC5maWx0ZXIodCA9PiB0ID09PSB2KS5sZW5ndGggPiAxO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICBsZXQgZXJyX2R1cGxpY2F0ZUtleXMgPSBuZXcgRXJyb3IoKTtcclxuICAgICAgICBlcnJfZHVwbGljYXRlS2V5cy5uYW1lID0gXCJEdXBsaWNhdGUga2V5cyBmb3VuZFwiO1xyXG4gICAgICAgIGVycl9kdXBsaWNhdGVLZXlzLm1lc3NhZ2UgPSBcIkR1cGxpY2F0ZSBrZXkgdmFsdWVzIDogPGJyLz5cIiArIGR1cGxpY2F0ZUtleVZhbHVlcy5qb2luKFwiPGJyLz4gXCIpO1xyXG4gICAgICAgIHRoaXMucGFuZWwuZXJyb3IgPSBlcnJfZHVwbGljYXRlS2V5cztcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gcmVnaW9uIERlYnVnIHRhYmxlIGJvZHkgY29uc3RydWN0aW9uXHJcbiAgICAgIGxldCBib29tdGFibGVfb3V0cHV0X2JvZHlfZGVidWcgPSB0aGlzLmVsZW0uZmluZCgnI2Jvb210YWJsZV9vdXRwdXRfYm9keV9kZWJ1ZycpO1xyXG4gICAgICBsZXQgYm9vbXRhYmxlX291dHB1dF9ib2R5X2RlYnVnX291dHB1dCA9IGBgO1xyXG4gICAgICBfLmVhY2godGhpcy5kYXRhQ29tcHV0ZWQsIGQgPT4ge1xyXG4gICAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9kZWJ1Z19vdXRwdXQgKz0gYFxyXG4gICAgICAgIDx0cj5cclxuICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O1wiIHdpZHRoPVwiNDAlXCI+JHtkLmFsaWFzfTwvdGQ+XHJcbiAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDtcIj4ke2QucGF0dGVybi5wYXR0ZXJuIHx8IFwiRGVmYXVsdFwifTwvdGQ+XHJcbiAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDtiYWNrZ3JvdW5kLWNvbG9yOiR7ZC5iZ0NvbG9yfVwiPiR7ZC5kaXNwbGF5VmFsdWV9PC90ZD5cclxuICAgICAgICAgIDx0ZCBzdHlsZT1cInBhZGRpbmc6NHB4O1wiPiR7ZC5yb3dfbmFtZX08L3RkPlxyXG4gICAgICAgICAgPHRkIHN0eWxlPVwicGFkZGluZzo0cHg7XCI+JHtkLmNvbF9uYW1lfTwvdGQ+XHJcbiAgICAgICAgICA8dGQgc3R5bGU9XCJwYWRkaW5nOjRweDtcIj4ke2QudGhyZXNob2xkc308L3RkPlxyXG4gICAgICAgIDwvdHI+XHJcbiAgICAgICAgYDtcclxuICAgICAgfSk7XHJcbiAgICAgIGJvb210YWJsZV9vdXRwdXRfYm9keV9kZWJ1Zy5odG1sKGJvb210YWJsZV9vdXRwdXRfYm9keV9kZWJ1Z19vdXRwdXQpO1xyXG4gICAgICAvLyBlbmRyZWdpb25cclxuICAgIH1cclxuICAgIGxldCByb290RWxlbSA9IHRoaXMuZWxlbS5maW5kKCcudGFibGUtcGFuZWwtc2Nyb2xsJyk7XHJcbiAgICBsZXQgbWF4aGVpZ2h0b2ZwYW5lbCA9IHRoaXMucGFuZWwuZGVidWdfbW9kZSA/IHRoaXMuY3RybC5oZWlnaHQgLSA3MSA6IHRoaXMuY3RybC5oZWlnaHQgLSAzMTtcclxuICAgIHJvb3RFbGVtLmNzcyh7ICdtYXgtaGVpZ2h0JzogbWF4aGVpZ2h0b2ZwYW5lbCArIFwicHhcIiB9KTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQge1xyXG4gIEdyYWZhbmFCb29tVGFibGVDdHJsIGFzIFBhbmVsQ3RybFxyXG59O1xyXG4iXX0=