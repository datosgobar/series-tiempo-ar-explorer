import {Action} from "redux";
import {IDateRange} from "../api/DateSerie";
import {ISerie} from "../api/Serie";
import {ISerieApi} from "../api/SerieApi";
import {ILapsProps} from "../components/mainpage/featured/Featured";
import {ISerieTag} from "../components/viewpage/SeriesTags";
import actionTypes from "./actionTypes";

export interface ISeriesAction extends Action<string> {
    series: ISerie[];
}

export interface IFeaturedIdsAction extends Action<string> {
    featuredIds: string[]
}

export interface IDateAction extends Action<string> {
    date: IDateRange;
}

export interface IUnitFormat extends Action<string> {
    formatChartUnits: boolean;
}

export interface ILapsAction extends Action<string> {
    laps: ILapsProps;
}

export function loadFeaturedIds(featuredIds: string[]): IFeaturedIdsAction {
    return { type: actionTypes.LOAD_FEATURED_IDS, featuredIds };
}

export function clearViewSeries(): ISeriesAction {
    return { type: actionTypes.CLEAR_VIEW_SERIES, series: []};
}

export function loadViewSeries(series: ISerie[]): ISeriesAction {
    return { type: actionTypes.LOAD_VIEW_SERIES, series };
}

export function setDate(date: IDateRange): IDateAction {
    return { type: actionTypes.LOAD_DATE, date };
}

export interface ISerieApiAction extends Action<string> {
    seriesApi: ISerieApi;
}

export interface ITagNamesAction extends Action<string> {
    serieTags: ISerieTag[];
}

export function setSeriesApi(seriesApi: ISerieApi): ISerieApiAction {
    return { type: actionTypes.SET_SERIES_API, seriesApi };
}

export function setSerieTags(serieTags: ISerieTag[]): ITagNamesAction {
    return { type: actionTypes.SET_SERIE_TAGS, serieTags };
}

export function setFormatChartUnits(formatChartUnits: boolean): IUnitFormat {
    return { type: actionTypes.SET_UNIT_FORMAT, formatChartUnits };
}

export function setLaps(laps: ILapsProps): ILapsAction {
    return { type: actionTypes.SET_LAPS, laps };
}
