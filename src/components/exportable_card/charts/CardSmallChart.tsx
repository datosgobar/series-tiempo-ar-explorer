import * as React from 'react';
import D3LineChart from '../../d3_charts/D3LineChart';
import { ICardChartProps } from '../FullCardChart';


export default class CardSmallChart extends React.Component<ICardChartProps, any> {

    private readonly myRef: React.RefObject<any>;

    public constructor(props: ICardChartProps) {
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
