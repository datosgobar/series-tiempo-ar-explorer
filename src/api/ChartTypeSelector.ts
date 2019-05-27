import { IChartTypeProps } from "../components/viewpage/graphic/Graphic";
import { ISerie } from "./Serie";


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
        const globalType = validChartType(this.urlParams.get('chartType'));
        const typesById = chartTypesFromString(this.urlParams.get('chartTypes'));

        return typesById[serieId] || globalType;
    }

    public getChartTypesBySeries(): IChartTypeProps {
        return this.series.reduce((result: {}, serie: ISerie) => {
            result[serie.id] = this.chartTypeTo(serie.id);
            return result;
        }, {})
    }
}

function validChartType(type: string|null): string {
    type = type || DEFAULT_TYPE;
    if ((VALID_TYPES.indexOf(type) === -1) || type === "default") {
        type = DEFAULT_TYPE;
    }

    return type;
}

function chartTypesFromString(types: string|null): IChartTypeProps {
    types = types || '';

    return types.split(',').reduce((result: {}, idAndType: string) => {
        const serieId = idAndType.split(':')[0];
        const chartType = validChartType(idAndType.split(':')[1]);

        result[serieId] = chartType

        return result;
    }, {})
}