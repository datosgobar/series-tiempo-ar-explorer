import * as React from 'react';
import { IHConfig, IHCSeries, ReactHighcharts } from './highcharts';

import { Color } from '../../style/Colors/Color';

import IDataPoint from '../../../api/DataPoint';
import { IDateRange } from "../../../api/DateSerie";
import { ISerie } from '../../../api/Serie';


interface IGraphicProps {
    series: ISerie[];
    colorFor?: (serie: ISerie) => Color;
    date: IDateRange;
}

export class Graphic extends React.Component<IGraphicProps, any> {

    public render() {
        return (
            <ReactHighcharts config={this.highchartsConfig()} callback={this.afterRender} />
        );
    }

    public afterRender = (chart: any) => {
        this.showLoading(chart);
        this.applyZoom(chart);
    };

    public highchartsConfig() {
        return ({
            legend: {
                enabled: false
            },

            chart: {
                zoomType: 'x'
            },

            title: {
                text: '',
            },

            xAxis: {
                categories: this.categories(),
            },

            series: this.seriesValues(),
        });
    }


    public categories() {
        return (
            this.props.series.map(
                (serie: ISerie) => serie.data.map(
                    (datapoint: IDataPoint) => datapoint.date))
            [0]
            || []
        );
    }

    public seriesValues(): IHCSeries[] {
        return this.props.series.map((serie) => this.hcSerieFromISerie(serie, {}));
    }

    public hcSerieFromISerie(serie: ISerie, hcConfig: IHConfig): IHCSeries {
        const data = serie.data.map(datapoint => datapoint.value);
        return {
            ...this.defaultHCSeriesConfig(),
            ...hcConfig,
            color: this.props.colorFor ? this.props.colorFor(serie).code : this.defaultHCSeriesConfig().color,
            data,
            name: serie.title,
        }

    }

    /**
     * color: https://api.highcharts.com/highcharts/series.line.color
     * dashStyle: https://api.highcharts.com/highcharts/series.line.dashStyle
     * lineWidth: https://api.highcharts.com/highcharts/series.line.lineWidth
     * type: https://api.highcharts.com/highcharts/series.line.type
     *
     */
    public defaultHCSeriesConfig() {
        return {
            color: '#7CB5EC',
            dashStyle: 'Solid',
            lineWidth: 2,
            type: 'line',
        }
    }


    private showLoading(chart: any) {
        if (this.props.series.length === 0) {
            chart.showLoading('Cargando...');
        }
    }

    private hasDateFilter(): boolean {
        return this.props.date.start !== '' || this.props.date.end !== '';
    }

    private applyZoom(chart: any) {
        if(this.props.series.length === 0 || !this.hasDateFilter()) { return; }

        let min = 0;
        let max = this.props.series[0].data.length - 1;

        if (this.props.date.start !== '') {
            const start = stringToDate(this.props.date.start);
            min = this.props.series[0].data.findIndex(serie => start <= stringToDate(serie.date));
            min = min === -1 ? 0 : min;
        }

        if (this.props.date.end !== '') {
            const end = stringToDate(this.props.date.end);
            max = this.props.series[0].data.findIndex(serie => end <= stringToDate(serie.date));
            max = max === -1 ? this.props.series[0].data.length : max;
        }

        chart.xAxis[0].setExtremes(min, max);
        chart.showResetZoom();
    };

}

// returns a date from string
// '2010' => 01 Jan 2010
// '2010-03' or '2010/03' => 01 Mar 2010
// '2010-03-01' or '2010/03/01' => 01 Mar 2010
function stringToDate(date: string): Date {
    const parsedDate  = date.replace(/([\/\-])/g, '/');
    const result = parsedDate.split('/').length === 1 ? `${parsedDate}/01` : parsedDate;
    return new Date(result);
}

export default Graphic;
