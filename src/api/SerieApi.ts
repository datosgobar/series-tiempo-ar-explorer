import ApiClient from './ApiClient';
import {ITSAPIResponse} from './ITSAPIResponse'
import Serie, {ISerie} from "./Serie";


export const METADATA = {
    FULL: 'full',
    NONE: 'none',
    ONLY: 'only',
    SIMPLE: 'simple',
};

export interface ISerieApi {

    getSeries: ((ids: string[]) => Promise<ISerie[]>);
}

export default class SerieApi implements ISerieApi {

    public static withUri(seriesUri: string): SerieApi {
        return new SerieApi(new ApiClient(seriesUri));
    }

    public apiClient: ApiClient;

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient;
    }

    public getSeries(ids: string[], metadata: string = METADATA.FULL): Promise<Serie[]> {
        const options = {
            qs: {
                ids: ids.join(","),
                metadata,
            },
        };

        return this.apiClient.get(options).then((tsResponse: ITSAPIResponse) => tsResponseToSeries(ids, tsResponse));
    }
}

function tsResponseToSeries(ids: string[], tsResponse: ITSAPIResponse): Serie[] {
    return ids.map(
        (_, index) => new Serie(index + 1, tsResponse)
    );
}
