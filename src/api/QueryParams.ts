export default class QueryParams {

    public static distinctURLs(prevLocation: string, currentLocation: string) {
        const prevParams = new URLSearchParams(prevLocation);
        const currentParams = new URLSearchParams(currentLocation);

        return prevParams.getAll('ids').every((id) => currentParams.getAll('ids').every((id2) => id !== id2)) ||
               prevParams.get('collapse')             !== currentParams.get('collapse') ||
               prevParams.get('collapse_aggregation') !== currentParams.get('collapse_aggregation') ||
               prevParams.get('representation_mode')  !== currentParams.get('representation_mode');
    }

    private ids: string[];
    private collapse: string;
    private collapseAggregation: string;
    private startDate: string;
    private endDate: string;
    private representationMode: string;
    private metadata: string;
    private last: number;
    private start: number;
    private limit: number;

    constructor(ids: string[]) {
        this.ids = ids;
    }

    public getIds(): string {
        return this.ids.join(',');
    }

    public getCollapse(): string {
        return this.collapse;
    }

    public getCollapseAggregation(): string {
        return this.collapseAggregation;
    }

    public getRepresentationMode(): string {
        return this.representationMode;
    }

    public getMetadata(): string {
        return this.metadata;
    }

    public getLast(): number {
        return this.last;
    }

    public getStart(): number {
        if (this.getLast()) {
            return this.start
        } else {
            return 0;
        }
    }

    public getLimit(): number {
        if (this.getLast()) {
            return this.limit
        } else {
            return 1000;
        }
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

    public setCollapseAggregation(collapseAggregation: string) {
        this.collapseAggregation = collapseAggregation;
    }

    public setMetadata(metadata: string) {
        this.metadata = metadata;
    }

    public setLast(last: number) {
        this.last = last;
    }

    public setStart(start: number) {
        this.start = start;
    }

    public setLimit(limit: number) {
        this.limit = limit;
    }

    public addParamsFrom(params: any) {
        this.setCollapse(params.get('collapse') || '');
        this.setCollapseAggregation(params.get('collapse_aggregation') || '');
        this.setRepresentationMode(params.get('representation_mode') || '');
    }

    public asJson(): {} {
        return {
            collapse: this.getCollapse(),
            collapse_aggregation: this.getCollapseAggregation(),
            end_date: this.endDate,
            ids: this.getIds(),
            last: this.getLast(),
            limit: this.getLimit(),
            metadata: this.getMetadata(),
            representation_mode: this.getRepresentationMode(),
            start: this.getStart(),
            start_date: this.startDate
        }
    }

    public asQuery(): any {
        const result = this.asJson();
        for(const value in result) {
            if (result[value] === '' || result[value] === undefined) {
                delete(result[value]);
            }
        }

        return result;
    }
}
