import { ISeriesAxisSides, IYAxisConf } from "./Graphic";
import { ISerie } from "../../../api/Serie";
import SerieConfig from "../../../api/SerieConfig";
import { formatterForSerie } from "./formatterForSerie";

function isOutOfScale(originalSerieId: string, serieId: string, minAndMaxValues: {}): boolean {
    return minAndMaxValues[originalSerieId].min > minAndMaxValues[serieId].max ||
           minAndMaxValues[originalSerieId].max < minAndMaxValues[serieId].min;
}

function getYAxisSide(serieID:string, outOfScale: boolean, axisSideConf?: ISeriesAxisSides, ) {
    
    if (axisSideConf !== undefined) {
        return axisSideConf[serieID];
    }
    if (outOfScale) {
        return 'right';
    }
    return 'left';

}

export function generateYAxisBySeries(series: ISerie[], seriesConfig: SerieConfig[], 
    formatUnits: boolean, locale: string, axisSides?: ISeriesAxisSides): {} {
    const minAndMaxValues = series.reduce((result: any, serie: ISerie) => {
        result[serie.id] = { min: serie.minValue, max: serie.maxValue };

        return result;
    }, {});

    return series.sort((serie: ISerie) => serie.minValue).reduce((result: IYAxisConf, serie: ISerie) => {

        const outOfScale = isOutOfScale(series[0].id, serie.id, minAndMaxValues);
        const yAxisSide = getYAxisSide(serie.id, outOfScale, axisSides);

        result[serie.id] = {
            opposite: yAxisSide === 'right' ? true : false,
            title: { text: serie.representationModeUnits },
            yAxis: yAxisSide === 'right' ? 1 : 0
        };

        const serieConfig = seriesConfig.find((config: SerieConfig) => config.getSerieId() === serie.id);

        if (serieConfig && serieConfig.mustFormatUnits(formatUnits)) {
            result[serie.id].labels = formatterForSerie(locale);
        }

        return result;
    }, {});
}