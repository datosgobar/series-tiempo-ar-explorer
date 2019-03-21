import { Action } from "redux";
import { IAggregations } from "../api/ITSAPIResponse";
import { ISearchParams } from "../components/common/searcher/Searcher";
import actionTypes from "./actionTypes";


export interface ISearchAction extends Action<string> {
    searchParams: ISearchParams
}

export interface ISetAggsAction extends Action<string> {
    aggregations: IAggregations;
}

export function setSearchParams(searchParams:ISearchParams): ISearchAction {
    return (
        {
            searchParams,
            type: actionTypes.SET_SEARCH_PARAMS,
        }
    );
}

export function setSourceFilters(aggregations: IAggregations): ISetAggsAction {
    return ({ aggregations, type: actionTypes.SET_AGGREGATIONS })
}