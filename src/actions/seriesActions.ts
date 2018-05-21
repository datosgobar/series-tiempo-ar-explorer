import { ISerie } from "../api/Serie";
import actionTypes from "./actionTypes";

export function loadFeatured(featured: ISerie[]) {
    return { type: actionTypes.LOAD_FEATURED, featured };
}

export function loadViewSeries(series: ISerie[]) {
    return { type: actionTypes.LOAD_VIEW_SERIES, series};
}