import {combineReducers} from 'redux';
import featured from '../components/mainpage/featured/FeaturedReducer';
import viewSeries from '../components/viewpage/ViewPageReducer';
import seriesApi from '../SerieApiReducer';


const rootReducer = combineReducers({

    featured,
    seriesApi,
    viewSeries,
});

export default rootReducer;