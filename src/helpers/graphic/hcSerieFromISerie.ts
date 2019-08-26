import { getChartType, getFullSerieId } from "../common/fullSerieID";
import { ILegendConfiguration, getLegendLabel } from "./legendConfiguration";
import { timestamp } from "../common/dateFunctions";
import { ISerie } from "../../api/Serie";
import { IYAxis, IYAxisConf, IGraphicProps } from "../../components/viewpage/graphic/Graphic";
import { IHConfig, IHCSeries } from "../../components/viewpage/graphic/highcharts";
import { DEFAULT_HC_SERIES_CONFIG } from "./hcConfiguration";
import { colorFor } from "../../components/style/Colors/Color";
import { valuesFromObject } from "../common/commonFunctions";

export class HcSerieFromISerie {
    
    private props: IGraphicProps;
    private yAxisBySeries: IYAxisConf;

    public constructor(props: IGraphicProps, yAxisBySeries: IYAxisConf) {
        this.props = props;
        this.yAxisBySeries = yAxisBySeries;
    }


    public seriesValues(yAxisArray: IYAxis[]): IHCSeries[] {
        const series = this.props.series;
        return series.map((serie) => this.hcSerieFromISerie(serie, yAxisArray, {}));
    }

    private hcSerieFromISerie(serie: ISerie, yAxisArray: IYAxis[], hcConfig: IHConfig): IHCSeries {

        const data = serie.data.map(datapoint => [timestamp(datapoint.date), datapoint.value]);
        let chartType: string;
        chartType = getChartType(serie, this.props.chartTypes); // Si no es la unica
        const legendProps: ILegendConfiguration = {
            axisConf: this.yAxisBySeries,
            legendLabel: this.props.legendLabel,
            legendField: this.props.legendField,
            rightSidedSeries: this.atLeastOneRightSidedSerie()
        }

        return {
            ...DEFAULT_HC_SERIES_CONFIG,
            ...hcConfig,
            color: colorFor(this.props.series, getFullSerieId(serie), this.props.colors).code,
            data,
            name: getLegendLabel(serie, legendProps),
            navigatorOptions: { type: chartType },
            serieId: getFullSerieId(serie),
            type: chartType,
            yAxis: this.yAxisIndex(yAxisArray, getFullSerieId(serie))
        }
    }

    private atLeastOneRightSidedSerie(): boolean {
        const configs = valuesFromObject(this.yAxisBySeries);
        return configs.some((config: IYAxis) => {
            return config.opposite;
        });
    }

    private yAxisIndex(yAxisArray: IYAxis[], serieID: string) {
        const isRightSided = this.yAxisBySeries[serieID].opposite;
        return yAxisArray.findIndex(yAxis => yAxis.opposite === isRightSided)
    }
}