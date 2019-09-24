export function formatUrl(url: string, format: string): string {
    return `${url}&format=${format}`;
}
export function viewDatosGobAr(serieId: string, collapse?: string): string {
    const viewURL = `https://datos.gob.ar/series/api/series/?ids=${serieId}`;
    if (collapse === undefined) {
        return viewURL;
    }
    const finalURL = `${viewURL}&collapse=${collapse}`;
    return finalURL;
}
