import ITsResponse from './ITsResponse'
import Serie from "./Serie";


export const METADATA = {
    FULL: 'full',
    NONE: 'none',
    ONLY: 'only',
    SIMPLE: 'simple',
};


export default class SerieApi {

    public static rp = require('request-promise-native');

    private seriesUri: string;

    constructor(seriesUri: string) {
        this.seriesUri = seriesUri;
    }

    public getSeries(ids: string[], metadata: string = METADATA.FULL): Promise<Serie[]> {
        const options = {
            json: true, // Automatically parses the JSON string in the response
            qs: {
                ids: ids.toString(), // -> uri + '?ids=xxxxx%20xxxxx'
                metadata,
            },
            uri: this.seriesUri,
        };

        return SerieApi.rp(options).then((tsResponse: ITsResponse) => tsResponseToSeries(ids, tsResponse));
    }
}

function tsResponseToSeries(ids: string[], tsResponse: ITsResponse): Serie[] {
    return ids.map(
        (_, index) => new Serie(index + 1, tsResponse)
    );
}
