import { Action } from "redux";

import { ISerie } from "../api/Serie";
import { ISearchResultItem, ISerieApi } from "../api/SerieApi";
import actionTypes from "./actionTypes";

export interface ISeriesAction extends Action<string> {
    series: ISerie[];
}

export function loadFeatured(series: ISerie[]): ISeriesAction {
    return { type: actionTypes.LOAD_FEATURED, series };
}

export function loadViewSeries(series: ISerie[]): ISeriesAction {
    return { type: actionTypes.LOAD_VIEW_SERIES, series };
}

export interface ISearchResultsAction extends Action<string> {
    searchResults: ISearchResultItem[];
}

export function loadSearchResults(searchResults: ISearchResultItem[]): ISearchResultsAction {
    return { type: actionTypes.LOAD_SEARCH_RESULTS, searchResults }
}

export interface ISerieApiAction extends Action<string> {
    seriesApi: ISerieApi;
}

export function setSeriesApi(seriesApi: ISerieApi): ISerieApiAction {
    return { type: actionTypes.SET_SERIES_API, seriesApi };
}