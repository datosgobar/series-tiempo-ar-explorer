export function extractIdsFromUrl(url: string): string[] {

    const paramIDs: string[] = url.split('ids=')[1].split('&')[0].split(',');
    const hasRepModeParam: boolean = url.split('representation_mode=').length > 1;
    const finalIDs: string[] = [];

    if (!hasRepModeParam) {
        return paramIDs;
    }
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

export function extractUriFromUrl(url: string): string {
    const lastIndex = url.lastIndexOf('series')
    if (lastIndex !== -1) {
        return url.substring(0, lastIndex);
    } else {
        alert(url + " es una url inválida.")
        return url
    }
}