import { IDateRange } from "../../api/DateSerie";

export interface ICollapseParams {
    collapse: string;
    collapseAggregation: string;
}

export class IDsExtractor {

    private idsParam: string;
    private repModeParam: string;

    constructor(url: string, representationMode?: string) {
        const params = new URLSearchParams(url.split('?')[1]);
        this.idsParam = params.get('ids') || '';
        this.repModeParam = representationMode || params.get('representation_mode') || '';
    }

    public getIDsAsTheyAre(): string[] {
        return this.idsParam !== '' ? this.idsParam.split(',') : [];
    }

    public getModifiedIDs(): string[] {

        const originalIDs: string[] = this.getIDsAsTheyAre();
        const modifiedIds: string[] = [];

        if (this.repModeParam === '') {
            return originalIDs;
        }

        for (const id of originalIDs) {
            if(id.indexOf(':') <= -1) {
                modifiedIds.push(`${id}:${this.repModeParam}`);
            }
            else {
                modifiedIds.push(id);
            }
        }

        return modifiedIds;

    }

    public getIDsExcludingCertainOne(target: string): string[] {

        const originalIDs: string[] = this.getIDsAsTheyAre();
        const targetParts = target.split(':');
        const targetIsModified: boolean = targetParts.length > 1;

        let finalIDs = originalIDs.filter((id) => id !== target);

        if (!targetIsModified) {
            return finalIDs;
        }

        if (targetParts[1] === this.repModeParam) {
            finalIDs = finalIDs.filter((id) => id !== targetParts[0]);
        }
        
        return finalIDs;

    }

}

export function getDateFromUrl(url: string): IDateRange {

    const params = new URLSearchParams(url);

    const start = params.get('start_date') || '';
    const end = params.get('end_date') || '';

    return { start, end };

}

export function getRepresentationModeFromUrl(url: string): string {

    const params = new URLSearchParams(url);
    let repMode = params.get('representation_mode') || '';

    const series = params.getAll('ids');
    if (series.length === 1) {
        if (series[0].indexOf(':') !== -1) {
            repMode = series[0].split(':')[1];
        }
    }

    return repMode;

}

export function getCollapseParamsFromUrl(url: string): ICollapseParams {

    const params = new URLSearchParams(url);

    const collapse = params.get('collapse') || '';
    const collapseAggregation = params.get('collapse_aggregation') || '';

    return { collapse, collapseAggregation };

}

export function extractUriFromUrl(url: string): string {
    const lastIndex = url.lastIndexOf('series')
    if (lastIndex !== -1) {
        return url.substring(0, lastIndex);
    } else {
        alert(url + " es una url inválida.")
        return url
    }
}