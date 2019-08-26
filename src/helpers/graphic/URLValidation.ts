const graphicURLRegex: RegExp = /https:\/\/apis\.datos\.gob\.ar\/series\/api\/series(\/?)\?((.+=.+)(&?))*ids=(.*)((.+=.+)(&?))*.*/i

export function isValidURL(url: string): boolean {

    return graphicURLRegex.test(url);

}
