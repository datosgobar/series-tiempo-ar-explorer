import { IDataPoint } from "../../api/DataPoint";
import { ISerie } from "../../api/Serie";
import { IChartExtremeProps } from "../../components/viewpage/graphic/Graphic";

const MIN_LAST_OFFSET = 1;

export function chartExtremes(series: ISerie[], dateRange: { start: string; end: string; }, last?: number): IChartExtremeProps {

    if (series.length === 0) {
        return { min: 0, max: 0 };
    }

    const firstSerieData = series[0].data;
    let minDataIndex = firstSerieData.findIndex((data: IDataPoint) => data.date >= dateRange.start);
    let maxDataIndex = firstSerieData.findIndex((data: IDataPoint) => data.date >= dateRange.end);
    
    if (minDataIndex <= 0) {
        minDataIndex = 0;
    }
    if (maxDataIndex <= 0) {
        maxDataIndex = firstSerieData.length - 1;
    }
    if (last !== undefined) {
        const lastOffset = Math.max(MIN_LAST_OFFSET, last)
        minDataIndex = Math.max(minDataIndex, maxDataIndex - lastOffset + 1);
    }

    const min = new Date(firstSerieData[minDataIndex].date).getTime();
    const max = new Date(firstSerieData[maxDataIndex].date).getTime();

    return { min, max };
    
}
