export function extractIdsFromUrl(url: string): string[] {

    const paramIDs: string[] = url.split('ids=')[1].split('&')[0].split(',');
    const hasRepModeParam: boolean = url.split('representation_mode=').length > 1;
    const finalIDs: string[] = [];

    if (hasRepModeParam) {
        const repMode: string = url.split('representation_mode=')[1].split('&')[0];
        for (const id of paramIDs) {
            if(id.indexOf(':') <= -1) {
                finalIDs.push(`${id}:${repMode}`)
            }
            else {
                finalIDs.push(id);
            }
        }
        return finalIDs;
    }
    return paramIDs;

}

export function extractUriFromUrl(url: string): string {
    return url.split('series/?')[0];
}