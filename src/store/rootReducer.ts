import {combineReducers} from 'redux';
import featured from '../components/mainpage/featured/FeaturedReducer';
import searchResults from '../components/searchpage/SearchPageReducer';
import viewSeries from '../components/viewpage/ViewPageReducer';


const rootReducer = combineReducers({

    featured,
    searchResults,
    viewSeries,
});

export default rootReducer;