import { IDataPoint } from "../../api/DataPoint";
import { ISerie } from "../../api/Serie";
import { i18nFrequency } from "../../api/utils/periodicityManager";
import { IGraphicProps, IYAxis, IYAxisConf } from "../../components/viewpage/graphic/Graphic";
import { IHCSerie } from "../../components/viewpage/graphic/highcharts";
import { findSerieConfig } from "../common/fullSerieID";
import { getTooltipDecimals } from "../common/decimalsAmountHandling";
import { generateYAxisArray, generateYAxisBySeries, IYAxisGenerationOptions } from "./axisConfiguration";
import { dateFormatByPeriodicity } from "./dateFormatting";
import { formatSerieValue } from "./formatterForSerie";
import { HighchartsSerieBuilder, IHighchartsSerieBuilderOptions } from "./hcSerieFromISerie";
import { tooltipDateValue, tooltipFormatter } from "./tooltipHandling";

export class ChartConfigBuilder {

    private props: IGraphicProps;
    private yAxisBySeries: IYAxisConf;
    private smallTooltip: boolean;

    public constructor(props: IGraphicProps, smallTooltip: boolean) {

        this.props = props;
        this.smallTooltip = smallTooltip;

        const yAxisGenerationOptions: IYAxisGenerationOptions = {
            axisSides: this.props.seriesAxis,
            decimalLeftAxis: this.props.decimalLeftAxis,
            decimalRightAxis: this.props.decimalRightAxis,
            locale: this.props.locale,
            series: this.props.series,
            seriesConfig: this.props.seriesConfig
        }
        this.yAxisBySeries = generateYAxisBySeries(yAxisGenerationOptions);

    }

    public getConfig() {

        const yAxisArray = generateYAxisArray(this.yAxisBySeries);
        const seriesValues = this.seriesValues(yAxisArray);
        
        return {

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
            exporting: this.exporting(),
            rangeSelector: this.rangeSelector(),
            title: {
                text: ''
            },
            tooltip:{
                formatter () {
                    const self: any = this;
                    // @ts-ignore
                    const builder: ChartConfigBuilder = _this;

                    let contentTooltip = "";
                    self.points.forEach((point: any, index: number) => {

                        const serieConfig = findSerieConfig(builder.props.seriesConfig, point.series.options.serieId);
                        let value = point.y;

                        if (serieConfig) {

                            let significantFigures = serieConfig.getSerieSignificantFigures();

                            if(builder.props.maxDecimals !== undefined) {
                                significantFigures = Math.min(builder.props.maxDecimals, serieConfig.getSerieSignificantFigures());
                            }

                            const decimalPlaces = getTooltipDecimals(serieConfig.getFullSerieId(), 
                                significantFigures, builder.props.decimalTooltips);
                            value = formatSerieValue(value, builder.props.locale, serieConfig.isPercentageSerie(), decimalPlaces);

                            contentTooltip += tooltipFormatter(point, value, builder.smallTooltip);
                            
                        }

                        if (index < self.points.length -1) {
                            contentTooltip += "<br>";
                        }
                    });

                    const frequency = i18nFrequency(builder.props.series[0].frequency || 'year');
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
                categories: this.xAxisCategories(),
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

            yAxis: yAxisArray,
            series: seriesValues
        };
        
    }

    private exporting() {
        return {
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
        }
    }

    private rangeSelector() {
        return  {
            buttons: [
                { count: 1, text: '1m', type: 'month'},
                { count: 3, text: '3m', type: 'month'},
                { count: 6, text: '6m', type: 'month' },
                { text: 'YTD', type: 'ytd' },
                { count: 1, text: '1y', type: 'year' },
                { text: 'Todo', type: 'all' }
            ],
            inputEditDateFormat: dateFormatByPeriodicity(this.props.series),
            inputDateParser: {}
        }
    }

    private xAxisCategories() {
        return (
            this.props.series.map(
                (serie: ISerie) => serie.data.map(
                    (datapoint: IDataPoint) => datapoint.date))
            [0]
            || []
        );
    }

    private seriesValues(yAxisArray: IYAxis[]): IHCSerie[] {
        const series = this.props.series;
        const options: IHighchartsSerieBuilderOptions = {
            chartTypes: this.props.chartTypes,
            colors: this.props.colors,
            legendLabel: this.props.legendLabel,
            legendField: this.props.legendField,
            series: this.props.series,
            yAxisBySeries: this.yAxisBySeries,
            yAxisArray,
        }
        return series.map((serie) => new HighchartsSerieBuilder(options)
                                            .buildFromSerie(serie));
    }

}