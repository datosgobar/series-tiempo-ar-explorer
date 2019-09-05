export class GraphicURLValidator {

    private urlRegex: RegExp = /.*\/api\/series(\/?)\?(\w+=\w+&)*ids=([^&=]+)(&\w+=\w+)*$/i;

    public isValidURL(url: string): boolean {
        return this.urlRegex.test(url);
    }
}
