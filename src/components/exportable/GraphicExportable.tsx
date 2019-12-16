import * as React from "react";
import { ApiClient } from "../../api/ApiClient";
import QueryParams from "../../api/QueryParams";
import { ISerie, MAX_SIGNIFICANT_FIGURES } from "../../api/Serie";
import SerieApi from "../../api/SerieApi";
import { buildAbbreviationProps } from "../../helpers/common/numberAbbreviation";
import { extractUriFromUrl, IDsExtractor, getRepresentationModeFromUrl, getCollapseParamsFromUrl, getUpdatedRepModeURL } from "../../helpers/common/URLExtractors";
import { IAdjustmentOptions, PropsAdjuster } from "../../helpers/graphic/propsAdjuster";
import { GraphicURLValidator } from "../../helpers/graphic/URLValidation";
import { getColorArray } from "../style/Colors/Color";
import ExportableGraphicContainer from "../style/Graphic/ExportableGraphicContainer";
import Graphic, { IChartTypeProps, ILegendLabel, ISeriesAxisSides, INumberPropsPerId } from "../viewpage/graphic/Graphic";
import { chartExtremes } from "../../helpers/graphic/chartExtremes";
import { seriesConfigByUrl } from "../viewpage/ViewPage";
import ExportableGraphicPickers from "../style/Graphic/ExportableGraphicPickers";
import FetchParamsBuilder, { IFetchParamsBuildingConfig } from "../../helpers/graphic/fetchParamsBuilder";
import { getSelectedChartType } from "../../helpers/common/chartTypeHandling";

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
    private queriedIDs: string[];
    private fetchParamsBuilder: FetchParamsBuilder;
    private originalChartTypes: IChartTypeProps;
    private graphicRenderWaitForFetch: boolean;

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

        this.graphicRenderWaitForFetch = true;
        this.originalChartTypes = JSON.parse(JSON.stringify(this.props.chartTypes)) as IChartTypeProps;
        this.seriesApi = new SerieApi(new ApiClient(extractUriFromUrl(props.graphicUrl), 'ts-components'));
        const collapseParams = getCollapseParamsFromUrl(this.props.graphicUrl);
        this.fetchParamsBuilder = new FetchParamsBuilder(this.props.graphicUrl);

        const extractor: IDsExtractor = new IDsExtractor(this.props.graphicUrl);
        this.queriedIDs = extractor.getModifiedIDs();

        this.state = {
            dateRange: { start: '', end: '' },
            series: [],
            selectedAggregation: collapseParams.collapseAggregation,
            selectedChartType: getSelectedChartType(this.props.chartTypes || {}, this.queriedIDs, this.props.chartType),
            selectedFrequency: collapseParams.collapse,
            selectedUnits: getRepresentationModeFromUrl(this.props.graphicUrl)
        }
    }

    public componentDidMount() {

        const zoomStartDate = this.props.startDate || '';
        const zoomEndDate = this.props.endDate || '';

        this.setState({
            dateRange: {
                start: zoomStartDate, 
                end: zoomEndDate
            }
        });

        const fetchConfig: IFetchParamsBuildingConfig = {
            collapse: this.state.selectedFrequency,
            collapseAggregation: this.state.selectedAggregation,
            ids: this.queriedIDs,
            representationMode: this.state.selectedUnits !== '' ? this.state.selectedUnits : undefined
        };
        const params = this.fetchParamsBuilder.getParams(fetchConfig);
        this.fetchSeries(params);

        this.adjustProps(this.queriedIDs, this.props.chartType);        // First time rendering, use the prop

    }

    public shouldComponentUpdate(nextProps: IGraphicExportableProps, nextState: IGraphicExportableState) {

        if (JSON.stringify(this.state) === JSON.stringify(nextState)) {
            return false;
        }
        
        const chartType = nextState.selectedChartType; 
        const updatedUrl = getUpdatedRepModeURL(this.props.graphicUrl, nextState.selectedUnits);

        const extractor: IDsExtractor = new IDsExtractor(updatedUrl);
        const ids = extractor.getModifiedIDs();

        this.adjustProps(ids, chartType);

        return true;

    }

    public handleChangeFrequency(value: string) {
        const fetchConfig: IFetchParamsBuildingConfig = {
            collapse: value,
            collapseAggregation: this.state.selectedAggregation,
            ids: this.queriedIDs,
            representationMode: this.state.selectedUnits !== '' ? this.state.selectedUnits : undefined
        };
        this.graphicRenderWaitForFetch = true;
        this.setState({
            selectedFrequency: value
        });
        const params = this.fetchParamsBuilder.getParams(fetchConfig);
        this.fetchSeries(params);
    }

    public handleChangeUnits(value: string) {
        const fetchConfig: IFetchParamsBuildingConfig = {
            collapse: this.state.selectedFrequency,
            collapseAggregation: this.state.selectedAggregation,
            ids: this.queriedIDs,
            representationMode: value
        };
        this.graphicRenderWaitForFetch = true;    // If changing the units, the inner graphic should only re-render when series have arrived
        this.setState({
            selectedUnits: value
        });
        const params = this.fetchParamsBuilder.getParams(fetchConfig);
        this.fetchSeries(params);
    }

    public handleChangeAggregation(value: string) {
        const fetchConfig: IFetchParamsBuildingConfig = {
            collapse: this.state.selectedFrequency,
            collapseAggregation: value,
            ids: this.queriedIDs,
            representationMode: this.state.selectedUnits !== '' ? this.state.selectedUnits : undefined
        };
        this.graphicRenderWaitForFetch = true;
        this.setState({
            selectedAggregation: value
        });
        const params = this.fetchParamsBuilder.getParams(fetchConfig);
        this.fetchSeries(params);
    }

    public handleChangeChartType(value: string) {
        this.setState({
            selectedChartType: value
        });
        this.graphicRenderWaitForFetch = false;  // If changing the chartType, the inner graphic should not wait for any fetch to render
        this.resetChartTypes();
    }

    public render() {

        const chartOptions = buildChartOptions(this.props.chartOptions, this.props);
        const abbreviationProps = buildAbbreviationProps(this.props.numbersAbbreviate, this.props.decimalsBillion, this.props.decimalsMillion);

        const chartTypeSelector = this.props.chartTypeSelector ? this.props.chartTypeSelector : false;
        const unitsSelector = this.props.unitsSelector ? this.props.unitsSelector : false;
        const aggregationSelector = this.props.aggregationSelector ? this.props.aggregationSelector : false;
        const frequencySelector = this.props.frequencySelector ? this.props.frequencySelector : false;

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
                         decimalsMillion={abbreviationProps.decimalsMillion}
                         originalChartTypes={this.props.chartTypes}
                         waitForSeriesFetch={this.graphicRenderWaitForFetch} />
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
                                          presentSelectorsAmount={this.presentSelectorsAmount()}
                                          parentWidth={this.divWidth} />
            </ExportableGraphicContainer>
        )
    }

    private afterRender(chart: any) {

        this.divWidth = chart.container.parentElement.clientWidth;
        const pickersHeight = this.divWidth < 1500 ? this.presentSelectorsAmount() * 74 : 74;   // Height of the pickers' container
        const rootDivHeight = chart.container.parentElement.parentElement.parentElement.clientHeight;
        
        const chartHeight = rootDivHeight - chart.subtitle.element.clientHeight - pickersHeight;
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
        
        let orderedSeriesIDs = Object.keys(this.props.chartTypes);
        orderedSeriesIDs.sort();
        for (const id of orderedSeriesIDs) {
            delete this.props.chartTypes[id];
        }

        orderedSeriesIDs = Object.keys(this.originalChartTypes);
        orderedSeriesIDs.sort();
        for (const id of orderedSeriesIDs) {
            this.props.chartTypes[id] = this.originalChartTypes[id];
        }

    }

    private presentSelectorsAmount(): number {

        let amount = 0;

        if (this.props.chartTypeSelector) { amount++; }
        if (this.props.aggregationSelector) { amount++; }
        if (this.props.unitsSelector) { amount++; }
        if (this.props.frequencySelector) { amount++; }

        return amount;

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