import * as React from 'react';
import { RefObject } from 'react';
import { setSerieTags } from "../../../actions/seriesActions";
import IDataPoint from '../../../api/DataPoint';
import { ISerie } from '../../../api/Serie';
import SerieConfig from "../../../api/SerieConfig";
import { i18nFrequency } from "../../../api/utils/periodicityManager";
import { valuesFromObject } from "../../../helpers/commonFunctions";
import { formattedDateString, fullLocaleDate, localTimestamp, timestamp } from "../../../helpers/dateFunctions";
import { buildLocale } from "../../common/locale/buildLocale";
import { ISerieTag } from "../SeriesTags";
import { colorFor } from '../ViewPage';
import { IHConfig, IHCSeries, ReactHighStock } from './highcharts';
import { generateYAxisBySeries } from './axisConfiguration';
import { ILegendConfiguration, getLegendLabel } from './legendConfiguration';

// tslint:disable-next-line:no-var-requires
const deepMerge = require('deepmerge');

export interface ILegendLabel {
    [clave: string]: string;
}

export interface ISeriesAxisSides {
    [clave: string]: string;
}

export interface IGraphicProps {
    series: ISerie[];
    range: IChartExtremeProps;
    onReset?: () => void;
    onZoom?: ({}) => void;
    readonly dispatch?: (action: object) => void;
    seriesConfig: SerieConfig[];
    formatUnits?:boolean;
    chartOptions?: any;
    locale: string;
    legendField?: (serie: ISerie) => string;
    chartTypes?: IChartTypeProps;
    afterRender?: (chart: any) => void;
    legendLabel?: ILegendLabel;
    seriesAxis?: ISeriesAxisSides;
}

export interface IChartTypeProps {
    [clave: string]: string;
}

export interface IChartExtremeProps {
    min: number;
    max: number;
}

interface IYAxis {
    opposite: boolean;
    title: {text: string};
    yAxis: number;
    labels?: { formatter?: ()=>string,
               align?: "left"|"right"|"center",
               x?: number }
}

export interface IYAxisConf {
    [clave: string]: IYAxis
}


const DATE_FORMAT_BY_PERIODICITY= {
    day:      '%Y-%m-%d',
    month:    '%Y-%m',
    quarter:  '%Y-%m',
    semester: '%Y-%m',
    year:     '%Y',
};


export default class Graphic extends React.Component<IGraphicProps> {

    private myRef: RefObject<any>;
    private yAxisBySeries: IYAxisConf;

    constructor(props: IGraphicProps) {
        super(props);
        this.myRef = React.createRef();

        setHighchartsGlobalConfig(props.locale);
    }

    public componentDidUpdate() {
        this.notifyChangeSeriesNames(this.yAxisBySeries);
        this.fixAnimation();
    }

    public render() {
        const formatUnits = this.props.formatUnits || false;
        this.yAxisBySeries = generateYAxisBySeries(this.props.series, this.props.seriesConfig, 
            formatUnits, this.props.locale, this.props.seriesAxis);

        return (
            <ReactHighStock ref={this.myRef} config={this.highchartsConfig()} callback={this.afterRender} />
        );
    }

    public afterRender = (chart: any) => {
        this.showLoading(chart);
        this.setExtremes(chart);
        changeCreditsPosition(chart);

        if (this.props.afterRender) {
            this.props.afterRender(chart);
        }
    };

    public shouldComponentUpdate(nextProps: IGraphicProps) {
        return this.props.series.every((serie1: ISerie) => {
            return nextProps.series.every((serie2: ISerie) => serie1.id !== serie2.id)
        });
    }

    public highchartsConfig() {
        const ownConfig = {
            legend: {
                enabled: true
            },

            chart: {
                height: '500',
                zoomType: 'x'
            },

            credits: {
                enabled: true,
                href: window.location.href,
                text: "Ver en datos.gob.ar"
            },

            exporting: {
                buttons: {
                    contextButton: {
                        menuItems: ['printChart', 'downloadPNG','downloadJPEG', 'downloadPDF', 'downloadSVG']
                    },
                },

                chartOptions: {
                    legend: { itemStyle: { width: 300 } },
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
                    return timestamp(result);
                },
            },

            title: {
                text: ''
            },

            tooltip:{
                formatter () {
                    const self: any = this;
                    // @ts-ignore
                    const graphic: Graphic = _this;
                    const chartElement = graphic.myRef.current.chart;
                    const smallTooltip = chartElement.chartWidth < 560;
                    const formatUnits = graphic.props.formatUnits || false;
                    const locale = buildLocale(graphic.props.locale);

                    let contentTooltip = "";
                    self.points.forEach((point: any, index: number) => {
                        const serieConfig = findSerieConfig(graphic.props.seriesConfig, point.series.options.serieId);
                        let value = point.y;

                        if (serieConfig) {
                            if(serieConfig.mustFormatUnits(formatUnits)) {
                                value = `${locale.toDecimalString(value * 100)}%`;
                            } else {
                                value = locale.toDecimalString(value);
                            }

                            contentTooltip += tooltipFormatter(point, value, smallTooltip);
                        }

                        if (index < self.points.length -1) {
                            contentTooltip += "<br>";
                        }
                    });

                    const frequency = i18nFrequency(graphic.props.series[0].frequency || 'year');
                    return [tooltipDateValue(frequency, self.points[0].x), contentTooltip];
                },

                // The universe is in balance. Do not change the following function
                positioner(boxWidth: number, boxHeight: number, point: any) {
                    const self: any = this;
                    let tooltipX;
                    let tooltipY;

                    if (point.plotX + boxWidth < self.chart.plotWidth) {
                        tooltipX = point.plotX + self.chart.plotLeft + 20;
                    } else {
                        tooltipX = point.plotX + self.chart.plotLeft - boxWidth - 20;
                    }
                    tooltipY = point.plotY + self.chart.plotTop - 20;
                    return {
                        x: tooltipX,
                        y: tooltipY
                    };
                },
                shared: true,
                useHTML: true,
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

        return deepMerge(ownConfig, this.props.chartOptions || {}); // chartOptions overrides ownConfig
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
        const chartType = getChartType(serie, this.props.chartTypes);
        const legendProps: ILegendConfiguration = {
            axisConf: this.yAxisBySeries,
            legendLabel: this.props.legendLabel,
            legendField: this.props.legendField,
            rightSidedSeries: this.atLeastOneRightSidedSerie()
        }

        return {
            ...this.defaultHCSeriesConfig(),
            ...hcConfig,
            color: colorFor(this.props.series, serie.id).code,
            data,
            name: getLegendLabel(serie, legendProps),
            navigatorOptions: { type: chartType },
            serieId: getFullSerieId(serie),
            type: chartType,
            yAxis: this.yAxisBySeries[getFullSerieId(serie)].yAxis,
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

    private atLeastOneRightSidedSerie(): boolean {
    
        const configs = valuesFromObject(this.yAxisBySeries);
        return configs.some((config: IYAxis) => {
            return config.opposite;
        });
    
    }

    private notifyChangeSeriesNames(yAXisBySeries: IYAxisConf) {
        if (!this.props.dispatch) { return }

        let titlesResult: ISerieTag[] = [];

        if (this.props.series.some((serie: ISerie) => yAXisBySeries[serie.id].opposite)) {
            this.props.series.forEach((serie: ISerie) => {
                const title = yAXisBySeries[serie.id].opposite ? `${serie.description} (der)` : `${serie.description} (izq)`;
                titlesResult.push({id: serie.id, title});
            });
        } else {
            titlesResult = this.props.series.map((serie: ISerie) => ({id: serie.id, title: serie.description}));
        }

        this.props.dispatch(setSerieTags(titlesResult))
    }

    private fixAnimation() {
        this.myRef.current.chart.reflow = () => { return }; // https://github.com/kirjs/react-highcharts/issues/171 ¯\_(ツ)_/¯
    }
}


function dateFormatByPeriodicity(component: Graphic) {
    const frequency = component.props.series.length > 0 ? component.props.series[0].frequency || 'day' : 'day';

    return DATE_FORMAT_BY_PERIODICITY[frequency];
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

    // Case where there are only right-sided axis
    if(leftAxis.length === 0) {
        rightAxis.forEach((rightConfig: IYAxis) => {
            const originalLabels = rightConfig.labels;
            rightConfig.labels = {
                ...originalLabels,
                align: 'right',
                x: -30
            }
        })
    }
    
    return leftAxis.concat(rightAxis);
}

export function getFullSerieId(serie: ISerie): string {

    if (serie.representationMode === 'value') {
        return serie.id
    }
    return `${serie.id}:${serie.representationMode}`;

}

function setHighchartsGlobalConfig(locale: string) {
    const localeObj = buildLocale(locale);

    ReactHighStock.Highcharts.setOptions({
        lang: {
            contextButtonTitle: 'Opciones',
            decimalPoint: localeObj.decimalSeparator(),
            downloadJPEG: 'Descargar JPEG',
            downloadPDF: 'Descargar PDF',
            downloadPNG: 'Descargar PNG',
            downloadSVG: 'Descargar SVG',
            months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            printChart: 'Imprimir gráfico',
            rangeSelectorFrom: 'Desde',
            rangeSelectorTo: 'Hasta',
            rangeSelectorZoom: '',
            resetZoom: 'Reiniciar zoom',
            shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            thousandsSep: localeObj.thousandSeparator(),
            weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
        }
    });
}

function tooltipFormatter(point: any, value: string, smallTooltip?: boolean) {
    return `<table>
                <tbody>
                    <tr>
                        <td>
                            <div class="tooltip-content" style="${smallTooltip ? 'width: 20px' : 'width: 240px'}">
                                <span style="color:${point.color};display:inline !important;">\u25CF</span> ${smallTooltip ? '' : point.series.name}
                            </div>
                        </td>
                        <td><span class="tooltip-value">${value}</span></td>
                    </tr>
                </tbody>
            </table>`
}

function tooltipDateValue(frequency: string, timest: number): string {
    return `<span id="tooltip-date">${fullLocaleDate(frequency, localTimestamp(timest))}</span>`
}

function findSerieConfig(configs: SerieConfig[], serieId: string) {
    return configs.find((config: SerieConfig) => config.getSerieId() === serieId);
}

export function getChartType(serie: ISerie, types?: IChartTypeProps): string {
    if (!types) { return 'line' }

    return types[getFullSerieId(serie)];
}

function changeCreditsPosition(chart: any) {
    chart.container.getElementsByClassName('highcharts-credits')[0].setAttribute('y', 460); // change position of 'credits'
}