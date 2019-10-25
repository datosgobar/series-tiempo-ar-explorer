export interface ISortQueryParams {
    sort: string;
    sortBy: string;
}

export function getSortQueryParams(selectedValue: string): ISortQueryParams {

    let sort: string;
    let sortBy: string;

    if (selectedValue === "") {
        sort = "";
        sortBy = "";
    }
    else if (selectedValue === "relevance") {
        sort = "";
        sortBy = "relevance";
    }
    else {
        sortBy = selectedValue.split('-')[0];
        sort = selectedValue.split('-')[1];
    }

    return {
        sort,
        sortBy
    }

}