import { combineReducers } from 'redux';
import searchParams from '../components/common/searcher/SearcherReducer';
import featured from '../components/mainpage/featured/FeaturedReducer';
import aggregations from '../components/searchpage/AggregationsReducer';
import date from "../components/viewpage/DateReducer";
import serieTags from "../components/viewpage/SerieTagsReducer";
import viewSeries from '../components/viewpage/ViewPageReducer';
import formatChartUnits from "../FormatChartUnitsReducer";
import laps from '../lapsReducer';
import locale from '../localeReducer';
import seriesApi from '../SerieApiReducer';
import maxDecimals from '../maxDecimalsReducer';


const rootReducer = combineReducers({
    aggregations,
    date,
    featured,
    formatChartUnits,
    laps,
    locale,
    maxDecimals,
    searchParams,
    serieTags,
    seriesApi,
    viewSeries
});

export default rootReducer;