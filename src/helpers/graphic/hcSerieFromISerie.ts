import { getChartType, getFullSerieId } from "../common/fullSerieID";
import { timestamp } from "../common/dateFunctions";
import { ISerie } from "../../api/Serie";
import { IYAxis, IYAxisConf, ILegendLabel, IChartTypeProps } from "../../components/viewpage/graphic/Graphic";
import { IHCSeries } from "../../components/viewpage/graphic/highcharts";
import { DEFAULT_HC_SERIES_CONFIG } from "./hcConfiguration";
import { colorFor, Color } from "../../components/style/Colors/Color";
import { valuesFromObject } from "../common/commonFunctions";

export interface IHighchartsSerieBuilderOptions {
    chartTypes?: IChartTypeProps,
    colors?: Color[],
    legendLabel?: ILegendLabel,
    legendField?: ((serie: ISerie) => string),
    series: ISerie[],
    yAxisBySeries: IYAxisConf,
    yAxisArray: IYAxis[], 
}

interface ILegendConfiguration {
    axisConf: IYAxisConf;
    legendLabel?: ILegendLabel;
    legendField?: (serie: ISerie) => string;
    rightSidedSeries: boolean;
}

export class HighchartsSerieBuilder {
    
    private options: IHighchartsSerieBuilderOptions;

    public constructor(options: IHighchartsSerieBuilderOptions) {
        this.options = options;
    }

    public buildFromSerie(serie: ISerie): IHCSeries {

        const data = serie.data.map(datapoint => [timestamp(datapoint.date), datapoint.value]);
        let chartType: string;
        chartType = getChartType(serie, this.options.chartTypes); // Si no es la unica
        const legendProps: ILegendConfiguration = {
            axisConf: this.options.yAxisBySeries,
            legendLabel: this.options.legendLabel,
            legendField: this.options.legendField,
            rightSidedSeries: this.atLeastOneRightSidedSerie()
        }

        return {
            ...DEFAULT_HC_SERIES_CONFIG,
            color: colorFor(this.options.series, getFullSerieId(serie), this.options.colors).code,
            data,
            name: this.getLegendLabel(serie, legendProps),
            navigatorOptions: { type: chartType },
            serieId: getFullSerieId(serie),
            type: chartType,
            yAxis: this.yAxisIndex(this.options.yAxisArray, getFullSerieId(serie))
        }
    }

    private atLeastOneRightSidedSerie(): boolean {
        const configs = valuesFromObject(this.options.yAxisBySeries);
        return configs.some((config: IYAxis) => {
            return config.opposite;
        });
    }

    private yAxisIndex(yAxisArray: IYAxis[], serieID: string) {
        const isRightSided = this.options.yAxisBySeries[serieID].opposite;
        return yAxisArray.findIndex(yAxis => yAxis.opposite === isRightSided)
    }

    private getLegendLabel(serie: ISerie, config: ILegendConfiguration): string {
        
        let label = serie.description;
        const fullId = getFullSerieId(serie);

        if (config.legendLabel) {
            if (config.legendLabel[fullId]) {
                label = config.legendLabel[fullId];
            }
        } else if(config.legendField) {
            label = config.legendField(serie);
        }

        if (config.rightSidedSeries) {
            const conf = config.axisConf[fullId]
            if (conf.opposite){
                label += ' (der)';
            }
            else {
                label += ' (izq)';
            }
        }

        return label;
    }
}