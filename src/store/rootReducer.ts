import {combineReducers} from 'redux';
import featured from '../components/mainpage/featured/FeaturedReducer';
import searchParams from '../components/searchpage/searcher/SearcherReducer';
import viewSeries from '../components/viewpage/ViewPageReducer';
import seriesApi from '../SerieApiReducer';


const rootReducer = combineReducers({

    featured,
    searchParams,
    seriesApi,
    viewSeries,
});

export default rootReducer;