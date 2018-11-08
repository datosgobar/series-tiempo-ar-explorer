import {IDateRange} from "../api/DateSerie";
import {ISerie} from "../api/Serie";
import {ISerieApi} from "../api/SerieApi";
import {ISearchParams} from "../components/common/searcher/Searcher";
import {ISerieTag} from "../components/viewpage/SeriesTags";

export interface IStore {
    date: IDateRange,
    featured: string[],
    viewSeries: ISerie[],
    seriesApi: ISerieApi | null,
    searchParams: ISearchParams,
    tagNames: ISerieTag[]
    formatChartUnits: boolean
}

const initialState: IStore = {
    date: { start: '', end: '' },
    featured: [],
    formatChartUnits: true,
    searchParams: {
        datasetSource: "",
        datasetTheme: "",
        limit: 10,
        offset: 0,
        q: "",
    },
    seriesApi: null,
    tagNames: [{id: '', title: ''}],
    viewSeries: [],
};

export default initialState;
