import { getChartType, getFullSerieId } from "../common/fullSerieID";
import { ILegendConfiguration, getLegendLabel } from "./legendConfiguration";
import { timestamp } from "../common/dateFunctions";
import { ISerie } from "../../api/Serie";
import { IYAxis, IYAxisConf, IPropsPerId } from "../../components/viewpage/graphic/Graphic";
import { IHConfig, IHCSeries } from "../../components/viewpage/graphic/highcharts";
import { DEFAULT_HC_SERIES_CONFIG } from "./hcConfiguration";
import { colorFor, Color } from "../../components/style/Colors/Color";
import { valuesFromObject } from "../common/commonFunctions";

export interface IHcSeriesFromISerie {
    chartTypes: IPropsPerId | undefined,
    colors: Color[] | undefined,
    legendLabel: IPropsPerId | undefined,
    legendField: ((serie: ISerie) => string) | undefined,
    series: ISerie[],
    yAxisBySeries: IYAxisConf,
}

export class HcSerieFromISerie {
    
    private iHcSeriesFromISerie: IHcSeriesFromISerie;

    public constructor(iHcSeriesFromISerie: IHcSeriesFromISerie) {
        this.iHcSeriesFromISerie = iHcSeriesFromISerie;
    }

    public hcSerieFromISerie(serie: ISerie, yAxisArray: IYAxis[], hcConfig: IHConfig): IHCSeries {

        const data = serie.data.map(datapoint => [timestamp(datapoint.date), datapoint.value]);
        let chartType: string;
        chartType = getChartType(serie, this.iHcSeriesFromISerie.chartTypes); // Si no es la unica
        const legendProps: ILegendConfiguration = {
            axisConf: this.iHcSeriesFromISerie.yAxisBySeries,
            legendLabel: this.iHcSeriesFromISerie.legendLabel,
            legendField: this.iHcSeriesFromISerie.legendField,
            rightSidedSeries: this.atLeastOneRightSidedSerie()
        }

        return {
            ...DEFAULT_HC_SERIES_CONFIG,
            ...hcConfig,
            color: colorFor(this.iHcSeriesFromISerie.series, getFullSerieId(serie), this.iHcSeriesFromISerie.colors).code,
            data,
            name: getLegendLabel(serie, legendProps),
            navigatorOptions: { type: chartType },
            serieId: getFullSerieId(serie),
            type: chartType,
            yAxis: this.yAxisIndex(yAxisArray, getFullSerieId(serie))
        }
    }

    private atLeastOneRightSidedSerie(): boolean {
        const configs = valuesFromObject(this.iHcSeriesFromISerie.yAxisBySeries);
        return configs.some((config: IYAxis) => {
            return config.opposite;
        });
    }

    private yAxisIndex(yAxisArray: IYAxis[], serieID: string) {
        const isRightSided = this.iHcSeriesFromISerie.yAxisBySeries[serieID].opposite;
        return yAxisArray.findIndex(yAxis => yAxis.opposite === isRightSided)
    }
}