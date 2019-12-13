import { IChartTypeProps } from "../../components/viewpage/graphic/Graphic";
import { ISerie } from "../../api/Serie";
import { ISerieFullID, getFullSerieId } from "./fullSerieID";
import { DEFAULT_CHART_TYPE } from "../../api/ChartTypeSelector";

export function getChartType(serie: ISerie, types?: IChartTypeProps): string {

    if (!types) { return 'line' }

    const serieFullID: ISerieFullID = {
        id: serie.id,
        representationMode: serie.representationMode
    }
    return types[getFullSerieId(serieFullID)];

}

export function hasSpecifiedChartType(id: string, chartTypes: IChartTypeProps): boolean {

    const pureID = id.split(':')[0];
    if (chartTypes[id] !== undefined || chartTypes[pureID] !== undefined) {
        return true;
    }

    return false;

}

export function getSelectedChartType(chartTypes: IChartTypeProps, ids: string[], chartType?: string): string {

    if(chartType !== undefined) { return chartType; }

    const types: string[] = (Object as any).values(chartTypes);
    if (types.every((type: string) => type === DEFAULT_CHART_TYPE)) {
        return DEFAULT_CHART_TYPE;
    }

    // If every serie has a specified chartType and they're all the same, that's the selected type
    if (ids.every((id: string) => hasSpecifiedChartType(id, chartTypes))) { 
        types.sort();
        if (types[0] === types[types.length - 1]) {
            return types[0];
        }
    }

    return DEFAULT_CHART_TYPE;

}