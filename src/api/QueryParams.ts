export default class QueryParams {
    private ids: string[];
    private collapse: string;
    private representationMode: string;

    constructor(ids: string[]) {
        this.ids = ids;
    }

    public getIds(): string {
        return this.ids.join(',');
    }

    public getCollapse(): string {
        return this.collapse;
    }

    public getRepresentationMode(): string {
        return this.representationMode;
    }

    public setCollapse(collapse: string) {
        this.collapse = collapse;
    }

    public setRepresentationMode(representationMode: string) {
        this.representationMode = representationMode;
    }

    public asJson(): {} {
        return {
            collapse: this.getCollapse(),
            ids: this.getIds(),
            representation_mode: this.getRepresentationMode()
        }
    }

    public asQuery(): {} {
        const result = this.asJson();
        for(const value in result) {
            if (result[value] === '' || result[value] === undefined) {
                delete(result[value]);
            }
        }

        return result;
    }
}
