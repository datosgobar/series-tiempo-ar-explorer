import {combineReducers} from 'redux';
import searchParams from '../components/common/searcher/SearcherReducer';
import featured from '../components/mainpage/featured/FeaturedReducer';
import date from "../components/viewpage/DateReducer";
import serieTags from "../components/viewpage/SerieTagsReducer";
import viewSeries from '../components/viewpage/ViewPageReducer';
import seriesApi from '../SerieApiReducer';


const rootReducer = combineReducers({
    date,
    featured,
    searchParams,
    serieTags,
    seriesApi,
    viewSeries,
});

export default rootReducer;