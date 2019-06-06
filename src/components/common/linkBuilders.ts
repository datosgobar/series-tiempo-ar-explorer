export function formatUrl(url: string, format: string): string {
    return `${url}&format=${format}`
}

export function viewDatosGobAr(serieId: string): string {
    return `https://datos.gob.ar/series/api/series/?ids=${serieId}`
}
