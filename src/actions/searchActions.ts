import { Action } from "redux";

import { ISearchParams } from "../components/common/searcher/Searcher";
import actionTypes from "./actionTypes";


export interface ISearchAction extends Action<string> {
    searchParams: ISearchParams
}

export function setSearchParams(searchParams:ISearchParams): ISearchAction {
    return (
        {
            searchParams,
            type: actionTypes.SET_SEARCH_PARAMS,
        }
    );
}