import React from 'react';
import { DataFrame, PanelData, PanelProps } from '@grafana/data';
import { PanelOptions } from "./app/boom/Boom.interface";
import { BoomSeries } from "./app/boom/BoomSeries";

interface Props extends PanelProps<PanelOptions> {
    options: PanelOptions;
    data: PanelData;
    width: number;
    height: number;
    onOptionsChange: (options: PanelOptions) => void;
}

export const Panel: React.FC<Props> = (props: Props) => {
    
    const { options, data, timeRange } = props;
    
    const newData = data.series.map((series: DataFrame) => {
        return new BoomSeries(series, options.defaultPattern, options.patterns, {
            debug_mode: options.debug_mode,
            row_col_wrapper: options.row_col_wrapper || '_',
        }, {}, timeRange);
    })

    return <pre>
        {
            newData.map(d => <>
                {`${d.row_name} -- ${d.col_name} -- ${d.value} -- ${d.value_formatted} -- ${d.display_value}`}<br />
            </>)

        }
    </pre>;
}