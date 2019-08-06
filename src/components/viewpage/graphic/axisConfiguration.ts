import { ISeriesAxisSides, IYAxisConf, getFullSerieId } from "./Graphic";
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

        const fullId = getFullSerieId(serie);
        result[fullId] = { min: serie.minValue, max: serie.maxValue };

        return result;
    }, {});

    
    return series.slice().sort((serie: ISerie) => serie.minValue).reduce((result: IYAxisConf, serie: ISerie) => {

        const fullId = getFullSerieId(serie);
        const outOfScale = isOutOfScale(getFullSerieId(series[0]), fullId, minAndMaxValues);
        const yAxisSide = getYAxisSide(fullId, outOfScale, axisSides);

        result[fullId] = {
            opposite: yAxisSide === 'right' ? true : false,
            title: { text: serie.representationModeUnits },
            yAxis: yAxisSide === 'right' ? 1 : 0
        };

        const serieConfig = seriesConfig.find((config: SerieConfig) => config.getFullSerieId() === fullId);

        if (serieConfig && serieConfig.mustFormatUnits(formatUnits)) {
            result[fullId].labels = formatterForSerie(locale);
        }

        return result;
    }, {});
}