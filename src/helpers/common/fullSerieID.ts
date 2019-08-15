import SerieConfig from "../../api/SerieConfig";
import { ISerie } from "../../api/Serie";
import { IChartTypeProps } from "../../components/viewpage/graphic/Graphic";

export interface ISerieFullID {
    id: string;
    representationMode: string;
}
export function getFullSerieId(serie: ISerieFullID): string {
    if (serie.representationMode === 'value') {
        return serie.id;
    }
    return `${serie.id}:${serie.representationMode}`;
}

export function findSerieConfig(configs: SerieConfig[], serieId: string) {
    return configs.find((config: SerieConfig) => config.getFullSerieId() === serieId);
}

export function getChartType(serie: ISerie, types?: IChartTypeProps): string {

    if (!types) { return 'line' }

    const serieFullID: ISerieFullID = {
        id: serie.id,
        representationMode: serie.representationMode
    }
    return types[getFullSerieId(serieFullID)];

}
