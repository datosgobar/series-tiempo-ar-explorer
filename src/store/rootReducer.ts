import {combineReducers} from 'redux';
import searchParams from '../components/common/searcher/SearcherReducer';
import featured from '../components/mainpage/featured/FeaturedReducer';
import date from "../components/viewpage/DateReducer";
import tagNames from "../components/viewpage/TagNamesReducer";
import viewSeries from '../components/viewpage/ViewPageReducer';
import seriesApi from '../SerieApiReducer';


const rootReducer = combineReducers({

    date,
    featured,
    searchParams,
    seriesApi,
    tagNames,
    viewSeries,
});

export default rootReducer;