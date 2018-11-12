import * as React from 'react';
import {RefObject} from 'react';

import {setSerieTags} from "../../../actions/seriesActions";
import IDataPoint from '../../../api/DataPoint';
import {ISerie} from '../../../api/Serie';
import SerieConfig from "../../../api/SerieConfig";
import {maxNotNull, minNotNull, valueExist, valuesFromObject} from "../../../helpers/commonFunctions";
import {formattedDateString, timestamp} from "../../../helpers/dateFunctions";
import {Color} from '../../style/Colors/Color';
import {ISerieTag} from "../SeriesTags";
import {IHConfig, IHCSeries, ReactHighStock} from './highcharts';


export interface IGraphicProps {
    series: ISerie[];
    colorFor?: (serieId: string) => Color;
    range: {min: number, max: number};
    onReset?: () => void;
    onZoom?: ({}) => void;
    readonly dispatch?: (action: object) => void;
    seriesConfig: SerieConfig[];
    formatUnits?:boolean;
    chartOptions?: any;
}

interface IYAxis {
    opposite: boolean;
    title: {text: string};
    yAxis: number;
    labels?: { format: string }
}

interface IYAxisConf {
    [clave: string]: IYAxis
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
    private yAxisBySeries: IYAxisConf;

    constructor(props: IGraphicProps) {
        super(props);
        this.myRef = React.createRef();
    }

    public componentDidUpdate() {
        this.notifyChangeSeriesNames(this.yAxisBySeries);
        this.fixAnimation();
    }

    public render() {
        const formatUnits = this.props.formatUnits || false;
        this.yAxisBySeries = generateYAxisBySeries(this.props.series, this.props.seriesConfig, formatUnits);

        return (
            <ReactHighStock ref={this.myRef} config={this.highchartsConfig()} callback={this.afterRender} />
        );
    }

    public afterRender = (chart: any) => {
        this.showLoading(chart);
        this.setExtremes(chart);
    };

    public highchartsConfig() {
        const ownConfig = {
            legend: {
                enabled: false
            },

            chart: {
                height: '450',
                zoomType: 'x'
            },

            exporting: {
                buttons: {
                    contextButton: {
                        menuItems: ['printChart', 'downloadPNG','downloadJPEG', 'downloadPDF', 'downloadSVG']
                    },
                },

                chartOptions: {
                    navigator: {enabled: false},
                    rangeSelector: {enabled: false},
                    scrollbar: { enabled: false },
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

                        if((zoomBtnClicked || viewAllClicked) && this.props.onReset) {
                            this.props.onReset();
                        } else if (this.props.onZoom) {
                            const defaultMin = e.min === 0 || e.min === this.props.range.min;
                            const defaultMax = e.max === 0 || e.max === this.props.range.max;
                            if (e.min === e.max || defaultMin && defaultMax) { return }


                            this.props.onZoom({min: Math.ceil(e.min), max: Math.ceil(e.max)});
                        }
                    }
                }
            },

            yAxis: yAxisConf(this.yAxisBySeries),

            series: this.seriesValues(),
        };

        return Object.assign(ownConfig, this.props.chartOptions); // chartOptions overrides ownConfig
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
            color: this.props.colorFor ? this.props.colorFor(serie.id).code : this.defaultHCSeriesConfig().color,
            data,
            name: serie.title,
            yAxis: this.yAxisBySeries[serie.id].yAxis
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
            showInNavigator: true,
            type: 'line',
        }
    }


    private showLoading(chart: any) {
        if (this.props.series.length === 0) {
            chart.showLoading('Cargando...');
        }
    }

    private setExtremes(chart: any) {
        chart.xAxis[0].setExtremes(this.props.range.min, this.props.range.max);
    }

    private notifyChangeSeriesNames(yAXisBySeries: IYAxisConf) {
        if (!this.props.dispatch) { return }

        let titlesResult: ISerieTag[] = [];

        if (this.props.series.some((serie: ISerie) => yAXisBySeries[serie.id].opposite)) {
            this.props.series.forEach((serie: ISerie) => {
                const title = yAXisBySeries[serie.id].opposite ? `${serie.title} (der)` : `${serie.title} (izq)`;
                titlesResult.push({id: serie.id, title});
            });
        } else {
            titlesResult = this.props.series.map((serie: ISerie) => ({id: serie.id, title: serie.title}));
        }

        this.props.dispatch(setSerieTags(titlesResult))
    }

    private fixAnimation() {
        this.myRef.current.chart.reflow = () => { return }; // https://github.com/kirjs/react-highcharts/issues/171 ¯\_(ツ)_/¯
    }
}

export default Graphic;

function dateFormatByPeriodicity(component: Graphic) {
    const frequency = component.props.series.length > 0 ? component.props.series[0].frequency || 'day' : 'day';

    return DATE_FORMAT_BY_PERIODICITY[frequency];
}

function generateYAxisBySeries(series: ISerie[], seriesConfig: SerieConfig[], formatUnits: boolean): {} {
    const minAndMaxValues = series.reduce((result: any, serie: ISerie) => {
        result[serie.id] = smartMinAndMaxFinder(serie.data);

        return result;
    }, {});

    return series.reduce((result: IYAxisConf, serie: ISerie) => {
        const outOfScale = isOutOfScale(series[0].id, serie.id, minAndMaxValues);

        result[serie.id] = {
            opposite: outOfScale,
            title: { text: serie.units },
            yAxis: outOfScale ? 1 : 0
        };

        const formatUnitsBySerie = serie.data.some((e: IDataPoint) => e.value > 0.0001 && e.value < 1);
        const serieConfig = seriesConfig.find((config: SerieConfig) => config.getSerieId() === serie.id);

        if (serieConfig && serieConfig.mustFormatUnits(formatUnits, formatUnitsBySerie)) {
            result[serie.id].labels = { format: "{value}%" };
        }

        return result;
    }, {});
}

function isOutOfScale(originalSerieId: string, serieId: string, minAndMaxValues: {}): boolean {
    return minAndMaxValues[originalSerieId].min > minAndMaxValues[serieId].max ||
           minAndMaxValues[originalSerieId].max < minAndMaxValues[serieId].min;
}

// returns the min and max values of the passed list in just one iteration, even if some of them is null or undefined
function smartMinAndMaxFinder(data: any[]): {min: number, max: number} {
    return data.reduce((result: any, e: IDataPoint) => {
        if (valueExist(e.value)) {
            result.min = minNotNull(result.min, e.value);
            result.max = maxNotNull(result.min, e.value);
        }

        return result;
    }, {});
}

function yAxisConf(yAxisBySeries: IYAxisConf): IYAxis[] {
    const configs = valuesFromObject(yAxisBySeries);
    if (configs.length === 0) { return []}

    let leftAxis: IYAxis[] = [];
    let rightAxis: IYAxis[] = [];

    configs.forEach((config: IYAxis) => {
        config.opposite ? rightAxis.push(config) : leftAxis.push(config);
    });

    const leftAxisTitles = leftAxis.map((v:IYAxis)=> v.title.text);
    const rightAxisTitles = rightAxis.map((v:IYAxis)=> v.title.text);

    leftAxis = leftAxis.filter((item: IYAxis, pos: number) => leftAxisTitles.indexOf(item.title.text) === pos);
    rightAxis = rightAxis.filter((item: IYAxis, pos: number) => rightAxisTitles.indexOf(item.title.text) === pos);

    return leftAxis.concat(rightAxis);
}
