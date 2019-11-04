import * as React from 'react';
import { RefObject } from 'react';
import { setSerieTags } from "../../../actions/seriesActions";
import { ISerie } from '../../../api/Serie';
import SerieConfig from "../../../api/SerieConfig";
import { formattedDateString, timestamp } from '../../../helpers/common/dateFunctions';
import { generateYAxisBySeries, IYAxisGenerationOptions, buildYAxisGenerationOptions } from '../../../helpers/graphic/axisConfiguration';
import { ChartConfigBuilder } from '../../../helpers/graphic/chartConfigBuilder';
import { setHighchartsGlobalConfig } from '../../../helpers/graphic/hcConfiguration';
import { Color } from '../../style/Colors/Color';
import { ISerieTag } from "../SeriesTags";
import { ReactHighStock } from './highcharts';
import { getFullSerieId } from '../../../helpers/common/fullSerieID';

// tslint:disable-next-line:no-var-requires
const deepMerge = require('deepmerge');

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
    colors?: Color[];
    decimalLeftAxis?: number;
    decimalRightAxis?: number;
    decimalTooltips?: INumberPropsPerId;
    maxDecimals?: number;
    numbersAbbreviate: boolean;
    decimalsBillion: number;
    decimalsMillion: number;
}

export interface IStringPropsPerId {
    [clave: string]: string;
}

export type IChartTypeProps = IStringPropsPerId;
export type ILegendLabel = IStringPropsPerId;
export type ISeriesAxisSides = IStringPropsPerId;

export interface INumberPropsPerId {
    [clave: string]: number;
}

export type IPropsPerId = IStringPropsPerId | INumberPropsPerId;

export interface IChartExtremeProps {
    min: number;
    max: number;
}

export interface IYAxis {
    opposite: boolean;
    title: {text: string};
    labels?: { formatter?: ()=>string,
               format?: string,
               align?: "left"|"right"|"center",
               x?: number }
}

export interface IYAxisConf {
    [clave: string]: IYAxis
}

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

        const yAxisGenerationOptions: IYAxisGenerationOptions = buildYAxisGenerationOptions(this.props);
        this.yAxisBySeries = generateYAxisBySeries(yAxisGenerationOptions);

        const smallTooltip: boolean = this.hasSmallTooltip();
        const configBuilder: ChartConfigBuilder = new ChartConfigBuilder(this.props, smallTooltip);
        const config = configBuilder.getConfig();
        config.rangeSelector.inputDateParser = this.inputDateParser();

        const finalConfig = deepMerge(config, this.props.chartOptions || {}); // chartOptions overrides ownConfig

        return (
            <ReactHighStock ref={this.myRef} config={finalConfig} callback={this.afterRender} />
        );

    }

    public afterRender = (chart: any) => {
        this.showLoading(chart);
        this.setExtremes(chart);

        if (this.props.afterRender) {
            this.props.afterRender(chart);
        }
    };

    public shouldComponentUpdate(nextProps: IGraphicProps) {
        return this.props.series.every((serie1: ISerie) => {
            return nextProps.series.every((serie2: ISerie) => serie1.id !== serie2.id)
        });
    }

    private hasSmallTooltip() {

        const refCurrent = this.myRef.current;

        if (refCurrent == null || refCurrent.chart.chartElement === undefined) {
            return false;
        }
        return refCurrent.chart.chartElement.chartWidth < 560
    }

    private inputDateParser() {

        return (date: string): number => {

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

        };

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

        if (this.props.series.some((serie: ISerie) => yAXisBySeries[getFullSerieId(serie)].opposite)) {
            this.props.series.forEach((serie: ISerie) => {
                const title = yAXisBySeries[getFullSerieId(serie)].opposite ? `${serie.description} (der)` : `${serie.description} (izq)`;
                titlesResult.push({id: serie.id, title, representationMode: serie.representationMode});
            });
        } else {
            titlesResult = this.props.series.map((serie: ISerie) => ({id: serie.id, title: serie.description, representationMode: serie.representationMode}));
        }

        this.props.dispatch(setSerieTags(titlesResult))
    }

    private fixAnimation() {
        this.myRef.current.chart.reflow = () => { return }; // https://github.com/kirjs/react-highcharts/issues/171 ¯\_(ツ)_/¯
    }
}