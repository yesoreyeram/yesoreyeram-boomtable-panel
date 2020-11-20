import _ from 'lodash';
import { getDecimalsForValue, DecimalCount, getValueFormat } from "@grafana/data";

const get_formatted_value = function (value: number, decimals: DecimalCount, format: any): string {
  if (!isNaN(value)) {
    let decimalInfo: any = getDecimalsForValue(value, decimals);
    let formatFunc = getValueFormat(format);
    return formatFunc(value, decimalInfo.decimals, decimalInfo.scaledDecimals).text;
  } else {
    let formatFunc = getValueFormat(format);
    return formatFunc(value).text
  }
};

export { get_formatted_value, getDecimalsForValue };
