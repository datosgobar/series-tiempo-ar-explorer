import * as React from "react";
import {ApiClient} from "../../api/ApiClient";
import QueryParams from "../../api/QueryParams";
import {ISerie} from "../../api/Serie";
import SerieApi from "../../api/SerieApi";
import {valuesFromObject} from "../../helpers/commonFunctions";
import Colors, {Color} from "../style/Colors/Color";
import ExportableGraphicContainer from "../style/Graphic/ExportableGraphicContainer";
import Graphic, {IChartTypeProps} from "../viewpage/graphic/Graphic";
import {chartExtremes} from "../viewpage/graphic/GraphicAndShare";
import {seriesConfigByUrl} from "../viewpage/ViewPage";


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
}

interface IGraphicExportableState {
    series: ISerie[];
    dateRange: { start: string, end: string };
}

export default class GraphicExportable extends React.Component<IGraphicExportableProps, IGraphicExportableState> {

    private seriesApi: SerieApi;

    public constructor(props: any) {
        super(props);
        this.colorFor = this.colorFor.bind(this);
        this.afterRender = this.afterRender.bind(this);

        this.seriesApi = new SerieApi(new ApiClient(extractUriFromUrl(props.graphicUrl), 'ts-components'));
        this.state = {
            dateRange: { start: '', end: '' },
            series: []
        }
    }

    public componentDidMount() {
        const url = new URLSearchParams(this.props.graphicUrl);
        const ids = extractIdsFromUrl(this.props.graphicUrl);
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
    }

    public render() {
        const chartOptions = buildChartOptions(this.props.chartOptions, this.props);

        return (
            <ExportableGraphicContainer>
                <Graphic series={this.state.series}
                         range={chartExtremes(this.state.series, this.state.dateRange)}
                         seriesConfig={seriesConfigByUrl(this.state.series, this.props.graphicUrl)}
                         chartOptions={chartOptions}
                         colorFor={this.colorFor}
                         formatUnits={true}
                         locale={this.props.locale || 'AR'}
                         legendField={legendValue(this.props.legendField)}
                         chartTypes={this.props.chartTypes}
                         afterRender={this.afterRender} />
            </ExportableGraphicContainer>
        )
    }

    private afterRender(chart: any) {
        const chartHeight = chart.container.parentElement.clientHeight - chart.subtitle.element.clientHeight;
        const zoomEnabled = this.props.zoom || (this.props.zoom === undefined && chart.chartWidth >= 620);
        const navigatorEnabled = this.props.navigator || (this.props.navigator === undefined && chartHeight >= 500);
        const datepickerEnabled = this.props.datePickerEnabled || (this.props.datePickerEnabled === undefined && chart.chartWidth >= 400);
        const smallChart = chart.chartWidth <= 700;
        const displayUnits = this.props.displayUnits || (this.props.displayUnits === undefined && chart.chartWidth > 450);
        let marginBottom = multipleSeries(this.props) ? null : 15;

        if (!navigatorEnabled && this.props.navigator === undefined) {
            marginBottom = 45
        }

        chart.update({
            chart: {
                height: chartHeight, // force the settings of container's height,
                marginBottom,
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
                    height: smallChart ? 35 : 'auto',
                    overflow: smallChart ? 'auto' : 'hidden',
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

    private colorFor(serieId: string): Color {
        const colors = this.props.colors ? buildColors(this.props.colors) : valuesFromObject(Colors);
        const index = this.state.series.findIndex(viewSerie => viewSerie.id === serieId) % colors.length;

        return colors[index];
    }

    private fetchSeries(params: QueryParams) {
        this.seriesApi.fetchSeries(params)
            .then((series: ISerie[]) => this.setState({series}))
            .catch(alert);
    }

}

function extractIdsFromUrl(url: string): string[] {
    return url.split('ids=')[1].split('&')[0].split(',')
}

function extractUriFromUrl(url: string): string {
    return url.split('series/?')[0];
}

function buildColors(colors: string[]): Color[] {
    return colors.map((color: string) => new Color('customColor', color));
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

    if (!componentProps.zoom && !componentProps.datePickerEnabled) { // remove margin between title and chart
        options.margin = 0;
    }
    return options;
}

function subtitleOptions(componentProps: IGraphicExportableProps) {
    const options: any = Object.assign({}, componentProps.source);
    options.useHTML = true;
    if (componentProps.source) {
        options.text = componentProps.source;
        options.y = 15;
        options.align = "center";
        options.verticalAlign = "bottom";
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
