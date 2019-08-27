import { getChartType, getFullSerieId } from "../common/fullSerieID";
import { ILegendConfiguration, getLegendLabel } from "./legendConfiguration";
import { timestamp } from "../common/dateFunctions";
import { ISerie } from "../../api/Serie";
import { IYAxis, IYAxisConf, IPropsPerId } from "../../components/viewpage/graphic/Graphic";
import { IHCSeries } from "../../components/viewpage/graphic/highcharts";
import { DEFAULT_HC_SERIES_CONFIG } from "./hcConfiguration";
import { colorFor, Color } from "../../components/style/Colors/Color";
import { valuesFromObject } from "../common/commonFunctions";

export interface IHighchartsSerieBuilderOptions {
    chartTypes?: IPropsPerId,
    colors?: Color[],
    legendLabel?: IPropsPerId,
    legendField?: ((serie: ISerie) => string),
    series: ISerie[],
    yAxisBySeries: IYAxisConf,
    yAxisArray: IYAxis[], 
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
            name: getLegendLabel(serie, legendProps),
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
}