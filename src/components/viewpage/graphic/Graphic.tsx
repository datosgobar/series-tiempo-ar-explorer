
import * as React from 'react';
// tslint:disable-next-line:no-var-requires
const ReactHighcharts = require('react-highcharts');

// Highcharts more
// tslint:disable-next-line:no-var-requires
require('highcharts-more')(ReactHighcharts.Highcharts);

// Highcharts exporting
// tslint:disable-next-line:no-var-requires
require('highcharts-exporting')(ReactHighcharts.Highcharts);

// Highcharts export csv
// tslint:disable-next-line:no-var-requires
require('highcharts-export-csv')(ReactHighcharts.Highcharts)


import IDataPoint from '../../../api/DataPoint';
import { ISerie } from '../../../api/Serie';

import './Graphic.css';


interface IGraphicProps {
    series: ISerie[];
}

export class Graphic extends React.Component<IGraphicProps, any> {

    get categories() {
        return (
            this.props.series.map(
                (serie: ISerie) => serie.data.map(
                    (datapoint: IDataPoint) => datapoint.date))
            [0]
            || []
        );
    }

    get seriesValues() {
        return (
            this.props.series.map(
                (serie: ISerie) => ({
                    data: serie.data.map((datapoint: IDataPoint) => datapoint.value),
                    name: serie.id,
                })
            )
        );
    }

    get highchartsConfig() {
        return ({

            title: {
                text: 'Chart reflow is set to true'
            },

            xAxis: {
                categories: this.categories,
            },

            series: this.seriesValues,

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