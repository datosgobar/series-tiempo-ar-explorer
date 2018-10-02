import * as React from 'react';
import {RefObject} from 'react';

import IDataPoint from '../../../api/DataPoint';
import {ISerie} from '../../../api/Serie';
import {Color} from '../../style/Colors/Color';
import {IHConfig, IHCSeries, ReactHighStock} from './highcharts';


interface IGraphicProps {
    series: ISerie[];
    colorFor?: (serie: ISerie) => Color;
    range: {min: number, max: number};
    onReset?: () => void;
    onZoom?: ({}) => void;
}

ReactHighStock.Highcharts.setOptions({
    lang: {
        contextButtonTitle: 'Opciones',
        downloadJPEG: 'Descargar JPEG',
        downloadPDF: 'Descargar PDF',
        downloadPNG: 'Descargar PNG',
        downloadSVG: 'Descargar SVG',
        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        printChart: 'Imprimir gráfico',
        rangeSelectorFrom: 'Desde',
        rangeSelectorTo: 'Hasta',
        resetZoom: 'Reiniciar zoom',
        shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    }
});

const DATE_FORMAT_BY_PERIODICITY= {
    day:      '%Y-%m-%d',
    month:    '%Y-%m',
    quarter:  '%Y-%m',
    semester: '%Y-%m',
    year:     '%Y',
};


export class Graphic extends React.Component<IGraphicProps, any> {

    private myRef: RefObject<any>;

    constructor(props: IGraphicProps) {
        super(props);
        this.myRef = React.createRef();
    }

    public render() {
        return (
            <ReactHighStock ref={this.myRef} config={this.highchartsConfig()} callback={this.afterRender} />
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
                height: '450',
                resetZoomButton: {
                    position: { x: -350, y: 5 },
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

            rangeSelector:{
                buttons: [
                    { count: 1, text: '1m', type: 'month'},
                    { count: 3, text: '3m', type: 'month'},
                    { count: 6, text: '6m', type: 'month' },
                    { text: 'YTD', type: 'ytd' },
                    { count: 1, text: '1y', type: 'year' },
                    { text: 'Todo', type: 'all' }
                ],

                inputEditDateFormat: dateFormatByPeriodicity(this),

                inputDateParser: (date: string): number => {
                    const chartRef = this.myRef.current.chartRef;
                    const inputFrom = chartRef.getElementsByClassName('highcharts-range-selector')[0];
                    let dateOfSerie: string;

                    if (inputFrom.value === date) { // editing 'from' input
                        dateOfSerie = this.props.series[0].data[0].date;
                    } else { // editing 'to' input
                        const lastSerie = this.props.series[this.props.series.length - 1];
                        dateOfSerie = lastSerie.data[lastSerie.data.length - 1].date;
                    }

                    const result = date === '' ? dateOfSerie : formattedDateString(date);
                    return new Date(result).getTime();
                },
            },

            title: {
                text: '',
            },

            xAxis: {
                categories: this.categories(),
                events: {
                    setExtremes: (e: any) => {
                        if (e.trigger === 'navigator' && e.DOMEvent && e.DOMEvent.DOMType === 'mousemove') { return } // trigger events only when the user stop selecting

                        const zoomBtnClicked = e.min === undefined && e.max === undefined && e.trigger === 'zoom';
                        const viewAllClicked = e.trigger === 'rangeSelectorButton' && e.rangeSelectorButton.type === 'all';
                        const rangeSelected = e.rangeSelectorButton === undefined;

                        if((zoomBtnClicked || viewAllClicked) && this.props.onReset) {
                            this.props.onReset();
                        } else if (rangeSelected && this.props.onZoom) {
                            const defaultMin = e.min === 0 || e.min === this.props.range.min;
                            const defaultMax = e.max === 0 || e.max === this.props.range.max;
                            if (e.min === e.max || defaultMin && defaultMax) { return }


                            this.props.onZoom({min: Math.ceil(e.min), max: Math.ceil(e.max)});
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
        const data = serie.data.map(datapoint => [timestamp(datapoint.date), datapoint.value]);
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

    private applyZoom(chart: any) {
        chart.xAxis[0].setExtremes(this.props.range.min, this.props.range.max);
        chart.showResetZoom();
    }

}

export default Graphic;

function timestamp(date: string): number {
    return new Date(date).getTime()
}

// returns a string in format YYYY/MM/DD with the missing parts of date
// '2010' => '2010/01/01
// '2010-03' or '2010/03' => '2010/03/01'
// '2010-03-01' or '2010/03/01' => '2010/03/01'
function formattedDateString(date: string): string {
    const parsedDate  = date.replace(/([\/\-])/g, '-');
    return parsedDate.split('-').length === 1 ? `${parsedDate}-01` : parsedDate;
}

function dateFormatByPeriodicity(component: Graphic) {
    const frequency = component.props.series.length > 0 ? component.props.series[0].frequency || 'day' : 'day';

    return DATE_FORMAT_BY_PERIODICITY[frequency];
}