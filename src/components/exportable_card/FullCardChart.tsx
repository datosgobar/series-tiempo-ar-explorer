import * as React from 'react';
import { IDataPoint } from '../../api/DataPoint';
import CardFullChart from './charts/CardFullChart';
import CardNullChart from './charts/CardNullChart';
import CardSmallChart from './charts/CardSmallChart';


export interface ICardChartProps {
    data: IDataPoint[];
}

interface IFullCardChartProps extends ICardChartProps {
    chartType: string;
}

const CHART_TYPES_COMPONENT = {
    'full': CardFullChart,
    'none': CardNullChart,
    'small': CardSmallChart,
}


export default (props: IFullCardChartProps) => {
    const Chart = CHART_TYPES_COMPONENT[props.chartType];

    return <Chart data={props.data} />
}
