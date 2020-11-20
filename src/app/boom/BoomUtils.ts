import _ from 'lodash';
import { IBoomPattern } from './Boom.interface';
import { TimeSeriesStats } from './../TimeSeriesStats';

export const normalizeColor = function (color: string) {
  if (color.toLowerCase() === 'green') {
    return 'rgba(50, 172, 45, 0.97)';
  } else if (color.toLowerCase() === 'orange') {
    return 'rgba(237, 129, 40, 0.89)';
  } else if (color.toLowerCase() === 'red') {
    return 'rgba(245, 54, 54, 0.9)';
  } else {
    return color.trim();
  }
};
export const parseMath = function (valueString: string): number {
  let returnValue = 0;
  if (valueString.indexOf('+') > -1) {
    returnValue = +valueString.split('+')[0] + +valueString.split('+')[1];
  } else if (valueString.indexOf('-') > -1) {
    returnValue = +valueString.split('-')[0] - +valueString.split('-')[1];
  } else if (valueString.indexOf('*') > -1) {
    returnValue = +valueString.split('*')[0] * +valueString.split('*')[1];
  } else if (valueString.indexOf('/') > -1) {
    returnValue = +valueString.split('/')[0] / +valueString.split('/')[1];
  } else if (valueString.indexOf('min') > -1) {
    returnValue = _.min([+valueString.split('min')[0], +valueString.split('min')[1]]) || 0;
  } else if (valueString.indexOf('max') > -1) {
    returnValue = _.max([+valueString.split('max')[0], +valueString.split('max')[1]]) || 0;
  } else if (valueString.indexOf('mean') > -1) {
    returnValue = _.mean([+valueString.split('avg')[0], +valueString.split('avg')[1]]) || 0;
  } else {
    returnValue = +valueString;
  }
  return Math.round(+returnValue);
};
export const parseMathExpression = function (expression: string, index: number): number {
  let valueString = expression.replace(/\_/g, '').split(',')[index];
  return +parseMath(valueString);
};
export const getColor = function (expression: string, index: number) {
  let returnValue =
    (expression || '').split(',').length > index ? ` style="color:${normalizeColor(expression.replace(/\_/g, '').split(',')[index])}" ` : '';
  return returnValue;
};
export const replaceTokens = function (value: string) {
  if (!value) {
    return value;
  }
  value = value + '';
  value = value
    .split(' ')
    .map(a => {
      if (a.startsWith('_fa-') && a.endsWith('_')) {
        let returnValue = '';
        let icon = a.replace(/\_/g, '').split(',')[0];
        let color = getColor(a, 1);
        let repeatCount = a.split(',').length >= 3 ? parseMathExpression(a, 2) : 1;
        returnValue = `<i class="fa ${icon}" ${color}></i> `.repeat(repeatCount);
        if (a.split(',').length >= 4) {
          let maxColor = getColor(a, 3);
          let maxLength = a.split(',').length >= 5 ? parseMathExpression(a, 4) : 0;
          returnValue += `<i class="fa ${icon}" ${maxColor}></i> `.repeat(_.max([maxLength - repeatCount, 0]) || 0);
        }
        return returnValue;
      } else if (a.startsWith('_img-') && a.endsWith('_')) {
        a = a.slice(0, -1);
        let imgUrl = a.replace('_img-', '').split(',')[0];
        let imgWidth = a.split(',').length > 1 ? a.replace('_img-', '').split(',')[1] : '20px';
        let imgHeight = a.split(',').length > 2 ? a.replace('_img-', '').split(',')[2] : '20px';
        let repeatCount = a.split(',').length > 3 ? +a.replace('_img-', '').split(',')[3] : 1;
        a = `<img width="${imgWidth}" height="${imgHeight}" src="${imgUrl}"/>`.repeat(repeatCount);
      }
      return a;
    })
    .join(' ');
  return value;
};
export const getActualNameWithoutTokens = function (value: string) {
  if (!value) {
    return value + '';
  }
  value = value + '';
  return value
    .split(' ')
    .map(a => {
      if (a.startsWith('_fa-') && a.endsWith('_')) {
        a = ``;
      } else if (a.startsWith('_img-') && a.endsWith('_')) {
        a = ``;
      }
      return a;
    })
    .join(' ');
};
export const getItemBasedOnThreshold = function (thresholds: any[], ranges: any, value: number, defaultValue: string): string {
  let c = defaultValue;
  if (thresholds && ranges && typeof value === 'number' && thresholds.length + 1 <= ranges.length) {
    ranges = _.dropRight(ranges, ranges.length - thresholds.length - 1);
    if (ranges[ranges.length - 1] === '') {
      ranges[ranges.length - 1] = defaultValue;
    }
    for (let i = thresholds.length; i > 0; i--) {
      if (value >= thresholds[i - 1]) {
        return ranges[i];
      }
    }
    return _.first(ranges) || '';
  }
  return c;
};
export const getMetricNameFromTaggedAlias = function (target: string): string {
  target = target.trim();
  let _metricName = target;
  if (target.indexOf('{') > -1 && target.indexOf('}') > -1 && target[target.length - 1] === '}') {
    _metricName = target.split('{')[0].trim();
  } else {
    _metricName = target;
  }
  return _metricName;
};
export const getLabelsFromTaggedAlias = function (target: string, label: string): any[] {
  let _tags: any[] = [];
  target = target.trim();
  let tagsString = target.replace(label, '').trim();
  if (tagsString.startsWith('{') && tagsString.endsWith('}')) {
    // Snippet from https://github.com/grafana/grafana/blob/3f15170914c3189ee7835f0b19ff500db113af73/packages/grafana-data/src/utils/labels.ts
    const parsePrometheusLabels = function (labels: string) {
      const labelsByKey: any = {};
      labels.replace(/\b(\w+)(!?=~?)"([^"\n]*?)"/g, (__, key, operator, value) => {
        if (!operator) {
          console.log(operator);
        }
        labelsByKey[key] = value;
        return '';
      });
      return labelsByKey;
    };
    _.each(parsePrometheusLabels(tagsString), (k: string, v: string) => {
      _tags.push({ tag: v, value: k });
    });
    if (tagsString.indexOf(':') > -1 && _tags.length === 0) {
      let label_values =
        tagsString
          .slice(1)
          .trim()
          .slice(0, -1)
          .trim() || '';
      _tags = label_values
        .split(',')
        .map(item => (item || '').trim())
        .filter(item => item && item.indexOf(':') > -1)
        .map(item => {
          if (item.split(':').length === 2) {
            let ret: any = {};
            ret.tag = item.split(':')[0].trim();
            ret.value = item.split(':')[1].trim();
            return ret;
          } else {
            return null;
          }
        })
        .filter(item => item);
    }
  }
  return _tags;
};
export const replace_tags_from_field = function (field: string, tags: any[]): string {
  if (tags && tags.length > 0) {
    field = tags.reduce((r, it) => {
      return r.replace(new RegExp('{{' + it.tag.trim() + '}}', 'g'), it.value).replace(/\"/g, '');
    }, field);
  }
  return field;
};
export const getSeriesValue = function (series: any, statType: string): any {
  let stats = new TimeSeriesStats(series.datapoints)
  switch (statType.toLowerCase()) {
    case "min":
      return stats.min;
    case "max":
      return stats.max;
    case "avg":
      return stats.avg;
    case "last":
    case "current":
      return stats.current;
    case "total":
    case "sum":
      return stats.total;
    case "last_time":
      return stats.last_time;
    case "last_time_nonnull":
      return stats.last_time_nonnull;
    default:
      return null;
  }
};
export const getCurrentTimeStamp = function (dataPoints: any[]): Date {
  let currentTimeStamp = new Date();
  if (dataPoints && dataPoints.length > 0 && _.last(dataPoints).length === 2) {
    currentTimeStamp = new Date(_.last(dataPoints)[1]);
  }
  return currentTimeStamp;
};
export const replaceDelimitedColumns = function (inputString: string, seriesName: string, delimiter: string, row_col_wrapper: string): string {
  let outputString = seriesName.split(delimiter || '.').reduce((r, it, i) => {
    return r.replace(new RegExp(row_col_wrapper + i + row_col_wrapper, 'g'), it);
  }, inputString);
  return outputString;
};
export const getRowName = function (
  row_name: string,
  delimiter: string,
  row_col_wrapper: string,
  seriesName: string,
  _metricName: string,
  _tags: any[]
): string {
  if (delimiter.toLowerCase() === 'tag') {
    row_name = row_name.replace(new RegExp('{{metric_name}}', 'g'), _metricName);
    row_name = replace_tags_from_field(row_name, _tags);
  } else {
    row_name = replaceDelimitedColumns(row_name, seriesName, delimiter, row_col_wrapper);
    if (seriesName.split(delimiter || '.').length === 1) {
      row_name = seriesName;
    }
  }
  return row_name.replace(new RegExp('_series_', 'g'), seriesName.toString());
};
export const getColName = function (
  col_name: string,
  delimiter: string,
  row_col_wrapper: string,
  seriesName: string,
  row_name: string,
  _metricName: string,
  _tags: any[]
): string {
  if (delimiter.toLowerCase() === 'tag') {
    col_name = col_name.replace(new RegExp('{{metric_name}}', 'g'), _metricName);
    row_name = replace_tags_from_field(col_name, _tags);
  } else {
    col_name = replaceDelimitedColumns(col_name, seriesName, delimiter, row_col_wrapper);
    if (seriesName.split(delimiter || '.').length === 1 || row_name === seriesName) {
      col_name = col_name || 'Value';
    }
  }
  return col_name.replace(new RegExp('_series_', 'g'), seriesName.toString());
};
export const getDisplayValueTemplate = function (
  value: number,
  pattern: IBoomPattern,
  seriesName: string,
  row_col_wrapper: string,
  thresholds: any[]
): string {
  let template = '_value_';
  if (_.isNaN(value) || value === null) {
    template = pattern.null_value || 'No data';
    if (pattern.null_value === '') {
      template = '';
    }
  } else {
    template = pattern.displayTemplate || template;
    if (pattern.enable_transform) {
      let transform_values = pattern.transform_values.split('|');
      template = getItemBasedOnThreshold(thresholds, transform_values, value, template);
    }
    if (pattern.enable_transform_overrides && pattern.transform_values_overrides !== '') {
      let _transform_values_overrides = pattern.transform_values_overrides
        .split('|')
        .filter(con => con.indexOf('->'))
        .map(con => con.split('->'))
        .filter(con => +con[0] === value)
        .map(con => con[1]);
      if (_transform_values_overrides.length > 0 && _transform_values_overrides[0] !== '') {
        template = ('' + _transform_values_overrides[0]).trim();
      }
    }
    if (pattern.enable_transform || pattern.enable_transform_overrides) {
      template = replaceDelimitedColumns(template, seriesName, pattern.delimiter, row_col_wrapper);
    }
  }
  return template;
};
export const doesValueNeedsToHide = function (value: number, filter: any): boolean {
  let hidden = false;
  if ((value || value === 0) && filter && (filter.value_below !== '' || filter.value_above !== '')) {
    if (filter.value_below !== '' && value < +filter.value_below) {
      hidden = true;
    }
    if (filter.value_above !== '' && value > +filter.value_above) {
      hidden = true;
    }
  }
  return hidden;
};
