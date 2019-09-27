import * as React from "react";
import { ApiClient } from "../../api/ApiClient";
import QueryParams from "../../api/QueryParams";
import { ISerie, MAX_SIGNIFICANT_FIGURES } from "../../api/Serie";
import SerieApi from "../../api/SerieApi";
import { extractIdsFromUrl, extractUriFromUrl } from "../../helpers/common/URLExtractors";
import { PropsAdjuster, IAdjustmentOptions } from "../../helpers/graphic/propsAdjuster";
import { GraphicURLValidator } from "../../helpers/graphic/URLValidation";
import { getColorArray } from "../style/Colors/Color";
import ExportableGraphicContainer from "../style/Graphic/ExportableGraphicContainer";
import Graphic, { IChartTypeProps, ILegendLabel, ISeriesAxisSides, INumberPropsPerId } from "../viewpage/graphic/Graphic";
import { chartExtremes } from "../viewpage/graphic/GraphicAndShare";
import { seriesConfigByUrl } from "../viewpage/ViewPage";

export interface IGraphicExportableProps {
    graphicUrl: string;
    chartOptions: any;
    navigator?: boolean;
    locale?: string;
    zoom?: boolean;
    exportable?: boolean;
    colors?: string[];
    backgroundColor?: string;
    datePickerEnabled?: boolean;
    legendField?: string;
    chartTypes: IChartTypeProps;
    title?: string;
    source?: string;
    displayUnits?: boolean;
    legendLabel: ILegendLabel;
    seriesAxis: ISeriesAxisSides;
    chartType?: string;
    decimalLeftAxis?: number;
    decimalRightAxis?: number;
    decimalTooltips: INumberPropsPerId;
    decimalTooltip?: number;
}

interface IGraphicExportableState {
    series: ISerie[];
    dateRange: { start: string, end: string };
}

export default class GraphicExportable extends React.Component<IGraphicExportableProps, IGraphicExportableState> {

    private seriesApi: SerieApi;

    public constructor(props: any) {
        super(props);
        this.afterRender = this.afterRender.bind(this);

        const urlValidator = new GraphicURLValidator();
        if(!urlValidator.isValidURL(this.props.graphicUrl)) {
            throw new Error(`El parametro graphicURL: '${this.props.graphicUrl}' representa una URL de grafico inválida; por favor, revísela`);
        }

        this.seriesApi = new SerieApi(new ApiClient(extractUriFromUrl(props.graphicUrl), 'ts-components'));
        this.state = {
            dateRange: { start: '', end: '' },
            series: []
        }
    }

    public componentDidMount() {
        const url = new URLSearchParams(this.props.graphicUrl);
        const ids = extractIdsFromUrl(this.props.graphicUrl).sort();
        const params = new QueryParams(ids);

        const start = url.get('start_date') || '';
        const end = url.get('end_date') || '';

        if (this.props.navigator) {
            url.delete('start_date');
            url.delete('end_date');
        } else {
            params.setStartDate(start);
            params.setEndDate(end);
        }

        this.setState({dateRange: {start, end}});
        params.addParamsFrom(url);
        this.fetchSeries(params);

        const adjuster = new PropsAdjuster(ids);
        const adjustmentOptions: IAdjustmentOptions = {
            chartType: this.props.chartType,
            chartTypes: this.props.chartTypes,
            decimalTooltip: this.props.decimalTooltip,
            decimalTooltips: this.props.decimalTooltips,
            legendLabel: this.props.legendLabel,
            seriesAxis: this.props.seriesAxis
        };
        adjuster.adjustAll(adjustmentOptions);

    }

    public render() {

        const chartOptions = buildChartOptions(this.props.chartOptions, this.props);

        return (
            <ExportableGraphicContainer>
                <Graphic series={this.state.series}
                         range={chartExtremes(this.state.series, this.state.dateRange)}
                         seriesConfig={seriesConfigByUrl(this.props.graphicUrl)(this.state.series)}
                         chartOptions={chartOptions}
                         formatUnits={true}
                         locale={this.props.locale || 'AR'}
                         legendField={legendValue(this.props.legendField)}
                         chartTypes={this.props.chartTypes}
                         afterRender={this.afterRender}
                         legendLabel={this.props.legendLabel}
                         seriesAxis={this.props.seriesAxis}
                         colors={getColorArray(this.props.colors)}
                         decimalLeftAxis={this.props.decimalLeftAxis}
                         decimalRightAxis={this.props.decimalRightAxis}
                         decimalTooltips={this.props.decimalTooltips}
                         maxDecimals={MAX_SIGNIFICANT_FIGURES} />
            </ExportableGraphicContainer>
        )
    }

    private afterRender(chart: any) {
        const chartHeight = chart.container.parentElement.clientHeight;
        const zoomEnabled = this.props.zoom || (this.props.zoom === undefined && chart.chartWidth >= 620);
        const navigatorEnabled = this.props.navigator || (this.props.navigator === undefined && chartHeight >= 500);
        const datepickerEnabled = this.props.datePickerEnabled || (this.props.datePickerEnabled === undefined && chart.chartWidth >= 400);
        const smallChart = chart.chartWidth <= 700;
        const displayUnits = this.props.displayUnits || (this.props.displayUnits === undefined && chart.chartWidth > 450);

        chart.update({
            chart: {
                height: chartHeight, // force the settings of container's height,
                zoomType: zoomEnabled ? 'x' : 'none'
            },
            navigator: { enabled: navigatorEnabled },
            rangeSelector: {
                buttonTheme: { visibility: zoomEnabled ? 'inherit' : 'hidden', display: zoomEnabled ? 'inherit' : 'none' },
                inputEnabled: datepickerEnabled
            },
            scrollbar: { enabled: navigatorEnabled },
            title: {
                margin: 10,
                style: {
                    height: "41.5px",
                    overflow: 'hidden',
                    whiteSpace: 'normal'
                },
                useHTML: smallChart,
            }
        });

        if (!displayUnits) {
            chart.yAxis.forEach((yAxis: any) => yAxis.update({ title: { text: null } }))
        }

        if (!zoomEnabled) {
            const zoomBtn = chart.container.getElementsByClassName('highcharts-range-selector-buttons')[0];
            zoomBtn.parentNode.removeChild(zoomBtn)
        }
    }


    private fetchSeries(params: QueryParams) {
        this.seriesApi.fetchSeries(params)
            .then((series: ISerie[]) => this.setState({series}))
            .catch(alert);
    }

}

function legendValue(field?: string): ((serie: ISerie) => string) {
    const f = field || 'description';
    return (serie: ISerie) => serie[f];
}

function buildChartOptions(chartOptions: any, componentProps: IGraphicExportableProps): any {
    const options = chartOptions;
    options.navigator = Object.assign({}, options.navigator, { enabled: defaultChartValue(componentProps.navigator) });
    options.scrollbar = Object.assign({}, options.scrollbar, { enabled: defaultChartValue(componentProps.navigator) });
    options.exporting = Object.assign({}, options.exporting, exportingProps(componentProps));
    options.chart = Object.assign({}, options.chart, chartProps(componentProps));
    options.rangeSelector = Object.assign({}, options.rangeSelector, rangeSelectorProps(componentProps));
    options.title = Object.assign({}, options.title, titleOptions(componentProps));
    options.subtitle = Object.assign({}, options.subtitle, subtitleOptions(componentProps));
    options.credits = Object.assign({}, options.credits, creditsOptions(componentProps));
    options.legend = Object.assign({}, options.legend, legendOptions(componentProps));

    return options;
}

function chartProps(componentProps: IGraphicExportableProps) {
    return {
        backgroundColor: componentProps.backgroundColor ? componentProps.backgroundColor : "none",
        zoomType: defaultChartValue(componentProps.zoom) ? 'x' : ''
    }
}

function exportingProps(componentProps: IGraphicExportableProps) {
    return {
        buttons: {
            contextButton: {
                theme: {
                    fill: {
                        background: componentProps.backgroundColor ? componentProps.backgroundColor : 'none'
                    }
                }
            }
        },
        enabled: componentProps.exportable || false,
    }
}

function rangeSelectorProps(componentProps: any) {
    const options = Object.assign({}, componentProps.rangeSelector);
    options.inputEnabled = defaultChartValue(componentProps.datePickerEnabled);
    if (!defaultChartValue(componentProps.zoom)) {
        options.buttonTheme = { visibility: 'hidden', display: 'none' };
    }
    return options;
}

function titleOptions(componentProps: IGraphicExportableProps) {
    const options: any = Object.assign({}, componentProps.title);
    options.text = componentProps.title;
    options.style = {
        color: "#333333",
        fontSize: "20.5px",
        fontWeight: "500",
        fontFamily: ["Roboto", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        lineHeight: "20.5px"
    };

    if (!componentProps.zoom && !componentProps.datePickerEnabled) { // remove margin between title and chart
        options.margin = 0;
    }
    return options;
}

function subtitleOptions(componentProps: IGraphicExportableProps) {
    const options: any = Object.assign({}, componentProps.source);
    options.useHTML = true;
    if (componentProps.source) {
        options.align = "center";
        options.style = {
            color: "#707070",
            fontSize: "15px",
            fontWeight: "400",
            fontFamily: ["Roboto", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"]
        };
        options.text = componentProps.source;
        options.verticalAlign = "bottom";
        options.y = 15;
    }

    return options
}

function creditsOptions(componentProps: IGraphicExportableProps) {
    return {
        href: productionUrl(componentProps.graphicUrl),
        text: "Ver en datos.gob.ar"
    }
}

function productionUrl(apiCall: string): string {
    const url = apiCall.split('apis.datos.gob.ar')[1];

    return `https://datos.gob.ar${url}`;
}

function defaultChartValue(value: boolean|undefined): boolean|undefined {
    return typeof value === 'boolean' ? value : true;
}

function legendOptions(componentProps: IGraphicExportableProps) {
    return {
        enabled: multipleSeries(componentProps)
    }
}

function seriesLength(apiCall: string): number {
    return apiCall.split('ids')[1].split(',').length;
}

function multipleSeries(componentProps: IGraphicExportableProps): boolean {
    return seriesLength(componentProps.graphicUrl) > 1
}