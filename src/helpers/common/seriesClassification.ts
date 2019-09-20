import { ISerie } from '../../api/Serie';
import { IDataPoint } from '../../api/DataPoint';

export function emptySerie(serie: ISerie): boolean {
    return serie.data.length === 0 || serie.data.every((d: IDataPoint) => d.value === null);
}
export function serieWithData(serie: ISerie): boolean {
    return serie.data.length > 0 && serie.data.some((d: IDataPoint) => d.value !== null);
}
