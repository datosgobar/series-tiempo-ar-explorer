import {ApiClient, IApiClientOpt} from './ApiClient';
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
    searchSeries: ((q: string | null, searchOptions?: ISearchOptions) => Promise<ISearchResponse>);
    fetchSources: () => Promise<DatasetSource[]>;
    fetchThemes: () => Promise<DatasetTheme[]>;
    downloadDataURL: ((params: QueryParams) => string);
}

export default class SerieApi implements ISerieApi {

    public static withUri(seriesUri: string): SerieApi {
        return new SerieApi(new ApiClient(seriesUri));
    }

    public apiClient: ApiClient;
    private catalogId?: string;

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient;
    }

    public withCatalogID(catalogId?: string): SerieApi {
        this.catalogId = catalogId;
        return this;
    }

    public fetchSeries(params: QueryParams, metadata: string = METADATA.FULL): Promise<Serie[]> {
        const options = {
            qs: {
                limit: 1000,
                metadata,
                start: 0
            },
            uri: this.apiClient.endpoint('series'),
        };

        Object.assign(options.qs, params.asQuery());

        return this.performGetWithRetry(options);
    }

    public downloadDataURL(params: QueryParams, metadata: string = METADATA.FULL): string {
        const options = {
            qs: {
                limit: 1000,
                metadata,
                start: 0
            },
            uri: this.apiClient.endpoint('series'),
        };

        Object.assign(options.qs, params.asQuery());

        let url = '?';
        Object.keys(options.qs).forEach((key) => {
            url = `${url}${key}=${options.qs[key]}&`;
        });

        url = url.slice(0, url.length-1); // remove the last "&" character

        return `${options.uri}${url}`;
    }

    public searchSeries(q: string, searchOptions?: ISearchOptions): Promise<ISearchResponse> {
        const limit = searchOptions && searchOptions.limit ? searchOptions.limit : 10;
        const start = searchOptions && searchOptions.offset ? searchOptions.offset : 0;
        // tslint:disable-next-line:variable-name
        const dataset_source = searchOptions && searchOptions.datasetSource ? searchOptions.datasetSource : undefined;
        // tslint:disable-next-line:variable-name
        const dataset_theme = searchOptions && searchOptions.datasetTheme ? searchOptions.datasetTheme : undefined;
        const query = q ? q : null;

        const options = {
            qs: {
                catalog_id: this.catalogId,
                dataset_source,
                dataset_theme,
                limit,
                q: query,
                start,
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

    private performGet(options: IApiClientOpt): Promise<Serie[]> {
        return this.apiClient
                   .getAll(options, [])
                   .then((tsResponse: ITSAPIResponse) => tsResponseToSeries(options.qs.ids.split(","), tsResponse));
    }

    private performGetWithRetry(options: IApiClientOpt): Promise<Serie[]> {
        return this.performGet(options)
                   .catch((error: any) => {
                       if (error.response.data.failed_series) {
                           const failedIds: string[] = error.response.data.failed_series;
                           options.qs.ids = options.qs.ids.split(',').filter((id: string) => failedIds.indexOf(id) === -1).join(',');

                           return this.performGetWithRetry(options);
                       } else {
                           throw error.response;
                       }
                   });
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
            accrualPeriodicity: searchResult.field.frequency,
            ...searchResult.dataset
        },
        field: {
            index:{
                end: searchResult.field.time_index_end,
                start: searchResult.field.time_index_start,
            },
            units: `units`,
            ...searchResult.field,
        },
    }));

    return { ...apiResponse, data };
}