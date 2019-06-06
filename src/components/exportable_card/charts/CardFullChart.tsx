import * as React from 'react';
import { ICardChartProps } from '../FullCardChart';
import CardSmallChart from './CardSmallChart';

export default class CardFullChart extends React.Component<ICardChartProps, any> {

    public constructor(props: ICardChartProps) {
        super(props);
    }

    public render() {
        return (
            <CardSmallChart data={this.props.data} />
        )
    }
}
