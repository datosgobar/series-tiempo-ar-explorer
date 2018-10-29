import { IDateRange } from "../api/DateSerie";
import { ISerie } from "../api/Serie";
import { ISerieApi } from "../api/SerieApi";
import { ISearchParams } from "../components/common/searcher/Searcher";

export interface IStore {
    date: IDateRange,
    featured: ISerie[],
    viewSeries: ISerie[],
    seriesApi: ISerieApi | null,
    searchParams: ISearchParams,
    tagNames: string[]
}

const initialState: IStore = {
    date: { start: '', end: '' },
    featured: [],
    searchParams: {
        datasetSource: "",
        datasetTheme: "",
        limit: 10,
        offset: 0,
        q: "",
    },
    seriesApi: null,
    tagNames: [''],
    viewSeries: [],
};

export default initialState;
