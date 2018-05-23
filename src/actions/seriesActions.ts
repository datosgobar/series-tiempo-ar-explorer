import { ISerie } from "../api/Serie";
import { ISearchResultItem } from "../api/SerieApi";
import actionTypes from "./actionTypes";

export function loadFeatured(featured: ISerie[]) {
    return { type: actionTypes.LOAD_FEATURED, featured };
}

export function loadViewSeries(series: ISerie[]) {
    return { type: actionTypes.LOAD_VIEW_SERIES, series};
}

export function loadSearchResults(searchResults: ISearchResultItem[]){
    return {type: actionTypes.LOAD_SEARCH_RESULTS, searchResults}
}