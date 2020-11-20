import _ from "lodash";
import { TimeSeriesPoints } from "@grafana/data";
export class TimeSeriesStats {
    min: number | null | undefined = null;
    max: number | null | undefined = null;
    avg: number | null | undefined = null;
    current: number | null | undefined = null;
    total: number | null | undefined = null;
    last_time: number | null | undefined = null;
    last_time_nonnull: number | null | undefined = null;
    constructor(datapoints: TimeSeriesPoints) {
        this.min = _.min(datapoints.map(d => d[0]));
        this.max = _.max(datapoints.map(d => d[0]));
        this.avg = _.mean(datapoints.map(d => d[0]));
        this.current = _.last(datapoints.map(d => d[0]));
        this.total = _.sum(datapoints.map(d => d[0]));
        this.last_time = _.last(datapoints.map(d => d[1]));
        this.last_time_nonnull = _.last(datapoints.filter(d => d[0] !== null).map(d => d[1]));
    }
}