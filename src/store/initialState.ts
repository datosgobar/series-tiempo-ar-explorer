import { IDateRange } from "../api/DateSerie";
import { IAggregations } from "../api/ITSAPIResponse";
import { ISerie } from "../api/Serie";
import { ISerieApi } from "../api/SerieApi";
import { ISearchParams } from "../components/common/searcher/Searcher";
import { ILapsProps } from "../components/mainpage/featured/Featured";
import { ISerieTag } from "../components/viewpage/SeriesTags";

export interface IStore {
    date: IDateRange,
    featured: string[],
    viewSeries: ISerie[],
    seriesApi: ISerieApi | null,
    searchParams: ISearchParams,
    tagNames: ISerieTag[]
    formatChartUnits: boolean
    laps: ILapsProps;
    locale: string;
    aggregations: IAggregations;
}

const initialState: IStore = {
    aggregations: {
        dataset_source: [],
        dataset_theme: [],
    },
    date: { start: '', end: '' },
    featured: [],
    formatChartUnits: true,
    laps: {
        Anual: 10,
        Diaria: 90,
        Mensual: 24,
        Semestral: 10,
        Trimestral: 20,
    },
    locale: '',
    searchParams: {
        datasetSource: "",
        datasetTheme: "",
        limit: 10,
        offset: 0,
        q: "",
    },
    seriesApi: null,
    tagNames: [],
    viewSeries: [],
};

export default initialState;
