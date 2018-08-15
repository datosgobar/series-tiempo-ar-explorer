export default class QueryParams {
    private ids: string[];
    private collapse: string;
    private startDate: string;
    private endDate: string;
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

    public setStartDate(startDate: string) {
        this.startDate = startDate;
    }

    public setEndDate(endDate: string) {
        this.endDate = endDate;
    }

    public setRepresentationMode(representationMode: string) {
        this.representationMode = representationMode;
    }

    public asJson(): {} {
        return {
            collapse: this.getCollapse(),
            end_date: this.endDate,
            ids: this.getIds(),
            representation_mode: this.getRepresentationMode(),
            start_date: this.startDate
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
