import { DEFAULT_SIGNIFICANT_FIGURES, MAX_SIGNIFICANT_FIGURES } from "../../api/Serie";
import { INumberPropsPerId } from "../../components/viewpage/graphic/Graphic";

export function getMaxDecimalsAmount(maxDecimalsProp?: number): number {
    if(maxDecimalsProp !== undefined && maxDecimalsProp >= 0) {
        return maxDecimalsProp;
    }
    return MAX_SIGNIFICANT_FIGURES;
}

export function getTooltipDecimals(serieID: string, significantFigures?: number, tooltipDecimals?: INumberPropsPerId): number {
    if (tooltipDecimals && tooltipDecimals[serieID] !== undefined) {
        return tooltipDecimals[serieID];
    }
    if (significantFigures === undefined) {
        return DEFAULT_SIGNIFICANT_FIGURES;
    }
    return Math.min(significantFigures, MAX_SIGNIFICANT_FIGURES);
}
