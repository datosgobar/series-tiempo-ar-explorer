import { IDateRange } from "../../api/DateSerie";

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

export function extractUriFromUrl(url: string): string {
    const lastIndex = url.lastIndexOf('series')
    if (lastIndex !== -1) {
        return url.substring(0, lastIndex);
    } else {
        alert(url + " es una url inválida.")
        return url
    }
}