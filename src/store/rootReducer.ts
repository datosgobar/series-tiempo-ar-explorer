import {combineReducers} from 'redux';
import featured from '../components/mainpage/featured/FeaturedReducer';
import searchResults from '../components/searchpage/SearchPageReducer';
import viewSeries from '../components/viewpage/ViewPageReducer';
import seriesApi from '../SerieApiReducer';


const rootReducer = combineReducers({

    featured,
    searchResults,
    seriesApi,
    viewSeries,
});

export default rootReducer;