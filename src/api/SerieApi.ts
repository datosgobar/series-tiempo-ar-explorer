import { ApiClient } from './ApiClient';
import {ISearchResponse, ITSAPIResponse, ITSMeta} from './ITSAPIResponse'
import QueryParams from "./QueryParams";
import ResponseResult from "./ResponseResult";
import SearchResult from './SearchResult';
import Serie, { ISerie } from "./Serie";


export interface ISearchOptions {
    datasetSource?: string;
    datasetTheme?: string;
    offset: number;
    limit?: number;
}

export const METADATA = {
    FULL: 'full',
    NONE: 'none',
    ONLY: 'only',
    SIMPLE: 'simple',
};

type DatasetTheme = string;
type DatasetSource = string;

export interface ISerieApi {

    fetchSeries: ((params: QueryParams) => Promise<ISerie[]>);
    searchSeries: ((q: string, searchOptions?: ISearchOptions) => Promise<ISearchResponse>);
    fetchSources: () => Promise<DatasetSource[]>;
    fetchThemes: () => Promise<DatasetTheme[]>;
}

export default class SerieApi implements ISerieApi {

    public static withUri(seriesUri: string): SerieApi {
        return new SerieApi(new ApiClient(seriesUri));
    }

    public apiClient: ApiClient;

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient;
    }

    public fetchSeries(params: QueryParams, metadata: string = METADATA.FULL): Promise<Serie[]> {
        const ids = params.getIds();
        const options = {
            qs: {
                limit: 1000,
                metadata,
                start: 0
            },
            uri: this.apiClient.endpoint('series'),
        };

        Object.assign(options.qs, params.asQuery());

        return this.apiClient.getAll(options, [])
            .then((tsResponse: ITSAPIResponse) => tsResponseToSeries(ids.split(","), tsResponse));
    }

    public searchSeries(q: string, searchOptions?: ISearchOptions): Promise<ISearchResponse> {
        const limit = searchOptions && searchOptions.limit ? searchOptions.limit : 10;
        const offset = searchOptions && searchOptions.offset ? searchOptions.offset : 0;
        // tslint:disable-next-line:variable-name
        const dataset_source = searchOptions && searchOptions.datasetSource ? searchOptions.datasetSource : undefined;
        // tslint:disable-next-line:variable-name
        const dataset_theme = searchOptions && searchOptions.datasetTheme ? searchOptions.datasetTheme : undefined;

        const options = {
            qs: {
                dataset_source,
                dataset_theme,
                limit,
                offset,
                q,
            },
            uri: this.apiClient.endpoint('search'),
        };

        return this.apiClient.get(options)
            .then(addPlaceHolders)
            .then(tsResponseToSearchResult)
    }

    public fetchSources() {
        const options = {
            uri: this.apiClient.endpoint('search/dataset_source', false),
        };

        return this.apiClient.get<ITSAPIResponse>(options).then((tsResponse: ITSAPIResponse) => tsResponse.data);
    }

    public fetchThemes() {
        const options = {
            uri: this.apiClient.endpoint('search/dataset_theme')
        };

        return this.apiClient.get<ITSAPIResponse>(options).then((tsResponse: ITSAPIResponse) => tsResponse.data);
    }
}

function tsResponseToSeries(ids: string[], tsResponse: ITSAPIResponse): Serie[] {
    return ids.map(
        (_, index) => new Serie(index + 1, tsResponse)
    );
}

function tsResponseToSearchResult(tsResponse: ITSAPIResponse): ISearchResponse {
    const result: SearchResult[] = tsResponse.data.map((searchResult: ITSMeta) => new SearchResult(searchResult));
    return new ResponseResult(tsResponse.count, result);
}

function addPlaceHolders(apiResponse: ITSAPIResponse): ITSAPIResponse {

    const data = apiResponse.data.map((searchResult: ITSMeta) => ({
        ...searchResult,
        dataset: {
            accrualPeriodicity: searchResult.field.periodicity,
            ...searchResult.dataset
        },
        field: {
            index:{
                end: searchResult.field.end_date,
                start: searchResult.field.start_date,
            },
            units: `units`,
            ...searchResult.field,
        },
    }));


    return { ...apiResponse, data };
}