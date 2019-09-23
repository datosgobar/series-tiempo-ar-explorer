import { ISerie, DEFAULT_SIGNIFICANT_FIGURES, GRAPHIC_MAX_SIGNIFICANT_FIGURES } from "../../api/Serie";
import SerieConfig from "../../api/SerieConfig";
import { IChartTypeProps, INumberPropsPerId } from "../../components/viewpage/graphic/Graphic";

export const DEFAULT_TOOLTIP_DECIMAL_AMOUNT = 2;

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

export function getTooltipDecimals(serieID: string, significantFigures?: number, tooltipDecimals?: INumberPropsPerId): number {

    if (tooltipDecimals && tooltipDecimals[serieID] !== undefined) {
        return tooltipDecimals[serieID];
    }
    
    if(significantFigures === undefined) {
        return DEFAULT_SIGNIFICANT_FIGURES;
    }

    return Math.min(significantFigures, GRAPHIC_MAX_SIGNIFICANT_FIGURES);
    
}
