import ApiClient from './ApiClient';
import {ITSAPIResponse} from './ITSAPIResponse'
import Serie, {ISerie} from "./Serie";


export interface ISearchResultItem {
    title: string;
    id: string;
    description: string;
}

export const METADATA = {
    FULL: 'full',
    NONE: 'none',
    ONLY: 'only',
    SIMPLE: 'simple',
};

export interface ISerieApi {

    getSeries: ((ids: string[]) => Promise<ISerie[]>);
    searchSeries: ((q: string, offset?: number, limit?: number) => Promise<ISearchResultItem[]>);
    fetchSources: () => Promise<string[]>;
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

    public searchSeries(q: string, offset: number = 0, limit: number = 10): Promise<ISearchResultItem[]>{
        const options = {
            qs: {
                limit,
                offset,
                q,
            },
            uri: this.apiClient.endpoint('search'),
        };
        
        return this.apiClient.get(options).then((tsResponse: ITSAPIResponse) => tsResponse.data);
    }

    public fetchSources() {
        const options = {
            // uri: this.apiClient.endpoint('search/dataset_source'),
            uri: this.apiClient.uri + '/search/dataset_source', // este se hace manual por un error en la api
        }

        return this.apiClient.get(options).then((tsResponse: ITSAPIResponse) => tsResponse.data);
    }
}

function tsResponseToSeries(ids: string[], tsResponse: ITSAPIResponse): Serie[] {
    return ids.map(
        (_, index) => new Serie(index + 1, tsResponse)
    );
}
