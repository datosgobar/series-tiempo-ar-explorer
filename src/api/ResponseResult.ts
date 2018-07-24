import {ISearchResponse} from "./ITSAPIResponse";
import SearchResult from "./SearchResult";

export default class ResponseResult implements ISearchResponse{

    constructor(private total: number, private data: SearchResult[]) {
    }

    public get count() {
        return this.total;
    }

    public get result() {
        return this.data;
    }

}