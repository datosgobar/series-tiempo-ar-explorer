import * as React from 'react';
import { IDataPoint } from '../../api/DataPoint';
import D3LineChart from '../d3_charts/D3LineChart';


interface IFullCardChartProps {
    data: IDataPoint[];
    chartType: string;
}

export default class FullCardChart extends React.Component<IFullCardChartProps, any> {

    private readonly myRef: React.RefObject<any>;

    public constructor(props: IFullCardChartProps) {
        super(props);

        this.myRef = React.createRef();
    }

    public render() {
        return (
            <div ref={this.myRef}>
                <D3LineChart renderTo={this.myRef} data={this.props.data} />
            </div>
        )
    }
}
