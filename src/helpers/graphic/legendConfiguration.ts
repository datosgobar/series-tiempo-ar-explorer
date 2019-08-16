import { ISerie } from "../../api/Serie";
import { ILegendLabel, IYAxisConf } from "../../components/viewpage/graphic/Graphic";
import { getFullSerieId } from "../common/fullSerieID";

export interface ILegendConfiguration {
    axisConf: IYAxisConf;
    legendLabel?: ILegendLabel;
    legendField?: (serie: ISerie) => string;
    rightSidedSeries: boolean;
}

export function getLegendLabel(serie: ISerie, config: ILegendConfiguration): string {
    
    let label = serie.description;
    const fullId = getFullSerieId(serie);

    if (config.legendLabel) {
        if (config.legendLabel[fullId]) {
            label = config.legendLabel[fullId];
        }
    } else if(config.legendField) {
        label = config.legendField(serie);
    }

    if (config.rightSidedSeries) {
        const conf = config.axisConf[fullId]
        if (conf.opposite){
            label += ' (der)';
        }
        else {
            label += ' (izq)';
        }
    }

    return label;
}