import {combineReducers} from 'redux';
import searchParams from '../components/common/searcher/SearcherReducer';
import featured from '../components/mainpage/featured/FeaturedReducer';
import viewSeries from '../components/viewpage/ViewPageReducer';
import seriesApi from '../SerieApiReducer';


const rootReducer = combineReducers({

    featured,
    searchParams,
    seriesApi,
    viewSeries,
});

export default rootReducer;