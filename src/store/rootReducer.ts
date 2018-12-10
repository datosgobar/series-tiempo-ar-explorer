import {combineReducers} from 'redux';
import searchParams from '../components/common/searcher/SearcherReducer';
import featured from '../components/mainpage/featured/FeaturedReducer';
import date from "../components/viewpage/DateReducer";
import serieTags from "../components/viewpage/SerieTagsReducer";
import viewSeries from '../components/viewpage/ViewPageReducer';
import formatUnits from "../FormatUnitsReducer";
import laps from '../lapsReducer'
import locale from '../localeReducer'
import seriesApi from '../SerieApiReducer';


const rootReducer = combineReducers({
    date,
    featured,
    formatUnits,
    laps,
    locale,
    searchParams,
    serieTags,
    seriesApi,
    viewSeries,
});

export default rootReducer;