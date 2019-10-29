import { IDateRange } from "../api/DateSerie";
import { IAggregations } from "../api/ITSAPIResponse";
import { ISerie, MAX_SIGNIFICANT_FIGURES } from "../api/Serie";
import { ISerieApi } from "../api/SerieApi";
import { ISearchParams } from "../components/common/searcher/Searcher";
import { ILapsProps } from "../components/mainpage/featured/Featured";
import { ISerieTag } from "../components/viewpage/SeriesTags";

export interface IStore {
    date: IDateRange;
    featured: string[];
    viewSeries: ISerie[];
    seriesApi: ISerieApi | null;
    searchParams: ISearchParams;
    tagNames: ISerieTag[];
    formatChartUnits: boolean;
    laps: ILapsProps;
    locale: string;
    aggregations: IAggregations;
    maxDecimals: number;
    heroImageUrl: string;
}

const initialState: IStore = {
    aggregations: {
        catalog_id: [],
        dataset_publisher_name: [],
        dataset_source: [],
        dataset_theme: [],
        units: [],
    },
    date: { start: '', end: '' },
    featured: [],
    formatChartUnits: true,
    heroImageUrl: '',
    laps: {
        Anual: 10,
        Diaria: 90,
        Mensual: 24,
        Semestral: 10,
        Trimestral: 20,
    },
    locale: '',
    maxDecimals: MAX_SIGNIFICANT_FIGURES,
    searchParams: {
        catalogId: "",
        datasetSource: "",
        datasetTheme: "",
        limit: 10,
        offset: 0,
        publisher: "",
        q: "",
        sorting: "",
        units: "",
    },
    seriesApi: null,
    tagNames: [],
    viewSeries: [],
};

export default initialState;
