import { ApiClient } from './ApiClient';
import { ITSAPIResponse } from './ITSAPIResponse'
import Serie, { ISerie } from "./Serie";


export interface ISearchResultItem {
    title: string;
    id: string;
    description: string;
}

export interface ISearchOptions {
    datasetSource?: string;
    datasetTheme?: string;
    offset?: number;
    limit?: number;
}

export const METADATA = {
    FULL: 'full',
    NONE: 'none',
    ONLY: 'only',
    SIMPLE: 'simple',
};

export interface ISerieApi {

    getSeries: ((ids: string[]) => Promise<ISerie[]>);
    searchSeries: ((q: string, searchOptions?: ISearchOptions) => Promise<ISearchResultItem[]>);
    fetchSources: () => Promise<string[]>;
    fetchThemes: () => Promise<string[]>;
}

export default class SerieApi implements ISerieApi {

    public static withUri(seriesUri: string): SerieApi {
        return new SerieApi(new ApiClient(seriesUri));
    }

    public apiClient: ApiClient;

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient;
    }

    public getSeries(idsArray: string[], metadata: string = METADATA.FULL): Promise<Serie[]> {
        const ids = idsArray.join(",");
        const options = {
            qs: {
                ids,
                metadata,
            },
            uri: this.apiClient.endpoint('series'),
        };

        return this.apiClient.get(options).then((tsResponse: ITSAPIResponse) => tsResponseToSeries(ids.split(","), tsResponse));
    }

    public searchSeries(q: string, searchOptions?: ISearchOptions): Promise<ISearchResultItem[]> {

        const limit = searchOptions && searchOptions.limit? searchOptions.limit : 10;
        const offset = searchOptions && searchOptions.offset? searchOptions.offset : 0;
        // tslint:disable-next-line:variable-name
        const dataset_source = searchOptions && searchOptions.datasetSource? searchOptions.datasetSource : undefined;
        // tslint:disable-next-line:variable-name
        const dataset_theme = searchOptions && searchOptions.datasetTheme? searchOptions.datasetTheme : undefined;

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

        return this.apiClient.get<ITSAPIResponse>(options).then((tsResponse: ITSAPIResponse) => tsResponse.data);
    }

    public fetchSources() {
        const options = {
            uri: this.apiClient.endpoint('search/dataset_source', false),
        }

        return this.apiClient.get<ITSAPIResponse>(options).then((tsResponse: ITSAPIResponse) => tsResponse.data);
    }

    public fetchThemes() {
        const options = {
            uri: this.apiClient.endpoint('search/dataset_theme')
        }

        return this.apiClient.get<ITSAPIResponse>(options).then((tsResponse: ITSAPIResponse) => tsResponse.data);
    }
}

function tsResponseToSeries(ids: string[], tsResponse: ITSAPIResponse): Serie[] {
    return ids.map(
        (_, index) => new Serie(index + 1, tsResponse)
    );
}
