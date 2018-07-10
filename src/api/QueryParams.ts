export default class QueryParams {
    private ids: string[];
    private collapse: string;

    constructor(ids: string[]) {
        this.ids = ids;
    }

    public getIds(): string {
        return this.ids.join(',');
    }

    public getCollapse(): string {
        return this.collapse;
    }

    public setCollapse(collapse: string) {
        this.collapse = collapse;
    }

    public asJson(): {} {
        return {
            collapse: this.getCollapse(),
            ids: this.getIds()
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
