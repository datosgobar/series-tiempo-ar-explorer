import * as React from "react";
import { ApiClient } from "../../api/ApiClient";
import QueryParams from "../../api/QueryParams";
import { ISerie, MAX_SIGNIFICANT_FIGURES } from "../../api/Serie";
import SerieApi from "../../api/SerieApi";
import { buildAbbreviationProps } from "../../helpers/common/numberAbbreviation";
import { extractUriFromUrl, IDsExtractor, getRepresentationModeFromUrl, getCollapseParamsFromUrl } from "../../helpers/common/URLExtractors";
import { IAdjustmentOptions, PropsAdjuster } from "../../helpers/graphic/propsAdjuster";
import { GraphicURLValidator } from "../../helpers/graphic/URLValidation";
import { getColorArray } from "../style/Colors/Color";
import ExportableGraphicContainer from "../style/Graphic/ExportableGraphicContainer";
import Graphic, { IChartTypeProps, ILegendLabel, ISeriesAxisSides, INumberPropsPerId } from "../viewpage/graphic/Graphic";
import { chartExtremes } from "../../helpers/graphic/chartExtremes";
import { seriesConfigByUrl } from "../viewpage/ViewPage";
import ExportableGraphicPickers from "../style/Graphic/ExportableGraphicPickers";

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
    startDate?: string;
    endDate?: string;
    last?: number;
    numbersAbbreviate?: boolean;
    decimalsBillion?: number;
    decimalsMillion?: number;
    chartTypeSelector?: boolean;
    aggregationSelector?: boolean;
    unitsSelector?: boolean;
    frequencySelector?: boolean;
}

interface IGraphicExportableState {
    series: ISerie[];
    dateRange: { start: string, end: string };
    selectedAggregation: string;
    selectedChartType: string;
    selectedFrequency: string;
    selectedUnits: string;
}

export default class GraphicExportable extends React.Component<IGraphicExportableProps, IGraphicExportableState> {

    private seriesApi: SerieApi;
    private divWidth: number;

    public constructor(props: any) {
        super(props);
        this.afterRender = this.afterRender.bind(this);
        this.handleChangeAggregation = this.handleChangeAggregation.bind(this);
        this.handleChangeChartType = this.handleChangeChartType.bind(this);
        this.handleChangeFrequency = this.handleChangeFrequency.bind(this);
        this.handleChangeUnits = this.handleChangeUnits.bind(this);

        const urlValidator = new GraphicURLValidator();
        if(!urlValidator.isValidURL(this.props.graphicUrl)) {
            throw new Error(`El parametro graphicURL: '${this.props.graphicUrl}' representa una URL de grafico inválida; por favor, revísela`);
        }

        this.seriesApi = new SerieApi(new ApiClient(extractUriFromUrl(props.graphicUrl), 'ts-components'));
        const collapseParams = getCollapseParamsFromUrl(this.props.graphicUrl);

        this.state = {
            dateRange: { start: '', end: '' },
            series: [],
            selectedAggregation: collapseParams.collapseAggregation,
            selectedChartType: '',
            selectedFrequency: collapseParams.collapse,
            selectedUnits: getRepresentationModeFromUrl(this.props.graphicUrl)
        }
    }

    public componentDidMount() {

        const ids = getIDsFromGraphicURL(this.props.graphicUrl);
        const zoomStartDate = this.props.startDate || '';
        const zoomEndDate = this.props.endDate || '';

        this.setState({
            dateRange: {
                start: zoomStartDate, 
                end: zoomEndDate
            }
        });

        const params = buildParamsFromIDs(this.props.graphicUrl);
        this.fetchSeries(params);

        this.adjustProps(ids, this.props.chartType);

    }

    public shouldComponentUpdate(nextProps: IGraphicExportableProps, nextState: IGraphicExportableState) {

        let chartType = this.props.chartType;
        if (nextState.selectedChartType !== '') {
            chartType = nextState.selectedChartType;    
        }

        const representationMode = this.state.selectedUnits !== 'value' ? this.state.selectedUnits : undefined;
        const ids = getIDsFromGraphicURL(this.props.graphicUrl, representationMode);
        this.adjustProps(ids, chartType);
        return true;

    }

    public handleChangeFrequency(value: string) {
        const params = buildParamsFromIDs(this.props.graphicUrl);
        params.setCollapse(value);
        params.setCollapseAggregation(this.state.selectedAggregation);
        params.setRepresentationMode(this.state.selectedUnits);
        this.setState({
            selectedFrequency: value
        });
        this.fetchSeries(params);
    }

    public handleChangeUnits(value: string) {
        const params = buildParamsFromIDs(this.props.graphicUrl, true);
        params.setRepresentationMode(value);
        params.setCollapseAggregation(this.state.selectedAggregation);
        params.setCollapse(this.state.selectedFrequency);
        this.setState({
            selectedUnits: value
        });
        this.fetchSeries(params);
    }

    public handleChangeAggregation(value: string) {
        const params = buildParamsFromIDs(this.props.graphicUrl);
        params.setCollapseAggregation(value);
        params.setCollapse(this.state.selectedFrequency);
        params.setRepresentationMode(this.state.selectedUnits);
        this.setState({
            selectedAggregation: value
        });
        this.fetchSeries(params);
    }

    public handleChangeChartType(value: string) {
        this.setState({
            selectedChartType: value
        });
        this.resetChartTypes();
    }

    public render() {

        const chartOptions = buildChartOptions(this.props.chartOptions, this.props);
        const abbreviationProps = buildAbbreviationProps(this.props.numbersAbbreviate, this.props.decimalsBillion, this.props.decimalsMillion);

        const chartTypeSelector = this.props.chartTypeSelector  !== undefined ? this.props.chartTypeSelector : true;
        const unitsSelector = this.props.unitsSelector  !== undefined ? this.props.unitsSelector : true;
        const aggregationSelector = this.props.aggregationSelector  !== undefined ? this.props.aggregationSelector : true;
        const frequencySelector = this.props.frequencySelector  !== undefined ? this.props.frequencySelector : true;

        return (
            <ExportableGraphicContainer>
                <Graphic series={this.state.series}
                         range={chartExtremes(this.state.series, this.state.dateRange, this.props.last)}
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
                         maxDecimals={MAX_SIGNIFICANT_FIGURES}
                         numbersAbbreviate={abbreviationProps.numbersAbbreviate}
                         decimalsBillion={abbreviationProps.decimalsBillion}
                         decimalsMillion={abbreviationProps.decimalsMillion} />
                <ExportableGraphicPickers series={this.state.series}
                                          handleChangeAggregation={this.handleChangeAggregation}
                                          handleChangeFrequency={this.handleChangeFrequency}
                                          handleChangeUnits={this.handleChangeUnits} 
                                          handleChangeChartType={this.handleChangeChartType}
                                          selectedFrequency={this.state.selectedFrequency}
                                          selectedUnits={this.state.selectedUnits}
                                          selectedAggregation={this.state.selectedAggregation}
                                          selectedChartType={this.state.selectedChartType}
                                          chartTypeSelector={chartTypeSelector}
                                          unitsSelector={unitsSelector}
                                          aggregationSelector={aggregationSelector}
                                          frequencySelector={frequencySelector}
                                          parentWidth={this.divWidth} />
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

        this.divWidth = chart.container.parentElement.clientWidth;

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
            .then((series: ISerie[]) => {
                this.setState({series});
            })
            .catch(alert);
    }

    private adjustProps(ids: string[], chartType?: string): void {

        const adjuster = new PropsAdjuster(ids);
        const adjustmentOptions: IAdjustmentOptions = {
            chartType,
            chartTypes: this.props.chartTypes,
            decimalTooltip: this.props.decimalTooltip,
            decimalTooltips: this.props.decimalTooltips,
            legendLabel: this.props.legendLabel,
            seriesAxis: this.props.seriesAxis
        };
        adjuster.adjustAll(adjustmentOptions);

    }

    private resetChartTypes(): void {
        
        const orderedSeriesIDs = Object.keys(this.props.chartTypes);
        orderedSeriesIDs.sort();
        for (const id of orderedSeriesIDs) {
            delete this.props.chartTypes[id];
        }

    }

}

function purifyIDs(originalIDs: string[]): string[] {

    const pureIDs = []; 
    for (const id of originalIDs) {
        pureIDs.push(id.split(':')[0]);
    }
    return pureIDs;

}

function getIDsFromGraphicURL(graphicURL: string, representationMode?: string): string[] {
    const extractor: IDsExtractor = new IDsExtractor(graphicURL, representationMode);
    return extractor.getModifiedIDs();
}

function buildParamsFromIDs(graphicURL: string, pureIDsOnly: boolean = false): QueryParams { 

    const url = new URLSearchParams(graphicURL);
    const serieStartDate = url.get('start_date') || '';
    const serieEndDate = url.get('end_date') || '';

    let ids = getIDsFromGraphicURL(graphicURL);
    if (pureIDsOnly) {
        ids = purifyIDs(ids);
    }
    const params = new QueryParams(ids);

    params.setStartDate(serieStartDate);
    params.setEndDate(serieEndDate);
    params.addParamsFrom(url, false);       // The repMode has already been added to the ids when getting them from the URL

    return params;

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