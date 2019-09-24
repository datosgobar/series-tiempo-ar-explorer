export function webShareURL(): string {
    return window.location.href;
}
export function urlToString(url: string): string {
    return url.replace(new RegExp('%2C', 'g'), ',')
        .replace(new RegExp('%3A', 'g'), ':')
        .replace(new RegExp('%2F', 'g'), '/')
        .replace(new RegExp('%3F', 'g'), '?');
}
export function cleanUrl(url: string): string {
    const host = url.split('?')[0];
    const params = url.split('?')[1];
    const urlSearchParams = new URLSearchParams(params);
    urlSearchParams.delete('chartType');
    return `${urlToString(`${host}?${urlSearchParams.toString()}`)}`;
}
export function csvShareURL(url: string): string {
    const host = url.split('?')[0];
    const params = url.split('?')[1];
    const urlSearchParams = new URLSearchParams(params);
    urlSearchParams.delete('metadata');
    urlSearchParams.delete('start');
    urlSearchParams.delete('chartType');
    return `${urlToString(`${host}?${urlSearchParams.toString()}`)}&format=csv`;
}
export function jsonShareURL(url: string): string {
    return `${cleanUrl(url)}&format=json`;
}
