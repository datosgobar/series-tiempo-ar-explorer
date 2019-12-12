import { IChartTypeProps } from "../components/viewpage/graphic/Graphic";
import { ISerie } from "./Serie";
import { getFullSerieId } from "../helpers/common/fullSerieID";


export const DEFAULT_CHART_TYPE = "line";
const VALID_TYPES = [DEFAULT_CHART_TYPE, "column", "area"];


export default class ChartTypeSelector {
    private series: ISerie[];
    private urlParams: URLSearchParams;

    public constructor(series: ISerie[], urlParams: URLSearchParams) {
        this.series = series;
        this.urlParams = urlParams;
    }

    public chartTypeTo(serieId: string): string {
        const globalType = getValidChartType(this.urlParams.get('chartType'));
        const typesById = chartTypesFromString(this.urlParams.get('chartTypes'));

        if (isValidChartType(typesById[serieId])) {
            return typesById[serieId]
        } else {
            return globalType
        }
    }

    public getChartTypesBySeries(): IChartTypeProps {
        return this.series.reduce((result: {}, serie: ISerie) => {
            const fullId = getFullSerieId(serie);
            result[fullId] = this.chartTypeTo(fullId);
            return result;
        }, {})
    }
}

function getValidChartType(type: string|null): string {
    type = type || DEFAULT_CHART_TYPE;
    if (!isValidChartType(type) || type === "default") {
        type = DEFAULT_CHART_TYPE;
    }

    return type;
}

function chartTypesFromString(types: string|null): IChartTypeProps {
    types = types || '';

    return types.split(',').reduce((result: {}, idAndType: string) => {
        const serieId = idAndType.split(':')[0];
        const chartType = idAndType.split(':')[1];

        result[serieId] = chartType

        return result;
    }, {})
}

function isValidChartType(type: string|null): boolean {
    return VALID_TYPES.indexOf(type || '') !== -1;
}

export function getSelectedChartType(chartTypes: IChartTypeProps, chartType?: string) {

    if(chartType !== undefined) { return chartType; }

    const types: string[] = (Object as any).values(chartTypes);
    if (types.length > 0) {
        return types[0];
    }

    return DEFAULT_CHART_TYPE;

}

export function cloneChartTypes(original: IChartTypeProps): IChartTypeProps {

    const involvedIDs = Object.keys(original);
    const newTypes: IChartTypeProps = {}

    for (const id of involvedIDs) {
        newTypes[id] = original[id];
    }

    return newTypes;

}