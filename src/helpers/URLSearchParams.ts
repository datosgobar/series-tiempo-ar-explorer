export default class CustomURLSearchParams implements URLSearchParams {

    private urlSearchParams: URLSearchParams;

    constructor(init?: string | URLSearchParams) {
        this.urlSearchParams = new URLSearchParams(init);
    }
    public append(name: string, value: string): void {
        return this.urlSearchParams.append(name, value);
    }
    public delete(name: string): void {
        return this.urlSearchParams.delete(name);
    }
    public get(name: string): string | null {
        return this.urlSearchParams.get(name);
    }
    public getAll(name: string): string[] {
        return this.urlSearchParams.getAll(name);
    }
    public has(name: string): boolean {
        return this.urlSearchParams.has(name);
    }
    public set(name: string, value: string): void {
        return this.urlSearchParams.set(name, value);
    }
    public setOrDelete(key: string, value: string | null) {
        if (value) {
            this.set(key, value);
        } else {
            this.delete(key);
        }
    }
    public toString(){
        return this.urlSearchParams.toString();
    }
}