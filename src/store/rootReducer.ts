import {combineReducers} from 'redux';
import featured from '../components/mainpage/featured/FeaturedReducer'
import viewSeries from '../components/viewpage/ViewPageReducer'


const rootReducer = combineReducers({

    featured,
    viewSeries,
});

export default rootReducer;