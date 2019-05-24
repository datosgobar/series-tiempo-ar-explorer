import { IChartTypeProps } from "../components/viewpage/graphic/Graphic";
import { ISerie } from "./Serie";

const VALID_TYPES = ["line", "column", "area"];
const DEFAULT_TYPE = "line";


export default class ChartTypeSelector {
    private series: ISerie[];
    private urlParams: URLSearchParams;

    public constructor(series: ISerie[], urlParams: URLSearchParams) {
        this.series = series;
        this.urlParams = urlParams;
    }

    public getChartTypesBySeries(): IChartTypeProps {
        const result = {}

        this.series.forEach((serie: ISerie) => {
            result[serie.id] = validChartType(this.urlParams.get('chartType'));
            return result;
        })

        return result
    }
}

function validChartType(type: string|null): string {
    type = type || DEFAULT_TYPE;
    if ((VALID_TYPES.indexOf(type) === -1) || type === "default") {
        type = DEFAULT_TYPE;
    }

    return type;
}