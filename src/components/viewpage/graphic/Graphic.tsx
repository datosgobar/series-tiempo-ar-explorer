
import * as React from 'react';
// tslint:disable-next-line:no-var-requires
const ReactHighcharts = require('react-highcharts');

import IDataPoint from '../../../api/DataPoint';
import { ISerie } from '../../../api/Serie';

import './Graphic.css';


interface IGraphicProps {
    series: ISerie[];
}

export class Graphic extends React.Component<IGraphicProps, any> {

    get highchartsConfig() {
        return ({
            title: {
                text: 'Chart reflow is set to true'
            },

            xAxis: {
                categories: this.props.series.map((serie: ISerie) => serie.data.map((datapoint: IDataPoint) => datapoint.date))[0] || [] ,
            },

            series: this.props.series.map(serie => ({ name: serie.id, data: serie.data.map((datapoint: IDataPoint) => datapoint.value) })),
            
            subtitle: {
                text: 'When resizing the window or the frame, the chart should resize'
            },
        });
    }

    public render() {
        return (
            <div className='Graphic'>
                <p>Graphic</p>
                <ReactHighcharts config={this.highchartsConfig} />
            </div>
        );
    }
}

export default Graphic;