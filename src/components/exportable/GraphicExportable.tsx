import * as React from "react";
import {ApiClient} from "../../api/ApiClient";
import QueryParams from "../../api/QueryParams";
import {ISerie} from "../../api/Serie";
import SerieApi from "../../api/SerieApi";
import {valuesFromObject} from "../../helpers/commonFunctions";
import {Color} from "../style/Colors/Color";
import ExportableGraphicContainer from "../style/Graphic/ExportableGraphicContainer";
import Graphic, {IChartTypeProps} from "../viewpage/graphic/Graphic";
import {chartExtremes} from "../viewpage/graphic/GraphicAndShare";
import {seriesConfigByUrl} from "../viewpage/ViewPage";


const Colors = {
    aBlue: new Color("blue", "#0072BB"),
    bGreen: new Color("green","#2E7D33"),
    cRed: new Color("red", "#C62828"),
    dOrange: new Color("orange", "#F9A822"),
    eViolet: new Color("violet", "#6A1B99"),
};


export interface IGraphicExportableProps {
    graphicUrl: string;
    chartOptions: any;
    navigator?: boolean;
    locale: string;
    zoom?: boolean;
    exportable?: boolean;
    colors?: string[];
    backgroundColor?: string;
    datePickerEnabled?: boolean;
    legendField?: string;
    chartTypes: IChartTypeProps;
    title?: string;
    source?: string;
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
                         locale={this.props.locale}
                         legendField={legendValue(this.props.legendField)}
                         chartTypes={this.props.chartTypes}
                         afterRender={this.afterRender} />
            </ExportableGraphicContainer>
        )
    }

    private afterRender(chart: any) {
        const zoomAvailable = chart.chartWidth > 620;
        const navigatorAvailable = chart.chartWidth > 500;
        const datepickerAvailable = chart.chartWidth > 400;

        if (this.props.zoom === undefined && !zoomAvailable) {
            const zoomBtns = chart.container.getElementsByClassName('highcharts-range-selector-buttons')[0];
            zoomBtns.style.display = 'none';
            zoomBtns.style.visibility = 'hidden';
        }

        if (this.props.navigator === undefined && !navigatorAvailable) {
            const navigator = chart.container.getElementsByClassName('highcharts-navigator')[0];
            navigator.style.display = 'none';
            navigator.style.visibility = 'hidden';
        }

        if (this.props.datePickerEnabled === undefined && !datepickerAvailable) {
            const datepicker = chart.container.getElementsByClassName('highcharts-input-group')[0];
            datepicker.style.display = 'none';
            datepicker.style.visibility = 'hidden';
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
    options.navigator = Object.assign({}, options.navigator, { enabled: componentProps.navigator });
    options.scrollbar = Object.assign({}, options.scrollbar, { enabled: componentProps.navigator });
    options.exporting = Object.assign({}, options.exporting, exportingProps(componentProps));
    options.chart = Object.assign({}, options.chart, chartProps(componentProps));
    options.rangeSelector = Object.assign({}, options.rangeSelector, rangeSelectorProps(componentProps));
    options.title = Object.assign({}, options.title, titleOptions(componentProps));
    options.subtitle = Object.assign({}, options.subtitle, subtitleOptions(componentProps));
    options.credits = Object.assign({}, options.credits, creditsOptions(componentProps));

    return options;
}

function chartProps(componentProps: IGraphicExportableProps) {
    return {
        backgroundColor: componentProps.backgroundColor ? componentProps.backgroundColor : '#ffffff00',
        zoomType: componentProps.zoom ? 'x' : ''
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
        enabled: componentProps.exportable,
    }
}

function rangeSelectorProps(componentProps: any) {
    const options = Object.assign({}, componentProps.rangeSelector);
    options.inputEnabled = componentProps.datePickerEnabled;
    if (!componentProps.zoom) {
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