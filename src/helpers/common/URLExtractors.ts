import { IDateRange } from "../../api/DateSerie";


export const DEFAULT_REPRESENTATION_MODE: string = 'value';
const DEFAULT_COLLAPSE_AGGREGATION: string = 'avg'

export interface ICollapseParams {
    collapse: string;
    collapseAggregation: string;
}

export class IDsExtractor {

    private idsParam: string;
    private repModeParam: string;

    constructor(url: string) {
        const params = new URLSearchParams(url.split('?')[1]);
        this.idsParam = params.get('ids') || '';
        this.repModeParam = params.get('representation_mode') || '';
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

    const searchQuery = new URL(url).search;
    const params = new URLSearchParams(searchQuery);
    const repMode = params.get('representation_mode') || '';

    if (repMode !== '') { return repMode; }

    const IDsQueryParam = params.get('ids');
    const specificRepModes = [];

    if (IDsQueryParam !== null) {
        const seriesIDs = IDsQueryParam.split(',');
        for (const id of seriesIDs) {
            if (id.indexOf(':') !== -1) {
                specificRepModes.push(id.split(':')[1]);
            }
            else {
                specificRepModes.push(DEFAULT_REPRESENTATION_MODE);
            }
        }
    }

    specificRepModes.sort();
    if (specificRepModes[0] === specificRepModes[specificRepModes.length - 1]) {
        return specificRepModes[0];
    }

    return DEFAULT_REPRESENTATION_MODE;

}

export function getUpdatedRepModeURL(originalURL: string, newRepMode: string): string {

    if (originalURL.indexOf('representation_mode=') !== -1) {
        const originalRepMode = originalURL.split('representation_mode=')[1].split('&')[0];
        return originalURL.replace(originalRepMode, newRepMode);
    }

    if (newRepMode !== DEFAULT_REPRESENTATION_MODE) {
        return `${originalURL}&representation_mode=${newRepMode}`;
    }
    return originalURL;    

}

export function getCollapseParamsFromUrl(url: string): ICollapseParams {

    const searchQuery = new URL(url).search;
    const params = new URLSearchParams(searchQuery);

    const collapse = params.get('collapse') || '';
    const collapseAggregation = params.get('collapse_aggregation') || DEFAULT_COLLAPSE_AGGREGATION;

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