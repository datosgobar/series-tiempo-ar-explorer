import { ISortQueryParams, getSortQueryParams } from "../../../helpers/common/sortParamsBuilders";

describe("Obtainment of the sort and sort by query params for searching", () => {

    let sortingOption: string;
    let queryParams: ISortQueryParams;

    it("If no option is specified, no params are obtained", () => {
        sortingOption = "";
        queryParams = getSortQueryParams(sortingOption);
        expect(queryParams.sortBy).toEqual("");
        expect(queryParams.sort).toEqual("");
    });
    it("If 'relevance' option is specified, only a 'sort_by' query param is obtained", () => {
        sortingOption = "relevance";
        queryParams = getSortQueryParams(sortingOption);
        expect(queryParams.sortBy).toEqual("relevance");
        expect(queryParams.sort).toEqual("");
    });
    it("If any other valid option is specified, both query params are specified", () => {
        sortingOption = "hits_90_days-asc";
        queryParams = getSortQueryParams(sortingOption);
        expect(queryParams.sortBy).toEqual("hits_90_days");
        expect(queryParams.sort).toEqual("asc");
    });

})