import * as moment from "moment";
import * as React from 'react';

import IDataPoint from '../../../api/DataPoint';
import { IDateRange } from "../../../api/DateSerie";
import { ISerie } from '../../../api/Serie';
import { Color } from '../../style/Colors/Color';
import { IHConfig, IHCSeries, ReactHighcharts } from './highcharts';


interface IGraphicProps {
    series: ISerie[];
    colorFor?: (serie: ISerie) => Color;
    date: IDateRange;
    onReset?: () => void;
}

ReactHighcharts.Highcharts.setOptions({
    lang: {
        contextButtonTitle: 'Opciones',
        downloadJPEG: 'Descargar JPEG',
        downloadPDF: 'Descargar PDF',
        downloadPNG: 'Descargar PNG',
        downloadSVG: 'Descargar SVG',
        printChart: 'Imprimir gráfico',
        resetZoom: 'Reiniciar zoom',
    }
});

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
                height: 550,
                resetZoomButton: {
                    position: { x: -50, y: 10 },
                    relativeTo: 'chart'
                },
                zoomType: 'x'
            },

            exporting: {
                buttons: {
                    contextButton: {
                        menuItems: ['printChart', 'downloadPNG','downloadJPEG', 'downloadPDF', 'downloadSVG']
                    },
                }
            },

            title: {
                text: '',
            },

            xAxis: {
                categories: this.categories(),
                events: {
                    setExtremes: (e: any) => {
                        if(typeof e.min === 'undefined' && typeof e.max === 'undefined' && this.props.onReset) {
                            this.props.onReset();
                        }
                    }
                }
            },

            yAxis: {
                title: {
                    text: 'Valores'
                }
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
            const start = moment(this.props.date.start).format('YYYY-MM-DD');
            min = this.props.series[0].data.findIndex(serie => start <= moment(serie.date).format('YYYY-MM-DD'));
            min = min === -1 ? 0 : min;
        }

        if (this.props.date.end !== '') {
            const end = moment(this.props.date.end).format('YYYY-MM-DD');
            max = this.props.series[0].data.findIndex(serie => end <= moment(serie.date).format('YYYY-MM-DD'));
            max = max === -1 ? this.props.series[0].data.length : max;
        }

        if (min === 0 && max === 0) { return; }

        chart.xAxis[0].setExtremes(min, max);
        chart.showResetZoom();
    };

}

export default Graphic;
