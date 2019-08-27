export class GraphicURLValidator {

    private urlRegex: RegExp = /https:\/\/apis\.datos\.gob\.ar\/series\/api\/series(\/?)\?(\w+=\w+&)*ids=([^&=]+)(&\w+=\w+)*$/i;

    public isValidURL(url: string): boolean {
        return this.urlRegex.test(url);
    }
}
