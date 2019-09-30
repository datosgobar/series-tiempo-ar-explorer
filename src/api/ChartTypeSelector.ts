import { IChartTypeProps } from "../components/viewpage/graphic/Graphic";
import { ISerie } from "./Serie";
import { getFullSerieId } from "../helpers/common/fullSerieID";


const DEFAULT_TYPE = "line";
const VALID_TYPES = [DEFAULT_TYPE, "column", "area"];


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
    type = type || DEFAULT_TYPE;
    if (!isValidChartType(type) || type === "default") {
        type = DEFAULT_TYPE;
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