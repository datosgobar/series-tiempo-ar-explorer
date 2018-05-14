import {combineReducers} from 'redux';
import searchTerm from '../components/common/searchbox/searchBoxReducer'
import featured from '../components/mainpage/featured/FeaturedReducer'


const rootReducer = combineReducers({

    featured,
    searchTerm
});

export default rootReducer;