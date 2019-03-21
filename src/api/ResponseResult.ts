import {IAggregations, ISearchResponse} from "./ITSAPIResponse";
import SearchResult from "./SearchResult";

export default class ResponseResult implements ISearchResponse{

    private aggs: IAggregations;

    constructor(private total: number, private data: SearchResult[]) {
    }

    public get count() {
        return this.total;
    }

    public get result() {
        return this.data;
    }

    public setAggregations(aggregations: IAggregations) {
        this.aggs = aggregations;
    }

    public get aggregations() {
        return this.aggs;
    }
}