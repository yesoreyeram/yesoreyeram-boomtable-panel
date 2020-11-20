System.register(["lodash"], function (exports_1, context_1) {
    "use strict";
    var lodash_1, normalizeColor, parseMath, parseMathExpression, getColor, replaceTokens, getActualNameWithoutTokens, getItemBasedOnThreshold, getMetricNameFromTaggedAlias, getLablesFromTaggedAlias, replace_tags_from_field, getSeriesValue, getCurrentTimeStamp, replaceDelimitedColumns, getRowName, getColName, getDisplayValueTemplate, doesValueNeedsToHide;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }
        ],
        execute: function () {
            exports_1("normalizeColor", normalizeColor = function (color) {
                if (color.toLowerCase() === 'green') {
                    return 'rgba(50, 172, 45, 0.97)';
                }
                else if (color.toLowerCase() === 'orange') {
                    return 'rgba(237, 129, 40, 0.89)';
                }
                else if (color.toLowerCase() === 'red') {
                    return 'rgba(245, 54, 54, 0.9)';
                }
                else {
                    return color.trim();
                }
            });
            exports_1("parseMath", parseMath = function (valuestring) {
                var returnvalue = 0;
                if (valuestring.indexOf('+') > -1) {
                    returnvalue = +valuestring.split('+')[0] + +valuestring.split('+')[1];
                }
                else if (valuestring.indexOf('-') > -1) {
                    returnvalue = +valuestring.split('-')[0] - +valuestring.split('-')[1];
                }
                else if (valuestring.indexOf('*') > -1) {
                    returnvalue = +valuestring.split('*')[0] * +valuestring.split('*')[1];
                }
                else if (valuestring.indexOf('/') > -1) {
                    returnvalue = +valuestring.split('/')[0] / +valuestring.split('/')[1];
                }
                else if (valuestring.indexOf('min') > -1) {
                    returnvalue = lodash_1.default.min([+valuestring.split('min')[0], +valuestring.split('min')[1]]) || 0;
                }
                else if (valuestring.indexOf('max') > -1) {
                    returnvalue = lodash_1.default.max([+valuestring.split('max')[0], +valuestring.split('max')[1]]) || 0;
                }
                else if (valuestring.indexOf('mean') > -1) {
                    returnvalue = lodash_1.default.mean([+valuestring.split('avg')[0], +valuestring.split('avg')[1]]) || 0;
                }
                else {
                    returnvalue = +valuestring;
                }
                return Math.round(+returnvalue);
            });
            exports_1("parseMathExpression", parseMathExpression = function (expression, index) {
                var valuestring = expression.replace(/\_/g, '').split(',')[index];
                return +parseMath(valuestring);
            });
            exports_1("getColor", getColor = function (expression, index) {
                var returnValue = (expression || '').split(',').length > index ? " style=\"color:" + normalizeColor(expression.replace(/\_/g, '').split(',')[index]) + "\" " : '';
                return returnValue;
            });
            exports_1("replaceTokens", replaceTokens = function (value) {
                if (!value) {
                    return value;
                }
                value = value + '';
                value = value
                    .split(' ')
                    .map(function (a) {
                    if (a.startsWith('_fa-') && a.endsWith('_')) {
                        var returnvalue = '';
                        var icon = a.replace(/\_/g, '').split(',')[0];
                        var color = getColor(a, 1);
                        var repeatCount = a.split(',').length >= 3 ? parseMathExpression(a, 2) : 1;
                        returnvalue = ("<i class=\"fa " + icon + "\" " + color + "></i> ").repeat(repeatCount);
                        if (a.split(',').length >= 4) {
                            var maxColor = getColor(a, 3);
                            var maxLength = a.split(',').length >= 5 ? parseMathExpression(a, 4) : 0;
                            returnvalue += ("<i class=\"fa " + icon + "\" " + maxColor + "></i> ").repeat(lodash_1.default.max([maxLength - repeatCount, 0]) || 0);
                        }
                        return returnvalue;
                    }
                    else if (a.startsWith('_img-') && a.endsWith('_')) {
                        a = a.slice(0, -1);
                        var imgUrl = a.replace('_img-', '').split(',')[0];
                        var imgWidth = a.split(',').length > 1 ? a.replace('_img-', '').split(',')[1] : '20px';
                        var imgHeight = a.split(',').length > 2 ? a.replace('_img-', '').split(',')[2] : '20px';
                        var repeatCount = a.split(',').length > 3 ? +a.replace('_img-', '').split(',')[3] : 1;
                        a = ("<img width=\"" + imgWidth + "\" height=\"" + imgHeight + "\" src=\"" + imgUrl + "\"/>").repeat(repeatCount);
                    }
                    return a;
                })
                    .join(' ');
                return value;
            });
            exports_1("getActualNameWithoutTokens", getActualNameWithoutTokens = function (value) {
                if (!value) {
                    return value + '';
                }
                value = value + '';
                return value
                    .split(' ')
                    .map(function (a) {
                    if (a.startsWith('_fa-') && a.endsWith('_')) {
                        a = "";
                    }
                    else if (a.startsWith('_img-') && a.endsWith('_')) {
                        a = "";
                    }
                    return a;
                })
                    .join(' ');
            });
            exports_1("getItemBasedOnThreshold", getItemBasedOnThreshold = function (thresholds, ranges, value, defaultValue) {
                var c = defaultValue;
                if (thresholds && ranges && typeof value === 'number' && thresholds.length + 1 <= ranges.length) {
                    ranges = lodash_1.default.dropRight(ranges, ranges.length - thresholds.length - 1);
                    if (ranges[ranges.length - 1] === '') {
                        ranges[ranges.length - 1] = defaultValue;
                    }
                    for (var i = thresholds.length; i > 0; i--) {
                        if (value >= thresholds[i - 1]) {
                            return ranges[i];
                        }
                    }
                    return lodash_1.default.first(ranges) || '';
                }
                return c;
            });
            exports_1("getMetricNameFromTaggedAlias", getMetricNameFromTaggedAlias = function (target) {
                target = target.trim();
                var _metricname = target;
                if (target.indexOf('{') > -1 && target.indexOf('}') > -1 && target[target.length - 1] === '}') {
                    _metricname = target.split('{')[0].trim();
                }
                else {
                    _metricname = target;
                }
                return _metricname;
            });
            exports_1("getLablesFromTaggedAlias", getLablesFromTaggedAlias = function (target, label) {
                var _tags = [];
                target = target.trim();
                var tagsstring = target.replace(label, '').trim();
                if (tagsstring.startsWith('{') && tagsstring.endsWith('}')) {
                    var parsePrometheusLabels = function (labels) {
                        var labelsByKey = {};
                        labels.replace(/\b(\w+)(!?=~?)"([^"\n]*?)"/g, function (__, key, operator, value) {
                            if (!operator) {
                                console.log(operator);
                            }
                            labelsByKey[key] = value;
                            return '';
                        });
                        return labelsByKey;
                    };
                    lodash_1.default.each(parsePrometheusLabels(tagsstring), function (k, v) {
                        _tags.push({ tag: v, value: k });
                    });
                    if (tagsstring.indexOf(':') > -1 && _tags.length === 0) {
                        var label_values = tagsstring
                            .slice(1)
                            .trim()
                            .slice(0, -1)
                            .trim() || '';
                        _tags = label_values
                            .split(',')
                            .map(function (item) { return (item || '').trim(); })
                            .filter(function (item) { return item && item.indexOf(':') > -1; })
                            .map(function (item) {
                            if (item.split(':').length === 2) {
                                var ret = {};
                                ret.tag = item.split(':')[0].trim();
                                ret.value = item.split(':')[1].trim();
                                return ret;
                            }
                            else {
                                return null;
                            }
                        })
                            .filter(function (item) { return item; });
                    }
                }
                return _tags;
            });
            exports_1("replace_tags_from_field", replace_tags_from_field = function (field, tags) {
                if (tags && tags.length > 0) {
                    field = tags.reduce(function (r, it) {
                        return r.replace(new RegExp('{{' + it.tag.trim() + '}}', 'g'), it.value).replace(/\"/g, '');
                    }, field);
                }
                return field;
            });
            exports_1("getSeriesValue", getSeriesValue = function (series, statType) {
                var value = NaN;
                statType = (statType || '').toLowerCase();
                if (series) {
                    if (statType === 'last_time' && series.datapoints && series.datapoints.length > 0) {
                        if (lodash_1.default.last(series.datapoints)) {
                            value = lodash_1.default.last(series.datapoints)[1];
                        }
                    }
                    else if (statType === 'last_time_nonnull') {
                        var non_null_data = series.datapoints.filter(function (s) { return s[0]; });
                        if (lodash_1.default.last(non_null_data) && lodash_1.default.last(non_null_data)[1]) {
                            value = lodash_1.default.last(non_null_data)[1];
                        }
                    }
                    else if (series.stats) {
                        value = series.stats[statType] !== undefined ? series.stats[statType] : null;
                    }
                }
                return value;
            });
            exports_1("getCurrentTimeStamp", getCurrentTimeStamp = function (dataPoints) {
                var currentTimeStamp = new Date();
                if (dataPoints && dataPoints.length > 0 && lodash_1.default.last(dataPoints).length === 2) {
                    currentTimeStamp = new Date(lodash_1.default.last(dataPoints)[1]);
                }
                return currentTimeStamp;
            });
            exports_1("replaceDelimitedColumns", replaceDelimitedColumns = function (inputstring, seriesName, delimiter, row_col_wrapper) {
                var outputString = seriesName.split(delimiter || '.').reduce(function (r, it, i) {
                    return r.replace(new RegExp(row_col_wrapper + i + row_col_wrapper, 'g'), it);
                }, inputstring);
                return outputString;
            });
            exports_1("getRowName", getRowName = function (row_name, delimiter, row_col_wrapper, seriesName, _metricname, _tags) {
                if (delimiter.toLowerCase() === 'tag') {
                    row_name = row_name.replace(new RegExp('{{metric_name}}', 'g'), _metricname);
                    row_name = replace_tags_from_field(row_name, _tags);
                }
                else {
                    row_name = replaceDelimitedColumns(row_name, seriesName, delimiter, row_col_wrapper);
                    if (seriesName.split(delimiter || '.').length === 1) {
                        row_name = seriesName;
                    }
                }
                return row_name.replace(new RegExp('_series_', 'g'), seriesName.toString());
            });
            exports_1("getColName", getColName = function (col_name, delimiter, row_col_wrapper, seriesName, row_name, _metricname, _tags) {
                if (delimiter.toLowerCase() === 'tag') {
                    col_name = col_name.replace(new RegExp('{{metric_name}}', 'g'), _metricname);
                    row_name = replace_tags_from_field(col_name, _tags);
                }
                else {
                    col_name = replaceDelimitedColumns(col_name, seriesName, delimiter, row_col_wrapper);
                    if (seriesName.split(delimiter || '.').length === 1 || row_name === seriesName) {
                        col_name = col_name || 'Value';
                    }
                }
                return col_name.replace(new RegExp('_series_', 'g'), seriesName.toString());
            });
            exports_1("getDisplayValueTemplate", getDisplayValueTemplate = function (value, pattern, seriesName, row_col_wrapper, thresholds) {
                var template = '_value_';
                if (lodash_1.default.isNaN(value) || value === null) {
                    template = pattern.null_value || 'No data';
                    if (pattern.null_value === '') {
                        template = '';
                    }
                }
                else {
                    template = pattern.displayTemplate || template;
                    if (pattern.enable_transform) {
                        var transform_values = pattern.transform_values.split('|');
                        template = getItemBasedOnThreshold(thresholds, transform_values, value, template);
                    }
                    if (pattern.enable_transform_overrides && pattern.transform_values_overrides !== '') {
                        var _transform_values_overrides = pattern.transform_values_overrides
                            .split('|')
                            .filter(function (con) { return con.indexOf('->'); })
                            .map(function (con) { return con.split('->'); })
                            .filter(function (con) { return +con[0] === value; })
                            .map(function (con) { return con[1]; });
                        if (_transform_values_overrides.length > 0 && _transform_values_overrides[0] !== '') {
                            template = ('' + _transform_values_overrides[0]).trim();
                        }
                    }
                    if (pattern.enable_transform || pattern.enable_transform_overrides) {
                        template = replaceDelimitedColumns(template, seriesName, pattern.delimiter, row_col_wrapper);
                    }
                }
                return template;
            });
            exports_1("doesValueNeedsToHide", doesValueNeedsToHide = function (value, filter) {
                var hidden = false;
                if ((value || value === 0) && filter && (filter.value_below !== '' || filter.value_above !== '')) {
                    if (filter.value_below !== '' && value < +filter.value_below) {
                        hidden = true;
                    }
                    if (filter.value_above !== '' && value > +filter.value_above) {
                        hidden = true;
                    }
                }
                return hidden;
            });
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9vbVV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcC9ib29tL0Jvb21VdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztZQUdBLDRCQUFhLGNBQWMsR0FBRyxVQUFVLEtBQWE7Z0JBQ25ELElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLE9BQU8sRUFBRTtvQkFDbkMsT0FBTyx5QkFBeUIsQ0FBQztpQkFDbEM7cUJBQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssUUFBUSxFQUFFO29CQUMzQyxPQUFPLDBCQUEwQixDQUFDO2lCQUNuQztxQkFBTSxJQUFJLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxLQUFLLEVBQUU7b0JBQ3hDLE9BQU8sd0JBQXdCLENBQUM7aUJBQ2pDO3FCQUFNO29CQUNMLE9BQU8sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUNyQjtZQUNILENBQUMsRUFBQztZQUNGLHVCQUFhLFNBQVMsR0FBRyxVQUFVLFdBQW1CO2dCQUNwRCxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtvQkFDakMsV0FBVyxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3ZFO3FCQUFNLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtvQkFDeEMsV0FBVyxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxD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fSBmcm9tICcuL0Jvb20uaW50ZXJmYWNlJztcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVDb2xvciA9IGZ1bmN0aW9uIChjb2xvcjogc3RyaW5nKSB7XHJcbiAgaWYgKGNvbG9yLnRvTG93ZXJDYXNlKCkgPT09ICdncmVlbicpIHtcclxuICAgIHJldHVybiAncmdiYSg1MCwgMTcyLCA0NSwgMC45NyknO1xyXG4gIH0gZWxzZSBpZiAoY29sb3IudG9Mb3dlckNhc2UoKSA9PT0gJ29yYW5nZScpIHtcclxuICAgIHJldHVybiAncmdiYSgyMzcsIDEyOSwgNDAsIDAuODkpJztcclxuICB9IGVsc2UgaWYgKGNvbG9yLnRvTG93ZXJDYXNlKCkgPT09ICdyZWQnKSB7XHJcbiAgICByZXR1cm4gJ3JnYmEoMjQ1LCA1NCwgNTQsIDAuOSknO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gY29sb3IudHJpbSgpO1xyXG4gIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IHBhcnNlTWF0aCA9IGZ1bmN0aW9uICh2YWx1ZXN0cmluZzogc3RyaW5nKTogbnVtYmVyIHtcclxuICBsZXQgcmV0dXJudmFsdWUgPSAwO1xyXG4gIGlmICh2YWx1ZXN0cmluZy5pbmRleE9mKCcrJykgPiAtMSkge1xyXG4gICAgcmV0dXJudmFsdWUgPSArdmFsdWVzdHJpbmcuc3BsaXQoJysnKVswXSArICt2YWx1ZXN0cmluZy5zcGxpdCgnKycpWzFdO1xyXG4gIH0gZWxzZSBpZiAodmFsdWVzdHJpbmcuaW5kZXhPZignLScpID4gLTEpIHtcclxuICAgIHJldHVybnZhbHVlID0gK3ZhbHVlc3RyaW5nLnNwbGl0KCctJylbMF0gLSArdmFsdWVzdHJpbmcuc3BsaXQoJy0nKVsxXTtcclxuICB9IGVsc2UgaWYgKHZhbHVlc3RyaW5nLmluZGV4T2YoJyonKSA+IC0xKSB7XHJcbiAgICByZXR1cm52YWx1ZSA9ICt2YWx1ZXN0cmluZy5zcGxpdCgnKicpWzBdICogK3ZhbHVlc3RyaW5nLnNwbGl0KCcqJylbMV07XHJcbiAgfSBlbHNlIGlmICh2YWx1ZXN0cmluZy5pbmRleE9mKCcvJykgPiAtMSkge1xyXG4gICAgcmV0dXJudmFsdWUgPSArdmFsdWVzdHJpbmcuc3BsaXQoJy8nKVswXSAvICt2YWx1ZXN0cmluZy5zcGxpdCgnLycpWzFdO1xyXG4gIH0gZWxzZSBpZiAodmFsdWVzdHJpbmcuaW5kZXhPZignbWluJykgPiAtMSkge1xyXG4gICAgcmV0dXJudmFsdWUgPSBfLm1pbihbK3ZhbHVlc3RyaW5nLnNwbGl0KCdtaW4nKVswXSwgK3ZhbHVlc3RyaW5nLnNwbGl0KCdtaW4nKVsxXV0pIHx8IDA7XHJcbiAgfSBlbHNlIGlmICh2YWx1ZXN0cmluZy5pbmRleE9mKCdtYXgnKSA+IC0xKSB7XHJcbiAgICByZXR1cm52YWx1ZSA9IF8ubWF4KFsrdmFsdWVzdHJpbmcuc3BsaXQoJ21heCcpWzBdLCArdmFsdWVzdHJpbmcuc3BsaXQoJ21heCcpWzFdXSkgfHwgMDtcclxuICB9IGVsc2UgaWYgKHZhbHVlc3RyaW5nLmluZGV4T2YoJ21lYW4nKSA+IC0xKSB7XHJcbiAgICByZXR1cm52YWx1ZSA9IF8ubWVhbihbK3ZhbHVlc3RyaW5nLnNwbGl0KCdhdmcnKVswXSwgK3ZhbHVlc3RyaW5nLnNwbGl0KCdhdmcnKVsxXV0pIHx8IDA7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybnZhbHVlID0gK3ZhbHVlc3RyaW5nO1xyXG4gIH1cclxuICByZXR1cm4gTWF0aC5yb3VuZCgrcmV0dXJudmFsdWUpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgcGFyc2VNYXRoRXhwcmVzc2lvbiA9IGZ1bmN0aW9uIChleHByZXNzaW9uOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xyXG4gIGxldCB2YWx1ZXN0cmluZyA9IGV4cHJlc3Npb24ucmVwbGFjZSgvXFxfL2csICcnKS5zcGxpdCgnLCcpW2luZGV4XTtcclxuICByZXR1cm4gK3BhcnNlTWF0aCh2YWx1ZXN0cmluZyk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRDb2xvciA9IGZ1bmN0aW9uIChleHByZXNzaW9uOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpIHtcclxuICBsZXQgcmV0dXJuVmFsdWUgPVxyXG4gICAgKGV4cHJlc3Npb24gfHwgJycpLnNwbGl0KCcsJykubGVuZ3RoID4gaW5kZXggPyBgIHN0eWxlPVwiY29sb3I6JHtub3JtYWxpemVDb2xvcihleHByZXNzaW9uLnJlcGxhY2UoL1xcXy9nLCAnJykuc3BsaXQoJywnKVtpbmRleF0pfVwiIGAgOiAnJztcclxuICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbn07XHJcbmV4cG9ydCBjb25zdCByZXBsYWNlVG9rZW5zID0gZnVuY3Rpb24gKHZhbHVlOiBzdHJpbmcpIHtcclxuICBpZiAoIXZhbHVlKSB7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG4gIHZhbHVlID0gdmFsdWUgKyAnJztcclxuICB2YWx1ZSA9IHZhbHVlXHJcbiAgICAuc3BsaXQoJyAnKVxyXG4gICAgLm1hcChhID0+IHtcclxuICAgICAgaWYgKGEuc3RhcnRzV2l0aCgnX2ZhLScpICYmIGEuZW5kc1dpdGgoJ18nKSkge1xyXG4gICAgICAgIGxldCByZXR1cm52YWx1ZSA9ICcnO1xyXG4gICAgICAgIGxldCBpY29uID0gYS5yZXBsYWNlKC9cXF8vZywgJycpLnNwbGl0KCcsJylbMF07XHJcbiAgICAgICAgbGV0IGNvbG9yID0gZ2V0Q29sb3IoYSwgMSk7XHJcbiAgICAgICAgbGV0IHJlcGVhdENvdW50ID0gYS5zcGxpdCgnLCcpLmxlbmd0aCA+PSAzID8gcGFyc2VNYXRoRXhwcmVzc2lvbihhLCAyKSA6IDE7XHJcbiAgICAgICAgcmV0dXJudmFsdWUgPSBgPGkgY2xhc3M9XCJmYSAke2ljb259XCIgJHtjb2xvcn0+PC9pPiBgLnJlcGVhdChyZXBlYXRDb3VudCk7XHJcbiAgICAgICAgaWYgKGEuc3BsaXQoJywnKS5sZW5ndGggPj0gNCkge1xyXG4gICAgICAgICAgbGV0IG1heENvbG9yID0gZ2V0Q29sb3IoYSwgMyk7XHJcbiAgICAgICAgICBsZXQgbWF4TGVuZ3RoID0gYS5zcGxpdCgnLCcpLmxlbmd0aCA+PSA1ID8gcGFyc2VNYXRoRXhwcmVzc2lvbihhLCA0KSA6IDA7XHJcbiAgICAgICAgICByZXR1cm52YWx1ZSArPSBgPGkgY2xhc3M9XCJmYSAke2ljb259XCIgJHttYXhDb2xvcn0+PC9pPiBgLnJlcGVhdChfLm1heChbbWF4TGVuZ3RoIC0gcmVwZWF0Q291bnQsIDBdKSB8fCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldHVybnZhbHVlO1xyXG4gICAgICB9IGVsc2UgaWYgKGEuc3RhcnRzV2l0aCgnX2ltZy0nKSAmJiBhLmVuZHNXaXRoKCdfJykpIHtcclxuICAgICAgICBhID0gYS5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgbGV0IGltZ1VybCA9IGEucmVwbGFjZSgnX2ltZy0nLCAnJykuc3BsaXQoJywnKVswXTtcclxuICAgICAgICBsZXQgaW1nV2lkdGggPSBhLnNwbGl0KCcsJykubGVuZ3RoID4gMSA/IGEucmVwbGFjZSgnX2ltZy0nLCAnJykuc3BsaXQoJywnKVsxXSA6ICcyMHB4JztcclxuICAgICAgICBsZXQgaW1nSGVpZ2h0ID0gYS5zcGxpdCgnLCcpLmxlbmd0aCA+IDIgPyBhLnJlcGxhY2UoJ19pbWctJywgJycpLnNwbGl0KCcsJylbMl0gOiAnMjBweCc7XHJcbiAgICAgICAgbGV0IHJlcGVhdENvdW50ID0gYS5zcGxpdCgnLCcpLmxlbmd0aCA+IDMgPyArYS5yZXBsYWNlKCdfaW1nLScsICcnKS5zcGxpdCgnLCcpWzNdIDogMTtcclxuICAgICAgICBhID0gYDxpbWcgd2lkdGg9XCIke2ltZ1dpZHRofVwiIGhlaWdodD1cIiR7aW1nSGVpZ2h0fVwiIHNyYz1cIiR7aW1nVXJsfVwiLz5gLnJlcGVhdChyZXBlYXRDb3VudCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGE7XHJcbiAgICB9KVxyXG4gICAgLmpvaW4oJyAnKTtcclxuICByZXR1cm4gdmFsdWU7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRBY3R1YWxOYW1lV2l0aG91dFRva2VucyA9IGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgaWYgKCF2YWx1ZSkge1xyXG4gICAgcmV0dXJuIHZhbHVlICsgJyc7XHJcbiAgfVxyXG4gIHZhbHVlID0gdmFsdWUgKyAnJztcclxuICByZXR1cm4gdmFsdWVcclxuICAgIC5zcGxpdCgnICcpXHJcbiAgICAubWFwKGEgPT4ge1xyXG4gICAgICBpZiAoYS5zdGFydHNXaXRoKCdfZmEtJykgJiYgYS5lbmRzV2l0aCgnXycpKSB7XHJcbiAgICAgICAgYSA9IGBgO1xyXG4gICAgICB9IGVsc2UgaWYgKGEuc3RhcnRzV2l0aCgnX2ltZy0nKSAmJiBhLmVuZHNXaXRoKCdfJykpIHtcclxuICAgICAgICBhID0gYGA7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGE7XHJcbiAgICB9KVxyXG4gICAgLmpvaW4oJyAnKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldEl0ZW1CYXNlZE9uVGhyZXNob2xkID0gZnVuY3Rpb24gKHRocmVzaG9sZHM6IGFueVtdLCByYW5nZXM6IGFueSwgdmFsdWU6IG51bWJlciwgZGVmYXVsdFZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGxldCBjID0gZGVmYXVsdFZhbHVlO1xyXG4gIGlmICh0aHJlc2hvbGRzICYmIHJhbmdlcyAmJiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmIHRocmVzaG9sZHMubGVuZ3RoICsgMSA8PSByYW5nZXMubGVuZ3RoKSB7XHJcbiAgICByYW5nZXMgPSBfLmRyb3BSaWdodChyYW5nZXMsIHJhbmdlcy5sZW5ndGggLSB0aHJlc2hvbGRzLmxlbmd0aCAtIDEpO1xyXG4gICAgaWYgKHJhbmdlc1tyYW5nZXMubGVuZ3RoIC0gMV0gPT09ICcnKSB7XHJcbiAgICAgIHJhbmdlc1tyYW5nZXMubGVuZ3RoIC0gMV0gPSBkZWZhdWx0VmFsdWU7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBpID0gdGhyZXNob2xkcy5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcclxuICAgICAgaWYgKHZhbHVlID49IHRocmVzaG9sZHNbaSAtIDFdKSB7XHJcbiAgICAgICAgcmV0dXJuIHJhbmdlc1tpXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIF8uZmlyc3QocmFuZ2VzKSB8fCAnJztcclxuICB9XHJcbiAgcmV0dXJuIGM7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRNZXRyaWNOYW1lRnJvbVRhZ2dlZEFsaWFzID0gZnVuY3Rpb24gKHRhcmdldCk6IHN0cmluZyB7XHJcbiAgdGFyZ2V0ID0gdGFyZ2V0LnRyaW0oKTtcclxuICBsZXQgX21ldHJpY25hbWUgPSB0YXJnZXQ7XHJcbiAgaWYgKHRhcmdldC5pbmRleE9mKCd7JykgPiAtMSAmJiB0YXJnZXQuaW5kZXhPZignfScpID4gLTEgJiYgdGFyZ2V0W3RhcmdldC5sZW5ndGggLSAxXSA9PT0gJ30nKSB7XHJcbiAgICBfbWV0cmljbmFtZSA9IHRhcmdldC5zcGxpdCgneycpWzBdLnRyaW0oKTtcclxuICB9IGVsc2Uge1xyXG4gICAgX21ldHJpY25hbWUgPSB0YXJnZXQ7XHJcbiAgfVxyXG4gIHJldHVybiBfbWV0cmljbmFtZTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldExhYmxlc0Zyb21UYWdnZWRBbGlhcyA9IGZ1bmN0aW9uICh0YXJnZXQsIGxhYmVsKTogYW55W10ge1xyXG4gIGxldCBfdGFnczogYW55W10gPSBbXTtcclxuICB0YXJnZXQgPSB0YXJnZXQudHJpbSgpO1xyXG4gIGxldCB0YWdzc3RyaW5nID0gdGFyZ2V0LnJlcGxhY2UobGFiZWwsICcnKS50cmltKCk7XHJcbiAgaWYgKHRhZ3NzdHJpbmcuc3RhcnRzV2l0aCgneycpICYmIHRhZ3NzdHJpbmcuZW5kc1dpdGgoJ30nKSkge1xyXG4gICAgLy8gU25pcHBldCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9ncmFmYW5hL2dyYWZhbmEvYmxvYi8zZjE1MTcwOTE0YzMxODllZTc4MzVmMGIxOWZmNTAwZGIxMTNhZjczL3BhY2thZ2VzL2dyYWZhbmEtZGF0YS9zcmMvdXRpbHMvbGFiZWxzLnRzXHJcbiAgICBjb25zdCBwYXJzZVByb21ldGhldXNMYWJlbHMgPSBmdW5jdGlvbiAobGFiZWxzOiBzdHJpbmcpIHtcclxuICAgICAgY29uc3QgbGFiZWxzQnlLZXk6IGFueSA9IHt9O1xyXG4gICAgICBsYWJlbHMucmVwbGFjZSgvXFxiKFxcdyspKCE/PX4/KVwiKFteXCJcXG5dKj8pXCIvZywgKF9fLCBrZXksIG9wZXJhdG9yLCB2YWx1ZSkgPT4ge1xyXG4gICAgICAgIGlmICghb3BlcmF0b3IpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKG9wZXJhdG9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGFiZWxzQnlLZXlba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBsYWJlbHNCeUtleTtcclxuICAgIH07XHJcbiAgICBfLmVhY2gocGFyc2VQcm9tZXRoZXVzTGFiZWxzKHRhZ3NzdHJpbmcpLCAoazogc3RyaW5nLCB2OiBzdHJpbmcpID0+IHtcclxuICAgICAgX3RhZ3MucHVzaCh7IHRhZzogdiwgdmFsdWU6IGsgfSk7XHJcbiAgICB9KTtcclxuICAgIGlmICh0YWdzc3RyaW5nLmluZGV4T2YoJzonKSA+IC0xICYmIF90YWdzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBsZXQgbGFiZWxfdmFsdWVzID1cclxuICAgICAgICB0YWdzc3RyaW5nXHJcbiAgICAgICAgICAuc2xpY2UoMSlcclxuICAgICAgICAgIC50cmltKClcclxuICAgICAgICAgIC5zbGljZSgwLCAtMSlcclxuICAgICAgICAgIC50cmltKCkgfHwgJyc7XHJcbiAgICAgIF90YWdzID0gbGFiZWxfdmFsdWVzXHJcbiAgICAgICAgLnNwbGl0KCcsJylcclxuICAgICAgICAubWFwKGl0ZW0gPT4gKGl0ZW0gfHwgJycpLnRyaW0oKSlcclxuICAgICAgICAuZmlsdGVyKGl0ZW0gPT4gaXRlbSAmJiBpdGVtLmluZGV4T2YoJzonKSA+IC0xKVxyXG4gICAgICAgIC5tYXAoaXRlbSA9PiB7XHJcbiAgICAgICAgICBpZiAoaXRlbS5zcGxpdCgnOicpLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICBsZXQgcmV0OiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgcmV0LnRhZyA9IGl0ZW0uc3BsaXQoJzonKVswXS50cmltKCk7XHJcbiAgICAgICAgICAgIHJldC52YWx1ZSA9IGl0ZW0uc3BsaXQoJzonKVsxXS50cmltKCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5maWx0ZXIoaXRlbSA9PiBpdGVtKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIF90YWdzO1xyXG59O1xyXG5leHBvcnQgY29uc3QgcmVwbGFjZV90YWdzX2Zyb21fZmllbGQgPSBmdW5jdGlvbiAoZmllbGQ6IHN0cmluZywgdGFnczogYW55W10pOiBzdHJpbmcge1xyXG4gIGlmICh0YWdzICYmIHRhZ3MubGVuZ3RoID4gMCkge1xyXG4gICAgZmllbGQgPSB0YWdzLnJlZHVjZSgociwgaXQpID0+IHtcclxuICAgICAgcmV0dXJuIHIucmVwbGFjZShuZXcgUmVnRXhwKCd7eycgKyBpdC50YWcudHJpbSgpICsgJ319JywgJ2cnKSwgaXQudmFsdWUpLnJlcGxhY2UoL1xcXCIvZywgJycpO1xyXG4gICAgfSwgZmllbGQpO1xyXG4gIH1cclxuICByZXR1cm4gZmllbGQ7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRTZXJpZXNWYWx1ZSA9IGZ1bmN0aW9uIChzZXJpZXM6IGFueSwgc3RhdFR5cGU6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgbGV0IHZhbHVlID0gTmFOO1xyXG4gIHN0YXRUeXBlID0gKHN0YXRUeXBlIHx8ICcnKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGlmIChzZXJpZXMpIHtcclxuICAgIGlmIChzdGF0VHlwZSA9PT0gJ2xhc3RfdGltZScgJiYgc2VyaWVzLmRhdGFwb2ludHMgJiYgc2VyaWVzLmRhdGFwb2ludHMubGVuZ3RoID4gMCkge1xyXG4gICAgICBpZiAoXy5sYXN0KHNlcmllcy5kYXRhcG9pbnRzKSkge1xyXG4gICAgICAgIHZhbHVlID0gXy5sYXN0KHNlcmllcy5kYXRhcG9pbnRzKVsxXTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChzdGF0VHlwZSA9PT0gJ2xhc3RfdGltZV9ub25udWxsJykge1xyXG4gICAgICBsZXQgbm9uX251bGxfZGF0YSA9IHNlcmllcy5kYXRhcG9pbnRzLmZpbHRlcihzID0+IHNbMF0pO1xyXG4gICAgICBpZiAoXy5sYXN0KG5vbl9udWxsX2RhdGEpICYmIF8ubGFzdChub25fbnVsbF9kYXRhKVsxXSkge1xyXG4gICAgICAgIHZhbHVlID0gXy5sYXN0KG5vbl9udWxsX2RhdGEpWzFdO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHNlcmllcy5zdGF0cykge1xyXG4gICAgICB2YWx1ZSA9IHNlcmllcy5zdGF0c1tzdGF0VHlwZV0gIT09IHVuZGVmaW5lZCA/IHNlcmllcy5zdGF0c1tzdGF0VHlwZV0gOiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdmFsdWU7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRDdXJyZW50VGltZVN0YW1wID0gZnVuY3Rpb24gKGRhdGFQb2ludHM6IGFueVtdKTogRGF0ZSB7XHJcbiAgbGV0IGN1cnJlbnRUaW1lU3RhbXAgPSBuZXcgRGF0ZSgpO1xyXG4gIGlmIChkYXRhUG9pbnRzICYmIGRhdGFQb2ludHMubGVuZ3RoID4gMCAmJiBfLmxhc3QoZGF0YVBvaW50cykubGVuZ3RoID09PSAyKSB7XHJcbiAgICBjdXJyZW50VGltZVN0YW1wID0gbmV3IERhdGUoXy5sYXN0KGRhdGFQb2ludHMpWzFdKTtcclxuICB9XHJcbiAgcmV0dXJuIGN1cnJlbnRUaW1lU3RhbXA7XHJcbn07XHJcbmV4cG9ydCBjb25zdCByZXBsYWNlRGVsaW1pdGVkQ29sdW1ucyA9IGZ1bmN0aW9uIChpbnB1dHN0cmluZzogc3RyaW5nLCBzZXJpZXNOYW1lOiBzdHJpbmcsIGRlbGltaXRlcjogc3RyaW5nLCByb3dfY29sX3dyYXBwZXI6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgbGV0IG91dHB1dFN0cmluZyA9IHNlcmllc05hbWUuc3BsaXQoZGVsaW1pdGVyIHx8ICcuJykucmVkdWNlKChyLCBpdCwgaSkgPT4ge1xyXG4gICAgcmV0dXJuIHIucmVwbGFjZShuZXcgUmVnRXhwKHJvd19jb2xfd3JhcHBlciArIGkgKyByb3dfY29sX3dyYXBwZXIsICdnJyksIGl0KTtcclxuICB9LCBpbnB1dHN0cmluZyk7XHJcbiAgcmV0dXJuIG91dHB1dFN0cmluZztcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldFJvd05hbWUgPSBmdW5jdGlvbiAoXHJcbiAgcm93X25hbWU6IHN0cmluZyxcclxuICBkZWxpbWl0ZXI6IHN0cmluZyxcclxuICByb3dfY29sX3dyYXBwZXI6IHN0cmluZyxcclxuICBzZXJpZXNOYW1lOiBzdHJpbmcsXHJcbiAgX21ldHJpY25hbWU6IHN0cmluZyxcclxuICBfdGFnczogYW55W11cclxuKTogc3RyaW5nIHtcclxuICBpZiAoZGVsaW1pdGVyLnRvTG93ZXJDYXNlKCkgPT09ICd0YWcnKSB7XHJcbiAgICByb3dfbmFtZSA9IHJvd19uYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgne3ttZXRyaWNfbmFtZX19JywgJ2cnKSwgX21ldHJpY25hbWUpO1xyXG4gICAgcm93X25hbWUgPSByZXBsYWNlX3RhZ3NfZnJvbV9maWVsZChyb3dfbmFtZSwgX3RhZ3MpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByb3dfbmFtZSA9IHJlcGxhY2VEZWxpbWl0ZWRDb2x1bW5zKHJvd19uYW1lLCBzZXJpZXNOYW1lLCBkZWxpbWl0ZXIsIHJvd19jb2xfd3JhcHBlcik7XHJcbiAgICBpZiAoc2VyaWVzTmFtZS5zcGxpdChkZWxpbWl0ZXIgfHwgJy4nKS5sZW5ndGggPT09IDEpIHtcclxuICAgICAgcm93X25hbWUgPSBzZXJpZXNOYW1lO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gcm93X25hbWUucmVwbGFjZShuZXcgUmVnRXhwKCdfc2VyaWVzXycsICdnJyksIHNlcmllc05hbWUudG9TdHJpbmcoKSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRDb2xOYW1lID0gZnVuY3Rpb24gKFxyXG4gIGNvbF9uYW1lOiBzdHJpbmcsXHJcbiAgZGVsaW1pdGVyOiBzdHJpbmcsXHJcbiAgcm93X2NvbF93cmFwcGVyOiBzdHJpbmcsXHJcbiAgc2VyaWVzTmFtZTogc3RyaW5nLFxyXG4gIHJvd19uYW1lOiBzdHJpbmcsXHJcbiAgX21ldHJpY25hbWU6IHN0cmluZyxcclxuICBfdGFnczogYW55W11cclxuKTogc3RyaW5nIHtcclxuICBpZiAoZGVsaW1pdGVyLnRvTG93ZXJDYXNlKCkgPT09ICd0YWcnKSB7XHJcbiAgICBjb2xfbmFtZSA9IGNvbF9uYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgne3ttZXRyaWNfbmFtZX19JywgJ2cnKSwgX21ldHJpY25hbWUpO1xyXG4gICAgcm93X25hbWUgPSByZXBsYWNlX3RhZ3NfZnJvbV9maWVsZChjb2xfbmFtZSwgX3RhZ3MpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb2xfbmFtZSA9IHJlcGxhY2VEZWxpbWl0ZWRDb2x1bW5zKGNvbF9uYW1lLCBzZXJpZXNOYW1lLCBkZWxpbWl0ZXIsIHJvd19jb2xfd3JhcHBlcik7XHJcbiAgICBpZiAoc2VyaWVzTmFtZS5zcGxpdChkZWxpbWl0ZXIgfHwgJy4nKS5sZW5ndGggPT09IDEgfHwgcm93X25hbWUgPT09IHNlcmllc05hbWUpIHtcclxuICAgICAgY29sX25hbWUgPSBjb2xfbmFtZSB8fCAnVmFsdWUnO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gY29sX25hbWUucmVwbGFjZShuZXcgUmVnRXhwKCdfc2VyaWVzXycsICdnJyksIHNlcmllc05hbWUudG9TdHJpbmcoKSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXREaXNwbGF5VmFsdWVUZW1wbGF0ZSA9IGZ1bmN0aW9uIChcclxuICB2YWx1ZTogbnVtYmVyLFxyXG4gIHBhdHRlcm46IElCb29tUGF0dGVybixcclxuICBzZXJpZXNOYW1lOiBzdHJpbmcsXHJcbiAgcm93X2NvbF93cmFwcGVyOiBzdHJpbmcsXHJcbiAgdGhyZXNob2xkczogYW55W11cclxuKTogc3RyaW5nIHtcclxuICBsZXQgdGVtcGxhdGUgPSAnX3ZhbHVlXyc7XHJcbiAgaWYgKF8uaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBudWxsKSB7XHJcbiAgICB0ZW1wbGF0ZSA9IHBhdHRlcm4ubnVsbF92YWx1ZSB8fCAnTm8gZGF0YSc7XHJcbiAgICBpZiAocGF0dGVybi5udWxsX3ZhbHVlID09PSAnJykge1xyXG4gICAgICB0ZW1wbGF0ZSA9ICcnO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICB0ZW1wbGF0ZSA9IHBhdHRlcm4uZGlzcGxheVRlbXBsYXRlIHx8IHRlbXBsYXRlO1xyXG4gICAgaWYgKHBhdHRlcm4uZW5hYmxlX3RyYW5zZm9ybSkge1xyXG4gICAgICBsZXQgdHJhbnNmb3JtX3ZhbHVlcyA9IHBhdHRlcm4udHJhbnNmb3JtX3ZhbHVlcy5zcGxpdCgnfCcpO1xyXG4gICAgICB0ZW1wbGF0ZSA9IGdldEl0ZW1CYXNlZE9uVGhyZXNob2xkKHRocmVzaG9sZHMsIHRyYW5zZm9ybV92YWx1ZXMsIHZhbHVlLCB0ZW1wbGF0ZSk7XHJcbiAgICB9XHJcbiAgICBpZiAocGF0dGVybi5lbmFibGVfdHJhbnNmb3JtX292ZXJyaWRlcyAmJiBwYXR0ZXJuLnRyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzICE9PSAnJykge1xyXG4gICAgICBsZXQgX3RyYW5zZm9ybV92YWx1ZXNfb3ZlcnJpZGVzID0gcGF0dGVybi50cmFuc2Zvcm1fdmFsdWVzX292ZXJyaWRlc1xyXG4gICAgICAgIC5zcGxpdCgnfCcpXHJcbiAgICAgICAgLmZpbHRlcihjb24gPT4gY29uLmluZGV4T2YoJy0+JykpXHJcbiAgICAgICAgLm1hcChjb24gPT4gY29uLnNwbGl0KCctPicpKVxyXG4gICAgICAgIC5maWx0ZXIoY29uID0+ICtjb25bMF0gPT09IHZhbHVlKVxyXG4gICAgICAgIC5tYXAoY29uID0+IGNvblsxXSk7XHJcbiAgICAgIGlmIChfdHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXMubGVuZ3RoID4gMCAmJiBfdHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXNbMF0gIT09ICcnKSB7XHJcbiAgICAgICAgdGVtcGxhdGUgPSAoJycgKyBfdHJhbnNmb3JtX3ZhbHVlc19vdmVycmlkZXNbMF0pLnRyaW0oKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHBhdHRlcm4uZW5hYmxlX3RyYW5zZm9ybSB8fCBwYXR0ZXJuLmVuYWJsZV90cmFuc2Zvcm1fb3ZlcnJpZGVzKSB7XHJcbiAgICAgIHRlbXBsYXRlID0gcmVwbGFjZURlbGltaXRlZENvbHVtbnModGVtcGxhdGUsIHNlcmllc05hbWUsIHBhdHRlcm4uZGVsaW1pdGVyLCByb3dfY29sX3dyYXBwZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdGVtcGxhdGU7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkb2VzVmFsdWVOZWVkc1RvSGlkZSA9IGZ1bmN0aW9uICh2YWx1ZTogbnVtYmVyLCBmaWx0ZXI6IGFueSk6IGJvb2xlYW4ge1xyXG4gIGxldCBoaWRkZW4gPSBmYWxzZTtcclxuICBpZiAoKHZhbHVlIHx8IHZhbHVlID09PSAwKSAmJiBmaWx0ZXIgJiYgKGZpbHRlci52YWx1ZV9iZWxvdyAhPT0gJycgfHwgZmlsdGVyLnZhbHVlX2Fib3ZlICE9PSAnJykpIHtcclxuICAgIGlmIChmaWx0ZXIudmFsdWVfYmVsb3cgIT09ICcnICYmIHZhbHVlIDwgK2ZpbHRlci52YWx1ZV9iZWxvdykge1xyXG4gICAgICBoaWRkZW4gPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKGZpbHRlci52YWx1ZV9hYm92ZSAhPT0gJycgJiYgdmFsdWUgPiArZmlsdGVyLnZhbHVlX2Fib3ZlKSB7XHJcbiAgICAgIGhpZGRlbiA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBoaWRkZW47XHJcbn07XHJcbiJdfQ==