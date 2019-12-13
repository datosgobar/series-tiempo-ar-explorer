import SerieConfig from "../../api/SerieConfig";

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
